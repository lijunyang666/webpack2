import Vue from '../../lib/vue.min.js';
import VueValidator from '../../lib/vue-resource.min.js';
Vue.use(VueValidator);
import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import headerOrfooter from '../../lib/require/headerOrfooter.js';
headerOrfooter();
var vueDemo = new Vue({
        el: '#app',
        data: {
          rightSize: '450px',
          szxj: SZXJ,
          path: PathList,
          fixed:false,
          font_size: 16,
          font_family: 'Arial,Microsoft YaHei,sans-serif',
          bj_color: '#F6F4EC',
          font_color: '#333',
          temp_format:[16,'Arial,Microsoft YaHei,sans-serif','#F6F4EC','#333'], // 上一次的状态
          temp_format_two:['#F6F4EC','#333'], // 记录开关灯的上一次的状态
          lamp: true,
          screenV: true,
          bookName:'44',
          bookcontent: [],
          update:'455',
          name:'565',
          bookTitle:'',
          works:'',
          nextContent: {},
          previousContent: {},
          previousEnd: false,
          nextEnd: false,
        },
        methods: {
          resizeFn: function() {
            var width = document.body.clientWidth;
            this.$set('rightSize',((width - 900) / 2 - 65) + 'px');
            if (width < 1040) {
              this.$set('rightSize',((width - 900) / 2 + 15) + 'px');
            }
            if (width < 900) {
              this.$set('rightSize',25 + 'px');
            }
          },
          setNextEnd: function() {
            this.$set('nextEnd',true);
                var This = this;
                setTimeout(function(){
                  This.$set('nextEnd',false);
                }, 2000)
          },
          setPreviousEnd: function() {
            this.$set('previousEnd',true);
                var This = this;
                setTimeout(function(){
                  This.$set('previousEnd',false);
                }, 2000)
          },
          keyDownFn: function(e) {
            if(e.keyCode == 37) {
              if (this.previousContent && this.previousContent.contentId) {
                  location.href = this.path.TemprootPath + '/view/read_book.html?contentId=' + this.previousContent.contentId + '&bookId='+ this.previousContent.bookId;
              } else {
                this.$set('previousEnd',true);
                var This = this;
                setTimeout(function(){
                  This.$set('previousEnd',false);
                }, 2000)
              }
            }
            if(e.keyCode == 39) {
              if (this.nextContent && this.nextContent.contentId) {
               location.href = this.path.TemprootPath + '/view/read_book.html?contentId=' + this.nextContent.contentId + '&bookId='+ this.nextContent.bookId;
            } else {
                this.$set('nextEnd',true);
                var This = this;
                setTimeout(function(){
                  This.$set('nextEnd',false);
                }, 2000)
              }
            }
          },
          getValueFn: function() {
          var _data = {};
          _data.rankList = 0;
          _data.contentId = this.contentId;
          _data.bookId = this.bookId;
          SZXJ.http(this,'get', PathList.findContent, _data, (response) => {
            console.log(response);
            this.nextContent = response.data.nextContent;
            this.previousContent = response.data.previousContent;
            this.bookcontent = response.data.content;
            this.bookName = response.data.content.bookName;
            this.$els.bookcontent.innerHTML = this.bookcontent.content;
          });
          },
          settingShow: function() {
            this.fixed = true;
          },
          fixedFn: function() {
            this.fixed = false;
            this.font_size = this.temp_format[0];
            this.font_family = this.temp_format[1];
            this.$set('bj_color', this.temp_format[2]);
            this.font_color = this.temp_format[3];
          },
          saveFixedFn : function() {
            this.fixed = false;
            this.temp_format[0] = this.font_size;
            this.temp_format[1] = this.font_family;
            this.temp_format[2] = this.bj_color;
            this.temp_format[3] = this.font_color;
            this.lamp = true;
          },
          settingFn: function(e) {
            e.stopPropagation();
          },
          gotoCatalogFn : function(){
            window.location.href = '../catalog.html';
          },
          bj_ColorFn: function(color) {
            this.bj_color = color;
            if (color === '#323536') {
              this.font_color = '#777';
            }
          },
          font_FamilyFn: function(family) {
            this.font_family = family;
          },
          lampFn: function(bj_color){
            console.log(bj_color);
            if (this.lamp){
              this.temp_format_two[0] = this.temp_format[2];
              this.temp_format_two[1] = this.temp_format[3];
              this.bj_color = '#323536';
              this.font_color = '#777';
              this.temp_format[2] = this.bj_color;
              this.temp_format[3] = this.font_color;
              this.lamp = false;
            } else {
              this.temp_format[2] = this.temp_format_two[0];
              this.temp_format[3] = this.temp_format_two[1];
              this.$set('bj_color', this.temp_format[2]);
              this.font_color = this.temp_format[3];
              this.lamp = true;
            }
          },
          smallFn :function(){
            this.font_size = this.font_size - 2;
            if (this.font_size < 12) {
              this.font_size = 12;
            }
          },
          largeFn: function() {
            this.font_size = this.font_size + 2;
            if (this.font_size > 48) {
              this.font_size = 48;
            }
          },
          screenFn: function() {
              if(this.screenV) {
                this.screenV = false;
                var el = document.documentElement,
                  rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
                  wscript;
                if(typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                    return;
                }
                if(typeof window.ActiveXObject != "undefined") {
                    wscript = new ActiveXObject("WScript.Shell");
                    if(wscript) {
                        wscript.SendKeys("{F11}");
                    }
                }
              } else {
                this.screenV = true;
                var el = document,
                  cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
                  wscript;
                if (typeof cfs != "undefined" && cfs) {
                  cfs.call(el);
                  return;
                }
                if (typeof window.ActiveXObject != "undefined") {
                    wscript = new ActiveXObject("WScript.Shell");
                    if (wscript != null) {
                        wscript.SendKeys("{F11}");
                    }
                }
              }
          }
          
        },
        ready: function() {
          this.contentId = SZXJ.getQueryString('contentId');
          this.bookId = SZXJ.getQueryString('bookId');
          this.getValueFn();
          var This = this;
          this.resizeFn();
          window.onresize = function() {
            This.resizeFn();
          }
        },
    }); 
    