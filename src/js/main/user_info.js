import Vue from '../../lib/vue.min.js';
import VueValidator from '../../lib/vue-resource.min.js';
import VueRouter from '../../lib/vue-router.min.js';
Vue.use(VueValidator);
Vue.use(VueRouter);
import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';


import header from '../../lib/components/header.js';
import footer from '../../lib/components/footer.js';
import VueAlert from '../../lib/apis/alert.js';
import VueConfirm from '../../lib/apis/confirm.js';
import bookBlockList from '../../lib/components/bookBlockList.js';
import works from '../../lib/components/works.js';
import worksUpdate from '../../lib/components/worksUpdate.js';
import catalogue from '../../lib/components/catalogue.js';
import chapter from '../../lib/components/chapter.js';
import chapter_edit from '../../lib/components/chapter_edit.js';
import info from '../../lib/components/info.js';
import updatePass from '../../lib/components/updatePass.js';
import bookshelf from '../../lib/components/bookshelf.js';
import record from '../../lib/components/record.js';
import attention from '../../lib/components/attention.js';
import attentionToMe from '../../lib/components/attentionToMe.js';
import message from '../../lib/components/message.js';
import tellMe from '../../lib/components/tellMe.js';
import relevant from '../../lib/components/relevant.js';
import system from '../../lib/components/system.js';
import official from '../../lib/components/official.js';
import wallet from '../../lib/components/wallet.js';
import bill from '../../lib/components/bill.js';
var router = new VueRouter();
router.map({
  '/bookBlockList': { component: bookBlockList },
  '/works': { component: works },
  '/works_update/:id': { component: worksUpdate },
  '/catalogue/:id':{ component: catalogue },
  '/chapter/:id':{ component: chapter },
  '/chapter_edit/:id':{ component: chapter_edit },
  '/info': { component: info },
  '/updatePass': { component: updatePass },
  '/bookshelf': { component: bookshelf },
  '/record': { component: record },
  '/attention': { component: attention },
  '/attentionToMe': { component: attentionToMe },
  '/message': { component: message },
  '/tellMe': { component: tellMe },
  '/relevant': { component: relevant },
  '/system': { component: system },
  '/official': { component: official },
  '/wallet': { component: wallet },
  '/bill': { component: bill },
})
var App = Vue.extend({
  el: '#app',
  data: function() {
    return {
      bodyFlag: false,
      path: PathList,
      active: '',
      userName: '',
      loginImg:'',
    }
  },
  methods: {
    setShowFlagFn: function() {
      const href = window.location.href;
      const str = href.substring(href.lastIndexOf('#!/') + 3, href.length);
      this.$set('active', str);
    },
    setMessage(flag,message,Fn) {
      this.$refs.vueAlert.setMessage(flag,message,Fn);
    }
  },
 ready : function (){
    this.bodyFlag = true;
    this.setShowFlagFn();
  },
});
App.component('myfooter', footer);
App.component('myheader', header);
App.component('alert', VueAlert);
App.component('confirm', VueConfirm);
router.redirect({
  '*': 'info',
});
router.start(App, '#app');
  