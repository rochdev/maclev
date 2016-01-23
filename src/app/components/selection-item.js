(function(module) {
  'use strict';

  module.directive('selectionItem', selectionItemDirective);

  /**
   * @ngdoc directive
   * @name selectionItem
   * @restrict E
   * @module maclev
   *
   * @description
   * The `selectionItem` directive.
   */
  function selectionItemDirective() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        item: '@',
        onRemove: '&'
      },
      templateUrl: 'app/components/selection-item.html'
    };
  }
})(angular.module('maclev'));
