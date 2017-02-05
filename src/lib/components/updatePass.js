// 个人信息修改密码
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var updatePass = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">contribute</div><div class="titleBlock_LG">个人投稿</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li v-link="{path: \'/info\'}"><span class="circular"></span><span class="title_name">我的信息</span></li><li class="active" v-link="{path: \'/updatePass\'}"><span class="circular"></span><span class="title_name">修改密码</span></li></ul>'
      +'<div class="content"><div class="bookBlockList"><div class="bookBlockList_title"><span class="hr"></span><span class="title">修改密码</span><span class="titleTwo">essential information</span></div>'
     // +'<div class="numberAItwo1"><span class="name1">旧密码：</span><input type="" name="" id="" value="" /></div>'
      +'<div class="numberAItwo2"><span class="name1">新密码：</span><input type="text" v-model="passWord" /><span class="remark1">密码由6-16个字符组成，区分大小写（不能是9位一下的纯数字，不能包含空格）</span></div>'
      +'<div class="numberAItwo3"><span class="name1">确认新密码：</span><input type="password" v-model="passWordConfirm"  /><span class="remark1">密码强度：</span></div>'
      +'<div class="numberAItwo4"><span class="name1">手机验证：</span><input type="password" v-model="telephoneCode" />'
      +'<div class="verify" v-if="verifyFlag" @click="showCaptchaObj">发送验证码</div>'
      +'<div class="verify_no" v-else>{{verifyNumber}}重新发送</div>'
      +'<div id="popup-captcha"></div>'
      +'</div><hr style="border: 1px dotted #E1E1E1; margin:0 0 0 5%;" width="90%" /><div class="btn change" @click="submitFn">确认</div></div></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
        	showFlag: 1,
        	captchaObj: {},
        	verifyFlag: true, // 验证码定时器判断
        	verifyNumber: 60, // 验证码重置时间
        	passWord: '',
        	telephoneCode: '',
        	uuid: '',
        	passWordConfirm: '',
        };
      },
      route: {
        data() {
          
        } 
      },
      methods: {
        submitFn: function() {
          var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
          var _data = {};
          if (this.passWord === '' || this.passWord.length < 6) {
            Utils.setMessage(false, '新密码不允许为空并且长度大于6位');
            return;
          }
          if (this.passWordConfirm === '' || this.passWordConfirm.length < 6) {
            Utils.setMessage(true, '确认新密码不允许为空并且长度大于6位');
            return;
          }
          if (this.telephoneCode === '') {
            Utils.setMessage(true, '手机验证码不允许为空');
            return;
          }
          _data.uuid = this.uuid;
          _data.passWord = this.passWord;
          _data.passWordConfirm = this.passWordConfirm;
          _data.telephoneCode = this.telephoneCode;
          SZXJ.http(this,'post', PathList.updatePassword, _data, (data) => {
            Utils.setMessage(false, data.data.msg);
          });
        },
        verificationTimeFn: function() {
          if (this.verifyNumber === 0) {
            this.$set('verifyNumber', 60);
            this.verifyFlag = true;
            return;
          } else {
            this.$set('verifyNumber', --this.verifyNumber);
            var This = this;
            setTimeout(function(){
              This.verificationTimeFn();
            }, 1000);
          }
        },
        getGeetestFn : function () { // 获取就极验验证码
          SZXJ.http(this,'get', PathList.StartCaptchaServlet, {}, (data) => {
            // 使用initGeetest接口
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
            window.initGeetest({
              gt: data.data.gt,
              challenge: data.data.challenge,
              product: "popup",
              // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
              offline: !data.data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            },
            this.handlerPopup);
          });
        },
        showCaptchaObj() {
          this.captchaObj.show();
        },
        handlerPopup: function(captchaObj) {
          this.captchaObj = captchaObj;
          var This = this;
          captchaObj.onReady(function() {
          captchaObj.onSuccess(function() {
              var validate = captchaObj.getValidate();
              var userEntity = {};
              userEntity.geetest_challenge = validate.geetest_challenge;
              userEntity.geetest_validate = validate.geetest_validate;
              userEntity.geetest_seccode = validate.geetest_seccode;
              SZXJ.http(This,'post', PathList.updatePasswordTelephoneCode, userEntity, (data) => {
                This.uuid =  data.data.updateVariId;
                This.verifyFlag = false;
                This.verificationTimeFn();
                // 60秒倒计时
              },(err) => {
                if (data.err.code === 1002) {
                  This.getGeetestFn();
                }
              });
            })
          });
          // 将验证码加到id为captcha的元素里
          captchaObj.appendTo("#popup-captcha");
          // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
        },
        setShowFlagFn: function(v) {
  			  this.showFlag = v;
  		  },
        getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
            this.$set('bookList', response.data);
          });
        },
      },
      ready : function (){
      	this.getGeetestFn();
      },
   });
export default updatePass;