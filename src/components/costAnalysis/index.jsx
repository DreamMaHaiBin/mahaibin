import React, { Component } from "react";
import OneTable from './children/oneTable'
import ChangLiang from './children/chanliang1'
import EchartsBar from './children/echartsBar'
import EchartsPie from './children/echartsCirl'
import './index.scss'
class CostAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sinterCostAnalysisname: '烧结'
        }
    }
    render() {
        return (
            <div className="const-analysis-body">
                <OneTable componentName={this.state.sinterCostAnalysisname}/>
                <ChangLiang componentName={this.state.sinterCostAnalysisname}/>
                <ChangLiang componentName={this.state.sinterCostAnalysisname} index={2}/>
                <EchartsBar componentName={this.state.sinterCostAnalysisname}/>
                <ChangLiang componentName={this.state.sinterCostAnalysisname} index={3}/>
                <ChangLiang componentName={this.state.sinterCostAnalysisname} index={4}/>
                <ChangLiang componentName={this.state.sinterCostAnalysisname } index={5}/>
                <EchartsPie componentName={this.state.sinterCostAnalysisname}/>
                <ChangLiang componentName={this.state.sinterCostAnalysisname} index={6}/>
            </div>
        )
    }

}
export default CostAnalysis