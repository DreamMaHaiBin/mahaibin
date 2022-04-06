//编辑
import React, { Component, Fragment } from "react";
import {  Input, Form, Select } from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
const { Option } = Select;
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
      return (
        <Fragment>
          {
            this.state.selectedRows.map((item) => {
              return (
                <Form onSubmit={this.handleSubmit} key={item.id}>
                  <div className="click_show_one">
                    <span className="jibenxinxi">基本信息</span>
                    <Form.Item label="矿粉名称">
                      {getFieldDecorator('name', {
                        initialValue: item.name,
                        // rules: [{ required: true, message: '!' }],
                      })(
                        <Input type="text" style={{ width: 90 }} disabled={true} />,
                      )}
                    </Form.Item>
                    <Form.Item label="日期">
                      {getFieldDecorator('incomingDate', {
                        initialValue: item.incomingDate,
                        // rules: [{ required: true, message: '!' }],
                      })(
                        <Input type="text" style={{ width: 90 }} disabled={true} locale={locale}/>,
                      )}
                    </Form.Item>
                    <Form.Item label="航线">
                      {getFieldDecorator('comeFrom.route_name', {
                        initialValue: item.comeFrom.route_name==="0" ? "无" : item.comeFrom.route_name,
                      })(
                        <Select style={{ width: 90, padding: 0, fontSize: 12 }}>
                          <Option value="澳洲航线">澳洲航线</Option>
                          <Option value="秘鲁航线">秘鲁航线</Option>
                          <Option value="南非航线">南非航线</Option>
                          <Option value="巴西航线">巴西航线</Option>
                          <Option value="无">无</Option>
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item label="船名">
                      {getFieldDecorator('comeFrom.boatName', {
                        initialValue: item.comeFrom.boatName,
                      })(
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                 
                    <Form.Item label="进口商">
                      {getFieldDecorator('comeFrom.merchantName', {
                        initialValue: item.comeFrom.merchantName,
                      })(
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="指数类型">
                      {getFieldDecorator('comeFrom.indexType', {
                        initialValue: item.comeFrom.indexType==="0" ? "无" : item.comeFrom.indexType,
                      })(
                        <Select style={{ width: 90, padding: 0, fontSize: 12 }} >
                          <Option value="62%普指">62%普指</Option>
                          <Option value="58%MBP">58%MBP</Option>
                          <Option value="65%MB">65%MB</Option>
                          <Option value="无">无</Option>
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item label="折扣">
                      {getFieldDecorator('comeFrom.discount', {
                        initialValue: item.comeFrom.discount,
                      })(
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="优惠">
                      {getFieldDecorator('comeFrom.offer', {
                        initialValue: item.comeFrom.offer,
                      })(
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="品种溢价">
                      {getFieldDecorator('comeFrom.pwyjPrice', {
                        initialValue: item.comeFrom.pwyjPrice,
                      })(
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="品种加价">
                      {getFieldDecorator('comeFrom.pzjiajPrice', {
                        initialValue: item.comeFrom.pzjiajPrice,
                      })(
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="品种减价">
                      {getFieldDecorator('comeFrom.pzjianjPrice', {
                        initialValue: item.comeFrom.pzjianjPrice,
                      })(
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="到厂价">
                      {getFieldDecorator('priceOre', {
                        initialValue: item.priceOre,
                        // rules: [{ required: true, message: '!' }],
                      })(
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="测算价">
                      {getFieldDecorator('comeFrom.csPrice', {
                        initialValue: item.comeFrom.csPrice,
                      })(
                        <Input type="text" style={{ width: 90 }} />
                      )}
                    </Form.Item>
                    <Form.Item label="备注">
                      {getFieldDecorator('remark', {
                        initialValue: item.remark,
                      })(
                        <Input type="text" style={{ width: 90 }} />
                      )}
                    </Form.Item>
                  </div>
                  <div className="click_show_one">
                    <span className="jibenxinxi">化学成分</span>
                    <Form.Item label="矿粉名称">
                      {getFieldDecorator('name', {
                        initialValue: item.name,
                        // rules: [{ required: true, message: '!' }],
                      })(
                        <Input type="text" disabled={true} style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="TFe">
                      {getFieldDecorator('source.tFe', {
                        initialValue: item.source.tFe,
                        // rules: [{ required: true, message: '！' }],
                      })(
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="SiO2">
                      {getFieldDecorator('source.siO2', {
                        initialValue: item.source.siO2,
                        rules: [{ required: true, message: '!' }],
                      })(
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="Al2O3">
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
                        <Input type="text" style={{ width: 90 }} />,
                      )}
                    </Form.Item>
                    <Form.Item label="烧损">
                      {getFieldDecorator('source.loI', {
                        initialValue: item.source.loI,
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
                    <Form.Item label="AsO">
                      {getFieldDecorator('source.asO', {
                        initialValue: item.source.asO,
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
  export default WrappedEditerComponent