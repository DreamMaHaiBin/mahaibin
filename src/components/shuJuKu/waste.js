import React, { Component, Fragment } from "react";
import "./shujuku1.css"
import { Table, Modal, Input, message, Upload, Form, DatePicker ,} from "antd";
import axios from "axios"
import { connect } from "react-redux";
import { withRouter } from "react-router";
const { MonthPicker } = DatePicker;
//新增模态窗的组件，当点击添加是调用
class AddComponentFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  //新增提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
       //////console.log('Received values of form: ', values);
      }
    });
  };
  //组织数据格式化
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
    console.log(this.props.waste);
    
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} id="a">
          <div className="click_show_one">
            <span className="addKuang">添加固废数据</span>
            {
              this.props.waste.list.map((item,index)=>{
                return(
                  <Form.Item label={item.name} key={index}>
                  {getFieldDecorator(item.class, {
                    rules:  item.class==="name" ||  item.class==="incomingDate" || item.class==="price"  ||  item.class==="TFe"?[{ required: true, message: '必填项' }] :null
                  })(
                    item.class==="incomingDate"? <MonthPicker placeholder="请选择月份"  style={{width:90}}/> :<Input type="text" style={{ width: 90 }} />,
                  )}
                </Form.Item>
                )
              })
            }
          </div>
        </Form>
      </Fragment>
    )
  }
}

const WrappedAddComponentFrom = Form.create({ name: 'addcomponent' })(AddComponentFrom);
//修改组件时调用的模态窗口
class EditerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: this.props.handleDeleteId
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
   //////console.log(this.state.handleDeleteId)
    return (
      <Fragment>
        {
          this.state.selectedRows.map((item) => {
            return (
              <Form onSubmit={this.handleSubmit} key={item.id}>

                <div className="click_show_one">
                  <span className="addKuang">修改固废数据</span>
                  <Form.Item label="名称">
              {getFieldDecorator('name',{
                initialValue:item.name
              })(
                <Input type="text" style={{ width: 90 }} disabled={true}/>,
              )}
            </Form.Item>
            <Form.Item label="日期">
              {getFieldDecorator('incomingDate',{
                initialValue:item.incomingDate
              })(
                <Input type="text" style={{width:90}}disabled={true}/>
              )}
            </Form.Item>
            <Form.Item label="价格">
              {getFieldDecorator('price',{
                initialValue:item.price
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="TFe">
              {getFieldDecorator('TFe',{
                  initialValue:item.TFe
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="SiO2">
              {getFieldDecorator('SiO2',{
                 initialValue:item.SiO2
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="CaO">
              {getFieldDecorator('CaO',{
                  initialValue:item.CaO
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="MgO">
              {getFieldDecorator('MgO',{
                 initialValue:item.MgO
              })(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="Al2O3">
              {getFieldDecorator('Al2O3',{
                 initialValue:item.Al2O3
              })(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="MnO">
              {getFieldDecorator('MnO',{
                 initialValue:item.MnO
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="烧损">
              {getFieldDecorator('LOI',{
                 initialValue:item.LOI
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="FeO">
              {getFieldDecorator('FeO',{
                 initialValue:item.FeO
              })(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="K2O">
              {getFieldDecorator('K2O',{
                 initialValue:item.K2O
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="Na2O">
              {getFieldDecorator('Na2O',{
                initialValue:item.Na2O
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="ZnO">
              {getFieldDecorator('ZnO',{
                initialValue:item.ZnO
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="S">
              {getFieldDecorator('S',{
                initialValue:item.S
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="P">
              {getFieldDecorator('P',{
                  initialValue:item.P
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="TiO2">
              {getFieldDecorator('TiO2',{
                initialValue:item.TiO2
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="PbO">
              {getFieldDecorator('PbO',{
                 initialValue:item.PbO
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="AsO">
              {getFieldDecorator('AsO',{
                initialValue:item.AsO
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="水分">
              {getFieldDecorator('h2O',{
                initialValue:item.h2O
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="供应商">
              {getFieldDecorator('merchantName',{
                   initialValue:item.merchantName
              })(
                <Input type="text" style={{ width: 90 }} />
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
//主体得数据库2的部分
 class Waste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      handleDeleteId: [],//删除选中的id
      model: null,//
      total: null,
      flag:null,
      down:'',
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handlereditercpm = this.handlereditercpm.bind(this);
  }
  UNSAFE_componentWillMount () {
    axios.get(`/api/sjflore/`,{
      headers:{
        Authorization:sessionStorage.getItem("token")
      }
    }).then((res) => {
    //console.log(res)
    res.data.results.forEach((item,index)=>{
      item.price= Number(item.price).toFixed(2);
       item.TFe= Number(item.TFe).toFixed(2);
       item.SiO2= Number(item.SiO2).toFixed(2);
       item.CaO= Number(item.CaO).toFixed(2);
       item.MgO= Number(item.MgO).toFixed(2);
       item.Al2O3= Number(item.Al2O3).toFixed(2);
       item.MnO= Number(item.MnO).toFixed(2);
       item.LOI= Number(item.LOI).toFixed(2);
       item.FeO= Number(item.FeO).toFixed(2);
       item.K2O= Number(item.K2O).toFixed(4);
       item.Na2O= Number(item.Na2O).toFixed(4);
       item.ZnO= Number(item.ZnO).toFixed(4);
       item.S= Number(item.S).toFixed(4);
       item.P= Number(item.P).toFixed(4);
       item.TiO2= Number(item.TiO2).toFixed(4);
       item.PbO= Number(item.PbO).toFixed(4);
       item.AsO= Number(item.AsO).toFixed(4);
       item.h2O= Number(item.h2O).toFixed(2);
    })
      this.setState({
        data: res.data.results,
        total: res.data.count,
      })
    })
    axios.get("/api/download/?purpose=8").then((res)=>{
      ////console.log(res);
    this.setState({
      down:res.data.url
    })
    })
  }
  componentDidMount(){
    if(sessionStorage.getItem("permission1")==="false"){
     
      this.setState({
        flag:true
      })
    }else if(sessionStorage.getItem("permission1")==="true"){
      this.setState({
        flag:false
      })
    }
  }
  //控制对话窗 显示或者隐藏
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //模态框点击确定的回调
  handleOk() {
    if (this.state.model === "add") {//新增提交
      this.refs.addform.validateFields((err, values) => {
        if (err) {
          this.setState({
            confirmLoading: false,
          });
        } else {
          axios.post("/api/sjflore/", {
            name: values.name,
            incomingDate: values.incomingDate,
            price: values.price,
            TFe: values.TFe,
            SiO2: values.SiO2,
            CaO: values.CaO,
            MgO: values.MgO,
            Al2O3: values.Al2O3,
            MnO: values.MnO,
            LOI: values.LOI,
            FeO: values.FeO,
            K2O: values.K2O,
            Na2O: values.Na2O,
            ZnO: values.ZnO,
            S: values.S,
            P: values.P,
            TiO2: values.TiO2,
            PbO: values.PbO,
            AsO: values.AsO,
            h2O: values.h2O,
          },{
            headers:{
              Authorization:sessionStorage.getItem("token")
            }
          }).then(res => {
           //////console.log(res)
            message.success('添加成功！');
            this.UNSAFE_componentWillMount ();
            this.setState({
              visible: false,
              confirmLoading: false,
            });
          }).catch(err => {
           //////console.log(err)
           if(err.request.status===401){
            message.warning("您没有该权限！")
          } else if(err.request.status===500){
            message.warning("服务器繁忙！")
          }else if(err.request.status===400){
            message.warning("请查看参数是否正确")
          }
            // notification["error"]({
            //   message: '网络发生了一些错误(' + err.request.status + ')！',
            //   description: err.request.statusText + "：" + err.request.responseURL,
            // });
          })
        }
      });
    }
    else {//编辑提交
      this.refs.editform.validateFields((err, values) => {
        if (err) {
          this.setState({
            confirmLoading: false,
            model: null
          });
        }
        else {
          axios.put(`/api/sjflore/${this.state.handleDeleteId[0].id}/`, {
            name: values.name,
            incomingDate: values.incomingDate,
            price: values.price,
            TFe: values.TFe,
            SiO2: values.SiO2,
            CaO: values.CaO,
            MgO: values.MgO,
            Al2O3: values.Al2O3,
            MnO: values.MnO,
            LOI: values.LOI,
            FeO: values.FeO,
            K2O: values.K2O,
            Na2O: values.Na2O,
            ZnO: values.ZnO,
            S: values.S,
            P: values.P,
            TiO2: values.TiO2,
            PbO: values.PbO,
            AsO: values.AsO,
            h2O: values.h2O,
          },{
            headers:{
              Authorization:sessionStorage.getItem("token")
            }
          })
            .then(res => {
             //////console.log(res)
              message.success('修改成功！')
              this.setState({
                visible: false,
                confirmLoading: false,
              });
              this.UNSAFE_componentWillMount();

            })
            .catch(err => {
              if(err.request.status===401){
                message.warning("您没有该权限！")
              } else if(err.request.status===500){
                message.warning("服务器繁忙！")
              }else if(err.request.status===400){
                message.warning("请查看参数是否正确")
              }
              // notification["error"]({
              //   message: '网络发生了一些错误(' + err.request.status + ')！',
              //   description: err.request.statusText + "：" + err.request.responseURL,
              // });
            })

        }
        this.refs.editform.resetFields();
      })

    }
  };
  handleCancel = e => {
   //////console.log(e);
    this.setState({
      visible: false,
    });
  };
  //删除操作
  handlerxsDelete() {
   //////console.log(this.state.handleDeleteId)//选中那一行的信息
    return () => {
      if (this.state.handleDeleteId.length > 0) {
        let ids = [];
        this.state.handleDeleteId.forEach((item) => {
          ids.push(item.id)
         //////console.log(item.id)
        })
        axios.post("/api/sjfldelete/", {
          ids: ids
        },{
          headers:{
            Authorization:sessionStorage.getItem("token")
          }
        }
        )
          .then(res => {
           //////console.log(res)
            message.success('删除成功！');
            this.setState({
              handleDeleteId: []
            })
            this.UNSAFE_componentWillMount ();
          })
          .catch(err => {
            if(err.request.status===401){
              message.warning("您没有该权限！")
            } else if(err.request.status===500){
              message.warning("服务器繁忙！")
            }else if(err.request.status===400){
              message.warning("请查看参数是否正确")
            }
            // notification["error"]({
            //   message: '网络发生了一些错误(' + err.request.status + ')！',
            //   description: err.request.statusText + "：" + err.request.responseURL,
            // });
          })
      } else {
        message.warning("请选择一组数据!");
      }
    }

  }


  //添加操作
  handleAdd() {
    if (this.state.handleDeleteId.length === 1 || this.state.handleDeleteId.length === 0) {
      this.setState({
        visible: true,
        model: "add"
      });
    }
  }
  //点击修改
  handlereditercpm() {
   //////console.log(this.state.handleDeleteId)//选中那一行的信息
    switch (this.state.handleDeleteId.length) {
      case 1:
        this.setState({
          visible: true,//控制是否显示
          model: "editer",
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
 //导出数据
 exportExls() {
  let ids=[]
  if(this.state.handleDeleteId.length>0){
    this.state.handleDeleteId.forEach((obj)=>{
      ids.push(obj.id)
    })
    axios({
      method:"post",
      url: "/api/orenew/export1/",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      data:{purpose:"2",id:ids},
      responseType: 'blob'
    }).then((res) => {
      //这里res.data是返回的blob对象   
     // //console.log(res)
      var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
      var downloadElement = document.createElement('a');
      var href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = '固废基础数据.xls'; //下载后文件名
      downloadElement.SheetName="固废基础数据"
      document.body.appendChild(downloadElement);
      downloadElement.click("name"); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象 
    })
  }else{
    axios({
      method:"post",
      url: "/api/orenew/export1/",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      data:{purpose:"2",},
      responseType: 'blob'
    }).then((res) => {
      //这里res.data是返回的blob对象   
     // //console.log(res)
     var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
     var downloadElement = document.createElement('a');
     var href = window.URL.createObjectURL(blob); //创建下载的链接
     downloadElement.href = href;
     downloadElement.download = '固废基础数据.xls'; //下载后文件名
     document.body.appendChild(downloadElement);
     downloadElement.click(); //点击下载
     document.body.removeChild(downloadElement); //下载完成移除元素
     window.URL.revokeObjectURL(href); //释放掉blob对象 
    })
  }
}
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
       //////console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({
          handleDeleteId: selectedRows
        })
      },
      // 用户手动选择/取消选择某行的回调
      onSelect: (record, selected, handleDeleteId) => {
        ////////console.log(record, selected, selectedRows);
        this.setState({ handleDeleteId });
      },
      // 用户手动选择/取消选择所有行的回调
      onSelectAll: (selected, handleDeleteId, changeRows) => {
        ////////console.log(selected, selectedRows, changeRows);
        this.setState({ handleDeleteId });
      },
    };
    const uploadProps = {
      name: 'myfile',
      action: '/api/orenew/export/?purpose=2',
      headers:{
        Authorization:sessionStorage.getItem("token")
      },
      data: {
        purpose: 2
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
         //////console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功！`);
          const bForceGet=false
          window.location.reload([bForceGet]);//强制刷新页面
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败！`);
        }
      },
    };
    const {waste}=this.props
  // console.log(waste);
    return (
      <div className="kuang">
        <div>
          <span style={{ marginRight: 10 }}>

          </span>
          <div className="gongneng_big">
          <button
              disabled={this.state.flag}
              className="gongneng" type="primary" onClick={this.handleAdd.bind(this)}>
              <img src={require("../../img/btn_add.png")} alt="" />
              添加
          </button>
          <button
              disabled={this.state.flag}
              className="gongneng"
              onClick={this.handlerxsDelete(this.state.handleDeleteId)}
            >
              <img src={require("../../img/btn_delete.png")} alt="" />
              删除
          </button>
          <button
           disabled={this.state.flag}
            className="gongneng" onClick={this.handlereditercpm.bind(this)} >
            <img src={require("../../img/btn_sdit.png")} alt="" />
            修改
          </button>
          <a
              style={{ color: "#000" }}
              download="固废基础数据表.xls"
              href={this.state.down}
            >
              <button
                disabled={this.state.flag}
                className="gongneng"
                type="primary"
              >
                <img src={require("../../img/btn-template.png")} alt="" />
                导入模板
         </button>
            </a>
            <button
             disabled={this.state.flag}
            className="gongneng"
            onClick={this.exportExls.bind(this)}
          >
            <img src={require("../../img/btn-import.png")} alt="" />
            导出数据
          </button>
          <Upload  {...uploadProps}  disabled={this.state.flag}>
              <button
              
                className="gongneng"
                type="primary"
              >
                <img src={require("../../img/btn-export.png")} alt="" />
                导入数据
          </button>
        </Upload>
          
     </div>
        </div>
        <div className="biaodan">
          <Table
            rowKey="id"
            rowSelection={rowSelection}
            columns={waste.columns}
            dataSource={this.state.data}
            scroll={{ x: 400, }}
            pagination={
              {
                total: this.state.total,//数据的总条数
                defaultCurrent: 1,//默认当前的页数
                defaultPageSize: 25,//默认每页的条数
                onChange: (page, pageSize) => {
                  axios.get(`/api/sjflore/?page=${page}`,{
                    headers:{
                      Authorization:sessionStorage.getItem("token")
                    }
                  }).then((res) => {
                    this.setState({
                      data: res.data.results
                    })
                  })
                 //////console.log(page, pageSize)
                }
              }
            }
          />
        </div>
        <Modal
          title={this.state.model === "add" ? "添加固废库" : "修改固废数据库"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
          destroyOnClose={true}
        >
          {
            this.state.model === "add" ?
              <WrappedAddComponentFrom handleDeleteId={this.state.handleDeleteId} ref="addform" waste={waste}/> :
              <WrappedEditerComponent handleDeleteId={this.state.handleDeleteId} ref="editform" waste={waste}/>
          }
        </Modal>
      </div>
    )
  }
}
export default withRouter(connect(state => state)(Waste));