import React, { Component } from 'react';
import { Checkbox, message } from 'antd';
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
    }
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
      <div>
        <Button onClick={this.send.bind(this)} className="btn">确认更新权限</Button>
        <table className="quanxian_table">
          <tbody>
            <tr className="quanxian">
              <td>账号</td>
              <td>操作模块</td>
            </tr>

            {
              this.props.listData.map((item, index) => {
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
      </div>
    )
  }
}
export default Jurisdiction