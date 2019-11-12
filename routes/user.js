const router = require('koa-router')()

router.prefix('/api/user')

// 用户登录
router.post('/login', async function(ctx, next) {
  ctx.body = {
    errno: 0,
    data: ctx.request.body
  }
})

module.exports = router
