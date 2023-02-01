import React, { Component } from "react";
import OneTable from './children/oneTable'
import ChangLiang from './children/chanliang1'
import EchartsBar from './children/echartsBar'
import ChenBen from './children/chanliang1/twoChars'
import SelectEcharts from './children/chanliang1/selectCharts'
import EchartsPie from './children/echartsCirl'
import axios from "axios"
import './index.scss'
import { data } from "../util/datas";
import { JGQSDATA, DHQS } from '../util/jgqsData'
import { getMonthLength } from '../util/commonFunction'

class CostAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sinterCostAnalysisname: '烧结',
            sjYield: {}, // 烧结产量 第一张表格
            sjMonthYield: [], // 烧结月产量
            sjDateYield: [], // 烧结日产量
            sjYearCost: [], // 烧结年成本
            sjMonthCost: [], // 烧结月成本
            sjDateCost: [], // 烧结日成本
            xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            legend: ['产量', '二烧', "三烧"],
            Twolegend: ['烧结月成本', '二烧成本', "三烧成本"],
            fivelegend: ['烧结日成本', '二烧成本', "三烧成本"],
            sevenLegend: [],
            sevenListData: [],
            nineListData: [],
            nineLegend: [],
            startTime: '',
            endTime: '',
            eightLegend: ['精矿粉', '迁钢返矿', '迁钢废料', '溶剂', '燃烧及动力', '制造费'],
            cirlData: [
                { value: 510, name: '精矿粉' },
                { value: 510, name: '迁钢返矿' },
                { value: 434, name: '迁钢废料' },
                { value: 335, name: '溶剂' },
                { value: 335, name: '燃烧及动力' },
                { value: 335, name: '制造费' }
            ],
            Threelegend: ['二烧', "三烧"],
            DateXAxis: [],
            titleName: {
                oneName: '2022烧结产量',
                twoName: '7月烧结产量',
                threeName: '2022烧结成本',
                fourName: '7月烧结成本',
                fiveName: '含铁料占成本比例',
                sixName: '价格趋势',
                sevenName: '单耗趋势',
                eightName: '烧结成本构成'
            },
            jgnameList: [],
            childrenJGName:[],
            childrenDHName:[],
            dhNameList: []
        }

    }
    componentDidMount() {
        this.getInitData()
        this.getNameDataJG()
        this.getDHQSData()
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
                cirlData: res.data.sj
            })
        })
    }
    // 获取初始化数据
    getInitData() {
        // axios({
        //     method: 'get',
        //     url: '/api/cbfxry/',
        //     headers: {
        //         Authorization: sessionStorage.getItem("token")
        //     }
        // }).then((res) => {
        //     const listData = res.data
        // console.log(data)
            const listData = data
            listData.sjy.forEach(obj => {
                this.state.sjMonthYield.push({ ...obj })
            })
            listData.sjr.forEach(obj => {
                this.state.sjDateYield.push({ ...obj })
            })
            this.setState({
                sjYield: listData.sjr[listData.sjr.length - 1],
                sjMonthYield: this.state.sjMonthYield,
                sjDateYield: this.state.sjDateYield,
                DateXAxis: this.getMonthDate(this.state.sjDateYield[0].date),
                titleName: {
                    oneName: new Date(this.state.sjMonthYield[0].date).getFullYear() + '年烧结产量',
                    twoName: (new Date(this.state.sjDateYield[0].date).getMonth() + 1) + '月烧结产量',
                    threeName: new Date(this.state.sjMonthYield[0].date).getFullYear() + '年烧结成本',
                    fourName: (new Date(this.state.sjDateYield[0].date).getMonth() + 1) + '月烧结成本',
                    fiveName: (new Date(this.state.sjDateYield[0].date).getMonth() + 1) + '月含铁料占成本比例',
                    eightName: new Date(this.state.sjDateYield[0].date).getDate() + '日烧结成本构成'
                }
            })
            // console.log(this.state.sjDateYield)
        // })
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
            url: '/api/cbfxsjjgqs/',
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
            url: '/api/cbfxsjjgqs/',
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
            url: '/api/cbfxsjjgqs/',
            data: {
                name: this.state.jgnameList,
                date: [this.state.startTime || '', this.state.endTime || '']
            },
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then(res => {
 
            var jgqsData = res.data.data
            // var jgqsData = [{ "date": "2023-01-06", "data": [{ "name": "1.自产精矿粉-低品", "qcdj": 1070.85 }, { "name": "2.自产精矿粉-高品", "qcdj": 1090.09 }, { "name": "3.大石河秘矿产粉", "qcdj": 0.0 }, { "name": "3.地方粉", "qcdj": 0.0 }, { "name": "地方铁精粉 高品", "qcdj": 1140.04 }, { "name": "马兰庄铁精粉", "qcdj": 0.0 }] }, { "date": "2023-01-07", "data": [{ "name": "1.自产精矿粉-低品", "qcdj": 1070.85 }, { "name": "2.自产精矿粉-高品", "qcdj": 1090.09 }, { "name": "3.大石河秘矿产粉", "qcdj": 0.0 }, { "name": "3.地方粉", "qcdj": 0.0 }, { "name": "地方铁精粉 高品", "qcdj": 1140.04 }, { "name": "马兰庄铁精粉", "qcdj": 0.0 }] }, { "date": "2023-01-08", "data": [{ "name": "1.自产精矿粉-低品", "qcdj": 1070.85 }, { "name": "2.自产精矿粉-高品", "qcdj": 1090.09 }, { "name": "3.大石河秘矿产粉", "qcdj": 0.0 }, { "name": "3.地方粉", "qcdj": 1140.04 }, { "name": "地方铁精粉 高品", "qcdj": 1140.04 }, { "name": "马兰庄铁精粉", "qcdj": 0.0 }] }, { "date": "2023-01-09", "data": [{ "name": "1.自产精矿粉-低品", "qcdj": 1070.85 }, { "name": "2.自产精矿粉-高品", "qcdj": 1090.09 }, { "name": "3.大石河秘矿产粉", "qcdj": 0.0 }, { "name": "3.地方粉", "qcdj": 1140.04 }, { "name": "地方铁精粉 高品", "qcdj": 1140.04 }, { "name": "马兰庄铁精粉", "qcdj": 0.0 }] }, { "date": "2023-01-10", "data": [{ "name": "1.自产精矿粉-低品", "qcdj": 1070.85 }, { "name": "2.自产精矿粉-高品", "qcdj": 1090.09 }, { "name": "3.大石河秘矿产粉", "qcdj": 0.0 }, { "name": "3.地方粉", "qcdj": 1140.04 }, { "name": "地方铁精粉 高品", "qcdj": 1140.04 }, { "name": "马兰庄铁精粉", "qcdj": 0.0 }] }] 
            var sevenName = []
            console.log(jgqsData)
            var sevenXAxis = []
            if (this.state.jgnameList && this.state.startTime && this.state.endTime) {

                jgqsData.forEach((obj, index) => {
                    sevenName.push(obj.name)
                    if (obj.data && obj.data.length > 0) {
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
            } else {
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
            url: '/api/cbfxsjdhqs/',
            data: {
                name: this.state.dhNameList,
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
            if (this.state.dhNameList && this.state.startTime && this.state.endTime) {
                DHData.forEach((obj, index) => {
                    nineName.push(obj.name)
                    if (obj.data && obj.data.length > 0) {
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
            } else {
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
                jgnameList: [val]
            }, () => {
                if (this.state.jgnameList.length > 0 && this.state.startTime && this.state.endTime) {
                    this.setState({
                        sevenLegend: [],
                        sevenListData: [], 
                    },()=>{
                        this.jgqsPostData()
                    })
                    
                }
            })

        } else {
            this.setState({
                dhNameList: [val]
            }, () => {
                if (this.state.dhNameList.length > 0 && this.state.startTime && this.state.endTime) {
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
                if (this.state.jgnameList.length > 0 && this.state.startTime && this.state.endTime) {
                    this.setState({
                        sevenLegend: [],
                        sevenListData: [], 
                    },()=>{
                        this.jgqsPostData()
                    })
                }
            } else {
                if (this.state.dhNameList.length > 0 && this.state.startTime && this.state.endTime) {
                    this.setState({
                        nineLegend: [],
                        nineListData: []
                    },()=>{
                        this.dhqsPostData()
                    })
                }
            }
        })

    }
    render() {
        return (
            <div className="const-analysis-body">
                <OneTable data={this.state.sjYield} componentName={this.state.sinterCostAnalysisname} />
                <ChangLiang data={this.state.sjMonthYield} componentName={'产量'} type={'烧结'} xAxis={this.state.xAxis} legend={this.state.legend} titleName={this.state.titleName.oneName} />
                <ChangLiang data={this.state.sjDateYield} componentName={'产量'} type={'烧结'} xAxis={this.state.DateXAxis} legend={this.state.legend} titleName={this.state.titleName.twoName} />
                <EchartsBar data={this.state.sjMonthYield} componentName={'成本'} type={'烧结'} xAxis={this.state.xAxis} legend={this.state.Twolegend} titleName={this.state.titleName.threeName} />
                <ChangLiang data={this.state.sjDateYield} componentName={'成本'} type={'烧结'} xAxis={this.state.DateXAxis} legend={this.state.fivelegend} titleName={this.state.titleName.fourName} />
                <ChenBen data={this.state.sjDateYield} type={'烧结'} xAxis={this.state.DateXAxis} legend={this.state.Threelegend} titleName={this.state.titleName.fiveName} />
                <SelectEcharts
                    legend={this.state.sevenLegend}
                    titleName={'价格趋势'}
                    nameList={this.state.childrenJGName}
                    echartsData={this.state.sevenListData}
                    cantFatherData={this.cantFatherData.bind(this)}
                    childDateTime={this.childDateTime.bind(this)}
                    componentName={'价格趋势'}
                />
                <EchartsPie componentName={this.state.sinterCostAnalysisname} titleName={this.state.titleName.eightName} legend={this.state.eightLegend} cirlData={this.state.cirlData} />
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
export default CostAnalysis