// pages/personal/caller/caller.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'13099968918'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  call(e){
    var that=this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    })
  }
})