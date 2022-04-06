import React, { Component } from "react";
import WrappedDaoruGufei from "./gufeiimport.js"
import axios from "axios";
import { Input, Button, message, Checkbox, Modal } from "antd";
const str = "0.00"
const strFour = "0.0000"
const listTwo = []
//固废
for (let i = 0; i < 6; i++) {
    listTwo.push({
        id: i + 1,
        line: i + 1,
        name: "",
        purpose: null,
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
        c: null,
        p: null,
        tiO2: null,
        sRatio: null,
        price: null,
        ratio: null,
        r: null,
    });
}
export default class JiaoFen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guFeiList: listTwo,
            ListDataFufeiInfo: {
                tFe: 0,
                siO2: 0,
                caO: 0,
                mgO: 0,
                al2O3: 0,
                loI: 0,
                feO: 0,
                k2O: 0,
                na2O: 0,
                znO: 0,
                s: 0,
                p: 0,
                tiO2: 0,
                sRatio: 0,
                price: 0,
                ratio: 0,
                r: 0,
            },
            flag: false,
            DataNumber: 1,
     
            name:"",
            
        }
    }
    componentWillMount() {
        //console.log(this.props.tabKeys)
        axios.get(`/api/estimate-ore/recent/?purpose=${this.props.tabKeys === "2" ? 412 : this.props.tabKeys === "3" ? 413 : 411}`, {
            headers: {
                Authorization: sessionStorage.getItem("token")
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
                guFeiList: res.data
            })
        })
    }
    computdGufeiInfo(name, index) {
        return (e) => {
            const value = e.target.value === undefined ? e.target.checked : e.target.value;
            const newGf = this.state.guFeiList.slice();
            newGf[index][name] = value;
            this.setState({ guFeiList: newGf })
            //console.log(this.state.guFeiList)
        }
    }
    conputedGuFeiResponse() {

        this.setState({
            flag: true,
        })
        axios.post("/api/estimate-mean/", {

            purpose: this.props.tabKeys === "2" ? 412 : this.props.tabKeys === "3" ? 413 : 411,
            ore:
                this.state.guFeiList.map((item, idx) => {

                    return (
                        {
                            line: idx + 1,
                            name: item.name,
                            purpose: this.props.tabKeys === "2" ? 412 : this.props.tabKeys === "3" ? 413 : 411,
                            tFe: item.tFe === "" || item.tFe === null ? 0 : item.tFe,
                            siO2: item.siO2 === "" || item.siO2 === null ? 0 : item.siO2,
                            caO: item.caO === "" || item.caO === null ? 0 : item.caO,
                            mgO: item.mgO === "" || item.mgO === null ? 0 : item.mgO,
                            al2O3: item.al2O3 === "" || item.al2O3 === null ? 0 : item.al2O3,
                            loI: item.loI === "" || item.loI === null ? 0 : item.loI,
                            feO: item.feO === "" || item.feO === null ? 0 : item.feO,
                            k2O: item.k2O === "" || item.k2O === null ? 0 : item.k2O,
                            na2O: item.na2O === "" || item.na2O === null ? 0 : item.na2O,
                            znO: item.znO === "" || item.znO === null ? 0 : item.znO,
                            s: item.s === "" || item.s === null ? 0 : item.s,
                            p: item.p === "" || item.p === null ? 0 : item.p,
                            tiO2: item.tiO2 === "" || item.tiO2 === null ? 0 : item.tiO2,
                            sRatio: item.sRatio === "" || item.sRatio === null ? 0 : item.sRatio,
                            price: item.price === "" || item.price === null ? 0 : item.price,
                            ratio: item.ratio === "" || item.ratio === null ? 0 : item.ratio,
                            r: null,
                        }
                    )
                })
        }, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            //console.log(res)
            res.data.amount.tFe = Number(res.data.amount.tFe).toFixed(2);
            res.data.amount.siO2 = Number(res.data.amount.siO2).toFixed(2);     // 二氧化硅含量
            res.data.amount.caO = Number(res.data.amount.caO).toFixed(2);    // 氧化钙含量
            res.data.amount.mgO = Number(res.data.amount.mgO).toFixed(2);        // 氧化镁含量
            res.data.amount.al2O3 = Number(res.data.amount.al2O3).toFixed(2);    // 氧化铝含量
            res.data.amount.loI = Number(res.data.amount.loI).toFixed(2);     // 烧损
            res.data.amount.feO = Number(res.data.amount.feO).toFixed(2);        // 氧化铁含量
            res.data.amount.k2O = Number(res.data.amount.k2O).toFixed(4);       // 氧化钾含量
            res.data.amount.na2O = Number(res.data.amount.na2O).toFixed(4);       // 氧化钠含量
            res.data.amount.znO = Number(res.data.amount.znO).toFixed(4);         // 氧化锌含量
            res.data.amount.s = Number(res.data.amount.s).toFixed(4);         // 硫含量
            res.data.amount.p = Number(res.data.amount.p).toFixed(4);         // 磷含量
            res.data.amount.tiO2 = Number(res.data.amount.tiO2).toFixed(4);        // 氧化钛含量
            res.data.amount.sRatio = Number(res.data.amount.sRatio).toFixed(2);     // 入炉料筛下率
            res.data.amount.price = Number(res.data.amount.price).toFixed(2); // 价格
            res.data.amount.ratio = Number(res.data.amount.ratio).toFixed(2);        // 配比

            message.success('计算完成');
            // var ListDataFufeiInfo = {};
            this.setState({
                ListDataFufeiInfo: res.data.amount,
                flag: false,
            })
            this.props.getJiaoFen(this.state.ListDataFufeiInfo)
        }).catch(err => {
            this.setState({
                flag: false,
            })
            //console.log(err)
            if (err.request.status === 500) {
                message.warning("请检查参数信息是否正确")

            } else if (err.request.status === 400) {
                message.warning("请检查参数信息是否正确")

            } else if (err.request.status === 401) {
                message.warning("你没有该权限！")
            }
        })
    }
    delet() {
        this.state.guFeiList.forEach((item, index) => {
            if(item.bolen){
                item.name = null;
                item.bolen = null
                item.line = null    //序号
                item.tFe = null     // 全铁含量
                item.siO2 = null     // 二氧化硅含量
                item.caO = null     // 氧化钙含量
                item.mgO = null         // 氧化镁含量
                item.al2O3 = null    // 氧化铝含量
                item.loI = null      // 烧损
                item.feO = null       // 氧化铁含量
                item.k2O = null        // 氧化钾含量
                item.na2O = null        // 氧化钠含量
                item.znO = null         // 氧化锌含量
                item.s = null          // 硫含量
                item.p = null         // 磷含量
                item.tiO2 = null       // 氧化钛含量
                item.sRatio = null    // 入炉料筛下率
                item.price = null // 价格
                item.ratio = null       // 配比                     
                this.setState({
                    guFeiList:this.state.guFeiList
                })
            }
           
        })
    }
    import() {
        this.setState({
            visible: true,
            name:"焦粉"
        })
    }
    importMeiFen(){
        this.setState({
            visible: true,
            name:"煤粉",
            DataNumber:2
        })
    }
    handleOk = e => {
        this.refs.DaoruGufei.validateFields((err, values) => {
            if(this.state.name==="焦粉"){
                this.state.SanFang.forEach((item) => {
                    if (item.name === values.name && item.incomingDate === values.time) {
                        ////console.log(item);
                        const newListData = this.state.guFeiList.slice(0);
                        const newSanFang = Object.assign({}, item);
                       // //console.log(newSanFang)
                        newSanFang["line"] = this.state.navData
                        newSanFang["caO"] = newSanFang.CaO
                        newSanFang["feO"] = newSanFang.FeO
                        newSanFang["k2O"] = newSanFang.K2O
                        newSanFang["loI"] = newSanFang.LOI
                        newSanFang["mgO"] = newSanFang.MgO
                        newSanFang["na2O"] = newSanFang.Na2O
                        newSanFang["siO2"] = newSanFang.SiO2
                        newSanFang["tFe"] = newSanFang.TFe
                        newSanFang["tiO2"] = newSanFang.TiO2
                        newSanFang["znO"] = newSanFang.ZnO
                        newSanFang["al2O3"] = newSanFang.Al2O3
                        newSanFang["sRatio"] = "0.00"
                        newSanFang["p"] = newSanFang.P
                        newSanFang["tFe"] = "0.00"
                        newSanFang["ratio"] = "0.00"
                        newListData[this.state.navData - 1] = newSanFang;
                        this.setState({
                            guFeiList: newListData,
                            visible: false
                        })
                    }
                })
            }else{
                this.state.SanFang.forEach((item)=>{
                    if(item.name===values.name && item.incomingDate===values.time){
                        //console.log(item);
                        const newListData = this.state.guFeiList.slice(0);
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
                        newSanFang["ratio"]="0.00"
                        newSanFang["sRatio"] = "0.00"
                        newSanFang["p"]=newSanFang.P
                        newListData[this.state.navData - 1] = newSanFang;
                        this.setState({
                            guFeiList: newListData,
                            visible:false
                    })
                }
            })
            }
          
        })
    };

    handleCancel = e => {
        //console.log(e);
        this.setState({
            visible: false,
        });
    };
    bbbb(value) {
        //////console.log(value)
        this.setState({
            SanFang: value
        })

    }
    cccc(values) {
        //////console.log(values);
        this.setState({
            navData: values
        })

    }
    render() {
        return (
            <div>
                <Button onClick={this.delet.bind(this)} style={{ position: "absolute", left: "530px", top: "-30px", height: "26px" }}>删除</Button>
                <table className="tableGufei">
                    <tbody>
                        <tr>
                            <td>&nbsp;</td>
                            <td>序号</td>
                            <td>名称</td>
                            <td>SiO2</td>
                            <td>CaO</td>
                            <td>MgO</td>
                            <td>AL2O3</td>
                            <td>烧损</td>
                            <td>FeO</td>
                            <td>K2O</td>
                            <td>Na2O</td>
                            <td>ZnO</td>
                            <td>S</td>
                            <td>P</td>
                            <td>TiO2</td>
                            <td>价格</td>
                            <td>配比</td>
                        </tr>
                        {
                            this.state.guFeiList.map((item, index) => {
                                if (index <= 22) {
                                    return (
                                        <tr key={index} className="gufeiquest">
                                            <td><Checkbox onChange={this.computdGufeiInfo("bolen", index).bind(this)} id={String(index + 1)} checked={item.bolen} /></td>
                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;{index + 1}&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                            <td style={{ width: 100 }}>
                                                <Input
                                                    className="Names"
                                                    value={item.name}
                                                    onChange={this.computdGufeiInfo("name", index).bind(this)}
                                                >
                                                </Input>
                                            </td>
                                            <td><Input

                                                value={item.siO2 === str || item.siO2 === 0 ? null : item.siO2}
                                                onChange={this.computdGufeiInfo("siO2", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.caO === str || item.caO === 0 ? null : item.caO}
                                                onChange={this.computdGufeiInfo("caO", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.mgO === str || item.mgO === 0 ? null : item.mgO}
                                                onChange={this.computdGufeiInfo("mgO", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.al2O3 === str || item.al2O3 === 0 ? null : item.al2O3}
                                                onChange={this.computdGufeiInfo("al2O3", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.loI === str || item.loI === 0 ? null : item.loI}
                                                onChange={this.computdGufeiInfo("loI", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.feO === str || item.feO === 0 ? null : item.feO}
                                                onChange={this.computdGufeiInfo("feO", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.k2O === strFour || item.k2O === 0 ? null : item.k2O}
                                                onChange={this.computdGufeiInfo("k2O", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.na2O === strFour || item.na2O === 0 ? null : item.na2O}
                                                onChange={this.computdGufeiInfo("na2O", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.znO === strFour || item.znO === 0 ? null : item.znO}
                                                onChange={this.computdGufeiInfo("znO", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.s === strFour || item.s === 0 ? null : item.s}
                                                onChange={this.computdGufeiInfo("s", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.p === strFour || item.p === 0 ? null : item.p}
                                                onChange={this.computdGufeiInfo("p", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.tiO2 === strFour || item.tiO2 === 0 ? null : item.tiO2}
                                                onChange={this.computdGufeiInfo("tiO2", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.price === str || item.price === 0 ? null : item.price}
                                                onChange={this.computdGufeiInfo("price", index).bind(this)}
                                            ></Input></td>
                                            <td><Input

                                                value={item.ratio === 0 || item.ratio === str ? null : item.ratio}
                                                onChange={this.computdGufeiInfo("ratio", index).bind(this)}
                                            ></Input></td>

                                        </tr>
                                    )
                                }
                                return null;
                            })
                        }
                        <tr className="trgufeit24">
                            <td>&nbsp;</td>
                            <td>7</td>
                            <td>焦粉</td>
                            <td>{Number(this.state.ListDataFufeiInfo.siO2).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.caO).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.mgO).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.al2O3).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.loI).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.feO).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.k2O).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.na2O).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.znO).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.s).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.p).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.tiO2).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.price).toFixed(2)}</td>
                            <td>{Number(this.state.ListDataFufeiInfo.ratio).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <Button className="computed" onClick={this.conputedGuFeiResponse.bind(this)} disabled={this.state.flag}>计算焦粉平均价格和成分</Button>
                <Button className="import" onClick={this.import.bind(this)} disabled={this.state.flag}>导入焦粉</Button>
                <Button style={{position:"absolute",bottom:"-43px",left:325}}  onClick={this.importMeiFen.bind(this)} >导入煤粉</Button>
                <Modal
                    title={this.state.name==="焦粉" ? "导入焦粉" : "导入煤粉"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <WrappedDaoruGufei ref="DaoruGufei"
                        guFeiList={this.state.guFeiList}
                        getData={this.bbbb.bind(this)}
                        getXu={this.cccc.bind(this)}
                        DataNumber={this.state.DataNumber}
                    />
                    
                </Modal>
            </div>
        )
    }
}
