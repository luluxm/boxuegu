/**
 *
 * Created by WilbertCheng on 2017/5/17.
 */

require.config({
    baseUrl:"./js",
    paths:{
        jquery:"./lib/jquery-2.1.4",
        cookie:"./lib/jquery.cookie",
        arttemplate:"./lib/template-web",
        bootstrap:"../assets/bootstrap/js/bootstrap",
        datetimerpicker:"../assets/datetimepicker/js/bootstrap-datetimepicker",
        ueditor:"../assets/ueditor/ueditor.all",
        ueditorConf:"../assets/ueditor/ueditor.config",
        ueditorParse:"../assets/ueditor/ueditor.parse",
        //指定common文件夹路径，以后在获取common里面的模块的时候，就回去这里的位置去找
        common:"./common",  //-->网站根目录/js/common,
        text:"./lib/text",   //配置requirejs中提供的操作文件模板的一种插件(只能加载html文件)
        tpls:"../tpls"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        }
    }
});

require(["teacher2/index"],function(){
    
})

