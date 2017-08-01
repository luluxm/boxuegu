/**
 * 讲师管理主模块
 */


//通过"./"来加载teacherTable.js应该是："./teacherTable"
//通过通过baseUrl的路径来加载teacherTable.js应该是："teacher/teacherTable"
define(["jquery", "arttemplate","text!tpls/teacher.html", "teacher/teacherTable", "text!tpls/addTeacherInfo.html", "text!tpls/personalCenter.html", "bootstrap", "datetimerpicker", "common/isLogin", "cookie","ueditor","ueditorConf"], function ($, art,teacherTpl, teacherTable, addTeacherInfoTpl, personalCenterTpl) {


    return function(){
        //加载讲师管理模板文件
        $(".rightContent").html(teacherTpl);

        $.fn.datetimepicker.dates['zh-CN'] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今天",
            suffix: [],
            meridiem: ["上午", "下午"]
        };


        //1、加载讲师表格
        teacherTable.init();

        //2、添加讲师
        $("body").on("click", ".btn-addteacher", function () {
                //0、把之前的模态框移除
                $("#addTeacherInfoModal").remove();

                //1、加载模态框(没有数据绑定)
                var $addTeacherInfo = $(addTeacherInfoTpl);

                //2、把模态框放到页面中
                $addTeacherInfo.appendTo("body").modal();

                $addTeacherInfo.find(".date-Join").datetimepicker({
                    language: 'zh-CN',//显示中文
                    format: 'yyyy-mm-dd',//显示格式
                    minView: "month",//设置只显示到月份
                    initialDate: new Date(),//初始化当前日期
                    autoclose: true,//选中自动关闭
                    todayBtn: true//显示今日按钮
                });

                $addTeacherInfo.on("submit", "form", function () {
                    //1、获取表单信息
                    var formData = $(this).serialize();
                    //2、进行ajax请求
                    $.post("/api/teacher/add", formData, function (res) {
                        if (res.code != 200) {
                            console.log(res.msg);
                            return false;
                        }

                        //关闭模态框
                        $addTeacherInfo.modal("hide");

                        //添加成功了-->刷新表格
                        teacherTable.refresh();


                    })


                    return false;
                });
            })
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
    }


})