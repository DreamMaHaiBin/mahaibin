//成本明细
import React, { Component } from "react";
export default class BudgetMingXi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dos:[],
            con:{},
        }
    }
    componentDidMount() {
       this.setState({
        dos:this.props.conputedInfo.dos,
        con:this.props.conputedInfo.con,
       })
    }
    render() {
   ////console.log(this.props.conputedInfo);
   
        return (
            <div className="top">
                <h3 className="h3">混合煤配煤方案</h3>
                <table className="tableGufei">   
                    <tbody>
                        <tr>
                            <td>序号</td>
                            <td>名称</td>
                            <td>配料量Kg</td>
                            <td>配料量%</td>
                            <td>价格(元)</td>
                            <td>成本(元)</td>
                            <td>成本%</td>
                        </tr>
                        
                        {
                           this.props.conputedInfo.dos.map((item,index)=>{
                                return(
                                    <tr className="trgufei"key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.pll).toFixed(2)==="0.00" ?null : Number(item.pll).toFixed(2) }</td>
                                        <td>{Number(item.radio).toFixed(2)==="0.00" ?null : Number(item.radio).toFixed(2) }</td>
                                        <td>{Number(item.price).toFixed(2)==="0.00" ?null : Number(item.price).toFixed(2) }</td>
                                        <td>{Number(item.cb).toFixed(2)==="0.00" ?null : Number(item.cb).toFixed(2) }</td>
                                        <td>{Number(item.cbb).toFixed(2)==="0.00" ?null : Number(item.cbb).toFixed(2) }</td>
                                    </tr>
                                )
                            })
                        }
                      
                    </tbody>
                </table>
                <h3 className="h3">煤粉物化性能</h3>
                <table className="table-two">
                    <tbody>
                        <tr>
                           <td>灰分,%</td>
                           <td>挥发分,%</td>
                           <td>硫含量,%</td>
                           <td>固定碳,%</td>
                           <td>发热值,j/g</td>
                           <td>烟煤比,%</td>
                        </tr>
                        <tr>
                            <td>{Number(this.props.conputedInfo.con.hf).toFixed(2)==="0.00" ? null : Number(this.props.conputedInfo.con.hf).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.hff).toFixed(2)==="0.00" ? null : Number(this.props.conputedInfo.con.hff).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.s).toFixed(2)==="0.00" ? null : Number(this.props.conputedInfo.con.s).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.c).toFixed(2)==="0.00" ? null : Number(this.props.conputedInfo.con.c).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.frz).toFixed(2)==="0.00" ? null : Number(this.props.conputedInfo.con.frz).toFixed(2)}</td>
                            <td>{Number(this.props.conputedInfo.con.ymb).toFixed(2)==="0.00" ? null : Number(this.props.conputedInfo.con.ymb).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
