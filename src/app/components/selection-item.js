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
      template: [
        '<div layout layout-align="center">',
          '<ng-transclude flex class="selection-name"></ng-transclude>',
          '<md-button class="md-icon-button remove-selection" ng-click="onRemove()" aria-label="Remove">',
            '<md-icon md-svg-icon="md-close"></md-icon>',
          '</md-button>',
        '</div>'
      ].join('')
    };
  }
})(angular.module('maclev'));
