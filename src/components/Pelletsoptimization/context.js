//成本明细
import React, { Component } from "react";

export default class BudgetMingXi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dos: [],
            con: {},

        }
    }
    componentDidMount() {
        this.setState({
            dos: this.props.conputedInfo.dos,
            con: this.props.conputedInfo.con,
        })
    }
    render() {
        //    console.log(this.props.conputedInfo);

        return (
            <div className="top">
                <h3 className="h3">球团配料方案</h3>
                <table className="tableGufei">
                    <tbody>
                        <tr>
                            <td>序号</td>
                            <td>名称</td>
                            <td>配料量Kg</td>
                            <td>矿耗百分比%</td>
                            <td>价格(元)</td>
                            <td>成本(元)</td>
                            <td>成本百分比%</td>
                        </tr>
                        {
                            this.props.conputedInfo.dos.map((item, index) => {
                                return (
                                    <tr className="trgufei" key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.pll).toFixed(2) === "0.00" ? null : Number(item.pll).toFixed(2)}</td>
                                        <td>{Number(item.radio).toFixed(2) === "0.00" ? null : Number(item.radio).toFixed(2)}</td>
                                        <td>{Number(item.price).toFixed(2) === "0.00" ? null : Number(item.price).toFixed(2)}</td>
                                        <td>{Number(item.cb).toFixed(2) === "0.00" ? null : Number(item.cb).toFixed(2)}</td>
                                        <td>{Number(item.cbb).toFixed(2) === "0.00" ? null : Number(item.cbb).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <h3 className="h3">球团矿成分表</h3>
                <table className="table-two">
                    <tbody>
                        <tr>

                            <td>TFe,%</td>
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
                        <tr>
                            <td>{Number(this.props.conputedInfo.con.tfe).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.tfe).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.sio2).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.sio2).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.cao).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.cao).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.al2o3).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.al2o3).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.mgo).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.mgo).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.s).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.s).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.p).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.p).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.zno).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.zno).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.k2o).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.k2o).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.na2o).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.na2o).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.tio2).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.con.tio2).toFixed(4)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
