// pages/rentcar/rentcar.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useheight: '',
    navdata: [{
      id: 1,
      name: "默认排序"
    },
    {
      id: 2,
      name: "品牌"
    },
    {
      id: 3,
      name: "价格"
    }],
    postdata:{
      'rankId':'0',
      'type':'1',
      'serchName':'',
      'brandName':'',
      'brandId':'0',
      'minPrice':'',
      'maxPrice':'',
      'current':1,
      'size':10
    },
    params:[],
    pardata: [],
    pardataone: [{
      id: 1,
      name: "默认排序",
      type:1
    },
    {
      id: 2,
      name: "销量最高",
      type:2
    },
    {
      id: 3,
      name: "车价最高",
      type:3
    },
    {
      id: 4,
      name: "车价最低",
      type:4
    }],
    pardatatwo: [{
      id: 1,
      name: "默认"
    },
    {
      id: 2,
      name: "20万以下",
      minPrice: 20,
      maxPrice:''
    },
    {
      id: 3,
      name: "20-40万",
      minPrice: 20,
      maxPrice: 40
    },
    {
      id: 4,
      name: "40万以上",
      minPrice: '',
      maxPrice: 40
    }],
    actTF: '',
    actone: 0,
    changeheight: {},
    rotate: {},
    rotateTF: false,
    translatex: {},
    translatexTF: false,
    changebottom: {},
    carlistdata:[],
    fixedTF:true,
    serchName:'',
    islogin:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.postdata.rankId = options.rankId||'0';
    this.data.postdata.brandId = options.brandId||'0';
    this.data.postdata.type = options.type || '1';
    this.data.postdata.minPrice = options.minPrice || '';
    this.data.postdata.maxPrice = options.maxPrice || '';
    this.data.postdata.brandName = options.brandname|| '';
    this.data.postdata.serchName = options.serchName || '';
    this.data.serchName = options.serchName||'';
    this.data.navdata[2].name = options.pricename || "价格";
    this.setData({
      navdata:this.data.navdata,
      postdata: this.data.postdata,
      serchName: this.data.serchName
    })
    console.log(options,"op")
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          useheight: res.windowHeight
        })
      }
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
    this.setData({
      carlistdata:[]
    })
    this.Getjson();
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
    this.setData({
      'postdata.current': 1,
      carlistdata: []
    })
    this.Getjson()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.postdata.current++
    this.setData({
      'postdata.current': this.data.postdata.current,
    })
    this.Getjson()
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
  //右下导航
  Openmore() {
    var rotate = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    var translatex = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    if (this.data.rotateTF) {
      this.setData({
        rotateTF: false
      })
      rotate.rotate(0, 0).step()
    } else {
      this.setData({
        rotateTF: true
      })
      rotate.rotate(45, 45).step()
    }
    if (this.data.translatexTF) {
      this.setData({
        translatexTF: false
      })
      translatex.opacity(0).translateX(60).step()
    } else {
      this.setData({
        translatexTF: true
      })
      translatex.opacity(1).translateX(-120).step()
    }
    this.setData({
      rotate: rotate.export(),
      translatex: translatex.export()
    })
  },
  //打开参数选择弹窗
  Openpar(e) {
    var that = this;
    var changeheight = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    var changebottom = wx.createAnimation({
      duration: 1000,
      timingFunction: 'step-start',
    })
    var changeindex = this.data.navdata.length;
    for (var i = 0; i < changeindex; i++) {
      if (i == 1) {
        if (e.currentTarget.dataset.num == i) {
        wx.navigateTo({
          url: '../carbrand/carbrand?type=' + this.data.postdata.type + '&minPrice=' + this.data.postdata.minPrice + '&maxPrice=' + this.data.postdata.maxPrice + '&typename=' + this.data.navdata[0].name + '&pricename=' + this.data.navdata[2].name,
        })
        }
      } else {
        if (e.currentTarget.dataset.num == i) {
          if (this.data.actTF === i) {
            changeheight.height(0).step();
            changebottom.height(0).step();
            this.setData({
              actTF: '',
              changeheight: changeheight.export(),
              changebottom: changebottom.export()
            })
          } else {
            changebottom.height(this.data.useheight).step();
            if (this.data.actTF === '') {
              changeheight.height(200).step();
              if (e.currentTarget.dataset.num === 0) {
                this.data.pardata = this.data.pardataone
              } else if (e.currentTarget.dataset.num === 2) {
                this.data.pardata = this.data.pardatatwo
              }
            } else {
              changeheight.height(0).step();
              changeheight.height(200).step();
              if (e.currentTarget.dataset.num === 0) {
                setTimeout(function () {
                  that.setData({
                    pardata: that.data.pardataone
                  })
                }, 1000)
              } else if (e.currentTarget.dataset.num === 2) {
                setTimeout(function () {
                  that.setData({
                    pardata: that.data.pardatatwo
                  })
                }, 1000)
              }
            }

            this.setData({
              actTF: i,
              changeheight: changeheight.export(),
              changebottom: changebottom.export(),
              pardata: this.data.pardata,
              actone: 0,
            })
          }
        }
      }
    }
  },
  //查询参数
  Changepar(e) {
    var parlength = this.data.pardata.length;
    var changeheight = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    var changebottom = wx.createAnimation({
      duration: 1000,
      timingFunction: 'step-start',
    })
    changeheight.height(0).step();
    changebottom.height(0).step();
    for (var i = 0; i < parlength; i++) {
      if (e.currentTarget.dataset.index === i) {
        this.data.navdata[this.data.actTF].name = this.data.pardata[i].name;
        console.log(this.data.actTF,'1')
        switch (this.data.actTF){
          case 0:
            this.setData({
              actTF: '',
              actone: e.currentTarget.dataset.index,
              navdata: this.data.navdata,
              'postdata.type': this.data.pardata[i].type || '',
              changeheight: changeheight.export(),
              changebottom: changebottom.export(),
              'postdata.current': 1,
              carlistdata: []
            })
          break;
          case 2:
            this.setData({
              actTF: '',
              actone: e.currentTarget.dataset.index,
              navdata: this.data.navdata,
              'postdata.minPrice': this.data.pardata[i].minPrice || '',
              'postdata.maxPrice': this.data.pardata[i].maxPrice || '',
              changeheight: changeheight.export(),
              changebottom: changebottom.export(),
              'postdata.current': 1,
              carlistdata: []
            })
          break;
          default:
          break
        }
        
      }
    }
    this.Getjson()
  },
  Getjson() {
    var that = this;
    this.setData({
      fixedTF:true
    })
    Request.Carlist(this.data.postdata, function (res) {
      that.setData({
        fixedTF: false
      })
      if (res.data.isOk) {
        console.log("data",res)
        switch (res.data.queryModel.type){
          case '1':
            that.data.navdata[0].name="默认排序";
            break;
          case '2':
            that.data.navdata[0].name = "销量最高";
            break;
          case '3':
            that.data.navdata[0].name = "车价最高";
            break;
          case '4':
            that.data.navdata[0].name = "车价最低";
            break;
          default:
            break;
        }
        if (res.data.queryModel.serchName!=''){
          that.data.navdata[1].name = "品牌";
        }else{
          that.data.navdata[1].name = res.data.queryModel.brandName||'品牌';
        }
        if (res.data.queryModel.minPrice == '' && res.data.queryModel.maxPrice==''){
          that.data.navdata[2].name = "默认";
        } else if (res.data.queryModel.minPrice != '' && res.data.queryModel.maxPrice == '') {
          that.data.navdata[2].name = "20万以下";
        } else if (res.data.queryModel.minPrice != '' && res.data.queryModel.maxPrice != '') {
          that.data.navdata[2].name = "20-40万";
        } else if (res.data.queryModel.minPrice == '' && res.data.queryModel.maxPrice != '') {
          that.data.navdata[2].name = "40万以上";
        }

          //let str = JSON.stringify(res.data.data.records);
         // str = str.replace(/null/g, '""');
        if (res.data.data.records.length !=0){
          that.setData({
            carlistdata: that.data.carlistdata.concat(res.data.data.records),
            'postdata.current': res.data.data.current,
            'postdata.size': res.data.data.size,
            params: res.data.queryModel,
            navdata: that.data.navdata
          })
         }else{
           that.setData({
             'postdata.current': res.data.data.current-1,
              params: res.data.queryModel,
              navdata: that.data.navdata
           })
         }
         
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
      wx.stopPullDownRefresh()
    })
  },
  //进入车辆详情页面
  Godetail(e) {
    wx.navigateTo({
      url: '../cardetail/cardetail?id=' + e.currentTarget.dataset.id,
    })
    if (this.data.islogin == '1') {
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
  //搜索
  Search(e){
    this.setData({
      'postdata.serchName':e.detail.value,
      'postdata.current':1,
      carlistdata:[]
    })
    console.log("232", this.data.postdata)
    this.Getjson()
  },
  //设置缓存持续时间
  Setstorage(k, v, time) {
    wx.setStorageSync(k, v);
    console.log("foot", wx.getStorageSync("foot"))
    var seconds = parseInt(time * 3600);
    if (seconds > 0) {
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000 + seconds;
      wx.setStorageSync(k + "_dtime", timestamp + "");
    }
  },
  //足迹
  Gofoot() {
    wx.navigateTo({
      url: '../footprint/footprint',
    })
  },
  //联系
  Gophone() {
    wx.makePhoneCall({
      phoneNumber: '15288151662',
    })
  },
})