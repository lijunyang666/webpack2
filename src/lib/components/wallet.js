// 钱包-钱包
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var wallet = Vue.extend({
      template: 
      '<div v-if="flag" class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal Wallet</div><div class="titleBlock_LG">个人账单</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li class="active" v-link="{path: \'/wallet\'}"><span class="circular"></span><span class="title_name">我的钱包</span></li><li  v-link="{path: \'/bill\'}"><span class="circular"></span><span class="title_name">我的账单</span></li></ul>'
      +'<div class="content"><div class="bookBlockList" ><div class="bookBlockList_title"><span class="hr"></span><span class="title">支付账单</span><span class="titleTwo">pay treasure bills</span></div><div class="pay-head">    钱包明细</div><ul class="pay-income"><li>可用余额:</li><li>￥0.00</li><li>总收入:</li><li>￥0.00</li></ul><ul class="pay-a"><li>日期</li><li>收入</li><li>支出</li><li>详情</li></ul><hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /><div class="table-a"><table  border="0" cellspacing="0" cellpadding="0"><tbody style="visibility: hidden;"><tr><td>2016/10/10</td><td>+50</td><td>--</td><td>读者打赏</td></tr><tr><td>2016/10/10</td><td>+50</td><td>--</td><td>读者打赏</td></tr><tr><td>2016/10/10</td><td>+50</td><td>--</td><td>读者打赏</td></tr><tr><td>2016/10/10</td><td>+50</td><td>--</td><td>读者打赏</td></tr><tr><td>2016/10/10</td><td>+50</td><td>--</td><td>读者打赏</td></tr><tr><td>2016/10/10</td><td>+50</td><td>--</td><td>读者打赏</td></tr><tr><td>2016/10/10</td><td>+50</td><td>--</td><td>读者打赏</td></tr><tr><td>2016/10/10</td><td>+50</td><td>--</td><td>读者打赏</td></tr><tr><td>2016/10/10</td><td>+50</td><td>--</td><td>读者打赏</td></tr></tbody></table></div><hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /><div id="page" class="page"><ul><li><a>上一页</a></li><li><a>1</a></li><li class="active"><a>2</a></li><li><a>3</a></li><li><a>4</a></li><li><a>5</a></li><li><a>下一页</a></li><li class="goto"><input type="text" value="" /><span>/1211</span><a>转页</a></li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
          flag: true,
          path: PathList,
        };
      },
      route: {
        data() {
//        this.setFlag();
        } 
      },
      methods: {
//      setFlag: function() {
//        console.log(this.$parent);
//        var url = this.path.TemprootPath + '/view/user_info.html';
//        this.$parent.setMessage(false,'此功能暂未开放！',function() {
//          location.href = url;
//        });
//      },
        getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
            this.$set('bookList', response.data);
          });
        },
      },
      ready : function (){
        // this.setFlag();
      },
   });
export default wallet;