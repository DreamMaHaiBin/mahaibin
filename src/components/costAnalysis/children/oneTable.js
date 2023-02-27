import React from 'react'
import './tables.scss'
import { Input } from 'antd'
export default function OneTable(props) {
    const {componentName, data } = props
    // console.log(data)
    function onChangeData(e){
        // console.log(e.target.value)
        props.postFatherData(e.target.value)
    }
    function onChangeDataJhrlb (e){
        props.postFatherDataJHRLB(e.target.value)
    }
    return (
        <div className='one-sinter-table-div'>
            <table className="one-sinter-table">
            <tbody className="one-sinter-tbody">
                <tr className="one-sinter-tr-one">
                    <td style={{width:100}}>昨日指标</td>
                    <td style={{width:100}}>{componentName}产量</td>
                    <td style={{display:componentName === '高炉' ? '' : 'none'}}>燃料</td>
                    <td>成本</td>
                </tr>
                <tr className="one-sinter-tr-common">
                    <td>计划</td>
                    <td>{data.jhcl}</td>
                    <td style={{display:componentName === '高炉' ? 'table-cell' : 'none'}}><Input defaultValue={data.jhrlb} className="text-ipnut" onInput={onChangeDataJhrlb}></Input></td>
                    <td><Input defaultValue={data.jhcb} className="text-ipnut" onInput={onChangeData}></Input></td>
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