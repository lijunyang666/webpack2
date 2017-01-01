Vue.component('myheader', header);
Vue.component('myfooter', footer);
if (typeof VueAlert !== 'undefined') {
  Vue.component('alert', VueAlert);
}
if (typeof VueConfirm !== 'undefined') {
  Vue.component('confirm', VueConfirm);
}
if (typeof editor !== 'undefined') {
  Vue.component('editor', editor);
}