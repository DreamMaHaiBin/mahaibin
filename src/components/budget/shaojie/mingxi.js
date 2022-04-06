
import React, { Component } from "react";
const str = "0.00"
//成本明细
class BudgetMingXi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: [],
            numberR: [],
            numberL: [],
            numberZ: "",
            numberRj: "",
            numberRl: "",
            numbersjh: "",
            numbershe: "",
            numberjgf: "",
        }
    }

    componentDidMount() {
        //////console.log(this.props.ChengBenMingXi)
        this.setState({
            number: this.props.ChengBenMingXi.cost.htyl.ore,
            numberR: this.props.ChengBenMingXi.cost.rj.ore,
            numberL: this.props.ChengBenMingXi.cost.rl.ore,
            numberZ: this.props.ChengBenMingXi.cost.htyl,
            numberRj: this.props.ChengBenMingXi.cost.rj,
            numberRl: this.props.ChengBenMingXi.cost.rl,
            numberjgf: this.props.ChengBenMingXi.cost.jgf,
            numbersjh: this.props.ChengBenMingXi.cost.sjh,
            numbershe: this.props.ChengBenMingXi.cost.hj,
        })
    }
    render() {

        return (
            <div>
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
                        </tr>
                        <tr className="trgufei">
                            <td className="jiachu">一</td>
                            <td className="jiachu">含铁原料</td>
                            <td>{Number(this.state.numberZ.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numberZ.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberZ.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numberZ.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberZ.precent2).toFixed(2)}</td>
                        </tr>
                        {
                            this.state.number.map((item, index) => {

                                return (
                                    <tr key={index} className="trgufei">
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.signalPrice).toFixed(2) === str ? null : Number(item.signalPrice).toFixed(2)}</td>
                                        <td>{Number(item.signalUnit).toFixed(2) === str ? null : Number(item.signalUnit).toFixed(2)}</td>
                                        <td>{ Number(item.precent1).toFixed(2) === str ? null : Number(item.precent1).toFixed(2)}</td>
                                        <td>{Number(item.signalPUnit).toFixed(2) === str ? null : Number(item.signalPUnit).toFixed(2)}</td>
                                        <td>{ Number(item.precent2).toFixed(2) === str ? null : Number(item.precent2).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="trrrj">
                            <td className="jiachu">二</td>
                            <td className="jiachu">熔剂</td>
                            <td>{Number(this.state.numberRj.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numberRj.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberRj.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numberRj.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberRj.precent2).toFixed(2)}</td>
                        </tr>
                        {
                            this.state.numberR.map((item, index) => {

                                return (
                                    <tr key={index} className="trrrj">
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{ Number(item.signalPrice).toFixed(2) === str ? null : Number(item.signalPrice).toFixed(2)}</td>
                                        <td>{ Number(item.signalUnit).toFixed(2) === str ? null : Number(item.signalUnit).toFixed(2)}</td>
                                        <td>{ Number(item.precent1).toFixed(2) === str ? null : Number(item.precent1).toFixed(2)}</td>
                                        <td>{Number(item.signalPUnit).toFixed(2) === str ? null : Number(item.signalPUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent2).toFixed(2) === str ? null : Number(item.precent2).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="trrl">
                            <td className="jiachu">三</td>
                            <td className="jiachu">燃料</td>
                            <td>{Number(this.state.numberRl.signalPrice).toFixed(2)=== str ? null : Number(this.state.numberRl.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numberRl.signalUnit).toFixed(2)=== str ? null : Number(this.state.numberRl.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberRl.precent1).toFixed(2)=== str ? null : Number(this.state.numberRl.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numberRl.signalPUnit).toFixed(2)=== str ? null : Number(this.state.numberRl.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberRl.precent2).toFixed(2)=== str ? null : Number(this.state.numberRl.precent2).toFixed(2)}</td>
                        </tr>
                        {
                            this.state.numberL.map((item, index) => {

                                return (
                                    <tr key={index} className="trrl">
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{ Number(item.signalPrice).toFixed(2) === str ? null : Number(item.signalPrice).toFixed(2)}</td>
                                        <td>{Number(item.signalUnit).toFixed(2) === str ? null : Number(item.signalUnit).toFixed(2)}</td>
                                        <td>{ Number(item.precent1).toFixed(2) === str ? null : Number(item.precent1).toFixed(2)}</td>
                                        <td>{Number(item.signalPUnit).toFixed(2) === str ? null : Number(item.signalPUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent2).toFixed(2) === str ? null : Number(item.precent2).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="trrj">
                            <td className="jiachu">四</td>
                            <td className="jiachu">加工费</td>
                            <td>{Number(this.state.numberjgf.signalPrice).toFixed(2) === str ? null : Number(this.state.numberjgf.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numberjgf.signalUnit).toFixed(2) === str ? null : Number(this.state.numberjgf.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberjgf.precent1).toFixed(2) === str ? null : Number(this.state.numberjgf.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numberjgf.signalPUnit).toFixed(2) === str ? null : Number(this.state.numberjgf.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberjgf.precent2).toFixed(2) === str ? null : Number(this.state.numberjgf.precent2).toFixed(2)}</td>
                        </tr>
                        <tr className="trrj">
                            <td className="jiachu">五</td>
                            <td className="jiachu">烧结灰</td>
                            <td>{Number(this.state.numbersjh.signalPrice).toFixed(2) === str ? null : Number(this.state.numbersjh.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numbersjh.signalUnit).toFixed(2) === str ? null : Number(this.state.numbersjh.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numbersjh.precent1).toFixed(2) === str ? null : Number(this.state.numbersjh.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numbersjh.signalPUnit).toFixed(2) === str ? null : Number(this.state.numbersjh.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numbersjh.precent2).toFixed(2) === str ? null : Number(this.state.numbersjh.precent2).toFixed(2)}</td>
                        </tr>
                        <tr className="trrj">
                            <td className="jiachu">六</td>
                            <td className="jiachu">合计</td>
                            <td>{Number(this.state.numbershe.signalPrice).toFixed(2) === str ? null : Number(this.state.numbershe.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numbershe.signalUnit).toFixed(2) === str ? null : Number(this.state.numbershe.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numbershe.precent1).toFixed(2) === str ? null : Number(this.state.numbershe.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numbershe.signalPUnit).toFixed(2) === str ? null : Number(this.state.numbershe.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numbershe.precent2).toFixed(2) === str ? null : Number(this.state.numbershe.precent2).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default BudgetMingXi