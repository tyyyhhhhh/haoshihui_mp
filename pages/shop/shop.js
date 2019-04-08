// pages/shop/shop.js
var app = getApp()


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

    wx.request({
      url: `http://localhost:3000/api/v1/shops/${options.id}`,
      method: 'GET',
      success(res) {
        const shop = res.data;
        console.log(shop)

        // Update local data
        that.setData(
          shop
        );

        wx.hideToast();
      }
    });

    var shops = app.globalData.shops
    let index = shops.findIndex(shop => shop.id.toString() === options.id);

    // Update local data
    this.setData(shops[index]);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.name || "Something",
    });
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