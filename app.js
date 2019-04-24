//app.js
import eventListener from "/eventListener.js";
App({

  onHide: function () {
    console.log("onHideApp")
    eventListener("customerLeft", this.route)
  },

  onShow: function () {
    if(wx.getStorageSync('hasRegistered')) {
      console.log("User has registered, dont log event")
    } else {
      eventListener("UniqueNewCustomerOnShow", this.route)
    }
    console.log("onShowApp")
  },

  onLaunch: function () {
    eventListener("customerOpenApp", this.route)
    const host = 'https://haoshihui.wogengapp.cn/'
    console.log('processing to login')
    wx.login({
      success: (res) => {
      
        wx.request({
          url: host + 'login',
          method: 'POST',
          data: {
            code: res.code
          },
          success: (res) => {
            
            wx.setStorageSync('user_id', res.data.user_id)
            wx.setStorageSync('open_id', res.data.open_id)
          }
        })
      }
    })
  },
  globalData: {}
})