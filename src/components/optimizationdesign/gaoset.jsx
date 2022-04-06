import React, { Component, Fragment } from "react";
import {  Input, Form,  } from "antd";
//新增模态窗的组件，当点击添加是调用
class CanSet extends Component {
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
  selectedINfo(value) {
    //////console.log(`selected ${value}`);
  }
  indexType(value) {
    //////console.log(`selected ${value}`);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} id="a">
          <div style={{background:"#fff"}}>
          <Form.Item label="S渣铁分配比" style={{marginRight:150}}>
                {getFieldDecorator('f1',{
                 initialValue: this.props.cansetValues.f1
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="Ti铁水收的率" >
                {getFieldDecorator('f2',{
                    initialValue: this.props.cansetValues.f2
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="铁水中Si含量" style={{marginRight:150}}>
                {getFieldDecorator('f3',{
                    initialValue: this.props.cansetValues.f3
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="铁水铁含量" >
                {getFieldDecorator('f4',{
                    initialValue: this.props.cansetValues.f4
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="Fe元素渣铁分配比"  style={{marginRight:150}} >
                {getFieldDecorator('f5',{
                    initialValue: this.props.cansetValues.f5
                })(
                  <Input type="text" style={{ width: 90 }}/>
                )}
              </Form.Item>
               <Form.Item label="渣中其他成分含量" >
                {getFieldDecorator('f6',{
                    initialValue: this.props.cansetValues.f6
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
             <Form.Item label="S在煤气中分配率" style={{marginRight:150}} >
                {getFieldDecorator('f7',{
                    initialValue: this.props.cansetValues.f7
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="Mn在铁中分配率" >
                {getFieldDecorator('f8',{
                    initialValue: this.props.cansetValues.f8
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="基准入炉品位，%" style={{marginRight:150}}>
                {getFieldDecorator('f9',{
                    initialValue: this.props.cansetValues.f9
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="基准焦比，t/kg" >
                {getFieldDecorator('f10',{
                    initialValue: this.props.cansetValues.f10
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="基准煤比，t/kg" style={{marginRight:150}}>
                {getFieldDecorator('f11',{
                    initialValue: this.props.cansetValues.f11
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="基准产量，吨/月" >
                {getFieldDecorator('f12',{
                    initialValue: this.props.cansetValues.f12
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="固定加工费，元/月" style={{marginRight:150}}>
                {getFieldDecorator('f13',{
                    initialValue: this.props.cansetValues.f13
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="可变加工费，元/吨" >
                {getFieldDecorator('f14',{
                    initialValue: this.props.cansetValues.f14
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="品位影响燃料比，%" style={{marginRight:150}}>
                {getFieldDecorator('f15',{
                    initialValue: this.props.cansetValues.f15
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="品位影响产量，%" >
                {getFieldDecorator('f16',{
                    initialValue: this.props.cansetValues.f16
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
          </div>
        </Form>
      </Fragment>
    )
  }
}
const WrappedcanSet= Form.create({ name: 'canSet' })(CanSet);
export default WrappedcanSet