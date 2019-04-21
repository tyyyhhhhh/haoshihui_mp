var app = getApp()
import eventListener from "../../eventListener.js";

Page({
  data: {
    loading: false,
  },
  onHide: function (e) {
    eventListener("Left the app ", this.route)
  },

  onLoad: function () {
  },

  bindSubmit: function (e) {
    let shop = {
      email: e.detail.value.email,
      password: e.detail.value.password,
    }

    wx.request({
      url: `https://haoshihui.wogengapp.cn/api/v1/sessions`,
      method: 'POST',
      data: { shop: shop },
      success: res => {
        console.log(res)
      }
    })
  }
})



