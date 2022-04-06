import React,{ Component } from "react";
export default class MingXi extends Component{
    constructor(props){
        super(props);
        this.state={
            GaoLuMing:[],
            Htl:[],
            Rtl:"",
            Jgtl:"",
            GLHtl:"",
            Jtl:"",
            HeJtl:"",
            RtlOre:[],
            // Rtl:res.data.cost.rl.signalPUnit,//燃料，
            // Jtl:res.data.cost.jgcb.signalPUnit,//加工成本数据
            // Jgtl:res.data.cost.hscb.signalPUnit,//回收成本
            // Htl:res.data.cost.htyl.signalPUnit,//含铁料
            // GLHtl:res.data.cost.glhcb.signalPUnit,//高炉灰成本
            // HeJtl:res.data.cost.hj.signalPUnit,//铁水总成本
            // luz:res.data.source,//炉渣成分
            // qtc:res.data.source,//其他成分
            // ALL:res.data,//成本明细
        }
    }
    componentDidMount(){
        
       //////console.log(this.props.ALL)
        this.setState({
            GaoLuMing:this.props.ALL.cost.htyl,
            Htl:this.props.ALL.cost.htyl.ore,
            Rtl:this.props.ALL.cost.rl,
            RtlOre:this.props.ALL.cost.rl.ore,
            Jgtl:this.props.ALL.cost.hscb,
            GLHtl:this.props.ALL.cost.glhcb,
            Jtl:this.props.ALL.cost.jgcb,
            HeJtl:this.props.ALL.cost.hj,
        })
    }
    render(){
        return(
            <div>
                <table className="tableGufei">
                    <tbody>
                        <tr className="jiachu">
                            <td>序号</td>
                            <td>名称</td>
                            <td>单价，元/t</td>
                            <td>单耗，kg</td>
                            <td>百分比，%</td>
                            <td>单成，元/t</td>
                            <td>百分比，%</td>
                        </tr>
                        <tr className="jiachu">
                            <td>一</td>
                            <td>含铁原料</td>
                            <td>{Number(this.state.GaoLuMing.signalPrice).toFixed(2)==="0.00" ? null : Number(this.state.GaoLuMing.signalPrice).toFixed(2) }</td>
                            <td>{Number(this.state.GaoLuMing.signalUnit).toFixed(2)==="0.00" ? null : Number(this.state.GaoLuMing.signalUnit).toFixed(2) }</td>
                            <td>{Number(this.state.GaoLuMing.precent1).toFixed(2)==="0.00" ? null : Number(this.state.GaoLuMing.precent1).toFixed(2) }</td>
                            <td>{Number(this.state.GaoLuMing.signalPUnit).toFixed(2)==="0.00" ? null : Number(this.state.GaoLuMing.signalPUnit).toFixed(2) }</td>
                            <td>{Number(this.state.GaoLuMing.precent2).toFixed(2)==="0.00" ? null : Number(this.state.GaoLuMing.precent2).toFixed(2) }</td>
                        </tr>
                        {
                            this.state.Htl.map((item,index)=>{
                                if(index<7){
                                   return(
                                    <tr className="trgufei" key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.signalPrice).toFixed(2)==="0.00" ? null : Number(item.signalPrice).toFixed(2) }</td>
                                        <td>{Number(item.signalUnit).toFixed(2)==="0.00" ? null : Number(item.signalUnit).toFixed(2) }</td>
                                        <td>{Number(item.precent1).toFixed(2)==="0.00" ? null : Number(item.precent1).toFixed(2) }</td>
                                        <td>{Number(item.signalPUnit).toFixed(2)==="0.00" ? null : Number(item.signalPUnit).toFixed(2) }</td>
                                        <td>{Number(item.precent2).toFixed(2)==="0.00" ? null : Number(item.precent2).toFixed(2) }</td>
                                    </tr>
                                   )
                                }
                                return null;
                            })
                        }
                         {
                            this.state.Htl.map((item,index)=>{
                                if(index>=7 && index<=9){
                                   return(
                                    <tr className="shihui" key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.signalPrice).toFixed(2)==="0.00" ? null : Number(item.signalPrice).toFixed(2) }</td>
                                        <td>{Number(item.signalUnit).toFixed(2)==="0.00" ? null : Number(item.signalUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent1).toFixed(2)==="0.00" ? null : Number(item.precent1).toFixed(2)}</td>
                                        <td>{Number(item.signalPUnit).toFixed(2)==="0.00" ? null : Number(item.signalPUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent2).toFixed(2)==="0.00" ? null : Number(item.precent2).toFixed(2)}</td>
                                    </tr>
                                   )
                                }
                                return null;
                            })
                        }
                         {
                             this.state.Htl.map((item,index)=>{
                                if(index>=10 && index<=11){
                                   return(
                                    <tr className="shihui" key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.signalPrice).toFixed(2)==="0.00" ? null : Number(item.signalPrice).toFixed(2)}</td>
                                        <td>{Number(item.signalUnit).toFixed(2)==="0.00" ? null : Number(item.signalUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent1).toFixed(2)==="0.00" ? null : Number(item.precent1).toFixed(2)}</td>
                                        <td>{Number(item.signalPUnit).toFixed(2)==="0.00" ? null : Number(item.signalPUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent2).toFixed(2)==="0.00" ? null : Number(item.precent2).toFixed(2)}</td>
                                    </tr>
                                   )
                                }
                                return null;
                            })
                        }
                        <tr className="jiachu">
                            <td>二</td>
                            <td>燃料</td>
                            <td>{Number(this.state.Rtl.signalPrice).toFixed(2)==="0.00" ? null : Number(this.state.Rtl.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.Rtl.signalUnit).toFixed(2)==="0.00" ? null : Number(this.state.Rtl.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.Rtl.precent1).toFixed(2)==="0.00" ? null : Number(this.state.Rtl.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.Rtl.signalPUnit).toFixed(2)==="0.00" ? null : Number(this.state.Rtl.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.Rtl.precent2).toFixed(2)==="0.00" ? null : Number(this.state.Rtl.precent2).toFixed(2)}</td>
                        </tr>
                        {
                            this.state.RtlOre.map((item,index)=>{
                                
                                   return(
                                    <tr className="else" key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.signalPrice).toFixed(2)==="0.00" ? null : Number(item.signalPrice).toFixed(2)}</td>
                                        <td>{Number(item.signalUnit).toFixed(2)==="0.00" ? null : Number(item.signalUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent1).toFixed(2)==="0.00" ? null : Number(item.precent1).toFixed(2)}</td>
                                        <td>{Number(item.signalPUnit).toFixed(2)==="0.00" ? null : Number(item.signalPUnit).toFixed(2)}</td>
                                        <td>{Number(item.precent2).toFixed(2)==="0.00" ? null : Number(item.precent2).toFixed(2)}</td>
                                    </tr>
                                   )
                                
                            })
                        }
                         <tr className="trrj">
                            <td className="jiachu">三</td>
                            <td className="jiachu">回收成本</td>
                            <td>{Number(this.state.Jgtl.signalPrice).toFixed(2)==="0.00" ? null : Number(this.state.Jgtl.signalPrice).toFixed(2) }</td>
                            <td>{Number(this.state.Jgtl.signalUnit).toFixed(2)==="0.00" ? null : Number(this.state.Jgtl.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.Jgtl.precent1).toFixed(2)==="0.00" ? null : Number(this.state.Jgtl.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.Jgtl.signalPUnit).toFixed(2)==="0.00" ? null : Number(this.state.Jgtl.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.Jgtl.precent2).toFixed(2)==="0.00" ? null : Number(this.state.Jgtl.precent2).toFixed(2)}</td>
                        </tr>
                        <tr className="trrj">
                            <td className="jiachu">四</td>
                            <td className="jiachu">高炉灰成本</td>
                            <td>{Number(this.state.GLHtl.signalPrice).toFixed(2)==="0.00" ? null : Number(this.state.GLHtl.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.GLHtl.signalUnit).toFixed(2)==="0.00" ? null : Number(this.state.GLHtl.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.GLHtl.precent1).toFixed(2)==="0.00" ? null : Number(this.state.GLHtl.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.GLHtl.signalPUnit).toFixed(2)==="0.00" ? null : Number(this.state.GLHtl.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.GLHtl.precent2).toFixed(2)==="0.00" ? null : Number(this.state.GLHtl.precent2).toFixed(2)}</td>
                        </tr>
                        <tr className="trrj">
                            <td className="jiachu">五</td>
                            <td className="jiachu">加工成本</td>
                            <td>{Number(this.state.Jtl.signalPrice).toFixed(2)==="0.00" ? null : Number(this.state.Jtl.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.Jtl.signalUnit).toFixed(2)==="0.00" ? null : Number(this.state.Jtl.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.Jtl.precent1).toFixed(2)==="0.00" ? null : Number(this.state.Jtl.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.Jtl.signalPUnit).toFixed(2)==="0.00" ? null : Number(this.state.Jtl.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.Jtl.precent2).toFixed(2)==="0.00" ? null : Number(this.state.Jtl.precent2).toFixed(2)}</td>
                        </tr>
                        <tr className="trrj">
                            <td className="jiachu">六</td>
                            <td className="jiachu">合计</td>
                            <td>{Number(this.state.HeJtl.signalPrice).toFixed(2)==="0.00" ? null : Number(this.state.HeJtl.signalPrice).toFixed(2)}</td>
                            <td>{Number(this.state.HeJtl.signalUnit).toFixed(2)==="0.00" ? null : Number(this.state.HeJtl.signalUnit).toFixed(2)}</td>
                            <td>{Number(this.state.HeJtl.precent1).toFixed(2)==="0.00" ? null : Number(this.state.HeJtl.precent1).toFixed(2)}</td>
                            <td>{Number(this.state.HeJtl.signalPUnit).toFixed(2)==="0.00" ? null : Number(this.state.HeJtl.signalPUnit).toFixed(2)}</td>
                            <td>{Number(this.state.HeJtl.precent2).toFixed(2)==="0.00" ? null : Number(this.state.HeJtl.precent2).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}