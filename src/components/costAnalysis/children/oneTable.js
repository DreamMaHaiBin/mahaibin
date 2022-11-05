import React, { useState } from 'react'
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
                    <td>{componentName.name}产量</td>
                    <td style={{display:componentName.planNumber3 ? '' : 'none'}}>燃料</td>
                    <td>成本</td>
                </tr>
                <tr className="one-sinter-tr-common">
                    <td>计划</td>
                    <td>{componentName.planNumber1}</td>
                    <td style={{display:componentName.planNumber3 ? '' : 'none'}}>{componentName.planNumber3}</td>
                    <td>{componentName.planNumber2}</td>
                </tr>
                <tr className="one-sinter-tr-common">
                    <td>完成</td>
                    <td>{componentName.complete1}</td>
                    <td  style={{display:componentName.complete3 ? '' : 'none'}}>{componentName.complete3}</td>
                    <td>{componentName.complete2}</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}