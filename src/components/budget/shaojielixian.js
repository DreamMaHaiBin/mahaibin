import React, { Component } from "react";
import "./cossalculation.css"
import { Tabs } from 'antd';
import ShaoJie from "./lixian/shaojie"
import axios from "axios"
const { TabPane } = Tabs;
export default class ShaojieLiXian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: "",
            gaoluOne: [],
            gaoluTwo: [],
            gaoluThree: [],
        }
    }
    componentWillMount() {
        axios.get(`/api/estimate-ore/recent/?purpose=203`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            // console.log(res.data);      
            res.data.forEach((item) => {
                item.tFe = Number(item.tFe).toFixed(2);
                item.siO2 = Number(item.siO2).toFixed(2);     // 二氧化硅含量
                item.caO = Number(item.caO).toFixed(2);    // 氧化钙含量
                item.mgO = Number(item.mgO).toFixed(2);        // 氧化镁含量
                item.al2O3 = Number(item.al2O3).toFixed(2);    // 氧化铝含量
                item.loI = Number(item.loI).toFixed(2);     // 烧损
                item.feO = Number(item.feO).toFixed(2);        // 氧化铁含量
                item.k2O = Number(item.k2O).toFixed(4);       // 氧化钾含量
                item.na2O = Number(item.na2O).toFixed(4);       // 氧化钠含量
                item.znO = Number(item.znO).toFixed(4);         // 氧化锌含量
                item.s = Number(item.s).toFixed(4);         // 硫含量
                item.p = Number(item.p).toFixed(4);         // 磷含量
                item.tiO2 = Number(item.tiO2).toFixed(4);        // 氧化钛含量
                item.sRatio = Number(item.sRatio).toFixed(2);     // 入炉料筛下率
                item.price = Number(item.price).toFixed(2); // 价格
                item.ratio = Number(item.ratio).toFixed(2);        // 配比
                item.r = Number(item.r).toFixed(2);        // 配比
            })
            this.setState({
                gaoluOne: res.data
            })
        })
    }
    callback(key) {
        this.componentWillMount()
        this.setState({
            keys: key
        })

    }
    render() {
        return (
            <Tabs onChange={this.callback.bind(this)} type="card">
                <TabPane tab="烧结离线系列" key="1" forceRender={false}>
                    <ShaoJie
                        keys={this.state.keys}
                        gaoluThree={this.state.gaoluThree}
                        gaoluTwo={this.state.gaoluTwo}
                        gaoluOne={this.state.gaoluOne}
                    />
                </TabPane>
            </Tabs>

        )
    }
}

