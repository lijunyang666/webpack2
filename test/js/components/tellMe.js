// 我的消息-回复消息
var tellMe = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal message</div><div class="titleBlock_LG">个人消息</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li v-link="{path: \'/message\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'" >{{bookList.reply}}</div><span class="circular"></span><span class="title_name">我的回复</span></li><li  v-link="{path: \'/tellMe\'}"><span class="circular"></span><span class="title_name">@我的</span></li><li class="active" v-link="{path: \'/relevant\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.book}}</div><span class="circular"></span><span class="title_name">作品相关</span></li><li  v-link="{path: \'/system\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.system}}</div><span class="circular"></span><span class="title_name">系统消息</span></li><li  v-link="{path: \'/official\'}"><div class="mag_number1" :style="bookList.reply === 0 ? \'visibility: ;\':\'display: none;\'">{{bookList.official}}</div><span class="circular"></span><span class="title_name">官方公共</span></li></ul>'
      +'<div class="content"><div class="bookBlockList"><div class="bookBlockList_title"><span class="hr"></span><span class="title">@我的</span><span class="titleTwo">work related</span></div><p>此功能暂未开放</p></div>'
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