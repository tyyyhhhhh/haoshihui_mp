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
    });  
  },

  bindSubmit: function (f) {
    wx.setStorageSync('email', f.detail.value.email)
    wx.setStorageSync('address', f.detail.value.address)
    console.log(f.detail.value.address)
    let customer = {
      email: f.detail.value.email,
      password: f.detail.value.password,
      address: f.detail.value.address
    }

    let page = this;

    wx.request({
      url: `https://afternoon-beach-65796.herokuapp.com/api/v1/customers`,
      method: 'POST',
      data: { customer: customer },
      success: res => {
        console.log(res)
        wx.setStorageSync('token', res.data.auth_token),
          console.log(wx.getStorageSync('token')),
        wx.setStorageSync('customer_id', res.data.customer_id),
        wx.reLaunch({
          url: '/pages/shops/shops',
        })
        
      },
    })
  },
})


