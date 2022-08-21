import React, { Component } from "react";
import './common.scss'
import { tableListData } from '../util/listLable'
// 高炉日清日结
export default class DateClearDateSettlementFurnace extends Component {
    constructor(props) {
        super(props)
        this.state = {

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
                            <td colSpan={4}>一高炉</td>
                            <td colSpan={4}>二高炉</td>
                            <td colSpan={4}>三高炉</td>
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
                            tableListData.map((obj, index) => {
                                return (
                                    <tr key={index} className={
                                        index === 0 ? 'date-clear-date-settlemen-table-blue' :
                                        index === 1 || index === 2 || index === 3 || index === 26 || index === 30 || index === 34 ? 'date-clear-date-settlemen-table-yellow' :
                                        'date-clear-date-settlemen-table-none'
                                    }>
                                        <td>{obj.name}</td>
                                        <td>{obj.dw}</td>
                                        <td>{obj.dj}</td>
                                        <td>{obj.qcrxh}</td>
                                        <td>{obj.qcyxh}</td>
                                        <td>{obj.qcrcb}</td>
                                        <td>{obj.qcycb}</td>
                                        <td>{obj.ysrxh}</td>
                                        <td>{obj.ysyxh}</td>
                                        <td>{obj.ysrcb}</td>
                                        <td>{obj.ysycb}</td>
                                        <td>{obj.esrxh}</td>
                                        <td>{obj.esyxh}</td>
                                        <td>{obj.esrcb}</td>
                                        <td>{obj.esycb}</td>
                                        <td>{obj.ssrxh}</td>
                                        <td>{obj.ssyxh}</td>
                                        <td>{obj.ssrcb}</td>
                                        <td>{obj.ssycb}</td>
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