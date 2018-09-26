// pages/personal/myGarage/myGarage.js
import httpCall from '../../../datajson/httpCall.js'

Page({
  page: 1,
  hasMoreData: true,
  /**
   * 页面的初始数据
   */
  data: {
    tag: ['2018款', '尊享版', '尊享版'],
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
    httpCall.getBarnList(that.page, function(res) {
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

  /**
   * 减少车辆数量摁扭
   */
  minCarNum(e) {
    var that = this;
    var carNum = e.currentTarget.dataset.carnum;
    if (carNum < 1) {
      return
    }
    var index = e.currentTarget.dataset.index;
    var list = that.data.listData;
    list[index].number = carNum - 1;
    that.setData({
      listData: list
    })
  },

  /**
   * 添加车辆数量摁扭
   */
  addCarNum(e) {
    var that = this;
    var carNum = e.currentTarget.dataset.carnum;
    var index = e.currentTarget.dataset.index;
    var list = that.data.listData;
    list[index].number = carNum + 1;
    that.setData({
      listData: list
    })
  },

  /**
   * 预约购车
   */
  addCarOrder(e) {
    var that = this;
    if (wx.getStorageSync('isInformation')!=1){
      wx.showModal({
        title: '提示',
        content: '由于你的资料还未完善，请先完善个人资料',
        showCancel:false,
        confirmText:'去完善',
        success:function(){
          if (wx.getStorageSync('isBindPhone') == 1) {
            wx.navigateTo({
              url: '../personalInfo/personalInfo',
            })
          } else {
            wx.navigateTo({
              url: '../../register/register',
            })
          }
        }
      })
      return;
    }
    httpCall.addCarOrder(that.data.listData,function(res) {
      console.log('addCarOrder', res);
      if(res.data.isOk){
        wx.showModal({
          title: '操作成功',
          content: '请保持电话畅通',
          showCancel:false,
          success:function(e){
            wx.navigateBack({
              
            })
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel:false
        })
      }
    })
  },
  delCar(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除该记录？',
      success:function(e){
        if (e.confirm) {
          httpCall.delCar(that.data.listData[index].id, function (res) {
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