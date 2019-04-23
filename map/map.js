import eventListener from "../eventListener.js";
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gotLocation: app.globalData.gotLocation,
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onReady: function (e) {
    
  },


  listenerBtnGetLocation: function (e) {
    console.log(e)
    const page = this;
    wx.authorize({
      scope: 'scope.userLocation',
      success() {
        wx.getLocation({
          success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            var speed = res.speed
            var accuracy = res.accuracy
            console.log(res)


            page.setData({
              latitude: res.latitude,
              longitude: res.longitude
            })
          }
        })

      }
    })

  },

  bindLocation: function () {
    this.setData({
      gotLocation: app.globalData.gotLocation
    });
  },

  onLoad: function (options) {
    eventListener("map onLoad", this.route)
    const page = this;
    // Display toast when loading


    wx.showToast({
      title: 'Updating',
      icon: 'success',
      duration: 3000
    });




    wx.request({
      url: "https://haoshihui.wogengapp.cn/api/v1/shops",
      method: "GET",
      header: {
        'X-Customer-Token': wx.getStorageSync('token'),
        'X-Customer-Email': wx.getStorageSync('email'),
      },
      success(res) {
        console.log(res)
        const shops = res.data.shops;
        let markers = [];

        shops.forEach(function (shop) {
          markers.push({
            latitude: shop.latitude,
            longitude: shop.longitude,
            id: shop.id,
            iconPath: "/images/pin.png",
            width: 20,
            height: 30,
            name: shop.name,

          })
        }),
          page.setData({
            shops: shops,
            markers: markers
          });
        console.log(markers)
      }
    }),

      // Update local data

      wx.hideToast();
  }
});

// Update local data
//this.setData(app.globalData)
