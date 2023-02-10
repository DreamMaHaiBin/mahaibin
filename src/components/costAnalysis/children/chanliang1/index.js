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
export default function ChangLiang(props) { 
    function getOption() {
        const {componentName, data, xAxis, legend, titleName,type,chilrenModalData } = props
        console.log(chilrenModalData)
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
                    return value >= 1000 ? value >= 10000 ?  value / 10000 + 'W' :  value / 1000 + 'K' : value
                    },
                  },
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
    function modalGetOption(){
        const {componentName, xAxis, legend, titleName, data,type } = chilrenModalData
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
                    return value >= 1000 ? value >= 10000 ?  value / 10000 + 'W' :  value / 1000 + 'K' : value
                    },
                  },
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