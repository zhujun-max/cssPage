// 作用：执行node file.js 可获取根目录的所有文件夹名称
// 想法：最开始是想直接获取文件目录，动态展示文件夹中的内容。但最后在浏览器中执行fs模块文件一直报错，导致无法使用，只能手动获取名称后替换到index.js文件arr下。
// 思路： 使用WebContainers，在浏览器中使用node。但是使用fs文件模块一直报错，就不想管了
var fs = require("fs");
fs.readdir(process.cwd(), function (err, data) {
  // 找出所有文件夹，排除掉以下字段中的文件，或者带有该字段的后缀名的文件。
  console.log(JSON.stringify(data.filter((v) =>
    !["js", "json", "md", "git", "html"].includes(v.split(".").pop())
  )))
  data.map((d) => {
    // console.log(d);
    // 使用stat()方法，区分是文件还是目录
    //语法：fs.stat(路径+/+遍历后的数据d,回调函数)
    return fs.stat(__dirname + "/" + d, (err, stat) => {
      if (err) throw err;
      if (stat.isDirectory()) {
        //判断当前文件是否是目录
        // console.log(d);
      } else if (stat.isFile()) {
        //判断当前文件是否是普通文件
        // console.log('文件:'+d);
      }
    });
  });
});
