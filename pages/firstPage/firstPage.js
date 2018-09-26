// pages/firstPage/firstPage.js
import httpCall from '../../datajson/httpCall.js'

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
    
  },
  /**
   * 获取用户授权
   */
  onGotUserInfo: function (e) {
    var nickName = e.detail.userInfo.nickName;
    var avatarUrl = e.detail.userInfo.avatarUrl;
    wx.setStorageSync('nickName', nickName);
    wx.setStorageSync('avatarUrl', avatarUrl);
    httpCall.updateWxName(avatarUrl,nickName, function(res){
      console.log('updateWxName',res)
    });
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})