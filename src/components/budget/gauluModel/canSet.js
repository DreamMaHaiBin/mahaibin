import React, { Component, Fragment } from "react";
import { Input, Modal, message } from "antd";
import GaoLuKeBian from "./jgf/keBianjgf";
import GaoLuGuDing from "./jgf/guding";
import "../cossalculation.scss"
import axios from "axios";
export default class EditerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: "",//固定或者可
      setInter: {
        purpose: 9, // 9: 高炉计算
        felron: null,     // 铁水铁含量
        silron: null,    // 铁水硅含量
        f10: null,         // S渣铁分配比
        f11: null,         // Ti收得率
        f13: null,        // 入炉品位升降1%加扣燃料比
        f9: null,      // Fe元素渣中分配比
        f12: null,          // 渣中其他成分含量
        cmr: null,      // 吨铁回收成本
        bashBurdenFe: null, // 基准入炉品位
        outS: null,       // 铁水产量
        dustB: null,      // 高炉灰产生量
        dustBFe: null,        // 高炉灰品位
        cmd: null,       // 高炉可变加工费
        fcms: null,     // 高炉固定加工费
        // isFixAlkali: 1,       // 是否固定碱度
        rslag: null,        // 炉渣碱度
        // sjId: 8,          // 选择烧结行号
        // qtId: 11,         // 选择球团行号
        esti: 1
      },
      buBianFei: "",
      kebianFei: "",
      JGFkey: this.props.tabKeys,
    }
  }
  UNSAFE_componentWillMount() {
    //最近参数设置信息
    const url = window.location.search ? 203 : this.props.tabKeys === "2" ? 159 : this.props.tabKeys === "3" ? 179 : 9
    axios.get(`/api/estimate-para-gl/recent/?purpose=${url}`, {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then((res) => {
      res.data.felron = Number(res.data.felron).toFixed(2);
      res.data.silron = Number(res.data.silron).toFixed(2);
      res.data.dustB = Number(res.data.dustB).toFixed(2);
      res.data.dustBFe = Number(res.data.dustBFe).toFixed(2);
      res.data.f9 = Number(res.data.f9).toFixed(4);
      res.data.f10 = Number(res.data.f10).toFixed(2);
      res.data.f11 = Number(res.data.f11).toFixed(2);
      res.data.f12 = Number(res.data.f12).toFixed(2);
      res.data.f13 = Number(res.data.f13).toFixed(2);
      res.data.f14 = Number(res.data.f14).toFixed(2);
      res.data.f15 = Number(res.data.f15).toFixed(2);
      res.data.outS = Number(res.data.outS).toFixed(4);
      res.data.rslag = Number(res.data.rslag).toFixed(2);
      res.data.cmr = Number(res.data.cmr).toFixed(2);
      res.data.bashBurdenFe = Number(res.data.bashBurdenFe).toFixed(2);
      res.data.cmd = Number(res.data.cmd).toFixed(4);
      res.data.fcms = Number(res.data.fcms).toFixed(4);
      this.setState({
        setInter: res.data
      }, () => {
        this.props.canSet(this.state.setInter)
      })
    })
  }
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    if (this.state.model === "kebian") {
      const newData = this.state.setInter;
      const newSanFang = Object.assign(this.state.kebianFei);
      newData.cmd = newSanFang;
      if (this.state.kebianFei === "") {
        this.setState({
          visible: true,
        })
        message.warning("导入不能为空，请先计算！")
      } else {
        this.setState({
          setInter: newData,
          visible: false,
        })
      }
    } else if (this.state.model === "guding") {
      if (this.state.buBianFei === "") {
        this.setState({
          visible: true,
        })
        message.warning("导入不能为空，请先计算！")
      } else {
        const newData = this.state.setInter;
        const newSanFang = Object.assign(this.state.buBianFei);
        newData.fcms = newSanFang;
        this.setState({
          setInter: newData,
          visible: false,
        })

      }


    }
  };

  handleCancel = e => {
    //////console.log(e);
    this.setState({
      visible: false,
    });
  };
  GaoLuKeBianjgf() {

    this.setState({
      visible: false,
    })
    this.setState({
      visible: true,
      model: "kebian",
    })
  }
  GaoLuGuDingjgf() {
    this.setState({
      visible: true,
      model: "guding",
    })
  }
  setList(felron) {
    return (e) => {
      const value = e.target.value;
      const newData = this.state.setInter;
      newData[felron] = value;
      this.setState({ setInter: newData })

    }
  }

  buBian(fei) {

    this.setState({ buBianFei: fei }, () => {
      this.props.grandFether(this.state.buBianFei)
    })
  }
  kebianshezhiO(bian) {
    //////console.log(bian);
    bian.forEach((item, index) => {
      if (index === 3) {
        this.setState({
          kebianFei: item.signalPUnit
        }, () => {
          this.props.grandFetherChild(this.state.kebianFei)
        })
      }
    })

  }
  render() {
    return (
      <Fragment>
        <div>
          <span className="color-title">高炉参数</span>
          <div className="gaolumodel">

            <label>铁水铁含量</label>
            <Input value={this.state.setInter.felron} onChange={this.setList("felron").bind(this)} />
            <label>Fe元素渣中分配比</label>
            <Input value={this.state.setInter.f9} defaultValue={this.state.setInter.f9} onChange={this.setList("f9").bind(this)} /><br></br>
            <label>铁水硅含量</label>
            <Input
              value={this.state.setInter.silron}
              defaultValue={this.state.setInter.silron}
              onChange={this.setList("silron").bind(this)}
            />
            <label>渣中其他成分含量</label>
            <Input
              value={this.state.setInter.f12}
              defaultValue={this.state.setInter.f12}
              onChange={this.setList("f12").bind(this)}
            /><br></br>
            <label>S渣铁分配比</label>
            <Input
              value={this.state.setInter.f10}
              defaultValue={this.state.setInter.f10}
              onChange={this.setList("f10").bind(this)}
            />
            <label>吨铁回收成本</label>
            <Input
              value={this.state.setInter.cmr}
              defaultValue={this.state.setInter.cmr}
              onChange={this.setList("cmr").bind(this)}
            /><br></br>
            <label>高炉灰生产量，kg/吨铁</label>
            <Input
              value={this.state.setInter.dustB}
              defaultValue={this.state.setInter.dustB}
              onChange={this.setList("dustB").bind(this)}
            />
            <label>高炉灰品位，%</label>
            <Input
              value={this.state.setInter.dustBFe}
              defaultValue={this.state.setInter.dustBFe}
              onChange={this.setList("dustBFe").bind(this)}
            />
            <label>Ti收得率</label>
            <Input
              value={this.state.setInter.f11}
              defaultValue={this.state.setInter.f11}
              onChange={this.setList("f11").bind(this)}
            />
            <label>基准入炉品位</label>
            <Input
              value={this.state.setInter.bashBurdenFe}
              defaultValue={this.state.setInter.bashBurdenFe}
              onChange={this.setList("bashBurdenFe").bind(this)}
            /><br></br>
            <label>铁水产量，万吨/月</label>
            <Input
              value={this.state.setInter.outS}
              onChange={this.setList("outS").bind(this)}
            />
            <label>入炉品位升降1%影响焦比，%</label>
            <Input
              value={this.state.setInter.f13}
              defaultValue={this.state.setInter.f13}
              onChange={this.setList("f13").bind(this)}
            /><br />
            <label>入炉品位升降1%影响煤比，%</label>
            <Input
              value={this.state.setInter.f14}
              defaultValue={this.state.setInter.f14}
              onChange={this.setList("f14").bind(this)}
            />
            <label>入炉品位升降1%影响产量，%</label>
            <Input
              value={this.state.setInter.f15}
              defaultValue={this.state.setInter.f15}
              onChange={this.setList("f15").bind(this)}
            />
          </div>
          <span className="color-title">加工费</span>
          <div className="gaolumodel">

            <label>高炉可变加工费，元/吨
              <button onClick={this.GaoLuKeBianjgf.bind(this)}>...</button>
            </label>
            <Input
              onChange={this.setList("cmd").bind(this)}
              value={this.state.setInter.cmd}
              defaultValue={this.state.setInter.cmd}
            />

            <label>高炉固定加工费，万元/月
              <button onClick={this.GaoLuGuDingjgf.bind(this)}>...</button>
            </label>
            <Input
              onChange={this.setList("fcms").bind(this)}
              value={this.state.setInter.fcms}
              defaultValue={this.state.setInter.fcms}
            />
          </div>
          <Modal
            title={this.state.model === "guding" ? "高炉固定加工费" : "高炉可变加工费"}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
            closable={false}
          >
            {
              this.state.model === "guding" ? <GaoLuGuDing guding={this.buBian.bind(this)} JGFkey={this.state.JGFkey} /> :
                <GaoLuKeBian kebianshezhi={this.kebianshezhiO.bind(this)} JGFkey={this.state.JGFkey} />
            }


          </Modal>
        </div>
      </Fragment>
    )
  }
}

