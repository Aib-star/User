//拿到目前所有辐射源的功率输入框
let pwrIns = document.getElementsByClassName("pwrIn")
//拿到目前所有辐射源的功率指针框
let powerDivs = document.getElementsByClassName("power")
//拿到目前所有辐射源的最小频率框
let freMinIns = document.getElementsByClassName("freMinIn")
//拿到目前所有辐射源的最大频率框
let freMaxIns = document.getElementsByClassName("freMaxIn")
//拿到目前所有辐射源的频谱图显示框
let freDivs = document.getElementsByClassName("freView")
//拿到目前所有辐射源的信号类型
let srcType = document.getElementsByClassName("selIn")
function createTable() {
    //记录当前表单数  测试初始为1
    let index = 1
    //辐射源序号
    let order = 1
    //拿到添加删除辐射源按钮对象
    const addSrc = document.getElementById("addSrc")
    const delSrc = document.getElementById("delSrc")
    //拿到表格的表身
    const tbody = document.getElementsByTagName("tbody")[0]
    //测试
    test()
    //绑定添加辐射源的点击函数
    addSrc.onclick = function () {
        //辐射源数目最多为4个
        if (index >= 4) {
            alert("辐射源的最大数量为4个！")
            return
        }
        //更新表数
        index++
        order++
        let tds = []
        //添加新一行
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        //添加新一组表（7列）
        for (let i = 0; i < 7; i++) {
            let td = document.createElement("td")
            tr.appendChild(td)
            tds.push(td)
        }
        //将内容添加到表格中
        tds[0].innerHTML = "<input class=\"srcCheck checkbox-inline\" type=\"checkbox\" checked=\"checked\"/>"
        tds[1].innerHTML = `<div class="srcName">辐射源${order}</div>`
        tds[2].innerHTML = "<input type=\"number\" class=\"freMinIn\">"
        tds[3].innerHTML = "<input type=\"number\" class=\"freMaxIn\">"
        tds[4].innerHTML = "<select id=\"\" class=\"selIn\">\n" +
            "                                <option>正弦波</option>\n" +
            "                                <option>三角波</option>\n" +
            "                                <option>方波</option>\n" +
            "                            </select>"
        tds[5].innerHTML = "<input  type=\"number\" class=\"pwrIn col-md-1 col-md-push-1\">\n" +
            "                            <div id=\"power1\" class=\"power col-md-1 col-md-push-2\"></div>"
        // tds[6].innerHTML = " <button class=\"viewPopover btn-sm btn-link\">查看</button>"
        tds[6].innerHTML = `<div class="freView"></div>`
        //为新添加的辐射源初始化功率指针框
        createPointerSvg(powerDivs[powerDivs.length - 1], -60)
        //为新添加的辐射源初始化频谱图
        createSpectrum(freDivs[freDivs.length - 1], 10, 50, 20, '正弦波')
        //绑定输入内容变化的事件函数，实现根据输入数据显示对用的频谱图
        changeOnclick(freMinIns, '频率最小', 100, 10000, freDivs)
        changeOnclick(freMaxIns, '频率最大', 100, 10000, freDivs)
        //绑定功率输入框内容变化的事件函数，实现根据输入数据改变指针幅度和频谱图
        changeOnclick(pwrIns, '功率', -60, 80, powerDivs)
    }//addSrc.onclick
    //绑定删除辐射源的点击函数
    delSrc.onclick = function () {
        //辐射源判空操作
        if (index <= 0) {
            alert("已经没有辐射源！")
            return
        }
        //删除所有选中的辐射源
        //记录删除辐射源的数
        let delNum = 0
        //1.获取所有的选中框
        let srcChecks = document.getElementsByClassName("srcCheck")
        //2.遍历选中框
        let checkArr = Array.from(srcChecks)
        checkArr.forEach(function (ele) {
            //3.如果选中，删除所在行
            if (ele.checked === true) {
                let trNode = ele.parentNode.parentNode
                tbody.removeChild(trNode)
                //取消功率输入框的事件函数
                trNode.lastElementChild.firstElementChild.onclick = false
                delNum++
            }
        })
        alert("已成功删除" + delNum + "个辐射源！")
        //更新表数
        index = index - delNum
    }
}

/*
* 绑定输入域变化的事件函数
* */
function changeOnclick(Ins, inName, minValue, maxValue, Divs) {
    for (let i = 0; i < Ins.length; i++) {
        Ins[i].onchange = function () {
            let inValue = parseInt(Ins[i].value)
            if (inValue < minValue || inValue > maxValue) {
                alert(`输入${inName}值超出范围`)
                return
            }
            if (inName === '功率') {
                createPointerSvg(Divs[i], inValue)
                createSpectrum(freDivs[i],parseInt(freMinIns[i].value),parseInt(freMaxIns[i].value),parseInt(pwrIns[i].value),'正弦波')
            }
            if (inName === '频率最小'){
                createSpectrum(Divs[i], inValue,parseInt(freMaxIns[i].value),parseInt(pwrIns[i].value),'正弦波')
            }
            if (inName === '频率最大'){
                createSpectrum(Divs[i],parseInt(freMinIns[i].value),inValue,parseInt(pwrIns[i].value),'正弦波')
            }
        }
    }
}
