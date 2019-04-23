//app.js
import eventListener from "/eventListener.js";
App({

  onLaunch: function () {
    const host = 'https://haoshihui.wogengapp.cn/'
    console.log('processing to login')
    wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          url: host + 'login',
          method: 'POST',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log(res)
            wx.setStorageSync('user_id', res.data.user_id)
            wx.setStorageSync('open_id', res.data.open_id)
          }
        })
      }
    })
  },
  globalData: {}
})