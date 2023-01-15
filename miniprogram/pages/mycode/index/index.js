//打卡日历页面
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: [], //存放一个月的天数数组
    signUp: [], //用户判断当天是否已打卡  可废除下方模拟打卡数组直接采用此数组

    //用于判断
    cur_year: 0, //年
    cur_month: 0, //月


    count: 0, //累计打卡的数量
    continuous_daka_count: 0, //连续打卡次数



    //monthArr: [],

    //模拟打卡状态的数组
    dakaArr: ['2019/09/1 10:33:34', '2019/09/5 10:33:34', '2019/10/1 10:33:34', '2019/10/5 10:33:34', '2019/10/7 10:33:34', '2019/10/8 10:33:34', '2019/10/9 10:33:34', '2019/10/10 10:33:34', '2019/10/11 10:33:34', '2019/10/13 10:33:34', '2019/10/14 10:33:34', '2019/10/15 10:33:34', '2019/10/16 10:33:34', '2019/10/17 10:33:34', '2019/10/18 10:33:34', '2019/10/19 10:33:34'],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前年月  
    const date = new Date();
    var _cur_year = date.getFullYear();
    var _cur_month = date.getMonth() + 1;
    var _weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];


    this.setData({
      cur_year: _cur_year,
      cur_month: _cur_month,
      weeks_ch: _weeks_ch,
    })
    this.calculateEmptyGrids(this.data.cur_year, this.data.cur_month); // 计算当月1号前空了几个格子，把它填充在days数组的前面
    this.calculateDays(this.data.cur_year, this.data.cur_month); // 绘制当月天数占的格子，并把它放到days数组中
    //获取当前用户当前任务的人签到状态
    this.onGetSignUp();
    console.log("年==》" + this.data.cur_year + "月===》" + this.data.cur_month);
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
  // 获取当月共多少天
  getThisMonthDays: function (year, month) {
    return new Date(year, month, 0).getDate()
  },

  // 获取当月第一天星期几
  getFirstDayOfWeek: function (year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  // 计算当月1号前空了几个格子，把它填充在days数组的前面
  calculateEmptyGrids: function (year, month) {
    var that = this;
    //计算每个月时要清零
    that.setData({
      days: [],
    });
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        var obj = {
          date: null,
          isSign: false
        }
        that.data.days.push(obj);
      }
      this.setData({
        days: that.data.days,
      });
      //清空
    } else {
      this.setData({
        days: []
      });
    }
  },
  // //用于显示打卡状态   只需加载一次
  // onShowsPunchStatus(_month) {
  //   var that = this;
  //   let _days = that.data.days;
  //   let _arr = that.data.monthArr;
  //   if (that.data.monthArr.length < 1) {
  //     _arr.push({
  //       month: _month,
  //       days: _days
  //     });
  //     that.setData({
  //       monthArr: _arr
  //     })
  //   } else {
  //     var _monthArr = that.data.monthArr;
  //     for (var i = 0; i < _monthArr.length; i++) {
  //       for (var j = 0; j < _days.length; j++) {
  //         if (_days[j].isSign && _monthArr[i].month != _month) {
  //           console.log("进来添加");
  //           _monthArr.push({
  //             month: _month,
  //             days: _days
  //           });
  //           that.setData({
  //             monthArr: _monthArr,
  //           })
  //         }
  //       }
  //     }
  //   }

  // },


  // 绘制当月天数占的格子，并把它放到days数组中
  calculateDays: function (year, month) {
    var that = this;
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      var obj = {
        date: i,
        isSign: false
      }
      that.data.days.push(obj);
    }
    this.setData({
      days: that.data.days
    });

  },

  //匹配判断当月与当月哪些日子签到打卡
  onJudgeSign() {
    var that = this;
    var signs = that.data.signUp;
    var daysArr = that.data.days;
    for (var i = 0; i < signs.length; i++) {
      var current = new Date(signs[i].replace(/-/g, "/"));
      var year = current.getFullYear();
      var month = current.getMonth() + 1;
      var day = current.getDate();
      day = parseInt(day);
      for (var j = 0; j < daysArr.length; j++) {
        //年月日相同并且已打卡
        if (year == that.data.cur_year && month == that.data.cur_month && daysArr[j].date == day) {
          daysArr[j].isSign = true;
        }
      }
    }
    that.setData({
      days: daysArr
    });

    that.onJudgeContinuousClock();
  },

  //判断连续打卡次数
  onJudgeContinuousClock() {
    var that = this;
    let _count = 0;
    for (var i = 0; i < that.data.dakaArr.length; i++) {
      //把时间转换为时间戳
      if (i != 0) {
        var newDate_ = Date.parse(that.data.dakaArr[i]); //当天
        var theOriginalTime_ = Date.parse(that.data.dakaArr[i - 1]); //前一天
        //计算天
        let _day = parseInt(newDate_ - theOriginalTime_) / (1000 * 60 * 60);
        // console.log("当天：" + that.data.dakaArr[i] + ",前一天：" + that.data.dakaArr[i - 1] + "，当天与前天比较相差时间=====>" + _day + ",累计打卡==>" +_count);
        if (_day <= 24) {
          _count += 1;
        } else {
          _count = 0;
        }
      }
    }
    if (_count != 0) {
      that.setData({
        continuous_daka_count: parseInt(_count + 1),
      })
    } else {
      that.setData({
        continuous_daka_count: 0,
      })
    }
  },

  // 切换控制年月，上一个月，下一个月
  handleCalendar: function (e) {
    var that = this;
    const handle = e.currentTarget.dataset.handle;
    const cur_year = that.data.cur_year;
    const cur_month = that.data.cur_month;

    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp();
    } else {

      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp();
    }
  },

  //获取当前用户该任务的签到数组
  onGetSignUp: function () {
    var that = this;
    var _arr = [];
    that.data.dakaArr.map(item => {
      _arr.push(item);
    })
    that.setData({
      signUp: _arr,
      count: _arr.length
    });
    //获取后就判断签到情况
    that.onJudgeSign();
  }
})