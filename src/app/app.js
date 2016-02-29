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
    .config(function($locationProvider, $mdThemingProvider) {
      $locationProvider.html5Mode(true);

      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('blue');
    })
    .controller('AppController', function($scope, $location, preset) {
      var vm = this;

      vm.loadUrl = loadUrl;
      vm.loadPreset = loadPreset;
      vm.createLink = createLink;
      vm.hasAddon = hasAddon;
      vm.toggle = toggle;

      vm.loadUrl();

      $scope.$watch(function() {
        $location.search('addons', vm.addons.join(',') || null);
        $location.search('brew-formulas', vm.brewFormulas.join(',') || null);
        $location.search('brew-casks', vm.brewCasks.join(',') || null);
        $location.search('node-versions', vm.nodeVersions.join(',') || null);
        $location.search('node-modules', vm.nodeModules.join(',') || null);
        $location.search('node-default', vm.nodeDefault || null);
        $location.search('ruby-versions', vm.rubyVersions.join(',') || null);
        $location.search('ruby-default', vm.rubyDefault || null);
        $location.search('ruby-gems', vm.rubyGems.join(',') || null);
      });

      watchVersions('node');
      watchVersions('ruby');

      function loadUrl() {
        var search = $location.search();

        vm.addons = search['addons'] ? search['addons'].split(',') : [];
        vm.brewFormulas = search['brew-formulas'] ? search['brew-formulas'].split(',') : [];
        vm.brewCasks = search['brew-casks'] ? search['brew-casks'].split(',') : [];
        vm.nodeVersions = search['node-versions'] ? search['node-versions'].split(',') : [];
        vm.nodeModules = search['node-modules'] ? search['node-modules'].split(',') : [];
        vm.nodeDefault = search['node-default'] ? search['node-default'] : null;
        vm.rubyVersions = search['ruby-versions'] ? search['ruby-versions'].split(',') : [];
        vm.rubyGems = search['ruby-gems'] ? search['ruby-gems'].split(',') : [];
        vm.rubyDefault = search['ruby-default'] ? search['ruby-default'] : null;
      }

      function loadPreset(name) {
        var current = preset.get(name);

        vm.addons = current.addons;
        vm.brewFormulas = current.brewFormulas;
        vm.brewCasks = current.brewCasks;
        vm.nodeVersions = current.nodeVersions;
        vm.nodeDefault = current.nodeDefault;
        vm.nodeModules = current.nodeModules;
        vm.rubyVersions = current.rubyVersions;
        vm.rubyDefault = current.rubyDefault;
        vm.rubyGems = current.rubyGems;
      }

      function createLink() {
        var parts = [];

        if (vm.addons.length) {
          parts.push('addons=' + vm.addons.join(','));
        }

        if (vm.brewFormulas.length) {
          parts.push('brew-formulas=' + vm.brewFormulas.join(','));
        }

        if (vm.brewCasks.length) {
          parts.push('brew-casks=' + vm.brewCasks.join(','));
        }

        if (vm.hasAddon('node')) {
          if (vm.nodeVersions.length) {
            parts.push('node-versions=' + vm.nodeVersions.join(','));
            parts.push('node-default=' + vm.nodeDefault);
          }

          if (vm.nodeModules.length) {
            parts.push('node-modules=' + vm.nodeModules.join(','));
          }
        }

        if (vm.hasAddon('ruby')) {
          if (vm.rubyVersions.length) {
            parts.push('ruby-versions=' + vm.rubyVersions.join(','));
            parts.push('ruby-default=' + vm.rubyDefault);
          }

          if (vm.rubyGems.length) {
            parts.push('ruby-gems=' + vm.rubyGems.join(','));
          }
        }

        return parts.join('&');
      }

      function hasAddon(name) {
        return vm.addons.indexOf(name) !== -1;
      }

      function toggle(collection, item) {
        var index = collection.indexOf(item);

        if (index !== -1) {
          collection.splice(index, 1);
        } else {
          collection.push(item);
        }
      }

      function watchVersions(language) {
        $scope.$watchCollection('vm.' + language + 'Versions', function(versions) {
          if (versions.length === 0) {
            vm[language + 'Default'] = null;
          } else if (!vm[language + 'Default'] || versions.indexOf(vm[language + 'Default']) === -1) {
            vm[language + 'Default'] = versions[0];
          }
        });
      }
    });
})();
