import React, { useState } from 'react'
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

    const index = props.index
    function getOption() {
        const { componentName, data, xAxis, legend, titleName } = props
        console.log(componentName)
        let clData = []
        let esData = []
        let ssData = []
        let zcbData = []
        let escbData = []
        let sscbData = []
        data.forEach(element => {
            clData.push(element.zcl)
            esData.push(element.escl)
            ssData.push(element.sscl)
            zcbData.push(componentName === '产量' ? element.zcb : element.wccb)
            escbData.push(componentName === '产量' ? element.escb : element.escbb)
            sscbData.push(componentName === '产量' ? element.sscb : element.sscbb)
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
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    function onChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    return (
        <div className='children-two-echarts'>
            <div className='children-two-echarts-select'>
                <label>名称</label>
                <Select defaultValue="lucy" style={{ width: 80 }} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <label style={{marginLeft:"5px"}}>时间</label>
                <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    onChange={onChange}
                    style={{width:'200px'}}
                />
            </div>
            <ReactEcharts option={getOption()} />
        </div>
    )
}