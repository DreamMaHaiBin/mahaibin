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

    changeTabaleData(name, index) {
        const refName = `${name}${index}`
        console.log(name, index, this.refs.refName );
        // const newData = this.state.data
        // newData[index][name] = value
        // this.setState({data:newData})
       
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
                                        <td><Input defaultValue={obj.name} ref={`name${index}`} onChange={() => this.changeTabaleData("name", index, obj.name)} /></td>
                                        <td><Input defaultValue={obj.dw} ref={`dw${index}`} onChange={() => this.changeTabaleData("dw", index)} /></td>
                                        <td><Input defaultValue={obj.dj} ref={`dj${index}`} onChange={() => this.changeTabaleData("dj", index, obj.dj)} /></td>
                                        <td><Input defaultValue={obj.qcrxh} ref={`qcrxh${index}`} onChange={() => this.changeTabaleData("qcrxh", index)} /></td>
                                        <td><Input defaultValue={obj.qcyxh} ref={`qcyxh${index}`} onChange={() => this.changeTabaleData("qcyxh", index)} /></td>
                                        <td><Input defaultValue={obj.qcrcb} ref={`qcrcb${index}`} onChange={() => this.changeTabaleData("qcrcb", index)} /></td>
                                        <td><Input defaultValue={obj.qcycb} ref={`qcycb${index}`} onChange={() => this.changeTabaleData("qcycb", index)} /></td>
                                        <td><Input defaultValue={obj.ysrxh} ref={`ysrxh${index}`} onChange={() => this.changeTabaleData("ysrxh", index)} /></td>
                                        <td><Input defaultValue={obj.ysyxh} r ef={`ysyxh${index}`}onChange={() => this.changeTabaleData("ysyxh", index)} /></td>
                                        <td><Input defaultValue={obj.ysrcb} ref={`ysrcb${index}`} onChange={() => this.changeTabaleData("ysrcb", index)} /></td>
                                        <td><Input defaultValue={obj.ysycb} ref={`ysycb${index}`} onChange={() => this.changeTabaleData("ysycb", index)} /></td>
                                        <td><Input defaultValue={obj.esrxh} ref={`esrxh${index}`} onChange={() => this.changeTabaleData("esrxh", index)} /></td>
                                        <td><Input defaultValue={obj.esyxh} ref={`esyxh${index}`} onChange={() => this.changeTabaleData("esyxh", index)} /></td>
                                        <td><Input defaultValue={obj.esrcb} ref={`esrcb${index}`} onChange={() => this.changeTabaleData("esrcb", index)} /></td>
                                        <td><Input defaultValue={obj.esycb} ref={`esycb${index}`} onChange={() => this.changeTabaleData("esycb", index)} /></td>
                                        <td><Input defaultValue={obj.ssrxh} ref={`ssrxh${index}`} onChange={() => this.changeTabaleData("ssrxh", index)} /></td>
                                        <td><Input defaultValue={obj.ssyxh} ref={`ssyxh${index}`} onChange={() => this.changeTabaleData("ssyxh", index)} /></td>
                                        <td><Input defaultValue={obj.ssrcb} ref={`ssrcb${index}`} onChange={() => this.changeTabaleData("ssrcb", index)} /></td>
                                        <td><Input defaultValue={obj.ssycb} ref={`ssycb${index}`} onChange={() => this.changeTabaleData("ssycb", index)} /></td>

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