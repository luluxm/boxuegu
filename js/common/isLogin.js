/**
 *
 * Created by WilbertCheng on 2017/5/17.
 */
define(["jquery","cookie"],function($){
    //1、判断用户在进入这个页面的时候，看看是否有指定的cookie，从而判断是否登录过
    var tc_name=$.cookie("tc_name");
    //2、如果没有登陆过，也就是没有这个cookie，应该跳转到登录页面
    if(!tc_name){
        location.href="login.html";
    }
})