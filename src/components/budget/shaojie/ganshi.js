import React, { Component } from "react";
import { Input, Button, } from "antd";
import "../cossalculation.css"
import axios from "axios"
const datas = []
for (let p = 0; p < 10; p++) {
    datas.push({
        line: p + 1,
        sj: null,
        c: null
    });

}
export default class GanShi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datapeibi: datas,
            request: [],
            num: 2
        }
    }
    changpeibi(sj, idx) {
        return (e) => {
            const value = e.target.value === undefined ? e.target.checked : e.target.value;
            const newData = this.state.datapeibi;
            newData[idx][sj] = value;
            this.setState({ datapeibi: newData })

        }
    }
    ganshijisuan() {
        this.state.datapeibi.forEach((reds) => {

            reds.sj = Number(reds.sj)
            reds.c = Number(reds.c)

        })
        axios.post("/api/jsj/", {
            data: this.state.datapeibi
        }, {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                request: res.data.data
            })
        })
    }
    kong() {
        this.state.datapeibi.forEach((res) => {
            res.sj = ""
            res.c = ""
        })
        this.setState({
            request: [],
            datapeibi: this.state.datapeibi
        })
        console.log(this.state.datapeibi);

    }
    hide() {
        if (this.props.num === 1) {
            this.kong()
         } else if (this.props.num === 2) {
             this.kong()
         } else if (this.props.num === 3) {
             this.kong()
         }
        this.props.getnum(this.state.num)
    }
    render() {

        return (
            <div className="ganshimodel" >
                <div className="ganshimodel_h2">干湿基配比转换工具<Button style={{ float: "right", marginTop: 10, marginRight: 20 }} onClick={this.hide.bind(this)}>关闭</Button></div>
                <ul className="ganshimodel_ulone" style={{ background: "#d0e1f5" }}>
                    <li>行号</li>
                    <li>湿基配比</li>
                    <li>水分</li>
                    <li>干基配比</li>
                </ul>
                <ul className="ganshimodel_ultwo">
                    {
                        datas.map((obj, idx) => {
                            return (
                                <li key={idx} style={{ float: "left" }}>
                                    <div style={{ border: "1px solid #999", borderLeft: "none", background: "#d0e1f5" }} >{obj.line}</div>
                                    <div style={{ borderRight: "1px solid #999", background: "#fff" }}><Input onChange={this.changpeibi("sj", idx).bind(this)} value={obj.sj === 0 ? null : obj.sj}></Input></div>
                                    <div style={{ border: "1px solid #999", borderLeft: "none", background: "#fff" }}><Input onChange={this.changpeibi("c", idx).bind(this)} value={obj.c === 0 ? null : obj.c}></Input></div>
                                    <div style={{ border: "1px solid #999", borderTop: "none", borderLeft: "none", background: "#d0e1f5" }}>
                                        {this.state.request.length === 0 ? null : this.state.request[idx].jg === 0 ? null : this.state.request[idx].jg}
                                    </div>
                                </li>

                            )
                        })
                    }
                </ul>

                <Button onClick={this.ganshijisuan.bind(this)} className="computedpeibi">计算</Button>
                <Button onClick={this.kong.bind(this)} className="qingkongs">清除</Button>
            </div>
        )
    }
}