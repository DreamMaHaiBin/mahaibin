import React, { Component } from "react";
import './common.scss'
import { Input } from 'antd';
// 烧结日清日结
import { tableListDataShaojie } from '../util/shaojieTable'
const str = "0.00"
const strFour = "0.0000"
export default class DateClearDateSettlement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: tableListDataShaojie
        }
        // this.changeTabaleData = this.changeTabaleData.bind(this)
    }

    changeTabaleData(name, index,e) {
        const refName = `${name}${index}`
        this[refName] = React.createRef()
        console.log(name, index, this.refs[refName].state.value,e );
        const newData = this.state.data
        newData[index][name] = this.refs[refName].state.value
        if(name === 'ssrcb' && index === 0){
            newData[index]['ssycb'] = this.refs[refName].state.value*30
            console.log(newData[index]['ssycb'])
        }
        this.setState({data:newData},()=>{
            // console.log(this.state.data)
        })
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
                            this.state.data.map((obj, index) => {
                                return (
                                    <tr key={index} className={
                                        index === 0 ? 'date-clear-date-settlemen-table-blue' :
                                            index === 1 || index === 2 || index === 3 || index === 7 || index === 11 || index === 12 || index === 16 ? 'date-clear-date-settlemen-table-yellow' :
                                                'date-clear-date-settlemen-table-none'
                                    }>
                                        <td><Input value={obj.name} ref={`name${index}`} onChange={this.changeTabaleData.bind(this,"name", index, obj.name)} /></td>
                                        <td><Input value={obj.dw} ref={`dw${index}`} onChange={this.changeTabaleData.bind(this,"dw", index)} /></td>
                                        <td><Input value={obj.dj === str || obj.dj === 0 ? null : obj.dj} ref={`dj${index}`} onChange={this.changeTabaleData.bind(this,"dj", index, obj.dj)} /></td>
                                        <td><Input value={obj.qcrxh} ref={`qcrxh${index}`} onChange={this.changeTabaleData.bind(this,"qcrxh", index)} /></td>
                                        <td><Input value={obj.qcyxh} ref={`qcyxh${index}`} onChange={this.changeTabaleData.bind(this,"qcyxh", index)} /></td>
                                        <td><Input value={obj.qcrcb} ref={`qcrcb${index}`} onChange={this.changeTabaleData.bind(this,"qcrcb", index)} /></td>
                                        <td><Input value={obj.qcycb} ref={`qcycb${index}`} onChange={this.changeTabaleData.bind(this,"qcycb", index)} /></td>
                                        <td><Input value={obj.ysrxh} ref={`ysrxh${index}`} onChange={this.changeTabaleData.bind(this,"ysrxh", index)} /></td>
                                        <td><Input value={obj.ysyxh} ref={`ysyxh${index}`}onChange={this.changeTabaleData.bind(this,"ysyxh", index)} /></td>
                                        <td><Input value={obj.ysrcb} ref={`ysrcb${index}`} onChange={this.changeTabaleData.bind(this,"ysrcb", index)} /></td>
                                        <td><Input value={obj.ysycb} ref={`ysycb${index}`} onChange={this.changeTabaleData.bind(this,"ysycb", index)} /></td>
                                        <td><Input value={obj.esrxh} ref={`esrxh${index}`} onChange={this.changeTabaleData.bind(this,"esrxh", index)} /></td>
                                        <td><Input value={obj.esyxh} ref={`esyxh${index}`} onChange={this.changeTabaleData.bind(this,"esyxh", index)} /></td>
                                        <td><Input value={obj.esrcb} ref={`esrcb${index}`} onChange={this.changeTabaleData.bind(this,"esrcb", index)} /></td>
                                        <td><Input value={obj.esycb} ref={`esycb${index}`} onChange={this.changeTabaleData.bind(this,"esycb", index)} /></td>
                                        <td><Input value={obj.ssrxh} ref={`ssrxh${index}`} onChange={this.changeTabaleData.bind(this,"ssrxh", index)} /></td>
                                        <td><Input value={obj.ssyxh} ref={`ssyxh${index}`} onChange={this.changeTabaleData.bind(this,"ssyxh", index)} /></td>
                                        <td><Input value={obj.ssrcb} ref={`ssrcb${index}`} onChange={this.changeTabaleData.bind(this,"ssrcb", index)} /></td>
                                        <td><Input value={obj.ssycb} ref={`ssycb${index}`} onChange={this.changeTabaleData.bind(this,"ssycb", index)} /></td>

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