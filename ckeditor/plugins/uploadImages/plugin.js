/**
 * 添加自定义图片上传组件
 */
CKEDITOR.plugins.add('uploadImages',{//调用add方法添加插件
    init : function (editor) { //初始化页面时调用方法，接收一个富文本对象实例
        var pluginName = 'uploadImages'; //插件名

        var image = document.getElementById('image');//模态主图片
        var input = document.getElementById('editFileInput');//图片存储
        var $modal = $('#modal');//模态框
        /**
         * 添加执行命令
         */

        editor.addCommand('openFileComm', {//添加命令
            exec : function (editor) {//命令调用时执行此函数
              var cropper;
              input.click();
              input.addEventListener('change', function (e) {//图片加载事件
                //var files = e.target.files;//
                var files = this.files;//
                var done = function (url) {//
                  input.value = '';
                  image.src = url;
                  $modal.modal('show');
                };
                var reader;
                var file;
                var url;

                if (files && files.length > 0) {
                  //文件有效
                  file = files[0];

                  if (URL) {
                    done(URL.createObjectURL(file));
                  } else if (FileReader) {
                    reader = new FileReader();
                    reader.onload = function (e) {
                      done(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }
              });

              $modal.on('shown.bs.modal', function () {//模态框显示处理
                cropper = new Cropper(image, {//新建crop
                  aspectRatio:0,//crop的默认比例1:1
                  viewMode: 1,
          //编写改变处理函数
          crop:function(e){

              var cropper=this.cropper;
              var canvasWidth=cropper.getData(1).width;
              var canvasHeight=cropper.getData(1).height;
              $("#dataWidth").attr('value',parseInt(canvasWidth*$('#dataQuality').val()*0.01));
              $("#dataHeight").attr('value',parseInt(canvasHeight*$('#dataQuality').val()*0.01));
              
          },
                });
              }).on('hidden.bs.modal', function () {
                cropper.destroy();
                cropper = null;
              });

      document.getElementById('crop').addEventListener('click', function () {//裁剪并上传事件处理
        var initialAvatarURL;

        $modal.modal('hide');

        if (cropper) {
          canvas = cropper.getCroppedCanvas({//上传图片的比例设置
            width: $("#dataWidth").val(),
            height: $("#dataHeight").val(),
            imageSmoothingQuality:canvasQuality,
          });

          canvas.toBlob(function (blob) {
            var formData = new FormData();

            formData.append('avatar', blob);
            //上传图片到服务器
                        //上传图片到服务器
                      $.ajax(LoaderUrl+"php/upLoad.php", {
                        method: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,

                        success: function (data) {
                          console.log(data);
                          var element = CKEDITOR.dom.element.createFromHtml( '<img class="cache" style="" src="'+data+'" border="0" />' );//上传成功后添加上传完成的图片元素到富文本内容中
                          editor.insertElement(element);//插入元素
                        },

                        error: function () {
                          console.log('上传图片失败！');
                        },

                        complete: function(){
                          },
                        });


          });
        }
      });
            },
            async : true
        });

        editor.ui.addButton && editor.ui.addButton(pluginName, { //添加一个上传图片的按钮
            label: '多图片上传',//按钮提示名
            command: 'openFileComm',//当按钮被点击时执行上面定义好的命令
            /**
             * 添加自定义按钮图片
             */
            icon: this.path + 'images/image.png'
        });
    },

    /*onLoad : function(){
        alert('onload');
        console.log(this);
    }*/
});