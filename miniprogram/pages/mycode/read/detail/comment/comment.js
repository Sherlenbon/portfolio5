// pages/mycode/read/detail/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: "评论",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let tiezi = wx.getStorageSync("detail")
    console.log(tiezi._id)
    console.log(tiezi.comment)
    this.setData({
      tiezi
    })
  },

  onCommentChange: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },  

  onSubmit: function () {
    let userInfo = wx.getStorageSync("userInfo")
    let comment = this.data.tiezi.comment
    comment.push({
      content: this.data.comment,
      head: userInfo.avatarUrl,
      nickname: userInfo.nickName,
    })
    wx.cloud.callFunction({
      name: 'comment',
      data: {
        comment,
        _id: this.data.tiezi._id
      },
      success: (res) => {
        if (res.errMsg === "cloud.callFunction:ok") {
          console.log("success")
          this.data.tiezi.comment = comment
          wx.setStorageSync("detail", this.data.tiezi)
          wx.navigateBack({
            url: '/pages/mycode/read/detail/detail',
          })
        }

      },
      fail: (err) => {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})