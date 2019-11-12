// node.js 加密和哈希算法
const crypto = require('crypto')

// 密钥, 很重要, 不能泄露
const SECRET_KEY = 'gUOYoU.LiWater0807_'

// md5 加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = genPassword
