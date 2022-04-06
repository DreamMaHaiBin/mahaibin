export default function coke(
    state={
        columns : [
            {
              title: '名称',
              dataIndex: 'name',
              key: 'name',
              width:"100px"
            }, {
              title: '日期',
              dataIndex: 'incomingDate',
              key: 'incomingDate',
              width:"100px"
            }, {
              title: '价格',
              dataIndex: 'price',
              key: 'price',
              width:"100px"
            }, {
              title: '性价比',
              dataIndex: 'x',
              key: 'x',
              width:"100px"
            },{
              title: '强度贡献值',
              dataIndex: 'a',
              key: 'a',
              width:"100px"
            }, {
              title: '成分贡献值',
              dataIndex: 'b',
              key: 'b',
              width:"100px"
            }, {
              title: '综合性能值',
              dataIndex: 'z',
              key: 'z',
              width:"100px"
            }
            , 
            {
              title: 'Mt',
              dataIndex: 'h2O',
              key: 'h2O',
              width:"100px"
            }, {
              title: 'Ad',
              dataIndex: 'hf',
              key: 'hf',
              width:"100px"
            }, {
              title: 'Std',
              dataIndex: 's',
              key: 's',
              width:"100px"
            }, {
              title: 'M40',
              dataIndex: 'm4O',
              key: 'm4O',
              width:"100px"
            }
            , {
              title: 'M10',
              dataIndex: 'm1O',
              key: 'm1O',
              width:"100px"
            }, {
              title: 'CRI',
              dataIndex: 'cRI',
              key: 'cRI',
              width:"100px"
            }, {
              title: 'CSR',
              dataIndex: 'cSR',
              key: 'cSR',
              width:"100px"
            }, {
              title: '平均粒度',
              dataIndex: 'avgSize',
              key: 'avgSize',
              width:"100px"
            },
            {
              title: '供应商',
              dataIndex: 'useOre',
              key: 'useOre',
              width:"100px"
            }
            , {
              title: '熄焦方式',
              dataIndex: 'k',
              key: 'k',
              width:"100px"
            },
            {
              title: '装入方式',
              dataIndex: 'b',
              key: 'l',
              width:"100px"
            }, {
              title: '性价比ID',
              dataIndex: 'evaluation',
              key: 'evaluation',
              width:"100px"
            },
          ]
    },
    action
  ) {
    switch (action.type){
      case "cloums":
        return state;
      default:
        return state;
    }
  }