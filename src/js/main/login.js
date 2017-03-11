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
    remeberme:'',
    telephone:'',
    password:'',
  },
  methods: {
    handlerPopup: function(captchaObj) {
      var This = this;
      captchaObj.onReady(function() {
        $('.btn_submit').click(function() {
          $('#Login').submit();
        });
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
              },
              true);
            }
            this.currentElements.removeAttr("title").removeClass("ui-state-highlight");
            $.each(list,
            function(index, error) {
              $(error.element).attr("title", error.message).addClass("ui-state-highlight");
            });
            if (focussed && $(focussed).is("input, textarea")) {
              $(this.currentForm).tooltip("open", {target: focussed});
            }
          }
        });
        $("#Login").validate({
          rules: {
            user: {
              required: true,
              minlength: 11,
              number: true
              
            },
            password: {
              required: true,
              minlength: 6
            },
          },
          messages: {
            user: {
              required: "此为必填项",
              minlength: "长度最小为11位！",
              number: "必须是数字"
            },
            password: {
              required: "此为必填项",
              minlength: "长度最小为6位！"
            },
          }
        });
        $("#Login input:not(:submit)").addClass("ui-widget-content");
        $(":submit").button();
        captchaObj.onSuccess(function() {
          var validate = captchaObj.getValidate();
          if (!validate) {
            //  alert('请先完成验证！');
            //  return;
          }       
          var userEntity = new Object();
          var name = document.getElementsByName('user');
          var passworld = document.getElementsByName('password');
          userEntity.telephone = name[0].value;
          userEntity.passWord = passworld[0].value;
          userEntity.geetest_challenge = validate.geetest_challenge;
          userEntity.geetest_validate = validate.geetest_validate;
          userEntity.geetest_seccode = validate.geetest_seccode;
          if(document.getElementsByClassName('Login_input')[0].checked ){
              userEntity.remeberme  = 1 ;
          }          
          SZXJ.http(This,'post', PathList.VerifyLoginServlet, userEntity, (data) => {
            localStorage.setItem('JSESSIONID', data.data.msg);
            location.href = PathList.TemprootPath + '/view/user_info.html';
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

  },
  ready: function() {
    this.getGeetestFn();
  },
});


"use strict"
$(function() {
  // 主URL地址
  // 登入框动态弹出 start
  $('.Login').animate({
    height: '350px'
  });
  $('.Login').slideDown(1000);
  $("#Login").tooltip({
    show: false,
    hide: false
  });
});