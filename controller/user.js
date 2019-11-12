const { exec, escape } = require('../db/mysql.js')
const genPassword = require('../utils/crypto')

// 用户登录
const login = (username, password) => {
  password = escape(genPassword(password))
  const sql = `
    select username,realname from users 
    where state=1 and username=${escape(username)} 
    and password=${password};
  `

  return exec(sql).then(rows => {
    if (rows[0] && rows[0].username) {
      return {
        username: rows[0].username,
        realName: rows[0].realname
      }
    }
    return false
  })
}

module.exports = {
  login
}
