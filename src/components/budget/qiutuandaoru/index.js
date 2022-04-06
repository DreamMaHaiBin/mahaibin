import React, { Component } from "react";
import axios from "axios";
import {Form, Select, message,} from "antd";
const { Option } = Select;
//导入球团矿粉
class BudgetFenTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            dataTime: [],//导入烧结矿粉的信息
            searchVal: [],
            dataName: [],
            data: [],
            nameList: "",//根据名称获取时间
            xuList: [],
            flag: false,
            value: "",
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
            }
        });
    };
    componentWillMount() {  
        axios.get(`/api/importfunctions/?purpose=2`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            //console.log(res.data)
            this.setState({
                dataTime: res.data
            })
        })
        const list = []
        for (let i = 1; i < 19; i++) {
            list.push(i)
        }
        this.setState({
            list: list
        })
    }
    //这里的value代表选取的是时间还是名称
    handlersearchinputChange(value) {
        const searchVal = [];
        //console.log(value);
        for (var i = 0; i < this.state.dataTime.length; i++) {
            if (this.state.dataTime[i] === `${value}`) {
                searchVal.push(this.state.dataTime[i])
                axios.get(`/api/ore/?ordering=-createTime&name=${searchVal}&purpose=2`, {
                    headers: {
                        Authorization: sessionStorage.getItem("token")
                    }
                })
                    .then(response => {
                        //console.log(response.data.results)
                        this.setState({
                            dataName: response.data.results,
                            value: response.data.results[0].incomingDate
                        }, () => {
                            this.props.getData(this.state.dataName)
                        })
                    })
                    .catch(err => {
                        if (err.request.status === 500) {
                            message.warning("计算失败，请检查参数是否正确！")
                        } else if (err.request.status === 400) {
                            message.warning("信息填写不完整！")
                        } else if (err.request.status === 401) {
                            message.warning("您没有权限！")
                        }

                    })
            }
        }
    }
    name(value) {
        this.state.dataName.forEach((items, index) => {
            //在这里可以把item.name改成item.incomingDate 这样就可以传过去
            //console.log(value);
            if (index + 1 === value) {
                this.setState({
                    nameList: items,
                    value: items.incomingDate
                })
            }
        })
    }
    xuhao(value) {
        this.props.ListData.forEach((item, index) => {
            if ((index + 1) === value) {
                //////console.log(value)

                this.setState({
                    xuList: index + 1
                }, () => {
                    this.props.getXu(this.state.xuList)
                })

            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
       
        return (
            <div className="daoru">
                <div >
                 <span>名称</span>
                 <span>时间</span>
                 <span>导入序号</span>
             </div>
                <Form onSubmit={this.handleSubmit} className="login-form" >
                    <Form.Item style={{ width: 200,marginRight:10 }}>
                        {getFieldDecorator('name')(
                            <Select
                                onChange={this.handlersearchinputChange.bind(this)}
                                style={{ width: 200}}
                            >
                                {
                                    this.state.dataTime.map((item, index) => {
                                        return (
                                            <Option key={index} value={item} >
                                                {item}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item style={{ width: 200,marginRight:10 }}>
                        {getFieldDecorator('time',{
                            initialValue:this.state.value
                        })(
                            <Select
                                onChange={this.name.bind(this)}
                                style={{ width: 200  }}
                            >
                                {
                                    this.state.dataName.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.incomingDate}>
                                                {item.incomingDate}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item style={{ width: 200 }}>
                        {getFieldDecorator('number')(
                            <Select
                                onChange={this.xuhao.bind(this)}
                                style={{ width: 200 }}
                            >
                                {
                                    this.state.list.map((items, index) => {
                                        return (
                                            <Option key={index} value={items}>
                                                {items}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const WrappedBudgetFenTwo = Form.create({ name: 'BudgetFenTwo' })(BudgetFenTwo);
export default WrappedBudgetFenTwo