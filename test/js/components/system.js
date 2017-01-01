// 我的消息-系统消息
var system = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal message</div><div class="titleBlock_LG">个人消息</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li v-link="{path: \'/message\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'" >{{bookList.reply}}</div><span class="circular"></span><span class="title_name">我的回复</span></li><li  v-link="{path: \'/tellMe\'}"><span class="circular"></span><span class="title_name">@我的</span></li><li class="active" v-link="{path: \'/relevant\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.book}}</div><span class="circular"></span><span class="title_name">作品相关</span></li><li  v-link="{path: \'/system\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.system}}</div><span class="circular"></span><span class="title_name">系统消息</span></li><li  v-link="{path: \'/official\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.official}}</div><span class="circular"></span><span class="title_name">官方公共</span></li></ul>'
      +'<div class="content"><div class="bookBlockList" ><div class="bookBlockList_title"><span class="hr"></span><span class="title">系统消息</span><span class="titleTwo">system</span></div><div v-for="obj in bookList.info"><div class="img-attention-word"><span class="attention-word1">{{obj.messageTitle}}</span><span class="attention-word2">{{obj.messageCreateDate}}</span></div><p>{{obj.message}}</p><hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /></div><div id="page" class="page"><ul><li><a>上一页</a></li><li><a>1</a></li><li class="active"><a>2</a></li><li><a>3</a></li><li><a>4</a></li><li><a>5</a></li><li><a>下一页</a></li><li class="goto"><input type="text" value="" /><span>/1211</span><a>转页</a></li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
        	showFlag: 1,
        	queryMsgObj:{
            type:0,
            pageNo: 1,
            pageSize: 7,
          },
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
        getValueFn: function() {         
          SZXJ.http(this,'get', PathList.queryMsg, this.queryMsgObj , (response) => {
            
            this.$set('bookList', response.data);
            console.log(this.bookList);
          });
        },
      },
      ready : function (){
      	this.getValueFn();
      },
   });