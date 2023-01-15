//图片裁剪相关变量
const ctx = wx.createCanvasContext('cover-preview');
var tempFilePath;//图片路径

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "标题",
    content: "正文",
    fileID: "cloud://qingshi-71bnq.7169-qingshi-71bnq-1301209229/qqq.png"
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

  // 监听title输入
  onTitleChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
  },

  onContentChange: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  onSubmit: function () {
    wx.cloud.callFunction({
      name: 'publish',
      data: {
        title: this.data.title,
        content: this.data.content,
        pic: this.data.fileID
      },
      success: (res) => {
        if (res.errMsg === "cloud.callFunction:ok") {
          console.log("success")
          wx.navigateBack({
            url: '/pages/mycode/read/read',
          })
        }

      },
      fail: (err) => {
        console.log(res)
      }
    })
  },
  //上传图片
  upload(){
    let that=this;
    console.log("点击了上传")  
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log("选择成功",res)
        that.uploadImg(res.tempFilePaths[0]);
      }
    })

   
  },
  uploadImg(fileUrl){
    let cloudPath = randomWord() + ".png"

    wx.cloud.uploadFile({
      cloudPath, // 上传至云端的路径
      filePath: fileUrl, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        // console.log("上传成功",res)
        wx.showToast({
          title: '上传成功',
        })
        let fileID = res.fileID
        this.setData({
          fileID
        })
      },
      fail: console.error
    })
  }
})
function randomWord() {

  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var nums = "";

  for (var i = 0; i < 16; i++) {

    var id = parseInt(Math.random() * 61);

    nums += chars[id];

  }

  return nums;

}