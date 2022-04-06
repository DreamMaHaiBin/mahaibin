//脱硫成本设置
import React, { Component, Fragment } from "react";
import { Input,  Form, Button,  } from "antd";
import 'bootstrap/dist/css/bootstrap.css';
class sulfurRemoval extends Component {
    constructor(props) {
      super(props);
      this.state = {
        DanChne: "",
        HdDanCheng: "",
        YsKqDanCheng: "",
        ZQDanCheng: "",
        tlDanCheng: "",
        tlList: "",
      }
    }
    //新增提交
    handleTl (e) {
     // e.preventDefault();
      this.props.form.validateFields((err, values) => {
        values.qq = Number(values.h2OPrice * values.h2OUnit).toFixed(4);
        values.a = Number(values.electricityUnit * values.electricityPrice).toFixed(4)
        values.cc = Number(values.airPrice * values.airUnit).toFixed(4)
        values.bb = Number(values.steamUnit * values.steamPrice).toFixed(4)
        values.ee = Number(values.ashPrice * values.ashUnit).toFixed(4)
        //////console.log(values.qq)
        this.setState({
          DanChne: values.qq,
          HdDanCheng: values.a,
          YsKqDanCheng: values.cc,
          ZQDanCheng: values.bb,
          tlDanCheng: values.ee,
        })
      });
    };
    computed(){
      this.handleTl();
    }
    render() {
      //////console.log(this.state.DanChne)
      const { getFieldDecorator } = this.props.form;
      return (
        <Fragment>
  
          <Form onChange={this.handleTl.bind(this)} >
            <div className="models">
              <div>
                <table className="tuoliu">
                  <tbody>
                    <tr>
                      <td>序号</td>
                      <td>项目名称</td>
                      <td>单位</td>
                      <td>单价</td>
                      <td>单耗</td>
                      <td>吨烧结矿单成</td>
                    </tr>
                    <tr>
                      <td>一</td>
                      <td>烧结脱硫材料</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>自产活性白灰</td>
                      <td>吨</td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('limeSPrice', {
                            initialValue: Number(this.props.tlList.limeSPrice).toFixed(2)==="NaN" ? null : Number(this.props.tlList.limeSPrice).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>工业水</td>
                      <td>吨</td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('h2OPrice', {
                            initialValue: Number(this.props.tlList.h2OPrice).toFixed(2)==="NaN" ? null : Number(this.props.tlList.h2OPrice).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('h2OUnit', {
                            initialValue: Number(this.props.tlList.h2OUnit).toFixed(4)==="NaN" ? null : Number(this.props.tlList.h2OUnit).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('qq', {
                            initialValue: this.state.DanChne
                          })(
                            <Input type="text" disabled={true} />,
                          )}
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>耗电</td>
                      <td>kwh</td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('electricityPrice', {
                            initialValue: Number(this.props.tlList.electricityPrice).toFixed(2)==="NaN" ? null : Number(this.props.tlList.electricityPrice).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('electricityUnit', {
                            initialValue: Number(this.props.tlList.electricityUnit).toFixed(4)==="NaN" ? null : Number(this.props.tlList.electricityUnit).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('a', {
                            initialValue: this.state.HdDanCheng
                          })(
                            <Input type="text" disabled={true} />,
                          )}
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>压缩空气</td>
                      <td>Nm3</td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('airPrice', {
                            initialValue: Number(this.props.tlList.airPrice).toFixed(2)==="NaN" ? null : Number(this.props.tlList.airPrice).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('airUnit', {
                            initialValue: Number(this.props.tlList.airUnit).toFixed(4)==="NaN" ? null : Number(this.props.tlList.airUnit).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td> <Form.Item>
                        {getFieldDecorator('cc', {
                          initialValue: this.state.YsKqDanCheng,
                        })(
                          <Input type="text" disabled={true} />,
                        )}
                      </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>蒸汽</td>
                      <td>吨</td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('steamPrice', {
                            initialValue: Number(this.props.tlList.steamPrice).toFixed(2)==="NaN" ? null : Number(this.props.tlList.steamPrice).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('steamUnit', {
                            initialValue: Number(this.props.tlList.steamUnit).toFixed(4)==="NaN" ? null : Number(this.props.tlList.steamUnit).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('bb', {
                            initialValue: this.state.ZQDanCheng,
                          })(
                            <Input type="text" disabled={true} />,
                          )}
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>二</td>
                      <td>人员工资</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('workerPUnit', {
                            initialValue: Number(this.props.tlList.workerPUnit).toFixed(4)==="NaN" ? null : Number(this.props.tlList.workerPUnit).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>三</td>
                      <td>维修人员工资</td>
                      <td>每年</td>
                      <td></td>
                      <td></td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('attendantPUnit', {
                            initialValue: Number(this.props.tlList.attendantPUnit).toFixed(4)==="NaN" ? null : Number(this.props.tlList.attendantPUnit).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>四</td>
                      <td>设备维修费</td>
                      <td>每年</td>
                      <td></td>
                      <td></td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('devicePUnit', {
                            initialValue: Number(this.props.tlList.devicePUnit).toFixed(4)==="NaN" ? null : Number(this.props.tlList.devicePUnit).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>五</td>
                      <td>材料费(主要是布袋)</td>
                      <td>每年</td>
                      <td></td>
                      <td></td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('materialPUnit', {
                            initialValue: Number(this.props.tlList.materialPUnit).toFixed(4)==="NaN" ? null : Number(this.props.tlList.materialPUnit).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>六</td>
                      <td>脱硫灰处理运费</td>
                      <td>吨</td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('ashPrice', {
                            initialValue: Number(this.props.tlList.ashPrice).toFixed(2)==="NaN" ? null : Number(this.props.tlList.ashPrice).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('ashUnit', {
                            initialValue: Number(this.props.tlList.ashUnit).toFixed(4)==="NaN" ? null : Number(this.props.tlList.ashUnit).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('ee', {
                            initialValue: this.state.tlDanCheng
                          })(
                            <Input type="text" disabled={true} />,
                          )}
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <td>七</td>
                      <td>劳务费</td>
                      <td>元/人/年</td>
                      <td></td>
                      <td></td>
                      <td>
                        <Form.Item>
                          {getFieldDecorator('labourPUnit', {
                            initialValue: Number(this.props.tlList.labourPUnit).toFixed(4)==="NaN" ? null : Number(this.props.tlList.labourPUnit).toFixed(2)
                          })(
                            <Input type="text" />,
                          )}
                        </Form.Item>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <Form.Item label="出口SO2含量，mg/m3">
                    {getFieldDecorator('outS', {
                      initialValue: Number(this.props.tlList.outS).toFixed(0)==="NaN" ? null : Number(this.props.tlList.outS).toFixed(2)
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
                  <Form.Item label="Ca/S比，-">
                    {getFieldDecorator('ratioCaS', {
                      initialValue: Number(this.props.tlList.ratioCaS).toFixed(2)==="NaN" ? null : Number(this.props.tlList.ratioCaS).toFixed(2)
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
                  <Form.Item label="主抽烟机流量，m3/h">
                    {getFieldDecorator('mainSmokeFlux', {
                      initialValue: Number(this.props.tlList.mainSmokeFlux).toFixed(0)==="NaN" ? null : Number(this.props.tlList.mainSmokeFlux).toFixed(2)
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="白灰CaO,%">
                    {getFieldDecorator('csOs', {
                      initialValue: Number(this.props.tlList.csOs).toFixed(2)==="NaN" ? null : Number(this.props.tlList.csOs).toFixed(2)
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
  
                  <Form.Item label="烧结矿年产量，吨">
                    {getFieldDecorator('sSProduce', {
                      initialValue: Number(this.props.tlList.sSProduce).toFixed(2)==="NaN" ? null : Number(this.props.tlList.sSProduce).toFixed(2)
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
                  <Form.Item label="年作业率，%">
                    {getFieldDecorator('operationRate', {
                      initialValue: Number(this.props.tlList.operationRate).toFixed(2)==="NaN" ? null : Number(this.props.tlList.operationRate).toFixed(2)
                    })(
                      <Input type="text" />,
                    )}
                  </Form.Item>
                </div>
                <Form.Item label="烧结矿S含量，%">
                  {getFieldDecorator('sSInter', {
                    initialValue: Number(this.props.tlList.sSInter).toFixed(2)==="NaN" ? null : Number(this.props.tlList.sSInter).toFixed(2),
                    // rules: [{required:true, pattern: new RegExp(/^[1-9]\d*$/, "g"),message: '请输入数字!' }],
                  })(
                    <Input type="text"/>,
                  )}
                </Form.Item>
              </div>
            </div>
          </Form>
          <Button onClick={this.computed.bind(this)} className="computed">计算</Button>
        </Fragment>
      )
    }
  }
  const WrappedSulfurRemoval = Form.create({ name: 'sulfurRemoval' })(sulfurRemoval);
  export default WrappedSulfurRemoval