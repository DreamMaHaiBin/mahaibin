import React, { Component } from "react";
import BuildTitle from "../model/model"
import axios from "axios";
import WrappedcanSet from "./canSet.js"
import ExportJsonExcel from 'js-export-excel';
import { Modal, Input, Button, message, Checkbox } from "antd";
import WrappedBudgetFen from "./daoru.js"
import BudgetMingXi from "./context.js"
const list = []
for (let i = 0; i < 24; i++) {
    list.push({
        line: i + 1,
        name: null,
        isTotal: false,
        purpose: 10,
        cao: null,
        tfe: null,
        xx: null,
        sx: null,
        sio2: null,
        mgo: null,
        al2o3: null,
        loI: null,
        loi: null,
        feo: null,
        k2o: null,
        na2o: null,
        zno: null,
        s: null,
        p: null,
        tio2: null,
        sRatio: null,
        price: null,
        ratio: null,
        r: null,
        esti: null,
    });
}
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
                    pbo: null,
                    sio2: null,
                    cao: null,
                    mgo: null,
                    al2o3: null,
                    k2o: null,
                    na2o: null,
                    zno: null,
                    s: null,
                    p: null,
                    tio2: null,
                    tfe: null,
                    r: null,
                    line: 1,
                }, {
                    name: "下限",
                    pbo: null,
                    sio2: null,
                    cao: null,
                    mgo: null,
                    al2o3: null,
                    k2o: null,
                    na2o: null,
                    zno: null,
                    s: null,
                    p: null,
                    tio2: null,
                    tfe: null,
                    r: null,
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
            save: false,
            cansetValues: ""//参数设置接收
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
                            newSanFang.source["price"] = newSanFang.priceOre;
                            newSanFang.source["ratio"] = 0;
                            newSanFang.source["sx"] = this.state.ListData[this.state.navData-1].sx //配比是否显示
                            newSanFang.source["xx"] = this.state.ListData[this.state.navData-1].xx //配比是否显示
                            newSanFang.source["line"] = this.state.navData
                            newListData[this.state.navData - 1] = newSanFang.source;
                            //console.log(newSanFang)
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
        if (this.state.model === "canset") {
            this.refs.canSet.validateFields((err, values) => {
                if (err) {
                    this.setState({
                        confirmLoading: false,
                    });
                } else {
                    //console.log(values)
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
    UNSAFE_componentWillMount() {
        // //c参数设置的最近信息
        axios.get("/api/parameter/?classify=2", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            this.setState({
                cansetValues: res.data
            })
        })
        // //球团矿的最近信息
        axios.get("/api/qtdos/", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            // //console.log(res)
            res.data.dos.forEach((item) => {
                item.tfe = Number(item.tfe).toFixed(2);
                item.sio2 = Number(item.sio2).toFixed(2);     // 二氧化硅含量
                item.cao = Number(item.cao).toFixed(2);    // 氧化钙含量
                item.mgo = Number(item.mgo).toFixed(2);        // 氧化镁含量
                item.al2o3 = Number(item.al2o3).toFixed(2);    // 氧化铝含量
                item.loi = Number(item.loi).toFixed(2);     // 烧损
                item.feo = Number(item.feo).toFixed(2);        // 氧化铁含量
                item.k2o = Number(item.k2o).toFixed(4);       // 氧化钾含量
                item.na2o = Number(item.na2o).toFixed(4);       // 氧化钠含量
                item.zno = Number(item.zno).toFixed(4);         // 氧化锌含量
                item.s = Number(item.s).toFixed(4);         // 硫含量
                item.p = Number(item.p).toFixed(4);         // 磷含量
                item.tio2 = Number(item.tio2).toFixed(4);        // 氧化钛含量
                item.pbo = Number(item.pbo).toFixed(4);        // 氧化铅含量
                item.aso = Number(item.aso).toFixed(4);        // 氧化砷含量
                item.xx = Number(item.xx).toFixed(2);        //上限
                item.sx = Number(item.sx).toFixed(2);        // 下限
                item.price = Number(item.price).toFixed(2);        // 下限

            })

            this.setState({
                ListData: res.data.dos
            })
        })
        //上限下限的最近信息
        axios.get("/api/qtconstituent/", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            // //console.log(res)
            // //console.log(res);
            res.data.con.forEach((item) => {
                item.tfe = Number(item.tfe).toFixed(2);
                item.sio2 = Number(item.sio2).toFixed(2);     // 二氧化硅含量
                item.cao = Number(item.cao).toFixed(2);    // 氧化钙含量
                item.mgo = Number(item.mgo).toFixed(2);        // 氧化镁含量
                item.al2o3 = Number(item.al2o3).toFixed(2);    // 氧化铝含量
                item.k2o = Number(item.k2o).toFixed(4);       // 氧化钾含量
                item.nao = Number(item.nao).toFixed(4);       // 氧化钠含量
                item.zno = Number(item.zno).toFixed(4);         // 氧化锌含量
                item.s = Number(item.s).toFixed(4);         // 硫含量
                item.p = Number(item.p).toFixed(4);         // 磷含量
                item.na2o = Number(item.na2o).toFixed(4);
                item.tio2 = Number(item.tio2).toFixed(4);        // 氧化钛含量
                item.aso = Number(item.aso).toFixed(2); // 价格
                item.pbo = Number(item.pbo).toFixed(2);
                item.r = Number(item.r).toFixed(2);
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
    bbbb(value) {
        //////console.log(value)
        this.setState({
            SanFang: value
        })

    }
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
    infoKuang(name, index) {
        return (e) => {
            const value = e.target.value === undefined ? e.target.checked : e.target.value;
            Number(value).toFixed(2)
            const newData = this.state.ListData;
            newData[index][name] = value;
            this.setState({ ListData: newData })
            //   //console.log(this.state.ListData)
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
        axios.post("/api/qtcbcount/", {
            dos:
                this.state.ListData.map((item, index) => {
                    return (
                        {
                            name: item.name,
                            line: item.line,     //序号
                            tfe: item.tfe === "" || item.tfe === null ? "0.00" : Number(item.tfe).toFixed(2),     // 全铁含量
                            sio2: item.sio2 === "" || item.sio2 === null ? "0.00" : Number(item.sio2).toFixed(2),     // 二氧化硅含量
                            cao: item.cao === "" || item.cao === null ? "0.00" : Number(item.cao).toFixed(2),     // 氧化钙含量
                            mgo: item.mgo === "" || item.mgo === null ? "0.00" : Number(item.mgo).toFixed(2),         // 氧化镁含量
                            al2o3: item.al2o3 === "" || item.al2o3 === null ? "0.00" : Number(item.al2o3).toFixed(2),    // 氧化铝含量
                            loi: item.loi === "" || item.loi === null ? "0.00" : Number(item.loi).toFixed(2),      // 烧损
                            // feo: item.feo,        // 氧化铁含量
                            k2o: item.k2o === "" || item.k2o === null ? "0.0000" : Number(item.k2o).toFixed(4),         // 氧化钾含量
                            na2o: item.na2o === "" || item.na2o === null ? "0.0000" : Number(item.na2o).toFixed(4),        // 氧化钠含量
                            zno: item.zno === "" || item.zno === null ? "0.0000" : Number(item.zno).toFixed(4),         // 氧化锌含量
                            s: item.s === "" || item.s === null ? "0.0000" : Number(item.s).toFixed(4),           // 硫含量
                            p: item.p === "" || item.p === null ? "0.0000" : Number(item.p).toFixed(4),          // 磷含量
                            tio2: item.tio2 === "" || item.tio2 === null ? "0.0000" : Number(item.tio2).toFixed(4),        // 氧化钛含量
                            price: item.price === "" || item.price === null ? "0.00" : Number(item.price).toFixed(2),  // 价格
                            sx: item.sx === "" || item.sx === null ? "0.00" : Number(item.sx).toFixed(2),
                            xx: item.xx === "" || item.xx === null ? "0.00" : Number(item.xx).toFixed(2),
                           
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
                            sio2: item.sio2 === "" || item.sio2 === null ? "0.00" : Number(item.sio2).toFixed(2),     // 二氧化硅含量
                            cao: item.cao === "" || item.cao === null ? "0.00" : Number(item.cao).toFixed(2),     // 氧化钙含量
                            mgo: item.mgo === "" || item.mgo === null ? "0.00" : Number(item.mgo).toFixed(2),         // 氧化镁含量
                            al2o3: item.al2o3 === "" || item.al2o3 === null ? "0.00" : Number(item.al2o3).toFixed(2),    // 氧化铝含量
                            //feo: item.feo,        // 氧化铁含量
                            k2o: item.k2o === "" || item.k2o === null ? "0.0000" : Number(item.k2o).toFixed(4),         // 氧化钾含量
                            na2o: item.na2o === "" || item.na2o === null ? "0.0000" : Number(item.na2o).toFixed(4),        // 氧化钠含量
                            zno: item.zno === "" || item.zno === null ? "0.0000" : Number(item.zno).toFixed(4),         // 氧化锌含量
                            s: item.s === "" || item.s === null ? "0.0000" : Number(item.s).toFixed(4),           // 硫含量
                            p: item.p === "" || item.p === null ? "0.0000" : Number(item.p).toFixed(4),          // 磷含量
                            tio2: item.tio2 === "" || item.tio2 === null ? "0.0000" : Number(item.tio2).toFixed(4),        // 氧化钛含量
                        }
                    )
                }),
            a1: Number(this.state.cansetValues.a1),
            a2: Number(this.state.cansetValues.a2),
            a3: Number(this.state.cansetValues.a3),
            a4: Number(this.state.cansetValues.a4),

        }, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            if (res.data.code === 1) {
                //  //console.log(res);
                message.success("计算完成")
                this.setState({
                    conputedInfo: res.data,
                    HTYLORE: res.data.dos,
                    SJ: res.data.con,
                    boolen: false,
                    flag: false,
                    number: 2,
                    save: res.data.save
                })
            } else if (res.data.code === 0) {
                message.error("计算失败！")
                this.setState({
                    boolen: true,
                    flag: false,
                })
            } else if (res.data.error) {
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
            if (this.state.save) {

                this.setState({
                    flag: true
                })
                axios.post("/api/qtdos/", {
                    dos:
                        this.state.ListData.map((item, index) => {

                            return (
                                {
                                    name: item.name,
                                    line: item.line,     //序号
                                    tfe: item.tfe === "" || item.tfe === null ? "0.00" : Number(item.tfe).toFixed(2),     // 全铁含量
                                    sio2: item.sio2 === "" || item.sio2 === null ? "0.00" : Number(item.sio2).toFixed(2),     // 二氧化硅含量
                                    cao: item.cao === "" || item.cao === null ? "0.00" : Number(item.cao).toFixed(2),     // 氧化钙含量
                                    mgo: item.mgo === "" || item.mgo === null ? "0.00" : Number(item.mgo).toFixed(2),         // 氧化镁含量
                                    al2o3: item.al2o3 === "" || item.al2o3 === null ? "0.00" : Number(item.al2o3).toFixed(2),    // 氧化铝含量
                                    loi: item.loi === "" || item.loi === null ? "0.00" : Number(item.loi).toFixed(2),      // 烧损
                                    // feo: item.feo,        // 氧化铁含量
                                    k2o: item.k2o === "" || item.k2o === null ? "0.0000" : Number(item.k2o).toFixed(4),         // 氧化钾含量
                                    na2o: item.na2o === "" || item.na2o === null ? "0.0000" : Number(item.na2o).toFixed(4),        // 氧化钠含量
                                    zno: item.zno === "" || item.zno === null ? "0.0000" : Number(item.zno).toFixed(4),         // 氧化锌含量
                                    s: item.s === "" || item.s === null ? "0.0000" : Number(item.s).toFixed(4),           // 硫含量
                                    p: item.p === "" || item.p === null ? "0.0000" : Number(item.p).toFixed(4),          // 磷含量
                                    tio2: item.tio2 === "" || item.tio2 === null ? "0.0000" : Number(item.tio2).toFixed(4),        // 氧化钛含量
                                    price: item.price === "" || item.price === null ? "0.00" : Number(item.price).toFixed(2),  // 价格
                                    sx: item.sx === "" || item.sx === null ? "0.00" : Number(item.sx).toFixed(2),
                                    xx: item.xx === "" || item.xx === null ? "0.00" : Number(item.xx).toFixed(2),
                                  

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
                      this.setState({
                            flag: false,           
                        })
                    //////console.log(err)
                    if (err.request.status === 500) {
                        message.warning("请检查参数信息是否正确")
                    } else if (err.request.status === 400) {
                        message.warning("请检查参数信息是否正确")
                    } else if (err.request.status === 401) {
                        message.warning("您没有权限！")
                    }
                    // notification["error"]({
                    //   message: '网络发生了一些错误(' + err.request.status + ')！',
                    //   description: err.request.statusText + "：" + err.request.responseURL,
                    // });
                })
                axios.post("/api/qtconstituent/", {
                    con: this.state.astrictList.map((item) => {
                        return ({
                            line: item.line,
                            name: item.name,
                            tfe: item.tfe,
                            sio2: item.sio2,
                            cao: item.cao,
                            mgo: item.mgo,
                            al2o3: item.al2o3,
                            k2o: item.k2o,
                            na2o: item.na2o,
                            s: item.s,
                            p: item.p,
                            tio2: item.tio2,
                            zno: item.zno,

                        })
                    })
                }, {
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
            } else {
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
        const data4 = this.state.SJ;

        const data3 = [];
        data.forEach((item, index) => {
            if (index === 24) {
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

        //console.log(data3)
        var option = {}
        let dataTable = []
        let dataTableTwo = []
        let dataTableThree = []
        let dataTableFour = []
        let objFour = {
            '球团S脱除率%': Number(this.state.cansetValues.a1).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.a1).toFixed(2),
            "球团K2O脱除率%": Number(this.state.cansetValues.a2).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.a2).toFixed(2),
            "球团Na2O脱除率%": Number(this.state.cansetValues.a3).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.a3).toFixed(2),
            "球团ZnO脱除率%": Number(this.state.cansetValues.a4).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.a4).toFixed(2),
        }
        dataTableFour.push(objFour)
        for (let p = 0; p < this.state.astrictList.length; p++) {
            if (this.state.astrictList) {
                let objThree = {
                    '': this.state.astrictList[p].name,  // '列名': 数据
                    '品味': Number(this.state.astrictList[p].tfe).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].tfe).toFixed(2),
                    'SiO2': Number(this.state.astrictList[p].sio2).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].sio2).toFixed(2),
                    'CaO': Number(this.state.astrictList[p].cao).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].cao).toFixed(2),
                    'MgO': Number(this.state.astrictList[p].mgo).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].mgo).toFixed(2),
                    'AL2O3': Number(this.state.astrictList[p].al2o3).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].al2o3).toFixed(2),
                    'K2O': Number(this.state.astrictList[p].k2o).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].k2o).toFixed(2),
                    'Na2O': Number(this.state.astrictList[p].na2o).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].na2o).toFixed(2),
                    'S': Number(this.state.astrictList[p].s).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].s).toFixed(2),
                    'P': Number(this.state.astrictList[p].p).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].p).toFixed(2),
                    'TiO2': Number(this.state.astrictList[p].tio2).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].tio2).toFixed(2),
                    'ZnO': Number(this.state.astrictList[p].zno).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].zno).toFixed(2),
                }
                dataTableThree.push(objThree);
            }
        }
        let objTwo = {
            'TFe': Number(data4.tfe).toFixed(2) === "NaN" ? null : Number(data4.tfe).toFixed(2),
            "SiO2": Number(data4.sio2).toFixed(2) === "NaN" ? null : Number(data4.sio2).toFixed(2),
            "CaO": Number(data4.cao).toFixed(2) === "NaN" ? null : Number(data4.cao).toFixed(2),
            "Al2O3": Number(data4.al2o3).toFixed(2) === "NaN" ? null : Number(data4.al2o3).toFixed(2),
            'MgO': Number(data4.mgo).toFixed(2) === "NaN" ? null : Number(data4.mgo).toFixed(2),
            "S": Number(data4.s).toFixed(4) === "NaN" ? null : Number(data4.s).toFixed(4),
            "P": Number(data4.p).toFixed(4) === "NaN" ? null : Number(data4.p).toFixed(4),
            "ZnO": Number(data4.zno).toFixed(4) === "NaN" ? null : Number(data4.zno).toFixed(4),
            "k2O": Number(data4.k2o).toFixed(2) === "NaN" ? null : Number(data4.k2o).toFixed(4),
            "Na2O": Number(data4.na2o).toFixed(4) === "NaN" ? null : Number(data4.na2o).toFixed(4),
            "TiO2": Number(data4.tio2).toFixed(4) === "NaN" ? null : Number(data4.tio2).toFixed(4),
        }
        dataTableTwo.push(objTwo)

        for (let i = 0; i < data3.length; i++) {
            if (data3) {
                let obj = {
                    '名称': data3[i].name,  // '列名': 数据
                    '配料量Kg': Number(data3[i].pll).toFixed(2) === "NaN" || Number(data3[i].pll).toFixed(2) === "0.00" ? null : Number(data3[i].pll).toFixed(2),
                    '矿耗百分比%': Number(data3[i].radio).toFixed(2) === "NaN" || Number(data3[i].radio).toFixed(2) === "0.00" ? null : Number(data3[i].radio).toFixed(2),
                    '成本': Number(data3[i].cb).toFixed(2) === "NaN" || Number(data3[i].cb).toFixed(2) === "0.00" ? null : Number(data3[i].cb).toFixed(2),
                    '成本百分比%': Number(data3[i].cbb).toFixed(2) === "NaN" || Number(data3[i].cbb).toFixed(2) === "0.00" ? null : Number(data3[i].cbb).toFixed(2),
                    '价格': Number(data3[i].price).toFixed(2) === "NaN" || Number(data3[i].price).toFixed(2) === "0.00" ? null : Number(data3[i].price).toFixed(2),
                    'TFe': Number(data3[i].tfe).toFixed(2) === "NaN" || Number(data3[i].tfe).toFixed(2) === "0.00" ? null : Number(data3[i].tfe).toFixed(2),
                    'SiO2': Number(data3[i].sio2).toFixed(2) === "NaN" || Number(data3[i].sio2).toFixed(2) === "0.00" ? null : Number(data3[i].sio2).toFixed(2),
                    'CaO': Number(data3[i].cao).toFixed(2) === "NaN" || Number(data3[i].cao).toFixed(2) === "0.00" ? null : Number(data3[i].cao).toFixed(2),
                    'MgO': Number(data3[i].mgo).toFixed(2) === "NaN" || Number(data3[i].mgo).toFixed(2) === "0.00" ? null : Number(data3[i].mgo).toFixed(2),
                    'Al2O3': Number(data3[i].al2o3).toFixed(2) === "NaN" || Number(data3[i].al2o3).toFixed(2) === "0.00" ? null : Number(data3[i].al2o3).toFixed(2),
                    '烧损': Number(data3[i].loi).toFixed(2) === "NaN" || Number(data3[i].loi).toFixed(2) === "0.00" ? null : Number(data3[i].loi).toFixed(2),
                    'K2O': Number(data3[i].k2o).toFixed(4) === "NaN" || Number(data3[i].k2o).toFixed(4) === "0.0000" ? null : Number(data3[i].k2o).toFixed(4),
                    'Na2O': Number(data3[i].na2o).toFixed(4) === "NaN" || Number(data3[i].na2o).toFixed(4) === "0.0000" ? null : Number(data3[i].na2o).toFixed(4),
                    'ZnO': Number(data3[i].zno).toFixed(4) === "NaN" || Number(data3[i].zno).toFixed(4) === "0.0000" ? null : Number(data3[i].zno).toFixed(4),
                    'S': Number(data3[i].s).toFixed(4) === "NaN" || Number(data3[i].s).toFixed(4) === "0.0000" ? null : Number(data3[i].s).toFixed(4),
                    'P': Number(data3[i].p).toFixed(4) === "NaN" || Number(data3[i].p).toFixed(4) === "0.0000" ? null : Number(data3[i].p).toFixed(4),
                    'TiO2': Number(data3[i].tio2).toFixed(4) === "NaN" || Number(data3[i].tio2).toFixed(4) === "0.0000" ? null : Number(data3[i].tio2).toFixed(4),
                    '上限': Number(data3[i].sx).toFixed(2) === "NaN" || Number(data3[i].sx).toFixed(2) === "0.00" ? null : Number(data3[i].sx).toFixed(2),
                    '下限': Number(data3[i].xx).toFixed(2) === "NaN" || Number(data3[i].xx).toFixed(2) === "0.00" ? null : Number(data3[i].xx).toFixed(2),
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
        option.fileName = '球团成本优化--' + dateFormat  //导出的Excel文件名
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: '球团成本优化',
                sheetFilter: ['名称', "配料量Kg", '矿耗百分比%', "成本", "成本百分比%", "价格", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "烧损", "K2O", "Na2O", "ZnO", "S", "P", "TiO2", "上限", "下限"],
                sheetHeader: ['名称', "配料量Kg", '矿耗百分比%', "成本", "成本百分比%", "价格", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "烧损", "K2O", "Na2O", "ZnO", "S", "P", "TiO2", "上限", "下限"],
            }, {
                sheetData: dataTableTwo,
                sheetName: '球团矿化学成分表',
                sheetFilter: ['TFe', "SiO2", "CaO", "Al2O3", 'MgO', "S", "P", "ZnO", "k2O", "Na2O", "TiO2"],
                sheetHeader: ['TFe', "SiO2", "CaO", "Al2O3", 'MgO', "S", "P", "ZnO", "k2O", "Na2O", "TiO2"],
            }, {
                sheetData: dataTableThree,
                sheetName: '球团限制条件',
                sheetFilter: ["", '品味', "SiO2", "CaO", "AL2O3", 'MgO', "S", "P", "ZnO", "K2O", "Na2O",],
                sheetHeader: ["", '品味', "SiO2", "CaO", "AL2O3", 'MgO', "S", "P", "ZnO", "K2O", "Na2O",],
            }, {
                sheetData: dataTableFour,
                sheetName: '球团参数设置',
                sheetFilter: ["球团S脱除率%", '球团K2O脱除率%', "球团Na2O脱除率%", "球团ZnO脱除率%",],
                sheetHeader: ["球团S脱除率%", '球团K2O脱除率%', "球团Na2O脱除率%", "球团ZnO脱除率%",],
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
                this.setState({
                    ListData: this.state.ListData
                })
            }
        })
    }
    render() {
        return (
            <div>
                <span className="daochuzuijia">
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
                </span>
                <div className="aaa">
                    <div className="tableone">
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
                                    <td>烧损</td>
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
                                                        value={item.tfe === str || item.tfe === "0.00" ? null : item.tfe}
                                                        onChange={this.infoKuang("tfe", index).bind(this)}
                                                    />
                                                </td>
                                                <td><Input
                                                    value={item.sio2 === str || item.sio2 === "0.00" ? null : item.sio2}
                                                    onChange={this.infoKuang("sio2", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.cao === str || item.cao === "0.00" ? null : item.cao}
                                                    onChange={this.infoKuang("cao", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.mgo === str || item.mgo === "0.00" ? null : item.mgo}
                                                    onChange={this.infoKuang("mgo", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.al2o3 === str || item.al2o3 === "0.00" ? null : item.al2o3}
                                                    onChange={this.infoKuang("al2o3", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.loi === str || item.loi === "0.00" ? null : item.loi}
                                                    onChange={this.infoKuang("loi", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    value={item.k2o === strFour || item.k2o === "0.0000" ? null : item.k2o}
                                                    onChange={this.infoKuang("k2o", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.na2o === strFour || item.na2o === "0.0000" ? null : item.na2o}
                                                    onChange={this.infoKuang("na2o", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.zno === strFour || item.zno === "0.0000" ? null : item.zno}
                                                    onChange={this.infoKuang("zno", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.s === strFour || item.s === "0.0000" ? null : item.s}
                                                    onChange={this.infoKuang("s", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.p === strFour || item.p === "0.0000" ? null : item.p}
                                                    onChange={this.infoKuang("p", index).bind(this)}
                                                /></td>
                                                <td><Input
                                                    value={item.tio2 === strFour || item.tio2 === "0.0000" ? null : item.tio2}
                                                    onChange={this.infoKuang("tio2", index).bind(this)}
                                                /></td>

                                                <td>
                                                    <Input onChange={this.infoKuang("price", index).bind(this)}
                                                        value={item.price === "0.00" || item.price === str ? null : item.price}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onChange={this.infoKuang("sx", index).bind(this)}
                                                        value={item.sx === "0.00" || item.sx === str ? null : item.sx}
                                                    />
                                                </td>
                                                <td> <Input onChange={this.infoKuang("xx", index).bind(this)}
                                                    value={item.xx === "0.00" || item.xx === str ? null : item.xx}
                                                /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <span>
                            <span className="tishixinxi">1-18:球团矿粉/19-24皂土熔剂&nbsp;&nbsp;&nbsp;&nbsp;配比单位：%</span>
                            <span className="work">
                                <Button type="primary" onClick={this.daoRu.bind(this)}>导入球团矿粉</Button>
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
                                    <td>品位,%</td>
                                    <td>SiO2,%</td>
                                    <td>CaO,%</td>
                                    <td>MgO,%</td>
                                    <td>AL2O3,%</td>
                                    <td>K2O,%</td>
                                    <td>Na2O,%</td>
                                    <td>S,%</td>
                                    <td>P,%</td>
                                    <td>TiO2,%</td>
                                    <td>ZnO,%</td>

                                </tr>
                                {
                                    this.state.astrictList.map((item, index) => {
                                        return (
                                            <tr className="youhua" key={index}>
                                                <td>{index === 0 ? '上限' : "下限"}</td>
                                                <td>
                                                    <Input
                                                        value={item.tfe === str || item.tfe === 0 ? null : item.tfe}
                                                        onChange={this.astrict("tfe", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.sio2 === str || item.sio2 === 0 ? null : item.sio2}
                                                        onChange={this.astrict("sio2", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.cao === str || item.cao === 0 ? null : item.cao}
                                                        onChange={this.astrict("cao", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.mgo === str || item.mgo === 0 ? null : item.mgo}
                                                        onChange={this.astrict("mgo", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.al2o3 === str || item.al2o3 === 0 ? null : item.al2o3}
                                                        onChange={this.astrict("al2o3", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.k2o === strFour || item.k2o === 0 ? null : item.k2o}
                                                        onChange={this.astrict("k2o", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.na2o === strFour || item.na2o === 0 ? null : item.na2o}
                                                        onChange={this.astrict("na2o", index).bind(this)} />
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
                                                        value={item.tio2 === strFour || item.tio2 === 0 ? null : item.tio2}
                                                        onChange={this.astrict("tio2", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.zno === strFour || item.zno === 0 ? null : item.zno}
                                                        onChange={this.astrict("zno", index).bind(this)} />
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
                    title={this.state.model === "BudgetFen" ? <BuildTitle title="导入球团矿粉" /> : <BuildTitle title="球团矿粉参数" />}
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
                            this.state.model === "canset" ? <WrappedcanSet ref="canSet" cansetValues={this.state.cansetValues} /> :
                                <BudgetMingXi conputedInfo={this.state.conputedInfo} />
                    }
                </Modal>
            </div>

        )
    }
}