import eventListener from "../../eventListener.js";

var app = getApp()

Page({
  data: {
    loading: false,
  },


  getUserInfo: function (e) {
    console.log(e)
    const userInfo = e.detail.userInfo;
    wx.setStorageSync('userInfo', userInfo);
    let user = {
      userId: wx.getStorageSync('userId'),
      openId: wx.getStorageSync('openId'),
      nickName: userInfo.nickName,
      gender: userInfo.gender, 
      language: userInfo.language,
      city: userInfo.city,
      province: userInfo.province,
      country: userInfo.country,
      avatarUrl: userInfo.avatarUrl,
    };

    eventListener("newCustomer", this.route, user => JSON.stringify(user))
    console.log(user);






    wx.request({
      url: `http://localhost:3000/api/v1/users/${wx.getStorageSync('userId')}`,
      method: 'PUT',
      header: {
        'X-Customer-Token': wx.getStorageSync('token'),
        'X-Customer-Email': wx.getStorageSync('email')
      },
      data: { user: user },
      success: res => {
        console.log(res)

        wx.reLaunch({
          url: '/pages/shops/shops',
        })
      },
    })
  },
   
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo
    // })
  


  onLoad: function () {
    console.log(this.route)
    eventListener("newCustomer onLoad", this.route)

  }

  // bindSubmit: function (f) {
  //   wx.setStorageSync('email', f.detail.value.email)
  //   wx.setStorageSync('address', f.detail.value.address)
  //   console.log(f.detail.value.address)
  //   let customer = {
  //     email: f.detail.value.email,
  //     password: f.detail.value.password,
  //     address: f.detail.value.address
  //   }

  //   let page = this;

  //   wx.request({
  //     url: `https://haoshihui.wogengapp.cn/api/v1/customers`,
  //     method: 'POST',
  //     data: { customer: customer },
  //     success: res => {
  //       console.log(res)
  //       wx.setStorageSync('token', res.data.auth_token),
  //         console.log(wx.getStorageSync('token')),
  //       wx.setStorageSync('customer_id', res.data.customer_id),
  //       wx.reLaunch({
  //         url: '/pages/shops/shops',
  //       })

  //     },
  //   })
  // },
})

