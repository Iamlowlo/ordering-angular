export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('productList', {
      url: '/productList',
      resolve: {
        elements: function(fakeApiService){
          return fakeApiService.getProducts();
        }
      },
      component: 'plainList',
      data: {
        mainNav: true,
        label: 'Product list',
        order: 2
      }
    })
    .state('orderApp', {
      url: '/',
      component: 'landing',
      data: {
        mainNav: true,
        label: 'Index',
        order: 0
      }
    })
    .state('orderList', {
      url: '/orderList',
      component: 'orderList',
      data: {
        mainNav: true,
        label: 'Order list',
        order: 1
      }
    })
    .state('customerList', {
      url: '/customerList',
      resolve: {
        elements: function(fakeApiService){
          return fakeApiService.getCustomers();
        }
      },
      component: 'plainList',
      data: {
        mainNav: true,
        label: 'Customer list',
        order: 3
      }
    })
    .state('orderDetail', {
      url: '/orderDetail/:orderId',
      component: 'orderDetail',
      data: {
        label: 'Customer list',
        order: 3
      }
    });
}
