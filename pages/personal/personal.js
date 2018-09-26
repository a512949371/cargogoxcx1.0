// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      nickName: wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('avatarUrl')
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },




  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  clickIcon(e) {
    var type = e.currentTarget.dataset.type;
    var url = '';
    switch (type) {
      case '1': //我的资料
        if (wx.getStorageSync('isBindPhone') == 1) {
          url = 'personalInfo/personalInfo';
        } else {
          wx.navigateTo({
            url: '../register/register',
          })
          return;
        }
        break;
      case '2': //计算器
        url = 'calculator/calculator';
        break;
      case '3': //我的收藏
        url = 'collect/collect';
        break;
      case '4': //我的车库
        url = 'myGarage/myGarage';
        break;
      case '5': //我的订单
        url = 'order/order';
        break;
      case '6': //联系我们
        url = 'caller/caller';
        break;
    }
    wx.navigateTo({
      url: url,
    })
  }
})