# 实现博客后台开发 koa2 版 - 重构 express 版本

express 中间件是异步回调, koa2 原生支持 async/await


## 内容

- 采用 koa2 框架来重构原生版本的博客后台开发
- 使用 cookie-parser, koa-generic-session, redis, koa-redis 保存登录状态
- 登录校验中间件
- srypto 加密和哈希算法，对密码加密
- 采用 koa-logger, koa-morgan 实现日志记录
- 安全处理: 防止 xss注入, sql 注入
- 在 nodejs 原生的版本上, 做了更多的错误判断, 日志输出处理, 让接口更具健壮性, 接口的输出类型更明确

***

## 接口列表

### 所有错误情况

返回:
```
{
  errno: -1,
  message: '错误信息'
}
```

### 获取博客列表 `/api/blog/list`

请求: `get`

参数: 

|  参数   |  类型  | 必填  |  备注  |
| :-----: | :----: | :---: | :----: |
| author  | string |  否   |  作者  |
| keyword | string |  否   | 关键词 |

示例: 
```
/api/blog/list
```

返回:
```
{
    "data": [
        {
            "id": 4,
            "title": "博客标题B",
            "content": "博客内容B",
            "author": "guoyou",
            "createtime": 1572779934093,
            "state": 1
        },
        {
            "id": 3,
            "title": "博客标题A",
            "content": "博客内容A",
            "author": "guoyou",
            "createtime": 1572779880317,
            "state": 1
        }
    ],
    "errno": 0
}
```

[查看所有接口列表](./API.md)


- 博客前端代码: [nodejs-blog-html](https://github.com/liguoyou/nodejs-blog-html)
- [原生开发版](https://github.com/liguoyou/nodejs-blog)
- [express 重构版](https://github.com/liguoyou/nodejs-express-blog)

学习来源: [前端晋升全栈工程师必备课程 Node.js 从零开发 web server 博客项目](https://coding.imooc.com/class/320.html)