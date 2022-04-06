import React, { Component, Fragment } from "react";
import {  Input, DatePicker, Form, Select } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
const { MonthPicker } = DatePicker;
const { Option } = Select;
//新增模态窗的组件，当点击添加是调用
class AddComponentFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      propsData: props.handleDeleteId,

    }
  }
  //新增提交
  handleSubmit = e => {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //////console.log(values.incomingDate)
      //////console.log('Received values of form: ', values);

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

  indexType(value) {
    //////console.log(`selected ${value}`);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} id="a">

          <div className="click_show_one">
            <span className="jibenxinxi">基本信息</span>
            <Form.Item label="矿粉名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '!' }],
              })(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            
            <Form.Item label="日期">
              {getFieldDecorator('incomingDate', {
                rules: [{ required: true, message: '!' }],
              })(
                <MonthPicker placeholder="请选择月份"  style={{width:90}} value={zhCN}/>
              )}
            </Form.Item>
            <Form.Item label="航线">
              {getFieldDecorator('comeFrom.route_name')(
                <Select style={{ width: 90, padding: 0, fontSize: 12 }} >
                  <Option value="澳洲航线">澳洲航线</Option>
                  <Option value="秘鲁航线">秘鲁航线</Option>
                  <Option value="南非航线">南非航线</Option>
                  <Option value="巴西航线">巴西航线</Option>
                  <Option value="无">无</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="船名">
              {getFieldDecorator('comeFrom.boatName')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>

            <Form.Item label="进口商">
              {getFieldDecorator('comeFrom.merchantName')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="指数类型">
              {getFieldDecorator('comeFrom.indexType')(
                <Select style={{ width: 90, padding: 0, fontSize: 12 }}>
                  <Option value="62%普指">62%普指</Option>
                  <Option value="58%MBP">58%MBP</Option>
                  <Option value="65%MB">65%MB</Option>
                  <Option value="无">无</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="折扣">
              {getFieldDecorator('comeFrom.discount')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="优惠">
              {getFieldDecorator('comeFrom.offer')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="品位溢价">
              {getFieldDecorator('comeFrom.pwyjPrice')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="品种加价">
              {getFieldDecorator('comeFrom.pzjiajPrice')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="品种减价">
              {getFieldDecorator('comeFrom.pzjianjPrice')(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="到厂价">
              {getFieldDecorator('priceOre', {
                rules: [{ required: true, message: '！' }],
              })(
                <Input type="text" maxLength={10} style={{ width: 90 }} />,
              )}
            </Form.Item>

            <Form.Item label="测算价">
              {getFieldDecorator('comeFrom.csPrice')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="备注">
              {getFieldDecorator('remark')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
          </div>

          <div className="click_show_one">
            <span className="jibenxinxi">化学成分</span>
            <Form.Item label="矿粉名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '!' }],
              })(
                <Input type="text" disabled={true} style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="TFe">
              {getFieldDecorator('source.tFe', {
                rules: [{ required: true, message: '！' }],
              })(
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="SiO2">
              {getFieldDecorator('source.siO2', {
                rules: [{ required: true, message: '!' }],
              })(
                <Input type="text" style={{ width: 90 }} />,
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
                <Input type="text" style={{ width: 90 }} />,
              )}
            </Form.Item>
            <Form.Item label="烧损">
              {getFieldDecorator('source.loI')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="FeO">
              {getFieldDecorator('source.feO')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="AsO">
              {getFieldDecorator('source.asO')(
                <Input type="text" style={{ width: 90 }} />
              )}
            </Form.Item>
            <Form.Item label="单烧品位">
              {getFieldDecorator('source.dspw')(
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
          </div>         
        </Form>
      </Fragment>
    )
  }
}
const WrappedAddComponentFrom = Form.create({ name: 'addcomponent' })(AddComponentFrom);
export default WrappedAddComponentFrom