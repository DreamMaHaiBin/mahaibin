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
    function getOption() {
        const {componentName, data, xAxis, legend, titleName,type } = props
        console.log(componentName,type)
        let clData = []
        let esData = []
        let ssData = []
        let zcbData = []
        let escbData = []
        let sscbData = []
        data.forEach(element => {
            clData.push(element.zcl)
            esData.push(type === '球团' ? element.yqcl : element.escl)
            ssData.push(type === '球团' ? element.eqcl : element.sscl)
            zcbData.push(componentName === '成本' ? element.zcb : element.wccb )
            escbData.push(componentName === '成本' ? type === '球团' ? element.yqcb : element.escb : type === '球团' ? element.yqcbb: element.escbb )
            sscbData.push(componentName === '成本' ? type === '球团' ? element.eqcb : element.sscb : type === '球团' ? element.eqcbb :element.sscbb )
        });
        console.log(data)
        let option = {
            title: {
                text: titleName,
                x: 'center',
            },
            legend: {
                data: legend,
                width: 'auto',
                height: 'auto',
                bottom: '20px',
                textStyle:{
                    fontSize: '12px'
                }
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: xAxis,
                
            },
            grid: {
                // top: '0%',
                left: '15%',//原来是10%，修改为20%
                // right: '2%',
                // bottom: '24%',
              },
            yAxis: {
                type: 'value',   
                axisLabel :{
                    interval:0
                  },
                axisLabel: {
                    color: '#444343',
                    formatter: function (value, index) {
                    //     console.log(value)
                    //   // value大于1000时除以1000并拼接k，小于1000按原格式显示
                    // //   if (value >= 1000) {
                    // //     value = value / 1000 + 'k';
                    // //   } else if (value < 1000) {
                    // //     value;
                    // //   }
                    return value >= 1000 ? value >= 10000 ?  value / 10000 + 'W' :  value / 1000 + 'K' : value
                    },
                  },
            },
            // dataZoom: [
            //     {
            //       type: 'inside',
            //       start: 0,
            //       end: 10
            //     },
            //     {
            //       start: 0,
            //       end: 10
            //     }
            //   ],
            series: [
                {
                    name: legend[0],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? clData : zcbData,
                }, {
                    name: legend[1],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? esData : escbData
                }, {
                    name: legend[2],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? ssData : sscbData
                }
            ]
        }
        return option
    }
    const [n, setN] = useState(0)
    return (
        <div className='children-two-echarts'>
            <ReactEcharts option={getOption()} notMerge={true} style={{height:350}}/>
        </div>
    )
}