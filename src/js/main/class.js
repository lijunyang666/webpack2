import Vue from '../../lib/vue.min.js';
import VueValidator from '../../lib/vue-resource.min.js';
Vue.use(VueValidator);
import VueAlert from '../../lib/apis/alert.js';
import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import headerOrfooter from '../../lib/require/headerOrfooter.js';
headerOrfooter();

var vuePractice = new Vue({
      el: '#app',
      data: {
        bodyFlag: false,
        pageNo: '',
        szxj: SZXJ,
        path: PathList,
        hengshuId: 2, // 横竖显示
        fontsizeId: 0,
        bookTypeClass:[],
        verticalBoookInfo: [],
        page: [],
        bookInfo:[],
        RequestObj: {
          sort: 0, // 排序 ： id
          bookTypeId: '', // 分类 id
          wordMin: 0,
          wordMax: '',
          isSign: 0,
          Keyword: '', // 搜索的书名
          pageNo: 1, // 页码
          pageSize: 12,
        },
        obj: {
          newBook: [{name: '最新', id: 0} ,{name: '最热', id: 1} ],
          sort:[], // 分类
          fontsize:[
          {name: '全部', min: 0, max: '' , id : 0 }
          ,{name: '10万字以下', min: 0, max: 100000 , id : 1 }
          ,{name: '10-30万字', min: 100000, max: 300000 , id : 2 }
          ,{name: '50-100万字', min:500000, max: 1000000  , id : 3 }
          ,{name: '一百万字以上', min: 1000000, max: ""  , id : 4 }
          ], // 字数
          qianyue:[{name: '精品作品', id: 0},{name: '签约作品', id: 1}], // 签约 
          hengshu:[{name: '横', id: 1},{name: '竖', id: 2}], // 横竖
          value: '', // 搜索的书名
          p: 1, // 页码
          n: 12,
          pageCount: 0,
        }
      },
      methods: {
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
        setHengshu: function(v) { // 横竖切换显示
          localStorage.setItem('hengshuId', v);
          this.$set('hengshuId', v);
        },
        getValueFn: function() {
          this.$set('verticalBoookInfo', []);
          this.$set('bookInfo', []);
          SZXJ.http(this,'get', PathList.queryBookClass, this.RequestObj, (response) => {
            this.bookInfo = response.data.bookInfo;
            if (!response.data.bookInfo) {
              this.$set('bookInfo', []);
              this.$set('verticalBoookInfo', []);
              this.setPageCount(1);
              return;
            }
            var arr = [];
            if (response.data.bookInfo.length % 4 === 0) {
              for (var i = 1; i <= response.data.bookInfo.length;i++) {
                arr.push(response.data.bookInfo[i - 1]);
                if (i % 4 === 0) {
                  this.verticalBoookInfo.push(arr);
                  arr = [];
                }
              }
            } else {
              for (var i = 1; i <= response.data.bookInfo.length;i++) {
                arr.push(response.data.bookInfo[i - 1]);
                if (i % 4 === 0) {
                  this.verticalBoookInfo.push(arr);
                  arr = [];
                }
                if (i === response.data.bookInfo.length) {
                  this.verticalBoookInfo.push(arr);
                }
              }
            }
            this.setPageCount(response.data.totalPage);
          });
        },
        sortFn: function(id) {
          this.RequestObj.bookTypeId = id;
          this.getValueFn(); // 请求
        },
        newbookFn: function(id) { // 排序方法
          this.RequestObj.sort = id;
          this.getValueFn();
        },
        fontsizeFn: function (min, max, id) { // 请求字数区间的
          this.fontsizeId = id;
          this.RequestObj.wordMin = min;
          this.RequestObj.wordMax = max;
          this.getValueFn();
        },
        qianyueFn: function(id) { // 签约与否的
          this.RequestObj.isSign= id;
          this.getValueFn();
        },
      },
      ready: function() {
        this.bodyFlag = true;
        if (localStorage.getItem('hengshuId')) {
          this.hengshuId = parseInt(localStorage.getItem('hengshuId'), 10);
        } else {
          this.hengshuId = 2;
        }
        if (SZXJ.getQueryString('id')) {
          this.RequestObj.bookTypeId = SZXJ.getQueryString('id');
        }
        SZXJ.http(this,'get', PathList.queryBookType, {}, (response) => {
          var obj = this.obj;
          obj.sort = response.data;
          var temp = {};          
          temp.bookTypeName = '全部'
          temp.bookTypeId = '';
          temp.bookTypeDescription = '';
          obj.sort.unshift(temp);
          this.$set('obj', obj);
        });
        this.getValueFn(); 
      },
    });