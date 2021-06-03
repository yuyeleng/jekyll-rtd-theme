$(function(){
    var itemH3 = $(".menu-uls>.toc").children('.itemHide').find('h3').text()
    console.log(itemH3)

    var locaHref = location.href
    var locaOrigin = location.origin
    var pageUrl = locaHref.replace(locaOrigin, '')
    $(".header-box>.nav-box>.nav-item>a[href="+ pageUrl +"]").parents('.nav-item').addClass('active').siblings().removeClass('active')
    //头部导航栏切换
    $(".nav-box>.nav-item>a").click(function(){
        $(this).parent('.nav-item').addClass('active').siblings().removeClass('active')
    })

})