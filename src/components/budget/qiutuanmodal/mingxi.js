import React, { Component } from "react";
const str = "0.00"
export default class BudgetMingXi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: [],
            numberZ: "",
            numberH: "",
            numberJ: "",
            numberHg: [],
            numberZt: [],
            numberWgzt: [],
            numberZtZong: "",
            numberHgZong: "",
            numberWgztZong: "",
        }
    }
    componentDidMount() {
        this.setState({
            number: this.props.ChengBenMingXi.cost.htyl.ore,
            numberZ: this.props.ChengBenMingXi.cost.htyl,
            numberH: this.props.ChengBenMingXi.cost.hj,
            numberJ: this.props.ChengBenMingXi.cost.jgf,
            numberHg: this.props.ChengBenMingXi.cost.hgyl.ore,
            numberZt: this.props.ChengBenMingXi.cost.zt.ore,
            numberWgzt: this.props.ChengBenMingXi.cost.wgzt.ore,
            numberZtZong: this.props.ChengBenMingXi.cost.zt,
            numberHgZong: this.props.ChengBenMingXi.cost.hgyl,
            numberWgztZong: this.props.ChengBenMingXi.cost.wgzt,
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
                        {// todo
                            this.state.number.map((item, index) => {
                                return (
                                    <tr key={index} className="trgufei">
                                        <td>{item.line}</td>
                                        <td>{item.name}</td>
                                        <td>{item.signalPrice === str ? null : Number(item.signalPrice).toFixed(2)}</td>
                                        <td>{item.signalPrice === str ? null : Number(item.signalUnit).toFixed(2)}</td>
                                        <td>{item.signalPrice === str ? null : Number(item.precent1).toFixed(2)}</td>
                                        <td>{item.signalPrice === str ? null : Number(item.signalPUnit).toFixed(2)}</td>
                                        <td>{item.signalPrice === str ? null : Number(item.precent2).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="trrrj">
                            <td className="jiachu">二</td>
                            <td className="jiachu">皂土</td>
                            <td>{Number(this.state.numberZtZong.signalPrice).toFixed(2) === str ? null : Number(this.state.numberZtZong.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numberZtZong.signalUnit).toFixed(2) === str ? null : Number(this.state.numberZtZong.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberZtZong.precent1).toFixed(2) === str ? null : Number(this.state.numberZtZong.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numberZtZong.signalPUnit).toFixed(2) === str ? null : Number(this.state.numberZtZong.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberZtZong.precent2).toFixed(2) === str ? null : Number(this.state.numberZtZong.precent2).toFixed(2)}</td>
                        </tr>
                        {
                            this.state.numberZt.map((item, index) => {
                                return (
                                    <tr key={index} className="trrrj">
                                        <td>{item.line}</td>
                                        <td>{item.name}</td>
                                        <td>{item.signalPrice === str ? null : Number(item.signalPrice).toFixed(2)}</td>
                                        <td>{item.signalPrice === str ? null : Number(item.signalUnit).toFixed(2)}</td>
                                        <td>{item.signalPrice === str ? null : Number(item.precent1).toFixed(2)}</td>
                                        <td>{item.signalPrice === str ? null : Number(item.signalPUnit).toFixed(2)}</td>
                                        <td>{item.signalPrice === str ? null : Number(item.precent2).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="trrl">
                            <td className="jiachu">三</td>
                            <td className="jiachu">含钙熔剂</td>
                            <td>{Number(this.state.numberHgZong.signalPrice).toFixed(2) === str ? null : Number(this.state.numberHgZong.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numberHgZong.signalUnit).toFixed(2) === str ? null : Number(this.state.numberHgZong.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberHgZong.precent1).toFixed(2) === str ? null : Number(this.state.numberHgZong.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numberHgZong.signalPUnit).toFixed(2) === str ? null : Number(this.state.numberHgZong.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberHgZong.precent2).toFixed(2) === str ? null : Number(this.state.numberHgZong.precent2).toFixed(2)}</td>
                        </tr>
                        {
                            this.state.numberHg.map((item, index) => {
                                return (
                                    <tr key={index} className="trrl">
                                        <td>{item.line}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.signalPrice).toFixed(2)===str?null:Number(item.signalPrice).toFixed(2)}</td>
                                        <td>{Number(item.signalUnit).toFixed(2)===str?null:Number(item.signalUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent1).toFixed(2)===str?null:Number(item.precent1).toFixed(2)}</td>
                                        <td>{Number(item.signalPUnit).toFixed(2)===str?null:Number(item.signalPUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent2).toFixed(2)===str?null:Number(item.precent2).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="trrj">
                            <td className="jiachu">四</td>
                            <td className="jiachu">外购皂土</td>
                            <td>{Number(this.state.numberWgztZong.signalPrice).toFixed(2)===str?null:Number(this.state.numberWgztZong.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numberWgztZong.signalUnit).toFixed(2)===str?null:Number(this.state.numberWgztZong.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberWgztZong.precent1).toFixed(2)===str?null:Number(this.state.numberWgztZong.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numberWgztZong.signalPUnit).toFixed(2)===str?null:Number(this.state.numberWgztZong.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberWgztZong.precent2).toFixed(2)===str?null:Number(this.state.numberWgztZong.precent2).toFixed(2)}</td>
                        </tr>
                        {
                            this.state.numberWgzt.map((item, index) => {
                                return (
                                    <tr key={index} className="trrj">
                                        <td>{item.line}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.signalPrice).toFixed(2)===str?null:Number(item.signalPrice).toFixed(2)}</td>
                                        <td>{Number(item.signalUnit).toFixed(2)===str?null:Number(item.signalUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent1).toFixed(2)===str?null:Number(item.precent1).toFixed(2)}</td>
                                        <td>{Number(item.signalPUnit).toFixed(2)===str?null:Number(item.signalPUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent2).toFixed(2)===str?null:Number(item.precent2).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="trrj">
                            <td className="jiachu">五</td>
                            <td className="jiachu">加工费</td>
                            <td>{Number(this.state.numberJ.signalPrice).toFixed(2)===str?null:Number(this.state.numberJ.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numberJ.signalUnit).toFixed(2)===str?null:Number(this.state.numberJ.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberJ.precent1).toFixed(2)===str?null:Number(this.state.numberJ.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numberJ.signalPUnit).toFixed(2)===str?null:Number(this.state.numberJ.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberJ.precent2).toFixed(2)===str?null:Number(this.state.numberJ.precent2).toFixed(2)}</td>
                        </tr>
                        <tr className="trrj">
                            <td className="jiachu">六</td>
                            <td className="jiachu">合计</td>
                            <td>{Number(this.state.numberH.signalPrice).toFixed(2)===str?null:Number(this.state.numberH.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.numberH.signalUnit).toFixed(2)===str?null:Number(this.state.numberH.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberH.precent1).toFixed(2)===str?null:Number(this.state.numberH.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.numberH.signalPUnit).toFixed(2)===str?null:Number(this.state.numberH.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.numberH.precent2).toFixed(2)===str?null:Number(this.state.numberH.precent2).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}