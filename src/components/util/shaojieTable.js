
const list = []

for (let i = 0; i < 72; i++) {
    list.push({
        name: i === 1 ? '总成本' : i === 2 ? '金属料合计' : "产量",
        dw: "吨",
        dj: 10,
        qcrdh: 2,
        qcydh: 2,
        qcrcb: 2,
        qcycb: 2,
        ysrdh: 2,
        ysydh: 2,
        ysrcb: 2,
        ysycb: 2,
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

const gaoluList = []

for (let i = 0; i < 83; i++) {
    gaoluList.push({
        name: i === 1 ? '总成本' : i === 2 ? '金属料合计' : "产量",
        dw: i,
        dj: 10,
        qcrdh: 2,
        qcydh: 2,
        qcrcb: 2,
        qcycb: 2,
        ysrdh: 2,
        ysydh: 2,
        ysrcb: 2,
        ysycb: 2,
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
export const gaoluListData = gaoluList