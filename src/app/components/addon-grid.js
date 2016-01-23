(function(module) {
  'use strict';

  module.directive('addonGrid', addonGridDirective);

  /**
   * @ngdoc directive
   * @name addonGrid
   * @restrict E
   * @module maclev
   *
   * @description
   * The `addonGrid` directive.
   */
  function addonGridDirective() {
    return {
      restrict: 'E',
      transclude: true,
      link: function postLink(scope, element, attrs, controller, transclude) {
        scope.$watch(function() {
          var packery = new Packery(element[0]);
        });

        transclude(function(clone) {
          element.append(clone);
        });
      }
    };
  }
})(angular.module('maclev'));
