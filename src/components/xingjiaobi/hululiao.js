import React, { Component, Fragment } from "react";
import "./compare.scss"
import ExportJsonExcel from 'js-export-excel';
import { Modal, Input, Button, Form, Select, message } from "antd";
import ComputedInfo from "./compareModel/computedInfo"
import 'bootstrap/dist/css/bootstrap.css';
import InfoMation from "./InfoMation/index.js"
import axios from "axios";
import WrappedAddComponentFrom from "./compareModel/addcomponentfrom"
import WrappedSulfurRemoval from "./compareModel/tl"
import WrappedBentonite from "./compareModel/prt"
const { Option } = Select;
//修改进入排序阶段的数据 
class EditerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataListClick: props.ArrayListNameData,//选中哪一行的信息

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
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        {
          this.props.set.map((item, index) => {
            return (
              <Form onChange={this.handleOnChange} key={index} className="login-form" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} id="a">
                <div className="click_show_one">
                  <Form.Item label="矿粉名称">
                    {getFieldDecorator('name', {
                      initialValue: item.name
                    })(
                      <Input type="text" disabled={true}/>,
                    )}
                  </Form.Item>
                  <Form.Item label="时间">
                    {getFieldDecorator('incomingDate', {
                      initialValue: item.incomingDate
                    })(
                      <Input type="text" disabled={true}/>,
                    )}
                  </Form.Item>
                  <Form.Item label="价格">
                    {getFieldDecorator('price', {
                      initialValue: item.price
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="筛下率">
                    {getFieldDecorator('loI', {
                      initialValue: item.source.loI
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
                  <Form.Item label="TFe">
                    {getFieldDecorator('tFe', {
                      initialValue: item.source.tFe
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
                  <Form.Item label="SiO2">
                    {getFieldDecorator('siO2', {
                      initialValue: item.source.siO2
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
                  <Form.Item label="AL2O3">
                    {getFieldDecorator('al2O3', {
                      initialValue: item.source.al2O3
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="MgO">
                    {getFieldDecorator('mgO', {
                      initialValue: item.source.mgO
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="CaO">
                    {getFieldDecorator('caO', {
                      initialValue: item.source.caO
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
                  <Form.Item label="烧损">
                    {getFieldDecorator('loI', {
                      initialValue: item.source.loI
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="FeO">
                    {getFieldDecorator('feO', {
                      initialValue: item.source.feO
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="S">
                    {getFieldDecorator('s', {
                      initialValue: item.source.s
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="P">
                    {getFieldDecorator('p', {
                      initialValue: item.source.p
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="k2O">
                    {getFieldDecorator('k2O', {
                      initialValue: item.source.k2O
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="Na2O">
                    {getFieldDecorator('na2O', {
                      initialValue: item.source.na2O
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="ZnO">
                    {getFieldDecorator('znO', {
                      initialValue: item.source.znO
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="TiO2">
                    {getFieldDecorator('tiO2', {
                      initialValue: item.source.tiO2
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                  <Form.Item label="pbO">
                    {getFieldDecorator('pbO', {
                      initialValue: item.source.pbO
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
export default class Cde extends Component {
  constructor(props) {
    super(props);
    //////console.log(props)
    this.state = {
      dataTime: [],//时间数据
      dataName: [],//展示第一框的名字
      searchVal: [],//选择哪一个子项的信息
      ArrayListNameData: [],
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
      setClick: false,
      context: "",//当前选中的第一个排序的页面
      contHTML: "",//当前选中的第二个排序的页面
      HTMLtext: "",//当前选中的第三个排序的页面
      ckecked:[]
    }
    this.handlersearchinputChange = this.handlersearchinputChange.bind(this);

  }
  //生命周期的钩子函数，组件即将挂在的时候调用
  UNSAFE_componentWillMount() {
    axios.get("/api/ore/incoming-date/?purpose=4", {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {
      //////console.log(res.data)
      this.setState({
        dataTime: res.data
      })
    })
    axios.get("/api/xjbcs/", {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {
      // //console.log(res)
      this.setState({
        prtList: res.data.prt,
        tlList: res.data.tl,
        zhrjList: res.data.rj,
        setList: res.data.cs,
      })
    })
  }
  //生命周期的钩子函数，组件挂在的时候调用
  componentDidMount() {
    this.handlersearchinputChange();
    this.UNSAFE_componentWillMount();
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
        axios.get(`/api/ore/?ordering=-createTime&incomingDate=${searchVal}&purpose=4`, {
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
            if (err.request.status === 401) {
              message.warning("您没有该权限！")
            } else if (err.request.status === 500) {
              message.warning("服务器繁忙！")
            } else if (err.request.status === 400) {
              message.warning("请查看参数是否正确")
            }
            // notification["error"]({
            //   message: '网络发生了一些错误(' + err.request.status + ')！',
            //   description: err.request.statusText + "：" + err.request.responseURL,
            // });
          })
      }
    }
  }
  //渲染数组之后进行操作  获取数据
  XuanXiangList(idx) {
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
                    ArrayListNameData: ArrayList,
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
          ArrayListNameData: ArrayList
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
      if ((index + 1) + ":" + item.ore.name + ":" + (Math.floor(item.calcute.totalCost * 100) / 100) + "元" === e.target.innerHTML) {
        ArrayList.push(item.ore);
        this.setState({
          ArrayListNameData: ArrayList
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
    this.setState({
      dataList: []
    })
  }
  //只把点中的数据传过去
  oneList() {
     // console.log(document.getElementsByClassName("ones"))
     let ones=document.getElementsByClassName("ones")
     for(let i=0;i<ones.length;i++){
       ones[i].className="OnepaiList ones"
     }
     if (this.state.ArrayListNameData.length > 0) {
       var dataList = this.state.ArrayListNameData.slice(0);
       this.setState({ ArrayListNameData: [] })
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
    if (this.state.ArrayListNameData.length > 0) {
      var dataName = this.state.ArrayListNameData.slice(0);
      this.setState({
        ArrayListNameData: []
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
        //////console.log(this.state.ArrayListNameData)
        this.state.ArrayListNameData.forEach((item) => {
          item.name = values.name;
          item.price = values.price;
          item.source.al2O3 = values.al2O3
          item.source.caO = values.caO
          item.source.cuO = values.cuO
          item.source.feO = values.feO
          item.incomingDate = values.incomingDate
          item.source.k2O = values.k2O
          item.source.loI = values.loI
          item.source.mgO = values.mgO
          item.source.na2O = values.na2O
          item.source.p = values.p
          item.source.pbO = values.pbO
          item.source.s = values.s
          item.source.siO2 = values.siO2
          item.source.tFe = values.tFe
          item.source.tiO2 = values.tiO2
          item.source.znO = values.znO
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
          prtList: values,

        })

      })
    }
    if (this.state.model === "infoMationZong") {
      this.setState({
        visible: false,

      })
    }

    if (this.state.model === "sulfurRemoval") {
      this.refs.sulfurRemoval.validateFields((err, values) => {
        //////console.log(values) 
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
  aaaa = (v) => {
    //////console.log(v)
    this.setState({
      zhrjList: v
    })
  }
  //排序结构提交
  submitInfo() {
    this.setState({
      setClick: true,
    })
    axios.post("/api/evaluation/", {
      name: "测算表",
      para: {
        prt: {
          ratioPRT: this.state.prtList.ratioPRT,
          pricePRT: this.state.prtList.pricePRT,
          siPRT: this.state.prtList.siPRT,
          caPRT: this.state.prtList.caPRT,
          alPRT: this.state.prtList.alPRT,
          mgPRT: this.state.prtList.mgPRT,
          naPRT: this.state.prtList.naPRT,
          sPRT: this.state.prtList.sPRT,
          pPRT: this.state.prtList.pPRT,
          kPRT: this.state.prtList.kPRT,
          znPRT: this.state.prtList.znPRT,
          loiPRT: this.state.prtList.loiPRT,
        },
        tl: {
          limeSPrice: this.state.tlList.limeSPrice,
          h2OPrice: this.state.tlList.h2OPrice,
          h2OUnit: this.state.tlList.h2OUnit,
          electricityPrice: this.state.tlList.electricityPrice,
          electricityUnit: this.state.tlList.electricityUnit,
          airPrice: this.state.tlList.airPrice,
          airUnit: this.state.tlList.airUnit,
          steamPrice: this.state.tlList.steamPrice,
          steamUnit: this.state.tlList.steamUnit,
          workerPUnit: this.state.tlList.workerPUnit,
          attendantPUnit: this.state.tlList.attendantPUnit,
          devicePUnit: this.state.tlList.devicePUnit,
          materialPUnit: this.state.tlList.materialPUnit,
          ashUnit: this.state.tlList.ashUnit,
          ashPrice: this.state.tlList.ashPrice,
          labourPUnit: this.state.tlList.labourPUnit,
          outS: this.state.tlList.outS,
          mainSmokeFlux: this.state.tlList.mainSmokeFlux,
          sSProduce: this.state.tlList.sSProduce,
          sSInter: this.state.tlList.sSInter,
          ratioCaS: this.state.tlList.ratioCaS,
          csOs: this.state.tlList.csOs,
          operationRate: this.state.tlList.operationRate,
        },

        rj:
          this.state.zhrjList.map((items, index) => {
            return (
              {
                line: index + 1,
                name: items.name,
                radioMonth: items.radioMonth === "" ? 0 : items.radioMonth,
                priceMonth: items.priceMonth === "" ? 0 : items.priceMonth,
                siO2: items.siO2 === "" ? 0 : items.siO2,
                caO: items.caO === "" ? 0 : items.caO,
              }
            )
          }),

        r: this.state.setList.r,
        f1: this.state.setList.f1,
        f2: this.state.setList.f2,
        f3: this.state.setList.f3,
        f4: this.state.setList.f4,
        f5: this.state.setList.f5,
        maRatio: this.state.setList.maRatio,
        priceDolo: this.state.setList.priceDolo,
        f6_1: this.state.setList.f6_1,
        f6_2: this.state.setList.f6_2,
        priceF: this.state.setList.priceF,
        hLoi: this.state.setList.hLoi,
        mgDolo: this.state.setList.mgDolo,
        screenRatio_1: this.state.setList.screenRatio_1,
        screenRatio_2: this.state.setList.screenRatio_2,
        hf: this.state.setList.hf,
        isMg: this.state.setList.isMg,
        priceCoke: this.state.setList.priceCoke,
        priceCoal: this.state.setList.priceCoal,
        cokeRate0: this.state.setList.cokeRate0,
        coalRate0: this.state.setList.coalRate0,
        kNaO: this.state.setList.kNaO,
        znO: this.state.setList.znO,
        s0: this.state.setList.s0,
        yjProce: this.state.setList.yjProce,
        felron: this.state.setList.felron,
        silron: this.state.setList.silron,
        tFe0: this.state.setList.tFe0,
      },
      ore:
        this.state.dataList.map((item, index) => {
          return (
            {

              name: item.name,
              purpose: 4,
              isInterCalcute: item.isInterCalcute,
              incomingDate: item.incomingDate,
              price: item.price,
              priceOre: item.priceOre,
              sRatio: item.sRatio,
              burdenType: item.burdenType,
              remark: item.remark,
              source: {
                tFe: item.source.tFe,
                siO2: item.source.siO2,
                al2O3: item.source.al2O3,
                mgO: item.source.mgO,
                caO: item.source.caO,
                loI: item.source.loI,
                feO: item.source.feO,
                asO: null,
                dspw: null,
                s: item.source.s,
                p: item.source.p,
                k2O: item.source.k2O,
                na2O: item.source.na2O,
                znO: item.source.znO,
                mnO: null,
                tiO2: item.source.tiO2,
                pbO: item.source.pbO,
                cuO: item.source.cuO,
                v2O5: null,
                h2O: null,
                cl: null,
                hf: null,
              }
            }
          )
        })

    }, {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {
      if (res.data.detail) {
        this.setState({
          setClick: false,
        })
        message.warning(res.data.detail);
      } else {
        message.success('排序已经完成！');
        //////console.log(res.data.result)
        res.data.result.forEach((item) => {

          item.ore.source.al2O3 = Number(item.ore.source.al2O3).toFixed(2);
          item.ore.price = Number(item.ore.price).toFixed(2);
          item.ore.source.asO = Number(item.ore.source.asO).toFixed(2);
          item.ore.source.caO = Number(item.ore.source.caO).toFixed(2);
          item.ore.source.cl = Number(item.ore.source.cl).toFixed(2);
          item.ore.source.cuO = Number(item.ore.source.cuO).toFixed(2);
          item.ore.source.dspw = Number(item.ore.source.dspw).toFixed(2);
          item.ore.source.feO = Number(item.ore.source.feO).toFixed(2);
          item.ore.source.h2O = Number(item.ore.source.h2O).toFixed(4);
          item.ore.source.hf = Number(item.ore.source.hf).toFixed(4);
          item.ore.source.id = Number(item.ore.source.id).toFixed(4);
          item.ore.source.k2O = Number(item.ore.source.k2O).toFixed(4);
          item.ore.source.loI = Number(item.ore.source.loI).toFixed(4);
          item.ore.source.mgO = Number(item.ore.source.mgO).toFixed(4);
          item.ore.source.mnO = Number(item.ore.source.mnO).toFixed(4);
          item.ore.source.na2O = Number(item.ore.source.na2O).toFixed(4);
          item.ore.source.p = Number(item.ore.source.p).toFixed(4);
          item.ore.source.pbO = Number(item.ore.source.pbO).toFixed(4);
          item.ore.source.s = Number(item.ore.source.s).toFixed(4);
          item.ore.source.siO2 = Number(item.ore.source.siO2).toFixed(2);
          item.ore.source.tFe = Number(item.ore.source.tFe).toFixed(2);
          item.ore.source.tiO2 = Number(item.ore.source.tiO2).toFixed(4);
          item.ore.source.v2O5 = Number(item.ore.source.v2O5).toFixed(2);
          item.ore.source.znO = Number(item.ore.source.znO).toFixed(4);
          item.calcute.totalCost = Number(item.calcute.totalCost).toFixed(4);
          item.calcute.feCost = Number(item.calcute.feCost).toFixed(4);
          item.calcute.kNaCost = Number(item.calcute.kNaCost).toFixed(4);
          item.calcute.sCost = Number(item.calcute.sCost).toFixed(4);
          item.calcute.ddPrice = Number(item.calcute.ddPrice).toFixed(4);
          item.calcute.limeCost = Number(item.calcute.limeCost).toFixed(4);
          item.calcute.prtCost = Number(item.calcute.prtCost).toFixed(4);
          item.calcute.processCost = Number(item.calcute.processCost).toFixed(4);
          item.calcute.processCost = Number(item.calcute.processCost).toFixed(4);
          item.calcute.cokeCost = Number(item.calcute.cokeCost).toFixed(4);
          item.calcute.screenCost = Number(item.calcute.screenCost).toFixed(4);
          item.calcute.oreCost = Number(item.calcute.oreCost).toFixed(4);
          item.calcute.znCost = Number(item.calcute.znCost).toFixed(4);
          item.calcute.doloCost = Number(item.calcute.doloCost).toFixed(4);
          item.calcute.loiCost = Number(item.calcute.loiCost).toFixed(4);
        })
        this.setState({
          infoMations: res.data.result,
          setClick: false,
        })
      }
    })
      .catch(err => {
        this.setState({

          setClick: false,
        })
        //////console.log(err)
        if (err.request.status === 401) {
          message.warning("您没有该权限！")
        } else if (err.request.status === 500) {
          message.warning("服务器繁忙！")
        } else if (err.request.status === 400) {
          message.warning("请查看参数是否正确")
        }
        // notification["error"]({
        //   message: '网络发生了一些错误(' + err.request.status + ')！',
        //   description: err.request.statusText + "：" + err.request.responseURL,
        // });

      })
  }
  saveSet() {
    axios.post("/api/xjbsave/", {
      para: {
        prt: {
          ratioPRT: this.state.prtList.ratioPRT,
          pricePRT: this.state.prtList.pricePRT,
          siPRT: this.state.prtList.siPRT,
          caPRT: this.state.prtList.caPRT,
          alPRT: this.state.prtList.alPRT,
          mgPRT: this.state.prtList.mgPRT,
          naPRT: this.state.prtList.naPRT,
          sPRT: this.state.prtList.sPRT,
          pPRT: this.state.prtList.pPRT,
          kPRT: this.state.prtList.kPRT,
          znPRT: this.state.prtList.znPRT,
          loiPRT: this.state.prtList.loiPRT,
        },
        tl: {
          limeSPrice: this.state.tlList.limeSPrice,
          h2OPrice: this.state.tlList.h2OPrice,
          h2OUnit: this.state.tlList.h2OUnit,
          electricityPrice: this.state.tlList.electricityPrice,
          electricityUnit: this.state.tlList.electricityUnit,
          airPrice: this.state.tlList.airPrice,
          airUnit: this.state.tlList.airUnit,
          steamPrice: this.state.tlList.steamPrice,
          steamUnit: this.state.tlList.steamUnit,
          workerPUnit: this.state.tlList.workerPUnit,
          attendantPUnit: this.state.tlList.attendantPUnit,
          devicePUnit: this.state.tlList.devicePUnit,
          materialPUnit: this.state.tlList.materialPUnit,
          ashUnit: this.state.tlList.ashUnit,
          ashPrice: this.state.tlList.ashPrice,
          labourPUnit: this.state.tlList.labourPUnit,
          outS: this.state.tlList.outS,
          mainSmokeFlux: this.state.tlList.mainSmokeFlux,
          sSProduce: this.state.tlList.sSProduce,
          sSInter: this.state.tlList.sSInter,
          ratioCaS: this.state.tlList.ratioCaS,
          csOs: this.state.tlList.csOs,
          operationRate: this.state.tlList.operationRate,
        },
        rj:
          this.state.zhrjList.map((items, index) => {
            return (
              {
                line: items.line,
                name: items.name,
                radioMonth: items.radioMonth === "" ? 0 : items.radioMonth,
                priceMonth: items.priceMonth === "" ? 0 : items.priceMonth,
                siO2: items.siO2 === "" ? 0 : items.siO2,
                caO: items.caO === "" ? 0 : items.caO,
              }
            )
          }),
        r: this.state.setList.r,
        f1: this.state.setList.f1,
        f2: this.state.setList.f2,
        f3: this.state.setList.f3,
        f4: this.state.setList.f4,
        f5: this.state.setList.f5,
        maRatio: this.state.setList.maRatio,
        priceDolo: this.state.setList.priceDolo,
        f6_1: this.state.setList.f6_1,
        f6_2: this.state.setList.f6_2,
        priceF: this.state.setList.priceF,
        hLoi: this.state.setList.hLoi,
        mgDolo: this.state.setList.mgDolo,
        screenRatio_1: this.state.setList.screenRatio_1,
        screenRatio_2: this.state.setList.screenRatio_2,
        hf: this.state.setList.hf,
        isMg: this.state.setList.isMg,
        priceCoke: this.state.setList.priceCoke,
        priceCoal: this.state.setList.priceCoal,
        cokeRate0: this.state.setList.cokeRate0,
        coalRate0: this.state.setList.coalRate0,
        kNaO: this.state.setList.kNaO,
        znO: this.state.setList.znO,
        s0: this.state.setList.s0,
        yjProce: this.state.setList.yjProce,
        felron: this.state.setList.felron,
        silron: this.state.setList.silron,
        tFe0: this.state.setList.tFe0,
      }
    }, {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {

      if (res.data.error) {
        message.warning(res.data.error + '!')
      } else {
        message.success('保存成功！');
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
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data) {
          let obj = {
            '名称': data[i].ore.name,  // '列名': 数据
            '日期': data[i].ore.incomingDate,
            '到厂价': Number(data[i].ore.price).toFixed(2),
            'TFe': Number(data[i].ore.source.tFe).toFixed(2),
            'SiO2': Number(data[i].ore.source.siO2).toFixed(2),
            'Al2O3': Number(data[i].ore.source.al2O3).toFixed(2),
            'MgO': Number(data[i].ore.source.mgO).toFixed(2),
            'CaO': Number(data[i].ore.source.caO).toFixed(2),
            '烧损': Number(data[i].ore.source.loI).toFixed(2),
            'FeO': Number(data[i].ore.source.feO).toFixed(2),
            'AsO': Number(data[i].ore.source.asO).toFixed(4),
            'S': Number(data[i].ore.source.s).toFixed(4),
            'P': Number(data[i].ore.source.p).toFixed(4),
            'K2O': Number(data[i].ore.source.k2O).toFixed(4),
            'Na2O': Number(data[i].ore.source.na2O).toFixed(4),
            'ZnO': Number(data[i].ore.source.znO).toFixed(4),
            'MnO': Number(data[i].ore.source.mnO).toFixed(4),
            'TiO2': Number(data[i].ore.source.tiO2).toFixed(4),
            'PbO': Number(data[i].ore.source.pbO).toFixed(4),
            'CuO': Number(data[i].ore.source.cuO).toFixed(4),
            'V2O5': Number(data[i].ore.source.v2O5).toFixed(4),
            'Cl': Number(data[i].ore.source.cl).toFixed(4),
            '综合品位价': Number(data[i].calcute.totalCost).toFixed(4),
            '品位加扣': Number(data[i].calcute.feCost).toFixed(4),
            '碱金属加扣': Number(data[i].calcute.kNaCost).toFixed(4),
            '锌加扣': Number(data[i].calcute.znCost).toFixed(4),
            'Al2O3加扣': Number(data[i].calcute.doloCost).toFixed(4),
            '硫含量加扣': Number(data[i].calcute.sCost).toFixed(4),
            '烧损加扣': Number(data[i].calcute.loiCost).toFixed(4),
            '吨度价': Number(data[i].calcute.ddPrice).toFixed(4),
            '熔剂成本': Number(data[i].calcute.limeCost).toFixed(4),
            '膨润土成本': Number(data[i].calcute.prtCost).toFixed(4),
            '加工成本': Number(data[i].calcute.processCost).toFixed(4),
            '高炉燃料成本': Number(data[i].calcute.cokeCost).toFixed(4),
            '筛分成本': Number(data[i].calcute.screenCost).toFixed(4),
            '矿石成本': Number(data[i].calcute.oreCost).toFixed(4),
          }
          dataTable.push(obj);
        }
      }
    }

    option.fileName = '护炉料导出表'  //导出的Excel文件名
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: '性价比排序结果',
        sheetFilter: ['名称', '日期', '到厂价', '综合品位价', '品位加扣', '碱金属加扣', '锌加扣', 'Al2O3加扣', '硫含量加扣', '烧损加扣', '吨度价', '熔剂成本', '膨润土成本', '加工成本', '高炉燃料成本', '筛分成本', '矿石成本',"TFe", "SiO2", "Al2O3", "MgO", 'CaO', '烧损', 'FeO', 'AsO', 'S', 'P', 'K2O', 'Na2O', 'ZnO', 'MnO', 'TiO2', 'PbO', 'CuO', 'V2O5', 'Cl', ],
        sheetHeader: ['名称', '日期', '到厂价', '综合品位价', '品位加扣', '碱金属加扣', '锌加扣', 'Al2O3加扣', '硫含量加扣', '烧损加扣', '吨度价', '熔剂成本', '膨润土成本', '加工成本', '高炉燃料成本', '筛分成本', '矿石成本',"TFe", "SiO2", "Al2O3", "MgO", 'CaO', '烧损', 'FeO', 'AsO', 'S', 'P', 'K2O', 'Na2O', 'ZnO', 'MnO', 'TiO2', 'PbO', 'CuO', 'V2O5', 'Cl', ],
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
          <button className="gongneng" onClick={this.zongHeSet.bind(this)}>综合熔剂价格设置</button>
          <button className="gongneng" onClick={this.Bentonite.bind(this)}>膨润土设置</button>
          <button className="gongneng" onClick={this.sulfurRemoval.bind(this)}>脱硫成本设置</button>
          <button className="gongneng" type="primary" onClick={this.showSet.bind(this)}>
            <img src={require("../../img/set.png")} alt="" />
                            参数设置

                        </button>
          <button className="gongneng" onClick={this.saveSet.bind(this)}>保存设置</button>
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
                  style={{ width: 270, height: 37, borderColor: "#a9c0df", marginRight: 5, color: "#0078d7" }}
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
                进入排序矿
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
                        onClick={this.XuanXiangList.bind(this,idx)}
                        // style={{
                        //   background: this.state.context === item.name + ":" + item.incomingDate ? "#608dff" : "#fff",
                        //   color: this.state.context === item.name + ":" + item.incomingDate ? "#fff" : "#000"
                        // }}
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
                      <dl key={index}
                        style={{
                          background: this.state.HTMLtext === (index + 1) + ":" + item.ore.name + ":" + (Math.floor(item.calcute.totalCost * 100) / 100) + "元" ? "#608dff" : "#fff",
                          color: this.state.HTMLtext === (index + 1) + ":" + item.ore.name + ":" + (Math.floor(item.calcute.totalCost * 100) / 100) + "元" ? "#fff" : "#000"
                        }}
                        onClick={this.dlInfoMations.bind(this)}
                        className="OnepaiList">
                        {index + 1}:{item.ore.name}:{Math.floor(item.calcute.totalCost * 100) / 100}元
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
              <tr className="xingjiaobi_tr">
                <td>名称</td>
                <td>TFe%</td>
                <td>SiO2%</td>
                <td>Al2O3%</td>
                <td>MgO%</td>
                <td>CaO%</td>
                <td>FeO%</td>
                <td>LOI%</td>
                <td>S%</td>
                <td>P%</td>
                <td>K2O%</td>
                <td>Na2O%</td>
                <td>ZnO%</td>
                <td>PbO%</td>
                <td>CuO%</td>
                <td>TiO2%</td>
                <td>筛下率</td>
                <td>价格</td>
              </tr>
              {
                this.state.ArrayListNameData.map((item, index) => {

                  return (
                    <tr key={index} className="shujutd">
                      <td>{item.name}</td>
                      <td>{Number(item.source.tFe).toFixed(2)}</td>
                      <td>{Number(item.source.siO2).toFixed(2)}</td>
                      <td>{Number(item.source.al2O3).toFixed(2)}</td>
                      <td>{Number(item.source.mgO).toFixed(2)}</td>
                      <td>{Number(item.source.caO).toFixed(2)}</td>
                      <td>{Number(item.source.feO).toFixed(2)}</td>
                      <td>{Number(item.source.loI).toFixed(2)}</td>
                      <td>{Number(item.source.s).toFixed(2)}</td>
                      <td>{Number(item.source.p).toFixed(2)}</td>
                      <td>{Number(item.source.k2O).toFixed(2)}</td>
                      <td>{Number(item.source.na2O).toFixed(2)}</td>
                      <td>{Number(item.source.znO).toFixed(2)}</td>
                      <td>{Number(item.source.pbO).toFixed(2)}</td>
                      <td>{Number(item.source.cuO).toFixed(2)}</td>
                      <td>{Number(item.source.tiO2).toFixed(2)}</td>
                      <td>{Number(item.sRatio).toFixed(2)}</td>
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
        //destroyOnClose={true}
        >
          {      //参数设置   修改设置   膨润土  综合熔剂
            this.state.model === "set" ? <WrappedAddComponentFrom ref="addcomponent" setList={this.state.setList} /> : (this.state.model === "setAdd" ? <WrappedEditerComponent ref="EditerComponent" set={this.state.ArrayListNameData} /> :
              (this.state.model === "Bentonite" ? <WrappedBentonite ref="Bentonite" prtList={this.state.prtList} /> : (this.state.model === "infoMationZong" ? <ComputedInfo ref="computedInfo" setList={this.state.setList} zhrjList={this.state.zhrjList} getData={this.aaaa.bind(this)} /> :
                (this.state.model === "sulfurRemoval" ? <WrappedSulfurRemoval ref="sulfurRemoval" tlList={this.state.tlList} /> : <InfoMation  info={this.state.infoMations} />))))
          }
        </Modal>
      </div>
    )
  }
}
