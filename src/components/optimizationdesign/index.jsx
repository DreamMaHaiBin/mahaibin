import React, { Component } from "react";
import BuildTitle from "../model/model"
import axios from "axios";
import CanSet from "./gaoset.jsx"
import ExportJsonExcel from 'js-export-excel';
import { Modal, Input, Button, message, Checkbox } from "antd";
import WrappedBudgetFen from "./daorumodal.jsx"
import BudgetMingXi from "./context.jsx"
const list = []
for (let i = 0; i < 15; i++) {
    list.push({
        line: i + 1,
        name: null,
        isTotal: false,
        purpose: 10,
        al2o3: null,
        cao: null,
        k2o: null,
        mgo: null,
        na2o: null,
        s: null,
        p: null,
        tio2: null,
        sx: null,
        xx: null,
        tfe: null,
        price: null,
        zno: null,
        sio2: null,
        feo: null,
        mno: null,
    });
}
const Listinfo= [
    {
        name: "上限",
        cao: null,
        mgo: null,
        al2o3: null,
        r: null,
        zl: null,
        ti: null,
        s: null,
        p: null,
        tio2: null,
        tfe: null,
        line: 1,
    }, {
        name: "下限",
        cao: null,
        mgo: null,
        al2o3: null,
        r: null,
        zl: null,
        ti: null,
        s: null,
        p: null,
        tio2: null,
        tfe: null,
        line: 2,
    }
]
const str = "0.00"
const strFour = "0.0000"
export default class IndexCoalBlending extends Component {
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
                    cao: null,
                    mgo: null,
                    al2o3: null,
                    r: null,
                    zl: null,
                    ti: null,
                    s: null,
                    p: null,
                    tio2: null,
                    tfe: null,
                    line: 1,
                }, {
                    name: "下限",
                    cao: null,
                    mgo: null,
                    al2o3: null,
                    r: null,
                    zl: null,
                    ti: null,
                    s: null,
                    p: null,
                    tio2: null,
                    tfe: null,
                    line: 2,
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
            cansetValues: "",//参数设置接收
            elseData:"",
            save:false,
        }
    }
    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
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
                            newSanFang.source["name"] = newSanFang.name;
                            newSanFang.source["loi"] = newSanFang.source.loI;
                            newSanFang.source["tfe"] = newSanFang.source.tFe;
                            newSanFang.source["sio2"] = newSanFang.source.siO2;
                            newSanFang.source["cao"] = newSanFang.source.caO;
                            newSanFang.source["mgo"] = newSanFang.source.mgO;
                            newSanFang.source["al2o3"] = newSanFang.source.al2O3;
                            newSanFang.source["k2o"] = newSanFang.source.k2O;
                            newSanFang.source["na2o"] = newSanFang.source.na2O;
                            newSanFang.source["zno"] = newSanFang.source.znO;
                            newSanFang.source["tio2"] = newSanFang.source.tiO2;
                            newSanFang.source["pbo"] = newSanFang.source.pbO;
                            newSanFang.source["aso"] = newSanFang.source.asO;
                            newSanFang.source["mno"] =Number( newSanFang.source.mnO).toFixed(2);
                            newSanFang.source["feo"] = newSanFang.source.feO;
                            newSanFang.source["price"] = newSanFang.priceOre;
                            newSanFang.source["sx"] = this.state.ListData[this.state.navData-1].sx //配比是否显示
                            newSanFang.source["xx"] = this.state.ListData[this.state.navData-1].xx //配比是否显示
                            newSanFang.source["line"] = this.state.navData
                            newListData[this.state.navData - 1] = newSanFang.source;
                            //   //console.log(newSanFang)
                            this.setState({
                                ListData: newListData,
                                visible: false
                            })
                            ////console.log(this.state.ListData);
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
        if (this.state.model === "canset") {
            this.refs.canSet.validateFields((err, values) => {
                if (err) {
                    this.setState({
                        confirmLoading: false,
                    });
                } else {
                    // //console.log(values)
                    this.setState({
                        cansetValues: values,
                        visible: false,
                    });
                }
            })
        }
    };
    handleCancel = e => {
        //////console.log(e);
        this.setState({
            visible: false,
        });
    };
    componentWillMount() {
        //表格
        axios.get("/api/gldos/", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
          //  //console.log(res)
            this.setState({
                ListData: res.data.dos
            })
        })
        //限制表
        axios.get("/api/glconstituent/", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
           // //console.log(res)
            this.setState({
                astrictList: res.data.con
            })     
        })
        //高炉参数
        axios.get("/api/glcs/", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
           // //console.log(res)
            this.setState({
                cansetValues: res.data
            })
        })
    }
    valueNameRadio(info) {
        // //console.log(info)
        this.setState({
            infoValueName: info
        })
    }
    //导入接收数据
    bbbb(value) {
        //////console.log(value)
        this.setState({
            SanFang: value
        })

    }
    //导入接收序号
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
    //参数设置
    conSet() {
        this.setState({
            visible: true,
            model: "canset",
        })
    }
    //明细
    mingXi() {
        this.setState({
            visible: true,
            model: "BudgetMingXi",
        })
    }
    //列表
    infoKuang(name, index) {
        return (e) => {
            const value = e.target.value === undefined ? e.target.checked : e.target.value;
            Number(value).toFixed(2)
            const newData = this.state.ListData;
            newData[index][name] = value;
            this.setState({ ListData: newData })
            // //console.log(this.state.ListData)
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

        axios.post("/api/glcount/", {
            dos:
                this.state.ListData.map((item, index) => {

                    return (
                        {
                            name: item.name,
                            line: item.line,     //序号
                            tfe: item.tfe==="" || item.tfe===null ? "0.00" : Number(item.tfe).toFixed(2),     // 全铁含量
                            sio2: item.sio2==="" || item.sio2===null ? "0.00" :  Number(item.sio2).toFixed(2),     // 二氧化硅含量
                            cao: item.cao==="" || item.cao===null ? "0.00" :  Number(item.cao).toFixed(2),     // 氧化钙含量
                            mgo: item.mgo==="" || item.mgo===null ? "0.00" :  Number(item.mgo).toFixed(2),         // 氧化镁含量
                            al2o3: item.al2o3==="" || item.al2o3===null ? "0.00" :  Number(item.al2o3).toFixed(2),    // 氧化铝含量
                            feo: item.feo==="" || item.feo===null ? "0.00" :  Number(item.feo).toFixed(2),        // 氧化铁含量
                            mno: item.mno==="" || item.mno===null ? "0.00" :  Number(item.mno).toFixed(2),       // 氧化铁含量
                            k2o: item.k2o==="" || item.k2o===null ? "0.0000" :  Number(item.k2o).toFixed(2),         // 氧化钾含量
                            na2o: item.na2o==="" || item.na2o===null ? "0.0000" :  Number(item.na2o).toFixed(2),        // 氧化钠含量
                            zno: item.zno==="" || item.zno===null ? "0.00" :  Number(item.zno).toFixed(2),         // 氧化锌含量
                            s: item.s==="" || item.s===null ? "0.0000" :  Number(item.s).toFixed(2),           // 硫含量
                            p: item.p==="" || item.p===null ? "0.0000" :  Number(item.p).toFixed(2),          // 磷含量
                            tio2: item.tio2==="" || item.tio2===null ? "0.0000" :  Number(item.tio2).toFixed(4),        // 氧化钛含量
                            price: item.price==="" || item.price===null ? "0.00" :  Number(item.price).toFixed(2),  // 价格
                            sx: item.sx==="" || item.sx===null ? "0.00" :  Number(item.sx).toFixed(2),
                            xx:index>=12 ? item.sx==="" || item.sx===null ? "0.00" :  Number(item.sx).toFixed(2) : item.xx==="" || item.xx===null ? "0.00" :  Number(item.xx).toFixed(2),

                        }
                    )
                }),
            con:
                this.state.astrictList.map((item) => {
                    return (
                        {
                            name: item.name,
                            line: item.line,     //序号
                            tfe: item.tfe === "" || item.tfe === null ? "0.00" : Number(item.tfe).toFixed(2),     // 全铁含量
                            s: item.s === "" || item.s === null ? "0.0000" : Number(item.s).toFixed(4),     // 二氧化硅含量
                            p: item.p === "" || item.p === null ? "0.0000" : Number(item.p).toFixed(4),     // 氧化钙含量
                            ti: item.ti === "" || item.ti === null ? "0.0000" :Number(item.ti).toFixed(4),         // 氧化镁含量
                            zl: item.zl === "" || item.zl === null ? "0.00" : Number(item.zl).toFixed(2),    // 氧化铝含量
                            r: item.r === "" || item.r === null ? "0.00" : Number(item.r).toFixed(2),         // 氧化钾含量
                            mgo: item.mgo === "" || item.mgo === null ? "0.00" : Number(item.mgo).toFixed(2),        // 氧化钠含量
                            al2o3: item.al2o3 === "" || item.al2o3 === null ? "0.00" :Number(item.al2o3).toFixed(2),           // 硫含量
                        }
                    )
                }),
            f1: Number(this.state.cansetValues.f1),
            f2: Number(this.state.cansetValues.f2),
            f3: Number(this.state.cansetValues.f3),
            f4: Number(this.state.cansetValues.f4),
            f5: Number(this.state.cansetValues.f5),
            f6: Number(this.state.cansetValues.f6),
            f7: Number(this.state.cansetValues.f7),
            f8: Number(this.state.cansetValues.f8),
            f9: Number(this.state.cansetValues.f9),
            f10: Number(this.state.cansetValues.f10),
            f11: Number(this.state.cansetValues.f11),
            f12: Number(this.state.cansetValues.f12),
            f13: Number(this.state.cansetValues.f13),
            f14: Number(this.state.cansetValues.f14),
            f15: Number(this.state.cansetValues.f15),
            f16: Number(this.state.cansetValues.f16),
        }, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {

            //console.log(res)
            if (res.data.code === 1) {
                message.success("计算完成")
                this.setState({
                    conputedInfo: res.data,
                    HTYLORE: res.data.dos,
                    SJ: res.data.con,
                    boolen: false,
                    flag: false,
                    number: 2,
                    elseData:res.data.qita,
                    save:res.data.save
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

            ////console.log(res)

        }).catch(err => {
            this.setState({
                flag: false
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
                axios.post("/api/gldos/", {
                    dos:
                        this.state.ListData.map((item, index) => {
                            return (
                                {
                              name: item.name,
                                line: item.line,     //序号
                                tfe: item.tfe==="" || item.tfe===null ? "0.00" : item.tfe,     // 全铁含量
                                sio2: item.sio2==="" || item.sio2===null ? "0.00" : item.sio2,     // 二氧化硅含量
                                cao: item.cao==="" || item.cao===null ? "0.00" : item.cao,     // 氧化钙含量
                                mgo: item.mgo==="" || item.mgo===null ? "0.00" : item.mgo,         // 氧化镁含量
                                al2o3: item.al2o3==="" || item.al2o3===null ? "0.00" : item.al2o3,    // 氧化铝含量
                                feo: item.feo==="" || item.feo===null ? "0.00" : item.feo,        // 氧化铁含量
                                mno: item.mno==="" || item.mno===null ? "0.00" : item.mno,       // 氧化铁含量
                                k2o: item.k2o==="" || item.k2o===null ? "0.0000" : item.k2o,         // 氧化钾含量
                                na2o: item.na2o==="" || item.na2o===null ? "0.0000" : item.na2o,        // 氧化钠含量
                                zno: item.zno==="" || item.zno===null ? "0.00" : item.zno,         // 氧化锌含量
                                s: item.s==="" || item.s===null ? "0.0000" : item.s,           // 硫含量
                                p: item.p==="" || item.p===null ? "0.0000" : item.p,          // 磷含量
                                tio2: item.tio2==="" || item.tio2===null ? "0.0000" : item.tio2,        // 氧化钛含量
                                price: item.price==="" || item.price===null ? "0.00" : item.price,  // 价格
                                sx: item.sx==="" || item.sx===null ? "0.00" : item.sx,
                                xx:index>=12 ? item.sx==="" || item.sx===null ? "0.00" : item.sx : item.xx==="" || item.xx===null ? "0.00" : item.xx,
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
    
                        })
                    }
                }).catch(err => {
                    //////console.log(err)
                    if (err.request.status === 500) {
                        message.warning("请检查参数信息是否正确")
                    } else if (err.request.status === 400) {
                        message.warning("请检查参数信息是否正确")
                    }
                    // notification["error"]({
                    //   message: '网络发生了一些错误(' + err.request.status + ')！',
                    //   description: err.request.statusText + "：" + err.request.responseURL,
                    // });
                })
                axios.post("/api/glconstituent/", {
                    con: this.state.astrictList.map((item) => {
                        return ({
                            name: item.name,
                            line: item.line,     //序号
                            tfe: item.tfe,     // 全铁含量
                            s: item.s,     // 二氧化硅含量
                            p: item.p,     // 氧化钙含量
                            ti: item.ti,         // 氧化镁含量
                            zl: item.zl,    // 氧化铝含量
                            r: item.r,         // 氧化钾含量
                            mgo: item.mgo,        // 氧化钠含量
    
                            al2o3: item.al2o3,           // 硫含量
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
                    console.log(err);    
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
            if (index === 17) {
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
        let dataTableFour = []
        let dataTableFive = []
        let objFive = {
            '入炉品味': Number(this.state.elseData.rlpw).toFixed(2) === "NaN" ? null : Number(this.state.elseData.rlpw).toFixed(2),
            "铁水S": Number(this.state.elseData.s).toFixed(4) === "NaN" ? null : Number(this.state.elseData.s).toFixed(4),
            "铁水P": Number(this.state.elseData.p).toFixed(4) === "NaN" ? null : Number(this.state.elseData.p).toFixed(4),
            "铁水Ti": Number(this.state.elseData.ti).toFixed(4) === "NaN" ? null : Number(this.state.elseData.ti).toFixed(4),
            '铁水Mn': Number(this.state.elseData.mn).toFixed(4) === "NaN" ? null : Number(this.state.elseData.mn).toFixed(4),
            "实际煤比": Number(this.state.elseData.sjmb).toFixed(2) === "NaN" ? null : Number(this.state.elseData.sjmb).toFixed(2),
            "实际焦比": Number(this.state.elseData.sjjb).toFixed(2) === "NaN" ? null : Number(this.state.elseData.sjjb).toFixed(2),
            "实际产量": Number(this.state.elseData.sjcl).toFixed(2) === "NaN" ? null : Number(this.state.elseData.sjcl).toFixed(2),
        }
        dataTableFive.push(objFive)
        let objFour = {
            'S渣铁分配比': Number(this.state.cansetValues.f1).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.f1).toFixed(2),
            "Ti铁水收的率": Number(this.state.cansetValues.f2).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.f2).toFixed(2),
            "铁水中Si含量": Number(this.state.cansetValues.f3).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.f3).toFixed(2),
            "铁水铁含量": Number(this.state.cansetValues.f4).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.f4).toFixed(2),
            '铁水中Fe渣中分配比': Number(this.state.cansetValues.f5).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.f5).toFixed(2),
            "渣中其他成分含量": Number(this.state.cansetValues.f6).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.f6).toFixed(2),
            "S在煤气中分配率": Number(this.state.cansetValues.f7).toFixed(4) === "NaN" ? null : Number(this.state.cansetValues.f7).toFixed(4),
            "Mn在铁中分配率": Number(this.state.cansetValues.f8).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.f8).toFixed(2),

        }
        dataTableFour.push(objFour)
        for (let p = 0; p < this.state.astrictList.length; p++) {
            if (this.state.astrictList) {
                let objThree = {
                    '': this.state.astrictList[p].name,  // '列名': 数据
                    '入炉品位': Number(this.state.astrictList[p].tfe).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].tfe).toFixed(2),
                    'S含量': Number(this.state.astrictList[p].s).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].s).toFixed(2),
                    'P含量': Number(this.state.astrictList[p].p).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].p).toFixed(2),
                    'Ti含量': Number(this.state.astrictList[p].ti).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].ti).toFixed(2),
                    '渣量': Number(this.state.astrictList[p].zl).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].zl).toFixed(2),
                    '碱度': Number(this.state.astrictList[p].r).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].r).toFixed(2),
                    '渣中MgO': Number(this.state.astrictList[p].mgo).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].mgo).toFixed(2),
                    '渣中Al2O3': Number(this.state.astrictList[p].al2o3).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].al2o3).toFixed(2),

                }
                dataTableThree.push(objThree);
            }
        }
        let objTwo = {
            "SiO2": Number(data4.sio2).toFixed(2) === "NaN" ? null : Number(data4.sio2).toFixed(2),
            "CaO": Number(data4.cao).toFixed(2) === "NaN" ? null : Number(data4.cao).toFixed(2),
            'MgO': Number(data4.mgo).toFixed(2) === "NaN" ? null : Number(data4.mgo).toFixed(2),
            "Al2O3": Number(data4.al2o3).toFixed(2) === "NaN" ? null : Number(data4.al2o3).toFixed(2),
            "S": Number(data4.s).toFixed(4) === "NaN" ? null : Number(data4.s).toFixed(4),
            "TiO2": Number(data4.tio2).toFixed(2) === "NaN" ? null : Number(data4.tio2).toFixed(2),
            "R": Number(data4.r).toFixed(2) === "NaN" ? null : Number(data4.r).toFixed(2),
            "渣量": Number(data4.zl).toFixed(2) === "NaN" ? null : Number(data4.zl).toFixed(2),
        }
        dataTableTwo.push(objTwo)
        for (let i = 0; i < data3.length; i++) {
            if (data3) {
                let obj = {
                    '名称': data3[i].name,  // '列名': 数据
                    '单耗，kg': Number(data3[i].g).toFixed(2) === "NaN" ? null : Number(data3[i].g).toFixed(2),
                    '百分比，%': Number(data3[i].gb).toFixed(2) === "NaN" ? null : Number(data3[i].gb).toFixed(2),
                    '单成，元/t': Number(data3[i].dc).toFixed(2) === "NaN" ? null : Number(data3[i].dc).toFixed(2),
                    '百分比': Number(data3[i].dcb).toFixed(2) === "NaN" ? null : Number(data3[i].dcb).toFixed(2),
                    '价格': Number(data3[i].price).toFixed(2) === "NaN" ? null : Number(data3[i].price).toFixed(2),
                    '实际成本 元/t': Number(data3[i].sjcb).toFixed(2) === "NaN" ? null : Number(data3[i].sjcb).toFixed(2),
                    '实际百分比，%': Number(data3[i].sjb).toFixed(2) === "NaN" ? null : Number(data3[i].sjb).toFixed(2),
                    'TFe': Number(data3[i].tfe).toFixed(2) === "NaN" ? null : Number(data3[i].tfe).toFixed(2),
                    'SiO2': Number(data3[i].sio2).toFixed(2) === "NaN" ? null : Number(data3[i].sio2).toFixed(2),
                    'CaO': Number(data3[i].cao).toFixed(2) === "NaN" ? null : Number(data3[i].cao).toFixed(2),
                    'MgO': Number(data3[i].mgo).toFixed(2) === "NaN" ? null : Number(data3[i].mgo).toFixed(2),
                    'Al2O3': Number(data3[i].al2o3).toFixed(2) === "NaN" ? null : Number(data3[i].al2o3).toFixed(2),
                    'FeO': Number(data3[i].feo).toFixed(2) === "NaN" ? null : Number(data3[i].feo).toFixed(2),
                    'MnO': Number(data3[i].mno).toFixed(2) === "NaN" ? null : Number(data3[i].mno).toFixed(2),
                    'K2O': Number(data3[i].k2o).toFixed(4) === "NaN" ? null : Number(data3[i].k2o).toFixed(4),
                    'Na2O': Number(data3[i].na2o).toFixed(4) === "NaN" ? null : Number(data3[i].na2o).toFixed(4),
                    'ZnO': Number(data3[i].zno).toFixed(4) === "NaN" ? null : Number(data3[i].zno).toFixed(4),
                    'S': Number(data3[i].s).toFixed(4) === "NaN" ? null : Number(data3[i].s).toFixed(4),
                    'P': Number(data3[i].p).toFixed(4) === "NaN" ? null : Number(data3[i].p).toFixed(4),
                    'TiO2': Number(data3[i].tio2).toFixed(4) === "NaN" ? null : Number(data3[i].tio2).toFixed(4),
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
        option.fileName = '高炉成本优化--' + dateFormat  //导出的Excel文件名
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: '高炉最优配料方案',
                sheetFilter: ['名称', '单耗，kg', "百分比，%", "单成，元/t", "百分比", "价格","实际成本 元/t","实际百分比，%", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "FeO","MnO","K2O", "Na2O", "ZnO", "S", "P", "TiO2", "上限", "下限",],
                sheetHeader: ['名称', '单耗，kg', "百分比，%", "单成，元/t", "百分比", "价格","实际成本 元/t","实际百分比，%", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "FeO","MnO","K2O", "Na2O", "ZnO", "S", "P", "TiO2", "上限", "下限",],
            }, {
                sheetData: dataTableTwo,
                sheetName: '高炉炉渣化学成分',
                sheetFilter: ["SiO2", "CaO", 'MgO', "Al2O3", "S", "TiO2", "R", "渣量",],
                sheetHeader: ["SiO2", "CaO", 'MgO', "Al2O3", "S", "TiO2", "R", "渣量",],
            }, {
                sheetData: dataTableThree,
                sheetName: '高炉限制条件',
                sheetFilter: ["", '入炉品位', "S含量", "P含量", "Ti含量", '渣量', "碱度", "渣中MgO", "渣中Al2O3",],
                sheetHeader: ["", '入炉品位', "S含量", "P含量", "Ti含量", '渣量', "碱度", "渣中MgO", "渣中Al2O3",],
            }, {
                sheetData: dataTableFour,
                sheetName: '高炉参数设置',
                sheetFilter: ["S渣铁分配比", 'Ti铁水收的率', "铁水中Si含量", "铁水铁含量", "铁水中Fe渣中分配比", "渣中其他成分含量", "S在煤气中分配率", "Mn在铁中分配率",],
                sheetHeader: ["S渣铁分配比", 'Ti铁水收的率', "铁水中Si含量", "铁水铁含量", "铁水中Fe渣中分配比", "渣中其他成分含量", "S在煤气中分配率", "Mn在铁中分配率",],
            }, {
                sheetData: dataTableFive,
                sheetName: '其他指标',
                sheetFilter: ["入炉品味", '铁水S', "铁水P", "铁水Ti", "铁水Mn","实际煤比","实际焦比","实际产量" ],
                sheetHeader: ["入炉品味", '铁水S', "铁水P", "铁水Ti", "铁水Mn", "实际煤比","实际焦比","实际产量"],
            }
        ]

        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }
    clearItem() {
        this.state.ListData.forEach((item, index) => {
            if (item.bolen) {
                item.bolen = false
                item.al2o3 = null
                item.cao = null
                item.k2o = null
                item.loi = null
                item.mgo = null
                item.na2o = null
                item.name = null
                item.p = null
                item.s = null
                item.sio2 = null
                item.sx = null
                item.tfe = null
                item.tio2 = null
                item.xx = null
                item.zno = null
                item.price = null
                item.feo = null
                item.mno = null
                this.setState({
                    ListData: this.state.ListData
                })
            }
        })
    }
    render() {
        return (
            <div className="optimization-body">
                <div className="daochuzuijia">
                    <Button type="primary" onClick={this.clearItem.bind(this)} style={{ marginRight: 10 }}>
                        <img src={require("../../img/btn_delete.png")} alt="" />
                        删除
                 </Button>
                    <Button type="primary" onClick={this.conSet.bind(this)} style={{ marginRight: 10 }}>
                        参数设置
                 </Button>
                    <Button
                        onClick={this.ExportToExcel.bind(this)}
                        type="primary"
                    >
                        <img src={require("../../img/btn_add.png")} alt="" />
                        导出最佳测算表
                        </Button>
                </div>
                <div className="aaa" style={{ height: "600px" }}>
                    <div className="tableone" style={{ height: "440px" }}>
                        <table className="table-th">
                            <tbody>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>序号</td>
                                    <td>名称</td>
                                    <td>TFe</td>
                                    <td>SiO2</td>
                                    <td>CaO</td>
                                    <td>MgO</td>
                                    <td>AL2O3</td>
                                    <td>FeO</td>
                                    <td>MnO</td>
                                    <td>K2O</td>
                                    <td>Na2O</td>
                                    <td>ZnO</td>
                                    <td>S</td>
                                    <td>P</td>
                                    <td>TiO2</td>
                                    <td>价格</td>
                                    <td>上限</td>
                                    <td>下限</td>
                                </tr>
                                {
                                   this.state.ListData.map((item, index) => {
                                        return (
                                            <tr key={index} className="table-th-tr">
                                                <td><Checkbox onChange={this.infoKuang("bolen", index).bind(this)} id={String(index + 1)} checked={item.bolen} /></td>
                                                <td>{index + 1}</td>
                                                <td style={{ width: 70 }}>
                                                    <Input
                                                        value={item.name}
                                                        onChange={this.infoKuang("name", index).bind(this)}
                                                    >
                                                    </Input>
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.tfe === str ? null : item.tfe}
                                                        onChange={this.infoKuang("tfe", index).bind(this)}
                                                    />
                                                </td>
                                                <td><Input
                                                    value={item.sio2 === str ? null : item.sio2}
                                                    onChange={this.infoKuang("sio2", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.cao === str ? null : item.cao}
                                                    onChange={this.infoKuang("cao", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.mgo === str ? null : item.mgo}
                                                    onChange={this.infoKuang("mgo", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.al2o3 === str ? null : item.al2o3}
                                                    onChange={this.infoKuang("al2o3", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.feo === str ? null : item.feo}
                                                    onChange={this.infoKuang("feo", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    value={item.mno === str ? null : item.mno}
                                                    onChange={this.infoKuang("mno", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    value={item.k2o === strFour ? null : item.k2o}
                                                    onChange={this.infoKuang("k2o", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.na2o === strFour ? null : item.na2o}
                                                    onChange={this.infoKuang("na2o", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.zno === strFour ? null : item.zno}
                                                    onChange={this.infoKuang("zno", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.s === strFour ? null : item.s}
                                                    onChange={this.infoKuang("s", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.p === strFour ? null : item.p}
                                                    onChange={this.infoKuang("p", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.tio2 === strFour ? null : item.tio2}
                                                    onChange={this.infoKuang("tio2", index).bind(this)}
                                                /></td>

                                                <td>
                                                    <Input onChange={this.infoKuang("price", index).bind(this)}
                                                        value={item.price === str ? null : item.price}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onChange={this.infoKuang("sx", index).bind(this)}
                                                        value={item.sx === str ? null : item.sx}
                                                    />
                                                </td>
                                                <td> <Input onChange={index>=12 ?this.infoKuang("sx", index).bind(this) :this.infoKuang("xx", index).bind(this)}
                                                  value={index>=12 ?(item.sx === str ? null : item.sx ): item.xx === str ? null : item.xx }
                                                  disabled={index>=12 ? true : false}
                                                /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <span>
                            <span className="tishixinxi">6-12 其他入炉料/13-14焦比和煤比/15未入炉焦炭 &nbsp;&nbsp;&nbsp;&nbsp;配比单位：kg/t</span>
                            <span className="work">
                                <Button type="primary" onClick={this.daoRu.bind(this)}>导入其他炉料</Button>
                                <Button type="primary" onClick={this.jiSuan.bind(this)} disabled={this.state.flag}>计算</Button>

                                <Button type="primary" disabled={this.state.boolen} id="ChengbenMingXi" htmlType="submit" onClick={this.mingXi.bind(this)}>
                                    计算结果
                            </Button>
                                <Button type="primary" onClick={this.baoCun.bind(this)} disabled={this.state.flag}>保存</Button>
                            </span>
                        </span>
                    </div>
                    <div>
                        <table className="width">
                            <tbody>
                                <tr className="nametd">
                                    <td style={{ width: 80 }}></td>
                                    <td>入炉品位,%</td>
                                    <td>铁中S含量,%</td>
                                    <td>铁中P含量,%</td>
                                    <td>铁中Ti含量,%</td>
                                    <td>渣量,kg/t 铁</td>
                                    <td>碱度,:</td>
                                    <td>渣中MgO,%</td>
                                    <td>渣中Al2O3,%</td>
                                </tr>
                                {
                                    (this.state.astrictList.length!==2 ? Listinfo : this.state.astrictList).map((item, index) => {
                                        return (
                                            <tr className="youhua" key={index}>
                                                <td>{item.name}</td>
                                                <td>
                                                    <Input
                                                        value={item.tfe === str || item.tfe === 0 ? null : item.tfe}
                                                        onChange={this.astrict("tfe", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.s === strFour || item.s === 0 ? null : item.s}
                                                        onChange={this.astrict("s", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.p === strFour || item.p === 0 ? null : item.p}
                                                        onChange={this.astrict("p", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.ti === strFour || item.ti === 0 ? null : item.ti}
                                                        onChange={this.astrict("ti", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.zl === str || item.zl === 0 ? null : item.zl}
                                                        onChange={this.astrict("zl", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.r === strFour || item.r === 0 ? null : item.r}
                                                        onChange={this.astrict("r", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.mgo === strFour || item.mgo === 0 ? null : item.mgo}
                                                        onChange={this.astrict("mgo", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.al2o3 === strFour || item.al2o3 === 0 ? null : item.al2o3}
                                                        onChange={this.astrict("al2o3", index).bind(this)} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal
                    title={this.state.model === "BudgetFen" ? <BuildTitle title="导入入炉料" /> : <BuildTitle title="高炉成本优化明细" />}
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
                                valueNameRadio={this.valueNameRadio.bind(this)} /> :
                            this.state.model === "canset" ? <CanSet ref="canSet" cansetValues={this.state.cansetValues} /> :
                                <BudgetMingXi conputedInfo={this.state.conputedInfo} />
                    }
                </Modal>
            </div>

        )
    }
}