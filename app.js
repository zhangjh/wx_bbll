// app.js
const common = require("./pages/common/common");

App({
  onLaunch() {
    let openId = undefined;
    if(!openId) {
      wx.login({
        timeout: 3000,
        success: res => {
          let body = {
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + common.common.appId +'&secret=' + common.common.appSecrect 
            + '&js_code=' + res.code + '&grant_type=authorization_code',
            resolve: res => {
              const openId = res.openid;
              if(openId) {
                app.globalData.openId = openId;
                common.common.funcs.getUser(openId, (user) => {
                  if(user) {
                    userId = user.id;
                    app.globalData.userInfo = user;
                  } else {
                    wx.getUserInfo({
                      success: res =>  {
                        console.log(res);
                        const userInfo = res.userInfo;
                        let user = {
                          avatarUrl: userInfo.avatarUrl,
                          country: userInfo.country,
                          province: userInfo.province,
                          city: userInfo.city,
                          nickName: userInfo.nickName,
                          gender: userInfo.gender
                        };
                        user.outerId = openId;
                        user.outerType = 1;
                        common.common.funcs.addUser(user);
                      },
                    })
                  }
                });
              }
            },
            reject: err => {
  
            }
          };
          common.common.funcs.wxNet(body);
        }
      })
    }
  },
  globalData: {
    openId: null,
    userInfo: {
      userId: null
    }
  }
})
