import Vue from '../../lib/vue.min.js';
import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';
var header = Vue.extend({
  template: '<header class="qcacg-header-parent" id="qcacg-header-parent" style="position:relative"><div class="qcacg-header"><a :href="path.TemprootPath + \'/index.html\'"><div class="logo">轻创文学网</div></a>   <ul class="nav-left">   <li :class="active"><a :href="path.TemprootPath + \'/index.html\'">首页</a></li><li><a :href="path.TemprootPath + \'/view/class.html\'">分类</a></li><li><a :href="path.TemprootPath + \'/view/ranking.html\'">排行榜</a></li><li class="none"><a href="javascript:;">画师</a></li><li class="none"><a href="javascript:;">周边</a></li><li><a :href="path.TemprootPath + \'/view/welfare.html\'">福利</a></li></ul><ul class="nav-right">'
  +'<li v-if="loginFlag" class="liBlock" :style="loginImg !== \'\' ? loginImg:\'\'"><div class="mag_number" :style=" number === 0 ? \'display: none;\':\'\'" >{{ number }}</div><div class="headers_display"><span class="display_user"><a  :href="path.TemprootPath + \'/view/user_info.html\'">{{ userName }}</a></span> <span class="out"><a  href="javascript:;" @click="backLoginFn">退出</a></span> <div class="emil_message"><a :href="path.TemprootPath + \'/view/user_info.html#!/message\'"><span class="msg_img"></span><span class="msg_word" v-if="number === 0 ">消息中心</span><span v-else class="msg_word"><b>{{ number }}</b>未读消息</span></a></div>  <div class="header_more"><a :href="path.TemprootPath + \'/view/user_info.html\'">查看更多</a></div></div></a></li>'
  +'<li v-else class="li_login"><a :href="path.TemprootPath + \'/view/login.html\'">登录/注册</a></li>'
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
  		number: 0,
  	}
  },
  methods: {
    backLoginFn: function() {
      this.loginFlag = false;
      localStorage.removeItem('JSESSIONID');
      window.location.reload();
      // window.location.href = this.path.TemprootPath + '/index.html';
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
      this.number = response.data.book  + response.data.official + response.data.reply + response.data.system;
    });
  },
  route: { data() {} }
});
export default header;





