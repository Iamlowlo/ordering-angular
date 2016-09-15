export const orderList = {
  template: require('./orderList.html'),
  controller: function ($q, fakeApiService) {
    const ctrl = this;

    fakeApiService.getOrders().then(function(orders){
      ctrl.orderList = orders;
      _.map(ctrl.orderList, function(order){
        fakeApiService.getCustomerById(order['customer-id']).then(function(customer){
          order['customer-name'] = customer.name;
          
          let promises = _.map(order.items, function(item){
            return fakeApiService.getProductById(item['product-id']);
          });
          $q.all(promises).then(function(items){
            _.each(items, function(item, index){
              order.items[index].name = item.description;
            });
          });
          return order;
        });
      });
    });
  }
};
