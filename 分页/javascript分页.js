var obj,j;
var page=0;
var nowPage=0;//当前页数
var listNum=5;//每页显示的数目
var pagesLen;//总页数
var pageNum=4;//分页连接的个数
function onload () {
    obj=document.getElementById('onegood');
    j=obj.length;
    pagesLen=Math.ceil(j/listNum);
    upPage(0);
}
function upPage(p) {
    nowPage=p;
    for (var i = 0; i < j; i++) {
        obj[i].style.display="none";
    };
    for (var i = p*listNum; i < (p+1)*listNum; i++) {
        if (obj[i]) {
            obj[i].style.display="block";
        };
    };
    strS='<a href="" onclick="upPage(0)">首页</a>';
    var pageNum_2=pageNum%2==0?Math.ceil(pageNum/2)+1:Math.ceil(pageNum/2);
    var pageNum_3=pageNum%2==0?Math.ceil(pageNum/2):Math.ceil(pageNum/2)+1;
    var strC="",startPage,endPage;
    if (pageNum>=pagesLen) {
        startPage=0;
        endPage=pagesLen-1;
    }else if(nowPage<pageNum_2){
        startPage=0;
        endPage=pagesLen-1>pageNum?pageNum:pagesLen-1;
    }else{
        startPage=nowPage+pageNum_3>=pagesLen
        ?pagesLen-pageNum-1:nowPage-pageNum_2+1;
        var t=startPage+pageNum;
        endPage=t>pagesLen?pagesLen-1:t;
    };
    for (var i = startPage; i < endPage; i++) {
        if (i==nowPage) {
            strC+='<a href="" style="color:red;font-weight:700;"onclick="upPage('+i+')">'+(i+1)+'</a>'; 
        };
        else {
            strC+='<a href="" onclick="upPage('+i+')">'+(i+1)+'</a>';
        }
    };
    strE='<a href="javascrript:void(0)" onclick="upPage('+(pagesLen-1)+')">尾页</a>';
    strE2=nowPage+1+"/"+pagesLen+"页"+"共"+j+"条";
    document.getElementById('page').innerHTML=strS+" "+strC+strE+strE2;
}