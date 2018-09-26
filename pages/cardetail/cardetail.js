// pages/cardetail/cardetail.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular: true,
    indicatorcolor: 'rgba(0,0,0,0.2)',
    tabTF:1,
    carid:'',
    cardata:[],
    fixedTF: true,
    islogin:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      carid:options.id
    })
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
    var that=this;
    this.setData({
      islogin: wx.getStorageSync("isBindPhone")
    })
    console.log("islogin", this.data.islogin);
    Request.Cardetail(this.data.carid,function(res){
      console.log("cardetail",res)
      that.setData({
        fixedTF:false
      })
      if(res.data.isOk){
        that.setData({
          cardata:res.data.data
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:"none"
        })
      }
    })
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
  //tab切换
  Tabclick(e){
    this.setData({
      tabTF:e.currentTarget.dataset.num
    })
  },
  //查看全部配置
  Goallpar(e){
    wx.navigateTo({
      url: '../carconfig/carconfig?id='+e.currentTarget.dataset.id,
    })
  },
  //加入车库
  Jiongarage(e){
    var that = this;
    var data ={
      vehicleId:e.currentTarget.dataset.id,
      buyConfigId: e.currentTarget.dataset.periodid
    }
    if(this.data.islogin=='1'){
      this.setData({
        fixedTF: true
      })
      Request.Jiongarage(data, function (res) {
        console.log("jion", res)
        that.setData({
          fixedTF: false
        })
        if (res.data.isOk) {
          that.setData({
            'cardata.addShopping': true
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      })
    }else{
      wx.navigateTo({
        url: '../register/register',
      })
    }
    
  },
  //添加或者删除车辆收藏
  mycollection(e){
    var data ={
      vehicleId:e.currentTarget.dataset.id
    }
    var that=this;
    if(this.data.islogin=='1'){
      if (e.currentTarget.dataset.colled) {
        Request.Insertmycollection(data, function (res) {
          console.log("insert", res)
          if (res.data.isOk) {
            that.setData({
              'cardata.collected': false
            })
          }
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        })
      } else {
        Request.Insertmycollection(data, function (res) {
          console.log("insert", res)
          if (res.data.isOk) {
            that.setData({
              'cardata.collected': true
            })
          }
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        })
      }
    }else{
      wx.navigateTo({
        url: '../register/register',
      })
    }
    
    
  },
  //我的车库
  Gomycar(){
    if (this.data.islogin=='1'){
      wx.navigateTo({
        url: '/pages/personal/myGarage/myGarage',
      })
    }else{
      wx.navigateTo({
        url: '../register/register',
      })
    }
  },
  Gomap(){
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userLocation']) {
          console.log("chengg")
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              const latitude = 24.957460
              const longitude = 102.747640
              wx.openLocation({
                latitude,
                longitude,
                name: "银海.幸福广场",
                scale: 28
              })
            },
            fail: function (res) {
              console.log(res);
              wx.showToast({
                title: '请开启微信定位功能',
                icon: "none"
              })
            }
          })
        } else {
          console.log(res.authSetting['scope.userLocation'])
          if (res.authSetting['scope.userLocation'] == false) {
            wx.openSetting({
              success: (res) => {
                console.log("res", res)
                res.authSetting = {
                  "scope.userLocation": true
                }
              }
            })
          } else {
            wx.getLocation({
              type: 'gcj02',
              success: function (res) {
                const latitude = 24.957460
                const longitude = 102.747640
                wx.openLocation({
                  latitude,
                  longitude,
                  name: "银海.幸福广场",
                  scale: 28
                })
              },
              fail: function (res) {
                wx.showToast({
                  title: '请允许微信访问位置服务',
                  icon: "none"
                })
              }
            })
          }
        }
      }
    })
  }
})