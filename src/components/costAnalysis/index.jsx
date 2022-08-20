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

        }
    }
    render() {
        return (
            <div className="const-analysis-body">
                <OneTable/>
                <ChangLiang/>
                <ChangLiang/>
                <EchartsBar/>
                <ChangLiang/>
                <ChangLiang/>
                <EchartsPie/>
            </div>
        )
    }

}
export default CostAnalysis