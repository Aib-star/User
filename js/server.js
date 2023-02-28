const express = require('express')
const app = express()
const path = require('path')
// 使用模块化挂载路由
const router = require('./router')
//处理跨域问题
const cors = require('cors')
app.use(cors())
//注册中间件，获取表单数据
app.use(express.urlencoded({extended:false}))
// 注册路由模块
app.use(router)
// 对外提供静态资源
app.use(express.static(path.join(__dirname,'..')))
//启动web服务器
app.listen(80, function() {
    console.log('server running at http://127.0.0.1')
})