// 我的书架-个人收藏
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var bookshelf = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">bookshelf</div><div class="titleBlock_LG">个人书架</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li class="active" v-link="{path: \'/bookshelf\'}"><span class="circular"></span><span class="title_name">我的收藏</span></li><li v-link="{path: \'/record\'}"><span class="circular"></span><span class="title_name">浏览记录</span></li></ul>'
      +'<div class="content"><div class="bookBlockList" ><div class="bookBlockList_title"><span class="hr"></span><span class="title">我的收藏</span><span class="titleTwo">collect</span></div>'
      +'<div style="min-height:500px;width:100%;">'
      +'<div class="book-navAI" v-for="obj in bookList"><div v-for="temp in obj" class="book-navAI_bookid"><a  :href="path.TemprootPath + \'/view/catalog.html?bookId=\' + temp.bookId"><img title="{{temp.bookName}}" class="book-img" src="../img/z-imgBj.jpg" @load="szxj.loadImg(temp.bookCoverImage ? path.rootPath + temp.bookCoverImage: \'\', $event)"/></a><div class="book-name" title="{{ temp.bookName }}"><a  :href="path.TemprootPath + \'/view/catalog.html?bookId=\' + temp.bookId">{{ temp.bookName }}</a></div></div>'
      +'</div></div></div></div></div>'
      ,
      data: function() {
        return {
          path: PathList,
        	bookList:[],
        	szxj: SZXJ,
        };
      },
      route: {
        data() {
        } 
      },
      methods: {
	      getBookListTwoFn: function() { // 获取我的收藏的数据
	        var _data = {};
	        SZXJ.http(this,'get', PathList.findBookCollectByUser, {}, (response) => {
	        	this.$set('bookList', response.data);
	        	var arr = [];
	        	var list = [];
            if (this.bookList.length % 4 === 0) {
              for (var i = 1; i <= this.bookList.length; i++) {
                arr.push(this.bookList[i - 1]);
                if (i % 4 === 0) {
                  list.push(arr);
                  arr = [];
                }
              }
            } else {
              for (var i = 1; i <= this.bookList.length;i++) {
                arr.push(this.bookList[i - 1]);
                if (i % 4 === 0) {
                  list.push(arr);
                  arr = [];
                }
                if (i === this.bookList.length) {
                  list.push(arr);
                }
              }
            }
            this.bookList = list;
            console.log(this.bookList);
          });
	      },
      },
      ready : function (){
      	this.getBookListTwoFn();
      },
   });
export default bookshelf;   