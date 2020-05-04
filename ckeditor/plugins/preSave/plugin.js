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
                
                var formData = new FormData();

                formData.append('data',data);

                 $.ajax(LoaderUrl+"php/pre_save.php", {
                        method: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,

                        success: function (data) {
                            editor.setData(data);
                            window.message[0]='alert-success';
                            window.message[1]='预存成功！';
                            editor.execCommand("message");
                        },

                        error: function () {
                            window.message[0]='alert-warning';
                            window.message[1]='预存失败！';
                            editor.execCommand("message");
                        },

                        complete: function(){
                          },
                 });
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