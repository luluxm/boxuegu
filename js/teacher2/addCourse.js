/**
 *
 * Created by WilbertCheng on 2017/5/23.
 */
define(["jquery","arttemplate","text!tpls/tpl/addCourse.html","./commonAPI"],function($,art,addCourseTpl,commonAPI){



    return function(){

        //1、获取讲师信息
        commonAPI.getTeacherInfo(function(resTeacher){
            //2、获取一级分类信息
            commonAPI.getFirstCategory(function(resTopCategory){
                //3、根据第一个一级分类的信息查找二级分类
                commonAPI.getCategoryByFirst(resTopCategory.result[0].cg_id,function(res3){

                    var addCourse=art.render(addCourseTpl,{
                        teacherResult:resTeacher.result,
                        topCategoryResult:resTopCategory.result,
                        secondCategoryResult:res3.result
                    });

                    var $addCourse=$(addCourse);

                    //实现选择一级分类，查询中指定的二级分类列表，并加载到指定的下拉框中
                    $addCourse.on("change",".select-top",function(e){
                        // console.log(e);
                        var topId=$(this).val();//this:下拉框 $(this)。val()-->选中的option的value值

                        commonAPI.getCategoryByFirst(topId,function(res){
                            var secondResult=res.result;//二级分类数组

                            var optionStr="";
                            //将数组的信息加载到指定的下拉框中
                            secondResult.forEach(function(v,i){
                                v.cg_id
                                v.cg_name

                                optionStr+='<option value="'+v.cg_id+'">'+v.cg_name+'</option>';
                            });

                            //替换指定下拉框的内容
                            $addCourse.find(".select-second").html(optionStr);
                        });
                    });


                    $(".module-main").empty().append($addCourse);

                });


            })


        })


    }
})