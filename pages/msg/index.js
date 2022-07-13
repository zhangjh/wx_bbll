// pages/msg/index.js
const app = getApp();
const common = require("../common/common");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: []
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
    const openId = app.globalData.openId;
    common.common.funcs.getMsg(openId, res => {
      console.log(res);
      this.setData({
        msgList: res
      });
    }, err => {
      console.error(err);
    });
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

  handleMsgTap(e) {
    console.log(e.currentTarget.dataset.id);
    const msgId = e.currentTarget.dataset.id;
    wx.showModal({
      content: "已读消息后续不再展示",
      showCancel: false,
      confirmText: "我已知晓",
      success: () => {
        // todo: 记录选项，后续不再弹框
        console.log(1);
        // 更新消息已读
        common.common.funcs.updateMsg(msgId, (res) => {
          console.log(res);
        }, err => {
          console.error(err);
        });
      }
    })
  }
})