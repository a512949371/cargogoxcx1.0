// pages/footprint/footprint.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footprintdata:[],
    fixedTF: true,
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
    var data =wx.getStorageSync("foot");
    this.Ajaxjson(data)
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
  //车辆详情
  Godetail(e){
    wx.navigateTo({
      url: '../cardetail/cardetail?id=' + e.currentTarget.dataset.carid,
    })
  },
  //删除足迹
  Deletefoot(){
    var that =this;
    wx.showModal({
      title: '提示',
      content: '确认删除足迹？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync("foot");
          wx.removeStorageSync("foot_dtime");
          var data =[];
          that.Ajaxjson(data)
        }
      }
    })
  },
  Ajaxjson(data){
    var that = this;
    Request.Myfootprint(data.toString(), function (res) {
      console.log("foot", res)
      that.setData({
        fixedTF: false,
      })
      if (res.data.isOk) {
        that.setData({
          footprintdata: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "icon"
        })
      }
    })
  }
})