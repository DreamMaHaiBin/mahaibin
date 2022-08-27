import React, { Component } from "react"
import './index.scss'
export default class Footer extends Component {
    render() {
        return (
            <div className="body-content-footer">
                <img src={require("../../img/bottom_logo.png")}  alt="" />
            </div>
        )
    }
}