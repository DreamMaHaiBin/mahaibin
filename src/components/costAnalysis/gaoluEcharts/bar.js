import React, { useState } from 'react'
import '../children/tables.scss'
//导入折线图
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
export default function GaoLuBar(props) {
    function getOption() {
        const {componentName, data, xAxis, legend, titleName } = props
        let zclData = []
        let yglclData = []
        let eglclData = []
        let sglclData = []
        data.forEach(element => {
            zclData.push(element.zcl)
            yglclData.push(element.yglcl)
            eglclData.push(element.eglcl)
            sglclData.push(element.sglcl)
        });
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
                type: 'value'
            },
            series: [
                {
                    name: legend[0],
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: zclData,

                }, {
                    name: legend[1],
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: yglclData,
                }, {
                    name: legend[2],
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: eglclData,
                }, {
                    name: legend[3],
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: sglclData,
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