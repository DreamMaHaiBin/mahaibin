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
            FurnaceCostAnalysisName: {
                planNumber1:22800,
                planNumber2:520,
                planNumber3:3580,
                complete1:22950,
                complete2:512,
                complete3:3575,
                name:"高炉"
            }
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