//球团固定加工费
import React, { Component } from "react";
import axios from "axios";
import { Input, Button, message, } from "antd";

export default class BudgetBuGuDing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: [{
                line: 1,
                item: "1、职工薪酬,元",
                monthCost: null
            }, {
                line: 2,
                item: "2、厂务费用,元",
                monthCost: null
            }, {
                line: 3,
                item: "3、折旧,元",
                monthCost: null
            }, {
                line: 4,
                item: "4、修理费,元",
                monthCost: null,
            }, {
                line: 5,
                item: "其中，工矿备件",
                monthCost: null,
            }, {
                line: 6,
                item: "5、运费,元",
                monthCost: null
            }, {
                line: 7,
                item: "6、试验检验费,元",
                monthCost: null
            }, {
                line: 8,
                item: "7、分摊,元",
                monthCost: null
            }, {
                line: 9,
                item: "8、其他,元",
                monthCost: null
            }, {
                line: 10,
                item: "",
                monthCost: null
            }, {
                line: 11,
                item: "",
                monthCost: null
            }, {
                line: 12,
                item: "",
                monthCost: null
            }, {
                line: 13,
                item: "",
                monthCost: null
            }, {
                line: 14,
                item: "",
                monthCost: null
            }, {
                line: 15,
                item: "",
                monthCost: null
            }, {
                line: 16,
                item: "",
                monthCost: null
            }, {
                line: 17,
                item: "",
                monthCost: null
            }
            ],
            guList: "",//固定成分
            boolen: false,
        }
    }
    guInfoMotions(monthCost, index) {
        return (e) => {
            const value = e.target.value;
            const newData = this.state.number.slice();
            newData[index][monthCost] = value;
            this.setState({ number: newData });
            //////console.log(this.state.number)
        }
    }
    UNSAFE_componentWillMount() {
        const url = window.location.search ? 202 : this.props.tabKeys === "2" ? 112 : 2
        axios.get(`/api/estimate-para-fix-cost/recent/?purpose=${url}`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            //////console.log(res)
            this.setState({
                number: res.data
            })
        })
    }
    guDingInfo() {
        this.setState({
            boolen: true
        })
        const url = window.location.search ? 202 : this.props.tabKeys === "2" ? 112 : 2
        axios.post("/api/estimate-fix/", {
            purpose: url,
            fy:
                this.state.number.map((item, index) => {
                    if (item.monthCost === "") {
                        item.monthCost = null;
                    }
                    return (
                        {
                            line: item.line,
                            item: item.item,
                            purpose: url,
                            monthCost: item.monthCost
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
                //////console.log("成功")
                //////console.log(res.data.amount.monthCost)
                this.setState({
                    guList: res.data.amount.monthCost,
                    boolen: false
                })
                this.props.amountGuDing(this.state.guList)
            }

        }).catch(err => {
            this.setState({

                boolen: false,
            })
            //////console.log(err)
            if (err.request.status === 500) {
                message.warning("计算失误！请检查参数信息是否正确！")
            } else if (err.request.status === 400) {
                message.warning("请检查参数信息是否完整！")
            } else if (err.request.status === 401) {
                message.warning("您没有权限！")
            }
        })
    }
    render() {

        return (
            <div>

                <table className="tableGufei">
                    <tbody>

                        <tr className="trgufei">
                            <td>成本项目</td>
                            <td>月费用，万元/月</td>
                        </tr>

                        {
                            this.state.number.map((item, index) => {
                                return (
                                    <tr key={index} className="trgufei">
                                        <td>
                                            <Input
                                                value={item.item}
                                                onChange={this.guInfoMotions("item", index).bind(this)}
                                            ></Input>
                                        </td>
                                        <td>
                                            <Input
                                                value={item.monthCost}
                                                onChange={this.guInfoMotions("monthCost", index).bind(this)}
                                            ></Input>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        <tr className="jiachu">
                            <td>球团固定加工费合计</td>
                            <td>{this.state.guList}</td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={this.guDingInfo.bind(this)} className="computed" disabled={this.state.boolen}>计算</Button>
            </div>
        )
    }
}