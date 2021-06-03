$(function(){
    var itemH3 = $(".menu-uls>.toc").children('.itemHide').find('h3').text()
    console.log(itemH3)

    var locaHref = location.href
    var locaOrigin = location.origin
    var pageUrl = locaHref.replace(locaOrigin, '')
    $(".header-box>.nav-box>.nav-item>a[href='"+ pageUrl +"']").parents('.nav-item').addClass('active').siblings().removeClass('active')
    //头部导航栏切换
    $(".nav-box>.nav-item>a").click(function(){
        $(this).parent('.nav-item').addClass('active').siblings().removeClass('active')
    })


    //设置语言
    var lang = pageUrl.split('/')[1]
    var langStr = '中文'
    var newLang = 'zh'
    if(lang === 'zh'){
        langStr = 'English'
        newLang = 'en'
    }
    $(".lang-box>.lang").text(langStr)
    $(".lang-box>.lang").click(function(){
        windwow.location.href = locaHref.replace(lang, newLang)
    })
    //隐藏非当前语言下的导航栏和目录
    $(".header-box>.nav-box>.nav-item."+ lang +"").show().siblings().hide()
    $(".menu-box>.menu-uls."+ lang +"").show().siblings().hide()
})