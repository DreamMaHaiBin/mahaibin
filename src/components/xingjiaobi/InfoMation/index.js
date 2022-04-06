import React,{Component} from "react";
import {Table} from "antd";
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import { withRouter } from "react-router";

//展示计算结果所用的数据
class InfoMation extends Component{
    constructor(props){
      super(props);
       this.state={
        info:[],
        href:''
       }
    }
    componentWillMount(){
      var test = window.location.href;
      var href=test.split("/")
      this.setState({
        href:href[4]
      })
      console.log(href[4]);
    }
      render(){
        const {cogntionAjax}=this.props
        const {compare}=this.props  
        const {coke}=this.props     
        const {cloumru}=this.props      
        // console.log(coke);
         
        return(
          <div>
            <Table 
             columns={this.state.href==="braize"?cogntionAjax.columns:this.state.href==="coke" ?coke.columns:(this.state.href==="compare" || this.state.href==="bePutInAFurnace")?compare.columns:cloumru.columns}
             dataSource={this.props.info}
             pagination={false}
             scroll={{x:600}}
             style={{background:"#fff",}}
             rowKey={this.state.href==="braize"?"id": this.state.href==="coke"?"id":"oreId"}
             />
          </div>
        )
      }
  }
  export default withRouter(connect(state => state)(InfoMation));