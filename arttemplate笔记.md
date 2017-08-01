# arttemplate
## 基本介绍：是一款性能卓越的 js 模板引擎
## Github地址：https://github.com/aui/art-template (作者：糖饼)
## 官方文档：https://aui.github.io/art-template/docs/index.html

## 基本使用：
+ 下载源码
+ 在网页中引用js文件
+ 添加一个script标签
```html
<script type="text/template" id="tpl">
    <p>我叫：{{name}}，今年{{age}}岁了</p>

</script>
```
+ 编写js代码：
```js
    //html保存了转化后的html字符串
    var html=template("#tpl",{
        name:"ccc",
        age:18,
        list:[10,20,30]
    })
```

## 语法
### 遍历
```html
<ul>
    {{each list}}
        <li>索引是：{{$index}}，值是：{{$value}}</li>
    {{/each}}
</ul>
<!--第二种方式-->
<ul>
    {{each list as value index}}
        <li>索引是：{{index}}，值是：{{value}}</li>
    {{/each}}
</ul>
```

### if条件
```html
<ul>
    {{each list}}
    {{if $value =="ccc"}}
        <li class="active">$value</li>
    {{/if}}
    {{/each}}
</ul>
```