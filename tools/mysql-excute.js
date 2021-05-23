// 1. 导入 mysql 模块
const mysql = require('mysql')
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
    host: '马赛克', // 数据库的 IP 地址
    user: 'manpower', // 登录数据库的账号
    password: '马赛克', // 登录数据库的密码
    database: 'fupan', // 指定要操作哪个数据库
})

var sqltool = {
    //测试连接
    test: function(name){
        db.query('select 1', (err, results) => {
            // mysql 模块工作期间报错了
            if (err) return false;
                // 能够成功的执行 SQL 语句
            return true;
        })
    },
    //查询全部
    queryAll: function(table,func,errfunc){
        const sqlStr='select * from '+table;
        db.query(sqlStr,(err,results)=>{
            if(err)
                errfunc();
            else
                func(results);
        })
    },
    //通过id查询
    queryById: function(table,id,func,errfunc){
        const sqlStr='select * from '+table+' where id='+id;
        db.query(sqlStr,(err,results)=>{
            if(err)
                errfunc();
            else
                func(results);
        })
    },
    //添加
    addIdea: function(newidea,newdetail,func,errfunc){
        const sql = "insert into idea(summary,detail) values(?,?)" //SQL语句
        const sqlParams = [newidea,newdetail] // 动态参数

        db.query(sql,sqlParams,(err,result)=>{
            if(err) {
                errfunc();
                return
            }
            func();
        })
    },
    //删除
    delById: function(id,func,errfunc){
        const sql = "delete from idea where id=?"
        const sqlParams = [id]

        db.query(sql,sqlParams,(err,result)=>{
            if(err) {
                errfunc();
                return
            }
            func();
        })
    }
}
//对外打包
module.exports=sqltool


