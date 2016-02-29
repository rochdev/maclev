(function(module) {
  'use strict';

  module.provider('preset', PresetProvider);

  /**
   * @ngdoc provider
   * @name presetProvider
   * @kind object
   * @module maclev
   *
   * @description
   * The {@link preset} service provider.
   */
  function PresetProvider() {
    var self = this;
    var presets = {};

    // Public methods
    self.$get = $get;
    self.get = get;
    self.add = add;
    self.remove = remove;

    function $get() {
      /**
       * @ngdoc service
       * @name preset
       * @kind object
       * @module maclev
       *
       * @description
       * The `preset` service.
       */
      return {
        get: get,
        add: add,
        remove: remove
      };
    }

    function get(name) {
      return {
        addons: (presets[name].addons || []).slice(0),
        brewFormulas: (presets[name].brewFormulas || []).slice(0),
        brewCasks: (presets[name].brewCasks || []).slice(0),
        nodeModules: (presets[name].nodeModules || []).slice(0),
        nodeVersions: (presets[name].nodeVersions || []).slice(0),
        nodeDefault: (presets[name].nodeDefault || []).slice(0),
        rubyGems: (presets[name].rubyGems || []).slice(0),
        rubyVersions: (presets[name].rubyVersions || []).slice(0),
        rubyDefault: (presets[name].rubyDefault || []).slice(0)
      };
    }

    function add(name, preset) {
      presets[name] = preset;
    }

    function remove(name) {
      delete presets[name];
    }
  }
})(angular.module('maclev'));
