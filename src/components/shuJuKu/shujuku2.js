import React, { Component, Fragment } from "react";
import "./shujuku1.css"
import { Table, Modal, Input, message, Upload, Form, DatePicker } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios"
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
    const { getFieldDecorator } = this.props.form
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} id="a">

          <div className="click_show_one">
            <span className="addKuang">添加球团矿粉</span>
            <Form.Item label="矿粉名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '!' }],
              })(
                <Input type="text" placeholder="" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="日期">
              {getFieldDecorator('incomingDate', {
                rules: [{ required: true, message: '!' }],
              })(
                <MonthPicker placeholder="请选择月份" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="TFe">
              {getFieldDecorator('source.tFe', {
                rules: [{ required: true, message: '！' }],
              })(
                <Input type="text" placeholder="TFe" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="SiO2">
              {getFieldDecorator('source.siO2', {
                rules: [{ required: true, message: '!' }],
              })(
                <Input type="text" placeholder="SiO2" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="AL203">
              {getFieldDecorator('source.al2O3')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="MgO">
              {getFieldDecorator('source.mgO')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="CaO">
              {getFieldDecorator('source.caO', {
                rules: [{ required: true, message: '!' }],
              })(
                <Input type="text" placeholder="钙" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="烧损">
              {getFieldDecorator('source.loI')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="单烧品位">
              {getFieldDecorator('source.dspw')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="FeO">
              {getFieldDecorator('source.feO')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="S">
              {getFieldDecorator('source.s')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="P">
              {getFieldDecorator('source.p')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="到厂价">
              {getFieldDecorator('priceOre', {
                rules: [{ required: true, message: '!' }],
              })(
                <Input type="text" placeholder="到厂价" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="k2O">
              {getFieldDecorator('source.k2O')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="Na2O">
              {getFieldDecorator('source.na2O')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="ZnO">
              {getFieldDecorator('source.znO')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="MnO">
              {getFieldDecorator('source.mnO')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="TiO2">
              {getFieldDecorator('source.tiO2')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="pbO">
              {getFieldDecorator('source.pbO')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="CuO">
              {getFieldDecorator('source.cuO')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="Cl">
              {getFieldDecorator('source.cl')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>

            <Form.Item label="AsO">
              {getFieldDecorator('source.asO')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="水分">
              {getFieldDecorator('source.h2O')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="Hf">
              {getFieldDecorator('source.hf')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
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
      selectedRows: props.handleDeleteId
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    //////console.log(this.state.selectedRows)
    ////////console.log(this.props.selectedRows[0]);
    return (
      <Fragment>
        {
          this.state.selectedRows.map((item) => {
            return (
              <Form onSubmit={this.handleSubmit} key={item.id}>

                <div className="click_show_one">
                  <span className="addKuang">修改球团矿粉</span>
                  <Form.Item label="矿粉名称">
                    {getFieldDecorator('name', {
                      initialValue: item.name,
                      // rules: [{ required: true, message: '!' }],
                    })(
                      <Input type="text" placeholder="" style={{ width: 90 }} disabled={true} />,
                    )}
                  </Form.Item>
                  <Form.Item label="日期">
                    {getFieldDecorator('incomingDate', {
                      initialValue: item.incomingDate,
                      // rules: [{ required: true, message: '!' }],
                    })(
                      <Input type="text" placeholder="" style={{ width: 90 }} disabled={true} />,
                    )}
                  </Form.Item>
                  <Form.Item label="TFe">
                    {getFieldDecorator('source.tFe', {
                      initialValue: item.source.tFe,
                      // rules: [{ required: true, message: '！' }],
                    })(
                      <Input type="text" placeholder="TFe" style={{ width: 90 }} />,
                    )}
                  </Form.Item>
                  <Form.Item label="SiO2">
                    {getFieldDecorator('source.siO2', {
                      initialValue: item.source.siO2,
                      // rules: [{ required: true, message: '!' }],
                    })(
                      <Input type="text" placeholder="SiO2" style={{ width: 90 }} />,
                    )}
                  </Form.Item>
                  <Form.Item label="AL203">
                    {getFieldDecorator('source.al2O3', {
                      initialValue: item.source.al2O3,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="MgO">
                    {getFieldDecorator('source.mgO', {
                      initialValue: item.source.mgO,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="CaO">
                    {getFieldDecorator('source.caO', {
                      initialValue: item.source.caO,
                      // rules: [{ required: true, message: '!' }],
                    })(
                      <Input type="text" placeholder="钙" style={{ width: 90 }} />,
                    )}
                  </Form.Item>
                  <Form.Item label="烧损">
                    {getFieldDecorator('source.loI', {
                      initialValue: item.source.loI,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="单烧品位">
                    {getFieldDecorator('source.dspw', {
                      initialValue: item.source.dspw,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="FeO">
                    {getFieldDecorator('source.feO', {
                      initialValue: item.source.feO,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="S">
                    {getFieldDecorator('source.s', {
                      initialValue: item.source.s,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="P">
                    {getFieldDecorator('source.p', {
                      initialValue: item.source.p,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="到厂价">
                    {getFieldDecorator('priceOre', {
                      // rules: [{ required: true, message: '!' }],
                      initialValue: item.priceOre,
                    })(
                      <Input type="text" placeholder="到厂价" style={{ width: 90 }} />,
                    )}
                  </Form.Item>
                  <Form.Item label="k2O">
                    {getFieldDecorator('source.k2O', {
                      initialValue: item.source.k2O,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="Na2O">
                    {getFieldDecorator('source.na2O', {
                      initialValue: item.source.na2O,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="ZnO">
                    {getFieldDecorator('source.znO', {
                      initialValue: item.source.znO,
                    })(
                      <Input type="text" style={{ width: 90 }} />,
                    )}
                  </Form.Item>
                  <Form.Item label="MnO">
                    {getFieldDecorator('source.mnO', {
                      initialValue: item.source.mnO,
                    })(
                      <Input type="text" style={{ width: 90 }} />,
                    )}
                  </Form.Item>
                  <Form.Item label="TiO2">
                    {getFieldDecorator('source.tiO2', {
                      initialValue: item.source.tiO2,
                    })(
                      <Input type="text" style={{ width: 90 }} />,
                    )}
                  </Form.Item>
                  <Form.Item label="pbO">
                    {getFieldDecorator('source.pbO', {
                      initialValue: item.source.pbO,
                    })(
                      <Input type="text" style={{ width: 90 }} />,
                    )}
                  </Form.Item>
                  <Form.Item label="CuO">
                    {getFieldDecorator('source.cuO', {
                      initialValue: item.source.cuO,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="Cl">
                    {getFieldDecorator('source.cl', {
                      initialValue: item.source.cl,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>

                  <Form.Item label="AsO">
                    {getFieldDecorator('source.asO', {
                      initialValue: item.source.asO,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="水分">
                    {getFieldDecorator('source.h2O', {
                      initialValue: item.source.h2O,
                    })(
                      <Input type="text" style={{ width: 90 }} />
                    )}
                  </Form.Item>
                  <Form.Item label="Hf">
                    {getFieldDecorator('source.hf', {
                      initialValue: item.source.hf,
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
class ShuJuKu2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      handleDeleteId: [],//删除选中的id
      model: null,//
      total: null,
      flag: null,
      down: ""
    }
  }
  UNSAFE_componentWillMount() {
    axios.get(`/api/ore/?ordering=-createTime&incomingDate=&purpose=2`, {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {
      //////console.log(res)
      this.setState({
        data: res.data.results,
        total: res.data.count,
      })
    })
    axios.get("/api/download/?purpose=2").then((res) => {
      // //console.log(res);
      this.setState({
        down: res.data.url
      })

    })
  }
  componentDidMount() {
    if (sessionStorage.getItem("permission1") === "false") {

      this.setState({
        flag: true
      })
    } else if (sessionStorage.getItem("permission1") === "true") {
      this.setState({
        flag: false
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
          axios.post("/api/ore/?incomingDate=&purpose=2", {
            source: {
              tFe: values.source.tFe,
              siO2: values.source.siO2,
              al2O3: values.source.al2O3,
              mgO: values.source.mgO,
              caO: values.source.caO,
              loI: values.source.loI,
              feO: values.source.feO,
              asO: values.source.asO,
              dspw: values.source.dspw,
              s: values.source.s,
              p: values.source.p,
              k2O: values.source.k2O,//k2O还没有写
              na2O: values.source.na2O,//na2O
              znO: values.source.znO,
              mnO: values.source.mnO,
              tiO2: values.source.tiO2,
              pbO: values.source.pbO,
              cuO: values.source.cuO,//cuO
              v2O5: values.source.v2O5,
              h2O: values.source.h2O,
              cl: values.source.cl,//cl
              hf: values.source.hf,
            },
            size: {},
            features: {},
            comeFrom: {},
            name: values.name,
            purpose: 2,
            incomingDate: values.incomingDate,
            price: values.price,
            priceOre: values.priceOre,
            sRatio: values.sRatio,//sRatio
            burdenType: values.burdenType,//burdenType
            remark: values.remark,//remark       
          }, {
            headers: {
              Authorization: sessionStorage.getItem("token")
            }
          }).then(res => {
            //////console.log(res)
            this.UNSAFE_componentWillMount();
            message.success('添加成功！');
            //   const bForceGet=false;
            // setTimeout(() => {
            //   window.location.reload([bForceGet]);//强制刷新页面              ***********************改方法存在一些问题*************************
            //  }, 500);

            this.setState({
              visible: false,
              confirmLoading: false,
            });
          }).catch(err => {
            if (err.request.status === 401) {
              message.warning("您没有该权限！")
            } else if (err.request.status === 500) {
              message.warning("服务器繁忙！")
            } else if (err.request.status === 400) {
              message.warning("请查看参数是否正确")
            }
            //////console.log(err)
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
          axios.put(`/api/ore/${this.state.handleDeleteId[0].id}/?incomingDate=&purpose=2/`, {
            source: {
              tFe: values.source.tFe,
              siO2: values.source.siO2,
              al2O3: values.source.al2O3,
              mgO: values.source.mgO,
              caO: values.source.caO,
              loI: values.source.loI,
              feO: values.source.feO,
              asO: values.source.asO,
              dspw: values.source.dspw,
              s: values.source.s,
              p: values.source.p,
              k2O: values.source.k2O,//k2O还没有写
              na2O: values.source.na2O,//na2O
              cl: values.source.cl,
              znO: values.source.znO,
              mnO: values.source.mnO,
              tiO2: values.source.tiO2,
              pbO: values.source.pbO,
              cuO: values.source.cuO,//cuO
              v2O5: values.source.v2O5,
              h2O: values.source.h2O,
              hf: values.source.hf,
            },
            size: {},
            features: {},
            comeFrom: {},
            name: values.name,
            purpose: 2,
            incomingDate: values.incomingDate,
            price: values.price,
            priceOre: values.priceOre,
            sRatio: values.sRatio,//sRatio
            burdenType: values.burdenType,//burdenType
            remark: values.remark,//remark      
          }, {
            headers: {
              Authorization: sessionStorage.getItem("token")
            }
          })
            .then(res => {
              //////console.log(res)
              this.UNSAFE_componentWillMount();
              message.success('修改成功！')
              // const bForceGet = false;
              // setTimeout(() => {
              //   window.location.reload([bForceGet]);//强制刷新页面              ***********************改方法存在一些问题*************************
              //  }, 500);
              this.setState({
                visible: false,
                confirmLoading: false,
              });


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
        axios.post("/api/ore/destroy/", {
          ids: ids
        }, {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        }
        )
          .then(res => {
            //////console.log(res)

            message.success('删除成功！');
            this.setState({
              handleDeleteId: []
            })
            this.UNSAFE_componentWillMount();


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
  exportExls() {
    let ids=[]
    if(this.state.handleDeleteId.length>0){
      this.state.handleDeleteId.forEach((obj)=>{
        ids.push(obj.id)
      })
      axios({
        method:"post",
        url: "/api/ore/export1/",
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
        downloadElement.download = '球团粉基础数据.xls'; //下载后文件名
        downloadElement.SheetName="球团粉基础数据"
        document.body.appendChild(downloadElement);
        downloadElement.click("name"); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象 
      })
    }else{
      axios({
        method:"post",
        url: "/api/ore/export1/",
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
       downloadElement.download = '球团粉基础数据.xls'; //下载后文件名
       document.body.appendChild(downloadElement);
       downloadElement.click(); //点击下载
       document.body.removeChild(downloadElement); //下载完成移除元素
       window.URL.revokeObjectURL(href); //释放掉blob对象 
      })
    }

}
  render() {
    const { shujuku2Data } = this.props
    // console.log(shujuku2Data);

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
    //上传数据
    const uploadProps = {
      name: 'myfile',
      action: '/api/ore/export/',
      headers: {
        Authorization: sessionStorage.getItem("token")
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
          const bForceGet = false
          window.location.reload([bForceGet]);//强制刷新页面
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败！`);
        }
      },
    };
    return (
      <div className="kuang">
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
            download="球团基础数据表.xls"
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
          <Upload  {...uploadProps} disabled={this.state.flag}>
            <button

              className="gongneng"
              type="primary"
            >
              <img src={require("../../img/btn-export.png")} alt="" />
                导入数据
          </button>
          </Upload>

        </div>

        <div className="biaodan">
          <Table
            rowKey="id"
            rowSelection={rowSelection}
            columns={shujuku2Data.columns}
            dataSource={this.state.data}
            scroll={{ x: 400, }}
            pagination={
              {
                total: this.state.total,//数据的总条数
                defaultCurrent: 1,//默认当前的页数
                defaultPageSize: 25,//默认每页的条数
                onChange: (page, pageSize) => {
                  axios.get(`/api/ore/?incomingDate=&ordering=-createTime&page=${page}&purpose=2`, {
                    headers: {
                      Authorization: sessionStorage.getItem("token")
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
          >

          </Table>
        </div>
        <Modal
          title={this.state.model === "add" ? "添加球团数据库" : "修改球团数据库"}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          okText="确认"
          cancelText="取消"
          destroyOnClose={true}
        >
          {
            this.state.model === "add" ?
              <WrappedAddComponentFrom handleDeleteId={this.state.handleDeleteId} ref="addform" /> :
              <WrappedEditerComponent handleDeleteId={this.state.handleDeleteId} ref="editform" />
          }

        </Modal>
      </div>
    )
  }
}
export default withRouter(connect(state => state)(ShuJuKu2));