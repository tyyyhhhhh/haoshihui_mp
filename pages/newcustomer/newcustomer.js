import eventListener from "../../eventListener.js";

var app = getApp()

Page({
  data: {
    loading: false,
  },

  onEmailClicked: function(e) {
     
    eventListener("emailClicked", this.route)
  },
  onAddressClicked: function (e) {
    eventListener("addressClicked", this.route)
  },
  onPasswordClicked: function (e) {
    eventListener("passwordClicked", this.route)
  },

  onLoad: function () {
    console.log(this.route)
    eventListener("newCustomer onLoad", this.route)

  },

  showPage: function(e) {
    // console.log(data)
    // const shop = data.shop;

    wx.navigateTo({
      url: `../shops/shops`
    });
  },

  bindSubmit: function (f) {
    console.log(f)
    wx.setStorageSync('email', f.detail.value.email)
    wx.setStorageSync('address', f.detail.value.address)
    console.log(f.detail.value.address)
    let customer = {
      email: f.detail.value.email,
      password: f.detail.value.password,
      address: f.detail.value.address
    }

    let page = this;
    console.log(page)

    wx.request({
      url: `https://haoshihui.wogengapp.cn/api/v1/customers`,
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

