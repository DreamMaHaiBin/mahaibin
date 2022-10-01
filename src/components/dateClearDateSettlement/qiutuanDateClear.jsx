import React, { Component } from "react";
import './common.scss'
import {Input, Tooltip,Checkbox,Button } from "antd";
import { tableListDataShaojie } from '../util/shaojieTable'
// 球团日清日结
const str = "0.00"
const strFour = "0.0000"
export default class DateClearDateSettlementPellet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ListData:tableListDataShaojie
        }
    }
    mustNumber(e) {
        if (!e.target.value.replace(/[^\d^\.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')) {
            e.target.value = ''
        }

    }
    infoKuang(name, index) {
        return (e) => {
            const value =  e.target.value;
            const newData = this.state.ListData;
            newData[index][name] = value;
            // if(name === 'ssrcb' && index === 0){
            //     newData[index]['ssycb'] = value*30
            //     newData[index]['qcrcb'] = value + newData[index]['esrcb'] + newData[index]['ysrcb']
            //     console.log(newData[index]['ssycb'])
            // }
            // if(name === 'esrcb' && index === 0){
            //     newData[index]['esycb'] = value*30
            //     newData[index]['qcrcb'] = value + newData[index]['ysrcb'] + newData[index]['ssrcb']
            //     console.log(newData[index]['ssycb'])
            // }
            // if(name === 'ysrcb' && index === 0){
            //     newData[index]['ysycb'] = value*30
            //     newData[index]['qcrcb'] = value + newData[index]['esrcb'] + newData[index]['ssrcb']
            //     console.log(newData[index]['ssycb'])
            // }
            // if(name === 'qcycb' && index === 2 ){
            //     newData[index]['dj'] = value / newData[index]['qcrxh']
            // }
            // if(name === 'qcrxh' && index === 2 ){
            //     newData[index]['dj'] = newData[index]['qcyxh'] / value
            // }
            this.setState({ ListData: newData })
        }
    }
    cmputendData(){
        const dataComputed = JSON.parse(JSON.stringify(this.state.ListData))
        // dataComputed.forEach((element,index) => {
        //     if(index === 2 || index === 6 || index === 10 || index === 15 || index ===19 || index === 42 ) { 
        //         // 主要几个标黑的矿粉
        //         element['dj'] = element['qcycb'] / element['qcyxh'] // 全厂单价
        //         element['qcrxh'] = dataComputed[(index === 2 ? 6 : index + 1)]['qcrxh'] + dataComputed[(index === 2 ? 39 : index + 2)]['qcrxh']  + dataComputed[(index === 2 ? 43 : index + 3)]['qcrxh']// 全厂日消耗
        //         element['qcrxh'] = dataComputed[(index === 2 ? 6 : index + 1)]['qcrxh'] + dataComputed[(index === 2 ? 39 : index + 2)]['qcrxh']  + dataComputed[(index === 2 ? 43 : index + 3)]['qcrxh']// 全厂月消耗
        //         element['qcrcb'] = dataComputed[(index === 2 ? 6 : index + 1)]['qcrcb'] + dataComputed[(index === 2 ? 39 : index + 2)]['qcrcb']  + dataComputed[(index === 2 ? 43 : index + 3)]['qcrcb']// 全厂日成本
        //         element['qcyxh'] = dataComputed[(index === 2 ? 6 : index + 1)]['qcyxh'] + dataComputed[(index === 2 ? 39 : index + 2)]['qcyxh']  + dataComputed[(index === 2 ? 43 : index + 3)]['qcyxh']// 全厂月成本
        
        //         element['ysrxh'] = dataComputed[(index === 2 ? 6 : index + 1)]['ysrxh'] + dataComputed[(index === 2 ? 39 : index + 2)]['ysrxh']  + dataComputed[(index === 2 ? 43 : index + 3)]['ysrxh']// 一烧日消耗
        //         element['esyxh'] = dataComputed[(index === 2 ? 6 : index + 1)]['esyxh'] + dataComputed[(index === 2 ? 39 : index + 2)]['esyxh']  + dataComputed[(index === 2 ? 43 : index + 3)]['esyxh']// 一烧月消耗
        //         element['ysrcb'] = dataComputed[(index === 2 ? 6 : index + 1)]['ysrcb'] + dataComputed[(index === 2 ? 39 : index + 2)]['ysrcb']  + dataComputed[(index === 2 ? 43 : index + 3)]['ysrcb']// 一烧日成本
        //         element['ysycb'] = dataComputed[(index === 2 ? 6 : index + 1)]['ysycb'] + dataComputed[(index === 2 ? 39 : index + 2)]['ysycb']  + dataComputed[(index === 2 ? 43 : index + 3)]['ysycb']// 一烧月成本
        
        //         element['esrxh'] = dataComputed[(index === 2 ? 6 : index + 1)]['esrxh'] + dataComputed[(index === 2 ? 39 : index + 2)]['esrxh']  + dataComputed[(index === 2 ? 43 : index + 3)]['esrxh']// 二烧日消耗
        //         element['esyxh'] = dataComputed[(index === 2 ? 6 : index + 1)]['esyxh'] + dataComputed[(index === 2 ? 39 : index + 2)]['esyxh']  + dataComputed[(index === 2 ? 43 : index + 3)]['esyxh']// 二烧月消耗
        //         element['esrcb'] = dataComputed[(index === 2 ? 6 : index + 1)]['esrcb'] + dataComputed[(index === 2 ? 39 : index + 2)]['esrcb']  + dataComputed[(index === 2 ? 43 : index + 3)]['esrcb']// 二烧日成本
        //         element['esycb'] = dataComputed[(index === 2 ? 6 : index + 1)]['esycb'] + dataComputed[(index === 2 ? 39 : index + 2)]['esycb']  + dataComputed[(index === 2 ? 43 : index + 3)]['esycb']// 二烧月成本
        
        //         element['ssrxh'] = dataComputed[(index === 2 ? 6 : index + 1)]['ssrxh'] + dataComputed[(index === 2 ? 39 : index + 2)]['ssrxh']  + dataComputed[(index === 2 ? 43 : index + 3)]['ssrxh']// 二烧日消耗
        //         element['ssyxh'] = dataComputed[(index === 2 ? 6 : index + 1)]['ssyxh'] + dataComputed[(index === 2 ? 39 : index + 2)]['ssyxh']  + dataComputed[(index === 2 ? 43 : index + 3)]['ssyxh']// 二烧月消耗
        //         element['ssrcb'] = dataComputed[(index === 2 ? 6 : index + 1)]['ssrcb'] + dataComputed[(index === 2 ? 39 : index + 2)]['ssrcb']  + dataComputed[(index === 2 ? 43 : index + 3)]['ssrcb']// 二烧日成本
        //         element['ssycb'] = dataComputed[(index === 2 ? 6 : index + 1)]['ssycb'] + dataComputed[(index === 2 ? 39 : index + 2)]['ssycb']  + dataComputed[(index === 2 ? 43 : index + 3)]['ssycb']// 二烧月成本

        //     }
        //     if(index !== 0 || index !== 1 || index !== 2 || index !== 3  || index !== 7 || index !== 12 || index !== 12 || index !== 17 || index !== 40 || index !== 44 || index !== 54 || index !== 55 || index !== 60 || index !== 71 ){
        //         element['qcrcb'] =  element['dj'] *  element['qcrxh']
        //         element['qcycb'] =  element['dj'] *  element['qcyxh']

        //         element['ysrcb'] =  element['dj'] *  element['ysrxh']
        //         element['ysrcb'] =  element['dj'] *  element['ysyxh']
                
        //         element['esrcb'] =  element['dj'] *  element['esrxh']
        //         element['esrcb'] =  element['dj'] *  element['esyxh']

        //         element['ssrcb'] =  element['dj'] *  element['ssrxh']
        //         element['ssrcb'] =  element['dj'] *  element['ssyxh']

        //     }
        //     if(index === 44) {
        //         element['qcrxh'] =  this.sum(9)
        //         element['qcyxh'] =  this.sum(9)
        //         element['qcrcb'] =  this.sum(9)
        //         element['qcycb'] =  this.sum(9)

        //         element['ysrxh'] =  this.sum(9)
        //         element['ysyxh'] =  this.sum(9)
        //         element['ysrcb'] =  this.sum(9)
        //         element['ysycb'] =  this.sum(9)

        //         element['esrxh'] =  this.sum(9)
        //         element['esyxh'] =  this.sum(9)
        //         element['esrcb'] =  this.sum(9)
        //         element['esycb'] =  this.sum(9)

        //         element['ssrxh'] =  this.sum(9)
        //         element['ssyxh'] =  this.sum(9)
        //         element['ssrcb'] =  this.sum(9)
        //         element['ssycb'] =  this.sum(9)
        //     }
        //     // if(index === 60) {
        //     //     element['qcrxh'] =  this.sum(10)
        //     //     element['qcyxh'] =  this.sum(10)
        //     //     element['qcrcb'] =  this.sum(10)
        //     //     element['qcycb'] =  this.sum(10)

        //     //     element['ysrxh'] =  this.sum(10)
        //     //     element['ysyxh'] =  this.sum(10)
        //     //     element['ysrcb'] =  this.sum(10)
        //     //     element['ysycb'] =  this.sum(10)

        //     //     element['esrxh'] =  this.sum(10)
        //     //     element['esyxh'] =  this.sum(10)
        //     //     element['esrcb'] =  this.sum(10)
        //     //     element['esycb'] =  this.sum(10)

        //     //     element['ssrxh'] =  this.sum(10)
        //     //     element['ssyxh'] =  this.sum(10)
        //     //     element['ssrcb'] =  this.sum(10)
        //     //     element['ssycb'] =  this.sum(10)
        //     // }
        
        // });
        dataComputed[0]['ysycb'] =  dataComputed[0]['ysrcb'] * 30
        dataComputed[0]['esycb'] =  dataComputed[0]['esrcb'] * 30
        dataComputed[0]['ssycb'] =  dataComputed[0]['ssrcb'] * 30
        dataComputed[0]['qcycb'] =  dataComputed[0]['ysycb'] * dataComputed[0]['esycb'] + dataComputed[0]['ssycb']

        dataComputed[1]['qcycb'] =  dataComputed[3]['qcycb'] + dataComputed[54]['qcycb']
        dataComputed[1]['ysycb'] =  dataComputed[3]['ysycb'] + dataComputed[54]['ysycb']
        dataComputed[1]['esycb'] =  dataComputed[3]['esycb'] + dataComputed[54]['esycb']
        dataComputed[1]['ssycb'] =  dataComputed[3]['ssycb'] + dataComputed[54]['ssycb']

        this.setState({ ListData: dataComputed })
    }
    // 累加函数
     sum(num) {
        var sum=0; 
        for (var i=1;i<=num;i++){
            sum += i;
        }
        return sum;
    
    }
    render() {
        return (
            <div className="date-clear-date-settlemen-body">
                <table className="date-clear-date-settlemen-table">
                    <tbody>
                        <tr>
                            <td rowSpan="2">成本项目</td>
                            <td rowSpan="2">单位</td>
                            <td colSpan={5}>全厂</td>
                            <td colSpan={4}>一系列</td>
                            <td colSpan={4}>二系列</td>
                        </tr>
                        <tr>
                            <td>单价</td>
                            <td>日消耗</td>
                            <td>月消耗</td>
                            <td>日成本</td>
                            <td>月成本</td>
                            <td>日消耗</td>
                            <td>月消耗</td>
                            <td>日成本</td>
                            <td>月成本</td>
                            <td>日消耗</td>
                            <td>月消耗</td>
                            <td>日成本</td>
                            <td>月成本</td>
                        </tr>
                        {
                this.state.ListData.map((item, index) => {
                        if(index<31){
                            return (
                                <tr key={index} className={
                                    index === 0 ? 'date-clear-date-settlemen-table-blue' :
                                        index === 1 || index === 2 || index === 3 || index === 7 || index === 11 || index === 12 || index === 16 ? 'date-clear-date-settlemen-table-yellow' :
                                            'date-clear-date-settlemen-table-none'
                                } >
                                    <td><Input
                                        value={item.name}
                                        onChange={this.infoKuang("name", index).bind(this)}
                                    /></td>
                                    <td><Input
                                        value={item.dw}
                                        onChange={this.infoKuang("dw", index).bind(this)}
                                    >
                                    </Input>
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.dj === str || item.dj === 0 ? null : item.dj}
                                        onChange={this.infoKuang("dj", index).bind(this)}
                                        >
                                    </Input>
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.qcrxh === str || item.qcrxh === 0 ? null : item.qcrxh}
                                        onChange={this.infoKuang("qcrxh", index).bind(this)}
                                        >
                                    </Input>
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.qcyxh === str || item.qcyxh === 0 ? null : item.qcyxh}
                                        onChange={this.infoKuang("qcyxh", index).bind(this)}
                                        />
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.qcrcb === str || item.qcrcb === 0 ? null : item.qcrcb}
                                        onChange={this.infoKuang("qcrcb", index).bind(this)}
                                        />
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.qcycb === str || item.qcycb === 0 ? null : item.qcycb}
                                        onChange={this.infoKuang("qcycb", index).bind(this)}
                                        />
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.ysrxh === str || item.ysrxh === 0 ? null : item.ysrxh}
                                        onChange={this.infoKuang("ysrxh", index).bind(this)}
                                        />
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.ysyxh === str || item.ysyxh === 0 ? null : item.ysyxh}
                                        onChange={this.infoKuang("ysyxh", index).bind(this)}
                                        />
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.ysrcb === str || item.ysrcb === 0 ? null : item.ysrcb}
                                        onChange={this.infoKuang("ysrcb", index).bind(this)}
                                        />
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.ysycb === str || item.ysycb === 0 ? null : item.ysycb}
                                        onChange={this.infoKuang("ysycb", index).bind(this)}
                                        />
                                    </td>
                                   
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.ssrxh === str || item.ssrxh === 0 ? null : item.ssrxh}
                                        onChange={this.infoKuang("ssrxh", index).bind(this)}
                                        />
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.ssyxh === str || item.ssyxh === 0 ? null : item.ssyxh}
                                        onChange={this.infoKuang("ssyxh", index).bind(this)}
                                        />
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.ssrcb === str || item.ssrcb === 0 ? null : item.ssrcb}
                                        onChange={this.infoKuang("ssrcb", index).bind(this)}
                                        />
                                    </td>
                                    <td>
                                        <Input onKeyUp={this.mustNumber.bind(this)}
                                        value={item.ssycb === str || item.ssycb === 0 ? null : item.ssycb}
                                        onChange={this.infoKuang("ssycb", index).bind(this)}
                                        />
                                    </td>
                                </tr>
                            )
                        }
                    
                })
            }
                    </tbody>
                </table>
            </div>
        )
    }

}