define(["require", "exports", "vs/editor/editor.api"], function(require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _monaco = typeof monaco === "undefined" ? self.monaco : monaco;
  var languageDefinitions = {};
  var lazyLanguageLoaders = {};
  var LazyLanguageLoader = function() {
    function LazyLanguageLoader2(languageId) {
      var _this = this;
      this._languageId = languageId;
      this._loadingTriggered = false;
      this._lazyLoadPromise = new Promise(function(resolve, reject) {
        _this._lazyLoadPromiseResolve = resolve;
        _this._lazyLoadPromiseReject = reject;
      });
    }
    LazyLanguageLoader2.getOrCreate = function(languageId) {
      if (!lazyLanguageLoaders[languageId]) {
        lazyLanguageLoaders[languageId] = new LazyLanguageLoader2(languageId);
      }
      return lazyLanguageLoaders[languageId];
    };
    LazyLanguageLoader2.prototype.whenLoaded = function() {
      return this._lazyLoadPromise;
    };
    LazyLanguageLoader2.prototype.load = function() {
      var _this = this;
      if (!this._loadingTriggered) {
        this._loadingTriggered = true;
        languageDefinitions[this._languageId].loader().then(function(mod) {
          return _this._lazyLoadPromiseResolve(mod);
        }, function(err) {
          return _this._lazyLoadPromiseReject(err);
        });
      }
      return this._lazyLoadPromise;
    };
    return LazyLanguageLoader2;
  }();
  function loadLanguage(languageId) {
    return LazyLanguageLoader.getOrCreate(languageId).load();
  }
  exports.loadLanguage = loadLanguage;
  function registerLanguage(def) {
    var languageId = def.id;
    languageDefinitions[languageId] = def;
    _monaco.languages.register(def);
    var lazyLanguageLoader = LazyLanguageLoader.getOrCreate(languageId);
    _monaco.languages.setMonarchTokensProvider(languageId, lazyLanguageLoader.whenLoaded().then(function(mod) {
      return mod.language;
    }));
    _monaco.languages.onLanguage(languageId, function() {
      lazyLanguageLoader.load().then(function(mod) {
        _monaco.languages.setLanguageConfiguration(languageId, mod.conf);
      });
    });
  }
  exports.registerLanguage = registerLanguage;
});
