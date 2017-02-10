// 钱包-账单
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var bill = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal Wallet</div><div class="titleBlock_LG">个人账单</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li  v-link="{path: \'/wallet\'}"><span class="circular"></span><span class="title_name">我的钱包</span></li><li class="active" v-link="{path: \'/bill\'}"><span class="circular"></span><span class="title_name">我的账单</span></li></ul>'
      +'<div class="content"><div class="bookBlockList"><div class="bookBlockList_title"><span class="hr"></span><span class="title">支付账单</span><span class="titleTwo">pay treasure bills</span></div><div class="pay-head2">    可用余额</div><div class="pay-b">提现</div><div class="pay-c">兑换</div><div class="pay-c">充值</div>    <div class="exchange"><span class="exchange_span">请选择兑换金额:</span><ul class="exchange_ul"><li>1元</li><li>5元</li><li>10元</li><li>20元</li><li>50元</li><li>100元</li></ul><div class="exchange_divOne"><span class="exchange_div_span">需拥有700好人卡</span></div><div class="exchange_div"><span>其他金额</span><input type="" name="" id="" value="" />元</div><span class="exchange_spanTow">我的好人卡：0</span><div class="exchange_divTow">兑换</div><div class="exchange_divTow">取消</div></div><div class="pay-d">    ￥0.00</div><hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /><div class="pay-head2">    历史收入</div><div class="pay-number">    ￥0.00</div><div class="pay-check">    查看账单</div><ul class="explain">    提现说明：<li>1.提现申请成功过不可以撤回</li><li>2.提现金额为100的整数倍（单位人民币）</li><li>3.申请成功后，工作人员会在30个工作日内将相应的金额打入指定账户</li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
        	showFlag: 1,
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
        getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
            this.$set('bookList', response.data);
          });
        },
      },
      ready : function (){
      	
      },
   });
export default bill;   