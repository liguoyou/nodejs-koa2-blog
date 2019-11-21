## 接口列表

### 所有错误

返回:
```
{
  errno: -1,
  message: '错误信息'
}
```

***

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

***

### 获取博客详情 `/api/blog/detail?id=`

请求: `get`

参数:

| 参数  | 类型  | 必填  |  备注  |
| :---: | :---: | :---: | :----: |
|  id   |  int  |  是   | 博客id |

示例: 
```
/api/blog/detail?id=3
```

返回:
```
{
    "data": {
        "id": 3,
        "title": "博客标题A",
        "content": "博客内容A",
        "author": "guoyou",
        "createtime": 1572779880317,
        "state": 1
    },
    "errno": 0
}
```

***

### 新增博客 `/api/blog/new`

请求: `post`

body: 

|  参数   |  类型  | 必填  |   备注   |
| :-----: | :----: | :---: | :------: |
|  title  | string |  是   | 博客标题 |
| content | string |  是   | 博客内容 |

示例:
```
{
  "title": "博客标题",
  "content":"博客内容"
}
```

返回: 
```
{
    "data": {
        "id": 19
    },
    "errno": 0
}
```

***

### 更新博客 `/api/blog/update?id=`

请求: `post`

参数: id 博客id

body: 

|  参数   |  类型  | 必填  |   备注   |
| :-----: | :----: | :---: | :------: |
|  title  | string |  是   | 博客标题 |
| content | string |  是   | 博客内容 |

示例:
```
/api/blog/update?id=3

// body
{
  "title": "博客标题",
  "content":"博客内容"
}
```

返回: 
```
{
    "message": "更新成功",
    "errno": 0
}
```

***

### 删除博客 `/api/blog/del?id=`

请求: `delete`

示例:
```
/api/blog/del?id=3
```

返回: 
```
{
    "message": "删除成功",
    "errno": 0
}
```

***

### 用户登录 `/api/user/login`

请求: `post`

body: 

|   参数   |  类型  | 必填  |   备注   |
| :------: | :----: | :---: | :------: |
| username | string |  是   |  用户名  |
| password | string |  是   | 用户密码 |

示例:
```
{
  "username": "guoyou",
  "password": "123"
}
```

返回: 
```
{
    "message": "登录成功",
    "errno": 0
}
```