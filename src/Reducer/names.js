export default function namese(
    state={
      name:""
    },
    action
  ) {
    switch (action.type){
      case "cogntionSuccess":
        return action.name;
      default:
        return state;
    }
  }