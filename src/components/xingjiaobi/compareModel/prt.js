// //膨润土参数设置/////////////////////////////////////////////////////////////////////////////////////////////
import React, { Component, Fragment } from "react";
import {Input,  Form,} from "antd";
import 'bootstrap/dist/css/bootstrap.css';
class Bentonite extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataPrt: [],
      }
    }
    handleOkPrt = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        //////console.log(values)
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      //////console.log(this.props.prtList)
      return (
        <Fragment>
          <Form onChange={this.handleOkPrt} className="login-form" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} id="a">
            <div className="click_show_one" >
              <Form.Item label="膨润土配比，%">
                {getFieldDecorator('ratioPRT', {
                  initialValue: Number(this.props.prtList.ratioPRT).toFixed(2)==="NaN" ? null : Number(this.props.prtList.ratioPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="价格，元/吨">
                {getFieldDecorator('pricePRT', {
                  initialValue: Number(this.props.prtList.pricePRT).toFixed(2)==="NaN" ? null : Number(this.props.prtList.pricePRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="SiO2含量，%">
                {getFieldDecorator('siPRT', {
                  initialValue: Number(this.props.prtList.siPRT).toFixed(2)==="NaN" ? null : Number(this.props.prtList.siPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="CaO含量，%">
                {getFieldDecorator('caPRT', {
                  initialValue: Number(this.props.prtList.caPRT).toFixed(2)==="NaN" ? null : Number(this.props.prtList.caPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="Al2O3含量，%">
                {getFieldDecorator('alPRT', {
                  initialValue: Number(this.props.prtList.alPRT).toFixed(2)==="NaN" ? null : Number(this.props.prtList.alPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="MgO含量，%">
                {getFieldDecorator('mgPRT', {
                  initialValue: Number(this.props.prtList.mgPRT).toFixed(2)==="NaN" ? null : Number(this.props.prtList.mgPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="Na2O含量，%">
                {getFieldDecorator('naPRT', {
                  initialValue: Number(this.props.prtList.naPRT).toFixed(3)==="NaN" ? null : Number(this.props.prtList.naPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="S含量，%">
                {getFieldDecorator('sPRT', {
                  initialValue: Number(this.props.prtList.sPRT).toFixed(3)==="NaN" ? null : Number(this.props.prtList.sPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="p含量，%">
                {getFieldDecorator('pPRT', {
                  initialValue: Number(this.props.prtList.pPRT).toFixed(3)==="NaN" ? null : Number(this.props.prtList.pPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="K2O含量，%">
                {getFieldDecorator('kPRT', {
                  initialValue: Number(this.props.prtList.kPRT).toFixed(3)==="NaN" ? null : Number(this.props.prtList.kPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="ZnO含量，%">
                {getFieldDecorator('znPRT', {
                  initialValue: Number(this.props.prtList.znPRT).toFixed(3)==="NaN" ? null : Number(this.props.prtList.znPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="烧损，%">
                {getFieldDecorator('loiPRT', {
                  initialValue: Number(this.props.prtList.loiPRT).toFixed(3)==="NaN" ? null : Number(this.props.prtList.loiPRT).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
            </div>
          </Form>
        </Fragment>
      )
    }
  }
  const WrappedBentonite = Form.create({ name: 'Bentonite' })(Bentonite);
  export default WrappedBentonite