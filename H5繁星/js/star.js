//创建star对象
var star = function() {
	//位置
	this.x;
	this.y;
	//帧序号
	this.picNum;
	//移动速度
	this.xSpd;
	this.ySpd;
};

//star对象的初始化方法
star.prototype.init = function() {
	this.x = Math.random()*1000;
	this.y = Math.random()*600;
	this.picNum = (Math.random()*6)%6;
	this.xSpd = Math.random()*6-3;
	this.ySpd = Math.random()*6-3;
};

//绘制星星的方法
star.prototype.draw = function() {
	ctx.drawImage(img,this.picNum*7,0,7,7,this.x,this.y,7,7);
};

//变帧方法
star.prototype.update = function(first_argument) {
	this.x += this.xSpd*0.1;
	this.y += this.ySpd*0.1;
	if (this.x < 0 || this.x > 1000 || this.y < 0 || this.y > 600) {
		this.init();
		return;
	};
	this.picNum += 1;
	if (this.picNum >= 7) {
		this.picNum = 0;
	};
};