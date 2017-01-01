// 投稿-第二页 创建作品
var works = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">contribute</div><div class="titleBlock_LG">个人投稿</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li v-link="{path: \'/bookBlockList\'}"><span class="circular"></span><span class="title_name">轻小说</span></li><li v-if="showFlag === 999"><span class="circular"></span><span class="title_name">画集</span></li><li class="active" v-link="{path: \'/works\'}"><span class="circular"></span><span class="title_name">创建作品</span></li></ul>'
      +'<div class="content"><div class="works">'
      +'<div v-show="imgFlag" style="top: 100px;left:400px;z-index:99999;background-color: #FFFFFF;width: 335px;height: 360px;box-shadow: 1px 1px 15px rgba(0,0,0,0.3);padding: 50px 50px 40px 70px;position: absolute;"><input type="file" v-el:file style="display: none;" v-on:change="fileUpload" /><style> .cropper-container { margin-left: -116px !important; }</style><div style="position: absolute;top: 50px;left: 50%;width: 232px;height: 232px;"><img id="cropper-img" :src="Imgbase64 !== \'\' ? Imgbase64 : \'../img/232x232.jpg\' " style="width: 100%;height: 100%;border: 1px solid #989898;background-color: #e5e5e5;display: block;margin-left: -116px;"/></div><div style="position: absolute;top: 15px;right:195px;width:84px;font-size: 12px;text-align: center;line-height: 26px;height: 26px;">当前图片</div><div  style="position: absolute;right: 85px;top: 15px;width: 84px;height: 26px;border-radius: 6px;"><div style="border-radius: 6px;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="clickFileActiveFn">重新选择</div></div><div  style="position: absolute;right: 85px;top:300px;width: 84px;height: 26px;border-radius: 6px;"><div style="border-radius: 6px;width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="clearImgFn">取消上传</div></div><div  style="position: absolute;right: 180px;top:300px;width: 84px;height: 26px;border-radius: 6px;"><img src="../img/gou.png" style="position: absolute;top: 5px;left: 5px;"/><div style="padding-left: 10px;border-radius: 6px;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="activeImgFn">确认上传</div></div><div style="position: absolute;width:100%;bottom:10px;left: 0px;font-size: 14px;text-align: center;">支持JPG,PNG等格式,图片需小于2M</div></div>'
      +'<div class="works_title"><ul><li class="works_sign"></li><li>创建作品</li><li class="works_sont">create a work</li></ul></div><div class="works_name"><p>书名：<input type="text" maxlength="64" v-model="bookName" /></p><p>画师：<input type="text" v-model="ulName" placeholder="没有可不填写" /></p><p>分类：<span id="area-cat-info" class="text-primary">{{ classList }}</span><span v-on:click="classListFn"  class="span " style="padding: 2px 8px 3px 8px;">选择分类</span>'
      +'<div class="cat-list-post" v-if="classFlag" style="display:block"><div class="btn-block clear"><a v-for="obj in classArr" v-on:click="clickClassFn($index)" :class="classArr[$index].flag === true?\'btn btn-xs btn-primary\':\'btn btn-xs btn-default\'" data-id="obj.bookTypeId" data-name="{{obj.bookTypeName}}">{{obj.bookTypeName}}</a></div><div class="bottom-block"><a data-type="submit" class="btn btn-wide btn-xs btn-primary" v-on:click="primaryFn">确定</a></div></div>'
      +'</p><span>简介：</span><textarea placeholder="0/300字" v-model="textArea"></textarea><div class="works_Deposit " v-on:click="submitFn">保存</div></div><div class="works_chart"><img style="width:150px;height:210px" src="../img/user_inco.jpg" v-el:img/><p  v-on:click="clickFileActiveFn">选择封面</p><div class="works_notes"><span>注：</span><ul><li>最大上传2M</li><li>建议尺寸大小比例：</li><li>宽320px</li><li>高448px</li><li>上传前请确认比例</li></ul></div></div><div class="works_line"></div><div class="works_Remarks"><label>注意事项：</label><ul><li>1.请慎重填写书名，选择作品分类，一旦提交将不可修改，书籍亦不可删除。</li><li>2.作品封面请选择大尺寸高清的ACG风格图片，本站拒绝三次元图片或与轻小说感觉严重不符的图片，请勿使用违规图片，违规者将被处罚</li><li>3.严禁盗图行为，上传插图请使用具有授权的图片！并与编辑提供授权证明。如无法提供，网站将封面撤回</li><li>4.书名与间接内容请不要填写令读者不适的内容</li><li>5.分类最多可选择三项</li><li>6.欢迎加入轻创文学QQ群交流写作心得，作者群：********，加群申请请附上书籍网站后六位数字。</li></ul></div><div class="Popup" style="display: none;"><ul class="Popup_title"><li>幻想</li><li>搞笑</li><li>后宫</li><li>科幻</li><li>恐怖</li></ul><ul class="Popup_content"><li>战斗</li><li class="content_li">幻想</li><li>恋爱</li><li>异界</li><li class="content_li">搞笑</li><li>日常</li><li>校园</li><li class="content_li">后宫</li><li>推理</li><li class="content_li">科幻</li><li>治愈</li><li>超能力</li><li class="content_li">恐怖</li><li>伪娘</li><li>乙女</li><li>同人</li><li>悬疑</li><li>网游</li></ul></div></div></div> '
    	+'</div></div></div>'
    ,data: function() {
      return {
        classList: '',
        classArr: [],
        classFlag: false,
        trueClass: 0,
        imgFlag: false,
        Imgbase64: '',
        imgUrl: '',
        ulName: '', // 画师名称
        bookName: '',
        textArea: '',
      }
    },
    ready: function() {
      $('#cropper-img').cropper({
      center:true,
      aspectRatio:1 / 1.4,
      // zoomable: false,
      viewMode:2,
      minContainerHeight: 220,
      minCropBoxWidth:200,
      preview: ".img-preview",
      build: function (e) {
            //console.log(e.type);
          },
          built: function (e) {
            //console.log(e.type);
          },
          cropstart: function (e) {
            //console.log(e.type);
          },
          cropmove: function (e) {
            //console.log(e.type);
          },
          cropend: function (e) {
            //console.log(e.type);
          },
      crop: function(e) {
        $('#dataX').val(Math.round(e.x));
        $('#dataY').val(Math.round(e.y));
        $('#dataHeight').val(Math.round(e.height));
        $('#dataWidth').val(Math.round(e.width));
        $('#dataRotate').val(Math.round(e.rtate));
        $('#dataScaleX').val(Math.round(e.scaleX));
        $('#dataScaleY').val(Math.round(e.scaleY));
      }
    });
    $('#cropper-img').cropper('setDragMode', 'move');
    },
    methods: {
	    submitFn() {
	      if (this.bookName === '') { // 作品名称
	        alert('请填写作品名称');
	        return;
	      }
	      if (this.textArea.length > 300) {
	        alert('简介最多只能300个字!');
	        return;
	      }
	      if (this.bookName.length > 18) {
	        alert('书名最多只能18个字!');
	        return;
	      }
	      const arrTemp = [];
	      for (var i = 0; i < this.classArr.length; i++) {
	          if (this.classArr[i].flag) {
	            arrTemp.push(this.classArr[i].bookTypeId);
	          }
	      }
	      if (arrTemp.length === 0) { // arrTemp 作品分类
	        alert('请选择作品分类');
	        return;
	      }
	      if (this.imgUrl === '') {
	        alert('请上传作品封面图');
	        return;
	      }
	    	var _data = new Object();
		    _data.bookId = '';
		    _data.bookName = this.bookName;
		    _data.bookIntroduction = this.textArea;
		    _data.bookCoverImage = this.imgUrl;
		    _data.sort = "少年";
		    _data.bookTypeList = arrTemp;
	    	//============================================
	    	SZXJ.http(this,'post', PathList.saveOrUpdateBook, _data, 
	        (response) => {
	        location.href = PathList.TemprootPath + '/view/user_info.html#!/bookBlockList';
	      });
	    },
    	//============================================
    	dataURLtoBlob: function(dataurl) {
		    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		    while(n--){
		        u8arr[n] = bstr.charCodeAt(n);
		    }
		    return new Blob([u8arr], {type:mime});
  		},
		  convertCanvasToImage: function(canvas) {
			  var image = new Image();
			  image.src = canvas.toDataURL("image/png");
			  return image;
		  },
      clearImgFn: function(){
        this.$set('imgFlag', false);
        this.$set('Imgbase64', '');
      },
      activeImgFn: function() {
        var This = this;
        // $().cropper("getCroppedCanvas", { width: 320, height: 180 })
        var data = $('#cropper-img').cropper('getImageData');
        var canvas = $('#cropper-img').cropper('getCroppedCanvas', { width: 320, height: 448 });
        // var canvas = $('#cropper-img').cropper('getCroppedCanvas', data);
        var file = this.dataURLtoBlob(canvas.toDataURL('image/png'));
        this.$els.img.src = canvas.toDataURL('image/png');
        var formData = new FormData();
        formData.append("Image", file);
        //============================================
          $.ajax({
              type: 'POST',
              processData: false,  // 告诉jQuery不要去处理发送的数据
              contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
              url: PathList.bookUpload,
              data: formData, 
              beforeSend: function(request) {
                request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
              },
              success: function(data){
                This.imgUrl = data.msg;
                This.clearImgFn();
              },
              error: function(data) {
                
              }
            });
        //============================================
      },
      clickFileActiveFn: function() {
        const ie = navigator.appName === 'Microsoft Internet Explorer' ? 'true' : 'false';
      const file = this.$els.file;
      if (ie === 'true') {
            // document.getElementById('android').click();
           file.click();
        } else {
            const a = document.createEvent('MouseEvents'); // FF的处理
            a.initEvent('click', true, true);
            // document.getElementById('android').dispatchEvent(a);
            file.dispatchEvent(a);
        }
      },
      fileUpload(e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            if (file.type.indexOf('jpeg') !== -1 || file.type.indexOf('png') !== -1) {
              reader.readAsDataURL(file);
              reader.onload = () => {
                this.$set('Imgbase64', URL.createObjectURL(file));
                $('#cropper-img').cropper('reset').cropper('replace', this.Imgbase64);
                this.$set('imgFlag', true);
                this.$els.file.value = null;
              };
            } else {
              alert('只支持jpg与png格式！')
              // this.$set('message', '只支持jpg与png格式！');
            }
        },
      classListFn: function() {
        //============================================
        SZXJ.http(this,'get', PathList.queryBookType, {}, 
            (response) => {
              this.$set('classFlag', true);
              var classArr = response.data;
              if (this.classList) {
                var arrTemp = this.classList.split(",");  
                for (var i = 0; i < classArr.length; i++) {
                  for (var j = 0; j < arrTemp.length; j++) {
                    if (this.arrTemp[j] === classArr[i].bookTypeName) {
                      classArr[i].flag = true;
                    }
                  }
                }
              }
              this.$set('classArr', classArr);
              this.$set('trueClass', 0);
            });
        //============================================
      },
      clickClassFn: function(v) {
        if (this.classArr[v].flag) {
          var obj = this.classArr[v];
          obj.flag = false;
          this.classArr.$set(v, obj);
          this.$set('trueClass', this.trueClass - 1);
        } else {
          if (this.trueClass < 5) {
            var obj = this.classArr[v];
            obj.flag = true;
            this.classArr.$set(v, obj);
            this.$set('trueClass', this.trueClass + 1);
          }
        }
      },
      primaryFn: function() {
        var arrTemp = [];
        for (var i = 0; i < this.classArr.length; i++) {
          if (this.classArr[i].flag) {
            arrTemp.push(this.classArr[i].bookTypeName);
          }
        }
        this.$set('classList', arrTemp.join(','));
        this.$set('classFlag', false);
      },
    },
    });