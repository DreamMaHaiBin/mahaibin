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
    function getOption(props) {
        let option = {
            title: {
                text: '2020年烧结产量',
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
                data: mockEchartsDataList.xAxisData
            },
            yAxis: {
                type: 'value',
                
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: mockEchartsDataList.seriesData.data1

                }, {
                    name: '小米订单量',
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: mockEchartsDataList.seriesData.data2
                }, {
                    name: '华为订单量',
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: mockEchartsDataList.seriesData.data2
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