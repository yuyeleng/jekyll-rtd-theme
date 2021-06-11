$(function(){
    var locaHref = location.href
    var pageUrl = location.pathname
    var jsSrc =(navigator.language || navigator.browserLanguage).toLowerCase();
    var lang = "en"
    console.log(jsSrc)
    if(jsSrc.indexOf('zh')>=0) {
        lang = 'zh'
    } else if(jsSrc.indexOf('en')>=0) {
        lang = 'en'
    }
    
    
    // console.log(pageUrl)
    if(pageUrl === '/' || !pageUrl){//设置默认值
        pageUrl = $(".header-box>.nav-box>.nav-item."+ lang +">a").attr('href')
        // console.log(pageUrl.substring(1,pageUrl.length))
        window.location.href = locaHref + pageUrl.substring(1,pageUrl.length)
    }else{
        // if(pageUrl.indexOf(lang) === -1){

        // }
        lang = pageUrl.split('/')[1]
    }
    
    // console.log(lang)
    $(".menu-box .menu-uls>li>a[href='"+ pageUrl +"']").addClass('current').parents('li').addClass('current')
    //头部导航栏切换
    $(".nav-box>.nav-item>a").click(function(){
        $(this).parent('.nav-item').addClass('active').siblings().removeClass('active')
    })
    // console.log(pageUrl)
    // console.log(pageUrl.split(lang)[1])
    //模块路径
    var modulePath = pageUrl.split('/')[2]
    // console.log('0')
    // 菜单导航设置高亮
    $(".menu-box .menu-uls:not(."+ modulePath +")").remove()
    $(".menu-box .menu-uls."+ modulePath +"").addClass('show')
    $(".header-box>.nav-box>.nav-item[data-menu='"+ modulePath +"']").addClass('active')


    //设置语言
    // console.log('1')
    var langStr = '中文'
    var newLang = 'zh'
    var searchVal = ""
    var langObj = {
        zh: {
            search: '搜索',
            searchTipsBefore: `你搜索的“`,
            searchTipsAfter: `”未有查询结果`,
        },
        en: {
            search: 'Search',
            searchTipsBefore: `Your search for" `,
            searchTipsAfter: ` " does not result`,
        }
    }
    // console.log('3')
    if(lang === 'zh'){
        langStr = 'English'
        newLang = 'en'
    }
    // console.log('1')
    $(".input-block").attr('placeholder', langObj[lang].search)
    $(".lang-box>.lang").text(langStr)
    $(".lang-box>.lang").click(function(){
        window.location.href = locaHref.replace('/'+lang+'/', '/'+newLang+'/')
    })
    // console.log(lang)
    //隐藏非当前语言下的导航栏和目录
    $(".header-box>.nav-box>.nav-item:not(."+ lang +")").remove()
    $(".header-box>.nav-box>.nav-item."+ lang +"").addClass('show')
    $(".menu-box .menu-uls:not(."+ lang +")").remove()//在同一页面下只显示同一模块下的菜单
    $(".menu-box .menu-uls."+ lang +"").addClass('show')
    //将菜单中的h3表格提取出来，放进子菜单中
    // let childIndex = 0
    $(".menu-box .menu-uls>li>a[href='"+ pageUrl +"']").siblings(".itemHide").find("h3").each(function(){
        // console.info($(this).text());
        // $(this).attr('id', $(this).attr('id') + childIndex)
        var thisId = $(this).attr('id')
        // $(".markdown-body h3").eq(childIndex).attr('id', $(".markdown-body h3").eq(childIndex).attr('id') + childIndex)
        var newA = `<li class="child-li"><a class="child-a" href="#${thisId}">${$(this).text()}</a></li>`
        $(this).parent('.itemHide').siblings('.child-ul').append(newA)
        // childIndex++
    });
    $(".itemHide").remove()
    
    $(".menu-box .child-ul").on('click', '.child-a', function(){
        $(this).parents('li.toc').children('a').removeClass('current')
        $(this).addClass('current').parents('.child-li').siblings().find(".child-a").removeClass('current')
        
        
        // $(this).parents('li.toc').siblings('li').removeClass('current').find('.child-a').removeClass('current')
      })

    //实现滚动条下滑左侧菜单高亮
    $(".content-box").scroll(function(){
      $('.markdown-box h3').each(function(){
        if($(this).offset().top < 230){
          $(".menu-box .child-ul .child-a[href='#"+ $(this).attr('id') +"']").addClass('current').parents('.child-li').siblings().find(".child-a").removeClass('current')
          $(".menu-box .child-ul .child-a[href='#"+ $(this).attr('id') +"']").parents('li.toc').children('a').removeClass('current')
        }
      })
      $('.markdown-box .highlighter-rouge').each(function(){
        if($(this).offset().top < 400){
          codeTypeFun($(this))
        }
      })
    })
    
    function codeTypeFun(this_){//代码语言判断
      var highArr = this_.attr('class')
      highArr.split(' ').map(item => {
        if(item.indexOf('language-') !== -1){
          $(".code-bg-title>span").text(item.split('-')[1] || 'json')
        }
      })
    }
    

    
    //修改form标签的action值为当前链接
    // $(".menu-box>.search").attr('action', pageUrl);
    $(".menu-box .input-block").keyup(function(){
        let val = $(this).val()
        if(val.length < 1){
            $(".search-val-box").hide()
            return false
        }
        $.ajax(`${ui.baseurl}/data.json`)
        .done((res) => {
            // console.log(res)
            search(res, val)
            // if(res.length < 1){
            //     let liText = `<li style="color: #fff;text-align: center;height: 40px;
            //     line-height: 40px;">${searchTips}</li>`
            //     console.log(liText)
            //     $(".search-val-box").html(liText).show()
            //     return false;
            // }else{
            //     search(res, val)
            // }
            
        })
        .fail((xhr, message) => debug(message));
    })

    $(".search-val-box").on('click', '.child-a', function(){
      console.log(location.origin + thisHref)
      var thisHref = $(this).attr('data-href')
      
      window.location.href = location.origin + thisHref
    })
    
    
    $(".menu-box .input-block").blur(function(){
        let val = $(this).val()
        if(val.length < 1){
            $(".search-val-box").hide()
            return false
        }
        $.ajax(`${ui.baseurl}/data.json`)
        .done((res) => {
            search(res, val)
            // if(res.length < 1){
            //     let liText = `<li style="color: #fff;text-align: center;height: 40px;
            //     line-height: 40px;">${searchTips}</li>`
            //     $(".search-val-box").html(liText).show()
            //     return false;
            // }else{
                
            // }
            
        })
        .fail((xhr, message) => debug(message));
    })
    
    //搜索事件
    function search(data,text) {
        searchVal = text
        // console.log(data)
        // let text = new URL(location.href).searchParams.get("q");
        // let lang = new URL(location.href).searchParams.get("lang");
      
        // console.log(text)
        // console.log(lang)
      
        // $("input[name='q']").val(text);
      
        let results = [];
        let regexp = new RegExp();
        try {
          regexp = new RegExp(text, "im");
        } catch (e) {
          $(".search-results .content").empty();
          $(".search-results .summary").html(ui.i18n.search_results_not_found);
          $(".search-results h2").html(ui.i18n.search_results);
          return debug(e.message);
        }
      
        function slice(content, min, max) {
          
          return content
            .slice(min, max)
            .replace(regexp, (match) => {
              console.log(match)
              return `<span class="bg-yellow">${match}</span>`
            });
        }
        for (page of data) {
            // console.log(page)
          let [title, content] = [null, null];
          try {
            if (page.title) {
              title = page.title.match(regexp);
            } else {
              if (page.url == "/") {
                page.title = ui.title;
              } else {
                page.title = page.url;
              }
            }
          } catch (e) {
            debug(e.message);
          }
          try {
            if (page.content) {
              page.content = $("<div/>").html(page.content).text();
              content = page.content.match(regexp);
            }
          } catch (e) {
            debug(e.message);
          }
          if (title || content) {
              if(page.dir.split('/')[1] === lang){//只匹配当前语言下的值
                let result = [
                    `<a class="child-a" data-href="${ui.baseurl}${page.url}?highlight=${text}">${page.title}</a>`,
                  ];
                  if (content) {
                    let [min, max] = [content.index - 100, content.index + 100];
                    let [prefix, suffix] = ["...", "..."];
            
                    if (min < 0) {
                      prefix = "";
                      min = 0;
                    }
                    if (max > page.content.length) {
                      suffix = "";
                      max = page.content.length;
                    }
                    // result.push(
                    //   `<p class="text-gray">${prefix}${slice(
                    //     page.content,
                    //     min,
                    //     max
                    //   )}${suffix}</p>`
                    // );   //只要标题用来放到左侧菜单中，具体内容暂时舍弃
                    
                  }
                  results.push(`<li class="border-top child-li">${result.join("")}</li>`);
              }
            
          }
        }
        if (results.length > 0 && text.length > 0) {
        //   console.log(results.join(""))
          // $(".search-results .content").html(results.join(""));
      
          $(".menu-content-box .search-val-box").html(results.join(""))
          $(".search-val-box").show();
          $(".search-results .summary").html(
            ui.i18n.search_results_found.replace("#", results.length)
          );
        } else {
            let liText = `<li style="color: #fff;text-align: center;padding: 15px 20px;">${langObj[lang].searchTipsBefore + searchVal + langObj[lang].searchTipsAfter}</li>`
            $(".search-val-box").html(liText).show()
        //   $(".search-results .content").empty();
        //   $(".search-results .summary").html(ui.i18n.search_results_not_found);
        }
        $(".search-results h2").html(ui.i18n.search_results);
      }

    highlight()
    function highlight() {//搜索匹配字符高亮
        let text = new URL(location.href).searchParams.get("highlight");
        console.log(text)
        if (text) {
            $(".markdown-body")
            .find("*")
            .each(function () {
                try {
                if (this.outerHTML.match(new RegExp(text, "im"))) {
                    $(this).addClass("search-result");
                    $(this).parentsUntil(".markdown-body").removeClass("search-result");
                }
                } catch (e) {
                debug(e.message);
                }
            });
            // last node
            $(".search-result").each(function () {
            $(this).html(function (i, html) {
                console.log(text)
                return html.replace(text, `<span class="bg-yellow">${text}</span>`);
            });
            });
            $(".search input").val(text);
        }
    }
})