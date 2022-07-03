# vue加载远程组件示例

## 远程组件端
配置文件设置端口为`3066`
1. 安装所有依赖包
```
npm i
```
2. 打包已有的组件
```
npm run build
```
3. 启动服务静态服务
```
npm run comp
```
可以在浏览器中输入`http://localhost:3066/LayoutOne.js`,即可查看打包与服务是否成功

## 加载远程组件的客户端
1. 安装所有依赖包
```
npm i
```
2. 启动项目
```
npm run serve
```
打开页面，点击顶部 `remote`连接，即可看到远程加载的组件

**注意：rollup-plugin-vue在这里必须为5.x版本**

### 参考连接
- https://markus.oberlehner.net/blog/distributed-vue-applications-loading-components-via-http
- https://juejin.cn/post/6992483283187531789