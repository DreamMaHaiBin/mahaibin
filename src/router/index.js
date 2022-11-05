import React, { Component } from 'react';
import ShuJuKu1 from "../components/shuJuKu/shujuku1";//烧结
import ShuJuKu2 from "../components/shuJuKu/shujuku2";//球团
import ShuJuKu3 from "../components/shuJuKu/shujuku3";//入炉料
import ShuJuKu4 from "../components/shuJuKu/shujuku4";//护炉料
import ShuJuKu5 from "../components/shuJuKu/shujuku5";//煤粉
import ShuJuKu6 from "../components/shuJuKu/shujuku6";//焦炭
import Solvent from "../components/shuJuKu/solvent";//熔剂
import Waste from "../components/shuJuKu/waste";//废料
//import Login from "../components/Login/index"
import Compare from "../components/xingjiaobi/compare";//性价比
import Budget from "../components/budget/budget";//烧结
import BlastFurnace from "../components/budget/gaolu";//高炉
import Pelletizing from "../components/budget/qiutuan";//球团
import Optimization from "../components/optimization/optimization";//成本优化
import Pelletsoptimization from "../components/Pelletsoptimization/index";//成本优化
import Coalblending from "../components/coalblending/index";//成本优化
import Indexptimization from "../components/optimizationdesign/index";//成本优化
import Abc from "../components/xingjiaobi/qiutuan"//性价比球团
import Bcd from "../components/xingjiaobi/rululiao"//性价比如炉料
import Cde from "../components/xingjiaobi/hululiao"//性价比护炉料
import Braize from "../components/xingjiaobi/braize"//性价比煤粉
import Coke from "../components/xingjiaobi/coke";//性价比焦炭
import ShaojieLiXian from '../components/budget/shaojielixian'
import QiuTuanLiXian from '../components/budget/qiutuanlixian'
import GaoLuLiXian from '../components/budget/gaolulixian'
import DateClearDateSettlement from '../components/dateClearDateSettlement/shaojie' // s烧结日清日结
import DateClearDateSettlementPellet from '../components/dateClearDateSettlement/qiutuanDateClear' // 球团日清日结
import DateClearDateSettlementFurnace from '../components/dateClearDateSettlement/gaoluDateClear' // 高炉日清日结
import CostAnalysis from '../components/costAnalysis/index' // 烧结成本分析
import PelletCostAnalysis from '../components/costAnalysis/qiutuanCost' // 球团成本分析
import FurnaceCostAnalysis from '../components/costAnalysis/gaoluCost' // 高炉成本分析
import AuthRoute from "../components/AuthRoute/"//限制登录
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router-dom';
// import {  Route, Switch } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN.js';
import { ConfigProvider } from 'antd';

//路由组件  负责写路径
class Index extends Component {
    render() {
        return (
            <div>
                <ConfigProvider locale={zhCN}>
                    <Switch>
                        <Route path="/index/one" component={ShuJuKu1} />
                        <Route path="/index/two" component={ShuJuKu2} />
                        <Route path="/index/three" component={ShuJuKu3} />
                        <Route path="/index/four" component={ShuJuKu4} />
                        <Route path="/index/five" component={ShuJuKu5} />
                        <Route path="/index/six" component={ShuJuKu6} />
                        <Route path="/index/solvent" component={Solvent} />
                        <Route path="/index/Waste" component={Waste} />
                        <Route path="/index/compare" component={Compare} />
                        <Route path="/index/bePutInAFurnace" component={Abc} />
                        <Route path="/index/rulu" component={Bcd} />
                        <Route path="/index/ToProtectTheCharge" component={Cde} />
                        <Route path="/index/braize" component={Braize} />
                        <Route path="/index/coke" component={Coke} />
                        <Route path="/index/budget" component={Budget} />
                        <Route path="/index/pelletizing" component={Pelletizing} />
                        <Route path="/index/blastFurnace" component={BlastFurnace} />
                        <Route path="/index/optimization" component={Optimization} />


                        <Route path="/index/budget/out" component={Budget} />
                        <Route path="/index/blastFurnace/out" component={BlastFurnace} />
                        <Route path="/index/pelletizing/out" component={Pelletizing} />

                        <Route path="/index/Pelletsoptimization" component={Pelletsoptimization} />
                        <Route path="/index/GaoLublastfurnace" component={Indexptimization} />
                        <Route path="/index/coalblending" component={Coalblending} />


                        <Route path="/index/sinteringoffline" component={ShaojieLiXian} />
                        <Route path="/index/pelletoffline" component={QiuTuanLiXian} />
                        <Route path="/index/furnaceoffline" component={GaoLuLiXian} />
                        {/* 日清日结 */}
                        <Route path="/index/sinterDateClear" component={DateClearDateSettlement} />
                        <Route path="/index/costDateClear" component={DateClearDateSettlementPellet} />
                        <Route path="/index/furnaceDateClear" component={DateClearDateSettlementFurnace} />
                        {/* 成本分析 */}
                        <Route path="/index/sinterCostAnalysis" component={CostAnalysis} />
                        <Route path="/index/pelletCostAnalysis" component={PelletCostAnalysis} />
                        <Route path="/index/furnaceCostAnalysis" component={FurnaceCostAnalysis} />
                    </Switch>

                </ConfigProvider>
            </div>
        )
    }
}
export default Index;
