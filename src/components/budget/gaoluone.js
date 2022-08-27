import React, { Component } from "react";
import "./cossalculation.scss"
import axios from "axios"
import EditerComponent from "./gauluModel/canSet";
import ExportJsonExcel from 'js-export-excel';
import WrappedDemo from "./gauluModel/daoruModel";
import WeiRuLuJiao from "./gauluModel/weiruluJiao"
import MingXi from "./gauluModel/Mingxi";
import Else from "./gauluModel/else";
import PenChuiMei from "./gauluModel/penchuimei"
import RuLuJiao from "./gauluModel/rululiao"
import BuildTitle from "../model/model"
import { Radio, Select, Button, Input, Modal, message, Checkbox, Tooltip } from "antd";
const { Option } = Select;
const list = []
for (let i = 0; i < 15; i++) {
    list.push({
        line: i + 1,
        name: null,
        isTotal: false,
        purpose: 9,
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
const strFour = "0.0000"
const str = "0.00"
export default class BlastFurnaceOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            data: [],
            models: "",
            GaoList: list,
            one: true,
            two: true,
            three: true,
            luzha: {},//参数设置数据接收
            valueShao: "",//烧结接收
            valueQiu: "",//球团接收
            sonInfoValue: "",//固定加工费
            sonKebianInfo: "",//可变加工费
            s: null,
            q: null,
            Rtl: 0,//燃料，
            Jtl: 0,//加工成本数据s
            Jgtl: 0,//回收成本
            Htl: 0,//含铁料
            GLHtl: 0,//高炉灰成本
            HeJtl: 0,//铁水总成本
            luz: {
                SiO2Slag: 0,
                CaOSlag: 0,
                MgOSlag: 0,
                Al2O3Slag: 0,
                FeOSlag: 0,
                SSlag: 0,
                TiO2Slag: 0,
                RSlag: 0,
                ZL: 0,
                coalRate: 0,
                cokeRate: 0,
                SBurden: 0,
                sjclwdy: 0,
                KNaBurden: 0,
                ZnBurden: 0,
                TFeBF: 0,
                G2Ore: 0,
            },//炉渣成分
            qtc: "",//其他指标
            ALL: "",//成本明细,
            HTYL: [],
            navData: {},
            SanFang: {},
            newElse: null,
            newTan: null,
            newPen: null,
            newWeiRu: null,
            boolen: true,
            AllZong: "",//全场铁水总成本
            HTYLORE: [],//含铁原料ore
            RJORE: [],
            RLORE: [],
            HTYLZ: "",
            RLZ: "",
            HSCB: "",
            GLHCB: "",
            JGCB: "",
            HEJI: "",
            flag: false,
            keep: false,
            number: 1,
            ListName: '',
            tabKeys: this.props.keys,
            hasSaved: false,
            dataNumber: '',
            sj: "",
            qt: "",
            luzhaOne: {},
            luzhaTwo: {},
            hjOne: 0,
            hjTwo: 0,
            hjThree: 0,
            outSone: 0,//高炉一铁水参数
            outSTwo: 0,//高炉二铁水参数
            outSThree: 0,//高炉三铁水参数
            tscb: 0,
        }
        ////console.log(this.props.keys)
    }
    UNSAFE_componentWillMount() {
        //最近矿粉信息
        axios.get(`/api/estimate-ore/recent/?purpose=${this.state.tabKeys === "2" ? 159 : this.state.tabKeys === "3" ? 179 : 9}`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            // var obj=JSON.stringify(res.data)
            // sessionStorage.setItem("gaolulist", obj)
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
            ////console.log(res)
            this.setState({
                GaoList: res.data
            })
            const sub = {
                dataNumber: 0
            }
            res.data.forEach((item, index) => {
                if (index <= 11) {
                    sub.dataNumber += Number(item.ratio)
                }
            })
            // console.log(sub.dataNumber)
            this.setState({
                dataNumber: sub.dataNumber
            })
        })
        //最近参数设置信息
        axios.get(`/api/estimate-para-gl/recent/?purpose=${this.state.tabKeys === "2" ? 159 : this.state.tabKeys === "3" ? 179 : 9}`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            res.data.rslag = Number(res.data.rslag).toFixed(2)
            this.setState({
                luzha: res.data,
                outSone: res.data.outS
            })
        })
        setTimeout(() => {
            //高炉er系列数据
            axios.get(`/api/estimate-ore/recent/?purpose=${this.state.tabKeys === "2" ? 179 : this.state.tabKeys === "3" ? 9 : 159}`, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res) => {
                //  console.log(res.data);  
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
                    item.r = Number(item.r).toFixed(2);        // 配比
                })
                this.setState({
                    gaoluTwo: res.data
                })
            })
            //高炉三系列数据
            axios.get(`/api/estimate-ore/recent/?purpose=${this.state.tabKeys === "2" ? 9 : this.state.tabKeys === "3" ? 159 : 179}`, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res) => {
                //  console.log(res.data);    
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
                    item.r = Number(item.r).toFixed(2);        // 配比
                })
                this.setState({
                    gaoluThree: res.data
                })
            })

            //最近参数设置信息
            axios.get(`/api/estimate-para-gl/recent/?purpose=${this.state.tabKeys === "2" ? 179 : this.state.tabKeys === "3" ? 9 : 159}`, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res) => {
                // console.log(res);
                res.data.outS = Number(res.data.outS).toFixed(2)
                this.setState({
                    luzhaOne: res.data,
                    outSTwo: res.data.outS
                })
            })
            //最近参数设置信息
            axios.get(`/api/estimate-para-gl/recent/?purpose=${this.state.tabKeys === "2" ? 9 : this.state.tabKeys === "3" ? 159 : 179}`, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res) => {
                res.data.outS = Number(res.data.outS).toFixed(2)
                this.setState({
                    luzhaTwo: res.data,
                    outSThree: res.data.outS
                })
            })
        }, 100)
    }
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        //////console.log(e);
        if (this.state.models === "setInfo") {
            this.setState({
                visible: false,
            });
        }
        if (this.state.models === "daoru") {
            this.refs.validate_other.validateFields((err, values) => {
                if (err) {
                    this.setState({
                        confirmLoading: false,
                    });
                } else {
                    this.state.SanFang.forEach((item) => {
                        if (item.name === values.name && item.incomingDate === values.time) {
                            // //console.log(item);
                            const newListData = this.state.GaoList.slice(0);
                            const newSanFang = Object.assign({}, item);
                            newSanFang.source["name"] = newSanFang.name;
                            newSanFang.source["price"] = newSanFang.price;
                            newSanFang.source["ratio"] = 0;
                            newSanFang.source["line"] = this.state.navData
                            newSanFang.source["ratio"] = this.state.GaoList[this.state.navData - 1].ratio //配比是否显示
                            newListData[this.state.navData - 1] = newSanFang.source;
                            this.setState({
                                GaoList: newListData,
                                visible: false
                            })
                        }
                    })
                }
            })
        }
        if (this.state.models === "mingxi") {
            this.setState({
                visible: false,
            });
        }
        if (this.state.models === "ruluJiao") {
            if (this.state.newTan === null) {
                this.setState({
                    visible: true
                })
                message.warning("不能导入空的内容！")
            } else {
                const newData = this.state.GaoList.slice(0);
                const newSanFang = Object.assign({}, this.state.newTan);
                newSanFang.tFe = Number(newSanFang.tFe).toFixed(2) === str ? null : Number(newSanFang.tFe).toFixed(2);
                newSanFang.siO2 = Number(newSanFang.siO2).toFixed(2) === str ? null : Number(newSanFang.siO2).toFixed(2);     // 二氧化硅含量
                newSanFang.caO = Number(newSanFang.caO).toFixed(2) === str ? null : Number(newSanFang.caO).toFixed(2);   // 氧化钙含量
                newSanFang.mgO = Number(newSanFang.mgO).toFixed(2) === str ? null : Number(newSanFang.mgO).toFixed(2);      // 氧化镁含量
                newSanFang.al2O3 = Number(newSanFang.al2O3).toFixed(2) === str ? null : Number(newSanFang.al2O3).toFixed(2);    // 氧化铝含量
                newSanFang.loI = Number(newSanFang.loI).toFixed(2) === str ? null : Number(newSanFang.loI).toFixed(2);    // 烧损
                newSanFang.feO = Number(newSanFang.feO).toFixed(4) === strFour ? null : Number(newSanFang.feO).toFixed(4);       // 氧化铁含量
                newSanFang.k2O = Number(newSanFang.k2O).toFixed(4) === strFour ? null : Number(newSanFang.k2O).toFixed(4);      // 氧化钾含量
                newSanFang.na2O = Number(newSanFang.na2O).toFixed(4) === strFour ? null : Number(newSanFang.na2O).toFixed(4);       // 氧化钠含量
                newSanFang.znO = Number(newSanFang.znO).toFixed(4) === strFour ? null : Number(newSanFang.znO).toFixed(4);       // 氧化锌含量
                newSanFang.s = Number(newSanFang.s).toFixed(4) === strFour ? null : Number(newSanFang.s).toFixed(4);         // 硫含量
                newSanFang.p = Number(newSanFang.p).toFixed(4) === strFour ? null : Number(newSanFang.p).toFixed(4);         // 磷含量
                newSanFang.tiO2 = Number(newSanFang.tiO2).toFixed(4) === strFour ? null : Number(newSanFang.tiO2).toFixed(4);        // 氧化钛含量
                newSanFang.sRatio = Number(newSanFang.sRatio).toFixed(2) === str ? null : Number(newSanFang.sRatio).toFixed(2);    // 入炉料筛下率
                newSanFang.price = Number(newSanFang.price).toFixed(2) === str ? null : Number(newSanFang.price).toFixed(2); // 价格
                newSanFang.ratio = Number(newSanFang.ratio).toFixed(2) === str ? null : Number(newSanFang.ratio).toFixed(2);        // 配比
                newData[12] = newSanFang
                newData[12]["name"] = "入炉焦炭";
                newData[12]["line"] = 13
                this.setState({
                    visible: false,
                    GaoList: newData
                })
            }
        }
        if (this.state.models === "weirulu") {
            if (this.state.newWeiRu === null) {
                this.setState({
                    visible: true
                })
                message.warning("不能导入空的内容！")
            } else {
                const newData = this.state.GaoList.slice(0);
                const newSanFang = Object.assign({}, this.state.newWeiRu);
                ////console.log(newSanFang)
                newSanFang.tFe = Number(newSanFang.tFe).toFixed(2) === str ? null : Number(newSanFang.tFe).toFixed(2);
                newSanFang.siO2 = Number(newSanFang.siO2).toFixed(2) === str ? null : Number(newSanFang.siO2).toFixed(2);     // 二氧化硅含量
                newSanFang.caO = Number(newSanFang.caO).toFixed(2) === str ? null : Number(newSanFang.caO).toFixed(2);   // 氧化钙含量
                newSanFang.mgO = Number(newSanFang.mgO).toFixed(2) === str ? null : Number(newSanFang.mgO).toFixed(2);      // 氧化镁含量
                newSanFang.al2O3 = Number(newSanFang.al2O3).toFixed(2) === str ? null : Number(newSanFang.al2O3).toFixed(2);    // 氧化铝含量
                newSanFang.loI = Number(newSanFang.loI).toFixed(2) === str ? null : Number(newSanFang.loI).toFixed(2);    // 烧损
                newSanFang.feO = Number(newSanFang.feO).toFixed(4) === strFour ? null : Number(newSanFang.feO).toFixed(4);       // 氧化铁含量
                newSanFang.k2O = Number(newSanFang.k2O).toFixed(4) === str ? null : Number(newSanFang.k2O).toFixed(4);      // 氧化钾含量
                newSanFang.na2O = Number(newSanFang.na2O).toFixed(42) === str ? null : Number(newSanFang.na2O).toFixed(4);       // 氧化钠含量
                newSanFang.znO = Number(newSanFang.znO).toFixed(4) === str ? null : Number(newSanFang.znO).toFixed(4);       // 氧化锌含量
                newSanFang.s = Number(newSanFang.s).toFixed(4) === str ? null : Number(newSanFang.s).toFixed(4);         // 硫含量
                newSanFang.p = Number(newSanFang.p).toFixed(4) === str ? null : Number(newSanFang.p).toFixed(4);         // 磷含量
                newSanFang.tiO2 = Number(newSanFang.tiO2).toFixed(4) === str ? null : Number(newSanFang.tiO2).toFixed(4);        // 氧化钛含量
                newSanFang.sRatio = Number(newSanFang.sRatio).toFixed(2) === str ? null : Number(newSanFang.sRatio).toFixed(2);    // 入炉料筛下率
                newSanFang.price = Number(newSanFang.price).toFixed(2) === str ? null : Number(newSanFang.price).toFixed(2); // 价格
                newSanFang.ratio = Number(newSanFang.ratio).toFixed(2) === str ? null : Number(newSanFang.ratio).toFixed(2); // 价格
                newData[14] = newSanFang
                newData[14]["name"] = "未入炉焦炭"
                newData[14]["line"] = 15
                this.setState({
                    visible: false,
                    GaoList: newData
                })
            }

        }
        if (this.state.models === "penchuimei") {
            //////console.log(this.state.newPen)
            if (this.state.newPen === null) {
                this.setState({
                    visible: true
                })
                message.warning("不能导入空的内容！")
            } else {
                const newData = this.state.GaoList.slice(0);
                const newSanFang = Object.assign({}, this.state.newPen);
                newSanFang.tFe = Number(newSanFang.tFe).toFixed(2) === str ? null : Number(newSanFang.tFe).toFixed(2);
                newSanFang.siO2 = Number(newSanFang.siO2).toFixed(2) === str ? null : Number(newSanFang.siO2).toFixed(2);     // 二氧化硅含量
                newSanFang.caO = Number(newSanFang.caO).toFixed(2) === str ? null : Number(newSanFang.caO).toFixed(2);   // 氧化钙含量
                newSanFang.mgO = Number(newSanFang.mgO).toFixed(2) === str ? null : Number(newSanFang.mgO).toFixed(2);      // 氧化镁含量
                newSanFang.al2O3 = Number(newSanFang.al2O3).toFixed(2) === str ? null : Number(newSanFang.al2O3).toFixed(2);    // 氧化铝含量
                newSanFang.loI = Number(newSanFang.loI).toFixed(2) === str ? null : Number(newSanFang.loI).toFixed(2);    // 烧损
                newSanFang.feO = Number(newSanFang.feO).toFixed(4) === strFour ? null : Number(newSanFang.feO).toFixed(4);       // 氧化铁含量
                newSanFang.k2O = Number(newSanFang.k2O).toFixed(4) === str ? null : Number(newSanFang.k2O).toFixed(4);      // 氧化钾含量
                newSanFang.na2O = Number(newSanFang.na2O).toFixed(42) === str ? null : Number(newSanFang.na2O).toFixed(4);       // 氧化钠含量
                newSanFang.znO = Number(newSanFang.znO).toFixed(4) === str ? null : Number(newSanFang.znO).toFixed(4);       // 氧化锌含量
                newSanFang.s = Number(newSanFang.s).toFixed(4) === str ? null : Number(newSanFang.s).toFixed(4);         // 硫含量
                newSanFang.p = Number(newSanFang.p).toFixed(4) === str ? null : Number(newSanFang.p).toFixed(4);         // 磷含量
                newSanFang.tiO2 = Number(newSanFang.tiO2).toFixed(4) === str ? null : Number(newSanFang.tiO2).toFixed(4);        // 氧化钛含量
                newSanFang.sRatio = Number(newSanFang.sRatio).toFixed(2) === str ? null : Number(newSanFang.sRatio).toFixed(2);    // 入炉料筛下率
                newSanFang.price = Number(newSanFang.price).toFixed(2) === str ? null : Number(newSanFang.price).toFixed(2); // 价格
                newSanFang.ratio = Number(newSanFang.ratio).toFixed(2) === str ? null : Number(newSanFang.ratio).toFixed(2);        // 配比
                newData[13] = newSanFang
                newData[13]["name"] = "喷吹煤"
                newData[13]["line"] = 14;
                this.setState({
                    visible: false,
                    GaoList: newData
                })
            }

        }
        if (this.state.models === "else") {
            if (this.state.newElse === null) {
                this.setState({
                    visible: true
                })
                message.warning("不能导入空的内容！")
            } else {
                const newData = this.state.GaoList.slice(0);
                const newSanFang = Object.assign({}, this.state.newElse);
                newSanFang.tFe = Number(newSanFang.tFe).toFixed(2) === str ? null : Number(newSanFang.tFe).toFixed(2);
                newSanFang.siO2 = Number(newSanFang.siO2).toFixed(2) === str ? null : Number(newSanFang.siO2).toFixed(2);     // 二氧化硅含量
                newSanFang.caO = Number(newSanFang.caO).toFixed(2) === str ? null : Number(newSanFang.caO).toFixed(2);   // 氧化钙含量
                newSanFang.mgO = Number(newSanFang.mgO).toFixed(2) === str ? null : Number(newSanFang.mgO).toFixed(2);      // 氧化镁含量
                newSanFang.al2O3 = Number(newSanFang.al2O3).toFixed(2) === str ? null : Number(newSanFang.al2O3).toFixed(2);    // 氧化铝含量
                newSanFang.loI = Number(newSanFang.loI).toFixed(2) === str ? null : Number(newSanFang.loI).toFixed(2);    // 烧损
                newSanFang.feO = Number(newSanFang.feO).toFixed(4) === strFour ? null : Number(newSanFang.feO).toFixed(4);       // 氧化铁含量
                newSanFang.k2O = Number(newSanFang.k2O).toFixed(4) === str ? null : Number(newSanFang.k2O).toFixed(4);      // 氧化钾含量
                newSanFang.na2O = Number(newSanFang.na2O).toFixed(4) === str ? null : Number(newSanFang.na2O).toFixed(4);       // 氧化钠含量
                newSanFang.znO = Number(newSanFang.znO).toFixed(4) === str ? null : Number(newSanFang.znO).toFixed(4);       // 氧化锌含量
                newSanFang.s = Number(newSanFang.s).toFixed(4) === str ? null : Number(newSanFang.s).toFixed(4);         // 硫含量
                newSanFang.p = Number(newSanFang.p).toFixed(4) === str ? null : Number(newSanFang.p).toFixed(4);         // 磷含量
                newSanFang.tiO2 = Number(newSanFang.tiO2).toFixed(4) === str ? null : Number(newSanFang.tiO2).toFixed(4);        // 氧化钛含量
                newSanFang.sRatio = Number(newSanFang.sRatio).toFixed(2) === str ? null : Number(newSanFang.sRatio).toFixed(2);    // 入炉料筛下率
                newSanFang.price = Number(newSanFang.price).toFixed(2) === str ? null : Number(newSanFang.price).toFixed(2); // 价格
                newSanFang.ratio = Number(newSanFang.ratio).toFixed(2) === str ? null : Number(newSanFang.ratio).toFixed(2);        // 配比
                newData[6] = newSanFang
                newData[6]["name"] = "其他入炉料";
                newData[6]["line"] = 7;
                this.setState({
                    visible: false,
                    GaoList: newData
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

    onChange = e => {
        //////console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    infoKuang(name, index) {
        return (e) => {
            const value = e.target.value === undefined ? e.target.checked : e.target.value;
            const newData = this.state.GaoList.slice();
            newData[index][name] = value;
            this.setState({ GaoList: newData })
            const sub = {
                dataNumber: 0
            }
            this.state.GaoList.forEach((item, index) => {
                if (index <= 11) {
                    sub.dataNumber += Number(item.ratio)
                }
            })
            //console.log(sub.dataNumber)
            this.setState({
                dataNumber: sub.dataNumber
            })
        }
    }
    setModelGaoLu() {
        this.setState({
            visible: true,
            models: "setInfo"
        });
    }
    daoRuGaoLu() {
        this.setState({
            visible: true,
            models: "daoru"
        });
    }
    //明细导入
    mingxi() {
        this.setState({
            visible: true,
            models: "mingxi"
        });
    }
    //入炉料
    ruluModel() {
        this.setState({
            visible: true,
            models: "ruluJiao"
        });
    }
    //为入炉料
    weiRuLu() {
        this.setState({
            visible: true,
            models: "weirulu"
        });
    }
    //喷吹煤
    penChuiMei() {
        this.setState({
            visible: true,
            models: "penchuimei"
        });
    }
    //其他炉料
    elseModel() {
        this.setState({
            visible: true,
            models: "else"
        });
    }
    //炉渣系数的参数
    LuZha(rslag) {
        return (e) => {
            const value = e.target.value;
            const newList = this.state.luzha;
            newList[rslag] = value;
            this.setState({ luzha: newList })
            //////console.log(this.state.luzha)
            if (this.state.luzha.isFixAlkali === false) {
                this.setState({
                    one: true,
                    two: true,
                    three: true,
                })
            } else {
                this.setState({
                    one: false,
                    two: false,
                    three: false,
                })
            }
        }

    }
    //
    shajieK(value) {
        this.setState({
            valueShao: value
        })
    }
    shajieQ(valueQ) {
        this.setState({
            valueQiu: valueQ
        })
    }
    canSetInfo(c) {
        this.setState({
            luzha: c
        })
    }
    sonInfo(son) {
        this.setState({
            sonInfoValue: son
        })
    }
    grandFetherChildSon(sonKeBian) {
        this.setState({
            sonKebianInfo: Number(sonKeBian).toFixed(4)
        })

    }
    //导入数据接收的那一条数据
    bbbb(value) {
        //////console.log(value)
        this.setState({
            SanFang: value
        })
    }
    //导入数据接收的序号
    cccc(values) {
        //////console.log(values);
        this.setState({
            navData: values
        })

    }
    elseModelData(elseData) {
        //////console.log(elseData)
        //  var newElse = null;
        this.setState({
            newElse: elseData
        })
    }
    getRuLuTan(ruTan) {
        //////console.log(ruTan)
        this.setState({
            newTan: ruTan
        })
    }
    getPenChuiList(getPen) {
        this.setState({
            newPen: getPen
        })
    }
    getWeiRuLu(newWei) {
        this.setState({
            newWeiRu: newWei
        })
    }

    //计算
    computedInfo() {
        axios.post("/api/estimate-gl/", {
            purpose: this.state.tabKeys === "2" ? 159 : this.state.tabKeys === "3" ? 179 : 9,
            para: {
                purpose: this.state.tabKeys === "2" ? 159 : this.state.tabKeys === "3" ? 179 : 9, // 9: 高炉计算
                felron: this.state.luzha.felron === "" || this.state.luzha.felron === null ? "0" : this.state.luzha.felron,       // 铁水铁含量
                silron: this.state.luzha.silron === "" || this.state.luzha.silron === null ? "0" : this.state.luzha.silron,      // 铁水硅含量
                f10: this.state.luzha.f10 === "" || this.state.luzha.f10 === null ? "0" : this.state.luzha.f10,           // S渣铁分配比
                f11: this.state.luzha.f11 === "" || this.state.luzha.f11 === null ? "0" : this.state.luzha.f11,            // Ti收得率
                f13: this.state.luzha.f13 === "" || this.state.luzha.f13 === null ? "0" : this.state.luzha.f13,           // 入炉品位升降1%加扣燃料比
                f14: this.state.luzha.f14 === "" || this.state.luzha.f14 === null ? "0" : this.state.luzha.f14,
                f15: this.state.luzha.f15 === "" || this.state.luzha.f15 === null ? "0" : this.state.luzha.f15,
                f9: this.state.luzha.f9 === "" || this.state.luzha.f9 === null ? "0" : this.state.luzha.f9,        // Fe元素渣中分配比
                f12: this.state.luzha.f12 === "" || this.state.luzha.f12 === null ? "0" : this.state.luzha.f12,           // 渣中其他成分含量
                cmr: this.state.luzha.cmr === "" || this.state.luzha.cmr === null ? "0" : this.state.luzha.cmr,        // 吨铁回收成本
                bashBurdenFe: this.state.luzha.bashBurdenFe === "" || this.state.luzha.bashBurdenFe === null ? "0" : this.state.luzha.bashBurdenFe,   // 基准入炉品位
                outS: this.state.luzha.outS === "" || this.state.luzha.outS === null ? "0" : this.state.luzha.outS,        // 铁水产量
                dustB: this.state.luzha.dustB === "" || this.state.luzha.dustB === null ? "0" : this.state.luzha.dustB,         // 高炉灰产生量
                dustBFe: this.state.luzha.dustBFe === "" || this.state.luzha.dustBFe === null ? "0" : this.state.luzha.dustBFe,         // 高炉灰品位
                cmd: this.state.luzha.cmd === "" || this.state.luzha.cmd === null ? "0" : this.state.luzha.cmd,    // 高炉可变加工费
                fcms: this.state.luzha.fcms === "" || this.state.luzha.fcms === null ? "0" : this.state.luzha.fcms,  // 高炉固定加工费
                isFixAlkali: this.state.luzha.isFixAlkali,       // 是否固定碱度
                rslag: this.state.luzha.rslag,        // 炉渣碱度
                sjId: this.state.valueShao === "" ? null : this.state.valueShao,          // 选择烧结行号
                qtId: this.state.valueQiu === "" ? null : this.state.valueQiu,         // 选择球团行号
                esti: 1
            },
            ore:
                this.state.GaoList.map((item, index) => {
                    return (
                        {
                            name: item.name,
                            isTotal: false,
                            purpose: this.state.tabKeys === "2" ? 159 : this.state.tabKeys === "3" ? 179 : 9,
                            line: item.line,
                            tFe: item.tFe === "" || item.tFe === null ? item.tFe = 0 : item.tFe,
                            siO2: item.siO2 === "" || item.siO2 === null ? item.siO2 = 0 : item.siO2,
                            caO: item.caO === "" || item.caO === null ? item.caO = 0 : item.caO,
                            mgO: item.mgO === "" || item.mgO === null ? item.mgO = 0 : item.mgO,
                            al2O3: item.al2O3 === "" || item.al2O3 === null ? item.al2O3 = 0 : item.al2O3,
                            loI: item.loI === "" || item.loI === null ? item.loI = 0 : item.loI,
                            feO: item.feO === "" || item.feO === null ? item.feO = 0 : item.feO,
                            k2O: item.k2O === "" || item.k2O === null ? item.k2O = 0 : item.k2O,
                            na2O: item.na2O === "" || item.na2O === null ? item.na2O = 0 : item.na2O,
                            znO: item.znO === "" || item.znO === null ? item.znO = 0 : item.znO,
                            s: item.s === "" || item.s === null ? item.s = 0 : item.s,
                            p: item.p === "" || item.p === null ? item.p = 0 : item.p,
                            tiO2: item.tiO2 === "" || item.tiO2 === null ? item.tiO2 = 0 : item.tiO2,
                            sRatio: item.sRatio === "" || item.sRatio === null ? item.sRatio = 0 : item.sRatio,
                            price: item.price === "" || item.price === null ? item.price = 0 : item.price,
                            ratio: item.ratio === "" || item.ratio === null ? item.ratio = 0 : item.ratio,
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

            if (res.data.error) {
                message.warning(res.data.error)
            } else {
                message.success("计算成功")
                this.setState({
                    Rtl: res.data.cost.rl.signalPUnit,//燃料，
                    Jtl: res.data.cost.jgcb.signalPUnit,//加工成本数据
                    Jgtl: res.data.cost.hscb.signalPUnit,//回收成本
                    Htl: res.data.cost.htyl.signalPUnit,//含铁料
                    GLHtl: res.data.cost.glhcb.signalPUnit,//高炉灰成本
                    HeJtl: res.data.cost.hj.signalPUnit,//铁水总成本
                    luz: res.data.source,//炉渣成分
                    qtc: res.data.source,//其他指标
                    ALL: res.data,//成本明细
                    HTYL: res.data.cost.htyl.ore,
                    s: res.data.ratio,
                    AllZong: res.data.tscb,//全厂贴水总成本
                    boolen: false,
                    HTYLORE: res.data.cost.htyl.ore,
                    RLORE: res.data.cost.rl.ore,
                    HTYLZ: res.data.cost.htyl,
                    RLZ: res.data.cost.rl,
                    HSCB: res.data.cost.hscb,
                    GLHCB: res.data.cost.glhcb,
                    JGCB: res.data.cost.jgcb,
                    HEJI: res.data.cost.hj,
                    flag: false,
                    number: 2,
                    hasSaved: res.data.hasSaved,
                    sj: res.data.ratio.sj,
                    qt: res.data.ratio.qt,
                    hjOne: res.data.cost.hj.signalPUnit
                }, () => {
                    if (this.state.luzha.isFixAlkali === true) {

                        const newData = this.state.GaoList.slice(0);
                        const newSanFang = Object.assign(this.state.valueQiu);
                        const newBalue = Object.assign(this.state.valueShao);
                        newData[newBalue - 1]["ratio"] = this.state.s.sj

                        this.setState({ GaoList: newData })
                        newData[newSanFang - 1]["ratio"] = this.state.s.qt

                        this.setState({ GaoList: newData })
                    } else {
                        return
                    }

                })
            }
        }).catch(err => {
            if (err.request.status === 500) {
                message.warning("请检查参数信息是否正确")
            } else if (err.request.status === 400) {
                message.warning("请检查参数信息是否正确")
            }
        })
        axios.post("/api/estimate-gl/", {
            purpose: this.state.tabKeys === "2" ? 179 : this.state.tabKeys === "3" ? 9 : 159,
            para: {
                purpose: this.state.tabKeys === "2" ? 179 : this.state.tabKeys === "3" ? 9 : 159, // 9: 高炉计算
                felron: this.state.luzhaOne.felron,       // 铁水铁含量
                silron: this.state.luzhaOne.silron,      // 铁水硅含量
                f10: this.state.luzhaOne.f10,           // S渣铁分配比
                f11: this.state.luzhaOne.f11,            // Ti收得率
                f13: this.state.luzhaOne.f13,           // 入炉品位升降1%加扣燃料比
                f14: this.state.luzhaOne.f14,
                f15: this.state.luzhaOne.f15,
                f9: this.state.luzhaOne.f9,        // Fe元素渣中分配比
                f12: this.state.luzhaOne.f12,           // 渣中其他成分含量
                cmr: this.state.luzhaOne.cmr,        // 吨铁回收成本
                bashBurdenFe: this.state.luzhaOne.bashBurdenFe,   // 基准入炉品位
                outS: this.state.luzhaOne.outS,        // 铁水产量
                dustB: this.state.luzhaOne.dustB,         // 高炉灰产生量
                dustBFe: this.state.luzhaOne.dustBFe,         // 高炉灰品位
                cmd: this.state.luzhaOne.cmd,    // 高炉可变加工费
                fcms: this.state.luzhaOne.fcms,  // 高炉固定加工费
                isFixAlkali: false,       // 是否固定碱度
                rslag: this.state.luzhaOne.rslag,        // 炉渣碱度
                sjId: this.state.luzhaOne.sjId,          // 选择烧结行号
                qtId: this.state.luzhaOne.qtId,         // 选择球团行号
                esti: 1
            },
            ore:
                this.state.gaoluTwo.map((item, index) => {
                    return (
                        {
                            name: item.name,
                            isTotal: false,
                            purpose: this.state.tabKeys === "2" ? 179 : this.state.tabKeys === "3" ? 9 : 159,
                            line: item.line,
                            tFe: item.tFe === "" || item.tFe === null ? item.tFe = 0 : item.tFe,
                            siO2: item.siO2 === "" || item.siO2 === null ? item.siO2 = 0 : item.siO2,
                            caO: item.caO === "" || item.caO === null ? item.caO = 0 : item.caO,
                            mgO: item.mgO === "" || item.mgO === null ? item.mgO = 0 : item.mgO,
                            al2O3: item.al2O3 === "" || item.al2O3 === null ? item.al2O3 = 0 : item.al2O3,
                            loI: item.loI === "" || item.loI === null ? item.loI = 0 : item.loI,
                            feO: item.feO === "" || item.feO === null ? item.feO = 0 : item.feO,
                            k2O: item.k2O === "" || item.k2O === null ? item.k2O = 0 : item.k2O,
                            na2O: item.na2O === "" || item.na2O === null ? item.na2O = 0 : item.na2O,
                            znO: item.znO === "" || item.znO === null ? item.znO = 0 : item.znO,
                            s: item.s === "" || item.s === null ? item.s = 0 : item.s,
                            p: item.p === "" || item.p === null ? item.p = 0 : item.p,
                            tiO2: item.tiO2 === "" || item.tiO2 === null ? item.tiO2 = 0 : item.tiO2,
                            sRatio: item.sRatio === "" || item.sRatio === null ? item.sRatio = 0 : item.sRatio,
                            price: item.price === "" || item.price === null ? item.price = 0 : item.price,
                            ratio: item.ratio === "" || item.ratio === null ? item.ratio = 0 : item.ratio,
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
                hjTwo: res.data.cost.hj.signalPUnit
            })

        })
        axios.post("/api/estimate-gl/", {
            purpose: this.state.tabKeys === "2" ? 9 : this.state.tabKeys === "3" ? 159 : 179,
            para: {
                purpose: this.state.tabKeys === "2" ? 9 : this.state.tabKeys === "3" ? 159 : 179, // 9: 高炉计算
                felron: this.state.luzhaTwo.felron,       // 铁水铁含量
                silron: this.state.luzhaTwo.silron,      // 铁水硅含量
                f10: this.state.luzhaTwo.f10,           // S渣铁分配比
                f11: this.state.luzhaTwo.f11,            // Ti收得率
                f13: this.state.luzhaTwo.f13,           // 入炉品位升降1%加扣燃料比
                f9: this.state.luzhaTwo.f9,        // Fe元素渣中分配比
                f12: this.state.luzhaTwo.f12,           // 渣中其他成分含量
                f14: this.state.luzhaTwo.f14,           // 渣中其他成分含量
                f15: this.state.luzhaTwo.f15,           // 渣中其他成分含量
                cmr: this.state.luzhaTwo.cmr,        // 吨铁回收成本
                bashBurdenFe: this.state.luzhaTwo.bashBurdenFe,   // 基准入炉品位
                outS: this.state.luzhaTwo.outS,        // 铁水产量
                dustB: this.state.luzhaTwo.dustB,         // 高炉灰产生量
                dustBFe: this.state.luzhaTwo.dustBFe,         // 高炉灰品位
                cmd: this.state.luzhaTwo.cmd,    // 高炉可变加工费
                fcms: this.state.luzhaTwo.fcms,  // 高炉固定加工费
                isFixAlkali: false,       // 是否固定碱度
                rslag: this.state.luzhaTwo.rslag,        // 炉渣碱度
                sjId: this.state.luzhaTwo.sjId,          // 选择烧结行号
                qtId: this.state.luzhaTwo.qtId,         // 选择球团行号
                esti: 1
            },
            ore:
                this.state.gaoluThree.map((item, index) => {
                    return (
                        {
                            name: item.name,
                            isTotal: false,
                            purpose: this.state.tabKeys === "2" ? 9 : this.state.tabKeys === "3" ? 159 : 179,
                            line: item.line,
                            tFe: item.tFe === "" || item.tFe === null ? item.tFe = 0 : item.tFe,
                            siO2: item.siO2 === "" || item.siO2 === null ? item.siO2 = 0 : item.siO2,
                            caO: item.caO === "" || item.caO === null ? item.caO = 0 : item.caO,
                            mgO: item.mgO === "" || item.mgO === null ? item.mgO = 0 : item.mgO,
                            al2O3: item.al2O3 === "" || item.al2O3 === null ? item.al2O3 = 0 : item.al2O3,
                            loI: item.loI === "" || item.loI === null ? item.loI = 0 : item.loI,
                            feO: item.feO === "" || item.feO === null ? item.feO = 0 : item.feO,
                            k2O: item.k2O === "" || item.k2O === null ? item.k2O = 0 : item.k2O,
                            na2O: item.na2O === "" || item.na2O === null ? item.na2O = 0 : item.na2O,
                            znO: item.znO === "" || item.znO === null ? item.znO = 0 : item.znO,
                            s: item.s === "" || item.s === null ? item.s = 0 : item.s,
                            p: item.p === "" || item.p === null ? item.p = 0 : item.p,
                            tiO2: item.tiO2 === "" || item.tiO2 === null ? item.tiO2 = 0 : item.tiO2,
                            sRatio: item.sRatio === "" || item.sRatio === null ? item.sRatio = 0 : item.sRatio,
                            price: item.price === "" || item.price === null ? item.price = 0 : item.price,
                            ratio: item.ratio === "" || item.ratio === null ? item.ratio = 0 : item.ratio,
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
                hjThree: res.data.cost.hj.signalPUnit
            })

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
                axios.post("/api/estimate-gl/", {
                    purpose: this.state.tabKeys === "2" ? 159 : this.state.tabKeys === "3" ? 179 : 9,
                    save_flag: true,
                    para: {
                        purpose: this.state.tabKeys === "2" ? 159 : this.state.tabKeys === "3" ? 179 : 9, // 9: 高炉计算
                        felron: this.state.luzha.felron,       // 铁水铁含量
                        silron: this.state.luzha.silron,      // 铁水硅含量
                        f10: this.state.luzha.f10,           // S渣铁分配比
                        f11: this.state.luzha.f11,            // Ti收得率
                        f13: this.state.luzha.f13,           // 入炉品位升降1%加扣燃料比
                        f14: this.state.luzha.f14,           // 渣中其他成分含量
                        f15: this.state.luzha.f15,           // 渣中其他成分含量
                        f9: this.state.luzha.f9,        // Fe元素渣中分配比
                        f12: this.state.luzha.f12,           // 渣中其他成分含量
                        cmr: this.state.luzha.cmr,        // 吨铁回收成本
                        bashBurdenFe: this.state.luzha.bashBurdenFe,   // 基准入炉品位
                        outS: this.state.luzha.outS,        // 铁水产量
                        dustB: this.state.luzha.dustB,         // 高炉灰产生量
                        dustBFe: this.state.luzha.dustBFe,         // 高炉灰品位
                        cmd: this.state.luzha.cmd,    // 高炉可变加工费
                        fcms: this.state.luzha.fcms,  // 高炉固定加工费
                        isFixAlkali: false,       // 是否固定碱度
                        rslag: this.state.luzha.rslag,        // 炉渣碱度
                        sjId: this.state.valueShao === "" ? null : this.state.valueShao,          // 选择烧结行号
                        qtId: this.state.valueQiu === "" ? null : this.state.valueQiu,         // 选择球团行号
                        esti: 1
                    },
                    ore:
                        this.state.GaoList.map((item, index) => {
                            return (
                                {
                                    name: item.name,
                                    isTotal: false,
                                    purpose: this.state.tabKeys === "2" ? 159 : this.state.tabKeys === "3" ? 179 : 9,
                                    line: item.line,
                                    tFe: item.tFe,
                                    siO2: item.siO2,
                                    caO: item.caO,
                                    mgO: item.mgO,
                                    al2O3: item.al2O3,
                                    loI: item.loI,
                                    feO: item.feO,
                                    k2O: item.k2O,
                                    na2O: item.na2O,
                                    znO: item.znO,
                                    s: item.s,
                                    p: item.p,
                                    tiO2: item.tiO2,
                                    sRatio: item.sRatio,
                                    price: item.price,
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
                        flag: false,
                        number: 3,

                    })
                    message.success("保存成功")

                }).catch(err => {
                    this.setState({
                        flag: false
                    })
                    //console.log(err)

                    if (err.request.status === 500) {
                        message.warning("请检查参数信息是否正确")
                    } else if (err.request.status === 400) {
                        message.warning("请检查参数信息是否正确")
                    } else if (err.request.status === 401) {
                        message.warning("您没有改权限!")
                    } else if (err.request.status === 404) {
                    }
                })
            }
        } else if (this.state.number === 1) {
            message.warning("不能直接保存，请先进行计算！")
        } else if (this.state.number === 3) {
            message.warning("请不要连续点击保存！")
        }



    }
    //生成报告
    ExportToExcel() {
        const data = this.state.GaoList // 准备的数据
        const data2 = this.state.HTYLORE // 准备的数据
        const data5 = this.state.RLORE // 准备的数据
        const data3 = [];
        data.forEach((item, index) => {
            data2.forEach((items, idx) => {
                if (index === idx) {
                    var obj = Object.assign(item, items);
                    data3.push(obj)
                }
            })
            data5.forEach((its, x) => {
                if ((index >= 12 && index <= 14) && index - 12 === x) {
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
            if (data3 && i <= 11) {
                let obj = {
                    '名称': data3[i].name,  // '列名': 数据
                    '单价': Number(data3[i].signalPrice).toFixed(2),
                    '单耗': Number(data3[i].signalUnit).toFixed(2),
                    '百分比1': Number(data3[i].precent1).toFixed(2),
                    '单成': Number(data3[i].signalUnit).toFixed(2),
                    '百分比2': Number(data3[i].precent2).toFixed(2),
                    'TFe': Number(data3[i].tFe).toFixed(2) === str ? null : Number(data3[i].tFe).toFixed(2),
                    'SiO2': Number(data3[i].siO2).toFixed(2),
                    'CaO': Number(data3[i].caO).toFixed(2),
                    'MgO': Number(data3[i].mgO).toFixed(2),
                    'Al2O3': Number(data3[i].al2O3).toFixed(2),


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
            if (data3 && i > 11) {
                let obj = {
                    '名称': data3[i].name,  // '列名': 数据
                    '单价': Number(data3[i].signalPrice).toFixed(2),
                    '单耗': Number(data3[i].signalUnit).toFixed(2),
                    '百分比1': Number(data3[i].precent1).toFixed(2),
                    '单成': Number(data3[i].signalUnit).toFixed(2),
                    '百分比2': Number(data3[i].precent2).toFixed(2),
                    'TFe': Number(data3[i].tFe).toFixed(2),
                    'SiO2': Number(data3[i].siO2).toFixed(2),
                    'CaO': Number(data3[i].caO).toFixed(2),
                    'MgO': Number(data3[i].mgO).toFixed(2),
                    'Al2O3': Number(data3[i].al2O3).toFixed(2),
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
        if (this.state.HSCB) {
            let obj = {
                '名称': "回收成本",// '列名': 数据
                '单价': Number(this.state.HSCB.signalPrice).toFixed(2),
                '单耗': Number(this.state.HSCB.signalUnit).toFixed(2),
                '百分比1': Number(this.state.HSCB.precent1).toFixed(2),
                '单成': Number(this.state.HSCB.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.HSCB.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }
        if (this.state.GLHCB) {
            let obj = {
                '名称': "高炉灰成本",// '列名': 数据
                '单价': Number(this.state.GLHCB.signalPrice).toFixed(2),
                '单耗': Number(this.state.GLHCB.signalUnit).toFixed(2),
                '百分比1': Number(this.state.GLHCB.precent1).toFixed(2),
                '单成': Number(this.state.GLHCB.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.GLHCB.precent2).toFixed(2),
            }
            dataTable.push(obj);
        }
        if (this.state.JGCB) {
            let obj = {
                '名称': "加工费成本",// '列名': 数据
                '单价': Number(this.state.JGCB.signalPrice).toFixed(2),
                '单耗': Number(this.state.JGCB.signalUnit).toFixed(2),
                '百分比1': Number(this.state.JGCB.precent1).toFixed(2),
                '单成': Number(this.state.JGCB.signalPUnit).toFixed(2),
                '百分比2': Number(this.state.JGCB.precent2).toFixed(2),
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
        option.fileName = '高炉一成本明细--' + dateFormat  //导出的Excel文件名

        option.datas = [
            {
                sheetData: dataTable,
                sheetName: '高炉一成本明细',
                sheetFilter: ['名称', "单价", "单耗", '百分比1', "单成", "百分比2", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "K2O", "Na2O", "ZnO", "S", "P", "TiO2", "价格", "配比"],
                sheetHeader: ['名称', "单价", "单耗", '百分比1', "单成", "百分比2", "TFe", "SiO2", "CaO", "MgO", "Al2O3", "K2O", "Na2O", "ZnO", "S", "P", "TiO2", "价格", "配比"],
            }
        ]

        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }
    clearItem() {
        this.state.GaoList.forEach((item, index) => {
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
    mustNumber(e) {
        if (!e.target.value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')) {
            e.target.value = ''
        }

    }
    render() {
        let tscb = ((Number(this.state.outSone) * this.state.hjOne) + (Number(this.state.outSTwo) * this.state.hjTwo) + (Number(this.state.outSThree) * this.state.hjThree)) / (Number(this.state.outSone) + Number(this.state.outSTwo) + Number(this.state.outSThree))

        const sub = {
            dataNumber: 0
        }
        this.state.GaoList.forEach((item, index) => {
            if (index <= 11) {
                sub.dataNumber += Number(item.ratio)
            }
        })
        return (
            <div>
                <div className="outersphere">
                    <div className="qingkong">
                        <Button type="primary" onClick={this.clearItem.bind(this)} >
                            <img src={require("../../img/btn_delete.png")} alt="" />
                            删除
                        </Button>
                        <Button onClick={this.ExportToExcel.bind(this)} className="daochucesuanbaio" type="primary" >
                            <img src={require("../../img/btn_add.png")} alt="" />
                            导出测算表
                        </Button>
                    </div>
                    <div className="tableoneGaolu">
                        <table className="table-th">
                            <tbody>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td style={{ width: 40 }}>序号</td>
                                    <td>名称</td>
                                    <td>TFe</td>
                                    <td>SiO2</td>
                                    <td>CaO</td>
                                    <td>MgO</td>
                                    <td>AL2O3</td>
                                    {/* <td>烧损</td> */}
                                    <td>FeO</td>
                                    <td>K2O</td>
                                    <td>Na2O</td>
                                    <td>ZnO</td>
                                    <td>S</td>
                                    <td>P</td>
                                    <td>TiO2</td>
                                    {/* <td>筛下率</td> */}
                                    <td>价格</td>
                                    <td>配比</td>
                                </tr>
                                {
                                    this.state.GaoList.map((item, index) => {
                                        if (index <= 11) {
                                            return (
                                                <tr key={index} className={index <= 6 ? "table-th-tr" : "shihui"}>
                                                    <td><Checkbox onChange={this.infoKuang("bolen", index).bind(this)} id={String(index + 1)} checked={item.bolen} /></td>
                                                    {
                                                        index === 6 ?
                                                            <td >
                                                                <button
                                                                    onClick={this.elseModel.bind(this)}

                                                                    className="btnsan"
                                                                >{index + 1}</button></td> :
                                                            <td >{index + 1}</td>
                                                    }

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
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.al2O3 === str || item.al2O3 === 0 ? null : item.al2O3}
                                                        onChange={this.infoKuang("al2O3", index).bind(this)}
                                                    ></Input></td>
                                                    {/* <td><Input

                                                            value={item.loI === str || item.loI === 0 ? null : item.loI}
                                                            onChange={this.infoKuang("loI", index).bind(this)}
                                                        ></Input></td> */}
                                                    <td><Input

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
                                                    {/* <td><Input

                                                            value={item.sRatio === str || item.sRatio === 0 ? null : item.sRatio}
                                                            onChange={this.infoKuang("sRatio", index).bind(this)}
                                                        ></Input></td> */}

                                                    <td><Input

                                                        value={item.price === str || item.price === 0 ? null : item.price}
                                                        onChange={this.infoKuang("price", index).bind(this)}
                                                    ></Input></td>
                                                    <td>
                                                        <Tooltip
                                                            placement="right"
                                                            title={"当前配比" + (Number(sub.dataNumber).toFixed(2)) + ",距配比100差" + (Number(100 - sub.dataNumber).toFixed(2))}

                                                        >
                                                            <Input onKeyUp={this.mustNumber.bind(this)}
                                                                value={item.ratio === 0 || item.ratio === str ? null : item.ratio}
                                                                onChange={this.infoKuang("ratio", index).bind(this)}

                                                            ></Input>
                                                        </Tooltip>

                                                    </td>
                                                </tr>
                                            )
                                        }
                                        return null;
                                    })
                                }
                                {
                                    this.state.GaoList.map((item, index) => {
                                        if (index >= 12) {
                                            return (
                                                <tr key={index} className="else">
                                                    <td><Checkbox onChange={this.infoKuang("bolen", index).bind(this)} id={String(index + 1)} checked={item.bolen} /></td>


                                                    <td >
                                                        <button
                                                            onClick={index === 12 ? this.ruluModel.bind(this) : index === 13 ? this.penChuiMei.bind(this) : index === 14 ? this.weiRuLu.bind(this) : null}

                                                            className="btnsan"
                                                        >{index + 1}</button></td>


                                                    <td>
                                                        <Input

                                                            value={item.name}
                                                            onChange={this.infoKuang("name", index).bind(this)}
                                                        >
                                                        </Input>
                                                    </td>
                                                    <td>
                                                        <Input
                                                            onKeyUp={this.mustNumber.bind(this)}
                                                            value={item.tFe === str || item.tFe === 0 || item.tFe === "NaN" ? null : item.tFe}
                                                            onChange={this.infoKuang("tFe", index).bind(this)}
                                                        >
                                                        </Input>
                                                    </td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.siO2 === str || item.siO2 === 0 || item.siO2 === "NaN" ? null : item.siO2}
                                                        onChange={this.infoKuang("siO2", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.caO === str || item.caO === 0 || item.caO === "NaN" ? null : item.caO}
                                                        onChange={this.infoKuang("caO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.mgO === str || item.mgO === 0 || item.mgO === "NaN" ? null : item.mgO}
                                                        onChange={this.infoKuang("mgO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.al2O3 === str || item.al2O3 === 0 || item.al2O3 === "NaN" ? null : item.al2O3}
                                                        onChange={this.infoKuang("al2O3", index).bind(this)}
                                                    ></Input></td>
                                                    {/* <td><Input

                                                            value={item.loI === str || item.loI === 0 ? null : item.loI}
                                                            onChange={this.infoKuang("loI", index).bind(this)}
                                                        ></Input></td> */}
                                                    <td><Input

                                                        value={item.feO === str || item.feO === 0 || item.feO === "NaN" ? null : item.feO}
                                                        onChange={this.infoKuang("feO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.k2O === strFour || item.k2O === 0 || item.k2O === "NaN" ? null : item.k2O}
                                                        onChange={this.infoKuang("k2O", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.na2O === strFour || item.na2O === 0 || item.na2O === "NaN" ? null : item.na2O}
                                                        onChange={this.infoKuang("na2O", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.znO === strFour || item.znO === 0 || item.znO === "NaN" ? null : item.znO}
                                                        onChange={this.infoKuang("znO", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.s === strFour || item.s === 0 || item.s === "NaN" ? null : item.s}
                                                        onChange={this.infoKuang("s", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.p === strFour || item.p === 0 || item.p === "NaN" ? null : item.p}
                                                        onChange={this.infoKuang("p", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.tiO2 === strFour || item.tiO2 === 0 || item.tiO2 === "NaN" ? null : item.tiO2}
                                                        onChange={this.infoKuang("tiO2", index).bind(this)}
                                                    ></Input></td>
                                                    {/* <td><Input

                                                            value={item.sRatio === str || item.sRatio === 0 ? null : item.sRatio}
                                                            onChange={this.infoKuang("sRatio", index).bind(this)}
                                                        ></Input></td> */}

                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.price === str || item.price === 0 || item.price === "NaN" ? null : item.price}
                                                        onChange={this.infoKuang("price", index).bind(this)}
                                                    ></Input></td>
                                                    <td><Input
                                                        onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.ratio === str || item.ratio === 0 || item.ratio === "NaN" ? null : item.ratio}
                                                        onChange={this.infoKuang("ratio", index).bind(this)}
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
                            <span className="titles">1-7:其他入炉料/13-14：配比分别为焦比和煤比/15：未入炉焦炭&nbsp;&nbsp;&nbsp;&nbsp;配比单位：%</span>
                            <span className="work">
                                <Button type="primary" onClick={this.daoRuGaoLu.bind(this)}>导入其他入炉料</Button>

                            </span>
                        </span>
                    </div>
                    <div className="tabletwo">
                        <div className="setcanshugaolu">
                            <span>参数设置及计算方式选择</span>
                            <Radio.Group onChange={this.LuZha("isFixAlkali").bind(this)} value={this.state.luzha.isFixAlkali} defaultValue={this.state.luzha.isFixAlkali === false}>
                                <Radio value={false}>不固定炉渣碱度</Radio>
                                <Radio value={true} >固定炉渣碱度</Radio>
                            </Radio.Group>
                            <label>炉渣碱度</label>
                            <Input
                                style={{ height: 30 }}
                                disabled={this.state.one}
                                value={this.state.luzha.rslag}
                                onChange={this.LuZha("rslag").bind(this)}
                            /><br></br>
                            <label>调整碱度所用烧结系列</label>
                            <Select
                                showSearch

                                style={{ marginTop: 20, width: 62, height: 20 }}
                                optionFilterProp="children"
                                onChange={this.shajieK.bind(this)}
                                disabled={this.state.two}
                                defaultValue={this.state.luzha.sjId}

                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    this.state.GaoList.map((item, index) => {
                                        if (index >= 7 && index <= 9) {
                                            return (
                                                <Option value={index + 1} key={index}>
                                                    {index + 1}
                                                </Option>
                                            )
                                        }
                                        return null;
                                    })
                                }

                            </Select><br></br>
                            <label>调整碱度所用球团系列</label>
                            <Select
                                showSearch
                                style={{ marginTop: 20, width: 62, height: 20 }}
                                optionFilterProp="children"
                                onChange={this.shajieQ.bind(this)}
                                disabled={this.state.three}
                                defaultValue={this.state.luzha.qtId}

                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    this.state.GaoList.map((item, index) => {
                                        if (index >= 10 && index <= 11) {
                                            return (
                                                <Option value={index + 1} key={index} >
                                                    {index + 1}
                                                </Option>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </Select><br></br>
                            <Button type="primary" className="setalse" onClick={this.setModelGaoLu.bind(this)}>其他参数设置</Button>
                        </div>
                        <div style={{ float: "left" }}>
                            <div className="tabletwo_one_gaolu">
                                <span>计算结果</span>
                                <h5>铁水成本 元/t 铁</h5>
                                <table className="tabletwo_one_table">
                                    <tbody>
                                        <tr className="nametd">
                                            <td>原料成本</td>
                                            <td>燃料成本</td>
                                            <td>加工成本</td>
                                            <td>回收成本</td>
                                            <td>高炉灰成本</td>
                                            <td>铁水总成本</td>
                                        </tr>
                                        <tr className="shujutd">
                                            <td>{Number(this.state.Htl).toFixed(2)}</td>
                                            <td>{Number(this.state.Rtl).toFixed(2)}</td>
                                            <td>{Number(this.state.Jtl).toFixed(2)}</td>
                                            <td>{Number(this.state.Jgtl).toFixed(2)}</td>
                                            <td>{Number(this.state.GLHtl).toFixed(2)}</td>
                                            <td>{Number(this.state.HeJtl).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h5>炉渣成分</h5>
                                <table className="tabletwo_one_table">
                                    <tbody>
                                        <tr className="nametd">
                                            <td>SiO2%</td>
                                            <td>CaO%</td>
                                            <td>MgO%</td>
                                            <td>AL2O3%</td>
                                            <td>S%</td>
                                            <td>TiO2%</td>
                                            <td>R:%</td>
                                            <td>渣量kg/t</td>
                                        </tr>
                                        <tr className="shujutd">
                                            <td>{Number(this.state.luz.SiO2Slag).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.CaOSlag).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.MgOSlag).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.Al2O3Slag).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.SSlag).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.TiO2Slag).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.RSlag).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.ZL).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h5>其他指标</h5>
                                <table className="tabletwo_one_table">
                                    <tbody>
                                        <tr className="nametd">
                                            <td>入炉品位<br />%</td>
                                            <td>矿耗<br />kg/t</td>
                                            <td>实际焦比<br />kg/t</td>
                                            <td>实际煤比<br />kg/t</td>
                                            <td>实际产量<br />万吨/月</td>
                                            <td>硫负荷<br />kg/t</td>
                                            <td>碱负荷<br />kg/t</td>
                                            <td>锌负荷<br />kg/t</td>
                                        </tr>
                                        <tr className="shujutd">
                                            <td>{Number(this.state.luz.TFeBF).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.G2Ore).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.cokeRate).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.coalRate).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.sjclwdy).toFixed(2)}</td>{/* 实际产量 */}
                                            <td>{Number(this.state.luz.SBurden).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.KNaBurden).toFixed(2)}</td>
                                            <td>{Number(this.state.luz.ZnBurden).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="footersbutton">
                                    <label>全厂铁水成本</label>
                                    <Input type="text" disabled={true} value={Number(this.state.hjOne !== 0 && this.state.hjTwo !== 0 && this.state.hjThree !== 0 ? tscb : 0).toFixed(2)} />
                                    <span>
                                        <Button type="primary" onClick={this.computedInfo.bind(this)}>计算</Button>
                                        <Button type="primary" onClick={this.mingxi.bind(this)} disabled={this.state.boolen}>铁水成本明细</Button>
                                        <Button type="primary" onClick={this.baoCun.bind(this)} disabled={this.state.keep === false ? this.state.flag : this.state.keep}>保存计算数据和设置</Button>
                                    </span>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                <Modal
                    title={this.state.models === "daoru" ? <BuildTitle title="导入高炉矿粉" tabKeys={this.state.tabKeys} /> : (this.state.models === "mingxi" ? <BuildTitle title="铁水成本明细" /> : (this.state.models === "ruluJiao" ?
                        <BuildTitle title="入炉焦炭" /> : ((this.state.models === "weirulu" ? <BuildTitle title="未入炉焦炭" /> : (this.state.models === "penchuimei" ? <BuildTitle title="喷吹煤" /> : (this.state.models === "else" ? <BuildTitle title="其他入炉料" /> : <BuildTitle title="其他参数设置" />)))))
                    )}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose={this.state.models === "setInfo" ? false : true}
                >
                    {
                        this.state.models === "daoru" ?
                            <WrappedDemo
                                tabKeys={this.state.tabKeys}
                                GaoList={this.state.GaoList}
                                getData={this.bbbb.bind(this)}
                                getXu={this.cccc.bind(this)}
                                ref="validate_other" /> :
                            (this.state.models === "mingxi" ?
                                <MingXi
                                    ALL={this.state.ALL}
                                /> :
                                (this.state.models === "ruluJiao" ? <RuLuJiao RuLuTan={this.getRuLuTan.bind(this)} ListName={this.state.ListName} tabKeys={this.state.tabKeys} /> : (this.state.models === "weirulu" ? <WeiRuLuJiao WeiRuLu={this.getWeiRuLu.bind(this)} tabKeys={this.state.tabKeys} /> : (this.state.models === "penchuimei" ? <PenChuiMei penChuiList={this.getPenChuiList.bind(this)} tabKeys={this.state.tabKeys} /> :
                                    (this.state.models === "else" ? <Else elseModels={this.elseModelData.bind(this)} tabKeys={this.state.tabKeys} /> :
                                        <EditerComponent
                                            canSet={this.canSetInfo.bind(this)}
                                            grandFether={this.sonInfo.bind(this)}
                                            grandFetherChild={this.grandFetherChildSon.bind(this)}
                                            tabKeys={this.state.tabKeys}
                                        />)))))
                    }

                </Modal>

            </div>

        )
    }
} 