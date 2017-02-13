import Vue from '../../lib/vue.min.js';
import VueValidator from '../../lib/vue-resource.min.js';
import editor from '../../lib/apis/editor.js';
Vue.use(VueValidator);
Vue.component('editor', editor);
import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import headerOrfooter from '../../lib/require/headerOrfooter.js';
headerOrfooter();


var vuePractice = new Vue({
  el: '#mask',
  data: {
    loginFlag: false,
    loginImg: '',
    bodyFlag: false,
    zindex: 0,
    path: PathList,
    szxj: SZXJ,
    popup:false,
    id: '',
    title: '',
    words:'',
    cursor:'',
    update:'',
    introduction:'',
    BookList: [],
    Booktype:[{typeName:''}],
    Collection:'',
    bookCopperCoins:'',
    authorName:'',
    autograph:'',
    booktTitle:[],
    bookCustom:[],
    collect: false,
    attention: false,
    userId: '',
    bookId: '',
    userHead: '',
    findCommentAndReply: [], // 评论字段
    authorId: '',
    commentId: '', // 根据评论id显示 回复输入框
    commentStatus: 0, // 按回复数 或 按时间排序显示评论
    replyStatus: 0,
    replyUserId: 0,
    line:0,
    contentEntityList:[],
    Report:0,
    commentAndReplyTotalCount:'',
    replyId:'',
    report:false,
    reportTypeId:1,
    reportContent:'',   
    reportFlag:false,
  },
  methods: {
    setreplyFn: function (replyId){
       this.replyId = replyId;
    },
    strickieFn: function(commentId) {
      SZXJ.http(this,'post', PathList.top, { bookId: this.id,commentId: commentId }, (response) => {
        this.setComment(this.commentStatus);
      });
    },
    messageShow: function(commentId, v, name, id,replyId) {
      if(this.loginFlag){this.commentId = commentId;}; // editor
      var editor = {};
      var index = 0;
      for (var i = 0; i < this.findCommentAndReply.comment.length; i++) {
        if (this.findCommentAndReply.comment[i].commentId === commentId) {
          editor = this.findCommentAndReply.comment[i].editor;
          index = 0;
          break;
        }
      }
      this.replyUserId = id;
      this.replyId= replyId;
      if (v === 1) {
        editor.$txt.html('<span style="color:#00A1D6;" contenteditable="false">回复@'+name+'</span><span style="font-size:12px !important;color:#555 !important;">:</span>');
        this.replyStatus = 1;
      } else {
        this.replyStatus = 0;
      }
    },
    setPageCount: function(v) {
      var obj = this.findCommentAndReply;
      obj.pageCount =  v;
      this.page = [];
      for (var i = 0; i < obj.pageCount; i++) {
        this.page.push(i+1);
      }
      this.$set('findCommentAndReply', obj);
    },
    setPage1: function(v, commentId) { // 获取回复的
       var index = 0;
       for (var i = 0; i < this.findCommentAndReply.comment.length; i++) {
        if (this.findCommentAndReply.comment[i].commentId === commentId) {
          index = i;
          break;
        }
      }
      var _data = {
        pageNo: v,
        pageSize : 10,
        commentId: this.findCommentAndReply.comment[index].commentId,
        
      }
      var obj = this.findCommentAndReply;
      this.findCommentAndReply = {};
      SZXJ.http(this,'get', PathList.moreReply, _data, (response) => {
        obj.comment[index].replyEntityList = response.data;
        obj.comment[index].pageNo = v;
        this.findCommentAndReply = obj;
      });
    },
    setPage: function(v) {
      if (!v || v > this.findCommentAndReply.pageCount || v <= 0 || v.toString().search(/[^0-9]/g) !== -1 || parseInt(v) === parseInt(this.findCommentAndReply.pageNo) ) {
        return;
      }
      var obj = this.findCommentAndReply;
      obj.pageNo = v;
      this.$set('findCommentAndReply', obj);
      var _data = {};
      _data.bookId = this.id;
      _data.pageNo = v;
      _data.pageSize = 10;
      _data.status = this.commentStatus;
      this.getComment(_data); // 请求
    },
    setComment(v) {
      this.commentStatus = v;
      var _data = {};
      _data.bookId = this.id;
      _data.pageNo = this.findCommentAndReply.pageNo;
      _data.pageSize = 10;
      _data.status = v;
      
      this.getComment(_data); // 请求
    },
    reportShow: function(commentId){
       this.report = true;
       this.commentId = commentId;
    },
    reportShowFn: function(replyId){
       this.report = true; 
       this.replyId = replyId;
    },
    reportDown: function(){
       this.report = false;
       var _data={
           reporterId:this.userId,
           reportTypeId:this.reportTypeId,
           commentId:function (){
              return reportShow(commentId);
           },
           replyId:function (){
              return reportShowFn(replyId);
           },
         };       
       SZXJ.http(this,'post', PathList.report, _data, (response) => {            
       });
    },
    getComment(_data) {
      SZXJ.http(this,'get', PathList.findCommentAndReply, _data, (response) => {
        console.log('评论:');
        console.log(response);
        var pageNo;
        if (this.findCommentAndReply.pageNo) {
          pageNo = this.findCommentAndReply.pageNo
          this.setPageCount(pageNo);
        } else {
          pageNo = 1;
        }
        
        this.findCommentAndReply = response.data;
        this.findCommentAndReply.page = []; 
        this.findCommentAndReply.pageNo = pageNo;
        // 计算评论的总页数
        console.log(this.findCommentAndReply.totalCount / _data.pageSize);
        if (this.findCommentAndReply.totalCount / _data.pageSize <= 1) {
          this.findCommentAndReply.pageCount = 1;
        } else {
          if (this.findCommentAndReply.totalCount % _data.pageSize === 0) {
            this.findCommentAndReply.pageCount = this.findCommentAndReply.totalCount / _data.pageSize;
          } else {
            this.findCommentAndReply.pageCount = parseInt((this.findCommentAndReply.totalCount / _data.pageSize), 10) + 1;
          }
        }
        for (var i = 0; i < this.findCommentAndReply.pageCount;i++) {
          this.findCommentAndReply.page.push(i+1);
        }
        for (var i = 0; i < this.findCommentAndReply.comment.length;i++) {
          // 评论楼中楼
          this.findCommentAndReply.comment[i].editor = {};
          this.findCommentAndReply.comment[i].page = [];
          this.findCommentAndReply.comment[i].pageNo = 1;
          // 计算评论楼中楼回复的总页数
          if (this.findCommentAndReply.comment[i].totalCount / _data.pageSize <= 1) {
            this.findCommentAndReply.comment[i].pageCount = 1;
          } else {
            if (this.findCommentAndReply.comment[i].totalCount % _data.pageSize === 0) {
              this.findCommentAndReply.comment[i].pageCount = this.findCommentAndReply.comment[i].totalCount / _data.pageSize;
            } else {
              this.findCommentAndReply.comment[i].pageCount = parseInt((this.findCommentAndReply.comment[i].totalCount / _data.pageSize), 10) + 1;
            }
          }
          for (var j = 1; j <= this.findCommentAndReply.comment[i].pageCount;j++) {
            this.findCommentAndReply.comment[i].page.push(j);
          }
        }
        });
    },
    saveComment: function() {
      var editor = this.$refs.editor.getEditor();
      var _data = {
        commentContent: editor.$txt.html(), //文本html内容
        bookId: this.id, // 卷id
      };
      SZXJ.http(this,'post', PathList.saveComment, _data, (response) => {
        editor.$txt.html('');
        this.getValueFn();
      });
    },
    saveReply: function(commentId) { // 回复
      var editor = {};
      var index = 0;
      for (var i = 0; i < this.findCommentAndReply.comment.length; i++) {
        if (this.findCommentAndReply.comment[i].commentId === commentId) {
          editor = this.findCommentAndReply.comment[i].editor;
          index = i;
          break;
        }
      }
      var _data = {
        replyStatus: this.replyStatus,
        commentId: this.commentId,
        replyUserId: this.replyUserId, 
        repliedId : this.replyId,
        replyContent: editor.$txt.html(), //文本html内容
      };
      SZXJ.http(this,'post', PathList.saveReply, _data, (response) => {
        editor.$txt.html('');
        this.getValueFn();
        var This = this;
        setTimeout(function(){
          This.setPage1(This.findCommentAndReply.comment[index].pageCount,This.commentId);
          This.commentId = -1;   
        },300);
      });
    },
    setAttention: function(){
      var _data = {};
      _data.receiveId = this.userId;
      SZXJ.http(this,'post', PathList.saveOrCancelAttention, _data, (response) => {
        if (this.attention) {
          this.attention = false;
        } else {
          this.attention = true;
        }
      });
    },
    setCollect: function() {
      var _data = {};
      _data.bookId = this.bookId;
      SZXJ.http(this,'post', PathList.saveOrDeleteBookCollect, _data, (response) => {
        this.getValueFn()
      });
    },
    nextWorksFn:function() {
      if (this.booktTitle.length < 3) {
        return;
      }
      this.zindex--;
      if (Math.abs(this.zindex) >= (this.booktTitle.length - 3)) {
        this.zindex = -(this.booktTitle.length - 3);
      }
    },
    previousWorksFn: function() {
      if (this.booktTitle.length < 3) {
        return;
      }
      this.zindex++;
      if (this.zindex >= 0) {
        this.zindex = 0;
      }
    },
    getValueFn: function() {
      var _data = {};
      _data.bookId = this.id;
      SZXJ.http(this,'get', PathList.queryBookDirectory, _data, (response) => {
        // 取到数据渲染
        this.bookCustom = [];
        this.userHead = response.data.bookCustom.userEntity.userHead;
        this.bookId = response.data.bookCustom.bookId;
        this.userId = response.data.bookCustom.userEntity.userId;
        this.collect= response.data.bookCustom.collect;
        this.attention = response.data.bookCustom.userEntity.attention;
        this.bookCustom.push(response.data.bookCustom);
        this.title = response.data.bookCustom.bookName;
        this.introduction =response.data.bookCustom.bookIntroduction;
        this.words =response.data.bookCustom.bookWordCount;
        this.update = response.data.bookCustom.bookUpdate;
        this.cursor = response.data.bookCustom.bookHit;
        this.BookList = response.data.bookCustom.volumeCustomList;
        this.Booktype =response.data.bookCustom.bookTypeEntityList;
        this.typeName =response.data.bookCustom.bookTypeName;
        this.Collection =response.data.bookCustom.bookCollect;
        this.bookCopperCoins =response.data.bookCustom.bookCopperCoins;
        this.authorName =response.data.bookCustom.userEntity.userName;
        this.autograph = response.data.bookCustom.userEntity.information;
      });
      SZXJ.http(this,'get', PathList.findUserOtherBook, _data, (response) => {
        // 取到数据渲染
        this.booktTitle = response.data.userOtherBook;
      });
      _data.pageNo = 1;
      _data.pageSize = 10;
      _data.status = this.commentStatus;
      this.getComment(_data);
      SZXJ.http(this,'get', PathList.getStatus, _data, (response) => {
         this.loginFlag = response.data.status.flag;
      });
    },
    rewardFn: function(){
      this.popup = true;
    },
    rewardShow: function(){
      this.popup = false;
    }
  },
  ready: function() {
    this.bodyFlag = true;
    var href = window.location.href;
    this.id = href.substring(href.lastIndexOf('?bookId=') + 8, href.length); 
    var str = this.id.toString();
    if (str.search(/[^0-9]/g) === -1) {
      this.getValueFn();
    } else {
      window.location.href = PathList.TemprootPath + '/index.html';
    }
  },
});