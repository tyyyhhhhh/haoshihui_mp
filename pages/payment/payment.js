// pages/payment/payment.js
import eventListener from "../../eventListener.js";

var app = getApp()

Page({

  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const that = this;
    const order_id = wx.getStorageSync('order_id');
    const shop = wx.getStorageSync('shop');
    that.setData({shop:shop});
    const item = wx.getStorageSync('item');
    that.setData({ item: item });
    let save = item.original_price - item.discount_price
    that.setData({save: save});
    const email = wx.getStorageSync('email');
    that.setData({email:email});
    const customerAddress = wx.getStorageSync('address');
    that.setData({ customerAddress: customerAddress });
    
    wx.request({
      url: `https://haoshihui.wogengapp.cn/api/v1/orders/${order_id}`,
      method: 'GET',
      header: {
        'X-Customer-Token': wx.getStorageSync('token'),
        'X-Customer-Email': wx.getStorageSync('email')
      },
      success(res) {
        const order = res.data;
        that.setData(order);
        wx.hideToast();
      }
    });
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.name || "好食惠",
    });

  },


  onShow: function () {
    eventListener("onShow", this.route)
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  back(e) {
    wx.switchTab({
      url: `../shops/shops`
    });
  },

  PayNow(e) {
    eventListener("Payment confirmed", this.route);

    wx.switchTab({
        url: `../shops/shops`
      });
   
  wx.showToast({
    title: 'Thank you',
    icon: 'success',
    duration: 7000
  })

  },
  
  

  
})

