var app = getApp()
Page({
  data: {
    loading: false,
  },

  onLoad: function () {
  },

  bindSubmit: function (e) {
    let customer = {
      email: e.detail.value.email,
      password: e.detail.value.password,
    }

    wx.request({
      url: `https://afternoon-beach-65796.herokuapp.com/api/v1/sessions`,
      method: 'POST',
      data: { customer: customer },
      success: res => {
        console.log(res)
      }
    })
  }
})



