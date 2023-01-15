// pages/mycode/read/read.js
var icon = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiezi: [
      {
        title: "biaoti", content: "content", head: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJd6F7euRx3QunBnLIiba8B2bCKBG5bmibB4Vv68fBhLSWESzxvbPIMaXTA6V8CCCjgw1XyH87c3SCA/132", nickname: "xxx", pic: "cloud://qingshi-71bnq.7169-qingshi-71bnq-1301209229/qqq.png", comment: "comment" },
      { title: "aaa", content: "bbb", head: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJd6F7euRx3QunBnLIiba8B2bCKBG5bmibB4Vv68fBhLSWESzxvbPIMaXTA6V8CCCjgw1XyH87c3SCA/132", nickname: "xxx", pic: "cloud://qingshi-71bnq.7169-qingshi-71bnq-1301209229/qqq.png", comment: "comment" },
      { title: "111", content: "1111d", head: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJd6F7euRx3QunBnLIiba8B2bCKBG5bmibB4Vv68fBhLSWESzxvbPIMaXTA6V8CCCjgw1XyH87c3SCA/132", nickname: "xxx", pic: "cloud://qingshi-71bnq.7169-qingshi-71bnq-1301209229/qqq.png", comment: "comment" },
    ],
    //页面显示时的相关变量
    read_img: "../images/read_active.png",
    my_img: "../images/my.png",
    read_hide: false,
    my_hide: true,
    zanIcon: '../images/like.png',
    zanIcon1: '../images/like_active.png',

    keyword: "B.D"
  },
  showDetail: function(e){
    console.log(e.currentTarget.dataset.index)
    wx.setStorageSync("detail", this.data.tiezi[e.currentTarget.dataset.index])
    wx.navigateTo({
      url: './detail/detail',
    })
  },

  // showMenu(e) {
  //   let remove = this.data.tiezi[e.currentTarget.dataset.index]
  //   let tiezi = this.data.tiezi
  //   wx.showActionSheet({
  //     itemList: ['收藏', 'xxx'],
  //     success: (res) => {
  //       console.log(res.tapIndex)
  //       if (res.tapIndex === 0) {
  //         console.log("执行收藏")
  //         let _id = this.data.tiezi[e.currentTarget.dataset.index]._id
  //         wx.cloud.callFunction({
  //           name: 'remove',
  //           data: {
  //             _id: this.data.tiezi[e.currentTarget.dataset.index]._id
  //           },
  //           success: (res) => {
  //             wx.setStorageSync("datail", this.data.tiezi[e.currentTarget.dataset.index])
  //             if (res.errMsg === "cloud.callFunction:ok") {
  //               console.log("success")
  //               tiezi.splice(e.currentTarget.dataset.index, 1)
  //               this.setData({
  //                 tiezi
  //               })

  //             }
  //           },
  //           fail: (err) => {
  //             console.log(res)
  //           }
  //         })



  //         // let tiezi = this.data.tiezi
  //         // tiezi.splice(e.currentTarget.dataset.index, 1)
  //         // this.setData({
  //         //   tiezi
  //         // })
  //       }
  //     },
  //     fail(res) {
  //       console.log(res.errMsg)
  //     }
  //   })
  // },

  // input1: function (e) {
  //   this.search(e.detail.value)
  // },

  // confirm1: function (e) {
  //   this.search(e.detail.value)
  // },
  // search: function (key) {

  //   var abc = {};
  //   if (key == "") {
  //     for (var i = 0; i < this.data.hosList.length; i++) if (!this.data.hosList[i].show) abc["hosList[" + i + "].show"] = true;
  //   } else {
  //     for (var i = 0; i < this.data.hosList.length; i++)
  //       if (this.data.hosList[i].name.indexOf(key) >= 0) {
  //         abc["hosList[" + i + "].show"] = true;
  //       } else {
  //         abc["hosList[" + i + "].show"] = false;

  //       }
  //   }
  //   console.log(abc);
  //   this.setData(abc);
  // },
  // tapVoicePlay: function () {

  //   if (icon) this.setData({ playIcon: "https://改变后的图片地址" });

  //   else this.setData({ playIcon: "https://默认图片地址" });

  //   icon = !icon;



  //   // 您的其他业务逻辑

  // },


  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
    
  //    var postId = option.id;//要先在对应的数据文本中对每个栏目定义postId、比如postId: 0 postId:1
  //   this.data.currentPostId = postId; //借助顶部data作为中转，拿到上面这行postid后，将它放到下面var postCollected = postsCollected[]中
  //   //将这个postId从onLoad中传递到下面的onCollectionTap中
  //   var postData = postsData.postList[postId];//定义每个新闻列表对应顺序是哪个新闻内容
  //   //用户收藏功能
  //   var postsCollected = wx.getStorageSync('posts_collected') //从缓存中读取所有的缓存状态
  //   if (postsCollected) {   //postsCollected为真的情况，在缓存中存在
  //     var postCollected = postsCollected[postId]//读取其中一个缓存状态
  //     this.setData({
  //       collected: postCollected //将是否被收藏的状态上绑定到collected这个变量上
  //     })
  //   }
  //   else {       //为假的情况，缓存中为空的情况
  //     var postsCollected = {}; //对postsCollected进行一个赋值操作，从而防止为空，从而省掉后面对它是否为空进行测试的步骤
  //     postsCollected[postId] = false; // 让当前的这篇文章状态为false，从而收藏星星不点亮
  //     wx.setStorageSync('posts_collected', postsCollected);
  //     //将postsCollected对象放到缓存中
  //   }

  // },

  // onCollectionTap: function (event) {// 定义onCollectionTap事件用来确定文章是否收藏，如果没收藏就能点亮星星进行收藏
  //   var postsCollected = wx.getStorageSync('posts_collected');   //获取缓存的方法
  //   var postCollected = postsCollected[this.data.currentPostId];   //确定当前文章是否有缓存的状态，传递参数方法、借助其他参数来传递变量，如上的data
  //   postCollected = !postCollected;// 取反操作，收藏变成未收藏、未收藏变为收藏
  //   postsCollected[this.data.currentPostId] = postCollected;//整体缓存的某一篇文章的缓存值等于postCollected从而更新一个变量
  //   wx.setStorageSync('posts_collected', postsCollected);//更新文章是否收藏的缓存值,相当于在数据库中做了一次更新。
  // //更新Data的数据绑定变量,从而实现图片切换
  //  this.setData({
  //     collected: postCollected //当前的collected为postCollected

  //   })
    
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
      name: 'read',
      data: {},
      success: (res) => {
        console.log(res)
        if (res.errMsg === "cloud.callFunction:ok") {
          // console.log("success")
          console.log(res)
          //console.log(res.result.data[0].id)
          for(let i=0;i<res.result.data.length;i++){
            if(res.result.data[i].isPraise){
              res.result.data[i].zanUrl = '../images/like_active.png';
            }else{
              res.result.data[i].zanUrl = '../images/like.png';

            }
          }
          
          
          this.setData({
            tiezi: res.result.data
          })
        }

      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  onsearchChange: function (e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  search: function () {
    wx.cloud.callFunction({
      name: "search",
      data: {
        keyword: this.data.keyword
      },
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
          console.log(res)
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

  // //点赞
  // changeLike: function () {
  //   const db = wx.cloud.database()
  //   console.log("----likelen:", this.data.kk)

  //   const kkb = this.data.kk + 1;//每次点赞加一

  //   db.collection('changeLike').add({

  //     data: {

  //       id: this.data.id,
  //       kk: kkb,
  //       nickName: this.data.userInfo.nickName
  //       //上面三个是我传入的参数
  //     },
  //     success: res => {

  //       this.setData({


  //         kk: this.data.kk + 1,//点赞成功之后，显示在页面上，就是一个局部刷新
  //       })
  //       wx.showToast({
  //         title: '感谢您的点赞',

  //       })
  //       console.log('数据库成功新增记录ID:', res._id)

  //     },
  //     fail: err => {

  //       wx.showToast({
  //         icon: 'nome',
  //         title: '点赞失败',
  //       })
  //       console.error("新增记录失败：", err)
  //     }

  //   })

  //   this.onReady()//这个是刷新功能	
  // },



    //跳转到我的页面
  jump_to_me:function(){
    console.log("me")
    wx.redirectTo({
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
    console.log("read")
    this.setData({
      read_hide: false,
      my_hide: true,
      read_img: "../images/read_active.png",
      my_img: "../images/my.png",
    })
  },

  zan: function (e) {
    console.log("点赞");
    var id = Number(e.currentTarget.dataset.index),
      D = this.data.tiezi;
    console.log(id)
    if(D[id].isPraise){
      D[id].praise--;
      D[id].isPraise=false;
      D[id].zanUrl = '../images/like.png'
    }else{
      D[id].praise++;
      D[id].isPraise=true;
      D[id].zanUrl = '../images/like_active.png';
    }

    console.log(this.data.tiezi[id].praise);
    
    D[id].zanUrl = 
    this.setData({
      tiezi:D
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

    
  
})


