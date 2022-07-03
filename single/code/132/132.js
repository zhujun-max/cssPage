// 单个数字的垂直偏移量
let size = 86;
// 把所有的.column转为数组
let columns = Array.from(document.getElementsByClassName('column'));
// 样式名数组
let class_list = ['visible', 'near', 'far', 'far', 'distant', 'distant'];
// true=24小时制，false=12小时制
let is_24_hour_clock = true;

// 获取时分秒
function getClock() {
    let d = new Date();
    let hour = is_24_hour_clock ? d.getHours() : d.getHours() % 12 || 12;
    hour = hour < 10 ? '0' + hour : hour;
    let minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    let second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    return hour + '' + minute + '' + second;
}
// 获取对应的样式名
function getClass(n, i) {
    return class_list.find(function (_class, class_index) {
        return i - class_index === n || i + class_index === n;
    }) || '';
}
// 定时器，一秒执行一次
setInterval(() => {
    // 获取时间
    let c = getClock();
    // 遍历所有.column
    columns.forEach(function (ele, i) {
        // 获取时分秒的每一位数，并转为整型
        let n = parseInt(c[i]);
        // 计算偏移量
        let offset = -n * size;
        // 设置每一位数的位置
        ele.style.transform = 'translateY(calc(50vh + ' + offset + 'px - ' + (size / 2) + 'px))';
        // 接下来设置样式
        // 将.column的子元素（.num）转为数组，并遍历它
        Array.from(ele.children).forEach(function(ele2,i2){
            // 设置每一位数的样式（透明度改变）
            ele2.className='num '+getClass(n,i2);
        })
    })
}, 1000);