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
// import loadable from "../components/util/loadable.jsx"
// const ShuJuKu1 = loadable(()=>import('../components/shuJuKu/shujuku1.js'))
// const ShuJuKu2 = loadable(()=>import('../components/shuJuKu/shujuku2.js'))
// const ShuJuKu3 = loadable(()=>import('../components/shuJuKu/shujuku3.js'))
// const ShuJuKu4 = loadable(()=>import('../components/shuJuKu/shujuku4.js'))
// const ShuJuKu5 = loadable(()=>import('../components/shuJuKu/shujuku5.js'))
// const ShuJuKu6 = loadable(()=>import('../components/shuJuKu/shujuku6.js'))
// const Solvent = loadable(()=>import('../components/shuJuKu/solvent.js'))
// const Waste = loadable(()=>import('../components/shuJuKu/waste.js'))
// const Compare = loadable(()=>import('../components/xingjiaobi/compare'))
// const Budget = loadable(()=>import('../components/budget/budget'))
// const BlastFurnace = loadable(()=>import('../components/budget/gaolu'))
// const Pelletizing = loadable(()=>import('../components/budget/qiutuan'))
// const Optimization = loadable(()=>import('../components/optimization/optimization'))
// const Pelletsoptimization = loadable(()=>import('../components/Pelletsoptimization/index'))
// const Coalblending = loadable(()=>import('../components/coalblending/index'))
// const Indexptimization = loadable(()=>import('../components/optimizationdesign/index'))
// const Abc = loadable(()=>import('../components/xingjiaobi/qiutuan'))
// const Bcd = loadable(()=>import('../components/xingjiaobi/rululiao'))
// const Cde = loadable(()=>import('../components/xingjiaobi/hululiao'))
// const Coke = loadable(()=>import('../components/xingjiaobi/coke'))
// const Braize = loadable(()=>import('../components/xingjiaobi/braize'))

//路由组件  负责写路径
class Index extends Component {
    render() {
        return (
            <div>
                <ConfigProvider locale={zhCN}>
                    <Switch>
                        <AuthRoute path="/index/one" component={ShuJuKu1} />
                        <AuthRoute path="/index/two" component={ShuJuKu2} />
                        <AuthRoute path="/index/three" component={ShuJuKu3} />
                        <AuthRoute path="/index/four" component={ShuJuKu4} />
                        <AuthRoute path="/index/five" component={ShuJuKu5} />
                        <AuthRoute path="/index/six" component={ShuJuKu6} />
                        <AuthRoute path="/index/solvent" component={Solvent} />
                        <AuthRoute path="/index/Waste" component={Waste} />
                        <AuthRoute path="/index/compare" component={Compare} />
                        <AuthRoute path="/index/bePutInAFurnace" component={Abc} />
                        <AuthRoute path="/index/rulu" component={Bcd} />
                        <AuthRoute path="/index/ToProtectTheCharge" component={Cde} />
                        <AuthRoute path="/index/braize" component={Braize} />
                        <AuthRoute path="/index/coke" component={Coke} />
                        <AuthRoute path="/index/budget" component={Budget} />
                        <AuthRoute path="/index/pelletizing" component={Pelletizing} />
                        <AuthRoute path="/index/blastFurnace" component={BlastFurnace} />
                        <AuthRoute path="/index/optimization" component={Optimization} />


                        <AuthRoute path="/index/budget/out" component={Budget} />
                        <AuthRoute path="/index/blastFurnace/out" component={BlastFurnace} />
                        <AuthRoute path="/index/pelletizing/out" component={Pelletizing} />

                        <AuthRoute path="/index/Pelletsoptimization" component={Pelletsoptimization} />
                        <AuthRoute path="/index/GaoLublastfurnace" component={Indexptimization} />
                        <AuthRoute path="/index/coalblending" component={Coalblending} />


                        <AuthRoute path="/index/sinteringoffline" component={ShaojieLiXian} />
                        <AuthRoute path="/index/pelletoffline" component={QiuTuanLiXian} />
                        <AuthRoute path="/index/furnaceoffline" component={GaoLuLiXian} />
                        {/* 日清日结 */}
                        <AuthRoute path="/index/sinterDateClear" component={DateClearDateSettlement} />
                        <AuthRoute path="/index/costDateClear" component={DateClearDateSettlementPellet} />
                        <AuthRoute path="/index/furnaceDateClear" component={DateClearDateSettlementFurnace} />
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
