import React, { Component } from "react";
import axios from "axios";
import { Form, Select, message, Radio } from "antd";
const { Option } = Select;
let list=[]
const RjList=[]
for (let p = 1; p < 17; p++) {
    list.push(p)
}
for (let i = 11; i < 25; i++) {
    RjList.push(i)
}
//到导入烧结矿粉
class BudgetFenYouHua extends Component {
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
            DataValue: "",
            valueName: "铁矿粉",
            RjList: []
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
     
       
        axios.get(`/api/importfunctions/?purpose=1`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            this.setState({
                dataTime: res.data
            })
        })
        this.props.valueNameRadio(this.state.valueName)
    }
    //这里的value代表选取的是时间还是名称
    handlersearchinputChange(value) {
        const searchVal = [];
        if (this.state.valueName === "铁矿粉") {
            // //console.log(value);
            for (let i = 0; i < this.state.dataTime.length; i++) {
                if (this.state.dataTime[i] === `${value}`) {
                    searchVal.push(this.state.dataTime[i])
                    axios.get(`/api/ore/?ordering=-createTime&name=${searchVal}&purpose=1`, {
                        headers: {
                            Authorization: sessionStorage.getItem("token")
                        }
                    })
                        .then(response => {
                            this.setState({
                                dataName: response.data.results,
                                DataValue: response.data.results[0].incomingDate
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
        } else if(this.state.valueName === "熔剂"){
            for (let i = 0; i < this.state.dataTime.length; i++) {
                if (this.state.dataTime[i] === `${value}`) {
                    searchVal.push(this.state.dataTime[i])
                    axios.get(`/api/sjrjore/?name=${searchVal}`, {
                        headers: {
                            Authorization: sessionStorage.getItem("token")
                        }
                    })
                        .then(response => {
                            this.setState({
                                dataName: response.data.results,
                                DataValue: response.data.results[0].incomingDate
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
        }else if(this.state.valueName === "固废"){
            for (let i = 0; i < this.state.dataTime.length; i++) {
                if (this.state.dataTime[i] === `${value}`) {
                    searchVal.push(this.state.dataTime[i])
                    axios.get(`/api/sjflore/?name=${searchVal}`, {
                        headers: {
                            Authorization: sessionStorage.getItem("token")
                        }
                    })
                        .then(response => {
                            //console.log(response)
                            this.setState({
                                dataName: response.data.results,
                                DataValue: response.data.results[0].incomingDate
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
        }else if(this.state.valueName === "焦粉"){
            for (let i = 0; i < this.state.dataTime.length; i++) {
                if (this.state.dataTime[i] === `${value}`) {
                    searchVal.push(this.state.dataTime[i])
                    axios.get(`/api/ore-j/?name=${searchVal}`, {
                        headers: {
                            Authorization: sessionStorage.getItem("token")
                        }
                    }).then(response => {
                        //console.log(response)
                            this.setState({
                                dataName: response.data.results,
                                DataValue: response.data.results[0].incomingDate
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
        }else if(this.state.valueName === "煤粉"){
            for (let i = 0; i < this.state.dataTime.length; i++) {
                if (this.state.dataTime[i] === `${value}`) {
                    searchVal.push(this.state.dataTime[i])
                    axios.get(`/api/ore-m/?name=${searchVal}`, {
                        headers: {
                            Authorization: sessionStorage.getItem("token")
                        }
                    })
                        .then(response => {
                            this.setState({
                                dataName: response.data.results,
                                DataValue: response.data.results[0].incomingDate
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
    }
    name(value) {
        this.state.dataName.forEach((items, index) => {
            if (index + 1 === value) {
                this.setState({
                    nameList: items,
                    DataValue: items.incomingDate
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
    RadionChange(e) {
        const list = []
    
        if (e.target.value === "铁矿粉") {
            axios.get(`/api/importfunctions/?purpose=1`, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res) => {
                for (let p = 1; p < 17; p++) {
                    list.push(p)
                }
                this.setState({
                    dataTime: res.data,
                    valueName: e.target.value,
                    list: list
                },()=>{
                    this.props.valueNameRadio(this.state.valueName)
                })
            })
        } else if(e.target.value === "熔剂"){
            axios.get(`/api/sjrjname/`, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res) => {
               
                this.setState({
                    dataTime: res.data,
                    valueName: e.target.value,
                
                  
                },()=>{
                    this.props.valueNameRadio(this.state.valueName)
                })
            })
          
        }else if(e.target.value === "固废"){
            axios.get(`/api/sjflname/`, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res)=>{
               
                ////console.log(res)
                this.setState({
                    dataTime: res.data,
                    valueName: e.target.value,
                },()=>{
                    this.props.valueNameRadio(this.state.valueName)
                })
            })
        }else if(e.target.value === "焦粉"){
            axios.get(`/api/jtname/`, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res)=>{
                
               // //console.log(res)
                this.setState({
                    dataTime: res.data,
                    valueName: e.target.value,
                },()=>{
                    this.props.valueNameRadio(this.state.valueName)
                })
            })
        }else if(e.target.value === "煤粉"){
            axios.get(`/api/mfname/`, {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            }).then((res)=>{
               
                //console.log(res)
                this.setState({
                    dataTime: res.data,
                    valueName: e.target.value,
                },()=>{
                    this.props.valueNameRadio(this.state.valueName)
                })
            })
        }
    };
    render() {
      
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="daoru">
                <div>
                    <Radio.Group onChange={this.RadionChange.bind(this)} defaultValue={this.state.valueName}>
                        <Radio value="铁矿粉">铁矿粉</Radio>
                        <Radio value="熔剂">熔剂</Radio>
                        <Radio value="固废">固废</Radio>
                        <Radio value="焦粉">焦粉</Radio>
                        <Radio value="煤粉">煤粉</Radio>
                    </Radio.Group>
                </div>
                <div>
                    <span>名称</span>
                    <span>时间</span>
                    <span>导入序号</span>
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form" >
                    <Form.Item style={{ width: 200, marginRight: 10 }}>
                        {getFieldDecorator('name')(
                            <Select
                                onChange={this.handlersearchinputChange.bind(this)}
                                style={{ width: 200 }}
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
                    <Form.Item style={{ width: 200, marginRight: 10 }}>
                        {getFieldDecorator('time', {
                            initialValue: this.state.DataValue
                        })(
                            <Select
                                onChange={this.name.bind(this)}
                                style={{ width: 200 }}
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
                                   (this.state.valueName==="铁矿粉" ? list  : RjList).map((items, index) => {
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
const WrappedBudgetFen = Form.create({ name: 'youhua' })(BudgetFenYouHua);
export default WrappedBudgetFen