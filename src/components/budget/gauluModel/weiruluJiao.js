import React,{ Component } from "react";
import {Input, Button,message} from 'antd'
import axios from "axios";
const list=[]
for( let i=0;i<11;i++){
    list.push({
        id: 1,
        name: i===0 ?"焦炭":i===1 ? "小块焦":null ,
        isTotal: false,
        purpose: 10,
        tFe: null,
        siO2: null,
        caO: null,
        mgO: null,
        al2O3: null,
        loI: null,
        feO: null,
        k2O: null,
        na2O: null,
        znO: null,
        s: null,
        p: null,
        tiO2: null,
        sRatio: null,
        price: null,
        ratio: null,
        r: null,
        esti: null,
    })
}
// console.log(list)
 export default class  WeiRuLuJiao  extends Component{
     constructor(props){
         super(props);
         this.state={
            WeiruluList:list,
            jieShouList:{
                siO2:0,
                caO:0,
                mgO:0,
                al2O3:0,
                k2O:0,
                na2O:0,
                znO:0,
                s:0,
                p:0,
                tiO2:0,
                price:0,
                ratio:0,
            },
            flag:false,
         }
     }
     infoKuang(price,index){
        return(e)=>{
         const value=e.target.value;
         const newData=this.state.WeiruluList;
         newData[index][price]=value;
         this.setState({WeiruluList:newData})
        //////console.log(this.state.WeiruluList)
        }
    }
    UNSAFE_componentWillMount (){
        axios.get(`/api/estimate-ore/recent/?purpose=${this.props.tabKeys==="2"? 162:this.props.tabKeys==="3"?182:12}`,{
            headers:{
                Authorization:sessionStorage.getItem("token")
              }
        }).then((res)=>{
           //////console.log(res)
            res.data.forEach((item)=>{
                item.tFe=Number(item.tFe).toFixed(2);
                item.siO2=Number(item.siO2).toFixed(2);     // 二氧化硅含量
                item.caO=Number(item.caO).toFixed(2);    // 氧化钙含量
                item.mgO=Number(item.mgO).toFixed(2);        // 氧化镁含量
                item.al2O3=Number(item.al2O3).toFixed(2);    // 氧化铝含量
                item.loI=Number(item.loI).toFixed(2);     // 烧损
                item.feO=Number(item.feO).toFixed(2);        // 氧化铁含量
                item.k2O=Number(item.k2O).toFixed(4);       // 氧化钾含量
                item.na2O=Number(item.na2O).toFixed(4);       // 氧化钠含量
                item.znO=Number(item.znO).toFixed(4);         // 氧化锌含量
                item.s=Number(item.s).toFixed(4);         // 硫含量
                item.p=Number(item.p).toFixed(4);         // 磷含量
                item.tiO2=Number(item.tiO2).toFixed(4);        // 氧化钛含量
                item.sRatio=Number(item.sRatio).toFixed(2);     // 入炉料筛下率
                item.price=Number(item.price).toFixed(2); // 价格
                item.ratio=Number(item.ratio).toFixed(2);        // 配比
            })
            this.setState({
                WeiruluList:res.data
            })
        })
    }
    computed(){
        this.setState({
            flag:true
        })
        axios.post("/api/estimate-mean/",{
            purpose: this.props.tabKeys==="2"? 162:this.props.tabKeys==="3"?182:12,
            ore:
            this.state.WeiruluList.map((item,index)=>{
                return(
                    {
                        name: item.name,
                        purpose: this.props.tabKeys==="2"? 162:this.props.tabKeys==="3"?182:12,
                        line: index+1,     //序号
                        tFe: 0,     // 全铁含量
                        siO2: 0,     // 二氧化硅含量
                        caO: 0,     // 氧化钙含量
                        mgO: 0,         // 氧化镁含量
                        al2O3: 0,    // 氧化铝含量
                        loI:0,      // 烧损
                        feO: 0,        // 氧化铁含量
                        k2O: 0,         // 氧化钾含量
                        na2O:0,        // 氧化钠含量
                        znO: 0,         // 氧化锌含量
                        s: 0,           // 硫含量
                        p: 0,          // 磷含量
                        tiO2: 0,        // 氧化钛含量
                        sRatio: 0,     // 入炉料筛下率
                        price: item.price === "" || item.price === null ? 0 : item.price,  // 价格
                        ratio: item.ratio === "" || item.ratio === null ? 0 :item.ratio,        // 配比
                        esti:1,
                        r: null,           // 烧结矿碱度
                    }

                )
            })
        },{
            headers:{
                Authorization:sessionStorage.getItem("token")
              }
        }).then((res)=>{
            if(res.status){
               message.success("计算完成！")
            this.setState({
                jieShouList:res.data.amount,
                flag:false,
            },()=>{
                this.props.WeiRuLu(this.state.jieShouList);
            }) 
            }
           //////console.log(res)
        }).catch(err => {
            this.setState({
                flag:false,
            })
           //////console.log(err)
           if (err.request.status === 500) {
            message.warning("请检查参数信息是否正确")
            
        } else if (err.request.status === 400) {
            message.warning("请检查参数信息是否正确")
            
        }else if(err.request.status === 401){
            message.warning("你没有该权限！")
            
        }
            // notification["error"]({
            //   message: '网络发生了一些错误(' + err.request.status + ')！',
            //   description: err.request.statusText + "：" + err.request.responseURL,
            // });
          })
    }
     render(){
         return(
            <div>
            <table className="tableGufei">
                <tbody>
                    <tr>
                               <td >序号</td>
                               <td >名称</td>                                 
                               <td>价格</td>
                               <td>消耗量</td>
                    </tr>
                    {
                               this.state.WeiruluList.map((item,index)=>{
                                      return(
                                       <tr key={index} className="gufeiquest">
                                           <td>{index+1}</td>
                                           <td>
                                               <Input
                                                
                                               style={{padding:0}}
                                               value={item.name}
                                               onChange={this.infoKuang("name",index).bind(this)}
                                               >
                                               </Input>
                                           </td>
                                           
                                           <td><Input
                                            style={{padding:0}}
                                            value={item.price==="0.00" ? null : item.price}
                                            onChange={this.infoKuang("price",index).bind(this)}
                                           ></Input></td>
                                           <td><Input
                                           style={{padding:0}}
                                           value={item.ratio==="0.00" ? null : item.ratio}
                                           onChange={this.infoKuang("ratio",index).bind(this)}
                                           ></Input></td>
                                       </tr>
                                   ) 
                               })
                           }
                            <tr className="jiachu">
                               <td>12</td>
                               <td style={{width:100}}>基准非入炉焦炭</td>                                  
                             
                               <td>{Number(this.state.jieShouList.price).toFixed(2)}</td>
                               <td>{Number(this.state.jieShouList.ratio).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <Button onClick={this.computed.bind(this)} disabled={this.state.flag} className="computed">计算非入炉焦炭平均成分和价格</Button>
        </div>
         )
     }
 }