const common = {
  appId: "wx43a5660370f81067",
  appSecrect: "02917c0f677705707354cce3d145d90b",
  lvUrlPre: "https://www.louisvuitton.cn/",
  reqUrlPre: "http://zhangjh.me:5000/bbzs/wx",
  funcs: {
    getProduct,
    addSubscribe,
    addUser,
    getUser
  }
};

function getProduct(userId, cb) {
  let params = {};
  if(!userId) {
    params.pageIndex = 1;
    params.pageSize = 20;
  }
  wx.request({
    url: common.reqUrlPre + "/getProduct",
    data: params,
    success: res => {
      console.log(res);
      if(res.statusCode === 200) {
        if(res.data.success) {
          cb(res.data.data);
        } else {
          // 业务查询失败
          cb();
        }
      } else {
        // 网络请求失败
      }
    },
    fail: err => {
      console.error(err);
      return [];
    }
  })
}

function addSubscribe(wxId, cb) {
  if(!wxId) {
    cb({success: false});
    return;
  }
  wx.request({
    url: common.reqUrlPre + "/addSubscribe",
    data: {wxId},
    success: res => {
      if(res.statusCode === 200) {
        if(res.data.success) {
          cb({
            success: true
          });
        } else {
          cb({
            success: false,
            errorMsg: res.data.errorMsg
          });
        }
      } else {
        cb({
          success: false, 
          errorMsg: res.errMsg
        });
      }
    },
    fail: res => {
      cb({success: false, errMsg: "网络请求出错"});
    }
  })
}

function addUser(user) {
  console.log(user);
  wx.request({
    url: common.reqUrlPre + "/addUser",
    data: user,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: res => {
      if(res.statusCode === 200) {

      }
    }
  })
}

function getUser(openId, cb) {
  console.log(openId);
  wx.request({
    url: common.reqUrlPre + "/getUser",
    data: {outerId: openId},
    success: res => {
      if(res.statusCode === 200) {
        cb(res.data.data);
      }
    }
  })
}

module.exports = {
  common
};