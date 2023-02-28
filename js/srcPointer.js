function createPointerSvg(className, value) {
    // console.log('begin')
    let chart = echarts.init(className);
    const option = {
        series: [
            {
                type: 'gauge',
                radius: '100%',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                // radius:'100%',
                min: -60,
                max: 80,
                splitNumber: 10,
                itemStyle: {
                    color: 'rgb(3,7,7)',
                    shadowColor: 'rgb(255,255,255)',
                    shadowBlur: 2,
                    shadowOffsetX: 1,
                    shadowOffsetY: 1
                },
                progress: {
                    show: true,
                    roundCap: true,
                    width: 1
                },
                pointer: {
                    icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                    length: '75%',
                    width: 2,
                    offsetCenter: [0, '5%'],
                },
                axisLine: {
                    show: false,
                    roundCap: true,
                    lineStyle: {
                        width: 2
                    }
                },
                axisTick: {
                    show: false,
                    splitNumber: 2,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                splitLine: {
                    show: false,
                    length: 12,
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    }
                },
                axisLabel: {
                    show: false,
                    distance: 30,
                    color: '#999',
                    fontSize: 20
                },
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [
                    {
                        value: value
                    }
                ]
            }
        ]
    };
    chart.setOption(option)
}