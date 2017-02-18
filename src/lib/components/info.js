// 个人信息-基本信息
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import dateTime from '../../lib/apis/Date.js';
import PathList from '../../lib/apis/conf.js';
var info = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">contribute</div><div class="titleBlock_LG">个人投稿</div></div><div class="user_info_content"><div class="contribution relative">'
      +'<ul class="nav"><li class="one active" v-link="{path: \'/info\'}"><span class="circular"></span><span class="title_name">我的信息</span></li><li  v-link="{path: \'/updatePass\'}"><span class="circular"></span><span class="title_name">修改密码</span></li></ul>'
      +'<div class="content"><div class="bookBlockList"><div class="bookBlockList_title"><span class="hr"></span><span class="title">基本信息</span><span class="titleTwo">essential information</span></div><div class="portrait relative;" :style="loginImg"><span v-if="sex == \'男生\'" class="attention-name-sex attention-name-sexTow"><img src="../../img/sex_003.png" alt="" /></span><span v-if="sex == \'女生\'"  class="attention-name-sex attention-name-sexTow"><img src="../../img/sex_004.png" alt="" /></span>'
      +'<div v-show="imgFlag" style="top: 100px;left:400px;z-index:99999;background-color: #FFFFFF;width: 335px;height: 360px;box-shadow: 1px 1px 15px rgba(0,0,0,0.3);padding: 50px 50px 40px 70px;position: absolute;"><input type="file" v-el:file style="display: none;" v-on:change="fileUpload" /><style> .cropper-container { margin-left: -116px !important; }</style><div style="position: absolute;top: 50px;left: 50%;width: 232px;height: 232px;"><img id="cropper-img" :src="Imgbase64 !== \'\' ? Imgbase64 : \'../img/232x232.jpg\' " style="width: 100%;height: 100%;border: 1px solid #989898;background-color: #e5e5e5;display: block;margin-left: -116px;"/></div><div style="position: absolute;top: 15px;right:195px;width:84px;font-size: 12px;text-align: center;line-height: 26px;height: 26px;">当前图片</div><div  style="position: absolute;right: 85px;top: 15px;width: 84px;height: 26px;border-radius: 6px;"><div style="border-radius: 6px;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="clickFileActiveFn">重新选择</div></div><div  style="position: absolute;right: 85px;top:300px;width: 84px;height: 26px;border-radius: 6px;"><div style="border-radius: 6px;width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="clearImgFn">取消上传</div></div><div  style="position: absolute;right: 180px;top:300px;width: 84px;height: 26px;border-radius: 6px;"><img src="../img/gou.png" style="position: absolute;top: 5px;left: 5px;"/><div style="padding-left: 10px;border-radius: 6px;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="activeImgFn">确认上传</div></div><div style="position: absolute;width:100%;bottom:10px;left: 0px;font-size: 14px;text-align: center;">支持JPG,PNG等格式,图片需小于2M</div></div>'
      +'</div><div class="messageAI"><div class="up clear"><span class="up-name ">{{ userInfoList.userName }}</span><ul><li class="up-word">关注：<a v-if="attention.length !== 0">{{attention.length}}</a><a v-else>0</a></li><li class="up-word">粉丝：<a v-if="attentionTow.length !== 0">{{attentionTow.length}}</a><a v-else>0</a></li><li style="display:none;" class="up-word">好人卡：0</li></ul></div><div class="centreAI"><img class="imgAI1" src="../img/info_09.gif"/><span class="font">注册于{{ szxj.getLocalDate(userInfoList.createDate) }}</span><span>uid:&nbsp;{{ userInfoList.userId }}</span></div><div class="downAI"><span>签名：</span>'
      +'<input type="text" v-model="userInfoList.information" v-if="inputFlag"  placeholder="最多保存30个字符" style="width:440PX;margin-right:20px;padding-left:10px" />'
      +'<input type="text" v-model="userInfoList.information" v-else placeholder="请输入个人简介" style="width:440PX;margin-right:20px;padding-left:10px;border: 2px solid rgba(0,0,0,0);" readonly="readonly" />'
      +'<img src="../img/info_14.jpg" style="cursor:pointer" @click="setInputFlag" /></div></div><hr style="border: 1px dotted #E1E1E1; margin:0 0 0 5%;" width="90%" /><div class="change " @click="clickFileActiveFn">更换头像</div></div>'
      +'<div class="bookBlockList relative"><div v-if="infoFlag" style="position: absolute;top: 0px;left: 0px;bottom:0px;right: 0px;width: 100%;height: 230px;z-index: 999;"></div><div class="bookBlockList_title"><span class="hr"></span><span class="title">详细信息</span><span class="titleTwo">detailed information</span></div>'
      +'<div class="nameAI"><span class="name1">昵称：</span><input :style="infoFlag ? \'border: 0px;padding-left: 5px;\':\'padding-left: 5px;\'" type="text" v-model="userName" /><span class="remarkAI">注： 修改名称需要600张好人卡</span></div><div class="sexAI"><span class="name1">性别：</span><label class="butt"><input type="radio" name="sex" v-model="userInfoList.sex"  value="男生" checked="checked" />男</label><label class="butt"><input type="radio" name="sex" value="女生" v-model="userInfoList.sex" />女</label></div>'
      +'<div class="birthday"><span class="name1">生日：</span><input :style="infoFlag ? \'border: 0px;padding-left: 5px;\':\'padding-left: 5px;\'" type="text" placeholder="请选择生日时间" v-model="userInfoList.birthday" index="0" readonly="readonly" style="cursor: pointer;" @click="showDate" />'
      +'<date-time :type.sync="Datetype" :show.sync="showA" :value.sync="userInfoList.birthday" :x="x" :y="y" :begin="begin" :end="end" :range="range"></date-time>'
      +'</div><div class="numberAI"><span class="name1">手机号码：</span><input type="text" v-model="userInfoList.telephone" style="border: none;" /><span class="remarkAI">注： 手机号码暂不支持修改</span></div><hr style="width:90%;border: 1px dotted #E1E1E1 ; margin:20px 0 0 5%;"/>'
      +'<div class="change2 " v-if="infoFlag" @click="setInfoFlag">修改</div><div class="change2 " v-else @click="submitInfoFlag">保存</div></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
        	showFlag: 1,
        	inputFlag: false,
        	infoFlag: true, // 个人信息修改哪里的遮罩层
        	userInfoList: {},
        	szxj: SZXJ,
        	userName: '',
        	imgFlag: false,
	        Imgbase64: '',
	        imgUrl: '',
	        loginImg: '',
	        attention:[],
	        attentionTow:[],
	        sex:'',
	        RequestObj: {
            status: 0,
            pageNo: 1,
            pageSize: 5,
          },
           RequestObjTow: {
            status: 1,
            pageNo: 1,
            pageSize: 5,
          },
	        // 时间控件
          showA: false,
          showB: false,
          Datetype: 'date', // date datetime datetime24
          begin: '',
          end: '',
          x: 0,
          y: 0,
          range: false,
          // 时间控件结束
        };
      },
      components: {
        dateTime,
      },
      route: {
        data() {
          this.getBookListFn();
        } 
      },
      methods: {
        showDate(e) {
          e.stopPropagation();
          const that = this;
          that.showA = false;
          that.showB = false;
          if (e.target.getAttribute('index') === '0') {
            that.showA = true;
          } else if (e.target.getAttribute('index') === '1') {
            that.showB = true;
          }
          that.x = e.target.offsetLeft;
          that.y = e.target.offsetTop + e.target.offsetHeight + 8;
          const bindHide = (_event) => {
            _event.stopPropagation();
            if (e.target.getAttribute('index') === '0') {
              that.showA = false;
            } else if (e.target.getAttribute('index') === '1') {
              that.showB = false;
            }
            document.removeEventListener('click', bindHide, false);
          };
          setTimeout(() => {
            document.addEventListener('click', bindHide, false);
          }, 500);
          return false;
        },
      	// 图片上传 start
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
	        var data = $('#cropper-img').cropper('getImageData');
	        var canvas = $('#cropper-img').cropper('getCroppedCanvas', { width: 136, height: 136 });
	        var file = this.dataURLtoBlob(canvas.toDataURL('image/png'));
	        var formData = new FormData();
	        formData.append("Image", file);
	          $.ajax({
	              type: 'POST',
	              processData: false,  // 告诉jQuery不要去处理发送的数据
	              contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
	              url: PathList.userUpload,
	              data: formData, 
	              beforeSend: function(request) {
	                request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
	              },
	              success: function(data){
	                This.imgUrl = data.msg;
	                This.clearImgFn();
	                var imgD = canvas.toDataURL('image/png');
	                This.loginImg = 'background-image: url('+ imgD +')';
	                This.$parent.loginImg = 'background-image: url('+ imgD +')';
	              },
	              error: function(data) {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
	              }
	           });
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
      		this.$set('imgFlag', true);
          var file = e.target.files[0];
          var reader = new FileReader();
          if (file.type.indexOf('jpeg') !== -1 || file.type.indexOf('png') !== -1) {
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.$set('Imgbase64', URL.createObjectURL(file));
              $('#cropper-img').cropper('reset').cropper('replace', this.Imgbase64);
              this.$els.file.value = null;
            };
          } else {
           var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
           Utils.setMessage(true, '只支持jpg与png格式');
            // alert('只支持jpg与png格式！')
            // this.$set('message', '只支持jpg与png格式！');
          }
        },
      	// 图片上传 end
      	setInfoFlag: function(v) {
      		this.infoFlag = false;
      	},
      	submitInfoFlag: function(v) {
      		var _data = {};
      		_data.userName = this.userName;
      		_data.birthday = this.userInfoList.birthday;
      		if (this.userInfoList.sex === '男生') {
      			_data.sex = 2;
      		} else {
      			_data.sex = 1;
      		}
      		// _data.Information = this.userInfoList.information;
      		SZXJ.http(this,'post', PathList.updateUser, _data, (response) => {
            if (response.data.msg === 'success') {
            	this.infoFlag = true;
            	this.getBookListFn();
            }
          });
      	},
      	setInputFlag: function(v) {
      		if (this.inputFlag) {
      			this.setInformation();      			
      		} else {
      			this.inputFlag = true;
      		}
      	},
      	setInformation: function(v) {
      		var _data = {};
      		if(this.userInfoList.information) {
      		  _data.information = this.userInfoList.information;  
      		} else {
      		  this.inputFlag = false;
      		  return;
      		}
      		SZXJ.http(this,'post', PathList.updateUser, _data, (response) => {
          	if (response.data.msg === 'success') {
            	this.inputFlag = false;
            	this.getBookListFn();
            }
          });
      	},
      	setShowFlagFn: function(v) {
					this.showFlag = v;
				},
        getBookListFn: function() {
          var _data = {};
         
          SZXJ.http(this,'get', PathList.queryUser, {}, (response) => {
            this.sex= response.data.sex;
          	this.userInfoList = response.data;
          	this.userName = this.userInfoList.userName;
          	this.loginImg = 'background-image: url('+ PathList.rootPath + this.userInfoList.userHead +')';
            console.log(response);
          });
        
          SZXJ.http(this,'get', PathList.myCareOrCareMe, this.RequestObj, (response) => {
            this.attention = response.data.attention;
            console.log(this.bookList);
            });
            
          SZXJ.http(this,'get', PathList.myCareOrCareMe, this.RequestObjTow, (response) => {
            this.attentionTow = response.data.attention;
            console.log(this.bookList);
            });
          
        },
      },
      ready : function (){
	      $('#cropper-img').cropper({
		      center:true,
		      aspectRatio:1 / 1,
		      // zoomable: false,
		      viewMode:2,
		      minContainerHeight: 136,
		      minCropBoxWidth:136,
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
   });
   export default info;