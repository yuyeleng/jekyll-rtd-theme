$(function(){
    var itemH3 = $(".menu-uls>.toc").children('.itemHide').find('h3').text()
    console.log(itemH3)

    var locaHref = location.href
    // var locaOrigin = location.origin
    var pageUrl = location.pathname
    var lang = ""
    
    console.log(pageUrl)
    if(pageUrl === '/' || !pageUrl){
        
        lang = 'zh'
        pageUrl = $(".header-box>.nav-box>.nav-item."+ lang +">a").attr('href')
        console.log(pageUrl.substring(1,pageUrl.length))
        window.location.href = locaHref + pageUrl.substring(1,pageUrl.length)
    }else{
        lang = pageUrl.split('/')[1]
    }
    console.log(lang)
    $(".menu-box .menu-uls>li>a[href='"+ pageUrl +"']").addClass('current').parents('li').addClass('current')
    //头部导航栏切换
    $(".nav-box>.nav-item>a").click(function(){
        $(this).parent('.nav-item').addClass('active').siblings().removeClass('active')
    })

    //模块路径
    var modulePath = pageUrl.split('/')[2]
    console.log(modulePath)
    $(".menu-box .menu-uls:not(."+ modulePath +")").remove()
    $(".header-box>.nav-box>.nav-item[data-menu='"+ modulePath +"']").addClass('active')


    //设置语言
    
    var langStr = '中文'
    var newLang = 'zh'
    if(lang === 'zh'){
        langStr = 'English'
        newLang = 'en'
    }
    $(".lang-box>.lang").text(langStr)
    $(".lang-box>.lang").click(function(){
        window.location.href = locaHref.replace(lang, newLang)
    })
    //隐藏非当前语言下的导航栏和目录
    $(".header-box>.nav-box>.nav-item:not(."+ lang +")").remove()
    $(".menu-box .menu-uls:not(."+ lang +")").remove()//在同一页面下只显示同一模块下的菜单


    $(".itemHide>h3").each(function(){
        // console.info($(this).text());
        var newA = `<li class="child-li"><a class="child-a" href="#${$(this).text()}">${$(this).text()}</a></li>`
        $(this).parent('.itemHide').siblings('.child-ul').append(newA)
    });
    $(".itemHide").remove()
    $(".menu-box .child-ul").on('click', '.child-a', function(){
        $(this).parents('li.toc').children('a').removeClass('current')
        $(this).addClass('active').parents('.child-li').siblings().find(".child-a").removeClass('active')
    })

    //实现滚动条下滑左侧菜单高亮
	$(".content-box").scroll(function(){
		$('.markdown-box h3').each(function(){
            if($(this).offset().top < 230){
                $(".menu-box .child-ul .child-a[href='#"+ $(this).attr('id') +"']").addClass('active')
                $(this).parents('li.toc').children('a').removeClass('current')
            }
        })
	})
})