(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name maclev
   * @module maclev
   *
   * @description
   * The `maclev` module.
   */
  angular
    .module('maclev', ['ngMaterial'])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('blue');
    })
    .controller('AppController', function($scope) {
      var vm = this;

      vm.addons = {};
      vm.formulas = ['bash-git-prompt', 'hub'];
      vm.nodeVersions = [];
      vm.nodeModules = [];

      Object.defineProperties(vm.addons, {
        virtualbox: {
          get: function() {
            return this.docker;
          }
        }
      });

      vm.createLink = createLink;

      $scope.$watchCollection('vm.nodeVersions', function(nodeVersions) {
        if (nodeVersions.length === 0) {
          vm.nodeDefault = null;
        } else if (!vm.nodeDefault || nodeVersions.indexOf(vm.nodeDefault) === -1) {
          vm.nodeDefault = nodeVersions[0];
        }
      });

      function createLink() {
        var parts = [];
        var addons = Object.keys(vm.addons).filter(function(addon) {
          return vm.addons[addon];
        });

        if (addons.length) {
          parts.push('addons=' + addons.join(','));
        }

        if (vm.formulas.length) {
          parts.push('formulas=' + vm.formulas.join(','));
        }

        if (vm.addons.node) {
          if (vm.nodeVersions.length) {
            parts.push('node-versions=' + vm.nodeVersions.join(','));
            parts.push('node-default=' + vm.nodeDefault);
          }

          if (vm.nodeModules.length) {
            parts.push('node-modules=' + vm.nodeModules.join(','));
          }
        }

        return parts.join('&');
      }
    });
})();
