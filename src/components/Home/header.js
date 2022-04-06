import React, { Component } from "react";
import "./headerSS.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Modal, Button, message, Input, Form, notification } from 'antd';
import axios from "axios"
class Center extends Component {
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
      <div className="centers">
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
            <Button className="btns" htmlType="submit">
              确认修改
            </Button>
          </Form.Item>
        </Form>

      </div>
    )
  }
}
const WrappedEdCenter = Form.create({ name: 'center' })(Center);
 class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      date: "",
      namesL: "",
    }

  }
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    ////console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    ////console.log(e);
    this.setState({
      visible: false,
    });
  };
  UNSAFE_componentWillMount() {
   
    var localhref = window.location.href; //获取当前域名
    var localarr = localhref.split('/'); //所带参数以/进行分开
    ////console.log(localarr[4]);

    if (localarr[4] === "one") {
      this.setState({
        namesL: "烧结粉基础数据库"
      })
    }
    if (localarr[4] === "two") {
      this.setState({
        namesL: "球团粉基础数据库"
      })
    }
    if (localarr[4] === "three") {
      this.setState({
        namesL: "入炉料基础数据库"
      })
    }
    if (localarr[4] === "four") {
      this.setState({
        namesL: "护炉料基础数据库"
      })
    }
    if (localarr[4] === "five") {
      this.setState({
        namesL: "煤粉基础数据库"
      })
    }
    if (localarr[4] === "six") {
      this.setState({
        namesL: "焦炭基础数据库"
      })
    }
    if (localarr[4] === "compare") {
      this.setState({
        namesL: "烧结用矿粉性价比"
      })
    }
    if (localarr[4] === "bePutInAFurnace") {
      this.setState({
        namesL: "球团用矿粉性价比"
      })
    }
    if (localarr[4] === "rulu") {
      this.setState({
        namesL: "入炉料性价比"
      })
    }
    if (localarr[4] === "ToProtectTheCharge") {
      this.setState({
        namesL: "护炉料性价比"
      })
    }
    if (localarr[4] === "braize") {
      this.setState({
        namesL: "煤粉性价比"
      })
    }
    if (localarr[4] === "coke") {
      this.setState({
        namesL: "焦炭性价比"
      })
    }
    if (localarr[4] === "budget") {
      this.setState({
        namesL: "烧结成本测算"
      })
    }
    if (localarr[4] === "pelletizing") {
      this.setState({
        namesL: "球团成本测算"
      })
    }
    if (localarr[4] === "blastFurnace") {
      this.setState({
        namesL: "高炉成本测算"
      })
    }
    if (localarr[4] === "optimization") {
      this.setState({
        namesL: "烧结成本优化"
      })
    }
    if (localarr[4] === "solvent") {
      this.setState({
        namesL: "熔剂基础数据库"
      })
    }
    if (localarr[4] === "waste") {
      this.setState({
        namesL: "固废基础数据库"
      })
    }
    if (localarr[4] === "Pelletsoptimization") {
      this.setState({
        namesL: "球团成本优化"
      })
    }if (localarr[4] === "coalblending") {
      this.setState({
        namesL: "配煤成本优化"
      })
    }if (localarr[4] === "GaoLublastfurnace") {
      this.setState({
        namesL: "高炉成本优化"
      })
    }
  }
  componentDidMount(){
    this.showTime();
  }
  showTime() {
    function toDate(n) {
      if (n < 10) {
        return '0' + n;
      } else {
        return '' + n;
      }
    }; 
    let self = this
    function trick() {
      var oDate = new Date();
      var years = toDate(oDate.getFullYear());
      var month = toDate(oDate.getMonth() + 1);
      var days = toDate(oDate.getDate());
      var H = toDate(oDate.getHours());
      var M = toDate(oDate.getHours());
      var S = toDate(oDate.getSeconds());
      var time = H + ":" + M + ":" + S;
      var ndate = years + "-" + month + "-" + days;
      // document.getElementById('divT').innerHTML = ndate;
      // document.getElementById('p1').innerHTML = time;
      self.setState({
        year: ndate,
        date: time,
      })
    }
    setInterval(trick, 1000);

  }
  render() {
    return (
      <div>  
        <div className="headerhead">

          <div className="toubu">
            <img src={require("../../img/top_logo.png")} alt="铁前成本智能管控系统" />
            <span style={{ float: "right" }}>
              <span className="center">
                <img src={require('../../img/prcenter.png')} alt="" />
                <span onClick={this.showModal.bind(this)} style={{ cursor: "pointer" }}>{sessionStorage.getItem("name")}</span>
              </span>
              <span className="shugang">|</span>
              <span className="year" >{this.state.year}</span>
              <span className="time">{this.state.date}</span>
            </span>
          </div>
        </div>
        <div className="search">
          <div className="search-one">
            <img src={require("../../img/pixelicious.png")} alt=""></img>
            <span className="ku">{this.props.info === "" ? this.state.namesL : this.props.info}</span>
            <span className="search-two">
            </span>
          </div>
        </div>
        <Modal
          title="修改个人密码"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="关闭"
          cancelText="取消"
        >
          <WrappedEdCenter ref="center"></WrappedEdCenter>
        </Modal>
      </div>
    )
  }
}   
export default withRouter(connect(state => state)(Header));