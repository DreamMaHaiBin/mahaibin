import React, { Component } from "react";
import OneTable from './children/oneTable'
import ChangLiang from './children/chanliang1'
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
                <ChangLiang/>
            </div>
        )
    }

}
export default CostAnalysis