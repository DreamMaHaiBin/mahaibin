import React, { Component } from "react";
import OneTable from './children/oneTable'
import ChangLiang from './children/chanliang1'
import GaoLuBar from './gaoluEcharts/bar'
import GaoLuLines from './gaoluEcharts//lines'
import EchartsPie from './children/echartsCirl'
import { data } from "../util/datas";
import axios from "axios"
import { getMonthLength } from '../util/commonFunction'
import SelectEcharts from './children/chanliang1/selectCharts'
import { JGQSDATA, DHQS } from '../util/jgqsData'
import './index.scss'
class FurnaceCostAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            FurnaceCostAnalysisName: '高炉',
            glYield: {}, // 高炉产量 第一张表格
            legend: ['全厂产量', '1#高炉', "2#高炉", '3#高炉'],
            glMonthYield: [], // 高炉月产量
            glDateYield: [], // 高炉日产量
            glYearCost: [], // 高炉年成本
            glMonthCost: [], // 高炉月成本
            glDateCost: [], // 高炉日成本
            xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            Twolegend: ['全厂成本', '原料', "冶炼费"],
            // Threelegend: ['燃耗', "焦比", "煤比", "焦丁比"],
            Threelegend: ['高炉燃料比', "1#高炉", "2#高炉", "3#高炉"],
            fourlegendName: ["全厂成本", "原料", "冶炼费"],
            endLegend: ['进口粉', '麦克粉', "巴卡"],
            sevenLegend: [],
            sevenListData: [],
            nineListData: [],
            nineLegend: ["全厂", "1#高炉", "2#高炉", "3#高炉"],
            startTime: "",
            startTime: "",
            DateXAxis: [],
            cirlData: [
                { value: 510, name: '原料' },
                { value: 434, name: '加工费' }
            ],
            titleName: {
                oneName: '2022高炉产量',
                twoName: '7月高炉产量',
                threeName: '2022高炉成本',
                fourName: '7月高炉成本',
                fiveName: '燃料比',
                sixName: '价格趋势',
                sevenName: '单耗趋势',
                eightName: '铁水成本构成'
            },
            nameList: [],
            childrenJGName:[]
        }
    }
    componentDidMount() {
        this.getInitData()
        this.getNameDataJG()
        this.getCirlData()
        this.jgqsPostData()
    }
    getCirlData() {
        axios({
            method: 'get',
            url: '/api/cbfxdrgc/',
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            this.setState({
                cirlData: res.data.gl
            })
        })
    }
    getInitData() {
        axios({
            method: 'get',
            url: '/api/cbfxry/',
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            // const listData = data
            var listData = res.data
            var dataOne = []//nineListData
            var dataTwo = []
            var dataThree = []

            listData.gly.forEach(obj => {
                dataOne.push({ ...obj })
            })
            listData.glr.forEach(obj => {
                dataTwo.push({ ...obj })
                dataThree.push({ ...obj })
            })
            console.log(dataTwo[0].date)
            this.setState({
                glYield: listData.glr[listData.glr.length - 1],
                glMonthYield: dataOne,
                glDateYield: dataTwo,
                DateXAxis: this.getMonthDate(dataTwo[0].date),
                nineListData: dataThree,
                titleName: {
                    oneName: new Date(dataOne[0].date).getFullYear() + '年高炉产量',
                    twoName: (new Date(dataTwo[0].date).getMonth() + 1) + '月高炉产量',
                    threeName: new Date(dataOne[0].date).getFullYear() + '年铁水成本',
                    fourName: new Date(dataOne[0].date).getFullYear() + '年燃料比',
                    fiveName: (new Date(dataTwo[0].date).getMonth() + 1) + '月燃料比',
                    eightName: new Date(dataOne[0].date).getFullYear() + '年' + (new Date(dataTwo[0].date).getMonth() + 1) + "月" + '铁水成本构成'
                }
            })
        })
    }
    getMonthDate(total) {
        let date = []
        for (let i = 1; i <= getMonthLength(total); i++) {
            date.push(i + '日')
        }
        return date
    }
    // 初始化获取 价格趋势名称
    getNameDataJG() {
        axios({
            method: 'get',
            url: '/api/cbfxgljgqs/',
            data: {
                name: ''
            },
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then(res => {
            this.setState({
                childrenJGName: res.data.name
            })
        }).catch((error) => {
            var data = ['name', 'name1', 'name2', 'name3']
            this.setState({
                nameList: data
            })
        })
    }
    jgqsPostData() {
        axios({
            method: 'post',
            url: '/api/cbfxgljgqs/',
            data: {
                name: this.state.nameList,
                date: [this.state.startTime || '', this.state.endTime || '']
            },
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then(res => {
            var jgqsData = res.data.data
            // var jgqsData = JGQSDATA
            var sevenName = []
            var sevenXAxis = []
            if (this.state.nameList.length > 0 && this.state.startTime && this.state.endTime) {
             
                jgqsData.forEach((obj, index) => {
                    sevenName.push(obj.name)
                    if(obj.data && obj.data.length > 0){
                        obj.data = obj.data.map(item => {
                            if (index === 0) {
                                sevenXAxis.push(`${item.date.split('-')[2]}日`)
                            }
                            return item.qcdj
                        })
                        obj.XList = sevenXAxis
                        obj.type = 'line'
                    }
    
                })
                this.setState({
                    sevenLegend: sevenName,
                sevenListData: jgqsData
                })

            }else{
                let one = []
                let two = []
                let three = []
                let four = []
                let five = []
                let allArray = []
                jgqsData.forEach((obj)=>{
                    sevenXAxis.push(`${obj.date.split('-')[2]}日`)
                    obj.data.forEach((item,index)=>{
                        sevenName.push(item.name)
                        if(index== 0){
                            one.push(item.qcdj)
                            
                        }
                        if(index== 1){
                            two.push(item.qcdj)
                        }
                        if(index== 2){
                            three.push(item.qcdj)
                        }
                        if(index== 3){
                            four.push(item.qcdj)
                        }
                        if(index== 4){
                            five.push(item.qcdj)
                        }
                    })
                })
                let listAll= [one,two,three,four,five]
                for(let i=0;i<5;i++){
                    allArray.push({
                        name: sevenName[i],
                        type : 'line',
                        XList: sevenXAxis,
                        data:listAll[i]
                    })
                }
                this.setState({
                    sevenLegend: sevenName,
                    sevenListData: allArray
                })
            }
         
        })

    }
    // 价格趋势名称
    cantFatherData(val, name) {
        this.setState({
            nameList: [val]
        }, () => {
            if (this.state.nameList.length > 0 && this.state.startTime && this.state.endTime) {
                this.setState({
                    sevenLegend: [],
                        sevenListData: []
                    
                },()=>{
                    this.jgqsPostData()
                })
               
            }
        })
    }
    // 时间选择
    childDateTime(startTime, endTime) {
        console.log(startTime, startTime)
        this.setState({
            startTime: startTime,
            endTime: endTime,
        }, () => {
            if (this.state.nameList.length > 0 && this.state.startTime && this.state.endTime) {
                this.setState({
                    sevenLegend: [],
                        sevenListData: []
                    
                },()=>{
                    this.jgqsPostData()
                })
            }

        })
    }
    render() {
        return (
            <div className="const-analysis-body">
                <OneTable data={this.state.glYield} componentName={this.state.FurnaceCostAnalysisName} />
                <GaoLuBar componentName={this.state.FurnaceCostAnalysisName} legend={this.state.legend} data={this.state.glMonthYield} xAxis={this.state.xAxis} titleName={this.state.titleName.oneName} />
                <GaoLuLines data={this.state.glDateYield} componentName={'产量'} xAxis={this.state.DateXAxis} legend={this.state.legend} titleName={this.state.titleName.twoName} />
                <GaoLuBar componentName={this.state.FurnaceCostAnalysisName} legend={this.state.Twolegend} data={this.state.glMonthYield} xAxis={this.state.xAxis} titleName={this.state.titleName.threeName} />
                <GaoLuLines data={this.state.glMonthYield} componentName={'成本'} xAxis={this.state.xAxis} legend={this.state.Threelegend} titleName={this.state.titleName.fourName} />
                <GaoLuLines data={this.state.glDateYield} componentName={'成本'} xAxis={this.state.DateXAxis} legend={this.state.Threelegend} titleName={this.state.titleName.fiveName} />
                <SelectEcharts
                    echartsData={this.state.sevenListData}
                    legend={this.state.sevenLegeng}
                    titleName={'价格趋势'}
                    nameList={this.state.childrenJGName}
                    cantFatherData={this.cantFatherData.bind(this)}
                    childDateTime={this.childDateTime.bind(this)}
                    componentName={'价格趋势'}
                />
                <EchartsPie componentName={this.state.sinterCostAnalysisname} titleName={this.state.titleName.eightName} legend={this.state.eightlegend} cirlData={this.state.cirlData} />
                <GaoLuLines data={this.state.nineListData} componentName={'单耗趋势'} xAxis={this.state.DateXAxis} legend={this.state.nineLegend} titleName={'单耗趋势'} />
            </div>
        )
    }

}
export default FurnaceCostAnalysis