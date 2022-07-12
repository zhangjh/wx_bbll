const common = {
  appId: "wx43a5660370f81067",
  appSecrect: "02917c0f677705707354cce3d145d90b",
  lvUrlPre: "https://www.louisvuitton.cn/",
  reqUrlPre: "https://zhangjh.me:5000/bbzs/wx",
  funcs: {
    wxNet,
    getProduct,
    addSubscribe,
    addUser,
    getUser
  }
};

function wxNet(body) {
  let method = body.method ? body.method : 'get';
  wx.request({
    url: body.url,
    data: body.data,
    method: method,
    header: method.toUpperCase() === 'POST' ? {
      'content-type': 'application/x-www-form-urlencoded'
    } : undefined,
    success: res => {
      if(res.statusCode === 200) {
        if(res.data.success) {
          body.resolve(res.data);
        } else {
          body.reject(res.data.errorMsg);
        }
      } else {
        body.reject("网络请求出错:" + res.statusCode);
      }
    },
    fail: err => {
      console.error(err);
      body.reject(err);
    }
  });
}

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

function addSubscribe(wxId) {
  if(!wxId) {
    wx.showModal({
      content: "订阅失败: 未获取到用户",
      showCancel: false
    })
    return;
  }
  let body = {
    url: common.reqUrlPre + "/addSubscribe",
    data: {wxId},
    method: 'post',
    resolve: (res) => {
      wx.showModal({
        content: "订阅成功",
        showCancel: false
      })
    },
    reject: (err) => {
      wx.showModal({
        content: "订阅失败:" + err,
        showCancel: false
      })
    }
  };

  common.funcs.wxNet(body);
}

function addUser(user) {
  let body = {
    url: common.reqUrlPre + "/addUser",
    data: user,
    method: 'POST',
    resolve: res => {

    }
  };
  common.funcs.wxNet(body);
}

function getUser(openId, cb) {
  let body = {
    url: common.reqUrlPre + "/getUser",
    data: {outerId: openId},
    resolve: res => {
      cb(res);
    }
  };
  common.funcs.wxNet(body);
}

module.exports = {
  common
};