// pages/personal/calculator/calculator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1:'165,000',
    value2: '385,000',
    value3: '500',
    value4: '4,000',
    value5: '480',
    value6: '655,000',
    proportions:['10%','20%','30%'],
    mounths: ['6期', '12期', '24期'],
    proportion:'选择 >',
    mounth: '选择 >',
    pickerColor1:'C8C8C8',
    pickerColor2: 'C8C8C8'
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

  proportionPicker(e) {
    this.setData({
      pickerColor1:'111',
      proportion: this.data.proportions[e.detail.value]
    })
  },

  mounthPicker(e){
    this.setData({
      pickerColor2: '111',
      mounth: this.data.mounths[e.detail.value]
    })
  },

  toRepayList(e){
    wx.navigateTo({
      url: '../repayList/repayList',
    })
  }
})