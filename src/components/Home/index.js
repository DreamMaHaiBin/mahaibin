import React, { Component } from "react";
import "./index.css"
import { NavLink} from "react-router-dom";
import Index from "../../router/index"
import Header from "./header";
import Footer from "./footer"
import { connect } from "react-redux";
import { withRouter } from "react-router";
//控制路由跳转的页面
 class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: "",
        }
    }
    componentDidMount() {
        this.changeKuan();
        this.kuang();
    }
    changeKuan() {
        var acc = document.getElementsByClassName("accordion");
        for (var i = 0, len = acc.length; i < len; i++) {
            acc[i].onclick = function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = '';
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }
    }
    kuang() {
         let self = this
        this.props.dispatch(dispatch => {
        let buttonArr = document.getElementsByClassName("a");  
        buttonArr[0].style.color = "#0056b3";
        for (let i = 0; i < buttonArr.length; i++) {
          buttonArr[i].onclick = function () {
            // alert(this.innerHTML)
            //for循环遍历button数组长度
            self.setState({
                info: buttonArr[i].innerHTML
          })
                dispatch({
                    type: "cogntionSuccess",
                    name: buttonArr[i].innerHTML
                  }) 
            for (let j = 0; j < buttonArr.length; j++) {
              //重置所有的button样式
              buttonArr[j].style.color = "#666 ";
              //给当前的(点击的那个)那个button添加样式
              this.style.color = "#0056b3 ";
            }
          }
        }
    })
    }
    render() { 
        return (
            
            <div>
                <Header info={this.state.info}></Header>
                <div className="sesstion" >
                    <div style={{ float: "left", marginTop: 10, marginRight: 8 }}>
                        <button className="accordion">原燃料<br></br>基础数据库</button>
                        <div className="panel">
                            <NavLink to="/index/one" className="a">烧结粉基础数据库</NavLink><br />
                            {/* <Redirect from="/" to="/index" exact></Redirect> */}
                            <NavLink to="/index/two"  className="a">球团粉基础数据库</NavLink><br />
                            <NavLink to="/index/three"  className="a">入炉料基础数据库</NavLink><br/>
                            <NavLink to="/index/four"  className="a">护炉料基础数据库</NavLink><br/>
                            <NavLink to="/index/five"  className="a">煤粉基础数据库</NavLink><br/>
                            <NavLink to="/index/six"  className="a">焦炭基础数据库</NavLink><br/>
                            <NavLink to="/index/solvent"  className="a">熔剂基础数据库</NavLink><br/>
                            <NavLink to="/index/waste"  className="a">固废基础数据库</NavLink>
                        </div>
                        <button className="accordion" style={{display:sessionStorage.getItem("permission2")==="true" || sessionStorage.getItem("permission3")==="true"? "inline" : "none"}}>原燃料<br></br>性价比评价</button>
                        <div className="panel" >
                            <NavLink to="/index/compare"  className="a">烧结用矿粉性价比</NavLink><br></br>
                            <NavLink to="/index/bePutInAFurnace"  className="a">球团用矿粉性价比</NavLink><br></br>
                            <NavLink to="/index/rulu"  className="a">入炉料性价比</NavLink><br></br>
                            <NavLink to="/index/ToProtectTheCharge"  className="a">护炉料性价比</NavLink><br></br>
                            <NavLink to="/index/braize"  className="a">煤粉性价比</NavLink><br></br>
                            <NavLink to="/index/coke"  className="a">焦炭性价比</NavLink><br></br>
                        </div>
                        <button className="accordion" style={{display:sessionStorage.getItem("permission2")==="true" || sessionStorage.getItem("permission3")==="true"? "inline" : "none"}}>铁水成本测算</button>
                        <div className="panel">
                            <NavLink to="/index/budget"  className="a">烧结成本测算</NavLink><br></br>
                            <NavLink to="/index/pelletizing"  className="a">球团成本测算</NavLink><br />
                            <NavLink to="/index/blastFurnace"  className="a">高炉成本测算</NavLink>
                        </div>
                        <button className="accordion" style={{display:sessionStorage.getItem("permission2")==="true" || sessionStorage.getItem("permission3")==="true"? "inline" : "none"}}>铁水成本优化</button>
                        <div className="panel">
                            <NavLink to="/index/optimization"  className="a">烧结成本优化</NavLink><br/>
                            <NavLink to="/index/Pelletsoptimization"  className="a">球团成本优化</NavLink><br/>
                            <NavLink to="/index/GaoLublastfurnace"  className="a">高炉成本优化</NavLink><br/>
                            <NavLink to="/index/coalblending"  className="a">配煤成本优化</NavLink>
                        </div>
                    </div>
                    <div style={{ width: 1070, float: "left", marginTop: 10, }}>
                        <Index></Index>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default withRouter(connect(state => state)(Home));