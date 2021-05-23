window.onload=function(){
   
    var delBtnList = document.getElementsByClassName("delBtn");
    for(var i=0;i<delBtnList.length;i++){
        delBtnList[i].onclick=function(){
            if(confirm("确定删除吗？"))
                window.open("del?id="+this.name,"_self");
        }
    }		
}