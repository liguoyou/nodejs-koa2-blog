const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 校验登录的中间件
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

// 所有中间件都使用 async 标识

// 错误输出
function errorOutput(ctx, error, text) {
  console.log(error)
  text = text || '查询数据失败'
  ctx.body = new ErrorModel(text)
}

// 获取博客列表
router.get('/list', async function(ctx, next) {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  // 管理员界面
  if (ctx.query.isadmin) {
    // 登录权限验证
    if (!ctx.session.username) {
      res.json(new ErrorModel('未登录'))
      return
    }

    // 强制查询自己的博客
    author = ctx.session.username
  }

  try {
    let listData = await getList(author, keyword)

    listData = listData || []
    ctx.body = new SuccessModel(listData)
  } catch (error) {
    errorOutput(ctx, error)
  }
})

// 获取博客详情
router.get('/detail', async function(ctx, next) {
  const id = ctx.query.id
  if (!id) {
    ctx.body = new ErrorModel('参数不能为空')
    return
  }

  getDetail(id)
    .then(data => {
      if (data && data[0]) {
        res.json(new SuccessModel(data[0]))
        return
      }

      console.log(data)
      res.json(new ErrorModel('未查询到数据'))
    })
    .catch(error => {
      errorOutput(res, error)
    })
})

// 新增博客
router.post('/new', async function(ctx, next) {
  ctx.body = {
    errno: 0,
    message: '新增成功',
    body: ctx.request.body
  }
})

// 更新博客
router.post('/update', async function(ctx, next) {
  ctx.body = {
    errno: 0,
    message: '更新成功',
    id: ctx.query.id,
    body: ctx.request.body
  }
})

// 删除博客
router.delete('/del', async function(ctx, next) {
  ctx.body = {
    errno: 0,
    id: ctx.query.id
  }
})

module.exports = router
