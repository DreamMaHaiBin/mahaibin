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
        ////console.log(this.props.conputedInfo);

        return (
            <div className="top">
                <h3 className="h3">铁水成本优化明细</h3>
                <table className="tableGufei">
                    <tbody>
                        <tr>
                            <td>序号</td>
                            <td>名称</td>
                            <td>单价，元/t</td>
                            <td>单耗，kg</td>
                            <td>百分比，%</td>
                            <td>单成，元/t</td>
                            <td>百分比，%</td>
                            <td>实际成本 元/t</td>
                            <td>实际百分比，%</td>
                        </tr>
                        {
                            this.props.conputedInfo.dos.map((item, index) => {
                                if (index === 15) {
                                    return (
                                        <tr className="jiachu" key={index}>
                                            <td>一</td>
                                            <td>{item.name}</td>
                                            <td>{Number(item.price).toFixed(2) === "0.00" ? null : Number(item.price).toFixed(2)}</td>
                                            <td>{Number(item.g).toFixed(2) === "0.00" ? null : Number(item.g).toFixed(2)}</td>
                                            <td>{Number(item.gb).toFixed(2) === "0.00" ? null : Number(item.gb).toFixed(2)}</td>
                                            <td>{Number(item.dc).toFixed(2) === "0.00" ? null : Number(item.dc).toFixed(2)}</td>
                                            <td>{Number(item.dcb).toFixed(2) === "0.00" ? null : Number(item.dcb).toFixed(2)}</td>
                                            <td>{Number(item.sjcb).toFixed(2) === "0.00" ? null : Number(item.sjcb).toFixed(2)}</td>
                                            <td>{Number(item.sjb).toFixed(2) === "0.00" ? null : Number(item.sjb).toFixed(2)}</td>

                                        </tr>
                                    )
                                }
                                return null
                            })
                        }
                        {
                            this.props.conputedInfo.dos.map((item, index) => {
                                if (index <= 4) {
                                    return (
                                        <tr className="shihui" key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{Number(item.price).toFixed(2) === "0.00" ? null : Number(item.price).toFixed(2)}</td>
                                            <td>{Number(item.g).toFixed(2) === "0.00" ? null : Number(item.g).toFixed(2)}</td>
                                            <td>{Number(item.gb).toFixed(2) === "0.00" ? null : Number(item.gb).toFixed(2)}</td>
                                            <td>{Number(item.dc).toFixed(2) === "0.00" ? null : Number(item.dc).toFixed(2)}</td>
                                            <td>{Number(item.dcb).toFixed(2) === "0.00" ? null : Number(item.dcb).toFixed(2)}</td>
                                            <td>{Number(item.sjcb).toFixed(2) === "0.00" ? null : Number(item.sjcb).toFixed(2)}</td>
                                            <td>{Number(item.sjb).toFixed(2) === "0.00" ? null : Number(item.sjb).toFixed(2)}</td>
                                        </tr>
                                    )
                                }
                                
                                return null
                            })

                        }
                          {
                            this.props.conputedInfo.dos.map((item, index) => {
                                if (index > 4 && index<12) {
                                    return (
                                        <tr className="trgufei" key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{Number(item.price).toFixed(2) === "0.00" ? null : Number(item.price).toFixed(2)}</td>
                                            <td>{Number(item.g).toFixed(2) === "0.00" ? null : Number(item.g).toFixed(2)}</td>
                                            <td>{Number(item.gb).toFixed(2) === "0.00" ? null : Number(item.gb).toFixed(2)}</td>
                                            <td>{Number(item.dc).toFixed(2) === "0.00" ? null : Number(item.dc).toFixed(2)}</td>
                                            <td>{Number(item.dcb).toFixed(2) === "0.00" ? null : Number(item.dcb).toFixed(2)}</td>
                                            <td>{Number(item.sjcb).toFixed(2) === "0.00" ? null : Number(item.sjcb).toFixed(2)}</td>
                                            <td>{Number(item.sjb).toFixed(2) === "0.00" ? null : Number(item.sjb).toFixed(2)}</td>
                                        </tr>
                                    )
                                }
                                
                                return null
                            })

                        }
                         {
                            this.props.conputedInfo.dos.map((item, index) => {
                                if (index === 16) {
                                    return (
                                        <tr className="jiachu" key={index}>
                                            <td>二</td>
                                            <td>{item.name}</td>
                                            <td>{Number(item.price).toFixed(2) === "0.00" ? null : Number(item.price).toFixed(2)}</td>
                                            <td>{Number(item.g).toFixed(2) === "0.00" ? null : Number(item.g).toFixed(2)}</td>
                                            <td>{Number(item.gb).toFixed(2) === "0.00" ? null : Number(item.gb).toFixed(2)}</td>
                                            <td>{Number(item.dc).toFixed(2) === "0.00" ? null : Number(item.dc).toFixed(2)}</td>
                                            <td>{Number(item.dcb).toFixed(2) === "0.00" ? null : Number(item.dcb).toFixed(2)}</td>
                                            <td>{Number(item.sjcb).toFixed(2) === "0.00" ? null : Number(item.sjcb).toFixed(2)}</td>
                                            <td>{Number(item.sjb).toFixed(2) === "0.00" ? null : Number(item.sjb).toFixed(2)}</td>
                                        </tr>
                                    )
                                }
                                return null
                            })

                        }
                            {
                            this.props.conputedInfo.dos.map((item, index) => {
                                if (index>=12 && index<15) {
                                    return (
                                        <tr className="else" key={index}>
                                            <td>{index-11}</td>
                                            <td>{item.name}</td>
                                            <td>{Number(item.price).toFixed(2) === "0.00" ? null : Number(item.price).toFixed(2)}</td>
                                            <td>{Number(item.g).toFixed(2) === "0.00" ? null : Number(item.g).toFixed(2)}</td>
                                            <td>{Number(item.gb).toFixed(2) === "0.00" ? null : Number(item.gb).toFixed(2)}</td>
                                            <td>{Number(item.dc).toFixed(2) === "0.00" ? null : Number(item.dc).toFixed(2)}</td>
                                            <td>{Number(item.dcb).toFixed(2) === "0.00" ? null : Number(item.dcb).toFixed(2)}</td>
                                            <td>{Number(item.sjcb).toFixed(2) === "0.00" ? null : Number(item.sjcb).toFixed(2)}</td>
                                            <td>{Number(item.sjb).toFixed(2) === "0.00" ? null : Number(item.sjb).toFixed(2)}</td>
                                        </tr>
                                    )
                                }
                                return null
                            })

                        }
                          
                           {
                            this.props.conputedInfo.dos.map((item, index) => {
                                if (index===18) {
                                    return (
                                        <tr className="jiachu" key={index}>
                                            <td>三</td>
                                            <td>{item.name}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>{Number(item.dc).toFixed(2) === "0.00" ? null : Number(item.dc).toFixed(2)}</td>
                                            <td>{Number(item.dcb).toFixed(2) === "0.00" ? null : Number(item.dcb).toFixed(2)}</td>
                                            <td>{Number(item.sjcb).toFixed(2) === "0.00" ? null : Number(item.sjcb).toFixed(2)}</td>
                                            <td>{Number(item.sjb).toFixed(2) === "0.00" ? null : Number(item.sjb).toFixed(2)}</td>
                                        </tr>
                                    )
                                }
                                return null
                            })

                        }
                           {
                            this.props.conputedInfo.dos.map((item, index) => {
                                if (index===19) {
                                    return (
                                        <tr className="jiachu" key={index}>
                                            <td>四</td>
                                            <td>{item.name}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>{Number(item.dc).toFixed(2) === "0.00" ? null : Number(item.dc).toFixed(2)}</td>
                                            <td>{Number(item.dcb).toFixed(2) === "0.00" ? null : Number(item.dcb).toFixed(2)}</td>
                                            <td>{Number(item.sjcb).toFixed(2) === "0.00" ? null : Number(item.sjcb).toFixed(2)}</td>
                                            <td>{Number(item.sjb).toFixed(2) === "0.00" ? null : Number(item.sjb).toFixed(2)}</td>
                                        </tr>
                                    )
                                }
                                return null
                            })

                        }
                        {
                            this.props.conputedInfo.dos.map((item, index) => {
                                if (index===17) {
                                    return (
                                        <tr className="jiachu" key={index}>
                                            <td>五</td>
                                            <td>{item.name}</td>
                                            <td>{Number(item.price).toFixed(2) === "0.00" ? null : Number(item.price).toFixed(2)}</td>
                                            <td>{Number(item.g).toFixed(2) === "0.00" ? null : Number(item.g).toFixed(2)}</td>
                                            <td>{Number(item.gb).toFixed(2) === "0.00" ? null : Number(item.gb).toFixed(2)}</td>
                                            <td>{Number(item.dc).toFixed(2) === "0.00" ? null : Number(item.dc).toFixed(2)}</td>
                                            <td>{Number(item.dcb).toFixed(2) === "0.00" ? null : Number(item.dcb).toFixed(2)}</td>
                                            <td>{Number(item.sjcb).toFixed(2) === "0.00" ? null : Number(item.sjcb).toFixed(2)}</td>
                                            <td>{Number(item.sjb).toFixed(2) === "0.00" ? null : Number(item.sjb).toFixed(2)}</td>
                                        </tr>
                                    )
                                }
                                return null
                            })

                        }
                    </tbody>
                </table>
                <h3 className="h3">炉渣成分</h3>
                <table className="table-two">
                    <tbody>
                        <tr>
                            <td>SiO2%</td>
                            <td>CaO%</td>
                            <td>MgO%</td>
                            <td>Al2O3%</td>
                            <td>S%</td>
                            <td>TiO2%</td>
                            <td>R：</td>
                            <td>渣量kg/t</td>
                        </tr>
                        <tr>
                            <td>{Number(this.props.conputedInfo.con.sio2).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.sio2).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.cao).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.cao).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.mgo).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.mgo).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.al2o3).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.al2o3).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.s).toFixed(4) === "0.00" ? null : Number(this.props.conputedInfo.con.s).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.con.tio2).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.tio2).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.r).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.r).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.zl).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.con.zl).toFixed(2)}</td>

                        </tr>
                    </tbody>
                </table>
                <h3 className="h3">其他指标</h3>
                <table className="table-two">
                    <tbody>
                        <tr>
                            <td>入炉品位,%</td>
                            <td>铁水S,%</td>
                            <td>铁水P,%</td>
                            <td>铁水Ti,%</td>
                            <td>铁水Mn,%</td>
                            <td>实际煤比,kg/t</td>
                            <td>实际焦比,kg/t</td>
                            <td>实际产量,t</td>
                        </tr>
                        <tr>
                            <td>{Number(this.props.conputedInfo.qita.rlpw).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.qita.rlpw).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.qita.s).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.qita.s).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.qita.p).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.qita.p).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.qita.ti).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.qita.ti).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.qita.mn).toFixed(4) === "0.0000" ? null : Number(this.props.conputedInfo.qita.mn).toFixed(4)}</td>
                            <td>{Number(this.props.conputedInfo.qita.sjmb).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.qita.sjmb).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.qita.sjjb).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.qita.sjjb).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.qita.sjcl).toFixed(2) === "0.00" ? null : Number(this.props.conputedInfo.qita.sjcl).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
