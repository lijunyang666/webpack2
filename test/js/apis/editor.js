var editor = Vue.extend({
  template: 
  '<textarea id="{{id}}" required="" spellcheck="false" placeholder="" class="form-control input-sm" style="display: none;"></textarea>'
  ,
  components: {},
  props: {
    id: {
      type: String,
    },
    editor: {
      type: Object,
    }
  },
  data:function(){
    return {
    }
  },
  methods: {
    getEditor() {
      return this.editor;
    }
  },
  ready: function() {
    var textarea = document.getElementById(this.id);
    this.editor = new wangEditor(textarea);
    this.editor.config.uploadImgUrl = PathList.rootPath +　'/img/emotion/qcacgGirl';
    this.editor.config.uploadHeaders = {
      'JSESSIONID': localStorage.getItem('JSESSIONID'),
    }
    this.editor.config.menus = ['emotion','img'];
    this.editor.config.emotions = {
      'default': {
        title: '轻悦娘',
        data: [
          {
            'icon': PathList.rootPath　+　'/img/不明所以然.jpg',
            'value': '[不明所以然]'
          },
          {
            'icon': PathList.rootPath　+　'/img/伤心欲绝.jpg',
            'value': '[伤心欲绝]'
          },
          {
            'icon': PathList.rootPath　+　'/img/发呆.jpg',
            'value': '[发呆]'
          },
          {
            'icon': PathList.rootPath　+　'/img/吃惊.jpg',
            'value': '[吃惊]'
          },
          {
            'icon': PathList.rootPath　+　'/img/哭泣.jpg',
            'value': '[哭泣]'
          },
          {
            'icon': PathList.rootPath　+　'/img/害羞.jpg',
            'value': '[害羞]'
          },
          {
            'icon': PathList.rootPath　+　'/img/就是那个.jpg',
            'value': '[就是那个]'
          },
          {
            'icon': PathList.rootPath　+　'/img/微笑.jpg',
            'value': '[微笑]'
          },
          {
            'icon': PathList.rootPath　+　'/img/恼怒.jpg',
            'value': '[恼怒]'
          },
          {
            'icon': PathList.rootPath　+　'/img/悲伤.jpg',
            'value': '[悲伤]'
          },
          {
            'icon': PathList.rootPath　+　'/img/战斗力渣渣.jpg',
            'value': '[战斗力渣渣]'
          },
          {
            'icon': PathList.rootPath　+　'/img/抛媚眼.jpg',
            'value': '[抛媚眼]'
          },
          {
            'icon': PathList.rootPath　+　'/img/早就看穿一切.jpg',
            'value': '[早就看穿一切]'
          },
          {
            'icon': PathList.rootPath　+　'/img/汗.jpg',
            'value': '[汗]'
          },
          {
            'icon': PathList.rootPath　+　'/img/菜刀.jpg',
            'value': '[菜刀]'
          },
          {
            'icon': PathList.rootPath　+　'/img/那个有没有.jpg',
            'value': '[那个有没有]'
          },
          {
            'icon': PathList.rootPath　+　'/img/震惊.jpg',
            'value': '[震惊]'
          },
          {
            'icon': PathList.rootPath　+　'/img/高兴.jpg',
            'value': '[高兴]'
          },
          {
            'icon': PathList.rootPath　+　'/img/默默地看着.jpg',
            'value': '[默默地看着]'
          }
        ]
      }
    };
    this.editor.create();
  },
  route: {data() {}}
});