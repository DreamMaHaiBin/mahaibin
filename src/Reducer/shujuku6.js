export default function shujuku6Data(
    state={
        columns : [
            {
              title: '矿粉',
              dataIndex: 'name',
              key: 1,
              width:"100px"
            },{
              title: '进货日期',
              dataIndex: 'incomingDate',
              key: 2,
              width:"100px"
            },{
              title: '价格',
              dataIndex: 'price',
              key: 3,
              width:"100px"
            },{
              title: '水分',
              dataIndex: 'h2O',
              key: 4,
              width:"100px"
            }, {
              title: 'AD',
              dataIndex: 'hf',
              key: 5,
              width:"100px"
            },{
              title: 'Std',
              dataIndex: 's',
              key: 6,
              width:"100px"
            },{
              title: 'M40',
              dataIndex: 'm4O',
              key: 7,
              width:"100px"
            }, {
              title: 'M10',
              dataIndex: 'm1O',
              key: 8,
              width:"100px"
            }, {
              title: 'CRI',
              dataIndex: 'cRI',
              key: 9,
              width:"100px"
            }, {
              title: 'CSR',
              dataIndex: 'cSR',
              key: 10,
              width:"100px"
            },{
              title: '平均粒度',
              dataIndex: 'avgSize',
              key: 11,
              width:"100px"
            }, {
              title: 'SiO2',
              dataIndex: 'SiO2',
              key: 12,
              width:"100px"
            },{
              title: 'CaO',
              dataIndex: 'CaO',
              key: 13,
              width:"100px"
            },{
              title: 'MgO',
              dataIndex: 'MgO',
              key: 15,
              width:"100px"
            },{
              title: 'Al2O3',
              dataIndex: 'Al2O3',
              key: 16,
              width:"100px"
            },{
              title: '烧损',
              dataIndex: 'LOI',
              key: 17,
              width:"100px"
            },{
              title: '固定碳',
              dataIndex: 'C',
              key: 18,
              width:"100px"
            },{
              title: 'FeO',
              dataIndex: 'FeO',
              key: 19,
              width:"100px"
            },{
              title: 'K2O',
              dataIndex: 'K2O',
              key: 20,
              width:"100px"
            },{
              title: 'Na2O',
              dataIndex: 'Na2O',
              key: 21,
              width:"100px"
            },{
              title: 'ZnO',
              dataIndex: 'ZnO',
              key: 22,
              width:"100px"
            },{
              title: 'P',
              dataIndex: 'P',
              key: 23,
              width:"100px"
            },{
              title: 'TiO2',
              dataIndex: 'TiO2',
              key: 24,
              width:"100px"
            },{
              title: 'PbO',
              dataIndex: 'PbO',
              key: 25,
              width:"100px"
            },{
              title: 'AsO',
              dataIndex: 'AsO',
              key: 26,
              width:"100px"
            }, {
              title: '熄焦方式',
              dataIndex: 'xjType',
              key: 29,
              width:"100px"
            },{
              title: '装入方式',
              dataIndex: 'zrType',
              key: 30,
              width:"100px"
            },{
              title: '供应商',
              dataIndex: 'merchantName',
              key: 28,
              width:"100px"
            }
          ]
    },
    action
){
    switch (action.type){
      case "cloums":
        return state;
      default:
        return state;
    }
  }