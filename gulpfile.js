var gulp = require('gulp');
var md5 = require('gulp-md5-plus');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var del = require('del');
var spriter = require('gulp-css-spriter');
var base64 = require('gulp-css-base64');


var path = require('path');
var fs = require("fs");
var deleteFolderRecursive = function(path) {
  var files = [];
  if( fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    files.forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath,function(err){
          if(err){
            throw err;
          }
        });
  
      } else { // delete file
        fs.unlinkSync(curPath);
  
      }
    });
    fs.rmdirSync(path);
  }
};
// deleteFolderRecursive(path.join(__dirname, "./dist/img"));
// sdeleteFolderRecursive(path.join(__dirname, "./dist/css"));
// deleteFolderRecursive(path.join(__dirname, "./dist/js"));



//  gulp.task('clean', function(cb) {
//    del(['dist/css/*.css', 'dist/js/main/*.js'], cb)
//  });




gulp.task('md5:js', function (done) {
    gulp.src('dist/js/main/*.js')
        .pipe(uglify())
        .pipe(md5(10, 'dist/**/*.html'))
        .pipe(gulp.dest('dist/js/main'))
        .on('end', done);
});


gulp.task('md5:css', function (done) {
    var timestamp = +new Date();
    gulp.src('src/css/*.css')
//      .pipe(spriter({
//          spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
//          pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
//          spritesmithOptions: {
//              padding: 10
//          }
//      }))
        // .pipe(base64())
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(md5(10, 'dist/**/*.html'))
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

gulp.task('default', function (done) {
    gulp.run('md5:js', 'md5:css');
});

