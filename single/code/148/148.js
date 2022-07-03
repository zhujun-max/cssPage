// 获取要操作的元素
let lis=document.querySelectorAll('li'),
    rbs=document.querySelectorAll('.rb'),
    line=document.querySelector('.line');

// 循环绑定li的点击事件，并设置选中态样式
lis.forEach((item,index)=>{
    item.addEventListener('click',function(){
        lis.forEach((item1)=>{
            item1.classList.remove('active');
        })
        rbs.forEach((item2)=>{
            item2.classList.remove('active');
        })
        lis[index].classList.add('active');
        rbs[index].classList.add('active');
        line.className='line line'+(index+1); //index是从0开始，所以这里要+1
    })
})