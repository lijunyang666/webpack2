import Vue from '../../lib/vue.min.js';
import VueValidator from '../../lib/vue-resource.min.js';
import VueRouter from '../../lib/vue-router.min.js';
Vue.use(VueValidator);
Vue.use(VueRouter);
import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import headerOrfooter from '../../lib/require/headerOrfooter.js';
headerOrfooter();

var indexHtml = new Vue({
      el: '#app',
      data: {
        path: PathList,
        telephone: '', // 手机号码
        verification: '', // 手机验证码
        username: '', // 昵称
        password: '', // 密码
        password2: '', // 确认密码
        uid: '', // 推荐人
        verificationBtnTime: 60, // 验证码时间
        verificationBtnFlag: true, // 验证码状态
        captchaObj: {},
        verificationFlag: false,
      },
      methods: {
        verificationTimeFn: function() {
          if (this.verificationBtnTime === 0) {
            this.$set('verificationBtnTime', 60);
            this.verificationBtnFlag = true;
            return;
          } else {
            this.$set('verificationBtnTime', --this.verificationBtnTime);
            var This = this;
            setTimeout(function(){
              This.verificationTimeFn();
            }, 1000);
          }
        },
        verificationBtn :function() {
          this.verificationFlag = true;
          this.captchaObj.show();
        },
        register :function(validate) {
          var registCodeId = localStorage.getItem('verificationId');
          var _data = {};
          _data.registCodeId = registCodeId;
          _data.telephone = this.telephone;
          _data.telephoneCode = this.verification;
          _data.uuid = registCodeId;
          _data.userName = this.username;
          _data.passWord = this.password;
          _data.passWordConfirm = this.password2;
          if (this.uid !== '') {
            _data.invitePeople = this.uid;
          }
          _data.geetestChallenge = validate.geetest_challenge;
          _data.geetestValidate = validate.geetest_validate;
          _data.geetestSeccode = validate.geetest_seccode;
          SZXJ.http(this,'post', PathList.register, _data, (response) => {
              location.href = this.path.TemprootPath + '/view/login.html';
          });
        },
        handlerPopup: function(captchaObj) {
          this.captchaObj = captchaObj;
          var This = this;
          captchaObj.onReady(function() {
            // 设置验证的
            $.validator.setDefaults({
              submitHandler: function() {
                captchaObj.show();
              },
              showErrors: function(map, list) {
                // there's probably a way to simplify this
                var focussed = document.activeElement;
      
                if (focussed && $(focussed).is("input, textarea")) {
                  $(this.currentForm).tooltip("close", {
                    currentTarget: focussed
                  },true)
                }
      
                this.currentElements.removeAttr("title").removeClass("ui-state-highlight");
                $.each(list,
                function(index, error) {
                  $(error.element).attr("title", error.message).addClass("ui-state-highlight");
                });
      
                if (focussed && $(focussed).is("input, textarea")) {
                  $(this.currentForm).tooltip("open", {
                    target: focussed
                  });
                }
              }
            });
      $('.btn_submit').click(function() {
        $('#regist').submit();
      });

      $("#regist").validate({
        rules: {
          verification: {
            required: true,
            minlength: 6,
            number: true
          },
          username: "required",
          user: {
            required: true,
            minlength: 11,
            number: true
          },
          password: {
            required: true,
            minlength: 6
          },
          password2: {
            required: true,
            minlength: 6
          },
        },
        messages: {
          verification: {
            required: "此为必填项",
            minlength: "长度最小为6位！",
            number: "必须是数字"
          },
          username: "此为必填项",
          user: {
            required: "此为必填项",
            minlength: "长度最小为11位！",
            number: "必须是数字"
          },
          password: {
            required: "此为必填项",
            minlength: "长度最小为6位！"
          },
          password2: {
            required: "此为必填项",
            minlength: "长度最小为6位！"
          },
        }
      });

      $("#regist input:not(:submit)").addClass("ui-widget-content");

      $(":submit").button();
      // 极验验证成功
      captchaObj.onSuccess(function() {
        var validate = captchaObj.getValidate();
        if (!validate) {
          //  alert('请先完成验证！');
          //  return;
        }
        
        if (This.verificationFlag) {
          var _data = {};
          _data.telephone = this.telephone;
          _data.geetest_challenge = validate.geetest_challenge;
          _data.geetest_validate = validate.geetest_validate;
          _data.geetest_seccode = validate.geetest_seccode;
          SZXJ.http(This,'post', PathList.registerTelephoneCode, _data, (data) => {
            This.verificationBtnFlag = false;
            This.verificationTimeFn();
            localStorage.setItem('verificationId', data.data.verificationId);
          });
        } else {
          This.register(validate);
        }
        This.verificationFlag = false;
//      $.ajax({
//        url: PathList.VerifyLoginServlet,
//        // 进行二次验证
//        type: "post",
//        dataType: "json",
//        data: {
//          // 二次验证所需的三个值
//          geetest_challenge: validate.geetest_challenge,
//          geetest_validate: validate.geetest_validate,
//          geetest_seccode: validate.geetest_seccode,
//          // telephone
//        },
//        success: function(data) {
//          if (data && (data.status === "success")) {
//            This.register();
//          } else {
//            alert('服务端验证异常！');
//          }
//        },
//        error: function(data) {
//          alert(JSON.parse(data.responseText).msg);
//        },
//      });

      });
    });
    // 将验证码加到id为captcha的元素里
    captchaObj.appendTo("#popup-captcha");
    // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
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
    }
  },
  ready: function() {
    this.getGeetestFn();
  },
});

"use strict"
$(function() {
  $('.regist').animate({
    height: '512px'
  });
  $('.regist').slideDown(1000);
  $("#regist").tooltip({
    show: false,
    hide: false
  });
});