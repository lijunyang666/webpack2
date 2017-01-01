// 个人信息修改密码
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var updatePass = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">contribute</div><div class="titleBlock_LG">个人投稿</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li v-link="{path: \'/info\'}"><span class="circular"></span><span class="title_name">我的信息</span></li><li class="active" v-link="{path: \'/updatePass\'}"><span class="circular"></span><span class="title_name">修改密码</span></li></ul>'
      +'<div class="content"><div class="bookBlockList"><div class="bookBlockList_title"><span class="hr"></span><span class="title">修改密码</span><span class="titleTwo">essential information</span></div><div class="numberAItwo1"><span class="name1">旧密码：</span><input type="" name="" id="" value="" /></div><div class="numberAItwo2"><span class="name1">新密码：</span><input type="" name="" id="" value="" /><span class="remark1">密码由6-16个字符组成，区分大小写（不能是9位一下的纯数字，不能包含空格）</span></div><div class="numberAItwo3"><span class="name1">确认新密码：</span><input type="" name="" id="" value="" /><span class="remark1">密码强度：</span></div><div class="numberAItwo4"><span class="name1">手机验证：</span><input type="" name="" id="" value="" /><div class="verify">发送验证码</div></div><hr style="border: 1px dotted #E1E1E1; margin:0 0 0 5%;" width="90%" /><div class="change">确认</div></div></div>'
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
export default updatePass;