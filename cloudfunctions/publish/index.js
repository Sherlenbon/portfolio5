// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    console.log("发帖start")

    await db.collection('tiezi').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        title: event.title,
        content: event.content,
        pic: event.pic,
        comment: [],
        praise: 0,
        openid: wxContext.OPENID,
        createTime: db.serverDate() //添加该字段
      }
    })
    console.log("发帖成功，打卡start")
    var date = new Date()
    var today = date.getFullYear()*10000 + date.getMonth()*100 + date.getDate() + 100;
    let punch = await db.collection('punch').where({
      openid: wxContext.OPENID
    }).orderBy('_id','desc').limit(1).get()
    var punch_day = 1
    if (punch.data && punch.data.length > 0){

      var last_punch_day = punch.data[0].signtime;
      punch_day = punch.data[0].punch_day;
      if (today > last_punch_day) {
        punch_day = punch_day + 1;
      }
      return await db.collection("punch").where({
        openid: wxContext.OPENID
      }).update({
        data: {
          punch_day: punch_day,
          signtime: today
        },
      })
    }else{
      return await db.collection("punch").add({
        data: {
          punch_day: punch_day,
          signtime: today,
          openid: wxContext.OPENID
        },
      })
    }
    // console.log("打卡天数+1")
    // console.log("打卡次数：",punch_day, ",今天是：",today, "上次打卡是:", last_punch_day)
    
  } catch (e) {
    console.error(e)
  }

}