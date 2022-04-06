
import React from "react";
import DragM from "dragm";
import "antd/dist/antd.css";
export default class BuildTitle extends React.Component {
  updateTransform = transformStr => {
    this.modalDom.style.transform = transformStr;
  };
  componentDidMount() {
      this.modalDom = document.getElementsByClassName(
        "ant-modal-wrap" //modal的class是ant-modal-wrap
      )
      if(this.props.tabKeys){
        //console.log(this.modalDom)
        if(this.props.tabKeys==="2" && this.modalDom.length===1){
          this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
          )[0]
        }
        if(this.props.tabKeys==="2" && this.modalDom.length===2){
          this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
          )[1]
        }
        if(this.props.tabKeys==="2" && this.modalDom.length===3){
          this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
          )[2]
        }
        if(this.props.tabKeys==="3" && this.modalDom.length===1){
          this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
          )[0]
        }
        if(this.props.tabKeys==="3" && this.modalDom.length===2){
          this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
          )[1]
        }
        if(this.props.tabKeys==="3" && this.modalDom.length===3){
          this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
          )[2]
        }
        if(this.props.tabKeys==="" && this.modalDom.length===1){
          this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
          )[0]
        }
        if(this.props.tabKeys==="" && this.modalDom.length===2){
          this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
          )[1]
        }
        if(this.props.tabKeys==="" && this.modalDom.length===3){
          this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
          )[2]
        }
      }else{
        this.modalDom = document.getElementsByClassName(
          "ant-modal-wrap" //modal的class是ant-modal-wrap
        )[0]
      }

  }
  render() {
    const { title } = this.props;
    return (
      <DragM updateTransform={this.updateTransform}>
        <div style={{ width: "100%", height: "100%" }}>{title}</div>
      </DragM>
    );
  }
}
