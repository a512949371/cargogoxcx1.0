//app.js
import Request from './datajson/request.js';
import httpCall from './datajson/httpCall.js';

App({
  onLaunch: function (options) {
    // 展示本地存储能力
    Request.Login(function(res){
      console.log("Login",res.data)
      if(res.data.isOk){
        wx.setStorage({
          key: "token",
          data: res.data.data.token
        })
        wx.setStorage({
          key: "isBindPhone",
          data: res.data.data.isBindPhone
        })
        wx.setStorage({
          key: "isInformation",
          data: res.data.data.isInformation
        })
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  var nickName = res.userInfo.nickName;
                  var avatarUrl = res.userInfo.avatarUrl;
                  wx.setStorageSync('nickName', nickName);
                  wx.setStorageSync('avatarUrl', avatarUrl);
                  httpCall.updateWxName(avatarUrl, nickName, function (res) {
                    console.log('updateWxName', res)
                  });
                }
              })
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          }
        }) 
      }
    })
  },
  onShow:function(options){
    var that=this;
  },
  globalData: {
    userInfo: null
  },
})