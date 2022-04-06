import React, { Component, } from "react";
import { Input, Button, message,Checkbox,Modal } from 'antd';
import axios from "axios"
import WrappedDemo from "./daoruModel"
const data=[]
for(let p=0;p<12;p++){
    data.push({
        id: p+1,
        name: "",
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
export default class RuLuJiao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ruluList: data,
            jieShouRuluList: {
                siO2: 0,
                caO: 0,
                mgO: 0,
                al2O3: 0,
                k2O: 0,
                na2O: 0,
                znO: 0,
                s: 0,
                p: 0,
                tiO2: 0,
                price: 0,
                ratio: 0,
                loI:0,
            },
            flag:false,
            purpose:11
        }
    }
    UNSAFE_componentWillMount () {
    
        axios.get(`/api/estimate-ore/recent/?purpose=${this.props.tabKeys==="2"? 161:this.props.tabKeys==="3"?181:11}`,{
            headers:{
                Authorization:sessionStorage.getItem("token")
              }
        }).then((res) => {
            res.data.forEach((item) => {
                    item.tFe = Number(item.tFe).toFixed(2);
                    item.siO2 = Number(item.siO2).toFixed(2);     // 二氧化硅含量
                    item.caO = Number(item.caO).toFixed(2);    // 氧化钙含量
                    item.mgO = Number(item.mgO).toFixed(2);        // 氧化镁含量
                    item.al2O3 = Number(item.al2O3).toFixed(2);    // 氧化铝含量
                    item.loI = Number(item.loI).toFixed(2);     // 烧损
                    item.feO = Number(item.feO).toFixed(2);        // 氧化铁含量
                    item.k2O = Number(item.k2O).toFixed(4);       // 氧化钾含量
                    item.na2O = Number(item.na2O).toFixed(4);       // 氧化钠含量
                    item.znO = Number(item.znO).toFixed(4);         // 氧化锌含量
                    item.s = Number(item.s).toFixed(4);         // 硫含量
                    item.p = Number(item.p).toFixed(4);         // 磷含量
                    item.tiO2 = Number(item.tiO2).toFixed(4);        // 氧化钛含量
                    item.sRatio = Number(item.sRatio).toFixed(2);     // 入炉料筛下率
                    item.price = Number(item.price).toFixed(2); // 价格
                    item.ratio = Number(item.ratio).toFixed(2);        // 配比
                

            })
           //////console.log(res)
            this.setState({
                ruluList: res.data
            })
        })
    }
    infoKuang(name, index) {
        return (e) => {
            const value = e.target.value===undefined ? e.target.checked: e.target.value;
            const newData = this.state.ruluList;
            newData[index][name] = value;
            this.setState({ ruluList: newData })
          // //console.log(this.state.ruluList)

        }

    }
    //导入数据接收的那一条数据
    bbbb(value) {
        //////console.log(value)
        this.setState({
            SanFang: value
        })
    }
    //导入数据接收的序号
    cccc(values) {
        //////console.log(values);
        this.setState({
            navData: values
        })

    }
    //模态窗确定按钮
    handleOk = e => {
        
        this.refs.validate_other.validateFields((err, values) => {
            if (err) {
                this.setState({
                    confirmLoading: false,
                });
            }else{
                this.state.SanFang.forEach((item)=>{
                    if(item.name===values.name && item.incomingDate===values.time){
                        //console.log(item);
                        const newListData = this.state.ruluList.slice(0);
                        const newSanFang = Object.assign({}, item);
                        newSanFang["line"] = this.state.navData
                        newSanFang["caO"]=newSanFang.CaO
                        newSanFang["feO"]=newSanFang.FeO
                        newSanFang["k2O"]=newSanFang.K2O
                        newSanFang["loI"]=newSanFang.LOI
                        newSanFang["mgO"]=newSanFang.MgO
                        newSanFang["na2O"]=newSanFang.Na2O
                        newSanFang["siO2"]=newSanFang.SiO2
                        newSanFang["tFe"]="0.00"
                        newSanFang["tiO2"]=newSanFang.TiO2
                        newSanFang["znO"]=newSanFang.ZnO
                        newSanFang["al2O3"]=newSanFang.Al2O3
                        newSanFang["p"]=newSanFang.P
                        newSanFang["p"]=newSanFang.P
                        newSanFang["ratio"]="0.00"
                        newSanFang["sRatio"]="0.00"
                        newListData[this.state.navData - 1] = newSanFang;
                        this.setState({
                            ruluList: newListData,
                            visible:false
                    })
                }
            })
                
            }
        }) 
       
      };
      //模态窗取消按钮
      handleCancel = e => {
        //console.log(e);
        this.setState({
          visible: false,
        });
      };
      export(){
        this.setState({
            visible: true,
          });
      }
    computed() {
        this.setState({
            flag:true
        })
        axios.post("/api/estimate-mean/", {
            purpose:this.props.tabKeys==="2"? 161:this.props.tabKeys==="3"?181:11,
            ore:
                this.state.ruluList.map((item, index) => {
                    return (
                        {
                            name: item.name,
                            purpose: this.props.tabKeys==="2"? 161:this.props.tabKeys==="3"?181:11,
                            line: index + 1,     //序号
                            tFe: item.tFe  === "" || item.tFe === null ? 0 : item.tFe,     // 全铁含量
                            siO2: item.siO2 === "" || item.siO2 === null ? 0 : item.siO2,     // 二氧化硅含量
                            caO: item.caO === "" || item.caO === null ? 0 : item.caO,     // 氧化钙含量
                            mgO: item.mgO === "" || item.mgO === null ? 0 : item.mgO,         // 氧化镁含量
                            al2O3: item.al2O3 === "" || item.al2O3 === null ? 0 : item.al2O3,    // 氧化铝含量
                            loI: item.loI === "" || item.loI === null ? 0 : item.loI,      // 烧损
                            feO: item.feO === "" || item.feO === null ? 0 : item.feO,        // 氧化铁含量
                            k2O: item.k2O === "" || item.k2O === null ? 0 : item.k2O,         // 氧化钾含量
                            na2O: item.na2O === "" || item.na2O === null ? 0 : item.na2O,        // 氧化钠含量
                            znO: item.znO === "" || item.znO === null ? 0 : item.znO,         // 氧化锌含量
                            s: item.s === "" || item.s === null ? 0 : item.s,           // 硫含量
                            p: item.p === "" || item.p === null ? 0 : item.p,          // 磷含量
                            tiO2: item.tiO2 === "" || item.tiO2 === null ? 0 : item.tiO2,        // 氧化钛含量
                            sRatio: item.sRatio === "" || item.sRatio === null ? 0 : item.sRatio,     // 入炉料筛下率
                            price: item.price === "" || item.price === null ? 0 : item.price,  // 价格
                            ratio: item.ratio === "" || item.ratio === null ? 0 : item.ratio,        // 配比
                            esti: 1,
                            r: null,           // 烧结矿碱度
                        }

                    )
                })
        },{
            headers:{
                Authorization:sessionStorage.getItem("token")
              }
        }).then((res) => {
            if(res.status){
                 message.success("计算完成！")
            this.setState({
                jieShouRuluList: res.data.amount,
                flag:false,
            }, () => {
                this.props.RuLuTan(this.state.jieShouRuluList)
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
        })
    }
    //清空数据，不是实际清空，只是在前端页面替换空的数据
    delet(){
        this.state.ruluList.forEach((item, index) => {
            if (item.bolen) {
                item.bolen = false
                item.al2O3 = null
                item.caO = null
                item.k2O = null
                item.loI = null
                item.mgO = null
                item.na2O = null
                item.name = null
                item.p = null
                item.s = null
                item.siO2 = null
                item.sx = null
                item.tFe = null
                item.tiO2 = null
                item.xx = null
                item.znO = null
                item.price = null
                item.ratio = null
                item.sRatio=null
                item.feO = null
                this.setState({
                    ruluList: this.state.ruluList
                })
            }
        })
    }
    render() {
        return (
            <div>
               <Button  onClick={this.delet.bind(this)} style={{position:"absolute",left:"530px",top:"-30px",height:"26px"}}>删除</Button>
                <table className="tableGufei">
                    <tbody>
                        <tr>
                            <td>&nbsp;</td> 
                            <td>序号</td>
                            <td >名称</td>
                            <td>SiO2</td>
                            <td>CaO</td>
                            <td>MgO</td>
                            <td>AL2O3</td>
                            <td>固定碳</td>
                            <td>K2O</td>
                            <td>Na2O</td>
                            <td>ZnO</td>
                            <td>S</td>
                            <td>P</td>
                            <td>TiO2</td>
                            <td>价格</td>
                            <td>入炉量</td>
                        </tr>
                        {
                            this.state.ruluList.map((item, index) => {
                                return (
                                    <tr key={index} className="gufeiquest">
                                        <td><Checkbox onChange={this.infoKuang("bolen",index).bind(this)} id={String(index + 1)}  checked={item.bolen}/></td>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Input
                                                style={{ width: 80 }}
                                                value={item.name}
                                                onChange={this.infoKuang("name", index).bind(this)}
                                            >
                                            </Input>
                                        </td>
                                        <td><Input
                                            id='priceValueInput'
                                          
                                            value={item.siO2 === "0.00" || item.siO2 === 0 ? null : item.siO2}
                                            onChange={this.infoKuang("siO2", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            
                                            value={item.caO === "0.00" || item.caO === 0? null : item.caO}
                                            onChange={this.infoKuang("caO", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            
                                            value={item.mgO === "0.00" || item.mgO === 0? null : item.mgO}
                                            onChange={this.infoKuang("mgO", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            
                                            value={item.al2O3 === "0.00" || item.al2O3 === 0? null : item.al2O3}
                                            onChange={this.infoKuang("al2O3", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                             style={{ width: 50 }}
                                            value={item.loI === "0.00" || item.loI === 0? null : item.loI}
                                            //应为固定碳，要改
                                            onChange={this.infoKuang("loI", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            
                                            value={item.k2O === "0.0000"|| item.k2O === 0 ? null : item.k2O}
                                            onChange={this.infoKuang("k2O", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            
                                            value={item.na2O === "0.0000" || item.na2O === 0? null : item.na2O}
                                            onChange={this.infoKuang("na2O", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            
                                            value={item.znO === "0.0000" || item.znO === 0? null : item.znO}
                                            onChange={this.infoKuang("znO", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            
                                            value={item.s === "0.0000" || item.s === 0? null : item.s}
                                            onChange={this.infoKuang("s", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            
                                            value={item.p === "0.0000"|| item.p === 0 ? null : item.p}
                                            onChange={this.infoKuang("p", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            
                                            value={item.tiO2 === "0.0000"|| item.tiO2 === 0 ? null : item.tiO2}
                                            onChange={this.infoKuang("tiO2", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                            
                                            value={item.price === "0.00" || item.price === 0? null : item.price}
                                            onChange={this.infoKuang("price", index).bind(this)}
                                        ></Input></td>
                                        <td><Input
                                             style={{ width: 50 }}
                                            value={item.ratio === "0.00"|| item.ratio === 0 ? null : item.ratio}
                                            onChange={this.infoKuang("ratio", index).bind(this)}
                                        ></Input></td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="jiachu">
                            <td>&nbsp;</td> 
                            <td>12</td>
                            <td>基准入炉焦炭</td>
                            <td>{Number(this.state.jieShouRuluList.siO2).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.caO).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.mgO).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.al2O3).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.loI).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.k2O).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.na2O).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.znO).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.s).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.p).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.tiO2).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.price).toFixed(2)}</td>
                            <td>{Number(this.state.jieShouRuluList.ratio).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={this.computed.bind(this)} disabled={this.state.flag} className="computed">计算入炉焦炭平均成分和价格</Button>
                <Button onClick={this.export.bind(this)} disabled={this.state.flag} className="import">导入焦炭</Button>
                <Modal
                    title="导入固废"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    >
                    <WrappedDemo ref="validate_other" 
                        GaoList={this.state.ruluList} 
                        getData={this.bbbb.bind(this)} 
                        getXu={this.cccc.bind(this)}/>
                </Modal>
            </div>
        )
    }
}