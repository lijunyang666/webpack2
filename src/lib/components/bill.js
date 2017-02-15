// 钱包-账单
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var bill = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal Wallet</div><div class="titleBlock_LG">个人账单</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li  v-link="{path: \'/wallet\'}"><span class="circular"></span><span class="title_name">我的钱包</span></li><li  v-link="{path: \'/goodmen\'}"><span class="circular"></span><span class="title_name">好人卡</span></li><li class="active" v-link="{path: \'/bill\'}"><span class="circular"></span><span class="title_name">我的账单</span></li></ul>'
      +'<div class="content"><div class="bookBlockList"><div class="bookBlockList_title"><span class="hr"></span><span class="title">支付账单</span><span class="titleTwo">pay treasure bills</span></div><div class="pay-head2">    可用余额</div><div class="pay-b" @click="registrationFn">提现</div><div class="pay-c" @click="exchangeFn">兑换</div><div class="pay-c" @click="moneyRechargeFn">充值</div>'   
      +'<div v-if="exchangeFlag"  class="exchange"><span class="exchange_span">请选择兑换金额:</span><ul class="exchange_ul"><li>1元</li><li>5元</li><li>10元</li><li>20元</li><li>50元</li><li>100元</li><li>200元</li><li>500元</li></ul><div class="exchange_divOne"><span class="exchange_div_span">需拥有700好人卡</span></div><div class="exchange_div"><span>其他金额</span><input type="" name="" id="" value="" maxlength=5 />元</div><span class="exchange_spanTow">我的好人卡：0</span><div class="exchange_divTow" @click="SubmitexchangeFn">兑换</div><div class="exchange_divTow" @click="SubmitexchangeFn">取消</div><span class="exchange_divTow_spanTow" @click="goodmenFn">>>好人卡充值</span></div>'
      +'<div v-if="goodmenFlag" class="exchange"><span class="exchange_span">请选择兑换数量:</span><ul class="exchange_ul"><li>×100</li><li>×200</li><li>×500</li><li>×1000</li><li>×3000</li><li>×5000</li><li>×10000</li></ul><div class="exchange_divOne"><span class="exchange_div_span">需拥有余额100</span></div><div class="exchange_div"><span>其他数量</span><input type="" name="" id="" value="" maxlength=5 v-model="amount" />×100张</div><span class="exchange_spanTow">我的余额：0</span><div class="exchange_divTow" @click="SubmitgoodmenFn">购买</div><div class="exchange_divTow" @click="SubmitgoodmenFnTow">取消</div><span class="exchange_divTow_spanTow" @click="exchangeFn">>>兑换余额</span></div>'
      +'<div v-if="moneyRecharge" class="moneyRecharge">  <div class="moneyRecharge_header">账户余额充值</div>  <div class="moneyRecharge_name" >昵称&nbsp:<input type="text" v-model="userName" disabled="true" /></div>   <div class="moneyRecharge_name" >账号&nbsp:<input type="text" v-model="telphone " disabled="true"  /></div>   <div class="moneyRecharge_number" >充值金额&nbsp:<input type="text" v-model="amount" maxlenght=5 />元</div>   <div class="moneyRecharge_pay" > <span class="moneyRecharge_choose">支付方式:</span><input type="radio" checked="checked"/><div class="moneyRecharge_img"></div>  </div>  <div class="moneyRecharge_div" @click="rechargeFn" >确认</div>  <div class="moneyRecharge_div" @click="SubmitmoneyRechargeFn">取消</div> </div>'
      +'<div v-if="registration" class="registration"><div class="moneyRecharge_header">提现信息登记</div>  <div class="moneyRecharge_name humanName" >真实姓名&nbsp:<input type="text" /></div>   <div class="moneyRecharge_name payNumber" >支付宝账号&nbsp:<input type="text" /></div>  <div class="moneyRecharge_name payNameTow" >确认支付宝账号&nbsp:<input type="text"  /></div>     <div class="moneyRecharge_name verification" >请输入验证码&nbsp:<input type="text" /><span class="verification_span">手机验证</span></div> <span class="registration_div_span">*注意：提现信息提交后将无法直接修改，请仔细检查个人信息，确认填写无误后再提交。</span> <div class="moneyRecharge_div" @click="isTrueOrFalseFn"  >确认</div>  <div class="moneyRecharge_div" @click="SubmitregistrationFn" >取消</div>   </div>'
      +'<div v-if="isTrueOrFalse" class="isTrueOrFalse"><div class="isTrueOrFalse_div">提示</div><span class="isTrueOrFalse_span">请注意核对账号信息是否正确，一经核对，不予撤回。是否确认提现？</span> <div class="moneyRecharge_div isTrueOrFalseDiv"  >确认</div>  <div class="moneyRecharge_div isTrueOrFalseDiv" @click="SubmitisTrueOrFalseFn" >取消</div> </div>'
      +'<div class="pay-d">￥0.00</div><hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /><div class="pay-head2">    历史收入</div><div class="pay-number">    ￥0.00</div>  <div class="pay-check"><a :href="path.TemprootPath + \'/view/user_info.html#!/wallet\'">查看账单</a></div> <ul class="explain">    提现说明：<li>1.提现申请成功过不可以撤回</li><li>2.提现金额为100的整数倍（单位人民币）</li><li>3.申请成功后，工作人员会在30个工作日内将相应的金额打入指定账户</li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
          path: PathList,
        	showFlag: 1,
        	exchangeFlag:false,
        	goodmenFlag:false,
        	moneyRecharge:false,
        	registration:false,
        	isTrueOrFalse:false,
        	amount:'',
        	userName:'',
        	telphone:'',
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
		   isTrueOrFalseFn:function(){
		     this.$set('isTrueOrFalse', true);
		   },
		   SubmitisTrueOrFalseFn:function(){
         this.$set('isTrueOrFalse', false);
       },
		   registrationFn:function(){
		     this.$set('registration', true);
		   },
		   SubmitregistrationFn:function(){
         this.$set('registration', false);
       },
		   moneyRechargeFn:function(){
		      this.$set('moneyRecharge', true);
		   },
		   SubmitmoneyRechargeFn:function(){
		      this.$set('moneyRecharge', false);
		   },
		   goodmenFn:function(){
		      this.$set('exchangeFlag', false);
		      this.$set('goodmenFlag', true);

		   },
		   SubmitgoodmenFn:function(){
          this.$set('goodmenFlag', false);
          var _data={}
          _data.amount = this.amount;
          SZXJ.http(this,'get', PathList.buyCard, _data, (response) => { 
            
          });
       },
       SubmitgoodmenFnTow:function(){
         this.$set('goodmenFlag', false);
       },
		   exchangeFn:function(){
		      this.$set('exchangeFlag', true);
		      this.$set('goodmenFlag', false);
		   },
		   SubmitexchangeFn:function(){
          this.$set('exchangeFlag', false);
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
        },
       rechargeFn:function(){
         this.$set('moneyRecharge', false);
          var _data={};
          _data.amount = this.amount;
          SZXJ.http(this,'get', PathList.recharge, _data, (response) => { 
            console.log(response);
          });

       }
      },
      ready : function (){
      	this.getBookListFn();
      },
   });
export default bill;   