import React, { useState } from 'react'
import '../tables.scss'
//导入折线图
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
export default function EchartsBar(props) {
    function getOption() {
        const {componentName, data, xAxis, legend, titleName } = props
        let zcbData = []
        let escbData = []
        let sscbData = []
        data.forEach(element => {
            zcbData.push(element.zcb)
            escbData.push(element.escb)
            sscbData.push(element.sscb)
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
                    data: zcbData,

                }, {
                    name: legend[1],
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: escbData,
                }, {
                    name: legend[2],
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: sscbData,
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