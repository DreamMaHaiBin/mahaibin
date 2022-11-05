// 设置 rem 函数
function setRem() {
    // 1920 默认大小16px; 1920px = 120rem ;每个元素px基础上/16
    const screenWidth = 1920
    const scale = screenWidth / 16
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
    // 得到html的Dom元素
    const htmlDom = document.getElementsByTagName('html')[0]
    // 设置根元素字体大小
    htmlDom.style.fontSize = htmlWidth / scale + 'px'
  }
  // 初始化
  setRem()
  // 改变窗口大小时重新设置 rem
  window.onresize = function() {
    setRem()
  }