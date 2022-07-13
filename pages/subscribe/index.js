const { common } = require("../common/common");
const app = getApp();

// pages/subscribe/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    donatePicShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  handleSubscribe() {
    const openId = app.globalData.openId;
    common.funcs.wxMsg((res) => {
      console.log(res);
      if(res === "accept") {
        // 记录订阅请求
        common.funcs.addSubscribe(openId);
      }
    }, err => {
      console.error(err);
    });
  },

  donate() {
    // 弹出收款码
    this.setData({
      donatePicShow: true
    });
  },

  closeDonate() {
    this.setData({
      donatePicShow: false
    });
  }
})