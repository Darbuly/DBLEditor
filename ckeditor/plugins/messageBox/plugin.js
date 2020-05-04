/**
 * 添加自定义图片上传组件
 */
CKEDITOR.plugins.add('messageBox',{//调用add方法添加插件
    init : function (editor) { //初始化页面时调用方法，接收一个富文本对象实例
        var pluginName = 'messageBox'; //插件名
        var $alert = $('.alert');//提示信息

        /**
         * 添加执行命令
         */
        editor.addCommand('message', {//添加命令
            exec : function (editor) {//命令调用时执行此函数
                $alert.show().addClass(window.message[0]).text(window.message[1]);
                setTimeout(function(){$alert.hide();},3000);
            },
            async : true
        });
    },

    /*onLoad : function(){
        alert('onload');
        console.log(this);
    }*/
});