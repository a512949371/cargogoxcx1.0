// pages/index/index.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/banner_1.png',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    indicatorcolor: 'rgba(0,0,0,0.2)',
    rotate:{},
    rotateTF:false,
    animationscrolltop:{},
    translatex:{},
    translatexone:{},
    translatexTF:false,
    bannerdata:[],
    newcardata:[],
    showcardata:[],
    fixedTF:true,
    islogin:'0',
    userphone:'',
    isphone:true,
    issmsbox:false,
    phoneid:'',
    smstime:60,
    inputdata:{
      inputone:'',
      inputtwo: '',
      inputthree: '',
      inputfour: '',
      inputfive: '',
      inputsix: '',
    },
    smsdata:'',
    oldnum:0,
    smsinputfous:false,
    translatewidth:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取屏幕的高度
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var winWidth = sysInfo.windowWidth;
    console.log("width", winWidth)
    if (winWidth>400){
      this.setData({
        translatewidth:65
      })
    }else{
      this.setData({
        translatewidth: 55
      })
    }
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
   var outtime= wx.getStorageSync("foot_dtime");
   this.setData({
     islogin: wx.getStorageSync("isBindPhone")
   })
    var nowtime = Date.parse(new Date());
    if (parseInt(nowtime / 1000) - Number(outtime)>0){
      wx.removeStorageSync("foot");
      wx.removeStorageSync("foot_dtime");
    }
    Request.Indexbanner("",function(res){
      console.log("banner", res.data.data)
       let str = JSON.stringify(res.data.data);
        str = str.replace(/null/g, '""');
      that.setData({
        bannerdata: JSON.parse(str),
        fixedTF:false
      })
    })
    Request.Indexnewcar("",function(res){
      let str = JSON.stringify(res.data.data);
      str = str.replace(/null/g, '""');
      that.setData({
        newcardata: JSON.parse(str),
        fixedTF:false
      })
    })
    Request.Indexshowcar("",function(res){
      console.log("showcar",res);
      let str = JSON.stringify(res.data.data);
      str = str.replace(/null/g, '""');
      that.setData({
        showcardata: JSON.parse(str),
        fixedTF:false
      })
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
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 1000
    })
  },
  Openmore(){
    var rotate = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
    var translatexone = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    var translatex = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    if (this.data.rotateTF){
      this.setData({
        rotateTF:false
      })
      rotate.rotate(0,0).step()
    }else{
      this.setData({
        rotateTF: true
      })
      rotate.rotate(45, 45).step()
    }
    if (this.data.translatexTF){
      this.setData({
        translatexTF:false
      })
      translatex.opacity(1).translateX(0).step()
      translatexone.opacity(1).translateX(0).step()
    }else{
      this.setData({
        translatexTF: true
      })
      translatex.opacity(1).translateX(-(this.data.translatewidth*2+10)).step()
      translatexone.opacity(1).translateX(-(this.data.translatewidth+5)).step()
    }
    this.setData({
      rotate: rotate.export(),
      translatex: translatex.export(),
      translatexone: translatexone.export()
    })
  },
  //进入车辆详情页面
  Godetail(e){
    wx.navigateTo({
      url: '../cardetail/cardetail?id='+e.currentTarget.dataset.id,
    })
    if (this.data.islogin=='1'){
      var userfoot = wx.getStorageSync("foot");
      if (userfoot) {
        var iscarid = '';
        for (var i = 0; i < userfoot.length; i++) {
          if (e.currentTarget.dataset.id == userfoot[i]) {
            iscarid = i;
            break;
          }
        }
        if (iscarid === '') {
          var storagedata = e.currentTarget.dataset.id;
          userfoot.push(storagedata);
          this.Setstorage("foot", userfoot, 168);
        }
      } else {
        var userfoot = [];
        var storagedata = e.currentTarget.dataset.id;
        userfoot.push(storagedata);
        this.Setstorage("foot", userfoot, 168)
      }
    }  
  },
  //足迹
  Gofoot(){
    if(this.data.islogin=='1'){
      wx.navigateTo({
        url: '../footprint/footprint',
      })
    }else{
      wx.navigateTo({
        url: '../register/register',
      })
    }
    
  },
  //车辆列表
  Gocarlist(e){
    wx.navigateTo({
      url: '../carlist/carlist?rankId='+e.currentTarget.dataset.id,
    })
  },
  //联系
  Gophone(){
    wx.makePhoneCall({
      phoneNumber: '13099968918',
    })
  },
  //搜索
  Search(e){
    console.log(e)
    wx.navigateTo({
      url: '../carlist/carlist?serchName=' + e.detail.value+'&isshow=2',
    })
  },
  //设置缓存持续时间
  Setstorage(k, v, time) {
    wx.setStorageSync(k, v);
    console.log("foot", wx.getStorageSync("foot"))
    var seconds = parseInt(time*3600);
    if (seconds > 0) {
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000 + seconds;
      wx.setStorageSync(k + "_dtime", timestamp + "");
    }
  },
  //用户手机号
  Getphone(e){
    this.setData({
      userphone:e.detail.value
    })
  },
  //提交用户号码
  Upphone(){
    var that=this;
    var data ={
      telPhone:this.data.userphone
    }
    console.log("this.phoneTF",this.phoneTF());
    if (this.phoneTF()){
      if (this.data.isphone) {
        this.setData({
          isphone: true,
        })
        Request.Indexphone(data, function (res) {
          console.log("res",res)
          that.setData({
            isphone: true
          })
          if(res.data.isOk){
            that.setData({
              issmsbox:true,
              smstime: 60,
              phoneid:res.data.data,
            })
            that.Downtime()
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:"none"
            })
          }
        })
      }else{
        wx.showToast({
          title: '请勿重复点击',
          icon:"none"
        })
      }
    }else{
      wx.showToast({
        title: '请输入正确的手机号',
        icon:"none"
      })
    }
    
    
  },
  //重新发送验证码
  Againsms(){
    that.Downtime()
    var data = {
      telPhone: this.data.userphone,
      smstime: 60,
    }
    that.Downtime();
    Request.Indexphone(data, function (res) {
      console.log("res",res)
      if(res.data.isOk){
        that.setData({
          phoneid:res.data.data,
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:"none"
        })
      }
    })
  },
  // 手机号判断
  phoneTF() {
    console.log(this.data.userphone);
    if ((/^1[34578]\d{9}$/.test(this.data.userphone))) {
      return true
    } else {
      return false
    }
  },
  //倒计时
  Downtime(){
    var that=this;
    var downtime = setInterval(function(){
      if (that.data.issmsbox){
        if (that.data.smstime > 0) {
          that.data.smstime--;
          that.setData({
            smstime: that.data.smstime
          })
          console.log("times", that.data.smstime)
        } else {
          that.setData({
            smstime: 0
          })
          clearInterval(downtime);
        }
      }else{
        clearInterval(downtime);
      }
    },1000)
    
  },
  //关闭验证码弹窗
  Closesms(){
    this.setData({
      issmsbox:false
    })
  },
  //获取输入框焦点
  Getfous(){
    this.setData({
      smsinputfous:true
    })
  },
  //输入验证码
  Inputsms(e){
    var that=this;
    var num = e.detail.cursor;
    var sms = e.detail.value;
    console.log(e.detail.value);
    if(num>this.data.oldnum){
      this.setData({
        oldnum: e.detail.cursor
      })
      switch (num) {
        case 1:
          this.setData({
            'inputdata.inputone': sms.charAt(sms.length - 1),
          })
          break;
        case 2:
          this.setData({
            'inputdata.inputtwo': sms.charAt(sms.length - 1)
          })
          break;
        case 3:
          this.setData({
            'inputdata.inputthree': sms.charAt(sms.length - 1)
          })
          break;
        case 4:
          this.setData({
            'inputdata.inputfour': sms.charAt(sms.length - 1)
          })
          break;
        case 5:
          this.setData({
            'inputdata.inputfive': sms.charAt(sms.length - 1)
          })
          break;
        case 6:
          this.setData({
            'inputdata.inputsix': sms.charAt(sms.length - 1),
          })
          break;
        default:
          break;
      }
      console.log(e.detail.value, this.data.inputdata,this.data.oldnum);
      if (e.detail.cursor == 6) {
        var calldata = {
          id: this.data.phoneid,
          code: e.detail.value,
        } 
        Request.Indexphonecall(calldata, function (res) {
          console.log("res", res)
          if(res.data.isOk){
            that.setData({
              issmsbox: false,
              userphone: '',
              smstime: 60,
              smsdata: '',
              oldnum: 0,
              smsinputfous: false,
              'inputdata.inputone': '',
              'inputdata.inputtwo': '',
              'inputdata.inputthree': '',
              'inputdata.inputfour': '',
              'inputdata.inputfive': '',
              'inputdata.inputsix': '',
            })
            wx.showToast({
              title: '提交成功，请保持电话畅通',
              icon:"none"
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:"icon"
            })
          }
        })
      }
    }else{
      switch (num) {
        case 0:
          this.setData({
            'inputdata.inputone': '',
          })
          break;
        case 1:
          this.setData({
            'inputdata.inputtwo': ''
          })
          break;
        case 2:
          this.setData({
            'inputdata.inputthree': ''
          })
          break;
        case 3:
          this.setData({
            'inputdata.inputfour': ''
          })
          break;
        case 4:
          this.setData({
            'inputdata.inputfive': ''
          })
          break;
        case 5:
          this.setData({
            'inputdata.inputsix': ''
          })
          break;
        default:
          break;
      }
      this.setData({
        oldnum: e.detail.cursor
      })
    }
  },
  //滚动监听
  onPageScroll: function (e) {
    var animationscrolltop=wx.createAnimation({
      duration: 400,
      timingFunction: '"ease"',
    })
    animationscrolltop.opacity(0.01 * e.scrollTop).step();
      this.setData({
        animationscrolltop: animationscrolltop.export()
      })
  }
})