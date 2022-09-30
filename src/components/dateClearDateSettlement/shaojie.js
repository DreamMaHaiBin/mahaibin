import React, { Component } from "react";
import {Input, Tooltip,Checkbox } from "antd";
import { tableListDataShaojie } from '../util/shaojieTable'
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
            const value =  e.target.value;
            const newData = this.state.ListData;
            newData[index][name] = value;
            if(name === 'ssrcb' && index === 0){
                newData[index]['ssycb'] = value*30
                newData[index]['qcrcb'] = value + newData[index]['esrcb'] + newData[index]['ysrcb']
                console.log(newData[index]['ssycb'])
            }
            if(name === 'esrcb' && index === 0){
                newData[index]['esycb'] = value*30
                newData[index]['qcrcb'] = value + newData[index]['ysrcb'] + newData[index]['ssrcb']
                console.log(newData[index]['ssycb'])
            }
            if(name === 'ysrcb' && index === 0){
                newData[index]['ysycb'] = value*30
                newData[index]['qcrcb'] = value + newData[index]['esrcb'] + newData[index]['ssrcb']
                console.log(newData[index]['ssycb'])
            }
            if(name === 'qcycb' && index === 2 ){
                newData[index]['dj'] = value / newData[index]['qcrxh']
            }
            if(name === 'qcrxh' && index === 2 ){
                newData[index]['dj'] = newData[index]['qcyxh'] / value
            }
            this.setState({ ListData: newData },()=>{
                console.log(this.state.ListData)
            })
        }
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
                            <td colSpan={4}>一烧</td>
                            <td colSpan={4}>二烧</td>
                            <td colSpan={4}>三烧</td>
                        </tr>
                        <tr>
                            <td>单价</td>
                            <td>日单耗</td>
                            <td>月单耗</td>
                            <td>日成本</td>
                            <td>月成本</td>
                            <td>日单耗</td>
                            <td>月单耗</td>
                            <td>日成本</td>
                            <td>月成本</td>
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
                                    value={item.esrxh === str || item.esrxh === 0 ? null : item.esrxh}
                                    onChange={this.infoKuang("esrxh", index).bind(this)}
                                    />
                                </td>
                                <td>
                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                    value={item.esyxh === str || item.esyxh === 0 ? null : item.esyxh}
                                    onChange={this.infoKuang("esyxh", index).bind(this)}
                                    />
                                </td>
                                <td>
                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                    value={item.esrcb === str || item.esrcb === 0 ? null : item.esrcb}
                                    onChange={this.infoKuang("esrcb", index).bind(this)}
                                    />
                                </td>
                                <td>
                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                    value={item.esycb === str || item.esycb === 0 ? null : item.esycb}
                                    onChange={this.infoKuang("esycb", index).bind(this)}
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
                    
                })
            }
              </tbody>
                </table>
            </div>
        )
    }
}