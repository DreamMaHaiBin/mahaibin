export default function cogntionAjax(
    state={
      columns : [
        {
          title: '名称',
          dataIndex: 'name',
          key:'name',
          width:"100px"
        },{
          title: '有效价值率',
          dataIndex: 'yxjzl',
          key:'yxjzl',
          width:"100px"
        },{
          title: '值换比',
          dataIndex: 'i',
          key:'i',
          width:"100px"
        },
        {
          title: 'V固定碳',
          dataIndex: 'j',
          key:'j',
          width:"100px"
        }
        , {
          title: 'V挥发分',
          dataIndex: 'k',
          key:'k',
          width:"100px"
        },
    
        {
          title: 'V灰分',
          dataIndex: 'l',
          key:'l',
          width:"100px"
        },{
          title: 'V硫分',
          dataIndex: 'm',
          key:'m',
          width:"100px"
        }, {
          title: 'V水分',
          dataIndex: 'n',
          key:'n',
          width:"100px"
        },{
          title: 'V热值',
          dataIndex: 'o',
          key:'o',
          width:"100px"
        }, {
          title: 'V可磨性',
          dataIndex: 'p',
          key:'p',
          width:"100px"
        },{
          title: '灰分',
          dataIndex: 'hf',
          key:'hf',
          width:"100px"
        },{
          title: '挥发分',
          dataIndex: 'hff',
          key:'hff',
          width:"100px"
        },
        {
          title: '硫分',
          dataIndex: 's',
          key:'s',
          width:"100px"
        }, {
          title: '水分',
          dataIndex: 'h2O',
          key:'h2O',
          width:"100px"
        },{
          title: '固定碳',
          dataIndex: 'c',
          key:'c',
          width:"100px"
        }, {
          title: '发热值',
          dataIndex: 'frz',
          key:'frz',
          width:"100px"
        }
        , {
          title: '可磨性',
          dataIndex: 'kmx',
          key:'kmx',
          width:"100px"
        }, {
          title: '到厂税价格',
          dataIndex: 'price',
          key:'price',
          width:"100px"
        }, {
          title: '供应商',
          dataIndex: 'useOre',
          key:'useOre',
          width:"100px"
        }, {
          title: '性价比ID',
          dataIndex: 'evaluation',
          key:'evaluation',
          width:"100px"
        }
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