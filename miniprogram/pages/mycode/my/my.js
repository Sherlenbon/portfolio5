// pages/mycode/my/my.js
// const db = cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remove: "删除",
    tiezi: [
      {
        title: "biaoti", content: "content", head: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJd6F7euRx3QunBnLIiba8B2bCKBG5bmibB4Vv68fBhLSWESzxvbPIMaXTA6V8CCCjgw1XyH87c3SCA/132", nickname: "xxx"
      },
      { title: "aaa", content: "bbb", head: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJd6F7euRx3QunBnLIiba8B2bCKBG5bmibB4Vv68fBhLSWESzxvbPIMaXTA6V8CCCjgw1XyH87c3SCA/132", nickname: "xxx" },
      { title: "111", content: "1111d", head: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJd6F7euRx3QunBnLIiba8B2bCKBG5bmibB4Vv68fBhLSWESzxvbPIMaXTA6V8CCCjgw1XyH87c3SCA/132", nickname: "xxx" },
    ],
    //页面显示时的相关变量
    read_img: "../images/read.png",
    my_img: "../images/my_active.png",
    read_hide: false,
    my_hide: true,
    zanIcon: '../images/like.png',
    zanIcon1: '../images/like_active.png',
    voteArr: [],
  },

  showMenu(e){
    let remove = this.data.tiezi[e.currentTarget.dataset.index]
    let tiezi = this.data.tiezi
    wx.showActionSheet({
      itemList: ['删除'],
      success: (res)=> {
        console.log(res.tapIndex)
        if (res.tapIndex === 0){
          console.log("执行删除")
          let _id = this.data.tiezi[e.currentTarget.dataset.index]._id
          wx.cloud.callFunction({
            name: 'remove',
            data: {
              _id: this.data.tiezi[e.currentTarget.dataset.index]._id
            },
            success: (res) => {
              wx.setStorageSync("datail", this.data.tiezi[e.currentTarget.dataset.index])
              if (res.errMsg === "cloud.callFunction:ok") {
                console.log("success")
                tiezi.splice(e.currentTarget.dataset.index, 1)
                this.setData({
                  tiezi
                })

              }
            },
              fail: (err) => {
                console.log(res)
              }
            })

         

          // let tiezi = this.data.tiezi
          // tiezi.splice(e.currentTarget.dataset.index, 1)
          // this.setData({
          //   tiezi
          // })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //  console.log(options)

    // db.collection('tiezi').doc(options.id).get({
    //   success: res => {
    //     console.log(res.result.data)
    //     this.setData({
    //       tiezi: res.result.data,
    //       id: options.id
    //     })
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
    this.setData({
      userInfo
    })
    console.log(userInfo)
    wx.hideHomeButton()
    this.getTiezi()
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

  getTiezi: function () {
    wx.cloud.callFunction({
      name: 'getmy',
      data: {},
      success: (res) => {
        if (res.errMsg === "cloud.callFunction:ok") {
          // console.log("success")
          for (let i = 0; i < res.result.data.length; i++) {
            if (res.result.data[i].isPraise) {
              res.result.data[i].zanUrl = '../images/like_active.png';
            } else {
              res.result.data[i].zanUrl = '../images/like.png';

            }
          }
          this.setData({
            tiezi: res.result.data
          })
        }

      },
      fail: (err) => {
        console.log(res)
      }
    })
  },
  zan: function (e) {
    console.log("点赞");
    var id = Number(e.currentTarget.dataset.index),
      D = this.data.tiezi;
    console.log(id)
    if (D[id].isPraise) {
      D[id].praise--;
      D[id].isPraise = false;
      D[id].zanUrl = '../images/like.png'
    } else {
      D[id].praise++;
      D[id].isPraise = true;
      D[id].zanUrl = '../images/like_active.png';
    }

    console.log(this.data.tiezi[id].praise);

    D[id].zanUrl =
      this.setData({
        tiezi: D
      })

    wx.cloud.callFunction({
      name: 'zan',
      data: {
        _id: this.data.tiezi[e.currentTarget.dataset.index]._id,
        praise: this.data.tiezi[e.currentTarget.dataset.index].praise,
        isPraise: this.data.tiezi[e.currentTarget.dataset.index].isPraise,
      },
      success: (res) => {
        let _id = this.data.tiezi[e.currentTarget.dataset.index]._id;
        console.log(_id);
        wx.setStorageSync("datail", this.data.tiezi[e.currentTarget.dataset.index])
        if (res.errMsg === "cloud.callFunction:ok") {
          console.log("success")
        }
      },
      fail: (err) => {
        console.log(res)
      }
    })
  },

  //跳转到我的页面
  jump_to_me: function () {
    console.log("me")
    wx.navigateTo({
      url: '../my/my',
    })
    this.setData({
      read_hide: false,
      my_hide: true,
      read_img: "../images/read.png",
      my_img: "../images/my_active.png"
    })
  },

  //跳转到发帖页面
  jump_to_publish: function () {
    console.log("public")
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
 
  //跳转到首页
  jump_to_read: function () {
    wx.redirectTo({
      url: '../read/read',
    })
    console.log("read")
    this.setData({
      read_hide: false,
      my_hide: true,
      read_img: "../images/read_active.png",
      my_img: "../images/my.png",
    })
  },

})