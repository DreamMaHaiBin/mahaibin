import React, { Component } from "react";
import OneTable from './children/oneTable'
import ChangLiang from './children/chanliang1'
import GaoLuBar from './gaoluEcharts/bar'
import GaoLuLines from './gaoluEcharts//lines'
import EchartsPie from './children/echartsCirl'
import { data } from "../util/datas";
import { getMonthLength } from '../util/commonFunction'
import './index.scss'
class FurnaceCostAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            FurnaceCostAnalysisName: '高炉',
            glYield:{}, // 高炉产量 第一张表格
            legend: ['全厂产量','1#高炉',"2#高炉",'3#高炉'],
            glMonthYield:[], // 高炉月产量
            glDateYield: [], // 高炉日产量
            glYearCost: [], // 高炉年成本
            glMonthCost: [], // 高炉月成本
            glDateCost: [], // 高炉日成本
            xAxis: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            Twolegend: ['全厂成本','原料',"冶炼费"],
            Threelegend: ['燃耗',"焦比","煤比","焦丁比"],
            DateXAxis: [],
            titleName: {
                oneName: '2022高炉产量',
                twoName: '7月高炉产量',
                threeName: '2022高炉成本',
                fourName: '7月高炉成本',
                fiveName: '燃料比',
            }
        }
    }
    componentDidMount(){
        // axios.get('/api/cbfxry/').then(res => {
            const listData = data
            data.gly.forEach(obj => {
                this.state.glMonthYield.push({...obj})
            })
            data.glr.forEach(obj =>{
                this.state.glDateYield.push({...obj})
            })
            this.state.titleName.oneName = new Date(this.state.glMonthYield[0].date).getFullYear() + '年高炉产量'
            this.state.titleName.twoName = (new Date(this.state.glDateYield[0].date).getMonth() + 1) + '月高炉产量'
            this.state.titleName.threeName = new Date(this.state.glMonthYield[0].date).getFullYear() + '年铁水成本'
            this.state.titleName.fourName = new Date(this.state.glMonthYield[0].date).getFullYear()+ '年燃料比'
            this.state.titleName.fiveName = (new Date(this.state.glDateYield[0].date).getMonth() + 1) + '月燃料比'
            this.setState({
                glYield: data.glr[data.glr.length-1],
                glMonthYield: this.state.glMonthYield,
                glDateYield: this.state.glDateYield,
                DateXAxis: this.getMonthDate(this.state.glDateYield[0].date),
                titleName: this.state.titleName
            })
            // console.log(this.state.sjDateYield)
            
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
              <OneTable data={this.state.glYield} componentName={this.state.FurnaceCostAnalysisName} />
                <GaoLuBar componentName={this.state.FurnaceCostAnalysisName} legend={this.state.legend} data={this.state.glMonthYield} xAxis={this.state.xAxis} titleName={this.state.titleName.oneName}/>
                <GaoLuLines  data={this.state.glDateYield} componentName={'产量'}  xAxis={this.state.DateXAxis} legend={this.state.legend} titleName={this.state.titleName.twoName}/>
                <GaoLuBar componentName={this.state.FurnaceCostAnalysisName} legend={this.state.Twolegend} data={this.state.glMonthYield} xAxis={this.state.xAxis} titleName={this.state.titleName.threeName}/>
                <GaoLuLines  data={this.state.glDateYield} componentName={'成本'}  xAxis={this.state.xAxis} legend={this.state.Threelegend} titleName={this.state.titleName.fourName}/>
                <GaoLuLines  data={this.state.glDateYield} componentName={'成本'}  xAxis={this.state.DateXAxis} legend={this.state.Threelegend} titleName={this.state.titleName.fiveName}/>
                {/*<ChangLiang componentName={this.state.FurnaceCostAnalysisName}/>
                <EchartsBar componentName={this.state.FurnaceCostAnalysisName}/>
                <ChangLiang componentName={this.state.FurnaceCostAnalysisName}/>
                <ChangLiang componentName={this.state.FurnaceCostAnalysisName}/>
                <ChangLiang componentName={this.state.FurnaceCostAnalysisName}/>
                <EchartsPie componentName={this.state.FurnaceCostAnalysisName}/>
                <ChangLiang componentName={this.state.FurnaceCostAnalysisName}/> */}
            </div>
        )
    }

}
export default FurnaceCostAnalysis