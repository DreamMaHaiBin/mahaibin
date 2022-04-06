export default function shujuku5Data(
    state={
        columns : [
            {
              title: '名称',
              dataIndex: 'name',
              key: "name",
              width:"100px"
            }, {
              title: '日期',
              dataIndex: 'incomingDate',
              key: "incomingDate",
              width:"100px"
            },  {
              title: '价格',
              dataIndex: 'price',
              key: "price",
              width:"100px"
            },{
              title: '灰分',
              dataIndex: 'hf',
              key: "hf",
              width:"100px"
            }, {
              title: '挥发分',
              dataIndex: 'hff',
              key: "hff",
              width:"100px"
            }, {
              title: '硫分',
              dataIndex: 's',
              key: "s",
              width:"100px"
            },{
              title: '水分',
              dataIndex: 'h2O',
              key: "h2O",
              width:"100px"
            }, {
              title: '固定碳',
              dataIndex: 'c',
              key: "c",
              width:"100px"
            }, {
              title: '发热值',
              dataIndex: 'frz',
              key: "frz",
              width:"100px"
            }, {
              title: '可磨性',
              dataIndex: 'kmx',
              key: "kmx",
              width:"100px"
            },{
              title: 'SiO2',
              dataIndex: 'SiO2',
              key: 12,
              width:"100px",
              
            },{
              title: 'CaO',
              dataIndex: 'CaO',
              key: 13,
              width:"100px",
              
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
            },{
              title: '供应商',
              dataIndex: 'merchantName',
              key: "merchantName",
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