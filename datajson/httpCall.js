import https from '/request.js';
var header = 'https://api.cargogoclub.com';
//var header = 'http://192.168.54.40:10009';
//var header3 = 'http://192.168.54.30:10004';
// var header2 = 'http://192.168.54.29:10007';

/**
 * 获取我的车库列表
 */
var getBarnList = function (current, onSuccess){
  https.Ajaxget(header, '/order/carBuyCarbarn/getBarnList',
   {
     current:current 
   },
    onSuccess);
}

/**
 * 预约购车
 */
var addCarOrder = function (barnIdList,onSuccess){
  https.Ajaxpost(header, '/order/carBuyOrder/addOrder',
    {
      barnIdList: barnIdList
    },
    onSuccess);
}

/**
 * 删除我的车库单项
 */
var delCar = function (id, onSuccess) {
  https.Ajaxpost(header, '/order/carBuyCarbarn/deleteBarn',
    {
      id: id
    },
    onSuccess);
}

/**
 * 获取订单列表
 */
var getOrderList = function (current, onSuccess) {
  https.Ajaxget(header, '/order/carBuyOrder/orderList',
    {
      //  size:4,
      current: current
    },
    onSuccess);
}

/**
 * 图片上传
 */
var imgUpload = function (filePath, onSuccess) {
  console.log(filePath);
  https.AjaxUploadFile(header, '/user/api/imgUpload/upload', filePath,onSuccess);
}

/**
 * 编辑我的资料
 */
var editPersonalInfo = function (data, onSuccess) {
  https.Ajaxpost(header, '/user/carUser/insert',data,onSuccess);
}

/**
 * 获取我的资料
 */
var getUserInfo = function ( onSuccess) {
  https.Ajaxget(header, '/user/carUser/selectOne',
    {
    },
    onSuccess);
}

/**
 * 获取我的收藏
 */
var getCollectList = function (current ,onSuccess) {
  https.Ajaxget(header, '/user/carCollect/selectList',
    {
      current: current 
    },
    onSuccess);
}

/**
 * 删除我的收藏单项
 */
var delCollect = function (id, onSuccess) {
  https.Ajaxpost(header, '/user/carCollect/delete',
    {
      id: id
    },
    onSuccess);
}

/**
 * 获取验证码
 */
var sendEnrollSms = function (phone , onSuccess) {
  https.Ajaxget(header, '/user/tMobileCode/sendEnrollSms',
    {
      phone: phone 
    },
    onSuccess);
}

/**
 * 注册小程序帐号
 */
var userEnroll = function (phone,code, onSuccess) {
  https.Ajaxpost(header, '/user/carThirdLogin/userEnroll',
    {
      phone: phone,
      code: code
    },
    onSuccess);
}

/**
 * 注册小程序帐号
 */
var userEnroll = function (phone, code, onSuccess) {
  https.Ajaxpost(header, '/user/carThirdLogin/userEnroll',
    {
      phone: phone,
      code: code
    },
    onSuccess);
}

/**
 * 修改头像昵称
 */
var updateWxName = function (headImg, nickName , onSuccess) {
  https.Ajaxpost(header, '/user/carThirdLogin/updateWxName',
    {
      headImg: headImg ,
      nickName: nickName 
    },
    onSuccess);
}

module.exports = {
  getBarnList: getBarnList,
  addCarOrder:addCarOrder,
  delCar: delCar,
  getOrderList: getOrderList,
  imgUpload: imgUpload,
  editPersonalInfo: editPersonalInfo,
  getUserInfo: getUserInfo,
  getCollectList: getCollectList,
  delCollect: delCollect,
  sendEnrollSms: sendEnrollSms,
  userEnroll: userEnroll,
  updateWxName: updateWxName
}