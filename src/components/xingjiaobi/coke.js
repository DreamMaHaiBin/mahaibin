import React, { Component, Fragment } from "react";
import "./compare.scss"
import ExportJsonExcel from 'js-export-excel';
import { Modal, Input, Button, Form, Select, message, } from "antd";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import InfoMation from "./InfoMation/index.js"
const { Option } = Select;
//修改进入排序阶段的数据 
class EditerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {


    }
  }
  //修改参数设置的提交按钮
  handleOnChange = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
     //////console.log(values)
    });
  };
  //数据格式化
  classdatainit(arr) {
    var newarr = [];
    arr.forEach((obj) => {
      var newobj = {};
      newobj.key = obj.key;
      newobj.value = obj.key;
      newobj.title = obj.classname;
      if (obj.children) {
        newobj.children = this.classdatainit(obj.children);
      }
      newarr.push(newobj);
    })
    return newarr;
  }
  render() {
   //////console.log(this.state.dataListClick)
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        {
          this.props.set.map((item, index) => {
            return (
              <Form onChange={this.handleOnChange} key={index} className="login-form" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} id="a">
                <div className="click_show_one">
                  <Form.Item label="名称">
                    {getFieldDecorator('name', {
                      initialValue: item.name
                    })(
                      <Input type="text" disabled={true}/>,
                    )}
                  </Form.Item>
                  <Form.Item label="日期">
                    {getFieldDecorator('incomingDate', {
                      initialValue: item.incomingDate
                    })(
                      <Input type="text" disabled={true}/>,
                    )}
                  </Form.Item>
                  <Form.Item label="Mt">
                    {getFieldDecorator('h2O', {
                      initialValue: item.h2O
                    })(
                      <Input type="h2O" />,
                    )}
                  </Form.Item>
                  <Form.Item label="Ad">
                    {getFieldDecorator('hf', {
                      initialValue: item.hf
                    })(
                      <Input type="hf" />,
                    )}
                  </Form.Item>
                  <Form.Item label="Std">
                    {getFieldDecorator('s', {
                      initialValue: item.s
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
                  <Form.Item label="M40">
                    {getFieldDecorator('m4O', {
                      initialValue: item.m4O
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="M10">
                    {getFieldDecorator('m1O', {
                      initialValue: item.m1O
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="CRI">
                    {getFieldDecorator('cRI', {
                      initialValue: item.cRI
                    })(
                      <Input type="text" placeholder="钙" />,
                    )}
                  </Form.Item>
                  <Form.Item label="CSR">
                    {getFieldDecorator('cSR', {
                      initialValue: item.cSR
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="价格">
                    {getFieldDecorator('price', {
                      initialValue: item.price
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="平均粒度">
                    {getFieldDecorator('avgSize', {
                      initialValue: item.avgSize
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                </div>
              </Form>
            )
          })
        }
      </Fragment>
    )
  }
}
const WrappedEditerComponent = Form.create({ name: 'addcomponent' })(EditerComponent);
//性价比测算排序
export default class Coke extends Component {
  constructor(props) {
    super(props);
   //////console.log(props)
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
      setClick:false,
      context: "",//当前选中的第一个排序的页面
      contHTML: "",//当前选中的第二个排序的页面
      HTMLtext: "",//当前选中的第三个排序的页面
      ckecked:[],
    }
    this.handlersearchinputChange = this.handlersearchinputChange.bind(this);

  }
  //生命周期的钩子函数，组件即将挂在的时候调用
  UNSAFE_componentWillMount () {
    axios.get("/api/ore-j/incoming-date/",{
      headers:{
        Authorization:sessionStorage.getItem("token")
      }
    }).then((res) => {
     //////console.log(res.data)
      this.setState({
        dataTime: res.data
      })
    })
  }
  //生命周期的钩子函数，组件挂在的时候调用
  componentDidMount() {
    this.handlersearchinputChange();
  
  }
  componentUpdate() {
    this.showDeleteConfirm();
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
        axios.get(`/api/ore-j/?incomingDate=${searchVal}`,{
          headers:{
            Authorization:sessionStorage.getItem("token")
          }
        })
          .then(response => {
            this.setState({
              dataName: response.data.results
            })
          })
          .catch(err => {
            if(err.request.status===401){
              message.warning("您没有该权限！")
            } else if(err.request.status===500){
              message.warning("服务器繁忙！")
            }else if(err.request.status===400){
              message.warning("请查看参数是否正确")
            }
          })
      }
    }
  }
  //渲染数组之后进行操作  获取数据
  huoQuShuZu(idx) {
    let ArrayList = [];
    let paixu=document.getElementsByClassName("ones")
        for (let j = 0; j < paixu.length; j++) {
            if(idx===j){
              paixu[idx].className="ones listpai"
              this.state.dataName.forEach((item, index) => {
                if (item.name + ":" + item.incomingDate === paixu[idx].innerHTML) {
                  ArrayList.push(item);
                  this.state.ckecked.push(item)
                  var arr =this.state.ckecked
                  function unique(arr){            
                    for(var i=0; i<arr.length; i++){
                        for(var j=i+1; j<arr.length; j++){
                            if(arr[i]===arr[j]){         //第一个等同于第二个，splice方法删除第二个
                                arr.splice(j,1);
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
  dlInfoMations(e) {
    this.setState({
      HTMLtext: e.target.innerHTML
    })
    const ArrayList = [];
    this.state.infoMations.forEach((item, index) => {
      if ((index + 1) + ":" + item.name + ":" + (Number(item.x * 100) / 100).toFixed(2) + "%" === e.target.innerHTML) {
        ArrayList.push(item);
        this.setState({
          ArrayList: ArrayList
        })
      }
    })
  }

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
      dataList: [...this.state.dataList, ...dataList]
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
      dataName: [...this.state.dataName, ...dataName],
      dataList:[],
    })
    // this.state.dataList.length = 0;
  }
  //只把点中的数据传过去
  oneList() {
    console.log(document.getElementsByClassName("ones"))
    let ones=document.getElementsByClassName("ones")
    for(let i=0;i<ones.length;i++){
      ones[i].className="OnepaiList ones"
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
            this.state.dataName.splice(index,1)
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
      // this.state.ArrayList.length = 0;
      this.setState({
        ArrayList:[],
      })
    } else {
      return;
    }
    const backDataList = this.state.dataList.filter((items) => {
      if (items.id !== dataName[0]["id"]) {
       //////console.log(dataName[0]["id"])
        return items
      }
      return null;
    })
    this.setState({ dataList: backDataList })
    this.setState({
      dataName: [...this.state.dataName, ...dataName]
    })

  }
  //控制模态框的展示隐藏
  state = { visible: false };

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
      this.refs.EditerComponent.validateFields((err, values) =>{
       //////console.log(this.state.ArrayList)
        this.state.ArrayList.forEach((item)=>{
          item.name=values.name;
          item.price=values.price;
          item.avgSize=values.avgSize
          item.cSR=values.cSR
          item.cRI=values.cRI
          item.h2O=values.h2O
          item.hf=values.hf
          item.incomingDate=values.incomingDate
          item.m1O=values.m1O
          item.m4O=values.m4O
          item.s=values.s
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
    if (this.state.model === "Bentonite") {
      this.refs.Bentonite.validateFields((err, values) => {
        this.setState({
          visible: false,
          prtList: values
        })
      })
    }
    if (this.state.model === "infoMationZong") {
      this.refs.computedInfo.validateFields((err, values) => {
        this.setState({
          visible: false,
          zhrjList: values,
        })
        sessionStorage.getItem(this.state.zhrjList)
      })
    }
    if (this.state.model === "sulfurRemoval") {
      this.refs.sulfurRemoval.validateFields((err, values) => {
        this.setState({
          visible: false,
          tlList: values
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
      setClick:true
    })
    axios.post("/api/evaluation-j/", {
      ore:
        this.state.dataList.map((item) => {
          return (
            {
              incomingDate:item.incomingDate,
              d: item.id,
              name: item.name,
              h2O: item.h2O,
              hf: item.hf,
              s: item.s,
              m4O: item.m4O,
              m1O: item.m1O,
              cRI: item.cRI,
              cSR: item.cSR,
              price: item.price,
              avgSize:item.avgSize,
            }
          )
        }),
      name: "焦炭测算"

    },{
      headers:{
        Authorization:sessionStorage.getItem("token")
      }
    }).then((res) => {
     //////console.log(res.data.result)
     if(res.data.detail){
      this.setState({
        setClick:false,
      })
      message.warning(res.data.detail);
    }else{
      this.setState({
        infoMations: res.data.result,
        setClick:false,
      },()=>{
        this.state.infoMations.forEach((item)=>{
          item.a=Number(item.a).toFixed(2);
          item.avgSize=Number(item.avgSize).toFixed(2);
          item.b=Number(item.b).toFixed(2);
          item.cRI=Number(item.cRI).toFixed(2);
          item.cSR=Number(item.cSR).toFixed(2);
          item.h2O=Number(item.h2O).toFixed(2);
          item.hf=Number(item.hf).toFixed(2);
          item.id=Number(item.id).toFixed(2);
          item.m1O=Number(item.m1O).toFixed(2);
          item.m4O=Number(item.m4O).toFixed(2);
          item.price=Number(item.price).toFixed(2);
          item.s=Number(item.s).toFixed(2);
          item.x=Number(item.x).toFixed(2);
          item.z=Number(item.z).toFixed(2);
          
        })
      })
      message.success('排序已经完成！');
    }
   
    })
      .catch(err => {
        console.log(err)
        if(err.request.status===401){
          message.warning("您没有该权限！")
        } else if(err.request.status===500){
          message.warning("服务器繁忙！")
        }else if(err.request.status===400){
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
  //综合熔剂价格设置
  zongHeSet() {
    this.setState({
      visible: true,
      model: "infoMationZong"
    });
  }
  //膨润土设置
  Bentonite() {
    this.setState({
      visible: true,
      model: "Bentonite"
    });
  }
  //脱硫成本设置
  sulfurRemoval() {
    this.setState({
      visible: true,
      model: "sulfurRemoval"
    });
  }
  //生成报告
  ExportToExcel() {
    const data = this.state.infoMations // 准备的数据
    var option = {}
    let dataTable = []
    //console.log(data);
      for (let i=0;i<data.length;i++) {
          let obj = {
            '名称': data[i].name,  // '列名': 数据
            '日期': data[i].incomingDate,
            '价格': Number(data[i].price).toFixed(2),
            'Mt': Number(data[i].h2O).toFixed(2),
            'Ad': Number(data[i].hf).toFixed(2),
            'Std':Number(data[i].s).toFixed(2),
            'M40': Number(data[i].m4O).toFixed(2),
            'M10': Number(data[i].m1O).toFixed(2),
            'CRI': Number(data[i].cRI).toFixed(2),
            'CSR':Number(data[i].cSR).toFixed(2),
            '平均粒度': Number(data[i].avgSize).toFixed(2),
            '强度贡献': Number(data[i].a).toFixed(2),//待定
            '成分贡献值': Number(data[i].b).toFixed(2),
            '综合性能值': Number(data[i].z).toFixed(2),
            '性价比': Number(data[i].x).toFixed(2),
            '性价比ID': Number(data[i].evaluation).toFixed(2),

          }
          dataTable.push(obj);
        
      }
    
    option.fileName = '焦炭报告'  //导出的Excel文件名
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: '性价比排序结果',
        sheetFilter: ['名称', '日期', '价格',"性价比", '强度贡献','成分贡献值','综合性能值',"Mt", "Ad", "Std", "M40", 'M10', 'CRI', 'CSR', '平均粒度', '性价比ID',],
        sheetHeader: ['名称', '日期', '价格',"性价比", '强度贡献','成分贡献值','综合性能值',"Mt", "Ad", "Std", "M40", 'M10', 'CRI', 'CSR', '平均粒度', '性价比ID',],
      }
    ]
    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }
  render() {
       //试试去重的方法
   function unique(arr){            
    for(var i=0; i<arr.length; i++){
        for(var j=i+1; j<arr.length; j++){
            if(arr[i].id===arr[j].id){         //第一个等同于第二个，splice方法删除第二个
                arr.splice(j,1);
                j--;
            }
        }
    }
return arr;
}
var arr =this.state.dataList
unique(arr)
    return (
      <div>
        <span className="right">
          <button
            onClick={this.ExportToExcel.bind(this)}
            className="gongneng">
            <img src={require("../../img/btn-export.png")} alt="" />
            生成报表
          </button>
        </span>
        <div className="xingjiabi">

          <div className="qiutuan">
            <span className="title">
              <span className="title_liao">
                <Select
                  showSearch
                  style={{ width: 270, height: 37, borderColor: "#a9c0df", marginRight: 5 ,color: "#0078d7"}}
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
              </span>
              <span className="kuangfeng">
                进入排序焦炭
                   <Button onClick={this.editComponents.bind(this)}>
                  <img src={require("../../img/screen.jpg")} alt="" />
                </Button>
              </span>
              <span className="kuangfeng">
                性价比排序结果
                   <Button onClick={this.computedResult.bind(this)}>
                  <img src={require("../../img/num.png")} alt="" />
                </Button>
              </span>
            </span>
            <div className="dongxi">
              <ul id="myUl">
                {
                  this.state.dataName.map((item,idx) => {
                    return (
                      <li
                        className="OnepaiList ones"
                        key={item.id}
                        onClick={this.huoQuShuZu.bind(this,idx)}
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
              <h1>&nbsp;</h1>
              <Button onClick={this.removeList.bind(this)}>
            <img src={require("../../img/arrow04.png")} alt=""/>
            </Button>
            <Button onClick={this.oneList.bind(this)}>
            <img src={require("../../img/arrow03.png")} alt=""/>
            </Button>
            <Button onClick={this.oneBackList.bind(this)}>
              <img src={require("../../img/arrow02.png")} alt=""/>
            </Button>
            <Button onClick={this.backList.bind(this)} >
            <img src={require("../../img/arrow01.png")} alt=""/>
            </Button>
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
              <h2>&nbsp;</h2>
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
                        background: this.state.HTMLtext ===(index + 1) + ":" + item.name + ":" + (Number(item.x * 100) / 100).toFixed(2) + "%"? "#608dff" : "#fff", 
                        color: this.state.HTMLtext === (index + 1) + ":" + item.name + ":" + (Number(item.x * 100) / 100).toFixed(2) + "%" ? "#fff" : "#000" 
                     }}
                      className="OnepaiList"
                      onClick={this.dlInfoMations.bind(this)}
                    >
                      {index + 1}:
                      {item.name}:
                      {(Number(item.x * 100) / 100).toFixed(2)}%
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

                <td>Mt</td>
                <td>Ad</td>
                <td>Std</td>
                <td>M40</td>
                <td>M10</td>
                <td>CRI</td>
                <td>CSR</td>
                <td>价格</td>
                <td>平均粒度</td>

              </tr>
              {
                this.state.ArrayList.map((item, index) => {

                  return (
                    <tr key={index} className="shujutd">
                      <td>{item.name}</td>
                      <td>{Number(item.h2O).toFixed(2)}</td>
                      <td>{Number(item.hf).toFixed(2)}</td>
                      <td>{Number(item.s).toFixed(2)}</td>
                      <td>{Number(item.m4O).toFixed(2)}</td>
                      <td>{Number(item.m1O).toFixed(2)}</td>
                      <td>{Number(item.cRI).toFixed(2)}</td>
                      <td>{Number(item.cSR).toFixed(2)}</td>
                      <td>{Number(item.price).toFixed(2)}</td>
                      <td>{Number(item.avgSize).toFixed(2)}</td>
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
             this.state.model === "setAdd" ? <WrappedEditerComponent ref="EditerComponent" set={this.state.ArrayList} /> :
            <InfoMation info={this.state.infoMations} />
          }
        </Modal>
      </div>
    )
  }
}
