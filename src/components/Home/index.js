import React, { Component } from "react";
import "./index.scss"
import { NavLink } from "react-router-dom";
import Index from "../../router/index"
import Header from "./header";
import Footer from "./footer"
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Menu } from 'antd';
import { databaseList } from '../util/databaseList'

const { SubMenu } = Menu;
//控制路由跳转的页面
class Home extends Component {
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    constructor(props) {
        super(props);
        this.state = {
            info: "",
            collapsed: false,
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    clickHtmlText(e) {
        sessionStorage.setItem("titleName", e.target.innerHTML)
        console.log("http://192.168.2.130:8000")
    }
    render() {
        return (
            <div className="steel-mill-home-body">
                <Header info={this.state.info}></Header>
                <div className="steel-mill-home-sesstion">
                    <Menu
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                        className="steel-mill-home-Menu"
                        defaultOpenKeys={['0']}
                    >
                        {
                            databaseList.map((obj, index) => {
                                return (
                                    <SubMenu
                                        key={index}
                                        title={<span className="steel-mill-home-title">
                                            <span style={{ display: index === 0 || index === 1 ? 'block' : 'none' }}>原燃料</span>{obj.title}</span>
                                        }
                                    >
                                        {
                                            obj.data.map((item, idx) => {
                                                return (
                                                    <Menu.Item key={idx} className="steel-mill-home-Item">
                                                        <NavLink to={item.src} onClick={this.clickHtmlText.bind(this)} className={ sessionStorage.getItem("titleName") == item.name? 'active-class' : '' }>{item.name}</NavLink>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            })
                        }
                    </Menu>
                    <div className="steel-mill-home-content">
                        <Index></Index>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default withRouter(connect(state => state)(Home));