import React, { Component } from "react";
import "./shujuku1.css";
import axios from "axios";
import { Table, Modal,  message, Upload } from "antd";
import WrappedEditerComponent from "./shujuku1/two.js"
import WrappedAddComponentFrom from "./shujuku1/one.js"
import { connect } from "react-redux";
import { withRouter } from "react-router";
 class ShuJuKu1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      handleDeleteId: [],//删除选中的id
      selectedRows: [],//选中的组织list
      confirmLoading: false,
      model: null,//判断是添加还是修改
      page: 1,
      fileList: [],
      total: null,
      selectedRowKeys: [],
      flag:null,
      down:""
    }
  }
  //生命周期的函数，再组件即将挂在是渠道相关的数据
  UNSAFE_componentWillMount() {
    axios.get(`/api/ore/?incomingDate=&ordering=-createTime&page=1&purpose=1`, {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {
     // //console.log(res.data)
      this.setState({
        data: res.data.results,
        total: res.data.count
      })

    })
    axios.get("/api/download/?purpose=1").then((res)=>{
     // //console.log(res);
    this.setState({
      down:res.data.url
    })
      
    })
  }
  //控制对话窗
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
          axios.post("/api/ore/", {
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
              // cl: values.source.cl,//cl
              hf: values.source.hf,
            },
            size: {
              gt7mm: 0,
              gt5Lte7mm: 0,//gt5Lte7mm
              gt3Lte5mm: 0,//gt3Lte5mm
              gt1Lte3mm: 0,//gt1Lte3mm
              lte1mm: 0,
              lte35mu: 0,
              gt35Lte60mu: 0,
              gt60Lte100mu: 0,
              gt100Lte140mu: 0,
              gt140Lte200mu: 0,
              gte200mu:0,
              avgSize: 0,//avgSize
            },
            features: {
              thTemperature: 0,
              t125OR4: 0,
              t125OR5:0,
              t125OR6: 0,
              t128OR4: 0,
              t131OR4:0,
            },
            comeFrom: {
              boatName: values.comeFrom.boatName,
              route_name: values.comeFrom.route_name,
              merchantName: values.comeFrom.merchantName,
              indexType: values.comeFrom.indexType,
              discount: values.comeFrom.discount,
              offer: values.comeFrom.offer,
              pwyjPrice: values.comeFrom.pwyjPrice,
              pzjiajPrice: values.comeFrom.pzjiajPrice,
              pzjianjPrice: values.comeFrom.pzjianjPrice,
              csPrice: values.comeFrom.csPrice,
            },
            name: values.name,
            purpose: 1,
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
            //console.log(res)
            message.success('添加成功！');
            this.UNSAFE_componentWillMount();
            // const bForceGet=false
            // setTimeout(() => {
            //   window.location.reload([bForceGet]);//强制刷新页面              ***********************改方法存在一些问题*************************
            //  }, 500);
            this.setState({
              visible: false,
              confirmLoading: false,
            });
          }).catch(err => {
            if(err.request.status===401){
              message.warning("您没有该权限！")
            } else if(err.request.status===500){
              message.warning("服务器繁忙！")
            }else if(err.request.status===400){
              message.warning("请查看参数是否正确")
            }
            ////console.log(err)
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
          axios.put("/api/ore/" + this.state.handleDeleteId[0].id + "/", {
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
              // cl: values.source.cl,//cl
              hf: values.source.hf,
            },
            size: {
              gt7mm: 0,
              gt5Lte7mm: 0,//gt5Lte7mm
              gt3Lte5mm: 0,//gt3Lte5mm
              gt1Lte3mm: 0,//gt1Lte3mm
              lte1mm: 0,
              lte35mu: 0,
              gt35Lte60mu: 0,
              gt60Lte100mu: 0,
              gt100Lte140mu: 0,
              gt140Lte200mu: 0,
              gte200mu:0,
              avgSize: 0,//avgSize
            },
            features: {
              thTemperature: 0,
              t125OR4: 0,
              t125OR5:0,
              t125OR6: 0,
              t128OR4: 0,
              t131OR4:0,
            },
            comeFrom: {
              boatName: values.comeFrom.boatName,
              route_name: values.comeFrom.route_name,
              merchantName: values.comeFrom.merchantName,
              indexType: values.comeFrom.indexType,
              discount: values.comeFrom.discount,
              offer: values.comeFrom.offer,
              pwyjPrice: values.comeFrom.pwyjPrice,
              pzjiajPrice: values.comeFrom.pzjiajPrice,
              pzjianjPrice: values.comeFrom.pzjianjPrice,
              csPrice: values.comeFrom.csPrice,
            },
            name: values.name,
            purpose: 1,
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
              ////console.log(res)
              message.success('修改成功！')
              this.UNSAFE_componentWillMount();
              this.setState({
                visible: false,
                confirmLoading: false,
              });
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
        this.refs.editform.resetFields();
      })

    }
  };

  //生命周期的钩子函数，再组件已经加载完成的时候调用
  componentDidMount() {
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

  //删除操作
  handlerxsDelete() {
    ////console.log(this.state.handleDeleteId)//选中那一行的信息
    return () => {
      if (this.state.handleDeleteId.length > 0) {
        let ids = [];
        this.state.handleDeleteId.forEach((item) => {
          ids.push(item.id)
          ////console.log(item.id)
        })
        axios.post("/api/ore/destroy/", {
          ids: ids
        }, {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        })
          .then(res => {
            //console.log(res)

                message.success('删除成功!')
                this.setState({
                  handleDeleteId: []
                })
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
    ////console.log(this.state.handleDeleteId)//选中那一行的信息
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
  //模态框点击取消的回调
  handleCancel = e => {
    ////console.log(e);
    this.setState({
      visible: false,
    });
  };
  //导出数据
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
          data:{purpose:"1",id:ids},
          responseType: 'blob'
        }).then((res) => {
          //这里res.data是返回的blob对象   
         // //console.log(res)
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = '烧结用矿粉基础料.xls'; //下载后文件名
          downloadElement.SheetName="烧结用矿粉基础料"
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
          data:{purpose:"1",},
          responseType: 'blob'
        }).then((res) => {
          //这里res.data是返回的blob对象   
         // //console.log(res)
          var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = '烧结用矿粉基础料.xls'; //下载后文件名
          downloadElement.SheetName="烧结用矿粉基础料"
          document.body.appendChild(downloadElement);
          downloadElement.click("name"); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象 
        })
      }
  
  }
  clearCheck = () => { // 处理勾选数据后清空勾选
    this.setState({
      selectedRows: []
    })
  }
  render() {
    //复选框控制按钮
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        ////console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({
          handleDeleteId: selectedRows
        })
      },
      // 用户手动选择/取消选择某行的回调
      onSelect: (record, selected, handleDeleteId) => {
        ////console.log(record, selected, selectedRows);
        this.setState({ handleDeleteId });
      },
      // 用户手动选择/取消选择所有行的回调
      onSelectAll: (selected, handleDeleteId, changeRows) => {
        ////console.log(selected, selectedRows, changeRows);
        this.setState({ handleDeleteId });
      },
    };
    const uploadProps = {
      name: 'myfile',
      action: '/api/ore/export/',
      headers: {
        Authorization: sessionStorage.getItem("token")
      },
      data: {
        purpose: 1
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          ////console.log(info.file, info.fileList);
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
    const {dataList}=this.props
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
              download="烧结基础数据表.xls"
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
          <div className="se" style={{ display: "block" }}>
            <Table
              rowSelection={rowSelection}
              columns={dataList.columns}
              dataSource={this.state.data}
              showSizeChanger={true}//是否可也改变pagesize
              scroll={{ x: 400, }}
              pagination={
                {
                  total: this.state.total,//数据的总条数
                  defaultCurrent: 1,//默认当前的页数
                  defaultPageSize: 25,//默认每页的条数
                  onChange: (page, pageSize) => {
                    axios.get(`/api/ore/?incomingDate=&ordering=-createTime&page=${page}&purpose=1`, {
                      headers: {
                        Authorization: sessionStorage.getItem("token")
                      }
                    }).then((res) => {
                      this.setState({
                        data: res.data.results
                      })
                    })
                    ////console.log(page, pageSize)
                  }
                }
              }
              rowKey="id"
            >
            </Table>
          </div>
          </div>
          {/* 模态窗，对话窗 */}
          <Modal
            title={this.state.model === "add" ? "烧结基础矿粉添加" : "烧结基础矿粉"}
            visible={this.state.visible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            confirmLoading={this.state.confirmLoading}
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
export default  withRouter(connect(state => state)(ShuJuKu1));