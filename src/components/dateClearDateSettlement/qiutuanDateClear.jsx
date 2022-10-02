import React, { Component } from "react";
import './common.scss'
import { Input, message, Button } from "antd";
import axios from 'axios'
import { qiuTuanListData } from '../util/shaojieTable'
// 球团日清日结
const str = "0.00"
// const strFour = "0.0000"
export default class DateClearDateSettlementPellet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ListData: qiuTuanListData
        }
    }
    componentDidMount() {
        this.initData()
    }
    async initData() {
        await axios({
            method: 'get',
            url: "/api/rqrjqt/",
            headers: {
                Authorization: sessionStorage.getItem("token")
            },
        }).then(res => {
            console.log(res)
            if (res.status === 200 && res.data && res.data.dos) {
                this.setState({
                    ListData: res.data.dos
                })
            } else {
                this.setState({
                    ListData: qiuTuanListData
                })
            }
        }).catch(error => {
            console.log(error)
            message.error("数据获取错，请稍后重试")
        })
    }
    mustNumber(e) {
        if (!e.target.value.replace(/[^\d]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')) {
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
    saveData() {
        axios({
            method: "post",
            url: "/api/rqrjqt/",
            headers: {
                Authorization: sessionStorage.getItem("token")
            },
            data: {
                dos: this.state.ListData
            }
        }).then(res => {
            console.log(res)
            message.success("保持成功")

        }).catch(error => {
            console.log(error)
            message.error("数据保存失败，请稍后重试！")
        })
    }
    cmputendData() {
        const dataComputed = JSON.parse(JSON.stringify(this.state.ListData))
        dataComputed.forEach((element, index) => {
            if (index !== 0 || index !== 1 || index !== 2 || index !== 3 || index !== 4 || index !== 10 || index !== 16 || index !== 21 || index !== 31) {
                element['qcrcb'] = element['qcdj'] * element['qcrdh']
                element['qcycb'] = element['qcdj'] * element['qcydh']

                element['yxlrcb'] = element['qcdj'] * element['yxlrdh']
                element['yxlrcb'] = element['qcdj'] * element['yxlydh']

                element['exlrcb'] = element['qcdj'] * element['exlrdh']
                element['exlrcb'] = element['qcdj'] * element['yxlydh']

                element['ssrcb'] = element['qcdj'] * element['ssrdh']
                element['ssrcb'] = element['qcdj'] * element['ssydh']
            }
        });
        dataComputed.forEach((obj, index) => {
            if (index === 3 || index === 4) {
                // 主要几个标黑的矿粉
                obj['qcrdh'] = this.sum(index + 2, index + 3, dataComputed, 'qcrdh')
                obj['qcydh'] = this.sum(index + 2, index + 3, dataComputed, 'qcydh')
                obj['qcrcb'] = this.sum(index + 2, index + 3, dataComputed, 'qcrcb')
                obj['qcycb'] = this.sum(index + 2, index + 3, dataComputed, 'qcycb')

                obj['yxlrdh'] = this.sum(index + 2, index + 3, dataComputed, 'yxlrdh')
                obj['yxlydh'] = this.sum(index + 2, index + 3, dataComputed, 'yxlydh')
                obj['yxlrcb'] = this.sum(index + 2, index + 3, dataComputed, 'yxlrcb')
                obj['exlycb'] = this.sum(index + 2, index + 3, dataComputed, 'exlycb')

                obj['exlrdh'] = this.sum(index + 2, index + 3, dataComputed, 'exlrdh')
                obj['yxlydh'] = this.sum(index + 2, index + 3, dataComputed, 'yxlydh')
                obj['exlrcb'] = this.sum(index + 2, index + 3, dataComputed, 'exlrcb')
                obj['exlycb'] = this.sum(index + 2, index + 3, dataComputed, 'exlycb')

                obj['ssrdh'] = this.sum(index + 2, index + 3, dataComputed, 'ssrdh')
                obj['ssydh'] = this.sum(index + 2, index + 3, dataComputed, 'ssydh')
                obj['ssrcb'] = this.sum(index + 2, index + 3, dataComputed, 'ssrcb')
                obj['ssycb'] = this.sum(index + 2, index + 3, dataComputed, 'ssycb')
            }
            if (index === 10 || index === 17) {
                // 主要几个标黑的矿粉
                obj['qcrdh'] = this.sum(index + 1, index + 3, dataComputed, 'qcrdh')
                obj['qcydh'] = this.sum(index + 1, index + 3, dataComputed, 'qcydh')
                obj['qcrcb'] = this.sum(index + 1, index + 3, dataComputed, 'qcrcb')
                obj['qcycb'] = this.sum(index + 1, index + 3, dataComputed, 'qcycb')

                obj['yxlrdh'] = this.sum(index + 1, index + 3, dataComputed, 'yxlrdh')
                obj['yxlydh'] = this.sum(index + 1, index + 3, dataComputed, 'yxlydh')
                obj['yxlrcb'] = this.sum(index + 1, index + 3, dataComputed, 'yxlrcb')
                obj['exlycb'] = this.sum(index + 1, index + 3, dataComputed, 'exlycb')

                obj['exlrdh'] = this.sum(index + 1, index + 3, dataComputed, 'exlrdh')
                obj['exlydh'] = this.sum(index + 1, index + 3, dataComputed, 'exlydh')
                obj['exlrcb'] = this.sum(index + 1, index + 3, dataComputed, 'exlrcb')
                obj['exlycb'] = this.sum(index + 1, index + 3, dataComputed, 'exlycb')


            }
            if (index === 16) {
                // 主要几个标黑的矿粉
                obj['qcrcb'] = dataComputed[17]['qcrcb'] + dataComputed[21]['qcrcb'] + dataComputed[28]['qcrcb'] + dataComputed[29]['qcrcb'] + dataComputed[30]['qcrcb']
                obj['qcycb'] = dataComputed[17]['qcycb'] + dataComputed[21]['qcycb'] + dataComputed[28]['qcycb'] + dataComputed[29]['qcycb'] + dataComputed[30]['qcycb']

                obj['yxlrcb'] = dataComputed[17]['yxlrcb'] + dataComputed[21]['yxlrcb'] + dataComputed[28]['yxlrcb'] + dataComputed[29]['yxlrcb'] + dataComputed[30]['yxlrcb']
                obj['exlycb'] = dataComputed[17]['exlycb'] + dataComputed[21]['exlycb'] + dataComputed[28]['exlycb'] + dataComputed[29]['exlycb'] + dataComputed[30]['exlycb']

                obj['exlrcb'] = dataComputed[17]['exlrcb'] + dataComputed[21]['exlrcb'] + dataComputed[28]['exlrcb'] + dataComputed[29]['exlrcb'] + dataComputed[30]['exlrcb']
                obj['exlycb'] = dataComputed[17]['exlycb'] + dataComputed[21]['exlycb'] + dataComputed[28]['exlycb'] + dataComputed[29]['exlycb'] + dataComputed[30]['exlycb']

                obj['ssrcb'] = dataComputed[17]['ssrcb'] + dataComputed[21]['ssrcb'] + dataComputed[28]['ssrcb'] + dataComputed[29]['ssrcb'] + dataComputed[30]['ssrcb']
                obj['ssycb'] = dataComputed[17]['ssycb'] + dataComputed[21]['ssycb'] + dataComputed[28]['ssycb'] + dataComputed[29]['ssycb'] + dataComputed[30]['ssycb']

            }

            if (index === 2) { // 球团原料
                // 主要几个标黑的矿粉
                obj['qcrdh'] = dataComputed[3]['qcrdh'] + dataComputed[4]['qcrdh'] + dataComputed[10]['qcrdh'] + dataComputed[14]['qcrdh'] + dataComputed[15]['qcrdh']
                obj['qcydh'] = dataComputed[3]['qcydh'] + dataComputed[4]['qcydh'] + dataComputed[10]['qcydh'] + dataComputed[14]['qcydh'] + dataComputed[15]['qcydh']
                obj['qcrcb'] = dataComputed[3]['qcrcb'] + dataComputed[4]['qcrcb'] + dataComputed[10]['qcrcb'] + dataComputed[14]['qcrcb'] + dataComputed[15]['qcrcb']
                obj['qcycb'] = dataComputed[3]['qcycb'] + dataComputed[4]['qcycb'] + dataComputed[10]['qcycb'] + dataComputed[14]['qcycb'] + dataComputed[15]['qcycb']

                obj['yxlrdh'] = dataComputed[3]['yxlrdh'] + dataComputed[4]['yxlrdh'] + dataComputed[10]['yxlrdh'] + dataComputed[14]['yxlrdh'] + dataComputed[15]['yxlrdh']
                obj['yxlydh'] = dataComputed[3]['yxlydh'] + dataComputed[4]['yxlydh'] + dataComputed[10]['yxlydh'] + dataComputed[14]['yxlydh'] + dataComputed[15]['yxlydh']
                obj['yxlrcb'] = dataComputed[3]['yxlrcb'] + dataComputed[4]['yxlrcb'] + dataComputed[10]['yxlrcb'] + dataComputed[14]['yxlrcb'] + dataComputed[15]['yxlrcb']
                obj['exlycb'] = dataComputed[3]['exlycb'] + dataComputed[4]['exlycb'] + dataComputed[10]['exlycb'] + dataComputed[14]['exlycb'] + dataComputed[15]['exlycb']

                obj['exlrdh'] = dataComputed[3]['exlrdh'] + dataComputed[4]['exlrdh'] + dataComputed[10]['exlrdh'] + dataComputed[14]['exlrdh'] + dataComputed[15]['exlrdh']
                obj['exlydh'] = dataComputed[3]['exlydh'] + dataComputed[4]['exlydh'] + dataComputed[10]['exlydh'] + dataComputed[14]['exlydh'] + dataComputed[15]['exlydh']
                obj['exlrcb'] = dataComputed[3]['exlrcb'] + dataComputed[4]['exlrcb'] + dataComputed[10]['exlrcb'] + dataComputed[14]['exlrcb'] + dataComputed[15]['exlrcb']
                obj['exlycb'] = dataComputed[3]['exlycb'] + dataComputed[4]['exlycb'] + dataComputed[10]['exlycb'] + dataComputed[14]['exlycb'] + dataComputed[15]['exlycb']
            }
            if (index === 2 || index === 3 || index === 4 || index === 10 || index === 17) {
                // 不包含几个总计的
                obj['qcdj'] = obj['qcycb'] / obj['qcydh'] // 全厂单价
            }


        })
        dataComputed[0]['exlycb'] = dataComputed[0]['yxlrcb'] * 30
        dataComputed[0]['exlycb'] = dataComputed[0]['exlrcb'] * 30
        dataComputed[0]['qcycb'] = dataComputed[0]['exlycb'] + dataComputed[0]['exlycb'] + dataComputed[0]['ssycb']

        dataComputed[1]['qcycb'] = dataComputed[2]['qcycb'] + dataComputed[16]['qcycb']
        dataComputed[1]['exlycb'] = dataComputed[2]['exlycb'] + dataComputed[16]['exlycb']
        dataComputed[1]['exlycb'] = dataComputed[2]['exlycb'] + dataComputed[16]['exlycb']

        this.setState({ ListData: dataComputed },()=>{message.success("计算成功！")})
    }
    // 累加函数
    sum(startName, num, array, name) {
        var sum = 0;
        for (var i = startName; i <= num; i++) {
            sum += array[i][name];
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
                                <td rowSpan="2">成本项目</td>
                                <td rowSpan="2" style={{width:40}}>单位</td>
                                <td colSpan={5}>全厂</td>
                                <td colSpan={4}>一系列</td>
                                <td colSpan={4}>二系列</td>
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
                            </tr>
                            {
                                this.state.ListData.map((item, index) => {
                                    if (index < 30) {
                                        return (
                                            <tr key={index} className={
                                                index === 0 ? 'date-clear-date-settlemen-table-blue' :
                                                    index === 1 || index === 2 || index === 3 || index === 4 || index === 10 || index === 16 || index === 17 || index === 21 ? 'date-clear-date-settlemen-table-yellow' :
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
                                                        index === 1 || index === 2 || index === 3 || index === 16 || index == 34 ? '元' : '吨'
                                                    }
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.qcdj === str || item.qcdj === 0 ? 0 : item.qcdj}
                                                        onChange={this.infoKuang("qcdj", index).bind(this)}
                                                    >
                                                    </Input>
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.qcrdh === str || item.qcrdh === 0 ? 0 : item.qcrdh}
                                                        onChange={this.infoKuang("qcrdh", index).bind(this)}
                                                    >
                                                    </Input>
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.qcydh === str || item.qcydh === 0 ? 0 : item.qcydh}
                                                        onChange={this.infoKuang("qcydh", index).bind(this)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.qcrcb === str || item.qcrcb === 0 ? 0 : item.qcrcb}
                                                        onChange={this.infoKuang("qcrcb", index).bind(this)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.qcycb === str || item.qcycb === 0 ? 0 : item.qcycb}
                                                        onChange={this.infoKuang("qcycb", index).bind(this)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.yxlrdh === str || item.yxlrdh === 0 ? 0 : item.yxlrdh}
                                                        onChange={this.infoKuang("yxlrdh", index).bind(this)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.yxlydh === str || item.yxlydh === 0 ? 0 : item.yxlydh}
                                                        onChange={this.infoKuang("yxlydh", index).bind(this)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.yxlrcb === str || item.yxlrcb === 0 ? 0 : item.yxlrcb}
                                                        onChange={this.infoKuang("yxlrcb", index).bind(this)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.exlycb === str || item.exlycb === 0 ? 0 : item.exlycb}
                                                        onChange={this.infoKuang("exlycb", index).bind(this)}
                                                    />
                                                </td>

                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.ssrdh === str || item.ssrdh === 0 ? 0 : item.ssrdh}
                                                        onChange={this.infoKuang("ssrdh", index).bind(this)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.ssydh === str || item.ssydh === 0 ? 0 : item.ssydh}
                                                        onChange={this.infoKuang("ssydh", index).bind(this)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.ssrcb === str || item.ssrcb === 0 ? 0 : item.ssrcb}
                                                        onChange={this.infoKuang("ssrcb", index).bind(this)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input onKeyUp={this.mustNumber.bind(this)}
                                                        value={item.ssycb === str || item.ssycb === 0 ? 0 : item.ssycb}
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
            </div>
        )
    }

}