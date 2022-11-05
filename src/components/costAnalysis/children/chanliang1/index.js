import React, { useState } from 'react'
import '../tables.scss'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import {mockEchartsDataList} from '../../../util/mockData'

export default function ChangLiang(props) { 
    console.log(props)
    const index = props.index
    const xZHou = ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日',]
    function getOption(props) {
        let option = {
            title: {
                text:index === 2  ?"7月球团产量": index === 3?'7月球团成本':index === 4?'含铁料占成本比':index === 5?'价格趋势':index === 6?'单耗趋势': '2021年球团产量',
                x: 'center'
            },
            legend: {
                data: mockEchartsDataList.legendData,
                width: 'auto',
                height: 'auto',
                bottom: '20px'
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: index === 2 || index === 3?xZHou:  mockEchartsDataList.xAxisData
            },
            yAxis: {
                type: 'value',
                
            },
            series: [
                {
                    name: '产量',
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: mockEchartsDataList.seriesData.data1

                }, {
                    name: '一球',
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: mockEchartsDataList.seriesData.data2
                }, {
                    name: '二球',
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: mockEchartsDataList.seriesData.data3
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