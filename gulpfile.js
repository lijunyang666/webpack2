var gulp = require('gulp');
var md5 = require('gulp-md5-plus');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var del = require('del');
var spriter = require('gulp-css-spriter');
var base64 = require('gulp-css-base64');
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
    gulp.src('dist/css/*.css')
        .pipe(spriter({
            spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
            spritesmithOptions: {
                padding: 10
            }
        }))
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



/*
1.雪碧图合并

gulp-css-spriter默认会对样式文件里，所有的background/background-image的图片合并，

但实际项目中，我们不是所有的图片都需要合并。

background-image:url(../slice/p1-3.png?__spriter);//有?__spriter后缀的合并

background-image:url(../slice/p-cao1.png);//不合并
 
修改下面文件可以按需合并。

node_modules\gulp-css-spriter\lib\map-over-styles-and-transform-background-image-declarations.js

48行开始的if-else if代码块中，替换为下面代码：

//background-imagealwayshasaurl且判断url是否有?__spriter后缀

if(transformedDeclaration.property==='background-image'&&/\?__spriter/i.test(transformedDeclaration.value)){

transformedDeclaration.value=transformedDeclaration.value.replace('?__spriter','');
return cb(transformedDeclaration,declarationIndex,declarations);
}
//Backgroundisashorthandpropertysomakesure`url()`isinthere且判断url是否有?__spriter后缀
else if (transformedDeclaration.property==='background'&&/\?__spriter/i.test(transformedDeclaration.value)){

transformedDeclaration.value=transformedDeclaration.value.replace('?__spriter','');
var hasImageValue=spriterUtil.backgroundURLRegex.test(transformedDeclaration.value);

if(hasImageValue){
return cb(transformedDeclaration,declarationIndex,declarations);
}
}
 
* */