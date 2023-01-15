const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    return await db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        head: event.head,
        nickname: event.nickname,
        openid: wxContext.OPENID
      }
    })
  } catch (e) {
    console.error(e)
  }

}