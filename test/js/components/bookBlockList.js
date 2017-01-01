// 投稿-第一页 显示作者作品
var bookBlockList = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">contribute</div><div class="titleBlock_LG">个人投稿</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li class="active" v-link="{path: \'/bookBlockList\'}"><span class="circular"></span><span class="title_name">轻小说</span></li><li v-if="showFlag === 999"><span class="circular"></span><span class="title_name">画集</span></li><li v-link="{path: \'/works\'}"><span class="circular"></span><span class="title_name">创建作品</span></li></ul>'
      +'<div class="content"><div class="bookBlockList"><div class="bookBlockList_title"><span class="hr"></span><span class="title">轻小说</span><span class="titleTwo">light novel</span></div><ul class="list clear"><li><div class="vertical-img"><a v-link="{path: \'/works\'}"><img src="../img/90x126.png" class="cover"/></a></div><div class="vertical-title"></div></li><li v-for="obj in bookList"><div class="vertical-img"><img :src="path.rootPath + obj.bookCoverImage" class="cover"  v-link="{path: \'/catalogue/\' + obj.bookId}"  /></div><div class="vertical-title" title="{{obj.bookName}}">{{obj.bookName}}</div></li></ul></div></div> '
      +'</div></div></div>'
      ,data: function() {
        return {
        bookList: [],
        path: PathList,
        };
      }
      ,route: { 
        data() {
          // 列表页面的默认方法 一进入页面后立刻请执行此方法
          this.getBookListFn();
        } 
      }
      ,methods: {
        getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
            this.$set('bookList', response.data);
          });
        },
      },
   });