
var Httpone ='https://api.cargogoclub.com'
//var Httpone = 'http://192.168.54.40:10009'
//var Httptwo = 'http://192.168.54.30:9999'
//var Httpthree = 'http://192.168.54.30:9999'

var requestTimes = 0;

// 获取token
var Login = function(onsuccess) {

  wx.login({
    success: res => { 
      Ajaxpost(Httpone,'/user/carThirdLogin/userWxLogin',{code:res.code},function(res){
        onsuccess(res)
      })
    }
  })
}
//首页轮播图
var Indexbanner=function(data,onsuccess){
  Ajaxget(Httpone, '/user/carAdvert/selectList', data, function (res) {
    onsuccess(res)
  })
}
//首页新车优选
var Indexnewcar = function (data, onsuccess) {
  Ajaxget(Httpone, '/user/carBrand/selectList', data, function (res) {
    onsuccess(res)
  })
}
//首页用户电话
var Indexphone = function (data, onsuccess) {
  Ajaxpost(Httpone, '/user/carUserCall/getCallCode', data, function (res) {
    onsuccess(res)
  })
}
//首页呼叫申请
var Indexphonecall = function (data, onsuccess) {
  Ajaxpost(Httpone, '/user/carUserCall/callApply', data, function (res) {
    onsuccess(res)
  })
}
//车辆品牌
var Carbrand = function (data, onsuccess) {
  Ajaxget(Httpone, '/user/carBrand/select', data, function (res) {
    onsuccess(res)
  })
}
//添加或者移除我的收藏
var Insertmycollection = function (data, onsuccess) {
  Ajaxpost(Httpone, '/user/carCollect/insert', data, function (res) {
    onsuccess(res)
  })
}
//首页展示车辆
var Indexshowcar = function (data, onsuccess) {
  Ajaxget(Httpone, '/car/car/selectList', data, function (res) {
    onsuccess(res)
  })
}
//车辆列表
var Carlist = function (data, onsuccess) {
  console.log("www", data)
  Ajaxget(Httpone, '/car/car/select?rankId=' + data.rankId + '&current=' + data.current + '&size=' + data.size + '&serchName=' + data.serchName
   + '&type=' + data.type + '&minPrice=' + data.minPrice + '&maxPrice=' + data.maxPrice + '&brandName=' + data.brandName,"", function (res) {
    onsuccess(res)
  })
}
//车辆详情
var Cardetail = function (data, onsuccess) {
  Ajaxget(Httpone, '/car/car/getCarInfo/' + data, "", function (res) {
    onsuccess(res)
  })
}
//车辆全部配置
var Carallconfig = function (data, onsuccess) {
  Ajaxget(Httpone, '/car/car/getCarInfoParams/' + data, "", function (res) {
    onsuccess(res)
  })
}
//足迹
var Myfootprint = function (data, onsuccess) {
  Ajaxget(Httpone, '/car/car/getFootprint?carIds=' + data, "", function (res) {
    onsuccess(res)
  })
}
//加入车库
var Jiongarage = function (data, onsuccess) {
  Ajaxpost(Httpone, '/order/carBuyCarbarn/addBarn', data, function (res) {
    onsuccess(res)
  })
}
//post请求
var Ajaxpost = function(Http, url, data, onsuccess) {
  wx.request({
    method: "POST",
    url: Http + url,
    data: data,
    header: {
      'content-type': 'application/json',
      'Authorization': "Bearer " + wx.getStorageSync("token") || '',
    },
    success: function(res) {
      onsuccess(res)
    },
    fail: function(res) {
      onsuccess(res)
      wx.showToast({
        title: '网络错误，请等待网络正常之后重试',
        icon: "none",
        duration: 4000
      })
    },
    complete: function(res) {
      if (res.statusCode == 401) {
        if (requestTimes < 3) {
          requestTimes++;
          Login(function(res) {
            wx.setStorageSync("token", res.data.data.token)
            wx.setStorageSync("isBindPhone", res.data.data.isBindPhone)
            if (res.statusCode == 200) {
              setTimeout(function() {
                Ajaxpost(Http, url, data, onsuccess)
              }, 2000)
            }
          })
        }
        console.log("requestTimes", requestTimes)
      } else if (res.statusCode == 405) {
        wx.setStorageSync("isBindPhone", "0")
      }else{
        requestTimes=0;
      }
    }
  })
}
//get请求
var Ajaxget = function(Http, url, data, onsuccess) {
  wx.request({
    method: "GET",
    url: Http + url,
    data: data,
    header: {
      'content-type': 'application/json',
      'Authorization': "Bearer " + wx.getStorageSync("token") || '',
    },
    success: function(res) {
      onsuccess(res)
    },
    fail: function(res) {
      onsuccess(res)
      wx.showToast({
        title: '网络错误，请等待网络正常之后重试',
        icon: "none",
        duration: 4000
      })
    },
    complete: function(res) {
      if (res.statusCode == 401) {
        if (requestTimes < 3) {
          requestTimes++;
          setTimeout(function() {
            Login(function(res) {
              wx.setStorageSync("token", res.data.data.token)
              wx.setStorageSync("isBindPhone", res.data.data.isBindPhone)
              if (res.statusCode == 200) {
                setTimeout(function() {
                  Ajaxget(Http, url, data, onsuccess)
                }, 2000)
              }
            })
          }, 2000)
        }
      } else if (res.statusCode == 405) {
        wx.setStorageSync("isBindPhone", "0")
      } else {
        requestTimes = 0;
      }

    }
  })
}

var AjaxUploadFile = function (Http,url, fillPath, onSuccess) {
  console.log('uploadUrl', Http + url);
  wx.showLoading({
    title: '上传中。。。 ',
    mask: true,
  })
  wx.uploadFile({
    url: Http + url,
    filePath: fillPath,
    name: 'file',
    header: {
      'Authorization': "Bearer " + wx.getStorageSync("token") || '',
    },
    complete: function(res) {
      console.log('AjaxUploadFile',res)
      var data='';
      try {
        data = JSON.parse(res.data);
      } catch (e) {
        console.log(res)
        console.log(fillPath + " has erro")
      }
      onSuccess(data);
      // wx.hideLoading();
    }
  })
}

function dealJsonNull(json) {
  let str = JSON.stringify(json);
  str = str.replace(/null/g, '""');
  return JSON.parse(str);
}
module.exports = {
  Ajaxpost: Ajaxpost,
  Ajaxget: Ajaxget,
  Login: Login,
  Indexbanner: Indexbanner,
  Indexnewcar: Indexnewcar,
  Indexshowcar: Indexshowcar,
  Indexphone: Indexphone,
  Indexphonecall: Indexphonecall,
  Carlist: Carlist,
  AjaxUploadFile: AjaxUploadFile,
  Cardetail: Cardetail,
  Carallconfig: Carallconfig,
  Carbrand: Carbrand,
  Jiongarage: Jiongarage,
  Insertmycollection: Insertmycollection,
  Myfootprint: Myfootprint
}