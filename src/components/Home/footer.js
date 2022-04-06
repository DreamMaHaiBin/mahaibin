import React, { Component } from "react"
export default class Footer extends Component {
    render() {
        return (
            <div style={{ height: 40, background: "#d1d1d1", width: "100%", lineHeight: 40, }}>
                <img src={require("../../img/bottom_logo.png")} style={{ float: "right", marginTop: 15, marginRight: 30 }} alt="" />
            </div>
        )
    }
}