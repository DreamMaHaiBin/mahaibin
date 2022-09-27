import React, { Component } from "react";
import './common.scss'
import { Input } from 'antd';
// 烧结日清日结
import { tableListDataShaojie } from '../util/shaojieTable'
export default class DateClearDateSettlement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: tableListDataShaojie
        }
        // this.changeTabaleData = this.changeTabaleData.bind(this)
    }

    changeTabaleData(name, index, value) {
        console.log(name, index, value);
        const newData = this.state.data
        newData[index][name] = value
        this.setState({data:newData})
       
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
                            <td>日消耗</td>
                            <td>月消耗</td>
                            <td>日成本</td>
                            <td>月成本</td>
                        </tr>
                        {
                            this.state.data.map((obj, index) => {
                                return (
                                    <tr key={index} className={
                                        index === 0 ? 'date-clear-date-settlemen-table-blue' :
                                            index === 1 || index === 2 || index === 3 || index === 7 || index === 11 || index === 12 || index === 16 ? 'date-clear-date-settlemen-table-yellow' :
                                                'date-clear-date-settlemen-table-none'
                                    }>
                                        <td><Input value={obj.name} onChange={() => this.changeTabaleData("name", index, obj.name)} /></td>
                                        <td><Input value={obj.dw} onChange={() => this.changeTabaleData("dw", index, obj.dw)} /></td>
                                        <td><Input value={obj.dj} onChange={() => this.changeTabaleData("dj", index, obj.dj)} /></td>
                                        <td><Input value={obj.qcrxh} onChange={() => this.changeTabaleData("qcrxh", index, obj.qcrxh)} /></td>
                                        <td><Input value={obj.qcyxh} onChange={() => this.changeTabaleData("qcyxh", index, obj.qcyxh)} /></td>
                                        <td><Input value={obj.qcrcb} onChange={() => this.changeTabaleData("qcrcb", index, obj.qcrcb)} /></td>
                                        <td><Input value={obj.qcycb} onChange={() => this.changeTabaleData("qcycb", index, obj.qcycb)} /></td>
                                        <td><Input value={obj.ysrxh} onChange={() => this.changeTabaleData("ysrxh", index, obj.ysrxh)} /></td>
                                        <td><Input value={obj.ysyxh} onChange={() => this.changeTabaleData("ysyxh", index, obj.ysyxh)} /></td>
                                        <td><Input value={obj.ysrcb} onChange={() => this.changeTabaleData("ysrcb", index, obj.ysrcb)} /></td>
                                        <td><Input value={obj.ysycb} onChange={() => this.changeTabaleData("ysycb", index, obj.ysycb)} /></td>
                                        <td><Input value={obj.esrxh} onChange={() => this.changeTabaleData("esrxh", index, obj.esrxh)} /></td>
                                        <td><Input value={obj.esyxh} onChange={() => this.changeTabaleData("esyxh", index, obj.esyxh)} /></td>
                                        <td><Input value={obj.esrcb} onChange={() => this.changeTabaleData("esrcb", index, obj.esrcb)} /></td>
                                        <td><Input value={obj.esycb} onChange={() => this.changeTabaleData("esycb", index, obj.esycb)} /></td>
                                        <td><Input value={obj.ssrxh} onChange={() => this.changeTabaleData("ssrxh", index, obj.ssrxh)} /></td>
                                        <td><Input value={obj.ssyxh} onChange={() => this.changeTabaleData("ssyxh", index, obj.ssyxh)} /></td>
                                        <td><Input value={obj.ssrcb} onChange={() => this.changeTabaleData("ssrcb", index, obj.ssrcb)} /></td>
                                        <td><Input value={obj.ssycb} onChange={() => this.changeTabaleData("ssycb", index, obj.ssycb)} /></td>

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