// // 投稿-第三页 显示作者作品目录页
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
   var catalogue = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">contribute</div><div class="titleBlock_LG">个人投稿</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li v-link="{path: \'/bookBlockList\'}"><span class="circular"></span><span class="title_name">轻小说</span></li><li v-if="showFlag === 999"><span class="circular"></span><span class="title_name">画集</span></li><li v-link="{path: \'/works_update/\' + id}"><span class="circular"></span><span class="title_name">修改信息</span></li></ul>'
      +'<div class="content"><div class="catalogue"><div class="catalogue_header"><span>作品目录</span><span>catalogue</span></div>'
      +'<div class="newBookChapter" v-if="newBookChapter"><div class="clearX" v-on:click="newBookChapterClearFn">x</div><h4 class="newBookTitle">请输入卷的标题</h4><div><input type="text" class="inputText" placeholder="第一卷" v-model="volume" /></div><div class="hr"></div><a href="javascript:;" class="btn-addBookChapter" v-on:click="submitVolumeFn">提交</a></div>'
      +'<div class="SubmitAudit" v-if="SubmitAudit"><div class="clearX" v-on:click="SubmitAuditClearFn">x</div><h4 class="newBookTitle">提交审核</h4><div><textarea type="text" class="inputTextTow" placeholder="我想对编辑说(选填)" v-model="volume" /></textarea></div><div class="hr"></div><a href="javascript:;" class="btn-addBookChapter" >提交</a></div>'

      +'<div class="newBookChapter" v-if="updateBookChapter"><div class="clearX" v-on:click="updateVolumeFn">x</div><h4 class="newBookTitle">修改卷的标题</h4><div><input type="text" class="inputText" placeholder="修改卷名称" v-model="updateBookChapterName" /></div><div class="hr"></div><a href="javascript:;" class="btn-addBookChapter" v-on:click="updateVolumeNameFn">提交</a></div>'
      
      +'<div class="newBookChapter" v-if="updateBookContentChapter"><div class="clearX" v-on:click="updateContentFn">x</div><h4 class="newBookTitle">修改章节的名称</h4><div><input type="text" class="inputText" placeholder="修改章节名称" v-model="updateBookContentChapterName" /></div><div class="hr"></div><a href="javascript:;" class="btn-addBookChapter" v-on:click="updateContentNameFn">提交</a></div>'
      
      
      +'<div class="catalogue_list" v-for="obj in volumeCustomList"><div class="list_title"><h4 class="listBlock">{{obj.volumeName}}<span style="font-size:12px; padding-left:5px; font-weight:normal;  ">({{obj.volumeWordCount}})</span></h4>'
      +'<div class="list_action">'
      +'<a v-if="$index !== 0" @click="volumeChange(volumeCustomList[$index - 1].volumeId, volumeCustomList[$index].volumeId)" href="javascript:;">前移</a>'
      +'<a v-else style="color:#cccccc;cursor: not-allowed;" href="javascript:;">前移</a>'
      +'<a v-if="$index !== volumeCustomList.length - 1" @click="volumeChange(volumeCustomList[$index].volumeId, volumeCustomList[$index + 1].volumeId)" href="javascript:;">后移</a>'
      +'<a v-else style="color:#cccccc;cursor: not-allowed;" href="javascript:;">后移</a>'
      +'<a href="javascript:;" @click="volumeDelete(volumeCustomList[$index].volumeId)">删除</a>'
      +'<a href="javascript:;" @click="updateVolumeFn(volumeCustomList[$index].volumeId)">重命名</a>'
      +'</div></div>'
      +'<div class="create_chapter"><div class="chapter_header clear"><div class="line" v-for="bookObj in obj.contentEntityList"> <div class="lineIcon"><img src="../img/chapter_icon.jpg" /> <div class="handle_left">'
      +'<p @click="contentChange(obj.contentEntityList[$index - 1].contentId, obj.contentEntityList[$index].contentId)" v-if="$index !==0"><img src="../img/to_right.jpg" /> 章节前移</p>'
      +'<p v-else style="color:#cccccc;cursor: not-allowed;"><img src="../img/to_right.jpg" /> 章节前移</p>'
      +'<p @click="contentChange(obj.contentEntityList[$index].contentId, obj.contentEntityList[$index + 1].contentId)"  v-if="$index !== obj.contentEntityList.length - 1"><img src="../img/to_right.jpg" /> 章节后移</p>'
      +'<p v-else style="color:#cccccc;cursor: not-allowed;"><img src="../img/to_right.jpg" /> 章节后移</p>'
      +'<p @click="contentDelete(bookObj.contentId)"><img src="../img/to_right.jpg"/> 删除章节</p>'
      +'<p @click="updateContentFn(bookObj.contentId,bookObj.volumeId)"><img src="../img/to_right.jpg" /> 重命名</p>'
      +'</div></div><span class="span" uid="{{bookObj.volumeId}}"  uid2="{{bookObj.contentId}}" v-link="{path: \'/chapter_edit/\' + bookObj.volumeId + \'_\' +  bookObj.contentId }">{{bookObj.contentTitle}}</span></div><div class="line"><div class="lineIcon"><img src="../img/create_icon.jpg" />              </div>              <span class="span" uid="{{obj.volumeId}}" v-link="{ path: \'/chapter/\' + obj.volumeId }">创建新章节</span></div></div></div></div><div class="chapter_handle"><div class="handle_right"><div><span  v-on:click="newBookChapterFn">新增卷</span><span  v-on:click="SubmitAuditFn">提交审核</span>'
      +'<span style="display:none;">提交审核</span>'
      +'</div></div></div></div></div>'
      +'</div></div></div>'	
    ,data: function() {
        return {
        volumeCustomList: [],
        newBookChapter:false,
        SubmitAudit:false,
        updateBookChapter:false,
        updateBookChapterId: '',
        updateBookChapterName: '',
        //
        updateBookContentChapter: false,
        updateBookContentChapterId: '',
        updateBookContentChapterVolumeId: '',
        updateBookContentChapterName: '',
        //
        id: '',
        volume: '',
        };
      }
    ,route: {
      data() {
        var href = window.location.href;
        this.id = href.substring(href.lastIndexOf('/') + 1, href.length);
        this.getBookListFn();
      } 
    }
      ,methods: {
        contentChange(contentUpId, contentDownId) {
          var _data = {};
          _data.contentUpId = contentUpId;
          _data.contentDownId = contentDownId;
          SZXJ.http(this,'get', PathList.contentChange, _data, 
          (response) => {
            this.getBookListFn();
          });
        },
        contentDelete(contentId) {
          var This = this;
          this.$parent.$refs.vueConfirm.setConfirm('是否删除此章节',function(){
            var _data = {};
            _data.contentId = contentId;
            SZXJ.http(this,'get', PathList.removeContent, _data, 
            (response) => {
              This.getBookListFn();
            });
          });
        },
        updateContentFn(volumeId, updateBookContentChapterVolumeId) {
          if (this.updateBookChapter) {
            this.$set('updateBookContentChapter', false);
            this.$set('updateBookContentChapterId', '');
            this.$set('updateBookContentChapterName', '');
            this.$set('updateBookContentChapterVolumeId', '');
          } else {
            this.$set('updateBookContentChapter', true);
            this.$set('updateBookContentChapterId', volumeId);
            this.$set('updateBookContentChapterVolumeId', updateBookContentChapterVolumeId);
          }
        },
        updateContentNameFn() {
          var _data = {
            contentTitle: this.updateBookContentChapterName, // 标题
            contentId: this.updateBookContentChapterId, // 卷 id
          };
          SZXJ.http(this,'post', PathList.saveOrUpdateContent, _data, 
            (response) => {
              this.$set('updateBookContentChapter', false);
              this.$set('updateBookContentChapterId', '');
              this.$set('updateBookContentChapterVolumeId', '');
              this.$set('updateBookContentChapterName', '');
              this.getBookListFn();
            });
        },
        volumeChange(volumeUpId, volumeDownId) {
          var _data = {};
          _data.volumeUpId = volumeUpId;
          _data.volumeDownId = volumeDownId;
          SZXJ.http(this,'get', PathList.volumeChange, _data, 
          (response) => {
            this.getBookListFn();
          });
        },
        volumeDelete(volumeId) {
          var This = this;
          this.$parent.$refs.vueConfirm.setConfirm('是否删除卷',function(){
            var _data = {};
            _data.volumeId = volumeId;
            SZXJ.http(this,'get', PathList.removeVolume, _data, 
            (response) => {
              This.getBookListFn();
            });
          });
        },
        updateVolumeFn(volumeId) {
          if (this.updateBookChapter) {
            this.$set('updateBookChapter', false);
            this.$set('updateBookChapterId', '');
            this.$set('updateBookChapterName', '');
          } else {
            this.$set('updateBookChapter', true);
            this.$set('updateBookChapterId', volumeId);
          }
        },
        updateVolumeNameFn() {
          var _data = {};
          _data.bookId = parseInt(this.id, 10);
          _data.volumeName = this.updateBookChapterName;
          _data.volumeId = this.updateBookChapterId;
          SZXJ.http(this,'post', PathList.saveOrUpdateVolume, _data, 
            (response) => {
              this.$set('updateBookChapter', false);
              this.$set('updateBookChapterId', '');
              this.$set('updateBookChapterName', '');
              this.getBookListFn();
            });
        },
        getBookListFn: function() {
          var _data = {};
          _data.bookId = parseInt(this.id, 10);
          SZXJ.http(this,'get', PathList.queryBook, _data, 
          (response) => {
          	console.log(response);
            this.$set('volumeCustomList', response.data.bookCustom.volumeCustomList);
          });
        },
        newBookChapterFn: function() {
          this.$set('newBookChapter', true);
        },
         SubmitAuditFn: function() {
          this.$set('SubmitAudit', true);
        },
        
        newBookChapterClearFn: function() {
          this.$set('newBookChapter', false);
        },
        SubmitAuditClearFn: function() {
          this.$set('SubmitAudit', false);
        },
        submitVolumeFn: function() {
          var _data = {};
          _data.bookId = parseInt(this.id, 10);
          _data.volumeName = this.volume;
          _data.volumeId = '';
          SZXJ.http(this,'post', PathList.saveOrUpdateVolume, _data, 
            (response) => {
              this.$set('newBookChapter', false);
              this.volume = '';
              this.getBookListFn();
            });
        }
      }
   });
export default catalogue;   