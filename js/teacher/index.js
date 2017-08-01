//通过"./"来加载teacherTable.js应该是："./teacherTable"
//通过通过baseUrl的路径来加载teacherTable.js应该是："teacher/teacherTable"
define([
    "jquery","arttemplate", "teacher/teacherMain", "teacher/courseManager", "teacher/courseCategory", "text!tpls/personalCenter.html","common/isLogin",], function ($, art,teacherMain, courseManager, courseCategory,personalCenterTpl) {

    //讲师管理
    $(".btn-teachermanager").on("click", function () {
        teacherMain();
    });
    //课程管理
    $(".btn-courcemanager").on("click", function () {
        courseManager();
    });
    //课程分类
    $(".btn-coursecategory").on("click", function () {
        courseCategory();
    });

    //个人中心和退出按钮的事件绑定操作-->每个模块都共有的，所以提取出来
    $("body")
        .on("click", ".link-logout", function () {
            $.post("/api/logout", function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }

                //退出成功
                //1、清除cookie
                $.removeCookie("tc_name");
                $.removeCookie("tc_avatar");
                //2、页面跳转
                location.href = "login.html";
            })
        })
        .on("click", ".link-personalcenter", function () {
            //个人中心
            //1、获取当前用户的个人信息
            $.get("/api/teacher/profile", function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }

                //console.log(res.result);

                //2、准备一个模态框-->加载模板
                //console.log(personalCenterTpl);

                //3、将信息渲染到模态框中-->编译模板
                var personalCenter = art.render(personalCenterTpl, {
                    result: res.result
                });

                var $personalCenter = $(personalCenter);

                //4、将模态框放到页面中
                $("#personalCenterModal").remove();
                $personalCenter.appendTo("body").modal();

                $personalCenter.find(".date-birthday").datetimepicker({
                    language: 'zh-CN',//显示中文
                    format: 'yyyy-mm-dd',//显示格式
                    minView: "month",//设置只显示到月份
                    initialDate: new Date(),//初始化当前日期
                    autoclose: true,//选中自动关闭
                    todayBtn: true//显示今日按钮
                });

                var ue = UE.getEditor('introduceContainer');

                ue.ready(function(){
                    //预加载个人介绍
                    ue.setContent(res.result.tc_introduce);
                })

                $personalCenter.on("submit",'form',function(){
                    //1、获取表单信息
                    var formData=$(this).serialize();
                    console.log(formData);

                    //2、访问接口
                    $.post("/api/teacher/modify",formData,function(res){
                        if(res.code!=200){
                            console.log(res.msg);
                            return;
                        }

                        //成功就刷新页面
                        location.href="/";
                    });


                    return false;
                });
            })


        })

    //自动触发讲师管理按钮的单击事件==>完成首页初始化操作
    $(".btn-teachermanager").trigger("click");

})