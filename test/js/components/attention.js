// 我的关注-我的关注
var attention = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal attention</div><div class="titleBlock_LG">个人关注</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li class="active"  v-link="{path: \'/attention\'}"><span class="circular"></span><span class="title_name">我的关注</span></li><li  v-link="{path: \'/attentionToMe\'}"><span class="circular"></span><span class="title_name">关注我的</span></li></ul>'
      +'<div class="content"><div class="bookBlockList" ><div class="bookBlockList_title"><span class="hr"></span><span class="title">我的关注</span><span class="titleTwo">attention</span></div>'
      +'<div style="height:535px">'
      +'<div v-for="obj in bookList.attention"><img class="img-attention-head" :src="path.rootPath + obj.userHead" /><div class="attention-name"><span>{{ obj.userName }}</span><span v-if="obj.sex == \'男生\'" class="attention-name-sex">♂</span><span v-if="obj.sex == \'女生\'" class="attention-name-sex">♀</span><div @click="setAttention(obj.userId)" class="wordAI ">取消关注</div></div><span class="wordAI-two" v-if="obj.information">{{ obj.information }}</span><span class="wordAI-two" v-else>这个人很赖,没有留下简介</span><hr style="border: 1px solid #E1E1E1; margin:20px 0 0 5%; opacity:0.4; " width="90%" />'
      +'</div></div>'
      +'<div id="page" class="page"><ul><li class="btn" @click="setPage((RequestObj.pageNo - 1) >= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li>          <li v-if="(($index + 1)<= 5 && RequestObj.pageNo< 3 || (($index + 1) > RequestObj.pageNo - 3 &&  $index< RequestObj.pageNo)) || ( (($index + 1)<= RequestObj.pageNo + 2 &&　($index + 1) > RequestObj.pageNo) || (RequestObj.pageNo > obj.pageCount - 3 && ($index + 6) > obj.pageCount) )" :class="objTemp == RequestObj.pageNo? \'active\':\'\'" v-for="objTemp in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li><li class="btn" @click="setPage((RequestObj.pageNo + 1)<= obj.pageCount ? (RequestObj.pageNo + 1) : obj.pageCount)"><a>下一页</a></li><li class="goto"><input type="text" v-model="pageNo" style="text-align: center;"/><span>{{ RequestObj.pageNo }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage(pageNo)">转页</a></li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
          path: PathList,
        	RequestObj: {
        	  status: 0,
        	  pageNo: 1,
        	  pageSize: 5,
        	},
        	attention: true,
          userId: '',
        	valueList: [],
        	page: [],
        	obj: {
            p: 1, // 页码
            n: 5,
            pageCount: 0,
          },
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
        setAttention: function(v){
          SZXJ.http(this,'post', PathList.saveOrCancelAttention, { receiveId: v }, (response) => {
            this.getValueFn();
          });
        },
        getValueFn: function() {
          SZXJ.http(this,'get', PathList.myCareOrCareMe, this.RequestObj, (response) => {
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