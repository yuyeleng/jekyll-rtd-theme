$(function(){
    var itemH3 = $(".menu-uls>.toc").children('.itemHide').find('h3').text()
    console.log(itemH3)

    //头部导航栏切换
    $(".nav-box>.nav-item").click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    })

})