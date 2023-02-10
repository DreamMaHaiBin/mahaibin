import React, { useState } from 'react'
import '../tables.scss'
//导入折线图
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import { Icon,Modal } from 'antd';
export default function EchartsBar(props) {
    function getOption() {
        const {type, data, xAxis, legend, titleName,isShow } = props
        console.log(isShow)
        let zcbData = []
        let escbData = []
        let sscbData = []
        data.forEach(element => {
            zcbData.push(element.zcb)
            escbData.push(type === "球团" ? element.yqcb : element.escb)
            sscbData.push(type === "球团" ? element.eqcb : element.sscb)
        });
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
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: zcbData,

                }, {
                    name: legend[1],
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: escbData,
                }, {
                    name: legend[2],
                    type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data: sscbData,
                }
            ]
        }
        return option
    }
    function clickIcon(){
        props.showBigBar(true)
     }
     function handleOk(){
         props.showBigBar(false)
     }
     function handleOkCel(){
         props.showBigBar(false)
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