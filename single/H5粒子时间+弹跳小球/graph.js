//定义小球栈
var balls = [];
//存取颜色数组
var colors = ['#00FF00','#006EFF','#E66EFF','#FF6E00','#FFFF00','#C8F4FA','#9664FA','#FEC783'];
//需要展示的时间
var curShowTime = 0;
//定义画布的长和宽
var WIDTH = 1200,HEIGHT = 700;
//定义小球半径
var RADIUS = 10;
//定义摩擦系数和重力加速度
var Ff = 0.75,Gg = 2;
//设置定时器
var Timer;

window.onload = function () {
	var canvas = document.getElementById("container");
	var context = canvas.getContext("2d");
    var button = document.getElementById('button');
    curShowTime = getCurShowTime();
    button.onclick = function () {
        if(button.innerHTML == '暂停') {
            clearInterval(Timer);
            button.innerHTML = '开始';
        } else if(button.innerHTML == '开始') {
            Timer = setInterval(function () {
                drawTime(context);
                // console.log(balls.length);
                update();
            },50);
            button.innerHTML = '暂停';
        }
    }   
}

//获取当前要展示的时间
function getCurShowTime() {
    var dt = new Date();    
    var time = [dt.getHours(),dt.getMinutes(),dt.getSeconds()];
    for (var i = 0; i < time.length; i++) {
        if(time[i] < 10) {
            time[i] = '0' + time[i];
        }
        time[i] = "" + time[i];
    }
    return time;
}

//添加时间绘制属性
function drawTime(ctx) {

    var nextShowTime = getCurShowTime();

    var nextHours = parseInt(nextShowTime[0]);
    var nextMinutes = parseInt(nextShowTime[1]);
    var nextSeconds = parseInt(nextShowTime[2]);

    var curHours = parseInt(curShowTime[0]);
    var curMinutes = parseInt(curShowTime[1]);
    var curSeconds = parseInt(curShowTime[2]);

    if (curSeconds != nextSeconds) {
        curShowTime = nextShowTime;
        if (parseInt(curHours/10) != parseInt(nextHours/10)) {
            addball(30,60,parseInt(nextHours/10));
        }
        if (parseInt(curHours%10) != parseInt(nextHours%10)) {
            addball(30 + 15*RADIUS,60,parseInt(nextHours%10));
        }
        if (parseInt(curMinutes/10) != parseInt(nextMinutes/10)) {
            addball(30 + 39*RADIUS,60,parseInt(nextMinutes/10));
        }
        if (parseInt(curMinutes%10) != parseInt(nextMinutes%10)) {
            addball(30 + 54*RADIUS,60,parseInt(nextMinutes%10));
        }
        if (parseInt(curSeconds/10) != parseInt(nextSeconds/10)) {
            addball(30 + 78*RADIUS,60,parseInt(nextSeconds/10));
        }
        if (parseInt(curSeconds%10) != parseInt(nextSeconds%10)) {
            addball(30 + 93*RADIUS,60,parseInt(nextSeconds%10));
        }
    }
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    draw( 30 , 60 , parseInt(curHours/10) , ctx )
    draw( 30 + 15*RADIUS , 60 , parseInt(curHours%10) , ctx )
    draw( 30 + 30*RADIUS , 60 , 10 , ctx )
    draw( 30 + 39*RADIUS , 60 , parseInt(curMinutes/10) , ctx);
    draw( 30 + 54*RADIUS , 60 , parseInt(curMinutes%10) , ctx);
    draw( 30 + 69*RADIUS , 60 , 10 , ctx);
    draw( 30 + 78*RADIUS , 60 , parseInt(curSeconds/10) , ctx);
    draw( 30 + 93*RADIUS , 60 , parseInt(curSeconds%10) , ctx);
}

function draw( x , y , num , ctx ){
    ctx.fillStyle = "#FF0000";
    for( var i = 0 ; i < numbers[num].length ; i ++ ) {
        for(var j = 0 ; j < numbers[num][i].length ; j ++ ) {
            if( numbers[num][i][j] == 1 ){
                ctx.beginPath();
                ctx.arc( x+j*2*RADIUS+10 , y+i*2*RADIUS+10, 10 , 0 , 2*Math.PI )
                ctx.closePath()

                ctx.fill()
            }
        }
    }
    for (var i in balls) {
        ctx.beginPath();
        ctx.fillStyle = balls[i].color;
        ctx.arc(balls[i].x,balls[i].y,balls[i].r,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fill();
    }
}

//添加小球
function addball (x,y,num) {
    // console.log(num);
    for (var i = 0; i < numbers[num].length; i++) {
        for (var j = 0; j < numbers[num][i].length; j++) {
            if (numbers[num][i][j] == 1) {
                var ball = {
                    x:x+j*2*RADIUS+10,
                    y:y+i*2*RADIUS+10,
                    r:RADIUS,
                    vx:-Math.floor(Math.random()*8)+1,
                    vy:Math.floor(Math.random()*10)+1,
                    g:Gg,
                    f:Ff,
                    color:colors[Math.floor(Math.random()*8)]
                }
                balls.push(ball);
            }
        }    
    }
}

//更新数据
function update () {
    for(var i in balls) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if(balls[i].y >= 685) {
            balls[i].vy = - balls[i].vy*balls[i].f;
        }
        // console.log(balls[i].x);
        if (balls[i].x <= 0 || balls[i].x >= WIDTH) {
            balls.splice(i,1);
        }
    }
}


//存取数据数组
var numbers = [
    [
        [0,0,1,1,1,0,0],
        [0,1,1,0,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,0,1,1,0],
        [0,0,1,1,1,0,0]
    ],//0
    [
        [0,0,0,1,1,0,0],
        [0,1,1,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [1,1,1,1,1,1,1]
    ],//1
    [
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,0,1,1,0,0,0],
        [0,1,1,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1]
    ],//2
    [
        [1,1,1,1,1,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,0,0,1,1,0],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//3
    [
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,1,0],
        [0,0,1,1,1,1,0],
        [0,1,1,0,1,1,0],
        [1,1,0,0,1,1,0],
        [1,1,1,1,1,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,0,1,1,0],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,1,1]
    ],//4
    [
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,1,1,1,1,0],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//5
    [
        [0,0,0,1,1,1,0],
        [0,0,1,1,0,0,0],
        [0,1,1,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//6
    [
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,1,1,0,0,0],
        [0,0,1,1,0,0,0],
        [0,0,1,1,0,0,0],
        [0,0,1,1,0,0,0]
    ],//7
    [
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//8
    [
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,1,1,0,0,0,0]
    ],//9
    [
        [0,0,0,0],
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0],
        [0,0,0,0]
    ]//:
];