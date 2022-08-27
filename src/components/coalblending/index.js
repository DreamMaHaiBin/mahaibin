import React, { Component } from "react";
import BuildTitle from "../model/model"
import axios from "axios";
import ExportJsonExcel from 'js-export-excel';
import WrappedBudgetFen from "./daoru"
import BudgetMingXi from "./context"
import { Modal, Input, Button, message, Checkbox } from "antd";
const list = []
for (let i = 0; i < 10; i++) {
    list.push({
        line: i + 1,
        name: null,
        hf: null,
        hff: null,
        s: null,
        c: null,
        frz: null,
        price: null,
        sx: null,
        xx: null,
    });
}
const listInfo=[
    {
        name: "上限",
        line: 1,
        hf: null,
        hff: null,
        s: null,
        c: null,
        frz: null,
        price: null,
        ymb: null
    }, {
        name: "下限",
        line: 2,
        hf: null,
        hff: null,
        s: null,
        c: null,
        frz: null,
        price: null,
        ymb: null
    }
]
const str = "0.00"
export default class Coalblending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],//获取烧结前16行的列表
            model: "",//点击选择是哪一个弹窗
            number: 1,//空  还没有赋值
            value: "",
            ListDataKuang: [],//通过结口获取参数17条的页面参数，暂时先不用。
            ListData: list,
            astrictList: [
                {
                    name: "上限",
                    line: 1,
                    hf: null,
                    hff: null,
                    s: null,
                    c: null,
                    frz: null,
                    price: null,
                    ymb: null
                }, {
                    name: "下限",
                    line: 2,
                    hf: null,
                    hff: null,
                    s: null,
                    c: null,
                    frz: null,
                    price: null,
                    ymb: null
                }
            ],
            navData: "", //该状态为选中子组件的序号的状态
            SanFang: [],
            boolen: true,
            flag: false,
            SJ: "",
            HTYLORE: [],//含铁原料ore
            conputedInfo: "",
            checked: false,
            infoValueName: "",
            save:false,
        }
    }
    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    //模态框确定
    handleOk() {
        if (this.state.model === "BudgetFen") {
            this.refs.BudgetFenYouHua.validateFields((err, values) => {
                if (err) {
                    this.setState({
                        confirmLoading: false,
                    });
                } else {
                    this.state.SanFang.forEach((item) => {
                        if (item.name === values.name && item.incomingDate === values.time) {
                            //console.log(item);
                            const newListData = this.state.ListData.slice(0);
                            const newSanFang = Object.assign({}, item);
                            newSanFang["line"] = this.state.navData
                            newSanFang["sx"] = this.state.ListData[this.state.navData-1].sx //配比是否显示
                            newSanFang["xx"] = this.state.ListData[this.state.navData-1].xx //配比是否显示
                            newListData[this.state.navData - 1] = newSanFang;
                            this.setState({
                                ListData: newListData,
                                visible: false
                            })
                            //console.log(this.state.ListData);
                        }
                    })
                }
            })
        }
        if (this.state.model === "BudgetMingXi") {
            this.setState({
                visible: false,
            })
        }
    };
    handleCancel = e => {
        //////console.log(e);
        this.setState({
            visible: false,
        });
    };
    //严格模式的生命周期
    UNSAFE_componentWillMount() {
        axios.get("/api/mfdos/", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            res.data.dos.forEach((item) => {
                item.hf = Number(item.hf).toFixed(2);//灰分
                item.hff = Number(item.hff).toFixed(2);     // 挥发分
                item.s = Number(item.s).toFixed(2);    // 硫含量
                item.c = Number(item.c).toFixed(2);        // 固定碳
                item.frz = Number(item.frz).toFixed(2);    // 发热值
                item.price = Number(item.price).toFixed(2);     // 价格
                item.xx = Number(item.xx).toFixed(2);        //上限
                item.sx = Number(item.sx).toFixed(2);        // 下限
            })
            // //console.log(res)
            this.setState({
                ListData: res.data.dos
            })
        })
        axios.get("/api/mfconstituent/", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            //console.log(res);
            res.data.con.forEach((item) => {
                item.hf = Number(item.hf).toFixed(2);//灰分
                item.hff = Number(item.hff).toFixed(2);     // 挥发分
                item.s = Number(item.s).toFixed(2);    // 硫含量
                item.c = Number(item.c).toFixed(2);        // 固定碳
                item.frz = Number(item.frz).toFixed(2);    // 发热值
                item.price = Number(item.price).toFixed(2);     // 价格
            })

            this.setState({
                astrictList: res.data.con
            })
        })
    }
    valueNameRadio(info) {
        //  //console.log(info)
        this.setState({
            infoValueName: info
        })
    }
    //打入时接收导入的值
    bbbb(value) {
        //////console.log(value)
        this.setState({
            SanFang: value
        })

    }
    //导入时接收导入的序号
    cccc(values) {
        //////console.log(values);
        this.setState({
            navData: values
        })
    }
    //导入
    daoRu() {
        this.setState({
            visible: true,
            model: "BudgetFen",
        })
    }
    //明细
    mingXi() {
        this.setState({
            visible: true,
            model: "BudgetMingXi",
        })
    }
    infoKuang(name, index) {
        return (e) => {
            const value = e.target.value === undefined ? e.target.checked : e.target.value;
            Number(value).toFixed(2)
            const newData = this.state.ListData;
            newData[index][name] = value;
            this.setState({ ListData: newData })
            ////console.log(this.state.ListData)
        }
    }
    astrict(tfe, index) {
        return (e) => {
            const value = e.target.value;
            const newData = this.state.astrictList;
            newData[index][tfe] = value;
            this.setState({ astrictList: newData })
            ////console.log(this.state.astrictList[0])
        }
    }
    jiSuan() {
        this.setState({
            flag: true
        })
        axios.post("/api/mfcount/", {
            dos:
                this.state.ListData.map((item, index) => {
                    return (
                        {
                            name: item.name,
                            line: item.line,     //序号
                            hf: item.hf === "" || item.hf === null ? "0.00" : Number(item.hf).toFixed(2),     // 灰分
                            hff: item.hff=== "" || item.hff === null ? "0.00" : Number(item.hff).toFixed(2),     // 挥发分
                            s: item.s=== "" || item.s === null ? "0.00" : Number(item.s).toFixed(2),     // 硫含量
                            c: item.c=== "" || item.c === null ? "0.00" : Number(item.c).toFixed(2),         // 固定碳
                            frz: item.frz=== "" || item.frz === null ? "0.00" : Number(item.frz).toFixed(2),    // 发热值
                            price: item.price=== "" || item.price === null ? "0.00" : Number(item.price).toFixed(2),      // 价格
                            sx: item.sx=== "" || item.sx === null ? "0.00" : Number(item.sx).toFixed(2),        // 下限
                            xx: item.xx=== "" || item.xx === null ? "0.00" : Number(item.xx).toFixed(2),         // 上限

                        }
                    )
                }),
            con:
                this.state.astrictList.map((item) => {
                    return (
                        {
                            name: item.name,
                            line: item.line,     //序号
                            hf: item.hf==="" || item.hf===null ? "0.00" : Number(item.hf).toFixed(2),     // 灰分
                            hff: item.hff==="" || item.hff===null ? "0.00" : Number(item.hff).toFixed(2),     // 挥发分
                            s: item.s==="" || item.s===null ? "0.00" : Number(item.s).toFixed(2),     // 硫含量
                            c: item.c==="" || item.c===null ? "0.00" : Number(item.c).toFixed(2),         // 固定碳
                            frz: item.frz==="" || item.frz===null ? "0.00" : Number(item.frz).toFixed(2),    // 发热值
                            ymb: item.ymb==="" || item.ymb===null ? "0.00" : Number(item.ymb).toFixed(2),      // 价格

                        }
                    )
                })

        }, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            if (res.data.code === 1) {
               // //console.log(res);
                message.success("计算完成")
                this.setState({
                    conputedInfo: res.data,
                    HTYLORE: res.data.dos,
                    SJ: res.data.con,
                    boolen: false,
                    flag: false,
                    number: 2,
                    save:res.data.save,
                })
            } else if (res.data.code === 0) {
                message.error("计算失败！")
                this.setState({
                    boolen: true,
                    flag: false,
                })
            }else if(res.data.error){
                this.setState({
                    boolen: false,
                    flag: false,
                })
                message.warning(res.data.error)
               
            }
        }).catch(err => {
            this.setState({
                flag: false,
                boolen: false,
            })
            //////console.log(err)
            if (err.request.status === 500) {
                message.warning("请检查参数信息是否正确")
            } else if (err.request.status === 400) {
                message.warning("请检查参数信息是否正确")
            } else if (err.request.status === 401) {
                message.warning("没有权限！")
            }
            // notification["error"]({
            //   message: '网络发生了一些错误(' + err.request.status + ')！',
            //   description: err.request.statusText + "：" + err.request.responseURL,
            // });
        })
    }
    baoCun() {
    
        if (this.state.number === 2) {
            if(this.state.save){
            this.setState({
                flag: true
            })
            axios.post("/api/mfdos/", {
                dos:
                    this.state.ListData.map((item, index) => {
                        return (
                            {
                                name: item.name,
                                line: item.line,     //序号
                                hf: item.hf === "" || item.hf === null ? "0.00" : Number(item.hf).toFixed(2),     // 灰分
                                hff: item.hff=== "" || item.hff === null ? "0.00" : Number(item.hff).toFixed(2),     // 挥发分
                                s: item.s=== "" || item.s === null ? "0.00" : Number(item.s).toFixed(2),     // 硫含量
                                c: item.c=== "" || item.c === null ? "0.00" : Number(item.c).toFixed(2),         // 固定碳
                                frz: item.frz=== "" || item.frz === null ? "0.00" : Number(item.frz).toFixed(2),    // 发热值
                                price: item.price=== "" || item.price === null ? "0.00" : Number(item.price).toFixed(2),      // 价格
                                sx: item.sx=== "" || item.sx === null ? "0.00" : Number(item.sx).toFixed(2),        // 下限
                                xx: item.xx=== "" || item.xx === null ? "0.00" : Number(item.xx).toFixed(2),         // 上限
                            }
                        )
                    })
            }, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }
            ).then((res) => {
                message.success("保存成功")
                ////console.log(res);
                if (res) {
                    this.setState({
                        flag: false,
                        number: 3,
                    
                     
                            boolen: false,
                 
                    })
                }
            }).catch(err => {
                this.setState({
                 
                    boolen: false,
                })
                //////console.log(err)
                if (err.request.status === 500) {
                    message.warning("请检查参数信息是否正确！")
                } else if (err.request.status === 400) {
                    message.warning("请检查参数信息是否正确！")
                } else if (err.request.status === 401) {
                    message.warning("没有权限！")
                }
            })
            axios.post("/api/mfconstituent/", {
                con: this.state.astrictList.map((item) => {
                    return ({
                        name: item.name,
                        line: item.line,     //序号
                        hf: item.hf,     // 灰分
                        hff: item.hff,     // 挥发分
                        s: item.s,     // 硫含量
                        c: item.c,         // 固定碳
                        frz: item.frz,    // 发热值
                        ymb: item.ymb,        // 下限

                    })
                })
            },{
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res) => {
                ////console.log(res);
                this.setState({
                    number: 3,
                })

            }).catch((err) => {
                ////console.log(err);

            })
        }else{
            message.warning("您没有保存权限！")
        }
        } else if (this.state.number === 1) {
            message.warning("请先计算在进行保存！")
        } else if (this.state.number === 3) {
            message.warning("请勿重复保存！")
        }
    }
    //生成报告
    ExportToExcel() {
        const data = this.state.HTYLORE // 准备的数据
        const data2 = this.state.ListData// 准备的数据
        const data4 = this.state.SJ
        const data3 = [];
        data.forEach((item, index) => {
            if (index === 10) {
                var obj = Object.assign({}, item);
                data3.push(obj)
            }
            data2.forEach((items, idx) => {
                if (index === idx) {
                    var obj = Object.assign({}, item, items);
                    data3.push(obj)
                }
            })

        })
        var option = {}
        let dataTable = []
        let dataTableTwo = []
        let dataTableThree = []
        for (let p=0;p<this.state.astrictList.length;p++) {
            if (this.state.astrictList) {
                let objThree = {
                    '': this.state.astrictList[p].name,  // '列名': 数据
                    '灰分': Number(this.state.astrictList[p].hf).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].hf).toFixed(2),
                    '挥发分': Number(this.state.astrictList[p].hff).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].hff).toFixed(2),
                    '硫含量': Number(this.state.astrictList[p].s).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].s).toFixed(2),
                    '固定碳': Number(this.state.astrictList[p].c).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].c).toFixed(2),
                    '发热值': Number(this.state.astrictList[p].frz).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].frz).toFixed(2),
                    '烟煤比': Number(this.state.astrictList[p].ymb).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].ymb).toFixed(2),
                }
                dataTableThree.push(objThree);
            }
        }
        let objTwo = {
            '灰分': Number(data4.hf).toFixed(2) === "NaN" ? null : Number(data4.hf).toFixed(2),
            "挥发分": Number(data4.hff).toFixed(2) === "NaN" ? null : Number(data4.hff).toFixed(2),
            "硫含量": Number(data4.s).toFixed(2) === "NaN" ? null : Number(data4.s).toFixed(2),
            '固定碳': Number(data4.c).toFixed(2) === "NaN" ? null : Number(data4.c).toFixed(2),
            "发热值": Number(data4.frz).toFixed(2) === "NaN" ? null : Number(data4.frz).toFixed(2),
            "烟煤比": Number(data4.ymb).toFixed(2) === "NaN" ? null : Number(data4.ymb).toFixed(2),
        }
        dataTableTwo.push(objTwo)

        for (let i=0;i<data3.length;i++) {
            if (data3) {
                let obj = {
                    '名称': data3[i].name,  // '列名': 数据
                    '配料量Kg': Number(data3[i].pll).toFixed(2) === "NaN" ? null : Number(data3[i].pll).toFixed(2),
                    '配料量%': Number(data3[i].radio).toFixed(2) === "NaN" ? null : Number(data3[i].radio).toFixed(2),
                    '价格(元)': Number(data3[i].price).toFixed(2) === "NaN" ? null : Number(data3[i].price).toFixed(2),
                    '成本(元)': Number(data3[i].cb).toFixed(2) === "NaN" ? null : Number(data3[i].cb).toFixed(2),
                    '成本%': Number(data3[i].cbb).toFixed(2) === "NaN" ? null : Number(data3[i].cbb).toFixed(2),
                    '灰分': Number(data3[i].hf).toFixed(2) === "NaN" ? null : Number(data3[i].hf).toFixed(2),
                    '挥发分': Number(data3[i].hff).toFixed(2) === "NaN" ? null : Number(data3[i].hff).toFixed(2),
                    '硫含量': Number(data3[i].s).toFixed(2) === "NaN" ? null : Number(data3[i].s).toFixed(2),
                    '固定碳': Number(data3[i].c).toFixed(2) === "NaN" ? null : Number(data3[i].c).toFixed(2),
                    '发热值': Number(data3[i].frz).toFixed(2) === "NaN" ? null : Number(data3[i].frz).toFixed(2),
                    '上限': Number(data3[i].sx).toFixed(4) === "NaN" ? null : Number(data3[i].sx).toFixed(4),
                    '下限': Number(data3[i].xx).toFixed(4) === "NaN" ? null : Number(data3[i].xx).toFixed(4),
                }
                dataTable.push(obj);
            }
        }

        var oDate = new Date();
        var years = oDate.getFullYear()
        var month = oDate.getMonth() + 1
        var days = oDate.getDate()
        var H = oDate.getHours()
        var M = oDate.getMinutes()
        var S = oDate.getSeconds()
        var dateFormat = years + "年" + month + "月" + days + '日' + H + "时" + M + "分" + S + "秒";
        option.fileName = '最佳煤粉测算表--' + dateFormat  //导出的Excel文件名
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: '混合煤配煤方案表',
                sheetFilter: ['名称', "配料量Kg", '配料量%', "价格(元)", "成本(元)", "成本%", "灰分", "挥发分", "硫含量", "固定碳", "发热值", "上限", "下限"],
                sheetHeader: ['名称', "配料量Kg", '配料量%', "价格(元)", "成本(元)", "成本%", "灰分", "挥发分", "硫含量", "固定碳", "发热值", "上限", "下限"],
            }, {
                sheetData: dataTableTwo,
                sheetName: '煤粉物化性能表',
                sheetFilter: ['灰分', "挥发分", "硫含量", '固定碳', "发热值", "烟煤比",],
                sheetHeader: ['灰分', "挥发分", "硫含量", '固定碳', "发热值", "烟煤比",],
            }, {
                sheetData: dataTableThree,
                sheetName: '煤粉限制条件表',
                sheetFilter: ['', '灰分', "挥发分", "硫含量", '固定碳', "发热值", "烟煤比",],
                sheetHeader: ['', '灰分', "挥发分", "硫含量", '固定碳', "发热值", "烟煤比",],
            }
        ]

        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }
    clearItem() {
        this.state.ListData.forEach((item, index) => {
            if (item.bolen) {
                item.bolen = false
                item.hf = null
                item.hff = null
                item.s = null
                item.c = null
                item.frz = null
                item.price = null
                item.name = null
                item.sx = null
                item.xx = null
                this.setState({
                    ListData: this.state.ListData
                })
            }
        })
    }
    render() {
        //console.log(this.state.astrictList)
        return (
            <div className="optimization-body">
                <div className="daochuzuijia">
                    <Button type="primary" onClick={this.clearItem.bind(this)} style={{ marginRight: 10 }}>
                        <img src={require("../../img/btn_delete.png")} alt="" />
                        删除
                 </Button>
                    <Button
                        onClick={this.ExportToExcel.bind(this)}
                        type="primary"

                    >
                        <img src={require("../../img/btn_add.png")} alt="" />
                        导出最优方案
                        </Button>
                </div>
                <div className="tablemeifen">
                    <div className="table_mei">
                        <table className="table-th">
                            <tbody>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>序号</td>
                                    <td>名称</td>
                                    <td>灰分</td>
                                    <td>挥发分</td>
                                    <td>硫含量</td>
                                    <td>固定碳</td>
                                    <td>发热值</td>
                                    <td>价格</td>
                                    <td>上限</td>
                                    <td>下限</td>
                                </tr>
                                {
                                    (this.state.ListData.length===0 ? list : this.state.ListData).map((item, index) => {
                                        return (
                                            <tr key={index} className="table-th-tr">
                                                <td><Checkbox onChange={this.infoKuang("bolen", index).bind(this)} id={String(index + 1)} checked={item.bolen} /></td>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Input
                                                        value={item.name}
                                                        onChange={this.infoKuang("name", index).bind(this)}
                                                    >
                                                    </Input>
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.hf === str || item.hf === 0 ? null : item.hf}
                                                        onChange={this.infoKuang("hf", index).bind(this)}
                                                    />
                                                </td>
                                                <td><Input

                                                    value={item.hff === str || item.hff === 0 ? null : item.hff}
                                                    onChange={this.infoKuang("hff", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.s === str || item.s === 0 ? null : item.s}
                                                    onChange={this.infoKuang("s", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.c === str || item.c === 0 ? null : item.c}
                                                    onChange={this.infoKuang("c", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.frz === str || item.frz === 0 ? null : item.frz}
                                                    onChange={this.infoKuang("frz", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.price === str || item.price === 0 ? null : item.price}
                                                    onChange={this.infoKuang("price", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    value={item.sx === str || item.sx === 0 ? null : item.sx}
                                                    onChange={this.infoKuang("sx", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.xx === str || item.xx === 0 ? null : item.xx}
                                                    onChange={this.infoKuang("xx", index).bind(this)}
                                                /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <span>
                            <span className="tishixinxi">1-7:无烟煤；8-10烟煤&nbsp;&nbsp;&nbsp;&nbsp;配比单位：%</span>
                            <span className="work">
                                <Button type="primary" onClick={this.daoRu.bind(this)}>导入煤粉</Button>
                                <Button type="primary" onClick={this.jiSuan.bind(this)} disabled={this.state.flag}>计算</Button>

                                <Button type="primary" disabled={this.state.boolen} id="ChengbenMingXi" htmlType="submit" onClick={this.mingXi.bind(this)}>
                                    计算结果
                            </Button>
                                <Button type="primary" onClick={this.baoCun.bind(this)} disabled={this.state.flag}>保存</Button>
                            </span>
                        </span>
                        <div>

                            <table className="width" style={{ width: "1042px" }}>
                                <tbody>
                                    <tr className="nametd">
                                        <td style={{ width: 80 }}></td>
                                        <td>灰分,%</td>
                                        <td>挥发分,%</td>
                                        <td>硫含量,%</td>
                                        <td>固定碳,%</td>
                                        <td>发热值,j/g</td>
                                        <td>烟煤比,%</td>
                                    </tr>
                                    {
                                        (this.state.astrictList.length===0 ? listInfo : this.state.astrictList).map((item, index) => {
                                            return (
                                                <tr className="youhua" key={index}>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <Input
                                                            value={item.hf === str || item.hf === 0 ? null : item.hf}
                                                            onChange={this.astrict("hf", index).bind(this)} />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            value={item.hff === str || item.hff === 0 ? null : item.hff}
                                                            onChange={this.astrict("hff", index).bind(this)} />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            value={item.s === str || item.s === 0 ? null : item.s}
                                                            onChange={this.astrict("s", index).bind(this)} />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            value={item.c === str || item.c === 0 ? null : item.c}
                                                            onChange={this.astrict("c", index).bind(this)} />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            value={item.frz === str || item.frz === 0 ? null : item.frz}
                                                            onChange={this.astrict("frz", index).bind(this)} />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            value={item.ymb === str || item.ymb === 0 ? null : item.ymb}
                                                            onChange={this.astrict("ymb", index).bind(this)} />
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal
                    title={this.state.model === "BudgetFen" ? <BuildTitle title="导入煤粉" /> : <BuildTitle title="计算结果" />}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose={true}
                >
                    {
                        this.state.model === "BudgetFen" ? 
                        <WrappedBudgetFen 
                        ListData={this.state.ListData} 
                        getData={this.bbbb.bind(this)} 
                        getXu={this.cccc.bind(this)} 
                        ref="BudgetFenYouHua" 
                        valueNameRadio={this.valueNameRadio.bind(this)} 
                        /> : 
                        <BudgetMingXi conputedInfo={this.state.conputedInfo} />
                    }
                </Modal> 
            </div>
        )
    }
}