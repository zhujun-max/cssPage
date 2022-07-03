// 点击表头排序
function sortTable(idx){
    var otable=document.querySelector('table'), //获取表格
        obody=otable.tBodies[0], //表格正文tbody
        otr=obody.rows, //表格的行
        tarr=[]; //临时数组
    for(var i=1;i<otr.length;i++){
        // 把除了表头之外的每一行都赋值到临时数组
        tarr[i-1]=otr[i];
    }
    // sortCol属性时额外给table添加的属性，用于作顺反两种顺序排序时的判断，区分首次排序和后面的有序反转
    if(obody.sortCol==idx){
        // 反序
        tarr.reverse();
    }else{
        tarr.sort(function(tr1,tr2){
            var value1=tr1.cells[idx].innerHTML;
            var value2=tr2.cells[idx].innerHTML;
            if(!isNaN(value1)&&!isNaN(value2)){
                // 数字排序
                return value1-value2;
            }else{
                // 字符串排序
                return value1.localeCompare(value2);
            }
        })
    }
    // 创建虚拟的节点对象，节点对象包含所有属性和方法
    var fragment=document.createDocumentFragment();
    for(var i=0;i<tarr.length;i++){
        // 把排序号的数组追加到节点对象
        fragment.appendChild(tarr[i]);
    }
    // 把节点对象追加到tbody
    obody.appendChild(fragment);
    // 更新sortCol
    obody.sortCol=idx;
}

// 拖拽排序
function DragSort(){
    var otbox=document.querySelector('.table-box'), //表格容器
        otable=document.querySelector('table'), //表格
        obody=otable.tBodies[0], //表格正文
        oth=obody.getElementsByTagName('th'), //表头
        otd=obody.getElementsByTagName('td'), //单元格
        box=document.querySelector('.box'), //拖拽时的悬浮层
        arrn=[]; //用来记录每一个th的向左偏移量
    // 循环每一个单元格
    for(var i=0;i<otd.length;i++){
        // 绑定每个单元格的鼠标按下事件
        otd[i].onmousedown=function(e){
            var e=e||window.event, //事件对象
                target=e.target, //目标
                thW=target.offsetWidth, //目标的偏移宽度
                maxL=otbox.offsetWidth-thW, //计算最大的向左偏移量
                rows=otable.rows, //表格的行
                tboxL=otbox.offsetLeft, //表格容器的向左偏移量
                disX=target.offsetLeft, //目标的向左偏移量
                that=this, //把当前单元格对象（鼠标按下位置的对象）记录起来
                cdisX=e.clientX-tboxL-disX; //计算鼠标光标在悬浮层中的向左偏移量
            // 把当前单元格的同一列数据填充到悬浮层
            for(var i=0;i<rows.length;i++){
                var op=document.createElement('p');
                op.innerHTML=rows[i].cells[this.cellIndex].innerHTML;
                box.appendChild(op);
            }
            // 记录每一个th的向左偏移量
            for(var i=0;i<oth.length;i++){
                arrn.push(oth[i].offsetLeft);
            }
            // 显示悬浮层，并设置宽度、位置
            box.style.display='block';
            box.style.width=thW+'px';
            box.style.left=disX+'px';

            // 鼠标移动事件
            document.onmousemove=function(e){
                // 根据鼠标移动，实时设置悬浮层的位置
                box.style.top=0;
                box.style.left=e.clientX-tboxL-cdisX+'px';
                if(box.offsetLeft>maxL){
                    box.style.left=maxL+'px';
                }else if(box.offsetLeft<0){
                    box.style.left=0;
                }
                // 禁止文本被选中
                document.onselectstart=function(){return false;}
            }
            // 鼠标松开事件
            document.onmouseup=function(e){
                var ops=box.getElementsByTagName('p'),
                    oboxL=box.offsetLeft+cdisX;
                for(var i=0;i<arrn.length;i++){
                    if(arrn[i]<oboxL){
                        // 松开鼠标时的arrn下标（即拖拽结束时的位置）
                        var index=i;
                    }
                }
                for(var i=0;i<rows.length;i++){
                    // 交换数据
                    rows[i].cells[that.cellIndex].innerHTML='';
                    rows[i].cells[that.cellIndex].innerHTML=rows[i].cells[index].innerHTML;
                    rows[i].cells[index].innerHTML='';
                    rows[i].cells[index].innerHTML=ops[i].innerHTML;
                }
                // 重置
                box.innerHTML='';
                arrn=[];
                box.style.display='none';
                document.onmousemove=null;
                document.onmouseup=null;
                document.onselectstart=function(){return false;}
            }
        }
    }
}

// 初始化
DragSort();