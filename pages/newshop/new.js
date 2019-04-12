var app = getApp()
Page({
  data: {
    loading: false,
  },

  onLoad: function () {
  },

  bindSubmit: function (e) {
    let shop = {
      email: e.detail.value.email,
      password: e.detail.value.password
    }

    wx.request({
      url: `https://mighty-forest-60697.herokuapp.com/api/v1/shops`,
      method: 'POST',
      data: { shop: shop },
      success: res => {
        console.log(res)
      }
    })
  }
})



