/**
 * 添加自定义图片上传组件
 */
CKEDITOR.plugins.add('helloworld',{//调用add方法添加插件
    init : function (editor) { //初始化页面时调用方法，接收一个富文本对象实例
        var pluginName = 'helloworld'; //插件名

        /**
         * 添加执行命令
         */
        editor.addCommand('openFileComm', {//添加命令
            exec : function (editor) {//命令调用时执行此函数
            	alert('helloWorld!');
            },
            async : true
        });

        editor.ui.addButton && editor.ui.addButton(pluginName, { //添加一个上传图片的按钮
            label: '多图片上传',//按钮提示名
            command: 'openFileComm',//当按钮被点击时执行上面定义好的命令
            /**
             * 添加自定义按钮图片
             */
            icon: this.path + 'images/hello_icon.png'
        });
    },

    /*onLoad : function(){
        alert('onload');
        console.log(this);
    }*/
});