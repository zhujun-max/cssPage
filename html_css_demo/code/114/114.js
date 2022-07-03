// 获取所有.item元素
let items=document.querySelectorAll('.item');
// 获取选中项的背景圆
let active_circle=document.querySelector('.active-circle');

// 设置当前选中项样式的方法
// 参数：_t 当前点击的对象，bg_color 颜色值（用于设置body的背景颜色）
function setActive(_t,bg_color){
    // 遍历所有.item元素，移除active样式
    items.forEach((item)=>{
        item.classList.remove('active');
    })
    // 为当前选中项添加active样式
    _t.classList.add('active');
    // 为背景圆添加jello样式
    active_circle.classList.add('jello');
    // 发现果冻效果只有第一次会，是因为我们没有移除jello
    // 我们这里设置0.5秒后移除，确保每一次点击都有Q弹的感觉
    setTimeout(() => {
        active_circle.classList.remove('jello');
    }, 500);
    // 设置自定义属性--bg-color的值
    document.documentElement.style.setProperty('--bg-color','var('+bg_color+')');
}