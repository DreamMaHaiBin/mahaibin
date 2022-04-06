export default function shujuku3Data(
    state={
        columns : [
            {
                title: '矿粉',
                dataIndex: 'name',
                key: "name",
                 width:"100px",
                lineHeight:"30px" 
              }, {
                title: '日期',
                dataIndex: 'incomingDate',
                key: "incomingDate",
                width:"100px"
              }, {
                title: '价格',
                dataIndex: 'price',
                key: "price",
                width:"100px",
              },{
                title: '入炉料类型',
                dataIndex: 'burdenType',
                key: "burdenType",
                width:"100px",
              },  {
                title: '筛下率',
                dataIndex: 'sRatio',
                key: "sRatio",
                width:"100px",
              },
              {
                title: 'TFe',
                dataIndex: 'source.tFe',
                key: "source.tFe",
                width:"100px",
              }, {
                title: 'SiO2',
                dataIndex: 'source.siO2',
                key: "source.siO2",
                width:"100px",
              }, {
                title: 'Al2O3',
                dataIndex: 'source.al2O3',
                key: "source.al2O3",
                width:"100px",
              }, {
                title: 'MgO',
                dataIndex: 'source.mgO',
                key: "source.mgO",
                width:"100px",
              }
              , {
                title: 'CaO',
                dataIndex: 'source.caO',
                key: "source.caO",
                width:"100px",
              }, {
                title: '烧损',
                dataIndex: 'source.loI',
                key: "source.loI",
                width:"100px",
            
              }, {
                title: 'FeO',
                dataIndex: 'source.feO',
                key: "source.feO",
                width:"100px",
              }, {
                title: 'S',
                dataIndex: 'source.s',
                key: "source.s",
                width:"100px",
              }
              , {
                title: 'P',
                dataIndex: 'source.p',
                key: "source.p",
                width:"100px",
              }, {
                title: 'K2O',
                dataIndex: 'source.k2O',
                key: "source.k2O",
                width:"100px",
              }, {
                title: 'Na2O',
                dataIndex: 'source.na2O',
                key: "source.na2O",
                width:"100px",
              }, {
                title: 'ZnO',
                dataIndex: 'source.znO',
                key: "source.znO",
                width:"100px",
              }, {
                title: 'MnO',
                dataIndex: 'source.mnO',
                key: "source.mnO",
                width:"100px",
              }, {
                title: 'TiO2',
                dataIndex: 'source.tiO2',
                key: "source.tiO2",
                width:"100px",
              }
              , {
                title: 'PbO',
                dataIndex: 'source.pbO',
                key: "source.pbO",
                width:"100px",
              }, {
                title: 'CuO',
                dataIndex: 'source.cuO',
                key: "source.cuO",
                width:"100px",
            
              }, {
                title: 'V2O5',
                dataIndex: 'source.v2O5',
                key: "source.v2O5",
                width:"100px",
              }, {
                title: '水分',
                dataIndex: 'source.h2O',
                key: "source.h2O",
                width:"100px",
              },
              {
                title: 'Cl',
                dataIndex: 'source.cl',
                key: "source.cl",
                width:"100px",
              }, {
                title: '灰分',
                dataIndex: 'source.hf',
                key: "source.hf",
                 width:"100px",
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