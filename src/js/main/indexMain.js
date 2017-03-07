import Vue from '../../lib/vue.min.js';
import VueValidator from '../../lib/vue-resource.min.js';
Vue.use(VueValidator);
import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import headerOrfooter from '../../lib/require/headerOrfooter.js';
headerOrfooter();
import VueAlert from '../../lib/apis/alert.js';
var indexHtml = new Vue({
  el: '#app',
  data: {
    imgFlag: 0,
    swiperArr: [
      './img/Illustration/scrollbar1.jpg',
      './img/Illustration/scrollbar2.jpg',
      './img/Illustration/scrollbar3.jpg',
      './img/Illustration/scrollbar4.jpg',
      './img/Illustration/scrollbar5.jpg',
    ],
    bodyFlag: false,
    path: PathList,
    szxj: SZXJ, // 公共方法
    indexList: {
    }, // 首页默认渲染数据
    theHotList: [], // 小编推荐
    pageNo: 1,
    newBookimg: 0, // 全站推荐的切换下标
    newBookimg1: 0, // 新书推荐的切换下标
    RequestObj: {
      rankList: 0, // 好人 字数 点击
      timeRank: 0, // 周 月 总
      date: 1, // 0 近期 1远期
      bookTypeId: '',
      pageNo: 1,
      pageSize: 7,
      bookIsSign:'',
    },
    rankingList: {
      copperCoinsList: [],
      copperCoins: 0,
      clickSizeList: [],
      clickSize: 0,
      fontSizeList: [],
      fontSize: 0,
    }
  },
  methods: {
    nextImg: function() {
      var tempArr = this.swiperArr;
      this.swiperArr = [];
      var temp = tempArr[0];
      for (var i = 0; i < tempArr.length - 1; i++) {
        tempArr[i] = tempArr[i + 1];
      }
      tempArr[tempArr.length - 1] = temp;
      this.swiperArr = tempArr;
    },
    previousImg: function() {
      var tempArr = this.swiperArr;
      this.swiperArr = [];
      var temp = tempArr[tempArr.length - 1];
      for (var i = tempArr.length - 1; i > 0; i--) {
        tempArr[i] = tempArr[i - 1];
      }
      tempArr[0] = temp;
      this.swiperArr = tempArr;
    },
    setTimeImg: function(v) {
      if (this.imgFlag !== v) {
        return;
      }
      var tempArr = this.swiperArr;
      this.swiperArr = [];
      var temp = tempArr[0];
      for (var i = 0; i < tempArr.length - 1; i++) {
        tempArr[i] = tempArr[i + 1];
      }
      tempArr[tempArr.length - 1] = temp;
      this.swiperArr = tempArr;
      var This = this;
      var dateTime = new Date();
      this.imgFlag = dateTime.getTime();
      setTimeout(function() {
        This.setTimeImg(dateTime.getTime());
      }, 10000);
    },
    stop: function() {
      this.imgFlag = -1;
    },
    start: function() {
      var dateTime = new Date();
      this.imgFlag = dateTime.getTime();
      var This = this;
      setTimeout(function() {
        This.setTimeImg(dateTime.getTime());
      }, 10000);
    },
    setCopperCoins: function(v) {
      var Temp = this.rankingList;
      Temp.copperCoins = v;
      this.$set('rankingList', Temp);
      this.RequestObj.rankList = 0;
      this.RequestObj.timeRank = v;
      this.getReOrderFn();
    },
    setFontSize: function(v) {
      var Temp = this.rankingList;
      Temp.fontSize = v;
      this.$set('rankingList', Temp);
      this.RequestObj.rankList = 1;
      this.RequestObj.timeRank = v;
      this.getReOrderFn();
    },
    setClickSize: function(v) {
      var Temp = this.rankingList;
      Temp.clickSize = v;
      this.$set('rankingList', Temp);
      this.RequestObj.rankList = 2;
      this.RequestObj.timeRank = v;
      this.getReOrderFn();
    },
    getReOrderFn: function() {
      SZXJ.http(this,'get', PathList.getRankingList, this.RequestObj, (response) => {
        switch (this.RequestObj.rankList){
          case 0:
            this.indexList.weekBookByBookCopperCoins = response.data.result;
            break;
          case 1:
            this.indexList.weekBookByBookWordCount = response.data.result;
            break;
          case 2:
            this.indexList.weekBookByBookHit = response.data.result;
            break;
          default:
            break;
        }
        console.log(response);
      });
    },
    setMouseOut: function(v, e) {
      this.newBookimg = v;
    },
    setMouseOutTwo: function(v, e) {
      this.newBookimg1 = v;
    },
    getValueFn: function() {
      var _data = {};
      SZXJ.http(this,'get', PathList.getIndexData, _data, (response) => {
        this.indexList = response.data;
        this.theHotList = response.data.theHot;
        
        console.log(this.indexList);
        var dateTime = new Date();
        this.imgFlag = dateTime.getTime();
        var This = this;
        setTimeout(function() {
          This.setTimeImg(dateTime.getTime());
        }, 10000);
      });
    },
    changeFn: function() {
      SZXJ.http(this,'get', PathList.nextBatch, { pageNo: ++this.pageNo }, (response) => {
        this.theHotList = response.data.theHot;
      });
    },
  },
  ready: function() {
    this.getValueFn();
    this.bodyFlag = true;
    
  },
});