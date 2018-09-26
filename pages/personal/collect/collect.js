// pages/personal/collect/collect.js
import httpCall from '../../../datajson/httpCall.js'

Page({
  page: 1,
  hasMoreData: true,

  /**
   * 页面的初始数据
   */
  data: {
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadData();
  },

  /**
   * 加载我的车库列表数据
   */
  loadData: function() {
    var that = this;
    httpCall.getCollectList(that.page, function(res) {
      console.log(res);
      if (res.data.isOk) {
        var list = that.data.listData;
        if (that.page == 1) {
          list = [];
        }
        var listdata = res.data.data.records;
        if (listdata.length < 1) {
          that.hasMoreData = false;
        } else {
          that.hasMoreData = true;
          that.setData({
            listData: list.concat(listdata),
          })
        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    if (that.hasMoreData) {
      that.page++;
    }
    that.loadData();
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //进入车辆详情页面
  toDetail(e) {
    wx.navigateTo({
      url: '../../cardetail/cardetail?id=' + e.currentTarget.dataset.id,
    })
  },

  delCar(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确认删除该记录？',
      success: function(e) {
        if (e.confirm) {
          httpCall.delCollect(that.data.listData[index].id, function(res) {
            console.log('delCar', res);
            if (res.data.isOk) {
              that.data.listData.splice(index, 1);
              that.setData({
                listData: that.data.listData
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false
              })
            }
          })
        }
      }
    })
  },
  //进入首页
  Goindex() {
    wx.navigateTo({
      url: '../../index/index',
    })
  }
})