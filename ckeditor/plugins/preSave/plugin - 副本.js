/**
 * 添加自定义图片上传组件
 */
CKEDITOR.plugins.add('preSave',{//调用add方法添加插件
    init : function (editor) { //初始化页面时调用方法，接收一个富文本对象实例
        var pluginName = 'preSave'; //插件名

        /**
         * 添加执行命令
         */
        editor.addCommand('preSave', {//添加命令
            exec : function (editor) {//命令调用时执行此函数
                //获取数据
                var data = editor.getData();
                //遍历所有imgclass=cache
                // var reg=/<img[^>]*?class="cache"[^>]*?>/g;
                // var imgs = data.match(reg).toString();
                
                var formData = new FormData();

                formData.append('imgs', imgs);

                 $.ajax(LoaderUrl+"php/pre_save.php", {
                        method: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        dataType:'json',

                        success: function (data) {
                          console.log(data);
                          console.log(data[0]);
                        $(".cache").each(function(){
                            alert('dfdfdfdf');
                        });
                        },

                        error: function () {
                          console.log('上传图片失败！');
                        },

                        complete: function(){
                          },
                 });
            	alert('preSave!');
            },
            async : true
        });

        editor.ui.addButton && editor.ui.addButton(pluginName, { //添加一个上传图片的按钮
            label: '服务器预存',//按钮提示名
            command: 'preSave',//当按钮被点击时执行上面定义好的命令
            /**
             * 添加自定义按钮图片
             */
            icon: this.path + 'images/pre_save.png'
        });
    },

    /*onLoad : function(){
        alert('onload');
        console.log(this);
    }*/
});