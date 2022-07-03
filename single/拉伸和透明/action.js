window.onload = function () {
	var aLi = document.getElementsByTagName('li');
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].opa = 30;
		aLi[i].timer = null;
		aLi[i].onmouseover = function () {
			startMove(this,400);
		}
		aLi[i].onmouseout = function () {
			startMove(this,200);
		}
	};	
}

//移动的方法
function startMove (obj,target) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var speed = (target-obj.offsetWidth)/8;
		speed = speed >0?Math.ceil(speed):Math.floor(speed);
		if (obj.offsetLeft == target) {
			clearInterval(timer);
		}else{
			obj.opa = obj.opa + speed;
			obj.style.width = obj.offsetWidth + speed + 'px';
			obj.style.opacity = obj.opa/100;	
		};
	},30);
}