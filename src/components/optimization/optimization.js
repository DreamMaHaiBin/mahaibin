import React, { Component } from "react";
import BuildTitle from "../model/model"
import axios from "axios";
import "./option.css"
import ExportJsonExcel from 'js-export-excel';
import { Modal, Input, Button, message, Checkbox } from "antd";
import WrappedBudgetFen from "./daoru.js"
import BudgetMingXi from "./context.js"
import WrappedcanSet from "./canSet.js"
const list = []
for (let i = 0; i < 24; i++) {
    list.push({
        line: i + 1,
        name: null,
        isTotal: false,
        purpose: 10,
        asO: null,
        tfe: null,
        xx: null,
        sx: null,
        siO2: null,
        caO: null,
        mgO: null,
        al2O3: null,
        lOI: null,
        feO: null,
        k2O: null,
        na2O: null,
        znO: null,
        s: null,
        p: null,
        tiO2: null,
        sRatio: null,
        price: null,
        ratio: null,
        r: null,
        esti: null,
        pbO: null,

    });
}
const str = "0.00"
const strFour = "0.0000"
export default class Optimization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],//获取烧结前16行的列表
            model: "",//点击选择是哪一个弹窗
            number: 1,//空  还没有赋值
            value: "",
            ListDataKuang: [],//通过结口获取参数17条的页面参数，暂时先不用。
            ListData: list,
            astrictList: [ //上线下线表格的基本数据
                {
                    name: "上限",
                    pbO: null,
                    siO2: null,
                    caO: null,
                    mgO: null,
                    al2O3: null,
                    k2O: null,
                    naO: null,
                    znO: null,
                    s: null,
                    p: null,
                    tiO2: null,
                    tfe: null,
                    r: null,
                    asO: null,
                    line: 1,
                }, {
                    name: "下限",
                    pbO: null,
                    siO2: null,
                    caO: null,
                    mgO: null,
                    al2O3: null,
                    k2O: null,
                    naO: null,
                    znO: null,
                    s: null,
                    p: null,
                    tiO2: null,
                    tfe: null,
                    r: null,
                    asO: null,
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
            save:false,
        }
    }
    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    //模态床的确定按钮
    handleOk() {
        if (this.state.model === "BudgetFen") {
            this.refs.BudgetFenYouHua.validateFields((err, values) => {
                if (err) {
                    this.setState({
                        confirmLoading: false,
                    });
                } else {

                    if (this.state.infoValueName === "铁矿粉") {
                        this.state.SanFang.forEach((item) => {
                            if (item.name === values.name && item.incomingDate === values.time) {
                               
                                const newListData = this.state.ListData.slice(0);
                                const newSanFang = Object.assign({}, item);
                             //   console.log(this.state.ListData[this.state.navData-1].sx);
                                newSanFang.source["name"] = newSanFang.name;
                                newSanFang.source["lOI"] = newSanFang.source.loI;
                                newSanFang.source["tfe"] = newSanFang.source.tFe;
                                newSanFang.source["price"] = newSanFang.priceOre;
                                newSanFang.source["ratio"] = 0;                         
                                newSanFang.source["line"] = this.state.navData
                                newSanFang.source["sx"] = this.state.ListData[this.state.navData-1].sx //配比是否显示
                                newSanFang.source["xx"] = this.state.ListData[this.state.navData-1].xx //配比是否显示
                                newListData[this.state.navData - 1] = newSanFang.source;
                                this.setState({
                                    ListData: newListData,
                                    visible: false
                                })
                                //  //console.log(this.state.ListData);
                            }
                        })
                    } else if (this.state.infoValueName === "熔剂") {
                        this.state.SanFang.forEach((item) => {
                            if (item.name === values.name && item.incomingDate === values.time) {
                                //  //console.log(item);
                                const newListData = this.state.ListData.slice(0);
                                const newSanFang = Object.assign({}, item);
                                newSanFang["line"] = this.state.navData
                                newSanFang["caO"] = newSanFang.CaO
                                newSanFang["feO"] = newSanFang.FeO
                                newSanFang["k2O"] = newSanFang.K2O
                               newSanFang["sx"] = this.state.ListData[this.state.navData-1].sx //配比是否显示
                               newSanFang["xx"] = this.state.ListData[this.state.navData-1].xx //配比是否显示
                                newSanFang["lOI"] = newSanFang.LOI;
                                newSanFang["mgO"] = newSanFang.MgO
                                newSanFang["na2O"] = newSanFang.Na2O
                                newSanFang["siO2"] = newSanFang.SiO2
                                newSanFang["tfe"] = newSanFang.TFe
                                newSanFang["mnO"] = newSanFang.MnO
                                newSanFang["pbO"] = newSanFang.PbO
                                newSanFang["asO"] = newSanFang.AsO
                                newSanFang["tiO2"] = newSanFang.TiO2
                                newSanFang["znO"] = newSanFang.ZnO
                                newSanFang["al2O3"] = newSanFang.Al2O3
                                newSanFang["s"] = newSanFang.S
                                newSanFang["p"] = newSanFang.P
                                newListData[this.state.navData - 1] = newSanFang;
                                this.setState({
                                    ListData: newListData,
                                    visible: false
                                })
                            }
                        })
                    } else if (this.state.infoValueName === "固废") {
                        this.state.SanFang.forEach((item) => {
                            if (item.name === values.name && item.incomingDate === values.time) {
                                // //console.log(item);
                                const newListData = this.state.ListData.slice(0);
                                const newSanFang = Object.assign({}, item);
                                newSanFang["line"] = this.state.navData
                                newSanFang["caO"] = newSanFang.CaO
                                newSanFang["feO"] = newSanFang.FeO
                                newSanFang["k2O"] = newSanFang.K2O
                                newSanFang["lOI"] = newSanFang.LOI
                                newSanFang["mgO"] = newSanFang.MgO
                                newSanFang["na2O"] = newSanFang.Na2O
                                newSanFang["siO2"] = newSanFang.SiO2
                                newSanFang["tfe"] = newSanFang.TFe
                                newSanFang["tiO2"] = newSanFang.TiO2
                                newSanFang["znO"] = newSanFang.ZnO
                                newSanFang["pbO"] = newSanFang.PbO
                                newSanFang["asO"] = newSanFang.AsO
                                newSanFang["mnO"] = newSanFang.MnO
                                newSanFang["al2O3"] = newSanFang.Al2O3
                                newSanFang["s"] = newSanFang.S
                                newSanFang["p"] = newSanFang.P
                                 newSanFang["sx"] = this.state.ListData[this.state.navData-1].sx //配比是否显示
                                 newSanFang["xx"] = this.state.ListData[this.state.navData-1].xx //配比是否显示
                                newListData[this.state.navData - 1] = newSanFang;
                                this.setState({
                                    ListData: newListData,
                                    visible: false
                                })
                            }
                        })
                    } else if (this.state.infoValueName === "焦粉") {
                        this.state.SanFang.forEach((item) => {
                            if (item.name === values.name && item.incomingDate === values.time) {
                                //console.log(item);
                                const newListData = this.state.ListData.slice(0);
                                const newSanFang = Object.assign({}, item);
                                newSanFang["line"] = this.state.navData
                                newSanFang["caO"] = newSanFang.CaO
                                newSanFang["feO"] = newSanFang.FeO
                                newSanFang["k2O"] = newSanFang.K2O
                                newSanFang["lOI"] = newSanFang.LOI
                                newSanFang["mgO"] = newSanFang.MgO
                                newSanFang["na2O"] = newSanFang.Na2O
                                newSanFang["siO2"] = newSanFang.SiO2
                                newSanFang["tfe"] = "0.00"
                                newSanFang["tiO2"] = newSanFang.TiO2
                                newSanFang["znO"] = newSanFang.ZnO
                                newSanFang["pbO"] = newSanFang.PbO
                                newSanFang["asO"] = newSanFang.AsO
                                newSanFang["mnO"] = newSanFang.MnO
                                newSanFang["al2O3"] = newSanFang.Al2O3
                                newSanFang["p"] = newSanFang.P
                                newSanFang["sx"] = this.state.ListData[this.state.navData-1].sx //配比是否显示
                                newSanFang["xx"] = this.state.ListData[this.state.navData-1].xx //配比是否显示
                                newListData[this.state.navData - 1] = newSanFang;
                                this.setState({
                                    ListData: newListData,
                                    visible: false
                                })
                            }
                        })
                    } else if (this.state.infoValueName === "煤粉") {
                        this.state.SanFang.forEach((item) => {
                            if (item.name === values.name && item.incomingDate === values.time) {
                                //console.log(item);
                                const newListData = this.state.ListData.slice(0);
                                const newSanFang = Object.assign({}, item);
                                newSanFang["line"] = this.state.navData
                                newSanFang["caO"] = newSanFang.CaO
                                newSanFang["feO"] = newSanFang.FeO
                                newSanFang["k2O"] = newSanFang.K2O
                                newSanFang["lOI"] = newSanFang.LOI;
                                newSanFang["mgO"] = newSanFang.MgO
                                newSanFang["na2O"] = newSanFang.Na2O
                                newSanFang["siO2"] = newSanFang.SiO2
                                newSanFang["tfe"] = "0.00"
                                newSanFang["mnO"] = newSanFang.MnO
                                newSanFang["pbO"] = newSanFang.PbO
                                newSanFang["asO"] = newSanFang.AsO
                                newSanFang["tiO2"] = newSanFang.TiO2
                                newSanFang["znO"] = newSanFang.ZnO
                                newSanFang["al2O3"] = newSanFang.Al2O3                        
                                newSanFang["p"] = newSanFang.P
                                newSanFang["sx"] = this.state.ListData[this.state.navData-1].sx //配比是否显示
                                 newSanFang["xx"] = this.state.ListData[this.state.navData-1].xx //配比是否显示
                                newListData[this.state.navData - 1] = newSanFang;
                                this.setState({
                                    ListData: newListData,
                                    visible: false
                                })
                            }
                        })
                    }
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
    }
    handleCancel = e => {
        //////console.log(e);
        this.setState({
            visible: false,
        });
    };
    //生命周期，在组见挂在之前
    UNSAFE_componentWillMount() {
        axios.get("/api/parameter/?classify=1", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            this.setState({
                cansetValues: res.data
            })
        })
        axios.get("/api/dos/", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            res.data.dos.forEach((item) => {
                item.tfe = Number(item.tfe).toFixed(2);
                item.siO2 = Number(item.siO2).toFixed(2);     // 二氧化硅含量
                item.caO = Number(item.caO).toFixed(2);    // 氧化钙含量
                item.mgO = Number(item.mgO).toFixed(2);        // 氧化镁含量
                item.al2O3 = Number(item.al2O3).toFixed(2);    // 氧化铝含量
                item.lOI = Number(item.lOI).toFixed(2);     // 烧损
                item.feO = Number(item.feO).toFixed(2);        // 氧化铁含量
                item.k2O = Number(item.k2O).toFixed(4);       // 氧化钾含量
                item.na2O = Number(item.na2O).toFixed(4);       // 氧化钠含量
                item.znO = Number(item.znO).toFixed(4);         // 氧化锌含量
                item.s = Number(item.s).toFixed(4);         // 硫含量
                item.p = Number(item.p).toFixed(4);         // 磷含量
                item.tiO2 = Number(item.tiO2).toFixed(4);        // 氧化钛含量
                item.pbO = Number(item.pbO).toFixed(4);        // 氧化铅含量
                item.asO = Number(item.asO).toFixed(4);        // 氧化砷含量
                item.xx = Number(item.xx).toFixed(2);        //上限
                item.sx = Number(item.sx).toFixed(2);        // 下限
                item.price = Number(item.price).toFixed(2);        // 下限

            })
            ////console.log(res)
            this.setState({
                ListData: res.data.dos
            })
        })
        axios.get("/api/estimate-para-sq/recent/?purpose=1", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            res.data.outHM = Number(res.data.outHM).toFixed(2);
            res.data.f1 = Number(res.data.f1).toFixed(2);
            res.data.f2 = Number(res.data.f2).toFixed(2);
            res.data.f3 = Number(res.data.f3).toFixed(2);
            res.data.f4 = Number(res.data.f4).toFixed(2);
            res.data.feOS = Number(res.data.feOS).toFixed(2);
            res.data.cMS = Number(res.data.cMS).toFixed(2);
            res.data.fCMB = Number(res.data.fCMB).toFixed(2);
            res.data.dustS = Number(res.data.dustS).toFixed(2);
            res.data.dustSFe = Number(res.data.dustSFe).toFixed(2);
            //////console.log(res)
            this.setState({
                setNewList: res.data
            })
        })
        axios.get("/api/constituent/", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            ////console.log(res);
            res.data.con.forEach((item) => {
                item.tfe = Number(item.tfe).toFixed(2);
                item.siO2 = Number(item.siO2).toFixed(2);     // 二氧化硅含量
                item.caO = Number(item.caO).toFixed(2);    // 氧化钙含量
                item.mgO = Number(item.mgO).toFixed(2);        // 氧化镁含量
                item.al2O3 = Number(item.al2O3).toFixed(2);    // 氧化铝含量
                item.k2O = Number(item.k2O).toFixed(4);       // 氧化钾含量
                item.naO = Number(item.naO).toFixed(4);       // 氧化钠含量
                item.znO = Number(item.znO).toFixed(4);         // 氧化锌含量
                item.s = Number(item.s).toFixed(4);         // 硫含量
                item.p = Number(item.p).toFixed(4);         // 磷含量
                item.na2O = Number(item.na2O).toFixed(4);
                item.tiO2 = Number(item.tiO2).toFixed(4);        // 氧化钛含量
                item.asO = Number(item.asO).toFixed(2); // 价格
                item.pbO = Number(item.pbO).toFixed(2);
                item.r = Number(item.r).toFixed(2);
            })

            this.setState({
                astrictList: res.data.con
            })
        })

    }
    valueNameRadio(info) {
        ////console.log(info)
        this.setState({
            infoValueName: info
        })
    }
    //导入的数据
    bbbb(value) {
        //////console.log(value)
        this.setState({
            SanFang: value
        })

    }
    //排序的顺序序号
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
    //表格输入的情况
    infoKuang(name, index) {
        return (e) => {
            const value = e.target.value === undefined ? e.target.checked : e.target.value;
            Number(value).toFixed(2)
            const newData = this.state.ListData;
            newData[index][name] = value;
            this.setState({ ListData: newData })
            //console.log(this.state.ListData)
        
        }
    }
    //上线下线的输入表格
    astrict(tfe, index) {
        return (e) => {
            const value = e.target.value;
            const newData = this.state.astrictList;
            newData[index][tfe] = value;
            this.setState({ astrictList: newData })
            ////console.log(this.state.astrictList[0])
        }

    }
    //计算
    jiSuan() {
        this.setState({
            flag: true
        })
        this.state.astrictList.forEach((item) => {
            
        })
        axios.post("/api/count/", {
            dos:
                this.state.ListData.map((item, index) => {
                    return (
                        {
                            name: item.name,
                            line: item.line,     //序号Number(data3[i].cb).toFixed(2)
                            tfe: item.tfe === "" || item.tfe === null ? "0.00" : Number(item.tfe).toFixed(2),     // 全铁含量
                            siO2: item.siO2=== "" || item.siO2 === null ? "0.00" : Number(item.siO2).toFixed(2),     // 二氧化硅含量
                            caO: item.caO=== "" || item.caO === null ? "0.00" : Number(item.caO).toFixed(2),     // 氧化钙含量
                            mgO: item.mgO=== "" || item.mgO === null ? "0.00" : Number(item.mgO).toFixed(2),         // 氧化镁含量
                            al2O3: item.al2O3=== "" || item.al2O3 === null ? "0.00" : Number(item.al2O3).toFixed(2),    // 氧化铝含量
                            lOI: item.lOI=== "" || item.lOI === null ? "0.00" : Number(item.lOI).toFixed(2),      // 烧损
                            feO: item.feO=== "" || item.feO === null ? "0.00" : Number(item.feO).toFixed(2),        // 氧化铁含量
                            k2O: item.k2O=== "" || item.k2O === null ? "0.0000" : Number(item.k2O).toFixed(4),         // 氧化钾含量
                            na2O: item.na2O=== "" || item.na2O === null ? "0.0000" : Number(item.na2O).toFixed(4),        // 氧化钠含量
                            znO: item.znO=== "" || item.znO === null ? "0.0000" : Number(item.znO).toFixed(4),         // 氧化锌含量
                            s: item.s=== "" || item.s === null ? "0.0000" : Number(item.s).toFixed(4),           // 硫含量
                            p: item.p=== "" || item.p === null ? "0.0000" : Number(item.p).toFixed(4),          // 磷含量
                            tiO2: item.tiO2=== "" || item.tiO2 === null ? "0.0000" : Number(item.tiO2).toFixed(4),        // 氧化钛含量
                            price: item.price=== "" || item.price === null ? "0.00" : Number(item.price).toFixed(2),  // 价格
                            pbO: item.pbO=== "" || item.pbO === null ? "0.00" : Number(item.pbO).toFixed(2),
                            asO: item.asO=== "" || item.asO === null ? "0.00" : Number(item.asO).toFixed(2),
                            sx: item.sx=== "" || item.sx === null ? "0.00" : Number(item.sx).toFixed(2),
                            xx: item.xx=== "" || item.xx === null ? "0.00" : Number(item.xx).toFixed(2),
                            r: item.r=== "" || item.r === null ? "0.00" : Number(item.r).toFixed(2),
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
                            siO2: item.siO2=== "" || item.siO2 === null ? "0.00" :  Number(item.siO2).toFixed(2),     // 二氧化硅含量
                            caO: item.caO=== "" || item.caO === null ? "0.00" :  Number(item.caO).toFixed(2),     // 氧化钙含量
                            mgO: item.mgO=== "" || item.mgO === null ? "0.00" : Number(item.mgO).toFixed(2),         // 氧化镁含量
                            al2O3: item.al2O3=== "" || item.al2O3 === null ? "0.00" :  Number(item.al2O3).toFixed(2),    // 氧化铝含量
                            feO: item.feO=== "" || item.feO === null ? "0.00" :  Number(item.feO).toFixed(2),        // 氧化铁含量
                            k2O: item.k2O=== "" || item.k2O === null ? "0.0000" :  Number(item.k2O).toFixed(4),         // 氧化钾含量
                            na2O: item.na2O=== "" || item.na2O === null ? "0.0000" :  Number(item.na2O).toFixed(4),        // 氧化钠含量
                            znO: item.znO=== "" || item.znO === null ? "0.0000" :  Number(item.znO).toFixed(4),         // 氧化锌含量
                            s: item.s=== "" || item.s === null ? "0.0000" :  Number(item.s).toFixed(4),           // 硫含量
                            p: item.p=== "" || item.p === null ? "0.0000" :  Number(item.p).toFixed(4),          // 磷含量
                            tiO2: item.tiO2=== "" || item.tiO2 === null ? "0.0000" : Number(item.tiO2).toFixed(2),        // 氧化钛含量
                            r: item.r=== "" || item.r === null ? "0.00" :  Number(item.r).toFixed(2),           // 烧结矿碱度
                            pbO: item.pbO=== "" || item.pbO === null ? "0.00" :  Number(item.pbO).toFixed(2),
                            asO: item.asO=== "" || item.asO === null ? "0.00" :  Number(item.asO).toFixed(2),

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
                    save:res.data.save
                })
            } else if (res.data.code === 0) {
                message.error("计算失败！")
                this.setState({
                    boolen: false,
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
    //保存
    baoCun() {
        
            if (this.state.number === 2) {
                if(this.state.save){
                this.setState({
                    flag: true,
                })
                axios.post("/api/dos/", {
                    dos:
                        this.state.ListData.map((item, index) => {
                            return (
                                {
                                    name: item.name,
                                    line: item.line,     //序号
                                    tfe: item.tfe === "" || item.tfe === null ? "0.00" : item.tfe,     // 全铁含量
                                    siO2: item.siO2=== "" || item.siO2 === null ? "0.00" : item.siO2,     // 二氧化硅含量
                                    caO: item.caO=== "" || item.caO === null ? "0.00" : item.caO,     // 氧化钙含量
                                    mgO: item.mgO=== "" || item.mgO === null ? "0.00" : item.mgO,         // 氧化镁含量
                                    al2O3: item.al2O3=== "" || item.al2O3 === null ? "0.00" : item.al2O3,    // 氧化铝含量
                                    lOI: item.lOI=== "" || item.lOI === null ? "0.00" : item.lOI,      // 烧损
                                    feO: item.feO=== "" || item.feO === null ? "0.00" : item.feO,        // 氧化铁含量
                                    k2O: item.k2O=== "" || item.k2O === null ? "0.00" : item.k2O,         // 氧化钾含量
                                    na2O: item.na2O=== "" || item.na2O === null ? "0.00" : item.na2O,        // 氧化钠含量
                                    znO: item.znO=== "" || item.znO === null ? "0.00" : item.znO,         // 氧化锌含量
                                    s: item.s=== "" || item.s === null ? "0.00" : item.s,           // 硫含量
                                    p: item.p=== "" || item.p === null ? "0.00" : item.p,          // 磷含量
                                    tiO2: item.tiO2=== "" || item.tiO2 === null ? "0.00" : item.tiO2,        // 氧化钛含量
                                    price: item.price=== "" || item.price === null ? "0.00" : item.price,  // 价格
                                    pbO: item.pbO=== "" || item.pbO === null ? "0.00" : item.pbO,
                                    asO: item.asO=== "" || item.asO === null ? "0.00" : item.asO,
                                    sx: item.sx=== "" || item.sx === null ? "0.00" : item.sx,
                                    xx: item.xx=== "" || item.xx === null ? "0.00" : item.xx,
                                    r: item.r=== "" || item.r === null ? "0.00" : item.r,
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
                axios.post("/api/constituent/", {
                    con: this.state.astrictList.map((item) => {
                        return ({
                            line: item.line,
                            name: item.name,
                            tfe: item.tfe,
                            siO2: item.siO2,
                            caO: item.caO,
                            mgO: item.mgO,
                            al2O3: item.al2O3,
                            r: item.r,
                            k2O: item.k2O,
                            na2O: item.na2O,
                            s: item.s,
                            p: item.p,
                            tiO2: item.tiO2,
                            znO: item.znO,
                            pbO: item.pbO,
                            asO: item.asO,
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
    //生成excel表格
    ExportToExcel() {
        const data = this.state.HTYLORE // 准备的数据
        const data2 = this.state.ListData// 准备的数据
        const data4 = this.state.SJ
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
        var option = {}
        let dataTable = []
        let dataTableTwo = []
        let dataTableThree = []
        let dataTableFour = []
        let objFour = {
            '烧结S脱除率%': Number(this.state.cansetValues.a1).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.a1).toFixed(2),
            "烧结K2O脱除率%": Number(this.state.cansetValues.a2).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.a2).toFixed(2),
            "烧结Na2O脱除率%": Number(this.state.cansetValues.a3).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.a3).toFixed(2),
            "烧结ZnO脱除率%": Number(this.state.cansetValues.a4).toFixed(2) === "NaN" ? null : Number(this.state.cansetValues.a4).toFixed(2),
        }
        dataTableFour.push(objFour)
        for (let p=0;p<this.state.astrictList.length;p++) {
            if (this.state.astrictList) {
                let objThree = {
                    '': this.state.astrictList[p].name,  // '列名': 数据
                    '品味': Number(this.state.astrictList[p].tfe).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].tfe).toFixed(2),
                    'SiO2': Number(this.state.astrictList[p].siO2).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].siO2).toFixed(2),
                    'CaO': Number(this.state.astrictList[p].caO).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].caO).toFixed(2),
                    'MgO': Number(this.state.astrictList[p].mgO).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].mgO).toFixed(2),
                    'AL2O3': Number(this.state.astrictList[p].al2O3).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].al2O3).toFixed(2),
                    '碱度': Number(this.state.astrictList[p].r).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].r).toFixed(2),
                    'K2O': Number(this.state.astrictList[p].k2O).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].k2O).toFixed(2),
                    'Na2O': Number(this.state.astrictList[p].na2O).toFixed(2) === "NaN" ? null : Number(this.state.astrictList[p].na2O).toFixed(2),
                    'S': Number(this.state.astrictList[p].s).toFixed(4) === "NaN" ? null : Number(this.state.astrictList[p].s).toFixed(4),
                    'P': Number(this.state.astrictList[p].p).toFixed(4) === "NaN" ? null : Number(this.state.astrictList[p].p).toFixed(4),
                    'TiO2': Number(this.state.astrictList[p].tiO2).toFixed(4) === "NaN" ? null : Number(this.state.astrictList[p].tiO2).toFixed(4),
                    'ZnO': Number(this.state.astrictList[p].znO).toFixed(4) === "NaN" ? null : Number(this.state.astrictList[p].znO).toFixed(4),
                    'PbO': Number(this.state.astrictList[p].pbO).toFixed(4) === "NaN" ? null : Number(this.state.astrictList[p].pbO).toFixed(4),
                    'AsO': Number(this.state.astrictList[p].asO).toFixed(4) === "NaN" ? null : Number(this.state.astrictList[p].asO).toFixed(4),
                }
                dataTableThree.push(objThree);
            }
        }
        let objTwo = {
            'TFe': Number(data4.tfe).toFixed(2) === "NaN" ? null : Number(data4.tfe).toFixed(2),
            "SiO2": Number(data4.siO2).toFixed(2) === "NaN" ? null : Number(data4.siO2).toFixed(2),
            "CaO": Number(data4.caO).toFixed(2) === "NaN" ? null : Number(data4.caO).toFixed(2),
            'MgO': Number(data4.mgO).toFixed(2) === "NaN" ? null : Number(data4.mgO).toFixed(2),
            "S": Number(data4.s).toFixed(4) === "NaN" ? null : Number(data4.s).toFixed(4),
            "P": Number(data4.p).toFixed(4) === "NaN" ? null : Number(data4.p).toFixed(4),
            "pbO": Number(data4.pbO).toFixed(4) === "NaN" ? null : Number(data4.pbO).toFixed(4),
            "ZnO": Number(data4.znO).toFixed(4) === "NaN" ? null : Number(data4.znO).toFixed(4),
            "k2O": Number(data4.k2O).toFixed(4) === "NaN" ? null : Number(data4.k2O).toFixed(4),
            "AsO": Number(data4.asO).toFixed(4) === "NaN" ? null : Number(data4.asO).toFixed(4),
            "TiO2": Number(data4.tiO2).toFixed(4) === "NaN" ? null : Number(data4.tiO2).toFixed(4),
            "R": Number(data4.r).toFixed(4) === "NaN" ? null : Number(data4.r).toFixed(4),
        }
        dataTableTwo.push(objTwo)

        for (let i=0;i<data.length;i++) {
            if (data3) {
                let obj = {
                    '名称': data3[i].name,  // '列名': 数据
                    '配料量Kg': Number(data3[i].pll).toFixed(2) === "NaN" ? null : Number(data3[i].pll).toFixed(2),
                    '百分比': Number(data3[i].radio).toFixed(2) === "NaN" ? null : Number(data3[i].radio).toFixed(2),
                    '含铁料': Number(data3[i].htl).toFixed(2) === "NaN" ? null : Number(data3[i].htl).toFixed(2),
                    '成本': Number(data3[i].cb).toFixed(2) === "NaN" ? null : Number(data3[i].cb).toFixed(2),
                    '价格': Number(data3[i].price).toFixed(2) === "NaN" ? null : Number(data3[i].price).toFixed(2),
                    'TFe': Number(data3[i].tfe).toFixed(2) === "NaN" ? null : Number(data3[i].tfe).toFixed(2),
                    'SiO2': Number(data3[i].siO2).toFixed(2) === "NaN" ? null : Number(data3[i].siO2).toFixed(2),
                    'CaO': Number(data3[i].caO).toFixed(2) === "NaN" ? null : Number(data3[i].caO).toFixed(2),
                    'MgO': Number(data3[i].mgO).toFixed(2) === "NaN" ? null : Number(data3[i].mgO).toFixed(2),
                    'Al2O3': Number(data3[i].al2O3).toFixed(2) === "NaN" ? null : Number(data3[i].al2O3).toFixed(2),
                    '烧损': Number(data3[i].lOI).toFixed(2) === "NaN" ? null : Number(data3[i].lOI).toFixed(2),
                    'FeO': Number(data3[i].feO).toFixed(2) === "NaN" ? null : Number(data3[i].feO).toFixed(2),
                    'K2O': Number(data3[i].k2O).toFixed(4) === "NaN" ? null : Number(data3[i].k2O).toFixed(4),
                    'Na2O': Number(data3[i].na2O).toFixed(4) === "NaN" ? null : Number(data3[i].na2O).toFixed(4),
                    'ZnO': Number(data3[i].znO).toFixed(4) === "NaN" ? null : Number(data3[i].znO).toFixed(4),
                    'S': Number(data3[i].s).toFixed(4) === "NaN" ? null : Number(data3[i].s).toFixed(4),
                    'P': Number(data3[i].p).toFixed(4) === "NaN" ? null : Number(data3[i].p).toFixed(4),
                    'TiO2': Number(data3[i].tiO2).toFixed(4) === "NaN" ? null : Number(data3[i].tiO2).toFixed(4),
                    'PbO': Number(data3[i].pbO).toFixed(4) === "NaN" ? null : Number(data3[i].pbO).toFixed(4),
                    'AsO': Number(data3[i].asO).toFixed(4) === "NaN" ? null : Number(data3[i].asO).toFixed(4),
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
        option.fileName = '烧结铁水成本优化--' + dateFormat  //导出的Excel文件名
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: '烧结铁水成本优化',
                sheetFilter: ['名称', "配料量Kg", '百分比', "含铁料", "成本", "价格", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "烧损", "FeO", "K2O", "Na2O", "ZnO", "S", "P", "TiO2","PbO","AsO", "上限", "下限"],
                sheetHeader: ['名称', "配料量Kg", '百分比', "含铁料", "成本", "价格", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "烧损", "FeO", "K2O", "Na2O", "ZnO", "S", "P", "TiO2","PbO","AsO","上限", "下限"],
            }, {
                sheetData: dataTableTwo,
                sheetName: '烧结成分表',
                sheetFilter: ['TFe', "SiO2", "CaO", 'MgO', "S", "P", "PbO", "ZnO", "K2O", "AsO", "TiO2","R",],
                sheetHeader: ['TFe', "SiO2", "CaO", 'MgO', "S", "P", "PbO", "ZnO", "K2O", "AsO", "TiO2","R",],
            }, {
                sheetData: dataTableThree,
                sheetName: '烧结限制条件',
                sheetFilter: ["", '品味', "SiO2", "CaO", "AL2O3", 'MgO', "S", "P", "ZnO", "K2O", "Na2O","PbO","AsO"],
                sheetHeader: ["", '品味', "SiO2", "CaO", "AL2O3", 'MgO', "S", "P", "ZnO", "K2O", "Na2O","PbO","AsO"],
            }, {
                sheetData: dataTableFour,
                sheetName: '烧结参数设置',
                sheetFilter: ["烧结S脱除率%", '烧结K2O脱除率%', "烧结Na2O脱除率%", "烧结ZnO脱除率%",],
                sheetHeader: ["烧结S脱除率%", '烧结K2O脱除率%', "烧结Na2O脱除率%", "烧结ZnO脱除率%",],
            }
        ]

        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }
    //删除表格前的复选框状态
    clearItem() {
        this.state.ListData.forEach((item, index) => {
            if (item.bolen) {
                item.bolen = false
                item.al2O3 = null
                item.caO = null
                item.k2O = null
                item.lOI = null
                item.mgO = null
                item.na2O = null
                item.name = null
                item.p = null
                item.s = null
                item.siO2 = null
                item.sx = null
                item.tfe = null
                item.tiO2 = null
                item.xx = null
                item.znO = null
                item.price = null
                item.ratio = null
                item.feO = null
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
                                    <td>FeO</td>
                                    <td>K2O</td>
                                    <td>Na2O</td>
                                    <td>ZnO</td>
                                    <td>S</td>
                                    <td>P</td>
                                    <td>TiO2</td>
                                    <td>PbO</td>
                                    <td>AsO</td>
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

                                                    value={item.siO2 === str ? null : item.siO2}
                                                    onChange={this.infoKuang("siO2", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.caO === str ? null : item.caO}
                                                    onChange={this.infoKuang("caO", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.mgO === str ? null : item.mgO}
                                                    onChange={this.infoKuang("mgO", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.al2O3 === str ? null : item.al2O3}
                                                    onChange={this.infoKuang("al2O3", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.lOI === str ? null : item.lOI}
                                                    onChange={this.infoKuang("lOI", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    value={item.feO === str || item.feO === 0 ? null : item.feO}
                                                    onChange={this.infoKuang("feO", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.k2O === strFour || item.k2O === 0 ? null : item.k2O}
                                                    onChange={this.infoKuang("k2O", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.na2O === strFour || item.na2O === 0 ? null : item.na2O}
                                                    onChange={this.infoKuang("na2O", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.znO === strFour || item.znO === 0 ? null : item.znO}
                                                    onChange={this.infoKuang("znO", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.s === strFour || item.s === 0 ? null : item.s}
                                                    onChange={this.infoKuang("s", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.p === strFour || item.p === 0 ? null : item.p}
                                                    onChange={this.infoKuang("p", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.tiO2 === strFour || item.tiO2 === 0 ? null : item.tiO2}
                                                    onChange={this.infoKuang("tiO2", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.pbO === strFour || item.pbO === 0 ? null : item.pbO}
                                                    onChange={this.infoKuang("pbO", index).bind(this)}
                                                /></td>
                                                <td><Input

                                                    value={item.asO === 0 || item.asO === strFour ? null : item.asO}
                                                    onChange={this.infoKuang("asO", index).bind(this)}
                                                /></td>
                                                <td>
                                                    <Input onChange={this.infoKuang("price", index).bind(this)}
                                                        value={item.price === 0 || item.price === str ? null : item.price}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onChange={this.infoKuang("sx", index).bind(this)}
                                                        value={item.sx === 0 || item.sx === str ? null : item.sx}
                                                    />
                                                </td>
                                                <td> <Input onChange={this.infoKuang("xx", index).bind(this)}
                                                    value={item.xx === 0 || item.xx === str ? null : item.xx}
                                                /></td>

                                            </tr>
                                        )



                                    })
                                }
                            </tbody>
                        </table>
                        <span>
                            <span className="tishixinxi">1-10:内配烧结矿粉&nbsp;&nbsp;&nbsp;&nbsp;配比单位：%</span>
                            <span className="work">
                                <Button type="primary" onClick={this.daoRu.bind(this)}>导入烧结矿粉</Button>
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
                                    <td>碱度,:</td>
                                    <td>K2O,%</td>
                                    <td>Na2O,%</td>
                                    <td>S,%</td>
                                    <td>P,%</td>
                                    <td>TiO2,%</td>
                                    <td>ZnO,%</td>
                                    <td>PbO,%</td>
                                    <td>AsO,%</td>
                                </tr>
                                {
                                    this.state.astrictList.map((item, index) => {
                                        return (
                                            <tr className="youhua" key={index}>
                                                <td>{item.name}</td>
                                                <td>
                                                    <Input
                                                        value={item.tfe === str ? null : item.tfe}
                                                        onChange={this.astrict("tfe", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.siO2 === str ? null : item.siO2}
                                                        onChange={this.astrict("siO2", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.caO === str ? null : item.caO}
                                                        onChange={this.astrict("caO", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.mgO === str ? null : item.mgO}
                                                        onChange={this.astrict("mgO", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.al2O3 === str ? null : item.al2O3}
                                                        onChange={this.astrict("al2O3", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.r === str ? null : item.r}
                                                        onChange={this.astrict("r", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.k2O === strFour ? null : item.k2O}
                                                        onChange={this.astrict("k2O", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.na2O === strFour ? null : item.na2O}
                                                        onChange={this.astrict("na2O", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.s === strFour ? null : item.s}
                                                        onChange={this.astrict("s", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.p === strFour ? null : item.p}
                                                        onChange={this.astrict("p", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.tiO2 === strFour ? null : item.tiO2}
                                                        onChange={this.astrict("tiO2", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.znO === strFour ? null : item.znO}
                                                        onChange={this.astrict("znO", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.pbO === strFour ? null : item.pbO}
                                                        onChange={this.astrict("pbO", index).bind(this)} />
                                                </td>
                                                <td>
                                                    <Input
                                                        value={item.asO === strFour ? null : item.asO}
                                                        onChange={this.astrict("asO", index).bind(this)} />
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
                    title={this.state.model === "BudgetFen" ? <BuildTitle title="导入烧结矿粉" /> : this.state.model === "canset" ? "参数设置" : <BuildTitle title="计算结果" />}
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