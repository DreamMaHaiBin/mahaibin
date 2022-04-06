
import React, { Component, Fragment } from "react";
import { Input,  Form,  Checkbox } from "antd";
import 'bootstrap/dist/css/bootstrap.css';
//参数设置组件
class AddComponentFrom extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        value: true,
        boolen: true,
      }
    }
    onChange = e => {
      //////console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    };
    handleSub = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        //////console.log(values)
        this.setState({
          value: values.isMg
        })
      });
    };
    componentDidMount() {
      this.setState({
        value: this.props.setList.isMg
      })
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Fragment>
          <Form onChange={this.handleSub} >
            <div className="click_show_one">
              <span>通用</span>
              <Form.Item label="入炉料碱度">
                {getFieldDecorator('r', {
                  initialValue: Number(this.props.setList.r).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="锌负荷1kg影响燃耗，%">
                {getFieldDecorator('f3', {
                  initialValue: Number(this.props.setList.f3).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="入炉品位1%影响燃耗，%">
                {getFieldDecorator('f1', {
                  initialValue: Number(this.props.setList.f1).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="硫负荷1kg影响燃耗，%">
                {getFieldDecorator('f5', {
                  initialValue: Number(this.props.setList.f5).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="碱负荷1kg影响燃耗，%">
                {getFieldDecorator('f2', {
                  initialValue: Number(this.props.setList.f2).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="炉渣Mg/Al比，-">
                {getFieldDecorator('maRatio', {
                  initialValue: Number(this.props.setList.maRatio).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
            </div>
  
            <div className="click_show_one">
              <span>铁矿粉测算</span>
              <Form.Item label="白云石价格,元/吨">
                {getFieldDecorator('priceDolo', {
                  initialValue: Number(this.props.setList.priceDolo).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="白云石MgO含量，%">
                {getFieldDecorator('mgDolo', {
                  initialValue: Number(this.props.setList.mgDolo).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="烧结加工费，元/吨">
                {getFieldDecorator('f6_1', {
                  initialValue: Number(this.props.setList.f6_1).toFixed(0)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="烧结矿筛下率，%">
                {getFieldDecorator('screenRatio_1', {
                  initialValue: Number(this.props.setList.screenRatio_1).toFixed(0)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="球团加工费，元/吨">
                {getFieldDecorator('f6_2', {
                  initialValue: Number(this.props.setList.f6_2).toFixed(0)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="球团矿筛下率，%">
                {getFieldDecorator('screenRatio_2', {
                  initialValue: Number(this.props.setList.screenRatio_2).toFixed(0)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="焦粉价格,元/吨">
                {getFieldDecorator('priceF', {
                  initialValue: Number(this.props.setList.priceF).toFixed(0)
                })(
                  <Input type="text" />
                )}
              </Form.Item>
              <Form.Item label="焦粉发热值，kj/kg">
                {getFieldDecorator('hf', {
                  initialValue: Number(this.props.setList.hf).toFixed(2)
                })(
                  <Input type="text" />
                )}
              </Form.Item>
              <Form.Item label="结晶水分解耗热，kj/kg">
                {getFieldDecorator('hLoi', {
                  initialValue: Number(this.props.setList.hLoi).toFixed(0)
                })(
                  <Input type="text" />
                )}
              </Form.Item>
              <Form.Item label="自然镁冶炼">
                {getFieldDecorator('isMg', {
                  initialValue: this.state.value
                })(
                  <Checkbox checked={this.state.value} ></Checkbox >,
                )}
              </Form.Item>
            </div>
            <div className="click_show_one">
              <span>入炉料测算</span>
              <Form.Item label="焦炭价格,元/吨">
                {getFieldDecorator('priceCoke', {
                  initialValue: Number(this.props.setList.priceCoke).toFixed(0)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="入炉碱负荷，kg/t">
                {getFieldDecorator('kNaO', {
                  initialValue: Number(this.props.setList.kNaO).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="铁水金属铁，%">
                {getFieldDecorator('felron', {
                  initialValue: Number(this.props.setList.felron).toFixed(2)
                })(
                  <Input type="text" />
                )}
              </Form.Item>
              <Form.Item label="煤粉价格，元/吨">
                {getFieldDecorator('priceCoal', {
                  initialValue: Number(this.props.setList.priceCoal).toFixed(0)
                })(
                  <Input type="text" />
                )}
              </Form.Item>
              <Form.Item label="入炉锌负荷，kg/t">
                {getFieldDecorator('znO', {
                  initialValue: Number(this.props.setList.znO).toFixed(2)
                })(
                  <Input type="text" />,
                )}
              </Form.Item>
              <Form.Item label="铁水硅含量，%">
                {getFieldDecorator('silron', {
                  initialValue: Number(this.props.setList.silron).toFixed(2)
                })(
                  <Input type="text" />
                )}
              </Form.Item>
              <Form.Item label="基准焦比，kg/t">
                {getFieldDecorator('cokeRate0', {
                  initialValue: Number(this.props.setList.cokeRate0).toFixed(0)
                })(
                  <Input type="text" />
                )}
              </Form.Item>
              <Form.Item label="入炉硫负荷，kg/t">
                {getFieldDecorator('s0', {
                  initialValue: Number(this.props.setList.s0).toFixed(2)
                })(
                  <Input type="text" />
                )}
              </Form.Item>
              <Form.Item label="基准入炉品位，%">
                {getFieldDecorator('tFe0', {
                  initialValue: Number(this.props.setList.tFe0).toFixed(2)
                })(
                  <Input type="text" />
                )}
              </Form.Item>
              <Form.Item label="基准煤比，kg/t">
                {getFieldDecorator('coalRate0', {
                  initialValue: Number(this.props.setList.coalRate0).toFixed(0)
                })(
                  <Input type="text" />
                )}
              </Form.Item>
              <Form.Item label="块粉溢价，元/度">
                {getFieldDecorator('yjProce', {
                  initialValue: Number(this.props.setList.yjProce).toFixed(2)
                })(
                  <Input type="text" />
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