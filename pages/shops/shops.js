import eventListener from "../../eventListener.js";
// pages/shops/shops.js
var app = getApp()

Page({
  data: {
    loading: false,
  },
  addShop(e) {
    // console.log(data)
    // const shop = data.shop;

    wx.navigateTo({
      url: `../newshop/new`
    });
  },
  
  onLoad: function (options) {
    const page = this;
    eventListener("Shops onLoad", this.route)
    // Display toast when loading

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

    // Update local data
    this.setData(app.globalData)
  },


  showShop(e) {
    const dataset = e.currentTarget.dataset;
    // console.log(data)
    // const shop = data.shop;
    
      eventListener("showShopClicked", this.route, dataset.shopId)
    

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