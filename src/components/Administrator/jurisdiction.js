import React, { Component } from 'react';
import { Checkbox, message,Pagination } from 'antd';
import axios from "axios";
import { Button } from 'antd/lib/radio';

class Jurisdiction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      model: "",
      selectedRows: [],
      ids: null,
      index: 15,
      listData:[],
      TotleCount:0,
    }
  }
  componentWillMount(){
    this.getData()
  }
  getData(){
    axios.get(`/api/account/info/?page=1`).then((res) => {
      console.log(res)
        this.setState({
          listData: res.data.results,
          TotleCount: res.data.count
        })
    })
  }
  onChange(permission1, index) {
    return (e) => {
      const value = e.target.checked;
      const newData = this.props.listData.slice();
      newData[index][permission1] = value;
      this.setState({ listData: newData })
      // //console.log(this.props.listData)


    }
  }
  send() {
    this.props.listData.forEach((item, index) => {
      axios.put("/api/qx/" + item.id, {
        permission1: item.permission1,
        permission2: item.permission2,
        permission3: item.permission3,
      }).then((res) => {

        // //console.log(res)
      })
    })
    message.success("更新成功")
  }
  render() {
    return (
      <div style={{paddingBottom:"100px"}}>
        <Button onClick={this.send.bind(this)} className="btn">确认更新权限</Button>
        <table className="quanxian_table">
          <tbody>
            <tr className="quanxian">
              <td>账号</td>
              <td>操作模块</td>
            </tr>

            {
              this.state.listData.map((item, index) => {
                return (
                  <tr key={index} className="quanxian_user">
                    <td>{item.username}</td>
                    <td>
                      <Checkbox onChange={this.onChange("permission1", index).bind(this)} checked={item.permission1} style={{ marginRight: 150 }}>
                        原料基础数据库管理
                       </Checkbox>
                      <Checkbox onChange={this.onChange("permission2", index).bind(this)} checked={item.permission2} style={{ marginRight: 150 }}>
                        成本管理
                       </Checkbox>
                      <Checkbox onChange={this.onChange("permission3", index).bind(this)} checked={item.permission3}>
                        保存权限
                       </Checkbox>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
        <Pagination 
           defaultCurrent={1}
           total={this.state.TotleCount} 
           defaultPageSize={25}
           onChange={this.onChangePagination.bind(this)} 
           style={{position:"absolute",bottom:"-115px",right:"12%"}}
        />
      </div>
    )
  }
    onChangePagination(page, pageSize){
        axios.get(`/api/account/info/?page=${page}`).then((res) => {
            // console.log(res)
              this.setState({
                listData: res.data.results,
                TotleCount: res.data.count
              })
          })
    }
}
export default Jurisdiction