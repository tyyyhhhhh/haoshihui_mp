var app = getApp()
Page({
  data: {
    loading: false,
  },


  onLoad: function () {
  },

  bindSubmit: function (e) {
    wx.setStorageSync('email', e.detail.value.email)
    let customer = {
      email: e.detail.value.email,
      password: e.detail.value.password
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
      }
    })
  }
})



