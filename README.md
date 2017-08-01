# 博学谷项目
## localStorage和sessionStorage都是H5提供的一种状态保持（缓存数据）的技术
+ 基本用法
    + localStorage.setItem("name","cxc")
        - 值应该是一个字符串类型的，如果值不是字符串类型，会将该值转换为字符串类型存储
        - 思维发散：想要正确的保存一个对象字面量中的数据，应该怎么做？
            - var obj={name:"ccc",age:18}
            - var jsonObj=JSON.stringify(obj)
    + localStorage.getItem("name")；将会获取到之前保存过的name的值
    + localStorage.removeItem("name")：把之前保存过的name的数据删除
    + localStorage.clear(); 删除之前通过localStorage保存的所有的数据
+ sessionStorage和localStorage用法完全一致，但是数据的生命周期不一样，
    - localStorage设置的数据，如果自己不手动清除，那么一直存在；
    - sessionStorage设置的数据只要把浏览器关闭，数据就会消失

## 封装一个函数，实现获取指定的cookie值
+ document.cookie="PHPSESSID=q3gg282bnhmblsjbk0p3i9ddk2; gender=男; age=18; id=66"
+ 给这个函数设置1个参数，表示获取指定的cookie值
    - getCookie("gender") -->"男"

## cookie使用注意点：
+ cookie不能跨域；
+ cookie不能存储一些安全性特别高的数据(密码)

## require补充说明
+ require.config中的paths不仅仅可以配置js文件的路径，也可以配置某个目录的路径



## 配置requireJS的text模板插件
+ 从requireJS官网下载text插件(一个js文件)
+ 把插件放在网站的指定目录下面
+ 通过require.config配置插件的访问目录，并给插件起一个别名(比如：text:"./lib/text")
+ 在需要加载html模板的JS文件中，通过 "text!模板路径"来加载该模板文件

## arttemplate官方文档
+ https://aui.github.io/art-template/docs/index.html

## 配置了text模板插件，需要在加载某个html模板的JS文件中，使用"text!。。。"
+ 而模板文件都在tpls文件夹中，所以为了更方便的加载这个模板文件，我们又在main.js配置了tpls文件夹路径，以后在指定某个模板文件路径的时候通过："text!tpls/..."从而可以直接访问到tpls文件下的指定模板文件

## 编译模板文件
+ 使用arttemplate来编译模板文件

+ 在需要编译模板文件的JS文件中(index.js)去首先加载arttemplate模块，等待arttempalte模块加载完毕之后，获取模块的返回值(define函数的回调函数的指定形参)，也就是入口函数

+ arttemplate入口函数提供的render方法来实现编译模板的操作
    + art.render(模板字符串,{
        result:[{tc_id:100}]
    });//第二个参数是一个对象，对象中包含了模板文件中要使用的数据
    + render方法有一个返回值，返回值就是编译成功之后获取到的页面内容-->字符串格式


## 今日内容总结
### 将cookie用于项目中从而验证用户是否登录
+ 在用户登录的时候保存了相关的cookie信息
+ 正常情况下，在用户登录成功之后会跳转到index.html；为了防止用户不登录就访问index.html；所以在index.html页面增加了验证登录的逻辑
    + 通过require对index.html进行相应的模块配置之后，在index.html页面加载完毕的瞬间，验证用户是否登录
        - 通过判断在该页面是否能否获取到指定的cookie值，从而判断是否登录
            - 把这一段逻辑放到另一个独立的模块中(common/isLogin)

### 完成首页布局 --bootstrap熟练使用

### 表格数据的加载
+ 把加载表格的过程放在了teacher/index.js中实现
+ 准备加载表格的Hmtl文件模板
    - 配置了require提供的text插件，在main.js中配置这个插件的路径
    + 为了实现在index.js加载html文件模板，首先加载了"text!....."这个文件模块，这个文件模块返回结果就是一个html字符串，通过define函数的回调函数的指定参数来获取这个模板字符串

+ 用arttempalte编译html文件模板
    + 先引入了arttemplate模块，同样获取了模块的返回值(入口函数)-->art
    + art.render(模板字符串,{ result:[] })  -->这里面的result属性就是以后要在页面中使用的result
    + 上一步编译完成会有一个返回值，返回值就是编译成功的那个字符串（也就包含了真实的表格数据）

+ 把表格数据放到页面的指定位置
    - 将数据模板转换为jquery对象
    - 给这个jquery通过事件委托的方式给启用/注销按钮绑定了单击事件，从而可以实现启用/注销操作
    + 把这个jquery对象追加到页面的指定元素下面

## 作业
+ 实现添加讲师的功能
    - 用文字的形式把index.js所有功能总结出来
+ 预习个人中心、退出功能
+ 预习ueditor ckeditor 这2款富文本编辑器
+ 预习uploadify上传插件


## 加载课程分类列表
+ 先加载一级分类
    - 分类的cg_pid==0
+ 后加载二级分类
    - 分类的cg_pid==某个一级分类的cg_id

+ 实现方式：双重循环，首先加载一级分类，然后在内层循环中加载二级分类



## uploadify
1.1.8.1. 基本使用

<input  id="uploadify" type="file" />
<script>
    $('#uploadify').uploadify({
        swf: '/lib/uploadify/uploadify.swf',
        uploader: '/v6/uploader/avatar',
        fileTypeExts: '*.gif; *.jpg; *.png'
    });
</script>
1.1.8.1.1. 属性配置

fileObjName

设置提交给后端文件数据对应的key
默认值为'Filedata'
formData

配置除fileObjName，需要额外提交的数据
值为key、value形式的对象
fileSizeLimit

限制文件大小
值为字符串，可以使用B、KB、MB、GB作为描述大小的单位
fileTypeExts

限制上传文件的类型
默认值为'*'
buttonText

设置按钮文本
buttonClass

设置按钮class属性值，用来控制按钮样式
auto

配置选取文件后是否自动上传
onUploadSuccess

文件上传成功的回调
回调接收的第一个参数为文件对象，第二个参数为请求回来的数据
1.1.8.1.2. 方法调用

upload

使用脚本的方式随时提交选择的文件
$('#uploadify').uploadify('upload');
disable

禁用或开启上传功能
$('#uploadify').uploadify('disable', true ||false);
destroy

卸载插件
$('#uploadify').uploadify('destroy');
settings

动态修改属性配置
$('#uploadify').uploadify('settings', 'buttonText', '按钮');


## 使用UEditor
+ 下载资源包
+ 在需要放置ueditor的位置添加一个script标签，给标签添加一个name用于表单提交，给标签添加一个id用于UEditor识别
+ 在config.js文件中配置响应的文件路径(配置这些路径的时候需要首先打印：URL)
    - zh-cn的路径
    - themes的路径
    - css文件的路径
+ 在js代码中
     var ue = UE.getEditor('script标签的id');