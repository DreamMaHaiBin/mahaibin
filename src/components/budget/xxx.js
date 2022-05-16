axios.get(`/api/estimate-ore/recent/?purpose=201`, {
    headers: {
        Authorization: sessionStorage.getItem("token")
    }
}).then((res) => {
    res.data.forEach((item) => {
        item.tFe = Number(item.tFe).toFixed(2);
        item.siO2 = Number(item.siO2).toFixed(2);     // 二氧化硅含量
        item.caO = Number(item.caO).toFixed(2);    // 氧化钙含量
        item.mgO = Number(item.mgO).toFixed(2);        // 氧化镁含量
        item.al2O3 = Number(item.al2O3).toFixed(2);    // 氧化铝含量
        item.loI = Number(item.loI).toFixed(2);     // 烧损
        item.feO = Number(item.feO).toFixed(2);        // 氧化铁含量
        item.k2O = Number(item.k2O).toFixed(4);       // 氧化钾含量
        item.na2O = Number(item.na2O).toFixed(4);       // 氧化钠含量
        item.znO = Number(item.znO).toFixed(4);         // 氧化锌含量
        item.s = Number(item.s).toFixed(4);         // 硫含量
        item.p = Number(item.p).toFixed(4);         // 磷含量
        item.tiO2 = Number(item.tiO2).toFixed(4);        // 氧化钛含量
        item.sRatio = Number(item.sRatio).toFixed(2);     // 入炉料筛下率
        item.price = Number(item.price).toFixed(2); // 价格
        item.ratio = Number(item.ratio).toFixed(2);        // 配比
    })
    //////console.log(res)
    this.setState({
        ListData: res.data
    })
    const sub = {
        dataNumber: 0
    }
    res.data.forEach((item, index) => {
        if (index <= 9) {
            sub.dataNumber += Number(item.ratio)
        }
    })
    //  console.log(sub.dataNumber)
    this.setState({
        dataNumber: sub.dataNumber
    })
})
axios.get(`/api/estimate-para-sq/recent/?purpose=201`, {
    headers: {
        Authorization: sessionStorage.getItem("token")
    }
}).then((res) => {
    res.data.outHM = Number(res.data.outHM).toFixed(2);
    res.data.f1 = Number(res.data.f1).toFixed(2);
    res.data.f2 = Number(res.data.f2).toFixed(2);
    res.data.f3 = Number(res.data.f3).toFixed(2);
    res.data.f4 = Number(res.data.f4).toFixed(2);
    res.data.feOS = Number(res.data.feOS).toFixed(2);
    res.data.cMS = Number(res.data.cMS).toFixed(2);
    res.data.fCMB = Number(res.data.fCMB).toFixed(2);
    res.data.dustS = Number(res.data.dustS).toFixed(2);
    res.data.dustSFe = Number(res.data.dustSFe).toFixed(2);
    //////console.log(res)
    this.setState({
        setNewList: res.data
    })
})
// setTimeout(() => {
//烧结信息
axios.get("/api/ore/?ordering=-createTime&incomingDate=&purpose=1", {
    headers: {
        Authorization: sessionStorage.getItem("token")
    }
}).then((res) => {
    // //////console.log(res.data.results)
    this.setState({
        data: res.data.results
    })
})
//最近参数设置信息
axios.get(`/api/estimate-para-gl/recent/?purpose=203`, {
    headers: {
        Authorization: sessionStorage.getItem("token")
    }
}).then((res) => {
    // console.log(res);
    res.data.outS = Number(res.data.outS).toFixed(2)
    this.setState({
        luzhaOne: res.data,
        outSone: res.data.outS
    })
})