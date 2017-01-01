import Vue from '../../lib/vue.min.js';
var VueConfirm = Vue.extend({
  template:
  '<div v-if="flag" class="confirmBlock">'
      +'<div class="confirm_parent">'
        +'<div class="confirm_sub">'
           +'<p class="words"> {{message}}</p>'           
           +'<div @click="trueFn" class="true">确认</div>'
           +'<div @click="clearFn" class="flast">取消</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  ,
  components: {},
  props: {
  },
  data:function(){
    return {
      flag: false,
      message: '',
      Fn: '',
    }
  },
  methods: {
    setConfirm: function(message,Fn,id) {
      this.flag = true;
      this.message = message;
      this.Fn = Fn;
    },
    trueFn() {
      if (this.Fn) {
        this.Fn();       
      }
      this.flag = false;
    },
    clearFn() {
      this.flag = false;
    },
  },
  ready: function() {
  },
  route: { data() {} }
});
export default VueConfirm;