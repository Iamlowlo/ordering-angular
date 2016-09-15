import angular from 'angular';
import _ from 'lodash';

import {fakeApiService} from './app/fakeApiService';
import {landing} from './app/landing/landing';
import {mainNavigation} from './app/mainNavigation/mainNavigation';
import {orderList} from './app/orderList/orderList';
import {plainList} from './app/plainList/plainList';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

export const app = 'orderingApp';

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .service('fakeApiService', ['$q', fakeApiService] )
  .component('landing', landing)
  .component('mainNavigation', mainNavigation)
  .component('plainList', plainList)
  .component('orderList', orderList);
