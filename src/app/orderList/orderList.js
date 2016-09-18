export const orderList = {
  template: require('./orderList.html'),
  controller($q, fakeApiService, orderInfoService) {
    const ctrl = this;

    this.$onInit = function () {
      orderInfoService.getAllOrdersInfo().then(function (orders) {
        ctrl.orderList = orders;
      });
    };
  }
};
