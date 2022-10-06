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
    function getOption(props) {
        let option = {
            title: {
                text: '2021年球团成本',
                x: 'center'
            },
            legend: {
                data: ['产量', '一球', '二球'],

                width: 'auto',
                height: 'auto',
                bottom: '20px'
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '产量',
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800],

                }, {
                    name: '一球',
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: [150, 230, 224, 218, 135, 147, 260],
                }, {
                    name: '二球',
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: [150, 200, 200, 2218, 1135, 2347, 1260],
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