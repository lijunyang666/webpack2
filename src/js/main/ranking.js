import Vue from '../../lib/vue.min.js';
import VueValidator from '../../lib/vue-resource.min.js';
Vue.use(VueValidator);



import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import headerOrfooter from '../../lib/require/headerOrfooter.js';
headerOrfooter();


var indexHtml = new Vue({
    el: '#app',
    data: {
      szxj: SZXJ,
    bodyFlag: false,
    path: PathList,
    result:[],  
    bookInfo: [],
    // 分页
    page: [1],
        RequestObj: {
          rankList: 0, // 好人 字数 点击
          timeRank: 0, // 周 月 总
          date: 1, // 0 近期 1远期 砍掉
          bookTypeId: '',
          pageNo: 1,
          pageSize: 12,
        },
    obj: {
         p: 1, // 页码
         n: 12,
         pageCount: 1,
        },
        // 分页
      },
    methods: {
      setCollect: function(v) {
          SZXJ.http(this,'post', PathList.saveOrDeleteBookCollect, { bookId: v }, (response) => {
            this.getValueFn();
          });
      },
        setDate:function(v) {
          var Temp = this.RequestObj;
          Temp.date = v;
          this.$set('RequestObj', Temp)
          this.getValueFn(); // 请求
        },
        setbookTypeId: function(v) {
          this.RequestObj.bookTypeId = v;
          this.getValueFn(); // 请求
        },
        setRankList: function(v) {
          this.RequestObj.rankList = v;
          this.getValueFn(); // 请求
        },
       setTimeRank: function(v) {
          var Temp = this.RequestObj;
          Temp.timeRank = v;
          this.$set('RequestObj', Temp)
          this.getValueFn(); // 请求
        },
        gotoBook: function(id) {
          location.href = this.path.TemprootPath + '/view/catalog.html?bookId=' + id;
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
        getValueFn: function() {
          this.result = [];
          SZXJ.http(this,'get', PathList.getRankingList, this.RequestObj, (response) => {
            this.result = response.data.result;
            console.log(response);
            this.setPageCount(response.data.totalPage);
          });
        },
      },
      ready: function() {
        this.bodyFlag = true;
        SZXJ.http(this,'get', PathList.queryBookType, {}, (response) => {
          this.bookInfo = response.data;
        });
        var href = window.location.href;
        this.id = href.substring(href.lastIndexOf('?type=') + 5, href.length); 
        var str = this.id.toString();
        if (str.search(/[^0-9]/) === -1) {
          this.RequestObj.rankList = parseInt(this.id, 10) - 1;
          this.getValueFn();
        } else {
          this.RequestObj.rankList = 0;
          this.getValueFn();
        }
      },
    });