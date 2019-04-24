export default function eventListener(eventName, page,  shop, item) {
  let url ="https://haoshihui.wogengapp.cn/api/v1/events/"
  let thisPage = page
  console.log(thisPage)
  var date = new Date();
  var timestamp = Math.floor(date.getTime() / 1000);


  let event = {
    timestamp,
    description: eventName,
    page: thisPage,
    shop_id: shop,
    item_id: item,
    user_open_id: wx.getStorageSync("open_id")
      }

  console.log(event)

  wx.request({
    url: url,
    method: 'POST',
    header: {
      'X-Content-Type': "application/json"
    },
    data: event
  })
};

