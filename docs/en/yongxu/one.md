---
sort: 1 # follow a certain sequence of letters or numbers
---
# jieru shuoming
### 查看表格

| 默认格式  | 左对齐 | 居中 | 右对齐 |                     
| 默认格式表格内容  | 左对齐表格内容 | 居中表格内容 | 右对齐表格内容 |     
| 默认格式表格内容  | 左对齐表格内容 | 居中表格内容 | 右对齐表格内容 |

### 代码段
<p class='custom-code-title'>Response</p>

```javascript
{
  "data": [
    {
      "id": 100001,
      "type": "spot",
      "subtype": "",
      "state": true
    }
    {
      "id": 100002,
      "type": false,
      "subtype": "btcusdt",//我是备注哦
      "state": "working"
    },
    {
      "id": null,
      "type": "otc",
      "subtype": "",
      "state": "working",
      func(){
        console.log('测试')
      }
    }
  ]
}
```

### 链接
QQ浏览器 | [点击打开](https://browser.qq.com/?adtag=SEM170314020/)    |   搜索资料常用
有道词典 | [link](http://cidian.youdao.com/)    |   开发中翻译

PS E:\work\jekyll\my-blog> bundle exec jekyll serve
Could not find public_suffix-4.0.6 in any of the sources
Run `` to install missing gems.
PS E:\work\jekyll\my-blog> 
Fetching gem metadata from https://rubygems.org/
Fetching gem metadata from https://rubygems.org/.........
jekyll-4.2.0 requires rubygems version >= 2.7.0, which is incompatible with the
current version, 2.6.14.3
PS E:\work\jekyll\my-blog> bundle exec jekyll serve
Could not find public_suffix-4.0.6 in any of the sources
Run `` to install missing gems.
PS E:\work\jekyll\my-blog> 
Fetching gem metadata from https://rubygems.org/
Fetching gem metadata from https://rubygems.org/.........
jekyll-4.2.0 requires rubygems version >= 2.7.0, which is incompatible with the
current version, 2.6.14.3
PS E:\work\jekyll\my-blog>  public_suffix-4.0.6
ERROR: "" was called with arguments ["public_suffix-4.0.6"]
Usage: " [OPTIONS]"
PS E:\work\jekyll\my-blog> gem install public_suffix-4.0.6
ERROR:  Could not find a valid gem 'public_suffix-4.0.6' (>= 0) in any repository
ERROR:  Interrupted
终止批处理操作吗(Y/N)? y
PS E:\work\jekyll\my-blog> gem install public_suffix
Fetching: public_suffix-4.0.6.gem (100%)
Successfully installed public_suffix-4.0.6
Parsing documentation for public_suffix-4.0.6
Installing ri documentation for public_suffix-4.0.6
Done installing documentation for public_suffix after 0 seconds
1 gem installed
PS E:\work\jekyll\my-blog> 
Fetching gem metadata from https://rubygems.org/
Fetching gem metadata from https://rubygems.org/.........
jekyll-4.2.0 requires rubygems version >= 2.7.0, which is incompatible with the
current version, 2.6.14.3
PS E:\work\jekyll\my-blog> bundle exec jekyll serve
Could not find addressable-2.7.0 in any of the sources
Run `` to install missing gems.
PS E:\work\jekyll\my-blog> gem install addressable
Fetching: addressable-2.7.0.gem (100%)
Successfully installed addressable-2.7.0
Parsing documentation for addressable-2.7.0
Installing ri documentation for addressable-2.7.0

### json代码
```json
curl "https://api.huobi.pro/v2/account/deposit/address?currency=btc"
```