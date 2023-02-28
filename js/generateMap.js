var maps = []

function getMapByJson(divId, src, mapName) {
    var map = echarts.init(document.getElementById(divId))
    $.get(src, (ret) => {
        //ret 地图数据
        // console.log(ret)
        echarts.registerMap(mapName, ret)
        var option = {
            geo: {
                type: 'map',
                map: mapName,
                roam: true
            },
            zoom: 3
        }
        map.setOption(option)
    })
    maps.push(map)
}

function getMapBySvg(divId, src, mapName) {
    var map = echarts.init(document.getElementById(divId))
    $.get(src, (svg) => {
        echarts.registerMap(mapName, {svg: svg})
        var option = {
            geo: {
                type: 'map',
                map: mapName,
                roam: true
            },
        }
        map.setOption(option)
    })
    maps.push(map)
}

function showMap() {
// 解决tab切换的时候echarts 不显示的问题
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        for (var i = 0; i < maps.length; i++) {
            maps[i].resize();
            console.log(maps)
        }
    })
}






// getMap('smallQu','Access-Control-Allow-Origin: https://echarts.apache.org/examples/https://echarts.apache.org/examples','small')
// $(" ul li").click(function() {
// 	$(this).addClass("active").siblings('li').removeClass("active");
// })


