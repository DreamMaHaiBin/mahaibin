import React, { useState } from 'react'
import '../tables.scss'
//导入折线图
import 'echarts/lib/chart/pie';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
export default function EchartsPie () {
    function getOption() {
        let option = {
            title: {
              text: 'Weather Statistics',
              subtext: 'Fake Data',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              bottom: 10,
              left: 'center',
              data: ['CityA', 'CityB', 'CityD', 'CityC', 'CityE']
            },
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                  {
                    label: {
                      backgroundColor: '#eee',
                      borderColor: '#777',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                        title: {
                          color: '#eee',
                          align: 'center'
                        },
                        abg: {
                          backgroundColor: '#333',
                          width: '100%',
                          align: 'right',
                          height: 25,
                          borderRadius: [4, 4, 0, 0]
                        },
                        Sunny: {
                          height: 30,
                          align: 'left',
                        },
                        Cloudy: {
                          height: 30,
                          align: 'left',
                        },
                        Showers: {
                          height: 30,
                          align: 'left',
                        },
                        weatherHead: {
                          color: '#333',
                          height: 24,
                          align: 'left'
                        },
                        hr: {
                          borderColor: '#777',
                          width: '100%',
                          borderWidth: 0.5,
                          height: 0
                        },
                        value: {
                          width: 20,
                          padding: [0, 20, 0, 30],
                          align: 'left'
                        },
                        valueHead: {
                          color: '#333',
                          width: 20,
                          padding: [0, 20, 0, 30],
                          align: 'center'
                        },
                        rate: {
                          width: 40,
                          align: 'right',
                          padding: [0, 10, 0, 0]
                        },
                        rateHead: {
                          color: '#333',
                          width: 40,
                          align: 'center',
                          padding: [0, 10, 0, 0]
                        }
                      }
                    }
                  },
                  { value: 735, name: 'CityC' },
                  { value: 510, name: 'CityD' },
                  { value: 434, name: 'CityB' },
                  { value: 335, name: 'CityA' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        return option
    }
    const [n, setN] = useState(0)
    return (
        <div className='children-two-echarts'>
            <ReactEcharts option={getOption()} />
        </div>
    )
}