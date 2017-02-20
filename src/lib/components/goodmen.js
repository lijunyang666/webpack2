// 钱包-钱包
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var goodmen = Vue.extend({
      template: 
      '<div v-if="flag" class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal Wallet</div><div class="titleBlock_LG">个人账单</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li  v-link="{path: \'/wallet\'}"><span class="circular"></span><span class="title_name">我的钱包</span></li><li class="active"  v-link="{path: \'/goodmen\'}"><span class="circular"></span><span class="title_name">我的好人卡</span></li><li  v-link="{path: \'/bill\'}"><span class="circular"></span><span class="title_name">我的账单</span></li></ul>'
      +'<div class="content"><div class="bookBlockList" ><div class="bookBlockList_title"><span class="hr"></span><span class="title">支付账单</span><span class="titleTwo">pay treasure bills</span></div><div class="pay-head">好人卡明细</div><ul class="pay-incomeTow"><li >我的好人卡:</li><li class="moneyTow" v-if="payCardAmount >= 1">{{ payCardAmount }}</li><li class="moneyTow" v-else>0</li><li class="goodmanTow">获得好人卡:</li><li class="money" v-if="givenPayCardAmount >= 1">{{ givenPayCardAmount }}</li><li class="money" v-else>0</li></ul><ul class="pay-a"><li>日期</li><li>收入</li><li>支出</li><li>详情</li></ul><hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /><div class="table-a"><table  border="0" cellspacing="0" cellpadding="0"><tbody  ><tr v-for="obj in list"><td>{{ szxj.getLocalTimeTwo(obj.createTime) }}</td><td v-if=" data.userName == obj.paiedUserName ">+{{ obj.payCardAmount + obj.welfareCardAmount }}</td><td v-else>--</td><td v-if=" data.userName !== obj.paiedUserName ">-{{ obj.payCardAmount + obj.welfareCardAmount }}</td><td v-else>--</td><td v-if="obj.typeDescription == 2200">每日签到</td><td v-if="obj.typeDescription == 2201">打赏好人卡</td><td v-if="obj.typeDescription == 2202">购买好人卡</td><td v-if="obj.typeDescription == 2203">好人卡提现</td><td v-if="obj.typeDescription == 2205">修改昵称</td></tr></tr></tbody></table></div><hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" />'
      +'<div id="page" class="page" ><ul><li class="btn" @click="setPage((RequestObj.pageNum - 1) >= 1 ? (RequestObj.pageNum - 1) : 1)"><a>上一页</a></li><li v-if="(($index + 1)<= 5 && RequestObj.pageNum< 3 || (($index + 1) > RequestObj.pageNum - 3 &&  $index< RequestObj.pageNum)) || ( (($index + 1)<= RequestObj.pageNum + 2 &&　($index + 1) > RequestObj.pageNum) || (RequestObj.pageNum > obj.pageCount - 3 && ($index + 6) > obj.pageCount) )" :class="objTemp == RequestObj.pageNum? \'active\':\'\'" v-for="objTemp in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li><li class="btn" @click="setPage((RequestObj.pageNum + 1)<= obj.pageCount ? (RequestObj.pageNum + 1) : obj.pageCount)"><a>下一页</a></li><li class="goto"><input type="text" v-model="pageNum" style="text-align: center;"/><span>{{ RequestObj.pageNum }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage(pageNum)">转页</a></li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
          szxj: SZXJ,
          flag: true,
          path: PathList,
          exchangeableCashAmount:'',
          totalAmount:'',
          givenPayCardAmount:'',
          payCardAmount:'',
          pageSize:10,  // 每页条数
          list:[],
          RequestObj:{
            pageNum: 1,
            pageSize: 10,
          },
          page: [],
          obj: {
            p: 1, // 页码
            n: 10,
            pageCount: 1,
          },
        };
      },
      route: {
        data() {
//        this.setFlag();
        } 
      },
      methods: {
        setFlag: function() {
          console.log(this.$parent);
          var url = this.path.TemprootPath + '/view/user_info.html';
          this.$parent.setMessage(false,'此功能暂未开放！',function() {
            location.href = url;
          });
        },
        setPageCount: function(v) {
          var obj = this.obj;
          obj.pageCount =  v;
          this.page = [];
          for (var i = 0; i < obj.pageCount; i++) {
            this.page.push(i+1);
          } 
          this.$set('obj', obj);
        },
        setPage: function(v) {
          if (!v || v > this.obj.pageCount || v <= 0 || v.toString().search(/[^0-9]/g) !== -1 ) {
            return;
          }
          var obj = this.RequestObj;
          obj.pageNum = v;
          this.$set('RequestObj', obj);
          this.getCardlistFn(); // 请求
        },
        getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
            this.$set('bookList', response.data);
          });
          SZXJ.http(this,'get', PathList.amount, {}, (response) => {
            this.exchangeableCashAmount = response.data.amount.exchangeableCashAmount;
            this.totalAmount = response.data.amount.unexchangeableCashAmount + response.data.amount.exchangeableCashAmount;
          });
          SZXJ.http(this,'get', PathList.cardamount, {}, (response) => {
            this.givenPayCardAmount = response.data.amount.givenPayCardAmount + response.data.amount.givenWelfareCardAmount;
            this.payCardAmount = response.data.amount.payCardAmount;
          });  
          SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
            this.$set('data', response.data.status);

            });  
        },
        getCardlistFn:function(){
          var _data=this.RequestObj;         
          SZXJ.http(this,'get', PathList.cardlist, this.RequestObj, (response) => {
            this.list = response.data.data.list;
            this.RequestObj.pageNum = response.data.data.pageNum;
            this.setPageCount(response.data.data.pages);
          });  
        },
      },
      ready : function (){
        // this.setFlag();
        this.getBookListFn();
        this.getCardlistFn();
      },
   });
export default goodmen;