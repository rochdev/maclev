(function(module) {
  'use strict';

  module.directive('listPicker', listPickerDirective);

  /**
   * @ngdoc directive
   * @name listPicker
   * @restrict E
   * @module maclev
   *
   * @description
   * The `autocomplete` directive.
   */
  function listPickerDirective($http) {
    return {
      restrict: 'E',
      scope: {
        source: '@',
        destination: '=',
        placeholder: '@',
        minLength: '@'
      },
      templateUrl: 'app/components/list-picker.html',
      link: function postLink(scope) {
        scope.add = add;
        scope.remove = remove;
        scope.query = query;

        function add(name) {
          if (name && scope.destination.indexOf(name) === -1) {
            scope.destination.push(name);
          }
        }

        function remove(name) {
          var index = scope.destination.indexOf(name);

          if (index !== -1) {
            scope.destination.splice(index, 1);
          }
        }

        function query(searchText) {
          return $http.get(scope.source, {
            params: {
              query: searchText
            }
          }).then(function(response) {
            return response.data;
          });
        }
      }
    };
  }
})(angular.module('maclev'));
