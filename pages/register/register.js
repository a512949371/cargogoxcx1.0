// pages/register/register.js
import httpCall from '../../datajson/httpCall.js'

Page({

  time:60,
  phone:'',
  code:'',

  /**
   * 页面的初始数据
   */
  data: {
    codeStr:'发送'
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

  inputPhone(e){
    this.phone = e.detail.value;
  },

  inputCode(e){
    this.code = e.detail.value;
  },

  sendCode(e){
    var that=this;
    if (this.time != 60) {
      return;
    }
    if(this.phone==''){
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        showCancel:false
      })
      return;
    }
    httpCall.sendEnrollSms(that.phone,function(res){
      console.log('sendEnrollSms',res)
      if(res.data.isOk){
        wx.showToast({
          title: '获取成功',
        })
        that.changeTimer();
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel:false
        })
      }
    });
  },

  changeTimer:function(){
    var that=this;
    if(that.time<=0){
        that.time=60;
      that.setData({
        codeStr: '发送'
      })
        return;
    }
    that.time--;
    that.setData({
      codeStr:that.time+' s'
    })
    setTimeout(function(){
      that.changeTimer();
    },1000);
  },

  binPhone(e){
    var that=this;
    console.log(this.phone+","+this.code);
    if (this.phone == '') {
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        showCancel: false
      })
      return;
    }else if(this.code==''){
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
        showCancel: false
      })
      return;
    }

    httpCall.userEnroll(that.phone,that.code,function(res){
      console.log('userEnroll',res);
      if(res.data.isOk){
        wx.showToast({
          title: '注册成功',
        })
        wx.setStorage({
          key: "phone",
          data: that.phone
        })
        wx.setStorage({
          key: "isBindPhone",
          data: 1
        })
        setTimeout(function(){
          wx.navigateBack({
          })
        },1000)
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false
        })
      }
    });
  }
})