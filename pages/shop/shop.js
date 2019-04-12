// pages/shop/shop.js
var app = getApp()


Page({

  /**
   * Page initial data
   */
  data: {

  },

  selectItem(e) {
    const item = e.currentTarget.dataset.item
    const item_id = item.id
    wx.setStorageSync('item', item)
    const customer_id = wx.getStorageSync("customer_id")
    console.log(customer_id)
    let order = {
      item_id: item_id,
      customer_id: customer_id,
      booked: false,
    }
    console.log(order)
    const that = this
    wx.request({
      url: `http://localhost:3000/api/v1/orders`,
      method: 'POST',
      header: {
        'X-Customer-Token': wx.getStorageSync('token'),
        'X-Customer-Email': wx.getStorageSync('email')
      },
      data: order,
      success(res) {
        console.log(res),
        wx.setStorageSync('order_id', res.data.order_id),
        wx.reLaunch({
          url: '/pages/payment/payment',
        })
      }
    });

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    const that = this;

    wx.request({
      url: `http://localhost:3000/api/v1/shops/${options.id}`,
      method: 'GET',
      header: {
        'X-Customer-Token': wx.getStorageSync('token'),
        'X-Customer-Email': wx.getStorageSync('email')
      },
      success(res) {
        const shop = res.data;
        console.log(shop);
        wx.setStorageSync('shop', shop);
        console.log(wx.getStorageSync('shop'));

        // Update local data
        that.setData(
          shop
        );

        wx.hideToast();
      }
    });
    wx.request({
      url: `http://localhost:3000/api/v1/shops/${options.id}`,
      method: "GET",
      header: {
        'X-Customer-Token': wx.getStorageSync('token'),
        'X-Customer-Email': wx.getStorageSync('email')
      },
      success(res) {
        
        const items = res.data.items;
        console.log(items)

        // Update local data
        that.setData({
          items
        });
        wx.hideToast();
      }
    });

    var shops = app.globalData.shops


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

  },

  addToCart: function () {
   
  }
})