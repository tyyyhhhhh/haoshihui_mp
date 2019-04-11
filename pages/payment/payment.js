// pages/payment/payment.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const that = this;
    const order_id = wx.getStorageSync('order_id');
    const shop = wx.getStorageSync('shop');
    that.setData(shop);
    const customerEmail = wx.getStorageSync('email');
    that.setData(customerEmail);
    
    wx.request({
      url: `http://localhost:3000/api/v1/orders/${order_id}`,
      method: 'GET',
      header: {
        'X-Customer-Token': wx.getStorageSync('token'),
        'X-Customer-Email': wx.getStorageSync('email')
      },
      success(res) {
        const order = res.data;
        console.log(order);
        that.setData(order);
        const items = shop.items;
        const pickedItemId = order.item_id - 1;
        const pickedItem = items[pickedItemId];
        that.setData(pickedItem);
        
        wx.hideToast();
      }
    });
    

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
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

  }
})