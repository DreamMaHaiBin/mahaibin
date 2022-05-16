export default function dataList(
    state={
     columns:[{
            title: '名称',//表头的开头文字
            dataIndex: 'name',//列数据在数据项中对应的 key，支持 a.b.c、a[0].b.c[1] 的嵌套写法
            key: "name",//React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
            width:"150px"
          }, {
            title: '日期',
            dataIndex: 'incomingDate',
            key: "incomingDate",
            width:"100px"
          }, {
            title: '到厂价',
            dataIndex: 'priceOre',
            key: "priceOre",
            width:"100px"
          
          },{
            title: '船名',
            dataIndex: 'comeFrom.boatName',
            key: "comeFrom.boatName",
            width:"100px"
          }, {
            title: '航线',
            dataIndex: 'comeFrom.route_name',
            key: "comeFrom.route_name",
            width:"100px"
          }
            , {
            title: '进口商',
            dataIndex: 'comeFrom.merchantName',
            key: "comeFrom.merchantName",
            width:"100px"
          }, {
            title: '指数类型',
            dataIndex: 'comeFrom.indexType',
            key: "comeFrom.indexType",
            width:"100px"
          
          }, {
            title: '折扣',
            dataIndex: 'comeFrom.discount',
            key: "comeFrom.discount",
            width:"100px"
          
          }, {
            title: '优惠',
            dataIndex: 'comeFrom.offer',
            key: "comeFrom.offer",
            width:"100px"
          
          }, {
            title: '品位溢价',
            dataIndex: 'comeFrom.pwyjPrice',
            key: 'comeFrom.pwyjPrice',
            width:"100px"
          
          }, {
            title: '品种加价',
            dataIndex: 'comeFrom.pzjiajPrice',
            key: "comeFrom.pzjiajPrice",
            width:"100px"
          
          }, {
            title: '品种减价',
            dataIndex: 'comeFrom.pzjianjPrice',
            key: "comeFrom.pzjianjPrice",
            width:"100px"
          }, 
          {
            title: '测算价',
            dataIndex: 'comeFrom.csPrice',
            key: "comeFrom.csPrice",
            width:"100px"
          }, 
          //  {
          //   title: '矿粉类型',
          //   dataIndex: 'burdenType',
          //   key: "burdenType"
          
          // }, 
          {
            title: '备注',
            dataIndex: 'remark',
            key: "remark",
            width:"100px"
          
          },
            // {
            //   title: '名称',
            //   dataIndex: 'name',
            //   key: "name3",
            //   width:"150px"
            // },
            {
              title: 'TFe',
              dataIndex: 'source.tFe',
              key: "source.tFe",
              width:"100px"
            }, {
              title: 'SiO2',
              dataIndex: 'source.siO2',
              key: "source.siO2",
              width:"100px"
            }, {
              title: 'Al2O3',
              dataIndex: 'source.al2O3',
              key: 'source.al2O3',
              width:"100px"
            }, {
              title: 'MgO',
              dataIndex: 'source.mgO',
              key: 'source.mgO',
              width:"100px"
            }
            , {
              title: 'CaO',
              dataIndex: 'source.caO',
              key: 'source.caO',
              width:"100px"
            }, {
              title: '烧损',
              dataIndex: 'source.loI',
              key: 'source.loI',
              width:"100px"
          
            }, {
              title: 'FeO',
              dataIndex: 'source.feO',
              key: "source.feO",
              width:"100px"
            }, {
              title: 'AsO',
              dataIndex: 'source.asO',
              key: 'source.asO',
              width:"100px"
            }, {
              title: '单烧品位',
              dataIndex: 'source.dspw',
              key: 'source.dspw',
              width:"100px"
            }, {
              title: 'S',
              dataIndex: 'source.s',
              key: 'source.s',
              width:"100px"
            }
            , {
              title: 'P',
              dataIndex: 'source.p',
              key: "source.p",
              width:"100px"
            }, {
              title: 'K2O',
              dataIndex: 'source.k2O',
              key: 'source.k2O',
              width:"100px"
            }, {
              title: 'Na2O',
              dataIndex: 'source.na2O',
              key: "source.na2O",
              width:"100px"
            }, {
              title: 'ZnO',
              dataIndex: 'source.znO',
              key: "source.znO",
              width:"100px"
            }, {
              title: 'MnO',
              dataIndex: 'source.mnO',
              key: "source.mnO",
              width:"100px"
            }, {
              title: 'TiO2',
              dataIndex: 'source.tiO2',
              key: 'source.tiO2',
              width:"100px"
            }
            , {
              title: 'PbO',
              dataIndex: 'source.pbO',
              key: "source.pbO",
              width:"100px"
            }, {
              title: 'CuO',
              dataIndex: 'source.cuO',
              key: "source.cuO",
              width:"100px"
          
            },  {
              title: 'H2O',
              dataIndex: 'source.h2O',
              key: "source.h2O",
              width:"100px"
          
            }, 
            // {
            //   title: '水分',
            //   dataIndex: 'source.h2O',
            //   key: "source.h2O",
            //   width:"100px"
            // }, 
            // {
            //   title: 'Cl',
            //   dataIndex: 'source.cl',
            //   key: "source.cl",
            //   width:"100px"
            // }, {
            //   title: '残存',
            //   dataIndex: 'remain',
            //   key: 'remain',
            //   width:"100px"
            // }, {
            //   title: 'V2O5',
            //   dataIndex: 'source.v2O5',
            //   key: "source.v2O5",
            //   width:"100px"
            // }
          ],
          // character : [
          //   {
          //     title: '名称',
          //     dataIndex: 'name',
          //     key: "name2",
          //     width:"100px"
          //   }, {
          //     title: '同化温度',
          //     dataIndex: 'features.thTemperature',
          //     key: "features.thTemperature",
          //     width:"150px"
          //   }, {
          //     title: 'T1250R4',
          //     dataIndex: 'features.t125OR4',
          //     key: "features.t125OR4",
          //     width:"150px"
          //   }, {
          //     title: 'T1250R5',
          //     dataIndex: 'features.t125OR5',
          //     key: "features.t125OR5",
          //     width:"150px"
          //   }, {
          //     title: 'T1250R6',
          //     dataIndex: 'features.t125OR6',
          //     key: "features.t125OR6",
          //     width:"150px"
          //   }, {
          //     title: 'T1280R4',
          //     dataIndex: 'features.t128OR4',
          //     key: "features.t128OR4",
          //     width:"150px"
          //   }, {
          //     title: 'T1310R4',
          //     dataIndex: 'features.t131OR4',
          //     key: "features.t131OR4",
          //     width:"150px"
          //   }
          // ],
          // constitute : [//力度组成目录
          //   {
          //     title: '名称',
          //     dataIndex: 'name',
          //     key: "name1",
          //     width:"150px"
          //   }, {
          //     title: '大于7mm',
          //     dataIndex: 'size.gt7mm',
          //     key: "size.gt7mm",
          //     width:"100px"
          //   }, {
          //     title: '7至5mm',
          //     dataIndex: 'size.gt5Lte7mm',
          //     key: "size.gt5Lte7mm",
          //     width:"100px"
          //   }, {
          //     title: '5至3mm',
          //     dataIndex: 'size.gt3Lte5mm',
          //     key: "size.gt3Lte5mm",
          //     width:"100px"
          //   }, {
          //     title: '3至1mm',
          //     dataIndex: 'size.gt1Lte3mm',
          //     key: "size.gt1Lte3mm",
          //     width:"100px"
          //   }, {
          //     title: '小于1mm',
          //     dataIndex: 'size.lte1mm',
          //     key: "size.lte1mm",
          //     width:"100px"
          //   }, {
          //     title: '小于35目',
          //     dataIndex: 'size.lte35mu',
          //     key: "size.lte35mu",
          //     width:"100px"
          //   }, {
          //     title: '35至60目',
          //     dataIndex: 'size.gt35Lte60mu',
          //     key: "size.gt35Lte60mu",
          //     width:"100px"
          //   }, {
          //     title: '60至100目',
          //     dataIndex: 'size.gt60Lte100mu',
          //     key: "size.gt60Lte100mu",
          //     width:"100px"
          //   }, {
          //     title: '100至140目',
          //     dataIndex: 'size.gt100Lte140mu',
          //     key: "size.gt100Lte140mu",
          //     width:"100px"
          //   }, {
          //     title: '140至200目',
          //     dataIndex: 'size.gt140Lte200mu',
          //     key: "size.gt140Lte200mu",
          //     width:"100px"
          //   }, {
          //     title: '大于200目',
          //     dataIndex: 'size.gte200mu',
          //     key: "size.gte200mu",
          //     width:"100px"
          //   }, {
          //     title: '平均粒径',
          //     dataIndex: 'size.avgSize',
          //     key: "size.avgSize",
          //     width:"100px"
          //   }
          // ]
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