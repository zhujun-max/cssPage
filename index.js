var fs = require('fs')
fs.readdir(process.cwd(), function (err, data) {
  var stats = [];    //避免再次执行fs.stat
  // console.log("");
  // if (!data.length) {
  //   return console.log('\033[31m No data to show!\033[39m\n');
  // }
  // console.log('	选择你要查看的文件或目录！\n');
  // console.log(data);
  data.map((d) => {
    // console.log(d);
    // 使用stat()方法，区分是文件还是目录
    //语法：fs.stat(路径+/+遍历后的数据d,回调函数)
   return fs.stat(__dirname+'/'+d,(err,stat) => {
      if (err) throw err
      if (stat.isDirectory()) {
        //判断当前文件是否是目录
        // console.log('目录:' + d);
      }else if (stat.isFile()) {
        //判断当前文件是否是普通文件
        // console.log('文件:'+d);
      }
    })
  })


  affr = data.filter((v) => {return v.indexOf('.') === -1})
  console.log(affr)
})