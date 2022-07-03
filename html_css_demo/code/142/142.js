function init(t){
    t/=4000; //速度，数值越大速度越慢
    let c=document.getElementById('canvas'),
        cc=c.getContext('2d'),
        w=c.width=window.innerWidth, //窗口宽度
        h=c.height=window.innerHeight, //窗口高度
        increment=20; //增量
    // 在给定矩形内清空一个矩形
    cc.clearRect(0,0,w,h);
    // 指定在图形重叠的地方，颜色由两种颜色值的相加值来决定
    cc.globalCompositeOperation='lighter';
    for(let n=0;n<3;n++){
        // 设置3种填充颜色
        if(n==0){
            cc.fillStyle='#f00';
        }
        if(n==1){
            cc.fillStyle='#0f0';
        }
        if(n==2){
            cc.fillStyle='#00f';
        }

        for(let i=0;i<h;i+=increment){
            for(let j=0;j<w/2;j+=increment){
                // 来了来了，重点来了
                // 以下的计算我是真的不懂，本人资深数学学渣
                // 这个例子是我在CSDN发现的，觉得很酷炫、很有科技感就拿来和大家分享，足足花了我50积分啊！所以，有能解释这些计算的数学课代表，来评论区解释以下，不胜感激！！
                let index=i*w+j;
                // 设置透明度
                cc.globalAlpha=Math.tan(index*index-t);
                // 填充矩形
                cc.fillRect(
                    Math.tan(i*j-Math.sin(index+n/100)+t)*j+w/2-increment/2,
                    i,
                    Math.tan(index+i/j+t+n/100)/2*increment/2,
                    Math.tan(index*index-t)*increment/2
                );
            }
        }
    }
    // 实现无限循环动画
    // 关于requestAnimationFrame，给大家找了一篇通俗易懂的解释，有兴趣的同学可以看一下：https://www.jianshu.com/p/fa5512dfb4f5
    requestAnimationFrame(init);
}

// 初始化
init();