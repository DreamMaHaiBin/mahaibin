import React, { Component } from "react";
import { Input, Tooltip, message, Button } from "antd";
import { tableListDataShaojie } from '../util/shaojieTable'
import axios from "axios";
import './common.scss'
const str = "0.00"
const strFour = "0.0000"
export default class DateClearDateSettlement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListData: tableListDataShaojie,

        }
    }
    mustNumber(e) {
        if (!e.target.value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')) {
            e.target.value = ''
        }

    }
    infoKuang(name, index) {
        return (e) => {
            const value = e.target.value;
            const newData = this.state.ListData;
            newData[index][name] = value;
            this.setState({ ListData: newData })
        }
    }
    componentDidMount() {
        this.initData()
    }
    async initData() {
        await axios({
            method: "get",
            url: "/api/rqrjsj/",
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200 && res.data && res.data.dos) {
                this.setState({
                    ListData: res.data.dos
                })
            } else {
                this.setState({
                    ListData: tableListDataShaojie
                })
            }
        }).catch(error => {
            console.log(error)
            message.error("数据获取错，请稍后重试")
            this.setState({
                ListData: tableListDataShaojie
            })
        })
    }
    saveData() {
        axios({
            method: "post",
            url: "/api/rqrjsj/",
            headers: {
                Authorization: sessionStorage.getItem("token")
            },
            data: {
                dos: this.state.ListData
            }
        }).then(res => {
            console.log(res)
            message.success("保持成功")
            if (res.status === 200 && res.data && res.data.dos) {
                this.setState({
                    ListData: res.data.dos
                })
            } else {
                this.setState({
                    ListData: tableListDataShaojie
                })
            }

        }).catch(error => {
            console.log(error)
            message.error("数据保存失败，请稍后重试！")
        })
    }
    cmputendData() {
        const dataComputed = JSON.parse(JSON.stringify(this.state.ListData))
        dataComputed.forEach((element, index) => {
            if (index !== 0 || index !== 1 || index !== 2 || index !== 3 || index !== 7 || index !== 12 || index !== 12 || index !== 17 || index !== 40 || index !== 44 || index !== 54 || index !== 55 || index !== 60 || index !== 71) {
                element['qcrcb'] = element['qcdj'] * element['qcrdh']
                element['qcycb'] = element['qcdj'] * element['qcydh']

                // element['ysrcb'] = element['qcdj'] * element['ysrdh']
                // element['ysrcb'] = element['qcdj'] * element['ysydh']

                element['esrcb'] = element['qcdj'] * element['esrdh']
                element['esrcb'] = element['qcdj'] * element['esydh']

                element['ssrcb'] = element['qcdj'] * element['ssrdh']
                element['ssrcb'] = element['qcdj'] * element['ssydh']

            }
        });
        dataComputed.forEach((obj, index) => {
            if (index === 2 || index === 3 || index === 7 || index === 12 || index === 16 || index === 29 || index === 39 || index === 54) {
                // 主要几个标黑的矿粉
                obj['qcrdh'] = dataComputed[(index + 1)]['qcrdh'] + dataComputed[(index === 2 ? 39 : index + 2)]['qcrdh'] + dataComputed[(index === 2 ? 43 : index + 3)]['qcrdh'] + (index === 54 ? dataComputed[index + 4]['qcrdh'] : 0)// 全厂日消耗
                obj['qcydh'] = dataComputed[(index + 1)]['qcydh'] + dataComputed[(index === 2 ? 39 : index + 2)]['qcydh'] + dataComputed[(index === 2 ? 43 : index + 3)]['qcydh'] + (index === 54 ? dataComputed[index + 4]['qcydh'] : 0)// 全厂月消耗
                obj['qcrcb'] = dataComputed[(index + 1)]['qcrcb'] + dataComputed[(index === 2 ? 39 : index + 2)]['qcrcb'] + dataComputed[(index === 2 ? 43 : index + 3)]['qcrcb'] + (index === 54 ? dataComputed[index + 4]['qcrcb'] : 0)// 全厂日成本
                obj['qcycb'] = dataComputed[(index + 1)]['qcycb'] + dataComputed[(index === 2 ? 39 : index + 2)]['qcycb'] + dataComputed[(index === 2 ? 43 : index + 3)]['qcycb'] + (index === 54 ? dataComputed[index + 4]['qcycb'] : 0)// 全厂月成本

                // obj['ysrdh'] = dataComputed[(index + 1)]['ysrdh'] + dataComputed[(index === 2 ? 39 : index + 2)]['ysrdh'] + dataComputed[(index === 2 ? 43 : index + 3)]['ysrdh'] + (index === 54 ? dataComputed[index + 4]['ysrdh'] : 0)// 一烧日消耗
                // obj['ysydh'] = dataComputed[(index + 1)]['ysydh'] + dataComputed[(index === 2 ? 39 : index + 2)]['ysydh'] + dataComputed[(index === 2 ? 43 : index + 3)]['ysydh'] + (index === 54 ? dataComputed[index + 4]['ysydh'] : 0)// 一烧月消耗
                // obj['ysrcb'] = dataComputed[(index + 1)]['ysrcb'] + dataComputed[(index === 2 ? 39 : index + 2)]['ysrcb'] + dataComputed[(index === 2 ? 43 : index + 3)]['ysrcb'] + (index === 54 ? dataComputed[index + 4]['ysrcb'] : 0)// 一烧日成本
                // obj['ysycb'] = dataComputed[(index + 1)]['ysycb'] + dataComputed[(index === 2 ? 39 : index + 2)]['ysycb'] + dataComputed[(index === 2 ? 43 : index + 3)]['ysycb'] + (index === 54 ? dataComputed[index + 4]['ysycb'] : 0)// 一烧月成本

                obj['esrdh'] = dataComputed[(index + 1)]['esrdh'] + dataComputed[(index === 2 ? 39 : index + 2)]['esrdh'] + dataComputed[(index === 2 ? 43 : index + 3)]['esrdh'] + (index === 54 ? dataComputed[index + 4]['esrdh'] : 0)// 二烧日消耗
                obj['esydh'] = dataComputed[(index + 1)]['esydh'] + dataComputed[(index === 2 ? 39 : index + 2)]['esydh'] + dataComputed[(index === 2 ? 43 : index + 3)]['esydh'] + (index === 54 ? dataComputed[index + 4]['esydh'] : 0)// 二烧月消耗
                obj['esrcb'] = dataComputed[(index + 1)]['esrcb'] + dataComputed[(index === 2 ? 39 : index + 2)]['esrcb'] + dataComputed[(index === 2 ? 43 : index + 3)]['esrcb'] + (index === 54 ? dataComputed[index + 4]['esrcb'] : 0)// 二烧日成本
                obj['esycb'] = dataComputed[(index + 1)]['esycb'] + dataComputed[(index === 2 ? 39 : index + 2)]['esycb'] + dataComputed[(index === 2 ? 43 : index + 3)]['esycb'] + (index === 54 ? dataComputed[index + 4]['esycb'] : 0)// 二烧月成本

                obj['ssrdh'] = dataComputed[(index + 1)]['ssrdh'] + dataComputed[(index === 2 ? 39 : index + 2)]['ssrdh'] + dataComputed[(index === 2 ? 43 : index + 3)]['ssrdh'] + (index === 54 ? dataComputed[index + 4]['ssrdh'] : 0)// 二烧日消耗
                obj['ssydh'] = dataComputed[(index + 1)]['ssydh'] + dataComputed[(index === 2 ? 39 : index + 2)]['ssydh'] + dataComputed[(index === 2 ? 43 : index + 3)]['ssydh'] + (index === 54 ? dataComputed[index + 4]['ssydh'] : 0)// 二烧月消耗
                obj['ssrcb'] = dataComputed[(index + 1)]['ssrcb'] + dataComputed[(index === 2 ? 39 : index + 2)]['ssrcb'] + dataComputed[(index === 2 ? 43 : index + 3)]['ssrcb'] + (index === 54 ? dataComputed[index + 4]['ssrcb'] : 0)// 二烧日成本
                obj['ssycb'] = dataComputed[(index + 1)]['ssycb'] + dataComputed[(index === 2 ? 39 : index + 2)]['ssycb'] + dataComputed[(index === 2 ? 43 : index + 3)]['ssycb'] + (index === 54 ? dataComputed[index + 4]['ssycb'] : 0)// 二烧月成本
                obj['qcdj'] = obj['qcycb'] / obj['qcydh'] // 全厂单价

            }
            if (index === 43 || index === 59) {
                obj['qcrdh'] = dataComputed[index + 1]['qcrdh'] + dataComputed[index + 2]['qcrdh'] + dataComputed[index + 3]['qcrdh'] + dataComputed[index + 4]['qcrdh'] + dataComputed[index + 5]['qcrdh'] + dataComputed[index + 6]['qcrdh'] + dataComputed[index + 7]['qcrdh'] + dataComputed[index + 8]['qcrdh'] + (index === 59 ? 0 : dataComputed[index + 9]['qcrdh'])
                obj['qcydh'] = dataComputed[index + 1]['qcydh'] + dataComputed[index + 2]['qcydh'] + dataComputed[index + 3]['qcydh'] + dataComputed[index + 4]['qcydh'] + dataComputed[index + 5]['qcydh'] + dataComputed[index + 6]['qcydh'] + dataComputed[index + 7]['qcydh'] + dataComputed[index + 8]['qcydh'] + (index === 59 ? 0 : dataComputed[index + 9]['qcydh'])
                obj['qcrcb'] = dataComputed[index + 1]['qcrcb'] + dataComputed[index + 2]['qcrcb'] + dataComputed[index + 3]['qcrcb'] + dataComputed[index + 4]['qcrcb'] + dataComputed[index + 5]['qcrcb'] + dataComputed[index + 6]['qcrcb'] + dataComputed[index + 7]['qcrcb'] + dataComputed[index + 8]['qcrcb'] + (index === 59 ? 0 : dataComputed[index + 9]['qcrcb'])
                obj['qcycb'] = dataComputed[index + 1]['qcycb'] + dataComputed[index + 2]['qcycb'] + dataComputed[index + 3]['qcycb'] + dataComputed[index + 4]['qcycb'] + dataComputed[index + 5]['qcycb'] + dataComputed[index + 6]['qcycb'] + dataComputed[index + 7]['qcycb'] + dataComputed[index + 8]['qcycb'] + (index === 59 ? 0 : dataComputed[index + 9]['qcycb'])

                // obj['ysrdh'] = dataComputed[index + 1]['ysrdh'] + dataComputed[index + 2]['ysrdh'] + dataComputed[index + 3]['ysrdh'] + dataComputed[index + 4]['ysrdh'] + dataComputed[index + 5]['ysrdh'] + dataComputed[index + 6]['ysrdh'] + dataComputed[index + 7]['ysrdh'] + dataComputed[index + 8]['ysrdh'] + (index === 59 ? 0 : dataComputed[index + 9]['ysrdh'])
                // obj['ysydh'] = dataComputed[index + 1]['ysydh'] + dataComputed[index + 2]['ysydh'] + dataComputed[index + 3]['ysydh'] + dataComputed[index + 4]['ysydh'] + dataComputed[index + 5]['ysydh'] + dataComputed[index + 6]['ysydh'] + dataComputed[index + 7]['ysydh'] + dataComputed[index + 8]['ysydh'] + (index === 59 ? 0 : dataComputed[index + 9]['ysydh'])
                // obj['ysrcb'] = dataComputed[index + 1]['ysrcb'] + dataComputed[index + 2]['ysrcb'] + dataComputed[index + 3]['ysrcb'] + dataComputed[index + 4]['ysrcb'] + dataComputed[index + 5]['ysrcb'] + dataComputed[index + 6]['ysrcb'] + dataComputed[index + 7]['ysrcb'] + dataComputed[index + 8]['ysrcb'] + (index === 59 ? 0 : dataComputed[index + 9]['ysrcb'])
                // obj['ysycb'] = dataComputed[index + 1]['ysycb'] + dataComputed[index + 2]['ysycb'] + dataComputed[index + 3]['ysycb'] + dataComputed[index + 4]['ysycb'] + dataComputed[index + 5]['ysycb'] + dataComputed[index + 6]['ysycb'] + dataComputed[index + 7]['ysycb'] + dataComputed[index + 8]['ysycb'] + (index === 59 ? 0 : dataComputed[index + 9]['ysycb'])

                obj['esrdh'] = dataComputed[index + 1]['esrdh'] + dataComputed[index + 2]['esrdh'] + dataComputed[index + 3]['esrdh'] + dataComputed[index + 4]['esrdh'] + dataComputed[index + 5]['esrdh'] + dataComputed[index + 6]['esrdh'] + dataComputed[index + 7]['esrdh'] + dataComputed[index + 8]['esrdh'] + (index === 59 ? 0 : dataComputed[index + 9]['esrdh'])
                obj['esydh'] = dataComputed[index + 1]['esydh'] + dataComputed[index + 2]['esydh'] + dataComputed[index + 3]['esydh'] + dataComputed[index + 4]['esydh'] + dataComputed[index + 5]['esydh'] + dataComputed[index + 6]['esydh'] + dataComputed[index + 7]['esydh'] + dataComputed[index + 8]['esydh'] + (index === 59 ? 0 : dataComputed[index + 9]['esydh'])
                obj['esrcb'] = dataComputed[index + 1]['esrcb'] + dataComputed[index + 2]['esrcb'] + dataComputed[index + 3]['esrcb'] + dataComputed[index + 4]['esrcb'] + dataComputed[index + 5]['esrcb'] + dataComputed[index + 6]['esrcb'] + dataComputed[index + 7]['esrcb'] + dataComputed[index + 8]['esrcb'] + (index === 59 ? 0 : dataComputed[index + 9]['esrcb'])
                obj['esycb'] = dataComputed[index + 1]['esycb'] + dataComputed[index + 2]['esycb'] + dataComputed[index + 3]['esycb'] + dataComputed[index + 4]['esycb'] + dataComputed[index + 5]['esycb'] + dataComputed[index + 6]['esycb'] + dataComputed[index + 7]['esycb'] + dataComputed[index + 8]['esycb'] + (index === 59 ? 0 : dataComputed[index + 9]['esycb'])

                obj['ssrdh'] = dataComputed[index + 1]['ssrdh'] + dataComputed[index + 2]['ssrdh'] + dataComputed[index + 3]['ssrdh'] + dataComputed[index + 4]['ssrdh'] + dataComputed[index + 5]['ssrdh'] + dataComputed[index + 6]['ssrdh'] + dataComputed[index + 7]['ssrdh'] + dataComputed[index + 8]['ssrdh'] + (index === 59 ? 0 : dataComputed[index + 9]['ssrdh'])
                obj['ssydh'] = dataComputed[index + 1]['ssydh'] + dataComputed[index + 2]['ssydh'] + dataComputed[index + 3]['ssydh'] + dataComputed[index + 4]['ssydh'] + dataComputed[index + 5]['ssydh'] + dataComputed[index + 6]['ssydh'] + dataComputed[index + 7]['ssydh'] + dataComputed[index + 8]['ssydh'] + (index === 59 ? 0 : dataComputed[index + 9]['ssydh'])
                obj['ssrcb'] = dataComputed[index + 1]['ssrcb'] + dataComputed[index + 2]['ssrcb'] + dataComputed[index + 3]['ssrcb'] + dataComputed[index + 4]['ssrcb'] + dataComputed[index + 5]['ssrcb'] + dataComputed[index + 6]['ssrcb'] + dataComputed[index + 7]['ssrcb'] + dataComputed[index + 8]['ssrcb'] + (index === 59 ? 0 : dataComputed[index + 9]['ssrcb'])
                obj['ssycb'] = dataComputed[index + 1]['ssycb'] + dataComputed[index + 2]['ssycb'] + dataComputed[index + 3]['ssycb'] + dataComputed[index + 4]['ssycb'] + dataComputed[index + 5]['ssycb'] + dataComputed[index + 6]['ssycb'] + dataComputed[index + 7]['ssycb'] + dataComputed[index + 8]['ssycb'] + (index === 59 ? 0 : dataComputed[index + 9]['ssycb'])
            }
            if (index === 2 || index === 3 || index === 7 || index === 11 || index === 12 || index === 16 || index === 39 || index === 43 || index === 54) {
                obj['qcdj'] = obj['qcycb'] / obj['qcydh'] // 全厂单价
            }
   
        })

        // dataComputed[0]['ysycb'] = dataComputed[0]['ysrcb'] * 30
        dataComputed[0]['esycb'] = dataComputed[0]['esrcb'] * 30
        dataComputed[0]['ssycb'] = dataComputed[0]['ssrcb'] * 30
        // dataComputed[0]['qcycb'] = dataComputed[0]['ysycb'] + dataComputed[0]['esycb'] + dataComputed[0]['ssycb']
        dataComputed[0]['qcycb'] = dataComputed[0]['esycb'] + dataComputed[0]['ssycb']

        dataComputed[1]['qcycb'] = dataComputed[2]['qcycb'] + dataComputed[53]['qcycb']
        // dataComputed[1]['ysycb'] = dataComputed[2]['ysycb'] + dataComputed[53]['ysycb']
        dataComputed[1]['esycb'] = dataComputed[2]['esycb'] + dataComputed[53]['esycb']
        dataComputed[1]['ssycb'] = dataComputed[2]['ssycb'] + dataComputed[53]['ssycb']

        dataComputed.forEach(obj=>{
            obj.qcrdh = String(obj.qcrdh) === "NaN" || String(obj.qcrdh) === "null" ? null : obj.qcrdh.toFixed(4)
            obj.qcydh = String(obj.qcydh) === "NaN" || String(obj.qcydh) === "null" ? null : obj.qcydh.toFixed(4)
            obj.qcrcb = String(obj.qcrcb) === "NaN" || String(obj.qcrcb) === "null" ? null : obj.qcrcb.toFixed(2)
            obj.qcycb = String(obj.qcycb) === "NaN" || String(obj.qcycb) === "null" ? null : obj.qcycb.toFixed(2)
            obj.esrdh = String(obj.esrdh) === "NaN" || String(obj.esrdh) === "null" ? null : obj.esrdh.toFixed(4)
            obj.esydh = String(obj.esydh) === "NaN" || String(obj.esydh) === "null" ? null : obj.esydh.toFixed(4)
            obj.esrcb = String(obj.esrcb) === "NaN" || String(obj.esrcb) === "null" ? null : obj.esrcb.toFixed(2)
            obj.esycb = String(obj.esycb) === "NaN" || String(obj.esycb) === "null" ? null : obj.esycb.toFixed(2)
            obj.ssrdh = String(obj.ssrdh) === "NaN" || String(obj.ssrdh) === "null" ? null : obj.ssrdh.toFixed(4)
            obj.ssydh = String(obj.ssydh) === "NaN" || String(obj.ssydh) === "null" ? null : obj.ssydh.toFixed(4)
            obj.ssrcb = String(obj.ssrcb) === "NaN" || String(obj.ssrcb) === "null" ? null : obj.ssrcb.toFixed(2)
            obj.ssycb = String(obj.ssycb) === "NaN" || String(obj.ssycb) === "null" ? null : obj.ssycb.toFixed(2)
        })
        this.setState({ ListData: dataComputed }, () => { message.success("计算成功！") })
    }
    // 累加函数
    sum(num) {
        var sum = 0;
        for (var i = 1; i <= num; i++) {
            sum += i;
        }
        return sum;

    }
    render() {
        return (
            <div className="date-clear-date-settlemen-body">
                <div className="date-clear-date-settlemen-title">
                    <Button type="primary" onClick={this.cmputendData.bind(this)}>计算</Button>
                    <Button type="primary" onClick={this.saveData.bind(this)}>保存</Button>
                </div>
                <div className="date-clear-date-settlemen-div">
                    <table className="date-clear-date-settlemen-table">
                        <tbody>
                            <tr>
                                <td rowSpan="2" style={{width:70}}>成本项目</td>
                                <td rowSpan="2" style={{width:40}}>单位</td>
                                <td colSpan={5}>全厂</td>
                                {/* <td colSpan={4}>一烧</td> */}
                                <td colSpan={4}>二烧</td>
                                <td colSpan={4}>三烧</td>
                            </tr>
                            <tr>
                                <td>单价</td>
                                <td>日单耗</td>
                                <td>月单耗</td>
                                <td>日成本</td>
                                <td>月成本</td>
                                {/* <td>日单耗</td>
                                <td>月单耗</td>
                                <td>日成本</td>
                                <td>月成本</td> */}
                                <td>日单耗</td>
                                <td>月单耗</td>
                                <td>日成本</td>
                                <td>月成本</td>
                                <td>日单耗</td>
                                <td>月单耗</td>
                                <td>日成本</td>
                                <td>月成本</td>
                            </tr>
                            {
                                this.state.ListData.map((item, index) => {
                                    return (
                                        <tr key={index} className={
                                            index === 0 ? 'date-clear-date-settlemen-table-blue' :
                                                index === 1 || index === 2 || index === 3 || index === 7 || index === 11 || index === 12 || index === 16 || index === 39 || index === 43 || index === index + 9 || index === 54 || index === 59 ? 'date-clear-date-settlemen-table-yellow' :
                                                    'date-clear-date-settlemen-table-none'
                                        } >
                                            <td><Input
                                                value={item.name}
                                                onChange={this.infoKuang("name", index).bind(this)}
                                            /></td>
                                            {/* <td><Input
                                                value={item.dw}
                                                onChange={this.infoKuang("dw", index).bind(this)}
                                            >
                                            </Input>
                                            </td> */}
                                            <td>
                                                {
                                                    index === 1 || index === 2 || index === 3 || index === 53 || index === 59 || index === 70 ? '元' : '吨'
                                                }
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.qcdj === str || item.qcdj === 0 ? NaN : item.qcdj}
                                                    onChange={this.infoKuang("qcdj", index).bind(this)}
                                                >
                                                </Input>
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.qcrdh === str || item.qcrdh === 0 ? NaN : item.qcrdh}
                                                    onChange={this.infoKuang("qcrdh", index).bind(this)}
                                                >
                                                </Input>
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.qcydh === str || item.qcydh === 0 ? NaN : item.qcydh}
                                                    onChange={this.infoKuang("qcydh", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.qcrcb === str || item.qcrcb === 0 ? NaN : item.qcrcb}
                                                    onChange={this.infoKuang("qcrcb", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.qcycb === str || item.qcycb === 0 ? NaN : item.qcycb}
                                                    onChange={this.infoKuang("qcycb", index).bind(this)}
                                                />
                                            </td>
                                            {/* <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.ysrdh === str || item.ysrdh === 0 ? NaN : item.ysrdh}
                                                    onChange={this.infoKuang("ysrdh", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.ysydh === str || item.ysydh === 0 ? NaN : item.ysydh}
                                                    onChange={this.infoKuang("ysydh", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.ysrcb === str || item.ysrcb === 0 ? NaN : item.ysrcb}
                                                    onChange={this.infoKuang("ysrcb", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.ysycb === str || item.ysycb === 0 ? NaN : item.ysycb}
                                                    onChange={this.infoKuang("ysycb", index).bind(this)}
                                                />
                                            </td> */}
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.esrdh === str || item.esrdh === 0 ? NaN : item.esrdh}
                                                    onChange={this.infoKuang("esrdh", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.esydh === str || item.esydh === 0 ? NaN : item.esydh}
                                                    onChange={this.infoKuang("esydh", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.esrcb === str || item.esrcb === 0 ? NaN : item.esrcb}
                                                    onChange={this.infoKuang("esrcb", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.esycb === str || item.esycb === 0 ? NaN : item.esycb}
                                                    onChange={this.infoKuang("esycb", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.ssrdh === str || item.ssrdh === 0 ? NaN : item.ssrdh}
                                                    onChange={this.infoKuang("ssrdh", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.ssydh === str || item.ssydh === 0 ? NaN : item.ssydh}
                                                    onChange={this.infoKuang("ssydh", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.ssrcb === str || item.ssrcb === 0 ? NaN : item.ssrcb}
                                                    onChange={this.infoKuang("ssrcb", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.ssycb === str || item.ssycb === 0 ? NaN : item.ssycb}
                                                    onChange={this.infoKuang("ssycb", index).bind(this)}
                                                />
                                            </td>
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}