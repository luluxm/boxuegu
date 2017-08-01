/**
 * 处理所有的API请求
 * Created by WilbertCheng on 2017/5/23.
 */
define(["jquery"], function ($) {

    return {
        getTeacherInfo: function (callback) {
            $.get("/api/teacher", function (res) {
                if (res.code != 200) {
                    return;
                }

                callback && callback(res);
            })
        },
        //获取分类基本信息
        getCategoryInfo: function (id, callback) {
            $.get("/api/category/edit", {cg_id: id}, function (res) {
                if (res.code != 200) {
                    return;
                }

                callback && callback(res);

            })
        },
        
        //获取一级分类
        getFirstCategory: function (callback) {
            $.get("/api/category/top", function (res2) {
                if (res2.code != 200) {
                    return;
                }

                callback && callback(res2);
            });
        },

        /**
         * 获取二级分类
         * @param id 一级分类的ID
         */
        getCategoryByFirst:function(id,callback){
            $.get("/api/category/child",{cg_id:id},function(res){
                if(res.code!=200){
                    return;
                }

                callback && callback(res);
            })
        }
    }
})