// 要操作的元素
const container=document.querySelector('.container');
const cursor=document.querySelector('.cursor');

// 为容器绑定鼠标移动事件
container.addEventListener('mousemove',function(e){
    // 获取container、cursor的大小及其相对于视口的位置
    let contRect=container.getBoundingClientRect();
    let cursRect=cursor.getBoundingClientRect();
    // 计算高清圆的位置（跟随鼠标）
    let cursX=e.clientX-contRect.left-cursRect.width/2;
    let cursY=e.clientY-contRect.top-cursRect.height/2;
    // 设置高清圆的位置
    cursor.style.left=`${cursX}px`;
    cursor.style.top=`${cursY}px`;
})