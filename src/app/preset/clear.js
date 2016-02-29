(function(module) {
  'use strict';

  module.config(function(presetProvider) {
    presetProvider.add('clear', {
      addons: [],

      brewFormulas: [],

      brewCasks: [],

      nodeVersions: [],

      nodeDefault: null,

      nodeModules: [],

      rubyVersions: [],

      rubyDefault: null,

      rubyGems: []
    });
  });
})(angular.module('maclev'));
