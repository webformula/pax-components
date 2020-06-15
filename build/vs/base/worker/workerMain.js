(function() {
  var __m = ["require", "exports", "vs/editor/common/core/position", "vs/base/common/errors", "vs/base/common/platform", "vs/editor/common/core/range", "vs/base/common/diff/diff", "vs/base/common/iterator", "vs/base/common/lifecycle", "vs/base/common/event", "vs/base/common/types", "vs/base/common/uint", "vs/base/common/uri", "vs/base/common/arrays", "vs/base/common/diff/diffChange", "vs/base/common/functional", "vs/base/common/hash", "vs/base/common/keyCodes", "vs/base/common/linkedList", "vs/base/common/cancellation", "vs/base/common/strings", "vs/editor/common/core/characterClassifier", "vs/editor/common/core/selection", "vs/editor/common/core/token", "vs/editor/common/diff/diffComputer", "vs/editor/common/model/wordHelper", "vs/editor/common/modes/linkComputer", "vs/editor/common/modes/supports/inplaceReplaceSupport", "vs/editor/common/standalone/standaloneEnums", "vs/editor/common/standalone/standaloneBase", "vs/editor/common/viewModel/prefixSumComputer", "vs/editor/common/model/mirrorTextModel", "vs/base/common/worker/simpleWorker", "vs/editor/common/standalone/promise-polyfill/polyfill", "vs/editor/common/services/editorSimpleWorker"];
  var __M = function(deps) {
    var result = [];
    for (var i = 0, len = deps.length; i < len; i++) {
      result[i] = __m[deps[i]];
    }
    return result;
  };
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
  define(__m[13], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function tail(array, n) {
      if (n === void 0) {
        n = 0;
      }
      return array[array.length - (1 + n)];
    }
    exports2.tail = tail;
    function tail2(arr) {
      if (arr.length === 0) {
        throw new Error("Invalid tail call");
      }
      return [arr.slice(0, arr.length - 1), arr[arr.length - 1]];
    }
    exports2.tail2 = tail2;
    function equals(one, other, itemEquals) {
      if (itemEquals === void 0) {
        itemEquals = function(a, b) {
          return a === b;
        };
      }
      if (one === other) {
        return true;
      }
      if (!one || !other) {
        return false;
      }
      if (one.length !== other.length) {
        return false;
      }
      for (var i = 0, len = one.length; i < len; i++) {
        if (!itemEquals(one[i], other[i])) {
          return false;
        }
      }
      return true;
    }
    exports2.equals = equals;
    function binarySearch(array, key, comparator) {
      var low = 0, high = array.length - 1;
      while (low <= high) {
        var mid = (low + high) / 2 | 0;
        var comp = comparator(array[mid], key);
        if (comp < 0) {
          low = mid + 1;
        } else if (comp > 0) {
          high = mid - 1;
        } else {
          return mid;
        }
      }
      return -(low + 1);
    }
    exports2.binarySearch = binarySearch;
    function findFirstInSorted(array, p) {
      var low = 0, high = array.length;
      if (high === 0) {
        return 0;
      }
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (p(array[mid])) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }
      return low;
    }
    exports2.findFirstInSorted = findFirstInSorted;
    function mergeSort(data, compare) {
      _sort(data, compare, 0, data.length - 1, []);
      return data;
    }
    exports2.mergeSort = mergeSort;
    function _merge(a, compare, lo, mid, hi, aux) {
      var leftIdx = lo, rightIdx = mid + 1;
      for (var i = lo; i <= hi; i++) {
        aux[i] = a[i];
      }
      for (var i = lo; i <= hi; i++) {
        if (leftIdx > mid) {
          a[i] = aux[rightIdx++];
        } else if (rightIdx > hi) {
          a[i] = aux[leftIdx++];
        } else if (compare(aux[rightIdx], aux[leftIdx]) < 0) {
          a[i] = aux[rightIdx++];
        } else {
          a[i] = aux[leftIdx++];
        }
      }
    }
    function _sort(a, compare, lo, hi, aux) {
      if (hi <= lo) {
        return;
      }
      var mid = lo + (hi - lo) / 2 | 0;
      _sort(a, compare, lo, mid, aux);
      _sort(a, compare, mid + 1, hi, aux);
      if (compare(a[mid], a[mid + 1]) <= 0) {
        return;
      }
      _merge(a, compare, lo, mid, hi, aux);
    }
    function groupBy(data, compare) {
      var result = [];
      var currentGroup = void 0;
      for (var _i = 0, _a = mergeSort(data.slice(0), compare); _i < _a.length; _i++) {
        var element = _a[_i];
        if (!currentGroup || compare(currentGroup[0], element) !== 0) {
          currentGroup = [element];
          result.push(currentGroup);
        } else {
          currentGroup.push(element);
        }
      }
      return result;
    }
    exports2.groupBy = groupBy;
    function coalesce(array) {
      return array.filter(function(e) {
        return !!e;
      });
    }
    exports2.coalesce = coalesce;
    function isFalsyOrEmpty(obj) {
      return !Array.isArray(obj) || obj.length === 0;
    }
    exports2.isFalsyOrEmpty = isFalsyOrEmpty;
    function isNonEmptyArray(obj) {
      return Array.isArray(obj) && obj.length > 0;
    }
    exports2.isNonEmptyArray = isNonEmptyArray;
    function distinct(array, keyFn) {
      if (!keyFn) {
        return array.filter(function(element, position) {
          return array.indexOf(element) === position;
        });
      }
      var seen = Object.create(null);
      return array.filter(function(elem) {
        var key = keyFn(elem);
        if (seen[key]) {
          return false;
        }
        seen[key] = true;
        return true;
      });
    }
    exports2.distinct = distinct;
    function distinctES6(array) {
      var seen = new Set();
      return array.filter(function(element) {
        if (seen.has(element)) {
          return false;
        }
        seen.add(element);
        return true;
      });
    }
    exports2.distinctES6 = distinctES6;
    function fromSet(set) {
      var result = [];
      set.forEach(function(o) {
        return result.push(o);
      });
      return result;
    }
    exports2.fromSet = fromSet;
    function firstIndex(array, fn) {
      for (var i = 0; i < array.length; i++) {
        var element = array[i];
        if (fn(element)) {
          return i;
        }
      }
      return -1;
    }
    exports2.firstIndex = firstIndex;
    function first(array, fn, notFoundValue) {
      if (notFoundValue === void 0) {
        notFoundValue = void 0;
      }
      var index = firstIndex(array, fn);
      return index < 0 ? notFoundValue : array[index];
    }
    exports2.first = first;
    function firstOrDefault(array, notFoundValue) {
      return array.length > 0 ? array[0] : notFoundValue;
    }
    exports2.firstOrDefault = firstOrDefault;
    function flatten(arr) {
      var _a;
      return (_a = []).concat.apply(_a, arr);
    }
    exports2.flatten = flatten;
    function range(arg, to) {
      var from = typeof to === "number" ? arg : 0;
      if (typeof to === "number") {
        from = arg;
      } else {
        from = 0;
        to = arg;
      }
      var result = [];
      if (from <= to) {
        for (var i = from; i < to; i++) {
          result.push(i);
        }
      } else {
        for (var i = from; i > to; i--) {
          result.push(i);
        }
      }
      return result;
    }
    exports2.range = range;
    function arrayInsert(target, insertIndex, insertArr) {
      var before = target.slice(0, insertIndex);
      var after = target.slice(insertIndex);
      return before.concat(insertArr, after);
    }
    exports2.arrayInsert = arrayInsert;
    function pushToStart(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
        arr.unshift(value);
      }
    }
    exports2.pushToStart = pushToStart;
    function pushToEnd(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
        arr.push(value);
      }
    }
    exports2.pushToEnd = pushToEnd;
    function find(arr, predicate) {
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        if (predicate(element, i, arr)) {
          return element;
        }
      }
      return void 0;
    }
    exports2.find = find;
    function asArray(x) {
      return Array.isArray(x) ? x : [x];
    }
    exports2.asArray = asArray;
  });
  define(__m[14], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var DiffChange = function() {
      function DiffChange2(originalStart, originalLength, modifiedStart, modifiedLength) {
        this.originalStart = originalStart;
        this.originalLength = originalLength;
        this.modifiedStart = modifiedStart;
        this.modifiedLength = modifiedLength;
      }
      DiffChange2.prototype.getOriginalEnd = function() {
        return this.originalStart + this.originalLength;
      };
      DiffChange2.prototype.getModifiedEnd = function() {
        return this.modifiedStart + this.modifiedLength;
      };
      return DiffChange2;
    }();
    exports2.DiffChange = DiffChange;
  });
  define(__m[3], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var ErrorHandler = function() {
      function ErrorHandler2() {
        this.listeners = [];
        this.unexpectedErrorHandler = function(e) {
          setTimeout(function() {
            if (e.stack) {
              throw new Error(e.message + "\n\n" + e.stack);
            }
            throw e;
          }, 0);
        };
      }
      ErrorHandler2.prototype.emit = function(e) {
        this.listeners.forEach(function(listener) {
          listener(e);
        });
      };
      ErrorHandler2.prototype.onUnexpectedError = function(e) {
        this.unexpectedErrorHandler(e);
        this.emit(e);
      };
      ErrorHandler2.prototype.onUnexpectedExternalError = function(e) {
        this.unexpectedErrorHandler(e);
      };
      return ErrorHandler2;
    }();
    exports2.ErrorHandler = ErrorHandler;
    exports2.errorHandler = new ErrorHandler();
    function onUnexpectedError(e) {
      if (!isPromiseCanceledError(e)) {
        exports2.errorHandler.onUnexpectedError(e);
      }
      return void 0;
    }
    exports2.onUnexpectedError = onUnexpectedError;
    function onUnexpectedExternalError(e) {
      if (!isPromiseCanceledError(e)) {
        exports2.errorHandler.onUnexpectedExternalError(e);
      }
      return void 0;
    }
    exports2.onUnexpectedExternalError = onUnexpectedExternalError;
    function transformErrorForSerialization(error) {
      if (error instanceof Error) {
        var name_1 = error.name, message = error.message;
        var stack = error.stacktrace || error.stack;
        return {
          $isError: true,
          name: name_1,
          message,
          stack
        };
      }
      return error;
    }
    exports2.transformErrorForSerialization = transformErrorForSerialization;
    var canceledName = "Canceled";
    function isPromiseCanceledError(error) {
      return error instanceof Error && error.name === canceledName && error.message === canceledName;
    }
    exports2.isPromiseCanceledError = isPromiseCanceledError;
    function canceled() {
      var error = new Error(canceledName);
      error.name = error.message;
      return error;
    }
    exports2.canceled = canceled;
    function illegalArgument(name) {
      if (name) {
        return new Error("Illegal argument: " + name);
      } else {
        return new Error("Illegal argument");
      }
    }
    exports2.illegalArgument = illegalArgument;
    function illegalState(name) {
      if (name) {
        return new Error("Illegal state: " + name);
      } else {
        return new Error("Illegal state");
      }
    }
    exports2.illegalState = illegalState;
  });
  define(__m[15], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function once(fn) {
      var _this = this;
      var didCall = false;
      var result;
      return function() {
        if (didCall) {
          return result;
        }
        didCall = true;
        result = fn.apply(_this, arguments);
        return result;
      };
    }
    exports2.once = once;
  });
  define(__m[16], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function hash(obj, hashVal) {
      if (hashVal === void 0) {
        hashVal = 0;
      }
      switch (typeof obj) {
        case "object":
          if (obj === null) {
            return numberHash(349, hashVal);
          } else if (Array.isArray(obj)) {
            return arrayHash(obj, hashVal);
          }
          return objectHash(obj, hashVal);
        case "string":
          return stringHash(obj, hashVal);
        case "boolean":
          return booleanHash(obj, hashVal);
        case "number":
          return numberHash(obj, hashVal);
        case "undefined":
          return numberHash(0, 937);
        default:
          return numberHash(0, 617);
      }
    }
    exports2.hash = hash;
    function numberHash(val, initialHashVal) {
      return (initialHashVal << 5) - initialHashVal + val | 0;
    }
    function booleanHash(b, initialHashVal) {
      return numberHash(b ? 433 : 863, initialHashVal);
    }
    function stringHash(s, hashVal) {
      hashVal = numberHash(149417, hashVal);
      for (var i = 0, length_1 = s.length; i < length_1; i++) {
        hashVal = numberHash(s.charCodeAt(i), hashVal);
      }
      return hashVal;
    }
    exports2.stringHash = stringHash;
    function arrayHash(arr, initialHashVal) {
      initialHashVal = numberHash(104579, initialHashVal);
      return arr.reduce(function(hashVal, item) {
        return hash(item, hashVal);
      }, initialHashVal);
    }
    function objectHash(obj, initialHashVal) {
      initialHashVal = numberHash(181387, initialHashVal);
      return Object.keys(obj).sort().reduce(function(hashVal, key) {
        hashVal = stringHash(key, hashVal);
        return hash(obj[key], hashVal);
      }, initialHashVal);
    }
  });
  define(__m[6], __M([0, 1, 14, 16]), function(require2, exports2, diffChange_1, hash_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var StringDiffSequence = function() {
      function StringDiffSequence2(source) {
        this.source = source;
      }
      StringDiffSequence2.prototype.getElements = function() {
        var source = this.source;
        var characters = new Int32Array(source.length);
        for (var i = 0, len = source.length; i < len; i++) {
          characters[i] = source.charCodeAt(i);
        }
        return characters;
      };
      return StringDiffSequence2;
    }();
    exports2.StringDiffSequence = StringDiffSequence;
    function stringDiff(original, modified, pretty) {
      return new LcsDiff(new StringDiffSequence(original), new StringDiffSequence(modified)).ComputeDiff(pretty).changes;
    }
    exports2.stringDiff = stringDiff;
    var Debug = function() {
      function Debug2() {
      }
      Debug2.Assert = function(condition, message) {
        if (!condition) {
          throw new Error(message);
        }
      };
      return Debug2;
    }();
    exports2.Debug = Debug;
    var MyArray = function() {
      function MyArray2() {
      }
      MyArray2.Copy = function(sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
        for (var i = 0; i < length; i++) {
          destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
        }
      };
      MyArray2.Copy2 = function(sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
        for (var i = 0; i < length; i++) {
          destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
        }
      };
      return MyArray2;
    }();
    exports2.MyArray = MyArray;
    var DiffChangeHelper = function() {
      function DiffChangeHelper2() {
        this.m_changes = [];
        this.m_originalStart = 1073741824;
        this.m_modifiedStart = 1073741824;
        this.m_originalCount = 0;
        this.m_modifiedCount = 0;
      }
      DiffChangeHelper2.prototype.MarkNextChange = function() {
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
          this.m_changes.push(new diffChange_1.DiffChange(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount));
        }
        this.m_originalCount = 0;
        this.m_modifiedCount = 0;
        this.m_originalStart = 1073741824;
        this.m_modifiedStart = 1073741824;
      };
      DiffChangeHelper2.prototype.AddOriginalElement = function(originalIndex, modifiedIndex) {
        this.m_originalStart = Math.min(this.m_originalStart, originalIndex);
        this.m_modifiedStart = Math.min(this.m_modifiedStart, modifiedIndex);
        this.m_originalCount++;
      };
      DiffChangeHelper2.prototype.AddModifiedElement = function(originalIndex, modifiedIndex) {
        this.m_originalStart = Math.min(this.m_originalStart, originalIndex);
        this.m_modifiedStart = Math.min(this.m_modifiedStart, modifiedIndex);
        this.m_modifiedCount++;
      };
      DiffChangeHelper2.prototype.getChanges = function() {
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
          this.MarkNextChange();
        }
        return this.m_changes;
      };
      DiffChangeHelper2.prototype.getReverseChanges = function() {
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
          this.MarkNextChange();
        }
        this.m_changes.reverse();
        return this.m_changes;
      };
      return DiffChangeHelper2;
    }();
    var LcsDiff = function() {
      function LcsDiff2(originalSequence, modifiedSequence, continueProcessingPredicate) {
        if (continueProcessingPredicate === void 0) {
          continueProcessingPredicate = null;
        }
        this.ContinueProcessingPredicate = continueProcessingPredicate;
        var _a = LcsDiff2._getElements(originalSequence), originalStringElements = _a[0], originalElementsOrHash = _a[1], originalHasStrings = _a[2];
        var _b = LcsDiff2._getElements(modifiedSequence), modifiedStringElements = _b[0], modifiedElementsOrHash = _b[1], modifiedHasStrings = _b[2];
        this._hasStrings = originalHasStrings && modifiedHasStrings;
        this._originalStringElements = originalStringElements;
        this._originalElementsOrHash = originalElementsOrHash;
        this._modifiedStringElements = modifiedStringElements;
        this._modifiedElementsOrHash = modifiedElementsOrHash;
        this.m_forwardHistory = [];
        this.m_reverseHistory = [];
      }
      LcsDiff2._isStringArray = function(arr) {
        return arr.length > 0 && typeof arr[0] === "string";
      };
      LcsDiff2._getElements = function(sequence) {
        var elements = sequence.getElements();
        if (LcsDiff2._isStringArray(elements)) {
          var hashes = new Int32Array(elements.length);
          for (var i = 0, len = elements.length; i < len; i++) {
            hashes[i] = hash_1.stringHash(elements[i], 0);
          }
          return [elements, hashes, true];
        }
        if (elements instanceof Int32Array) {
          return [[], elements, false];
        }
        return [[], new Int32Array(elements), false];
      };
      LcsDiff2.prototype.ElementsAreEqual = function(originalIndex, newIndex) {
        if (this._originalElementsOrHash[originalIndex] !== this._modifiedElementsOrHash[newIndex]) {
          return false;
        }
        return this._hasStrings ? this._originalStringElements[originalIndex] === this._modifiedStringElements[newIndex] : true;
      };
      LcsDiff2.prototype.OriginalElementsAreEqual = function(index1, index2) {
        if (this._originalElementsOrHash[index1] !== this._originalElementsOrHash[index2]) {
          return false;
        }
        return this._hasStrings ? this._originalStringElements[index1] === this._originalStringElements[index2] : true;
      };
      LcsDiff2.prototype.ModifiedElementsAreEqual = function(index1, index2) {
        if (this._modifiedElementsOrHash[index1] !== this._modifiedElementsOrHash[index2]) {
          return false;
        }
        return this._hasStrings ? this._modifiedStringElements[index1] === this._modifiedStringElements[index2] : true;
      };
      LcsDiff2.prototype.ComputeDiff = function(pretty) {
        return this._ComputeDiff(0, this._originalElementsOrHash.length - 1, 0, this._modifiedElementsOrHash.length - 1, pretty);
      };
      LcsDiff2.prototype._ComputeDiff = function(originalStart, originalEnd, modifiedStart, modifiedEnd, pretty) {
        var quitEarlyArr = [false];
        var changes = this.ComputeDiffRecursive(originalStart, originalEnd, modifiedStart, modifiedEnd, quitEarlyArr);
        if (pretty) {
          changes = this.PrettifyChanges(changes);
        }
        return {
          quitEarly: quitEarlyArr[0],
          changes
        };
      };
      LcsDiff2.prototype.ComputeDiffRecursive = function(originalStart, originalEnd, modifiedStart, modifiedEnd, quitEarlyArr) {
        quitEarlyArr[0] = false;
        while (originalStart <= originalEnd && modifiedStart <= modifiedEnd && this.ElementsAreEqual(originalStart, modifiedStart)) {
          originalStart++;
          modifiedStart++;
        }
        while (originalEnd >= originalStart && modifiedEnd >= modifiedStart && this.ElementsAreEqual(originalEnd, modifiedEnd)) {
          originalEnd--;
          modifiedEnd--;
        }
        if (originalStart > originalEnd || modifiedStart > modifiedEnd) {
          var changes = void 0;
          if (modifiedStart <= modifiedEnd) {
            Debug.Assert(originalStart === originalEnd + 1, "originalStart should only be one more than originalEnd");
            changes = [new diffChange_1.DiffChange(originalStart, 0, modifiedStart, modifiedEnd - modifiedStart + 1)];
          } else if (originalStart <= originalEnd) {
            Debug.Assert(modifiedStart === modifiedEnd + 1, "modifiedStart should only be one more than modifiedEnd");
            changes = [new diffChange_1.DiffChange(originalStart, originalEnd - originalStart + 1, modifiedStart, 0)];
          } else {
            Debug.Assert(originalStart === originalEnd + 1, "originalStart should only be one more than originalEnd");
            Debug.Assert(modifiedStart === modifiedEnd + 1, "modifiedStart should only be one more than modifiedEnd");
            changes = [];
          }
          return changes;
        }
        var midOriginalArr = [0];
        var midModifiedArr = [0];
        var result = this.ComputeRecursionPoint(originalStart, originalEnd, modifiedStart, modifiedEnd, midOriginalArr, midModifiedArr, quitEarlyArr);
        var midOriginal = midOriginalArr[0];
        var midModified = midModifiedArr[0];
        if (result !== null) {
          return result;
        } else if (!quitEarlyArr[0]) {
          var leftChanges = this.ComputeDiffRecursive(originalStart, midOriginal, modifiedStart, midModified, quitEarlyArr);
          var rightChanges = [];
          if (!quitEarlyArr[0]) {
            rightChanges = this.ComputeDiffRecursive(midOriginal + 1, originalEnd, midModified + 1, modifiedEnd, quitEarlyArr);
          } else {
            rightChanges = [new diffChange_1.DiffChange(midOriginal + 1, originalEnd - (midOriginal + 1) + 1, midModified + 1, modifiedEnd - (midModified + 1) + 1)];
          }
          return this.ConcatenateChanges(leftChanges, rightChanges);
        }
        return [new diffChange_1.DiffChange(originalStart, originalEnd - originalStart + 1, modifiedStart, modifiedEnd - modifiedStart + 1)];
      };
      LcsDiff2.prototype.WALKTRACE = function(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr) {
        var forwardChanges = null;
        var reverseChanges = null;
        var changeHelper = new DiffChangeHelper();
        var diagonalMin = diagonalForwardStart;
        var diagonalMax = diagonalForwardEnd;
        var diagonalRelative = midOriginalArr[0] - midModifiedArr[0] - diagonalForwardOffset;
        var lastOriginalIndex = -1073741824;
        var historyIndex = this.m_forwardHistory.length - 1;
        do {
          var diagonal = diagonalRelative + diagonalForwardBase;
          if (diagonal === diagonalMin || diagonal < diagonalMax && forwardPoints[diagonal - 1] < forwardPoints[diagonal + 1]) {
            originalIndex = forwardPoints[diagonal + 1];
            modifiedIndex = originalIndex - diagonalRelative - diagonalForwardOffset;
            if (originalIndex < lastOriginalIndex) {
              changeHelper.MarkNextChange();
            }
            lastOriginalIndex = originalIndex;
            changeHelper.AddModifiedElement(originalIndex + 1, modifiedIndex);
            diagonalRelative = diagonal + 1 - diagonalForwardBase;
          } else {
            originalIndex = forwardPoints[diagonal - 1] + 1;
            modifiedIndex = originalIndex - diagonalRelative - diagonalForwardOffset;
            if (originalIndex < lastOriginalIndex) {
              changeHelper.MarkNextChange();
            }
            lastOriginalIndex = originalIndex - 1;
            changeHelper.AddOriginalElement(originalIndex, modifiedIndex + 1);
            diagonalRelative = diagonal - 1 - diagonalForwardBase;
          }
          if (historyIndex >= 0) {
            forwardPoints = this.m_forwardHistory[historyIndex];
            diagonalForwardBase = forwardPoints[0];
            diagonalMin = 1;
            diagonalMax = forwardPoints.length - 1;
          }
        } while (--historyIndex >= -1);
        forwardChanges = changeHelper.getReverseChanges();
        if (quitEarlyArr[0]) {
          var originalStartPoint = midOriginalArr[0] + 1;
          var modifiedStartPoint = midModifiedArr[0] + 1;
          if (forwardChanges !== null && forwardChanges.length > 0) {
            var lastForwardChange = forwardChanges[forwardChanges.length - 1];
            originalStartPoint = Math.max(originalStartPoint, lastForwardChange.getOriginalEnd());
            modifiedStartPoint = Math.max(modifiedStartPoint, lastForwardChange.getModifiedEnd());
          }
          reverseChanges = [new diffChange_1.DiffChange(originalStartPoint, originalEnd - originalStartPoint + 1, modifiedStartPoint, modifiedEnd - modifiedStartPoint + 1)];
        } else {
          changeHelper = new DiffChangeHelper();
          diagonalMin = diagonalReverseStart;
          diagonalMax = diagonalReverseEnd;
          diagonalRelative = midOriginalArr[0] - midModifiedArr[0] - diagonalReverseOffset;
          lastOriginalIndex = 1073741824;
          historyIndex = deltaIsEven ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
          do {
            var diagonal = diagonalRelative + diagonalReverseBase;
            if (diagonal === diagonalMin || diagonal < diagonalMax && reversePoints[diagonal - 1] >= reversePoints[diagonal + 1]) {
              originalIndex = reversePoints[diagonal + 1] - 1;
              modifiedIndex = originalIndex - diagonalRelative - diagonalReverseOffset;
              if (originalIndex > lastOriginalIndex) {
                changeHelper.MarkNextChange();
              }
              lastOriginalIndex = originalIndex + 1;
              changeHelper.AddOriginalElement(originalIndex + 1, modifiedIndex + 1);
              diagonalRelative = diagonal + 1 - diagonalReverseBase;
            } else {
              originalIndex = reversePoints[diagonal - 1];
              modifiedIndex = originalIndex - diagonalRelative - diagonalReverseOffset;
              if (originalIndex > lastOriginalIndex) {
                changeHelper.MarkNextChange();
              }
              lastOriginalIndex = originalIndex;
              changeHelper.AddModifiedElement(originalIndex + 1, modifiedIndex + 1);
              diagonalRelative = diagonal - 1 - diagonalReverseBase;
            }
            if (historyIndex >= 0) {
              reversePoints = this.m_reverseHistory[historyIndex];
              diagonalReverseBase = reversePoints[0];
              diagonalMin = 1;
              diagonalMax = reversePoints.length - 1;
            }
          } while (--historyIndex >= -1);
          reverseChanges = changeHelper.getChanges();
        }
        return this.ConcatenateChanges(forwardChanges, reverseChanges);
      };
      LcsDiff2.prototype.ComputeRecursionPoint = function(originalStart, originalEnd, modifiedStart, modifiedEnd, midOriginalArr, midModifiedArr, quitEarlyArr) {
        var originalIndex = 0, modifiedIndex = 0;
        var diagonalForwardStart = 0, diagonalForwardEnd = 0;
        var diagonalReverseStart = 0, diagonalReverseEnd = 0;
        originalStart--;
        modifiedStart--;
        midOriginalArr[0] = 0;
        midModifiedArr[0] = 0;
        this.m_forwardHistory = [];
        this.m_reverseHistory = [];
        var maxDifferences = originalEnd - originalStart + (modifiedEnd - modifiedStart);
        var numDiagonals = maxDifferences + 1;
        var forwardPoints = new Int32Array(numDiagonals);
        var reversePoints = new Int32Array(numDiagonals);
        var diagonalForwardBase = modifiedEnd - modifiedStart;
        var diagonalReverseBase = originalEnd - originalStart;
        var diagonalForwardOffset = originalStart - modifiedStart;
        var diagonalReverseOffset = originalEnd - modifiedEnd;
        var delta = diagonalReverseBase - diagonalForwardBase;
        var deltaIsEven = delta % 2 === 0;
        forwardPoints[diagonalForwardBase] = originalStart;
        reversePoints[diagonalReverseBase] = originalEnd;
        quitEarlyArr[0] = false;
        for (var numDifferences = 1; numDifferences <= maxDifferences / 2 + 1; numDifferences++) {
          var furthestOriginalIndex = 0;
          var furthestModifiedIndex = 0;
          diagonalForwardStart = this.ClipDiagonalBound(diagonalForwardBase - numDifferences, numDifferences, diagonalForwardBase, numDiagonals);
          diagonalForwardEnd = this.ClipDiagonalBound(diagonalForwardBase + numDifferences, numDifferences, diagonalForwardBase, numDiagonals);
          for (var diagonal = diagonalForwardStart; diagonal <= diagonalForwardEnd; diagonal += 2) {
            if (diagonal === diagonalForwardStart || diagonal < diagonalForwardEnd && forwardPoints[diagonal - 1] < forwardPoints[diagonal + 1]) {
              originalIndex = forwardPoints[diagonal + 1];
            } else {
              originalIndex = forwardPoints[diagonal - 1] + 1;
            }
            modifiedIndex = originalIndex - (diagonal - diagonalForwardBase) - diagonalForwardOffset;
            var tempOriginalIndex = originalIndex;
            while (originalIndex < originalEnd && modifiedIndex < modifiedEnd && this.ElementsAreEqual(originalIndex + 1, modifiedIndex + 1)) {
              originalIndex++;
              modifiedIndex++;
            }
            forwardPoints[diagonal] = originalIndex;
            if (originalIndex + modifiedIndex > furthestOriginalIndex + furthestModifiedIndex) {
              furthestOriginalIndex = originalIndex;
              furthestModifiedIndex = modifiedIndex;
            }
            if (!deltaIsEven && Math.abs(diagonal - diagonalReverseBase) <= numDifferences - 1) {
              if (originalIndex >= reversePoints[diagonal]) {
                midOriginalArr[0] = originalIndex;
                midModifiedArr[0] = modifiedIndex;
                if (tempOriginalIndex <= reversePoints[diagonal] && 1447 > 0 && numDifferences <= 1447 + 1) {
                  return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                } else {
                  return null;
                }
              }
            }
          }
          var matchLengthOfLongest = (furthestOriginalIndex - originalStart + (furthestModifiedIndex - modifiedStart) - numDifferences) / 2;
          if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(furthestOriginalIndex, matchLengthOfLongest)) {
            quitEarlyArr[0] = true;
            midOriginalArr[0] = furthestOriginalIndex;
            midModifiedArr[0] = furthestModifiedIndex;
            if (matchLengthOfLongest > 0 && 1447 > 0 && numDifferences <= 1447 + 1) {
              return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
            } else {
              originalStart++;
              modifiedStart++;
              return [new diffChange_1.DiffChange(originalStart, originalEnd - originalStart + 1, modifiedStart, modifiedEnd - modifiedStart + 1)];
            }
          }
          diagonalReverseStart = this.ClipDiagonalBound(diagonalReverseBase - numDifferences, numDifferences, diagonalReverseBase, numDiagonals);
          diagonalReverseEnd = this.ClipDiagonalBound(diagonalReverseBase + numDifferences, numDifferences, diagonalReverseBase, numDiagonals);
          for (var diagonal = diagonalReverseStart; diagonal <= diagonalReverseEnd; diagonal += 2) {
            if (diagonal === diagonalReverseStart || diagonal < diagonalReverseEnd && reversePoints[diagonal - 1] >= reversePoints[diagonal + 1]) {
              originalIndex = reversePoints[diagonal + 1] - 1;
            } else {
              originalIndex = reversePoints[diagonal - 1];
            }
            modifiedIndex = originalIndex - (diagonal - diagonalReverseBase) - diagonalReverseOffset;
            var tempOriginalIndex = originalIndex;
            while (originalIndex > originalStart && modifiedIndex > modifiedStart && this.ElementsAreEqual(originalIndex, modifiedIndex)) {
              originalIndex--;
              modifiedIndex--;
            }
            reversePoints[diagonal] = originalIndex;
            if (deltaIsEven && Math.abs(diagonal - diagonalForwardBase) <= numDifferences) {
              if (originalIndex <= forwardPoints[diagonal]) {
                midOriginalArr[0] = originalIndex;
                midModifiedArr[0] = modifiedIndex;
                if (tempOriginalIndex >= forwardPoints[diagonal] && 1447 > 0 && numDifferences <= 1447 + 1) {
                  return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                } else {
                  return null;
                }
              }
            }
          }
          if (numDifferences <= 1447) {
            var temp = new Int32Array(diagonalForwardEnd - diagonalForwardStart + 2);
            temp[0] = diagonalForwardBase - diagonalForwardStart + 1;
            MyArray.Copy2(forwardPoints, diagonalForwardStart, temp, 1, diagonalForwardEnd - diagonalForwardStart + 1);
            this.m_forwardHistory.push(temp);
            temp = new Int32Array(diagonalReverseEnd - diagonalReverseStart + 2);
            temp[0] = diagonalReverseBase - diagonalReverseStart + 1;
            MyArray.Copy2(reversePoints, diagonalReverseStart, temp, 1, diagonalReverseEnd - diagonalReverseStart + 1);
            this.m_reverseHistory.push(temp);
          }
        }
        return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
      };
      LcsDiff2.prototype.PrettifyChanges = function(changes) {
        for (var i = 0; i < changes.length; i++) {
          var change = changes[i];
          var originalStop = i < changes.length - 1 ? changes[i + 1].originalStart : this._originalElementsOrHash.length;
          var modifiedStop = i < changes.length - 1 ? changes[i + 1].modifiedStart : this._modifiedElementsOrHash.length;
          var checkOriginal = change.originalLength > 0;
          var checkModified = change.modifiedLength > 0;
          while (change.originalStart + change.originalLength < originalStop && change.modifiedStart + change.modifiedLength < modifiedStop && (!checkOriginal || this.OriginalElementsAreEqual(change.originalStart, change.originalStart + change.originalLength)) && (!checkModified || this.ModifiedElementsAreEqual(change.modifiedStart, change.modifiedStart + change.modifiedLength))) {
            change.originalStart++;
            change.modifiedStart++;
          }
          var mergedChangeArr = [null];
          if (i < changes.length - 1 && this.ChangesOverlap(changes[i], changes[i + 1], mergedChangeArr)) {
            changes[i] = mergedChangeArr[0];
            changes.splice(i + 1, 1);
            i--;
            continue;
          }
        }
        for (var i = changes.length - 1; i >= 0; i--) {
          var change = changes[i];
          var originalStop = 0;
          var modifiedStop = 0;
          if (i > 0) {
            var prevChange = changes[i - 1];
            if (prevChange.originalLength > 0) {
              originalStop = prevChange.originalStart + prevChange.originalLength;
            }
            if (prevChange.modifiedLength > 0) {
              modifiedStop = prevChange.modifiedStart + prevChange.modifiedLength;
            }
          }
          var checkOriginal = change.originalLength > 0;
          var checkModified = change.modifiedLength > 0;
          var bestDelta = 0;
          var bestScore = this._boundaryScore(change.originalStart, change.originalLength, change.modifiedStart, change.modifiedLength);
          for (var delta = 1; ; delta++) {
            var originalStart = change.originalStart - delta;
            var modifiedStart = change.modifiedStart - delta;
            if (originalStart < originalStop || modifiedStart < modifiedStop) {
              break;
            }
            if (checkOriginal && !this.OriginalElementsAreEqual(originalStart, originalStart + change.originalLength)) {
              break;
            }
            if (checkModified && !this.ModifiedElementsAreEqual(modifiedStart, modifiedStart + change.modifiedLength)) {
              break;
            }
            var score = this._boundaryScore(originalStart, change.originalLength, modifiedStart, change.modifiedLength);
            if (score > bestScore) {
              bestScore = score;
              bestDelta = delta;
            }
          }
          change.originalStart -= bestDelta;
          change.modifiedStart -= bestDelta;
        }
        return changes;
      };
      LcsDiff2.prototype._OriginalIsBoundary = function(index) {
        if (index <= 0 || index >= this._originalElementsOrHash.length - 1) {
          return true;
        }
        return this._hasStrings && /^\s*$/.test(this._originalStringElements[index]);
      };
      LcsDiff2.prototype._OriginalRegionIsBoundary = function(originalStart, originalLength) {
        if (this._OriginalIsBoundary(originalStart) || this._OriginalIsBoundary(originalStart - 1)) {
          return true;
        }
        if (originalLength > 0) {
          var originalEnd = originalStart + originalLength;
          if (this._OriginalIsBoundary(originalEnd - 1) || this._OriginalIsBoundary(originalEnd)) {
            return true;
          }
        }
        return false;
      };
      LcsDiff2.prototype._ModifiedIsBoundary = function(index) {
        if (index <= 0 || index >= this._modifiedElementsOrHash.length - 1) {
          return true;
        }
        return this._hasStrings && /^\s*$/.test(this._modifiedStringElements[index]);
      };
      LcsDiff2.prototype._ModifiedRegionIsBoundary = function(modifiedStart, modifiedLength) {
        if (this._ModifiedIsBoundary(modifiedStart) || this._ModifiedIsBoundary(modifiedStart - 1)) {
          return true;
        }
        if (modifiedLength > 0) {
          var modifiedEnd = modifiedStart + modifiedLength;
          if (this._ModifiedIsBoundary(modifiedEnd - 1) || this._ModifiedIsBoundary(modifiedEnd)) {
            return true;
          }
        }
        return false;
      };
      LcsDiff2.prototype._boundaryScore = function(originalStart, originalLength, modifiedStart, modifiedLength) {
        var originalScore = this._OriginalRegionIsBoundary(originalStart, originalLength) ? 1 : 0;
        var modifiedScore = this._ModifiedRegionIsBoundary(modifiedStart, modifiedLength) ? 1 : 0;
        return originalScore + modifiedScore;
      };
      LcsDiff2.prototype.ConcatenateChanges = function(left, right) {
        var mergedChangeArr = [];
        if (left.length === 0 || right.length === 0) {
          return right.length > 0 ? right : left;
        } else if (this.ChangesOverlap(left[left.length - 1], right[0], mergedChangeArr)) {
          var result = new Array(left.length + right.length - 1);
          MyArray.Copy(left, 0, result, 0, left.length - 1);
          result[left.length - 1] = mergedChangeArr[0];
          MyArray.Copy(right, 1, result, left.length, right.length - 1);
          return result;
        } else {
          var result = new Array(left.length + right.length);
          MyArray.Copy(left, 0, result, 0, left.length);
          MyArray.Copy(right, 0, result, left.length, right.length);
          return result;
        }
      };
      LcsDiff2.prototype.ChangesOverlap = function(left, right, mergedChangeArr) {
        Debug.Assert(left.originalStart <= right.originalStart, "Left change is not less than or equal to right change");
        Debug.Assert(left.modifiedStart <= right.modifiedStart, "Left change is not less than or equal to right change");
        if (left.originalStart + left.originalLength >= right.originalStart || left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
          var originalStart = left.originalStart;
          var originalLength = left.originalLength;
          var modifiedStart = left.modifiedStart;
          var modifiedLength = left.modifiedLength;
          if (left.originalStart + left.originalLength >= right.originalStart) {
            originalLength = right.originalStart + right.originalLength - left.originalStart;
          }
          if (left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
            modifiedLength = right.modifiedStart + right.modifiedLength - left.modifiedStart;
          }
          mergedChangeArr[0] = new diffChange_1.DiffChange(originalStart, originalLength, modifiedStart, modifiedLength);
          return true;
        } else {
          mergedChangeArr[0] = null;
          return false;
        }
      };
      LcsDiff2.prototype.ClipDiagonalBound = function(diagonal, numDifferences, diagonalBaseIndex, numDiagonals) {
        if (diagonal >= 0 && diagonal < numDiagonals) {
          return diagonal;
        }
        var diagonalsBelow = diagonalBaseIndex;
        var diagonalsAbove = numDiagonals - diagonalBaseIndex - 1;
        var diffEven = numDifferences % 2 === 0;
        if (diagonal < 0) {
          var lowerBoundEven = diagonalsBelow % 2 === 0;
          return diffEven === lowerBoundEven ? 0 : 1;
        } else {
          var upperBoundEven = diagonalsAbove % 2 === 0;
          return diffEven === upperBoundEven ? numDiagonals - 1 : numDiagonals - 2;
        }
      };
      return LcsDiff2;
    }();
    exports2.LcsDiff = LcsDiff;
  });
  var __extends = this && this.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (b2.hasOwnProperty(p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  define(__m[7], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.FIN = {
      done: true,
      value: void 0
    };
    var Iterator;
    (function(Iterator2) {
      var _empty = {
        next: function() {
          return exports2.FIN;
        }
      };
      function empty() {
        return _empty;
      }
      Iterator2.empty = empty;
      function single(value) {
        var done = false;
        return {
          next: function() {
            if (done) {
              return exports2.FIN;
            }
            done = true;
            return {
              done: false,
              value
            };
          }
        };
      }
      Iterator2.single = single;
      function fromArray(array, index, length) {
        if (index === void 0) {
          index = 0;
        }
        if (length === void 0) {
          length = array.length;
        }
        return {
          next: function() {
            if (index >= length) {
              return exports2.FIN;
            }
            return {
              done: false,
              value: array[index++]
            };
          }
        };
      }
      Iterator2.fromArray = fromArray;
      function fromNativeIterator(it) {
        return {
          next: function() {
            var result = it.next();
            if (result.done) {
              return exports2.FIN;
            }
            return {
              done: false,
              value: result.value
            };
          }
        };
      }
      Iterator2.fromNativeIterator = fromNativeIterator;
      function from(elements) {
        if (!elements) {
          return Iterator2.empty();
        } else if (Array.isArray(elements)) {
          return Iterator2.fromArray(elements);
        } else {
          return elements;
        }
      }
      Iterator2.from = from;
      function map(iterator, fn) {
        return {
          next: function() {
            var element = iterator.next();
            if (element.done) {
              return exports2.FIN;
            } else {
              return {
                done: false,
                value: fn(element.value)
              };
            }
          }
        };
      }
      Iterator2.map = map;
      function filter(iterator, fn) {
        return {
          next: function() {
            while (true) {
              var element = iterator.next();
              if (element.done) {
                return exports2.FIN;
              }
              if (fn(element.value)) {
                return {
                  done: false,
                  value: element.value
                };
              }
            }
          }
        };
      }
      Iterator2.filter = filter;
      function forEach(iterator, fn) {
        for (var next = iterator.next(); !next.done; next = iterator.next()) {
          fn(next.value);
        }
      }
      Iterator2.forEach = forEach;
      function collect(iterator, atMost) {
        if (atMost === void 0) {
          atMost = Number.POSITIVE_INFINITY;
        }
        var result = [];
        if (atMost === 0) {
          return result;
        }
        var i = 0;
        for (var next = iterator.next(); !next.done; next = iterator.next()) {
          result.push(next.value);
          if (++i >= atMost) {
            break;
          }
        }
        return result;
      }
      Iterator2.collect = collect;
      function concat() {
        var iterators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          iterators[_i] = arguments[_i];
        }
        var i = 0;
        return {
          next: function() {
            if (i >= iterators.length) {
              return exports2.FIN;
            }
            var iterator = iterators[i];
            var result = iterator.next();
            if (result.done) {
              i++;
              return this.next();
            }
            return result;
          }
        };
      }
      Iterator2.concat = concat;
      function chain(iterator) {
        return new ChainableIterator(iterator);
      }
      Iterator2.chain = chain;
    })(Iterator = exports2.Iterator || (exports2.Iterator = {}));
    var ChainableIterator = function() {
      function ChainableIterator2(it) {
        this.it = it;
      }
      ChainableIterator2.prototype.next = function() {
        return this.it.next();
      };
      return ChainableIterator2;
    }();
    exports2.ChainableIterator = ChainableIterator;
    function getSequenceIterator(arg) {
      if (Array.isArray(arg)) {
        return Iterator.fromArray(arg);
      } else if (!arg) {
        return Iterator.empty();
      } else {
        return arg;
      }
    }
    exports2.getSequenceIterator = getSequenceIterator;
    var ArrayIterator = function() {
      function ArrayIterator2(items, start, end, index) {
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = items.length;
        }
        if (index === void 0) {
          index = start - 1;
        }
        this.items = items;
        this.start = start;
        this.end = end;
        this.index = index;
      }
      ArrayIterator2.prototype.first = function() {
        this.index = this.start;
        return this.current();
      };
      ArrayIterator2.prototype.next = function() {
        this.index = Math.min(this.index + 1, this.end);
        return this.current();
      };
      ArrayIterator2.prototype.current = function() {
        if (this.index === this.start - 1 || this.index === this.end) {
          return null;
        }
        return this.items[this.index];
      };
      return ArrayIterator2;
    }();
    exports2.ArrayIterator = ArrayIterator;
    var ArrayNavigator = function(_super) {
      __extends(ArrayNavigator2, _super);
      function ArrayNavigator2(items, start, end, index) {
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = items.length;
        }
        if (index === void 0) {
          index = start - 1;
        }
        return _super.call(this, items, start, end, index) || this;
      }
      ArrayNavigator2.prototype.current = function() {
        return _super.prototype.current.call(this);
      };
      ArrayNavigator2.prototype.previous = function() {
        this.index = Math.max(this.index - 1, this.start - 1);
        return this.current();
      };
      ArrayNavigator2.prototype.first = function() {
        this.index = this.start;
        return this.current();
      };
      ArrayNavigator2.prototype.last = function() {
        this.index = this.end - 1;
        return this.current();
      };
      ArrayNavigator2.prototype.parent = function() {
        return null;
      };
      return ArrayNavigator2;
    }(ArrayIterator);
    exports2.ArrayNavigator = ArrayNavigator;
    var MappedIterator = function() {
      function MappedIterator2(iterator, fn) {
        this.iterator = iterator;
        this.fn = fn;
      }
      MappedIterator2.prototype.next = function() {
        return this.fn(this.iterator.next());
      };
      return MappedIterator2;
    }();
    exports2.MappedIterator = MappedIterator;
  });
  define(__m[17], __M([0, 1, 3]), function(require2, exports2, errors_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var KeyCodeStrMap = function() {
      function KeyCodeStrMap2() {
        this._keyCodeToStr = [];
        this._strToKeyCode = Object.create(null);
      }
      KeyCodeStrMap2.prototype.define = function(keyCode, str) {
        this._keyCodeToStr[keyCode] = str;
        this._strToKeyCode[str.toLowerCase()] = keyCode;
      };
      KeyCodeStrMap2.prototype.keyCodeToStr = function(keyCode) {
        return this._keyCodeToStr[keyCode];
      };
      KeyCodeStrMap2.prototype.strToKeyCode = function(str) {
        return this._strToKeyCode[str.toLowerCase()] || 0;
      };
      return KeyCodeStrMap2;
    }();
    var uiMap = new KeyCodeStrMap();
    var userSettingsUSMap = new KeyCodeStrMap();
    var userSettingsGeneralMap = new KeyCodeStrMap();
    (function() {
      function define2(keyCode, uiLabel, usUserSettingsLabel, generalUserSettingsLabel) {
        if (usUserSettingsLabel === void 0) {
          usUserSettingsLabel = uiLabel;
        }
        if (generalUserSettingsLabel === void 0) {
          generalUserSettingsLabel = usUserSettingsLabel;
        }
        uiMap.define(keyCode, uiLabel);
        userSettingsUSMap.define(keyCode, usUserSettingsLabel);
        userSettingsGeneralMap.define(keyCode, generalUserSettingsLabel);
      }
      define2(0, "unknown");
      define2(1, "Backspace");
      define2(2, "Tab");
      define2(3, "Enter");
      define2(4, "Shift");
      define2(5, "Ctrl");
      define2(6, "Alt");
      define2(7, "PauseBreak");
      define2(8, "CapsLock");
      define2(9, "Escape");
      define2(10, "Space");
      define2(11, "PageUp");
      define2(12, "PageDown");
      define2(13, "End");
      define2(14, "Home");
      define2(15, "LeftArrow", "Left");
      define2(16, "UpArrow", "Up");
      define2(17, "RightArrow", "Right");
      define2(18, "DownArrow", "Down");
      define2(19, "Insert");
      define2(20, "Delete");
      define2(21, "0");
      define2(22, "1");
      define2(23, "2");
      define2(24, "3");
      define2(25, "4");
      define2(26, "5");
      define2(27, "6");
      define2(28, "7");
      define2(29, "8");
      define2(30, "9");
      define2(31, "A");
      define2(32, "B");
      define2(33, "C");
      define2(34, "D");
      define2(35, "E");
      define2(36, "F");
      define2(37, "G");
      define2(38, "H");
      define2(39, "I");
      define2(40, "J");
      define2(41, "K");
      define2(42, "L");
      define2(43, "M");
      define2(44, "N");
      define2(45, "O");
      define2(46, "P");
      define2(47, "Q");
      define2(48, "R");
      define2(49, "S");
      define2(50, "T");
      define2(51, "U");
      define2(52, "V");
      define2(53, "W");
      define2(54, "X");
      define2(55, "Y");
      define2(56, "Z");
      define2(57, "Meta");
      define2(58, "ContextMenu");
      define2(59, "F1");
      define2(60, "F2");
      define2(61, "F3");
      define2(62, "F4");
      define2(63, "F5");
      define2(64, "F6");
      define2(65, "F7");
      define2(66, "F8");
      define2(67, "F9");
      define2(68, "F10");
      define2(69, "F11");
      define2(70, "F12");
      define2(71, "F13");
      define2(72, "F14");
      define2(73, "F15");
      define2(74, "F16");
      define2(75, "F17");
      define2(76, "F18");
      define2(77, "F19");
      define2(78, "NumLock");
      define2(79, "ScrollLock");
      define2(80, ";", ";", "OEM_1");
      define2(81, "=", "=", "OEM_PLUS");
      define2(82, ",", ",", "OEM_COMMA");
      define2(83, "-", "-", "OEM_MINUS");
      define2(84, ".", ".", "OEM_PERIOD");
      define2(85, "/", "/", "OEM_2");
      define2(86, "`", "`", "OEM_3");
      define2(110, "ABNT_C1");
      define2(111, "ABNT_C2");
      define2(87, "[", "[", "OEM_4");
      define2(88, "\\", "\\", "OEM_5");
      define2(89, "]", "]", "OEM_6");
      define2(90, "'", "'", "OEM_7");
      define2(91, "OEM_8");
      define2(92, "OEM_102");
      define2(93, "NumPad0");
      define2(94, "NumPad1");
      define2(95, "NumPad2");
      define2(96, "NumPad3");
      define2(97, "NumPad4");
      define2(98, "NumPad5");
      define2(99, "NumPad6");
      define2(100, "NumPad7");
      define2(101, "NumPad8");
      define2(102, "NumPad9");
      define2(103, "NumPad_Multiply");
      define2(104, "NumPad_Add");
      define2(105, "NumPad_Separator");
      define2(106, "NumPad_Subtract");
      define2(107, "NumPad_Decimal");
      define2(108, "NumPad_Divide");
    })();
    var KeyCodeUtils;
    (function(KeyCodeUtils2) {
      function toString(keyCode) {
        return uiMap.keyCodeToStr(keyCode);
      }
      KeyCodeUtils2.toString = toString;
      function fromString(key) {
        return uiMap.strToKeyCode(key);
      }
      KeyCodeUtils2.fromString = fromString;
      function toUserSettingsUS(keyCode) {
        return userSettingsUSMap.keyCodeToStr(keyCode);
      }
      KeyCodeUtils2.toUserSettingsUS = toUserSettingsUS;
      function toUserSettingsGeneral(keyCode) {
        return userSettingsGeneralMap.keyCodeToStr(keyCode);
      }
      KeyCodeUtils2.toUserSettingsGeneral = toUserSettingsGeneral;
      function fromUserSettings(key) {
        return userSettingsUSMap.strToKeyCode(key) || userSettingsGeneralMap.strToKeyCode(key);
      }
      KeyCodeUtils2.fromUserSettings = fromUserSettings;
    })(KeyCodeUtils = exports2.KeyCodeUtils || (exports2.KeyCodeUtils = {}));
    function KeyChord(firstPart, secondPart) {
      var chordPart = (secondPart & 65535) << 16 >>> 0;
      return (firstPart | chordPart) >>> 0;
    }
    exports2.KeyChord = KeyChord;
    function createKeybinding(keybinding, OS) {
      if (keybinding === 0) {
        return null;
      }
      var firstPart = (keybinding & 65535) >>> 0;
      var chordPart = (keybinding & 4294901760) >>> 16;
      if (chordPart !== 0) {
        return new ChordKeybinding([createSimpleKeybinding(firstPart, OS), createSimpleKeybinding(chordPart, OS)]);
      }
      return new ChordKeybinding([createSimpleKeybinding(firstPart, OS)]);
    }
    exports2.createKeybinding = createKeybinding;
    function createSimpleKeybinding(keybinding, OS) {
      var ctrlCmd = keybinding & 2048 ? true : false;
      var winCtrl = keybinding & 256 ? true : false;
      var ctrlKey = OS === 2 ? winCtrl : ctrlCmd;
      var shiftKey = keybinding & 1024 ? true : false;
      var altKey = keybinding & 512 ? true : false;
      var metaKey = OS === 2 ? ctrlCmd : winCtrl;
      var keyCode = keybinding & 255;
      return new SimpleKeybinding(ctrlKey, shiftKey, altKey, metaKey, keyCode);
    }
    exports2.createSimpleKeybinding = createSimpleKeybinding;
    var SimpleKeybinding = function() {
      function SimpleKeybinding2(ctrlKey, shiftKey, altKey, metaKey, keyCode) {
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.altKey = altKey;
        this.metaKey = metaKey;
        this.keyCode = keyCode;
      }
      SimpleKeybinding2.prototype.equals = function(other) {
        return this.ctrlKey === other.ctrlKey && this.shiftKey === other.shiftKey && this.altKey === other.altKey && this.metaKey === other.metaKey && this.keyCode === other.keyCode;
      };
      SimpleKeybinding2.prototype.isModifierKey = function() {
        return this.keyCode === 0 || this.keyCode === 5 || this.keyCode === 57 || this.keyCode === 6 || this.keyCode === 4;
      };
      SimpleKeybinding2.prototype.toChord = function() {
        return new ChordKeybinding([this]);
      };
      SimpleKeybinding2.prototype.isDuplicateModifierCase = function() {
        return this.ctrlKey && this.keyCode === 5 || this.shiftKey && this.keyCode === 4 || this.altKey && this.keyCode === 6 || this.metaKey && this.keyCode === 57;
      };
      return SimpleKeybinding2;
    }();
    exports2.SimpleKeybinding = SimpleKeybinding;
    var ChordKeybinding = function() {
      function ChordKeybinding2(parts) {
        if (parts.length === 0) {
          throw errors_1.illegalArgument("parts");
        }
        this.parts = parts;
      }
      ChordKeybinding2.prototype.equals = function(other) {
        if (other === null) {
          return false;
        }
        if (this.parts.length !== other.parts.length) {
          return false;
        }
        for (var i = 0; i < this.parts.length; i++) {
          if (!this.parts[i].equals(other.parts[i])) {
            return false;
          }
        }
        return true;
      };
      return ChordKeybinding2;
    }();
    exports2.ChordKeybinding = ChordKeybinding;
    var ResolvedKeybindingPart = function() {
      function ResolvedKeybindingPart2(ctrlKey, shiftKey, altKey, metaKey, kbLabel, kbAriaLabel) {
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.altKey = altKey;
        this.metaKey = metaKey;
        this.keyLabel = kbLabel;
        this.keyAriaLabel = kbAriaLabel;
      }
      return ResolvedKeybindingPart2;
    }();
    exports2.ResolvedKeybindingPart = ResolvedKeybindingPart;
    var ResolvedKeybinding = function() {
      function ResolvedKeybinding2() {
      }
      return ResolvedKeybinding2;
    }();
    exports2.ResolvedKeybinding = ResolvedKeybinding;
  });
  define(__m[8], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var TRACK_DISPOSABLES = false;
    var __is_disposable_tracked__ = "__is_disposable_tracked__";
    function markTracked(x) {
      if (!TRACK_DISPOSABLES) {
        return;
      }
      if (x && x !== Disposable.None) {
        try {
          x[__is_disposable_tracked__] = true;
        } catch (_a) {
        }
      }
    }
    function trackDisposable(x) {
      if (!TRACK_DISPOSABLES) {
        return x;
      }
      var stack = new Error("Potentially leaked disposable").stack;
      setTimeout(function() {
        if (!x[__is_disposable_tracked__]) {
          console.log(stack);
        }
      }, 3000);
      return x;
    }
    function isDisposable(thing) {
      return typeof thing.dispose === "function" && thing.dispose.length === 0;
    }
    exports2.isDisposable = isDisposable;
    function dispose(disposables) {
      if (Array.isArray(disposables)) {
        disposables.forEach(function(d) {
          if (d) {
            markTracked(d);
            d.dispose();
          }
        });
        return [];
      } else if (disposables) {
        markTracked(disposables);
        disposables.dispose();
        return disposables;
      } else {
        return void 0;
      }
    }
    exports2.dispose = dispose;
    function combinedDisposable() {
      var disposables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        disposables[_i] = arguments[_i];
      }
      disposables.forEach(markTracked);
      return trackDisposable({
        dispose: function() {
          return dispose(disposables);
        }
      });
    }
    exports2.combinedDisposable = combinedDisposable;
    function toDisposable(fn) {
      var self2 = trackDisposable({
        dispose: function() {
          markTracked(self2);
          fn();
        }
      });
      return self2;
    }
    exports2.toDisposable = toDisposable;
    var DisposableStore = function() {
      function DisposableStore2() {
        this._toDispose = new Set();
        this._isDisposed = false;
      }
      DisposableStore2.prototype.dispose = function() {
        if (this._isDisposed) {
          return;
        }
        markTracked(this);
        this._isDisposed = true;
        this.clear();
      };
      DisposableStore2.prototype.clear = function() {
        this._toDispose.forEach(function(item) {
          return item.dispose();
        });
        this._toDispose.clear();
      };
      DisposableStore2.prototype.add = function(t) {
        if (!t) {
          return t;
        }
        if (t === this) {
          throw new Error("Cannot register a disposable on itself!");
        }
        markTracked(t);
        if (this._isDisposed) {
          console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack);
        } else {
          this._toDispose.add(t);
        }
        return t;
      };
      return DisposableStore2;
    }();
    exports2.DisposableStore = DisposableStore;
    var Disposable = function() {
      function Disposable2() {
        this._store = new DisposableStore();
        trackDisposable(this);
      }
      Disposable2.prototype.dispose = function() {
        markTracked(this);
        this._store.dispose();
      };
      Disposable2.prototype._register = function(t) {
        if (t === this) {
          throw new Error("Cannot register a disposable on itself!");
        }
        return this._store.add(t);
      };
      Disposable2.None = Object.freeze({
        dispose: function() {
        }
      });
      return Disposable2;
    }();
    exports2.Disposable = Disposable;
    var MutableDisposable = function() {
      function MutableDisposable2() {
        this._isDisposed = false;
        trackDisposable(this);
      }
      Object.defineProperty(MutableDisposable2.prototype, "value", {
        get: function() {
          return this._isDisposed ? void 0 : this._value;
        },
        set: function(value) {
          if (this._isDisposed || value === this._value) {
            return;
          }
          if (this._value) {
            this._value.dispose();
          }
          if (value) {
            markTracked(value);
          }
          this._value = value;
        },
        enumerable: true,
        configurable: true
      });
      MutableDisposable2.prototype.clear = function() {
        this.value = void 0;
      };
      MutableDisposable2.prototype.dispose = function() {
        this._isDisposed = true;
        markTracked(this);
        if (this._value) {
          this._value.dispose();
        }
        this._value = void 0;
      };
      return MutableDisposable2;
    }();
    exports2.MutableDisposable = MutableDisposable;
    var ImmortalReference = function() {
      function ImmortalReference2(object) {
        this.object = object;
      }
      ImmortalReference2.prototype.dispose = function() {
      };
      return ImmortalReference2;
    }();
    exports2.ImmortalReference = ImmortalReference;
  });
  define(__m[18], __M([0, 1, 7]), function(require2, exports2, iterator_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var Node = function() {
      function Node2(element) {
        this.element = element;
        this.next = Node2.Undefined;
        this.prev = Node2.Undefined;
      }
      Node2.Undefined = new Node2(void 0);
      return Node2;
    }();
    var LinkedList = function() {
      function LinkedList2() {
        this._first = Node.Undefined;
        this._last = Node.Undefined;
        this._size = 0;
      }
      Object.defineProperty(LinkedList2.prototype, "size", {
        get: function() {
          return this._size;
        },
        enumerable: true,
        configurable: true
      });
      LinkedList2.prototype.isEmpty = function() {
        return this._first === Node.Undefined;
      };
      LinkedList2.prototype.clear = function() {
        this._first = Node.Undefined;
        this._last = Node.Undefined;
        this._size = 0;
      };
      LinkedList2.prototype.unshift = function(element) {
        return this._insert(element, false);
      };
      LinkedList2.prototype.push = function(element) {
        return this._insert(element, true);
      };
      LinkedList2.prototype._insert = function(element, atTheEnd) {
        var _this = this;
        var newNode = new Node(element);
        if (this._first === Node.Undefined) {
          this._first = newNode;
          this._last = newNode;
        } else if (atTheEnd) {
          var oldLast = this._last;
          this._last = newNode;
          newNode.prev = oldLast;
          oldLast.next = newNode;
        } else {
          var oldFirst = this._first;
          this._first = newNode;
          newNode.next = oldFirst;
          oldFirst.prev = newNode;
        }
        this._size += 1;
        var didRemove = false;
        return function() {
          if (!didRemove) {
            didRemove = true;
            _this._remove(newNode);
          }
        };
      };
      LinkedList2.prototype.shift = function() {
        if (this._first === Node.Undefined) {
          return void 0;
        } else {
          var res = this._first.element;
          this._remove(this._first);
          return res;
        }
      };
      LinkedList2.prototype.pop = function() {
        if (this._last === Node.Undefined) {
          return void 0;
        } else {
          var res = this._last.element;
          this._remove(this._last);
          return res;
        }
      };
      LinkedList2.prototype._remove = function(node) {
        if (node.prev !== Node.Undefined && node.next !== Node.Undefined) {
          var anchor = node.prev;
          anchor.next = node.next;
          node.next.prev = anchor;
        } else if (node.prev === Node.Undefined && node.next === Node.Undefined) {
          this._first = Node.Undefined;
          this._last = Node.Undefined;
        } else if (node.next === Node.Undefined) {
          this._last = this._last.prev;
          this._last.next = Node.Undefined;
        } else if (node.prev === Node.Undefined) {
          this._first = this._first.next;
          this._first.prev = Node.Undefined;
        }
        this._size -= 1;
      };
      LinkedList2.prototype.iterator = function() {
        var element;
        var node = this._first;
        return {
          next: function() {
            if (node === Node.Undefined) {
              return iterator_1.FIN;
            }
            if (!element) {
              element = {
                done: false,
                value: node.element
              };
            } else {
              element.value = node.element;
            }
            node = node.next;
            return element;
          }
        };
      };
      LinkedList2.prototype.toArray = function() {
        var result = [];
        for (var node = this._first; node !== Node.Undefined; node = node.next) {
          result.push(node.element);
        }
        return result;
      };
      return LinkedList2;
    }();
    exports2.LinkedList = LinkedList;
  });
  define(__m[9], __M([0, 1, 3, 15, 8, 18]), function(require2, exports2, errors_1, functional_1, lifecycle_1, linkedList_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var Event;
    (function(Event2) {
      Event2.None = function() {
        return lifecycle_1.Disposable.None;
      };
      function once(event) {
        return function(listener, thisArgs, disposables) {
          if (thisArgs === void 0) {
            thisArgs = null;
          }
          var didFire = false;
          var result;
          result = event(function(e) {
            if (didFire) {
              return;
            } else if (result) {
              result.dispose();
            } else {
              didFire = true;
            }
            return listener.call(thisArgs, e);
          }, null, disposables);
          if (didFire) {
            result.dispose();
          }
          return result;
        };
      }
      Event2.once = once;
      function map(event, map2) {
        return snapshot(function(listener, thisArgs, disposables) {
          if (thisArgs === void 0) {
            thisArgs = null;
          }
          return event(function(i) {
            return listener.call(thisArgs, map2(i));
          }, null, disposables);
        });
      }
      Event2.map = map;
      function forEach(event, each) {
        return snapshot(function(listener, thisArgs, disposables) {
          if (thisArgs === void 0) {
            thisArgs = null;
          }
          return event(function(i) {
            each(i);
            listener.call(thisArgs, i);
          }, null, disposables);
        });
      }
      Event2.forEach = forEach;
      function filter(event, filter2) {
        return snapshot(function(listener, thisArgs, disposables) {
          if (thisArgs === void 0) {
            thisArgs = null;
          }
          return event(function(e) {
            return filter2(e) && listener.call(thisArgs, e);
          }, null, disposables);
        });
      }
      Event2.filter = filter;
      function signal(event) {
        return event;
      }
      Event2.signal = signal;
      function any() {
        var events = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          events[_i] = arguments[_i];
        }
        return function(listener, thisArgs, disposables) {
          if (thisArgs === void 0) {
            thisArgs = null;
          }
          return lifecycle_1.combinedDisposable.apply(void 0, events.map(function(event) {
            return event(function(e) {
              return listener.call(thisArgs, e);
            }, null, disposables);
          }));
        };
      }
      Event2.any = any;
      function reduce(event, merge, initial) {
        var output = initial;
        return map(event, function(e) {
          output = merge(output, e);
          return output;
        });
      }
      Event2.reduce = reduce;
      function snapshot(event) {
        var listener;
        var emitter = new Emitter({
          onFirstListenerAdd: function() {
            listener = event(emitter.fire, emitter);
          },
          onLastListenerRemove: function() {
            listener.dispose();
          }
        });
        return emitter.event;
      }
      Event2.snapshot = snapshot;
      function debounce(event, merge, delay, leading, leakWarningThreshold) {
        if (delay === void 0) {
          delay = 100;
        }
        if (leading === void 0) {
          leading = false;
        }
        var subscription;
        var output = void 0;
        var handle = void 0;
        var numDebouncedCalls = 0;
        var emitter = new Emitter({
          leakWarningThreshold,
          onFirstListenerAdd: function() {
            subscription = event(function(cur) {
              numDebouncedCalls++;
              output = merge(output, cur);
              if (leading && !handle) {
                emitter.fire(output);
                output = void 0;
              }
              clearTimeout(handle);
              handle = setTimeout(function() {
                var _output = output;
                output = void 0;
                handle = void 0;
                if (!leading || numDebouncedCalls > 1) {
                  emitter.fire(_output);
                }
                numDebouncedCalls = 0;
              }, delay);
            });
          },
          onLastListenerRemove: function() {
            subscription.dispose();
          }
        });
        return emitter.event;
      }
      Event2.debounce = debounce;
      function stopwatch(event) {
        var start = new Date().getTime();
        return map(once(event), function(_) {
          return new Date().getTime() - start;
        });
      }
      Event2.stopwatch = stopwatch;
      function latch(event) {
        var firstCall = true;
        var cache;
        return filter(event, function(value) {
          var shouldEmit = firstCall || value !== cache;
          firstCall = false;
          cache = value;
          return shouldEmit;
        });
      }
      Event2.latch = latch;
      function buffer(event, nextTick, _buffer) {
        if (nextTick === void 0) {
          nextTick = false;
        }
        if (_buffer === void 0) {
          _buffer = [];
        }
        var buffer2 = _buffer.slice();
        var listener = event(function(e) {
          if (buffer2) {
            buffer2.push(e);
          } else {
            emitter.fire(e);
          }
        });
        var flush = function() {
          if (buffer2) {
            buffer2.forEach(function(e) {
              return emitter.fire(e);
            });
          }
          buffer2 = null;
        };
        var emitter = new Emitter({
          onFirstListenerAdd: function() {
            if (!listener) {
              listener = event(function(e) {
                return emitter.fire(e);
              });
            }
          },
          onFirstListenerDidAdd: function() {
            if (buffer2) {
              if (nextTick) {
                setTimeout(flush);
              } else {
                flush();
              }
            }
          },
          onLastListenerRemove: function() {
            if (listener) {
              listener.dispose();
            }
            listener = null;
          }
        });
        return emitter.event;
      }
      Event2.buffer = buffer;
      var ChainableEvent = function() {
        function ChainableEvent2(event) {
          this.event = event;
        }
        ChainableEvent2.prototype.map = function(fn) {
          return new ChainableEvent2(map(this.event, fn));
        };
        ChainableEvent2.prototype.forEach = function(fn) {
          return new ChainableEvent2(forEach(this.event, fn));
        };
        ChainableEvent2.prototype.filter = function(fn) {
          return new ChainableEvent2(filter(this.event, fn));
        };
        ChainableEvent2.prototype.reduce = function(merge, initial) {
          return new ChainableEvent2(reduce(this.event, merge, initial));
        };
        ChainableEvent2.prototype.latch = function() {
          return new ChainableEvent2(latch(this.event));
        };
        ChainableEvent2.prototype.debounce = function(merge, delay, leading, leakWarningThreshold) {
          if (delay === void 0) {
            delay = 100;
          }
          if (leading === void 0) {
            leading = false;
          }
          return new ChainableEvent2(debounce(this.event, merge, delay, leading, leakWarningThreshold));
        };
        ChainableEvent2.prototype.on = function(listener, thisArgs, disposables) {
          return this.event(listener, thisArgs, disposables);
        };
        ChainableEvent2.prototype.once = function(listener, thisArgs, disposables) {
          return once(this.event)(listener, thisArgs, disposables);
        };
        return ChainableEvent2;
      }();
      function chain(event) {
        return new ChainableEvent(event);
      }
      Event2.chain = chain;
      function fromNodeEventEmitter(emitter, eventName, map2) {
        if (map2 === void 0) {
          map2 = function(id) {
            return id;
          };
        }
        var fn = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return result.fire(map2.apply(void 0, args));
        };
        var onFirstListenerAdd = function() {
          return emitter.on(eventName, fn);
        };
        var onLastListenerRemove = function() {
          return emitter.removeListener(eventName, fn);
        };
        var result = new Emitter({
          onFirstListenerAdd,
          onLastListenerRemove
        });
        return result.event;
      }
      Event2.fromNodeEventEmitter = fromNodeEventEmitter;
      function fromDOMEventEmitter(emitter, eventName, map2) {
        if (map2 === void 0) {
          map2 = function(id) {
            return id;
          };
        }
        var fn = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return result.fire(map2.apply(void 0, args));
        };
        var onFirstListenerAdd = function() {
          return emitter.addEventListener(eventName, fn);
        };
        var onLastListenerRemove = function() {
          return emitter.removeEventListener(eventName, fn);
        };
        var result = new Emitter({
          onFirstListenerAdd,
          onLastListenerRemove
        });
        return result.event;
      }
      Event2.fromDOMEventEmitter = fromDOMEventEmitter;
      function fromPromise(promise) {
        var emitter = new Emitter();
        var shouldEmit = false;
        promise.then(void 0, function() {
          return null;
        }).then(function() {
          if (!shouldEmit) {
            setTimeout(function() {
              return emitter.fire(void 0);
            }, 0);
          } else {
            emitter.fire(void 0);
          }
        });
        shouldEmit = true;
        return emitter.event;
      }
      Event2.fromPromise = fromPromise;
      function toPromise(event) {
        return new Promise(function(c) {
          return once(event)(c);
        });
      }
      Event2.toPromise = toPromise;
    })(Event = exports2.Event || (exports2.Event = {}));
    var _globalLeakWarningThreshold = -1;
    var LeakageMonitor = function() {
      function LeakageMonitor2(customThreshold, name) {
        if (name === void 0) {
          name = Math.random().toString(18).slice(2, 5);
        }
        this.customThreshold = customThreshold;
        this.name = name;
        this._warnCountdown = 0;
      }
      LeakageMonitor2.prototype.dispose = function() {
        if (this._stacks) {
          this._stacks.clear();
        }
      };
      LeakageMonitor2.prototype.check = function(listenerCount) {
        var _this = this;
        var threshold = _globalLeakWarningThreshold;
        if (typeof this.customThreshold === "number") {
          threshold = this.customThreshold;
        }
        if (threshold <= 0 || listenerCount < threshold) {
          return void 0;
        }
        if (!this._stacks) {
          this._stacks = new Map();
        }
        var stack = new Error().stack.split("\n").slice(3).join("\n");
        var count = this._stacks.get(stack) || 0;
        this._stacks.set(stack, count + 1);
        this._warnCountdown -= 1;
        if (this._warnCountdown <= 0) {
          this._warnCountdown = threshold * 0.5;
          var topStack_1;
          var topCount_1 = 0;
          this._stacks.forEach(function(count2, stack2) {
            if (!topStack_1 || topCount_1 < count2) {
              topStack_1 = stack2;
              topCount_1 = count2;
            }
          });
          console.warn("[" + this.name + "] potential listener LEAK detected, having " + listenerCount + " listeners already. MOST frequent listener (" + topCount_1 + "):");
          console.warn(topStack_1);
        }
        return function() {
          var count2 = _this._stacks.get(stack) || 0;
          _this._stacks.set(stack, count2 - 1);
        };
      };
      return LeakageMonitor2;
    }();
    var Emitter = function() {
      function Emitter2(options) {
        this._disposed = false;
        this._options = options;
        this._leakageMon = _globalLeakWarningThreshold > 0 ? new LeakageMonitor(this._options && this._options.leakWarningThreshold) : void 0;
      }
      Object.defineProperty(Emitter2.prototype, "event", {
        get: function() {
          var _this = this;
          if (!this._event) {
            this._event = function(listener, thisArgs, disposables) {
              if (!_this._listeners) {
                _this._listeners = new linkedList_1.LinkedList();
              }
              var firstListener = _this._listeners.isEmpty();
              if (firstListener && _this._options && _this._options.onFirstListenerAdd) {
                _this._options.onFirstListenerAdd(_this);
              }
              var remove = _this._listeners.push(!thisArgs ? listener : [listener, thisArgs]);
              if (firstListener && _this._options && _this._options.onFirstListenerDidAdd) {
                _this._options.onFirstListenerDidAdd(_this);
              }
              if (_this._options && _this._options.onListenerDidAdd) {
                _this._options.onListenerDidAdd(_this, listener, thisArgs);
              }
              var removeMonitor;
              if (_this._leakageMon) {
                removeMonitor = _this._leakageMon.check(_this._listeners.size);
              }
              var result;
              result = {
                dispose: function() {
                  if (removeMonitor) {
                    removeMonitor();
                  }
                  result.dispose = Emitter2._noop;
                  if (!_this._disposed) {
                    remove();
                    if (_this._options && _this._options.onLastListenerRemove) {
                      var hasListeners = _this._listeners && !_this._listeners.isEmpty();
                      if (!hasListeners) {
                        _this._options.onLastListenerRemove(_this);
                      }
                    }
                  }
                }
              };
              if (disposables instanceof lifecycle_1.DisposableStore) {
                disposables.add(result);
              } else if (Array.isArray(disposables)) {
                disposables.push(result);
              }
              return result;
            };
          }
          return this._event;
        },
        enumerable: true,
        configurable: true
      });
      Emitter2.prototype.fire = function(event) {
        if (this._listeners) {
          if (!this._deliveryQueue) {
            this._deliveryQueue = new linkedList_1.LinkedList();
          }
          for (var iter = this._listeners.iterator(), e = iter.next(); !e.done; e = iter.next()) {
            this._deliveryQueue.push([e.value, event]);
          }
          while (this._deliveryQueue.size > 0) {
            var _a = this._deliveryQueue.shift(), listener = _a[0], event_1 = _a[1];
            try {
              if (typeof listener === "function") {
                listener.call(void 0, event_1);
              } else {
                listener[0].call(listener[1], event_1);
              }
            } catch (e2) {
              errors_1.onUnexpectedError(e2);
            }
          }
        }
      };
      Emitter2.prototype.dispose = function() {
        if (this._listeners) {
          this._listeners.clear();
        }
        if (this._deliveryQueue) {
          this._deliveryQueue.clear();
        }
        if (this._leakageMon) {
          this._leakageMon.dispose();
        }
        this._disposed = true;
      };
      Emitter2._noop = function() {
      };
      return Emitter2;
    }();
    exports2.Emitter = Emitter;
    var PauseableEmitter = function(_super) {
      __extends(PauseableEmitter2, _super);
      function PauseableEmitter2(options) {
        var _this = _super.call(this, options) || this;
        _this._isPaused = 0;
        _this._eventQueue = new linkedList_1.LinkedList();
        _this._mergeFn = options && options.merge;
        return _this;
      }
      PauseableEmitter2.prototype.pause = function() {
        this._isPaused++;
      };
      PauseableEmitter2.prototype.resume = function() {
        if (this._isPaused !== 0 && --this._isPaused === 0) {
          if (this._mergeFn) {
            var events = this._eventQueue.toArray();
            this._eventQueue.clear();
            _super.prototype.fire.call(this, this._mergeFn(events));
          } else {
            while (!this._isPaused && this._eventQueue.size !== 0) {
              _super.prototype.fire.call(this, this._eventQueue.shift());
            }
          }
        }
      };
      PauseableEmitter2.prototype.fire = function(event) {
        if (this._listeners) {
          if (this._isPaused !== 0) {
            this._eventQueue.push(event);
          } else {
            _super.prototype.fire.call(this, event);
          }
        }
      };
      return PauseableEmitter2;
    }(Emitter);
    exports2.PauseableEmitter = PauseableEmitter;
    var EventMultiplexer = function() {
      function EventMultiplexer2() {
        var _this = this;
        this.hasListeners = false;
        this.events = [];
        this.emitter = new Emitter({
          onFirstListenerAdd: function() {
            return _this.onFirstListenerAdd();
          },
          onLastListenerRemove: function() {
            return _this.onLastListenerRemove();
          }
        });
      }
      Object.defineProperty(EventMultiplexer2.prototype, "event", {
        get: function() {
          return this.emitter.event;
        },
        enumerable: true,
        configurable: true
      });
      EventMultiplexer2.prototype.add = function(event) {
        var _this = this;
        var e = {
          event,
          listener: null
        };
        this.events.push(e);
        if (this.hasListeners) {
          this.hook(e);
        }
        var dispose = function() {
          if (_this.hasListeners) {
            _this.unhook(e);
          }
          var idx = _this.events.indexOf(e);
          _this.events.splice(idx, 1);
        };
        return lifecycle_1.toDisposable(functional_1.once(dispose));
      };
      EventMultiplexer2.prototype.onFirstListenerAdd = function() {
        var _this = this;
        this.hasListeners = true;
        this.events.forEach(function(e) {
          return _this.hook(e);
        });
      };
      EventMultiplexer2.prototype.onLastListenerRemove = function() {
        var _this = this;
        this.hasListeners = false;
        this.events.forEach(function(e) {
          return _this.unhook(e);
        });
      };
      EventMultiplexer2.prototype.hook = function(e) {
        var _this = this;
        e.listener = e.event(function(r) {
          return _this.emitter.fire(r);
        });
      };
      EventMultiplexer2.prototype.unhook = function(e) {
        if (e.listener) {
          e.listener.dispose();
        }
        e.listener = null;
      };
      EventMultiplexer2.prototype.dispose = function() {
        this.emitter.dispose();
      };
      return EventMultiplexer2;
    }();
    exports2.EventMultiplexer = EventMultiplexer;
    var EventBufferer = function() {
      function EventBufferer2() {
        this.buffers = [];
      }
      EventBufferer2.prototype.wrapEvent = function(event) {
        var _this = this;
        return function(listener, thisArgs, disposables) {
          return event(function(i) {
            var buffer = _this.buffers[_this.buffers.length - 1];
            if (buffer) {
              buffer.push(function() {
                return listener.call(thisArgs, i);
              });
            } else {
              listener.call(thisArgs, i);
            }
          }, void 0, disposables);
        };
      };
      EventBufferer2.prototype.bufferEvents = function(fn) {
        var buffer = [];
        this.buffers.push(buffer);
        var r = fn();
        this.buffers.pop();
        buffer.forEach(function(flush) {
          return flush();
        });
        return r;
      };
      return EventBufferer2;
    }();
    exports2.EventBufferer = EventBufferer;
    var Relay = function() {
      function Relay2() {
        var _this = this;
        this.listening = false;
        this.inputEvent = Event.None;
        this.inputEventListener = lifecycle_1.Disposable.None;
        this.emitter = new Emitter({
          onFirstListenerDidAdd: function() {
            _this.listening = true;
            _this.inputEventListener = _this.inputEvent(_this.emitter.fire, _this.emitter);
          },
          onLastListenerRemove: function() {
            _this.listening = false;
            _this.inputEventListener.dispose();
          }
        });
        this.event = this.emitter.event;
      }
      Object.defineProperty(Relay2.prototype, "input", {
        set: function(event) {
          this.inputEvent = event;
          if (this.listening) {
            this.inputEventListener.dispose();
            this.inputEventListener = event(this.emitter.fire, this.emitter);
          }
        },
        enumerable: true,
        configurable: true
      });
      Relay2.prototype.dispose = function() {
        this.inputEventListener.dispose();
        this.emitter.dispose();
      };
      return Relay2;
    }();
    exports2.Relay = Relay;
  });
  define(__m[19], __M([0, 1, 9]), function(require2, exports2, event_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var shortcutEvent = Object.freeze(function(callback, context) {
      var handle = setTimeout(callback.bind(context), 0);
      return {
        dispose: function() {
          clearTimeout(handle);
        }
      };
    });
    var CancellationToken;
    (function(CancellationToken2) {
      function isCancellationToken(thing) {
        if (thing === CancellationToken2.None || thing === CancellationToken2.Cancelled) {
          return true;
        }
        if (thing instanceof MutableToken) {
          return true;
        }
        if (!thing || typeof thing !== "object") {
          return false;
        }
        return typeof thing.isCancellationRequested === "boolean" && typeof thing.onCancellationRequested === "function";
      }
      CancellationToken2.isCancellationToken = isCancellationToken;
      CancellationToken2.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: event_1.Event.None
      });
      CancellationToken2.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: shortcutEvent
      });
    })(CancellationToken = exports2.CancellationToken || (exports2.CancellationToken = {}));
    var MutableToken = function() {
      function MutableToken2() {
        this._isCancelled = false;
        this._emitter = null;
      }
      MutableToken2.prototype.cancel = function() {
        if (!this._isCancelled) {
          this._isCancelled = true;
          if (this._emitter) {
            this._emitter.fire(void 0);
            this.dispose();
          }
        }
      };
      Object.defineProperty(MutableToken2.prototype, "isCancellationRequested", {
        get: function() {
          return this._isCancelled;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MutableToken2.prototype, "onCancellationRequested", {
        get: function() {
          if (this._isCancelled) {
            return shortcutEvent;
          }
          if (!this._emitter) {
            this._emitter = new event_1.Emitter();
          }
          return this._emitter.event;
        },
        enumerable: true,
        configurable: true
      });
      MutableToken2.prototype.dispose = function() {
        if (this._emitter) {
          this._emitter.dispose();
          this._emitter = null;
        }
      };
      return MutableToken2;
    }();
    var CancellationTokenSource = function() {
      function CancellationTokenSource2(parent) {
        this._token = void 0;
        this._parentListener = void 0;
        this._parentListener = parent && parent.onCancellationRequested(this.cancel, this);
      }
      Object.defineProperty(CancellationTokenSource2.prototype, "token", {
        get: function() {
          if (!this._token) {
            this._token = new MutableToken();
          }
          return this._token;
        },
        enumerable: true,
        configurable: true
      });
      CancellationTokenSource2.prototype.cancel = function() {
        if (!this._token) {
          this._token = CancellationToken.Cancelled;
        } else if (this._token instanceof MutableToken) {
          this._token.cancel();
        }
      };
      CancellationTokenSource2.prototype.dispose = function(cancel) {
        if (cancel === void 0) {
          cancel = false;
        }
        if (cancel) {
          this.cancel();
        }
        if (this._parentListener) {
          this._parentListener.dispose();
        }
        if (!this._token) {
          this._token = CancellationToken.None;
        } else if (this._token instanceof MutableToken) {
          this._token.dispose();
        }
      };
      return CancellationTokenSource2;
    }();
    exports2.CancellationTokenSource = CancellationTokenSource;
  });
  define(__m[4], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var LANGUAGE_DEFAULT = "en";
    var _isWindows = false;
    var _isMacintosh = false;
    var _isLinux = false;
    var _isNative = false;
    var _isWeb = false;
    var _isIOS = false;
    var _locale = void 0;
    var _language = LANGUAGE_DEFAULT;
    var _translationsConfigFile = void 0;
    var _userAgent = void 0;
    var isElectronRenderer = typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.electron !== "undefined" && process.type === "renderer";
    if (typeof navigator === "object" && !isElectronRenderer) {
      _userAgent = navigator.userAgent;
      _isWindows = _userAgent.indexOf("Windows") >= 0;
      _isMacintosh = _userAgent.indexOf("Macintosh") >= 0;
      _isIOS = _userAgent.indexOf("Macintosh") >= 0 && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
      _isLinux = _userAgent.indexOf("Linux") >= 0;
      _isWeb = true;
      _locale = navigator.language;
      _language = _locale;
    } else if (typeof process === "object") {
      _isWindows = process.platform === "win32";
      _isMacintosh = process.platform === "darwin";
      _isLinux = process.platform === "linux";
      _locale = LANGUAGE_DEFAULT;
      _language = LANGUAGE_DEFAULT;
      var rawNlsConfig = process.env["VSCODE_NLS_CONFIG"];
      if (rawNlsConfig) {
        try {
          var nlsConfig = JSON.parse(rawNlsConfig);
          var resolved = nlsConfig.availableLanguages["*"];
          _locale = nlsConfig.locale;
          _language = resolved ? resolved : LANGUAGE_DEFAULT;
          _translationsConfigFile = nlsConfig._translationsConfigFile;
        } catch (e) {
        }
      }
      _isNative = true;
    }
    var _platform = 0;
    if (_isMacintosh) {
      _platform = 1;
    } else if (_isWindows) {
      _platform = 3;
    } else if (_isLinux) {
      _platform = 2;
    }
    exports2.isWindows = _isWindows;
    exports2.isMacintosh = _isMacintosh;
    exports2.isLinux = _isLinux;
    exports2.isNative = _isNative;
    exports2.isWeb = _isWeb;
    exports2.isIOS = _isIOS;
    var _globals = typeof self === "object" ? self : typeof global === "object" ? global : {};
    exports2.globals = _globals;
    exports2.setImmediate = function defineSetImmediate() {
      if (exports2.globals.setImmediate) {
        return exports2.globals.setImmediate.bind(exports2.globals);
      }
      if (typeof exports2.globals.postMessage === "function" && !exports2.globals.importScripts) {
        var pending_1 = [];
        exports2.globals.addEventListener("message", function(e) {
          if (e.data && e.data.vscodeSetImmediateId) {
            for (var i = 0, len = pending_1.length; i < len; i++) {
              var candidate = pending_1[i];
              if (candidate.id === e.data.vscodeSetImmediateId) {
                pending_1.splice(i, 1);
                candidate.callback();
                return;
              }
            }
          }
        });
        var lastId_1 = 0;
        return function(callback) {
          var myId = ++lastId_1;
          pending_1.push({
            id: myId,
            callback
          });
          exports2.globals.postMessage({
            vscodeSetImmediateId: myId
          }, "*");
        };
      }
      if (typeof process !== "undefined" && typeof process.nextTick === "function") {
        return process.nextTick.bind(process);
      }
      var _promise = Promise.resolve();
      return function(callback) {
        return _promise.then(callback);
      };
    }();
    exports2.OS = _isMacintosh ? 2 : _isWindows ? 1 : 3;
  });
  define(__m[20], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function isFalsyOrWhitespace(str) {
      if (!str || typeof str !== "string") {
        return true;
      }
      return str.trim().length === 0;
    }
    exports2.isFalsyOrWhitespace = isFalsyOrWhitespace;
    function pad(n, l, char) {
      if (char === void 0) {
        char = "0";
      }
      var str = "" + n;
      var r = [str];
      for (var i = str.length; i < l; i++) {
        r.push(char);
      }
      return r.reverse().join("");
    }
    exports2.pad = pad;
    var _formatRegexp = /{(\d+)}/g;
    function format(value) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      if (args.length === 0) {
        return value;
      }
      return value.replace(_formatRegexp, function(match, group) {
        var idx = parseInt(group, 10);
        return isNaN(idx) || idx < 0 || idx >= args.length ? match : args[idx];
      });
    }
    exports2.format = format;
    function escape(html) {
      return html.replace(/[<>&]/g, function(match) {
        switch (match) {
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case "&":
            return "&amp;";
          default:
            return match;
        }
      });
    }
    exports2.escape = escape;
    function escapeRegExpCharacters(value) {
      return value.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
    }
    exports2.escapeRegExpCharacters = escapeRegExpCharacters;
    function trim(haystack, needle) {
      if (needle === void 0) {
        needle = " ";
      }
      var trimmed = ltrim(haystack, needle);
      return rtrim(trimmed, needle);
    }
    exports2.trim = trim;
    function ltrim(haystack, needle) {
      if (!haystack || !needle) {
        return haystack;
      }
      var needleLen = needle.length;
      if (needleLen === 0 || haystack.length === 0) {
        return haystack;
      }
      var offset = 0;
      while (haystack.indexOf(needle, offset) === offset) {
        offset = offset + needleLen;
      }
      return haystack.substring(offset);
    }
    exports2.ltrim = ltrim;
    function rtrim(haystack, needle) {
      if (!haystack || !needle) {
        return haystack;
      }
      var needleLen = needle.length, haystackLen = haystack.length;
      if (needleLen === 0 || haystackLen === 0) {
        return haystack;
      }
      var offset = haystackLen, idx = -1;
      while (true) {
        idx = haystack.lastIndexOf(needle, offset - 1);
        if (idx === -1 || idx + needleLen !== offset) {
          break;
        }
        if (idx === 0) {
          return "";
        }
        offset = idx;
      }
      return haystack.substring(0, offset);
    }
    exports2.rtrim = rtrim;
    function convertSimple2RegExpPattern(pattern) {
      return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&").replace(/[\*]/g, ".*");
    }
    exports2.convertSimple2RegExpPattern = convertSimple2RegExpPattern;
    function startsWith(haystack, needle) {
      if (haystack.length < needle.length) {
        return false;
      }
      if (haystack === needle) {
        return true;
      }
      for (var i = 0; i < needle.length; i++) {
        if (haystack[i] !== needle[i]) {
          return false;
        }
      }
      return true;
    }
    exports2.startsWith = startsWith;
    function endsWith(haystack, needle) {
      var diff = haystack.length - needle.length;
      if (diff > 0) {
        return haystack.indexOf(needle, diff) === diff;
      } else if (diff === 0) {
        return haystack === needle;
      } else {
        return false;
      }
    }
    exports2.endsWith = endsWith;
    function createRegExp(searchString, isRegex, options) {
      if (options === void 0) {
        options = {};
      }
      if (!searchString) {
        throw new Error("Cannot create regex from empty string");
      }
      if (!isRegex) {
        searchString = escapeRegExpCharacters(searchString);
      }
      if (options.wholeWord) {
        if (!/\B/.test(searchString.charAt(0))) {
          searchString = "\\b" + searchString;
        }
        if (!/\B/.test(searchString.charAt(searchString.length - 1))) {
          searchString = searchString + "\\b";
        }
      }
      var modifiers = "";
      if (options.global) {
        modifiers += "g";
      }
      if (!options.matchCase) {
        modifiers += "i";
      }
      if (options.multiline) {
        modifiers += "m";
      }
      if (options.unicode) {
        modifiers += "u";
      }
      return new RegExp(searchString, modifiers);
    }
    exports2.createRegExp = createRegExp;
    function regExpLeadsToEndlessLoop(regexp) {
      if (regexp.source === "^" || regexp.source === "^$" || regexp.source === "$" || regexp.source === "^\\s*$") {
        return false;
      }
      var match = regexp.exec("");
      return !!(match && regexp.lastIndex === 0);
    }
    exports2.regExpLeadsToEndlessLoop = regExpLeadsToEndlessLoop;
    function regExpFlags(regexp) {
      return (regexp.global ? "g" : "") + (regexp.ignoreCase ? "i" : "") + (regexp.multiline ? "m" : "") + (regexp.unicode ? "u" : "");
    }
    exports2.regExpFlags = regExpFlags;
    function firstNonWhitespaceIndex(str) {
      for (var i = 0, len = str.length; i < len; i++) {
        var chCode = str.charCodeAt(i);
        if (chCode !== 32 && chCode !== 9) {
          return i;
        }
      }
      return -1;
    }
    exports2.firstNonWhitespaceIndex = firstNonWhitespaceIndex;
    function getLeadingWhitespace(str, start, end) {
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = str.length;
      }
      for (var i = start; i < end; i++) {
        var chCode = str.charCodeAt(i);
        if (chCode !== 32 && chCode !== 9) {
          return str.substring(start, i);
        }
      }
      return str.substring(start, end);
    }
    exports2.getLeadingWhitespace = getLeadingWhitespace;
    function lastNonWhitespaceIndex(str, startIndex) {
      if (startIndex === void 0) {
        startIndex = str.length - 1;
      }
      for (var i = startIndex; i >= 0; i--) {
        var chCode = str.charCodeAt(i);
        if (chCode !== 32 && chCode !== 9) {
          return i;
        }
      }
      return -1;
    }
    exports2.lastNonWhitespaceIndex = lastNonWhitespaceIndex;
    function compare(a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    }
    exports2.compare = compare;
    function compareIgnoreCase(a, b) {
      var len = Math.min(a.length, b.length);
      for (var i = 0; i < len; i++) {
        var codeA = a.charCodeAt(i);
        var codeB = b.charCodeAt(i);
        if (codeA === codeB) {
          continue;
        }
        if (isUpperAsciiLetter(codeA)) {
          codeA += 32;
        }
        if (isUpperAsciiLetter(codeB)) {
          codeB += 32;
        }
        var diff = codeA - codeB;
        if (diff === 0) {
          continue;
        } else if (isLowerAsciiLetter(codeA) && isLowerAsciiLetter(codeB)) {
          return diff;
        } else {
          return compare(a.toLowerCase(), b.toLowerCase());
        }
      }
      if (a.length < b.length) {
        return -1;
      } else if (a.length > b.length) {
        return 1;
      } else {
        return 0;
      }
    }
    exports2.compareIgnoreCase = compareIgnoreCase;
    function isLowerAsciiLetter(code) {
      return code >= 97 && code <= 122;
    }
    exports2.isLowerAsciiLetter = isLowerAsciiLetter;
    function isUpperAsciiLetter(code) {
      return code >= 65 && code <= 90;
    }
    exports2.isUpperAsciiLetter = isUpperAsciiLetter;
    function isAsciiLetter(code) {
      return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
    }
    function equalsIgnoreCase(a, b) {
      return a.length === b.length && doEqualsIgnoreCase(a, b);
    }
    exports2.equalsIgnoreCase = equalsIgnoreCase;
    function doEqualsIgnoreCase(a, b, stopAt) {
      if (stopAt === void 0) {
        stopAt = a.length;
      }
      for (var i = 0; i < stopAt; i++) {
        var codeA = a.charCodeAt(i);
        var codeB = b.charCodeAt(i);
        if (codeA === codeB) {
          continue;
        }
        if (isAsciiLetter(codeA) && isAsciiLetter(codeB)) {
          var diff = Math.abs(codeA - codeB);
          if (diff !== 0 && diff !== 32) {
            return false;
          }
        } else {
          if (String.fromCharCode(codeA).toLowerCase() !== String.fromCharCode(codeB).toLowerCase()) {
            return false;
          }
        }
      }
      return true;
    }
    function startsWithIgnoreCase(str, candidate) {
      var candidateLength = candidate.length;
      if (candidate.length > str.length) {
        return false;
      }
      return doEqualsIgnoreCase(str, candidate, candidateLength);
    }
    exports2.startsWithIgnoreCase = startsWithIgnoreCase;
    function commonPrefixLength(a, b) {
      var i, len = Math.min(a.length, b.length);
      for (i = 0; i < len; i++) {
        if (a.charCodeAt(i) !== b.charCodeAt(i)) {
          return i;
        }
      }
      return len;
    }
    exports2.commonPrefixLength = commonPrefixLength;
    function commonSuffixLength(a, b) {
      var i, len = Math.min(a.length, b.length);
      var aLastIndex = a.length - 1;
      var bLastIndex = b.length - 1;
      for (i = 0; i < len; i++) {
        if (a.charCodeAt(aLastIndex - i) !== b.charCodeAt(bLastIndex - i)) {
          return i;
        }
      }
      return len;
    }
    exports2.commonSuffixLength = commonSuffixLength;
    function isHighSurrogate(charCode) {
      return 55296 <= charCode && charCode <= 56319;
    }
    exports2.isHighSurrogate = isHighSurrogate;
    function isLowSurrogate(charCode) {
      return 56320 <= charCode && charCode <= 57343;
    }
    exports2.isLowSurrogate = isLowSurrogate;
    function getNextCodePoint(str, len, offset) {
      var charCode = str.charCodeAt(offset);
      if (isHighSurrogate(charCode) && offset + 1 < len) {
        var nextCharCode = str.charCodeAt(offset + 1);
        if (isLowSurrogate(nextCharCode)) {
          return (charCode - 55296 << 10) + (nextCharCode - 56320) + 65536;
        }
      }
      return charCode;
    }
    exports2.getNextCodePoint = getNextCodePoint;
    function getPrevCodePoint(str, offset) {
      var charCode = str.charCodeAt(offset - 1);
      if (isLowSurrogate(charCode) && offset > 1) {
        var prevCharCode = str.charCodeAt(offset - 2);
        if (isHighSurrogate(prevCharCode)) {
          return (prevCharCode - 55296 << 10) + (charCode - 56320) + 65536;
        }
      }
      return charCode;
    }
    function nextCharLength(str, offset) {
      var graphemeBreakTree = GraphemeBreakTree.getInstance();
      var initialOffset = offset;
      var len = str.length;
      var initialCodePoint = getNextCodePoint(str, len, offset);
      offset += initialCodePoint >= 65536 ? 2 : 1;
      var graphemeBreakType = graphemeBreakTree.getGraphemeBreakType(initialCodePoint);
      while (offset < len) {
        var nextCodePoint = getNextCodePoint(str, len, offset);
        var nextGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(nextCodePoint);
        if (breakBetweenGraphemeBreakType(graphemeBreakType, nextGraphemeBreakType)) {
          break;
        }
        offset += nextCodePoint >= 65536 ? 2 : 1;
        graphemeBreakType = nextGraphemeBreakType;
      }
      return offset - initialOffset;
    }
    exports2.nextCharLength = nextCharLength;
    function prevCharLength(str, offset) {
      var graphemeBreakTree = GraphemeBreakTree.getInstance();
      var initialOffset = offset;
      var initialCodePoint = getPrevCodePoint(str, offset);
      offset -= initialCodePoint >= 65536 ? 2 : 1;
      var graphemeBreakType = graphemeBreakTree.getGraphemeBreakType(initialCodePoint);
      while (offset > 0) {
        var prevCodePoint = getPrevCodePoint(str, offset);
        var prevGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(prevCodePoint);
        if (breakBetweenGraphemeBreakType(prevGraphemeBreakType, graphemeBreakType)) {
          break;
        }
        offset -= prevCodePoint >= 65536 ? 2 : 1;
        graphemeBreakType = prevGraphemeBreakType;
      }
      return initialOffset - offset;
    }
    exports2.prevCharLength = prevCharLength;
    var CONTAINS_RTL = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
    function containsRTL(str) {
      return CONTAINS_RTL.test(str);
    }
    exports2.containsRTL = containsRTL;
    var CONTAINS_EMOJI = /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD00-\uDDFF\uDE70-\uDE73\uDE78-\uDE82\uDE90-\uDE95])/;
    function containsEmoji(str) {
      return CONTAINS_EMOJI.test(str);
    }
    exports2.containsEmoji = containsEmoji;
    var IS_BASIC_ASCII = /^[\t\n\r\x20-\x7E]*$/;
    function isBasicASCII(str) {
      return IS_BASIC_ASCII.test(str);
    }
    exports2.isBasicASCII = isBasicASCII;
    function containsFullWidthCharacter(str) {
      for (var i = 0, len = str.length; i < len; i++) {
        if (isFullWidthCharacter(str.charCodeAt(i))) {
          return true;
        }
      }
      return false;
    }
    exports2.containsFullWidthCharacter = containsFullWidthCharacter;
    function isFullWidthCharacter(charCode) {
      charCode = +charCode;
      return charCode >= 11904 && charCode <= 55215 || charCode >= 63744 && charCode <= 64255 || charCode >= 65281 && charCode <= 65374;
    }
    exports2.isFullWidthCharacter = isFullWidthCharacter;
    function isEmojiImprecise(x) {
      return x >= 127462 && x <= 127487 || x >= 9728 && x <= 10175 || x >= 127744 && x <= 128591 || x >= 128640 && x <= 128764 || x >= 128992 && x <= 129003 || x >= 129280 && x <= 129535 || x >= 129648 && x <= 129651 || x >= 129656 && x <= 129666 || x >= 129680 && x <= 129685;
    }
    exports2.isEmojiImprecise = isEmojiImprecise;
    exports2.UTF8_BOM_CHARACTER = String.fromCharCode(65279);
    function startsWithUTF8BOM(str) {
      return !!(str && str.length > 0 && str.charCodeAt(0) === 65279);
    }
    exports2.startsWithUTF8BOM = startsWithUTF8BOM;
    function safeBtoa(str) {
      return btoa(encodeURIComponent(str));
    }
    exports2.safeBtoa = safeBtoa;
    function repeat(s, count) {
      var result = "";
      for (var i = 0; i < count; i++) {
        result += s;
      }
      return result;
    }
    exports2.repeat = repeat;
    function containsUppercaseCharacter(target, ignoreEscapedChars) {
      if (ignoreEscapedChars === void 0) {
        ignoreEscapedChars = false;
      }
      if (!target) {
        return false;
      }
      if (ignoreEscapedChars) {
        target = target.replace(/\\./g, "");
      }
      return target.toLowerCase() !== target;
    }
    exports2.containsUppercaseCharacter = containsUppercaseCharacter;
    function singleLetterHash(n) {
      var LETTERS_CNT = 90 - 65 + 1;
      n = n % (2 * LETTERS_CNT);
      if (n < LETTERS_CNT) {
        return String.fromCharCode(97 + n);
      }
      return String.fromCharCode(65 + n - LETTERS_CNT);
    }
    exports2.singleLetterHash = singleLetterHash;
    function getGraphemeBreakType(codePoint) {
      var graphemeBreakTree = GraphemeBreakTree.getInstance();
      return graphemeBreakTree.getGraphemeBreakType(codePoint);
    }
    exports2.getGraphemeBreakType = getGraphemeBreakType;
    function breakBetweenGraphemeBreakType(breakTypeA, breakTypeB) {
      if (breakTypeA === 0) {
        return breakTypeB !== 5 && breakTypeB !== 7;
      }
      if (breakTypeA === 2) {
        if (breakTypeB === 3) {
          return false;
        }
      }
      if (breakTypeA === 4 || breakTypeA === 2 || breakTypeA === 3) {
        return true;
      }
      if (breakTypeB === 4 || breakTypeB === 2 || breakTypeB === 3) {
        return true;
      }
      if (breakTypeA === 8) {
        if (breakTypeB === 8 || breakTypeB === 9 || breakTypeB === 11 || breakTypeB === 12) {
          return false;
        }
      }
      if (breakTypeA === 11 || breakTypeA === 9) {
        if (breakTypeB === 9 || breakTypeB === 10) {
          return false;
        }
      }
      if (breakTypeA === 12 || breakTypeA === 10) {
        if (breakTypeB === 10) {
          return false;
        }
      }
      if (breakTypeB === 5 || breakTypeB === 13) {
        return false;
      }
      if (breakTypeB === 7) {
        return false;
      }
      if (breakTypeA === 1) {
        return false;
      }
      if (breakTypeA === 13 && breakTypeB === 14) {
        return false;
      }
      if (breakTypeA === 6 && breakTypeB === 6) {
        return false;
      }
      return true;
    }
    exports2.breakBetweenGraphemeBreakType = breakBetweenGraphemeBreakType;
    var GraphemeBreakTree = function() {
      function GraphemeBreakTree2() {
        this._data = getGraphemeBreakRawData();
      }
      GraphemeBreakTree2.getInstance = function() {
        if (!GraphemeBreakTree2._INSTANCE) {
          GraphemeBreakTree2._INSTANCE = new GraphemeBreakTree2();
        }
        return GraphemeBreakTree2._INSTANCE;
      };
      GraphemeBreakTree2.prototype.getGraphemeBreakType = function(codePoint) {
        if (codePoint < 32) {
          if (codePoint === 10) {
            return 3;
          }
          if (codePoint === 13) {
            return 2;
          }
          return 4;
        }
        if (codePoint < 127) {
          return 0;
        }
        var data = this._data;
        var nodeCount = data.length / 3;
        var nodeIndex = 1;
        while (nodeIndex <= nodeCount) {
          if (codePoint < data[3 * nodeIndex]) {
            nodeIndex = 2 * nodeIndex;
          } else if (codePoint > data[3 * nodeIndex + 1]) {
            nodeIndex = 2 * nodeIndex + 1;
          } else {
            return data[3 * nodeIndex + 2];
          }
        }
        return 0;
      };
      GraphemeBreakTree2._INSTANCE = null;
      return GraphemeBreakTree2;
    }();
    function getGraphemeBreakRawData() {
      return JSON.parse("[0,0,0,51592,51592,11,44424,44424,11,72251,72254,5,7150,7150,7,48008,48008,11,55176,55176,11,128420,128420,14,3276,3277,5,9979,9980,14,46216,46216,11,49800,49800,11,53384,53384,11,70726,70726,5,122915,122916,5,129320,129327,14,2558,2558,5,5906,5908,5,9762,9763,14,43360,43388,8,45320,45320,11,47112,47112,11,48904,48904,11,50696,50696,11,52488,52488,11,54280,54280,11,70082,70083,1,71350,71350,7,73111,73111,5,127892,127893,14,128726,128727,14,129473,129474,14,2027,2035,5,2901,2902,5,3784,3789,5,6754,6754,5,8418,8420,5,9877,9877,14,11088,11088,14,44008,44008,5,44872,44872,11,45768,45768,11,46664,46664,11,47560,47560,11,48456,48456,11,49352,49352,11,50248,50248,11,51144,51144,11,52040,52040,11,52936,52936,11,53832,53832,11,54728,54728,11,69811,69814,5,70459,70460,5,71096,71099,7,71998,71998,5,72874,72880,5,119149,119149,7,127374,127374,14,128335,128335,14,128482,128482,14,128765,128767,14,129399,129400,14,129680,129685,14,1476,1477,5,2377,2380,7,2759,2760,5,3137,3140,7,3458,3459,7,4153,4154,5,6432,6434,5,6978,6978,5,7675,7679,5,9723,9726,14,9823,9823,14,9919,9923,14,10035,10036,14,42736,42737,5,43596,43596,5,44200,44200,11,44648,44648,11,45096,45096,11,45544,45544,11,45992,45992,11,46440,46440,11,46888,46888,11,47336,47336,11,47784,47784,11,48232,48232,11,48680,48680,11,49128,49128,11,49576,49576,11,50024,50024,11,50472,50472,11,50920,50920,11,51368,51368,11,51816,51816,11,52264,52264,11,52712,52712,11,53160,53160,11,53608,53608,11,54056,54056,11,54504,54504,11,54952,54952,11,68108,68111,5,69933,69940,5,70197,70197,7,70498,70499,7,70845,70845,5,71229,71229,5,71727,71735,5,72154,72155,5,72344,72345,5,73023,73029,5,94095,94098,5,121403,121452,5,126981,127182,14,127538,127546,14,127990,127990,14,128391,128391,14,128445,128449,14,128500,128505,14,128752,128752,14,129160,129167,14,129356,129356,14,129432,129442,14,129648,129651,14,129751,131069,14,173,173,4,1757,1757,1,2274,2274,1,2494,2494,5,2641,2641,5,2876,2876,5,3014,3016,7,3262,3262,7,3393,3396,5,3570,3571,7,3968,3972,5,4228,4228,7,6086,6086,5,6679,6680,5,6912,6915,5,7080,7081,5,7380,7392,5,8252,8252,14,9096,9096,14,9748,9749,14,9784,9786,14,9833,9850,14,9890,9894,14,9938,9938,14,9999,9999,14,10085,10087,14,12349,12349,14,43136,43137,7,43454,43456,7,43755,43755,7,44088,44088,11,44312,44312,11,44536,44536,11,44760,44760,11,44984,44984,11,45208,45208,11,45432,45432,11,45656,45656,11,45880,45880,11,46104,46104,11,46328,46328,11,46552,46552,11,46776,46776,11,47000,47000,11,47224,47224,11,47448,47448,11,47672,47672,11,47896,47896,11,48120,48120,11,48344,48344,11,48568,48568,11,48792,48792,11,49016,49016,11,49240,49240,11,49464,49464,11,49688,49688,11,49912,49912,11,50136,50136,11,50360,50360,11,50584,50584,11,50808,50808,11,51032,51032,11,51256,51256,11,51480,51480,11,51704,51704,11,51928,51928,11,52152,52152,11,52376,52376,11,52600,52600,11,52824,52824,11,53048,53048,11,53272,53272,11,53496,53496,11,53720,53720,11,53944,53944,11,54168,54168,11,54392,54392,11,54616,54616,11,54840,54840,11,55064,55064,11,65438,65439,5,69633,69633,5,69837,69837,1,70018,70018,7,70188,70190,7,70368,70370,7,70465,70468,7,70712,70719,5,70835,70840,5,70850,70851,5,71132,71133,5,71340,71340,7,71458,71461,5,71985,71989,7,72002,72002,7,72193,72202,5,72281,72283,5,72766,72766,7,72885,72886,5,73104,73105,5,92912,92916,5,113824,113827,4,119173,119179,5,121505,121519,5,125136,125142,5,127279,127279,14,127489,127490,14,127570,127743,14,127900,127901,14,128254,128254,14,128369,128370,14,128400,128400,14,128425,128432,14,128468,128475,14,128489,128494,14,128715,128720,14,128745,128745,14,128759,128760,14,129004,129023,14,129296,129304,14,129340,129342,14,129388,129392,14,129404,129407,14,129454,129455,14,129485,129487,14,129659,129663,14,129719,129727,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2363,2363,7,2402,2403,5,2507,2508,7,2622,2624,7,2691,2691,7,2786,2787,5,2881,2884,5,3006,3006,5,3072,3072,5,3170,3171,5,3267,3268,7,3330,3331,7,3406,3406,1,3538,3540,5,3655,3662,5,3897,3897,5,4038,4038,5,4184,4185,5,4352,4447,8,6068,6069,5,6155,6157,5,6448,6449,7,6742,6742,5,6783,6783,5,6966,6970,5,7042,7042,7,7143,7143,7,7212,7219,5,7412,7412,5,8206,8207,4,8294,8303,4,8596,8601,14,9410,9410,14,9742,9742,14,9757,9757,14,9770,9770,14,9794,9794,14,9828,9828,14,9855,9855,14,9882,9882,14,9900,9903,14,9929,9933,14,9963,9967,14,9987,9988,14,10006,10006,14,10062,10062,14,10175,10175,14,11744,11775,5,42607,42607,5,43043,43044,7,43263,43263,5,43444,43445,7,43569,43570,5,43698,43700,5,43766,43766,5,44032,44032,11,44144,44144,11,44256,44256,11,44368,44368,11,44480,44480,11,44592,44592,11,44704,44704,11,44816,44816,11,44928,44928,11,45040,45040,11,45152,45152,11,45264,45264,11,45376,45376,11,45488,45488,11,45600,45600,11,45712,45712,11,45824,45824,11,45936,45936,11,46048,46048,11,46160,46160,11,46272,46272,11,46384,46384,11,46496,46496,11,46608,46608,11,46720,46720,11,46832,46832,11,46944,46944,11,47056,47056,11,47168,47168,11,47280,47280,11,47392,47392,11,47504,47504,11,47616,47616,11,47728,47728,11,47840,47840,11,47952,47952,11,48064,48064,11,48176,48176,11,48288,48288,11,48400,48400,11,48512,48512,11,48624,48624,11,48736,48736,11,48848,48848,11,48960,48960,11,49072,49072,11,49184,49184,11,49296,49296,11,49408,49408,11,49520,49520,11,49632,49632,11,49744,49744,11,49856,49856,11,49968,49968,11,50080,50080,11,50192,50192,11,50304,50304,11,50416,50416,11,50528,50528,11,50640,50640,11,50752,50752,11,50864,50864,11,50976,50976,11,51088,51088,11,51200,51200,11,51312,51312,11,51424,51424,11,51536,51536,11,51648,51648,11,51760,51760,11,51872,51872,11,51984,51984,11,52096,52096,11,52208,52208,11,52320,52320,11,52432,52432,11,52544,52544,11,52656,52656,11,52768,52768,11,52880,52880,11,52992,52992,11,53104,53104,11,53216,53216,11,53328,53328,11,53440,53440,11,53552,53552,11,53664,53664,11,53776,53776,11,53888,53888,11,54000,54000,11,54112,54112,11,54224,54224,11,54336,54336,11,54448,54448,11,54560,54560,11,54672,54672,11,54784,54784,11,54896,54896,11,55008,55008,11,55120,55120,11,64286,64286,5,66272,66272,5,68900,68903,5,69762,69762,7,69817,69818,5,69927,69931,5,70003,70003,5,70070,70078,5,70094,70094,7,70194,70195,7,70206,70206,5,70400,70401,5,70463,70463,7,70475,70477,7,70512,70516,5,70722,70724,5,70832,70832,5,70842,70842,5,70847,70848,5,71088,71089,7,71102,71102,7,71219,71226,5,71231,71232,5,71342,71343,7,71453,71455,5,71463,71467,5,71737,71738,5,71995,71996,5,72000,72000,7,72145,72147,7,72160,72160,5,72249,72249,7,72273,72278,5,72330,72342,5,72752,72758,5,72850,72871,5,72882,72883,5,73018,73018,5,73031,73031,5,73109,73109,5,73461,73462,7,94031,94031,5,94192,94193,7,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,126976,126979,14,127184,127231,14,127344,127345,14,127405,127461,14,127514,127514,14,127561,127567,14,127778,127779,14,127896,127896,14,127985,127986,14,127995,127999,5,128326,128328,14,128360,128366,14,128378,128378,14,128394,128397,14,128405,128406,14,128422,128423,14,128435,128443,14,128453,128464,14,128479,128480,14,128484,128487,14,128496,128498,14,128640,128709,14,128723,128724,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129096,129103,14,129292,129292,14,129311,129311,14,129329,129330,14,129344,129349,14,129360,129374,14,129394,129394,14,129402,129402,14,129413,129425,14,129445,129450,14,129466,129471,14,129483,129483,14,129511,129535,14,129653,129655,14,129667,129670,14,129705,129711,14,129731,129743,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2307,2307,7,2366,2368,7,2382,2383,7,2434,2435,7,2497,2500,5,2519,2519,5,2563,2563,7,2631,2632,5,2677,2677,5,2750,2752,7,2763,2764,7,2817,2817,5,2879,2879,5,2891,2892,7,2914,2915,5,3008,3008,5,3021,3021,5,3076,3076,5,3146,3149,5,3202,3203,7,3264,3265,7,3271,3272,7,3298,3299,5,3390,3390,5,3402,3404,7,3426,3427,5,3535,3535,5,3544,3550,7,3635,3635,7,3763,3763,7,3893,3893,5,3953,3966,5,3981,3991,5,4145,4145,7,4157,4158,5,4209,4212,5,4237,4237,5,4520,4607,10,5970,5971,5,6071,6077,5,6089,6099,5,6277,6278,5,6439,6440,5,6451,6456,7,6683,6683,5,6744,6750,5,6765,6770,7,6846,6846,5,6964,6964,5,6972,6972,5,7019,7027,5,7074,7077,5,7083,7085,5,7146,7148,7,7154,7155,7,7222,7223,5,7394,7400,5,7416,7417,5,8204,8204,5,8233,8233,4,8288,8292,4,8413,8416,5,8482,8482,14,8986,8987,14,9193,9203,14,9654,9654,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9775,14,9792,9792,14,9800,9811,14,9825,9826,14,9831,9831,14,9852,9853,14,9872,9873,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9936,9936,14,9941,9960,14,9974,9974,14,9982,9985,14,9992,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10145,10145,14,11013,11015,14,11503,11505,5,12334,12335,5,12951,12951,14,42612,42621,5,43014,43014,5,43047,43047,7,43204,43205,5,43335,43345,5,43395,43395,7,43450,43451,7,43561,43566,5,43573,43574,5,43644,43644,5,43710,43711,5,43758,43759,7,44005,44005,5,44012,44012,7,44060,44060,11,44116,44116,11,44172,44172,11,44228,44228,11,44284,44284,11,44340,44340,11,44396,44396,11,44452,44452,11,44508,44508,11,44564,44564,11,44620,44620,11,44676,44676,11,44732,44732,11,44788,44788,11,44844,44844,11,44900,44900,11,44956,44956,11,45012,45012,11,45068,45068,11,45124,45124,11,45180,45180,11,45236,45236,11,45292,45292,11,45348,45348,11,45404,45404,11,45460,45460,11,45516,45516,11,45572,45572,11,45628,45628,11,45684,45684,11,45740,45740,11,45796,45796,11,45852,45852,11,45908,45908,11,45964,45964,11,46020,46020,11,46076,46076,11,46132,46132,11,46188,46188,11,46244,46244,11,46300,46300,11,46356,46356,11,46412,46412,11,46468,46468,11,46524,46524,11,46580,46580,11,46636,46636,11,46692,46692,11,46748,46748,11,46804,46804,11,46860,46860,11,46916,46916,11,46972,46972,11,47028,47028,11,47084,47084,11,47140,47140,11,47196,47196,11,47252,47252,11,47308,47308,11,47364,47364,11,47420,47420,11,47476,47476,11,47532,47532,11,47588,47588,11,47644,47644,11,47700,47700,11,47756,47756,11,47812,47812,11,47868,47868,11,47924,47924,11,47980,47980,11,48036,48036,11,48092,48092,11,48148,48148,11,48204,48204,11,48260,48260,11,48316,48316,11,48372,48372,11,48428,48428,11,48484,48484,11,48540,48540,11,48596,48596,11,48652,48652,11,48708,48708,11,48764,48764,11,48820,48820,11,48876,48876,11,48932,48932,11,48988,48988,11,49044,49044,11,49100,49100,11,49156,49156,11,49212,49212,11,49268,49268,11,49324,49324,11,49380,49380,11,49436,49436,11,49492,49492,11,49548,49548,11,49604,49604,11,49660,49660,11,49716,49716,11,49772,49772,11,49828,49828,11,49884,49884,11,49940,49940,11,49996,49996,11,50052,50052,11,50108,50108,11,50164,50164,11,50220,50220,11,50276,50276,11,50332,50332,11,50388,50388,11,50444,50444,11,50500,50500,11,50556,50556,11,50612,50612,11,50668,50668,11,50724,50724,11,50780,50780,11,50836,50836,11,50892,50892,11,50948,50948,11,51004,51004,11,51060,51060,11,51116,51116,11,51172,51172,11,51228,51228,11,51284,51284,11,51340,51340,11,51396,51396,11,51452,51452,11,51508,51508,11,51564,51564,11,51620,51620,11,51676,51676,11,51732,51732,11,51788,51788,11,51844,51844,11,51900,51900,11,51956,51956,11,52012,52012,11,52068,52068,11,52124,52124,11,52180,52180,11,52236,52236,11,52292,52292,11,52348,52348,11,52404,52404,11,52460,52460,11,52516,52516,11,52572,52572,11,52628,52628,11,52684,52684,11,52740,52740,11,52796,52796,11,52852,52852,11,52908,52908,11,52964,52964,11,53020,53020,11,53076,53076,11,53132,53132,11,53188,53188,11,53244,53244,11,53300,53300,11,53356,53356,11,53412,53412,11,53468,53468,11,53524,53524,11,53580,53580,11,53636,53636,11,53692,53692,11,53748,53748,11,53804,53804,11,53860,53860,11,53916,53916,11,53972,53972,11,54028,54028,11,54084,54084,11,54140,54140,11,54196,54196,11,54252,54252,11,54308,54308,11,54364,54364,11,54420,54420,11,54476,54476,11,54532,54532,11,54588,54588,11,54644,54644,11,54700,54700,11,54756,54756,11,54812,54812,11,54868,54868,11,54924,54924,11,54980,54980,11,55036,55036,11,55092,55092,11,55148,55148,11,55216,55238,9,65056,65071,5,65529,65531,4,68097,68099,5,68159,68159,5,69446,69456,5,69688,69702,5,69808,69810,7,69815,69816,7,69821,69821,1,69888,69890,5,69932,69932,7,69957,69958,7,70016,70017,5,70067,70069,7,70079,70080,7,70089,70092,5,70095,70095,5,70191,70193,5,70196,70196,5,70198,70199,5,70367,70367,5,70371,70378,5,70402,70403,7,70462,70462,5,70464,70464,5,70471,70472,7,70487,70487,5,70502,70508,5,70709,70711,7,70720,70721,7,70725,70725,7,70750,70750,5,70833,70834,7,70841,70841,7,70843,70844,7,70846,70846,7,70849,70849,7,71087,71087,5,71090,71093,5,71100,71101,5,71103,71104,5,71216,71218,7,71227,71228,7,71230,71230,7,71339,71339,5,71341,71341,5,71344,71349,5,71351,71351,5,71456,71457,7,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123628,123631,5,125252,125258,5,126980,126980,14,127183,127183,14,127245,127247,14,127340,127343,14,127358,127359,14,127377,127386,14,127462,127487,6,127491,127503,14,127535,127535,14,127548,127551,14,127568,127569,14,127744,127777,14,127780,127891,14,127894,127895,14,127897,127899,14,127902,127984,14,127987,127989,14,127991,127994,14,128000,128253,14,128255,128317,14,128329,128334,14,128336,128359,14,128367,128368,14,128371,128377,14,128379,128390,14,128392,128393,14,128398,128399,14,128401,128404,14,128407,128419,14,128421,128421,14,128424,128424,14,128433,128434,14,128444,128444,14,128450,128452,14,128465,128467,14,128476,128478,14,128481,128481,14,128483,128483,14,128488,128488,14,128495,128495,14,128499,128499,14,128506,128591,14,128710,128714,14,128721,128722,14,128725,128725,14,128728,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129664,129666,14,129671,129679,14,129686,129704,14,129712,129718,14,129728,129730,14,129744,129750,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2259,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3134,3136,5,3142,3144,5,3157,3158,5,3201,3201,5,3260,3260,5,3263,3263,5,3266,3266,5,3270,3270,5,3274,3275,7,3285,3286,5,3328,3329,5,3387,3388,5,3391,3392,7,3398,3400,7,3405,3405,5,3415,3415,5,3457,3457,5,3530,3530,5,3536,3537,7,3542,3542,5,3551,3551,5,3633,3633,5,3636,3642,5,3761,3761,5,3764,3772,5,3864,3865,5,3895,3895,5,3902,3903,7,3967,3967,7,3974,3975,5,3993,4028,5,4141,4144,5,4146,4151,5,4155,4156,7,4182,4183,7,4190,4192,5,4226,4226,5,4229,4230,5,4253,4253,5,4448,4519,9,4957,4959,5,5938,5940,5,6002,6003,5,6070,6070,7,6078,6085,7,6087,6088,7,6109,6109,5,6158,6158,4,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6848,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7673,5,8203,8203,4,8205,8205,13,8232,8232,4,8234,8238,4,8265,8265,14,8293,8293,4,8400,8412,5,8417,8417,5,8421,8432,5,8505,8505,14,8617,8618,14,9000,9000,14,9167,9167,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9776,9783,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9935,14,9937,9937,14,9939,9940,14,9961,9962,14,9968,9973,14,9975,9978,14,9981,9981,14,9986,9986,14,9989,9989,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10084,14,10133,10135,14,10160,10160,14,10548,10549,14,11035,11036,14,11093,11093,14,11647,11647,5,12330,12333,5,12336,12336,14,12441,12442,5,12953,12953,14,42608,42610,5,42654,42655,5,43010,43010,5,43019,43019,5,43045,43046,5,43052,43052,5,43188,43203,7,43232,43249,5,43302,43309,5,43346,43347,7,43392,43394,5,43443,43443,5,43446,43449,5,43452,43453,5,43493,43493,5,43567,43568,7,43571,43572,7,43587,43587,5,43597,43597,7,43696,43696,5,43703,43704,5,43713,43713,5,43756,43757,5,43765,43765,7,44003,44004,7,44006,44007,7,44009,44010,7,44013,44013,5,44033,44059,12,44061,44087,12,44089,44115,12,44117,44143,12,44145,44171,12,44173,44199,12,44201,44227,12,44229,44255,12,44257,44283,12,44285,44311,12,44313,44339,12,44341,44367,12,44369,44395,12,44397,44423,12,44425,44451,12,44453,44479,12,44481,44507,12,44509,44535,12,44537,44563,12,44565,44591,12,44593,44619,12,44621,44647,12,44649,44675,12,44677,44703,12,44705,44731,12,44733,44759,12,44761,44787,12,44789,44815,12,44817,44843,12,44845,44871,12,44873,44899,12,44901,44927,12,44929,44955,12,44957,44983,12,44985,45011,12,45013,45039,12,45041,45067,12,45069,45095,12,45097,45123,12,45125,45151,12,45153,45179,12,45181,45207,12,45209,45235,12,45237,45263,12,45265,45291,12,45293,45319,12,45321,45347,12,45349,45375,12,45377,45403,12,45405,45431,12,45433,45459,12,45461,45487,12,45489,45515,12,45517,45543,12,45545,45571,12,45573,45599,12,45601,45627,12,45629,45655,12,45657,45683,12,45685,45711,12,45713,45739,12,45741,45767,12,45769,45795,12,45797,45823,12,45825,45851,12,45853,45879,12,45881,45907,12,45909,45935,12,45937,45963,12,45965,45991,12,45993,46019,12,46021,46047,12,46049,46075,12,46077,46103,12,46105,46131,12,46133,46159,12,46161,46187,12,46189,46215,12,46217,46243,12,46245,46271,12,46273,46299,12,46301,46327,12,46329,46355,12,46357,46383,12,46385,46411,12,46413,46439,12,46441,46467,12,46469,46495,12,46497,46523,12,46525,46551,12,46553,46579,12,46581,46607,12,46609,46635,12,46637,46663,12,46665,46691,12,46693,46719,12,46721,46747,12,46749,46775,12,46777,46803,12,46805,46831,12,46833,46859,12,46861,46887,12,46889,46915,12,46917,46943,12,46945,46971,12,46973,46999,12,47001,47027,12,47029,47055,12,47057,47083,12,47085,47111,12,47113,47139,12,47141,47167,12,47169,47195,12,47197,47223,12,47225,47251,12,47253,47279,12,47281,47307,12,47309,47335,12,47337,47363,12,47365,47391,12,47393,47419,12,47421,47447,12,47449,47475,12,47477,47503,12,47505,47531,12,47533,47559,12,47561,47587,12,47589,47615,12,47617,47643,12,47645,47671,12,47673,47699,12,47701,47727,12,47729,47755,12,47757,47783,12,47785,47811,12,47813,47839,12,47841,47867,12,47869,47895,12,47897,47923,12,47925,47951,12,47953,47979,12,47981,48007,12,48009,48035,12,48037,48063,12,48065,48091,12,48093,48119,12,48121,48147,12,48149,48175,12,48177,48203,12,48205,48231,12,48233,48259,12,48261,48287,12,48289,48315,12,48317,48343,12,48345,48371,12,48373,48399,12,48401,48427,12,48429,48455,12,48457,48483,12,48485,48511,12,48513,48539,12,48541,48567,12,48569,48595,12,48597,48623,12,48625,48651,12,48653,48679,12,48681,48707,12,48709,48735,12,48737,48763,12,48765,48791,12,48793,48819,12,48821,48847,12,48849,48875,12,48877,48903,12,48905,48931,12,48933,48959,12,48961,48987,12,48989,49015,12,49017,49043,12,49045,49071,12,49073,49099,12,49101,49127,12,49129,49155,12,49157,49183,12,49185,49211,12,49213,49239,12,49241,49267,12,49269,49295,12,49297,49323,12,49325,49351,12,49353,49379,12,49381,49407,12,49409,49435,12,49437,49463,12,49465,49491,12,49493,49519,12,49521,49547,12,49549,49575,12,49577,49603,12,49605,49631,12,49633,49659,12,49661,49687,12,49689,49715,12,49717,49743,12,49745,49771,12,49773,49799,12,49801,49827,12,49829,49855,12,49857,49883,12,49885,49911,12,49913,49939,12,49941,49967,12,49969,49995,12,49997,50023,12,50025,50051,12,50053,50079,12,50081,50107,12,50109,50135,12,50137,50163,12,50165,50191,12,50193,50219,12,50221,50247,12,50249,50275,12,50277,50303,12,50305,50331,12,50333,50359,12,50361,50387,12,50389,50415,12,50417,50443,12,50445,50471,12,50473,50499,12,50501,50527,12,50529,50555,12,50557,50583,12,50585,50611,12,50613,50639,12,50641,50667,12,50669,50695,12,50697,50723,12,50725,50751,12,50753,50779,12,50781,50807,12,50809,50835,12,50837,50863,12,50865,50891,12,50893,50919,12,50921,50947,12,50949,50975,12,50977,51003,12,51005,51031,12,51033,51059,12,51061,51087,12,51089,51115,12,51117,51143,12,51145,51171,12,51173,51199,12,51201,51227,12,51229,51255,12,51257,51283,12,51285,51311,12,51313,51339,12,51341,51367,12,51369,51395,12,51397,51423,12,51425,51451,12,51453,51479,12,51481,51507,12,51509,51535,12,51537,51563,12,51565,51591,12,51593,51619,12,51621,51647,12,51649,51675,12,51677,51703,12,51705,51731,12,51733,51759,12,51761,51787,12,51789,51815,12,51817,51843,12,51845,51871,12,51873,51899,12,51901,51927,12,51929,51955,12,51957,51983,12,51985,52011,12,52013,52039,12,52041,52067,12,52069,52095,12,52097,52123,12,52125,52151,12,52153,52179,12,52181,52207,12,52209,52235,12,52237,52263,12,52265,52291,12,52293,52319,12,52321,52347,12,52349,52375,12,52377,52403,12,52405,52431,12,52433,52459,12,52461,52487,12,52489,52515,12,52517,52543,12,52545,52571,12,52573,52599,12,52601,52627,12,52629,52655,12,52657,52683,12,52685,52711,12,52713,52739,12,52741,52767,12,52769,52795,12,52797,52823,12,52825,52851,12,52853,52879,12,52881,52907,12,52909,52935,12,52937,52963,12,52965,52991,12,52993,53019,12,53021,53047,12,53049,53075,12,53077,53103,12,53105,53131,12,53133,53159,12,53161,53187,12,53189,53215,12,53217,53243,12,53245,53271,12,53273,53299,12,53301,53327,12,53329,53355,12,53357,53383,12,53385,53411,12,53413,53439,12,53441,53467,12,53469,53495,12,53497,53523,12,53525,53551,12,53553,53579,12,53581,53607,12,53609,53635,12,53637,53663,12,53665,53691,12,53693,53719,12,53721,53747,12,53749,53775,12,53777,53803,12,53805,53831,12,53833,53859,12,53861,53887,12,53889,53915,12,53917,53943,12,53945,53971,12,53973,53999,12,54001,54027,12,54029,54055,12,54057,54083,12,54085,54111,12,54113,54139,12,54141,54167,12,54169,54195,12,54197,54223,12,54225,54251,12,54253,54279,12,54281,54307,12,54309,54335,12,54337,54363,12,54365,54391,12,54393,54419,12,54421,54447,12,54449,54475,12,54477,54503,12,54505,54531,12,54533,54559,12,54561,54587,12,54589,54615,12,54617,54643,12,54645,54671,12,54673,54699,12,54701,54727,12,54729,54755,12,54757,54783,12,54785,54811,12,54813,54839,12,54841,54867,12,54869,54895,12,54897,54923,12,54925,54951,12,54953,54979,12,54981,55007,12,55009,55035,12,55037,55063,12,55065,55091,12,55093,55119,12,55121,55147,12,55149,55175,12,55177,55203,12,55243,55291,10,65024,65039,5,65279,65279,4,65520,65528,4,66045,66045,5,66422,66426,5,68101,68102,5,68152,68154,5,68325,68326,5,69291,69292,5,69632,69632,7,69634,69634,7,69759,69761,5]");
    }
  });
  define(__m[10], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _typeof = {
      number: "number",
      string: "string",
      undefined: "undefined",
      object: "object",
      function: "function"
    };
    function isArray(array) {
      if (Array.isArray) {
        return Array.isArray(array);
      }
      if (array && typeof array.length === _typeof.number && array.constructor === Array) {
        return true;
      }
      return false;
    }
    exports2.isArray = isArray;
    function isString(str) {
      if (typeof str === _typeof.string || str instanceof String) {
        return true;
      }
      return false;
    }
    exports2.isString = isString;
    function isObject(obj) {
      return typeof obj === _typeof.object && obj !== null && !Array.isArray(obj) && !(obj instanceof RegExp) && !(obj instanceof Date);
    }
    exports2.isObject = isObject;
    function isNumber(obj) {
      if ((typeof obj === _typeof.number || obj instanceof Number) && !isNaN(obj)) {
        return true;
      }
      return false;
    }
    exports2.isNumber = isNumber;
    function isBoolean(obj) {
      return obj === true || obj === false;
    }
    exports2.isBoolean = isBoolean;
    function isUndefined(obj) {
      return typeof obj === _typeof.undefined;
    }
    exports2.isUndefined = isUndefined;
    function isUndefinedOrNull(obj) {
      return isUndefined(obj) || obj === null;
    }
    exports2.isUndefinedOrNull = isUndefinedOrNull;
    function assertType(condition, type) {
      if (!condition) {
        throw new Error(type ? "Unexpected type, expected '" + type + "'" : "Unexpected type");
      }
    }
    exports2.assertType = assertType;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function isEmptyObject(obj) {
      if (!isObject(obj)) {
        return false;
      }
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          return false;
        }
      }
      return true;
    }
    exports2.isEmptyObject = isEmptyObject;
    function isFunction(obj) {
      return typeof obj === _typeof.function;
    }
    exports2.isFunction = isFunction;
    function validateConstraints(args, constraints) {
      var len = Math.min(args.length, constraints.length);
      for (var i = 0; i < len; i++) {
        validateConstraint(args[i], constraints[i]);
      }
    }
    exports2.validateConstraints = validateConstraints;
    function validateConstraint(arg, constraint) {
      if (isString(constraint)) {
        if (typeof arg !== constraint) {
          throw new Error("argument does not match constraint: typeof " + constraint);
        }
      } else if (isFunction(constraint)) {
        try {
          if (arg instanceof constraint) {
            return;
          }
        } catch (_a) {
        }
        if (!isUndefinedOrNull(arg) && arg.constructor === constraint) {
          return;
        }
        if (constraint.length === 1 && constraint.call(void 0, arg) === true) {
          return;
        }
        throw new Error("argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true");
      }
    }
    exports2.validateConstraint = validateConstraint;
    function getAllPropertyNames(obj) {
      var res = [];
      var proto = Object.getPrototypeOf(obj);
      while (Object.prototype !== proto) {
        res = res.concat(Object.getOwnPropertyNames(proto));
        proto = Object.getPrototypeOf(proto);
      }
      return res;
    }
    exports2.getAllPropertyNames = getAllPropertyNames;
    function getAllMethodNames(obj) {
      var methods = [];
      for (var _i = 0, _a = getAllPropertyNames(obj); _i < _a.length; _i++) {
        var prop = _a[_i];
        if (typeof obj[prop] === "function") {
          methods.push(prop);
        }
      }
      return methods;
    }
    exports2.getAllMethodNames = getAllMethodNames;
    function createProxyObject(methodNames, invoke) {
      var createProxyMethod = function(method) {
        return function() {
          var args = Array.prototype.slice.call(arguments, 0);
          return invoke(method, args);
        };
      };
      var result = {};
      for (var _i = 0, methodNames_1 = methodNames; _i < methodNames_1.length; _i++) {
        var methodName = methodNames_1[_i];
        result[methodName] = createProxyMethod(methodName);
      }
      return result;
    }
    exports2.createProxyObject = createProxyObject;
    function withNullAsUndefined(x) {
      return x === null ? void 0 : x;
    }
    exports2.withNullAsUndefined = withNullAsUndefined;
    function withUndefinedAsNull(x) {
      return typeof x === "undefined" ? null : x;
    }
    exports2.withUndefinedAsNull = withUndefinedAsNull;
  });
  define(__m[11], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function toUint8(v) {
      if (v < 0) {
        return 0;
      }
      if (v > 255) {
        return 255;
      }
      return v | 0;
    }
    exports2.toUint8 = toUint8;
    function toUint32(v) {
      if (v < 0) {
        return 0;
      }
      if (v > 4294967295) {
        return 4294967295;
      }
      return v | 0;
    }
    exports2.toUint32 = toUint32;
  });
  define(__m[12], __M([0, 1, 4]), function(require2, exports2, platform_1) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _schemePattern = /^\w[\w\d+.-]*$/;
    var _singleSlashStart = /^\//;
    var _doubleSlashStart = /^\/\//;
    function _validateUri(ret, _strict) {
      if (!ret.scheme && _strict) {
        throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "' + ret.authority + '", path: "' + ret.path + '", query: "' + ret.query + '", fragment: "' + ret.fragment + '"}');
      }
      if (ret.scheme && !_schemePattern.test(ret.scheme)) {
        throw new Error("[UriError]: Scheme contains illegal characters.");
      }
      if (ret.path) {
        if (ret.authority) {
          if (!_singleSlashStart.test(ret.path)) {
            throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
          }
        } else {
          if (_doubleSlashStart.test(ret.path)) {
            throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
          }
        }
      }
    }
    function _schemeFix(scheme, _strict) {
      if (!scheme && !_strict) {
        return "file";
      }
      return scheme;
    }
    function _referenceResolution(scheme, path) {
      switch (scheme) {
        case "https":
        case "http":
        case "file":
          if (!path) {
            path = _slash;
          } else if (path[0] !== _slash) {
            path = _slash + path;
          }
          break;
      }
      return path;
    }
    var _empty = "";
    var _slash = "/";
    var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    var URI = function() {
      function URI2(schemeOrData, authority, path, query, fragment, _strict) {
        if (_strict === void 0) {
          _strict = false;
        }
        if (typeof schemeOrData === "object") {
          this.scheme = schemeOrData.scheme || _empty;
          this.authority = schemeOrData.authority || _empty;
          this.path = schemeOrData.path || _empty;
          this.query = schemeOrData.query || _empty;
          this.fragment = schemeOrData.fragment || _empty;
        } else {
          this.scheme = _schemeFix(schemeOrData, _strict);
          this.authority = authority || _empty;
          this.path = _referenceResolution(this.scheme, path || _empty);
          this.query = query || _empty;
          this.fragment = fragment || _empty;
          _validateUri(this, _strict);
        }
      }
      URI2.isUri = function(thing) {
        if (thing instanceof URI2) {
          return true;
        }
        if (!thing) {
          return false;
        }
        return typeof thing.authority === "string" && typeof thing.fragment === "string" && typeof thing.path === "string" && typeof thing.query === "string" && typeof thing.scheme === "string" && typeof thing.fsPath === "function" && typeof thing.with === "function" && typeof thing.toString === "function";
      };
      Object.defineProperty(URI2.prototype, "fsPath", {
        get: function() {
          return _makeFsPath(this);
        },
        enumerable: true,
        configurable: true
      });
      URI2.prototype.with = function(change) {
        if (!change) {
          return this;
        }
        var scheme = change.scheme, authority = change.authority, path = change.path, query = change.query, fragment = change.fragment;
        if (scheme === void 0) {
          scheme = this.scheme;
        } else if (scheme === null) {
          scheme = _empty;
        }
        if (authority === void 0) {
          authority = this.authority;
        } else if (authority === null) {
          authority = _empty;
        }
        if (path === void 0) {
          path = this.path;
        } else if (path === null) {
          path = _empty;
        }
        if (query === void 0) {
          query = this.query;
        } else if (query === null) {
          query = _empty;
        }
        if (fragment === void 0) {
          fragment = this.fragment;
        } else if (fragment === null) {
          fragment = _empty;
        }
        if (scheme === this.scheme && authority === this.authority && path === this.path && query === this.query && fragment === this.fragment) {
          return this;
        }
        return new _URI(scheme, authority, path, query, fragment);
      };
      URI2.parse = function(value, _strict) {
        if (_strict === void 0) {
          _strict = false;
        }
        var match = _regexp.exec(value);
        if (!match) {
          return new _URI(_empty, _empty, _empty, _empty, _empty);
        }
        return new _URI(match[2] || _empty, percentDecode(match[4] || _empty), percentDecode(match[5] || _empty), percentDecode(match[7] || _empty), percentDecode(match[9] || _empty), _strict);
      };
      URI2.file = function(path) {
        var authority = _empty;
        if (platform_1.isWindows) {
          path = path.replace(/\\/g, _slash);
        }
        if (path[0] === _slash && path[1] === _slash) {
          var idx = path.indexOf(_slash, 2);
          if (idx === -1) {
            authority = path.substring(2);
            path = _slash;
          } else {
            authority = path.substring(2, idx);
            path = path.substring(idx) || _slash;
          }
        }
        return new _URI("file", authority, path, _empty, _empty);
      };
      URI2.from = function(components) {
        return new _URI(components.scheme, components.authority, components.path, components.query, components.fragment);
      };
      URI2.prototype.toString = function(skipEncoding) {
        if (skipEncoding === void 0) {
          skipEncoding = false;
        }
        return _asFormatted(this, skipEncoding);
      };
      URI2.prototype.toJSON = function() {
        return this;
      };
      URI2.revive = function(data) {
        if (!data) {
          return data;
        } else if (data instanceof URI2) {
          return data;
        } else {
          var result = new _URI(data);
          result._formatted = data.external;
          result._fsPath = data._sep === _pathSepMarker ? data.fsPath : null;
          return result;
        }
      };
      return URI2;
    }();
    exports2.URI = URI;
    var _pathSepMarker = platform_1.isWindows ? 1 : void 0;
    var _URI = function(_super) {
      __extends(_URI2, _super);
      function _URI2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._formatted = null;
        _this._fsPath = null;
        return _this;
      }
      Object.defineProperty(_URI2.prototype, "fsPath", {
        get: function() {
          if (!this._fsPath) {
            this._fsPath = _makeFsPath(this);
          }
          return this._fsPath;
        },
        enumerable: true,
        configurable: true
      });
      _URI2.prototype.toString = function(skipEncoding) {
        if (skipEncoding === void 0) {
          skipEncoding = false;
        }
        if (!skipEncoding) {
          if (!this._formatted) {
            this._formatted = _asFormatted(this, false);
          }
          return this._formatted;
        } else {
          return _asFormatted(this, true);
        }
      };
      _URI2.prototype.toJSON = function() {
        var res = {
          $mid: 1
        };
        if (this._fsPath) {
          res.fsPath = this._fsPath;
          res._sep = _pathSepMarker;
        }
        if (this._formatted) {
          res.external = this._formatted;
        }
        if (this.path) {
          res.path = this.path;
        }
        if (this.scheme) {
          res.scheme = this.scheme;
        }
        if (this.authority) {
          res.authority = this.authority;
        }
        if (this.query) {
          res.query = this.query;
        }
        if (this.fragment) {
          res.fragment = this.fragment;
        }
        return res;
      };
      return _URI2;
    }(URI);
    var encodeTable = (_a = {}, _a[58] = "%3A", _a[47] = "%2F", _a[63] = "%3F", _a[35] = "%23", _a[91] = "%5B", _a[93] = "%5D", _a[64] = "%40", _a[33] = "%21", _a[36] = "%24", _a[38] = "%26", _a[39] = "%27", _a[40] = "%28", _a[41] = "%29", _a[42] = "%2A", _a[43] = "%2B", _a[44] = "%2C", _a[59] = "%3B", _a[61] = "%3D", _a[32] = "%20", _a);
    function encodeURIComponentFast(uriComponent, allowSlash) {
      var res = void 0;
      var nativeEncodePos = -1;
      for (var pos = 0; pos < uriComponent.length; pos++) {
        var code = uriComponent.charCodeAt(pos);
        if (code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 48 && code <= 57 || code === 45 || code === 46 || code === 95 || code === 126 || allowSlash && code === 47) {
          if (nativeEncodePos !== -1) {
            res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
            nativeEncodePos = -1;
          }
          if (res !== void 0) {
            res += uriComponent.charAt(pos);
          }
        } else {
          if (res === void 0) {
            res = uriComponent.substr(0, pos);
          }
          var escaped = encodeTable[code];
          if (escaped !== void 0) {
            if (nativeEncodePos !== -1) {
              res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
              nativeEncodePos = -1;
            }
            res += escaped;
          } else if (nativeEncodePos === -1) {
            nativeEncodePos = pos;
          }
        }
      }
      if (nativeEncodePos !== -1) {
        res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
      }
      return res !== void 0 ? res : uriComponent;
    }
    function encodeURIComponentMinimal(path) {
      var res = void 0;
      for (var pos = 0; pos < path.length; pos++) {
        var code = path.charCodeAt(pos);
        if (code === 35 || code === 63) {
          if (res === void 0) {
            res = path.substr(0, pos);
          }
          res += encodeTable[code];
        } else {
          if (res !== void 0) {
            res += path[pos];
          }
        }
      }
      return res !== void 0 ? res : path;
    }
    function _makeFsPath(uri) {
      var value;
      if (uri.authority && uri.path.length > 1 && uri.scheme === "file") {
        value = "//" + uri.authority + uri.path;
      } else if (uri.path.charCodeAt(0) === 47 && (uri.path.charCodeAt(1) >= 65 && uri.path.charCodeAt(1) <= 90 || uri.path.charCodeAt(1) >= 97 && uri.path.charCodeAt(1) <= 122) && uri.path.charCodeAt(2) === 58) {
        value = uri.path[1].toLowerCase() + uri.path.substr(2);
      } else {
        value = uri.path;
      }
      if (platform_1.isWindows) {
        value = value.replace(/\//g, "\\");
      }
      return value;
    }
    function _asFormatted(uri, skipEncoding) {
      var encoder = !skipEncoding ? encodeURIComponentFast : encodeURIComponentMinimal;
      var res = "";
      var scheme = uri.scheme, authority = uri.authority, path = uri.path, query = uri.query, fragment = uri.fragment;
      if (scheme) {
        res += scheme;
        res += ":";
      }
      if (authority || scheme === "file") {
        res += _slash;
        res += _slash;
      }
      if (authority) {
        var idx = authority.indexOf("@");
        if (idx !== -1) {
          var userinfo = authority.substr(0, idx);
          authority = authority.substr(idx + 1);
          idx = userinfo.indexOf(":");
          if (idx === -1) {
            res += encoder(userinfo, false);
          } else {
            res += encoder(userinfo.substr(0, idx), false);
            res += ":";
            res += encoder(userinfo.substr(idx + 1), false);
          }
          res += "@";
        }
        authority = authority.toLowerCase();
        idx = authority.indexOf(":");
        if (idx === -1) {
          res += encoder(authority, false);
        } else {
          res += encoder(authority.substr(0, idx), false);
          res += authority.substr(idx);
        }
      }
      if (path) {
        if (path.length >= 3 && path.charCodeAt(0) === 47 && path.charCodeAt(2) === 58) {
          var code = path.charCodeAt(1);
          if (code >= 65 && code <= 90) {
            path = "/" + String.fromCharCode(code + 32) + ":" + path.substr(3);
          }
        } else if (path.length >= 2 && path.charCodeAt(1) === 58) {
          var code = path.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            path = String.fromCharCode(code + 32) + ":" + path.substr(2);
          }
        }
        res += encoder(path, true);
      }
      if (query) {
        res += "?";
        res += encoder(query, false);
      }
      if (fragment) {
        res += "#";
        res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
      }
      return res;
    }
    function decodeURIComponentGraceful(str) {
      try {
        return decodeURIComponent(str);
      } catch (_a2) {
        if (str.length > 3) {
          return str.substr(0, 3) + decodeURIComponentGraceful(str.substr(3));
        } else {
          return str;
        }
      }
    }
    var _rEncodedAsHex = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function percentDecode(str) {
      if (!str.match(_rEncodedAsHex)) {
        return str;
      }
      return str.replace(_rEncodedAsHex, function(match) {
        return decodeURIComponentGraceful(match);
      });
    }
  });
  define(__m[32], __M([0, 1, 3, 8, 4, 10]), function(require2, exports2, errors_1, lifecycle_1, platform_1, types) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var INITIALIZE = "$initialize";
    var webWorkerWarningLogged = false;
    function logOnceWebWorkerWarning(err) {
      if (!platform_1.isWeb) {
        return;
      }
      if (!webWorkerWarningLogged) {
        webWorkerWarningLogged = true;
        console.warn("Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/Microsoft/monaco-editor#faq");
      }
      console.warn(err.message);
    }
    exports2.logOnceWebWorkerWarning = logOnceWebWorkerWarning;
    var SimpleWorkerProtocol = function() {
      function SimpleWorkerProtocol2(handler) {
        this._workerId = -1;
        this._handler = handler;
        this._lastSentReq = 0;
        this._pendingReplies = Object.create(null);
      }
      SimpleWorkerProtocol2.prototype.setWorkerId = function(workerId) {
        this._workerId = workerId;
      };
      SimpleWorkerProtocol2.prototype.sendMessage = function(method, args) {
        var _this = this;
        var req = String(++this._lastSentReq);
        return new Promise(function(resolve, reject) {
          _this._pendingReplies[req] = {
            resolve,
            reject
          };
          _this._send({
            vsWorker: _this._workerId,
            req,
            method,
            args
          });
        });
      };
      SimpleWorkerProtocol2.prototype.handleMessage = function(message) {
        if (!message || !message.vsWorker) {
          return;
        }
        if (this._workerId !== -1 && message.vsWorker !== this._workerId) {
          return;
        }
        this._handleMessage(message);
      };
      SimpleWorkerProtocol2.prototype._handleMessage = function(msg) {
        var _this = this;
        if (msg.seq) {
          var replyMessage = msg;
          if (!this._pendingReplies[replyMessage.seq]) {
            console.warn("Got reply to unknown seq");
            return;
          }
          var reply = this._pendingReplies[replyMessage.seq];
          delete this._pendingReplies[replyMessage.seq];
          if (replyMessage.err) {
            var err = replyMessage.err;
            if (replyMessage.err.$isError) {
              err = new Error();
              err.name = replyMessage.err.name;
              err.message = replyMessage.err.message;
              err.stack = replyMessage.err.stack;
            }
            reply.reject(err);
            return;
          }
          reply.resolve(replyMessage.res);
          return;
        }
        var requestMessage = msg;
        var req = requestMessage.req;
        var result = this._handler.handleMessage(requestMessage.method, requestMessage.args);
        result.then(function(r) {
          _this._send({
            vsWorker: _this._workerId,
            seq: req,
            res: r,
            err: void 0
          });
        }, function(e) {
          if (e.detail instanceof Error) {
            e.detail = errors_1.transformErrorForSerialization(e.detail);
          }
          _this._send({
            vsWorker: _this._workerId,
            seq: req,
            res: void 0,
            err: errors_1.transformErrorForSerialization(e)
          });
        });
      };
      SimpleWorkerProtocol2.prototype._send = function(msg) {
        var transfer = [];
        if (msg.req) {
          var m = msg;
          for (var i = 0; i < m.args.length; i++) {
            if (m.args[i] instanceof ArrayBuffer) {
              transfer.push(m.args[i]);
            }
          }
        } else {
          var m = msg;
          if (m.res instanceof ArrayBuffer) {
            transfer.push(m.res);
          }
        }
        this._handler.sendMessage(msg, transfer);
      };
      return SimpleWorkerProtocol2;
    }();
    var SimpleWorkerClient = function(_super) {
      __extends(SimpleWorkerClient2, _super);
      function SimpleWorkerClient2(workerFactory, moduleId, host) {
        var _this = _super.call(this) || this;
        var lazyProxyReject = null;
        _this._worker = _this._register(workerFactory.create("vs/base/common/worker/simpleWorker", function(msg) {
          _this._protocol.handleMessage(msg);
        }, function(err) {
          if (lazyProxyReject) {
            lazyProxyReject(err);
          }
        }));
        _this._protocol = new SimpleWorkerProtocol({
          sendMessage: function(msg, transfer) {
            _this._worker.postMessage(msg, transfer);
          },
          handleMessage: function(method, args) {
            if (typeof host[method] !== "function") {
              return Promise.reject(new Error("Missing method " + method + " on main thread host."));
            }
            try {
              return Promise.resolve(host[method].apply(host, args));
            } catch (e) {
              return Promise.reject(e);
            }
          }
        });
        _this._protocol.setWorkerId(_this._worker.getId());
        var loaderConfiguration = null;
        if (typeof self.require !== "undefined" && typeof self.require.getConfig === "function") {
          loaderConfiguration = self.require.getConfig();
        } else if (typeof self.requirejs !== "undefined") {
          loaderConfiguration = self.requirejs.s.contexts._.config;
        }
        var hostMethods = types.getAllMethodNames(host);
        _this._onModuleLoaded = _this._protocol.sendMessage(INITIALIZE, [_this._worker.getId(), JSON.parse(JSON.stringify(loaderConfiguration)), moduleId, hostMethods]);
        var proxyMethodRequest = function(method, args) {
          return _this._request(method, args);
        };
        _this._lazyProxy = new Promise(function(resolve, reject) {
          lazyProxyReject = reject;
          _this._onModuleLoaded.then(function(availableMethods) {
            resolve(types.createProxyObject(availableMethods, proxyMethodRequest));
          }, function(e) {
            reject(e);
            _this._onError("Worker failed to load " + moduleId, e);
          });
        });
        return _this;
      }
      SimpleWorkerClient2.prototype.getProxyObject = function() {
        return this._lazyProxy;
      };
      SimpleWorkerClient2.prototype._request = function(method, args) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          _this._onModuleLoaded.then(function() {
            _this._protocol.sendMessage(method, args).then(resolve, reject);
          }, reject);
        });
      };
      SimpleWorkerClient2.prototype._onError = function(message, error) {
        console.error(message);
        console.info(error);
      };
      return SimpleWorkerClient2;
    }(lifecycle_1.Disposable);
    exports2.SimpleWorkerClient = SimpleWorkerClient;
    var SimpleWorkerServer = function() {
      function SimpleWorkerServer2(postMessage, requestHandlerFactory) {
        var _this = this;
        this._requestHandlerFactory = requestHandlerFactory;
        this._requestHandler = null;
        this._protocol = new SimpleWorkerProtocol({
          sendMessage: function(msg, transfer) {
            postMessage(msg, transfer);
          },
          handleMessage: function(method, args) {
            return _this._handleMessage(method, args);
          }
        });
      }
      SimpleWorkerServer2.prototype.onmessage = function(msg) {
        this._protocol.handleMessage(msg);
      };
      SimpleWorkerServer2.prototype._handleMessage = function(method, args) {
        if (method === INITIALIZE) {
          return this.initialize(args[0], args[1], args[2], args[3]);
        }
        if (!this._requestHandler || typeof this._requestHandler[method] !== "function") {
          return Promise.reject(new Error("Missing requestHandler or method: " + method));
        }
        try {
          return Promise.resolve(this._requestHandler[method].apply(this._requestHandler, args));
        } catch (e) {
          return Promise.reject(e);
        }
      };
      SimpleWorkerServer2.prototype.initialize = function(workerId, loaderConfig, moduleId, hostMethods) {
        var _this = this;
        this._protocol.setWorkerId(workerId);
        var proxyMethodRequest = function(method, args) {
          return _this._protocol.sendMessage(method, args);
        };
        var hostProxy = types.createProxyObject(hostMethods, proxyMethodRequest);
        if (this._requestHandlerFactory) {
          this._requestHandler = this._requestHandlerFactory(hostProxy);
          return Promise.resolve(types.getAllMethodNames(this._requestHandler));
        }
        if (loaderConfig) {
          if (typeof loaderConfig.baseUrl !== "undefined") {
            delete loaderConfig["baseUrl"];
          }
          if (typeof loaderConfig.paths !== "undefined") {
            if (typeof loaderConfig.paths.vs !== "undefined") {
              delete loaderConfig.paths["vs"];
            }
          }
          loaderConfig.catchError = true;
          self.require.config(loaderConfig);
        }
        return new Promise(function(resolve, reject) {
          self.require([moduleId], function(module2) {
            _this._requestHandler = module2.create(hostProxy);
            if (!_this._requestHandler) {
              reject(new Error("No RequestHandler!"));
              return;
            }
            resolve(types.getAllMethodNames(_this._requestHandler));
          }, reject);
        });
      };
      return SimpleWorkerServer2;
    }();
    exports2.SimpleWorkerServer = SimpleWorkerServer;
    function create(postMessage) {
      return new SimpleWorkerServer(postMessage, null);
    }
    exports2.create = create;
  });
  define(__m[21], __M([0, 1, 11]), function(require2, exports2, uint_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var CharacterClassifier = function() {
      function CharacterClassifier2(_defaultValue) {
        var defaultValue = uint_1.toUint8(_defaultValue);
        this._defaultValue = defaultValue;
        this._asciiMap = CharacterClassifier2._createAsciiMap(defaultValue);
        this._map = new Map();
      }
      CharacterClassifier2._createAsciiMap = function(defaultValue) {
        var asciiMap = new Uint8Array(256);
        for (var i = 0; i < 256; i++) {
          asciiMap[i] = defaultValue;
        }
        return asciiMap;
      };
      CharacterClassifier2.prototype.set = function(charCode, _value) {
        var value = uint_1.toUint8(_value);
        if (charCode >= 0 && charCode < 256) {
          this._asciiMap[charCode] = value;
        } else {
          this._map.set(charCode, value);
        }
      };
      CharacterClassifier2.prototype.get = function(charCode) {
        if (charCode >= 0 && charCode < 256) {
          return this._asciiMap[charCode];
        } else {
          return this._map.get(charCode) || this._defaultValue;
        }
      };
      return CharacterClassifier2;
    }();
    exports2.CharacterClassifier = CharacterClassifier;
    var CharacterSet = function() {
      function CharacterSet2() {
        this._actual = new CharacterClassifier(0);
      }
      CharacterSet2.prototype.add = function(charCode) {
        this._actual.set(charCode, 1);
      };
      CharacterSet2.prototype.has = function(charCode) {
        return this._actual.get(charCode) === 1;
      };
      return CharacterSet2;
    }();
    exports2.CharacterSet = CharacterSet;
  });
  define(__m[2], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var Position = function() {
      function Position2(lineNumber, column) {
        this.lineNumber = lineNumber;
        this.column = column;
      }
      Position2.prototype.with = function(newLineNumber, newColumn) {
        if (newLineNumber === void 0) {
          newLineNumber = this.lineNumber;
        }
        if (newColumn === void 0) {
          newColumn = this.column;
        }
        if (newLineNumber === this.lineNumber && newColumn === this.column) {
          return this;
        } else {
          return new Position2(newLineNumber, newColumn);
        }
      };
      Position2.prototype.delta = function(deltaLineNumber, deltaColumn) {
        if (deltaLineNumber === void 0) {
          deltaLineNumber = 0;
        }
        if (deltaColumn === void 0) {
          deltaColumn = 0;
        }
        return this.with(this.lineNumber + deltaLineNumber, this.column + deltaColumn);
      };
      Position2.prototype.equals = function(other) {
        return Position2.equals(this, other);
      };
      Position2.equals = function(a, b) {
        if (!a && !b) {
          return true;
        }
        return !!a && !!b && a.lineNumber === b.lineNumber && a.column === b.column;
      };
      Position2.prototype.isBefore = function(other) {
        return Position2.isBefore(this, other);
      };
      Position2.isBefore = function(a, b) {
        if (a.lineNumber < b.lineNumber) {
          return true;
        }
        if (b.lineNumber < a.lineNumber) {
          return false;
        }
        return a.column < b.column;
      };
      Position2.prototype.isBeforeOrEqual = function(other) {
        return Position2.isBeforeOrEqual(this, other);
      };
      Position2.isBeforeOrEqual = function(a, b) {
        if (a.lineNumber < b.lineNumber) {
          return true;
        }
        if (b.lineNumber < a.lineNumber) {
          return false;
        }
        return a.column <= b.column;
      };
      Position2.compare = function(a, b) {
        var aLineNumber = a.lineNumber | 0;
        var bLineNumber = b.lineNumber | 0;
        if (aLineNumber === bLineNumber) {
          var aColumn = a.column | 0;
          var bColumn = b.column | 0;
          return aColumn - bColumn;
        }
        return aLineNumber - bLineNumber;
      };
      Position2.prototype.clone = function() {
        return new Position2(this.lineNumber, this.column);
      };
      Position2.prototype.toString = function() {
        return "(" + this.lineNumber + "," + this.column + ")";
      };
      Position2.lift = function(pos) {
        return new Position2(pos.lineNumber, pos.column);
      };
      Position2.isIPosition = function(obj) {
        return obj && typeof obj.lineNumber === "number" && typeof obj.column === "number";
      };
      return Position2;
    }();
    exports2.Position = Position;
  });
  define(__m[5], __M([0, 1, 2]), function(require2, exports2, position_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var Range = function() {
      function Range2(startLineNumber, startColumn, endLineNumber, endColumn) {
        if (startLineNumber > endLineNumber || startLineNumber === endLineNumber && startColumn > endColumn) {
          this.startLineNumber = endLineNumber;
          this.startColumn = endColumn;
          this.endLineNumber = startLineNumber;
          this.endColumn = startColumn;
        } else {
          this.startLineNumber = startLineNumber;
          this.startColumn = startColumn;
          this.endLineNumber = endLineNumber;
          this.endColumn = endColumn;
        }
      }
      Range2.prototype.isEmpty = function() {
        return Range2.isEmpty(this);
      };
      Range2.isEmpty = function(range) {
        return range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn;
      };
      Range2.prototype.containsPosition = function(position) {
        return Range2.containsPosition(this, position);
      };
      Range2.containsPosition = function(range, position) {
        if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) {
          return false;
        }
        if (position.lineNumber === range.startLineNumber && position.column < range.startColumn) {
          return false;
        }
        if (position.lineNumber === range.endLineNumber && position.column > range.endColumn) {
          return false;
        }
        return true;
      };
      Range2.prototype.containsRange = function(range) {
        return Range2.containsRange(this, range);
      };
      Range2.containsRange = function(range, otherRange) {
        if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
          return false;
        }
        if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
          return false;
        }
        if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn < range.startColumn) {
          return false;
        }
        if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn > range.endColumn) {
          return false;
        }
        return true;
      };
      Range2.prototype.strictContainsRange = function(range) {
        return Range2.strictContainsRange(this, range);
      };
      Range2.strictContainsRange = function(range, otherRange) {
        if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
          return false;
        }
        if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
          return false;
        }
        if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn <= range.startColumn) {
          return false;
        }
        if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn >= range.endColumn) {
          return false;
        }
        return true;
      };
      Range2.prototype.plusRange = function(range) {
        return Range2.plusRange(this, range);
      };
      Range2.plusRange = function(a, b) {
        var startLineNumber;
        var startColumn;
        var endLineNumber;
        var endColumn;
        if (b.startLineNumber < a.startLineNumber) {
          startLineNumber = b.startLineNumber;
          startColumn = b.startColumn;
        } else if (b.startLineNumber === a.startLineNumber) {
          startLineNumber = b.startLineNumber;
          startColumn = Math.min(b.startColumn, a.startColumn);
        } else {
          startLineNumber = a.startLineNumber;
          startColumn = a.startColumn;
        }
        if (b.endLineNumber > a.endLineNumber) {
          endLineNumber = b.endLineNumber;
          endColumn = b.endColumn;
        } else if (b.endLineNumber === a.endLineNumber) {
          endLineNumber = b.endLineNumber;
          endColumn = Math.max(b.endColumn, a.endColumn);
        } else {
          endLineNumber = a.endLineNumber;
          endColumn = a.endColumn;
        }
        return new Range2(startLineNumber, startColumn, endLineNumber, endColumn);
      };
      Range2.prototype.intersectRanges = function(range) {
        return Range2.intersectRanges(this, range);
      };
      Range2.intersectRanges = function(a, b) {
        var resultStartLineNumber = a.startLineNumber;
        var resultStartColumn = a.startColumn;
        var resultEndLineNumber = a.endLineNumber;
        var resultEndColumn = a.endColumn;
        var otherStartLineNumber = b.startLineNumber;
        var otherStartColumn = b.startColumn;
        var otherEndLineNumber = b.endLineNumber;
        var otherEndColumn = b.endColumn;
        if (resultStartLineNumber < otherStartLineNumber) {
          resultStartLineNumber = otherStartLineNumber;
          resultStartColumn = otherStartColumn;
        } else if (resultStartLineNumber === otherStartLineNumber) {
          resultStartColumn = Math.max(resultStartColumn, otherStartColumn);
        }
        if (resultEndLineNumber > otherEndLineNumber) {
          resultEndLineNumber = otherEndLineNumber;
          resultEndColumn = otherEndColumn;
        } else if (resultEndLineNumber === otherEndLineNumber) {
          resultEndColumn = Math.min(resultEndColumn, otherEndColumn);
        }
        if (resultStartLineNumber > resultEndLineNumber) {
          return null;
        }
        if (resultStartLineNumber === resultEndLineNumber && resultStartColumn > resultEndColumn) {
          return null;
        }
        return new Range2(resultStartLineNumber, resultStartColumn, resultEndLineNumber, resultEndColumn);
      };
      Range2.prototype.equalsRange = function(other) {
        return Range2.equalsRange(this, other);
      };
      Range2.equalsRange = function(a, b) {
        return !!a && !!b && a.startLineNumber === b.startLineNumber && a.startColumn === b.startColumn && a.endLineNumber === b.endLineNumber && a.endColumn === b.endColumn;
      };
      Range2.prototype.getEndPosition = function() {
        return new position_1.Position(this.endLineNumber, this.endColumn);
      };
      Range2.prototype.getStartPosition = function() {
        return new position_1.Position(this.startLineNumber, this.startColumn);
      };
      Range2.prototype.toString = function() {
        return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
      };
      Range2.prototype.setEndPosition = function(endLineNumber, endColumn) {
        return new Range2(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
      };
      Range2.prototype.setStartPosition = function(startLineNumber, startColumn) {
        return new Range2(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
      };
      Range2.prototype.collapseToStart = function() {
        return Range2.collapseToStart(this);
      };
      Range2.collapseToStart = function(range) {
        return new Range2(range.startLineNumber, range.startColumn, range.startLineNumber, range.startColumn);
      };
      Range2.fromPositions = function(start, end) {
        if (end === void 0) {
          end = start;
        }
        return new Range2(start.lineNumber, start.column, end.lineNumber, end.column);
      };
      Range2.lift = function(range) {
        if (!range) {
          return null;
        }
        return new Range2(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
      };
      Range2.isIRange = function(obj) {
        return obj && typeof obj.startLineNumber === "number" && typeof obj.startColumn === "number" && typeof obj.endLineNumber === "number" && typeof obj.endColumn === "number";
      };
      Range2.areIntersectingOrTouching = function(a, b) {
        if (a.endLineNumber < b.startLineNumber || a.endLineNumber === b.startLineNumber && a.endColumn < b.startColumn) {
          return false;
        }
        if (b.endLineNumber < a.startLineNumber || b.endLineNumber === a.startLineNumber && b.endColumn < a.startColumn) {
          return false;
        }
        return true;
      };
      Range2.areIntersecting = function(a, b) {
        if (a.endLineNumber < b.startLineNumber || a.endLineNumber === b.startLineNumber && a.endColumn <= b.startColumn) {
          return false;
        }
        if (b.endLineNumber < a.startLineNumber || b.endLineNumber === a.startLineNumber && b.endColumn <= a.startColumn) {
          return false;
        }
        return true;
      };
      Range2.compareRangesUsingStarts = function(a, b) {
        if (a && b) {
          var aStartLineNumber = a.startLineNumber | 0;
          var bStartLineNumber = b.startLineNumber | 0;
          if (aStartLineNumber === bStartLineNumber) {
            var aStartColumn = a.startColumn | 0;
            var bStartColumn = b.startColumn | 0;
            if (aStartColumn === bStartColumn) {
              var aEndLineNumber = a.endLineNumber | 0;
              var bEndLineNumber = b.endLineNumber | 0;
              if (aEndLineNumber === bEndLineNumber) {
                var aEndColumn = a.endColumn | 0;
                var bEndColumn = b.endColumn | 0;
                return aEndColumn - bEndColumn;
              }
              return aEndLineNumber - bEndLineNumber;
            }
            return aStartColumn - bStartColumn;
          }
          return aStartLineNumber - bStartLineNumber;
        }
        var aExists = a ? 1 : 0;
        var bExists = b ? 1 : 0;
        return aExists - bExists;
      };
      Range2.compareRangesUsingEnds = function(a, b) {
        if (a.endLineNumber === b.endLineNumber) {
          if (a.endColumn === b.endColumn) {
            if (a.startLineNumber === b.startLineNumber) {
              return a.startColumn - b.startColumn;
            }
            return a.startLineNumber - b.startLineNumber;
          }
          return a.endColumn - b.endColumn;
        }
        return a.endLineNumber - b.endLineNumber;
      };
      Range2.spansMultipleLines = function(range) {
        return range.endLineNumber > range.startLineNumber;
      };
      return Range2;
    }();
    exports2.Range = Range;
  });
  define(__m[22], __M([0, 1, 2, 5]), function(require2, exports2, position_1, range_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var Selection = function(_super) {
      __extends(Selection2, _super);
      function Selection2(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn) {
        var _this = _super.call(this, selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn) || this;
        _this.selectionStartLineNumber = selectionStartLineNumber;
        _this.selectionStartColumn = selectionStartColumn;
        _this.positionLineNumber = positionLineNumber;
        _this.positionColumn = positionColumn;
        return _this;
      }
      Selection2.prototype.toString = function() {
        return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
      };
      Selection2.prototype.equalsSelection = function(other) {
        return Selection2.selectionsEqual(this, other);
      };
      Selection2.selectionsEqual = function(a, b) {
        return a.selectionStartLineNumber === b.selectionStartLineNumber && a.selectionStartColumn === b.selectionStartColumn && a.positionLineNumber === b.positionLineNumber && a.positionColumn === b.positionColumn;
      };
      Selection2.prototype.getDirection = function() {
        if (this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn) {
          return 0;
        }
        return 1;
      };
      Selection2.prototype.setEndPosition = function(endLineNumber, endColumn) {
        if (this.getDirection() === 0) {
          return new Selection2(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
        }
        return new Selection2(endLineNumber, endColumn, this.startLineNumber, this.startColumn);
      };
      Selection2.prototype.getPosition = function() {
        return new position_1.Position(this.positionLineNumber, this.positionColumn);
      };
      Selection2.prototype.setStartPosition = function(startLineNumber, startColumn) {
        if (this.getDirection() === 0) {
          return new Selection2(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
        }
        return new Selection2(this.endLineNumber, this.endColumn, startLineNumber, startColumn);
      };
      Selection2.fromPositions = function(start, end) {
        if (end === void 0) {
          end = start;
        }
        return new Selection2(start.lineNumber, start.column, end.lineNumber, end.column);
      };
      Selection2.liftSelection = function(sel) {
        return new Selection2(sel.selectionStartLineNumber, sel.selectionStartColumn, sel.positionLineNumber, sel.positionColumn);
      };
      Selection2.selectionsArrEqual = function(a, b) {
        if (a && !b || !a && b) {
          return false;
        }
        if (!a && !b) {
          return true;
        }
        if (a.length !== b.length) {
          return false;
        }
        for (var i = 0, len = a.length; i < len; i++) {
          if (!this.selectionsEqual(a[i], b[i])) {
            return false;
          }
        }
        return true;
      };
      Selection2.isISelection = function(obj) {
        return obj && typeof obj.selectionStartLineNumber === "number" && typeof obj.selectionStartColumn === "number" && typeof obj.positionLineNumber === "number" && typeof obj.positionColumn === "number";
      };
      Selection2.createWithDirection = function(startLineNumber, startColumn, endLineNumber, endColumn, direction) {
        if (direction === 0) {
          return new Selection2(startLineNumber, startColumn, endLineNumber, endColumn);
        }
        return new Selection2(endLineNumber, endColumn, startLineNumber, startColumn);
      };
      return Selection2;
    }(range_1.Range);
    exports2.Selection = Selection;
  });
  define(__m[23], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var Token = function() {
      function Token2(offset, type, language) {
        this.offset = offset | 0;
        this.type = type;
        this.language = language;
      }
      Token2.prototype.toString = function() {
        return "(" + this.offset + ", " + this.type + ")";
      };
      return Token2;
    }();
    exports2.Token = Token;
    var TokenizationResult = function() {
      function TokenizationResult3(tokens, endState) {
        this.tokens = tokens;
        this.endState = endState;
      }
      return TokenizationResult3;
    }();
    exports2.TokenizationResult = TokenizationResult;
    var TokenizationResult2 = function() {
      function TokenizationResult22(tokens, endState) {
        this.tokens = tokens;
        this.endState = endState;
      }
      return TokenizationResult22;
    }();
    exports2.TokenizationResult2 = TokenizationResult2;
  });
  define(__m[24], __M([0, 1, 6, 20]), function(require2, exports2, diff_1, strings) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var MINIMUM_MATCHING_CHARACTER_LENGTH = 3;
    function computeDiff(originalSequence, modifiedSequence, continueProcessingPredicate, pretty) {
      var diffAlgo = new diff_1.LcsDiff(originalSequence, modifiedSequence, continueProcessingPredicate);
      return diffAlgo.ComputeDiff(pretty);
    }
    var LineSequence = function() {
      function LineSequence2(lines) {
        var startColumns = [];
        var endColumns = [];
        for (var i = 0, length_1 = lines.length; i < length_1; i++) {
          startColumns[i] = getFirstNonBlankColumn(lines[i], 1);
          endColumns[i] = getLastNonBlankColumn(lines[i], 1);
        }
        this.lines = lines;
        this._startColumns = startColumns;
        this._endColumns = endColumns;
      }
      LineSequence2.prototype.getElements = function() {
        var elements = [];
        for (var i = 0, len = this.lines.length; i < len; i++) {
          elements[i] = this.lines[i].substring(this._startColumns[i] - 1, this._endColumns[i] - 1);
        }
        return elements;
      };
      LineSequence2.prototype.getStartLineNumber = function(i) {
        return i + 1;
      };
      LineSequence2.prototype.getEndLineNumber = function(i) {
        return i + 1;
      };
      LineSequence2.prototype.createCharSequence = function(shouldIgnoreTrimWhitespace, startIndex, endIndex) {
        var charCodes = [];
        var lineNumbers = [];
        var columns = [];
        var len = 0;
        for (var index = startIndex; index <= endIndex; index++) {
          var lineContent = this.lines[index];
          var startColumn = shouldIgnoreTrimWhitespace ? this._startColumns[index] : 1;
          var endColumn = shouldIgnoreTrimWhitespace ? this._endColumns[index] : lineContent.length + 1;
          for (var col = startColumn; col < endColumn; col++) {
            charCodes[len] = lineContent.charCodeAt(col - 1);
            lineNumbers[len] = index + 1;
            columns[len] = col;
            len++;
          }
        }
        return new CharSequence(charCodes, lineNumbers, columns);
      };
      return LineSequence2;
    }();
    var CharSequence = function() {
      function CharSequence2(charCodes, lineNumbers, columns) {
        this._charCodes = charCodes;
        this._lineNumbers = lineNumbers;
        this._columns = columns;
      }
      CharSequence2.prototype.getElements = function() {
        return this._charCodes;
      };
      CharSequence2.prototype.getStartLineNumber = function(i) {
        return this._lineNumbers[i];
      };
      CharSequence2.prototype.getStartColumn = function(i) {
        return this._columns[i];
      };
      CharSequence2.prototype.getEndLineNumber = function(i) {
        return this._lineNumbers[i];
      };
      CharSequence2.prototype.getEndColumn = function(i) {
        return this._columns[i] + 1;
      };
      return CharSequence2;
    }();
    var CharChange = function() {
      function CharChange2(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn) {
        this.originalStartLineNumber = originalStartLineNumber;
        this.originalStartColumn = originalStartColumn;
        this.originalEndLineNumber = originalEndLineNumber;
        this.originalEndColumn = originalEndColumn;
        this.modifiedStartLineNumber = modifiedStartLineNumber;
        this.modifiedStartColumn = modifiedStartColumn;
        this.modifiedEndLineNumber = modifiedEndLineNumber;
        this.modifiedEndColumn = modifiedEndColumn;
      }
      CharChange2.createFromDiffChange = function(diffChange, originalCharSequence, modifiedCharSequence) {
        var originalStartLineNumber;
        var originalStartColumn;
        var originalEndLineNumber;
        var originalEndColumn;
        var modifiedStartLineNumber;
        var modifiedStartColumn;
        var modifiedEndLineNumber;
        var modifiedEndColumn;
        if (diffChange.originalLength === 0) {
          originalStartLineNumber = 0;
          originalStartColumn = 0;
          originalEndLineNumber = 0;
          originalEndColumn = 0;
        } else {
          originalStartLineNumber = originalCharSequence.getStartLineNumber(diffChange.originalStart);
          originalStartColumn = originalCharSequence.getStartColumn(diffChange.originalStart);
          originalEndLineNumber = originalCharSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
          originalEndColumn = originalCharSequence.getEndColumn(diffChange.originalStart + diffChange.originalLength - 1);
        }
        if (diffChange.modifiedLength === 0) {
          modifiedStartLineNumber = 0;
          modifiedStartColumn = 0;
          modifiedEndLineNumber = 0;
          modifiedEndColumn = 0;
        } else {
          modifiedStartLineNumber = modifiedCharSequence.getStartLineNumber(diffChange.modifiedStart);
          modifiedStartColumn = modifiedCharSequence.getStartColumn(diffChange.modifiedStart);
          modifiedEndLineNumber = modifiedCharSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
          modifiedEndColumn = modifiedCharSequence.getEndColumn(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        }
        return new CharChange2(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn);
      };
      return CharChange2;
    }();
    function postProcessCharChanges(rawChanges) {
      if (rawChanges.length <= 1) {
        return rawChanges;
      }
      var result = [rawChanges[0]];
      var prevChange = result[0];
      for (var i = 1, len = rawChanges.length; i < len; i++) {
        var currChange = rawChanges[i];
        var originalMatchingLength = currChange.originalStart - (prevChange.originalStart + prevChange.originalLength);
        var modifiedMatchingLength = currChange.modifiedStart - (prevChange.modifiedStart + prevChange.modifiedLength);
        var matchingLength = Math.min(originalMatchingLength, modifiedMatchingLength);
        if (matchingLength < MINIMUM_MATCHING_CHARACTER_LENGTH) {
          prevChange.originalLength = currChange.originalStart + currChange.originalLength - prevChange.originalStart;
          prevChange.modifiedLength = currChange.modifiedStart + currChange.modifiedLength - prevChange.modifiedStart;
        } else {
          result.push(currChange);
          prevChange = currChange;
        }
      }
      return result;
    }
    var LineChange = function() {
      function LineChange2(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges) {
        this.originalStartLineNumber = originalStartLineNumber;
        this.originalEndLineNumber = originalEndLineNumber;
        this.modifiedStartLineNumber = modifiedStartLineNumber;
        this.modifiedEndLineNumber = modifiedEndLineNumber;
        this.charChanges = charChanges;
      }
      LineChange2.createFromDiffResult = function(shouldIgnoreTrimWhitespace, diffChange, originalLineSequence, modifiedLineSequence, continueCharDiff, shouldComputeCharChanges, shouldPostProcessCharChanges) {
        var originalStartLineNumber;
        var originalEndLineNumber;
        var modifiedStartLineNumber;
        var modifiedEndLineNumber;
        var charChanges = void 0;
        if (diffChange.originalLength === 0) {
          originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart) - 1;
          originalEndLineNumber = 0;
        } else {
          originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart);
          originalEndLineNumber = originalLineSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
        }
        if (diffChange.modifiedLength === 0) {
          modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart) - 1;
          modifiedEndLineNumber = 0;
        } else {
          modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart);
          modifiedEndLineNumber = modifiedLineSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        }
        if (shouldComputeCharChanges && diffChange.originalLength > 0 && diffChange.originalLength < 20 && diffChange.modifiedLength > 0 && diffChange.modifiedLength < 20 && continueCharDiff()) {
          var originalCharSequence = originalLineSequence.createCharSequence(shouldIgnoreTrimWhitespace, diffChange.originalStart, diffChange.originalStart + diffChange.originalLength - 1);
          var modifiedCharSequence = modifiedLineSequence.createCharSequence(shouldIgnoreTrimWhitespace, diffChange.modifiedStart, diffChange.modifiedStart + diffChange.modifiedLength - 1);
          var rawChanges = computeDiff(originalCharSequence, modifiedCharSequence, continueCharDiff, true).changes;
          if (shouldPostProcessCharChanges) {
            rawChanges = postProcessCharChanges(rawChanges);
          }
          charChanges = [];
          for (var i = 0, length_2 = rawChanges.length; i < length_2; i++) {
            charChanges.push(CharChange.createFromDiffChange(rawChanges[i], originalCharSequence, modifiedCharSequence));
          }
        }
        return new LineChange2(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges);
      };
      return LineChange2;
    }();
    var DiffComputer = function() {
      function DiffComputer2(originalLines, modifiedLines, opts) {
        this.shouldComputeCharChanges = opts.shouldComputeCharChanges;
        this.shouldPostProcessCharChanges = opts.shouldPostProcessCharChanges;
        this.shouldIgnoreTrimWhitespace = opts.shouldIgnoreTrimWhitespace;
        this.shouldMakePrettyDiff = opts.shouldMakePrettyDiff;
        this.originalLines = originalLines;
        this.modifiedLines = modifiedLines;
        this.original = new LineSequence(originalLines);
        this.modified = new LineSequence(modifiedLines);
        this.continueLineDiff = createContinueProcessingPredicate(opts.maxComputationTime);
        this.continueCharDiff = createContinueProcessingPredicate(opts.maxComputationTime === 0 ? 0 : Math.min(opts.maxComputationTime, 5000));
      }
      DiffComputer2.prototype.computeDiff = function() {
        if (this.original.lines.length === 1 && this.original.lines[0].length === 0) {
          return {
            quitEarly: false,
            changes: [{
              originalStartLineNumber: 1,
              originalEndLineNumber: 1,
              modifiedStartLineNumber: 1,
              modifiedEndLineNumber: this.modified.lines.length,
              charChanges: [{
                modifiedEndColumn: 0,
                modifiedEndLineNumber: 0,
                modifiedStartColumn: 0,
                modifiedStartLineNumber: 0,
                originalEndColumn: 0,
                originalEndLineNumber: 0,
                originalStartColumn: 0,
                originalStartLineNumber: 0
              }]
            }]
          };
        }
        if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) {
          return {
            quitEarly: false,
            changes: [{
              originalStartLineNumber: 1,
              originalEndLineNumber: this.original.lines.length,
              modifiedStartLineNumber: 1,
              modifiedEndLineNumber: 1,
              charChanges: [{
                modifiedEndColumn: 0,
                modifiedEndLineNumber: 0,
                modifiedStartColumn: 0,
                modifiedStartLineNumber: 0,
                originalEndColumn: 0,
                originalEndLineNumber: 0,
                originalStartColumn: 0,
                originalStartLineNumber: 0
              }]
            }]
          };
        }
        var diffResult = computeDiff(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff);
        var rawChanges = diffResult.changes;
        var quitEarly = diffResult.quitEarly;
        if (this.shouldIgnoreTrimWhitespace) {
          var lineChanges = [];
          for (var i = 0, length_3 = rawChanges.length; i < length_3; i++) {
            lineChanges.push(LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, rawChanges[i], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
          }
          return {
            quitEarly,
            changes: lineChanges
          };
        }
        var result = [];
        var originalLineIndex = 0;
        var modifiedLineIndex = 0;
        for (var i = -1, len = rawChanges.length; i < len; i++) {
          var nextChange = i + 1 < len ? rawChanges[i + 1] : null;
          var originalStop = nextChange ? nextChange.originalStart : this.originalLines.length;
          var modifiedStop = nextChange ? nextChange.modifiedStart : this.modifiedLines.length;
          while (originalLineIndex < originalStop && modifiedLineIndex < modifiedStop) {
            var originalLine = this.originalLines[originalLineIndex];
            var modifiedLine = this.modifiedLines[modifiedLineIndex];
            if (originalLine !== modifiedLine) {
              {
                var originalStartColumn = getFirstNonBlankColumn(originalLine, 1);
                var modifiedStartColumn = getFirstNonBlankColumn(modifiedLine, 1);
                while (originalStartColumn > 1 && modifiedStartColumn > 1) {
                  var originalChar = originalLine.charCodeAt(originalStartColumn - 2);
                  var modifiedChar = modifiedLine.charCodeAt(modifiedStartColumn - 2);
                  if (originalChar !== modifiedChar) {
                    break;
                  }
                  originalStartColumn--;
                  modifiedStartColumn--;
                }
                if (originalStartColumn > 1 || modifiedStartColumn > 1) {
                  this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, 1, originalStartColumn, modifiedLineIndex + 1, 1, modifiedStartColumn);
                }
              }
              {
                var originalEndColumn = getLastNonBlankColumn(originalLine, 1);
                var modifiedEndColumn = getLastNonBlankColumn(modifiedLine, 1);
                var originalMaxColumn = originalLine.length + 1;
                var modifiedMaxColumn = modifiedLine.length + 1;
                while (originalEndColumn < originalMaxColumn && modifiedEndColumn < modifiedMaxColumn) {
                  var originalChar = originalLine.charCodeAt(originalEndColumn - 1);
                  var modifiedChar = originalLine.charCodeAt(modifiedEndColumn - 1);
                  if (originalChar !== modifiedChar) {
                    break;
                  }
                  originalEndColumn++;
                  modifiedEndColumn++;
                }
                if (originalEndColumn < originalMaxColumn || modifiedEndColumn < modifiedMaxColumn) {
                  this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, originalEndColumn, originalMaxColumn, modifiedLineIndex + 1, modifiedEndColumn, modifiedMaxColumn);
                }
              }
            }
            originalLineIndex++;
            modifiedLineIndex++;
          }
          if (nextChange) {
            result.push(LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, nextChange, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
            originalLineIndex += nextChange.originalLength;
            modifiedLineIndex += nextChange.modifiedLength;
          }
        }
        return {
          quitEarly,
          changes: result
        };
      };
      DiffComputer2.prototype._pushTrimWhitespaceCharChange = function(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
        if (this._mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn)) {
          return;
        }
        var charChanges = void 0;
        if (this.shouldComputeCharChanges) {
          charChanges = [new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn)];
        }
        result.push(new LineChange(originalLineNumber, originalLineNumber, modifiedLineNumber, modifiedLineNumber, charChanges));
      };
      DiffComputer2.prototype._mergeTrimWhitespaceCharChange = function(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
        var len = result.length;
        if (len === 0) {
          return false;
        }
        var prevChange = result[len - 1];
        if (prevChange.originalEndLineNumber === 0 || prevChange.modifiedEndLineNumber === 0) {
          return false;
        }
        if (prevChange.originalEndLineNumber + 1 === originalLineNumber && prevChange.modifiedEndLineNumber + 1 === modifiedLineNumber) {
          prevChange.originalEndLineNumber = originalLineNumber;
          prevChange.modifiedEndLineNumber = modifiedLineNumber;
          if (this.shouldComputeCharChanges && prevChange.charChanges) {
            prevChange.charChanges.push(new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn));
          }
          return true;
        }
        return false;
      };
      return DiffComputer2;
    }();
    exports2.DiffComputer = DiffComputer;
    function getFirstNonBlankColumn(txt, defaultValue) {
      var r = strings.firstNonWhitespaceIndex(txt);
      if (r === -1) {
        return defaultValue;
      }
      return r + 1;
    }
    function getLastNonBlankColumn(txt, defaultValue) {
      var r = strings.lastNonWhitespaceIndex(txt);
      if (r === -1) {
        return defaultValue;
      }
      return r + 2;
    }
    function createContinueProcessingPredicate(maximumRuntime) {
      if (maximumRuntime === 0) {
        return function() {
          return true;
        };
      }
      var startTime = Date.now();
      return function() {
        return Date.now() - startTime < maximumRuntime;
      };
    }
  });
  define(__m[25], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.USUAL_WORD_SEPARATORS = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
    function createWordRegExp(allowInWords) {
      if (allowInWords === void 0) {
        allowInWords = "";
      }
      var source = "(-?\\d*\\.\\d\\w*)|([^";
      for (var _i = 0, USUAL_WORD_SEPARATORS_1 = exports2.USUAL_WORD_SEPARATORS; _i < USUAL_WORD_SEPARATORS_1.length; _i++) {
        var sep = USUAL_WORD_SEPARATORS_1[_i];
        if (allowInWords.indexOf(sep) >= 0) {
          continue;
        }
        source += "\\" + sep;
      }
      source += "\\s]+)";
      return new RegExp(source, "g");
    }
    exports2.DEFAULT_WORD_REGEXP = createWordRegExp();
    function ensureValidWordDefinition(wordDefinition) {
      var result = exports2.DEFAULT_WORD_REGEXP;
      if (wordDefinition && wordDefinition instanceof RegExp) {
        if (!wordDefinition.global) {
          var flags = "g";
          if (wordDefinition.ignoreCase) {
            flags += "i";
          }
          if (wordDefinition.multiline) {
            flags += "m";
          }
          if (wordDefinition.unicode) {
            flags += "u";
          }
          result = new RegExp(wordDefinition.source, flags);
        } else {
          result = wordDefinition;
        }
      }
      result.lastIndex = 0;
      return result;
    }
    exports2.ensureValidWordDefinition = ensureValidWordDefinition;
    function getWordAtPosFast(column, wordDefinition, text, textOffset) {
      var pos = column - 1 - textOffset;
      var start = text.lastIndexOf(" ", pos - 1) + 1;
      wordDefinition.lastIndex = start;
      var match;
      while (match = wordDefinition.exec(text)) {
        var matchIndex = match.index || 0;
        if (matchIndex <= pos && wordDefinition.lastIndex >= pos) {
          return {
            word: match[0],
            startColumn: textOffset + 1 + matchIndex,
            endColumn: textOffset + 1 + wordDefinition.lastIndex
          };
        }
      }
      return null;
    }
    function getWordAtPosSlow(column, wordDefinition, text, textOffset) {
      var pos = column - 1 - textOffset;
      wordDefinition.lastIndex = 0;
      var match;
      while (match = wordDefinition.exec(text)) {
        var matchIndex = match.index || 0;
        if (matchIndex > pos) {
          return null;
        } else if (wordDefinition.lastIndex >= pos) {
          return {
            word: match[0],
            startColumn: textOffset + 1 + matchIndex,
            endColumn: textOffset + 1 + wordDefinition.lastIndex
          };
        }
      }
      return null;
    }
    function getWordAtText(column, wordDefinition, text, textOffset) {
      wordDefinition.lastIndex = 0;
      var match = wordDefinition.exec(text);
      if (!match) {
        return null;
      }
      var ret = match[0].indexOf(" ") >= 0 ? getWordAtPosSlow(column, wordDefinition, text, textOffset) : getWordAtPosFast(column, wordDefinition, text, textOffset);
      wordDefinition.lastIndex = 0;
      return ret;
    }
    exports2.getWordAtText = getWordAtText;
  });
  define(__m[26], __M([0, 1, 21]), function(require2, exports2, characterClassifier_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var Uint8Matrix = function() {
      function Uint8Matrix2(rows, cols, defaultValue) {
        var data = new Uint8Array(rows * cols);
        for (var i = 0, len = rows * cols; i < len; i++) {
          data[i] = defaultValue;
        }
        this._data = data;
        this.rows = rows;
        this.cols = cols;
      }
      Uint8Matrix2.prototype.get = function(row, col) {
        return this._data[row * this.cols + col];
      };
      Uint8Matrix2.prototype.set = function(row, col, value) {
        this._data[row * this.cols + col] = value;
      };
      return Uint8Matrix2;
    }();
    exports2.Uint8Matrix = Uint8Matrix;
    var StateMachine = function() {
      function StateMachine2(edges) {
        var maxCharCode = 0;
        var maxState = 0;
        for (var i = 0, len = edges.length; i < len; i++) {
          var _a = edges[i], from = _a[0], chCode = _a[1], to = _a[2];
          if (chCode > maxCharCode) {
            maxCharCode = chCode;
          }
          if (from > maxState) {
            maxState = from;
          }
          if (to > maxState) {
            maxState = to;
          }
        }
        maxCharCode++;
        maxState++;
        var states = new Uint8Matrix(maxState, maxCharCode, 0);
        for (var i = 0, len = edges.length; i < len; i++) {
          var _b = edges[i], from = _b[0], chCode = _b[1], to = _b[2];
          states.set(from, chCode, to);
        }
        this._states = states;
        this._maxCharCode = maxCharCode;
      }
      StateMachine2.prototype.nextState = function(currentState, chCode) {
        if (chCode < 0 || chCode >= this._maxCharCode) {
          return 0;
        }
        return this._states.get(currentState, chCode);
      };
      return StateMachine2;
    }();
    exports2.StateMachine = StateMachine;
    var _stateMachine = null;
    function getStateMachine() {
      if (_stateMachine === null) {
        _stateMachine = new StateMachine([[1, 104, 2], [1, 72, 2], [1, 102, 6], [1, 70, 6], [2, 116, 3], [2, 84, 3], [3, 116, 4], [3, 84, 4], [4, 112, 5], [4, 80, 5], [5, 115, 9], [5, 83, 9], [5, 58, 10], [6, 105, 7], [6, 73, 7], [7, 108, 8], [7, 76, 8], [8, 101, 9], [8, 69, 9], [9, 58, 10], [10, 47, 11], [11, 47, 12]]);
      }
      return _stateMachine;
    }
    var _classifier = null;
    function getClassifier() {
      if (_classifier === null) {
        _classifier = new characterClassifier_1.CharacterClassifier(0);
        var FORCE_TERMINATION_CHARACTERS = ` 	<>'"、。｡､，．：；？！＠＃＄％＆＊‘“〈《「『【〔（［｛｢｣｝］）〕】』」》〉”’｀～…`;
        for (var i = 0; i < FORCE_TERMINATION_CHARACTERS.length; i++) {
          _classifier.set(FORCE_TERMINATION_CHARACTERS.charCodeAt(i), 1);
        }
        var CANNOT_END_WITH_CHARACTERS = ".,;";
        for (var i = 0; i < CANNOT_END_WITH_CHARACTERS.length; i++) {
          _classifier.set(CANNOT_END_WITH_CHARACTERS.charCodeAt(i), 2);
        }
      }
      return _classifier;
    }
    var LinkComputer = function() {
      function LinkComputer2() {
      }
      LinkComputer2._createLink = function(classifier, line, lineNumber, linkBeginIndex, linkEndIndex) {
        var lastIncludedCharIndex = linkEndIndex - 1;
        do {
          var chCode = line.charCodeAt(lastIncludedCharIndex);
          var chClass = classifier.get(chCode);
          if (chClass !== 2) {
            break;
          }
          lastIncludedCharIndex--;
        } while (lastIncludedCharIndex > linkBeginIndex);
        if (linkBeginIndex > 0) {
          var charCodeBeforeLink = line.charCodeAt(linkBeginIndex - 1);
          var lastCharCodeInLink = line.charCodeAt(lastIncludedCharIndex);
          if (charCodeBeforeLink === 40 && lastCharCodeInLink === 41 || charCodeBeforeLink === 91 && lastCharCodeInLink === 93 || charCodeBeforeLink === 123 && lastCharCodeInLink === 125) {
            lastIncludedCharIndex--;
          }
        }
        return {
          range: {
            startLineNumber: lineNumber,
            startColumn: linkBeginIndex + 1,
            endLineNumber: lineNumber,
            endColumn: lastIncludedCharIndex + 2
          },
          url: line.substring(linkBeginIndex, lastIncludedCharIndex + 1)
        };
      };
      LinkComputer2.computeLinks = function(model, stateMachine) {
        if (stateMachine === void 0) {
          stateMachine = getStateMachine();
        }
        var classifier = getClassifier();
        var result = [];
        for (var i = 1, lineCount = model.getLineCount(); i <= lineCount; i++) {
          var line = model.getLineContent(i);
          var len = line.length;
          var j = 0;
          var linkBeginIndex = 0;
          var linkBeginChCode = 0;
          var state = 1;
          var hasOpenParens = false;
          var hasOpenSquareBracket = false;
          var hasOpenCurlyBracket = false;
          while (j < len) {
            var resetStateMachine = false;
            var chCode = line.charCodeAt(j);
            if (state === 13) {
              var chClass = void 0;
              switch (chCode) {
                case 40:
                  hasOpenParens = true;
                  chClass = 0;
                  break;
                case 41:
                  chClass = hasOpenParens ? 0 : 1;
                  break;
                case 91:
                  hasOpenSquareBracket = true;
                  chClass = 0;
                  break;
                case 93:
                  chClass = hasOpenSquareBracket ? 0 : 1;
                  break;
                case 123:
                  hasOpenCurlyBracket = true;
                  chClass = 0;
                  break;
                case 125:
                  chClass = hasOpenCurlyBracket ? 0 : 1;
                  break;
                case 39:
                  chClass = linkBeginChCode === 34 || linkBeginChCode === 96 ? 0 : 1;
                  break;
                case 34:
                  chClass = linkBeginChCode === 39 || linkBeginChCode === 96 ? 0 : 1;
                  break;
                case 96:
                  chClass = linkBeginChCode === 39 || linkBeginChCode === 34 ? 0 : 1;
                  break;
                case 42:
                  chClass = linkBeginChCode === 42 ? 1 : 0;
                  break;
                case 124:
                  chClass = linkBeginChCode === 124 ? 1 : 0;
                  break;
                default:
                  chClass = classifier.get(chCode);
              }
              if (chClass === 1) {
                result.push(LinkComputer2._createLink(classifier, line, i, linkBeginIndex, j));
                resetStateMachine = true;
              }
            } else if (state === 12) {
              var chClass = void 0;
              if (chCode === 91) {
                hasOpenSquareBracket = true;
                chClass = 0;
              } else {
                chClass = classifier.get(chCode);
              }
              if (chClass === 1) {
                resetStateMachine = true;
              } else {
                state = 13;
              }
            } else {
              state = stateMachine.nextState(state, chCode);
              if (state === 0) {
                resetStateMachine = true;
              }
            }
            if (resetStateMachine) {
              state = 1;
              hasOpenParens = false;
              hasOpenSquareBracket = false;
              hasOpenCurlyBracket = false;
              linkBeginIndex = j + 1;
              linkBeginChCode = chCode;
            }
            j++;
          }
          if (state === 13) {
            result.push(LinkComputer2._createLink(classifier, line, i, linkBeginIndex, len));
          }
        }
        return result;
      };
      return LinkComputer2;
    }();
    exports2.LinkComputer = LinkComputer;
    function computeLinks(model) {
      if (!model || typeof model.getLineCount !== "function" || typeof model.getLineContent !== "function") {
        return [];
      }
      return LinkComputer.computeLinks(model);
    }
    exports2.computeLinks = computeLinks;
  });
  define(__m[27], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var BasicInplaceReplace = function() {
      function BasicInplaceReplace2() {
        this._defaultValueSet = [["true", "false"], ["True", "False"], ["Private", "Public", "Friend", "ReadOnly", "Partial", "Protected", "WriteOnly"], ["public", "protected", "private"]];
      }
      BasicInplaceReplace2.prototype.navigateValueSet = function(range1, text1, range2, text2, up) {
        if (range1 && text1) {
          var result = this.doNavigateValueSet(text1, up);
          if (result) {
            return {
              range: range1,
              value: result
            };
          }
        }
        if (range2 && text2) {
          var result = this.doNavigateValueSet(text2, up);
          if (result) {
            return {
              range: range2,
              value: result
            };
          }
        }
        return null;
      };
      BasicInplaceReplace2.prototype.doNavigateValueSet = function(text, up) {
        var numberResult = this.numberReplace(text, up);
        if (numberResult !== null) {
          return numberResult;
        }
        return this.textReplace(text, up);
      };
      BasicInplaceReplace2.prototype.numberReplace = function(value, up) {
        var precision = Math.pow(10, value.length - (value.lastIndexOf(".") + 1));
        var n1 = Number(value);
        var n2 = parseFloat(value);
        if (!isNaN(n1) && !isNaN(n2) && n1 === n2) {
          if (n1 === 0 && !up) {
            return null;
          } else {
            n1 = Math.floor(n1 * precision);
            n1 += up ? precision : -precision;
            return String(n1 / precision);
          }
        }
        return null;
      };
      BasicInplaceReplace2.prototype.textReplace = function(value, up) {
        return this.valueSetsReplace(this._defaultValueSet, value, up);
      };
      BasicInplaceReplace2.prototype.valueSetsReplace = function(valueSets, value, up) {
        var result = null;
        for (var i = 0, len = valueSets.length; result === null && i < len; i++) {
          result = this.valueSetReplace(valueSets[i], value, up);
        }
        return result;
      };
      BasicInplaceReplace2.prototype.valueSetReplace = function(valueSet, value, up) {
        var idx = valueSet.indexOf(value);
        if (idx >= 0) {
          idx += up ? 1 : -1;
          if (idx < 0) {
            idx = valueSet.length - 1;
          } else {
            idx %= valueSet.length;
          }
          return valueSet[idx];
        }
        return null;
      };
      BasicInplaceReplace2.INSTANCE = new BasicInplaceReplace2();
      return BasicInplaceReplace2;
    }();
    exports2.BasicInplaceReplace = BasicInplaceReplace;
  });
  (function(global2, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? factory() : typeof define === "function" && define.amd ? define("vs/editor/common/standalone/promise-polyfill/polyfill", factory) : factory();
  })(this, function() {
    "use strict";
    function finallyConstructor(callback) {
      var constructor = this.constructor;
      return this.then(function(value) {
        return constructor.resolve(callback()).then(function() {
          return value;
        });
      }, function(reason) {
        return constructor.resolve(callback()).then(function() {
          return constructor.reject(reason);
        });
      });
    }
    var setTimeoutFunc = setTimeout;
    function noop() {
    }
    function bind(fn, thisArg) {
      return function() {
        fn.apply(thisArg, arguments);
      };
    }
    function Promise2(fn) {
      if (!(this instanceof Promise2))
        throw new TypeError("Promises must be constructed via new");
      if (typeof fn !== "function")
        throw new TypeError("not a function");
      this._state = 0;
      this._handled = false;
      this._value = void 0;
      this._deferreds = [];
      doResolve(fn, this);
    }
    function handle(self2, deferred) {
      while (self2._state === 3) {
        self2 = self2._value;
      }
      if (self2._state === 0) {
        self2._deferreds.push(deferred);
        return;
      }
      self2._handled = true;
      Promise2._immediateFn(function() {
        var cb = self2._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (self2._state === 1 ? resolve : reject)(deferred.promise, self2._value);
          return;
        }
        var ret;
        try {
          ret = cb(self2._value);
        } catch (e) {
          reject(deferred.promise, e);
          return;
        }
        resolve(deferred.promise, ret);
      });
    }
    function resolve(self2, newValue) {
      try {
        if (newValue === self2)
          throw new TypeError("A promise cannot be resolved with itself.");
        if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
          var then = newValue.then;
          if (newValue instanceof Promise2) {
            self2._state = 3;
            self2._value = newValue;
            finale(self2);
            return;
          } else if (typeof then === "function") {
            doResolve(bind(then, newValue), self2);
            return;
          }
        }
        self2._state = 1;
        self2._value = newValue;
        finale(self2);
      } catch (e) {
        reject(self2, e);
      }
    }
    function reject(self2, newValue) {
      self2._state = 2;
      self2._value = newValue;
      finale(self2);
    }
    function finale(self2) {
      if (self2._state === 2 && self2._deferreds.length === 0) {
        Promise2._immediateFn(function() {
          if (!self2._handled) {
            Promise2._unhandledRejectionFn(self2._value);
          }
        });
      }
      for (var i = 0, len = self2._deferreds.length; i < len; i++) {
        handle(self2, self2._deferreds[i]);
      }
      self2._deferreds = null;
    }
    function Handler(onFulfilled, onRejected, promise) {
      this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
      this.onRejected = typeof onRejected === "function" ? onRejected : null;
      this.promise = promise;
    }
    function doResolve(fn, self2) {
      var done = false;
      try {
        fn(function(value) {
          if (done)
            return;
          done = true;
          resolve(self2, value);
        }, function(reason) {
          if (done)
            return;
          done = true;
          reject(self2, reason);
        });
      } catch (ex) {
        if (done)
          return;
        done = true;
        reject(self2, ex);
      }
    }
    Promise2.prototype["catch"] = function(onRejected) {
      return this.then(null, onRejected);
    };
    Promise2.prototype.then = function(onFulfilled, onRejected) {
      var prom = new this.constructor(noop);
      handle(this, new Handler(onFulfilled, onRejected, prom));
      return prom;
    };
    Promise2.prototype["finally"] = finallyConstructor;
    Promise2.all = function(arr) {
      return new Promise2(function(resolve2, reject2) {
        if (!arr || typeof arr.length === "undefined")
          throw new TypeError("Promise.all accepts an array");
        var args = Array.prototype.slice.call(arr);
        if (args.length === 0)
          return resolve2([]);
        var remaining = args.length;
        function res(i2, val) {
          try {
            if (val && (typeof val === "object" || typeof val === "function")) {
              var then = val.then;
              if (typeof then === "function") {
                then.call(val, function(val2) {
                  res(i2, val2);
                }, reject2);
                return;
              }
            }
            args[i2] = val;
            if (--remaining === 0) {
              resolve2(args);
            }
          } catch (ex) {
            reject2(ex);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };
    Promise2.resolve = function(value) {
      if (value && typeof value === "object" && value.constructor === Promise2) {
        return value;
      }
      return new Promise2(function(resolve2) {
        resolve2(value);
      });
    };
    Promise2.reject = function(value) {
      return new Promise2(function(resolve2, reject2) {
        reject2(value);
      });
    };
    Promise2.race = function(values) {
      return new Promise2(function(resolve2, reject2) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve2, reject2);
        }
      });
    };
    Promise2._immediateFn = typeof setImmediate === "function" && function(fn) {
      setImmediate(fn);
    } || function(fn) {
      setTimeoutFunc(fn, 0);
    };
    Promise2._unhandledRejectionFn = function _unhandledRejectionFn(err) {
      if (typeof console !== "undefined" && console) {
        console.warn("Possible Unhandled Promise Rejection:", err);
      }
    };
    var globalNS = function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      throw new Error("unable to locate global object");
    }();
    if (!("Promise" in globalNS)) {
      globalNS["Promise"] = Promise2;
    } else if (!globalNS.Promise.prototype["finally"]) {
      globalNS.Promise.prototype["finally"] = finallyConstructor;
    }
  });
  define(__m[28], __M([0, 1]), function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var AccessibilitySupport;
    (function(AccessibilitySupport2) {
      AccessibilitySupport2[AccessibilitySupport2["Unknown"] = 0] = "Unknown";
      AccessibilitySupport2[AccessibilitySupport2["Disabled"] = 1] = "Disabled";
      AccessibilitySupport2[AccessibilitySupport2["Enabled"] = 2] = "Enabled";
    })(AccessibilitySupport = exports2.AccessibilitySupport || (exports2.AccessibilitySupport = {}));
    var CompletionItemInsertTextRule;
    (function(CompletionItemInsertTextRule2) {
      CompletionItemInsertTextRule2[CompletionItemInsertTextRule2["KeepWhitespace"] = 1] = "KeepWhitespace";
      CompletionItemInsertTextRule2[CompletionItemInsertTextRule2["InsertAsSnippet"] = 4] = "InsertAsSnippet";
    })(CompletionItemInsertTextRule = exports2.CompletionItemInsertTextRule || (exports2.CompletionItemInsertTextRule = {}));
    var CompletionItemKind;
    (function(CompletionItemKind2) {
      CompletionItemKind2[CompletionItemKind2["Method"] = 0] = "Method";
      CompletionItemKind2[CompletionItemKind2["Function"] = 1] = "Function";
      CompletionItemKind2[CompletionItemKind2["Constructor"] = 2] = "Constructor";
      CompletionItemKind2[CompletionItemKind2["Field"] = 3] = "Field";
      CompletionItemKind2[CompletionItemKind2["Variable"] = 4] = "Variable";
      CompletionItemKind2[CompletionItemKind2["Class"] = 5] = "Class";
      CompletionItemKind2[CompletionItemKind2["Struct"] = 6] = "Struct";
      CompletionItemKind2[CompletionItemKind2["Interface"] = 7] = "Interface";
      CompletionItemKind2[CompletionItemKind2["Module"] = 8] = "Module";
      CompletionItemKind2[CompletionItemKind2["Property"] = 9] = "Property";
      CompletionItemKind2[CompletionItemKind2["Event"] = 10] = "Event";
      CompletionItemKind2[CompletionItemKind2["Operator"] = 11] = "Operator";
      CompletionItemKind2[CompletionItemKind2["Unit"] = 12] = "Unit";
      CompletionItemKind2[CompletionItemKind2["Value"] = 13] = "Value";
      CompletionItemKind2[CompletionItemKind2["Constant"] = 14] = "Constant";
      CompletionItemKind2[CompletionItemKind2["Enum"] = 15] = "Enum";
      CompletionItemKind2[CompletionItemKind2["EnumMember"] = 16] = "EnumMember";
      CompletionItemKind2[CompletionItemKind2["Keyword"] = 17] = "Keyword";
      CompletionItemKind2[CompletionItemKind2["Text"] = 18] = "Text";
      CompletionItemKind2[CompletionItemKind2["Color"] = 19] = "Color";
      CompletionItemKind2[CompletionItemKind2["File"] = 20] = "File";
      CompletionItemKind2[CompletionItemKind2["Reference"] = 21] = "Reference";
      CompletionItemKind2[CompletionItemKind2["Customcolor"] = 22] = "Customcolor";
      CompletionItemKind2[CompletionItemKind2["Folder"] = 23] = "Folder";
      CompletionItemKind2[CompletionItemKind2["TypeParameter"] = 24] = "TypeParameter";
      CompletionItemKind2[CompletionItemKind2["Snippet"] = 25] = "Snippet";
    })(CompletionItemKind = exports2.CompletionItemKind || (exports2.CompletionItemKind = {}));
    var CompletionItemTag;
    (function(CompletionItemTag2) {
      CompletionItemTag2[CompletionItemTag2["Deprecated"] = 1] = "Deprecated";
    })(CompletionItemTag = exports2.CompletionItemTag || (exports2.CompletionItemTag = {}));
    var CompletionTriggerKind;
    (function(CompletionTriggerKind2) {
      CompletionTriggerKind2[CompletionTriggerKind2["Invoke"] = 0] = "Invoke";
      CompletionTriggerKind2[CompletionTriggerKind2["TriggerCharacter"] = 1] = "TriggerCharacter";
      CompletionTriggerKind2[CompletionTriggerKind2["TriggerForIncompleteCompletions"] = 2] = "TriggerForIncompleteCompletions";
    })(CompletionTriggerKind = exports2.CompletionTriggerKind || (exports2.CompletionTriggerKind = {}));
    var ContentWidgetPositionPreference;
    (function(ContentWidgetPositionPreference2) {
      ContentWidgetPositionPreference2[ContentWidgetPositionPreference2["EXACT"] = 0] = "EXACT";
      ContentWidgetPositionPreference2[ContentWidgetPositionPreference2["ABOVE"] = 1] = "ABOVE";
      ContentWidgetPositionPreference2[ContentWidgetPositionPreference2["BELOW"] = 2] = "BELOW";
    })(ContentWidgetPositionPreference = exports2.ContentWidgetPositionPreference || (exports2.ContentWidgetPositionPreference = {}));
    var CursorChangeReason;
    (function(CursorChangeReason2) {
      CursorChangeReason2[CursorChangeReason2["NotSet"] = 0] = "NotSet";
      CursorChangeReason2[CursorChangeReason2["ContentFlush"] = 1] = "ContentFlush";
      CursorChangeReason2[CursorChangeReason2["RecoverFromMarkers"] = 2] = "RecoverFromMarkers";
      CursorChangeReason2[CursorChangeReason2["Explicit"] = 3] = "Explicit";
      CursorChangeReason2[CursorChangeReason2["Paste"] = 4] = "Paste";
      CursorChangeReason2[CursorChangeReason2["Undo"] = 5] = "Undo";
      CursorChangeReason2[CursorChangeReason2["Redo"] = 6] = "Redo";
    })(CursorChangeReason = exports2.CursorChangeReason || (exports2.CursorChangeReason = {}));
    var DefaultEndOfLine;
    (function(DefaultEndOfLine2) {
      DefaultEndOfLine2[DefaultEndOfLine2["LF"] = 1] = "LF";
      DefaultEndOfLine2[DefaultEndOfLine2["CRLF"] = 2] = "CRLF";
    })(DefaultEndOfLine = exports2.DefaultEndOfLine || (exports2.DefaultEndOfLine = {}));
    var DocumentHighlightKind;
    (function(DocumentHighlightKind2) {
      DocumentHighlightKind2[DocumentHighlightKind2["Text"] = 0] = "Text";
      DocumentHighlightKind2[DocumentHighlightKind2["Read"] = 1] = "Read";
      DocumentHighlightKind2[DocumentHighlightKind2["Write"] = 2] = "Write";
    })(DocumentHighlightKind = exports2.DocumentHighlightKind || (exports2.DocumentHighlightKind = {}));
    var EditorAutoIndentStrategy;
    (function(EditorAutoIndentStrategy2) {
      EditorAutoIndentStrategy2[EditorAutoIndentStrategy2["None"] = 0] = "None";
      EditorAutoIndentStrategy2[EditorAutoIndentStrategy2["Keep"] = 1] = "Keep";
      EditorAutoIndentStrategy2[EditorAutoIndentStrategy2["Brackets"] = 2] = "Brackets";
      EditorAutoIndentStrategy2[EditorAutoIndentStrategy2["Advanced"] = 3] = "Advanced";
      EditorAutoIndentStrategy2[EditorAutoIndentStrategy2["Full"] = 4] = "Full";
    })(EditorAutoIndentStrategy = exports2.EditorAutoIndentStrategy || (exports2.EditorAutoIndentStrategy = {}));
    var EditorOption;
    (function(EditorOption2) {
      EditorOption2[EditorOption2["acceptSuggestionOnCommitCharacter"] = 0] = "acceptSuggestionOnCommitCharacter";
      EditorOption2[EditorOption2["acceptSuggestionOnEnter"] = 1] = "acceptSuggestionOnEnter";
      EditorOption2[EditorOption2["accessibilitySupport"] = 2] = "accessibilitySupport";
      EditorOption2[EditorOption2["accessibilityPageSize"] = 3] = "accessibilityPageSize";
      EditorOption2[EditorOption2["ariaLabel"] = 4] = "ariaLabel";
      EditorOption2[EditorOption2["autoClosingBrackets"] = 5] = "autoClosingBrackets";
      EditorOption2[EditorOption2["autoClosingOvertype"] = 6] = "autoClosingOvertype";
      EditorOption2[EditorOption2["autoClosingQuotes"] = 7] = "autoClosingQuotes";
      EditorOption2[EditorOption2["autoIndent"] = 8] = "autoIndent";
      EditorOption2[EditorOption2["automaticLayout"] = 9] = "automaticLayout";
      EditorOption2[EditorOption2["autoSurround"] = 10] = "autoSurround";
      EditorOption2[EditorOption2["codeLens"] = 11] = "codeLens";
      EditorOption2[EditorOption2["colorDecorators"] = 12] = "colorDecorators";
      EditorOption2[EditorOption2["comments"] = 13] = "comments";
      EditorOption2[EditorOption2["contextmenu"] = 14] = "contextmenu";
      EditorOption2[EditorOption2["copyWithSyntaxHighlighting"] = 15] = "copyWithSyntaxHighlighting";
      EditorOption2[EditorOption2["cursorBlinking"] = 16] = "cursorBlinking";
      EditorOption2[EditorOption2["cursorSmoothCaretAnimation"] = 17] = "cursorSmoothCaretAnimation";
      EditorOption2[EditorOption2["cursorStyle"] = 18] = "cursorStyle";
      EditorOption2[EditorOption2["cursorSurroundingLines"] = 19] = "cursorSurroundingLines";
      EditorOption2[EditorOption2["cursorSurroundingLinesStyle"] = 20] = "cursorSurroundingLinesStyle";
      EditorOption2[EditorOption2["cursorWidth"] = 21] = "cursorWidth";
      EditorOption2[EditorOption2["disableLayerHinting"] = 22] = "disableLayerHinting";
      EditorOption2[EditorOption2["disableMonospaceOptimizations"] = 23] = "disableMonospaceOptimizations";
      EditorOption2[EditorOption2["dragAndDrop"] = 24] = "dragAndDrop";
      EditorOption2[EditorOption2["emptySelectionClipboard"] = 25] = "emptySelectionClipboard";
      EditorOption2[EditorOption2["extraEditorClassName"] = 26] = "extraEditorClassName";
      EditorOption2[EditorOption2["fastScrollSensitivity"] = 27] = "fastScrollSensitivity";
      EditorOption2[EditorOption2["find"] = 28] = "find";
      EditorOption2[EditorOption2["fixedOverflowWidgets"] = 29] = "fixedOverflowWidgets";
      EditorOption2[EditorOption2["folding"] = 30] = "folding";
      EditorOption2[EditorOption2["foldingStrategy"] = 31] = "foldingStrategy";
      EditorOption2[EditorOption2["foldingHighlight"] = 32] = "foldingHighlight";
      EditorOption2[EditorOption2["fontFamily"] = 33] = "fontFamily";
      EditorOption2[EditorOption2["fontInfo"] = 34] = "fontInfo";
      EditorOption2[EditorOption2["fontLigatures"] = 35] = "fontLigatures";
      EditorOption2[EditorOption2["fontSize"] = 36] = "fontSize";
      EditorOption2[EditorOption2["fontWeight"] = 37] = "fontWeight";
      EditorOption2[EditorOption2["formatOnPaste"] = 38] = "formatOnPaste";
      EditorOption2[EditorOption2["formatOnType"] = 39] = "formatOnType";
      EditorOption2[EditorOption2["glyphMargin"] = 40] = "glyphMargin";
      EditorOption2[EditorOption2["gotoLocation"] = 41] = "gotoLocation";
      EditorOption2[EditorOption2["hideCursorInOverviewRuler"] = 42] = "hideCursorInOverviewRuler";
      EditorOption2[EditorOption2["highlightActiveIndentGuide"] = 43] = "highlightActiveIndentGuide";
      EditorOption2[EditorOption2["hover"] = 44] = "hover";
      EditorOption2[EditorOption2["inDiffEditor"] = 45] = "inDiffEditor";
      EditorOption2[EditorOption2["letterSpacing"] = 46] = "letterSpacing";
      EditorOption2[EditorOption2["lightbulb"] = 47] = "lightbulb";
      EditorOption2[EditorOption2["lineDecorationsWidth"] = 48] = "lineDecorationsWidth";
      EditorOption2[EditorOption2["lineHeight"] = 49] = "lineHeight";
      EditorOption2[EditorOption2["lineNumbers"] = 50] = "lineNumbers";
      EditorOption2[EditorOption2["lineNumbersMinChars"] = 51] = "lineNumbersMinChars";
      EditorOption2[EditorOption2["links"] = 52] = "links";
      EditorOption2[EditorOption2["matchBrackets"] = 53] = "matchBrackets";
      EditorOption2[EditorOption2["minimap"] = 54] = "minimap";
      EditorOption2[EditorOption2["mouseStyle"] = 55] = "mouseStyle";
      EditorOption2[EditorOption2["mouseWheelScrollSensitivity"] = 56] = "mouseWheelScrollSensitivity";
      EditorOption2[EditorOption2["mouseWheelZoom"] = 57] = "mouseWheelZoom";
      EditorOption2[EditorOption2["multiCursorMergeOverlapping"] = 58] = "multiCursorMergeOverlapping";
      EditorOption2[EditorOption2["multiCursorModifier"] = 59] = "multiCursorModifier";
      EditorOption2[EditorOption2["multiCursorPaste"] = 60] = "multiCursorPaste";
      EditorOption2[EditorOption2["occurrencesHighlight"] = 61] = "occurrencesHighlight";
      EditorOption2[EditorOption2["overviewRulerBorder"] = 62] = "overviewRulerBorder";
      EditorOption2[EditorOption2["overviewRulerLanes"] = 63] = "overviewRulerLanes";
      EditorOption2[EditorOption2["parameterHints"] = 64] = "parameterHints";
      EditorOption2[EditorOption2["peekWidgetDefaultFocus"] = 65] = "peekWidgetDefaultFocus";
      EditorOption2[EditorOption2["quickSuggestions"] = 66] = "quickSuggestions";
      EditorOption2[EditorOption2["quickSuggestionsDelay"] = 67] = "quickSuggestionsDelay";
      EditorOption2[EditorOption2["readOnly"] = 68] = "readOnly";
      EditorOption2[EditorOption2["renderControlCharacters"] = 69] = "renderControlCharacters";
      EditorOption2[EditorOption2["renderIndentGuides"] = 70] = "renderIndentGuides";
      EditorOption2[EditorOption2["renderFinalNewline"] = 71] = "renderFinalNewline";
      EditorOption2[EditorOption2["renderLineHighlight"] = 72] = "renderLineHighlight";
      EditorOption2[EditorOption2["renderValidationDecorations"] = 73] = "renderValidationDecorations";
      EditorOption2[EditorOption2["renderWhitespace"] = 74] = "renderWhitespace";
      EditorOption2[EditorOption2["revealHorizontalRightPadding"] = 75] = "revealHorizontalRightPadding";
      EditorOption2[EditorOption2["roundedSelection"] = 76] = "roundedSelection";
      EditorOption2[EditorOption2["rulers"] = 77] = "rulers";
      EditorOption2[EditorOption2["scrollbar"] = 78] = "scrollbar";
      EditorOption2[EditorOption2["scrollBeyondLastColumn"] = 79] = "scrollBeyondLastColumn";
      EditorOption2[EditorOption2["scrollBeyondLastLine"] = 80] = "scrollBeyondLastLine";
      EditorOption2[EditorOption2["selectionClipboard"] = 81] = "selectionClipboard";
      EditorOption2[EditorOption2["selectionHighlight"] = 82] = "selectionHighlight";
      EditorOption2[EditorOption2["selectOnLineNumbers"] = 83] = "selectOnLineNumbers";
      EditorOption2[EditorOption2["showFoldingControls"] = 84] = "showFoldingControls";
      EditorOption2[EditorOption2["showUnused"] = 85] = "showUnused";
      EditorOption2[EditorOption2["snippetSuggestions"] = 86] = "snippetSuggestions";
      EditorOption2[EditorOption2["smoothScrolling"] = 87] = "smoothScrolling";
      EditorOption2[EditorOption2["stopRenderingLineAfter"] = 88] = "stopRenderingLineAfter";
      EditorOption2[EditorOption2["suggest"] = 89] = "suggest";
      EditorOption2[EditorOption2["suggestFontSize"] = 90] = "suggestFontSize";
      EditorOption2[EditorOption2["suggestLineHeight"] = 91] = "suggestLineHeight";
      EditorOption2[EditorOption2["suggestOnTriggerCharacters"] = 92] = "suggestOnTriggerCharacters";
      EditorOption2[EditorOption2["suggestSelection"] = 93] = "suggestSelection";
      EditorOption2[EditorOption2["tabCompletion"] = 94] = "tabCompletion";
      EditorOption2[EditorOption2["useTabStops"] = 95] = "useTabStops";
      EditorOption2[EditorOption2["wordSeparators"] = 96] = "wordSeparators";
      EditorOption2[EditorOption2["wordWrap"] = 97] = "wordWrap";
      EditorOption2[EditorOption2["wordWrapBreakAfterCharacters"] = 98] = "wordWrapBreakAfterCharacters";
      EditorOption2[EditorOption2["wordWrapBreakBeforeCharacters"] = 99] = "wordWrapBreakBeforeCharacters";
      EditorOption2[EditorOption2["wordWrapColumn"] = 100] = "wordWrapColumn";
      EditorOption2[EditorOption2["wordWrapMinified"] = 101] = "wordWrapMinified";
      EditorOption2[EditorOption2["wrappingIndent"] = 102] = "wrappingIndent";
      EditorOption2[EditorOption2["wrappingStrategy"] = 103] = "wrappingStrategy";
      EditorOption2[EditorOption2["editorClassName"] = 104] = "editorClassName";
      EditorOption2[EditorOption2["pixelRatio"] = 105] = "pixelRatio";
      EditorOption2[EditorOption2["tabFocusMode"] = 106] = "tabFocusMode";
      EditorOption2[EditorOption2["layoutInfo"] = 107] = "layoutInfo";
      EditorOption2[EditorOption2["wrappingInfo"] = 108] = "wrappingInfo";
    })(EditorOption = exports2.EditorOption || (exports2.EditorOption = {}));
    var EndOfLinePreference;
    (function(EndOfLinePreference2) {
      EndOfLinePreference2[EndOfLinePreference2["TextDefined"] = 0] = "TextDefined";
      EndOfLinePreference2[EndOfLinePreference2["LF"] = 1] = "LF";
      EndOfLinePreference2[EndOfLinePreference2["CRLF"] = 2] = "CRLF";
    })(EndOfLinePreference = exports2.EndOfLinePreference || (exports2.EndOfLinePreference = {}));
    var EndOfLineSequence;
    (function(EndOfLineSequence2) {
      EndOfLineSequence2[EndOfLineSequence2["LF"] = 0] = "LF";
      EndOfLineSequence2[EndOfLineSequence2["CRLF"] = 1] = "CRLF";
    })(EndOfLineSequence = exports2.EndOfLineSequence || (exports2.EndOfLineSequence = {}));
    var IndentAction;
    (function(IndentAction2) {
      IndentAction2[IndentAction2["None"] = 0] = "None";
      IndentAction2[IndentAction2["Indent"] = 1] = "Indent";
      IndentAction2[IndentAction2["IndentOutdent"] = 2] = "IndentOutdent";
      IndentAction2[IndentAction2["Outdent"] = 3] = "Outdent";
    })(IndentAction = exports2.IndentAction || (exports2.IndentAction = {}));
    var KeyCode;
    (function(KeyCode2) {
      KeyCode2[KeyCode2["Unknown"] = 0] = "Unknown";
      KeyCode2[KeyCode2["Backspace"] = 1] = "Backspace";
      KeyCode2[KeyCode2["Tab"] = 2] = "Tab";
      KeyCode2[KeyCode2["Enter"] = 3] = "Enter";
      KeyCode2[KeyCode2["Shift"] = 4] = "Shift";
      KeyCode2[KeyCode2["Ctrl"] = 5] = "Ctrl";
      KeyCode2[KeyCode2["Alt"] = 6] = "Alt";
      KeyCode2[KeyCode2["PauseBreak"] = 7] = "PauseBreak";
      KeyCode2[KeyCode2["CapsLock"] = 8] = "CapsLock";
      KeyCode2[KeyCode2["Escape"] = 9] = "Escape";
      KeyCode2[KeyCode2["Space"] = 10] = "Space";
      KeyCode2[KeyCode2["PageUp"] = 11] = "PageUp";
      KeyCode2[KeyCode2["PageDown"] = 12] = "PageDown";
      KeyCode2[KeyCode2["End"] = 13] = "End";
      KeyCode2[KeyCode2["Home"] = 14] = "Home";
      KeyCode2[KeyCode2["LeftArrow"] = 15] = "LeftArrow";
      KeyCode2[KeyCode2["UpArrow"] = 16] = "UpArrow";
      KeyCode2[KeyCode2["RightArrow"] = 17] = "RightArrow";
      KeyCode2[KeyCode2["DownArrow"] = 18] = "DownArrow";
      KeyCode2[KeyCode2["Insert"] = 19] = "Insert";
      KeyCode2[KeyCode2["Delete"] = 20] = "Delete";
      KeyCode2[KeyCode2["KEY_0"] = 21] = "KEY_0";
      KeyCode2[KeyCode2["KEY_1"] = 22] = "KEY_1";
      KeyCode2[KeyCode2["KEY_2"] = 23] = "KEY_2";
      KeyCode2[KeyCode2["KEY_3"] = 24] = "KEY_3";
      KeyCode2[KeyCode2["KEY_4"] = 25] = "KEY_4";
      KeyCode2[KeyCode2["KEY_5"] = 26] = "KEY_5";
      KeyCode2[KeyCode2["KEY_6"] = 27] = "KEY_6";
      KeyCode2[KeyCode2["KEY_7"] = 28] = "KEY_7";
      KeyCode2[KeyCode2["KEY_8"] = 29] = "KEY_8";
      KeyCode2[KeyCode2["KEY_9"] = 30] = "KEY_9";
      KeyCode2[KeyCode2["KEY_A"] = 31] = "KEY_A";
      KeyCode2[KeyCode2["KEY_B"] = 32] = "KEY_B";
      KeyCode2[KeyCode2["KEY_C"] = 33] = "KEY_C";
      KeyCode2[KeyCode2["KEY_D"] = 34] = "KEY_D";
      KeyCode2[KeyCode2["KEY_E"] = 35] = "KEY_E";
      KeyCode2[KeyCode2["KEY_F"] = 36] = "KEY_F";
      KeyCode2[KeyCode2["KEY_G"] = 37] = "KEY_G";
      KeyCode2[KeyCode2["KEY_H"] = 38] = "KEY_H";
      KeyCode2[KeyCode2["KEY_I"] = 39] = "KEY_I";
      KeyCode2[KeyCode2["KEY_J"] = 40] = "KEY_J";
      KeyCode2[KeyCode2["KEY_K"] = 41] = "KEY_K";
      KeyCode2[KeyCode2["KEY_L"] = 42] = "KEY_L";
      KeyCode2[KeyCode2["KEY_M"] = 43] = "KEY_M";
      KeyCode2[KeyCode2["KEY_N"] = 44] = "KEY_N";
      KeyCode2[KeyCode2["KEY_O"] = 45] = "KEY_O";
      KeyCode2[KeyCode2["KEY_P"] = 46] = "KEY_P";
      KeyCode2[KeyCode2["KEY_Q"] = 47] = "KEY_Q";
      KeyCode2[KeyCode2["KEY_R"] = 48] = "KEY_R";
      KeyCode2[KeyCode2["KEY_S"] = 49] = "KEY_S";
      KeyCode2[KeyCode2["KEY_T"] = 50] = "KEY_T";
      KeyCode2[KeyCode2["KEY_U"] = 51] = "KEY_U";
      KeyCode2[KeyCode2["KEY_V"] = 52] = "KEY_V";
      KeyCode2[KeyCode2["KEY_W"] = 53] = "KEY_W";
      KeyCode2[KeyCode2["KEY_X"] = 54] = "KEY_X";
      KeyCode2[KeyCode2["KEY_Y"] = 55] = "KEY_Y";
      KeyCode2[KeyCode2["KEY_Z"] = 56] = "KEY_Z";
      KeyCode2[KeyCode2["Meta"] = 57] = "Meta";
      KeyCode2[KeyCode2["ContextMenu"] = 58] = "ContextMenu";
      KeyCode2[KeyCode2["F1"] = 59] = "F1";
      KeyCode2[KeyCode2["F2"] = 60] = "F2";
      KeyCode2[KeyCode2["F3"] = 61] = "F3";
      KeyCode2[KeyCode2["F4"] = 62] = "F4";
      KeyCode2[KeyCode2["F5"] = 63] = "F5";
      KeyCode2[KeyCode2["F6"] = 64] = "F6";
      KeyCode2[KeyCode2["F7"] = 65] = "F7";
      KeyCode2[KeyCode2["F8"] = 66] = "F8";
      KeyCode2[KeyCode2["F9"] = 67] = "F9";
      KeyCode2[KeyCode2["F10"] = 68] = "F10";
      KeyCode2[KeyCode2["F11"] = 69] = "F11";
      KeyCode2[KeyCode2["F12"] = 70] = "F12";
      KeyCode2[KeyCode2["F13"] = 71] = "F13";
      KeyCode2[KeyCode2["F14"] = 72] = "F14";
      KeyCode2[KeyCode2["F15"] = 73] = "F15";
      KeyCode2[KeyCode2["F16"] = 74] = "F16";
      KeyCode2[KeyCode2["F17"] = 75] = "F17";
      KeyCode2[KeyCode2["F18"] = 76] = "F18";
      KeyCode2[KeyCode2["F19"] = 77] = "F19";
      KeyCode2[KeyCode2["NumLock"] = 78] = "NumLock";
      KeyCode2[KeyCode2["ScrollLock"] = 79] = "ScrollLock";
      KeyCode2[KeyCode2["US_SEMICOLON"] = 80] = "US_SEMICOLON";
      KeyCode2[KeyCode2["US_EQUAL"] = 81] = "US_EQUAL";
      KeyCode2[KeyCode2["US_COMMA"] = 82] = "US_COMMA";
      KeyCode2[KeyCode2["US_MINUS"] = 83] = "US_MINUS";
      KeyCode2[KeyCode2["US_DOT"] = 84] = "US_DOT";
      KeyCode2[KeyCode2["US_SLASH"] = 85] = "US_SLASH";
      KeyCode2[KeyCode2["US_BACKTICK"] = 86] = "US_BACKTICK";
      KeyCode2[KeyCode2["US_OPEN_SQUARE_BRACKET"] = 87] = "US_OPEN_SQUARE_BRACKET";
      KeyCode2[KeyCode2["US_BACKSLASH"] = 88] = "US_BACKSLASH";
      KeyCode2[KeyCode2["US_CLOSE_SQUARE_BRACKET"] = 89] = "US_CLOSE_SQUARE_BRACKET";
      KeyCode2[KeyCode2["US_QUOTE"] = 90] = "US_QUOTE";
      KeyCode2[KeyCode2["OEM_8"] = 91] = "OEM_8";
      KeyCode2[KeyCode2["OEM_102"] = 92] = "OEM_102";
      KeyCode2[KeyCode2["NUMPAD_0"] = 93] = "NUMPAD_0";
      KeyCode2[KeyCode2["NUMPAD_1"] = 94] = "NUMPAD_1";
      KeyCode2[KeyCode2["NUMPAD_2"] = 95] = "NUMPAD_2";
      KeyCode2[KeyCode2["NUMPAD_3"] = 96] = "NUMPAD_3";
      KeyCode2[KeyCode2["NUMPAD_4"] = 97] = "NUMPAD_4";
      KeyCode2[KeyCode2["NUMPAD_5"] = 98] = "NUMPAD_5";
      KeyCode2[KeyCode2["NUMPAD_6"] = 99] = "NUMPAD_6";
      KeyCode2[KeyCode2["NUMPAD_7"] = 100] = "NUMPAD_7";
      KeyCode2[KeyCode2["NUMPAD_8"] = 101] = "NUMPAD_8";
      KeyCode2[KeyCode2["NUMPAD_9"] = 102] = "NUMPAD_9";
      KeyCode2[KeyCode2["NUMPAD_MULTIPLY"] = 103] = "NUMPAD_MULTIPLY";
      KeyCode2[KeyCode2["NUMPAD_ADD"] = 104] = "NUMPAD_ADD";
      KeyCode2[KeyCode2["NUMPAD_SEPARATOR"] = 105] = "NUMPAD_SEPARATOR";
      KeyCode2[KeyCode2["NUMPAD_SUBTRACT"] = 106] = "NUMPAD_SUBTRACT";
      KeyCode2[KeyCode2["NUMPAD_DECIMAL"] = 107] = "NUMPAD_DECIMAL";
      KeyCode2[KeyCode2["NUMPAD_DIVIDE"] = 108] = "NUMPAD_DIVIDE";
      KeyCode2[KeyCode2["KEY_IN_COMPOSITION"] = 109] = "KEY_IN_COMPOSITION";
      KeyCode2[KeyCode2["ABNT_C1"] = 110] = "ABNT_C1";
      KeyCode2[KeyCode2["ABNT_C2"] = 111] = "ABNT_C2";
      KeyCode2[KeyCode2["MAX_VALUE"] = 112] = "MAX_VALUE";
    })(KeyCode = exports2.KeyCode || (exports2.KeyCode = {}));
    var MarkerSeverity;
    (function(MarkerSeverity2) {
      MarkerSeverity2[MarkerSeverity2["Hint"] = 1] = "Hint";
      MarkerSeverity2[MarkerSeverity2["Info"] = 2] = "Info";
      MarkerSeverity2[MarkerSeverity2["Warning"] = 4] = "Warning";
      MarkerSeverity2[MarkerSeverity2["Error"] = 8] = "Error";
    })(MarkerSeverity = exports2.MarkerSeverity || (exports2.MarkerSeverity = {}));
    var MarkerTag;
    (function(MarkerTag2) {
      MarkerTag2[MarkerTag2["Unnecessary"] = 1] = "Unnecessary";
      MarkerTag2[MarkerTag2["Deprecated"] = 2] = "Deprecated";
    })(MarkerTag = exports2.MarkerTag || (exports2.MarkerTag = {}));
    var MinimapPosition;
    (function(MinimapPosition2) {
      MinimapPosition2[MinimapPosition2["Inline"] = 1] = "Inline";
      MinimapPosition2[MinimapPosition2["Gutter"] = 2] = "Gutter";
    })(MinimapPosition = exports2.MinimapPosition || (exports2.MinimapPosition = {}));
    var MouseTargetType;
    (function(MouseTargetType2) {
      MouseTargetType2[MouseTargetType2["UNKNOWN"] = 0] = "UNKNOWN";
      MouseTargetType2[MouseTargetType2["TEXTAREA"] = 1] = "TEXTAREA";
      MouseTargetType2[MouseTargetType2["GUTTER_GLYPH_MARGIN"] = 2] = "GUTTER_GLYPH_MARGIN";
      MouseTargetType2[MouseTargetType2["GUTTER_LINE_NUMBERS"] = 3] = "GUTTER_LINE_NUMBERS";
      MouseTargetType2[MouseTargetType2["GUTTER_LINE_DECORATIONS"] = 4] = "GUTTER_LINE_DECORATIONS";
      MouseTargetType2[MouseTargetType2["GUTTER_VIEW_ZONE"] = 5] = "GUTTER_VIEW_ZONE";
      MouseTargetType2[MouseTargetType2["CONTENT_TEXT"] = 6] = "CONTENT_TEXT";
      MouseTargetType2[MouseTargetType2["CONTENT_EMPTY"] = 7] = "CONTENT_EMPTY";
      MouseTargetType2[MouseTargetType2["CONTENT_VIEW_ZONE"] = 8] = "CONTENT_VIEW_ZONE";
      MouseTargetType2[MouseTargetType2["CONTENT_WIDGET"] = 9] = "CONTENT_WIDGET";
      MouseTargetType2[MouseTargetType2["OVERVIEW_RULER"] = 10] = "OVERVIEW_RULER";
      MouseTargetType2[MouseTargetType2["SCROLLBAR"] = 11] = "SCROLLBAR";
      MouseTargetType2[MouseTargetType2["OVERLAY_WIDGET"] = 12] = "OVERLAY_WIDGET";
      MouseTargetType2[MouseTargetType2["OUTSIDE_EDITOR"] = 13] = "OUTSIDE_EDITOR";
    })(MouseTargetType = exports2.MouseTargetType || (exports2.MouseTargetType = {}));
    var OverlayWidgetPositionPreference;
    (function(OverlayWidgetPositionPreference2) {
      OverlayWidgetPositionPreference2[OverlayWidgetPositionPreference2["TOP_RIGHT_CORNER"] = 0] = "TOP_RIGHT_CORNER";
      OverlayWidgetPositionPreference2[OverlayWidgetPositionPreference2["BOTTOM_RIGHT_CORNER"] = 1] = "BOTTOM_RIGHT_CORNER";
      OverlayWidgetPositionPreference2[OverlayWidgetPositionPreference2["TOP_CENTER"] = 2] = "TOP_CENTER";
    })(OverlayWidgetPositionPreference = exports2.OverlayWidgetPositionPreference || (exports2.OverlayWidgetPositionPreference = {}));
    var OverviewRulerLane;
    (function(OverviewRulerLane2) {
      OverviewRulerLane2[OverviewRulerLane2["Left"] = 1] = "Left";
      OverviewRulerLane2[OverviewRulerLane2["Center"] = 2] = "Center";
      OverviewRulerLane2[OverviewRulerLane2["Right"] = 4] = "Right";
      OverviewRulerLane2[OverviewRulerLane2["Full"] = 7] = "Full";
    })(OverviewRulerLane = exports2.OverviewRulerLane || (exports2.OverviewRulerLane = {}));
    var RenderLineNumbersType;
    (function(RenderLineNumbersType2) {
      RenderLineNumbersType2[RenderLineNumbersType2["Off"] = 0] = "Off";
      RenderLineNumbersType2[RenderLineNumbersType2["On"] = 1] = "On";
      RenderLineNumbersType2[RenderLineNumbersType2["Relative"] = 2] = "Relative";
      RenderLineNumbersType2[RenderLineNumbersType2["Interval"] = 3] = "Interval";
      RenderLineNumbersType2[RenderLineNumbersType2["Custom"] = 4] = "Custom";
    })(RenderLineNumbersType = exports2.RenderLineNumbersType || (exports2.RenderLineNumbersType = {}));
    var RenderMinimap;
    (function(RenderMinimap2) {
      RenderMinimap2[RenderMinimap2["None"] = 0] = "None";
      RenderMinimap2[RenderMinimap2["Text"] = 1] = "Text";
      RenderMinimap2[RenderMinimap2["Blocks"] = 2] = "Blocks";
    })(RenderMinimap = exports2.RenderMinimap || (exports2.RenderMinimap = {}));
    var ScrollType;
    (function(ScrollType2) {
      ScrollType2[ScrollType2["Smooth"] = 0] = "Smooth";
      ScrollType2[ScrollType2["Immediate"] = 1] = "Immediate";
    })(ScrollType = exports2.ScrollType || (exports2.ScrollType = {}));
    var ScrollbarVisibility;
    (function(ScrollbarVisibility2) {
      ScrollbarVisibility2[ScrollbarVisibility2["Auto"] = 1] = "Auto";
      ScrollbarVisibility2[ScrollbarVisibility2["Hidden"] = 2] = "Hidden";
      ScrollbarVisibility2[ScrollbarVisibility2["Visible"] = 3] = "Visible";
    })(ScrollbarVisibility = exports2.ScrollbarVisibility || (exports2.ScrollbarVisibility = {}));
    var SelectionDirection;
    (function(SelectionDirection2) {
      SelectionDirection2[SelectionDirection2["LTR"] = 0] = "LTR";
      SelectionDirection2[SelectionDirection2["RTL"] = 1] = "RTL";
    })(SelectionDirection = exports2.SelectionDirection || (exports2.SelectionDirection = {}));
    var SignatureHelpTriggerKind;
    (function(SignatureHelpTriggerKind2) {
      SignatureHelpTriggerKind2[SignatureHelpTriggerKind2["Invoke"] = 1] = "Invoke";
      SignatureHelpTriggerKind2[SignatureHelpTriggerKind2["TriggerCharacter"] = 2] = "TriggerCharacter";
      SignatureHelpTriggerKind2[SignatureHelpTriggerKind2["ContentChange"] = 3] = "ContentChange";
    })(SignatureHelpTriggerKind = exports2.SignatureHelpTriggerKind || (exports2.SignatureHelpTriggerKind = {}));
    var SymbolKind;
    (function(SymbolKind2) {
      SymbolKind2[SymbolKind2["File"] = 0] = "File";
      SymbolKind2[SymbolKind2["Module"] = 1] = "Module";
      SymbolKind2[SymbolKind2["Namespace"] = 2] = "Namespace";
      SymbolKind2[SymbolKind2["Package"] = 3] = "Package";
      SymbolKind2[SymbolKind2["Class"] = 4] = "Class";
      SymbolKind2[SymbolKind2["Method"] = 5] = "Method";
      SymbolKind2[SymbolKind2["Property"] = 6] = "Property";
      SymbolKind2[SymbolKind2["Field"] = 7] = "Field";
      SymbolKind2[SymbolKind2["Constructor"] = 8] = "Constructor";
      SymbolKind2[SymbolKind2["Enum"] = 9] = "Enum";
      SymbolKind2[SymbolKind2["Interface"] = 10] = "Interface";
      SymbolKind2[SymbolKind2["Function"] = 11] = "Function";
      SymbolKind2[SymbolKind2["Variable"] = 12] = "Variable";
      SymbolKind2[SymbolKind2["Constant"] = 13] = "Constant";
      SymbolKind2[SymbolKind2["String"] = 14] = "String";
      SymbolKind2[SymbolKind2["Number"] = 15] = "Number";
      SymbolKind2[SymbolKind2["Boolean"] = 16] = "Boolean";
      SymbolKind2[SymbolKind2["Array"] = 17] = "Array";
      SymbolKind2[SymbolKind2["Object"] = 18] = "Object";
      SymbolKind2[SymbolKind2["Key"] = 19] = "Key";
      SymbolKind2[SymbolKind2["Null"] = 20] = "Null";
      SymbolKind2[SymbolKind2["EnumMember"] = 21] = "EnumMember";
      SymbolKind2[SymbolKind2["Struct"] = 22] = "Struct";
      SymbolKind2[SymbolKind2["Event"] = 23] = "Event";
      SymbolKind2[SymbolKind2["Operator"] = 24] = "Operator";
      SymbolKind2[SymbolKind2["TypeParameter"] = 25] = "TypeParameter";
    })(SymbolKind = exports2.SymbolKind || (exports2.SymbolKind = {}));
    var SymbolTag;
    (function(SymbolTag2) {
      SymbolTag2[SymbolTag2["Deprecated"] = 1] = "Deprecated";
    })(SymbolTag = exports2.SymbolTag || (exports2.SymbolTag = {}));
    var TextEditorCursorBlinkingStyle;
    (function(TextEditorCursorBlinkingStyle2) {
      TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Hidden"] = 0] = "Hidden";
      TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Blink"] = 1] = "Blink";
      TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Smooth"] = 2] = "Smooth";
      TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Phase"] = 3] = "Phase";
      TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Expand"] = 4] = "Expand";
      TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Solid"] = 5] = "Solid";
    })(TextEditorCursorBlinkingStyle = exports2.TextEditorCursorBlinkingStyle || (exports2.TextEditorCursorBlinkingStyle = {}));
    var TextEditorCursorStyle;
    (function(TextEditorCursorStyle2) {
      TextEditorCursorStyle2[TextEditorCursorStyle2["Line"] = 1] = "Line";
      TextEditorCursorStyle2[TextEditorCursorStyle2["Block"] = 2] = "Block";
      TextEditorCursorStyle2[TextEditorCursorStyle2["Underline"] = 3] = "Underline";
      TextEditorCursorStyle2[TextEditorCursorStyle2["LineThin"] = 4] = "LineThin";
      TextEditorCursorStyle2[TextEditorCursorStyle2["BlockOutline"] = 5] = "BlockOutline";
      TextEditorCursorStyle2[TextEditorCursorStyle2["UnderlineThin"] = 6] = "UnderlineThin";
    })(TextEditorCursorStyle = exports2.TextEditorCursorStyle || (exports2.TextEditorCursorStyle = {}));
    var TrackedRangeStickiness;
    (function(TrackedRangeStickiness2) {
      TrackedRangeStickiness2[TrackedRangeStickiness2["AlwaysGrowsWhenTypingAtEdges"] = 0] = "AlwaysGrowsWhenTypingAtEdges";
      TrackedRangeStickiness2[TrackedRangeStickiness2["NeverGrowsWhenTypingAtEdges"] = 1] = "NeverGrowsWhenTypingAtEdges";
      TrackedRangeStickiness2[TrackedRangeStickiness2["GrowsOnlyWhenTypingBefore"] = 2] = "GrowsOnlyWhenTypingBefore";
      TrackedRangeStickiness2[TrackedRangeStickiness2["GrowsOnlyWhenTypingAfter"] = 3] = "GrowsOnlyWhenTypingAfter";
    })(TrackedRangeStickiness = exports2.TrackedRangeStickiness || (exports2.TrackedRangeStickiness = {}));
    var WrappingIndent;
    (function(WrappingIndent2) {
      WrappingIndent2[WrappingIndent2["None"] = 0] = "None";
      WrappingIndent2[WrappingIndent2["Same"] = 1] = "Same";
      WrappingIndent2[WrappingIndent2["Indent"] = 2] = "Indent";
      WrappingIndent2[WrappingIndent2["DeepIndent"] = 3] = "DeepIndent";
    })(WrappingIndent = exports2.WrappingIndent || (exports2.WrappingIndent = {}));
  });
  define(__m[29], __M([0, 1, 19, 9, 17, 12, 2, 5, 22, 23, 28, 33]), function(require2, exports2, cancellation_1, event_1, keyCodes_1, uri_1, position_1, range_1, selection_1, token_1, standaloneEnums) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var KeyMod = function() {
      function KeyMod2() {
      }
      KeyMod2.chord = function(firstPart, secondPart) {
        return keyCodes_1.KeyChord(firstPart, secondPart);
      };
      KeyMod2.CtrlCmd = 2048;
      KeyMod2.Shift = 1024;
      KeyMod2.Alt = 512;
      KeyMod2.WinCtrl = 256;
      return KeyMod2;
    }();
    exports2.KeyMod = KeyMod;
    function createMonacoBaseAPI() {
      return {
        editor: void 0,
        languages: void 0,
        CancellationTokenSource: cancellation_1.CancellationTokenSource,
        Emitter: event_1.Emitter,
        KeyCode: standaloneEnums.KeyCode,
        KeyMod,
        Position: position_1.Position,
        Range: range_1.Range,
        Selection: selection_1.Selection,
        SelectionDirection: standaloneEnums.SelectionDirection,
        MarkerSeverity: standaloneEnums.MarkerSeverity,
        MarkerTag: standaloneEnums.MarkerTag,
        Uri: uri_1.URI,
        Token: token_1.Token
      };
    }
    exports2.createMonacoBaseAPI = createMonacoBaseAPI;
  });
  define(__m[30], __M([0, 1, 11]), function(require2, exports2, uint_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var PrefixSumIndexOfResult = function() {
      function PrefixSumIndexOfResult2(index, remainder) {
        this.index = index;
        this.remainder = remainder;
      }
      return PrefixSumIndexOfResult2;
    }();
    exports2.PrefixSumIndexOfResult = PrefixSumIndexOfResult;
    var PrefixSumComputer = function() {
      function PrefixSumComputer2(values) {
        this.values = values;
        this.prefixSum = new Uint32Array(values.length);
        this.prefixSumValidIndex = new Int32Array(1);
        this.prefixSumValidIndex[0] = -1;
      }
      PrefixSumComputer2.prototype.insertValues = function(insertIndex, insertValues) {
        insertIndex = uint_1.toUint32(insertIndex);
        var oldValues = this.values;
        var oldPrefixSum = this.prefixSum;
        var insertValuesLen = insertValues.length;
        if (insertValuesLen === 0) {
          return false;
        }
        this.values = new Uint32Array(oldValues.length + insertValuesLen);
        this.values.set(oldValues.subarray(0, insertIndex), 0);
        this.values.set(oldValues.subarray(insertIndex), insertIndex + insertValuesLen);
        this.values.set(insertValues, insertIndex);
        if (insertIndex - 1 < this.prefixSumValidIndex[0]) {
          this.prefixSumValidIndex[0] = insertIndex - 1;
        }
        this.prefixSum = new Uint32Array(this.values.length);
        if (this.prefixSumValidIndex[0] >= 0) {
          this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        }
        return true;
      };
      PrefixSumComputer2.prototype.changeValue = function(index, value) {
        index = uint_1.toUint32(index);
        value = uint_1.toUint32(value);
        if (this.values[index] === value) {
          return false;
        }
        this.values[index] = value;
        if (index - 1 < this.prefixSumValidIndex[0]) {
          this.prefixSumValidIndex[0] = index - 1;
        }
        return true;
      };
      PrefixSumComputer2.prototype.removeValues = function(startIndex, cnt) {
        startIndex = uint_1.toUint32(startIndex);
        cnt = uint_1.toUint32(cnt);
        var oldValues = this.values;
        var oldPrefixSum = this.prefixSum;
        if (startIndex >= oldValues.length) {
          return false;
        }
        var maxCnt = oldValues.length - startIndex;
        if (cnt >= maxCnt) {
          cnt = maxCnt;
        }
        if (cnt === 0) {
          return false;
        }
        this.values = new Uint32Array(oldValues.length - cnt);
        this.values.set(oldValues.subarray(0, startIndex), 0);
        this.values.set(oldValues.subarray(startIndex + cnt), startIndex);
        this.prefixSum = new Uint32Array(this.values.length);
        if (startIndex - 1 < this.prefixSumValidIndex[0]) {
          this.prefixSumValidIndex[0] = startIndex - 1;
        }
        if (this.prefixSumValidIndex[0] >= 0) {
          this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        }
        return true;
      };
      PrefixSumComputer2.prototype.getTotalValue = function() {
        if (this.values.length === 0) {
          return 0;
        }
        return this._getAccumulatedValue(this.values.length - 1);
      };
      PrefixSumComputer2.prototype.getAccumulatedValue = function(index) {
        if (index < 0) {
          return 0;
        }
        index = uint_1.toUint32(index);
        return this._getAccumulatedValue(index);
      };
      PrefixSumComputer2.prototype._getAccumulatedValue = function(index) {
        if (index <= this.prefixSumValidIndex[0]) {
          return this.prefixSum[index];
        }
        var startIndex = this.prefixSumValidIndex[0] + 1;
        if (startIndex === 0) {
          this.prefixSum[0] = this.values[0];
          startIndex++;
        }
        if (index >= this.values.length) {
          index = this.values.length - 1;
        }
        for (var i = startIndex; i <= index; i++) {
          this.prefixSum[i] = this.prefixSum[i - 1] + this.values[i];
        }
        this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], index);
        return this.prefixSum[index];
      };
      PrefixSumComputer2.prototype.getIndexOf = function(accumulatedValue) {
        accumulatedValue = Math.floor(accumulatedValue);
        this.getTotalValue();
        var low = 0;
        var high = this.values.length - 1;
        var mid = 0;
        var midStop = 0;
        var midStart = 0;
        while (low <= high) {
          mid = low + (high - low) / 2 | 0;
          midStop = this.prefixSum[mid];
          midStart = midStop - this.values[mid];
          if (accumulatedValue < midStart) {
            high = mid - 1;
          } else if (accumulatedValue >= midStop) {
            low = mid + 1;
          } else {
            break;
          }
        }
        return new PrefixSumIndexOfResult(mid, accumulatedValue - midStart);
      };
      return PrefixSumComputer2;
    }();
    exports2.PrefixSumComputer = PrefixSumComputer;
  });
  define(__m[31], __M([0, 1, 2, 30]), function(require2, exports2, position_1, prefixSumComputer_1) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var MirrorTextModel = function() {
      function MirrorTextModel2(uri, lines, eol, versionId) {
        this._uri = uri;
        this._lines = lines;
        this._eol = eol;
        this._versionId = versionId;
        this._lineStarts = null;
      }
      MirrorTextModel2.prototype.dispose = function() {
        this._lines.length = 0;
      };
      MirrorTextModel2.prototype.getText = function() {
        return this._lines.join(this._eol);
      };
      MirrorTextModel2.prototype.onEvents = function(e) {
        if (e.eol && e.eol !== this._eol) {
          this._eol = e.eol;
          this._lineStarts = null;
        }
        var changes = e.changes;
        for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
          var change = changes_1[_i];
          this._acceptDeleteRange(change.range);
          this._acceptInsertText(new position_1.Position(change.range.startLineNumber, change.range.startColumn), change.text);
        }
        this._versionId = e.versionId;
      };
      MirrorTextModel2.prototype._ensureLineStarts = function() {
        if (!this._lineStarts) {
          var eolLength = this._eol.length;
          var linesLength = this._lines.length;
          var lineStartValues = new Uint32Array(linesLength);
          for (var i = 0; i < linesLength; i++) {
            lineStartValues[i] = this._lines[i].length + eolLength;
          }
          this._lineStarts = new prefixSumComputer_1.PrefixSumComputer(lineStartValues);
        }
      };
      MirrorTextModel2.prototype._setLineText = function(lineIndex, newValue) {
        this._lines[lineIndex] = newValue;
        if (this._lineStarts) {
          this._lineStarts.changeValue(lineIndex, this._lines[lineIndex].length + this._eol.length);
        }
      };
      MirrorTextModel2.prototype._acceptDeleteRange = function(range) {
        if (range.startLineNumber === range.endLineNumber) {
          if (range.startColumn === range.endColumn) {
            return;
          }
          this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1) + this._lines[range.startLineNumber - 1].substring(range.endColumn - 1));
          return;
        }
        this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1) + this._lines[range.endLineNumber - 1].substring(range.endColumn - 1));
        this._lines.splice(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        if (this._lineStarts) {
          this._lineStarts.removeValues(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        }
      };
      MirrorTextModel2.prototype._acceptInsertText = function(position, insertText) {
        if (insertText.length === 0) {
          return;
        }
        var insertLines = insertText.split(/\r\n|\r|\n/);
        if (insertLines.length === 1) {
          this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1) + insertLines[0] + this._lines[position.lineNumber - 1].substring(position.column - 1));
          return;
        }
        insertLines[insertLines.length - 1] += this._lines[position.lineNumber - 1].substring(position.column - 1);
        this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1) + insertLines[0]);
        var newLengths = new Uint32Array(insertLines.length - 1);
        for (var i = 1; i < insertLines.length; i++) {
          this._lines.splice(position.lineNumber + i - 1, 0, insertLines[i]);
          newLengths[i - 1] = insertLines[i].length + this._eol.length;
        }
        if (this._lineStarts) {
          this._lineStarts.insertValues(position.lineNumber, newLengths);
        }
      };
      return MirrorTextModel2;
    }();
    exports2.MirrorTextModel = MirrorTextModel;
  });
  var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = this && this.__generator || function(thisArg, body) {
    var _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    }, f, y, t, g;
    return g = {
      next: verb(0),
      throw: verb(1),
      return: verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };
  define(__m[34], __M([0, 1, 13, 6, 7, 4, 12, 2, 5, 24, 31, 25, 26, 27, 29, 10]), function(require2, exports2, arrays_1, diff_1, iterator_1, platform_1, uri_1, position_1, range_1, diffComputer_1, mirrorTextModel_1, wordHelper_1, linkComputer_1, inplaceReplaceSupport_1, standaloneBase_1, types) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var MirrorModel = function(_super) {
      __extends(MirrorModel2, _super);
      function MirrorModel2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(MirrorModel2.prototype, "uri", {
        get: function() {
          return this._uri;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MirrorModel2.prototype, "version", {
        get: function() {
          return this._versionId;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MirrorModel2.prototype, "eol", {
        get: function() {
          return this._eol;
        },
        enumerable: true,
        configurable: true
      });
      MirrorModel2.prototype.getValue = function() {
        return this.getText();
      };
      MirrorModel2.prototype.getLinesContent = function() {
        return this._lines.slice(0);
      };
      MirrorModel2.prototype.getLineCount = function() {
        return this._lines.length;
      };
      MirrorModel2.prototype.getLineContent = function(lineNumber) {
        return this._lines[lineNumber - 1];
      };
      MirrorModel2.prototype.getWordAtPosition = function(position, wordDefinition) {
        var wordAtText = wordHelper_1.getWordAtText(position.column, wordHelper_1.ensureValidWordDefinition(wordDefinition), this._lines[position.lineNumber - 1], 0);
        if (wordAtText) {
          return new range_1.Range(position.lineNumber, wordAtText.startColumn, position.lineNumber, wordAtText.endColumn);
        }
        return null;
      };
      MirrorModel2.prototype.createWordIterator = function(wordDefinition) {
        var _this = this;
        var obj;
        var lineNumber = 0;
        var lineText;
        var wordRangesIdx = 0;
        var wordRanges = [];
        var next = function() {
          if (wordRangesIdx < wordRanges.length) {
            var value = lineText.substring(wordRanges[wordRangesIdx].start, wordRanges[wordRangesIdx].end);
            wordRangesIdx += 1;
            if (!obj) {
              obj = {
                done: false,
                value
              };
            } else {
              obj.value = value;
            }
            return obj;
          } else if (lineNumber >= _this._lines.length) {
            return iterator_1.FIN;
          } else {
            lineText = _this._lines[lineNumber];
            wordRanges = _this._wordenize(lineText, wordDefinition);
            wordRangesIdx = 0;
            lineNumber += 1;
            return next();
          }
        };
        return {
          next
        };
      };
      MirrorModel2.prototype.getLineWords = function(lineNumber, wordDefinition) {
        var content = this._lines[lineNumber - 1];
        var ranges = this._wordenize(content, wordDefinition);
        var words = [];
        for (var _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
          var range = ranges_1[_i];
          words.push({
            word: content.substring(range.start, range.end),
            startColumn: range.start + 1,
            endColumn: range.end + 1
          });
        }
        return words;
      };
      MirrorModel2.prototype._wordenize = function(content, wordDefinition) {
        var result = [];
        var match;
        wordDefinition.lastIndex = 0;
        while (match = wordDefinition.exec(content)) {
          if (match[0].length === 0) {
            break;
          }
          result.push({
            start: match.index,
            end: match.index + match[0].length
          });
        }
        return result;
      };
      MirrorModel2.prototype.getValueInRange = function(range) {
        range = this._validateRange(range);
        if (range.startLineNumber === range.endLineNumber) {
          return this._lines[range.startLineNumber - 1].substring(range.startColumn - 1, range.endColumn - 1);
        }
        var lineEnding = this._eol;
        var startLineIndex = range.startLineNumber - 1;
        var endLineIndex = range.endLineNumber - 1;
        var resultLines = [];
        resultLines.push(this._lines[startLineIndex].substring(range.startColumn - 1));
        for (var i = startLineIndex + 1; i < endLineIndex; i++) {
          resultLines.push(this._lines[i]);
        }
        resultLines.push(this._lines[endLineIndex].substring(0, range.endColumn - 1));
        return resultLines.join(lineEnding);
      };
      MirrorModel2.prototype.offsetAt = function(position) {
        position = this._validatePosition(position);
        this._ensureLineStarts();
        return this._lineStarts.getAccumulatedValue(position.lineNumber - 2) + (position.column - 1);
      };
      MirrorModel2.prototype.positionAt = function(offset) {
        offset = Math.floor(offset);
        offset = Math.max(0, offset);
        this._ensureLineStarts();
        var out = this._lineStarts.getIndexOf(offset);
        var lineLength = this._lines[out.index].length;
        return {
          lineNumber: 1 + out.index,
          column: 1 + Math.min(out.remainder, lineLength)
        };
      };
      MirrorModel2.prototype._validateRange = function(range) {
        var start = this._validatePosition({
          lineNumber: range.startLineNumber,
          column: range.startColumn
        });
        var end = this._validatePosition({
          lineNumber: range.endLineNumber,
          column: range.endColumn
        });
        if (start.lineNumber !== range.startLineNumber || start.column !== range.startColumn || end.lineNumber !== range.endLineNumber || end.column !== range.endColumn) {
          return {
            startLineNumber: start.lineNumber,
            startColumn: start.column,
            endLineNumber: end.lineNumber,
            endColumn: end.column
          };
        }
        return range;
      };
      MirrorModel2.prototype._validatePosition = function(position) {
        if (!position_1.Position.isIPosition(position)) {
          throw new Error("bad position");
        }
        var lineNumber = position.lineNumber, column = position.column;
        var hasChanged = false;
        if (lineNumber < 1) {
          lineNumber = 1;
          column = 1;
          hasChanged = true;
        } else if (lineNumber > this._lines.length) {
          lineNumber = this._lines.length;
          column = this._lines[lineNumber - 1].length + 1;
          hasChanged = true;
        } else {
          var maxCharacter = this._lines[lineNumber - 1].length + 1;
          if (column < 1) {
            column = 1;
            hasChanged = true;
          } else if (column > maxCharacter) {
            column = maxCharacter;
            hasChanged = true;
          }
        }
        if (!hasChanged) {
          return position;
        } else {
          return {
            lineNumber,
            column
          };
        }
      };
      return MirrorModel2;
    }(mirrorTextModel_1.MirrorTextModel);
    var EditorSimpleWorker = function() {
      function EditorSimpleWorker2(host, foreignModuleFactory) {
        this._host = host;
        this._models = Object.create(null);
        this._foreignModuleFactory = foreignModuleFactory;
        this._foreignModule = null;
      }
      EditorSimpleWorker2.prototype.dispose = function() {
        this._models = Object.create(null);
      };
      EditorSimpleWorker2.prototype._getModel = function(uri) {
        return this._models[uri];
      };
      EditorSimpleWorker2.prototype._getModels = function() {
        var _this = this;
        var all = [];
        Object.keys(this._models).forEach(function(key) {
          return all.push(_this._models[key]);
        });
        return all;
      };
      EditorSimpleWorker2.prototype.acceptNewModel = function(data) {
        this._models[data.url] = new MirrorModel(uri_1.URI.parse(data.url), data.lines, data.EOL, data.versionId);
      };
      EditorSimpleWorker2.prototype.acceptModelChanged = function(strURL, e) {
        if (!this._models[strURL]) {
          return;
        }
        var model = this._models[strURL];
        model.onEvents(e);
      };
      EditorSimpleWorker2.prototype.acceptRemovedModel = function(strURL) {
        if (!this._models[strURL]) {
          return;
        }
        delete this._models[strURL];
      };
      EditorSimpleWorker2.prototype.computeDiff = function(originalUrl, modifiedUrl, ignoreTrimWhitespace, maxComputationTime) {
        return __awaiter(this, void 0, void 0, function() {
          var original, modified, originalLines, modifiedLines, diffComputer, diffResult, identical;
          return __generator(this, function(_a) {
            original = this._getModel(originalUrl);
            modified = this._getModel(modifiedUrl);
            if (!original || !modified) {
              return [2, null];
            }
            originalLines = original.getLinesContent();
            modifiedLines = modified.getLinesContent();
            diffComputer = new diffComputer_1.DiffComputer(originalLines, modifiedLines, {
              shouldComputeCharChanges: true,
              shouldPostProcessCharChanges: true,
              shouldIgnoreTrimWhitespace: ignoreTrimWhitespace,
              shouldMakePrettyDiff: true,
              maxComputationTime
            });
            diffResult = diffComputer.computeDiff();
            identical = diffResult.changes.length > 0 ? false : this._modelsAreIdentical(original, modified);
            return [2, {
              quitEarly: diffResult.quitEarly,
              identical,
              changes: diffResult.changes
            }];
          });
        });
      };
      EditorSimpleWorker2.prototype._modelsAreIdentical = function(original, modified) {
        var originalLineCount = original.getLineCount();
        var modifiedLineCount = modified.getLineCount();
        if (originalLineCount !== modifiedLineCount) {
          return false;
        }
        for (var line = 1; line <= originalLineCount; line++) {
          var originalLine = original.getLineContent(line);
          var modifiedLine = modified.getLineContent(line);
          if (originalLine !== modifiedLine) {
            return false;
          }
        }
        return true;
      };
      EditorSimpleWorker2.prototype.computeMoreMinimalEdits = function(modelUrl, edits) {
        return __awaiter(this, void 0, void 0, function() {
          var model, result, lastEol, _i, edits_1, _a, range, text, eol, original, changes, editOffset, _b, changes_1, change, start, end, newEdit;
          return __generator(this, function(_c) {
            model = this._getModel(modelUrl);
            if (!model) {
              return [2, edits];
            }
            result = [];
            lastEol = void 0;
            edits = arrays_1.mergeSort(edits, function(a, b) {
              if (a.range && b.range) {
                return range_1.Range.compareRangesUsingStarts(a.range, b.range);
              }
              var aRng = a.range ? 0 : 1;
              var bRng = b.range ? 0 : 1;
              return aRng - bRng;
            });
            for (_i = 0, edits_1 = edits; _i < edits_1.length; _i++) {
              _a = edits_1[_i], range = _a.range, text = _a.text, eol = _a.eol;
              if (typeof eol === "number") {
                lastEol = eol;
              }
              if (range_1.Range.isEmpty(range) && !text) {
                continue;
              }
              original = model.getValueInRange(range);
              text = text.replace(/\r\n|\n|\r/g, model.eol);
              if (original === text) {
                continue;
              }
              if (Math.max(text.length, original.length) > EditorSimpleWorker2._diffLimit) {
                result.push({
                  range,
                  text
                });
                continue;
              }
              changes = diff_1.stringDiff(original, text, false);
              editOffset = model.offsetAt(range_1.Range.lift(range).getStartPosition());
              for (_b = 0, changes_1 = changes; _b < changes_1.length; _b++) {
                change = changes_1[_b];
                start = model.positionAt(editOffset + change.originalStart);
                end = model.positionAt(editOffset + change.originalStart + change.originalLength);
                newEdit = {
                  text: text.substr(change.modifiedStart, change.modifiedLength),
                  range: {
                    startLineNumber: start.lineNumber,
                    startColumn: start.column,
                    endLineNumber: end.lineNumber,
                    endColumn: end.column
                  }
                };
                if (model.getValueInRange(newEdit.range) !== newEdit.text) {
                  result.push(newEdit);
                }
              }
            }
            if (typeof lastEol === "number") {
              result.push({
                eol: lastEol,
                text: "",
                range: {
                  startLineNumber: 0,
                  startColumn: 0,
                  endLineNumber: 0,
                  endColumn: 0
                }
              });
            }
            return [2, result];
          });
        });
      };
      EditorSimpleWorker2.prototype.computeLinks = function(modelUrl) {
        return __awaiter(this, void 0, void 0, function() {
          var model;
          return __generator(this, function(_a) {
            model = this._getModel(modelUrl);
            if (!model) {
              return [2, null];
            }
            return [2, linkComputer_1.computeLinks(model)];
          });
        });
      };
      EditorSimpleWorker2.prototype.textualSuggest = function(modelUrl, position, wordDef, wordDefFlags) {
        return __awaiter(this, void 0, void 0, function() {
          var model, words, seen, wordDefRegExp, wordAt, iter, e, word;
          return __generator(this, function(_a) {
            model = this._getModel(modelUrl);
            if (!model) {
              return [2, null];
            }
            words = [];
            seen = new Set();
            wordDefRegExp = new RegExp(wordDef, wordDefFlags);
            wordAt = model.getWordAtPosition(position, wordDefRegExp);
            if (wordAt) {
              seen.add(model.getValueInRange(wordAt));
            }
            for (iter = model.createWordIterator(wordDefRegExp), e = iter.next(); !e.done && seen.size <= EditorSimpleWorker2._suggestionsLimit; e = iter.next()) {
              word = e.value;
              if (seen.has(word)) {
                continue;
              }
              seen.add(word);
              if (!isNaN(Number(word))) {
                continue;
              }
              words.push(word);
            }
            return [2, words];
          });
        });
      };
      EditorSimpleWorker2.prototype.computeWordRanges = function(modelUrl, range, wordDef, wordDefFlags) {
        return __awaiter(this, void 0, void 0, function() {
          var model, wordDefRegExp, result, line, words, _i, words_1, word, array;
          return __generator(this, function(_a) {
            model = this._getModel(modelUrl);
            if (!model) {
              return [2, Object.create(null)];
            }
            wordDefRegExp = new RegExp(wordDef, wordDefFlags);
            result = Object.create(null);
            for (line = range.startLineNumber; line < range.endLineNumber; line++) {
              words = model.getLineWords(line, wordDefRegExp);
              for (_i = 0, words_1 = words; _i < words_1.length; _i++) {
                word = words_1[_i];
                if (!isNaN(Number(word.word))) {
                  continue;
                }
                array = result[word.word];
                if (!array) {
                  array = [];
                  result[word.word] = array;
                }
                array.push({
                  startLineNumber: line,
                  startColumn: word.startColumn,
                  endLineNumber: line,
                  endColumn: word.endColumn
                });
              }
            }
            return [2, result];
          });
        });
      };
      EditorSimpleWorker2.prototype.navigateValueSet = function(modelUrl, range, up, wordDef, wordDefFlags) {
        return __awaiter(this, void 0, void 0, function() {
          var model, wordDefRegExp, selectionText, wordRange, word, result;
          return __generator(this, function(_a) {
            model = this._getModel(modelUrl);
            if (!model) {
              return [2, null];
            }
            wordDefRegExp = new RegExp(wordDef, wordDefFlags);
            if (range.startColumn === range.endColumn) {
              range = {
                startLineNumber: range.startLineNumber,
                startColumn: range.startColumn,
                endLineNumber: range.endLineNumber,
                endColumn: range.endColumn + 1
              };
            }
            selectionText = model.getValueInRange(range);
            wordRange = model.getWordAtPosition({
              lineNumber: range.startLineNumber,
              column: range.startColumn
            }, wordDefRegExp);
            if (!wordRange) {
              return [2, null];
            }
            word = model.getValueInRange(wordRange);
            result = inplaceReplaceSupport_1.BasicInplaceReplace.INSTANCE.navigateValueSet(range, selectionText, wordRange, word, up);
            return [2, result];
          });
        });
      };
      EditorSimpleWorker2.prototype.loadForeignModule = function(moduleId, createData, foreignHostMethods) {
        var _this = this;
        var proxyMethodRequest = function(method, args) {
          return _this._host.fhr(method, args);
        };
        var foreignHost = types.createProxyObject(foreignHostMethods, proxyMethodRequest);
        var ctx = {
          host: foreignHost,
          getMirrorModels: function() {
            return _this._getModels();
          }
        };
        if (this._foreignModuleFactory) {
          this._foreignModule = this._foreignModuleFactory(ctx, createData);
          return Promise.resolve(types.getAllMethodNames(this._foreignModule));
        }
        return new Promise(function(resolve, reject) {
          require2([moduleId], function(foreignModule) {
            _this._foreignModule = foreignModule.create(ctx, createData);
            resolve(types.getAllMethodNames(_this._foreignModule));
          }, reject);
        });
      };
      EditorSimpleWorker2.prototype.fmr = function(method, args) {
        if (!this._foreignModule || typeof this._foreignModule[method] !== "function") {
          return Promise.reject(new Error("Missing requestHandler or method: " + method));
        }
        try {
          return Promise.resolve(this._foreignModule[method].apply(this._foreignModule, args));
        } catch (e) {
          return Promise.reject(e);
        }
      };
      EditorSimpleWorker2._diffLimit = 100000;
      EditorSimpleWorker2._suggestionsLimit = 10000;
      return EditorSimpleWorker2;
    }();
    exports2.EditorSimpleWorker = EditorSimpleWorker;
    function create(host) {
      return new EditorSimpleWorker(host, null);
    }
    exports2.create = create;
    if (typeof importScripts === "function") {
      platform_1.globals.monaco = standaloneBase_1.createMonacoBaseAPI();
    }
  });
  "use strict";
  (function() {
    var MonacoEnvironment = self.MonacoEnvironment;
    var monacoBaseUrl = MonacoEnvironment && MonacoEnvironment.baseUrl ? MonacoEnvironment.baseUrl : "../../../";
    if (typeof self.define !== "function" || !self.define.amd) {
      importScripts(monacoBaseUrl + "vs/loader.js");
    }
    require.config({
      baseUrl: monacoBaseUrl,
      catchError: true
    });
    var loadCode = function(moduleId) {
      require([moduleId], function(ws) {
        setTimeout(function() {
          var messageHandler = ws.create(function(msg, transfer) {
            self.postMessage(msg, transfer);
          }, null);
          self.onmessage = function(e) {
            return messageHandler.onmessage(e.data);
          };
          while (beforeReadyMessages.length > 0) {
            self.onmessage(beforeReadyMessages.shift());
          }
        }, 0);
      });
    };
    var isFirstMessage = true;
    var beforeReadyMessages = [];
    self.onmessage = function(message) {
      if (!isFirstMessage) {
        beforeReadyMessages.push(message);
        return;
      }
      isFirstMessage = false;
      loadCode(message.data);
    };
  })();
}).call(this);
