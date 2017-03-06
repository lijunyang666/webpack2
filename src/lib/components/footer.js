import Vue from '../../lib/vue.min.js';
import PathList from '../../lib/apis/conf.js';
var footer = Vue.extend({
  template: '<footer class="qcacg-footer-parent"><div class="qcacg-footer"><div class="qcacg-top"><div class="pull-left qcacg-footer-block"><p class="qcacg-title">关于</p><p class="qcacg-content"><a href="javascript:;">关于我们</a></p><p class="qcacg-content"><a href="javascript:;">免责声明</a></p><p class="qcacg-content"><a href="javascript:;">公司信息</a></p><div class="qcacg-hr"></div></div><div class="pull-left qcacg-footer-block"><p class="qcacg-title">联系方式</p><p class="qcacg-content"><a href="javascript:;">微博</a></p><p class="qcacg-content"><a href="javascript:;">电子邮件</a></p><div class="qcacg-hr"></div></div><div class="pull-left qcacg-footer-block"><p class="qcacg-title">投稿</p><p class="qcacg-content"><a href="javascript:;">签约制度</a></p><p class="qcacg-content"><a href="javascript:;">作者福利</a></p><p class="qcacg-content"><a href="javascript:;">签约流程</a></p><p class="qcacg-content"><a href="javascript:;">约稿函</a></p><p class="qcacg-content"><a href="javascript:;">投稿流程</a></p><div class="qcacg-hr"></div></div><div class="pull-left qcacg-footer-block"><p class="qcacg-title">友情链接</p>'
  // +'<p class="qcacg-content"><a href="javascript:;">米画师</a></p><p class="qcacg-content"><a href="javascript:;">网易GACHA</a></p><p class="qcacg-content"><a href="javascript:;">MissEvan_M站</a></p>'
  +'</div><div class="qcacg-footer-logo" onclick="location.href="path.TemprootPath + \'/index.html\'">轻创文学网</div></div><div class="qcacg-bottom"><p>杭州轻创网络科技有限公司<span class="driver"> |</span>浙ICP备16021285号</p></div></div></footer>'
  +'<div style="text-align: center;background-color: #f2f2f2;margin-top: -10px;">'
  +'<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602007631" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../img/police.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#c8cbcc;">浙公网安备 33010602007631号</p></a>'
  +'</div>'
  ,
    data:function(){
    return {
      path: PathList,
    }
  },
});

export default footer;