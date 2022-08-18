import React, { useState } from 'react'
import '../tables.scss'
//导入折线图
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
export default function EchartsBar() {
    function getOption() {
        let option = {
            title: {
                text: '2020年烧结产量',
                x: 'center'
            },
            legend: {
                data: ['OFO订单量', '小米订单量', '华为订单量'],

                width: 'auto',
                height: 'auto',
                bottom: '20px'
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800],

                }, {
                    name: '小米订单量',
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: [150, 230, 224, 218, 135, 147, 260],
                }, {
                    name: '华为订单量',
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