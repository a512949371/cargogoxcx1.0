// pages/personal/personalInfo/personalInfo.js
import httpCall from '../../../datajson/httpCall.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPicShow1: true,
    isPicShow2: true,
    isManShow: true,

    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',

    picUrl1: '',
    picUrl2: '',
    picUrl3: '',
    picUrl4: '',
    picUrl5: '',

    linkMan: '',
    phone: '',
    address: '',
    bankCard: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      phone: wx.getStorageSync('phone')
    })
    this.loadData();
  },

  onShow: function() {},

  loadData: function() {
    var that = this;
    httpCall.getUserInfo(function(res) {
      console.log('getUserInfo',res);
      if (res.data.isOk) {
        var carUserInfo = res.data.carUserInfo;
        if (carUserInfo.realName != null&&carUserInfo.realName!='') {
          that.setData({
            isPicShow1: false,
            isPicShow2: false,
            isManShow: false,
            linkMan: carUserInfo.realName,
            address: carUserInfo.address,
            bankCard: carUserInfo.bankCard,
            img1: carUserInfo.idCardFront,
            img2: carUserInfo.idCardReverse,
            img3: carUserInfo.idCardHand,
            img4: carUserInfo.drivingFront,
            img5: carUserInfo.drivingReverse
          })
        }
        that.setData({
          phone: carUserInfo.phone,
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false
        })
      }
    });
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 输入绑定
   */
  //联系人
  iLinkMan(e) {
    this.data.linkMan = e.detail.value;
  },
  // 电话
  iPhone(e) {
    this.data.phone = e.detail.value;
  },
  // 地址
  iAddress(e) {
    this.data.address = e.detail.value;
  },
  // 银行卡
  iBankCard(e) {
    this.data.bankCard = e.detail.value;
  },

  showPic1(e) {
    this.setData({
      isPicShow1: true
    })
  },
  showPic2(e) {
    this.setData({
      isPicShow2: true
    })
  },
  uploadImage(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log('chooseImage-------', res);
        var tempFiles = res.tempFilePaths[0];
        if (tempFiles) {
          httpCall.imgUpload(tempFiles, function(res) {
            console.log('imgUpload', res);
            wx.hideLoading();
            if (res.isOk) {
              var url = res.map.url;
              var img = '/' + res.map.img;
              switch (index) {
                case '1':
                  that.data.img1 = img;
                  that.setData({
                    picUrl1: url
                  })
                  break;
                case '2':
                  that.data.img2 = img;
                  that.setData({
                    picUrl2: url
                  })
                  break;
                case '3':
                  that.data.img3 = img;
                  that.setData({
                    picUrl3: url
                  })
                  break;
                case '4':
                  that.data.img4 = img;
                  that.setData({
                    picUrl4: url
                  })
                  break;
                case '5':
                  that.data.img5 = img;
                  that.setData({
                    picUrl5: url
                  })
                  break;
              }
              console.log('++++++++++', that.data.isPicShow1);
            } else {
              wx.showModal({
                title: '提示',
                content: res.msg,
              })
            }

          })
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },

  btnSave(e) {
    var that = this;
    if (!that.checker()) {
      return;
    }
    httpCall.editPersonalInfo({
      uid: 1,
      type: 1,
      realName: that.data.linkMan,
      phone: that.data.phone,
      address: that.data.address,
      bankCard: that.data.bankCard,
      idCardFront: that.data.img1,
      idCardReverse: that.data.img2,
      idCardHand: that.data.img3,
      drivingFront: that.data.img4,
      drivingReverse: that.data.img5,
    }, function(res) {
      console.log('editPersonalInfo', res)
      if (res.data.isOk) {
        wx.showToast({
          title: '操作成功',
        })
        wx.setStorageSync('isInformation', 1);
        wx.navigateBack({

        })
      }
    })
  },

  checker: function() {
    var result = true;
    var errmsg = '';
    if (this.data.linkMan == '') {
      errmsg = '请输入姓名'
      result = false;
    } else if (this.data.phone == '') {
      errmsg = '请输入电话'
      result = false;
    } else if (this.data.address == '') {
      errmsg = '请输入地址'
      result = false;
    } else if (this.data.bankCard == '') {
      errmsg = '请输入银行卡'
      result = false;
    } else if (this.data.img1 == '') {
      errmsg = '请上传身份证'
      result = false;
    } else if (this.data.img2 == '') {
      errmsg = '请上传身份证'
      result = false;
    } else if (this.data.img3 == '') {
      errmsg = '请上传身份证'
      result = false;
    } else if (this.data.img4 == '') {
      errmsg = '请上传驾驶执照'
      result = false;
    } else if (this.data.img5 == '') {
      errmsg = '请上传驾驶执照'
      result = false;
    }
    if (!result) {
      wx.showModal({
        title: '提示',
        content: errmsg,
        showCancel: false
      })
    }
    return result;
  }
})