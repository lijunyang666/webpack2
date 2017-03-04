import Vue from '../../lib/vue.min.js';
import PathList from '../../lib/apis/conf.js';


var SZXJ = {};
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 
SZXJ.getLocalTime =  function(nS) {
  var time = new Date(nS * 1000);
  return time.Format("yyyy-MM-dd hh:mm:ss");
	// return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17);
}
SZXJ.getLocalTimeTwo =  function(nS) {
  var time = new Date(nS);
  return time.Format("yyyy-MM-dd hh:mm:ss");
  // return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17);
}
SZXJ.getLocalDate =  function(nS) { 
  var time = new Date(nS);
  return time.Format("yyyy-MM-dd");
	// return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17);
}
SZXJ.getQueryString = function(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); 
  return null;
}
SZXJ.loadImg = function(url, event) {
  var dom = event.target;
  if (url && dom.src !== url) {
    var img = new Image();
    var This = this;
    img.src = url;
    img.addEventListener('load', function() {
      dom.src = img.src;
    });
  }
};
SZXJ.http = (This,_method, _url, _data, successfn, errorfn) => {
  // 设置登入请求头
  if (localStorage.getItem('JSESSIONID')) {
    Vue.http.headers.common['JSESSIONID'] = localStorage.getItem('JSESSIONID');
  }
  // 设置登入URL
  var _URL = _url;
  // GET请求
  if (_method === 'get') {
    Vue.http.get(_URL, _data).then(
      (response) => {
        if (response.data.length !== 0) {
          successfn(response);
        }
      },
      (err) => {
        if (!err.status) {
          return;
        }
        if (This.$refs.vueAlert || This.$parent.$refs.vueAlert) {
           var Utils = This.$refs.vueAlert ? This.$refs.vueAlert : This.$parent.$refs.vueAlert;
           Utils.setMessage(true, err.data.msg, function(){
            if(err.data.code == 901) { // 未登入
              location.href = PathList.TemprootPath + '/view/login.html';
              localStorage.removeItem('JSESSIONID');
            }
            if(err.data.code == 1001) { // 登入超时
              location.href = PathList.TemprootPath + '/view/login.html';
              localStorage.removeItem('JSESSIONID');
            }
           });
        }
        if (errorfn) {
            errorfn(err);
        }
      }
    );
  }
  // POST请求
  if (_method === 'post') {
    Vue.http.post(_URL, _data).then(
      (response) => {
        if (response.data.length !== 0) {
          successfn(response);
        }
      },
      (err) => {
        if (!err.status) {
          return;
        }
        if (This.$refs.vueAlert || This.$parent.$refs.vueAlert) {
           var Utils = This.$refs.vueAlert ? This.$refs.vueAlert : This.$parent.$refs.vueAlert;
           Utils.setMessage(true, err.data.msg, function(){
            if(err.data.code == 901) { // 未登入
              location.href = PathList.TemprootPath + '/view/login.html';
              localStorage.removeItem('JSESSIONID');
            }
            if(err.data.code == 1001) { // 登入超时
              location.href = PathList.TemprootPath + '/view/login.html';
              localStorage.removeItem('JSESSIONID');
            }

           });
        }
        if (errorfn) {
            errorfn(err);
        }
      }
    );
  }
  // 图片上传
  if (_method === 'upload') {
     // 
  }
};
export default SZXJ;