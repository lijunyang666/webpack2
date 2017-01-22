项目要求支持有 webpack gulp
1.首先安装node 6.0以上版本
2.安装cnpm 
npm install -g cnpm --registry=https://registry.npm.taobao.org
3.cnpm install -g gulp webpack
4.cnpm install 
5.webpack 根据src生成dist项目


在6之前要配置合并雪碧图

6.1雪碧图合并

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
returncb(transformedDeclaration,declarationIndex,declarations);
}
//Backgroundisashorthandpropertysomakesure`url()`isinthere且判断url是否有?__spriter后缀
elseif(transformedDeclaration.property==='background'&&/\?__spriter/i.test(transformedDeclaration.value)){

transformedDeclaration.value=transformedDeclaration.value.replace('?__spriter','');
varhasImageValue=spriterUtil.backgroundURLRegex.test(transformedDeclaration.value);

if(hasImageValue){
returncb(transformedDeclaration,declarationIndex,declarations);
}
}

6.2gulp dist项目生成好以后,加指纹操作

7.node server 运行服务 此服务运行的是dist文件夹下的项目