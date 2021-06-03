$(function(){
    var itemH3 = $(".menu-uls>.toc").children('.itemHide').find('h3').text()
    console.log(itemH3)

    var locaHref = location.href
    var locaOrigin = location.origin
    var pageUrl = locaHref.replace(locaOrigin, '')
    console.log(pageUrl)
    
    $(".menu-box .menu-uls>li>a[href='"+ pageUrl +"']").addClass('current').parents('li').addClass('current').siblings().removeClass('active').find('a').removeClass('current')
    //头部导航栏切换
    $(".nav-box>.nav-item>a").click(function(){
        $(this).parent('.nav-item').addClass('active').siblings().removeClass('active')
    })

    //模块路径
    var modulePath = pageUrl.split('/')[2]
    console.log(modulePath)
    $(".menu-box .menu-uls:not(."+ modulePath +")").hide()
    $(".header-box>.nav-box>.nav-item[data-menu='"+ modulePath +"']").addClass('active').siblings().removeClass('active')


    //设置语言
    var lang = pageUrl.split('/')[1]
    
    var langStr = '中文'
    var newLang = 'zh'
    if(lang === 'zh'){
        langStr = 'English'
        newLang = 'en'
    }else{
        lang = 'zh'
    }
    $(".lang-box>.lang").text(langStr)
    $(".lang-box>.lang").click(function(){
        window.location.href = locaHref.replace(lang, newLang)
    })
    //隐藏非当前语言下的导航栏和目录
    $(".header-box>.nav-box>.nav-item:not(."+ lang +")").remove()
    $(".menu-box .menu-uls:not(."+ lang +")").remove()//在同一页面下只显示同一模块下的菜单
})