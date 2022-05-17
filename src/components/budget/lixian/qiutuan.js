import React, { Component } from "react";
import "../cossalculation.css"
import axios from "axios";
import ExportJsonExcel from 'js-export-excel';
import { Modal, Input, Button, message, Checkbox, Tooltip } from "antd";
import BudgetMingXi from "../qiutuanmodal/mingxi";
import BuildTitle from "../../model/model"
import BudgetJiaGongFei from "../qiutuanmodal/kebianjgf";
import BudgetBuGuDing from "../qiutuanmodal/gudingjgf";
import WrappedBudgetFenTwo from "../qiutuandaoru/index.js";
import GanShi from "../shaojie/ganshi.js"
const list = []
for (let i = 0; i < 24; i++) {
    list.push({
        line: i + 1,
        name: null,
        isTotal: false,
        purpose: 6,
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
        r: null,
        esti: null,
    });
}
const str = "0.00"
const strFour = "0.0000"
export default class QiuTuan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],//获取球团前16行的列表
            model: "",//点击选择是哪一个弹窗
            listNumber: [],//空  还没有赋值
            InputValue: "", //暂时么还有用到
            value: "",
            ListDataKuang: [],//通过结口获取参数17条的页面参数，暂时先不用。//该状态为本页面的24条空状态的数据，设置给状态的默认值
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
                m:1
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
            HTYL: [],
            boolen: true,
            tscb: 0,
            HTYLORE: [],//含铁原料ore
            ZTORE: [],
            HGRJORE: [],
            WGZTORE: [],
            HTYLZ: "",//导出含铁原料
            ZT: "",//导出溶剂
            JGF: "",
            WGZT: "",
            HGRJ: "",
            HEJI: "",
            flag: false,
            keep: false,
            number: 1,
            tabKeys: this.props.keys,
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
            //导入球团矿粉矿粉

            this.refs.BudgetFenTwo.validateFields((err, values) => {
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
                            newSanFang.source["price"] = newSanFang.priceOre;
                            newSanFang.source["ratio"] = 0;
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
            })
        }

        if (this.state.model === "BudgetMingXi") {
            this.setState({
                visible: false,

            })
        }
        if (this.state.model === "BudgetJiaGongFei") {
            //可变加工费 this.state.ListBian
            if (this.state.ListBian === 0) {
                this.setState({
                    visible: true,
                })
                message.warning("导入不能为空！请先点击计算按钮！")
            } else {
                const newData = this.state.setNewList;
                const newSanFang = Object.assign(this.state.ListBian);
                newData.cMS = newSanFang;
                this.setState({
                    setNewList: newData,
                    visible: false,
                })
            }
        }
        if (this.state.model === "BudgetBuGuDing") {
            if (this.state.GuChengBen === 0) {
                this.setState({
                    visible: true,
                })
                message.warning("导入不能为空！请先点击计算按钮！")
            } else {
                console.log(this.state.GuChengBen)
                const newData = this.state.setNewList;
                const newSanFang = Object.assign(this.state.GuChengBen);
                newData.fCMB = newSanFang;
                //////console.log(newSanFang, newData.fCMB)
                this.setState({
                    setNewList: newData,
                    visible: false,
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
        axios.get(`/api/estimate-para-gl/recent/?purpose=203`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            res.data.rslag = Number(res.data.rslag).toFixed(2)
            this.setState({
                luzhaOne: res.data,
                outSone: res.data.outS
            })
        })

        axios.get(`/api/ore/?ordering=-createTime&incomingDate=&purpose=2`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            //////console.log(res.data.results)
            this.setState({
                data: res.data.results
            })
        })

        // 高炉表格信息
        axios.get(`/api/estimate-ore/recent/?purpose=202`, {
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

            })
            //////console.log(res)
            this.setState({
                ListData: res.data
            })
            const sub = {
                dataNumber: 0
            }
            res.data.forEach((item, index) => {
                if (index <= 17) {
                    sub.dataNumber += Number(item.ratio)
                }
            })
            // console.log(sub.dataNumber)
            this.setState({
                dataNumber: sub.dataNumber
            })
        })

        // 球团参数信息
        axios.get(`/api/estimate-para-sq/recent/?purpose=202`, {
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
    infoKuang(name, index) {
        return (e) => {
            const value = e.target.value === undefined ? e.target.checked : e.target.value;
            const newData = this.state.ListData.slice();
            newData[index][name] = value;
            this.setState({ ListData: newData })
            const sub = {
                dataNumber: 0
            }
            this.state.ListData.forEach((item, index) => {
                if (index <= 17) {
                    sub.dataNumber += Number(item.ratio)
                }
            })
            //  console.log(sub.dataNumber)
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
        ////////console.log(v)
        //var GufeiListJieShou = '';
        this.setState({
            GufeiListJieShou: v
        })
    }
    jiSuan() {
        this.setState({
            flag: true,
        })
        axios.post("/api/estimate-sq/", {
            purpose: 202,
            para: {
                purpose: 202,
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
                m: "1",

            },
            ore:
                this.state.ListData.map((item, index) => {
                    return (
                        {
                            name: item.name,
                            purpose: 202,
                            line: item.line,     //序号
                            tFe: item.tFe === "" || item.tFe === null ? 0 : item.tFe,     // 全铁含量
                            siO2: item.siO2 === "" || item.siO2 === null ? 0 : item.siO2,     // 二氧化硅含量
                            caO: item.caO === "" || item.caO === null ? 0 : item.caO,     // 氧化钙含量
                            mgO: item.mgO === "" || item.mgO === null ? 0 : item.mgO,         // 氧化镁含量
                            al2O3: item.al2O3 === "" || item.al2O3 === null ? 0 : item.al2O3,    // 氧化铝含量
                            loI: item.loI === "" || item.loI === null ? 0 : item.loI,      // 烧损
                            feO: item.feO === "" || item.feO === null ? 0 : item.feO,        // 氧化铁含量
                            k2O: item.k2O === "" || item.k2O === null ? 0 : item.k2O,         // 氧化钾含量
                            na2O: item.na2O === "" || item.na2O === null ? 0 : item.na2O,        // 氧化钠含量
                            znO: item.znO === "" || item.znO === null ? 0 : item.znO,         // 氧化锌含量
                            s: item.s === "" || item.s === null ? 0 : item.s,           // 硫含量
                            p: item.p === "" || item.p === null ? 0 : item.p,          // 磷含量
                            tiO2: item.tiO2 === "" || item.tiO2 === null ? 0 : item.tiO2,        // 氧化钛含量
                            sRatio: item.sRatio === "" || item.sRatio === null ? 0 : item.sRatio,     // 入炉料筛下率
                            price: item.price === "" || item.price === null ? 0 : item.price,  // 价格
                            ratio: item.ratio === "" || item.ratio === null ? 0 : item.ratio,        // 配比
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
            //////console.log(res.data)
            this.setState({
                AllRanShao: res.data.cost.htyl.signalPUnit,//含铁料
                ChengBenMingXi: res.data,//成本明细
                RjChengBen: res.data.cost.hgyl.signalPUnit,//rj总成本
                RlChengBenL: res.data.cost.zt.signalPUnit,//rl总成本
                JgfChengBen: res.data.cost.jgf.signalPUnit,//加工费成本
                ChuChen: res.data.cost.wgzt.signalPUnit,//烧结灰成本
                ShaoJieZong: res.data.cost.hj.signalPUnit,//烧结总成本
                AllFuHe: res.data.source,//负荷
                HTYL: res.data.cost.htyl.ore,
                boolen: false,
                tscb: res.data.tscb,
                HTYLORE: res.data.cost.htyl.ore,
                ZTORE: res.data.cost.zt.ore,
                HGRJORE: res.data.cost.hgyl.ore,
                WGZTORE: res.data.cost.wgzt.ore,
                HTYLZ: res.data.cost.htyl,
                ZT: res.data.cost.zt,
                HGRJ: res.data.cost.hgyl,
                WGZT: res.data.cost.wgzt,
                HEJI: res.data.cost.hj,
                JGF: res.data.cost.jgf,
                flag: false,
                number: 2,
            })

            axios.post("/api/estimate-gl/", {
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
                                tFe: index === 8 ? String(res.data.jsjg.tFe) : item.tFe === "" || item.tFe === null ? item.tFe = 0 : item.tFe,
                                siO2: index === 8 ? String(res.data.jsjg.siO2) : item.siO2 === "" || item.siO2 === null ? item.siO2 = 0 : item.siO2,
                                caO: index === 8 ? String(res.data.jsjg.caO) : item.caO === "" || item.caO === null ? item.caO = 0 : item.caO,
                                mgO: index === 8 ? String(res.data.jsjg.mgO) : item.mgO === "" || item.mgO === null ? item.mgO = 0 : item.mgO,
                                al2O3: index === 8 ? String(res.data.jsjg.al2O3) : item.al2O3 === "" || item.al2O3 === null ? item.al2O3 = 0 : item.al2O3,
                                loI: index === 8 ? String(res.data.jsjg.loI) : item.loI === "" || item.loI === null ? item.loI = 0 : item.loI,
                                feO: index === 8 ? String(res.data.jsjg.feO) : item.feO === "" || item.feO === null ? item.feO = 0 : item.feO,
                                k2O: index === 8 ? String(res.data.jsjg.k2O) : item.k2O === "" || item.k2O === null ? item.k2O = 0 : item.k2O,
                                na2O: index === 8 ? String(res.data.jsjg.na2O) : item.na2O === "" || item.na2O === null ? item.na2O = 0 : item.na2O,
                                znO: index === 8 ? String(res.data.jsjg.znO) : item.znO === "" || item.znO === null ? item.znO = 0 : item.znO,
                                s: index === 8 ? String(res.data.jsjg.s) : item.s === "" || item.s === null ? item.s = 0 : item.s,
                                p: index === 8 ? String(res.data.jsjg.p) : item.p === "" || item.p === null ? item.p = 0 : item.p,
                                tiO2: index === 8 ? String(res.data.jsjg.tiO2) : item.tiO2 === "" || item.tiO2 === null ? item.tiO2 = 0 : item.tiO2,
                                sRatio: index === 8 ? String(res.data.jsjg.sRatio == null ? 0.00 : res.data.jsjg.sRatio) : item.sRatio === "" || item.sRatio === null ? item.sRatio = 0 : item.sRatio,
                                price: index === 8 ? String(res.data.jsjg.price) : item.price === "" || item.price === null ? item.price = 0 : item.price,
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
                // console.log(res)
            })

        }).catch(err => {
            this.setState({
                flag: false,
            })
            //////console.log(err)
            if (err.request.status === 500) {
                message.warning("计算失误！请检查参数信息是否正确！")
            } else if (err.request.status === 400) {
                message.warning("请检查参数信息是否完整！")
            } else if (err.request.status === 401) {
                message.warning("您没有权限！")
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
                    purpose: 202,
                    save_flag: true,
                    para: {
                        purpose: 202,
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
                        m: "1",
                    },
                    ore:
                        this.state.ListData.map((item, index) => {
                            return (
                                {
                                    name: item.name,
                                    purpose: 202,
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
                    message.success("保存成功！")
                    this.setState({
                        flag: false,
                        number: 3,
                    })
                }).catch(err => {
                    this.setState({
                        flag: false,
                    })
                    //////console.log(err)
                    if (err.request.status === 500) {
                        message.warning("保存失败")
                    } else if (err.request.status === 400) {
                        message.warning("参数信息不全，请检查参数信息")
                    } else if (err.request.status === 401) {
                        message.warning("您没有改权限!")
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
        //var GuChengBen = "";
        this.setState({
            GuChengBen: s
        })
        //////console.log(this.state.GuChengBen)
    }
    //可变加工费接收
    KeBianJIeShou(value) {
        //////console.log(value)
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
        const data4 = this.state.ZTORE // 准备的数据
        const data5 = this.state.HGRJORE // 准备的数据
        const data6 = this.state.WGZTORE // 准备的数据
        const data3 = [];
        data.forEach((item, index) => {
            data2.forEach((items, idx) => {
                if (index === idx && index <= 17) {
                    var obj = Object.assign(item, items);
                    data3.push(obj)
                }
            })
            data4.forEach((ite, i) => {
                if ((index >= 18 && index <= 19) && index - 18 === i) {
                    //////console.log(ite)
                    var obj = Object.assign(ite, item);
                    data3.push(obj)
                }
            })

            data5.forEach((its, x) => {
                if ((index >= 20 && index <= 21) && index - 20 === x) {
                    //////console.log(its)
                    var obj = Object.assign(its, item);
                    data3.push(obj)
                }
            })
            data6.forEach((its, e) => {
                if ((index >= 22 && index <= 23) && index - 22 === e) {
                    //////console.log(its)
                    var obj = Object.assign(its, item);
                    data3.push(obj)
                }
            })
        })
        //////console.log(data3)
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
            if (data3 && i < 18) {
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
                }
                dataTable.push(obj);
            }
        }
        if (this.state.ZT) {
            let obj = {
                '名称': "皂土",// '列名': 数据
                '单价': Number(this.state.ZT.signalPrice).toFixed(2),
                '单耗': Number(this.state.ZT.signalUnit).toFixed(2),
                '百分比1': Number(this.state.ZT.precent1).toFixed(2),
                '单成': Number(this.state.ZT.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.ZT.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }
        for (let i = 0; i < data3.length; i++) {
            if (data3 && i >= 18 && i <= 19) {
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
                }
                dataTable.push(obj);
            }
        }
        if (this.state.HGRJ) {
            let obj = {
                '名称': "含钙溶剂",// '列名': 数据
                '单价': Number(this.state.HGRJ.signalPrice).toFixed(2),
                '单耗': Number(this.state.HGRJ.signalUnit).toFixed(2),
                '百分比1': Number(this.state.HGRJ.precent1).toFixed(2),
                '单成': Number(this.state.HGRJ.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.HGRJ.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }
        for (let i = 0; i < data3.length; i++) {
            if (data3 && i >= 20 && i <= 21) {
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
                }
                dataTable.push(obj);
            }
        }
        if (this.state.WGZT) {
            let obj = {
                '名称': "外购皂土",// '列名': 数据
                '单价': Number(this.state.WGZT.signalPrice).toFixed(2),
                '单耗': Number(this.state.WGZT.signalUnit).toFixed(2),
                '百分比1': Number(this.state.WGZT.precent1).toFixed(2),
                '单成': Number(this.state.WGZT.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.WGZT.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }
        for (let i = 0; i < data3.length; i++) {
            if (data3 && i >= 22 && i <= 23) {
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
                }
                dataTable.push(obj);
            }
        }
        if (this.state.JGF) {
            let obj = {
                '名称': "加工费",// '列名': 数据
                '单价': Number(this.state.JGF.signalPrice).toFixed(2),
                '单耗': Number(this.state.JGF.signalUnit).toFixed(2),
                '百分比1': Number(this.state.JGF.precent1).toFixed(2),
                '单成': Number(this.state.JGF.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.JGF.precent2).toFixed(2),
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
        option.fileName = '球团一成本明细--' + dateFormat  //导出的Excel文件名
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: '球团一成本明细',
                sheetFilter: ['名称', "单价", "单耗", '百分比1', "单成", "百分比2", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "烧损", "FeO", "K2O", "Na2O", "ZnO", "S", "P", "TiO2", "价格", "配比"],
                sheetHeader: ['名称', "单价", "单耗", '百分比1', "单成", "百分比2", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "烧损", "FeO", "K2O", "Na2O", "ZnO", "S", "P", "TiO2", "价格", "配比"],
            }
        ]

        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }
    clickTr() {
        let es = document.getElementsByTagName('tr');
        let thisTr = this
        for (let p = 0; p < es.length; p++) {
            es[p].onclick = function () {
                let number = parseInt(p);
                thisTr.setState({
                    clear: number,
                })
            }
        }
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
                item.feO = null
                item.siO2 = null
                item.sx = null
                item.tFe = null
                item.tiO2 = null
                item.xx = null
                item.znO = null
                item.price = null
                item.ratio = null
                this.setState({
                    ListData: this.state.ListData
                })
            }
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
        if(!e.target.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')){
            e.target.value = ''
        }
   
    }
    render() {
        let tscb = (this.state.hjOne * this.state.outSone) / Number(this.state.outSone)
        //  console.log(this.state.dataNumber)
        return (
            <div>
                <div className="outersphere">
                    <div style={{ display: this.state.num === 2 ? "none" : "block" }}>
                        <GanShi getnum={this.getnumdata.bind(this)} num={this.props.keys === "2" ? 2 : 1}></GanShi>
                    </div>
                    <div className="qingkong" style={{ left: 858 }}>
                        {/* <Button type="primary" onClick={this.ganshimodal.bind(this)} >
                            干湿配比
                        </Button> */}
                        <Button type="primary" onClick={this.clearItem.bind(this)} style={{ marginRight: 10 }}>
                            <img src={require("../../../img/btn_delete.png")} alt="" />
                            删除
                        </Button>
                        <Button onClick={this.ExportToExcel.bind(this)} type="primary">
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
                                </tr>
                                {
                                    this.state.ListData.map((item, index) => {
                                        return (
                                            <tr key={index} className={index < 18 ? "table-th-tr" : index >= 18 & index <= 19 ? "gaofan" : index >= 20 && index <= 21 ? "shihui" : index >= 22 && index <= 23 ? "else" : ""}>
                                                <td><Checkbox onChange={this.infoKuang("bolen", index).bind(this)} id={String(index + 1)} checked={item.bolen} /></td>
                                                <td>{index + 1}</td>
                                                <td style={{ width: 100 }}>
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
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.siO2 === str || item.siO2 === 0 ? null : item.siO2}
                                                    onChange={this.infoKuang("siO2", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.caO === str || item.caO === 0 ? null : item.caO}
                                                    onChange={this.infoKuang("caO", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.mgO === str || item.mgO === 0 ? null : item.mgO}
                                                    onChange={this.infoKuang("mgO", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.al2O3 === str || item.al2O3 === 0 ? null : item.al2O3}
                                                    onChange={this.infoKuang("al2O3", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.loI === str || item.loI === 0 ? null : item.loI}
                                                    onChange={this.infoKuang("loI", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.feO === str || item.feO === 0 ? null : item.feO}
                                                    onChange={this.infoKuang("feO", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.k2O === strFour || item.k2O === 0 ? null : item.k2O}
                                                    onChange={this.infoKuang("k2O", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.na2O === strFour || item.na2O === 0 ? null : item.na2O}
                                                    onChange={this.infoKuang("na2O", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.znO === strFour || item.znO === 0 ? null : item.znO}
                                                    onChange={this.infoKuang("znO", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.s === strFour || item.s === 0 ? null : item.s}
                                                    onChange={this.infoKuang("s", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.p === strFour || item.p === 0 ? null : item.p}
                                                    onChange={this.infoKuang("p", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.tiO2 === strFour || item.tiO2 === 0 ? null : item.tiO2}
                                                    onChange={this.infoKuang("tiO2", index).bind(this)}
                                                ></Input></td>
                                                <td><Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.price === str || item.price === 0 ? null : item.price}
                                                    onChange={this.infoKuang("price", index).bind(this)}
                                                ></Input></td>
                                                <td>
                                                    <Tooltip
                                                        placement="right"
                                                        title={"当前配比" + this.state.dataNumber + ",距配比100差" + (Number(100 - this.state.dataNumber).toFixed(2))}

                                                    >
                                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                                            value={item.ratio === 0 || item.ratio === str ? null : item.ratio}
                                                            onChange={this.infoKuang("ratio", index).bind(this)}

                                                        ></Input>
                                                    </Tooltip>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                        <span>
                            <span className="tishixinxi">1-18:球团粉/19-20皂土熔剂/21-22：含钙熔剂/23-24外购皂土&nbsp;&nbsp;&nbsp;&nbsp;配比单位：%</span>
                            <span className="work">
                                <Button type="primary" onClick={this.daoRu.bind(this)}>导入球团矿粉</Button>
                                <Button type="primary" onClick={this.jiSuan.bind(this)} disabled={this.state.flag}>计算</Button>
                                <Button type="primary" onClick={this.mingXi.bind(this)} disabled={this.state.boolen}>成本明细</Button>
                                <Button type="primary" onClick={this.baoCun.bind(this)} disabled={this.state.keep === false ? this.state.flag : this.state.keep}>保存</Button>
                            </span>
                        </span>
                    </div>
                    <div className="tabletwo">
                        <div className="setcanshu">
                            <span>参数设置</span>
                            <label>球团矿产量 万吨/月</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("outHM").bind(this)}
                                value={this.state.setNewList.outHM}
                            /><br></br>
                            <label>球团K2O脱除率 %</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("f1").bind(this)}

                                value={this.state.setNewList.f1}
                            /><br></br>
                            <label>球团Na2O脱除率  %</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("f2").bind(this)}
                                value={this.state.setNewList.f2}
                            /><br></br>
                            <label>球团ZnO脱除率  %</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("f3").bind(this)}
                                value={this.state.setNewList.f3}

                            /><br></br>
                            <label>球团S脱除率  %</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("f4").bind(this)}
                                value={this.state.setNewList.f4}
                            /><br></br>
                            <label>球团矿FeO含量 %</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("feOS").bind(this)}
                                value={this.state.setNewList.feOS}
                                style={{ marginBottom: 30 }}
                            /><br></br>
                            <label>金属回收率  %</label>
                            <Input
                                type="text"
                                disabled
                                onChange={this.handleGetInputValue("m").bind(this)}
                                value={this.state.setNewList.m}
                            />
                            <label>球团可变加工费 元/吨</label>
                            <Input
                                onChange={this.handleGetInputValue("cMS").bind(this)}
                                value={this.state.setNewList.cMS}
                            />
                            <Button type="primary" onClick={this.keBian.bind(this)}>
                                <img src={require("../../../img/set.png")} alt="" /></Button><br></br>
                            <label>球团固定加工费 万元/月</label>
                            <Input
                                type="text"
                                onChange={this.handleGetInputValue("fCMB").bind(this)}

                                value={this.state.setNewList.fCMB}
                            />
                            <Button type="primary" onClick={this.guDing.bind(this)}>
                                <img src={require("../../../img/set.png")} alt="" /></Button>


                        </div>
                        <div style={{ float: "left" }}>
                            <div className="tabletwo_one">
                                <span>球团成本 元/t 矿</span>
                                <table className="tabletwo_one_table">
                                    <tbody>
                                        <tr className="nametd">
                                            <td>含铁料成本</td>
                                            <td>皂土成本</td>
                                            <td>含钙熔剂成本</td>
                                            <td>外购皂土成本</td>
                                            <td>加工费</td>
                                            <td>球团总成本</td>
                                        </tr>
                                        <tr className="shujutd">
                                            <td> {Number(this.state.AllRanShao).toFixed(2)}</td>
                                            <td> {Number(this.state.RlChengBenL).toFixed(2)} </td>
                                            <td> {Number(this.state.RjChengBen).toFixed(2)}</td>
                                            <td>{Number(this.state.ChuChen).toFixed(2)}</td>
                                            <td>{Number(this.state.JgfChengBen).toFixed(2)}</td>
                                            <td>{Number(this.state.ShaoJieZong).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tabletwo_two">
                                <span>球团成分</span>
                                <table className="tabletwo_one_table">
                                    <tbody>
                                        <tr className="nametd">
                                            <td>TFe</td>
                                            <td>SiO2</td>
                                            <td>CaO</td>
                                            <td>MgO</td>
                                            <td>AL2O3</td>
                                            {/* <td>烧结矿碱度</td> */}
                                        </tr>
                                        <tr className="shujutd">
                                            <td>{Number(this.state.AllFuHe.tFe).toFixed(2)}</td>
                                            <td>{Number(this.state.AllFuHe.siO2).toFixed(2)}</td>
                                            <td>{Number(this.state.AllFuHe.caO).toFixed(2)}</td>
                                            <td>{Number(this.state.AllFuHe.mgO).toFixed(2)}</td>
                                            <td>{Number(this.state.AllFuHe.al2O3).toFixed(2)}</td>
                                            {/* <td>
                                            {Number(this.state.AllFuHe.r).toFixed(2)}
                                            </td> */}
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
                                            <td>{Number(this.state.hjOne !== 0 && this.state.hjTwo !== 0 && this.state.hjThree !== 0 ? tscb : 0).toFixed(2)}</td>
                                            <td>{Number(this.state.AllFuHe.SBurden).toFixed(4)}</td>
                                            <td>{Number(this.state.AllFuHe.KNaBurden).toFixed(4)}</td>
                                            <td>{Number(this.state.AllFuHe.ZnBurden).toFixed(4)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>


                    </div>

                </div>
                <Modal
                    title={this.state.model === "BudgetFen" ? <BuildTitle title="导入矿粉" tabKeys={this.state.tabKeys} /> :
                        (this.state.model === "BudgetMingXi" ? "成本明细" : (this.state.model === "BudgetJiaGongFei" ? "可变加工费" : (this.state.model === "BudgetBuGuDing" ?
                            "固定加工费" : "")))}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose={true}
                >
                    {
                        this.state.model === "BudgetFen" ? <WrappedBudgetFenTwo ref="BudgetFenTwo" ListData={this.state.ListData} getData={this.bbbb.bind(this)} getXu={this.cccc.bind(this)} tabKeys={this.state.tabKeys} /> :
                            (this.state.model === "BudgetMingXi" ? <BudgetMingXi ref="BudgetMingXi" ChengBenMingXi={this.state.ChengBenMingXi} tabKeys={this.state.tabKeys} /> : (this.state.model === "BudgetJiaGongFei" ? <BudgetJiaGongFei ref="BudgetFeiliao" KeBianFei={this.KeBianJIeShou.bind(this)} tabKeys={this.state.tabKeys} /> :
                                (this.state.model === "BudgetBuGuDing" ? <BudgetBuGuDing ref="BudgetBuGuDing" amountGuDing={this.infoGufeiHeJi.bind(this)} tabKeys={this.state.tabKeys} /> : "")))
                    }
                </Modal>
            </div>

        )
    }
}

;