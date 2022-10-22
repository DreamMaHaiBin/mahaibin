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
    infoKuang(name, index) {
        return (e) => {
                if (index === 0 || 
                    index === 1 || 
                    index === 2 || 
                    index === 3 || 
                    index === 7 || 
                    index === 11 || 
                    index === 12 || 
                    index === 16 || 
                    index === 39 || 
                    index === 43 || 
                    index === 59) {
                    return
                }else{
                    if (name === 'esrdh' || 
                        name === 'esydh' || 
                        name === 'ssrdh' || 
                        name === 'ssydh' || 
                        name === 'qcdj' || 
                        index === 70) {
                        const value = e.target.value;
                        const newData = this.state.ListData;
                        newData[index][name] = value;
                        // this.arrItemNumber(newData) // 改为数字类型
                        this.setState({ ListData: newData }, () => { console.log(this.state.ListData) })
                }
            } 

        }
    }
    componentDidMount() {
        this.initData()
        console.log(this.state.ListData)
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
                    ListData: this.saveTwoNumber(res.data.dos)
                })
            } else {
                this.setState({
                    ListData: this.saveTwoNumber(tableListDataShaojie)
                })
            }
        }).catch(error => {
            console.log(error)
            message.error("数据获取错，请稍后重试")
            this.setState({
                ListData: this.saveTwoNumber(tableListDataShaojie)
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
                dos: this.arrItemNumber(this.state.ListData)
            }
        }).then(res => {
            console.log(res)
            message.success("保存成功")
            // if (res.status === 200 && res.data && res.data.dos) {
            //     this.setState({
            //         ListData: this.saveTwoNumber(res.data.dos)
            //     })
            // } else {
            //     this.setState({
            //         ListData: tableListDataShaojie
            //     })
            // }

        }).catch(error => {
            console.log(error)
            message.error("数据保存失败，请稍后重试！")
        })
    }
    mustNumber(e) {
        if (!e.target.value.replace(/[^\d]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')) {
            e.target.value = ''
        }

    }
    arrItemNumber(Array) {
        Array.forEach((obj, index) => {
            obj.qcdj = String(obj.qcdj) === "NaN" || String(obj.qcdj) === "null" ? 0 : Number(obj.qcdj)
            obj.qcrdh = String(obj.qcrdh) === "NaN" || String(obj.qcrdh) === "null" ? 0 : Number(obj.qcrdh)
            obj.qcydh = String(obj.qcydh) === "NaN" || String(obj.qcydh) === "null" ? 0 : Number(obj.qcydh)
            obj.qcrcb = String(obj.qcrcb) === "NaN" || String(obj.qcrcb) === "null" ? 0 : Number(obj.qcrcb)
            obj.qcycb = String(obj.qcycb) === "NaN" || String(obj.qcycb) === "null" ? 0 : Number(obj.qcycb)
            obj.esrdh = String(obj.esrdh) === "NaN" || String(obj.esrdh) === "null" ? 0 : Number(obj.esrdh)
            obj.esydh = String(obj.esydh) === "NaN" || String(obj.esydh) === "null" ? 0 : Number(obj.esydh)
            obj.esrcb = String(obj.esrcb) === "NaN" || String(obj.esrcb) === "null" ? 0 : Number(obj.esrcb)
            obj.esycb = String(obj.esycb) === "NaN" || String(obj.esycb) === "null" ? 0 : Number(obj.esycb)
            obj.ssrdh = String(obj.ssrdh) === "NaN" || String(obj.ssrdh) === "null" ? 0 : Number(obj.ssrdh)
            obj.ssydh = String(obj.ssydh) === "NaN" || String(obj.ssydh) === "null" ? 0 : Number(obj.ssydh)
            obj.ssrcb = String(obj.ssrcb) === "NaN" || String(obj.ssrcb) === "null" ? 0 : Number(obj.ssrcb)
            obj.ssycb = String(obj.ssycb) === "NaN" || String(obj.ssycb) === "null" ? 0 : Number(obj.ssycb)
        })
        return Array
    }
    saveTwoNumber(Array) {
        Array.forEach((obj, index) => {
            obj.qcdj = Number(obj.qcdj).toFixed(2)
            obj.qcrdh = Number(obj.qcrdh).toFixed(4)
            obj.qcydh = Number(obj.qcydh).toFixed(4)
            obj.qcrcb = Number(obj.qcrcb).toFixed(2)
            obj.qcycb = Number(obj.qcycb).toFixed(2)
            obj.esrdh = Number(obj.esrdh).toFixed(4)
            obj.esydh = Number(obj.esydh).toFixed(4)
            obj.esrcb = Number(obj.esrcb).toFixed(2)
            obj.esycb = Number(obj.esycb).toFixed(2)
            obj.ssrdh = Number(obj.ssrdh).toFixed(4)
            obj.ssydh = Number(obj.ssydh).toFixed(4)
            obj.ssrcb = Number(obj.ssrcb).toFixed(2)
            obj.ssycb = Number(obj.ssycb).toFixed(2)
        })
        return Array
    }
    //    async cmputendData() {
    //         const dataComputed = JSON.parse(JSON.stringify(this.state.ListData))
    //         console.log(dataComputed)
    //         this.arrItemNumber(dataComputed)

    //         await dataComputed.forEach((element, index) => {
    //             if (index !== 1 || index !== 2 || index !== 3 || index !== 7 || index !== 11 || index !== 12 || index !== 16 || index !== 39 || index !== 43 || index !== 53 || index !== 54 || index !== 59 || index !== 70) {
    //                 element['qcrdh'] = element['esrdh'] + element['ssrdh']
    //                 element['qcydh'] = element['esydh'] + element['ssydh']
    //             }
    //         })
    //         await dataComputed.forEach((element, index) => {
    //             if (index !== 0 && index !== 1 && index !== 2 && index !== 3 && index !== 7 && index !== 11 && index !== 12 && index !== 16 && index !== 39 && index !== 43 && index !== 53 && index !== 54 && index !== 59 && index !== 70) {
    //                 // element['qcrdh'] = element['esrdh'] + element['ssrdh']
    //                 // element['qcydh'] = element['esydh'] + element['ssydh']

    //                 element['qcrcb'] = element['qcdj'] * element['qcrdh']
    //                 element['esrcb'] = element['qcdj'] * element['esrdh']
    //                 element['ssrcb'] = element['qcdj'] * element['ssrdh']


    //                 element['esycb'] = element['qcdj'] * element['esydh']
    //                 element['ssycb'] = element['qcdj'] * element['ssydh']
    //                 element['qcycb'] = element['qcdj'] * element['qcydh']

    //             }
    //         });

    //         await dataComputed.forEach((obj, index) => {
    //             if (index === 2 || index === 3 || index === 7 || index === 12 || index === 16 || index === 39 || index === 54) {
    //                 // 主要几个标黑的矿粉
    //                 console.log(dataComputed[(3)]['qcrdh']+dataComputed[(39)]['qcrdh']+dataComputed[(43)]['qcrdh'])
    //                 obj['qcrdh'] = dataComputed[(index + 1)]['qcrdh'] + dataComputed[index + 2]['qcrdh'] + dataComputed[index + 3]['qcrdh'] + (index === 54 ? dataComputed[index + 4]['qcrdh'] : 0)// 全厂日消耗
    //                 obj['qcrcb'] = dataComputed[(index + 1)]['qcrcb'] + dataComputed[index + 2]['qcrcb'] + dataComputed[index + 3]['qcrcb'] + (index === 54 ? dataComputed[index + 4]['qcrcb'] : 0)// 全厂日成本
    //                 obj['esrdh'] = dataComputed[(index + 1)]['esrdh'] + dataComputed[index + 2]['esrdh'] + dataComputed[index + 3]['esrdh'] + (index === 54 ? dataComputed[index + 4]['esrdh'] : 0)// 二烧日消耗
    //                 obj['esrcb'] = dataComputed[(index + 1)]['esrcb'] + dataComputed[index + 2]['esrcb'] + dataComputed[index + 3]['esrcb'] + (index === 54 ? dataComputed[index + 4]['esrcb'] : 0)// 二烧日成本
    //                 obj['ssrdh'] = dataComputed[(index + 1)]['ssrdh'] + dataComputed[index + 2]['ssrdh'] + dataComputed[index + 3]['ssrdh'] + (index === 54 ? dataComputed[index + 4]['ssrdh'] : 0)// 二烧日消耗
    //                 obj['ssrcb'] = dataComputed[(index + 1)]['ssrcb'] + dataComputed[index + 2]['ssrcb'] + dataComputed[index + 3]['ssrcb'] + (index === 54 ? dataComputed[index + 4]['ssrcb'] : 0)// 二烧日成本
    //                 // obj['qcdj'] = obj['qcycb'] / obj['qcydh'] // 全厂单价
    //                 obj['qcydh'] = dataComputed[(index + 1)]['qcydh'] + dataComputed[index + 2]['qcydh'] + dataComputed[index + 3]['qcydh'] + (index === 54 ? dataComputed[index + 4]['qcydh'] : 0)// 全厂月消耗
    //                 obj['qcycb'] = dataComputed[(index + 1)]['qcycb'] + dataComputed[index + 2]['qcycb'] + dataComputed[index + 3]['qcycb'] + (index === 54 ? dataComputed[index + 4]['qcycb'] : 0)// 全厂月成本
    //                 obj['esydh'] = dataComputed[(index + 1)]['esydh'] + dataComputed[index + 2]['esydh'] + dataComputed[index + 3]['esydh'] + (index === 54 ? dataComputed[index + 4]['esydh'] : 0)// 二烧月消耗
    //                 obj['esycb'] = dataComputed[(index + 1)]['esycb'] + dataComputed[index + 2]['esycb'] + dataComputed[index + 3]['esycb'] + (index === 54 ? dataComputed[index + 4]['esycb'] : 0)// 二烧月成本
    //                 obj['ssydh'] = dataComputed[(index + 1)]['ssydh'] + dataComputed[index + 2]['ssydh'] + dataComputed[index + 3]['ssydh'] + (index === 54 ? dataComputed[index + 4]['ssydh'] : 0)// 二烧月消耗
    //                 obj['ssycb'] = dataComputed[(index + 1)]['ssycb'] + dataComputed[index + 2]['ssycb'] + dataComputed[index + 3]['ssycb'] + (index === 54 ? dataComputed[index + 4]['ssycb'] : 0)// 二烧月成本

    //             }
    //             if (index === 43 || index === 59) {
    //                 obj['qcrdh'] = dataComputed[index + 1]['qcrdh'] + dataComputed[index + 2]['qcrdh'] + dataComputed[index + 3]['qcrdh'] + dataComputed[index + 4]['qcrdh'] + dataComputed[index + 5]['qcrdh'] + dataComputed[index + 6]['qcrdh'] + dataComputed[index + 7]['qcrdh'] + dataComputed[index + 8]['qcrdh'] + (index === 59 ? 0 : dataComputed[index + 9]['qcrdh'])
    //                 obj['qcrcb'] = dataComputed[index + 1]['qcrcb'] + dataComputed[index + 2]['qcrcb'] + dataComputed[index + 3]['qcrcb'] + dataComputed[index + 4]['qcrcb'] + dataComputed[index + 5]['qcrcb'] + dataComputed[index + 6]['qcrcb'] + dataComputed[index + 7]['qcrcb'] + dataComputed[index + 8]['qcrcb'] + (index === 59 ? 0 : dataComputed[index + 9]['qcrcb'])
    //                 obj['esrdh'] = dataComputed[index + 1]['esrdh'] + dataComputed[index + 2]['esrdh'] + dataComputed[index + 3]['esrdh'] + dataComputed[index + 4]['esrdh'] + dataComputed[index + 5]['esrdh'] + dataComputed[index + 6]['esrdh'] + dataComputed[index + 7]['esrdh'] + dataComputed[index + 8]['esrdh'] + (index === 59 ? 0 : dataComputed[index + 9]['esrdh'])
    //                 obj['esrcb'] = dataComputed[index + 1]['esrcb'] + dataComputed[index + 2]['esrcb'] + dataComputed[index + 3]['esrcb'] + dataComputed[index + 4]['esrcb'] + dataComputed[index + 5]['esrcb'] + dataComputed[index + 6]['esrcb'] + dataComputed[index + 7]['esrcb'] + dataComputed[index + 8]['esrcb'] + (index === 59 ? 0 : dataComputed[index + 9]['esrcb'])
    //                 obj['ssrdh'] = dataComputed[index + 1]['ssrdh'] + dataComputed[index + 2]['ssrdh'] + dataComputed[index + 3]['ssrdh'] + dataComputed[index + 4]['ssrdh'] + dataComputed[index + 5]['ssrdh'] + dataComputed[index + 6]['ssrdh'] + dataComputed[index + 7]['ssrdh'] + dataComputed[index + 8]['ssrdh'] + (index === 59 ? 0 : dataComputed[index + 9]['ssrdh'])
    //                 obj['ssrcb'] = dataComputed[index + 1]['ssrcb'] + dataComputed[index + 2]['ssrcb'] + dataComputed[index + 3]['ssrcb'] + dataComputed[index + 4]['ssrcb'] + dataComputed[index + 5]['ssrcb'] + dataComputed[index + 6]['ssrcb'] + dataComputed[index + 7]['ssrcb'] + dataComputed[index + 8]['ssrcb'] + (index === 59 ? 0 : dataComputed[index + 9]['ssrcb'])

    //                 obj['qcydh'] = dataComputed[index + 1]['qcydh'] + dataComputed[index + 2]['qcydh'] + dataComputed[index + 3]['qcydh'] + dataComputed[index + 4]['qcydh'] + dataComputed[index + 5]['qcydh'] + dataComputed[index + 6]['qcydh'] + dataComputed[index + 7]['qcydh'] + dataComputed[index + 8]['qcydh'] + (index === 59 ? 0 : dataComputed[index + 9]['qcydh'])
    //                 obj['qcycb'] = dataComputed[index + 1]['qcycb'] + dataComputed[index + 2]['qcycb'] + dataComputed[index + 3]['qcycb'] + dataComputed[index + 4]['qcycb'] + dataComputed[index + 5]['qcycb'] + dataComputed[index + 6]['qcycb'] + dataComputed[index + 7]['qcycb'] + dataComputed[index + 8]['qcycb'] + (index === 59 ? 0 : dataComputed[index + 9]['qcycb'])
    //                 obj['esydh'] = dataComputed[index + 1]['esydh'] + dataComputed[index + 2]['esydh'] + dataComputed[index + 3]['esydh'] + dataComputed[index + 4]['esydh'] + dataComputed[index + 5]['esydh'] + dataComputed[index + 6]['esydh'] + dataComputed[index + 7]['esydh'] + dataComputed[index + 8]['esydh'] + (index === 59 ? 0 : dataComputed[index + 9]['esydh'])
    //                 obj['esycb'] = dataComputed[index + 1]['esycb'] + dataComputed[index + 2]['esycb'] + dataComputed[index + 3]['esycb'] + dataComputed[index + 4]['esycb'] + dataComputed[index + 5]['esycb'] + dataComputed[index + 6]['esycb'] + dataComputed[index + 7]['esycb'] + dataComputed[index + 8]['esycb'] + (index === 59 ? 0 : dataComputed[index + 9]['esycb'])
    //                 obj['ssydh'] = dataComputed[index + 1]['ssydh'] + dataComputed[index + 2]['ssydh'] + dataComputed[index + 3]['ssydh'] + dataComputed[index + 4]['ssydh'] + dataComputed[index + 5]['ssydh'] + dataComputed[index + 6]['ssydh'] + dataComputed[index + 7]['ssydh'] + dataComputed[index + 8]['ssydh'] + (index === 59 ? 0 : dataComputed[index + 9]['ssydh'])
    //                 obj['ssycb'] = dataComputed[index + 1]['ssycb'] + dataComputed[index + 2]['ssycb'] + dataComputed[index + 3]['ssycb'] + dataComputed[index + 4]['ssycb'] + dataComputed[index + 5]['ssycb'] + dataComputed[index + 6]['ssycb'] + dataComputed[index + 7]['ssycb'] + dataComputed[index + 8]['ssycb'] + (index === 59 ? 0 : dataComputed[index + 9]['ssycb'])


    //             }
    //         })


    //         dataComputed.forEach((obj,index)=>{
    //             if(index ===2){
    //                 obj['qcrdh'] = dataComputed[(index + 1)]['qcrdh'] + dataComputed[39]['qcrdh'] + dataComputed[43]['qcrdh']
    //                 obj['qcrcb'] = dataComputed[(index + 1)]['qcrcb'] + dataComputed[39]['qcrcb'] + dataComputed[43]['qcrcb']
    //                 obj['esrdh'] = dataComputed[(index + 1)]['esrdh'] + dataComputed[39]['esrdh'] + dataComputed[43]['esrdh'] 
    //                 obj['esrcb'] = dataComputed[(index + 1)]['esrcb'] + dataComputed[39]['esrcb'] + dataComputed[43]['esrcb']
    //                 obj['ssrdh'] = dataComputed[(index + 1)]['ssrdh'] + dataComputed[39]['ssrdh'] + dataComputed[43]['ssrdh']
    //                 obj['ssrcb'] = dataComputed[(index + 1)]['ssrcb'] + dataComputed[39]['ssrcb'] + dataComputed[43]['ssrcb'] 
    //                 // obj['qcdj'] = obj['qcycb'] / obj['qcydh'] // 全厂单价
    //                 obj['qcydh'] = dataComputed[(index + 1)]['qcydh'] + dataComputed[39]['qcydh'] + dataComputed[43]['qcydh']
    //                 obj['qcycb'] = dataComputed[(index + 1)]['qcycb'] + dataComputed[39]['qcycb'] + dataComputed[43]['qcycb']
    //                 obj['esydh'] = dataComputed[(index + 1)]['esydh'] + dataComputed[39]['esydh'] + dataComputed[43]['esydh']
    //                 obj['esycb'] = dataComputed[(index + 1)]['esycb'] + dataComputed[39]['esycb'] + dataComputed[43]['esycb']
    //                 obj['ssydh'] = dataComputed[(index + 1)]['ssydh'] + dataComputed[39]['ssydh'] + dataComputed[43]['ssydh']
    //                 obj['ssycb'] = dataComputed[(index + 1)]['ssycb'] + dataComputed[39]['ssycb'] + dataComputed[43]['ssycb']
    //             }
    //         })


    //         await dataComputed.forEach((obj, index) => {
    //             if (index === 2 || index === 3 || index === 7 || index === 11 || index === 12 || index === 16 || index === 39 || index === 43 || index === 54) {
    //                 // console.log(obj['qcycb'] , obj['qcydh'])
    //                 if (obj['qcycb'] === 0 && obj['qcydh'] === 0) {
    //                     obj['qcdj'] = null
    //                 } else {
    //                     obj['qcdj'] = obj['qcycb'] / obj['qcydh'] // 全厂单价
    //                 }

    //             }
    //         })
    //         dataComputed[0]['esycb'] = dataComputed[0]['esrcb'] * 30
    //         dataComputed[0]['ssycb'] = dataComputed[0]['ssrcb'] * 30
    //         dataComputed[0]['qcrcb'] = dataComputed[0]['esrcb'] + dataComputed[0]['ssrcb']
    //         dataComputed[0]['qcycb'] = dataComputed[0]['esycb'] + dataComputed[0]['ssycb']

    //         dataComputed[1]['qcycb'] = dataComputed[2]['qcycb'] + dataComputed[53]['qcycb']
    //         // dataComputed[1]['ysycb'] = dataComputed[2]['ysycb'] + dataComputed[53]['ysycb']
    //         dataComputed[1]['esycb'] = dataComputed[2]['esycb'] + dataComputed[53]['esycb']
    //         dataComputed[1]['ssycb'] = dataComputed[2]['ssycb'] + dataComputed[53]['ssycb']
    //         console.log(dataComputed)
    //         await this.saveTwoNumber(dataComputed)
    //         this.setState({ ListData: dataComputed }, () => {
    //             message.success("计算成功！")
    //             console.log(this.state.ListData)
    //         })
    //     }
    // 计算函数
    async cmputendData() {
        await axios({
            method: "post",
            url: "/api/qcrqrjsj/",
            headers: {
                Authorization: sessionStorage.getItem("token")
            },
            data: {
                dos: this.arrItemNumber(this.state.ListData)
            }
        }).then((res) => {
            if (res.data && res.status === 200) {
                message.success("计算成功")
                if (res.status === 200 && res.data && res.data.dos) {
                    this.setState({
                        ListData: this.saveTwoNumber(res.data.dos)
                    })
                } else {
                    message.error("计算失败")
                }
            }
        }).catch((error) => {
            console.log(error)
            message.error("计算错误，请检查参数是否正确")
        })
    }
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
                                <td rowSpan="2" style={{ width: 70 }}>成本项目</td>
                                <td rowSpan="2" style={{ width: 40 }}>单位</td>
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
                                                index === 1 || index === 2 || index === 3 || index === 7 || index === 11 || index === 12 || index === 16 || index === 39 || index === 43 || index === 53 || index === 54 || index === 59 ? 'date-clear-date-settlemen-table-yellow' :
                                                    index === 70 ? "date-clear-date-settlemen-table-purple" : 'date-clear-date-settlemen-table-none'
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
                                                <Input
                                                    value={item.qcdj === str || item.qcdj === 0 ? null : item.qcdj}
                                                    onChange={this.infoKuang("qcdj", index).bind(this)}
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                >
                                                </Input>
                                            </td>
                                            <td>
                                                <Input
                                                    value={item.qcrdh === strFour || item.qcrdh === 0 ? null : item.qcrdh}
                                                    onChange={this.infoKuang("qcrdh", index).bind(this)}
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                >
                                                </Input>
                                            </td>
                                            <td>
                                                <Input
                                                    value={item.qcydh === strFour || item.qcydh === 0 ? null : item.qcydh}
                                                    onChange={this.infoKuang("qcydh", index).bind(this)}
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input

                                                    value={item.qcrcb === str || item.qcrcb === 0 ? null : item.qcrcb}
                                                    onChange={this.infoKuang("qcrcb", index).bind(this)}
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    value={item.qcycb === str || item.qcycb === 0 ? null : item.qcycb}
                                                    onChange={this.infoKuang("qcycb", index).bind(this)}
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                />
                                            </td>
                                            {/* <td>
                                                <Input 
                                                    value={item.ysrdh === str || item.ysrdh === 0 ? 0 : item.ysrdh}
                                                    onChange={this.infoKuang("ysrdh", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input 
                                                    value={item.ysydh === str || item.ysydh === 0 ? 0 : item.ysydh}
                                                    onChange={this.infoKuang("ysydh", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input 
                                                    value={item.ysrcb === str || item.ysrcb === 0 ? 0 : item.ysrcb}
                                                    onChange={this.infoKuang("ysrcb", index).bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input 
                                                    value={item.ysycb === str || item.ysycb === 0 ? 0 : item.ysycb}
                                                    onChange={this.infoKuang("ysycb", index).bind(this)}
                                                />
                                            </td> */}
                                            <td>
                                                <Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.esrdh === strFour || item.esrdh === 0 ? null : item.esrdh}
                                                    onChange={this.infoKuang("esrdh", index).bind(this)}

                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.esydh === strFour || item.esydh === 0 ? null : item.esydh}
                                                    onChange={this.infoKuang("esydh", index).bind(this)}

                                                />
                                            </td>
                                            <td>
                                                <Input

                                                    value={item.esrcb === str || item.esrcb === 0 ? null : item.esrcb}
                                                    onChange={this.infoKuang("esrcb", index).bind(this)}
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.esycb === str || item.esycb === 0 ? null : item.esycb}
                                                    onChange={this.infoKuang("esycb", index).bind(this)}

                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.ssrdh === strFour || item.ssrdh === 0 ? null : item.ssrdh}
                                                    onChange={this.infoKuang("ssrdh", index).bind(this)}

                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    value={item.ssydh === strFour || item.ssydh === 0 ? null : item.ssydh}
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    onChange={this.infoKuang("ssydh", index).bind(this)}

                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    value={item.ssrcb === str || item.ssrcb === 0 ? null : item.ssrcb}
                                                    onChange={this.infoKuang("ssrcb", index).bind(this)}
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    onKeyUp={this.mustNumber.bind(this)}
                                                    value={item.ssycb === str || item.ssycb === 0 ? null : item.ssycb}
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