const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var praise = event.praise, id = event._id, isPraise = event.isPraise;
  console.log('云函数zan开始');
  console.log(id, praise, isPraise);
  try {
    return await db.collection('tiezi').doc(id).update({
      data: {
        praise: praise,
        isPraise: isPraise
      },
    })
  } catch (e) {
    console.error(e)
  }
}