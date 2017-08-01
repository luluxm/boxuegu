/**
 *
 * Created by WilbertCheng on 2017/5/22.
 */
define(["jquery","arttemplate","text!tpls/teacherTable.html","text!tpls/showTeacherInfo.html","text!tpls/editTeacherInfo.html","text!tpls/addTeacherInfo.html","bootstrap","datetimerpicker"],function($,art,teacherTableTpl,showTeacherInfoTpl,editTeacherInfoTpl,addTeacherInfoTpl){
    return {
        //表格初始化
        init:function(){
            var self=this;

            $.get("/api/teacher",function(res){

                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                //在这里表示接口正常的返回数据
                var result=res.result;

                //编译模板文件获取表格内容-->html字符串
                var html=art.render(teacherTableTpl,{
                    result:result
                });

                var $teacherTable=$(html);//tips:对于jquery对象的变量名一般都会使用$前缀

                $teacherTable.on("click",".btn-showInfo",function(){
                        var data={
                            tc_id:$(this).parent().attr("tc_id")
                        };

                        $.get("/api/teacher/view",data,function(res){
                            if(res.code!=200){
                                console.log(res.msg);
                                return;
                            }

                            //a、获取讲师信息
                            var result=res.result;
                            //b、把讲师信息作为模板数据渲染到模板文件中-->art
                            var showTeacherInfo=art.render(showTeacherInfoTpl,{
                                result:result
                            });
                            //c、
                            //1、移除之前的模态框
                            $("#showTeacherInfoModal").remove();
                            //2、把新模态框的模板文件转换为jquery对象
                            var $showTeacherInfo=$(showTeacherInfo);
                            //3、将jquery对象先添加到页面中，并以模态框的形式展现出来
                            $showTeacherInfo.appendTo("body").modal();
                        })



                    })
                    .on("click",".btn-edit",function(){
                        //编辑讲师信息
                        //1、先获取之前的信息
                        $.get("/api/teacher/edit",{
                            tc_id:$(this).parent().attr("tc_id")
                        },function(res){
                            if(res.code!=200){
                                console.log(res.msg);
                                return;
                            }

                            $("#editTeacherInfoModal").remove();//通过选择器获取页面中的模态框

                            //1、art编译模板
                            //2、将编译成功之后的内容放到页面中
                            var editTeacherInfo=art.render(editTeacherInfoTpl,{
                                result:res.result
                            });

                            //通过html字符串，将该字符串转换为DOM元素
                            var $editTeacherInfo=$(editTeacherInfo).appendTo("body");

                            $editTeacherInfo.find("#dateJoin").datetimepicker({
                                language: 'zh-CN',//显示中文
                                format: 'yyyy-mm-dd',//显示格式
                                minView: "month",//设置只显示到月份
                                initialDate: new Date(),//初始化当前日期
                                autoclose: true,//选中自动关闭
                                todayBtn: true//显示今日按钮
                            });

                            $editTeacherInfo.on("submit","form",function(){
                                var formData=$(this).serialize();

                                //console.log(formData);

                                $.post("/api/teacher/update",formData,function(res){
                                    if(res.code!=200){
                                        alert(res.msg);
                                        return false;
                                    }

                                    //刷新表格
                                    $editTeacherInfo.modal("hide");
                                    self.refresh();
                                })

                                return false;//阻止表单提交
                            })

                            $editTeacherInfo.modal();




                        })

                        //2、将之前的信息渲染到页面中

                        //3、用户完成信息输入之后，提交表单，完成修改操作

                    })
                    .on("click",".btn-status",function(){
                        //注销和启用讲师
                        var btnStatus=this;

                        var data= {
                            tc_id: $(this).parent().attr("tc_id"),
                            tc_status: $(this).parent().attr("tc_status")
                        };

                        $.post("/api/teacher/handle",data,function(res){
                            if(res.code!=200){
                                console.log(res.msg);
                                return;
                            }

                            //a、已经通过服务器成功修改用户状态
                            //b、还需要修改页面中的显示效果以及相关数据

                            //1、获取用户的新状态
                            var status=res.result.tc_status;
                            var statusText=status==0?"注销":"启用";//列文本
                            var statusBtnText=status==0?"启用":"注销";//按钮文本

                            //2、将新数据更新到表格中
                            //2.1、修改账户状态列显示的文本
                            $(btnStatus).parent().prev().html(statusText);//原生JS-->previousSibling/nextSibling
                            //2.2、修改按钮的文本
                            $(btnStatus).html(statusBtnText);
                            //2.3、保存状态的数据
                            $(btnStatus).parent().attr("tc_status",status);
                        })


                    })

                $teacherTable.appendTo(".panel-teacher .panel-body");
            });
        },
        
        //表格刷新
        refresh:function(){
            //1、移除
            this.remove();
            //2、再加载
            this.init();
        },
        
        //表格移除
        remove:function(){
            //1、移除
            $("#teacherTable").remove();
        }
    }
})