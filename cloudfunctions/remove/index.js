// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('tiezi').where({
      _id: event._id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}