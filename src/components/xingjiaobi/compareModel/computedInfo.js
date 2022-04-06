
import React, { Component } from "react";
import { Input, Button } from "antd";
const list = []
for (let i = 0; i < 17; i++) {
    list.push({
        line: i + 1,
        name: null,
        radioMonth: null,
        priceMonth: null,
        siO2: null,
        caO: null,
        ab: null,
        cd: null,
    })
}
export default class ComputedInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zhData: [],
            subarr: {
                radioMonth: '',
                priceMonth: "",
                siO2: '',
                caO: "",
                ab: "",
                cd: ""
            },
            zhrjData: this.props.zhrjList,
            setList: {},
            Cao: {
                caoS: 0,
            },
            Rj: {
                rj: 0,
            },
            CaoHe: "",
        }
    }
    componentDidMount() {
        this.subCao();
        this.subRj();
        this.props.getData(this.props.zhrjList)
        //console.log(this.props.zhrjList)
    }
    subfun() {
        const sub = {
            radioMonth: 0,
            priceMonth: 0,
            siO2: 0,
            caO: 0,
            ab: 0,
            cd: 0
        }

        this.props.zhrjList.forEach((item) => {
            sub.radioMonth += Number(item.radioMonth);
            sub.priceMonth += (Number(item.priceMonth) * Number(item.radioMonth));
            sub.siO2 += Number(item.siO2) * Number(item.radioMonth);
            sub.caO += Number(item.caO) * Number(item.radioMonth);
            sub.ab += Number(item.ab);
            sub.cd += Number(item.cd);
        })
        this.setState({ subarr: sub }, () => {
            this.subCao();
            this.subRj();
        })
    }
    subCao() {
        const subCaO = []
        this.props.zhrjList.forEach((item) => {
            subCaO.push(((Number(item.caO) - Number(item.siO2) * Number(this.props.setList.r))) * Number(item.radioMonth) / Number(this.state.subarr.radioMonth))
        })
        this.setState({ Cao: subCaO })
    }
    subRj() {
        const subRJ = []
        this.props.zhrjList.forEach((item, index) => {
            subRJ.push((Number(item.priceMonth) / Number(this.state.Cao[index]) * Number(item.radioMonth) / Number(this.state.subarr.radioMonth)) * 100)
        })
        this.setState({ Rj: subRJ })
    }
    toFatherValue(name, idx) {
        return (e) => {
            const value = e.target.value;
            const newData = this.props.zhrjList.slice();
            newData[idx][name] = value;
            this.setState({ zhrjData: newData }, () => {
                this.subfun();
                this.subCao();
                this.subRj();
            })
        }
    }
    computedRj() {
        this.subfun();
        this.subCao();
        this.subRj();
        this.props.getData(this.props.zhrjList)
    }
    render() {

        return (
            <div>
                <table className="tables">
                    <tbody>
                        <tr className="name">
                            <td>熔剂名称</td>
                            <td>当月比例</td>
                            <td>当月价格</td>
                            <td>SiO2</td>
                            <td>CaO</td>
                            <td>带入烧结综合有效钙</td>
                            {/* <td>带入烧结综合熔剂价格</td> */}
                        </tr>
                        {
                            this.props.zhrjList.map((item, idx) => {

                                return (
                                    <tr key={idx} className="rj">
                                        <td>
                                            <Input
                                                value={item.name}
                                                style={{ width: "100%" }}
                                                onChange={this.toFatherValue("name", idx).bind(this)}
                                            ></Input></td>
                                        <td><Input
                                            value={item.radioMonth === "0.00" || item.radioMonth === 0 ? null : item.radioMonth}
                                            onChange={this.toFatherValue("radioMonth", idx).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.priceMonth === "0.00" || item.priceMonth === 0 ? null : item.priceMonth}
                                            onChange={this.toFatherValue("priceMonth", idx).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.siO2 === "0.00" || item.siO2 === 0 ? null : item.siO2}
                                            onChange={this.toFatherValue("siO2", idx).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            value={item.caO === "0.00" || item.caO === 0 ? null : item.caO}
                                            onChange={this.toFatherValue("caO", idx).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            style={{ fontWeight: 800 }}
                                            value={Number(this.state.Cao[idx]).toFixed(2) === "NaN" || Number(this.state.Cao[idx]).toFixed(2) === "Infinity" ? null : (Number(this.state.Cao[idx]).toFixed(2) === "0.00") ? null : Number(this.state.Cao[idx]).toFixed(2)}
                                        ></Input></td>
                                        {/* <td><Input
                                        style={{fontWeight:800}}
                                        value={Number(this.state.Rj[idx]).toFixed(2)==="NaN" ? null : Number(this.state.Rj[idx]).toFixed(2)}
                                        ></Input></td> */}
                                    </tr>
                                )
                            })
                        }
                        <tr className="foot">
                            <td style={{ width:  200 }}>综合熔剂</td>
                            <td style={{ width: 70 }}>{this.state.subarr.radioMonth}</td>
                            <td style={{ width: 70 }}>{Number(Number(this.state.subarr.priceMonth) / Number(this.state.subarr.radioMonth)).toFixed(2) === "NaN" ? null : Number(Number(this.state.subarr.priceMonth) / Number(this.state.subarr.radioMonth)).toFixed(2)}</td>
                            <td style={{ width: 40 }}>{(Number(this.state.subarr.siO2) / Number(this.state.subarr.radioMonth)).toFixed(2) === "NaN" ? null : (Number(this.state.subarr.siO2) / Number(this.state.subarr.radioMonth)).toFixed(2)}</td>
                            <td style={{ width: 40 }}>{Number(Number(this.state.subarr.caO) / Number(this.state.subarr.radioMonth)).toFixed(2) === "NaN" ? null : Number(Number(this.state.subarr.caO) / Number(this.state.subarr.radioMonth)).toFixed(2)}</td>
                            <td style={{ width: 130 }}>
                                {
                                    (Number(Number(this.state.subarr.caO) / Number(this.state.subarr.radioMonth)).toFixed(2) - (Number(this.state.subarr.siO2) / Number(this.state.subarr.radioMonth)).toFixed(2) * Number(this.props.setList.r)).toFixed(2) === "NaN" ? null :
                                        (Number(Number(this.state.subarr.caO) / Number(this.state.subarr.radioMonth)).toFixed(2) - (Number(this.state.subarr.siO2) / Number(this.state.subarr.radioMonth)).toFixed(2) * Number(this.props.setList.r)).toFixed(2)
                                }
                            </td>
                            {/* <td style={{width:150}}>
                       {
                        ( (Number(Number(this.state.subarr.priceMonth)/Number(this.state.subarr.radioMonth)).toFixed(2))/
                         ( Number(Number(this.state.subarr.caO)/Number(this.state.subarr.radioMonth)).toFixed(2)-(Number(this.state.subarr.siO2)/Number(this.state.subarr.radioMonth)).toFixed(2)*Number(this.props.setList.r)).toFixed(2))*100
                       }
                       </td> */}
                        </tr>
                    </tbody>
                </table>
                <Button onClick={this.computedRj.bind(this)} className="computed">计算</Button>
            </div>
        )
    }
}
