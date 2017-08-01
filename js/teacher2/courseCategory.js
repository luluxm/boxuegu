/**
 * 课程分类
 * Created by WilbertCheng on 2017/5/23.
 */
define(["jquery", "arttemplate", "text!tpls/tpl/courseCategoryTable.html", "text!tpls/tpl/editCategory.html","text!tpls/tpl/addCategory.html","bootstrap"], function ($, art, courseCategoryTableTpl, editCategoryTpl,addCategoryTpl) {

    //获取分类基本信息
    function getCategoryInfo(id,callback){
        $.get("/api/category/edit",{cg_id:id},function(res){
            if(res.code!=200){
                return;
            }

            callback && callback(res);

        })
    }

    //获取一级分类
    function getFirstCategory(callback){
        $.get("/api/category/top",function(res2) {
            if (res2.code != 200) {
                return;
            }

            callback && callback(res2);
        });
    }

    return {
        $courseCategoryTable:null,
        init:function () {
            var self=this;

            $.get("/api/category", function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }

                var courseCategoryTable = art.render(courseCategoryTableTpl, {
                    result: res.result
                });

                var $courseCategoryTable = $(courseCategoryTable);

                self.$courseCategoryTable=$courseCategoryTable;

                $courseCategoryTable
                    .on("click", ".btn-edit", function () {
                    //编辑分类
                    $("#editCategoryModal").remove();

                    var $td=$(this).parent();

                    //API：获取分类基本信息
                    getCategoryInfo($td.attr("cg-id"),function(res){
                        //API：获取所有的一级分类
                        getFirstCategory(function(res2){
                            //把顶级分类这个选项也放到数组中，作为数组的第一个选项
                            res2.result.unshift({cg_id:0,cg_name:"顶级"});

                            var editCategory = art.render(editCategoryTpl,{
                                result:res.result,//分类的基本信息
                                topResult:res2.result//所有的顶级分类
                            });//为了预留编译模板

                            $("#editCategoryModal").remove();

                            var $editCategory = $(editCategory);//为了预留事件绑定

                            $editCategory.on("submit","form",function(){
                                var formData=$(this).serialize();

                                $.post("/api/category/modify",formData,function(res){
                                    if(res.code!=200){
                                        return;
                                    }

                                    //成功的修改了分类-->刷新表格
                                    self.refresh();
                                });

                                return false;
                            })

                            self.$editCategory=$editCategory;

                            $editCategory.appendTo("body").modal();
                        })

                    });

                })
                    .on("click",".btn-success",function(){
                        //添加分类

                        getFirstCategory(function(res){
                            $("#addCategoryModal").remove();

                            res.result.unshift({cg_id:0,cg_name:"顶级分类"});

                            var addCategory=art.render(addCategoryTpl,{
                                topResult:res.result
                            });

                            var $addCategory=$(addCategory);

                            $addCategory.on("submit","form",function(){
                                $.post("/api/category/add",$(this).serialize(),function(res){
                                    if(res.code!=200){
                                        return;
                                    }

                                    $addCategory.modal("hide");

                                    //添加成功
                                    self.refresh();
                                })


                                //阻止同步提交表单
                                return false;
                            })

                            $addCategory.appendTo("body").modal();
                        })
                    })

                $(".module-main").empty().append($courseCategoryTable);
            });


        },
        //刷新表格
        refresh:function(){
            //移除之前的表格
            this.$courseCategoryTable.remove();

            //移除模态框
            this.$editCategory && this.$editCategory.modal("hide");

            //表格重新初始化
            this.init();
        }
    }
})