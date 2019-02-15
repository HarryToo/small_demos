;(function ($) {
    $.fn.upload = function (opt) {
        var options = {
            url: ''
        };
        var files_arr = [];
        var $this = this;
        var init = function () {
            options = $.extend({}, options, opt);
            selectPic();
            upload_files();
        };
        init();

        // 图片预览
        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            }
            else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            }
            else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }

        // 选择图片
        function selectPic() {
            $this.find('.select_btn').click(function () {
                $this.find('.btn_box input').click();
            });
            $this.find('.btn_box input').change(function () {
                var file = $(this)[0].files[0];
                ImgToBase64(file, 720, function (base64) {
                    $this.find('.preview').append('<li><img src="' + base64 + '" alt=""><div class="del_btn" title="删除"></div></li>');
                    files_arr.push(base64);
                    console.log(files_arr);
                });
            });
            // 删除图片
            $this.on('click', '.preview li .del_btn', function () {
                var del_index = $(this).parents('li').index();
                $(this).parents('li').remove();
                files_arr.splice(del_index, 1);
                if (files_arr.length === 0) {
                    $this.find('.btn_box input').val('');
                }
                console.log(files_arr);
            });
        }

        // 图片压缩base64
        function ImgToBase64(file, maxLen, callBack) {
            var img = new Image();
            var reader = new FileReader();//读取客户端上的文件
            reader.onload = function () {
                var url = reader.result;//读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
                img.src = url;//reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
            };
            img.onload = function () {
                //生成比例
                var width = img.width, height = img.height;
                //计算缩放比例
                var rate = 1;
                if (width >= height) {
                    if (width > maxLen) {
                        rate = maxLen / width;
                    }
                } else {
                    if (height > maxLen) {
                        rate = maxLen / height;
                    }
                }
                img.width = width * rate;
                img.height = height * rate;
                //生成canvas
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var base64 = canvas.toDataURL('image/jpeg', 0.9);
                callBack(base64);
            };
            reader.readAsDataURL(file);
        }

        // 上传文件
        function upload_files() {
            $this.find('.upload_btn').click(function () {
                if (files_arr.length === 0) {
                    alert('请至少选择一张图片');
                    return false;
                }
                $.ajax({
                    url: options.url,
                    method: 'POST',
                    data: {
                        files: files_arr
                    },
                    dataType: 'json',
                    success: function (res) {
                        console.log(res);
                    }
                });
            });
        }
    };
})(jQuery);