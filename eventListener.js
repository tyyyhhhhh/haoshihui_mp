export default function eventListener(eventName, page, shop, item) {
  let url ="http://localhost:4000/api/v1/events"
  let thisPage = page
  console.log(thisPage)
  var date = new Date();
  var timestamp = Math.floor(date.getTime() / 1000);



  let event = {
    timestamp,
    description: eventName,
    page: thisPage,
    shop_id: shop,
    item_id :item
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

