import React, { Component } from "react";
import "../cossalculation.css"
import axios from "axios";
import ExportJsonExcel from 'js-export-excel';
import WrappedBudgetFen from "../shaojie/daoru.js"
import BuildTitle from "../../model/model"
import { Modal, Input, Button, message, Checkbox, Tooltip } from "antd";
import WrappedFeiliao from "../shaojie/gufeu"
import WrappedGongFei from "../shaojie/kbjgf"
import WrappedBuGuDing from "../shaojie/gdjgf"
import JiaoFen from "../shaojie/jiaofen"
import MeiFen from "../shaojie/meifen"
import BudgetMingXi from "../shaojie/mingxi"
import GanShi from "../shaojie/ganshi.js"
const list = []

for (let i = 0; i < 24; i++) {
    list.push({
        line: i + 1,
        name: null,
        isTotal: false,
        purpose: 10,
        tFe: null,
        siO2: null,
        caO: null,
        mgO: null,
        al2O3: null,
        loI: null,
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
        h2o: null,
        spb: null,
        sjjg: null,
        r: null,
        esti: null,
    });

}

const str = "0.00"
const strFour = "0.0000"
export default class ShaoJie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],//获取烧结前16行的列表
            model: "",//点击选择是哪一个弹窗
            listNumber: [],//空  还没有赋值
            InputValue: "", //暂时么还有用到
            value: "",
            ListDataKuang: [],//通过结口获取参数17条的页面参数，暂时先不用。
            ListData: list,
            navData: "", //该状态为选中子组件的序号的状态
            setNewList://该状态为参数设置需要传给后端的数据
            {
                outHM: 0,
                f1: 0,
                f2: 0,
                f3: 0,
                f4: 0,
                feOS: 0,
                cMS: 0,
                fCMB: 0,
                dustS: 0,
                dustSFe: 0,
                esti: 1,
                m:0
            },
            GufeiListJieShou: '',
            GuChengBen: 0,//计算结果总成本
            AllRanShao: 0,//燃烧计算结果总成本
            RjChengBen: 0,
            RlChengBenL: 0,
            JgfChengBen: 0,
            ChuChen: 0,
            ShaoJieZong: 0,
            AllFuHe: {
                tFe: 0,
                siO2: 0,
                caO: 0,
                mgO: 0,
                al2O3: 0,
                r: 0,
                SBurden: 0,
                KNaBurden: 0,
                ZnBurden: 0,
            },//负荷
            ListBian: 0,//可变加工费的值
            ChengBenMingXi: {},//成本明细
            SanFang: [],
            boolen: true,
            flag: false,
            keep: null,
            tscb: 0,
            HTYLORE: [],//含铁原料ore
            RJORE: [],
            RLORE: [],
            HTYLZ: "",//导出含铁原料
            RJZ: "",//导出溶剂
            RLZ: "",//导出燃料
            JGFZ: "",
            HEJI: "",
            SJH: "",
            number: 1,
            clear: "",
            happy: false,
            tabKeys: this.props.keys,
            radioName: "",
            dataMeiFen: "",
            dataJiaoFen: "",
            gaoluOne: [],
            gaoluTwo: [],
            gaoluThree: [],
            luzhaOne: {},
            luzhaTwo: {},
            luzhaThree: {},
            hjOne: '',
            hjTwo: '',
            hjThree: '',
            outSone: "",//高炉一铁水参数
            outStwo: "",//高炉二铁水参数
            outSthree: "",//高炉三铁水参数
            dataNumber: '',
            num: 2,

        }
        //console.log(this.props.keys)
    }
    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk() {
        if (this.state.model === "BudgetFen") {
            this.refs.BudgetFen.validateFields((err, values) => {
                if (err) {
                    this.setState({
                        confirmLoading: false,
                    });
                } else {
                    //console.log(this.state.radioName)
                    if (this.state.radioName === "熔剂") {
                        this.state.SanFang.forEach((item) => {
                            if (item.name === values.name && item.incomingDate === values.time) {

                                const newListData = this.state.ListData.slice(0);
                                const newSanFang = Object.assign({}, item);
                                console.log(this.state.ListData[this.state.navData - 1])
                                newSanFang["line"] = this.state.navData
                                newSanFang["caO"] = newSanFang.CaO
                                newSanFang["feO"] = newSanFang.FeO
                                newSanFang["k2O"] = newSanFang.K2O
                                newSanFang["loI"] = newSanFang.LOI
                                newSanFang["mgO"] = newSanFang.MgO
                                newSanFang["na2O"] = newSanFang.Na2O
                                newSanFang["siO2"] = newSanFang.SiO2
                                newSanFang["tFe"] = newSanFang.TFe
                                newSanFang["tiO2"] = newSanFang.TiO2
                                newSanFang["znO"] = newSanFang.ZnO
                                newSanFang["al2O3"] = newSanFang.Al2O3
                                newSanFang["s"] = newSanFang.S
                                newSanFang["p"] = newSanFang.P
                                newSanFang["ratio"] = this.state.ListData[this.state.navData - 1].ratio //配比是否显示
                                newListData[this.state.navData - 1] = newSanFang;
                                this.setState({
                                    ListData: newListData,
                                    visible: false
                                })
                            }
                        })
                    } else {
                        this.state.SanFang.forEach((item) => {
                            if (item.name === values.name && item.incomingDate === values.time) {
                                const newListData = this.state.ListData.slice(0);
                                const newSanFang = Object.assign({}, item);
                                console.log(newSanFang)
                                console.log(this.state.ListData[this.state.navData - 1]);
                                newSanFang.source["name"] = newSanFang.name;
                                newSanFang.source["price"] = newSanFang.priceOre;
                                newSanFang.source["ratio"] = 0;
                                newSanFang.source["h2o"] = newSanFang.source.h2O;

                                newSanFang.source["line"] = this.state.navData
                                newSanFang.source["ratio"] = this.state.ListData[this.state.navData - 1].ratio //配比是否显示
                                newListData[this.state.navData - 1] = newSanFang.source;
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
        if (this.state.model === "BudgetFeiliao") {
            const newData = this.state.ListData.slice(0);
            if (this.state.GufeiListJieShou === "") {
                this.setState({
                    visible: true,
                })
                message.warning("导入不能为空！请先点击计算或者取消按钮！")
            } else {
                if (this.state.GufeiListJieShou !== "") {
                    const newSanFang = Object.assign({}, this.state.GufeiListJieShou);

                    newData[16] = newSanFang
                    newData[16]["name"] = "固废"
                    newData[16]["line"] = 17
                    this.setState({
                        visible: false,
                        ListData: newData
                    })
                } else {
                    const newSanFang = Object.assign({}, list[16]);
                    newData[16] = newSanFang
                    newData[16]["name"] = "固废"
                    newData[16]["line"] = 17
                    this.setState({
                        ListData: newData
                    })
                    this.setState({
                        visible: false,
                    })
                }
            }

        }
        if (this.state.model === "BudgetMingXi") {
            this.setState({
                visible: false,
            })
        }
        if (this.state.model === "ganshi") {
            this.setState({
                visible: false,
            })
        }
        if (this.state.model === "BudgetJiaGongFei") {

            if (this.state.ListBian === 0) {
                this.setState({
                    visible: true
                })
                message.warning("导入不能为空！请先点击计算按钮！")
            } else {
                const newData = this.state.setNewList;
                const newSanFang = Object.assign(this.state.ListBian);
                newData.cMS = newSanFang;
                //////console.log(newSanFang, newData.cMS)
                this.setState({
                    setNewList: newData,
                    visible: false,
                })
            }
        }
        if (this.state.model === "BudgetBuGuDing") {
            if (this.state.GuChengBen === 0) {
                this.setState({
                    visible: true
                })
                message.warning("导入不能为空！请先点击计算按钮！")
            } else {

                const newData = this.state.setNewList;
                const newSanFang = Object.assign(this.state.GuChengBen);
                newData.fCMB = newSanFang;
                this.setState({
                    setNewList: newData,
                    visible: false,
                })
            }

        }
        if (this.state.model === "jiaofen") {
            const newData = this.state.ListData.slice(0);
            if (this.state.dataJiaoFen === "") {
                this.setState({
                    visible: true
                })
                message.warning("导入不能为空！请先点击计算按钮！")
            } else {
                const newSanFang = Object.assign({}, this.state.dataJiaoFen);
                newData[22] = newSanFang
                newData[22]["name"] = "焦粉"
                newData[22]["line"] = 23
                this.setState({
                    visible: false,
                    ListData: newData
                })
            }

        }
        if (this.state.model === "meifen") {
            // dataJiaoFen
            const newData = this.state.ListData.slice(0);
            if (this.state.dataMeiFen === "") {
                this.setState({
                    visible: true
                })
                message.warning("导入不能为空！请先点击计算按钮！")
            } else {
                const newSanFang = Object.assign({}, this.state.dataMeiFen);
                newData[23] = newSanFang
                newData[23]["name"] = "煤粉"
                newData[23]["line"] = 24
                this.setState({
                    visible: false,
                    ListData: newData
                })
            }
        }
    };

    handleCancel = e => {
        //////console.log(e);
        this.setState({
            visible: false,
        });
    };
    componentWillMount() {
        axios.get(`/api/estimate-ore/recent/?purpose=201`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            res.data.forEach((item) => {
                item.tFe = Number(item.tFe).toFixed(2);
                item.siO2 = Number(item.siO2).toFixed(2);     // 二氧化硅含量
                item.caO = Number(item.caO).toFixed(2);    // 氧化钙含量
                item.mgO = Number(item.mgO).toFixed(2);        // 氧化镁含量
                item.al2O3 = Number(item.al2O3).toFixed(2);    // 氧化铝含量
                item.loI = Number(item.loI).toFixed(2);     // 烧损
                item.feO = Number(item.feO).toFixed(2);        // 氧化铁含量
                item.k2O = Number(item.k2O).toFixed(4);       // 氧化钾含量
                item.na2O = Number(item.na2O).toFixed(4);       // 氧化钠含量
                item.znO = Number(item.znO).toFixed(4);         // 氧化锌含量
                item.s = Number(item.s).toFixed(4);         // 硫含量
                item.p = Number(item.p).toFixed(4);         // 磷含量
                item.tiO2 = Number(item.tiO2).toFixed(4);        // 氧化钛含量
                item.sRatio = Number(item.sRatio).toFixed(2);     // 入炉料筛下率
                item.price = Number(item.price).toFixed(2); // 价格
                item.ratio = Number(item.ratio).toFixed(2);        // 配比
                item.h2o = Number(item.h2o).toFixed(2);        // 配比
                item.spb = Number(item.spb).toFixed(2);        // 配比
                item.sjjg = Number(item.sjjg).toFixed(2);        // 配比
            })
            //////console.log(res)
            this.setState({
                ListData: res.data
            })
            const sub = {
                dataNumber: 0
            }
            res.data.forEach((item, index) => {
                if (index <= 9) {
                    sub.dataNumber += Number(item.ratio)
                }
            })
            //  console.log(sub.dataNumber)
            this.setState({
                dataNumber: sub.dataNumber
            })
        })
        axios.get(`/api/estimate-para-sq/recent/?purpose=201`, {
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
            res.data.m = Number(res.data.m).toFixed(2);
            //////console.log(res)
            this.setState({
                setNewList: res.data
            })
        })
        // setTimeout(() => {
        //烧结信息
        axios.get("/api/ore/?ordering=-createTime&incomingDate=&purpose=1", {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            // //////console.log(res.data.results)
            this.setState({
                data: res.data.results
            })
        })
        //最近参数设置信息
        axios.get(`/api/estimate-para-gl/recent/?purpose=203`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            // console.log(res);
            res.data.outS = Number(res.data.outS).toFixed(2)
            this.setState({
                luzhaOne: res.data,
                outSone: res.data.outS
            })
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
    valueNameRadio(radio) {
        this.setState({
            radioName: radio
        })

    }
    //废料
    feiliao() {
        this.setState({
            visible: true,
            model: "BudgetFeiliao",
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
    //可变
    keBian() {
        this.setState({
            visible: true,
            model: "BudgetJiaGongFei",
        })
    }
    //固定
    guDing() {
        this.setState({
            visible: true,
            model: "BudgetBuGuDing",
        })
    }
    //煤粉接收
    setMeiFen(value) {
        //console.log(value)
        this.setState({
            dataMeiFen: value,
        })
    }
    //焦粉接收
    setJiaoFen(value) {
        //console.log(value)
        this.setState({
            dataJiaoFen: value,
        })
    }
    /*
                  
                  ydbs:
                      价格=湿价格/（100-水分）*100，和湿配比一样处理
  
                      ydbs:
                      先检查湿配比是否为空，
                      1、湿配比为空或0，配比=输入的配比
                      2、湿配比不为空，配比=湿配比*（100-水分）/100,
                      3、计算式先计算配比插入配比栏在进行计算以前按钮功能
                                          (this.state.SJH.precent1).toFixed(2)
                  */
    infoKuang(name, index) {
        return (e) => {
            const value = e.target.value === undefined ? e.target.checked : e.target.value;
            const newData = this.state.ListData;
            newData[index][name] = value;
            this.setState({ ListData: newData })

            const sub = {
                dataNumber: 0
            }
            if (name === 'spb') {
                if (this.state.ListData[index][name] !== '' && Number(this.state.ListData[index][name]) !== 0 && String(Number(this.state.ListData[index][name])) !== 'NaN') {
                    this.state.ListData[index]['ratio'] = (this.state.ListData[index]['spb'] * (100 - this.state.ListData[index]['h2o']) / 100).toFixed(2)
                }
                if (this.state.ListData[index]['ratio'] === 'NaN') {
                    this.state.ListData[index]['ratio'] = newData[index][name]
                }
            }
            if (name == 'sjjg') {
                if (this.state.ListData[index][name] !== "" && Number(this.state.ListData[index][name]) !== 0 && String(Number(this.state.ListData[index][name])) !== 'NaN') {
                    this.state.ListData[index]['price'] = (this.state.ListData[index][name] / (100 - this.state.ListData[index]['h2o']) * 100).toFixed(2)
                }
                if (this.state.ListData[index]['price'] === 'NaN') {
                    this.state.ListData[index]['price'] = newData[index][name]
                }
            }
            if (name === 'h2o') {
                if(Number(this.state.ListData[index]['h2o']) >= '80'){
                    message.warning('水分不要超过80，否则容易导致计算失误')
                    this.state.ListData[index]['h2o']= ''
                }
                if (this.state.ListData[index]['spb'] !== '' && Number(this.state.ListData[index]['spb']) !== 0) {
                    this.state.ListData[index]['ratio'] = (this.state.ListData[index]['spb'] * (100 - this.state.ListData[index]['h2o']) / 100).toFixed(2)
                }
                if (this.state.ListData[index]['sjjg'] !== "" && Number(this.state.ListData[index]['sjjg']) !== 0) {
                    this.state.ListData[index]['price'] = (this.state.ListData[index]['sjjg'] / (100 - this.state.ListData[index]['h2o']) * 100).toFixed(2)
                }
                if (this.state.ListData[index]['ratio'] === 'NaN') {
                    this.state.ListData[index]['ratio'] = ''
                }
                if (this.state.ListData[index]['price'] === 'NaN') {
                    this.state.ListData[index]['price'] = ''
                }
            }
            console.log((this.state.ListData[index]['sjjg'] / (100 - this.state.ListData[index]['h2o']) * 100).toFixed(2))
            this.state.ListData.map((item, idx) => {
                if (idx <= 9) {
                    sub.dataNumber += Number(item.ratio)
                }
            })
            this.setState({ ListData: this.state.ListData }, () => {
                console.log(this.state.ListData)
            })
            this.setState({
                dataNumber: sub.dataNumber
            })

        }
    }
    //参数设置的部分
    handleGetInputValue(outHM) {
        return (e) => {
            const value = e.target.value;
            const newList = this.state.setNewList;
            newList[outHM] = value;
            this.setState({ setNewList: newList })
            //////console.log(this.state.setNewList)
        }
    }
    infoGufei(v) {
        console.log(v);

        this.setState({
            GufeiListJieShou: v
        })
    }
    jiSuan() {
        this.setState({
            flag: true,
        })
        axios.post("/api/estimate-sq/", {
            purpose: 201,

            para: {
                purpose: 201,
                outHM: this.state.setNewList.outHM === "" ? "0.00" : this.state.setNewList.outHM,
                f1: this.state.setNewList.f1 === "" ? "0.00" : this.state.setNewList.f1,
                f2: this.state.setNewList.f2 === "" ? "0.00" : this.state.setNewList.f2,
                f3: this.state.setNewList.f3 === "" ? "0.00" : this.state.setNewList.f3,
                f4: this.state.setNewList.f4 === "" ? "0.00" : this.state.setNewList.f4,
                feOS: this.state.setNewList.feOS === "" ? "0.00" : this.state.setNewList.feOS,
                cMS: this.state.setNewList.cMS === "" ? "0.00" : this.state.setNewList.cMS,
                fCMB: this.state.setNewList.fCMB === "" ? "0.00" : this.state.setNewList.fCMB,
                dustS: this.state.setNewList.dustS === "" ? "0.00" : this.state.setNewList.dustS,
                dustSFe: this.state.setNewList.dustSFe === "" ? "0.00" : this.state.setNewList.dustSFe,
                m: this.state.setNewList.m === "" || this.state.setNewList.m === 0 ? "1" : this.state.setNewList.m,
            },
            ore:
                this.state.ListData.map((item, index) => {
                    return (
                        {
                            name: item.name,
                            purpose: 201,
                            line: item.line,     //序号
                            tFe: item.tFe === "" || item.tFe === null ? str : item.tFe,     // 全铁含量
                            siO2: item.siO2 === "" || item.siO2 === null ? str : item.siO2,     // 二氧化硅含量
                            caO: item.caO === "" || item.caO === null ? str : item.caO,     // 氧化钙含量
                            mgO: item.mgO === "" || item.mgO === null ? str : item.mgO,         // 氧化镁含量
                            al2O3: item.al2O3 === "" || item.al2O3 === null ? str : item.al2O3,    // 氧化铝含量
                            loI: item.loI === "" || item.loI === null ? str : item.loI,      // 烧损
                            feO: item.feO === "" || item.feO === null ? str : item.feO,        // 氧化铁含量
                            k2O: item.k2O === "" || item.k2O === null ? str : item.k2O,         // 氧化钾含量
                            na2O: item.na2O === "" || item.na2O === null ? str : item.na2O,        // 氧化钠含量
                            znO: item.znO === "" || item.znO === null ? str : item.znO,         // 氧化锌含量
                            s: item.s === "" || item.s === null ? str : item.s,           // 硫含量
                            p: item.p === "" || item.p === null ? str : item.p,          // 磷含量
                            tiO2: item.tiO2 === "" || item.tiO2 === null ? str : item.tiO2,        // 氧化钛含量
                            sRatio: item.sRatio === "" || item.sRatio === null ? str : item.sRatio,     // 入炉料筛下率
                            price: item.price === "" || item.price === null ? str : item.price,  // 价格
                            ratio: item.ratio === "" || item.ratio === null ? str : item.ratio,        // 配比
                            esti: 1,
                            r: null,           // 烧结矿碱度
                        }

                    )
                })
        }, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            message.success("计算完成")
            //console.log(res)
            this.setState({
                AllRanShao: res.data.cost.htyl.signalPUnit,//含铁料
                ChengBenMingXi: res.data,//成本明细
                RjChengBen: res.data.cost.rj.signalPUnit,//rj总成本
                RlChengBenL: res.data.cost.rl.signalPUnit,//rl总成本
                JgfChengBen: res.data.cost.jgf.signalPUnit,//加工费成本
                ChuChen: res.data.cost.sjh.signalPUnit,//烧结灰成本
                ShaoJieZong: res.data.cost.hj.signalPUnit,//烧结总成本
                AllFuHe: res.data.source,//负荷
                boolen: false,
                tscb: res.data.tscb,//全场铁水总成本
                HTYLORE: res.data.cost.htyl.ore,
                RJORE: res.data.cost.rj.ore,
                RLORE: res.data.cost.rl.ore,
                HTYLZ: res.data.cost.htyl,
                RJZ: res.data.cost.rj,
                RLZ: res.data.cost.rl,
                JGFZ: res.data.cost.jgf,
                HEJI: res.data.cost.hj,
                SJH: res.data.cost.sjh,
                flag: false,
                number: 2,
            })

            axios.post("/api/estimate-gl/", {
                sole: 1,
                purpose: 203,
                para: {
                    purpose: 203, // 9: 高炉计算
                    felron: Number(this.state.luzhaOne.felron).toFixed(2),       // 铁水铁含量
                    silron: Number(this.state.luzhaOne.silron).toFixed(2),      // 铁水硅含量
                    f10: Number(this.state.luzhaOne.f10).toFixed(2),           // S渣铁分配比
                    f11: Number(this.state.luzhaOne.f11).toFixed(2),            // Ti收得率
                    f13: Number(this.state.luzhaOne.f13).toFixed(2),           // 入炉品位升降1%加扣燃料比
                    f14: Number(this.state.luzhaOne.f14).toFixed(2),
                    f15: Number(this.state.luzhaOne.f15).toFixed(2),
                    f9: Number(this.state.luzhaOne.f9).toFixed(2),        // Fe元素渣中分配比
                    f12: Number(this.state.luzhaOne.f12).toFixed(2),           // 渣中其他成分含量
                    cmr: Number(this.state.luzhaOne.cmr).toFixed(2),        // 吨铁回收成本
                    bashBurdenFe: Number(this.state.luzhaOne.bashBurdenFe).toFixed(2),   // 基准入炉品位
                    outS: Number(this.state.luzhaOne.outS).toFixed(2),        // 铁水产量
                    dustB: Number(this.state.luzhaOne.dustB).toFixed(2),         // 高炉灰产生量
                    dustBFe: Number(this.state.luzhaOne.dustBFe).toFixed(2),         // 高炉灰品位
                    cmd: Number(this.state.luzhaOne.cmd).toFixed(2),    // 高炉可变加工费
                    fcms: Number(this.state.luzhaOne.fcms).toFixed(2),  // 高炉固定加工费
                    isFixAlkali: false,       // 是否固定碱度
                    rslag: Number(this.state.luzhaOne.rslag).toFixed(2),        // 炉渣碱度
                    sjId: this.state.luzhaOne.sjId,          // 选择烧结行号
                    qtId: this.state.luzhaOne.qtId,         // 选择球团行号
                    esti: 1
                },
                ore:
                    this.props.gaoluOne.map((item, index) => {
                        return (
                            {
                                name: item.name,
                                isTotal: false,
                                purpose: 203,
                                line: item.line,
                                tFe: index === 7 ? res.data.jsjg.tFe : item.tFe === "" || item.tFe === null ? item.tFe = 0 : item.tFe,
                                siO2: index === 7 ? res.data.jsjg.siO2 : item.siO2 === "" || item.siO2 === null ? item.siO2 = 0 : item.siO2,
                                caO: index === 7 ? res.data.jsjg.caO : item.caO === "" || item.caO === null ? item.caO = 0 : item.caO,
                                mgO: index === 7 ? res.data.jsjg.mgO : item.mgO === "" || item.mgO === null ? item.mgO = 0 : item.mgO,
                                al2O3: index === 8 ? res.data.jsjg.al2O3 : item.al2O3 === "" || item.al2O3 === null ? item.al2O3 = 0 : item.al2O3,
                                loI: index === 7 ? res.data.jsjg.loI : item.loI === "" || item.loI === null ? item.loI = 0 : item.loI,
                                feO: index === 7 ? res.data.jsjg.feO : item.feO === "" || item.feO === null ? item.feO = 0 : item.feO,
                                k2O: index === 7 ? res.data.jsjg.k2O : item.k2O === "" || item.k2O === null ? item.k2O = 0 : item.k2O,
                                na2O: index === 7 ? res.data.jsjg.na2O : item.na2O === "" || item.na2O === null ? item.na2O = 0 : item.na2O,
                                znO: index === 7 ? res.data.jsjg.znO : item.znO === "" || item.znO === null ? item.znO = 0 : item.znO,
                                s: index === 7 ? res.data.jsjg.p : item.s === "" || item.s === null ? item.s = 0 : item.s,
                                p: index === 7 ? res.data.jsjg.p : item.p === "" || item.p === null ? item.p = 0 : item.p,
                                tiO2: index === 7 ? res.data.jsjg.tiO2 : item.tiO2 === "" || item.tiO2 === null ? item.tiO2 = 0 : item.tiO2,
                                sRatio: index === 7 ? res.data.jsjg.sRatio : item.sRatio === "" || item.sRatio === null ? item.sRatio = 0 : item.sRatio,
                                price: index === 7 ? res.data.jsjg.price : item.price === "" || item.price === null ? item.price = 0 : item.price,
                                ratio: item.ratio,
                                r: item.r,
                                esti: 1,
                            }
                        )
                    })
            }, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res) => {
                this.setState({
                    hjOne: res.data.cost.hj.signalPUnit
                })
                //  console.log(res)
            })

        }).catch(err => {
            this.setState({
                flag: false,
            })
            //console.log(err)
            //////console.log(err)
            if (err.status === 500) {
                message.warning("服务器计算失误！请检查参数信息是否准确！")
            } else if (err.request.status === 400) {
                message.warning("请检查参数信息是否正确")
            } else if (err.request.status === 401) {
                message.warning("您没有权限!")
            }
        })

    }
    baoCun() {
        if (this.state.number === 2) {
            if (sessionStorage.getItem("permission3") === "false") {
                message.warning("注意！您没有保存的权限！")
                this.setState({
                    keep: true
                })
            } else if (sessionStorage.getItem("permission3") === "true") {
                this.setState({
                    keep: false,
                    flag: true,
                })
                axios.post("/api/estimate-sq-new/", {
                    purpose: 201,
                    save_flag: true,
                    para: {
                        purpose: 201,
                        outHM: this.state.setNewList.outHM === "" ? "0.00" : this.state.setNewList.outHM,
                        f1: this.state.setNewList.f1 === "" ? "0.00" : this.state.setNewList.f1,
                        f2: this.state.setNewList.f2 === "" ? "0.00" : this.state.setNewList.f2,
                        f3: this.state.setNewList.f3 === "" ? "0.00" : this.state.setNewList.f3,
                        f4: this.state.setNewList.f4 === "" ? "0.00" : this.state.setNewList.f4,
                        feOS: this.state.setNewList.feOS === "" ? "0.00" : this.state.setNewList.feOS,
                        cMS: this.state.setNewList.cMS === "" ? "0.00" : this.state.setNewList.cMS,
                        fCMB: this.state.setNewList.fCMB === "" ? "0.00" : this.state.setNewList.fCMB,
                        dustS: this.state.setNewList.dustS === "" ? "0.00" : this.state.setNewList.dustS,
                        dustSFe: this.state.setNewList.dustSFe === "" ? "0.00" : this.state.setNewList.dustSFe,
                        m: this.state.setNewList.m === "" || this.state.setNewList.m === 0 ? "1" : this.state.setNewList.m,
                    },
                    ore:
                        this.state.ListData.map((item, index) => {
                            return (
                                {
                                    name: item.name,
                                    purpose: 201,
                                    line: item.line,     //序号
                                    tFe: item.tFe === "" || item.tFe === null ? str : item.tFe,     // 全铁含量
                                    siO2: item.siO2 === "" || item.siO2 === null ? str : item.siO2,     // 二氧化硅含量
                                    caO: item.caO === "" || item.caO === null ? str : item.caO,     // 氧化钙含量
                                    mgO: item.mgO === "" || item.mgO === null ? str : item.mgO,         // 氧化镁含量
                                    al2O3: item.al2O3 === "" || item.al2O3 === null ? str : item.al2O3,    // 氧化铝含量
                                    loI: item.loI === "" || item.loI === null ? str : item.loI,      // 烧损
                                    feO: item.feO === "" || item.feO === null ? str : item.feO,        // 氧化铁含量
                                    k2O: item.k2O === "" || item.k2O === null ? str : item.k2O,         // 氧化钾含量
                                    na2O: item.na2O === "" || item.na2O === null ? str : item.na2O,        // 氧化钠含量
                                    znO: item.znO === "" || item.znO === null ? str : item.znO,         // 氧化锌含量
                                    s: item.s === "" || item.s === null ? str : item.s,           // 硫含量
                                    p: item.p === "" || item.p === null ? str : item.p,          // 磷含量
                                    tiO2: item.tiO2 === "" || item.tiO2 === null ? str : item.tiO2,        // 氧化钛含量
                                    sRatio: item.sRatio === "" || item.sRatio === null ? str : item.sRatio,     // 入炉料筛下率
                                    price: item.price === "" || item.price === null ? str : item.price,  // 价格
                                    ratio: item.ratio === "" || item.ratio === null ? str : item.ratio,        // 配比
                                    h2o: item.h2o === "" || item.h2o === null ? str : item.h2o,     // 入炉料筛下率
                                    spb: item.spb === "" || item.spb === null ? str : item.spb,  // 价格
                                    sjjg: item.sjjg === "" || item.sjjg === null ? str : item.sjjg,        // 配比
                                    esti: 1,
                                    r: null,           // 烧结矿碱度
                                }
                            )
                        })
                }, {
                    headers: {
                        Authorization: sessionStorage.getItem("token")
                    }
                }).then((res) => {
                    this.setState({
                        flag: false,
                        number: 3,
                    })
                    message.success("保存成功")
                }).catch(err => {
                    this.setState({
                        flag: false
                    })
                    console.log(err)
                    if (err.request.status === 500) {
                        message.warning("请检查参数信息是否正确!")
                    } else if (err.request.status === 400) {
                        message.warning("请检查参数信息是否正确!")
                    } else if (err.request.status === 401) {
                        message.warning("您没有权限!")
                    }
                })
            }

        } else if (this.state.number === 1) {
            message.warning("不能直接保存，请先计算!")
        } else if (this.state.number === 3) {
            message.warning("请不要连续点击保存！")
        }
    }
    //固定加工费接收
    infoGufeiHeJi(s) {
        // var GuChengBen = "";

        this.setState({
            GuChengBen: s
        })
        //////console.log(this.state.GuChengBen)
    }
    //可变加工费接收
    KeBianJIeShou(value) {
        value.forEach((item, index) => {
            if (index === 3) {
                item.signalPUnit = Number(item.signalPUnit).toFixed(2)
                this.setState({
                    ListBian: item.signalPUnit
                })
            }
        })
        //////console.log(this.state.ListBian)
    }
    //生成报告
    ExportToExcel() {
        const data = this.state.ListData // 准备的数据
        const data2 = this.state.HTYLORE // 准备的数据
        const data4 = this.state.RJORE // 准备的数据
        const data5 = this.state.RLORE // 准备的数据
        const data3 = [];
        data.forEach((item, index) => {
            data2.forEach((items, idx) => {
                if (index === idx) {
                    var obj = Object.assign(item, items);
                    data3.push(obj)
                }
            })
            data4.forEach((ite, i) => {
                if ((index >= 17 && index < 22) && index - 17 === i) {
                    //////console.log(ite)
                    var obj = Object.assign(ite, item);
                    data3.push(obj)
                }
            })
            data5.forEach((its, x) => {
                if ((index >= 22 && index < 24) && index - 22 === x) {
                    //////console.log(its)
                    var obj = Object.assign(its, item);
                    data3.push(obj)
                }
            })

        })
        //console.log(data3)
        var option = {}
        let dataTable = []
        if (this.state.HTYLZ) {
            let obj = {
                '名称': "含铁原料",// '列名': 数据
                '单价': Number(this.state.HTYLZ.signalPrice).toFixed(2),
                '单耗': Number(this.state.HTYLZ.signalUnit).toFixed(2),
                '百分比1': Number(this.state.HTYLZ.precent1).toFixed(2),
                '单成': Number(this.state.HTYLZ.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.HTYLZ.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }
        for (let i = 0; i < data3.length; i++) {
            if (data3 && i < 17) {
                let obj = {
                    '名称': data3[i].name,  // '列名': 数据
                    '单价': Number(data3[i].signalPrice).toFixed(2),
                    '单耗': Number(data3[i].signalUnit).toFixed(2),
                    '百分比1': Number(data3[i].precent1).toFixed(2),
                    '单成': Number(data3[i].signalPUnit).toFixed(2),
                    '百分比2': Number(data3[i].precent2).toFixed(2),
                    'TFe': Number(data3[i].tFe).toFixed(2),
                    'SiO2': Number(data3[i].siO2).toFixed(2),
                    'CaO': Number(data3[i].caO).toFixed(2),
                    'MgO': Number(data3[i].mgO).toFixed(2),
                    'Al2O3': Number(data3[i].al2O3).toFixed(2),
                    '烧损': Number(data3[i].loI).toFixed(2),
                    'FeO': Number(data3[i].feO).toFixed(2),
                    'K2O': Number(data3[i].k2O).toFixed(4),
                    'Na2O': Number(data3[i].na2O).toFixed(4),
                    'ZnO': Number(data3[i].znO).toFixed(4),
                    'S': Number(data3[i].s).toFixed(4),
                    'P': Number(data3[i].p).toFixed(4),
                    'TiO2': Number(data3[i].tiO2).toFixed(4),
                    '价格': Number(data3[i].price).toFixed(2),
                    '配比': Number(data3[i].ratio).toFixed(2),
                    '水分': Number(data3[i].h2o).toFixed(4),
                    '湿配比': Number(data3[i].spb).toFixed(2),
                    '湿基价格': Number(data3[i].sjjg).toFixed(2),
                }
                dataTable.push(obj);
            }
        }
        if (this.state.RJZ) {
            let obj = {
                '名称': "熔剂",// '列名': 数据
                '单价': Number(this.state.RJZ.signalPrice).toFixed(2),
                '单耗': Number(this.state.RJZ.signalUnit).toFixed(2),
                '百分比1': Number(this.state.RJZ.precent1).toFixed(2),
                '单成': Number(this.state.RJZ.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.RJZ.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }
        for (let i = 0; i < data3.length; i++) {
            if (data3 && i >= 17 && i < 22) {
                let obj = {
                    '名称': data3[i].name,  // '列名': 数据
                    '单价': Number(data3[i].signalPrice).toFixed(2),
                    '单耗': Number(data3[i].signalUnit).toFixed(2),
                    '百分比1': Number(data3[i].precent1).toFixed(2),
                    '单成': Number(data3[i].signalPUnit).toFixed(2),
                    '百分比2': Number(data3[i].precent2).toFixed(2),
                    'TFe': Number(data3[i].tFe).toFixed(2),
                    'SiO2': Number(data3[i].siO2).toFixed(2),
                    'CaO': Number(data3[i].caO).toFixed(2),
                    'MgO': Number(data3[i].mgO).toFixed(2),
                    'Al2O3': Number(data3[i].al2O3).toFixed(2),
                    '烧损': Number(data3[i].loI).toFixed(2),
                    'FeO': Number(data3[i].feO).toFixed(2),
                    'K2O': Number(data3[i].k2O).toFixed(4),
                    'Na2O': Number(data3[i].na2O).toFixed(4),
                    'ZnO': Number(data3[i].znO).toFixed(4),
                    'S': Number(data3[i].s).toFixed(4),
                    'P': Number(data3[i].p).toFixed(4),
                    'TiO2': Number(data3[i].tiO2).toFixed(4),
                    '价格': Number(data3[i].price).toFixed(2),
                    '配比': Number(data3[i].ratio).toFixed(2),
                    '水分': Number(data3[i].h2o).toFixed(4),
                    '湿配比': Number(data3[i].spb).toFixed(2),
                    '湿基价格': Number(data3[i].sjjg).toFixed(2),
                }
                dataTable.push(obj);
            }
        }
        if (this.state.RLZ) {
            let obj = {
                '名称': "燃料",// '列名': 数据
                '单价': Number(this.state.RLZ.signalPrice).toFixed(2),
                '单耗': Number(this.state.RLZ.signalUnit).toFixed(2),
                '百分比1': Number(this.state.RLZ.precent1).toFixed(2),
                '单成': Number(this.state.RLZ.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.RLZ.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }
        for (let i = 0; i < data3.length; i++) {
            if (data3 && i >= 22 && i < 24) {
                let obj = {
                    '名称': data3[i].name,  // '列名': 数据
                    '单价': Number(data3[i].signalPrice).toFixed(2),
                    '单耗': Number(data3[i].signalUnit).toFixed(2),
                    '百分比1': Number(data3[i].precent1).toFixed(2),
                    '单成': Number(data3[i].signalPUnit).toFixed(2),
                    '百分比2': Number(data3[i].precent2).toFixed(2),
                    'TFe': Number(data3[i].tFe).toFixed(2),
                    'SiO2': Number(data3[i].siO2).toFixed(2),
                    'CaO': Number(data3[i].caO).toFixed(2),
                    'MgO': Number(data3[i].mgO).toFixed(2),
                    'Al2O3': Number(data3[i].al2O3).toFixed(2),
                    '烧损': Number(data3[i].loI).toFixed(2),
                    'FeO': Number(data3[i].feO).toFixed(2),
                    'K2O': Number(data3[i].k2O).toFixed(4),
                    'Na2O': Number(data3[i].na2O).toFixed(4),
                    'ZnO': Number(data3[i].znO).toFixed(4),
                    'S': Number(data3[i].s).toFixed(4),
                    'P': Number(data3[i].p).toFixed(4),
                    'TiO2': Number(data3[i].tiO2).toFixed(4),
                    '价格': Number(data3[i].price).toFixed(2),
                    '配比': Number(data3[i].ratio).toFixed(2),
                    '水分': Number(data3[i].h2o).toFixed(4),
                    '湿配比': Number(data3[i].spb).toFixed(2),
                    '湿基价格': Number(data3[i].sjjg).toFixed(2),
                }
                dataTable.push(obj);
            }
        }
        if (this.state.JGFZ) {
            let obj = {
                '名称': "加工费",// '列名': 数据
                '单价': Number(this.state.JGFZ.signalPrice).toFixed(2),
                '单耗': Number(this.state.JGFZ.signalUnit).toFixed(2),
                '百分比1': Number(this.state.JGFZ.precent1).toFixed(2),
                '单成': Number(this.state.JGFZ.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.JGFZ.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }
        if (this.state.SJH) {
            let obj = {
                '名称': "烧结灰",// '列名': 数据
                '单价': Number(this.state.SJH.signalPrice).toFixed(2),
                '单耗': Number(this.state.SJH.signalUnit).toFixed(2),
                '百分比1': Number(this.state.SJH.precent1).toFixed(2),
                '单成': Number(this.state.SJH.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.SJH.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }
        if (this.state.HEJI) {
            let obj = {
                '名称': "合计",// '列名': 数据
                '单价': Number(this.state.HEJI.signalPrice).toFixed(2),
                '单耗': Number(this.state.HEJI.signalUnit).toFixed(2),
                '百分比1': Number(this.state.HEJI.precent1).toFixed(2),
                '单成': Number(this.state.HEJI.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.HEJI.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }

        var oDate = new Date();
        var years = oDate.getFullYear()
        var month = oDate.getMonth() + 1
        var days = oDate.getDate()
        var H = oDate.getHours()
        var M = oDate.getMinutes()
        var S = oDate.getSeconds()
        var dateFormat = years + "年" + month + "月" + days + '日' + H + "时" + M + "分" + S + "秒";
        option.fileName = '烧结一成本明细--' + dateFormat  //导出的Excel文件名
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: '烧结一成本明细',
                sheetFilter: ['名称', "单价", "单耗", '百分比1', "单成", "百分比2", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "烧损", "FeO", "K2O", "Na2O", "ZnO", "S", "P", "TiO2", "价格", "配比", '水分', '湿配比', '湿基价格'],
                sheetHeader: ['名称', "单价", "单耗", '百分比1', "单成", "百分比2", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "烧损", "FeO", "K2O", "Na2O", "ZnO", "S", "P", "TiO2", "价格", "配比", '水分', '湿配比', '湿基价格'],
            }
        ]
        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }
    clearItem() {
        this.state.ListData.forEach((item, index) => {
            if (item.bolen) {
                item.bolen = false
                item.al2O3 = null
                item.caO = null
                item.k2O = null
                item.loI = null
                item.mgO = null
                item.na2O = null
                item.name = null
                item.p = null
                item.s = null
                item.siO2 = null
                item.sx = null
                item.tFe = null
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
    //焦粉
    jiaofen() {
        this.setState({
            visible: true,
            model: "jiaofen"
        })
    }
    //煤粉
    meifen() {
        this.setState({
            visible: true,
            model: "meifen"
        })
    }
    ganshimodal() {
        this.setState({
            // visible: true,
            // model: "ganshi"
            num: 1
        })
    }
    getnumdata(data) {
        console.log(data)
        this.setState({
            num: data
        })
    }
    mustNumber(e) {
        if (!e.target.value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')) {
            e.target.value = ''
        }

    }
    render() {
        let tscb = (this.state.hjOne * this.state.outSone) / Number(this.state.outSone)
        return (
            <div>
                <div style={{ display: this.state.num === 2 ? "none" : "block" }}>
                    <GanShi getnum={this.getnumdata.bind(this)} num={this.props.keys === "2" ? 2 : this.props.keys === "3" ? 3 : 1}></GanShi>
                </div>
                <div className="outersphere">
                    <div className="qingkong" style={{ left: 847 }}>
                        {/* <Button type="primary" onClick={this.ganshimodal.bind(this)} >
                            干湿配比
                        </Button> */}
                        <Button type="primary" onClick={this.clearItem.bind(this)} >
                            <img src={require("../../../img/btn_delete.png")} alt="" />
                            删除
                        </Button>
                        <Button
                            onClick={this.ExportToExcel.bind(this)}
                            type="primary"
                            style={{ marginLeft: 10 }}
                        >
                            <img src={require("../../../img/btn_add.png")} alt="" />
                            导出测算表
                        </Button>
                    </div>
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
                                    <td>价格</td>
                                    <td>配比</td>
                                    <td>水分</td>
                                    <td style={{ width: 30 }}>湿配比</td>
                                    <td style={{ width: 50 }}>湿基价格</td>
                                </tr>
                                {
                                    this.state.ListData.map((item, index) => {
                                        if (index < 16) {
                                            return (
                                                <tr key={index} className={index <= 9 ? "else" : "table-th-tr"} >
                                                    <td><Checkbox onChange={this.infoKuang("bolen", index).bind(this)} id={String(index + 1)} checked={item.bolen} /></td>
                                                    <td>{index + 1}</td>
                                                    <td style={{ width: 100 }}><Input value={item.name} onChange={this.infoKuang("name", index).bind(this)} /></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.tFe === str || item.tFe === 0 ? null : item.tFe}
                                                        onChange={this.infoKuang("tFe", index).bind(this)}
                                                    >
                                                    </Input>
                                                    </td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.siO2 === str || item.siO2 === 0 ? null : item.siO2}
                                                        onChange={this.infoKuang("siO2", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.caO === str || item.caO === 0 ? null : item.caO}
                                                        onChange={this.infoKuang("caO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.mgO === str || item.mgO === 0 ? null : item.mgO}
                                                        onChange={this.infoKuang("mgO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.al2O3 === str || item.al2O3 === 0 ? null : item.al2O3}
                                                        onChange={this.infoKuang("al2O3", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.loI === str || item.loI === 0 ? null : item.loI}
                                                        onChange={this.infoKuang("loI", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.feO === str || item.feO === 0 ? null : item.feO}
                                                        onChange={this.infoKuang("feO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.k2O === strFour || item.k2O === 0 ? null : item.k2O}
                                                        onChange={this.infoKuang("k2O", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.na2O === strFour || item.na2O === 0 ? null : item.na2O}
                                                        onChange={this.infoKuang("na2O", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.znO === strFour || item.znO === 0 ? null : item.znO}
                                                        onChange={this.infoKuang("znO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.s === strFour || item.s === 0 ? null : item.s}
                                                        onChange={this.infoKuang("s", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.p === strFour || item.p === 0 ? null : item.p}
                                                        onChange={this.infoKuang("p", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.tiO2 === strFour || item.tiO2 === 0 ? null : item.tiO2}
                                                        onChange={this.infoKuang("tiO2", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.price === str || item.price === 0 ? null : item.price}
                                                        onChange={this.infoKuang("price", index).bind(this)}
                                                    ></Input></td>
                                                    <td>
                                                        {/* <Tooltip 
                                                            placement="right"
                                                            title={index <= 9 ? "当前配比" + this.state.dataNumber + ",距配比70差" + (Number(70 - this.state.dataNumber).toFixed(2)) : null}

                                                        > */}
                                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                                            value={item.ratio === 0 || item.ratio === str ? null : item.ratio}
                                                            onChange={this.infoKuang("ratio", index).bind(this)}

                                                        ></Input>
                                                        {/* </Tooltip> */}
                                                    </td>

                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.h2o === str || item.h2o === 0 ? null : item.h2o}
                                                        onChange={this.infoKuang("h2o", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.spb === str || item.spb === 0 ? null : item.spb}
                                                        onChange={this.infoKuang("spb", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.sjjg === str || item.sjjg === 0 ? null : item.sjjg}
                                                        onChange={this.infoKuang("sjjg", index).bind(this)}
                                                    ></Input></td>
                                                </tr>
                                            )
                                        }
                                        return null;
                                    })
                                }
                                {
                                    this.state.ListData.map((item, index) => {
                                        if (index === 16) {
                                            return (
                                                <tr className="table-th-tr" key={index}>
                                                    <td><Checkbox onChange={this.infoKuang("bolen", index).bind(this)} id={String(index + 1)} checked={item.bolen} /></td>
                                                    <td style={{ padding: 0 }}>
                                                        <button
                                                            onClick={this.feiliao.bind(this)}

                                                            className="btnsan"
                                                        >{index + 1}</button>
                                                    </td>
                                                    <td style={{ width: 100 }}><Input value={item.name} onChange={this.infoKuang("name", index).bind(this)} /></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.tFe === str || item.tFe === 0 ? null : item.tFe}
                                                        onChange={this.infoKuang("tFe", index).bind(this)}
                                                    >
                                                    </Input>
                                                    </td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.siO2 === str || item.siO2 === 0 ? null : item.siO2}
                                                        onChange={this.infoKuang("siO2", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.caO === str || item.caO === 0 ? null : item.caO}
                                                        onChange={this.infoKuang("caO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.mgO === str || item.mgO === 0 ? null : item.mgO}
                                                        onChange={this.infoKuang("mgO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.al2O3 === str || item.al2O3 === 0 ? null : item.al2O3}
                                                        onChange={this.infoKuang("al2O3", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.loI === str || item.loI === 0 ? null : item.loI}
                                                        onChange={this.infoKuang("loI", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.feO === str || item.feO === 0 ? null : item.feO}
                                                        onChange={this.infoKuang("feO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.k2O === strFour || item.k2O === 0 ? null : item.k2O}
                                                        onChange={this.infoKuang("k2O", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.na2O === strFour || item.na2O === 0 ? null : item.na2O}
                                                        onChange={this.infoKuang("na2O", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.znO === strFour || item.znO === 0 ? null : item.znO}
                                                        onChange={this.infoKuang("znO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.s === strFour || item.s === 0 ? null : item.s}
                                                        onChange={this.infoKuang("s", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.p === strFour || item.p === 0 ? null : item.p}
                                                        onChange={this.infoKuang("p", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.tiO2 === strFour || item.tiO2 === 0 ? null : item.tiO2}
                                                        onChange={this.infoKuang("tiO2", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.price === str || item.price === 0 ? null : item.price}
                                                        onChange={this.infoKuang("price", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.ratio === 0 || item.ratio === str ? null : item.ratio}
                                                        onChange={this.infoKuang("ratio", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.h2o === str || item.h2o === 0 ? null : item.h2o}
                                                        onChange={this.infoKuang("h2o", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.spb === str || item.spb === 0 ? null : item.spb}
                                                        onChange={this.infoKuang("spb", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.sjjg === str || item.sjjg === 0 ? null : item.sjjg}
                                                        onChange={this.infoKuang("sjjg", index).bind(this)}
                                                    ></Input></td>
                                                </tr>
                                            )
                                        }
                                        return null;
                                    })
                                }
                                {
                                    this.state.ListData.map((item, index) => {
                                        if (index >= 17) {
                                            return (
                                                <tr className={index >= 17 && index <= 21 ? "shihui" : "else"} key={index}>
                                                    <td><Checkbox onChange={this.infoKuang("bolen", index).bind(this)} id={String(index + 1)} checked={item.bolen} /></td>
                                                    {index === 22 || index === 23 ?
                                                        <td style={{ padding: 0 }}>
                                                            <button
                                                                onClick={index === 22 ? this.jiaofen.bind(this) : index === 23 ? this.meifen.bind(this) : null}
                                                                className="btnsan"
                                                            >{index + 1}</button>
                                                        </td> :
                                                        <td>{index + 1}</td>
                                                    }

                                                    <td>
                                                        <Input
                                                            value={item.name}
                                                            onChange={this.infoKuang("name", index).bind(this)}
                                                        >
                                                        </Input>
                                                    </td>
                                                    <td>
                                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                                            value={item.tFe === str || item.tFe === 0 ? null : item.tFe}
                                                            onChange={this.infoKuang("tFe", index).bind(this)}
                                                        >
                                                        </Input>
                                                    </td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.siO2 === str || item.siO2 === 0 ? null : item.siO2}
                                                        onChange={this.infoKuang("siO2", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.caO === str || item.caO === 0 ? null : item.caO}
                                                        onChange={this.infoKuang("caO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.mgO === str || item.mgO === 0 ? null : item.mgO}
                                                        onChange={this.infoKuang("mgO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.al2O3 === str || item.al2O3 === 0 ? null : item.al2O3}
                                                        onChange={this.infoKuang("al2O3", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.loI === str || item.loI === 0 ? null : item.loI}
                                                        onChange={this.infoKuang("loI", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.feO === str || item.feO === 0 ? null : item.feO}
                                                        onChange={this.infoKuang("feO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.k2O === strFour || item.k2O === 0 ? null : item.k2O}
                                                        onChange={this.infoKuang("k2O", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.na2O === strFour || item.na2O === 0 ? null : item.na2O}
                                                        onChange={this.infoKuang("na2O", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.znO === strFour || item.znO === 0 ? null : item.znO}
                                                        onChange={this.infoKuang("znO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.s === strFour || item.s === 0 ? null : item.s}
                                                        onChange={this.infoKuang("s", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.p === strFour || item.p === 0 ? null : item.p}
                                                        onChange={this.infoKuang("p", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.tiO2 === strFour || item.tiO2 === 0 ? null : item.tiO2}
                                                        onChange={this.infoKuang("tiO2", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.price === str || item.price === 0 ? null : item.price}
                                                        onChange={this.infoKuang("price", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.ratio === 0 || item.ratio === str ? null : item.ratio}
                                                        onChange={this.infoKuang("ratio", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.h2o === str || item.h2o === 0 ? null : item.h2o}
                                                        onChange={this.infoKuang("h2o", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.spb === str || item.spb === 0 ? null : item.spb}
                                                        onChange={this.infoKuang("spb", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.sjjg === str || item.sjjg === 0 ? null : item.sjjg}
                                                        onChange={this.infoKuang("sjjg", index).bind(this)}
                                                    ></Input></td>
                                                </tr>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </tbody>
                        </table>
                        <span>
                            <span className="tishixinxi">1-10:内配/1-17:铁矿粉/18-22：熔剂/23-24：燃料 &nbsp;&nbsp;&nbsp;&nbsp;配比单位：%</span>
                            <span className="work">
                                <Button type="primary" onClick={this.daoRu.bind(this)}>导入烧结矿粉</Button>
                                <Button type="primary" onClick={this.jiSuan.bind(this)} disabled={this.state.flag}>计算</Button>

                                <Button type="primary" disabled={this.state.boolen} id="ChengbenMingXi" htmlType="submit" onClick={this.mingXi.bind(this)}>
                                    成本明细
                                </Button>
                                <Button type="primary" onClick={this.baoCun.bind(this)} disabled={this.state.keep === false ? this.state.flag : this.state.keep}>保存</Button>
                            </span>
                        </span>
                    </div>
                    <div className="tabletwo">
                        <div className="setcanshu">
                            <span>参数设置</span>
                            <label>烧结矿产量 万吨/月</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("outHM").bind(this)}
                                value={this.state.setNewList.outHM}
                            /><br></br>
                            <label>烧结K2O脱除率 %</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("f1").bind(this)}
                                value={this.state.setNewList.f1}
                            /><br></br>
                            <label>烧结Na2O脱除率 %</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("f2").bind(this)}
                                value={this.state.setNewList.f2}
                            /><br></br>
                            <label>烧结ZnO脱除率 %</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("f3").bind(this)}
                                value={this.state.setNewList.f3}
                            /><br></br>
                            <label>烧结S脱除率 %</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("f4").bind(this)}
                                value={this.state.setNewList.f4}
                            /><br></br>
                            <label>烧结矿FeO含量 %</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("feOS").bind(this)}
                                value={this.state.setNewList.feOS}
                            />
                            <label>烧结灰量 kg/吨</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("dustS").bind(this)}
                                value={this.state.setNewList.dustS}
                            /><br></br>
                            <label>烧结灰品位</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("dustSFe").bind(this)}
                                value={this.state.setNewList.dustSFe}
                            />
                            <label>金属回收率%</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("m").bind(this)}
                                value={Number(this.state.setNewList.m).toFixed(2)}
                            />
                            <label>烧结可变加工费 元/吨</label>
                            <Input
                                value={this.state.setNewList.cMS}
                                onChange={this.handleGetInputValue("cMS").bind(this)}
                            />
                            <Button type="primary" onClick={this.keBian.bind(this)} className="change">
                                <img src={require("../../../img/set.png")} alt="" /></Button><br></br>
                            <label>烧结固定加工费 万元/月</label>
                            <Input
                                type="text"
                                value={this.state.setNewList.fCMB}
                                onChange={this.handleGetInputValue("fCMB").bind(this)}


                            />
                            <Button type="primary" onClick={this.guDing.bind(this)} className="change">
                                <img src={require("../../../img/set.png")} alt="" /></Button>
                        </div>
                        <div style={{ float: "left" }}>
                            <div className="tabletwo_one">

                                <span>烧结成本 元/t 矿</span>

                                <table className="tabletwo_one_table">
                                    <tbody>
                                        <tr className="nametd">
                                            <td>含铁料成本</td>
                                            <td>熔剂成本</td>
                                            <td>燃料成本</td>
                                            <td>加工费</td>
                                            <td>除尘灰损失成本</td>
                                            <td>烧结总成本</td>
                                        </tr>
                                        <tr className="shujutd">
                                            <td>{Number(this.state.AllRanShao).toFixed(2)}</td>
                                            <td>{Number(this.state.RjChengBen).toFixed(2)}</td>
                                            <td>{Number(this.state.RlChengBenL).toFixed(2)}</td>
                                            <td>{Number(this.state.JgfChengBen).toFixed(2)}</td>
                                            <td>{Number(this.state.ChuChen).toFixed(2)}</td>
                                            <td>{Number(this.state.ShaoJieZong).toFixed(2)} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tabletwo_two">
                                <span>烧结成分</span>
                                <table className="tabletwo_one_table">
                                    <tbody>
                                        <tr className="nametd">
                                            <td>TFe</td>
                                            <td>SiO2</td>
                                            <td>CaO</td>
                                            <td>MgO</td>
                                            <td>AL2O3</td>
                                            <td>烧结矿碱度</td>
                                        </tr>
                                        <tr className="shujutd">
                                            <td>{Number(this.state.AllFuHe.tFe).toFixed(2)}</td>
                                            <td>{Number(this.state.AllFuHe.siO2).toFixed(2)}</td>
                                            <td>{Number(this.state.AllFuHe.caO).toFixed(2)}</td>
                                            <td>{Number(this.state.AllFuHe.mgO).toFixed(2)} </td>
                                            <td> {Number(this.state.AllFuHe.al2O3).toFixed(2)}</td>
                                            <td> {Number(this.state.AllFuHe.r).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="tabletwo_one_table">
                                    <tbody>
                                        <tr className="nametd">
                                            <td>铁水成本，元</td>
                                            <td>硫负荷，kg/t</td>
                                            <td>碱负荷，kg/t</td>
                                            <td>锌负荷，kg/t</td>
                                        </tr>
                                        <tr className="shujutd">
                                            <td>{Number(this.state.hjOne !== 0 && this.state.hjTwo !== 0 && this.state.hjThree !== 0 ? tscb : 0).toFixed(2)} </td>
                                            <td>{Number(this.state.AllFuHe.SBurden).toFixed(2)}</td>
                                            <td>{Number(this.state.AllFuHe.KNaBurden).toFixed(2)}</td>
                                            <td>{Number(this.state.AllFuHe.ZnBurden).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    title={this.state.model === "BudgetFen" ? <BuildTitle title="导入矿粉" tabKeys={this.state.tabKeys} /> : (this.state.model === "BudgetFeiliao" ? "固废" :
                        (this.state.model === "BudgetMingXi" ? "成本明细" : (this.state.model === "BudgetJiaGongFei" ? "可变加工费" : (this.state.model === "BudgetBuGuDing" ?
                            "固定加工费" : this.state.model === "meifen" ? "烧结用煤粉" : this.state.model === "ganshi" ? "干湿基配比转换工具" : "烧结用焦粉"))))}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose={this.state.model === "ganshi" ? false : true}
                    mask={this.state.model === "ganshi" ? false : true}
                    maskClosable={this.state.model === "ganshi" ? false : true}
                >
                    {
                        this.state.model === "BudgetFen" ?
                            <WrappedBudgetFen
                                ref="BudgetFen"
                                ListData={this.state.ListData}
                                getData={this.bbbb.bind(this)}
                                getXu={this.cccc.bind(this)}
                                tabKeys={this.state.tabKeys}
                                valueNameRadio={this.valueNameRadio.bind(this)}

                            /> : (this.state.model === "BudgetFeiliao" ?
                                <WrappedFeiliao ref="BudgetFeiliao"
                                    getGuFei={this.infoGufei.bind(this)}
                                    tabKeys={this.state.tabKeys}
                                /> :
                                (this.state.model === "BudgetMingXi" ?
                                    <BudgetMingXi ref="BudgetMingXi"
                                        ChengBenMingXi={this.state.ChengBenMingXi}
                                        tabKeys={this.state.tabKeys}
                                    /> : (this.state.model === "BudgetJiaGongFei" ?
                                        <WrappedGongFei
                                            ref="BudgetFeiliao"
                                            KeBianFei={this.KeBianJIeShou.bind(this)}
                                            tabKeys={this.state.tabKeys}
                                        /> :
                                        (this.state.model === "BudgetBuGuDing" ?
                                            <WrappedBuGuDing
                                                ref="BudgetBuGuDing"
                                                amountGuDing={this.infoGufeiHeJi.bind(this)}
                                                tabKeys={this.state.tabKeys}
                                            /> : this.state.model === "meifen" ?
                                                <MeiFen tabKeys={this.state.tabKeys} getMeiFen={this.setMeiFen.bind(this)} /> :
                                                this.state.model === "ganshi" ? <GanShi></GanShi> :
                                                    <JiaoFen tabKeys={this.state.tabKeys} getJiaoFen={this.setJiaoFen.bind(this)} />))))
                    }
                </Modal>
            </div>

        )
    }
}