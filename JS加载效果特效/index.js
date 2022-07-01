window.onload = function () {
	// stop();
}

//创建滑动条对象
var slide = document.getElementById('wrap_in');
var timer = null;
var end = document.getElementById('wrap').offsetWidth;

//自动执行的方法
(function () {
	init();	
	start();
	// stop();
})();

function init () {
	slide.style.width = "0px";
	slide.speed = 10;
}

function start () {
	if (slide.offsetWidth >= end) {
		return;
	};
	slide.style.width = slide.offsetWidth + slide.speed + 'px';
	timer = setTimeout("start()",10);
}

function stop () {
	clearTimeout(timer);
}
