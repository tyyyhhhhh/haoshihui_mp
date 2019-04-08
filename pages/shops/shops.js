// pages/shops/shops.js
var app = getApp()

Page({
  data: {
    loading: false,
  },
  onLoad: function (options) {

    // Display toast when loading


    wx.showToast({
      title: 'Updating',
      icon: 'success',
      duration: 3000
    });



    const page = this;
    wx.request({
      url: "http://localhost:3000/api/v1/shops",
      method: "GET",
      success(resp) {
        page.setData({
          shops: resp.data.shops
        })
      }
    })

    // Update local data
    this.setData(app.globalData)
  },


  showShop(e) {
    const data = e.currentTarget.dataset;
    const shop = data.shop;

    wx.navigateTo({
      url: `../shop/shop?id=${shop.id}`
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