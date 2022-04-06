import React, { Component, Fragment } from "react";
import { Input, Form, } from "antd";
import 'bootstrap/dist/css/bootstrap.css';
//修改进入排序阶段的数据 
class EditerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataListClick: props.ArrayList,//选中哪一行的信息

        }
    }
    //修改参数设置的提交按钮
    handleOnChange = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            //////console.log(values)
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
    render() {
        //////console.log(this.state.dataListClick)
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                {
                    this.props.set.map((item, index) => {
                        return (
                            <Form onChange={this.handleOnChange} key={index} className="login-form" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} id="a">
                                <div className="click_show_one">
                                    <Form.Item label="名称">
                                        {getFieldDecorator('name', {
                                            initialValue: item.name
                                        })(
                                            <Input type="text" />,
                                        )}
                                    </Form.Item>
                                    <Form.Item label="灰分">
                                        {getFieldDecorator('hf', {
                                            initialValue: item.hf
                                        })(
                                            <Input type="text" />,
                                        )}
                                    </Form.Item>
                                    <Form.Item label="挥发分">
                                        {getFieldDecorator('hff', {
                                            initialValue: item.hff
                                        })(
                                            <Input type="text" />,
                                        )}
                                    </Form.Item>
                                    <Form.Item label="硫分">
                                        {getFieldDecorator('s', {
                                            initialValue: item.s
                                        })(
                                            <Input type="text" />,
                                        )}
                                    </Form.Item>
                                    <Form.Item label="水分">
                                        {getFieldDecorator('h2O', {
                                            initialValue: item.h2O
                                        })(
                                            <Input type="text" />,
                                        )}
                                    </Form.Item>
                                    <Form.Item label="固定碳">
                                        {getFieldDecorator('c', {
                                            initialValue: item.c
                                        })(
                                            <Input type="text" />,
                                        )}
                                    </Form.Item>
                                    <Form.Item label="发热值">
                                        {getFieldDecorator('frz', {
                                            initialValue: item.frz
                                        })(
                                            <Input type="text" />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="可磨性">
                                        {getFieldDecorator('kmx', {
                                            initialValue: item.kmx
                                        })(
                                            <Input type="text" />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="到厂税价格">
                                        {getFieldDecorator('price', {
                                            initialValue: item.price
                                        })(
                                            <Input type="text" />,
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