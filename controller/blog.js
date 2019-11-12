const xss = require('xss')
const { exec, escape } = require('../db/mysql.js')

// 获取博客列表
const getList = async (author, keyword) => {
  let sql = `
  select id, title, content, author, createtime, state from blogs where state=1
    `
  if (author) {
    sql += ` and author=${escape(author)}`
  }
  if (keyword) {
    sql += ` and title like ${escape('%' + keyword + '%')}`
  }
  sql += ' order by createtime desc;'

  return exec(sql)
}

// 获取博客详情
const getDetail = async id => {
  const sql = `select * from blogs where state=1 and id=${escape(id)};`
  return exec(sql)
}

// 新建博客
const newBlog = async (blogData = {}, author) => {
  const sql = `
    insert into blogs (title, content, createtime, author) 
    values(
      ${xss(escape(blogData.title))}, 
      ${xss(escape(blogData.content))}, 
      ${Date.now()}, 
      '${author}'
    )
  `

  return exec(sql).then(data => {
    return {
      id: data.insertId
    }
  })
}

// 更新博客
const updateBlog = async (id, blogData = {}, author) => {
  const title = xss(escape(blogData.title))
  const content = xss(escape(blogData.content))
  const sql = `
    update blogs 
    set title=${title}, content=${content} 
    where id=${escape(id)} and author='${author}';
  `
  return exec(sql).then(rows => {
    return rows.affectedRows > 0
  })
}

// 删除博客
const delBlog = async (id, author) => {
  // 删除该条数据
  // const sql = `
  //   delete from blogs where id=${id} and author='${author}'
  // `

  // 变更状态即可
  const sql = `
    update blogs set state=0 
    where id=${escape(id)} and author='${author}';
  `

  return exec(sql).then(rows => {
    return rows.affectedRows > 0
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
