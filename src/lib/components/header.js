import Vue from '../../lib/vue.min.js';
import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';
var header = Vue.extend({
  template: '<header class="qcacg-header-parent" id="qcacg-header-parent" style="position:relative"><div class="qcacg-header"><a :href="path.TemprootPath + \'/index.html\'"><div class="logo">轻创文学网</div></a>   <ul class="nav-left">   <li :class="active"><a :href="path.TemprootPath + \'/index.html\'">首页</a></li><li><a :href="path.TemprootPath + \'/view/class.html\'">分类</a></li><li><a :href="path.TemprootPath + \'/view/ranking.html\'">排行榜</a></li><li class="none"><a href="javascript:;">画师</a></li><li class="none"><a href="javascript:;">周边</a></li><li><a :href="path.TemprootPath + \'/view/welfare.html\'">福利</a></li></ul><ul class="nav-right">'
  +'<li v-if="loginFlag" class="liBlock" :style="loginImg !== \'\' ? loginImg:\'\'"><div class="headers_display"><span class="display_user"><a  :href="path.TemprootPath + \'/view/user_info.html\'">{{ userName }}</a></span> <span class="out"><a  href="javascript:;" @click="backLoginFn">退出</a></span>  <div class="header_more"><a :href="path.TemprootPath + \'/view/user_info.html\'">查看更多</a></div></div></a></li>'
  +'<li v-else class="li_login"><a :href="path.TemprootPath + \'/view/login.html\'">登录/注册</a></li>'
  +'<li v-if="loginFlag" class="ul_msg" ><div class="mag_number" v-if="book+official+reply+system > 0" >{{ book+official+reply+system }}</div><a :href="path.TemprootPath + \'/view/user_info.html#!/message\'">消息</a><ul class="li_msg_ul" ><li @click="setreplyFn" class="li_msg_li"><a :href="path.TemprootPath + \'/view/user_info.html#!/message\'">回复我的</a><div class="mag_number_small" v-if="reply > 0"  >{{ reply }}</div></li><li @click="setbookFn" class="li_msg_li"><a :href="path.TemprootPath + \'/view/user_info.html#!/relevant\'">作品相关</a><div class="mag_number_small" v-if="book > 0" >{{ book }}</div></li><li @click="setsystemFn" class="li_msg_li"><a :href="path.TemprootPath + \'/view/user_info.html#!/system\'">系统消息</a><div class="mag_number_small" v-if="system > 0" >{{ system }}</div></li><li @click="setofficialFn" class="li_msg_li"><a :href="path.TemprootPath + \'/view/user_info.html#!/official\'">官方公共</a><div class="mag_number_small" v-if="official > 0" >{{ official }}</div></li></ul></li>'
  +'<li class="publication">'
  +'<a v-if="loginFlag" @click="setHref(path.TemprootPath + \'/view/user_info.html#!/bookBlockList\')" style="color:#FFFFFF">投&nbsp;稿</a>'
  +'<a v-else style="color:#FFFFFF" :href="path.TemprootPath + \'/view/login.html\'">投&nbsp;稿</a>'
  +'</li></ul></div></header>',
  components: {},
  props: {
  	userName: {
      type: String,
    },
    loginImg: {
      type: String,
    },
    active: {
      type: String,
    },
  },
  data:function(){
  	return {
  		path: PathList,
  		loginFlag: false,
  		number1: '',
  		book:'',
  		official:'',
  		reply:'',
  		system:'',
  	}
  },
  methods: {
    setbookFn: function(){
      this.$set('book', 0);
    },
    setofficialFn: function(){
      this.$set('official', 0);
    },
    setreplyFn: function(){
      this.$set('reply', 0);
    },
    setsystemFn: function(){
      this.$set('system', 0);
    },
    backLoginFn: function() {
      this.loginFlag = false;
      
      window.location.reload();
      var _data = {};
      SZXJ.http(this,'get', PathList.logout, {}, (response) => {
       });
       localStorage.removeItem('JSESSIONID');
      window.location.href = this.path.TemprootPath + '/index.html';
    },
    setHref(v) {
      location.href = v;
      const href = window.location.href;
      const str = href.substring(href.lastIndexOf('#!/') + 3, href.length);
      this.$set('active', str);
    },
    getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
            this.$set('bookList', response.data);
          });
        },
  },
  ready: function() {
    SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
      this.loginImg = 'background-image: url('+ this.path.rootPath + response.data.status.userImage +')';
      this.loginFlag = response.data.status.flag;
      this.userName = response.data.status.userName;
      this.book = response.data.book;
      this.official = response.data.official;
      this.reply = response.data.reply;
      this.system = response.data.system;
      this.number1 = response.data.system + response.data.reply + response.data.official + response.data.book;
    });
  },
  route: { data() {} }
});
export default header;





