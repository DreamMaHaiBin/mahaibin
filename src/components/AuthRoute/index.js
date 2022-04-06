import React,{ Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { message } from "antd";
export default class AuthRouter extends Component {
    render(){
        const { component: Component, ...rest } = this.props;
        let isLogin = sessionStorage.getItem("token") ? true : false;
        return(
            <Route {...rest} render={(props) => {
                if(!isLogin) {
                    message.warning("请先登录！");
                    return <Redirect to="/"/>
                }else{
                    return <Component {...props}/>
                }
            }}>
            </Route>
        )
    }
}