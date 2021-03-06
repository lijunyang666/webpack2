// 我的消息-官方公共
var official = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal message</div><div class="titleBlock_LG">个人消息</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li v-link="{path: \'/message\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'" >{{bookList.reply}}</div><span class="circular"></span><span class="title_name">我的回复</span></li><li  v-link="{path: \'/tellMe\'}"><span class="circular"></span><span class="title_name">@我的</span></li><li class="active" v-link="{path: \'/relevant\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.book}}</div><span class="circular"></span><span class="title_name">作品相关</span></li><li  v-link="{path: \'/system\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.system}}</div><span class="circular"></span><span class="title_name">系统消息</span></li><li  v-link="{path: \'/official\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.official}}</div><span class="circular"></span><span class="title_name">官方公共</span></li></ul>'
      +'<div class="content"><div class="bookBlockList" ><div class="bookBlockList_title"><span class="hr"></span><span class="title">官方公共</span><span class="titleTwo">official public</span></div><div v-for="obj in bookList.info"><div class="img-attention-word"><span class="attention-word1">{{obj.messageTitle}}</span><span class="attention-word2">{{obj.messageCreateDate}}</span></div><p>{{obj.message}}</p><hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /></div>'
      +'<div id="page" class="page"><ul><li class="btn" @click="setPage((RequestObj.pageNo - 1) >= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li>          <li v-if="(($index + 1)<= 5 && RequestObj.pageNo< 3 || (($index + 1) > RequestObj.pageNo - 3 &&  $index< RequestObj.pageNo)) || ( (($index + 1)<= RequestObj.pageNo + 2 &&　($index + 1) > RequestObj.pageNo) || (RequestObj.pageNo > obj.pageCount - 3 && ($index + 6) > obj.pageCount) )" :class="objTemp == RequestObj.pageNo? \'active\':\'\'" v-for="objTemp in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li><li class="btn" @click="setPage((RequestObj.pageNo + 1)<= obj.pageCount ? (RequestObj.pageNo + 1) : obj.pageCount)"><a>下一页</a></li><li class="goto"><input type="text" v-model="pageNo" style="text-align: center;"/><span>{{ RequestObj.pageNo }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage(pageNo)">转页</a></li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
        	showFlag: 1,
        	queryMsgObj:{
        	  type:2,
        	  pageNo: 1,
            pageSize: 7,
            
        	},
        	page: [],
        	obj: {
            p: 1, // 页码
            n: 5,
            pageCount: 0,
            
          },
          messageStatus:0,
        };
      },
      route: {
        data() {
          
        } 
      },
      methods: {
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
      	setShowFlagFn: function(v) {
			this.showFlag = v;
		},
        getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
            this.$set('bookList', response.data);
          });
        },
         getValueFn: function() {         
          SZXJ.http(this,'get', PathList.queryMsg, this.queryMsgObj , (response) => {
            this.$set('bookList', response.data);
            console.log(this.bookList);
            this.setPageCount(response.data.totalPage);
          });
        },
      },
      ready : function (){
        this.getValueFn();
      },
   });