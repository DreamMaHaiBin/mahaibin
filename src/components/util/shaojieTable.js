
const list = []

for (let i = 0; i < 71; i++) {
    list.push({
        name: i === 1 ? '总成本' : i === 2 ? '金属料合计' : "产量",
        line: i+1,
        dw: "吨",
        qcdj: 10,
        qcrdh: 2,
        qcydh: null,
        qcrcb: null,
        qcycb: 2,
        // ysrdh: 2,
        // ysydh: 2,
        // ysrcb: 2,
        // ysycb: 2,
        esrdh: 2,
        esydh: 2,
        esrcb: 2,
        esycb: 2,
        ssrdh: 2,
        ssydh: 2,
        ssrcb: 2,
        ssycb: 2,
    });

}
export const tableListDataShaojie = list

const qiutuanList = []

for (let i = 0; i < 31; i++) {
    qiutuanList.push({
        name: i === 1 ? '总成本' : i === 2 ? '金属料合计' : "产量",
        line: i+1,
        dw: i,
        qcdj: 10,
        qcrdh: 2,
        qcydh: 2,
        qcrcb: 2,
        qcycb: 2,
        // ysrdh: 2,
        // ysydh: 2,
        // ysrcb: 2,
        // ysycb: 2,
        yxlrdh : 2,
        yxlydh: 2,
        yxlrcb: 2,
        yxlycb: 2,
        exlrdh: 2,
        exlydh: 2,
        exlrcb: 2,
        exlycb: 2,
    });

}
export const qiuTuanListData = qiutuanList

const gaoluList = []

for (let i = 0; i < 83; i++) {
    gaoluList.push({
        name: i === 1 ? '总成本' : i === 2 ? '金属料合计' : "产量",
        dw: i,
        line: i+1,
        qcdj: 10,
        qcrdh: 2,
        qcydh: 2,
        qcrcb: 2,
        qcycb: 2,
        yglrdh: null,
        yglydh: null,
        yglrcb: 2,
        yglycb: 2,
        eglrdh: 2,
        eglydh: 2,
        eglrcb: 2,
        eglycb: 2,
        sglrdh: 2,
        sglydh: 2,
        sglrcb: 2,
        sglycb: 2,
    });

}
export const gaoluListData = gaoluList