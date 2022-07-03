// 要操作的元素
const circle=document.querySelector('.circle');
const text=circle.innerText;
// 先清空原有文本
circle.innerText='';

for(let i=0;i<text.length;i++){
    // 循环文本，取出单字
    let letter=text[i];
    // 创建span元素，并把单字赋给span
    let span=document.createElement('span');
    span.innerText=letter;
    // 计算每一个字的旋转角度
    let r=(360/text.length)*i;
    // 设置span的旋转角度
    span.style.transform='rotate('+r+'deg)';
    // 追加span
    circle.appendChild(span);
}