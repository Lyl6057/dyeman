
# dyeman_vue

## 项目地址
  - gitee: https://gitee.com/Forforever/dyeman
  - 发布地址 \\192.168.5.1\d$\Program\eWDFS\BPObject\vuePackage
    - warehouseMng 仓库
    - qualityMng 品质
    - proMng 生产
    - laboratory 化验室 
    - energyMng 能源
  - 提交代码请忽略路由、菜单中的index.js文件，以免造成冲突
    - src\router\index.js 路由 
    - src\page\index\sidebar\index.js 菜单
## 1. 重要目录及文档说明

|--build
|--config
|--src
|--api
|--|--assets 为系统整体图片存放目录
|--|--components 为常用组件存放文件夹
|--|--pages 布局界面、登录界面等
|--|--|--index 基础布局等
|--|--|--|--sidebar 右侧菜单栏
|--|--|--|--top 顶部菜单栏
|--|--|--|--index.vue 容器页面
|--|--|--login 登录页面
|--|--|--theme 主题
|--|--router 页面路由
|--|--view 功能页面路由
|--|--index.vue 主路由
|--|--seal 存放封装好的方法、数据等
|--|--styles 存放 css 等样式
|--|--|--font 存放 font
|--|--|--index.styl 页面 css
|--|--view 功能页面，文件构造为 功能模块/功能名称/index.vue
|--static 存放静态文件，如图片等

## 2. 环境说明

   UI 库：
   Avue、Element

   插件：
   npm install stylus stylus-loader css 预处理器
   <!-- npm install xlsx
   npm install core-js -->
   npm install --save vue-i18n 国际化 
   npm install --save node-sass // cnpm install node-sass    Node-sass 是一个库，它将 Node.js 绑定到 LibSass（流行样式表预处理器 Sass 的 C 版本）。它允许用户以令人难以置信的速度将.scss 文件本地编译为 css，并通过连接中间件自动编译。
   npm i default-passive-events -S 解决 Chrome 控制台 non-passive event listener 输出问题
   npm install stylus-loader css-loader style-loader --save-dev
   <!-- npm i xlsx-template 导出报表  -->
  npm install echarts --save echart图

## 3. 开发规则

## 4. 部署说明
