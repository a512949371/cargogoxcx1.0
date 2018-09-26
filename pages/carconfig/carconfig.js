// pages/carconfig/carconfig.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toview: "A",
    scrollTop:0,
    fixedparTF:false,
    carid:'',
    parmlistdata:[],
    fixedTF:true,
    navlist:[{
      enConfig:'basic',
      cnConfig:'基本参数'
    },
      {
        enConfig: 'body',
        cnConfig: '车身配置'
      },
      {
        enConfig: 'engine',
        cnConfig: '发动机配置'
      },
      {
        enConfig: 'gearbox',
        cnConfig: '变速箱配置'
      },
      {
        enConfig: 'chassisbrake',
        cnConfig: '底盘转向'
      },
      {
        enConfig: 'wheel',
        cnConfig: '车轮制动'
      },
      {
        enConfig: 'safe',
        cnConfig: '安全装备'
      },
      {
        enConfig: 'drivingauxiliary',
        cnConfig: '操控配置'
      },
      {
        enConfig: 'externalconfig',
        cnConfig: '外部配置'
      },
      {
        enConfig: 'internalconfig',
        cnConfig: '内部配置'
      },
      {
        enConfig: 'seat',
        cnConfig: '座椅配置'
      },
      {
        enConfig: 'entcom',
        cnConfig: '多媒体配置'
      },
      {
        enConfig: 'light',
        cnConfig: '灯光配置'
      },
      {
        enConfig: 'doormirror',
        cnConfig: '玻璃/后视镜'
      },
      {
        enConfig: 'aircondrefrigerator',
        cnConfig: '空调/冰箱'
      }]
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
    Request.Carallconfig(this.data.carid,function(res){
      console.log("config",res)
      that.setData({
        fixedTF:false
      })
      if(res.data.isOk){
        that.setData({
          parmlistdata:res.data.data
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
  Tapmove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop
    })
    // this.setData({
    //   toview: "A",
    //   fixedparTF: false,
    // })
    console.log("top", this.data.scrollTop)
  },
  //锚点跳转
  Toview(e) {
    this.setData({
      toview: e.currentTarget.dataset.name,
      fixedparTF:false,
    })
    console.log(this.data.toview, e.currentTarget.dataset.name)
  },
  //打开参数选择
  Openmore(){
    this.setData({
      fixedparTF: true
    })
  },
  //关闭弹窗
  Closealert(){
    this.setData({
      fixedparTF: false
    })
  }
})