// 图案选项点击事件
$(".option").on("click",function(){
    // 全部选项移除active样式
    $(".option").removeClass("active");
    // 为当前项添加active样式
    $(this).addClass("active");
    // 获取当前项下的图片地址
    let pattern=$(this).find("img").attr("src");
    if(!pattern){
        // 没有图案 覆盖层渐隐
        $(".shirt-overlay").fadeOut();
    }else{
        // 有图案 先把覆盖层隐藏
        $(".shirt-overlay").css("display","none");
        // 设置覆盖层图案
        $(".shirt-overlay-pattern").css("background-image","url("+pattern+")");
        // 覆盖层渐显
        $(".shirt-overlay").fadeIn();
    }
})