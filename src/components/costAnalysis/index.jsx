import React, { Component } from "react";
import OneTable from './children/oneTable'
class CostAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <OneTable/>
            </div>
        )
    }

}
export default CostAnalysis