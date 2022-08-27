import React, { Component } from "react";
import "./cossalculation.scss"
import GaoLu from "./lixian//gaolu";
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default class GaoLuLiXian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: "1"
        }
    }
    callback(key) {
        this.setState({
            keys: key
        })
    }
    render() {
        return (
            <Tabs onChange={this.callback.bind(this)} type="card">
                <TabPane tab="高炉离线系列" key="1" forceRender={false}>
                    <GaoLu keys={this.state.keys} />
                </TabPane>
               
            </Tabs>
        )
    }
}
