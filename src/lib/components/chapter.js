// 投稿-第四页 作者新建章节页
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
   var chapter = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">contribute</div><div class="titleBlock_LG">个人投稿</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li v-link="{path: \'/bookBlockList\'}"><span class="circular"></span><span class="title_name">轻小说</span></li><li v-if="showFlag === 999"><span class="circular"></span><span class="title_name">画集</span></li><li v-link="{path: \'/works\'}"><span class="circular"></span><span class="title_name">创建作品</span></li></ul>'
      +'<div class="content"><div class="chapter"><span>章节</span><span>chapter</span><div class="labelTitle clear"><label class="label">标题:</label><input type="text" class="input" placeholder="请输入章节名" v-model="contentTitle"  /></div><div class="inputTextarea clear"><textarea id="ipt-content-post" required="" spellcheck="false" placeholder="" class="form-control input-sm" style="display: none;"></textarea><div class="chapter_handle"><div class="handle_right"><div><span  v-on:click="submitFn">保存章节</span>'
      +'<span><a href="javascript:;" style="width:100%;height:100%;display:inline-block;color:#ffffff;" onclick="history.back(-1);">返回</a></span></div></div></div></div></div></div>'
      +'</div></div></div>'
    ,data: function() {
    	return {
    		contentTitle: '',
    		id: -1,
    		fontSize: 0,
    	}
    }
    
    ,route: { 
        data() {
        	const href = window.location.href;
            this.id = href.substring(href.lastIndexOf('/') + 1, href.length);
        } 
    },

      ready: function() {
        this.editorFn();
      }
      ,methods: {
        submitFn: function() {
          var _URL = PathList.saveOrUpdateContent;
          var _data = {
            formatText: this.editor.$txt.formatText(),      //文本格式化内容
            content: this.editor.$txt.html(),      //文本html内容
            contentTitle: this.contentTitle,    // 内容名称
            volumeId: this.id, // 卷id
            contentId: null,
          };
    		  SZXJ.http(this,'post', PathList.saveOrUpdateContent, _data, (response) => {
          	history.back();
        	});
        },
        getBookListFn: function() {
        	
        },
        editorFn:function() {
          var textarea = document.getElementById('ipt-content-post');
          this.editor = new wangEditor(textarea);
          this.editor.config.uploadImgUrl = PathList.rootPath +　'/content/upload.shtml';
          this.editor.config.uploadHeaders = {
          	'JSESSIONID': localStorage.getItem('JSESSIONID'),
          };
          var This = this;
          this.editor.onchange = function () {
            This.fontSize = This.editor.$txt.formatText().toString().length;
  	        console.log(This.editor.$txt.formatText().toString().length);
	        };
          this.editor.config.menus = ['emotion', 'img', "undo", "redo","fullscreen"];
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
        }
      }
   });
export default chapter;