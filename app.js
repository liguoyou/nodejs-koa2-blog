const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// session redis
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

// redis 配置文件
const { REDIS_CONF } = require('./conf/conf')

// 引入路由
const blog = require('./routes/blog')
const user = require('./routes/user')

// error handler
onerror(app)

// middlewares
app.use(
	bodyparser({
		enableTypes: ['json', 'form', 'text']
	})
)
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 注册路由之前
app.keys = ['LovEwAtER0807SHuiGeYOu.#']
app.use(
	session({
		// 配置 cookie
		cookie: {
			path: '/',
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		},

		// 配置 redis
		store: redisStore({
			all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
		})
	})
)

// 注册 routes
// allowedMethods 处理的业务是当所有路由中间件执行完成之后,
// 若 ctx.status 为空或者404的时候,丰富 response 对象的 header 头.
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
})

module.exports = app
