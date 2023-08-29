# NodeJSBackendTemplate

一个基于express+mongodb的简单Nodejs后端开发框架

实现了基本的响应头重写（限制xss），服务端异常处理，时间攻击处理，简单路由分配，服务器简单日志记录等

## 结构

`/controllers`：后端执行功能的主要代码

`/middleware`：自定义的一些中间件，比如身份验证，请求频率限制，响应头重写，日志记录等等

`/model`：mongodb的一切数据库存储对象模型的声明

`/routers`：路由模块，目前有默认的错误路由处理和404路由处理，还可以根据api种类添加自己的路由

`/static`：静态资源，可用于存储前端的静态html，css，js等等，做到一个项目包含前后端

`/utils`：工具类

`.env`：开发时的环境变量配置文件，生产环境不必使用

`index.js`：主程序入口

## 环境变量

`MONGODB`：mongodb的srv数据库地址

`BACKENDPORT`：后端服务运行的端口，express服务将挂接这个端口

`DOMAIN`：主站的域名，当为localhost时，程序认为处于开发环境

`FRONTPORT`：前端运行的端口，目前还没什么用，保留

`FRONTDOMAIN`：前端的域名，用于安全头进行跨域设置，域名需要携带http/https协议

