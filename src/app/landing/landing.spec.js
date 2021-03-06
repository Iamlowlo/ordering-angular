import angular from 'angular';
import 'angular-mocks';
import {landing} from './landing';

describe('landing component', () => {
  beforeEach(() => {
    angular
      .module('fountainHello', ['app/landing/landing.html'])
      .component('fountainHello', landing);
    angular.mock.module('fountainHello');
  });
  it('should render hello world', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<fountain-hello>Loading...</fountain-hello>')($rootScope);
    $rootScope.$digest();
    const h1 = element.find('h1');
    expect(h1.html()).toEqual('Hello World!');
  }));
});
