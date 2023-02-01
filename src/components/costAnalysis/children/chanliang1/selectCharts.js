import React, { useState, useEffect } from 'react'
import '../tables.scss'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import { Select, DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option } = Select;
export default function SelectEcharts(props) {
    const { legend, titleName, nameList, echartsData,componentName } = props
    function getOption() {
        console.log(echartsData)
        let option = {
            title: {
                text: titleName,
                x: 'center'
            },
            legend: {
                itemWidth: 5,
                itemHeight: 2,
                data: legend,
                width: 'auto',
                height: 'auto',
                bottom: '20px',
                textStyle:{
                    fontSize: '10px'
                }
            },
            tooltip: {
                trigger: 'axis',
            },
            
            xAxis: {
                data: echartsData.length > 0 ? echartsData[0].XList : 2,

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
            series: echartsData
        }
        return option
    }

    // function handleChange(value) {
    //     console.log(`${value}`)
    //     props.cantFatherData(value)
    // }
    function onChange(dates, dateStrings) {
        props.childDateTime(dateStrings[0],dateStrings[1],componentName)
    }
    return (
        <div className='children-two-echarts'>
            <div className='children-two-echarts-select'>
                <label>名称</label>
                <Select defaultValue="" style={{ width: 80 }} onChange={(value)=>{props.cantFatherData(value,componentName)}}>
                    {
                        (nameList || []).map((obj,index)=>{
                            return(
                                <Option value={obj} key={index}>{obj}</Option>
                            )
                        })
                    }
                </Select>
                <label style={{ marginLeft: "5px" }}>时间</label>
                <RangePicker
                    ranges={{
                        "今天":[moment(), moment()],
                        '本月': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00',), moment('11:59:59')],
                      }}
                    format="YYYY-MM-DD"
                    onChange={onChange}
                    style={{ width: '200px' }}
                />
            </div>
            <ReactEcharts option={getOption()}  notMerge={true} style={{height:350}}/>
        </div>
    )
}