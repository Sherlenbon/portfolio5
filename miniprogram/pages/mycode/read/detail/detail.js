// pages/mycode/read/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiezi: {
      title: "biaoti", content: "content", head: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJd6F7euRx3QunBnLIiba8B2bCKBG5bmibB4Vv68fBhLSWESzxvbPIMaXTA6V8CCCjgw1XyH87c3SCA/132", nickname: "xxx", pic: "cloud://qingshi-71bnq.7169-qingshi-71bnq-1301209229/qqq.png", comment: "comment",
    zanIcon: '../../images/like.png',
    zanIcon1: '../../images/like_active.png',
    voteArr: [],
    },

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
    console.log(tiezi)
    if (tiezi.isPraise) {
      tiezi.zanUrl = '../../images/like_active.png';
    } else {
      tiezi.zanUrl = '../../images/like.png';

    }
    this.setData({
      tiezi
    })
  },
  // getTiezi: function () {
  //   wx.cloud.callFunction({
  //     name: 'read',
  //     data: {},
  //     success: (res) => {
  //       if (res.errMsg === "cloud.callFunction:ok") {
  //         // console.log("success")
  //         console.log(res)
  //         //console.log(res.result.data[0].id)
  //         for (let i = 0; i < res.result.data.length; i++) {
  //           if (res.result.data[i].isPraise) {
  //             res.result.data[i].zanUrl = '../../images/like_active.png';
  //           } else {
  //             res.result.data[i].zanUrl = '../../images/like.png';

  //           }
  //         }


  //         this.setData({
  //           tiezi: res.result.data,


  //         })
  //       }

  //     },
  //     fail: (err) => {
  //       console.log(res)
  //     }
  //   })
  // },

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

  },

   onComment: function () {
    console.log("comment")
    wx.navigateTo({
      url: './comment/comment',
    })
   },


   zan: function (e) {
    var D = this.data.tiezi;
    if (D.isPraise) {
      D.praise--;
      D.isPraise = false;
      D.zanUrl = '../../images/like.png'
    } else {
      D.praise++;
      D.isPraise = true;
      D.zanUrl = '../../images/like_active.png';
    }

    D.zanUrl =
      this.setData({
        tiezi: D
      })

    wx.cloud.callFunction({
      name: 'zan',
      data: {
        _id: this.data.tiezi._id,
        praise: this.data.tiezi.praise,
        isPraise: this.data.tiezi.isPraise,
      },
      success: (res) => {
        let _id = this.data.tiezi._id;
        wx.setStorageSync("datail", this.data.tiezi)
        if (res.errMsg === "cloud.callFunction:ok") {

        }
      },
      fail: (err) => {
        console.log(res)
      }
    })
  },

})