//登陆页面
import React, { Component } from "react";
import "./indexLogin.css"
import { Form, Icon, Input, Button,message} from 'antd';
import {withRouter} from "react-router-dom";
import axios from "axios"

 class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //////console.log('Received values of form: ', err);
        axios.post("/api/account/auth/",{
          username: values.username,
        	password: values.password,
        }).then((res)=>{
          ////console.log(res)
          sessionStorage.setItem("token",`JWT ${res.data.token}`)
          sessionStorage.setItem("name",`${res.data.name}`)
          sessionStorage.setItem("permission1",`${res.data.permission1}`)
          sessionStorage.setItem("permission2",`${res.data.permission2}`)
          sessionStorage.setItem("permission3",`${res.data.permission3}`)
          sessionStorage.setItem("titleName", '烧结粉基础数据库')
          message.success("登录成功！")
          if(res.data.is_superuser){
            this.props.history.push("/administrator");
          }else{
            this.props.history.push("/index/one");  
          }

        }).catch(err => {
          if(err.request.status===500){
            message.warning("服务器连接失败！")
          }if(err.request.status===400){
            message.warning("账号或密码错误！")
          }
          // notification["error"]({
          //   message: '网络发生了一些错误(' + err.request.status + ')！',
          //   description: err.request.statusText + "：" + err.request.responseURL,
          // });
        })
      }
    });
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="login">
          <img src={require("../../img/logo.png")} alt="" />
        </div>
        <div className="from">
          <div className="from-children">
            <img src={require("../../img/img.png")} alt="" />
            <div className="login-from">
            <h3 className="login-denglu">用户登录</h3>
            <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item style={{height:90}}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input
                style={{width:300,marginLeft:15}}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
              
            />,
          )}
        </Form.Item><br></br>
        <Form.Item style={{height:90}}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input
            style={{width:300,marginLeft:15}}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
                登录
        </Button>
      </Form>
          </div>
          </div>
         
        </div>
        <div className="login-footer">
        <img src={require("../../img/bottom.png")} alt="" />
        </div>

      </div>
    )
  }
}

export default  withRouter(Form.create({ name: 'normal_login' })(Login));