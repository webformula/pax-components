"use strict";
var _amdLoaderGlobal = this;
var _commonjsGlobal = typeof global === "object" ? global : {};
var AMDLoader;
(function(AMDLoader2) {
  AMDLoader2.global = _amdLoaderGlobal;
  var Environment = function() {
    function Environment2() {
      this._detected = false;
      this._isWindows = false;
      this._isNode = false;
      this._isElectronRenderer = false;
      this._isWebWorker = false;
    }
    Object.defineProperty(Environment2.prototype, "isWindows", {
      get: function() {
        this._detect();
        return this._isWindows;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Environment2.prototype, "isNode", {
      get: function() {
        this._detect();
        return this._isNode;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Environment2.prototype, "isElectronRenderer", {
      get: function() {
        this._detect();
        return this._isElectronRenderer;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Environment2.prototype, "isWebWorker", {
      get: function() {
        this._detect();
        return this._isWebWorker;
      },
      enumerable: true,
      configurable: true
    });
    Environment2.prototype._detect = function() {
      if (this._detected) {
        return;
      }
      this._detected = true;
      this._isWindows = Environment2._isWindows();
      this._isNode = typeof module !== "undefined" && !!module.exports;
      this._isElectronRenderer = typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.electron !== "undefined" && process.type === "renderer";
      this._isWebWorker = typeof AMDLoader2.global.importScripts === "function";
    };
    Environment2._isWindows = function() {
      if (typeof navigator !== "undefined") {
        if (navigator.userAgent && navigator.userAgent.indexOf("Windows") >= 0) {
          return true;
        }
      }
      if (typeof process !== "undefined") {
        return process.platform === "win32";
      }
      return false;
    };
    return Environment2;
  }();
  AMDLoader2.Environment = Environment;
})(AMDLoader || (AMDLoader = {}));
var AMDLoader;
(function(AMDLoader2) {
  var LoaderEvent = function() {
    function LoaderEvent2(type, detail, timestamp) {
      this.type = type;
      this.detail = detail;
      this.timestamp = timestamp;
    }
    return LoaderEvent2;
  }();
  AMDLoader2.LoaderEvent = LoaderEvent;
  var LoaderEventRecorder = function() {
    function LoaderEventRecorder2(loaderAvailableTimestamp) {
      this._events = [new LoaderEvent(1, "", loaderAvailableTimestamp)];
    }
    LoaderEventRecorder2.prototype.record = function(type, detail) {
      this._events.push(new LoaderEvent(type, detail, AMDLoader2.Utilities.getHighPerformanceTimestamp()));
    };
    LoaderEventRecorder2.prototype.getEvents = function() {
      return this._events;
    };
    return LoaderEventRecorder2;
  }();
  AMDLoader2.LoaderEventRecorder = LoaderEventRecorder;
  var NullLoaderEventRecorder = function() {
    function NullLoaderEventRecorder2() {
    }
    NullLoaderEventRecorder2.prototype.record = function(type, detail) {
    };
    NullLoaderEventRecorder2.prototype.getEvents = function() {
      return [];
    };
    NullLoaderEventRecorder2.INSTANCE = new NullLoaderEventRecorder2();
    return NullLoaderEventRecorder2;
  }();
  AMDLoader2.NullLoaderEventRecorder = NullLoaderEventRecorder;
})(AMDLoader || (AMDLoader = {}));
var AMDLoader;
(function(AMDLoader2) {
  var Utilities = function() {
    function Utilities2() {
    }
    Utilities2.fileUriToFilePath = function(isWindows, uri) {
      uri = decodeURI(uri).replace(/%23/g, "#");
      if (isWindows) {
        if (/^file:\/\/\//.test(uri)) {
          return uri.substr(8);
        }
        if (/^file:\/\//.test(uri)) {
          return uri.substr(5);
        }
      } else {
        if (/^file:\/\//.test(uri)) {
          return uri.substr(7);
        }
      }
      return uri;
    };
    Utilities2.startsWith = function(haystack, needle) {
      return haystack.length >= needle.length && haystack.substr(0, needle.length) === needle;
    };
    Utilities2.endsWith = function(haystack, needle) {
      return haystack.length >= needle.length && haystack.substr(haystack.length - needle.length) === needle;
    };
    Utilities2.containsQueryString = function(url) {
      return /^[^\#]*\?/gi.test(url);
    };
    Utilities2.isAbsolutePath = function(url) {
      return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(url);
    };
    Utilities2.forEachProperty = function(obj, callback) {
      if (obj) {
        var key = void 0;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            callback(key, obj[key]);
          }
        }
      }
    };
    Utilities2.isEmpty = function(obj) {
      var isEmpty = true;
      Utilities2.forEachProperty(obj, function() {
        isEmpty = false;
      });
      return isEmpty;
    };
    Utilities2.recursiveClone = function(obj) {
      if (!obj || typeof obj !== "object") {
        return obj;
      }
      var result = Array.isArray(obj) ? [] : {};
      Utilities2.forEachProperty(obj, function(key, value) {
        if (value && typeof value === "object") {
          result[key] = Utilities2.recursiveClone(value);
        } else {
          result[key] = value;
        }
      });
      return result;
    };
    Utilities2.generateAnonymousModule = function() {
      return "===anonymous" + Utilities2.NEXT_ANONYMOUS_ID++ + "===";
    };
    Utilities2.isAnonymousModule = function(id) {
      return Utilities2.startsWith(id, "===anonymous");
    };
    Utilities2.getHighPerformanceTimestamp = function() {
      if (!this.PERFORMANCE_NOW_PROBED) {
        this.PERFORMANCE_NOW_PROBED = true;
        this.HAS_PERFORMANCE_NOW = AMDLoader2.global.performance && typeof AMDLoader2.global.performance.now === "function";
      }
      return this.HAS_PERFORMANCE_NOW ? AMDLoader2.global.performance.now() : Date.now();
    };
    Utilities2.NEXT_ANONYMOUS_ID = 1;
    Utilities2.PERFORMANCE_NOW_PROBED = false;
    Utilities2.HAS_PERFORMANCE_NOW = false;
    return Utilities2;
  }();
  AMDLoader2.Utilities = Utilities;
})(AMDLoader || (AMDLoader = {}));
var AMDLoader;
(function(AMDLoader2) {
  function ensureError(err) {
    if (err instanceof Error) {
      return err;
    }
    var result = new Error(err.message || String(err) || "Unknown Error");
    if (err.stack) {
      result.stack = err.stack;
    }
    return result;
  }
  AMDLoader2.ensureError = ensureError;
  ;
  var ConfigurationOptionsUtil = function() {
    function ConfigurationOptionsUtil2() {
    }
    ConfigurationOptionsUtil2.validateConfigurationOptions = function(options) {
      function defaultOnError(err2) {
        if (err2.phase === "loading") {
          console.error('Loading "' + err2.moduleId + '" failed');
          console.error(err2);
          console.error("Here are the modules that depend on it:");
          console.error(err2.neededBy);
          return;
        }
        if (err2.phase === "factory") {
          console.error('The factory method of "' + err2.moduleId + '" has thrown an exception');
          console.error(err2);
          return;
        }
      }
      options = options || {};
      if (typeof options.baseUrl !== "string") {
        options.baseUrl = "";
      }
      if (typeof options.isBuild !== "boolean") {
        options.isBuild = false;
      }
      if (typeof options.paths !== "object") {
        options.paths = {};
      }
      if (typeof options.config !== "object") {
        options.config = {};
      }
      if (typeof options.catchError === "undefined") {
        options.catchError = false;
      }
      if (typeof options.recordStats === "undefined") {
        options.recordStats = false;
      }
      if (typeof options.urlArgs !== "string") {
        options.urlArgs = "";
      }
      if (typeof options.onError !== "function") {
        options.onError = defaultOnError;
      }
      if (!Array.isArray(options.ignoreDuplicateModules)) {
        options.ignoreDuplicateModules = [];
      }
      if (options.baseUrl.length > 0) {
        if (!AMDLoader2.Utilities.endsWith(options.baseUrl, "/")) {
          options.baseUrl += "/";
        }
      }
      if (typeof options.cspNonce !== "string") {
        options.cspNonce = "";
      }
      if (!Array.isArray(options.nodeModules)) {
        options.nodeModules = [];
      }
      if (options.nodeCachedData && typeof options.nodeCachedData === "object") {
        if (typeof options.nodeCachedData.seed !== "string") {
          options.nodeCachedData.seed = "seed";
        }
        if (typeof options.nodeCachedData.writeDelay !== "number" || options.nodeCachedData.writeDelay < 0) {
          options.nodeCachedData.writeDelay = 1000 * 7;
        }
        if (!options.nodeCachedData.path || typeof options.nodeCachedData.path !== "string") {
          var err = ensureError(new Error("INVALID cached data configuration, 'path' MUST be set"));
          err.phase = "configuration";
          options.onError(err);
          options.nodeCachedData = void 0;
        }
      }
      return options;
    };
    ConfigurationOptionsUtil2.mergeConfigurationOptions = function(overwrite, base) {
      if (overwrite === void 0) {
        overwrite = null;
      }
      if (base === void 0) {
        base = null;
      }
      var result = AMDLoader2.Utilities.recursiveClone(base || {});
      AMDLoader2.Utilities.forEachProperty(overwrite, function(key, value) {
        if (key === "ignoreDuplicateModules" && typeof result.ignoreDuplicateModules !== "undefined") {
          result.ignoreDuplicateModules = result.ignoreDuplicateModules.concat(value);
        } else if (key === "paths" && typeof result.paths !== "undefined") {
          AMDLoader2.Utilities.forEachProperty(value, function(key2, value2) {
            return result.paths[key2] = value2;
          });
        } else if (key === "config" && typeof result.config !== "undefined") {
          AMDLoader2.Utilities.forEachProperty(value, function(key2, value2) {
            return result.config[key2] = value2;
          });
        } else {
          result[key] = AMDLoader2.Utilities.recursiveClone(value);
        }
      });
      return ConfigurationOptionsUtil2.validateConfigurationOptions(result);
    };
    return ConfigurationOptionsUtil2;
  }();
  AMDLoader2.ConfigurationOptionsUtil = ConfigurationOptionsUtil;
  var Configuration = function() {
    function Configuration2(env, options) {
      this._env = env;
      this.options = ConfigurationOptionsUtil.mergeConfigurationOptions(options);
      this._createIgnoreDuplicateModulesMap();
      this._createNodeModulesMap();
      this._createSortedPathsRules();
      if (this.options.baseUrl === "") {
        if (this.options.nodeRequire && this.options.nodeRequire.main && this.options.nodeRequire.main.filename && this._env.isNode) {
          var nodeMain = this.options.nodeRequire.main.filename;
          var dirnameIndex = Math.max(nodeMain.lastIndexOf("/"), nodeMain.lastIndexOf("\\"));
          this.options.baseUrl = nodeMain.substring(0, dirnameIndex + 1);
        }
        if (this.options.nodeMain && this._env.isNode) {
          var nodeMain = this.options.nodeMain;
          var dirnameIndex = Math.max(nodeMain.lastIndexOf("/"), nodeMain.lastIndexOf("\\"));
          this.options.baseUrl = nodeMain.substring(0, dirnameIndex + 1);
        }
      }
    }
    Configuration2.prototype._createIgnoreDuplicateModulesMap = function() {
      this.ignoreDuplicateModulesMap = {};
      for (var i = 0; i < this.options.ignoreDuplicateModules.length; i++) {
        this.ignoreDuplicateModulesMap[this.options.ignoreDuplicateModules[i]] = true;
      }
    };
    Configuration2.prototype._createNodeModulesMap = function() {
      this.nodeModulesMap = Object.create(null);
      for (var _i = 0, _a = this.options.nodeModules; _i < _a.length; _i++) {
        var nodeModule = _a[_i];
        this.nodeModulesMap[nodeModule] = true;
      }
    };
    Configuration2.prototype._createSortedPathsRules = function() {
      var _this = this;
      this.sortedPathsRules = [];
      AMDLoader2.Utilities.forEachProperty(this.options.paths, function(from, to) {
        if (!Array.isArray(to)) {
          _this.sortedPathsRules.push({
            from,
            to: [to]
          });
        } else {
          _this.sortedPathsRules.push({
            from,
            to
          });
        }
      });
      this.sortedPathsRules.sort(function(a, b) {
        return b.from.length - a.from.length;
      });
    };
    Configuration2.prototype.cloneAndMerge = function(options) {
      return new Configuration2(this._env, ConfigurationOptionsUtil.mergeConfigurationOptions(options, this.options));
    };
    Configuration2.prototype.getOptionsLiteral = function() {
      return this.options;
    };
    Configuration2.prototype._applyPaths = function(moduleId) {
      var pathRule;
      for (var i = 0, len = this.sortedPathsRules.length; i < len; i++) {
        pathRule = this.sortedPathsRules[i];
        if (AMDLoader2.Utilities.startsWith(moduleId, pathRule.from)) {
          var result = [];
          for (var j = 0, lenJ = pathRule.to.length; j < lenJ; j++) {
            result.push(pathRule.to[j] + moduleId.substr(pathRule.from.length));
          }
          return result;
        }
      }
      return [moduleId];
    };
    Configuration2.prototype._addUrlArgsToUrl = function(url) {
      if (AMDLoader2.Utilities.containsQueryString(url)) {
        return url + "&" + this.options.urlArgs;
      } else {
        return url + "?" + this.options.urlArgs;
      }
    };
    Configuration2.prototype._addUrlArgsIfNecessaryToUrl = function(url) {
      if (this.options.urlArgs) {
        return this._addUrlArgsToUrl(url);
      }
      return url;
    };
    Configuration2.prototype._addUrlArgsIfNecessaryToUrls = function(urls) {
      if (this.options.urlArgs) {
        for (var i = 0, len = urls.length; i < len; i++) {
          urls[i] = this._addUrlArgsToUrl(urls[i]);
        }
      }
      return urls;
    };
    Configuration2.prototype.moduleIdToPaths = function(moduleId) {
      if (this.nodeModulesMap[moduleId] === true) {
        if (this.isBuild()) {
          return ["empty:"];
        } else {
          return ["node|" + moduleId];
        }
      }
      var result = moduleId;
      var results;
      if (!AMDLoader2.Utilities.endsWith(result, ".js") && !AMDLoader2.Utilities.isAbsolutePath(result)) {
        results = this._applyPaths(result);
        for (var i = 0, len = results.length; i < len; i++) {
          if (this.isBuild() && results[i] === "empty:") {
            continue;
          }
          if (!AMDLoader2.Utilities.isAbsolutePath(results[i])) {
            results[i] = this.options.baseUrl + results[i];
          }
          if (!AMDLoader2.Utilities.endsWith(results[i], ".js") && !AMDLoader2.Utilities.containsQueryString(results[i])) {
            results[i] = results[i] + ".js";
          }
        }
      } else {
        if (!AMDLoader2.Utilities.endsWith(result, ".js") && !AMDLoader2.Utilities.containsQueryString(result)) {
          result = result + ".js";
        }
        results = [result];
      }
      return this._addUrlArgsIfNecessaryToUrls(results);
    };
    Configuration2.prototype.requireToUrl = function(url) {
      var result = url;
      if (!AMDLoader2.Utilities.isAbsolutePath(result)) {
        result = this._applyPaths(result)[0];
        if (!AMDLoader2.Utilities.isAbsolutePath(result)) {
          result = this.options.baseUrl + result;
        }
      }
      return this._addUrlArgsIfNecessaryToUrl(result);
    };
    Configuration2.prototype.isBuild = function() {
      return this.options.isBuild;
    };
    Configuration2.prototype.isDuplicateMessageIgnoredFor = function(moduleId) {
      return this.ignoreDuplicateModulesMap.hasOwnProperty(moduleId);
    };
    Configuration2.prototype.getConfigForModule = function(moduleId) {
      if (this.options.config) {
        return this.options.config[moduleId];
      }
    };
    Configuration2.prototype.shouldCatchError = function() {
      return this.options.catchError;
    };
    Configuration2.prototype.shouldRecordStats = function() {
      return this.options.recordStats;
    };
    Configuration2.prototype.onError = function(err) {
      this.options.onError(err);
    };
    return Configuration2;
  }();
  AMDLoader2.Configuration = Configuration;
})(AMDLoader || (AMDLoader = {}));
var AMDLoader;
(function(AMDLoader2) {
  var OnlyOnceScriptLoader = function() {
    function OnlyOnceScriptLoader2(env) {
      this._env = env;
      this._scriptLoader = null;
      this._callbackMap = {};
    }
    OnlyOnceScriptLoader2.prototype.load = function(moduleManager, scriptSrc, callback, errorback) {
      var _this = this;
      if (!this._scriptLoader) {
        this._scriptLoader = this._env.isWebWorker ? new WorkerScriptLoader() : this._env.isNode ? new NodeScriptLoader(this._env) : new BrowserScriptLoader();
      }
      var scriptCallbacks = {
        callback,
        errorback
      };
      if (this._callbackMap.hasOwnProperty(scriptSrc)) {
        this._callbackMap[scriptSrc].push(scriptCallbacks);
        return;
      }
      this._callbackMap[scriptSrc] = [scriptCallbacks];
      this._scriptLoader.load(moduleManager, scriptSrc, function() {
        return _this.triggerCallback(scriptSrc);
      }, function(err) {
        return _this.triggerErrorback(scriptSrc, err);
      });
    };
    OnlyOnceScriptLoader2.prototype.triggerCallback = function(scriptSrc) {
      var scriptCallbacks = this._callbackMap[scriptSrc];
      delete this._callbackMap[scriptSrc];
      for (var i = 0; i < scriptCallbacks.length; i++) {
        scriptCallbacks[i].callback();
      }
    };
    OnlyOnceScriptLoader2.prototype.triggerErrorback = function(scriptSrc, err) {
      var scriptCallbacks = this._callbackMap[scriptSrc];
      delete this._callbackMap[scriptSrc];
      for (var i = 0; i < scriptCallbacks.length; i++) {
        scriptCallbacks[i].errorback(err);
      }
    };
    return OnlyOnceScriptLoader2;
  }();
  var BrowserScriptLoader = function() {
    function BrowserScriptLoader2() {
    }
    BrowserScriptLoader2.prototype.attachListeners = function(script, callback, errorback) {
      var unbind = function() {
        script.removeEventListener("load", loadEventListener);
        script.removeEventListener("error", errorEventListener);
      };
      var loadEventListener = function(e) {
        unbind();
        callback();
      };
      var errorEventListener = function(e) {
        unbind();
        errorback(e);
      };
      script.addEventListener("load", loadEventListener);
      script.addEventListener("error", errorEventListener);
    };
    BrowserScriptLoader2.prototype.load = function(moduleManager, scriptSrc, callback, errorback) {
      var script = document.createElement("script");
      script.setAttribute("async", "async");
      script.setAttribute("type", "text/javascript");
      this.attachListeners(script, callback, errorback);
      script.setAttribute("src", scriptSrc);
      var cspNonce = moduleManager.getConfig().getOptionsLiteral().cspNonce;
      if (cspNonce) {
        script.setAttribute("nonce", cspNonce);
      }
      document.getElementsByTagName("head")[0].appendChild(script);
    };
    return BrowserScriptLoader2;
  }();
  var WorkerScriptLoader = function() {
    function WorkerScriptLoader2() {
    }
    WorkerScriptLoader2.prototype.load = function(moduleManager, scriptSrc, callback, errorback) {
      try {
        importScripts(scriptSrc);
        callback();
      } catch (e) {
        errorback(e);
      }
    };
    return WorkerScriptLoader2;
  }();
  var NodeScriptLoader = function() {
    function NodeScriptLoader2(env) {
      this._env = env;
      this._didInitialize = false;
      this._didPatchNodeRequire = false;
    }
    NodeScriptLoader2.prototype._init = function(nodeRequire) {
      if (this._didInitialize) {
        return;
      }
      this._didInitialize = true;
      this._fs = nodeRequire("fs");
      this._vm = nodeRequire("vm");
      this._path = nodeRequire("path");
      this._crypto = nodeRequire("crypto");
    };
    NodeScriptLoader2.prototype._initNodeRequire = function(nodeRequire, moduleManager) {
      var nodeCachedData = moduleManager.getConfig().getOptionsLiteral().nodeCachedData;
      if (!nodeCachedData) {
        return;
      }
      if (this._didPatchNodeRequire) {
        return;
      }
      this._didPatchNodeRequire = true;
      var that = this;
      var Module = nodeRequire("module");
      function makeRequireFunction(mod) {
        var Module2 = mod.constructor;
        var require2 = function require3(path) {
          try {
            return mod.require(path);
          } finally {
          }
        };
        require2.resolve = function resolve(request) {
          return Module2._resolveFilename(request, mod);
        };
        require2.main = process.mainModule;
        require2.extensions = Module2._extensions;
        require2.cache = Module2._cache;
        return require2;
      }
      Module.prototype._compile = function(content, filename) {
        var scriptSource = Module.wrap(content.replace(/^#!.*/, ""));
        var recorder = moduleManager.getRecorder();
        var cachedDataPath = that._getCachedDataPath(nodeCachedData, filename);
        var options = {
          filename
        };
        var hashData;
        try {
          var data = that._fs.readFileSync(cachedDataPath);
          hashData = data.slice(0, 16);
          options.cachedData = data.slice(16);
          recorder.record(60, cachedDataPath);
        } catch (_e) {
          recorder.record(61, cachedDataPath);
        }
        var script = new that._vm.Script(scriptSource, options);
        var compileWrapper = script.runInThisContext(options);
        var dirname = that._path.dirname(filename);
        var require2 = makeRequireFunction(this);
        var args = [this.exports, require2, this, filename, dirname, process, _commonjsGlobal, Buffer];
        var result = compileWrapper.apply(this.exports, args);
        that._handleCachedData(script, scriptSource, cachedDataPath, !options.cachedData, moduleManager);
        that._verifyCachedData(script, scriptSource, cachedDataPath, hashData, moduleManager);
        return result;
      };
    };
    NodeScriptLoader2.prototype.load = function(moduleManager, scriptSrc, callback, errorback) {
      var _this = this;
      var opts = moduleManager.getConfig().getOptionsLiteral();
      var nodeRequire = opts.nodeRequire || AMDLoader2.global.nodeRequire;
      var nodeInstrumenter = opts.nodeInstrumenter || function(c) {
        return c;
      };
      this._init(nodeRequire);
      this._initNodeRequire(nodeRequire, moduleManager);
      var recorder = moduleManager.getRecorder();
      if (/^node\|/.test(scriptSrc)) {
        var pieces = scriptSrc.split("|");
        var moduleExports_1 = null;
        try {
          moduleExports_1 = nodeRequire(pieces[1]);
        } catch (err) {
          errorback(err);
          return;
        }
        moduleManager.enqueueDefineAnonymousModule([], function() {
          return moduleExports_1;
        });
        callback();
      } else {
        scriptSrc = AMDLoader2.Utilities.fileUriToFilePath(this._env.isWindows, scriptSrc);
        var normalizedScriptSrc_1 = this._path.normalize(scriptSrc);
        var vmScriptPathOrUri_1 = this._getElectronRendererScriptPathOrUri(normalizedScriptSrc_1);
        var wantsCachedData_1 = Boolean(opts.nodeCachedData);
        var cachedDataPath_1 = wantsCachedData_1 ? this._getCachedDataPath(opts.nodeCachedData, scriptSrc) : void 0;
        this._readSourceAndCachedData(normalizedScriptSrc_1, cachedDataPath_1, recorder, function(err, data, cachedData, hashData) {
          if (err) {
            errorback(err);
            return;
          }
          var scriptSource;
          if (data.charCodeAt(0) === NodeScriptLoader2._BOM) {
            scriptSource = NodeScriptLoader2._PREFIX + data.substring(1) + NodeScriptLoader2._SUFFIX;
          } else {
            scriptSource = NodeScriptLoader2._PREFIX + data + NodeScriptLoader2._SUFFIX;
          }
          scriptSource = nodeInstrumenter(scriptSource, normalizedScriptSrc_1);
          var scriptOpts = {
            filename: vmScriptPathOrUri_1,
            cachedData
          };
          var script = _this._createAndEvalScript(moduleManager, scriptSource, scriptOpts, callback, errorback);
          _this._handleCachedData(script, scriptSource, cachedDataPath_1, wantsCachedData_1 && !cachedData, moduleManager);
          _this._verifyCachedData(script, scriptSource, cachedDataPath_1, hashData, moduleManager);
        });
      }
    };
    NodeScriptLoader2.prototype._createAndEvalScript = function(moduleManager, contents, options, callback, errorback) {
      var recorder = moduleManager.getRecorder();
      recorder.record(31, options.filename);
      var script = new this._vm.Script(contents, options);
      var ret = script.runInThisContext(options);
      var globalDefineFunc = moduleManager.getGlobalAMDDefineFunc();
      var receivedDefineCall = false;
      var localDefineFunc = function() {
        receivedDefineCall = true;
        return globalDefineFunc.apply(null, arguments);
      };
      localDefineFunc.amd = globalDefineFunc.amd;
      ret.call(AMDLoader2.global, moduleManager.getGlobalAMDRequireFunc(), localDefineFunc, options.filename, this._path.dirname(options.filename));
      recorder.record(32, options.filename);
      if (receivedDefineCall) {
        callback();
      } else {
        errorback(new Error("Didn't receive define call in " + options.filename + "!"));
      }
      return script;
    };
    NodeScriptLoader2.prototype._getElectronRendererScriptPathOrUri = function(path) {
      if (!this._env.isElectronRenderer) {
        return path;
      }
      var driveLetterMatch = path.match(/^([a-z])\:(.*)/i);
      if (driveLetterMatch) {
        return "file:///" + (driveLetterMatch[1].toUpperCase() + ":" + driveLetterMatch[2]).replace(/\\/g, "/");
      } else {
        return "file://" + path;
      }
    };
    NodeScriptLoader2.prototype._getCachedDataPath = function(config, filename) {
      var hash = this._crypto.createHash("md5").update(filename, "utf8").update(config.seed, "utf8").digest("hex");
      var basename = this._path.basename(filename).replace(/\.js$/, "");
      return this._path.join(config.path, basename + "-" + hash + ".code");
    };
    NodeScriptLoader2.prototype._handleCachedData = function(script, scriptSource, cachedDataPath, createCachedData, moduleManager) {
      var _this = this;
      if (script.cachedDataRejected) {
        this._fs.unlink(cachedDataPath, function(err) {
          moduleManager.getRecorder().record(62, cachedDataPath);
          _this._createAndWriteCachedData(script, scriptSource, cachedDataPath, moduleManager);
          if (err) {
            moduleManager.getConfig().onError(err);
          }
        });
      } else if (createCachedData) {
        this._createAndWriteCachedData(script, scriptSource, cachedDataPath, moduleManager);
      }
    };
    NodeScriptLoader2.prototype._createAndWriteCachedData = function(script, scriptSource, cachedDataPath, moduleManager) {
      var _this = this;
      var timeout = Math.ceil(moduleManager.getConfig().getOptionsLiteral().nodeCachedData.writeDelay * (1 + Math.random()));
      var lastSize = -1;
      var iteration = 0;
      var hashData = void 0;
      var createLoop = function() {
        setTimeout(function() {
          if (!hashData) {
            hashData = _this._crypto.createHash("md5").update(scriptSource, "utf8").digest();
          }
          var cachedData = script.createCachedData();
          if (cachedData.length === 0 || cachedData.length === lastSize || iteration >= 5) {
            return;
          }
          lastSize = cachedData.length;
          _this._fs.writeFile(cachedDataPath, Buffer.concat([hashData, cachedData]), function(err) {
            if (err) {
              moduleManager.getConfig().onError(err);
            }
            moduleManager.getRecorder().record(63, cachedDataPath);
            createLoop();
          });
        }, timeout * Math.pow(4, iteration++));
      };
      createLoop();
    };
    NodeScriptLoader2.prototype._readSourceAndCachedData = function(sourcePath, cachedDataPath, recorder, callback) {
      if (!cachedDataPath) {
        this._fs.readFile(sourcePath, {
          encoding: "utf8"
        }, callback);
      } else {
        var source_1 = void 0;
        var cachedData_1 = void 0;
        var hashData_1 = void 0;
        var steps_1 = 2;
        var step_1 = function(err) {
          if (err) {
            callback(err);
          } else if (--steps_1 === 0) {
            callback(void 0, source_1, cachedData_1, hashData_1);
          }
        };
        this._fs.readFile(sourcePath, {
          encoding: "utf8"
        }, function(err, data) {
          source_1 = data;
          step_1(err);
        });
        this._fs.readFile(cachedDataPath, function(err, data) {
          if (!err && data && data.length > 0) {
            hashData_1 = data.slice(0, 16);
            cachedData_1 = data.slice(16);
            recorder.record(60, cachedDataPath);
          } else {
            recorder.record(61, cachedDataPath);
          }
          step_1();
        });
      }
    };
    NodeScriptLoader2.prototype._verifyCachedData = function(script, scriptSource, cachedDataPath, hashData, moduleManager) {
      var _this = this;
      if (!hashData) {
        return;
      }
      if (script.cachedDataRejected) {
        return;
      }
      setTimeout(function() {
        var hashDataNow = _this._crypto.createHash("md5").update(scriptSource, "utf8").digest();
        if (!hashData.equals(hashDataNow)) {
          moduleManager.getConfig().onError(new Error("FAILED TO VERIFY CACHED DATA, deleting stale '" + cachedDataPath + "' now, but a RESTART IS REQUIRED"));
          _this._fs.unlink(cachedDataPath, function(err) {
            return moduleManager.getConfig().onError(err);
          });
        }
      }, Math.ceil(5000 * (1 + Math.random())));
    };
    NodeScriptLoader2._BOM = 65279;
    NodeScriptLoader2._PREFIX = "(function (require, define, __filename, __dirname) { ";
    NodeScriptLoader2._SUFFIX = "\n});";
    return NodeScriptLoader2;
  }();
  function createScriptLoader(env) {
    return new OnlyOnceScriptLoader(env);
  }
  AMDLoader2.createScriptLoader = createScriptLoader;
})(AMDLoader || (AMDLoader = {}));
var AMDLoader;
(function(AMDLoader2) {
  var ModuleIdResolver = function() {
    function ModuleIdResolver2(fromModuleId) {
      var lastSlash = fromModuleId.lastIndexOf("/");
      if (lastSlash !== -1) {
        this.fromModulePath = fromModuleId.substr(0, lastSlash + 1);
      } else {
        this.fromModulePath = "";
      }
    }
    ModuleIdResolver2._normalizeModuleId = function(moduleId) {
      var r = moduleId, pattern;
      pattern = /\/\.\//;
      while (pattern.test(r)) {
        r = r.replace(pattern, "/");
      }
      r = r.replace(/^\.\//g, "");
      pattern = /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
      while (pattern.test(r)) {
        r = r.replace(pattern, "/");
      }
      r = r.replace(/^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//, "");
      return r;
    };
    ModuleIdResolver2.prototype.resolveModule = function(moduleId) {
      var result = moduleId;
      if (!AMDLoader2.Utilities.isAbsolutePath(result)) {
        if (AMDLoader2.Utilities.startsWith(result, "./") || AMDLoader2.Utilities.startsWith(result, "../")) {
          result = ModuleIdResolver2._normalizeModuleId(this.fromModulePath + result);
        }
      }
      return result;
    };
    ModuleIdResolver2.ROOT = new ModuleIdResolver2("");
    return ModuleIdResolver2;
  }();
  AMDLoader2.ModuleIdResolver = ModuleIdResolver;
  var Module = function() {
    function Module2(id, strId, dependencies, callback, errorback, moduleIdResolver) {
      this.id = id;
      this.strId = strId;
      this.dependencies = dependencies;
      this._callback = callback;
      this._errorback = errorback;
      this.moduleIdResolver = moduleIdResolver;
      this.exports = {};
      this.error = null;
      this.exportsPassedIn = false;
      this.unresolvedDependenciesCount = this.dependencies.length;
      this._isComplete = false;
    }
    Module2._safeInvokeFunction = function(callback, args) {
      try {
        return {
          returnedValue: callback.apply(AMDLoader2.global, args),
          producedError: null
        };
      } catch (e) {
        return {
          returnedValue: null,
          producedError: e
        };
      }
    };
    Module2._invokeFactory = function(config, strModuleId, callback, dependenciesValues) {
      if (config.isBuild() && !AMDLoader2.Utilities.isAnonymousModule(strModuleId)) {
        return {
          returnedValue: null,
          producedError: null
        };
      }
      if (config.shouldCatchError()) {
        return this._safeInvokeFunction(callback, dependenciesValues);
      }
      return {
        returnedValue: callback.apply(AMDLoader2.global, dependenciesValues),
        producedError: null
      };
    };
    Module2.prototype.complete = function(recorder, config, dependenciesValues) {
      this._isComplete = true;
      var producedError = null;
      if (this._callback) {
        if (typeof this._callback === "function") {
          recorder.record(21, this.strId);
          var r = Module2._invokeFactory(config, this.strId, this._callback, dependenciesValues);
          producedError = r.producedError;
          recorder.record(22, this.strId);
          if (!producedError && typeof r.returnedValue !== "undefined" && (!this.exportsPassedIn || AMDLoader2.Utilities.isEmpty(this.exports))) {
            this.exports = r.returnedValue;
          }
        } else {
          this.exports = this._callback;
        }
      }
      if (producedError) {
        var err = AMDLoader2.ensureError(producedError);
        err.phase = "factory";
        err.moduleId = this.strId;
        this.error = err;
        config.onError(err);
      }
      this.dependencies = null;
      this._callback = null;
      this._errorback = null;
      this.moduleIdResolver = null;
    };
    Module2.prototype.onDependencyError = function(err) {
      this._isComplete = true;
      this.error = err;
      if (this._errorback) {
        this._errorback(err);
        return true;
      }
      return false;
    };
    Module2.prototype.isComplete = function() {
      return this._isComplete;
    };
    return Module2;
  }();
  AMDLoader2.Module = Module;
  var ModuleIdProvider = function() {
    function ModuleIdProvider2() {
      this._nextId = 0;
      this._strModuleIdToIntModuleId = new Map();
      this._intModuleIdToStrModuleId = [];
      this.getModuleId("exports");
      this.getModuleId("module");
      this.getModuleId("require");
    }
    ModuleIdProvider2.prototype.getMaxModuleId = function() {
      return this._nextId;
    };
    ModuleIdProvider2.prototype.getModuleId = function(strModuleId) {
      var id = this._strModuleIdToIntModuleId.get(strModuleId);
      if (typeof id === "undefined") {
        id = this._nextId++;
        this._strModuleIdToIntModuleId.set(strModuleId, id);
        this._intModuleIdToStrModuleId[id] = strModuleId;
      }
      return id;
    };
    ModuleIdProvider2.prototype.getStrModuleId = function(moduleId) {
      return this._intModuleIdToStrModuleId[moduleId];
    };
    return ModuleIdProvider2;
  }();
  var RegularDependency = function() {
    function RegularDependency2(id) {
      this.id = id;
    }
    RegularDependency2.EXPORTS = new RegularDependency2(0);
    RegularDependency2.MODULE = new RegularDependency2(1);
    RegularDependency2.REQUIRE = new RegularDependency2(2);
    return RegularDependency2;
  }();
  AMDLoader2.RegularDependency = RegularDependency;
  var PluginDependency = function() {
    function PluginDependency2(id, pluginId, pluginParam) {
      this.id = id;
      this.pluginId = pluginId;
      this.pluginParam = pluginParam;
    }
    return PluginDependency2;
  }();
  AMDLoader2.PluginDependency = PluginDependency;
  var ModuleManager = function() {
    function ModuleManager2(env, scriptLoader, defineFunc, requireFunc, loaderAvailableTimestamp) {
      if (loaderAvailableTimestamp === void 0) {
        loaderAvailableTimestamp = 0;
      }
      this._env = env;
      this._scriptLoader = scriptLoader;
      this._loaderAvailableTimestamp = loaderAvailableTimestamp;
      this._defineFunc = defineFunc;
      this._requireFunc = requireFunc;
      this._moduleIdProvider = new ModuleIdProvider();
      this._config = new AMDLoader2.Configuration(this._env);
      this._modules2 = [];
      this._knownModules2 = [];
      this._inverseDependencies2 = [];
      this._inversePluginDependencies2 = new Map();
      this._currentAnnonymousDefineCall = null;
      this._recorder = null;
      this._buildInfoPath = [];
      this._buildInfoDefineStack = [];
      this._buildInfoDependencies = [];
    }
    ModuleManager2.prototype.reset = function() {
      return new ModuleManager2(this._env, this._scriptLoader, this._defineFunc, this._requireFunc, this._loaderAvailableTimestamp);
    };
    ModuleManager2.prototype.getGlobalAMDDefineFunc = function() {
      return this._defineFunc;
    };
    ModuleManager2.prototype.getGlobalAMDRequireFunc = function() {
      return this._requireFunc;
    };
    ModuleManager2._findRelevantLocationInStack = function(needle, stack) {
      var normalize = function(str) {
        return str.replace(/\\/g, "/");
      };
      var normalizedPath = normalize(needle);
      var stackPieces = stack.split(/\n/);
      for (var i = 0; i < stackPieces.length; i++) {
        var m = stackPieces[i].match(/(.*):(\d+):(\d+)\)?$/);
        if (m) {
          var stackPath = m[1];
          var stackLine = m[2];
          var stackColumn = m[3];
          var trimPathOffset = Math.max(stackPath.lastIndexOf(" ") + 1, stackPath.lastIndexOf("(") + 1);
          stackPath = stackPath.substr(trimPathOffset);
          stackPath = normalize(stackPath);
          if (stackPath === normalizedPath) {
            var r = {
              line: parseInt(stackLine, 10),
              col: parseInt(stackColumn, 10)
            };
            if (r.line === 1) {
              r.col -= "(function (require, define, __filename, __dirname) { ".length;
            }
            return r;
          }
        }
      }
      throw new Error("Could not correlate define call site for needle " + needle);
    };
    ModuleManager2.prototype.getBuildInfo = function() {
      if (!this._config.isBuild()) {
        return null;
      }
      var result = [], resultLen = 0;
      for (var i = 0, len = this._modules2.length; i < len; i++) {
        var m = this._modules2[i];
        if (!m) {
          continue;
        }
        var location_1 = this._buildInfoPath[m.id] || null;
        var defineStack = this._buildInfoDefineStack[m.id] || null;
        var dependencies = this._buildInfoDependencies[m.id];
        result[resultLen++] = {
          id: m.strId,
          path: location_1,
          defineLocation: location_1 && defineStack ? ModuleManager2._findRelevantLocationInStack(location_1, defineStack) : null,
          dependencies,
          shim: null,
          exports: m.exports
        };
      }
      return result;
    };
    ModuleManager2.prototype.getRecorder = function() {
      if (!this._recorder) {
        if (this._config.shouldRecordStats()) {
          this._recorder = new AMDLoader2.LoaderEventRecorder(this._loaderAvailableTimestamp);
        } else {
          this._recorder = AMDLoader2.NullLoaderEventRecorder.INSTANCE;
        }
      }
      return this._recorder;
    };
    ModuleManager2.prototype.getLoaderEvents = function() {
      return this.getRecorder().getEvents();
    };
    ModuleManager2.prototype.enqueueDefineAnonymousModule = function(dependencies, callback) {
      if (this._currentAnnonymousDefineCall !== null) {
        throw new Error("Can only have one anonymous define call per script file");
      }
      var stack = null;
      if (this._config.isBuild()) {
        stack = new Error("StackLocation").stack || null;
      }
      this._currentAnnonymousDefineCall = {
        stack,
        dependencies,
        callback
      };
    };
    ModuleManager2.prototype.defineModule = function(strModuleId, dependencies, callback, errorback, stack, moduleIdResolver) {
      var _this = this;
      if (moduleIdResolver === void 0) {
        moduleIdResolver = new ModuleIdResolver(strModuleId);
      }
      var moduleId = this._moduleIdProvider.getModuleId(strModuleId);
      if (this._modules2[moduleId]) {
        if (!this._config.isDuplicateMessageIgnoredFor(strModuleId)) {
          console.warn("Duplicate definition of module '" + strModuleId + "'");
        }
        return;
      }
      var m = new Module(moduleId, strModuleId, this._normalizeDependencies(dependencies, moduleIdResolver), callback, errorback, moduleIdResolver);
      this._modules2[moduleId] = m;
      if (this._config.isBuild()) {
        this._buildInfoDefineStack[moduleId] = stack;
        this._buildInfoDependencies[moduleId] = (m.dependencies || []).map(function(dep) {
          return _this._moduleIdProvider.getStrModuleId(dep.id);
        });
      }
      this._resolve(m);
    };
    ModuleManager2.prototype._normalizeDependency = function(dependency, moduleIdResolver) {
      if (dependency === "exports") {
        return RegularDependency.EXPORTS;
      }
      if (dependency === "module") {
        return RegularDependency.MODULE;
      }
      if (dependency === "require") {
        return RegularDependency.REQUIRE;
      }
      var bangIndex = dependency.indexOf("!");
      if (bangIndex >= 0) {
        var strPluginId = moduleIdResolver.resolveModule(dependency.substr(0, bangIndex));
        var pluginParam = moduleIdResolver.resolveModule(dependency.substr(bangIndex + 1));
        var dependencyId = this._moduleIdProvider.getModuleId(strPluginId + "!" + pluginParam);
        var pluginId = this._moduleIdProvider.getModuleId(strPluginId);
        return new PluginDependency(dependencyId, pluginId, pluginParam);
      }
      return new RegularDependency(this._moduleIdProvider.getModuleId(moduleIdResolver.resolveModule(dependency)));
    };
    ModuleManager2.prototype._normalizeDependencies = function(dependencies, moduleIdResolver) {
      var result = [], resultLen = 0;
      for (var i = 0, len = dependencies.length; i < len; i++) {
        result[resultLen++] = this._normalizeDependency(dependencies[i], moduleIdResolver);
      }
      return result;
    };
    ModuleManager2.prototype._relativeRequire = function(moduleIdResolver, dependencies, callback, errorback) {
      if (typeof dependencies === "string") {
        return this.synchronousRequire(dependencies, moduleIdResolver);
      }
      this.defineModule(AMDLoader2.Utilities.generateAnonymousModule(), dependencies, callback, errorback, null, moduleIdResolver);
    };
    ModuleManager2.prototype.synchronousRequire = function(_strModuleId, moduleIdResolver) {
      if (moduleIdResolver === void 0) {
        moduleIdResolver = new ModuleIdResolver(_strModuleId);
      }
      var dependency = this._normalizeDependency(_strModuleId, moduleIdResolver);
      var m = this._modules2[dependency.id];
      if (!m) {
        throw new Error("Check dependency list! Synchronous require cannot resolve module '" + _strModuleId + "'. This is the first mention of this module!");
      }
      if (!m.isComplete()) {
        throw new Error("Check dependency list! Synchronous require cannot resolve module '" + _strModuleId + "'. This module has not been resolved completely yet.");
      }
      if (m.error) {
        throw m.error;
      }
      return m.exports;
    };
    ModuleManager2.prototype.configure = function(params, shouldOverwrite) {
      var oldShouldRecordStats = this._config.shouldRecordStats();
      if (shouldOverwrite) {
        this._config = new AMDLoader2.Configuration(this._env, params);
      } else {
        this._config = this._config.cloneAndMerge(params);
      }
      if (this._config.shouldRecordStats() && !oldShouldRecordStats) {
        this._recorder = null;
      }
    };
    ModuleManager2.prototype.getConfig = function() {
      return this._config;
    };
    ModuleManager2.prototype._onLoad = function(moduleId) {
      if (this._currentAnnonymousDefineCall !== null) {
        var defineCall = this._currentAnnonymousDefineCall;
        this._currentAnnonymousDefineCall = null;
        this.defineModule(this._moduleIdProvider.getStrModuleId(moduleId), defineCall.dependencies, defineCall.callback, null, defineCall.stack);
      }
    };
    ModuleManager2.prototype._createLoadError = function(moduleId, _err) {
      var _this = this;
      var strModuleId = this._moduleIdProvider.getStrModuleId(moduleId);
      var neededBy = (this._inverseDependencies2[moduleId] || []).map(function(intModuleId) {
        return _this._moduleIdProvider.getStrModuleId(intModuleId);
      });
      var err = AMDLoader2.ensureError(_err);
      err.phase = "loading";
      err.moduleId = strModuleId;
      err.neededBy = neededBy;
      return err;
    };
    ModuleManager2.prototype._onLoadError = function(moduleId, err) {
      var error = this._createLoadError(moduleId, err);
      if (!this._modules2[moduleId]) {
        this._modules2[moduleId] = new Module(moduleId, this._moduleIdProvider.getStrModuleId(moduleId), [], function() {
        }, function() {
        }, null);
      }
      var seenModuleId = [];
      for (var i = 0, len = this._moduleIdProvider.getMaxModuleId(); i < len; i++) {
        seenModuleId[i] = false;
      }
      var someoneNotified = false;
      var queue = [];
      queue.push(moduleId);
      seenModuleId[moduleId] = true;
      while (queue.length > 0) {
        var queueElement = queue.shift();
        var m = this._modules2[queueElement];
        if (m) {
          someoneNotified = m.onDependencyError(error) || someoneNotified;
        }
        var inverseDeps = this._inverseDependencies2[queueElement];
        if (inverseDeps) {
          for (var i = 0, len = inverseDeps.length; i < len; i++) {
            var inverseDep = inverseDeps[i];
            if (!seenModuleId[inverseDep]) {
              queue.push(inverseDep);
              seenModuleId[inverseDep] = true;
            }
          }
        }
      }
      if (!someoneNotified) {
        this._config.onError(error);
      }
    };
    ModuleManager2.prototype._hasDependencyPath = function(fromId, toId) {
      var from = this._modules2[fromId];
      if (!from) {
        return false;
      }
      var inQueue = [];
      for (var i = 0, len = this._moduleIdProvider.getMaxModuleId(); i < len; i++) {
        inQueue[i] = false;
      }
      var queue = [];
      queue.push(from);
      inQueue[fromId] = true;
      while (queue.length > 0) {
        var element = queue.shift();
        var dependencies = element.dependencies;
        if (dependencies) {
          for (var i = 0, len = dependencies.length; i < len; i++) {
            var dependency = dependencies[i];
            if (dependency.id === toId) {
              return true;
            }
            var dependencyModule = this._modules2[dependency.id];
            if (dependencyModule && !inQueue[dependency.id]) {
              inQueue[dependency.id] = true;
              queue.push(dependencyModule);
            }
          }
        }
      }
      return false;
    };
    ModuleManager2.prototype._findCyclePath = function(fromId, toId, depth) {
      if (fromId === toId || depth === 50) {
        return [fromId];
      }
      var from = this._modules2[fromId];
      if (!from) {
        return null;
      }
      var dependencies = from.dependencies;
      if (dependencies) {
        for (var i = 0, len = dependencies.length; i < len; i++) {
          var path = this._findCyclePath(dependencies[i].id, toId, depth + 1);
          if (path !== null) {
            path.push(fromId);
            return path;
          }
        }
      }
      return null;
    };
    ModuleManager2.prototype._createRequire = function(moduleIdResolver) {
      var _this = this;
      var result = function(dependencies, callback, errorback) {
        return _this._relativeRequire(moduleIdResolver, dependencies, callback, errorback);
      };
      result.toUrl = function(id) {
        return _this._config.requireToUrl(moduleIdResolver.resolveModule(id));
      };
      result.getStats = function() {
        return _this.getLoaderEvents();
      };
      result.__$__nodeRequire = AMDLoader2.global.nodeRequire;
      return result;
    };
    ModuleManager2.prototype._loadModule = function(moduleId) {
      var _this = this;
      if (this._modules2[moduleId] || this._knownModules2[moduleId]) {
        return;
      }
      this._knownModules2[moduleId] = true;
      var strModuleId = this._moduleIdProvider.getStrModuleId(moduleId);
      var paths = this._config.moduleIdToPaths(strModuleId);
      var scopedPackageRegex = /^@[^\/]+\/[^\/]+$/;
      if (this._env.isNode && (strModuleId.indexOf("/") === -1 || scopedPackageRegex.test(strModuleId))) {
        paths.push("node|" + strModuleId);
      }
      var lastPathIndex = -1;
      var loadNextPath = function(err) {
        lastPathIndex++;
        if (lastPathIndex >= paths.length) {
          _this._onLoadError(moduleId, err);
        } else {
          var currentPath_1 = paths[lastPathIndex];
          var recorder_1 = _this.getRecorder();
          if (_this._config.isBuild() && currentPath_1 === "empty:") {
            _this._buildInfoPath[moduleId] = currentPath_1;
            _this.defineModule(_this._moduleIdProvider.getStrModuleId(moduleId), [], null, null, null);
            _this._onLoad(moduleId);
            return;
          }
          recorder_1.record(10, currentPath_1);
          _this._scriptLoader.load(_this, currentPath_1, function() {
            if (_this._config.isBuild()) {
              _this._buildInfoPath[moduleId] = currentPath_1;
            }
            recorder_1.record(11, currentPath_1);
            _this._onLoad(moduleId);
          }, function(err2) {
            recorder_1.record(12, currentPath_1);
            loadNextPath(err2);
          });
        }
      };
      loadNextPath(null);
    };
    ModuleManager2.prototype._loadPluginDependency = function(plugin, pluginDependency) {
      var _this = this;
      if (this._modules2[pluginDependency.id] || this._knownModules2[pluginDependency.id]) {
        return;
      }
      this._knownModules2[pluginDependency.id] = true;
      var load = function(value) {
        _this.defineModule(_this._moduleIdProvider.getStrModuleId(pluginDependency.id), [], value, null, null);
      };
      load.error = function(err) {
        _this._config.onError(_this._createLoadError(pluginDependency.id, err));
      };
      plugin.load(pluginDependency.pluginParam, this._createRequire(ModuleIdResolver.ROOT), load, this._config.getOptionsLiteral());
    };
    ModuleManager2.prototype._resolve = function(module2) {
      var _this = this;
      var dependencies = module2.dependencies;
      if (dependencies) {
        for (var i = 0, len = dependencies.length; i < len; i++) {
          var dependency = dependencies[i];
          if (dependency === RegularDependency.EXPORTS) {
            module2.exportsPassedIn = true;
            module2.unresolvedDependenciesCount--;
            continue;
          }
          if (dependency === RegularDependency.MODULE) {
            module2.unresolvedDependenciesCount--;
            continue;
          }
          if (dependency === RegularDependency.REQUIRE) {
            module2.unresolvedDependenciesCount--;
            continue;
          }
          var dependencyModule = this._modules2[dependency.id];
          if (dependencyModule && dependencyModule.isComplete()) {
            if (dependencyModule.error) {
              module2.onDependencyError(dependencyModule.error);
              return;
            }
            module2.unresolvedDependenciesCount--;
            continue;
          }
          if (this._hasDependencyPath(dependency.id, module2.id)) {
            console.warn("There is a dependency cycle between '" + this._moduleIdProvider.getStrModuleId(dependency.id) + "' and '" + this._moduleIdProvider.getStrModuleId(module2.id) + "'. The cyclic path follows:");
            var cyclePath = this._findCyclePath(dependency.id, module2.id, 0) || [];
            cyclePath.reverse();
            cyclePath.push(dependency.id);
            console.warn(cyclePath.map(function(id) {
              return _this._moduleIdProvider.getStrModuleId(id);
            }).join(" => \n"));
            module2.unresolvedDependenciesCount--;
            continue;
          }
          this._inverseDependencies2[dependency.id] = this._inverseDependencies2[dependency.id] || [];
          this._inverseDependencies2[dependency.id].push(module2.id);
          if (dependency instanceof PluginDependency) {
            var plugin = this._modules2[dependency.pluginId];
            if (plugin && plugin.isComplete()) {
              this._loadPluginDependency(plugin.exports, dependency);
              continue;
            }
            var inversePluginDeps = this._inversePluginDependencies2.get(dependency.pluginId);
            if (!inversePluginDeps) {
              inversePluginDeps = [];
              this._inversePluginDependencies2.set(dependency.pluginId, inversePluginDeps);
            }
            inversePluginDeps.push(dependency);
            this._loadModule(dependency.pluginId);
            continue;
          }
          this._loadModule(dependency.id);
        }
      }
      if (module2.unresolvedDependenciesCount === 0) {
        this._onModuleComplete(module2);
      }
    };
    ModuleManager2.prototype._onModuleComplete = function(module2) {
      var _this = this;
      var recorder = this.getRecorder();
      if (module2.isComplete()) {
        return;
      }
      var dependencies = module2.dependencies;
      var dependenciesValues = [];
      if (dependencies) {
        for (var i = 0, len = dependencies.length; i < len; i++) {
          var dependency = dependencies[i];
          if (dependency === RegularDependency.EXPORTS) {
            dependenciesValues[i] = module2.exports;
            continue;
          }
          if (dependency === RegularDependency.MODULE) {
            dependenciesValues[i] = {
              id: module2.strId,
              config: function() {
                return _this._config.getConfigForModule(module2.strId);
              }
            };
            continue;
          }
          if (dependency === RegularDependency.REQUIRE) {
            dependenciesValues[i] = this._createRequire(module2.moduleIdResolver);
            continue;
          }
          var dependencyModule = this._modules2[dependency.id];
          if (dependencyModule) {
            dependenciesValues[i] = dependencyModule.exports;
            continue;
          }
          dependenciesValues[i] = null;
        }
      }
      module2.complete(recorder, this._config, dependenciesValues);
      var inverseDeps = this._inverseDependencies2[module2.id];
      this._inverseDependencies2[module2.id] = null;
      if (inverseDeps) {
        for (var i = 0, len = inverseDeps.length; i < len; i++) {
          var inverseDependencyId = inverseDeps[i];
          var inverseDependency = this._modules2[inverseDependencyId];
          inverseDependency.unresolvedDependenciesCount--;
          if (inverseDependency.unresolvedDependenciesCount === 0) {
            this._onModuleComplete(inverseDependency);
          }
        }
      }
      var inversePluginDeps = this._inversePluginDependencies2.get(module2.id);
      if (inversePluginDeps) {
        this._inversePluginDependencies2.delete(module2.id);
        for (var i = 0, len = inversePluginDeps.length; i < len; i++) {
          this._loadPluginDependency(module2.exports, inversePluginDeps[i]);
        }
      }
    };
    return ModuleManager2;
  }();
  AMDLoader2.ModuleManager = ModuleManager;
})(AMDLoader || (AMDLoader = {}));
var define;
var AMDLoader;
(function(AMDLoader2) {
  var env = new AMDLoader2.Environment();
  var moduleManager = null;
  var DefineFunc = function(id, dependencies, callback) {
    if (typeof id !== "string") {
      callback = dependencies;
      dependencies = id;
      id = null;
    }
    if (typeof dependencies !== "object" || !Array.isArray(dependencies)) {
      callback = dependencies;
      dependencies = null;
    }
    if (!dependencies) {
      dependencies = ["require", "exports", "module"];
    }
    if (id) {
      moduleManager.defineModule(id, dependencies, callback, null, null);
    } else {
      moduleManager.enqueueDefineAnonymousModule(dependencies, callback);
    }
  };
  DefineFunc.amd = {
    jQuery: true
  };
  var _requireFunc_config = function(params, shouldOverwrite) {
    if (shouldOverwrite === void 0) {
      shouldOverwrite = false;
    }
    moduleManager.configure(params, shouldOverwrite);
  };
  var RequireFunc = function() {
    if (arguments.length === 1) {
      if (arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
        _requireFunc_config(arguments[0]);
        return;
      }
      if (typeof arguments[0] === "string") {
        return moduleManager.synchronousRequire(arguments[0]);
      }
    }
    if (arguments.length === 2 || arguments.length === 3) {
      if (Array.isArray(arguments[0])) {
        moduleManager.defineModule(AMDLoader2.Utilities.generateAnonymousModule(), arguments[0], arguments[1], arguments[2], null);
        return;
      }
    }
    throw new Error("Unrecognized require call");
  };
  RequireFunc.config = _requireFunc_config;
  RequireFunc.getConfig = function() {
    return moduleManager.getConfig().getOptionsLiteral();
  };
  RequireFunc.reset = function() {
    moduleManager = moduleManager.reset();
  };
  RequireFunc.getBuildInfo = function() {
    return moduleManager.getBuildInfo();
  };
  RequireFunc.getStats = function() {
    return moduleManager.getLoaderEvents();
  };
  RequireFunc.define = function() {
    return DefineFunc.apply(null, arguments);
  };
  function init() {
    if (typeof AMDLoader2.global.require !== "undefined" || typeof require !== "undefined") {
      var _nodeRequire_1 = AMDLoader2.global.require || require;
      if (typeof _nodeRequire_1 === "function" && typeof _nodeRequire_1.resolve === "function") {
        var nodeRequire = function(what) {
          moduleManager.getRecorder().record(33, what);
          try {
            return _nodeRequire_1(what);
          } finally {
            moduleManager.getRecorder().record(34, what);
          }
        };
        AMDLoader2.global.nodeRequire = nodeRequire;
        RequireFunc.nodeRequire = nodeRequire;
        RequireFunc.__$__nodeRequire = nodeRequire;
      }
    }
    if (env.isNode && !env.isElectronRenderer) {
      module.exports = RequireFunc;
      require = RequireFunc;
    } else {
      if (!env.isElectronRenderer) {
        AMDLoader2.global.define = DefineFunc;
      }
      AMDLoader2.global.require = RequireFunc;
    }
  }
  AMDLoader2.init = init;
  if (typeof AMDLoader2.global.define !== "function" || !AMDLoader2.global.define.amd) {
    moduleManager = new AMDLoader2.ModuleManager(env, AMDLoader2.createScriptLoader(env), DefineFunc, RequireFunc, AMDLoader2.Utilities.getHighPerformanceTimestamp());
    if (typeof AMDLoader2.global.require !== "undefined" && typeof AMDLoader2.global.require !== "function") {
      RequireFunc.config(AMDLoader2.global.require);
    }
    define = function() {
      return DefineFunc.apply(null, arguments);
    };
    define.amd = DefineFunc.amd;
    if (typeof doNotInitLoader === "undefined") {
      init();
    }
  }
})(AMDLoader || (AMDLoader = {}));
