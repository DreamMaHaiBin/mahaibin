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
            Twolegend: ['铁前总成本', '二烧成本', "三烧成本"],
            Threelegend: ['二烧', "三烧"],
            DateXAxis: [],
            titleName: {
                oneName: '2022烧结产量',
                twoName: '7月烧结产量',
                threeName: '2022烧结成本',
                fourName: '7月烧结成本',
                fiveName: '含铁料占成本比',
                sixName: '价格趋势',
                sevenName: '单耗趋势',
                eightName: '烧结成本构成'
            },
            nameList: ['name', 'name1', 'name2', 'name3'],
            dhNameList: ['dhname', 'dhname1', 'dhname2', 'dhname3']
        }
        this.getNameData()
        this.getConsumptionData()
    }
    componentDidMount() {
        // axios.get('/api/cbfxry/').then(res => {
        const listData = data
        data.sjy.forEach(obj => {
            this.state.sjMonthYield.push({ ...obj })
        })
        data.sjr.forEach(obj => {
            this.state.sjDateYield.push({ ...obj })
        })
        this.state.titleName.oneName = new Date(this.state.sjMonthYield[0].date).getFullYear() + '年烧结产量'
        this.state.titleName.twoName = (new Date(this.state.sjDateYield[0].date).getMonth() + 1) + '月烧结产量'
        this.state.titleName.threeName = new Date(this.state.sjMonthYield[0].date).getFullYear() + '年烧结成本'
        this.state.titleName.fourName = (new Date(this.state.sjDateYield[0].date).getMonth() + 1) + '月烧结成本'
        this.setState({
            sjYield: data.sjr[data.sjr.length - 1],
            sjMonthYield: this.state.sjMonthYield,
            sjDateYield: this.state.sjDateYield,
            DateXAxis: this.getMonthDate(this.state.sjDateYield[0].date),
            titleName: this.state.titleName
        })
        console.log(this.state.sjDateYield)

        // })
    }
    getMonthDate(total) {
        let date = []
        for (let i = 1; i <= getMonthLength(total); i++) {
            date.push(i + '日')
        }
        return date
    }
    getNameData() {
        // axios({
        //     method: 'get',
        //     url: '/api/cbfxsjjgqs/',
        //     data: {
        //         name: ''
        //     },
        //     headers: {
        //         Authorization: sessionStorage.getItem("token")
        //     }
        // }).then(res => {
        //     var data = ['name', 'name1', 'name2', 'name3']
        //     this.setState({
        //         nameList: res.data
        //     })
        // }).catch((error) => {
            // var data = ['name', 'name1', 'name2', 'name3']
            // this.setState({
            //     nameList: data
            // })
        // })
    }
    // 价格单耗趋势名称
    getConsumptionData(){
                // axios({
        //     method: 'get',
        //     url: '/api/cbfxsjdhqs/',
        //     data: {
        //         name: ''
        //     },
        //     headers: {
        //         Authorization: sessionStorage.getItem("token")
        //     }
        // }).then(res => {
        //     var data = ['name', 'name1', 'name2', 'name3']
        //     this.setState({
        //         nameList: res.data
        //     })
        // }).catch((error) => {
            // var data = ['name', 'name1', 'name2', 'name3']
            // this.setState({
            //     nameList: data
            // })
        // })
    }
    // 价格趋势名称
    cantFatherData(val){
        console.log(val)
       // axios({
        //     method: 'get',
        //     url: '/api/cbfxsjjgqs/',
        //     data: {
        //         name: val
        //     },
        //     headers: {
        //         Authorization: sessionStorage.getItem("token")
        //     }
        // }).then(res => {
        //     var data = ['name', 'name1', 'name2', 'name3']
        //     this.setState({
        //         nameList: res.data
        //     })
        // }).catch((error) => {
            // var data = ['name', 'name1', 'name2', 'name3']
            // this.setState({
            //     nameList: data
            // })
        // })
    }
    // 时间选择
    childDateTime(startTime,endTime){
    console.log(startTime,startTime)
        // axios({
        //     method: 'get',
        //     url: '/api/cbfxsjjgqs/',
        //     data: {
        //         startTime: val,
        //         endTime: val,
        //     },
        //     headers: {
        //         Authorization: sessionStorage.getItem("token")
        //     }
        // }).then(res => {
        //     var data = ['name', 'name1', 'name2', 'name3']
        //     this.setState({
        //         nameList: res.data
        //     })
        // }).catch((error) => {
            // var data = ['name', 'name1', 'name2', 'name3']
            // this.setState({
            //     nameList: data
            // })
        // })
    }
    render() {
        return (
            <div className="const-analysis-body">
                <OneTable data={this.state.sjYield} componentName={this.state.sinterCostAnalysisname} />
                <ChangLiang data={this.state.sjMonthYield} componentName={'产量'} xAxis={this.state.xAxis} legend={this.state.legend} titleName={this.state.titleName.oneName} />
                <ChangLiang data={this.state.sjDateYield} componentName={'产量'} xAxis={this.state.DateXAxis} legend={this.state.legend} titleName={this.state.titleName.twoName} />
                <EchartsBar data={this.state.sjMonthYield} componentName={'成本'} xAxis={this.state.xAxis} legend={this.state.Twolegend} titleName={this.state.titleName.threeName} />
                <ChangLiang data={this.state.sjDateYield} componentName={'成本'} xAxis={this.state.DateXAxis} legend={this.state.Twolegend} titleName={this.state.titleName.fourName} />
                <ChenBen data={this.state.sjDateYield} componentName={'烧结'} xAxis={this.state.DateXAxis} legend={this.state.Threelegend} titleName={this.state.titleName.fiveName} />
                <SelectEcharts 
                    data={this.state.sjMonthYield} 
                    componentName={'产量'} 
                    xAxis={this.state.xAxis} 
                    legend={this.state.legend} 
                    titleName={this.state.titleName.sixName}
                    nameList={this.state.nameList} 
                    cantFatherData={this.cantFatherData}
                    childDateTime ={this.childDateTime }
                />
                <EchartsPie componentName={this.state.sinterCostAnalysisname} titleName={this.state.titleName.eightName} />
                <SelectEcharts 
                    data={this.state.sjMonthYield} 
                    componentName={'产量'} 
                    xAxis={this.state.xAxis} 
                    legend={this.state.legend} 
                    titleName={this.state.titleName.sevenName} 
                    nameList={this.state.dhNameList} 
                    cantFatherData={this.cantFatherData}
                    childDateTime ={this.childDateTime }
                />
            </div>
        )
    }

}
export default CostAnalysis