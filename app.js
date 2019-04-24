//app.js
import eventListener from "/eventListener.js";
App({

  onHide: function () {
    eventListener("customerLeft", this.route)
  },

  onLaunch: function () {
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