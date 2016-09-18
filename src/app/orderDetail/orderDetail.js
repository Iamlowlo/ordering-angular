export const orderDetail = {
  template: require('./orderDetail.html'),
  controller($stateParams, $log, $document, fakeApiService, orderInfoService) {
    const ctrl = this;
    ctrl.productPopUpState = {opened: false};

    this.$onInit = function () {
      orderInfoService.getOrderInfoById($stateParams.orderId).then(function (order) {
        ctrl.order = order;
      });
    };

    this.addProductToOrder = function ($event) {
      const target = $event.target,
        view = $document.find('ui-view')[0];
      ctrl.popUpCoords = {
        left: target.offsetLeft,
        top: target.offsetTop,
        height: target.offsetHeight,
        width: target.offsetWidth,
        viewHeight: view.offsetHeight,
        viewWidth: view.offsetWidth
      };
      ctrl.productPopUpState = {opened: true};
    };

    this.addProductUnit = function (productId) {
      const pos = _.findIndex(ctrl.order.items, {'product-id': productId});
      ctrl.order.items[pos].quantity++;
      ctrl.order.items[pos].total = (parseFloat(ctrl.order.items[pos].total) + parseFloat(ctrl.order.items[pos]['unit-price'])).toFixed(2);
      ctrl.order.total = (parseFloat(ctrl.order.total) + parseFloat(ctrl.order.items[pos]['unit-price'])).toFixed(2);
    };

    this.subtractProductUnit = function (productId) {
      const pos = _.findIndex(ctrl.order.items, {'product-id': productId});
      ctrl.order.items[pos].quantity--;
      if (ctrl.order.items[pos].quantity) {
        ctrl.order.items[pos].total = (parseFloat(ctrl.order.items[pos].total) - parseFloat(ctrl.order.items[pos]['unit-price'])).toFixed(2);
        ctrl.order.total = (parseFloat(ctrl.order.total) - parseFloat(ctrl.order.items[pos]['unit-price'])).toFixed(2);
      } else {
        ctrl.removeProductFromOrder(productId);
      }
    };

    this.removeProductFromOrder = function (productId) {
      const pos = _.findIndex(ctrl.order.items, {'product-id': productId}),
        qty = (ctrl.order.items[pos].quantity) ? ctrl.order.items[pos].quantity : 1;
      ctrl.order.total = (parseFloat(ctrl.order.total) - (qty * parseFloat(ctrl.order.items[pos]['unit-price']))).toFixed(2);
      ctrl.order.items.splice(pos, 1);
    };

    this.orderTotalCalculate = function () {
      ctrl.order.total = _.reduce(ctrl.order.items, function (total, item) {
        return total + parseFloat(item.total);
      }, 0).toFixed(2);
    };

    this.placeOrder = function () {
      fakeApiService.setOrder(ctrl.order).then(function (response) {
        $log.info(response);
      });
    };
  },
  bindings: {
    orderId: '<'
  }
};
