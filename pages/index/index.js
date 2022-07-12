// index.js
// 获取应用实例
const app = getApp();
const common = require("../common/common");

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    productList: [],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    wx.login({
      timeout: 3000,
      success: res => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + common.common.appId +'&secret=' + common.common.appSecrect 
          + '&js_code=' + res.code + '&grant_type=authorization_code',
          success: res => {
            if(res.statusCode === 200) {
              const openId = res.data.openid;
              if(openId) {
                app.globalData.openId = openId;
                common.common.funcs.getUser(openId, (user) => {
                  if(user) {
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
                        common.common.funcs.addUser(user);
                      },
                    })
                  }
                });
              }
            }
          }
        })
      }
    })
  },
  onShow() {
    let userId = undefined;
    common.common.funcs.getProduct(userId, (res) => {
      console.log(res);
      for(var item of res) {
        item.thumb = common.common.lvUrlPre + item.thumb;
      }
      console.log(res);
      this.setData({
        canIUseGetUserProfile: true,
        productList: res ? res : []
      });
    });
  }

})
