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
    console.log(f.detail.value)
    wx.setStorageSync('name', f.detail.value.name)
    wx.setStorageSync('address', f.detail.value.address)
    wx.setStorageSync('image', f.detail.value.image)
    wx.setStorageSync('description', f.detail.value.description)
    wx.setStorageSync('opening_hours', f.detail.value.opening_hours)
    wx.setStorageSync('phone_number', f.detail.value.phone_number)

    let shop = {
      name: f.detail.value.name,
      address: f.detail.value.address,
      image: f.detail.value.image,
      description: f.detail.value.description,
      opening_hours: f.detail.value.opening_hours,
      phone_number: f.detail.value.phone_number,
    }

    console.log(shop)

    let page = this;

    wx.request({
      url: `https://haoshihui.wogengapp.cn/api/v1/shops`,
      method: 'POST',
      header: {
        'X-Customer-Token': wx.getStorageSync('token'),
        'X-Customer-Email': wx.getStorageSync('email')
      },
      data: { shop: shop },
      success: res => {
        console.log(res)
     
          wx.reLaunch({
            url: '/pages/shops/shops',
          })
      },
    }),

    wx.showToast({
      title: 'Sending...',
      icon: 'loading',
      duration: 1500
    });

    wx.switchTab({
      url: '/pages/shops/shops'
    });


      
  }
})



