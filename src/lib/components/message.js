// 我的消息-
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var message = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal message</div><div class="titleBlock_LG">个人消息</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li v-link="{path: \'/message\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'" >{{bookList.reply}}</div><span class="circular"></span><span class="title_name">我的回复</span></li><li  v-link="{path: \'/tellMe\'}"><span class="circular"></span><span class="title_name">@我的</span></li><li class="active" v-link="{path: \'/relevant\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.book}}</div><span class="circular"></span><span class="title_name">作品相关</span></li><li  v-link="{path: \'/system\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.system}}</div><span class="circular"></span><span class="title_name">系统消息</span></li><li  v-link="{path: \'/official\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.official}}</div><span class="circular"></span><span class="title_name">官方公共</span></li></ul>'
      +'<div class="content"><div class="bookBlockList" ><div class="bookBlockList_title"><span class="hr"></span><span class="title">回复我的</span><span class="titleTwo">essential information</span></div>'
      +'<div style="min-height:500px">'
      +'<div v-for="obj in bookList"><div class="img-attention-head" ><img src=" path.rootPath + obj.userHead "/></div><ul class="attention_AI_words"><li class="attention_AI_time" >{{obj.commentDate}} </li><li class="attention_AI_detailed">查看详情</li> </ul><div class="attention_AI_name"><span>{{obj.userName}}</span>回复了你：{{obj.totalCount}}</div><div class="attention_AI_comment"><span>“{{obj.commentContent}}”</span></div>   <hr style="border: 1px solid #f9f9f9; margin:0 0 0 5%;  " width="90% " /></div>'
      +'</div>'
      +'<div id="page" class="page"><ul><li><a>上一页</a></li><li class="active"><a>1</a></li><li><a>下一页</a></li><li class="goto"><input type="text" value="" /><span>/1211</span><a>转页</a></li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
          path: PathList,
          replyId:'',
        };
        
      },
      route: {
        data() {
          // this.setFlag();
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
        getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
            this.$set('bookList', response.data);
          });
        },
        getValueFn: function() {       
          var _data = {};
          replyId=this.replyId;
          SZXJ.http(this,'get', PathList.findCommentAndReplyByReplyUserId,{} , (response) => { 
            this.$set('bookList', response.data);
            console.log(this.bookList);           
          });
        },
      },
      ready : function (){
        this.getValueFn();
      },
   });
export default message;   