import React, { useState } from 'react'
import '../tables.scss'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import { Icon,Modal } from 'antd';
export default function ChenBen(props) { 

    function getOption() {
        const {type, data, xAxis, legend, titleName } = props
        let escbData = []
        let sscbData = []
        data.forEach(element => {
            escbData.push(type === '烧结' ? element.escbb : element.yqcbb )
            sscbData.push(type === '烧结' ? element.sscbb : element.eqcbb )
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
                bottom: '20px',
                textStyle:{
                    fontSize: '12px'
                }
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: xAxis
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
                    return value +'%'
                    },
                  },
            },
            series: [
                {
                    name: legend[0],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: escbData,
                }, {
                    name: legend[1],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: sscbData
                }
            ]
        }
        return option
    }
    function clickIcon(){
        props.proportionData(true)
     }
     function handleOk(){
         props.proportionData(false)
     }
     function handleOkCel(){
         props.proportionData(false)
     }
    return (
        <div className='children-two-echarts'>
            <ReactEcharts option={getOption()} notMerge={true} style={{height:350}}/>
            <Icon type="fullscreen" className="echarts-icon" onClick={clickIcon}/>
            <Modal
                visible={props.isShow}
                onOk={handleOk}
                cancelText={false}
                okText="关闭"
                closable={false}
                onCancel={handleOkCel}
                centered
                bodyStyle={{height:600,width:800}}
                footer={null}
            >
                <Icon type="close" style={{position:'absolute',right:-30,top:-30,color:'#ffffff',fontSize: 20, cursor: 'pointer'}} onClick={handleOkCel}/>
                <ReactEcharts option={getOption()} notMerge={true}  style={{height:500,width:900,left:-100}} />
            </Modal>
        </div>
    )
}