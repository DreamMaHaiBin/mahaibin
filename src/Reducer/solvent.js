export default function solvent(
    state={
        columns : [
            {
              title: '矿粉',
              dataIndex: 'name',
              key: "name",
              width:"100px"
            }, {
              title: '进货日期',
              dataIndex: 'incomingDate',
              key: "incomingDate",
              width:"100px"
            },  {
              title: '价格',
              dataIndex: 'price',
              key: "price",
              width:"100px"
            }, {
              title: 'TFe',
              dataIndex: 'TFe',
              key: "TFe",
              width:"100px"
            }, {
              title: 'SiO2',
              dataIndex: 'SiO2',
              key: "SiO2",
              width:"100px"
            }, {
              title: 'CaO',
              dataIndex: 'CaO',
              key: "CaO",
              width:"100px"
            },{
              title: 'MgO',
              dataIndex: 'MgO',
              key: "MgO",
              width:"100px"
            }, {
              title: 'Al2O3',
              dataIndex: 'Al2O3',
              key: "Al2O3",
              width:"100px"
            }, {
              title: 'MnO',
              dataIndex: 'MnO',
              key: "MnO",
              width:"100px"
            }, {
              title: '烧损',
              dataIndex: 'LOI',
              key: "LOI",
              width:"100px"
            },{
              title: 'FeO',
              dataIndex: 'FeO',
              key: "FeO",
              width:"100px"
          
            }, {
              title: 'K2O',
              dataIndex: 'K2O',
              key: "K2O",
              width:"100px"
            }, {
              title: 'Na2O',
              dataIndex: 'Na2O',
              key: "Na2O",
              width:"100px"
            }, {
              title: 'ZnO',
              dataIndex: 'ZnO',
              key: "ZnO",
              width:"100px"
            }, {
              title: 'S',
              dataIndex: 'S',
              key: "S",
              width:"100px"
            }, {
              title: 'P',
              dataIndex: 'P',
              key: "P",
              width:"100px"
            },{
              title: 'TiO2',
              dataIndex: 'TiO2',
              key: "TiO2",
              width:"100px"
            },{
              title: 'PbO',
              dataIndex: 'PbO',
              key: "PbO",
              width:"100px"
            },{
              title: 'AsO',
              dataIndex: 'AsO',
              key: "AsO",
              width:"100px"
            },{
              title: '水分',
              dataIndex: 'h2O',
              key: "h2O",
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