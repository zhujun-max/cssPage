// 要操作的元素
const links=document.querySelectorAll('.nav li a');

// 遍历a标签集合
links.forEach(link=>{
    // 将a标签的文本拆分为各个单字
    let letters=link.textContent.split('');
    // 将a标签文本清空
    link.textContent='';
    // 遍历单字集合
    letters.forEach((letter,i)=>{
        // 创建span元素
        let span=document.createElement('span');
        // 设置文本
        span.textContent=letter;
        // 设置自定义属性（data-text），css中可通过attr函数进行调用
        span.dataset.text=letter;
        // 计算动画延迟时间并设置
        span.style.transitionDelay=i/15+'s';
        // 追加span元素到a标签
        link.append(span);
    })
})