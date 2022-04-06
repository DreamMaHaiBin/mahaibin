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
import AuthRoute from "../components/AuthRoute/"//限制登录
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
                        <AuthRoute path="/index/compare" component={Compare}></AuthRoute>
                        <AuthRoute path="/index/bePutInAFurnace" component={Abc}></AuthRoute>
                        <AuthRoute path="/index/rulu" component={Bcd}></AuthRoute>
                        <AuthRoute path="/index/ToProtectTheCharge" component={Cde}></AuthRoute>
                        <AuthRoute path="/index/braize" component={Braize}></AuthRoute>
                        <AuthRoute path="/index/coke" component={Coke}></AuthRoute>
                        <AuthRoute path="/index/budget" component={Budget}></AuthRoute>
                        <AuthRoute path="/index/pelletizing" component={Pelletizing}></AuthRoute>
                        <AuthRoute path="/index/blastFurnace" component={BlastFurnace}></AuthRoute>
                        <AuthRoute path="/index/optimization" component={Optimization}></AuthRoute>
                        <AuthRoute path="/index/Pelletsoptimization" component={Pelletsoptimization}></AuthRoute>
                        <AuthRoute path="/index/GaoLublastfurnace" component={Indexptimization}></AuthRoute>
                        <AuthRoute path="/index/coalblending" component={Coalblending} />
                    </Switch>
                </ConfigProvider>
            </div>
        )
    }
}
export default Index;
