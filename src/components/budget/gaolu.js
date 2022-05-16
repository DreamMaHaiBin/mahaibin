import React, { Component } from "react";
import "./cossalculation.css"
import BlastFurnaceOne from "./gaoluone";
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default class BlastFurnace extends Component {
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
                {
                    window.location.search ? <TabPane tab="高炉" key="1" forceRender={false}>
                        <BlastFurnaceOne keys={this.state.keys} />
                    </TabPane> : <TabPane tab="高炉一系列" key="1" forceRender={false}>
                        <BlastFurnaceOne keys={this.state.keys} />
                    </TabPane>
                }
                {
                    window.location.search ? null : <TabPane tab="高炉二系列" key="2" forceRender={false} >
                        <BlastFurnaceOne keys={this.state.keys} />
                    </TabPane>
                }
                {
                    window.location.search ? null : <TabPane tab="高炉三系列" key="3" forceRender={false}>
                        <BlastFurnaceOne keys={this.state.keys} />
                    </TabPane>
                }
            </Tabs>
        )
    }
}
