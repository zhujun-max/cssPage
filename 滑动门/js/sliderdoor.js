window.onload = function () {
	// 获得容器对象
	var box = document.getElementById('container');

	//获得图片对象集合
	var img = box.getElementsByTagName('img');

	//获得单张图片的宽度
	var imgWidth = img[0].offsetWidth;

	//设置掩体门露出的宽度
	var exposeWidth = 200;

	//设置容器的总宽度
	var boxWidth = imgWidth + (img.length-1)*exposeWidth;
	box.style.width = boxWidth + 'px';

	//每扇门移动的距离
	var translate = 0;

	//设置门的初始位置
	function setInitSet() {
		translate = imgWidth - exposeWidth;
		for (var i = 1; i < img.length; i++) {
			img[i].style.left = imgWidth + exposeWidth*(i-1) + 'px';
		};
	}
	setInitSet();

	//响应事件
	for (var i = 0; i < img.length; i++) {
		//自动执行的方法
		(function (i) {
			img[i].onmouseover = function () {
				setInitSet();
					for (var j = 1; j <= i; j++) {
						img[j].style.left = img[j].offsetLeft - translate + 'px';
					};
			}
		})(i);
	};
}