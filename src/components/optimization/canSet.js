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
          <Form.Item label="烧结S脱除率%" style={{marginRight:150}}>
                {getFieldDecorator('a1',{
                 initialValue: this.props.cansetValues.a1
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="烧结K2O脱除率%" >
                {getFieldDecorator('a2',{
                    initialValue: this.props.cansetValues.a2
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="烧结Na2O脱除率%" style={{marginRight:150}}>
                {getFieldDecorator('a3',{
                    initialValue: this.props.cansetValues.a3
                })(
                  <Input type="text" style={{ width: 90 }} />
                )}
              </Form.Item>
              <Form.Item label="烧结ZnO脱除率%" >
                {getFieldDecorator('a4',{
                    initialValue: this.props.cansetValues.a4
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