import React, { Component, } from "react";
import { Input, Button, message } from "antd";
import axios from "axios"
export default class GaoLuKeBian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListFc: [
                {
                    line: 1,
                    item: "直接辅材",
                    unit: "吨",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 2,
                    item: "萤石",
                    unit: "吨",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 3,
                    item: "硅石",
                    unit: "吨",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 4,
                    item: "耐材",
                    unit: "吨",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 5,
                    item: "大型工具",
                    unit: "元",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 6,
                    item: "工艺件",
                    unit: "元",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                },
            ],
            ListDl: [
                {
                    line: 1,
                    item: "高炉煤气",
                    unit: "M3",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 2,
                    item: "焦炉煤气",
                    unit: "M3",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 3,
                    item: "氧气",
                    unit: "M3",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 4,
                    item: "工业水",
                    unit: "吨",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 5,
                    item: "除盐水",
                    unit: "吨",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 6,
                    item: "回用水",
                    unit: "吨",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 7,
                    item: "电",
                    unit: "KWH",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 8,
                    item: "鼓风",
                    unit: "M3",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 9,
                    item: "蒸汽",
                    unit: "M3",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 10,
                    item: "压缩空气",
                    unit: "M3",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 11,
                    item: "氮气",
                    unit: "M3",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                },
            ],
            ListHs: [
                {
                    line: 1,
                    item: "回收煤气",
                    unit: "M3",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 2,
                    item: "压差发电",
                    unit: "KWH",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 3,
                    item: "水渣余热",
                    unit: "吨",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                }, {
                    line: 4,
                    item: "联合泵站",
                    unit: "元",
                    signalUnit: null,
                    signalPrice: null,
                    signalPUnit: null
                },
            ],
            comptedKeBianZong: [],
            KeBianComputedFC: {
                signalPrice: 0,
                signalUnit: 0,
                signalPUnit: 0,
            },
            KeBianComputedDL: {
                signalPrice: 0,
                signalUnit: 0,
                signalPUnit: 0,
            },
            KeBianComputedHs: {
                signalPrice: 0,
                signalUnit: 0,
                signalPUnit: 0,
            },
            boolen: false
        }
    }
    subfun() {
        //////console.log(this.state.ListFc)
        const sub = [];
        this.state.ListFc.forEach((item) => {
            sub.push(item.signalPrice * item.signalUnit);
        })
        this.setState({
            KeBianComputedFC: sub,
        })
    }
    RlComputed() {
        //////console.log(this.state.ListDl)
        const sub = [];
        this.state.ListDl.forEach((item) => {
            sub.push(item.signalPrice * item.signalUnit);
        })
        this.setState({
            KeBianComputedDL: sub,
        })
    }
    HsComputed() {
        //////console.log(this.state.ListHs)
        const sub = [];
        this.state.ListHs.forEach((item) => {
            sub.push(item.signalPrice * item.signalUnit);
        })
        this.setState({
            KeBianComputedHs: sub,
        })
    } 
    UNSAFE_componentWillMount() {
        axios.get(`/api/estimate-para-unfix-cost/recent/?purpose=${this.props.JGFkey === "2" ? 122 : this.props.JGFkey === "3" ? 123 : 3}`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
        //    console.log(res)
            res.data.fc.forEach((item,index) => {
                item.signalPrice = index===3 || index===4 || index===5 ? null : Number(item.signalPrice).toFixed(2)
                item.signalUnit = index===3 || index===4 || index===5 ? null : Number(item.signalUnit).toFixed(4)
                item.signalPUnit = Number(item.signalPUnit).toFixed(2)
            })
            res.data.dl.forEach((item) => {
                item.signalPrice = Number(item.signalPrice).toFixed(2)
                item.signalUnit = Number(item.signalUnit).toFixed(4)
                item.signalPUnit = Number(item.signalPUnit).toFixed(2)
            })
            res.data.hs.forEach((item,index) => {
                item.signalPrice = index===2 || index===3? null :  Number(item.signalPrice).toFixed(2)
                item.signalUnit = index===2 || index===3? null : Number(item.signalUnit).toFixed(4)
                item.signalPUnit = Number(item.signalPUnit).toFixed(2)
            })
            this.setState({
                ListFc: res.data.fc,
                ListDl: res.data.dl,
                ListHs: res.data.hs,
            })
        })
    }
    KeBianComputedDLInfo() {
        //////console.log(this.state.ListFc)
        const sub = [];
        this.state.ListDl.forEach((item) => {
            sub.push(item.signalPrice * item.signalUnit);
        })
        this.setState({
            KeBianComputedDL: sub,

        })
    }
    KeBianComputedHSInfo() {
        //////console.log(this.state.ListFc)
        const sub = [];
        this.state.ListHs.forEach((item) => {
            sub.push(item.signalPrice * item.signalUnit);
        })
        this.setState({
            KeBianComputedHs: sub,

        })
    }
    KeBianjgfFC(signalUnit, index) {
        return (e) => {
            const value = e.target.value;
            const newData = this.state.ListFc;
            newData[index][signalUnit] = value;
            this.setState({ ListFc: newData }, () => {
                this.subfun();
            })
           console.log(this.state.ListFc)
        }
    }
    KeBianjgfDL(signalUnit, index) {
        return (e) => {
            const value = e.target.value;
            const newDataDl = this.state.ListDl;
            newDataDl[index][signalUnit] = value;
            this.setState({ ListDl: newDataDl }, () => {
                this.KeBianComputedDLInfo();
            })
            //////console.log(this.state.ListDl)
        }
    }
    KeBianjgfHS(signalUnit, index) {
        return (e) => {
            const value = e.target.value;
            const newDataHs = this.state.ListHs.slice();
            newDataHs[index][signalUnit] = value;
            this.setState({ ListHs: newDataHs }, () => {
                this.KeBianComputedHSInfo();
            })
          // console.log(this.state.ListHs)
        }
    }
    computedInfo() {
        this.setState({
            boolen: true
        })
        axios.post("/api/estimate-unfix/", {
            purpose: this.props.JGFkey === "2" ? 122 : this.props.JGFkey === "3" ? 123 : 3,
            fc:
                this.state.ListFc.map((item, index) => {

                    return (
                        {
                            line: item.line,
                            item: item.item,
                            unit: item.unit,
                            signalPrice: Number(item.signalPrice).toFixed(4),
                            signalUnit: Number(item.signalUnit).toFixed(4),
                            signalPUnit:item.item === "耐材" || item.item === "大型工具" || item.item === "工艺件" ?item.signalPUnit : Number(this.state.KeBianComputedFC[index]).toFixed(2)==="NaN" ?item.signalPUnit: Number(this.state.KeBianComputedFC[index]).toFixed(2),
                            purpose: this.props.JGFkey === "2" ? 122 : this.props.JGFkey === "3" ? 123 : 3,
                        }
                    )

                }),
            dl:
                this.state.ListDl.map((items, index) => {

                    return (
                        {
                            line: items.line,
                            item: items.item,
                            unit: items.unit,
                            signalPrice: Number(items.signalPrice).toFixed(4),
                            signalUnit: Number(items.signalUnit).toFixed(4),
                            signalPUnit:  Number(this.state.KeBianComputedDL[index]).toFixed(2)==="NaN" ? items.signalPUnit:Number(this.state.KeBianComputedDL[index]).toFixed(2),
                            purpose: this.props.JGFkey === "2" ? 122 : this.props.JGFkey === "3" ? 123 : 3,
                        }
                    )

                }),
            hs:
                this.state.ListHs.map((items, index) => {

                    return (
                        {
                            line: items.line,
                            item: items.item,
                            unit: items.unit,
                            signalPrice: Number(items.signalPrice).toFixed(4),
                            signalUnit: Number(items.signalUnit).toFixed(4),
                            signalPUnit: items.item === "联合泵站" || items.item === "水渣余热"  ?items.signalPUnit : Number(this.state.KeBianComputedHs[index]).toFixed(2)==="NaN"?items.signalPUnit:Number(this.state.KeBianComputedHs[index]).toFixed(2),
                            purpose: this.props.JGFkey === "2" ? 122 : this.props.JGFkey === "3" ? 123 : 3,
                        }
                    )
                })
        }, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            if (res.status) {
                //////console.log(res)
                message.success("计算完成");
                this.setState({
                    comptedKeBianZong: res.data.amount,
                    boolen: false,
                })
                this.props.kebianshezhi(this.state.comptedKeBianZong)
            }

        }).catch(err => {
            this.setState({

                boolen: false,
            })
            //////console.log(err)
            if (err.request.status === 500) {
                message.warning("请检查参数信息是否正确")
            } else if (err.request.status === 400) {
                message.warning("请检查参数信息是否正确")
            }
        })
    }
    render() {
        return (
            <div>
                <table className="tableGufei">
                    <tbody>
                        <tr className="jiachu">
                            <td>序号</td>
                            <td>成本项目</td>
                            <td>计量单位</td>
                            <td style={{ width: 150 }}>单价</td>
                            <td style={{ width: 150 }}>单位消耗</td>
                            <td style={{ width: 150 }}>单位成本</td>
                        </tr>
                        <tr className="jiachu">
                            <td>一</td>
                            <td>辅材</td>
                            <td>吨</td>
                            <td></td>
                            <td></td>
                            <td>
                                {
                                    this.state.comptedKeBianZong.map((item, index) => {
                                        if (index === 0) {
                                            return (
                                                <span key={index}>
                                                    {item.signalPUnit}
                                                </span>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </td>
                        </tr>
                        {
                            this.state.ListFc.map((item, index) => {

                                return (
                                    <tr key={index} className="trgufei">
                                        <td>{index + 1}</td>
                                        <td>{item.item}</td>
                                        <td>{item.unit}</td>
                                        <td>
                                            <Input
                                                onChange={this.KeBianjgfFC("signalPrice", index).bind(this)}
                                                value={item.signalPrice === "0.00" ? null : item.signalPrice}
                                                style={{ background: item.item === "耐材" || item.item === "大型工具" || item.item === "工艺件" ? "#c3c3c3" : null }}
                                                disabled={ item.item === "耐材" || item.item === "大型工具" || item.item === "工艺件" ? true : false }
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                onChange={this.KeBianjgfFC("signalUnit", index).bind(this)}
                                                value={item.signalUnit === "0.0000" ? null : item.signalUnit}
                                                style={{ background: item.item === "耐材" || item.item === "大型工具" || item.item === "工艺件" ? "#c3c3c3" : null }}
                                                disabled={ item.item === "耐材" || item.item === "大型工具" || item.item === "工艺件" ? true : false }
                                            />
                                        </td>
                                        <td>
                                        {
                                                item.item === "耐材" || item.item === "大型工具" || item.item === "工艺件"  ?
                                                    <Input
                                                        onChange={this.KeBianjgfFC("signalPUnit", index).bind(this)}
                                                        value={item.signalPUnit}
                                                        style={{ textAlign: "center", padding: 0 }}
                                                    /> : Number(this.state.KeBianComputedFC[index]).toFixed(2) === "NaN" ? item.signalPUnit : Number(this.state.KeBianComputedFC[index]).toFixed(2)
                                            }
                                        </td>
                                    </tr>
                                )

                            })
                        }
                        <tr className="jiachu">
                            <td>二</td>
                            <td>动力费</td>
                            <td>元</td>
                            <td></td>
                            <td></td>
                            <td>
                                {
                                    this.state.comptedKeBianZong.map((item, index) => {
                                        if (index === 1) {
                                            return (
                                                <span key={index}>
                                                    {item.signalPUnit}
                                                </span>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </td>
                        </tr>
                        {
                            this.state.ListDl.map((item, index) => {
                                return (
                                    <tr key={index} className="trgufei">
                                        <td>{index + 1}</td>
                                        <td>{item.item}</td>
                                        <td>{item.unit}</td>
                                        <td>
                                            <Input
                                                onChange={this.KeBianjgfDL("signalPrice", index).bind(this)}
                                                value={item.signalPrice === "0.00" ? null : item.signalPrice}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                onChange={this.KeBianjgfDL("signalUnit", index).bind(this)}
                                                value={item.signalUnit === "0.0000" ? null : item.signalUnit}
                                                
                                            />
                                        </td>
                                        <td>                                         
                                            {Number(this.state.KeBianComputedDL[index]).toFixed(2) === "NaN" ? item.signalPUnit : Number(this.state.KeBianComputedDL[index]).toFixed(2)}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="jiachu">
                            <td>三</td>
                            <td>回收品</td>
                            <td>元</td>
                            <td></td>
                            <td></td>
                            <td>
                                {
                                    this.state.comptedKeBianZong.map((item, index) => {
                                        if (index === 2) {
                                            return (
                                                <span key={index === 2}>
                                                    {item.signalPUnit}
                                                </span>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </td>
                        </tr>
                        {
                            this.state.ListHs.map((item, index) => {
                                return (
                                    <tr key={index} className="trgufei">
                                        <td>{index + 1}</td>
                                        <td>{item.item}</td>
                                        <td>{item.unit}</td>
                                        <td>
                                            <Input
                                                onChange={this.KeBianjgfHS("signalPrice", index).bind(this)}
                                                value={item.signalPrice === "0.00" ? null : item.signalPrice}
                                                style={{ background: item.item === "联合泵站" || item.item === "水渣余热" ? "#c3c3c3" : null }}
                                                disabled={ item.item === "联合泵站" || item.item === "水渣余热" ? true : false }
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                onChange={this.KeBianjgfHS("signalUnit", index).bind(this)}
                                                value={item.signalUnit === "0.0000" ? null : item.signalUnit}
                                                style={{ background: item.item === "联合泵站" || item.item === "水渣余热" ? "#c3c3c3" : null }}
                                                disabled={item.item === "联合泵站" || item.item === "水渣余热" ? true : false }
                                            />
                                        </td>
                                        <td>

                                            {
                                                 item.item === "联合泵站" || item.item === "水渣余热" ?
                                                    <Input
                                                        onChange={this.KeBianjgfHS("signalPUnit", index).bind(this)}
                                                        value={item.signalPUnit}
                                                        style={{ textAlign: "center", padding: 0 }}
                                                    /> : Number(this.state.KeBianComputedHs[index]).toFixed(2) === "NaN" ? item.signalPUnit : Number(this.state.KeBianComputedHs[index]).toFixed(2)
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="jiachuKebian">
                            <td style={{ width: 50 }}>高炉</td>
                            <td style={{ width: 150 }}>可变加工费合计</td>
                            <td style={{ width: 150 }}>元</td>
                            <td></td>
                            <td></td>
                            <td>
                                {
                                    this.state.comptedKeBianZong.map((item, index) => {
                                        if (index === 3) {
                                            return (
                                                <span key={index === 3} >
                                                    {item.signalPUnit}
                                                </span>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={this.computedInfo.bind(this)} className="computed" disabled={this.state.boolen}>计算可变的成本</Button>
            </div>
        )
    }
}