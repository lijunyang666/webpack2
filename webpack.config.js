var path = require('path');
var fs = require("fs");
var glob = require('glob');
var Parser = require('xml2js').Parser();
 


// 获取 src/js下 所有.js文件
var files = glob.sync('src/js/**/*.js');
var entries = {};
files.forEach(function(filepath) {
  // 取倒数第二层(view下面的文件夹)做包名
  var filepathNotSrc = filepath.substring(filepath.indexOf('/') + 1, filepath.length);
  var filepathName = filepathNotSrc.substring(0, filepathNotSrc.length - 3);
  entries[filepathName] = './' + filepath;
});

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
function readFile(path, newPath){
  var Suffix = path.substring(path.lastIndexOf('.') + 1, path.length);
  if(Suffix === 'html') {
    fs.readFile(path,'utf8',function(err, data) {
      if (err) {
        console.log("读取失败");
        return false;
      }
//    Parser.parseString(data.toString(), function (error, result) {
//      if (error) {
//        console.log(path);
//        console.log(error);
//        return false;
//      }
//      // console.dir(result);
//    });
      writeFile(data, newPath);
    });
  } else {
    fs.readFile(path, function(err, data) {
      if (err) {
        console.log("读取失败");
        return false;
      }
      writeFile(data, newPath);
    });
  }
}
function writeFile(data,path){
  fs.writeFile(path, data, function(error){
    if(error){
      throw error;
    }else{
      // console.log("文件已保存");  
    }
  });
}
var addFolderRecursive = function(srcPath, distPath) {
  var files = [];
  if( fs.existsSync(srcPath) ) {
    files = fs.readdirSync(srcPath);
    files.forEach(function(file,index){
      var curPath = srcPath + "/" + file;
      var newPath = distPath + "/" + file;
      if(fs.statSync(curPath).isDirectory()) {
        fs.exists(newPath, function( exists ){
          if (!exists ) {
            fs.mkdirSync(newPath);
          }
        });
        addFolderRecursive(curPath,newPath);
      } else {
        var data = readFile(curPath,newPath);
      }
    });
  }
}

deleteFolderRecursive(path.join(__dirname, "./dist"));
fs.mkdirSync(path.join(__dirname, "./dist"));
addFolderRecursive(path.join(__dirname, "./src"), path.join(__dirname, "./dist"));

module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, "./dist/"), //文件输出目录
    filename: '[name].js',
    chunkFilename: '[id].[hash].common.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
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
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components', 'web_modules'] // 告诉我们先找 node_modules 在找 bower_components 最后找web_modules 寻找第三方模块
  }
};