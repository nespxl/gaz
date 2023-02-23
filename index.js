const myChart = echarts.init(document.getElementById('main'));
const year = 2022;
const trueItColor = '#56B9F2';
const falseItColor = '#0078D2';
const trueOutColor = '#22C38E';
const falseOutColor = '#00724C';
let charTooltipInIT = true;
let charTooltipInCp = true;
let charTooltipOutIT = true;
let charTooltipOutCp = true;
let charTooltipIn = true;
let charTooltipOut = true;
let tyu1 = [0, 0, 0, 0, 0, 0, 0];
let tyu2 = [0, 0, 0, 0, 0, 0, 0];
let tyu3 = [0, 0, 0, 0, 0, 0, 0];
let tyu4 = [0, 0, 0, 0, 0, 0, 0];

const data = [
    { period: "Март", name: "В программе ЦП", value: 120 },
    { period: "Апрель", name: "В программе ЦП", value: 120 },
    { period: "Май", name: "В программе ЦП", value: 120 },
    { period: "Июнь", name: "В программе ЦП", value: 120 },
    { period: "Июль", name: "В программе ЦП", value: 120 },
    { period: "Август", name: "В программе ЦП", value: 120 },
    { period: "Сентябрь", name: "В программе ЦП", value: 120 },
    { period: "Март", name: "В программе ИТ", value: 220 },
    { period: "Апрель", name: "В программе ИТ", value: 182 },
    { period: "Май", name: "В программе ИТ", value: 191 },
    { period: "Июнь", name: "В программе ИТ", value: 234 },
    { period: "Июль", name: "В программе ИТ", value: 290 },
    { period: "Август", name: "В программе ИТ", value: 330 },
    { period: "Сентябрь", name: "В программе ИТ", value: 310 },
    { period: "Март", name: "Вне программ ЦП", value: 620 },
    { period: "Апрель", name: "Вне программ ЦП", value: 732 },
    { period: "Май", name: "Вне программ ЦП", value: 701 },
    { period: "Июнь", name: "Вне программ ЦП", value: 734 },
    { period: "Июль", name: "Вне программ ЦП", value: 1090 },
    { period: "Август", name: "Вне программ ЦП", value: 1130 },
    { period: "Сентябрь", name: "Вне программ ЦП", value: 1120 },
    { period: "Март", name: "Вне программ ИТ", value: 120 },
    { period: "Апрель", name: "Вне программ ИТ", value: 132 },
    { period: "Май", name: "Вне программ ИТ", value: 101 },
    { period: "Июнь", name: "Вне программ ИТ", value: 134 },
    { period: "Июль", name: "Вне программ ИТ", value: 290 },
    { period: "Август", name: "Вне программ ИТ", value: 230 },
    { period: "Сентябрь", name: "Вне программ ИТ", value: 220 }
];

const prog1 = data.filter(elem => elem.name === 'В программе ИТ');
const prog2 = data.filter(elem => elem.name === 'В программе ЦП');
const prog3 = data.filter(elem => elem.name === 'Вне программ ИТ');
const prog4 = data.filter(elem => elem.name === 'Вне программ ЦП');
const month = 7
const prog5 = []
const prog6 = []
const prog7 = []
for(let i = 0; i < prog1.length; i++) {
    prog5.push(
        {
            period: '',
            name: '',
            value: 0 
        }
    )
}
const len = prog1.concat(prog2)
const len1 = prog3.concat(prog4)
for(let i = 0; i < len.length / 2; i++) {
    prog6.push({
        period: len[i].period,
        name: len[i].name,
        value: len[i].value + len[i+month].value 
    })
}
for(let i = 0; i < len1.length / 2; i++) {
    prog7.push({
        period: len1[i].period,
        name: len1[i].name,
        value: len1[i].value + len1[i+month].value 
    })
}

const option = {
    title: {
        text: 'Проекты в программах и вне программ',
        subtext: 'Сумма и процентное соотношение проектов, находящихся в программах и вне программ',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        top: 'bottom',
        left: 'center',
        icon: 'circle',
    },
    grid: {
        top: '15%',
        left: '3%',
        right: '10%',
        bottom: '10%',
        containLabel: true
    },
    tooltip: {
        backgroundColor: 'rgba(255,255,255,1)',
        border: 'none',
        formatter: function (param) {
            let outCount = 0
            let outCp = 0
            let outIT = 0
            let inCount = 0
            let inCp = 0
            let inIT = 0
            const activeFieldDia = tyu2.concat(tyu1).concat(tyu4).concat(tyu3)
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === 'Вне программ ЦП' && data[i].period === param.data.period || data[i].name === 'Вне программ ИТ' && data[i].period === param.data.period) {
                    outCount += data[i].value - activeFieldDia[i]
                    if (data[i].name === 'Вне программ ЦП') {
                        outCp += data[i].value - activeFieldDia[i]
                    } else {
                        outIT += data[i].value - activeFieldDia[i]
                    }
                }
                if (data[i].name === 'В программе ЦП' && data[i].period === param.data.period || data[i].name === 'В программе ИТ' && data[i].period === param.data.period) {
                    inCount += data[i].value - activeFieldDia[i]
                    if (data[i].name === 'В программе ЦП') {
                        inCp += data[i].value - activeFieldDia[i]
                    } else {
                        inIT += data[i].value - activeFieldDia[i]
                    }
                }
            }
            let inITProgramm = ''
            let inCpProgramm = ''
            let outITProgramm = ''
            let outCpProgramm = ''
            let titleInProgramm = ''
            let titleOutProgramm = ''
            if(charTooltipInIT) {
                inITProgramm = '<div class="containerProject">' +
                `<span class="projectCircle" style="background: ${falseItColor}"></span>` +
                '<div class="projectTitle">' + 'Проекты ИТ' + '</div>' +
                '<div class="projectQuatity">' + `${inCp} шт` + '</div>' +
                '</div>';
            }
            if(charTooltipInCp) {
                inCpProgramm = '<div class="containerProject">' +
                `<span class="projectCircle" style="background: ${trueItColor}"></span>` +
                '<div class="projectTitle">' + 'Проекты ЦП' + '</div>' +
                '<div class="projectQuatity">' + `${inIT} шт` + '</div>' +
                '</div>'
            }
            if(charTooltipOutIT) {
                outITProgramm = '<div class="containerProject">' +
                `<span class="projectCircle" style="background: ${falseOutColor}"></span>` +
                '<div class="projectTitle">' + 'Проекты ИТ' + '</div>' +
                '<div class="projectQuatity">' + `${outCp} шт` + '</div>' +
                '</div>'
            }
            if(charTooltipOutCp) {
                outCpProgramm = '<div class="containerProject">' +
                `<span class="projectCircle" style="background: ${trueOutColor}"></span>` +
                '<div class="projectTitle">' + 'Проекты ЦП' + '</div>' +
                '<div class="projectQuatity">' + `${outIT} шт` + '</div>' +
                '</div>'
            }
            if(charTooltipIn) {
                titleInProgramm = '<div class="containerInProgramm">' +
                '<div class="inProgrammTitle">' + 'В программе' + '</div>' +
                '<div class="inProgrammPercent">' + `${Math.round((inCount) / (outCount + inCount) * 100)}%` + '</div>' +
                '<span class="line"></span>' +
                '<div class="inProgrammQuantity">' + `${inCount} шт` + '</div>' +
                '</div>'
            }
            if(charTooltipOut) {
                titleOutProgramm = '<div class="containerInProgramm">' +
                '<div class="inProgrammTitle">' + 'Вне программе' + '</div>' +
                '<div class="inProgrammPercent">' + `${Math.round(outCount / (outCount + inCount) * 100)}%` + '</div>' +
                '<span class="line"></span>' +
                '<div class="inProgrammQuantity">' + `${outCount} шт` + '</div>' +
                '</div>'
            }
            return '<div class="tooltip">' + '<span class="tooltipArrow"></span>' + '<h3 class="tooltipTitle" style="font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + param.data.period + ' ' + year
                + '</h3>' + titleInProgramm + inITProgramm + inCpProgramm + titleOutProgramm + outITProgramm + outCpProgramm + '</div>'
        }
    },
    xAxis: [
        {
            type: 'category',
            data: ['Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'В программе ИТ П.',
            type: 'bar',
            stack: 'AdTrue',
            data: prog1,
            color: trueItColor,
        },
        {
            name: 'В программе ЦП П.',
            type: 'bar',
            stack: 'AdTrue',
            data: prog2,
            color: falseItColor
        },
        {
            type: 'bar',
            stack: 'AdTrue',
            data: prog5,
            color: 'transparent',
            label: {
                formatter: function(param) {
                    const index = param.dataIndex
                    let visibleStatic = prog6[index].value
                    if(visibleStatic === 0) {
                        visibleStatic = ''
                    }
                    return visibleStatic
                },
                show: true,
                position: 'top',
                valueAnimation: true,
            }
        },
        {
            name: 'Вне программ ИТ П.',
            type: 'bar',
            stack: 'AdFalse',
            data: prog3,
            color: trueOutColor,
        },
        {
            name: 'Вне программ ЦП П.',
            type: 'bar',
            stack: 'AdFalse',
            data: prog4,
            color: falseOutColor
        },
        {
            type: 'bar',
            stack: 'AdFalse',
            data: prog5,
            color: 'transparent',
            label: {
                formatter: function(param) {
                    const index = param.dataIndex
                    let visibleStatic = prog7[index].value
                    if(visibleStatic === 0) {
                        visibleStatic = ''
                    }
                    return visibleStatic
                },
                show: true,
                position: 'top',
                valueAnimation: true,
            }
        },
    ]
};

myChart.on('legendselectchanged', function(params) {

    suppressSelection(myChart, params)

  });

  let defaultStateActiveDia = [true, true, true, true]
  
  function suppressSelection(chart, params) {

    chart.setOption({ animation: true });

    const prevStateActiveDia = Object.values(params.selected)

    let clickActiveDia = null
    for(let i = 0; i < defaultStateActiveDia.length; i++) {
        if(defaultStateActiveDia[i] !== prevStateActiveDia[i]) {
            clickActiveDia = i
        }
    }
    defaultStateActiveDia = prevStateActiveDia
    if(!prevStateActiveDia[1]) {
        charTooltipInIT = false
    } else {
        charTooltipInIT = true
    }
    if(!prevStateActiveDia[0]) {
        charTooltipInCp = false
    } else {
        charTooltipInCp = true
    }
    if(!prevStateActiveDia[3]) {
        charTooltipOutIT = false
    } else {
        charTooltipOutIT = true
    }
    if(!prevStateActiveDia[2]) {
        charTooltipOutCp = false
    } else {
        charTooltipOutCp = true
    }
    if(!prevStateActiveDia[0] && !prevStateActiveDia[1]) {
        charTooltipIn = false
    } else {
        charTooltipIn = true
    }
    if(!prevStateActiveDia[2] && !prevStateActiveDia[3]) {
        charTooltipOut = false
    } else {
        charTooltipOut = true
    }
    if(clickActiveDia === 0) {
        tyu1 = []
        for(let i = 0; i < prog6.length; i++) {
            if(!prevStateActiveDia[clickActiveDia]) {
                tyu1.push(prog1[i].value)
                prog6[i].value = (prog6[i].value - prog1[i].value)
            } 
            if(prevStateActiveDia[clickActiveDia]) {
                tyu1 = [0, 0, 0, 0, 0, 0, 0]
                prog6[i].value = (prog6[i].value + prog1[i].value)
            }
        }
    }
    if(clickActiveDia === 1) {
        tyu2 = []
        for(let i = 0; i < prog6.length; i++) {
            if(!prevStateActiveDia[clickActiveDia]) {
                tyu2.push(prog2[i].value)
                prog6[i].value = (prog6[i].value - prog2[i].value)
            } 
            if(prevStateActiveDia[clickActiveDia]) {
                tyu2 = [0, 0, 0, 0, 0, 0, 0]
                prog6[i].value = (prog6[i].value + prog2[i].value)
            }
        }
    }
    if(clickActiveDia === 2) {
        tyu3 = []
        for(let i = 0; i < prog6.length; i++) {
            if(!prevStateActiveDia[clickActiveDia]) {
                tyu3.push(prog3[i].value)
                prog7[i].value = (prog7[i].value - prog3[i].value)
            } 
            if(prevStateActiveDia[clickActiveDia]) {
                tyu3 = [0, 0, 0, 0, 0, 0, 0]
                prog7[i].value = (prog7[i].value + prog3[i].value)
            }
        }
    }
    if(clickActiveDia === 3) {
        tyu4 = []
        for(let i = 0; i < prog7.length; i++) {
            if(!prevStateActiveDia[clickActiveDia]) {
                tyu4.push(prog4[i].value)
                prog7[i].value = (prog7[i].value - prog4[i].value)
            } 
            if(prevStateActiveDia[clickActiveDia]) {
                tyu4 = [0, 0, 0, 0, 0, 0, 0]
                prog7[i].value = (prog7[i].value + prog4[i].value)
            }
        }
    }
    
    chart.setOption({ animation: true });

}

myChart.setOption(option);
