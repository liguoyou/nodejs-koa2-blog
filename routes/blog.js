const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
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

	try {
		const data = await getDetail(id)
		if (data && data[0]) {
			ctx.body = new SuccessModel(data[0])
			return
		}

		console.log(data)
		ctx.body = new ErrorModel('未查询到数据')
	} catch (error) {
		errorOutput(ctx, error)
	}
})

// 新增博客
router.post('/new', loginCheck, async function(ctx, next) {
	const body = ctx.request.body
	if (!body.title || !body.content) {
		ctx.body = new ErrorModel('参数不能为空')
		return
	}

	const author = ctx.session.username

	try {
		const inResult = await newBlog(body, author)

		if (inResult && inResult.id) {
			ctx.body = new SuccessModel(inResult)
			return
		}

		console.log(inResult)
		ctx.body = new ErrorModel('新增失败')
	} catch (error) {
		errorOutput(ctx, error, '新增失败')
	}
})

// 更新博客
router.post('/update', loginCheck, async function(ctx, next) {
	const id = ctx.query.id
	const body = ctx.request.body

	if (!id || !body || !body.title || !body.content) {
		ctx.body = new ErrorModel('参数不能为空')
		return
	}

	const author = ctx.session.username

	try {
		const result = await updateBlog(id, body, author)

		if (result) {
			ctx.body = new SuccessModel('更新成功')
			return
		}

		console.log(result)
		ctx.body = new ErrorModel('更新失败')
	} catch (error) {
		errorOutput(ctx, error, '更新失败')
	}
})

// 删除博客
router.delete('/del', loginCheck, async function(ctx, next) {
	const id = ctx.query.id
	if (!id) {
		ctx.body = new ErrorModel('参数不能为空')
		return
	}

	const author = ctx.session.username

	try {
		const result = await delBlog(id, author)
		if (result) {
			ctx.body = new SuccessModel('删除成功')
			return
		}

		console.log(result)
		ctx.body = new ErrorModel('删除失败')
	} catch (error) {
		errorOutput(res, error, '删除失败')
	}
})

module.exports = router
