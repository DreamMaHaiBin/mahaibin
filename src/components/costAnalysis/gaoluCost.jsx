import React, { Component } from "react";
import OneTable from './children/oneTable'
import ChangLiang from './children/chanliang1'
import EchartsBar from './children/echartsBar'
import EchartsPie from './children/echartsCirl'
import './index.scss'
class FurnaceCostAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            FurnaceCostAnalysisName: '高炉'
        }
    }
    render() {
        return (
            <div className="const-analysis-body">
                <OneTable componentName={this.state.FurnaceCostAnalysisName}/>
                <EchartsBar componentName={this.state.FurnaceCostAnalysisName}/>
                <ChangLiang componentName={this.state.FurnaceCostAnalysisName}/>
                <EchartsBar componentName={this.state.FurnaceCostAnalysisName}/>
                <ChangLiang componentName={this.state.FurnaceCostAnalysisName}/>
                <ChangLiang componentName={this.state.FurnaceCostAnalysisName}/>
                <ChangLiang componentName={this.state.FurnaceCostAnalysisName}/>
                <EchartsPie componentName={this.state.FurnaceCostAnalysisName}/>
                <ChangLiang componentName={this.state.FurnaceCostAnalysisName}/>
            </div>
        )
    }

}
export default FurnaceCostAnalysis