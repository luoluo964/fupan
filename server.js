const express= require("express")
const bodyparser=require("body-parser")
const path=require('path')

//把express做一个实例化
const app=express()

let userRouter=require('./router/userRouter.js')
let ideaRouter=require('./router/ideaRouter.js')

app.use(bodyparser.urlencoded({extends:false}))

// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.use('/user',userRouter)
app.use('/idea',ideaRouter)

app.use('/',express.static(path.join(__dirname,'./static')))

//通过express，开启了一个node的服务器（监听在3000端口）
app.listen(3000,()=>{ console.log('server start') }) 

