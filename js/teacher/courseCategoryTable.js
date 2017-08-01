/**
 *
 * Created by WilbertCheng on 2017/5/22.
 */
define(["jquery","arttemplate","text!tpls/courseCategoryTable.html"],function($,art,courseCategoryTableTpl){
    return {
        init:function(){
            console.log(courseCategoryTableTpl);

            $.get("/api/category",function(res){
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                var courseCategoryTable=art.render(courseCategoryTableTpl,{
                    result:res.result
                });
                
                var $courseCategoryTable=$(courseCategoryTable);
                
                $courseCategoryTable.appendTo('.panel-course-category');
            })

        },
        refresh:function(){

        },
        remove:function(){

        }
    }
})