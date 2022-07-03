// 获取要操作的元素
let hover_text=document.querySelector('.hover-text');
let hover_img=document.querySelector('.hover-img');
// 显示内容
function showHoverCon(e){
    // 获取鼠标的坐标
    let x=e.clientX;
    let y=e.clientY;
    // 将坐标赋给图片
    hover_img.style.transform=`translate(${x}px,${y}px)`;
    // 将坐标分别赋值给自定义属性--x、--y
    hover_text.style.setProperty('--x',x+'px');
    hover_text.style.setProperty('--y',y+'px');
}
// 绑定鼠标移动事件
document.addEventListener('mousemove',showHoverCon);
// 至此完成