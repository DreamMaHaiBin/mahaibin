import React, { Component } from "react";
import { Input, Button, message } from "antd"
import axios from "axios";
export default class GaoLuGuDing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataGu: [
                {
                    item: "职工薪酬,元",
                    line: 1,
                    monthCost: null,
                }, {
                    item: "折旧,元",
                    line: 2,
                    monthCost: null,
                }, {
                    item: "修理费,元",
                    line: 3,
                    monthCost: null,
                }, {
                    item: "机物料消耗,元",
                    line: 4,
                    monthCost: null,
                }, {
                    item: "安全生产费,元",
                    line: 5,
                    monthCost: null,
                }, {
                    item: "运输费,元",
                    line: 6,
                    monthCost: null,
                }, {
                    item: "劳务费,元",
                    line: 7,
                    monthCost: null,
                }, {
                    item: "环保费,元",
                    line: 8,
                    monthCost: null,
                }, {
                    item: "检化验费,元",
                    line: 9,
                    monthCost: null,
                }, {
                    item: "分摊,元",
                    line: 10,
                    monthCost: null,
                }, {
                    item: "一般厂务费,元",
                    line: 11,
                    monthCost: null,
                }, {
                    item: null,
                    line: 12,
                    monthCost: null,
                }, {
                    item: null,
                    line: 13,
                    monthCost: null,
                }, {
                    item: null,
                    line: 14,
                    monthCost: null,
                }, {
                    item: null,
                    line: 15,
                    monthCost: null,
                }, {
                    item: null,
                    line: 16,
                    monthCost: null,
                },
            ],
            subarr: "",
            boolen: false
        }
    }
    componentWillMount() {
        const url = window.location.search ? 203 : this.props.tabKeys === "2" ? 159 : this.props.tabKeys === "3" ? 179 : 9
        axios.get(`/api/estimate-para-fix-cost/recent/?purpose=${url}`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            ////console.log(res)
            this.setState({
                DataGu: res.data
            })
        })
    }
    GudingFeiYong(item, index) {
        return (e) => {
            const value = e.target.value;
            const newList = this.state.DataGu;
            newList[index][item] = value;
            this.setState({ DataGu: newList })
        }
    }
    computed() {
        this.setState({
            boolen: true
        })
        const url = window.location.search ? 203 : this.props.JGFkey === "2" ? 122 : this.props.JGFkey === "3" ? 123 : 3
        axios.post("/api/estimate-fix/", {
            purpose: url,
            fy:
                this.state.DataGu.map((item, index) => {
                    return (
                        {
                            line: item.line,
                            item: item.item,
                            purpose: url,
                            monthCost: Number(item.monthCost).toFixed(4),
                        }
                    )
                })

        }, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            if (res.status) {
                message.success("计算成功")

                this.setState({
                    subarr: res.data.amount.monthCost,
                    boolen: false
                }, () => {
                    this.props.guding(this.state.subarr)
                })
            }


        }).catch(err => {
            this.setState({

                boolen: false,
            })
            ////console.log(err)
            if (err.request.status === 500) {
                message.warning("请检查参数信息是否正确")
            } else if (err.request.status === 400) {
                message.warning("请检查参数信息是否正确")
            }
            // notification["error"]({
            //   message: '网络发生了一些错误(' + err.request.status + ')！',
            //   description: err.request.statusText + "：" + err.request.responseURL,
            // });
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
                            <td>月费用，万元，/月</td>
                        </tr>
                        {
                            this.state.DataGu.map((item, index) => {
                                return (
                                    <tr key={index} className="trgufei">
                                        <td>{index + 1}</td>
                                        <td>
                                            <Input
                                                onChange={this.GudingFeiYong("item", index).bind(this)}
                                                value={item.item}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                onChange={this.GudingFeiYong("monthCost", index).bind(this)}
                                                value={item.monthCost === "0.00" ? null : item.monthCost}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="jiachuKebian">
                            <td>高炉固定加工费合计</td>
                            <td></td>
                            <td>{this.state.subarr}</td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={this.computed.bind(this)} className="computed" disabled={this.state.boolen}>计算</Button>
            </div>
        )
    }
}