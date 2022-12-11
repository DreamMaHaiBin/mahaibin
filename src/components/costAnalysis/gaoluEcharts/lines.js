import React, { useState } from 'react'
import '../children/tables.scss'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default function GaoLuLines(props) { 

    const index = props.index
    function getOption() {
        const {componentName, data, xAxis, legend, titleName } = props
        console.log(componentName)
        let zclData = []
        let yglData = []
        let eglData = []
        let sglData = []
        let rhData= []
        let jbData = []
        let mbData = []
        let jdbData = []
        data.forEach(element => {
            zclData.push(element.zcl)
            yglData.push(element.yglcl)
            eglData.push(element.eglcl)
            sglData.push(element.sglcl)
            rhData.push(componentName === '产量' ? element.rlb : element.rlb )
            jbData.push(componentName === '产量' ? element.jhrlb : element.jhrlb )
            mbData.push(componentName === '产量' ? element.jhrlb : element.jhrlb )
            jdbData.push(componentName === '产量' ? element.jhrlb : element.jhrlb )
        });
        console.log(data)
        let option = {
            title: {
                text: titleName,
                x: 'center'
            },
            legend: {
                data: legend,
                width: 'auto',
                height: 'auto',
                bottom: '20px'
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: xAxis
            },
            yAxis: {
                type: 'value',
                
            },
            series: [
                {
                    name: legend[0],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? zclData : rhData,
                }, {
                    name: legend[1],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? yglData : rhData
                }, {
                    name: legend[2],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? eglData : rhData
                }, {
                    name: legend[3],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? sglData : rhData
                }
            ]
        }
        return option
    }
    const [n, setN] = useState(0)
    return (
        <div className='children-two-echarts'>
            <ReactEcharts option={getOption()} />
        </div>
    )
}