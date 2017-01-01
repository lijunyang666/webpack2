var ExtractTextPlugin = require("extract-text-webpack-plugin");


// multiple extract instances
const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name].less');


module.exports = {
  entry: {
    './src/app.js',
  }
  output: {
    path: './bin',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/, // 正则表达式
        exclude: /(node_modules|bower_components)/, // 不包含的意思
        loader: 'babel-loader', // 加载器
        query: { // 查询 此为查询属性
    	   	presets: ['es2015'], // 预设参数
    	   	plugins: ['transform-runtime']
    	  }
      },
      {
        test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
        loaders: [
          // 小于10KB的图片会自动转成dataUrl url? 表示使用url加载器 limit 表示限制 此限制大小未10kb
          'url?limit=10240&name=img/[hash:8].[name].[ext]',
          'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
        ]
      },
      {
        test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
        loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
      },
//    {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
      {test: /\.scss$/i, loader: extractCSS.extract(['css','sass'])},
      {test: /\.less$/i, loader: extractLESS.extract(['css','less'])},
      {test: /\.(tpl|ejs)$/, loader: 'ejs'},
//    { test: /\.scss$/, loader: 'style!css!sass'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    extractCSS,
    extractLESS
  ]
}




// http://webpack.github.io/docs/ // webpack 官网
// https://webpack.github.io/docs/list-of-loaders.html // 官网 加载器: 基本 包装 方言 模板 样式 翻译 支持


/*
 
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  cnpm install --save-dev webpack
  cnpm install --save-dev babel-core babel-preset-es2015 babel-loader
  cnpm install --save jquery babel-polyfill
  
  webpack
  webpack --progress --colors
  webpack --progress --colors --watch
  
  
  cnpm install webpack-dev-server -g
  webpack-dev-server --progress --colors
 
       这结合一个小express服务器在localhost:8080是静态资产以及包(自动编译)。 束时它会自动更新浏览器页面重新编译(SockJS)。 开放http://localhost:8080 / webpack-dev-server /包在您的浏览器中。
 
 
 
**/



// https://segmentfault.com/a/1190000005136764 前端工程化
/*


http://www.cnblogs.com/sloong/p/5826818.html webpack 教程加指纹 




cnpm install file-loader css-loader style-loader sass-loader ejs-loader html-loader jsx-loader image-webpack-loader --save-dev
cnpm install url-loader --save-dev
cnpm install extract-text-webpack-plugin --save-dev











 * */