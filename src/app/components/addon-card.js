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
      template: [
        '<md-card>',
          '<md-card-title>',
            '<md-card-title-text>',
              '<span class="md-headline">{{ title }}</span>',
            '</md-card-title-text>',
          '</md-card-title>',

          '<md-card-content>',
            '<ng-transclude></ng-transclude>',
          '</md-card-content>',
        '</md-card>'
      ].join('')
    };
  }
})(angular.module('maclev'));
