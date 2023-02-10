import React, { useState } from 'react'
import '../children/tables.scss'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import { Icon,Modal } from 'antd';
export default function GaoLuLines(props) { 
    function getOption() {
        const {componentName, data, xAxis, legend, titleName } = props
        console.log(componentName)
        let zclData = []
        let yglData = []
        let eglData = []
        let sglData = []
        let rhData= []
        let jbData = []
        let mbData = []
        let jdbData = []
        let qcdhqs = []//
        let ygldhqs = []
        let egldhqs = []
        let sgldhqs = []
        data.forEach(element => {
            zclData.push(element.zcl)
            yglData.push(element.yglcl)
            eglData.push(element.eglcl)
            sglData.push(element.sglcl)
            rhData.push(element.rlb )
            jbData.push(element.yglrlb)
            mbData.push(element.eglrlb)
            jdbData.push(element.sglrlb)
            if(titleName === '单耗趋势'){
                qcdhqs.push(element.dhqs)
                ygldhqs.push(element.ygldhqs)
                egldhqs.push(element.egldhqs)
                sgldhqs.push(element.sgldhqs)
            }
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
            grid: {
                // top: '0%',
                left: '20%',//原来是10%，修改为20%
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
            series: [
                {
                    name: legend[0],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? zclData : componentName === '单耗趋势' ? qcdhqs : rhData,
                }, {
                    name: legend[1],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? yglData : componentName === '单耗趋势' ? ygldhqs: rhData
                }, {
                    name: legend[2],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? eglData : componentName === '单耗趋势' ? egldhqs : rhData
                }, {
                    name: legend[3],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? sglData : componentName === '单耗趋势' ? sgldhqs :rhData
                }
            ]
        }
        return option
    }
    function modalGetOption() {
        const {componentName, data, xAxis, legend, titleName } = chilrenModalData
        console.log(componentName)
        let zclData = []
        let yglData = []
        let eglData = []
        let sglData = []
        let rhData= []
        let jbData = []
        let mbData = []
        let jdbData = []
        let qcdhqs = []//
        let ygldhqs = []
        let egldhqs = []
        let sgldhqs = []
        data.forEach(element => {
            zclData.push(element.zcl)
            yglData.push(element.yglcl)
            eglData.push(element.eglcl)
            sglData.push(element.sglcl)
            rhData.push(element.rlb )
            jbData.push(element.yglrlb)
            mbData.push(element.eglrlb)
            jdbData.push(element.sglrlb)
            if(titleName === '单耗趋势'){
                qcdhqs.push(element.dhqs)
                ygldhqs.push(element.ygldhqs)
                egldhqs.push(element.egldhqs)
                sgldhqs.push(element.sgldhqs)
            }
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
            grid: {
                // top: '0%',
                left: '20%',//原来是10%，修改为20%
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
            series: [
                {
                    name: legend[0],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? zclData : componentName === '单耗趋势' ? qcdhqs : rhData,
                }, {
                    name: legend[1],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? yglData : componentName === '单耗趋势' ? ygldhqs: rhData
                }, {
                    name: legend[2],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? eglData : componentName === '单耗趋势' ? egldhqs : rhData
                }, {
                    name: legend[3],
                    type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: componentName === '产量' ? sglData : componentName === '单耗趋势' ? sgldhqs :rhData
                }
            ]
        }
        return option
    }
    function clickIcon(){
        props.showEchartsMOdal(true,props)
     }
     function handleOk(){
         props.showEchartsMOdal(false, {})
     }
     function handleOkCel(){
         props.showEchartsMOdal(false, {})
     }
     const {chilrenModalData} = props
    return (
        <div className='children-two-echarts'>
            <ReactEcharts option={getOption()} notMerge={true} style={{height:350}} />
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
              
                {
                  JSON.stringify(chilrenModalData).length > 2 ?  <ReactEcharts option={modalGetOption()} notMerge={true}  style={{height:500,width:900,left:-100}} /> : ''
                }
            </Modal>
        </div>
    )
}