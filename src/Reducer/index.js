
import {combineReducers} from 'redux'
import cogntionAjax from "./cloums.js";
import namese from "./names.js";
import dataList from "./shujuku1.js"
import shujuku2Data from "./shujuku2.js"
import shujuku3Data from "./shujuku3.js"
import shujuku4Data from "./shujuku4.js"
import shujuku5Data from "./shujuku5.js"
import shujuku6Data from "./shujuku6.js"
import solvent from "./solvent.js"
import waste from "./waste.js"
import compare from "./compare.js"
import coke from "./coke.js"
import cloumru from "./cloumru.js"
let Reduces=combineReducers({
    cogntionAjax,
    namese,
    dataList,
    shujuku2Data,
    shujuku3Data,
    shujuku4Data,
    shujuku5Data,
    shujuku6Data,
    solvent,
    waste,
    compare,
    coke,
    cloumru,
})
export default Reduces;