import React from "react"
import Loadable from "react-loadable"
//通用的过场组件
const loadingComponent =()=>{
    return (
        <div style={{width:"100px",height:"100px",top:0,right:0,left:0,bottom:0,margin:"auto",position:"absolute"}}>
            <img src="../image/loding.webp" alt=""/>
        </div>
    ) 
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = loadingComponent)=>{
    return Loadable({
        loader,
        loading
    });
}