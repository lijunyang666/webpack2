// 我的消息-
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var message = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal message</div><div class="titleBlock_LG">个人消息</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li   class="active" v-link="{path: \'/message\'}">'
      +'<div class="mag_number1"  v-if="reply > 0">{{reply}}</div><span class="circular"></span><span @click="setreplyFn" class="title_name">我的回复</span></li><li  v-link="{path: \'/tellMe\'}">'
      +'<div class="mag_number1" style="display:none;"></div><span class="circular"></span><span class="title_name">@我的</span></li><li  v-link="{path: \'/relevant\'}">'
      +'<div class="mag_number1"  v-if="book > 0">{{book}}</div><span class="circular"></span><span @click="setbookFn" class="title_name">作品相关</span></li><li  v-link="{path: \'/system\'}">'
      +'<div class="mag_number1"  v-if="system > 0">{{system}}</div><span class="circular"></span><span @click="setsystemFn" class="title_name">系统消息</span></li><li  v-link="{path: \'/official\'}">' 
      +'<div class="mag_number1"  v-if="official > 0">{{official}}</div><span class="circular"></span><span @click="setofficialFn" class="title_name">官方公共</span></li></ul>'
      +'<div class="content"><div class="bookBlockList" ><div class="bookBlockList_title"><span class="hr"></span><span class="title">回复我的</span><span class="titleTwo">essential information</span></div>'
      +'<div style="min-height:500px">'
      +'<div v-for="obj in bookList"><div class="img-attention-headTow" ><img :src="path.rootPath + obj.userHead "/><span v-if="obj.sex == \'男生\'" class="attention-name-sex-Tow"><img src="../../img/sex_001.png" alt="" /></span><span v-if="obj.sex == \'女生\'" class="attention-name-sex-Tow"><img src="../../img/sex_002.png" alt="" /></span></div><ul class="attention_AI_words"><li class="attention_AI_time" >{{ szxj.getLocalTimeTwo(obj.replyDate) }} </li><li class="attention_AI_detailed"><a :href="path.TemprootPath + \'/view/catalog.html?bookId=\' + obj.bookId">查看详情</a></li> </ul><div class="attention_AI_name"><span>{{obj.userName}}</span>回复了你:{{obj.replyContent}}</div><div class="attention_AI_comment"><span v-if="obj.commentContent==\'\'||obj.repliedContent !== null ">“{{obj.repliedContent}}”</span><span v-else>“{{obj.commentContent}}”</span></div>   <hr style="border: 1px solid #f9f9f9; margin:0 0 0 5%;  " width="90% " /></div>'
      +'</div>'
      +'<div id="page" class="page" ><ul><li class="btn" @click="setPage((RequestObj.pageNo - 1) >= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li><li v-if="(($index + 1)<= 5 && RequestObj.pageNo< 3 || (($index + 1) > RequestObj.pageNo - 3 &&  $index< RequestObj.pageNo)) || ( (($index + 1)<= RequestObj.pageNo + 2 &&　($index + 1) > RequestObj.pageNo) || (RequestObj.pageNo > obj.pageCount - 3 && ($index + 6) > obj.pageCount) )" :class="objTemp == RequestObj.pageNo? \'active\':\'\'" v-for="objTemp in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li><li class="btn" @click="setPage((RequestObj.pageNo + 1)<= obj.pageCount ? (RequestObj.pageNo + 1) : obj.pageCount)"><a>下一页</a></li><li class="goto"><input type="text" v-model="pageNo" style="text-align: center;"/><span>{{ RequestObj.pageNo }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage(pageNo)">转页</a></li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
          szxj: SZXJ,
          path: PathList,
         RequestObj:{
            pageNo: 1,
            pageSize: 10,
          },
          page: [1],
          obj: {
            p: 1, // 页码
            n: 10,
            pageCount: 1,
          },
          number1: '',
          book:'',
          official:'',
          reply:'',
          system:'',
        };
        
      },
      route: {
        data() {
          // this.setFlag();
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
          obj.pageNo = v;
          this.$set('RequestObj', obj);
          this.getValueFn(); // 请求
        },
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
          var _data = this.RequestObj;
          SZXJ.http(this,'get', PathList.findCommentAndReplyByReplyUserId, _data , (response) => { 
            console.log(response);   
            this.$set('bookList', response.data);
            this.setPageCount(response.data[0].totalPage);
          });
          SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
            this.userName = response.data.status.userName;
            this.book = response.data.book;
            this.official = response.data.official;
            this.reply = response.data.reply;
            this.system = response.data.system;
            this.number1 = response.data.system + response.data.reply + response.data.official + response.data.book;
          });
        },
      },
      ready : function (){
        this.getValueFn();
        
      },
   });
export default message;   