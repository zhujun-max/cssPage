const fly=document.getElementById('fly'); //飞机
let skyX=0,
    skyY=0,
    c,
    timer;

// 绑定鼠标移动事件
document.addEventListener('mousemove',function(e){
    let contentX=fly.offsetLeft+fly.offsetWidth/2,
        contentY=fly.offsetTop+fly.offsetHeight/2,
        dX=e.clientX-contentX,
        dY=e.clientY-contentY;
    c=Math.atan2(dX,dY); //取值
    c=180*c/Math.PI; //转换角度
    c=c*-1;

    // 飞机运动
    function to(){
        clearTimeout(timer);
        fly.style.transform='rotate('+c+'deg)';
        // 判断飞行方向
        if(c>-15 && c<15){
            // 向下飞
            skyY-=5;
            document.body.style.backgroundPositionY=skyY+'px';
        }
        if(c>15 && c<75){
            // 向左下角飞
            skyX+=4;
            skyY-=4;
            document.body.style.backgroundPositionX=skyX+'px';
            document.body.style.backgroundPositionY=skyY+'px';
        }
        if(c>75 && c<105){
            // 向左飞
            skyX+=5;
            document.body.style.backgroundPositionX=skyX+'px';
        }
        if(c>105 && c<165){
            // 向左上角飞
            skyX+=4;
            skyY+=4;
            document.body.style.backgroundPositionX=skyX+'px';
            document.body.style.backgroundPositionY=skyY+'px';
        }
        if(c>165 || c<-165){
            // 向上飞
            skyY+=5;
            document.body.style.backgroundPositionY=skyY+'px';
        }
        if(c>-75 && c<-15){
            // 向左下角飞
            skyX-=4;
            skyY-=4;
            document.body.style.backgroundPositionX=skyX+'px';
            document.body.style.backgroundPositionY=skyY+'px';
        }
        if(c>-105 && c<-75){
            // 向右飞
            skyX-=5;
            document.body.style.backgroundPositionX=skyX+'px';
        }
        if(c>-165 && c<-105){
            // 向右上角飞
            skyX-=4;
            skyY+=4;
            document.body.style.backgroundPositionX=skyX+'px';
            document.body.style.backgroundPositionY=skyY+'px';
        }
        timer=setTimeout(to,10);
    }

    to();
})