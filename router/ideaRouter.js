const express= require("express")
//获取路由的实例
const router=express.Router()

var sqltool = require('../tools/mysql-excute.js');

router.get('/main',(req,res)=>{
    var idealist=[],idlist=[];
    sqltool.queryAll("idea",(results)=>{
        for(var i=0;i<results.length;i++){
            idlist.push(results[i]['id']);          
            idealist.push(results[i]['summary']);    
        }
        res.render('idea', {title:"复盘空间",idList:idlist,ideaList:idealist});
    },()=>{
        res.redirect("../error.html");
    })
});

router.post('/add',(req,res)=>{
    sqltool.addIdea(req.body['newidea'],req.body['newdetail'],()=>{
        res.redirect("main");
    },()=>{
        res.redirect("../error.html"); 
    });
});
router.get('/del',(req,res)=>{
    sqltool.delById(req.query['id'],()=>{
        res.redirect("main");
    },()=>{
        res.redirect("../error.html"); 
    });
});

router.get('/detail',(req,res)=>{
    sqltool.queryById("idea",req.query['id'],(results)=>{
        res.render('detail', {title:"复盘空间",idea:results[0]['summary'],detailContent:results[0]['detail']});
    },()=>{
        res.redirect("../error.html");
    })
});

//对外打包
module.exports=router








