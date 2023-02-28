function createModel() {
    //拿到表单的输入域
    let numInput = document.getElementById("nodeNum")
    let spreadSelect = document.getElementById("spreadSel")
    let protoSelect = document.getElementById("protocolSel")
    //定义表单项变量
    let nodeSum
    let nodeDist
    let protocol
    //拿到img标签（gif）
    let gif = document.getElementById('gif')
    // //添加画板html
    // const chartHtml = "<div id=\"transBox\" style=\"width: 595px;height: 480px;\"></div>"
    // //拿到画板所处域
    // let displayField = document.getElementsByClassName("displayField")[0]
    //提交事件
    $("#submit").click(function () {
        nodeSum = numInput.value
        nodeDist = spreadSelect.value
        protocol = protoSelect.value
        //判空
        if (nodeSum === '' || nodeDist === "请选择通信节点空间分布" || protocol === "请选择无线通信协议") {
            alert("请输入完整的信息")
            return
        } else {
            alert("提交成功")
        }
        // 发起 POST 请求
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1/post',
            data: {
                nodeSum: nodeSum,
                nodeDist: nodeDist,
                protocol: protocol
            },
            success: (res) => {
                console.log(res)
                if (res.data === 'not found'){
                    alert(`未找到此仿真！`)
                    gif.setAttribute("src", '')
                    return
                }
                //修改img的src
                gif.setAttribute("src", res.data)
            }
        })
        //随机生成节点的位置
        // let nodes = []
        // nodes = removeDuplicate(nodes, parseInt(nodeNum), 0, 10)
        // //根据节点分布生成相应效果
        // if (nodeSpread === '随机分布') {
        //     //清空之前的div
        //     clearContent(displayField)
        //     //生成chart的div
        //     displayField.insertAdjacentHTML("beforeend", chartHtml)
        //     let transBox = document.getElementById("transBox")
        //     console.log(displayField)
        //     //初始化echart
        //     let chart = echarts.init(transBox)
        //     const option = {
        //         xAxis: {
        //             type: 'category',
        //             boundaryGap: 0,
        //             data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        //             axisTick: {
        //                 show: false,
        //             },
        //             axisLabel: {
        //                 show: true,
        //             },
        //             axisLine: {
        //                 show: true,
        //                 lineStyle: {
        //                     color: '#000',
        //                     width: 1,
        //                     type: 'solid',
        //                 }
        //             },
        //         },
        //         yAxis: {
        //             type: 'category',
        //             boundaryGap: 0,
        //             data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        //             axisLabel: {
        //                 show: true,
        //             },
        //             axisTick: {
        //                 show: false
        //             },
        //             axisLine: {
        //                 show: true,
        //                 lineStyle: {
        //                     color: '#000',
        //                     width: 1,
        //                     type: 'solid',
        //                 }
        //             },
        //         },
        //         series: [
        //             {
        //                 type: 'scatter',
        //                 data: nodes
        //             }
        //         ]
        //     }
        //     chart.setOption(option)
        // } else if (nodeSpread === '棋盘分布') {
        //     //清空之前的div
        //     clearContent(displayField)
        //     //生成chart的div
        //     displayField.insertAdjacentHTML("beforeend", chartHtml)
        //     let  transBox = document.getElementById("transBox")
        //     //初始化echart
        //     let chart = echarts.init(transBox)
        //     const option = {
        //         xAxis: {
        //             type: 'category',
        //             boundaryGap: 0,
        //             data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        //             axisTick: {
        //                 show: false,
        //             },
        //             axisLabel: {
        //                 show: true,
        //             },
        //             axisLine: {
        //                 show: true,
        //                 lineStyle: {
        //                     color: '#000',
        //                     width: 1,
        //                     type: 'solid',
        //                 }
        //             },
        //             splitLine: {
        //                 show: true,
        //                 lineStyle: {
        //                     color: '#000',
        //                     width: 1,
        //                     type: 'solid',
        //                 }
        //             }
        //         },
        //         yAxis: {
        //             type: 'category',
        //             boundaryGap: 0,
        //             data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        //             axisLabel: {
        //                 show: true,
        //             },
        //             axisTick: {
        //                 show: false
        //             },
        //             axisLine: {
        //                 show: true,
        //                 lineStyle: {
        //                     color: '#000',
        //                     width: 1,
        //                     type: 'solid',
        //                 }
        //             },
        //             splitLine: {
        //                 show: true,
        //                 lineStyle: {
        //                     color: '#000',
        //                     width: 1,
        //                     type: 'solid',
        //                 }
        //             }
        //         },
        //         series: [
        //             {
        //                 type: 'scatter',
        //                 data: nodes
        //             }
        //         ]
        //     }
        //     chart.setOption(option)
        // }
    })   //onclick
    //取消事件
    $("#cancel").click(function () {
        numInput.value = ''
        spreadSelect.value = '请选择通信节点空间分布'
        protoSelect.value = '请选择无线通信协议'
    })
}

/*
*   生成范围内的随机整数
* */
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

/*
*   生成给定范围的任意值去重数组
* */
function removeDuplicate(src, num, min, max) {
    do {
        src.push([randomRange(min, max), randomRange(min, max)])
        var srcSet = new Set(src)
    } while (srcSet.size < num)
    src = Array.from(srcSet)
    return src
    // src.sort((a, b) => {
    //     return a - b
    // })
    // console.log(src)
}

/*
*   清除某容器中内容
* */
function clearContent(id) {
    if (id != null) {
        id.innerHTML = ''
    }
}
