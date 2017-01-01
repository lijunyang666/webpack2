import Vue from '../../lib/vue.min.js';
import VueValidator from '../../lib/vue-resource.min.js';
Vue.use(VueValidator);
import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import headerOrfooter from '../../lib/require/headerOrfooter.js';
headerOrfooter();

var indexHtml = new Vue({
  el: '#app',
});