// 钱包-账单
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var bill = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal Wallet</div><div class="titleBlock_LG">个人账单</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li  v-link="{path: \'/wallet\'}"><span class="circular"></span><span class="title_name">我的钱包</span></li><li  v-link="{path: \'/goodmen\'}"><span class="circular"></span><span class="title_name">我的好人卡</span></li><li class="active" v-link="{path: \'/bill\'}"><span class="circular"></span><span class="title_name">我的账单</span></li></ul>'
      +'<div class="content"><div class="bookBlockList"><div class="bookBlockList_title"><span class="hr"></span><span class="title">支付账单</span><span class="titleTwo">pay treasure bills</span></div><div class="pay-head2">    可提现余额</div><div class="pay-b" @click="registrationFn">提现</div><div class="pay-c" @click="exchangeFn">兑换</div><div class="pay-c" @click="moneyRechargeFn">充值</div>'   
      +'<div v-if="goodmenFlag" class="exchange"><span class="exchange_span">请选择兑换数量:</span><ul class="exchange_ul"><li @click="SubmitgoodFn">×100</li><li @click="SubmitgoodFnTow">×500</li><li @click="SubmitgoodFnThr">×1000</li><li @click="SubmitgoodFnFou">×3000</li><li @click="SubmitgoodFnFix">×5000</li><li @click="SubmitgoodFnSix">×10000</li></ul><div class="exchange_divOne"><span class="exchange_div_span ">*注:每1元钱可购买100张好人卡，当前需使用{{ amount/100 }}金额</span></div><div class="verification_div verification_div_pay  ">购买数量：&nbsp<span @click="downMoneyFnThr" class="verification_letf">-</span><input type="text" maxlength=7  v-model="amount" /><span @click="upMoneyFnThr" class="verification_right">+</span></div><div class="exchange_div" style="display:none"><span>使用金额</span><input type="text" readonly="readonly"  maxlength=5 v-model="amount" />元</div><span class="exchange_spanTow">我的余额：{{totalCashAmount}}</span><div class="exchange_divTow" @click="SubmitgoodmenFn">购买</div><div class="exchange_divTow" @click="SubmitgoodmenFnTow">取消</div></div>'
      +'<div v-if="moneyRecharge" class="moneyRecharge">  <div class="moneyRecharge_header">账户余额充值</div>  <div class="moneyRecharge_name" >昵称&nbsp:<input type="text" v-model="userName" disabled="true" /></div>   <div class="moneyRecharge_name" >账号&nbsp:<input type="text" v-model="telphone " disabled="true"  /></div>   <div class="moneyRecharge_number" >充值金额&nbsp:<input type="" name="" id="" value="" maxlength=5  v-model="amount" maxlenght=5 />元</div>   <div class="moneyRecharge_pay" > <span class="moneyRecharge_choose">支付方式:</span><input type="radio" checked="checked"/><div class="moneyRecharge_img"></div></div>  <div class="moneyRecharge_div moneyRecharge_div_div" @click="rechargeFn" >确认</div>  <div class="moneyRecharge_div moneyRecharge_div_div" @click="SubmitmoneyRechargeFn">取消</div> </div>'
      +'<div v-show="registration == 1" class="registration"><div class="moneyRecharge_header">提现信息登记</div>  <div class="moneyRecharge_name humanName" >真实姓名&nbsp:<input type="text" v-model="name" /></div>   <div class="moneyRecharge_name payNumber"   >支付宝账号&nbsp:<input type="text" v-model="aliAccount"  /></div>  <div class="moneyRecharge_name payNameTow" >确认支付宝账号&nbsp:<input type="text" v-model="againNumber"  /></div>     <div class="moneyRecharge_name verification" >请输入验证码&nbsp:<input type="text" v-model="inputCode" /><span class="verification_span" @click="showCaptchaObj" v-if="verifyFlag">手机验证</span><div class="verification_spanTow" v-else>{{verifyNumber}}重新发送</div><div id="popup-captcha"></div></div> <span class="registration_div_span">*注意：提现信息提交后将无法直接修改，请仔细检查个人信息，确认填写无误后再提交。</span> <div class="moneyRecharge_div" @click="isTrueOrFalseFn"  >确认</div>  <div class="moneyRecharge_div" @click="SubmitregistrationFn" >取消</div>   </div>'
      +'<div v-if="WithdrawalsFlag" class="registration registrationTow "><div class="moneyRecharge_header">提现</div> <span class="exchange_spanTow exchange_spanTowTow">我的余额：{{exchangeableCashAmount}}</span>   <div class="verification_div">提取金额：&nbsp<span @click="downMoneyFn" class="verification_letf">-</span><input type="text" readonly="readonly" v-model="doubleamount" /><span @click="upMoneyFn" class="verification_right">+</span></div><span class="exchange_spanTow exchange_spanTowTow amount_span">好人卡数量：{{givenPayCardAmount}}</span>   <div class="verification_div verification_divTow">提取好人卡：&nbsp<span @click="downMoneyFnTow" class="verification_letf">-</span><input type="text"  v-model="cardAmount" /><span @click="upMoneyFnTow" class="verification_right">+</span></div><div class="moneyRecharge_div"  @click="WithdrawalsFn"   >确认</div>  <div class="moneyRecharge_div" @click="WithdrawalsFnTow" >取消</div>   </div>'
      +'<div v-if="isTrueOrFalse" class="isTrueOrFalse"><div class="isTrueOrFalse_div">提示</div><span class="isTrueOrFalse_span">请注意核对账号信息是否正确，一经核对，不予撤回。是否确认？</span> <div class="moneyRecharge_div isTrueOrFalseDiv" @click="registrationisFlase"  >确认</div>  <div class="moneyRecharge_div isTrueOrFalseDiv" @click="SubmitisTrueOrFalseFn" >取消</div> </div>'
      +'<div v-if="isTru" class="isTrueShow"><div class="isTrueOrFalse"><div class="isTrueOrFalse_div">提示</div><span class="isTrueOrFalse_span">充值是否成功</span> <div class="moneyRecharge_div isTrueOrFalseDiv detailFn" @click="detailFn"  >充值成功</div>  <div class="moneyRecharge_div isTrueOrFalseDiv detailFn" @click="SubmitdetailFn" >遇到问题</div> </div></div>'
      +'<div class="pay-d">￥{{exchangeableCashAmount}}</div><hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /><div class="pay-head2">    历史收入</div><div class="pay-number">    ￥0.00</div>  <div class="pay-check"><a :href="path.TemprootPath + \'/view/user_info.html#!/wallet\'">查看账单</a></div> <ul class="explain">    提现说明：<li>1.提现申请成功过不可以撤回</li><li>2.提现金额为100的整数倍（单位人民币）</li><li>3.申请成功后，工作人员会在7个工作日内将相应的金额打入指定账户</li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
          path: PathList,
        	showFlag: 1,
        	isTru:false,
        	WithdrawalsFlag:false,
        	goodmenFlag:false,
        	moneyRecharge:false,
        	registration:0,
        	isTrueOrFalse:false,
        	amount:0,
        	userName:'',
        	telphone:'',
        	exchangeableCashAmount:'',
        	payCardAmount:'',
        	doubleamount: 0,
        	name:'',
        	alipayAccount:'',
        	cardAmount:0,     
        	givenPayCardAmount:'',
        	verifyFlag: true,
        	verifyNumber: 60, // 验证码重置时间
        	captchaObj: {},
        	uuid: '',
        	inputCode:'',
        	againNumber:'',
        	code:'',
        	aliAccount:'',
        	logId:'',
        	totalCashAmount:'',
        	goodFnSev:'',
        };
      },
      route: {
        data() {
          
        } 
      },
      methods: {
      	setShowFlagFn: function(v) {
			  this.showFlag = v;
		  }, 
		   upMoneyFn:function(){
		     console.log(this.doubleamount);
		     this.doubleamount = parseInt(this.doubleamount, 10) + 100 ;
	     
		    },
		   downMoneyFn:function(){
         console.log(this.doubleamount);
         this.doubleamount= parseInt(this.doubleamount, 10) - 100 ;
         if(this.doubleamount <0){
           this.doubleamount = 0;
         }
       },
       upMoneyFnTow:function(){
         console.log(this.cardAmount);
         this.cardAmount = parseInt(this.cardAmount, 10) + 150 ;       
        },
       downMoneyFnTow:function(){
         console.log(this.cardAmount);
         this.cardAmount= parseInt(this.cardAmount, 10) - 150 ;
         if(this.cardAmount <0){
           this.cardAmount = 0;
         }
       },
       upMoneyFnThr:function(){
         console.log(this.amount);
         this.amount = parseInt(this.amount, 10) + 100 ;       
        },
       downMoneyFnThr:function(){
         console.log(this.amount);
         this.amount= parseInt(this.amount, 10) - 100 ;
         if(this.amount <0){
           this.amount = 0;
         }
       },
       WithdrawalsFn:function(){
         
          this.$set('WithdrawalsFlag', false);
          var _data= {};
          _data.cashAmount = this.doubleamount;
          _data.cardAmount = this.cardAmount;
          SZXJ.http(this,'get', PathList.withdrawals, _data, (response) => { 
            if(response.data.code == 200){
              var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(false, '申请成功');
                      this.amountYueFn();
                      return;
            }            
          });
       },
       WithdrawalsFnTow:function(){
         this.$set('WithdrawalsFlag', false);
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
       registrationisFlase:function(){
         this.$set('registration', 0);         
         this.$set('isTrueOrFalse',false);
           var _data={};
           _data.realName = this.name;
           _data.alipayAccount = this.aliAccount;
           _data.uuid  = this.uuid ; 
           _data.inputCode  = this.inputCode ; 
           SZXJ.http(this,'get', PathList.saveAlipay, _data, (response) => {  
                if(response.data.code == 200){
                  this.$set('WithdrawalsFlag',true);
                }
           });
          
       },
	     SubmitgoodFn:function(){
	       this.$set('amount', 100);
	     },
	     SubmitgoodFnTow:function(){
         this.$set('amount', 500);
       },
       SubmitgoodFnThr:function(){
         this.$set('amount', 1000);
       },
       SubmitgoodFnFou:function(){
         this.$set('amount', 3000);
       },
       SubmitgoodFnFix:function(){
         this.$set('amount', 5000);
       },
       SubmitgoodFnSix:function(){
         this.$set('amount', 10000);
       },
		   isTrueOrFalseFn:function(){
             if(this.againNumber !== this.aliAccount ){
                      var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(true, '两次支付宝账号不正确'); 
                      return;
                 } else if(this.inputCode == ''){
                   var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(true, '验证码不能为空');
                      return;
                 }else{
                   this.$set('isTrueOrFalse', true);
          };    
		   },
		   exchangeFn:function(){
		     this.$set('goodmenFlag', true);
		   },
		   SubmitisTrueOrFalseFn:function(){
         this.$set('isTrueOrFalse', false);
       },
		   registrationFn:function(){
		     this.$set('registration', 1);
		   },
		   SubmitregistrationFn:function(){
         this.$set('registration', 2);
       },
		   moneyRechargeFn:function(){
		      this.$set('moneyRecharge', true);
		   },
		   SubmitmoneyRechargeFn:function(){
		      this.$set('moneyRecharge', false);
		   },

		   SubmitgoodmenFn:function(){
		     if(this.amount % 100 !== 0 ){
		        var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(true, '购买数量必须是100的倍数');
                      return;
		     }else{
		       this.$set('goodmenFlag', false);
           var _data={};
           _data.amount = this.amount/100;
            SZXJ.http(this,'get', PathList.buyCard, _data, (response) => { 
              if(response.data.code == 200 ){
                 var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(false, '购买成功');
                      this.amountYueFn();
                      return;
                  }
            });
		     }          
       },

       SubmitgoodmenFnTow:function(){
         this.$set('goodmenFlag', false);
       },
       detailFn:function(){
         this.$set('isTru', false);
          var _data={};
          _data.logId = this.logId;
          SZXJ.http(this,'get', PathList.detail_21, _data, (response) => { 
              if(response.data.data.orderStatus !== 1){
                var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                Utils.setMessage(true, '充值未完成');
                return;
              }
          });
       },
       SubmitdetailFn:function(){
         this.$set('isTru', false);
       },
        getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
            this.$set('bookList', response.data);
          });
          SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
            this.userName = response.data.status.userName;
            this.telphone = response.data.status.telphone;
          }); 
          
          SZXJ.http(this,'get', PathList.cardamount, {}, (response) => {
            this.payCardAmount = response.data.amount.payCardAmount;
            this.givenPayCardAmount =response.data.amount.givenPayCardAmount;
          });  
        },
        amountYueFn:function(){
          SZXJ.http(this,'get', PathList.amount, {}, (response) => {
            this.exchangeableCashAmount = response.data.amount.exchangeableCashAmount;
            this.totalCashAmount = response.data.amount.exchangeableCashAmount +  response.data.amount.unexchangeableCashAmount + response.data.amount.welfareCashAmount;
          });
        },
       rechargeFn:function(){
          if(this.amount == '' || this.amount <= 0){
             var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                Utils.setMessage(true, '充值金额不能为空或小于0');
                return;
         } else{
           this.$set('moneyRecharge', false);
         }
         
         this.$set('isTru', true);
          var _data={};
          _data.amount = this.amount;
          SZXJ.http(this,'get', PathList.recharge, _data, (response) => { 
            this.logId =response.data.logId;
            console.log(response);
            window.open(response.data.pay_url)
          });
       }
      },
      ready : function (){
      	this.getBookListFn();
      	this.getGeetestFn();
      	this.amountYueFn();
      },
   });
export default bill;   