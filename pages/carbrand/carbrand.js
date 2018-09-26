// pages/carbrand/carbrand.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toview:"A",
    urldata:[],
    fixedTF: true,
    cardata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.urldata.type=options.type||'';
    this.data.urldata.typename = options.typename||'';
    this.data.urldata.pricename = options.pricename||'';
    this.data.urldata.minPrice = options.minPrice||'';
    this.data.urldata.maxPrice = options.maxPrice||'';
    this.setData({
      urldata:this.data.urldata
    })
    console.log(options)
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
    var that =this;
    Request.Carbrand("",function(res){
      console.log("brand",res)
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
  //锚点跳转
  Toview(e){
    this.setData({
      toview:e.currentTarget.dataset.name
    })
    console.log(this.data.toview, e.currentTarget.dataset.name)
  },
  //返回车辆列表页
  Gobrand(e){
    wx.navigateTo({
      url: '../carlist/carlist?type=' + this.data.urldata.type + '&minPrice=' + this.data.urldata.minPrice + '&maxPrice=' + this.data.urldata.maxPrice + '&brandId=' + e.currentTarget.dataset.id + '&typename=' + this.data.urldata.typename + '&pricename=' + this.data.urldata.pricename+'&brandname='+e.currentTarget.dataset.name+'&isshow=1',
    })
  }
})