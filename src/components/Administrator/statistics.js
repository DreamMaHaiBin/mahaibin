import React, { Component } from 'react';
import axios from "axios";
import { Table, message, notification, Button } from 'antd';
const columns = [
    {
        title: '账号',
        dataIndex: 'username',
        key: 1,
        width: "25%",
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 2,
        width: "15%",
    },
    {
        title: '部门',
        dataIndex: 'department',
        key: 3,
        width: "15%",
    },
    {
        title: '登录时间',
        dataIndex: 'login_time',
        key: 4,
        width: "40%",
    }
];
class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            count: "",
            selectedRows: [],

        }
    }
    componentWillMount() {
        axios.get("api/stat").then((res) => {
            //  //console.log(res);
            this.setState({
                listData: res.data.results,
                count: res.data.count,
            })
        })
    }
    //删除
    deltet() {
        if (this.state.selectedRows.length > 0) {
            let ids = []
            this.state.selectedRows.forEach((item, index) => {
                this.state.listData.forEach((ite, idx) => {
                    if (item.id === ite.id) {
                        // //console.log(idx);
                        ids.push(item.id)
                    }
                })
            })

            //console.log(ids);
            axios.post("/api/stat/", {
                ids: ids
            }).then(res => {
                //console.log(res)
                if (res.status === 204) {
                    message.success("删除成功！")
                    this.componentWillMount();
                } else {
                    message.warning("删除失败！")
                }
            })
                .catch(err => {
                    ////console.log(err);

                    notification["error"]({
                        message: '网络发生了一些错误(' + err.request.status + ')！',
                        description: err.request.statusText + "：" + err.request.responseURL,
                    });
                })
        } else {
            message.warning("请选择一组数据!");
        }


    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                let ids = []
                this.setState({
                    selectedRows: selectedRows,
                    ids: ids.push(selectedRowKeys)
                })


            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };


        return (
            <div>
                <Button className="acton-btn" onClick={this.deltet.bind(this)} >删除</Button>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.listData}
                    rowKey="id"
                    pagination={
                        {
                            total: this.state.count,//数据的总条数
                            defaultCurrent: 1,//默认当前的页数
                            defaultPageSize: 25,//默认每页的条数
                            onChange: (page, pageSize) => {
                                axios.get(`/api/stat/?page=${page}`, {
                                    headers: {
                                        Authorization: sessionStorage.getItem("token")
                                    }
                                }).then((res) => {
                                    this.setState({
                                        listData: res.data.results
                                    })
                                })

                            }
                        }
                    }

                ></Table>
            </div>
        )
    }
}
export default Statistics