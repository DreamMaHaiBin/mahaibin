
export default function compare(
    state={
        columns : [
            {
              title: '名称',
              dataIndex: 'ore.name',
              key: 'ore.name',
              width:"120px"
            }, {
              title: '日期',
              dataIndex: 'ore.incomingDate',
              key: 'ore.incomingDate',
              width:"100px"
            }, {
              title: '到厂价',
              dataIndex: 'ore.priceOre' ,
              key: 'ore.priceOre',
              width:"100px"
            },
            {
              title: '综合品位价',
              dataIndex: 'calcute.totalCost',
              key: 'calcute.totalCost',
              width:"100px"
            },
            {
              title: '品位加扣',
              dataIndex: 'calcute.feCost',
              key: 'calcute.feCost',
              width:"100px"
            },
            {
              title: '碱金属加扣',
              dataIndex: 'calcute.kNaCost',
              key: 'calcute.kNaCost',
              width:"100px"
            },
            {
              title: '锌加扣',
              dataIndex: 'calcute.znCost',
              key: 'calcute.znCost',
              width:"100px"
            },
            {
              title: 'Al2O3加扣',
              dataIndex: 'calcute.doloCost',
              key: 'calcute.doloCost',
              width:"100px"
            },
            {
              title: '硫含量加扣',
              dataIndex: 'calcute.sCost',
              key: 'calcute.sCost',
              width:"100px"
            },
            {
              title: '烧损加扣',
              dataIndex: 'calcute.loiCost',
              key: 'calcute.loiCost',
              width:"100px"
            },
            {
              title: '吨度价',
              dataIndex: 'calcute.ddPrice',
              key: 'calcute.ddPrice',
              width:"100px"
            }, {
              title: '熔剂成本',
              dataIndex: 'calcute.limeCost',
              key: 'calcute.limeCost',
              width:"100px"
            },
            {
              title: '膨润土成本',
              dataIndex: 'calcute.prtCost',
              key: 'calcute.prtCost',
              width:"100px"
            },
            {
              title: '加工成本',
              dataIndex: 'calcute.processCost',
              key: 'calcute.processCost',
              width:"100px"
            },
            {
              title: '高炉燃料成本',
              dataIndex: 'calcute.cokeCost',
              key: 'calcute.cokeCost',
              width:"100px"
            },
            {
              title: '筛分成本',
              dataIndex: 'calcute.screenCost',
              key: 'calcute.screenCost',
              width:"100px"
            }, {
              title: '矿石成本',
              dataIndex: 'calcute.oreCost',
              key: 'calcute.oreCost',
              width:"100px"
            },
            {
              title: 'TFe',
              dataIndex: 'ore.source.tFe',
              key: 'ore.source.tFe',
              width:"100px"
            }, {
              title: 'SiO2',
              dataIndex: 'ore.source.siO2',
              key: 'ore.source.siO2',
              width:"100px"
            }, {
              title: 'Al2O3',
              dataIndex: 'ore.source.al2O3',
              key: 'ore.source.al2O3',
              width:"100px"
            }, {
              title: 'MgO',
              dataIndex: 'ore.source.mgO',
              key: 'ore.source.mgO',
              width:"100px"
            }
            , {
              title: 'CaO',
              dataIndex: 'ore.source.caO',
              key: 'ore.source.caO',
              width:"100px"
            }, {
              title: '烧损',
              dataIndex: 'ore.source.loI',
              key: 'ore.source.loI',
              width:"100px"
            }, {
              title: 'FeO',
              dataIndex: 'ore.source.feO',
              key: 'ore.source.feO',
              width:"100px"
            }, {
              title: 'AsO',
              dataIndex: 'ore.source.asO',
              key: 'ore.source.asO',
              width:"100px"
            },
            {
              title: 'S',
              dataIndex: 'ore.source.s',
              key: 'ore.source.s',
              width:"100px"
            }
            , {
              title: 'P',
              dataIndex: 'ore.source.p',
              key: 'ore.source.p',
              width:"100px"
            }, {
              title: 'K2O',
              dataIndex: 'ore.source.k2O',
              key: 'ore.source.k2O',
              width:"100px"
            }, {
              title: 'Na2O',
              dataIndex: 'ore.source.na2O',
              key: 'ore.source.na2O',
              width:"100px"
            }, {
              title: 'ZnO',
              dataIndex: 'ore.source.znO',
              key: 'ore.source.znO',
              width:"100px"
            }, {
              title: 'MnO',
              dataIndex: 'ore.source.mnO',
              key: 'ore.source.mnO',
              width:"100px"
            }, {
              title: 'TiO2',
              dataIndex: 'ore.source.tiO2',
              key: 'ore.source.tiO2',
              width:"100px"
            }
            , {
              title: 'PbO',
              dataIndex: 'ore.source.pbO',
              key: 'ore.source.pbO',
              width:"100px"
            }, {
              title: 'CuO',
              dataIndex: 'ore.source.cuO',
              key: 'ore.source.cuO',
              width:"100px"
          
            },
            {
              title: 'V2O5',
              dataIndex: 'ore.source.v2O5',
              key: 'ore.source.v2O5',
              width:"100px"
            },
            {
              title: 'Cl',
              dataIndex: 'ore.source.cl',
              key: 'ore.source.cl',
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