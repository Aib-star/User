/*
*       生成频谱图
* */
function createSpectrum(className, minFre, maxFre, srcPower, srcType) {
    if (minFre >= maxFre){
        alert("最小频率应小于最大频率！")
        return
    }
    let chart = echarts.init(className)
    let srcX = []
    let srcY = []
    const PI = 3.1415;
    //实现chart的响应式布局
    window.addEventListener('resize', () => {
        chart.resize()
    })
    //数据值
    for (let i = minFre; i < maxFre + 1; i++) {
        srcX.push(i)
    }
    if (srcType === '正弦波') {
        for (let i = 0; i < 360 * ((maxFre - minFre) / 8); i++) {
            srcY.push(Math.sin(i / 360 * 2 * PI) * srcPower + srcPower)
        }
        //定义各频谱的option并显示
        const option = {
            xAxis: {
                name: 'frequency(MHz)',
                nameLocation: 'center',
                nameTextStyle: {
                    show: false,
                    fontSize: 15,
                    fontWeight: 'bold',
                },
                nameGap: 25,
                data: [],
                boundaryGap: 0,
                axisLabel: {
                    show: false,
                }
            },
            yAxis: {
                show: false,
                name: 'Amplitude(dB)',
                nameLocation: 'center',
                nameTextStyle: {
                    show: false,
                    fontSize: 15,
                    fontWeight: 'bold',
                },
                nameGap: 25,
                axisLabel: {
                    show: false,
                }
            },
            series: {
                name: "src",
                step: "",
                nameLocation: 'center',
                nameTextStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                },
                type: 'line',
                data: srcY,
                itemStyle: {
                    color: 'blue'
                },
                areaStyle: {
                    color: 'blue',
                    opacity: 0.1
                },
                markLine: {
                    data: [
                        {yAxis: srcPower}
                    ],
                    symbol: 'none'
                },
                symbol: 'none'
            },
            title: {
                show: false,
                left: 'center',
                textStyle: {
                    fontSize: 20
                },
            },
            grid: {
                top: 1,
                left: 1,
                right: 1,
                bottom: 1,
            },
            tooltip: {
                trigger: 'item'
            },
            // dataZoom: [
            //     {
            //         show: true,
            //         type: 'inside',
            //         filterMode: 'none',
            //         xAxisIndex: [0],
            //         startValue: -20,
            //         endValue: 20
            //     },
            //     {
            //         show: true,
            //         type: 'inside',
            //         filterMode: 'none',
            //         yAxisIndex: [0],
            //         startValue: -20,
            //         endValue: 20
            //     }
            // ]
        }
        chart.setOption(option)
    } else if (srcType === "三角波") {
        for (let i = minFre; i < maxFre + 1; i++) {
            if (i % 2 === 0) {
                srcY.push(srcPower)
            } else {
                srcY.push(-srcPower)
            }
        }
        //定义各频谱的option并显示
        const option = {
            xAxis: {
                name: 'frequency(MHz)',
                nameLocation: 'center',
                nameTextStyle: {
                    fontSize: 15,
                    fontWeight: 'bold',
                },
                nameGap: 25,
                data: srcX,
                boundaryGap: 0,
                axisLabel: {
                    show: true,
                }
            },
            yAxis: {
                name: 'Amplitude(dB)',
                nameLocation: 'center',
                nameTextStyle: {
                    fontSize: 15,
                    fontWeight: 'bold',
                },
                nameGap: 25,
                axisLabel: {
                    show: true
                }
            },
            series: {
                name: "src",
                step: "",
                nameLocation: 'center',
                nameTextStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                },
                type: 'line',
                data: srcY,
                itemStyle: {
                    color: 'blue'
                },
                areaStyle: {
                    color: 'blue',
                    opacity: 0.1
                },
                markLine: {
                    data: [
                        {yAxis: srcPower}
                    ],
                    symbol: 'none'
                },
                symbol: 'none'
            },
            title: {
                text: 'spectrum',
                left: 'center',
                textStyle: {
                    fontSize: 20
                },
            },
            grid: {
                top: 80
            },
            tooltip: {
                trigger: 'item'
            },
        }
        chart.setOption(option)
    } else if (srcType === "方波") {
        for (let i = minFre; i < maxFre + 1; i++) {
            if (i % 2 === 0) {
                srcY.push(srcPower)
            } else {
                srcY.push(-srcPower)
            }
        }
        const option = {
            xAxis: {
                name: 'frequency(MHz)',
                nameLocation: 'center',
                nameTextStyle: {
                    fontSize: 15,
                    fontWeight: 'bold',
                },
                nameGap: 25,
                data: srcX,
                boundaryGap: 0,
                axisLabel: {
                    show: true,
                }
            },
            yAxis: {
                name: 'Amplitude(dB)',
                nameLocation: 'center',
                nameTextStyle: {
                    fontSize: 15,
                    fontWeight: 'bold',
                },
                nameGap: 25,
                axisLabel: {
                    show: true
                }
            },
            series: {
                name: "src",
                step: "start",
                nameLocation: 'center',
                nameTextStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                },
                type: 'line',
                data: srcY,
                itemStyle: {
                    color: 'blue'
                },
                areaStyle: {
                    color: 'blue',
                    opacity: 0.1
                },
                markLine: {
                    data: [
                        {yAxis: srcPower}
                    ],
                    symbol: 'none'
                },
                symbol: 'none'
            },
            title: {
                text: 'spectrum',
                left: 'center',
                textStyle: {
                    fontSize: 20
                },
            },
            grid: {
                top: 80
            },
            tooltip: {
                trigger: 'item'
            },
        }
        chart.setOption(option)
    }
}

