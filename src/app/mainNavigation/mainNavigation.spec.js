import angular from 'angular';
import 'angular-mocks';
import {mainNavigation} from './mainNavigation';

describe('mainNavigation component', () => {
  beforeEach(() => {
    angular
      .module('mainNavigation', ['app/mainNavigation/mainNavigation.html'])
      .component('mainNavigation', mainNavigation);
    angular.mock.module('mainNavigation');
  });
  it('should have clickable links', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<main-navigation></main-navigation>')($rootScope);
    $rootScope.$digest();
    const mainNavigationLinks = element.find('#main_navigation li a');
    console.log(mainNavigationLinks);
    expect(main_navigation.html()).toEqual('Hello World!');
  }));
});
