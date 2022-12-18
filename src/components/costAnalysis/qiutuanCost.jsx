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
            sjYield:{}, // 球团产量 第一张表格
            sjMonthYield:[], // 球团月产量
            sjDateYield: [], // 球团日产量
            sjYearCost: [], // 球团年成本
            sjMonthCost: [], // 球团月成本
            sjDateCost: [], // 球团日成本
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
            }
        }
    }
    componentDidMount(){
        // axios.get('/api/cbfxry/').then(res => {
            const listData = data
            data.qty.forEach(obj => {
                this.state.sjMonthYield.push({...obj})
            })
            data.qtr.forEach(obj =>{
                this.state.sjDateYield.push({...obj})
            })
            this.state.titleName.oneName = new Date(this.state.sjMonthYield[0].date).getFullYear() + '年球团产量'
            this.state.titleName.twoName = (new Date(this.state.sjDateYield[0].date).getMonth() + 1) + '月球团产量'
            this.state.titleName.threeName = new Date(this.state.sjMonthYield[0].date).getFullYear() + '年球团成本'
            this.state.titleName.fourName = (new Date(this.state.sjDateYield[0].date).getMonth() + 1) + '月球团成本'
            this.setState({
                sjYield: data.sjr[data.sjr.length-1],
                sjMonthYield: this.state.sjMonthYield,
                sjDateYield: this.state.sjDateYield,
                DateXAxis: this.getMonthDate(this.state.sjDateYield[0].date),
                titleName: this.state.titleName
            })
            console.log(this.state.sjDateYield)
            
        // })
    }
    getMonthDate(total){
        let date = []
        for(let i = 1; i<= getMonthLength(total);i++){
            date.push(i+'日')
        }
        return date
    }
    render() {
        return (
            <div className="const-analysis-body">
                <OneTable data={this.state.sjYield} componentName={this.state.sinterCostAnalysisname} />
                <ChangLiang data={this.state.sjMonthYield} componentName={'产量'} xAxis={this.state.xAxis} legend={this.state.legend} titleName={this.state.titleName.oneName}/>
                <ChangLiang data={this.state.sjDateYield} componentName={'产量'}  xAxis={this.state.DateXAxis} legend={this.state.legend} titleName={this.state.titleName.twoName}/>
                <EchartsBar data={this.state.sjMonthYield} componentName={'成本'} xAxis={this.state.xAxis} legend={this.state.Twolegend} titleName={this.state.titleName.threeName}/>
                <ChangLiang data={this.state.sjDateYield} componentName={'成本'} xAxis={this.state.DateXAxis} legend={this.state.Twolegend} titleName={this.state.titleName.fourName}/>
                <ChenBen data={this.state.sjDateYield} componentName={'球团'} xAxis={this.state.DateXAxis} legend={this.state.Threelegend} titleName={this.state.titleName.fiveName}/>
                <SelectEcharts data={this.state.sjMonthYield} componentName={'产量'} xAxis={this.state.xAxis} legend={this.state.endLegend} titleName={this.state.titleName.sixName}/>
                <EchartsPie componentName={this.state.sinterCostAnalysisname} titleName={this.state.titleName.eightName}/>
                <SelectEcharts data={this.state.sjMonthYield} componentName={'产量'} xAxis={this.state.xAxis} legend={this.state.endLegend}  titleName={this.state.titleName.sevenName}/>
            </div>
        )
    }

}
export default PelletCostAnalysis