import React, { Component, Fragment } from "react";
import "./compare.scss"
import ExportJsonExcel from 'js-export-excel';
import { Modal, Input, Button, Form, Select, message, } from "antd";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import InfoMation from "./InfoMation/index.js"
import WrappedEditerComponent from "./EditerComponent/index.js"
const { Option } = Select;
//参数设置组件
class AddComponentFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

    }
  }
  //新增提交
  handleSub = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //////console.log(values)
    });
  };
  saveSet() {
    axios.post("/api/savecsm/", {
      para: {
        priceCoke: this.props.setList.priceCoke,
        hf: this.props.setList.hf,
        c: this.props.setList.c,
        ad: this.props.setList.ad,
        std: this.props.setList.std,
        q: this.props.setList.q,
      }
    }, {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {
      if (res.data.error) {
        message.warning(res.data.error + "!")
      } else {
        message.success('保存成功！');
        //console.log(res)
      }

    }).catch((err) => {
      if (err.request.status === 401) {
        message.warning("您没有该权限！")
      } else if (err.request.status === 500) {
        message.warning("服务器繁忙！")
      } else if (err.request.status === 400) {
        message.warning("请查看参数是否正确")
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Button onClick={this.saveSet.bind(this)} style={{ position: "absolute", left: "10px", bottom: "-42px", padding: "3px", }}>保存设置</Button>
        <Form onChange={this.handleSub} >
          <div className="click_show_one">
            <span>通用</span>
            <Form.Item label="基准焦炭价格，元/吨">
              {getFieldDecorator('priceCoke', {
                initialValue: Number(this.props.setList.priceCoke).toFixed(2)
              })(
                <Input type="text" />,
              )}
            </Form.Item>
            <Form.Item label="焦炭灰分，%">
              {getFieldDecorator('ad', {
                initialValue: Number(this.props.setList.ad).toFixed(2)
              })(
                <Input type="text" />,
              )}
            </Form.Item>
            <Form.Item label="基准焦炭发热值，j/g">
              {getFieldDecorator('hf', {
                initialValue: Number(this.props.setList.hf).toFixed(2)
              })(
                <Input type="text" />,
              )}
            </Form.Item>
            <Form.Item label="焦炭硫分，%">
              {getFieldDecorator('std', {
                initialValue: Number(this.props.setList.std).toFixed(2)
              })(
                <Input type="text" />,
              )}
            </Form.Item>
            <Form.Item label="焦炭固定碳，%">
              {getFieldDecorator('c', {
                initialValue: Number(this.props.setList.c).toFixed(2)
              })(
                <Input type="text" />,
              )}
            </Form.Item>
            <Form.Item label="水的气化热，J/g">
              {getFieldDecorator('q', {
                initialValue: Number(this.props.setList.q).toFixed(2)
              })(
                <Input type="text" />
              )}
            </Form.Item>
          </div>
        </Form>

      </Fragment>
    )
  }
}
const WrappedAddComponentFrom = Form.create({ name: 'addcomponent' })(AddComponentFrom);
//性价比测算排序
class Braize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTime: [],//时间数据
      dataName: [],//展示第一框的名字
      searchVal: [],//选择哪一个子项的信息
      ArrayList: [],
      dataList: [],
      newList: [],
      model: "",//判断展示哪一个对话框
      comments: [],//展示排序之后的数据
      listDataSet: "",//展示的设置数据
      setList: "",//保存设置的参数
      prtList: '',//膨润土数据
      zhrjList: "",//综合熔剂数据
      tlList: '',//脱硫
      infoMations: [],//计算结果
      infoOre: [],
      setClick: false,
      context: "",//当前选中的第一个排序的页面
      contHTML: "",//当前选中的第二个排序的页面
      HTMLtext: "",//当前选中的第三个排序的页面
      ckecked: []
    }


  }
  //生命周期的钩子函数，组件即将挂在的时候调用
  UNSAFE_componentWillMount() {
    axios.get("/api/ore-m/incoming-date/", {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {
      //////console.log(res.data)
      this.setState({
        dataTime: res.data
      })
    })
    axios.get("/api/evaluation-m/recent/", {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {
      //////console.log(res.data)
      this.setState({
        setList: res.data
      })
    })
  }

  componentUpdate() {
    this.createConfirm();
    this.setConfirm();
    this.updateInfo();
  }

  //调接口获取根据时间来展示的内容
  handlersearchinputChange(value) {
    const searchVal = [];
    for (var i = 0; i < this.state.dataTime.length; i++) {
      if (this.state.dataTime[i] === `${value}`) {
        searchVal.push(this.state.dataTime[i])
        axios.get(`/api/ore-m/?incomingDate=${searchVal}`, {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        })
          .then(response => {
            this.setState({
              dataName: response.data.results
            })
          })
          .catch(err => {
            // notification["error"]({
            //   message: '网络发生了一些错误(' + err.request.status + ')！',
            //   description: err.request.statusText + "：" + err.request.responseURL,
            // });
            if (err.request.status === 401) {
              message.warning("您没有该权限！")
            } else if (err.request.status === 500) {
              message.warning("服务器繁忙！")
            } else if (err.request.status === 400) {
              message.warning("请查看参数是否正确")
            }
          })
      }
    }
  }
  //渲染数组之后进行操作  获取数据e
  huoQuShuZu(idx) {
    let ArrayList = [];
    let paixu = document.getElementsByClassName("ones")
    for (let j = 0; j < paixu.length; j++) {
      if (idx === j) {
        paixu[idx].className = "ones listpai"
        this.state.dataName.forEach((item, index) => {
          if (item.name + ":" + item.incomingDate === paixu[idx].innerHTML) {
            ArrayList.push(item);
            this.state.ckecked.push(item)
            var arr = this.state.ckecked
            function unique(arr) {
              for (var i = 0; i < arr.length; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                  if (arr[i] === arr[j]) {         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j, 1);
                    j--;
                  }
                }
              }
              return arr;
            }
            console.log(unique(arr))
            this.setState({
              ArrayList: ArrayList,
              ckecked: this.state.ckecked,
              context: paixu[idx].innerHTML
            })
          }
        })

      }

    }
  }
  //排序页面选中信息
  listNameData(e) {
    this.setState({
      contHTML: e.target.innerHTML
    })
    const ArrayList = [];
    this.state.dataList.forEach((item, index) => {
      if (item.name + ":" + item.incomingDate === e.target.innerHTML) {
        ArrayList.push(item);
        this.setState({
          ArrayList: ArrayList
        })
      }
    })
  }
  //排序结果显示页面
  dlInfoMations(e) {
    this.setState({
      HTMLtext: e.target.innerHTML
    })
    const ArrayList = [];
    this.state.infoMations.forEach((item, index) => {
      if ((index + 1) + ":" + item.name + ":" + (Number(item.yxjzl * 100) / 100).toFixed(2) + "%" === e.target.innerHTML) {
        ArrayList.push(item);
        this.setState({
          ArrayList: ArrayList
        })
      }
    })
  }
  //把全部数据传过去
  removeList() {
    //  判断该次日期选择是否含有数据，没有数据直接结束逻辑
    if (this.state.dataName.length > 0) {
      // 复制一个备选数据的模板（因为this.state没法通过数组api进行修改，只能通过this.setState）
      var dataList = this.state.dataName.slice(0);
      // 复制完数据后，将备选数据置空
      this.setState({ dataName: [] })
    } else {
      return;
    }
    //  将上一次选择的数据和这一次的数据拼接在一起，得到最新的悬着结果
    this.setState({
      dataList: Array.from(new Set([...this.state.dataList, ...dataList]))
    }, () => {
      Array.from(new Set(this.state.dataList))
    })
  }
  //把全部数据退回来
  backList() {
    if (this.state.dataList.length > 0) {
      var dataName = this.state.dataList.slice(0)
    } else {
      return;
    }
    this.setState({
      dataName: [...this.state.dataName, ...dataName]
    })

    this.setState({ dataList: [] })
  }

  //只把点中的数据传过去
  oneList() {
    console.log(document.getElementsByClassName("ones"))
    let ones = document.getElementsByClassName("ones")
    for (let i = 0; i < ones.length; i++) {
      ones[i].className = "OnepaiList ones"
    }
    if (this.state.ArrayList.length > 0) {
      var dataList = this.state.ArrayList.slice(0);
      this.setState({ ArrayList: [] })
      const filterList = this.state.dataName.filter((item) => {
        if (item.id !== dataList[0]["id"]) {
          return item
        }
        return null;
      })
      this.setState({
        dataName: filterList,
        dataList: [...this.state.dataList, ...dataList],
        ckecked: [],
      })
    } else {
      return;
    }
    if (this.state.ckecked.length > 0) {
      this.state.ckecked.forEach((its) => {
        this.state.dataName.forEach((item, index) => {
          if (item.id === its.id) {
            this.state.dataName.splice(index, 1)
            this.setState({
              dataName: this.state.dataName
            })
          }
        })
      })
      this.setState({
        dataList: [...this.state.ckecked, ...this.state.dataList],
        ckecked: [],
      })
    }
  }
  //点钟一个将数局返回
  oneBackList() {
    if (this.state.ArrayList.length > 0) {
      var dataName = this.state.ArrayList.slice(0);
      this.setState({ ArrayList: [] })
    } else {
      return;
    }
    const backDataList = this.state.dataList.filter((items) => {
      if (items.id !== dataName[0]["id"]) {
        return items
      }
      return null;
    })
    //  console.log(backDataList)
    this.setState({ dataList: backDataList })
    this.setState({
      dataName: [...this.state.dataName, ...dataName]
    })
  }

  //控制模态框的展示隐藏
  state = { visible: false };
  showSet() {
    this.setState({
      visible: true,
      model: "set"
    });
  };
  //进入排序框时可以修改内容
  editComponents() {
    this.setState({
      visible: true,
      model: "setAdd"
    })
  }
  //计算结果的展示页面
  computedResult() {
    this.setState({
      visible: true,
      model: "computedResult"
    })
  }

  //模态框点击确定的回调
  handleOk = (e) => {
    //////console.log(e)
    if (this.state.model === "setAdd") {
      this.refs.EditerComponent.validateFields((err, values) => {
        //////console.log(this.state.ArrayList)
        this.state.ArrayList.forEach((item) => {
          item.name = values.name;
          item.price = values.price;
          item.c = values.c
          item.frz = values.frz
          item.h2O = values.h2O
          item.hf = values.hf
          item.hff = values.hff
          item.kmx = values.kmx
          item.s = values.s
        })
        this.setState({
          visible: false,

        })
      })

    }
    if (this.state.model === "set") {
      this.refs.addcomponent.validateFields((err, values) => {
        this.setState({
          visible: false,
          setList: values,
        })
      })
    }

    if (this.state.model === "computedResult") {
      this.setState({
        visible: false,
      })
    }
  };

  //排序结构提交
  submitInfo() {
    this.setState({
      setClick: true,
    })
    axios.post("/api/evaluation-m/", {
      ore:
        this.state.dataList.map((item) => {
          return (
            {
              incomingDate: item.incomingDate,
              name: item.name,
              hf: item.hf,
              hff: item.hff,
              s: item.s,
              h2O: item.h2O,
              c: item.c,
              frz: item.frz,
              kmx: item.kmx,
              price: item.price,
            }
          )
        }),
      para: {
        priceCoke: this.state.setList.priceCoke,
        hf: this.state.setList.hf,
        c: this.state.setList.c,
        ad: this.state.setList.ad,
        std: this.state.setList.std,
        q: this.state.setList.q,
      },
      name: "测算表1"

    }, {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {
      ////console.log(res)
      if (res.data.detail) {
        this.setState({
          setClick: false,
        })
        message.warning(res.data.detail);
      } else {
        this.setState({
          infoMations: res.data.result,
          infoOre: res.data.ore,
          setClick: false,
        }, () => {
          this.state.infoMations.forEach((item) => {
            item.c = Number(item.c).toFixed(2);
            item.evaluation = Number(item.evaluation).toFixed(2);
            item.frz = Number(item.frz).toFixed(2);
            item.h2O = Number(item.h2O).toFixed(2);
            item.hf = Number(item.hf).toFixed(2);
            item.hff = Number(item.hff).toFixed(2);
            item.i = Number(item.i).toFixed(2);
            item.id = Number(item.id).toFixed(2);
            item.j = Number(item.j).toFixed(2);
            item.k = Number(item.k).toFixed(2);
            item.kmx = Number(item.kmx).toFixed(2);
            item.l = Number(item.l).toFixed(2);
            item.m = Number(item.m).toFixed(2);
            item.n = Number(item.n).toFixed(2);
            item.o = Number(item.o).toFixed(2);
            item.p = Number(item.p).toFixed(2);
            item.price = Number(item.price).toFixed(2);
            item.s = Number(item.s).toFixed(2);
            item.useOre = Number(item.useOre).toFixed(2);
            item.w = Number(item.w).toFixed(2);
            item.yxjzl = Number(item.yxjzl).toFixed(2);
          })
        })
        message.success('排序已经完成！');
      }

    })
      .catch(err => {
        //////console.log(err)
        // notification["error"]({
        //   message: '网络发生了一些错误(' + err.request.status + ')！',
        //   description: err.request.statusText + "：" + err.request.responseURL,
        // });
        this.setState({
          setClick: false,
        })
        if (err.request.status === 401) {
          message.warning("您没有该权限！")
        } else if (err.request.status === 500) {
          message.warning("服务器繁忙！")
        } else if (err.request.status === 400) {
          message.warning("请查看参数是否正确")
        }
      })
  }
  //模态框点击取消的回调
  handleCancel = e => {
    //////console.log(e);
    this.setState({
      visible: false,
    });
  };
  //生成报告
  ExportToExcel() {
    const data = this.state.infoMations // 准备的数据
    var option = {}
    let dataTable = []
    // //console.log(data);
    for (let i = 0; i < data.length; i++) {
      let obj = {
        '名称': data[i].name,  // '列名': 数据
        '进货日期': data[i].incomingDate,
        '有效价值率%': Number(data[i].yxjzl).toFixed(2),
        '置换比': Number(data[i].i).toFixed(2),
        'V固定碳': Number(data[i].j).toFixed(2),
        'V挥发分': Number(data[i].k).toFixed(2),
        'V灰分': Number(data[i].l).toFixed(2),
        'V硫分': Number(data[i].m).toFixed(2),
        'V水分': Number(data[i].n).toFixed(2),
        'V热值': Number(data[i].o).toFixed(2),
        'V可磨性': Number(data[i].p).toFixed(2),
        'V吨煤理论价值': Number(data[i].w).toFixed(2),
        '挥发分': Number(data[i].hff).toFixed(2),
        '硫分': Number(data[i].s).toFixed(2),
        '水分': Number(data[i].h2O).toFixed(2),
        '固定碳': Number(data[i].c).toFixed(2),
        '发热值': Number(data[i].frz).toFixed(2),
        '可磨性': Number(data[i].kmx).toFixed(2),
        '到厂含税价格（元/t)': Number(data[i].price).toFixed(2),
        '供应商': Number(data[i].evaluation).toFixed(2),
      }
      dataTable.push(obj);
    }
    option.fileName = '煤粉报告'  //导出的Excel文件名
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: '性价比排序结果',
        sheetFilter: ['名称', '进货日期', '有效价值率%', "置换比", "V固定碳", "V挥发分", "V灰分", 'V硫分', 'V水分', 'V热值', 'V可磨性', 'V吨煤理论价值', '挥发分', '硫分', '水分', '固定碳', '发热值', '可磨性', '到厂含税价格（元/t)', '供应商'],
        sheetHeader: ['名称', '进货日期', '有效价值率%', "置换比", "V固定碳", "V挥发分", "V灰分", 'V硫分', 'V水分', 'V热值', 'V可磨性', 'V吨煤理论价值', '挥发分', '硫分', '水分', '固定碳', '发热值', '可磨性', '到厂含税价格（元/t)', '供应商'],
      }
    ]

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }
  render() {
    //试试去重的方法
    function unique(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].id === arr[j].id) {         //第一个等同于第二个，splice方法删除第二个
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    }
    var arr = this.state.dataList
    unique(arr)
    return (
      <div>
        <span className="right">
          <button className="gongneng" type="primary" onClick={this.showSet.bind(this)}><img src={require("../../img/set.png")} alt="" />参数设置</button>
          <button onClick={this.ExportToExcel.bind(this)} className="gongneng"><img src={require("../../img/btn-export.png")} alt="" />生成报表</button>
        </span>
        <div className="xingjiabi">
          <div className="qiutuan">
            <div className="sort-results-title">
              <div className="sort-results-title-one">
                <Select
                  className="sort-results-title-one-select"
                  showSearch
                  placeholder="选择查找的日期"
                  optionFilterProp="children"
                  onChange={this.handlersearchinputChange}

                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    this.state.dataTime.map((item, index) => {
                      return (
                        <Option key={index} value={item}>
                          {item}
                        </Option>
                      )
                    })
                  }

                </Select>
                <img src={require("../../img/01.png")} alt="" />
              </div>
              <div className="sort-results-title-two">
                <span>进入排序矿粉</span>
                <div onClick={this.editComponents.bind(this)} className="sort-results-title-img">
                  <img src={require("../../img/screen.jpg")} alt="" />
                </div>
              </div>
              <div className="sort-results-title-three">
                <span>性价比排序结果</span>
                <div onClick={this.computedResult.bind(this)} className="sort-results-title-img">
                  <img src={require("../../img/num.png")} alt="" />
                </div>
              </div>
            </div>
            <div className="dongxi">
              <ul id="myUl">
                {
                  this.state.dataName.map((item, idx) => {
                    return (
                      <li
                        className="OnepaiList ones"
                        key={item.id}
                        onClick={this.huoQuShuZu.bind(this, idx)}
                      // style={{
                      //   background: this.state.context === item.name + ":" + item.incomingDate ? "#608dff" : "#fff", 
                      //   color: this.state.context === item.name + ":" + item.incomingDate ? "#fff" : "#000" 
                      //  }}
                      >
                        {item.name}:{item.incomingDate.slice(0, 8)}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="anniu">
              <div>
                <Button onClick={this.removeList.bind(this)}>
                  <img src={require("../../img/arrow04.png")} alt="" />
                </Button>
                <Button onClick={this.oneList.bind(this)}>
                  <img src={require("../../img/arrow03.png")} alt="" />
                </Button>
                <Button onClick={this.oneBackList.bind(this)}>
                  <img src={require("../../img/arrow02.png")} alt="" />
                </Button>
                <Button onClick={this.backList.bind(this)} >
                  <img src={require("../../img/arrow01.png")} alt="" />
                </Button>
              </div>

            </div>
            <div className="paixu">
              <ul id="listPai">
                {
                  this.state.dataList.map((item) => {
                    return (
                      <li
                        className="OnepaiList"
                        key={item.id}
                        onClick={this.listNameData.bind(this)}
                        style={{
                          background: this.state.contHTML === item.name + ":" + item.incomingDate ? "#608dff" : "#fff",
                          color: this.state.contHTML === item.name + ":" + item.incomingDate ? "#fff" : "#000"
                        }}
                      >
                        {item.name}:{item.incomingDate}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="title_paixu">
              <Button onClick={this.submitInfo.bind(this)} disabled={this.state.setClick}>排序</Button>
            </div>
            <div className="jieguo">
              <ol>
                {
                  this.state.infoMations.map((item, index) => {
                    return (
                      <dl
                        key={index}
                        style={{
                          cursor: "pointer",
                          background: this.state.HTMLtext === (index + 1) + ":" + item.name + ":" + (Number(item.yxjzl * 100) / 100).toFixed(2) + "%" ? "#608dff" : "#fff",
                          color: this.state.HTMLtext === (index + 1) + ":" + item.name + ":" + (Number(item.yxjzl * 100) / 100).toFixed(2) + "%" ? "#fff" : "#000"
                        }}
                        className="OnepaiList"
                        onClick={this.dlInfoMations.bind(this)}
                      >
                        {index + 1}:
                        {item.name}:
                        {(Number(item.yxjzl * 100) / 100).toFixed(2)}%
                      </dl>
                    )
                  })
                }
              </ol>
            </div>
            <div style={{ height: 20 }}></div>
          </div>
          <table className="tablexinxi">
            <tbody>
              <tr className="nametd">
                <td>名称</td>
                <td>灰分</td>
                <td>挥发分</td>
                <td>硫分</td>
                <td>水分</td>
                <td>固定碳</td>
                <td>发热值</td>
                <td>可磨性</td>
                <td>到厂税价格</td>
              </tr>
              {
                this.state.ArrayList.map((item, index) => {
                  return (
                    <tr key={index} className="shujutd">
                      <td>{item.name}</td>
                      <td>{Number(item.hf).toFixed(2)}</td>
                      <td>{Number(item.hff).toFixed(2)}</td>
                      <td>{Number(item.s).toFixed(2)}</td>
                      <td>{Number(item.h2O).toFixed(2)}</td>
                      <td>{Number(item.c).toFixed(2)}</td>
                      <td>{Number(item.frz).toFixed(2)}</td>
                      <td>{Number(item.kmx).toFixed(2)}</td>
                      <td>{Number(item.price).toFixed(2)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <Modal
          title={this.state.model === "set" ? "参数设置" : (this.state.model === "computedResult" ? "排序计算结果" : (this.state.model === "setAdd" ? "修改参数设置" :
            (this.state.model === "Bentonite" ? "膨润土设置" : (this.state.model === "infoMationZong" ? "综合熔剂设置" : "脱硫成本设置"))))}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
          key="1"
          destroyOnClose={true}
        >
          {      //参数设置   修改设置   膨润土  综合熔剂
            this.state.model === "set" ? <WrappedAddComponentFrom ref="addcomponent" setList={this.state.setList} /> :
              (this.state.model === "setAdd" ? <WrappedEditerComponent ref="EditerComponent" set={this.state.ArrayList} /> :
                <InfoMation info={this.state.infoMations} />)
          }
        </Modal>
      </div>
    )
  }
}
export default withRouter(connect(state => state)(Braize));