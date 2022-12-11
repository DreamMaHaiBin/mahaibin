import React from 'react'
import './tables.scss'
export default function OneTable(props) {
    const {componentName, data } = props
    // console.log(data)

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
                    <td>{data.jhcl}</td>
                    <td style={{display:componentName === '高炉' ? 'table-cell' : 'none'}}>{data.jhrlb}</td>
                    <td>{data.jhcb}</td>
                </tr>
                <tr className="one-sinter-tr-common">
                    <td>完成</td>
                    <td>{data.wccl}</td>
                    <td  style={{display:componentName === '高炉' ? 'table-cell' : 'none'}}>{data.wcrlb}</td>
                    <td>{data.wccb}</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}