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
      vm.formulas = [];
      vm.nodeVersions = [];
      vm.nodeModules = [];
      vm.rubyVersions = [];

      vm.loadPreset = loadPreset;
      vm.createLink = createLink;

      $scope.$watch('vm.addons.docker', function(docker) {
        vm.addons.virtualbox = docker;
      });

      watchVersions('node');
      watchVersions('ruby');

      function loadPreset(name) {
        if (name === 'rochdev') {
          vm.addons = {
            discord: true,
            gitter: true,
            slack: true,
            chrome: true,
            docker: true,
            github: true,
            vagrant: true,
            atom: true,
            node: true,
            ruby: true
          };

          vm.formulas = [
            'bash-git-prompt',
            'hub',
            'mongodb',
            'postgresql',
            'gemnasium-toolbelt',
            'heroku-toolbelt',
            'cf-cli'
          ];

          vm.nodeVersions = ['v5', 'v4', 'v0.12', 'v0.10'];
          vm.nodeDefault = 'v4';
          vm.nodeModules = [
            'babel-cli',
            'bower',
            'cordova',
            'cucumber',
            'forever',
            'grunt-cli',
            'gulp',
            'karma',
            'mocha',
            'mversion',
            'protractor',
            'selenium-standalone',
            'tinto',
            'yo'
          ];
        }
      }

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

        if (vm.addons.ruby) {
          if (vm.rubyVersions.length) {
            parts.push('ruby-versions=' + vm.rubyVersions.join(','));
            parts.push('ruby-default=' + vm.rubyDefault);
          }
        }

        return parts.join('&');
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
