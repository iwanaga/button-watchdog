import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  buttonHistory = [];

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/buttons')
      .then(response => {
        this.buttonHistory = response.data;
        this.buttonCounts = _.countBy(response.data, 'color');
      });
  }
}

export default angular.module('buttonWatchDogApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
