import React, { Component } from "react";
import "./index.scss"
import { NavLink } from "react-router-dom";
import Index from "../../router/index"
import Header from "./header";
import Footer from "./footer"
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Menu, Icon, Button } from 'antd';
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
    // componentDidMount() {
    //     this.changeKuan();
    //     this.kuang();
    // }
    // changeKuan() {
    //     var acc = document.getElementsByClassName("accordion");
    //     for (var i = 0, len = acc.length; i < len; i++) {
    //         acc[i].onclick = function () {
    //             this.classList.toggle("active");
    //             var panel = this.nextElementSibling;
    //             if (panel.style.maxHeight) {
    //                 panel.style.maxHeight = '';
    //             } else {
    //                 panel.style.maxHeight = panel.scrollHeight + "px";
    //             }
    //         }
    //     }
    // }
    // kuang() {
    //     let self = this
    //     this.props.dispatch(dispatch => {
    //         let buttonArr = document.getElementsByClassName("a");
    //         buttonArr[0].style.color = "#0056b3";
    //         for (let i = 0; i < buttonArr.length; i++) {
    //             buttonArr[i].onclick = function () {
    //                 // alert(this.innerHTML)
    //                 //for循环遍历button数组长度
    //                 self.setState({
    //                     info: buttonArr[i].innerHTML
    //                 })
    //                 dispatch({
    //                     type: "cogntionSuccess",
    //                     name: buttonArr[i].innerHTML
    //                 })
    //                 for (let j = 0; j < buttonArr.length; j++) {
    //                     //重置所有的button样式
    //                     buttonArr[j].style.color = "#666 ";
    //                     //给当前的(点击的那个)那个button添加样式
    //                     this.style.color = "#0056b3 ";
    //                 }
    //             }
    //         }
    //     })
    // }
    render() {
        return (
            <div className="steel-mill-home-body">
                <Header info={this.state.info}></Header>
                <div className="steel-mill-home-sesstion">
                    <Menu
                        defaultSelectedKeys={['3']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                        className="steel-mill-home-Menu"
                    >
                        {/* <SubMenu
                                key="sub1"
                                title={
                                    <span className="steel-mill-home-title">
                                        原燃料<br/>
                                        基础数据库
                                    </span>
                                }
                            >
                                {
                                    databaseList.map((obj,index)=>{
                                        return(
                                            <Menu.Item key={index} className="steel-mill-home-Item">
                                                <NavLink to={obj.src}>{obj.name}</NavLink>
                                            </Menu.Item>
                                        )
                                    })
                                }
                            </SubMenu> */}
                        {
                            databaseList.map((obj, index) => {
                                return (
                                    <SubMenu key={index} title={<span className="steel-mill-home-title">{obj.title}</span>}>
                                        {
                                            obj.data.map((item, idx) => {
                                                return (
                                                    <Menu.Item key={idx} className="steel-mill-home-Item">
                                                        <NavLink to={item.src}>{item.name}</NavLink>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            })
                        }
                    </Menu>
                </div>
                {/* <div className="sesstion" style={{display:"flex"}} >
                    <div style={{ float: "left", marginTop: 10, marginRight: 8,height:932,width:160, overflow:"auto" }}>
                        <button className="accordion">原燃料<br></br>基础数据库</button>
                        <div className="panel">
                            <NavLink to="/index/one" className="a">烧结粉基础数据库</NavLink><br />
                            <NavLink to="/index/two" className="a">球团粉基础数据库</NavLink><br />
                            <NavLink to="/index/three" className="a">入炉料基础数据库</NavLink><br />
                            <NavLink to="/index/four" className="a">护炉料基础数据库</NavLink><br />
                            <NavLink to="/index/five" className="a">煤粉基础数据库</NavLink><br />
                            <NavLink to="/index/six" className="a">焦炭基础数据库</NavLink><br />
                            <NavLink to="/index/solvent" className="a">熔剂基础数据库</NavLink><br />
                            <NavLink to="/index/waste" className="a">固废基础数据库</NavLink>
                        </div>
                        <button className="accordion">原燃料<br></br>性价比评价</button>
                        <div className="panel" >
                            <NavLink to="/index/compare" className="a">烧结用矿粉性价比</NavLink><br></br>
                            <NavLink to="/index/bePutInAFurnace" className="a">球团用矿粉性价比</NavLink><br></br>
                            <NavLink to="/index/rulu" className="a">入炉料性价比</NavLink><br></br>
                            <NavLink to="/index/ToProtectTheCharge" className="a">护炉料性价比</NavLink><br></br>
                            <NavLink to="/index/braize" className="a">煤粉性价比</NavLink><br></br>
                            <NavLink to="/index/coke" className="a">焦炭性价比</NavLink><br></br>
                        </div>
                        <button className="accordion" >铁水成本测算</button>
                        <div className="panel">
                            <NavLink to="/index/budget" className="a">烧结成本测算</NavLink><br></br>
                            <NavLink to="/index/pelletizing" className="a">球团成本测算</NavLink><br />
                            <NavLink to="/index/blastFurnace" className="a" >高炉成本测算</NavLink>
                        </div>
                        <button className="accordion" >离线成本测算</button>
                        <div className="panel">
                            <NavLink to="/index/sinteringoffline/?state=offLine" className="a">烧结离线测算</NavLink><br></br>
                            <NavLink to="/index/pelletoffline/?state=offLine" className="a">球团离线测算</NavLink><br />
                            <NavLink to="/index/furnaceoffline/?state=offLine" className="a">高炉离线测算</NavLink>
                        </div>
                        <button className="accordion">铁水成本优化</button>
                        <div className="panel">
                            <NavLink to="/index/optimization" className="a">烧结成本优化</NavLink><br />
                            <NavLink to="/index/Pelletsoptimization" className="a">球团成本优化</NavLink><br />
                            <NavLink to="/index/GaoLublastfurnace" className="a">高炉成本优化</NavLink><br />
                            <NavLink to="/index/coalblending" className="a">配煤成本优化</NavLink>
                        </div>
                        <button className="accordion">日清日结</button>
                        <div className="panel">
                            <NavLink to="/index/sinterDateClear" className="a">烧结成本分析</NavLink><br></br>
                            <NavLink to="/index/pelletoffline/?state=offLine" className="a">球团成本分析</NavLink><br />
                            <NavLink to="/index/furnaceoffline/?state=offLine" className="a">高炉成本分析</NavLink>
                        </div>
                        <button className="accordion">成本分析</button>
                        <div className="panel">
                            <NavLink to="/index/sinterCostAnalysis" className="a">烧结成本分析</NavLink><br></br>
                            <NavLink to="/index/pelletoffline/?state=offLine" className="a">球团成本分析</NavLink><br />
                            <NavLink to="/index/furnaceoffline/?state=offLine" className="a">高炉成本分析</NavLink>
                        </div>
                    </div>
                    <div style={{ width: 1216,  marginTop: 10, }}>
                        <Index></Index>
                    </div>
                </div> */}
                <Footer></Footer>
            </div>
        )
    }
}
export default withRouter(connect(state => state)(Home));