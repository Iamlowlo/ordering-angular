export const productPopUp = {
  template: require('./productPopUp.html'),
  controller(fakeApiService, $document) {
    const ctrl = this;

    this.$onChanges = function (changes) {
      if ((changes.popUpState && changes.popUpState.currentValue.opened) || changes.orderProductsQty) {
        ctrl.getAvailableProducts();
      }
      if (changes.popUpCoords && changes.popUpCoords.currentValue) {
        const coords = changes.popUpCoords.currentValue;
        ctrl.position = {
          x: (coords.width / 2) + coords.left,
          y: coords.height + coords.top
        };
      }
    };

    this.closePopUp = function () {
      ctrl.popUpState = {opened: false};
    };

    this.addProduct = function (newProductId) {
      const newProduct = _.find(ctrl.availableProducts, {id: newProductId});

      ctrl.orderProducts.push({
        "name": newProduct.description,
        "product-id": newProductId,
        "quantity": 1,
        "total": newProduct.price,
        "unit-price": newProduct.price
      });
      ctrl.availableProducts.splice(_.indexOf(ctrl.availableProducts, newProduct), 1);
      ctrl.onOrderTotal()();
    };

    this.getAvailableProducts = function () {
      fakeApiService.getProducts().then(function (products) {
        _.each(ctrl.orderProducts, function (product) {
          const pos = _.findIndex(products, {id: product['product-id']});
          if (pos >= 0) {
            products.splice(pos, 1);
          }
        });
        ctrl.availableProducts = products;
      });
    };
  },
  bindings: {
    popUpCoords: '<',
    orderProducts: '<',
    orderProductsQty: '<',
    onOrderTotal: '&',
    popUpState: '<'
  }
};
