import Vue from '../../lib/vue.min.js';
import header from '../../lib/components/header.js';
import footer from '../../lib/components/footer.js';
import VueAlert from '../../lib/apis/alert.js';
import VueConfirm from '../../lib/apis/confirm.js';

function headerOrfooter() {
  Vue.component('myheader', header);
  Vue.component('myfooter', footer);
  Vue.component('alert', VueAlert);
  Vue.component('confirm', VueConfirm);
}
export default headerOrfooter;