import React, { Component } from "react";
import { Input, Button, message, Checkbox, Modal } from 'antd';
import WrappedBudgetFen from "./elsemodal/elsemodal.js"
import axios from "axios"
const list = []
for (let i = 0; i < 23; i++) {
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
        r: null,
        esti: null,
    })
}
// console.log(list)
export default class Else extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elseData: list,
            jieshouElseL: {
                tFe: 0,
                loI: 0,
                al2O3: 0,
                siO2: 0,
                feO: 0,
                caO: 0,
                mgO: 0,
                k2O: 0,
                na2O: 0,
                znO: 0,
                s: 0,
                p: 0,
                tiO2: 0,
                price: 0,
                ratio: 0,
                visible: false
            },
            flag: false,
            navData: "", //该状态为选中子组件的序号的状态
            SanFang: [],
            infoValueName: "",

        }
    }
    infoKuang(name, index) {
        return (e) => {
            const value = e.target.value === undefined ? e.target.checked : e.target.value;
            const newData = this.state.elseData;
            newData[index][name] = value;
            this.setState({ elseData: newData })
            //////console.log(this.state.elseData)
        }
    }
    UNSAFE_componentWillMount() {
        const url = window.location.search ? 2031 : this.props.tabKeys === "2" ? 160 : this.props.tabKeys === "3" ? 180 : 10
        axios.get(`/api/estimate-ore/recent/?purpose=${url}`, {
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
                elseData: res.data
            })
        })
    }
    exportkuangFen() {
        this.setState({
            visible: true
        })
    }
    computedElse() {
        this.setState({
            flag: true
        })
        const url = window.location.search ? 2031 : this.props.tabKeys === "2" ? 160 : this.props.tabKeys === "3" ? 180 : 10
        axios.post("/api/estimate-mean/", {
            purpose: url,
            ore:
                this.state.elseData.map((item, index) => {
                    return (
                        {
                            name: item.name,
                            purpose: url,
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
            if (res.status) {
                message.success("计算完成！")
                this.setState({
                    jieshouElseL: res.data.amount,
                    flag: false,
                }, () => {
                    this.props.elseModels(this.state.jieshouElseL)
                })
            }

            //////console.log(res)
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
                message.warning("你没有该权限！")

            }

        })
    }
    //清空数据，不是实际清空，只是在前端页面替换空的数据
    delet() {
        this.state.elseData.forEach((item, index) => {
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
                item.sRatio = null
                item.feO = null
                this.setState({
                    elseData: this.state.elseData
                })
            }
        })
    }
    handleOk = e => {
        this.refs.addfen.validateFields((err, values) => {
            if (this.state.infoValueName === "入炉料") {
                this.state.SanFang.forEach((item) => {
                    if (item.name === values.name && item.incomingDate === values.time) {
                        const newListData = this.state.elseData.slice(0);
                        console.log(item)
                        const newSanFang = Object.assign({}, item);
                        newSanFang.source["name"] = newSanFang.name;
                        newSanFang.source["line"] = this.state.navData
                        newSanFang.source["price"] = newSanFang.price;
                        newSanFang.source["sRatio"] = newSanFang.sRatio;
                        newSanFang.source["ratio"] = "0.00"
                        newListData[this.state.navData - 1] = newSanFang.source;
                        this.setState({
                            elseData: newListData,
                            visible: false
                        })
                        //  //console.log(this.state.ListData);
                    }
                })
            } else if (this.state.infoValueName === "熔剂") {
                this.state.SanFang.forEach((item) => {
                    if (item.name === values.name && item.incomingDate === values.time) {
                        const newListData = this.state.elseData.slice(0);
                        console.log(item)
                        const newSanFang = Object.assign({}, item);

                        newSanFang["line"] = this.state.navData
                        newSanFang["caO"] = newSanFang.CaO
                        newSanFang["tFe"] = newSanFang.TFe
                        newSanFang["feO"] = newSanFang.FeO
                        newSanFang["k2O"] = newSanFang.K2O
                        newSanFang["loI"] = newSanFang.LOI;
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
                        newSanFang["sRatio"] = "0.00"
                        newSanFang["ratio"] = "0.00"
                        newSanFang["s"] = newSanFang.S
                        newSanFang["p"] = newSanFang.P
                        newSanFang["line"] = this.state.navData
                        newListData[this.state.navData - 1] = newSanFang;
                        this.setState({
                            elseData: newListData,
                            visible: false
                        })
                        //  //console.log(this.state.ListData);
                    }
                })
            } else if (this.state.infoValueName === "固废") {
                this.state.SanFang.forEach((item) => {
                    if (item.name === values.name && item.incomingDate === values.time) {
                        // //console.log(item);
                        const newListData = this.state.elseData.slice(0);
                        const newSanFang = Object.assign({}, item);
                        newSanFang["line"] = this.state.navData
                        newSanFang["caO"] = newSanFang.CaO
                        newSanFang["feO"] = newSanFang.FeO
                        newSanFang["k2O"] = newSanFang.K2O
                        newSanFang["loI"] = newSanFang.LOI
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
                        newSanFang["tFe"] = newSanFang.TFe
                        newSanFang["sRatio"] = "0.00"
                        newSanFang["s"] = newSanFang.S
                        newSanFang["p"] = newSanFang.P
                        newSanFang["ratio"] = "0.00"
                        newListData[this.state.navData - 1] = newSanFang;
                        this.setState({
                            elseData: newListData,
                            visible: false
                        })
                    }
                })
            } else if (this.state.infoValueName === "护炉料") {
                this.state.SanFang.forEach((item) => {
                    if (item.name === values.name && item.incomingDate === values.time) {
                        const newListData = this.state.elseData.slice(0);
                        console.log(item)
                        const newSanFang = Object.assign({}, item);
                        newSanFang.source["name"] = newSanFang.name;
                        newSanFang.source["price"] = newSanFang.price;
                        newSanFang.source["sRatio"] = newSanFang.sRatio;
                        newSanFang.source["line"] = this.state.navData
                        newSanFang.source["ratio"] = "0.00"
                        newListData[this.state.navData - 1] = newSanFang.source;
                        this.setState({
                            elseData: newListData,
                            visible: false
                        })
                        //  //console.log(this.state.ListData);
                    }
                })
            }

        })
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
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
    valueNameRadio(info) {
        ////console.log(info)
        this.setState({
            infoValueName: info
        })
    }
    render() {
        return (
            <div>
                <Button onClick={this.delet.bind(this)} style={{ position: "absolute", left: "530px", top: "-30px", height: "26px" }}>删除</Button>

                <table className="tableGufei">
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
                            {/* <td>烧损</td> */}
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
                            this.state.elseData.map((item, index) => {
                                return (
                                    <tr key={index} className="gufeiquest">
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
                                                value={item.tFe === "0.00" ? null : item.tFe}
                                                onChange={this.infoKuang("tFe", index).bind(this)}
                                            >
                                            </Input>
                                        </td>
                                        <td><Input
                                            value={item.siO2 === "0.00" ? null : item.siO2}
                                            onChange={this.infoKuang("siO2", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.caO === "0.00" ? null : item.caO}
                                            onChange={this.infoKuang("caO", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.mgO === "0.00" ? null : item.mgO}
                                            onChange={this.infoKuang("mgO", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.al2O3 === "0.00" ? null : item.al2O3}
                                            onChange={this.infoKuang("al2O3", index).bind(this)}
                                        ></Input></td>
                                        {/* <td><Input
                                            value={item.loI === "0.00" ? null : item.loI}
                                            onChange={this.infoKuang("loI", index).bind(this)}
                                        ></Input></td> */}
                                        <td><Input
                                            value={item.feO === "0.00" ? null : item.feO}
                                            onChange={this.infoKuang("feO", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.k2O === "0.0000" ? null : item.k2O}
                                            onChange={this.infoKuang("k2O", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.na2O === "0.0000" ? null : item.na2O}
                                            onChange={this.infoKuang("na2O", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.znO === "0.0000" ? null : item.znO}
                                            onChange={this.infoKuang("znO", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.s === "0.0000" ? null : item.s}
                                            onChange={this.infoKuang("s", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.p === "0.0000" ? null : item.p}
                                            onChange={this.infoKuang("p", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.tiO2 === "0.0000" ? null : item.tiO2}
                                            onChange={this.infoKuang("tiO2", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.price === "0.00" ? null : item.price}
                                            onChange={this.infoKuang("price", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.ratio === "0.00" ? null : item.ratio}
                                            onChange={this.infoKuang("ratio", index).bind(this)}
                                        ></Input></td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="jiachu">
                            <td>&nbsp;</td>
                            <td>21</td>
                            <td style={{ width: 130 }}>其他入炉料</td>
                            <td>{Number(this.state.jieshouElseL.tFe).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.siO2).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.caO).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.mgO).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.al2O3).toFixed(2)}</td>
                            {/* <td>{Number(this.state.jieshouElseL.loI).toFixed(2)}</td> */}
                            <td>{Number(this.state.jieshouElseL.feO).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.k2O).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.na2O).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.znO).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.s).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.p).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.tiO2).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.price).toFixed(2)}</td>
                            <td>{Number(this.state.jieshouElseL.ratio).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <Modal
                    title="导入矿粉"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}

                >
                    <WrappedBudgetFen
                        elseData={this.state.elseData}
                        getXu={this.cccc.bind(this)}
                        getData={this.bbbb.bind(this)}
                        ref="addfen"
                        valueNameRadio={this.valueNameRadio.bind(this)}
                    ></WrappedBudgetFen>
                </Modal>
                <Button onClick={this.computedElse.bind(this)} style={{ left: 10, bottom: -45, position: "absolute" }} disabled={this.state.flag}>计算其他入炉料平均成分和价格</Button>
                <Button onClick={this.exportkuangFen.bind(this)} style={{ left: 230, bottom: -45, position: "absolute" }} >导入矿粉</Button>

            </div>
        )
    }
}