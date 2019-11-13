const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

// 用户登录
router.post('/login', async function(ctx, next) {
	const username = ctx.request.body.username
	const password = ctx.request.body.password

	if (!username) {
		ctx.body = new ErrorModel('用户名不能为空')
		return
	}

	if (!password) {
		ctx.body = new ErrorModel('密码不能为空')
		return
	}

	try {
		const resData = await login(username, password)
		if (resData && resData.username) {
			// 操作cookie
			ctx.session.username = resData.username
			ctx.session.realName = resData.realName

			ctx.body = new SuccessModel('登录成功')
			return
		}

		ctx.body = new ErrorModel('用户名或密码错误')
	} catch (error) {
		console.log(error)
		ctx.body = new ErrorModel('登录失败')
	}
})

// session-test
// router.get('/session-test', async (ctx, next) => {
// 	if (ctx.session.viewCount == null) {
// 		ctx.session.viewCount = 0
// 	}
// 	ctx.session.viewCount++

// 	ctx.body = {
// 		viewCount: ctx.session.viewCount
// 	}
// })

module.exports = router
