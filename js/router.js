const express = require('express')
const router = express.Router()
// 挂载路由
// get接口
router.get('/get', (req, res) => {
    const query = req.query
    res.send({
        status: 0,
        msg: 'GET成功',
        data: query
    })
})
// post接口
router.post('/post', async (req, res) => {
    const body = req.body
    console.log(body)
    //根据用户提交的数据进行数据库操作，拿到gif的存储路径
    let gifSrc = await getGifSrc(body.nodeSum, body.nodeDist, body.protocol)
    //把找到的路径发送给浏览器
    res.send({
        status: 0,
        msg: 'POST成功',
        data: gifSrc
    })
})
module.exports = router

//数据库操作
function getGifSrc(nodeSum, nodeDist, protocol) {
    return new Promise((resolve, reject) => {
        const mysql = require('mysql');
        //创建连接池对象
        const pool = mysql.createPool({
            connectionLimit: 10,
            host: "localhost",
            user: "root",
            password: "123456",
            port: 3306,
            database: "gui",
        });

        //执行SQL语句
        function query(sql, para, callback) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.log("连接失败");
                    pool.releaseConnection();
                }
                console.log("数据库已连接")
                connection.query(sql, para, function (err, res, fields) {
                    if (err) {
                        connection.release();
                        console.log("执行sql语句失败" + err.message);
                        return;
                    }
                    callback(res, fields);
                    connection.release();
                    console.log("释放连接");
                })
            })
        }

        let sql = `select src
                   from transform
                   where NodeSum = ?
                     and NodeDist = ?
                     and Protocol = ?`;
        let para = [nodeSum, nodeDist, protocol]; //可以往sql语句的占位符传值，按数组顺序给值
        query(sql, para, function (res) {
            if (res.length !== 0) {
                console.log(res[0].src)
                resolve(res[0].src)
            }else {
                resolve('not found')
            }
        });
    })
}