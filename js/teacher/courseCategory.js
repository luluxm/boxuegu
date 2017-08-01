/**
 * 课程分类主模块
 * Created by WilbertCheng on 2017/5/22.
 */
define(["jquery","text!tpls/courseCategory.html","teacher/courseCategoryTable"],function($,courseCategoryTpl,courseCategoryTable){

    return function(){
        //加载课程分类模板文件
        $(".rightContent").html(courseCategoryTpl);

        //加载课程分类表格
        courseCategoryTable.init();
    }
})