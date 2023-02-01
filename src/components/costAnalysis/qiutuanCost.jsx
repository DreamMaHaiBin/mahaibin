import React, { Component } from "react";
import OneTable from './children/oneTable'
import ChangLiang from './children/chanliang1'
import EchartsBar from './children/echartsBar'
import EchartsPie from './children/echartsCirl'
import { getMonthLength } from '../util/commonFunction'
import ChenBen from './children/chanliang1/twoChars'
import axios from "axios"
import { data } from "../util/datas";
import './index.scss'
import SelectEcharts from './children/chanliang1/selectCharts'
import { JGQSDATA, DHQS } from '../util/jgqsData'
class PelletCostAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            PelletCostAnalysisName: '球团',
            qtYield: {}, // 球团产量 第一张表格
            qtMonthYield: [], // 球团月产量
            qtDateYield: [], // 球团日产量
            qtYearCost: [], // 球团年成本
            qtMonthCost: [], // 球团月成本
            qtDateCost: [], // 球团日成本
            xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            legend: ['球团', '一球', "二球"],
            endLegend: ['大石河商品粉', '水滴粉', "承德低钛粉"],
            Twolegend: ['球团', '一球成本', "二球成本"],
            Threelegend: ['一球', "二球"],
            eightlegend: ['原料', '加工费', "制造商"],
            sevenListData: [],
            nineListData: [],
            nineLegend: [],
            startTime: "",
            startTime: "",
            cirlData: [
                { value: 510, name: '原料' },
                { value: 434, name: '加工费' },
                { value: 335, name: '制造商' },
            ],
            DateXAxis: [],
            titleName: {
                oneName: '2022球团产量',
                twoName: '7月球团产量',
                threeName: '2022球团成本',
                fourName: '7月球团成本',
                fiveName: '含铁料占成本比例',
                sixName: '价格趋势',
                sevenName: '单耗趋势',
                eightName: '球团成本构成'
            },
            nameListJg: [],
            nameListDh: [],
            childrenJGName:[],
            childrenDHName:[],
            dhNameList: ['qtdhname', 'qtdhname1', 'qtdhname2', 'qtdhname3']
        }
    }
    componentDidMount() {
        this.getDHQSData()
        this.getNameDataJG()
        this.getInitData()
        this.getCirlData()
        this.jgqsPostData()
        this.dhqsPostData()
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
                cirlData: res.data.qt
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
            listData.qty.forEach(obj => {
                this.state.qtMonthYield.push({ ...obj })
            })
            listData.qtr.forEach(obj => {
                this.state.qtDateYield.push({ ...obj })
            })
            this.setState({
                qtYield: listData.qtr[listData.qtr.length - 1],
                qtMonthYield: this.state.qtMonthYield,
                qtDateYield: this.state.qtDateYield,
                DateXAxis: this.getMonthDate(this.state.qtDateYield[0].date),
                titleName: {
                    oneName: new Date(this.state.qtMonthYield[0].date).getFullYear() + '年球团产量',
                    twoName: (new Date(this.state.qtDateYield[0].date).getMonth() + 1) + '月球团产量',
                    threeName: new Date(this.state.qtMonthYield[0].date).getFullYear() + '年球团成本',
                    fourName: (new Date(this.state.qtDateYield[0].date).getMonth() + 1) + '月球团成本',
                    fiveName: (new Date(this.state.qtDateYield[0].date).getMonth() + 1) + '月含铁料占成本比例',
                    eightName: new Date(this.state.qtDateYield[0].date).getDate() + '日球团成本构成'
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
    // 初始化 单耗趋势的数据
    getDHQSData() {
        axios({
            method: 'get',
            url: '/api/cbfxqtjgqs/',
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                childrenDHName: res.data.name
            })
        })     
    }
    // 初始化获取 价格趋势名称
    getNameDataJG() {
        axios({
            method: 'get',
            url: '/api/cbfxqtjgqs/',
            data: {
                name: ''
            },
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then(res => {
            console.log(res)
            this.setState({
                childrenJGName: res.data.name
            })
        })
    }
    jgqsPostData() {
        axios({
            method: 'post',
            url: '/api/cbfxqtjgqs/',
            data: {
                name: this.state.nameListJg,
                date: [this.state.startTime || '', this.state.endTime || '']
            },
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.data)
            var jgqsData = res.data.data
            // var jgqsData = JGQSDATA
            var sevenName = []
            var sevenXAxis = []
            if (this.state.nameListJg.length > 0 && this.state.startTime && this.state.endTime){
               
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
    dhqsPostData() {

        axios({
            method: 'post',
            url: '/api/cbfxqtdhqs/',
            data: {
                name: this.state.nameListDh,
                date: [this.state.startTime, this.state.endTime]
            },
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then(res => {
            // var DHData = DHQS
            console.log(res.data)
            var DHData = res.data.data
            var nineName = []
            var nineXAxis = []
            if (this.state.nameListDh.length > 0 && this.state.startTime && this.state.endTime){
                DHData.forEach((obj, index) => {
                    nineName.push(obj.name)
                    if( obj.data &&  obj.data.length >0){
                        obj.data = obj.data.map(item => {
                            if (index === 0) {
                                nineXAxis.push(`${item.date.split('-')[2]}日`)
                            }
                            return item.qcrdh
                        })
                        obj.XList = nineXAxis
                        obj.type = 'line'
                    }
                })
    
                this.setState({
                    nineLegend: nineName,
                    nineListData: DHData
                })
            }else {
                let one = []
                let two = []
                let three = []
                let four = []
                let five = []
                let allArray = []
                DHData.forEach((obj)=>{
                    nineXAxis.push(`${obj.date.split('-')[2]}日`)
                    obj.data.forEach((item,index)=>{
                        nineName.push(item.name)
                        if(index== 0){
                            one.push(item.qcrdh)
                        }
                        if(index== 1){
                            two.push(item.qcrdh)
                        }
                        if(index== 2){
                            three.push(item.qcrdh)
                        }
                        if(index== 3){
                            four.push(item.qcrdh)
                        }
                        if(index== 4){
                            five.push(item.qcrdh)
                        }
                    })
                })
                let listAll= [one,two,three,four,five]
                for(let i=0;i<5;i++){
                    allArray.push({
                        name: nineName[i],
                        type : 'line',
                        XList: nineXAxis,
                        data:listAll[i]
                    })
                }
                this.setState({
                    nineLegend: nineName,
                    nineListData: allArray
                })
            }
        })

    }
    // 价格趋势名称
    cantFatherData(val, name) {
        if (name === '价格趋势') {
            this.setState({
                nameListJg: [val]
            }, () => {
                if (this.state.nameListJg.length > 0 && this.state.startTime && this.state.endTime) {
                    this.setState({
                        sevenLegend: [],
                        sevenListData: []
                        
                    },()=>{
                        this.jgqsPostData()
                    })
                   
                }

            })

        } else {
            this.setState({
                nameListDh: [val]
            }, () => {
                if (this.state.nameListDh.length > 0 && this.state.startTime && this.state.endTime) {
                    this.setState({
                        nineLegend: [],
                        nineListData: []
                    },()=>{
                        this.dhqsPostData()
                    })
                   
                }

            })
        }
    }
    // 时间选择
    childDateTime(startTime, endTime, name) {
        // console.log(startTime, endTime)
        this.setState({
            startTime: startTime,
            endTime: endTime,
        }, () => {
            if (name === '价格趋势') {
                this.setState({
                    sevenLegend: [],
                    sevenListData: []
                    
                },()=>{
                    this.jgqsPostData()
                })
            } else {
                this.setState({
                    nineLegend: [],
                    nineListData: []
                },()=>{
                    this.dhqsPostData()
                })
            }
        })

    }
    render() {
        return (
            <div className="const-analysis-body">
                <OneTable data={this.state.qtYield} componentName={this.state.sinterCostAnalysisname} />
                <ChangLiang data={this.state.qtMonthYield} componentName={'产量'} type={'球团'} xAxis={this.state.xAxis} legend={this.state.legend} titleName={this.state.titleName.oneName} />
                <ChangLiang data={this.state.qtDateYield} componentName={'产量'} type={'球团'} xAxis={this.state.DateXAxis} legend={this.state.legend} titleName={this.state.titleName.twoName} />
                <EchartsBar data={this.state.qtMonthYield} componentName={'成本'} type={'球团'} xAxis={this.state.xAxis} legend={this.state.Twolegend} titleName={this.state.titleName.threeName} />
                <ChangLiang data={this.state.qtDateYield} componentName={'成本'} type={'球团'} xAxis={this.state.DateXAxis} legend={this.state.Twolegend} titleName={this.state.titleName.fourName} />
                <ChenBen data={this.state.qtDateYield} type={'球团'} xAxis={this.state.DateXAxis} legend={this.state.Threelegend} titleName={this.state.titleName.fiveName} />
                <SelectEcharts

                    legend={this.state.sevenLegend}
                    titleName={'价格趋势'}
                    nameList={this.state.childrenJGName}
                    echartsData={this.state.sevenListData}
                    cantFatherData={this.cantFatherData.bind(this)}
                    childDateTime={this.childDateTime.bind(this)}
                    componentName={'价格趋势'}
                />
                <EchartsPie componentName={this.state.sinterCostAnalysisname} titleName={this.state.titleName.eightName} legend={this.state.eightlegend} cirlData={this.state.cirlData} />
                <SelectEcharts
 
                    legend={this.state.nineLegend}
                    titleName={'单耗趋势'}
                    nameList={this.state.childrenDHName}
                    echartsData={this.state.nineListData}
                    cantFatherData={this.cantFatherData.bind(this)}
                    childDateTime={this.childDateTime.bind(this)}
                    componentName={'单耗趋势'}
                />
            </div>
        )
    }
}
export default PelletCostAnalysis