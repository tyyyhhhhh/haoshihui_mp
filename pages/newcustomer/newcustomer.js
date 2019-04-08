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
      name: e.detail.value.name,
      wechat_id: e.detail.value.wechat_id
    }

    wx.request({
      url: `http://localhost:3000/api/v1/customers`,
      method: 'POST',
      data: { customer: customer },
      success: res => {
        wx.navigateTo({
          url: '/pages/index/index'
        });
      }
    })
  }
})



