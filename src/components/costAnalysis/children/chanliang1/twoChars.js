import React, { useState } from 'react'
import '../tables.scss'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default function ChenBen(props) { 

    function getOption() {
        const {componentName, data, xAxis, legend, titleName } = props
        console.log(componentName)
        let escbData = []
        let sscbData = []
        data.forEach(element => {
            escbData.push( componentName === '烧结' ? element.yqcbb : element.yqcbb )
            sscbData.push(componentName === '烧结' ? element.eqcbb : element.eqcbb )
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
                    data: escbData,
                }, {
                    name: legend[1],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: escbData
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