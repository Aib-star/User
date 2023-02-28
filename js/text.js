function test() {
    let pwrIn = document.getElementsByClassName("pwrIn")[0]
    let powerDiv = document.getElementsByClassName("power")[0]

    //初始化功率指针
    createPointerSvg(powerDiv, -60)
    pwrIn.onchange = function () {
        let powerValue = parseInt(pwrIn.value)
        if (powerValue < -60 || powerValue > 80) {
            alert("输入功率值超出范围")
            return
        }
        createPointerSvg(powerDiv, powerValue)
    }
    //初始化频谱图（div中）
    let freView = document.getElementsByClassName("freView")[0]
    createSpectrum(freView,10,50,20,'正弦波')
    //绑定输入内容变化的事件函数，实现根据输入数据显示对用的频谱图
    changeOnclick(freMinIns, '频率最小', 100, 10000, freDivs)
    changeOnclick(freMaxIns, '频率最大', 100, 10000, freDivs)
    //绑定功率输入框内容变化的事件函数，实现根据输入数据改变指针幅度和频谱图
    changeOnclick(pwrIns, '功率', -60, 80, powerDivs)
}

