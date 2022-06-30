//canvas容器
var can;
var ctx;

//实例化img对象
var img = new Image();
img.src = 'image/star.png';

//定义星星类
var stars = [];
var num = 299;

window.onload = function () {
    //获得canvas容器
    can = document.getElementById('canvas');
    ctx = can.getContext('2d');
    
    for (var i = 0; i < num; i++) {
        stars[i] = new star();
        stars[i].init();
    };
    updateCanvas();
}

//设置定时器，刷新画布
function updateCanvas() {
	var t = setTimeout("updateCanvas()",100);
	ctx.fillStyle = "#000";
    ctx.fillRect(0,0,1000,600);
	for (var i = 0; i < num; i++) {
        stars[i].draw();
        stars[i].update();
    };
}