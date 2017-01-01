// 我的书架-个人收藏
var bookshelf = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">bookshelf</div><div class="titleBlock_LG">个人书架</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li class="active" v-link="{path: \'/bookshelf\'}"><span class="circular"></span><span class="title_name">我的收藏</span></li><li v-link="{path: \'/record\'}"><span class="circular"></span><span class="title_name">浏览记录</span></li></ul>'
      +'<div class="content"><div class="bookBlockList" ><div class="bookBlockList_title"><span class="hr"></span><span class="title">我的收藏</span><span class="titleTwo">collect</span></div>'
      +'<div style="min-height:500px;width:100%;">'
      +'<div v-for="obj in bookList"><div class="book-navAI"><a v-for="temp in obj" :href="path.TemprootPath + \'/view/catalog.html?bookId=\' + temp.bookId"><img title="{{temp.bookName}}" :class="$index === 0?\'book-img\':\'book-img1\'" src="../img/z-imgBj.jpg" @load="szxj.loadImg(temp.bookCoverImage ? path.rootPath + temp.bookCoverImage: \'\', $event)"/></a></div><a v-for="temp in obj" :href="path.TemprootPath + \'/view/catalog.html?bookId=\' + temp.bookId"><span :class="$index === 0?\'book-name\':\'book-name1\'" title="{{ temp.bookName }}">{{ temp.bookName.length > 12? temp.bookName.substring(0, 12).concat(\'...\'):temp.bookName }}</span></a>'
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
            if (this.bookList.length % 5 === 0) {
              for (var i = 1; i <= this.bookList.length; i++) {
                arr.push(this.bookList[i - 1]);
                if (i % 5 === 0) {
                  list.push(arr);
                  arr = [];
                }
              }
            } else {
              for (var i = 1; i <= this.bookList.length;i++) {
                arr.push(this.bookList[i - 1]);
                if (i % 5 === 0) {
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