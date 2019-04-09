// pages/landing/landing.js
const app = getApp()

Page({

  customerSignUp(e) {

    wx.navigateTo({
      url: '/pages/newcustomer/newcustomer'
    });
  },

  customerSignIn(e) {

    wx.navigateTo({
      url: '/pages/customersignin/customersignin'
    });
  },

  listenerBtnGetLocation: function () {
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res)
        app.globalData.lat = latitude
        app.globalData.lng = longitude
      }
    })
    app.globalData.gotLocation = true;
    this.bindLocation();
  },

  bindLocation: function () {
    this.setData({
      gotLocation: app.globalData.gotLocation
    });
  }

})