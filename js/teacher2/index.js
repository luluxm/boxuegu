/**
 *
 * Created by WilbertCheng on 2017/5/23.
 */
define(["jquery","arttemplate","text!tpls/tpl/common.html","./teacherManager","./courseManager","./courseCategory","./addCourse","common/isLogin"],function($,art,commonTpl,teacherManager,courseManager,courseCategory,addCourse){
    //1-->个人中心/退出公共部分的实现
    $(".rightContent").html(art.render(commonTpl,{
        title:"讲师管理",
        subTitle:"讲师列表"
    }));

    //2-->3个tab栏切换
    $("body").on("click",".btn-teachermanager",function(){
        //讲师管理
        teacherManager();

    }).on("click",".btn-courcemanager",function(){
        //课程管理
        courseManager();
        
    }).on("click",".btn-coursecategory",function(){
        //课程分类
        courseCategory.init();
        
    }).on("click",".btn-addcourse",function(){
        //课程添加
        addCourse();
    });
    //为了实现页面一加载就出现讲师管理的功能，所以触发了btn-teachermanager按钮的单击事件
    $(".btn-teachermanager").trigger("click");

});