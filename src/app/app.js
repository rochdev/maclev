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
    .controller('AppController', function($scope, $location) {
      var vm = this;

      vm.loadUrl = loadUrl;
      vm.loadPreset = loadPreset;
      vm.createLink = createLink;

      vm.loadUrl();

      $scope.$watch('vm.addons.docker', function(docker) {
        vm.addons.virtualbox = docker;
      });

      $scope.$watch(function() {
        var addons = Object.keys(vm.addons).filter(function(addon) {
          return vm.addons[addon];
        });

        $location.search('addons', addons.join(',') || null);
        $location.search('brew-formulas', vm.formulas.join(',') || null);
        $location.search('brew-casks', vm.casks.join(',') || null);
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

        vm.addons = {};

        if (search.addons) {
          search.addons.split(',').forEach(function(addon) {
            vm.addons[addon] = true;
          });
        }

        vm.formulas = search['brew-formulas'] ? search['brew-formulas'].split(',') : [];
        vm.casks = search['brew-casks'] ? search['brew-casks'].split(',') : [];
        vm.nodeVersions = search['node-versions'] ? search['node-versions'].split(',') : [];
        vm.nodeModules = search['node-modules'] ? search['node-modules'].split(',') : [];
        vm.nodeDefault = search['node-default'] ? search['node-default'] : null;
        vm.rubyVersions = search['ruby-versions'] ? search['ruby-versions'].split(',') : [];
        vm.rubyGems = search['ruby-gems'] ? search['ruby-gems'].split(',') : [];
        vm.rubyDefault = search['ruby-default'] ? search['ruby-default'] : null;
      }

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
          vm.casks = [];

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

          vm.rubyVersions = ['2.3.0', '1.9.3-p551'];
          vm.rubyDefault = '2.3.0';
          vm.rubyGems = [
            'bundler'
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
          parts.push('brew-formulas=' + vm.formulas.join(','));
        }

        if (vm.casks.length) {
          parts.push('brew-casks=' + vm.casks.join(','));
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

          if (vm.rubyGems.length) {
            parts.push('ruby-gems=' + vm.rubyGems.join(','));
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
