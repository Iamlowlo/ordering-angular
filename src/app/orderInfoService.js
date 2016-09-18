export const orderInfoService = function ($q, fakeApiService) {
  const serv = this;

  this.getAllOrdersInfo = function () {
    return fakeApiService.getOrders().then(function (orders) {
      _.each(orders, function (order) {
        serv.fulfillOrderInfo(order);
      });
      return orders;
    });
  };

  this.getOrderInfoById = function (orderId) {
    return fakeApiService.getOrderById(orderId).then(function (order) {
      return serv.fulfillOrderInfo(order).then(function (fulfilledOrder) {
        return fulfilledOrder;
      });
    });
  };

  this.fulfillOrderInfo = function (order) {
    const promises = _.map(order.items, function (item) {
      return fakeApiService.getProductById(item['product-id']);
    });

    promises.unshift(fakeApiService.getCustomerById(order['customer-id']));

    return $q.all(promises).then(function (resps) {
      const customerResp = resps.shift();
      order['customer-name'] = customerResp.name;
      order.total = parseFloat(order.total).toFixed(2);
      _.each(resps, function (item, index) {
        order.items[index].name = item.description;
        order.items[index]['unit-price'] = parseFloat(order.items[index]['unit-price']).toFixed(2);
        order.items[index].total = parseFloat(order.items[index].total).toFixed(2);
      });
      return order;
    });
  };
};
