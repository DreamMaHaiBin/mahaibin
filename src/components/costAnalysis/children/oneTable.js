import React, { useState } from 'react'
import './tables.css'
const data = [
    {
        'yesterday': '昨日指标',
        'sinterYield': '烧结产量',
        'cost': '成本'
    },
    {
        'yesterday': '计划',
        'sinterYield': '',
        'cost': ''
    },
    {
        'yesterday': '完成',
        'sinterYield': '',
        'cost': ''
    }
]
export default function OneTable() {
    const [n, setN] = useState(0)
    return (
        <table className="one-sinter-table">
            <tbody className="one-sinter-tbody">
                <tr className="one-sinter-tr-one">
                    <td>昨日指标</td>
                    <td>烧结产量</td>
                    <td>成本</td>
                </tr>
                <tr className="one-sinter-tr-common">
                    <td>计划</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr className="one-sinter-tr-common">
                    <td>完成</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}