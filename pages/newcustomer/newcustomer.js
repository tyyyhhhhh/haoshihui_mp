var app = getApp()
Page({
  data: {
    loading: false,
  },


  onLoad: function () {
  },

  showPage(e) {
    // console.log(data)
    // const shop = data.shop;

    wx.navigateTo({
      url: `../shops/shops`
    });},

  bindSubmit: function (f) {
    wx.setStorageSync('email', f.detail.value.email)
    let customer = {
      email: f.detail.value.email,
      password: f.detail.value.password
    }

    let page = this;

    wx.request({
      url: `http://localhost:3000/api/v1/customers`,
      method: 'POST',
      data: { customer: customer },
      success: res => {
        console.log(res)
        wx.setStorageSync('token', res.data.auth_token),
          console.log(wx.getStorageSync('token')),
        wx.reLaunch({
          url: '/pages/shops/shops',
        })
        
      },
    })
  },
})


