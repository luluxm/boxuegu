/**
 * 课程管理
 * Created by WilbertCheng on 2017/5/23.
 */
define(["jquery","arttemplate","text!tpls/tpl/courseList.html"],function($,art,courseListTpl){

    function getCourseInfo(callback){

        $.get("/api/course",function(res){
            if(res.code!=200){
                return;
            }
            
            callback && callback(res);
        })
    }
    
    
    return function(){
        //获取课程信息
        getCourseInfo(function(res){
            var courseList=art.render(courseListTpl,{
                result:res.result
            });
            
            var $courseList=$(courseList);

            $(".module-main").empty().append($courseList);
        })
    }
})