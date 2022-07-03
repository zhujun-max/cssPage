// 是否激活滑动，默认不激活
let active=false;
// 中间层滑块
let scroller_middle=document.querySelector('.scroller-middle');
// 最顶层滑块
let scroller_top=document.querySelector('.scroller-top');

// 绑定中间层的鼠标按下事件
scroller_middle.addEventListener('mousedown',function(){
    // 中间层滑动被激活，并为中间层滑块添加scrolling样式
    active='middle';
    scroller_middle.classList.add('scrolling');
});
// 为body绑定鼠标松开事件
document.body.addEventListener('mouseup',function(){
    // 取消滑动，并移除中间层的scrolling样式
    active=false;
    scroller_middle.classList.remove('scrolling');
});
// 为body绑定鼠标移出事件
document.body.addEventListener('mouseleave',function(){
    // 取消滑动，并移除中间层的scrolling样式
    active=false;
    scroller_middle.classList.remove('scrolling');
});

// 绑定最顶层的鼠标按下事件
scroller_top.addEventListener('mousedown',function(){
    // 最顶层滑动被激活，并为最顶层滑块添加scrolling样式
    active='top';
    scroller_top.classList.add('scrolling');
});
// 为body绑定鼠标松开事件
document.body.addEventListener('mouseup',function(){
    // 取消滑动，并移除最顶层的scrolling样式
    active=false;
    scroller_top.classList.remove('scrolling');
});
// 为body绑定鼠标移出事件
document.body.addEventListener('mouseleave',function(){
    // 取消滑动，并移除最顶层的scrolling样式
    active=false;
    scroller_top.classList.remove('scrolling');
});

// 为body绑定鼠标移动事件
document.body.addEventListener('mousemove',function(e){
    // 判断激活状态，不激活则直接返回
    if(!active) return;
    // 否则
    // 获取鼠标在页面中的X坐标
    let x=e.pageX;
    // 计算要滑动到的位置
    x-=document.querySelector('.container').getBoundingClientRect().left;
    // 滑动到计算好的位置
    scrollIt(x);
});

// 滑动到指定位置
function scrollIt(x){
    // 计算滑动的距离
    let transform=Math.max(0,(Math.min(x,document.querySelector('.container').offsetWidth)));
    if(active==='middle'){
        // 滑动的是中间层
        // 根据计算好的距离，设置中间层的宽度
        document.querySelector('.middle').style.width=transform+'px';
        // 设置中间层滑块的水平位置
        scroller_middle.style.left=transform-25+'px';
        // 如果中间层滑块和最顶层滑块相交，根据中间层的滑动距离设置最顶层的滑动距离（一起滑动）
        if(scroller_top.getBoundingClientRect().left>scroller_middle.getBoundingClientRect().left-5){
            document.querySelector('.top').style.width=transform-5+'px';
            scroller_top.style.left=transform-30+'px';
        }
    }
    if(active==='top'){
        // 滑动的是最顶层
        // 根据计算好的距离，设置最顶层的宽度
        document.querySelector('.top').style.width=transform+'px';
        // 设置最顶层滑块的水平位置
        scroller_top.style.left=transform-25+'px';
        // 如果最顶层滑块和中间层滑块相交，根据最顶层的滑动距离设置中间层的滑动距离（一起滑动）
        if(scroller_top.getBoundingClientRect().left>scroller_middle.getBoundingClientRect().left-5){
            document.querySelector('.middle').style.width=transform+5+'px';
            scroller_middle.style.left=transform-20+'px';
        }
    }
}

// 初始化
active='middle';
scrollIt(510);
active='top';
scrollIt(255);
active=false;