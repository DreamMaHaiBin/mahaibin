export function  getMonthLength(date) {
    let d = new Date(date);
    // 将日期设置为下月一号
    d.setMonth(d.getMonth()+1);
    d.setDate('1');
    // 获取本月最后一天
    d.setDate(d.getDate()-1);
    return d.getDate();
  }