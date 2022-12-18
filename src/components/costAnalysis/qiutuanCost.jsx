import React, { Component } from "react";
import OneTable from './children/oneTable'
import ChangLiang from './children/chanliang1'
import EchartsBar from './children/echartsBar'
import EchartsPie from './children/echartsCirl'
import { getMonthLength } from '../util/commonFunction'
import ChenBen from './children/chanliang1/twoChars'
import { data } from "../util/datas";
import './index.scss'
import SelectEcharts from './children/chanliang1/selectCharts'
class PelletCostAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            PelletCostAnalysisName: '球团',
            qtYield:{}, // 球团产量 第一张表格
            qtMonthYield:[], // 球团月产量
            qtDateYield: [], // 球团日产量
            qtYearCost: [], // 球团年成本
            qtMonthCost: [], // 球团月成本
            qtDateCost: [], // 球团日成本
            xAxis: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            legend: ['产量','一球',"二球"],
            endLegend: ['大石河商品粉','水滴粉',"承德低钛粉"],
            Twolegend: ['铁前总成本','一球成本',"二球成本"],
            Threelegend: ['一球',"二球"],
            DateXAxis: [],
            titleName: {
                oneName: '2022球团产量',
                twoName: '7月球团产量',
                threeName: '2022球团成本',
                fourName: '7月球团成本',
                fiveName: '含铁料占成本比',
                sixName: '价格趋势',
                sevenName: '单耗趋势',
                eightName: '球团成本构成'
            },
            nameList: ['QTname', 'QTname1', 'QTname2', 'QTname3'],
            dhNameList: ['qtdhname', 'qtdhname1', 'qtdhname2', 'qtdhname3']
        }
        this.getNameData()
        this.getConsumptionData()
    }
    componentDidMount(){
        // axios.get('/api/cbfxry/').then(res => {
            const listData = data
            data.qty.forEach(obj => {
                this.state.qtMonthYield.push({...obj})
            })
            data.qtr.forEach(obj =>{
                this.state.qtDateYield.push({...obj})
            })
            this.state.titleName.oneName = new Date(this.state.qtMonthYield[0].date).getFullYear() + '年球团产量'
            this.state.titleName.twoName = (new Date(this.state.qtDateYield[0].date).getMonth() + 1) + '月球团产量'
            this.state.titleName.threeName = new Date(this.state.qtMonthYield[0].date).getFullYear() + '年球团成本'
            this.state.titleName.fourName = (new Date(this.state.qtDateYield[0].date).getMonth() + 1) + '月球团成本'
            this.setState({
                qtYield: data.qtr[data.qtr.length-1],
                qtMonthYield: this.state.qtMonthYield,
                qtDateYield: this.state.qtDateYield,
                DateXAxis: this.getMonthDate(this.state.qtDateYield[0].date),
                titleName: this.state.titleName
            })
            console.log(this.state.qtDateYield)
            
        // })
    }
    getMonthDate(total){
        let date = []
        for(let i = 1; i<= getMonthLength(total);i++){
            date.push(i+'日')
        }
        return date
    }
    getNameData() {
        // axios({
        //     method: 'get',
        //     url: '/api/cbfxqtjgqs/',
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
        //     url: '/api/cbfxqtdhqs/',
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
        //     url: '/api/cbfxqtjgqs/',
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
        //     url: '/api/cbfxqtjgqs/',
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
                <OneTable data={this.state.qtYield} componentName={this.state.sinterCostAnalysisname} />
                <ChangLiang data={this.state.qtMonthYield} componentName={'产量'} xAxis={this.state.xAxis} legend={this.state.legend} titleName={this.state.titleName.oneName}/>
                <ChangLiang data={this.state.qtDateYield} componentName={'产量'}  xAxis={this.state.DateXAxis} legend={this.state.legend} titleName={this.state.titleName.twoName}/>
                <EchartsBar data={this.state.qtMonthYield} componentName={'成本'} xAxis={this.state.xAxis} legend={this.state.Twolegend} titleName={this.state.titleName.threeName}/>
                <ChangLiang data={this.state.qtDateYield} componentName={'成本'} xAxis={this.state.DateXAxis} legend={this.state.Twolegend} titleName={this.state.titleName.fourName}/>
                <ChenBen data={this.state.qtDateYield} componentName={'球团'} xAxis={this.state.DateXAxis} legend={this.state.Threelegend} titleName={this.state.titleName.fiveName}/>
                <SelectEcharts 
                data={this.state.qtMonthYield} 
                componentName={'产量'} 
                xAxis={this.state.xAxis} 
                legend={this.state.endLegend} 
                titleName={this.state.titleName.sixName}
                nameList={this.state.nameList} 
                cantFatherData={this.cantFatherData}
                childDateTime ={this.childDateTime }
                />
                <EchartsPie componentName={this.state.sinterCostAnalysisname} titleName={this.state.titleName.eightName}/>
                <SelectEcharts 
                data={this.state.qtMonthYield} 
                componentName={'产量'} 
                xAxis={this.state.xAxis} 
                legend={this.state.endLegend} 
                 titleName={this.state.titleName.sevenName}
                 nameList={this.state.dhNameList} 
                 cantFatherData={this.cantFatherData}
                 childDateTime ={this.childDateTime }
                 />
            </div>
        )
    }

}
export default PelletCostAnalysis