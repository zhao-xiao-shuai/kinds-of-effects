
 var defaultselectbox = $('#cusSelectbox');
 var numOfOptions = $('#cusSelectbox').children('option').length;
 
/**
 * 打开列表
 */
function openList() {
    for(var i=0; i< numOfOptions; i++) {
        $('.options').children('li').eq(i).attr('tabindex', i)
        .css('transform', 'translateY('+(i*100+100)+'%)')
        .css('transition-delay', i*30+'ms');
    }
}

/**
 * 关闭列表
 */
function closeList() {
    for(var i=0; i< numOfOptions; i++) {
        $('.options').children('li').eq(i)
        .css('transform', 'translateY('+i*0+'px)')
        .css('transition-delay', i*0+'ms');
    }
}

/**
 * 下拉的点击事件
 */
$('.select-label').click(function () {
    
    //切换激活状态:这个active没有任何的效果
    $(this).toggleClass('active');

    //切换后如果是激活状态
    if( $(this).hasClass('active') ) {
        //打开列表
        openList();
    //切换后如果不是激活状态
    } else {
        closeList();
    }
});

/**
 * 选项的点击事件
 */
$(".options li").on('keypress click', function(e) {

    //阻止默认行为
    e.preventDefault();

    //移除所有选项的类名
    $('.options li').siblings().removeClass();

    //关闭列表
    closeList();

    //移除展示值的激活状态
    $('.select-label').removeClass('active');

    //修改展示值的文本
    $('.select-label span').text($(this).text());

    //设置select的值
    defaultselectbox.val($(this).text());

});