import angular from 'angular';
import _ from 'lodash';
import 'angular-ui-router';

import {fakeApiService} from './app/fakeApiService';
import {orderInfoService} from './app/orderInfoService';
import {landing} from './app/landing/landing';
import {mainNavigation} from './app/mainNavigation/mainNavigation';
import {orderList} from './app/orderList/orderList';
import {plainList} from './app/plainList/plainList';
import {orderDetail} from './app/orderDetail/orderDetail';
import {productPopUp} from './app/productPopUp/productPopUp';
import routesConfig from './routes';

import './index.scss';

export const app = 'orderingApp';

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .service('fakeApiService', ['$q', fakeApiService])
  .service('orderInfoService', ['$q', 'fakeApiService', orderInfoService])
  .component('landing', landing)
  .component('mainNavigation', mainNavigation)
  .component('plainList', plainList)
  .component('orderList', orderList)
  .component('orderDetail', orderDetail)
  .component('productPopUp', productPopUp);
