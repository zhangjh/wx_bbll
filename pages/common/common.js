const debug = true;

const common = {
  appId: "",
  appSecrect: "",
  lvUrlPre: "https://www.louisvuitton.cn/",
  reqUrlPre: debug ? "http://localhost:5000/bbzs/wx" : "https://zhangjh.me:5000/bbzs/wx",
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
        let bizRes = res.data;
        if(bizRes.success != undefined) {
          if(bizRes.success) {
            body.resolve(bizRes.data);
          } else {
            body.reject(bizRes.errorMsg);
          }
        } else {
          body.resolve(bizRes);
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
  let body = {
    url: common.reqUrlPre + "/getProduct",
    data: params,
    resolve: res => {
      cb(res);
    },
    reject: err => {
      cb(err);
    }
  };
  common.funcs.wxNet(body);
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

    },
    reject: err => {

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
    },
    reject: err => {

    }
  };
  common.funcs.wxNet(body);
}

module.exports = {
  common
};