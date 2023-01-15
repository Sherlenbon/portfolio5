// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSetting({
    //   success: (res)=> {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: (res) => {
    //           console.log(res.userInfo)
    //           this.login(res.userInfo.avatarUrl, res.userInfo.nickName)
    //         }
    //       })
    //     }
    //   }
    // })
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
    let userInfo = wx.getStorageSync("userInfo")
    if(userInfo){
      wx.redirectTo({
        url: '/pages/mycode/read/read',
      })
    }
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

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })
    this.login(e.detail.userInfo.avatarUrl, e.detail.userInfo.nickName)
  },
  login: function (head, nickname) {
    wx.cloud.callFunction({
      name: 'login',
      data: {
        head,
        nickname
      },
      success: (res) => {
        if (res.errMsg === "cloud.callFunction:ok") {
          console.log("success")
          wx.redirectTo({
            url: '/pages/mycode/read/read',
          })
        }

      },
      fail: (err) => {
        console.log(res)
      }
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../mycode/read'
    })
  },
})