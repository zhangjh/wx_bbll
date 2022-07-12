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
  },
  onShow() {
    let openId = app.globalData.openId;
    let userId = undefined;
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
              common.common.funcs.getProduct(userId, data => {
                for(var item of data) {
                  item.thumb = common.common.lvUrlPre + item.thumb;
                }
                this.setData({
                  canIUseGetUserProfile: true,
                  productList: res ? res : []
                });
              });
            },
            reject: err => {
  
            }
          };
          common.common.funcs.wxNet(body);
        }
      })
    }
  }

})
