import eventListener from "../../eventListener.js";
// pages/shops/shops.js
var app = getApp()

Page({
  onShow: function () {
    eventListener("onShow", this.route)
  },
  data: {
    loading: false,
  },
  addShop(e) {

    wx.navigateTo({
      url: `../newshop/new`
    });
  },
  
  onLoad: function (options) {
    const page = this;
  
    wx.showToast({
      title: 'Updating',
      icon: 'success',
      duration: 3000
    });

    wx.request({
      url: "https://haoshihui.wogengapp.cn/api/v1/shops",
      method: "GET",
      header: {
        'X-Customer-Token': wx.getStorageSync('token'),
        'X-Customer-Email': wx.getStorageSync('email'),
        'X-Customer-Address': wx.getStorageSync('address')
      },
      success(res) {
        const address = wx.getStorageSync('address')
        console.log(res)
        const shops = res.data.shops;

          // Update local data
          page.setData({
            shops: shops,
            address: address
        });

        wx.hideToast();
      }
    });

    this.setData(app.globalData)
  },


  showShop(e) {
    const dataset = e.currentTarget.dataset;
   
    wx.navigateTo({
      url: `../shop/shop?id=${dataset.shopId}`
    });
  },

  bindSubmit: function (f) {
    this.setData({
      loading: !this.data.loading
    });
    var name = f.detail.value.name;
    console.log(name)
    if (this.data.shops.includes(name)) {
      showShop(f)
    }
  }


})