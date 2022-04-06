import React, { Component } from "react";
import axios from "axios";
import { Input, Button, Form, message, } from "antd"; 
//烧结固定加工费
class BudgetBuGuDing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: [
                {
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
                    item: "5、运费,元",
                    monthCost: null
                }, {
                    line: 6,
                    item: "6、试验检验费,元",
                    monthCost: null
                }, {
                    line: 7,
                    item: "7、分摊,元",
                    monthCost: null
                }, {
                    line: 8,
                    item: "8、其他,元",
                    monthCost: null
                }, {
                    line: 9,
                    item: "",
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
                    unit: "",
                    monthCost: null
                }, {
                    line: 16,
                    unit: "",
                    monthCost: null
                }
            ],
            guList: "",//固定成分
            boolen: false,
        }

    }
    componentWillMount() {
        axios.get(`/api/estimate-para-fix-cost/recent/?purpose=${this.props.tabKeys==="2" ? 102 : this.props.tabKeys==="3" ? 103 : 1}`, {
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
    guInfoMotions(monthCost, index) {
        return (e) => {
            const value = e.target.value;
            const newData = this.state.number;
            newData[index][monthCost] = value;
            this.setState({ number: newData });
            //////console.log(this.state.number)
        }
    }
    guDingInfo() {
        this.setState({
            boolen: true,
        })
        axios.post("/api/estimate-fix/", {
            purpose: this.props.tabKeys==="2" ? 102 : this.props.tabKeys==="3" ? 103 : 1,
            fy:
                this.state.number.map((item, index) => {
                    if (item.monthCost === "") {
                        item.monthCost = null;
                    }
                    return (
                        {
                            line: item.line,
                            item: item.item,
                            purpose: this.props.tabKeys==="2" ? 102 : this.props.tabKeys==="3" ? 103 : 1,
                            monthCost: item.monthCost
                        }
                    )
                })
        }, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            ////console.log(res)
            //////console.log(res.data.amount.monthCost)
            if (res.status) {
                this.setState({
                    boolen: false
                })
            }
            message.success("计算完成!")
            this.setState({
                guList: res.data.amount.monthCost
            })
            this.props.amountGuDing(this.state.guList)
        }).catch((err) => {
            this.setState({
                boolen: false,
            })
            if (err.request.status === 500) {
                message.warning("请检查参数信息是否正确")

            } else if (err.request.status === 400) {
                message.warning("请检查参数信息是否正确")

            } else if (err.request.status === 401) {
                message.warning("你没有该权限！")

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
                                        <td><Input
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
                            <td>烧结固定加工费合计</td>
                            <td>{this.state.guList}</td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={this.guDingInfo.bind(this)} disabled={this.state.boolen} className="computed">计算</Button>
            </div>
        )
    }
}
const WrappedBuGuDing = Form.create({ name: 'BudgetBuGuDing' })(BudgetBuGuDing);
export default WrappedBuGuDing