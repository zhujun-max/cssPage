
//定义小球栈
var balls = [];
//存取颜色数组
var colors = ['#00FF00','#006EFF','#E66EFF','#FF6E00','#FFFF00','#C8F4FA','#9664FA','#FEC783'];
//创建定时器t1、t2
var t1,t2;
//设定事件参数为600s，防止定时器无限执行
var time = 0;

window.onload = function () {
	var canvas = document.getElementById('container');
	var context = canvas.getContext('2d');
	var button = document.getElementById('button');
	button.onclick = function () {
		if(button.innerHTML == '暂停') {
			pause(button);
		} else if(button.innerHTML == '开始') {
			t1 = setInterval(function () {
				if (time > 600) {
					pause(button);
					return;
				}
				time++;
				// console.log(time);
				addball();
			},1000);
			t2 = setInterval(function () {
				draw(context);
				update();
			},50);
			button.innerHTML = '暂停';
		}
	}
}

//暂停事件
function pause(button) {
	clearInterval(t1);
	clearInterval(t2);
	time = 0;
	button.innerHTML = '开始';
}

//更新数据
function update () {
	for(var i in balls) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if(balls[i].y >= 670) {
			balls[i].vy = - balls[i].vy*balls[i].f;
		}
	}
}

//绘制小球
function draw (ctx) {
	// var num = Math.floor(Math.random()*8);
	ctx.clearRect(0,0,1200,700);
	for (var i in balls) {
		ctx.beginPath();
		ctx.fillStyle = balls[i].color;
		ctx.arc(balls[i].x,balls[i].y,balls[i].r,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}
}

//添加小球
function addball () {
	var ball = {
		x:0,
		y:100,
		r:15,
		vx:Math.floor(Math.random()*8)+1,
		vy:Math.floor(Math.random()*10)+1,
		g:2,
		f:0.75,
		color:colors[Math.floor(Math.random()*8)]
	}
	balls.push(ball);
}


