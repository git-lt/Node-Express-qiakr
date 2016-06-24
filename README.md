# 洽客前端Node服务层

- 基于Express构建的前后端分离框架

## 技术栈
- Express4.0
- mockjs
- mocha
- node-zookeeper-dubbo
- jade
- redis
- mongodb
- validate-chain


## 目录设计

```
.
├── app.js        - 服务启动主文件
├── db            - MongoDB数据库文件
├── logs          - 日志记录
├── package.json  - NPM包依赖
├── server        - 服务端相关
│   ├── api       - 数据接口层
│   │   └── home  - 【项目】API接口
│   ├── common    - 公用工具
│   ├── middlerware  - 中间件
│   ├── mock         - 基于mockjs的数据模拟层
│   ├── models       - MongoDB数据模型层
│   ├── routes       - 路由及Controller层
│   │   └── home     - 【项目】项目视图
│   │   	└── index.js     - home项目的路由配置
│   │   	└── news.js      - 新闻数据的控制器
│   └── views        - 视图层
│       └── includes   - 后端模板片段
│       └── layout     - 后端模板母版页
│       └── pages      - 项目页面
│       	└── home      -【项目】项目页面
│       	└── ...       - 其它项目
├── static        - 静态资源相关
│   ├── home      - 【项目】项目静态资源
│   │   ├── css
│   │   ├── img
│   │   └── js
│   ├── libs      - 公共静态资源
│   └── ...       - 其它项目
└── test          - 基于mocha的单元测试目录
└── app.js        - node服务主文件
└── express.config.js        - node服务主配置文件

