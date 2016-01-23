(function(module) {
  'use strict';

  module.directive('addonCard', addonCardDirective);

  /**
   * @ngdoc directive
   * @name addonCard
   * @restrict E
   * @module maclev
   *
   * @description
   * The `addonCard` directive.
   */
  function addonCardDirective() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@'
      },
      templateUrl: 'app/components/addon-card.html'
    };
  }
})(angular.module('maclev'));
