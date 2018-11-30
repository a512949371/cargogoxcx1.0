//app.js
import Request from './datajson/request.js';
App({
  onLaunch: function (options) {
    //展示本地存储能力
    var that = this;
    console.log("options", options)
    var data = options.query.uid || 0;
    Request.Login(data, function (res) {
      if (res.data.errno === 0) {
        wx.setStorage({
          key: "token",
          data: res.data.data.token
        })
        wx.setStorageSync("userType", res.data.data.userInfo.isLogin)
        wx.setStorageSync("mobilePhone", res.data.data.userInfo.mobilePhone)
        wx.setStorageSync("accId", res.data.data.userInfo.id)
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
          }
        })
      }
    })  
  },
  onShow:function(options){
    
  },
})