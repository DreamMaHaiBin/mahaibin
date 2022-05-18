import React, { Component } from 'react';
import "./indexAD.css";
import Statistics from "./statistics"
import Jurisdiction from "./jurisdiction"
import { Table, Modal, notification, message, Form, Input, Button } from 'antd';
import axios from "axios";
const columns = [
    {
        title: '账号',
        dataIndex: 'username',
        key: 1,
        width: "33%"
    },{
        title: '姓名',
        dataIndex: 'name',
        key: 2,
        width: "33%"
    },{
        title: '部门',
        dataIndex: 'department',
        key: 3,
        width: "33%"
    },
];
//添加用户
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuli: "perfectinformation",
            confirmDirty: false,
        }
        this.handlerisregfun = this.handlerisregfun.bind(this);
    }
    //密码输入验证
    handlerregpsdfun(rule, value, callback) {

        if (!/^([0-9]|[A-z]|_){6,18}$/ig.test(value)) {
            callback("密码包含数字、字母、下划线的6-18位!");
        }
        callback();
    }
    //确认密码验证
    handlerisregfun(rule, value, callback) {
        const { getFieldValue } = this.props.form
        if (value && value !== getFieldValue('newparssword')) {
            callback('两次输入不一致！')
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <div className="add">
                <Form {...formItemLayout} >
                    <Form.Item style={{ height: 90, marginLeft: 80, marginTop: 30 }} label="请输入用户名">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input
                                style={{ width: 300, }}

                                placeholder="请输入用户名"
                            />,
                        )}
                    </Form.Item><br></br>
                    <Form.Item style={{ height: 90, marginLeft: 80 }} label="请输入姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input
                                style={{ width: 300, }}

                                placeholder="请输入用户名"
                            />,
                        )}
                    </Form.Item><br></br>
                    <Form.Item style={{ height: 90, marginLeft: 80 }} label="请输入部门">
                        {getFieldDecorator('department', {
                            rules: [{ required: true, message: '请输入部门!' }],
                        })(
                            <Input
                                style={{ width: 300, }}

                                placeholder="请输入用户名"
                            />,
                        )}
                    </Form.Item><br></br>
                    <Form.Item label="输入登录密码" style={{ height: 90, marginLeft: 80 }}>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '输入新登录密码!',
                                },
                                {
                                    validator: this.handlerregpsdfun
                                }
                            ],
                        })(<Input type="password" style={{ width: 300 }} />)}
                    </Form.Item><br></br>

                </Form>
            </div>
        )
    }
}
const WrappedAdd = Form.create({ name: 'add' })(Add);
//修改用户
class Delted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuli: "perfectinformation",
            confirmDirty: false,
        }

        this.handlerisregfun = this.handlerisregfun.bind(this);
    }
    //密码输入验证
    handlerregpsdfun(rule, value, callback) {

        if (!/^([0-9]|[A-z]|_){6,18}$/ig.test(value)) {
            callback("密码包含数字、字母、下划线的6-18位!");
        }
        callback();
    }
    //确认密码验证
    handlerisregfun(rule, value, callback) {
        const { getFieldValue } = this.props.form
        if (value && value !== getFieldValue('newparssword')) {
            callback('两次输入不一致！')
        }
        callback();
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className="add">
                {
                    this.props.selectedRows.map((item, index) => {
                        return (
                            <Form {...formItemLayout} key={index}>
                                <Form.Item style={{ height: 90 }} label="请输入用户名">
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入用户名!' }],
                                        initialValue: item.username
                                    })(
                                        <Input
                                            style={{ width: 300, }}

                                            placeholder="请输入用户名"
                                        />,
                                    )}
                                </Form.Item><br></br>
                                <Form.Item style={{ height: 90 }} label="请输入姓名">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入姓名!' }],
                                        initialValue: item.name,
                                    })(
                                        <Input
                                            style={{ width: 300, }}

                                            placeholder="请输入用户名"
                                        />,
                                    )}
                                </Form.Item><br></br>
                                <Form.Item style={{ height: 90 }} label="请输入部门">
                                    {getFieldDecorator('department', {
                                        rules: [{ required: true, message: '请输入部门!' }],
                                        initialValue: item.department,
                                    })(
                                        <Input
                                            style={{ width: 300, }}

                                            placeholder="请输入用户名"
                                        />,
                                    )}
                                </Form.Item><br></br>
                                <Form.Item label="输入登录密码" style={{ height: 90 }}>
                                    {getFieldDecorator('newparssword', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '输入新登录密码!',
                                            },
                                            {
                                                validator: this.handlerregpsdfun
                                            }
                                        ],
                                        initialValue: item.newparssword,
                                    })(<Input type="password" style={{ width: 300 }} />)}
                                </Form.Item><br></br>
                                <Form.Item label="再次输入密码" style={{ height: 90 }}>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '再次输入密码!',
                                            },
                                            {
                                                validator: this.handlerisregfun
                                            }
                                        ],
                                    })(<Input type="password" style={{ width: 300 }} />)}
                                </Form.Item>
                            </Form>
                        )
                    })
                }

            </div>
        )
    }
}
const WrappedDelted = Form.create({ name: 'edcomponent' })(Delted);
//修改管理员的密码
class EdPassward extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuli: "perfectinformation",
            confirmDirty: false,
        }
        this.handlerisregfun = this.handlerisregfun.bind(this);
    }


    //密码输入验证
    handlerregpsdfun(rule, value, callback) {

        if (!/^([0-9]|[A-z]|_){6,18}$/ig.test(value)) {
            callback("密码包含数字、字母、下划线的6-18位!");
        }
        callback();
    }
    //确认密码验证
    handlerisregfun(rule, value, callback) {
        const { getFieldValue } = this.props.form
        if (value && value !== getFieldValue('newPassword')) {
            callback('两次输入不一致！')
        }
        callback();
    }
    //提交修改密码的信息
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (sessionStorage.getItem("token")) {
                    axios.post("/api/account/info/change-password/", {
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword,
                    },
                        {
                            headers: {
                                Authorization: sessionStorage.getItem("token")
                            }
                        }).then((res) => {
                            message.success("密码修改成功")
                        }).catch(err => {
                            notification["error"]({
                                message: '网络发生了一些错误(' + err.request.status + ')！',
                                description: err.request.statusText + "：" + err.request.responseURL,
                            });
                        })
                } else {
                    message.warning('登录已经过期，请重新登陆！');
                    this.props.history.push("/");
                }

            }
        });


    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div className="edpass">
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Item label="输入旧登录密码" style={{ height: 90 }}>
                        {getFieldDecorator('oldPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '输入旧登录密码!',
                                },
                                {
                                    validator: this.handlerregpsdfun
                                }
                            ],
                        })(<Input type="password" style={{ width: 300 }} />)}
                    </Form.Item><br></br>
                    <Form.Item label="输入新登录密码" style={{ height: 90 }}>
                        {getFieldDecorator('newPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '输入新登录密码!',
                                },
                                {
                                    validator: this.handlerregpsdfun
                                }
                            ],
                        })(<Input type="password" style={{ width: 300 }} />)}
                    </Form.Item><br></br>
                    <Form.Item label="再次输入新密码" style={{ height: 90 }}>
                        {getFieldDecorator('newparsswordtwo', {
                            rules: [
                                {
                                    required: true,
                                    message: '再次输入新密码!',
                                },
                                {
                                    validator: this.handlerisregfun
                                }
                            ],
                        })(<Input type="password" style={{ width: 300 }} />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button className="btned" htmlType="submit">
                            确认修改
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const WrappedEdPassward = Form.create({ name: 'edPassward' })(EdPassward);
class Administrators extends Component {
    constructor(props) {
        super(props)
        this.state = {
            model: "",
            listData: [],
            selectedRows: [],
            ids: null,
            TotleCount:null
        }

    }
    componentWillMount() {
        axios.get("/api/account/info/?page=1").then((res) => {
          console.log(res)
            this.setState({
                listData: res.data.results,
                TotleCount: res.data.count
            })
        })
    }
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk() {
        if (this.state.model === "add") {//新增提交
            this.refs.add.validateFields((err, values) => {
                axios.post("/api/account/info/", {
                    username: values.username,
                    name: values.name,
                    gender: values.gender,
                    department: values.department,
                    password: values.password,
                }).then((res) => {
                    message.success('添加成功');
                    this.componentWillMount();
                })

            })
            this.setState({
                visible: false
            })
        }
        //修改用户信息
        if (this.state.model === "delted") {
            if (this.state.selectedRows.length > 0) {
                this.refs.edcomponent.validateFields((err, values) => {
                    if (err) {
                        this.setState({
                            confirmLoading: false,
                            model: null
                        });
                    } else {
                        
                        this.state.selectedRows.forEach((item,index)=>{
                            axios.put("/api/account/info/" + item.id, {
                                username: values.username,
                                name: values.name,
                                gender: values.gender,
                                department: values.department,
                                password: values.password,
                               
                            }).then((res) => {
                              //  ////console.log(res)
                                message.success('修改成功');
                                // setTimeout(()=>{
                                //     window.location.reload()
                                // },500)
                             
                                this.componentWillMount();
                            })
                        })
                       
                    }
                })
            } else {
                message.warning("请选择一组数据!");
            }
            this.setState({
                visible: false
            })
        }

    }
    handleCancel = e => {
     //   ////console.log(e);
        this.setState({
            visible: false,
        });
    };
    changeGai() {
        var buttonArr = document.getElementsByClassName("manage");
        var divArr = document.getElementsByClassName("se");
        var img = document.getElementsByClassName("img")
        img[0].src = require("../../img/USER _ ADD1.png")
        buttonArr[0].style.backgroundColor = "#3c6aa5";
        buttonArr[0].style.color = "#f2f7fd";
        for (var i = 0; i < buttonArr.length; i++) {
            buttonArr[i].onclick = function () {

                // alert(this.innerHTML)
                //for循环遍历button数组长度
                for (var j = 0; j < buttonArr.length; j++) { 
                    //重置所有的button样式
                    buttonArr[j].style.backgroundColor = "#f2f7fd";
                    buttonArr[j].style.color = "#000";
                    //给当前的(点击的那个)那个button添加样式
                    this.style.backgroundColor = "#3c6aa5";
                    this.style.color = "#fff";
                    //隐藏所有的div
                    divArr[j].style.display = "none";
                    //判断当前点击是按钮数组中的哪一个？
                    if (this === buttonArr[j]) {
                      
                        
                        for (let k = 0; k < img.length; k++) {
                            // img[k].onclick = function () {
                            if (k === 0 && j===k) {
                           
                                img[0].src = require("../../img/USER _ ADD1.png")
                            } else {
                                img[0].src = require("../../img/USER _ ADD0.png")
                            }
                            if (k === 1  && j===k) {

                                img[1].src = require("../../img/COMPUTER _ OK1.png")
                            } else {
                                img[1].src = require("../../img/tongji.png")
                            }
                            if (k === 2) {
                           
                                img[2].src = require("../../img/PEN1.png")
                            } else {
                                img[2].src = require("../../img/PEN0.png")
                            }
                            if (k === 3  && j===k) {
                              
                                img[3].src = require("../../img/UNLOCK1.png")
                            } else {
                                img[3].src = require("../../img/UNLOCK0.png")
                            }
    
    
                            // }
                        }
                        // alert(j);
                        //显示点击按钮对应的div
                        divArr[j].style.display = "block";
                    }
                }

            }
        }


    }

    //生命周期的钩子函数，再组件已经加载完成的时候调用
    componentDidMount() {
        this.changeGai();
    }
    handAdd() {
        this.setState({
            visible: true,
            model: "add"
        })
    }
    //修改时是否选中一行数据
    delted() {
        switch (this.state.selectedRows.length) {
            case 1:
                this.setState({
                    visible: true,//控制是否显示
                    model: "delted",
                });
                return;
            case 0:
                message.warning("请选择一组数据!");
                return;
            default:
                message.warning("只能同时编辑一组数据!");
                return;

        }


    }
    //删除
    deltet() {
        if (this.state.selectedRows.length > 0) {
            this.state.selectedRows.forEach((item) => {
                if(item.username==="admin"){
                    return message.warning("管理员不能被删除！")
                }else{
                    axios.delete("/api/account/info/" + item.id).then(res => {
                       // ////console.log(res)
                        if (res.status === 204) {
                            message.success("删除成功！")
                      
                            this.componentWillMount();
                        } else {
                            message.warning("删除失败！")
                        }
                    }).catch(err => {
                        notification["error"]({
                            message: '网络发生了一些错误(' + err.request.status + ')！',
                            description: err.request.statusText + "：" + err.request.responseURL,
                        });
                    })
                }
               
            })
        } else {
            message.warning("请选择一组数据!");
        }


    }
    tui() {
        this.props.history.push("/");
        sessionStorage.clear();
    }
    render() {
       
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            
                this.setState({
                    selectedRows: selectedRows,
                    ids: selectedRowKeys,
                    
                })
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <div>
                <div className="heads">
                    <div className="heads-one">
                        <img src={require("../../img/top_logo.png")} alt="" />
                        <span onClick={this.tui.bind(this)} style={{ cursor: "pointer", color: "#fff", fontWeight: 600 }}>
                            <img src={require("../../img/quit.png")} alt="" />

                            退出</span>
                    </div>
                    <div className="head-admin">
                        <div className="admin">
                            <div className="manage">
                                <img src={require("../../img/rentou.png")} alt="" className="img" />

                                <span >账号管理</span>
                            </div>
                            <div className="manage">
                                <img src={require("../../img/tongji.png")} alt="" className="img" />
                                <span>权限管理</span>
                            </div>
                            <div className="manage">
                                <img src={require("../../img/PEN0.png")} alt="" className="img" />
                                <span>统计用户</span>
                            </div>
                            <div className="manage">
                                <img src={require("../../img/UNLOCK0.png")} alt="" className="img" />
                                <span> 修改密码</span>
                            </div>

                        </div>
                        <div className="admin_one">
                            <div className="se" style={{ display: "block" }}>

                                <button className="btn" onClick={this.handAdd.bind(this)}>
                                    <i>+</i>新增
                            </button>
                                <button className="btn" onClick={this.deltet.bind(this)}>
                                    <i>×</i>删除
                            </button>
                                <button className="btn" onClick={this.delted.bind(this)}>
                                    <i>×</i>修改账户
                            </button>
                                <div>
                                    <Table
                                        rowSelection={rowSelection}
                                        columns={columns}
                                        dataSource={this.state.listData}
                                        rowKey="id"
                                        pagination={
                                            {
                                                total: this.state.TotleCount,//数据的总条数
                                                defaultCurrent: 1,//默认当前的页数
                                                defaultPageSize: 25,//默认每页的条数
                                                onChange: (page, pageSize) => {
                                                    axios.get(`/api/account/info/?page=${page}`).then((res) => {
                                                        console.log(res)
                                                          this.setState({
                                                              listData: res.data.results
                                                          })
                                                      })
                                                }
                                            }
                                        }

                                    >
                                    </Table>
                                </div>
                                <Modal
                                    title={this.state.model === "add" ? "新增用户" : "修改账号"}
                                    visible={this.state.visible}
                                    onOk={this.handleOk.bind(this)}
                                    onCancel={this.handleCancel}
                                    okText="确认"
                                    cancelText="取消"
                                    destroyOnClose={true}
                                >
                                    {
                                        this.state.model === "add" ? <WrappedAdd ref="add"> </WrappedAdd> : <WrappedDelted ref="edcomponent" selectedRows={this.state.selectedRows}> </WrappedDelted>
                                    }
                                </Modal>
                            </div>
                            <div className="se" style={{ display: "none" }}>
                                <Jurisdiction listData={this.state.listData}></Jurisdiction>
                            </div>
                            <div className="se" style={{ display: "none" }}><Statistics></Statistics></div>
                            <div className="se" style={{ display: "none" }}>
                                <WrappedEdPassward ref="edPassward"></WrappedEdPassward>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
export default Administrators