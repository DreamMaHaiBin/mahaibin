//成本明细
import React, { Component } from "react";
import "./option.css"
export default class BudgetMingXi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dos: [],
            con: {},
            three: {}
        }
    }
    componentDidMount() {
        this.setState({
            dos: this.props.conputedInfo.dos,
            con: this.props.conputedInfo.con,
            three: this.props.conputedInfo.three,
        })
    }
    render() {
        ////console.log(this.props.conputedInfo);

        return (
            <div className="top">
                <h3 className="h3">烧结配料方案</h3>
                <table className="tableGufei">
                    <tbody>
                        <tr>
                            <td>序号</td>
                            <td>名称</td>
                            <td>配料量Kg</td>
                            <td>百分比%</td>
                            <td>外配%</td>
                            <td>含铁料%</td>
                            <td>价格(元)</td>
                            <td>成本(元)</td>
                        </tr>
                        {
                            this.props.conputedInfo.dos.map((item, index) => {
                                return (
                                    <tr className="trgufei" key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.pll).toFixed(2) === "0.00" ? null : Number(item.pll).toFixed(2)}</td>
                                        <td>{Number(item.radio).toFixed(2) === "0.00" ? null : Number(item.radio).toFixed(2)}</td>
                                        <td>{Number(item.wp).toFixed(2) === "0.00" ? null : Number(item.wp).toFixed(2)}</td>
                                        <td>{Number(item.htl).toFixed(2) === "0.00" ? null : Number(item.pll).toFixed(2)}</td>
                                        <td>{Number(item.price).toFixed(2) === "0.00" ? null : Number(item.price).toFixed(2)}</td>
                                        <td>{Number(item.cb).toFixed(2) === "0.00" ? null : Number(item.cb).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <h3 className="h3">烧结矿成分表</h3>
                <table className="table-two">
                    <tbody>
                        <tr>
                            <td>TFe,%</td>
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
                        <tr>
                            <td>{Number(this.props.conputedInfo.con.tfe).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.tfe).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.siO2).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.siO2).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.caO).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.caO).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.al2O3).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.al2O3).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.mgO).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.mgO).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.s).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.s).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.p).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.p).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.pbO).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.pbO).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.znO).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.znO).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.k2O).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.k2O).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.na2O).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.na2O).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.asO).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.asO).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.r).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.r).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.tiO2).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.tiO2).toFixed(4)}</td>
                        </tr>
                    </tbody>
                </table>
                <h3 className="h3">实际烧结矿成分表</h3>
                <table className="table-two">
                    <tbody>
                        <tr>
                            <td>TFe,%</td>
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
                        <tr>
                            <td>{Number(this.state.three.tfe).toFixed(2) === "0.00" ? null : Number(this.state.three.tfe).toFixed(2)}</td>
                            <td>{Number(this.state.three.siO2).toFixed(2) === "0.00" ? null : Number(this.state.three.siO2).toFixed(2)}</td>
                            <td>{Number(this.state.three.caO).toFixed(2) === "0.00" ? null : Number(this.state.three.caO).toFixed(2)}</td>
                            <td>{Number(this.state.three.al2O3).toFixed(2) === "0.00" ? null : Number(this.state.three.al2O3).toFixed(2)}</td>
                            <td>{Number(this.state.three.mgO).toFixed(2) === "0.00" ? null : Number(this.state.three.mgO).toFixed(2)}</td>
                            <td>{Number(this.state.three.s).toFixed(4) === "0.0000" ? null : Number(this.state.three.s).toFixed(4)}</td>
                            <td>{Number(this.state.three.p).toFixed(4) === "0.0000" ? null : Number(this.state.three.p).toFixed(4)}</td>
                            <td>{Number(this.state.three.pbO).toFixed(4) === "0.0000" ? null : Number(this.state.three.pbO).toFixed(4)}</td>
                            <td>{Number(this.state.three.znO).toFixed(4) === "0.0000" ? null : Number(this.state.three.znO).toFixed(4)}</td>
                            <td>{Number(this.state.three.k2O).toFixed(4) === "0.0000" ? null : Number(this.state.three.k2O).toFixed(4)}</td>
                            <td>{Number(this.state.three.na2O).toFixed(4) === "0.0000" ? null : Number(this.state.three.na2O).toFixed(4)}</td>
                            <td>{Number(this.state.three.asO).toFixed(4) === "0.0000" ? null : Number(this.state.three.asO).toFixed(4)}</td>
                            <td>{Number(this.state.three.r).toFixed(2) === "0.00" ? null : Number(this.state.three.r).toFixed(2)}</td>
                            <td>{Number(this.state.three.tiO2).toFixed(4) === "0.0000" ? null : Number(this.state.three.tiO2).toFixed(4)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
