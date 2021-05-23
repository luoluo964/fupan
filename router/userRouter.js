const express= require("express")
//获取路由的实例
const router=express.Router()

var sqltool = require('../tools/mysql-excute.js');

var verifyLogin=function(username,password,succ,fail,err){
    sqltool.queryAll("admin",(results)=>{
        for(var i=0;i<results.length;i++){
            if(results[i]['username']==username&&results[i]['password']==password){
                succ();
                return null;
            }
        }
        fail();
    },()=>{
        err();
    });
}

router.post('/login',(req,res)=>{
    var us=req.body['username'];
    var ps=req.body['password'];
    verifyLogin(us,ps,()=>{
        res.redirect("../idea/main");
    },()=>{
        res.redirect("../index.html");
    },()=>{
        res.redirect("../error.html");
    });
});

//对外打包
module.exports=router








