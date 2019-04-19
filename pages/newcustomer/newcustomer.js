import eventListener from "../../eventListener.js";

var app = getApp()

Page({
  data: {
    loading: false,
  },


  getUserInfo: function (e) {
    console.log(e)
    let userInfo = e.detail.userInfo;
    
    wx.setStorageSync('userInfo', userInfo);
    let user = {
      // id: wx.getStorageSync('user_id'),
      // open_id: wx.getStorageSync('open_id'),
      nickName: userInfo.nickName,
      gender: userInfo.gender, 
      language: userInfo.language,
      city: userInfo.city,
      province: userInfo.province,
      country: userInfo.country,
      avatarUrl: userInfo.avatarUrl,
    };

    eventListener("newCustomer", this.route)
    console.log(user);

    let userExists = wx.getStorageSync('hasRegistered')

    if(userExists) {
      wx.reLaunch({
        url: '/pages/shops/shops',
      })
    } else {
      console.log("Updating user info")
      wx.request({
        url: `https://haoshihui.wogengapp.cn/api/v1/users/${wx.getStorageSync('user_id')}`,
        method: 'PUT',
        header: {
          'X-Customer-Token': wx.getStorageSync('token'),
          'X-Customer-Email': wx.getStorageSync('email')
        },
        data: { user: user },
        success: res => {
          console.log(res)
          wx.setStorageSync('hasRegistered', true)
          wx.reLaunch({
            url: '/pages/shops/shops',
          })
        },
      })
    }


   
  },
   
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo
    // })
  


  onLoad: function () {
    console.log(this.route)
    eventListener("newCustomer onLoad", this.route)

  }
  
})

