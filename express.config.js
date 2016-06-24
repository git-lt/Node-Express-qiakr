/**
 * 框架基本配置模块
 */

module.exports = {
  debug: false,

  cdn_host: '',
  host: 'localhost',

  // MongoDB 配置
  db: '...',

  // Redis 配置
  redis_host: '127.0.0.1',
  redis_port: 3434,
  redis_db: 0,

  session_secret: 'xxxx',
  auth_cookie_name: 'xxxx',

  // 端口号
  port: 3001,

  // qiniu
  ACCESS_KEY:'',
  SECRET_KEY:'',

  // user
  uName:'xxx',
  uPassword:'x!@#',

  // zookeeper
  zk:{
    env: '1.0.0',
    conn: '127.0.0.1:2828', 
    version: '2.5.3'
  }
};
