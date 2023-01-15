// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('tiezi').where({
      _id: event._id
    }).update({
        data: {
          comment: event.comment
        },
      })
  } catch (e) {
    console.error(e)
  }
}