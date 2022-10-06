import React, { useState } from 'react'
import Index from '../../../router'
import './tables.scss'
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
export default function OneTable(props) {
    const [n, setN] = useState(0)
    const componentName = props.componentName
    return (
        <div className='one-sinter-table-div'>
            <table className="one-sinter-table">
            <tbody className="one-sinter-tbody">
                <tr className="one-sinter-tr-one">
                    <td>昨日指标</td>
                    <td>{componentName}产量</td>
                    <td style={{display:componentName === '高炉' ? '' : 'none'}}>燃料</td>
                    <td>成本</td>
                </tr>
                <tr className="one-sinter-tr-common">
                    <td>计划</td>
                    <td>{componentName === '烧结' ? 16580 : componentName === '球团' ? 9800 : 22800}</td>
                    <td style={{display:componentName === '高炉' ? 'table-cell' : 'none'}}>520</td>
                    <td>{componentName === '烧结' ? 950 : componentName === '球团' ? 1024 : 3580}</td>
                </tr>
                <tr className="one-sinter-tr-common">
                    <td>完成</td>
                    <td>{componentName === '烧结' ? 16820 : componentName === '球团' ? 9850 : 22950}</td>
                    <td  style={{display:componentName === '高炉' ? 'table-cell' : 'none'}}>512</td>
                    <td>{componentName === '烧结' ? 946 : componentName === '球团' ? 980 : 3575}</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}