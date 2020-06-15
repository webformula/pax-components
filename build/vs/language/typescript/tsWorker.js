define(["require", "exports", "./lib/typescriptServices", "./lib/lib"], function(require, exports, ts, lib_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var DEFAULT_LIB = {
    NAME: "defaultLib:lib.d.ts",
    CONTENTS: lib_1.lib_dts
  };
  var ES6_LIB = {
    NAME: "defaultLib:lib.es6.d.ts",
    CONTENTS: lib_1.lib_es6_dts
  };
  var TypeScriptWorker = function() {
    function TypeScriptWorker2(ctx, createData) {
      this._extraLibs = Object.create(null);
      this._languageService = ts.createLanguageService(this);
      this._ctx = ctx;
      this._compilerOptions = createData.compilerOptions;
      this._extraLibs = createData.extraLibs;
    }
    TypeScriptWorker2.prototype.getCompilationSettings = function() {
      return this._compilerOptions;
    };
    TypeScriptWorker2.prototype.getScriptFileNames = function() {
      var models = this._ctx.getMirrorModels().map(function(model) {
        return model.uri.toString();
      });
      return models.concat(Object.keys(this._extraLibs));
    };
    TypeScriptWorker2.prototype._getModel = function(fileName) {
      var models = this._ctx.getMirrorModels();
      for (var i = 0; i < models.length; i++) {
        if (models[i].uri.toString() === fileName) {
          return models[i];
        }
      }
      return null;
    };
    TypeScriptWorker2.prototype.getScriptVersion = function(fileName) {
      var model = this._getModel(fileName);
      if (model) {
        return model.version.toString();
      } else if (this.isDefaultLibFileName(fileName)) {
        return "1";
      } else if (fileName in this._extraLibs) {
        return String(this._extraLibs[fileName].version);
      }
      return "";
    };
    TypeScriptWorker2.prototype.getScriptSnapshot = function(fileName) {
      var text;
      var model = this._getModel(fileName);
      if (model) {
        text = model.getValue();
      } else if (fileName in this._extraLibs) {
        text = this._extraLibs[fileName].content;
      } else if (fileName === DEFAULT_LIB.NAME) {
        text = DEFAULT_LIB.CONTENTS;
      } else if (fileName === ES6_LIB.NAME) {
        text = ES6_LIB.CONTENTS;
      } else {
        return;
      }
      return {
        getText: function(start, end) {
          return text.substring(start, end);
        },
        getLength: function() {
          return text.length;
        },
        getChangeRange: function() {
          return void 0;
        }
      };
    };
    TypeScriptWorker2.prototype.getScriptKind = function(fileName) {
      var suffix = fileName.substr(fileName.lastIndexOf(".") + 1);
      switch (suffix) {
        case "ts":
          return ts.ScriptKind.TS;
        case "tsx":
          return ts.ScriptKind.TSX;
        case "js":
          return ts.ScriptKind.JS;
        case "jsx":
          return ts.ScriptKind.JSX;
        default:
          return this.getCompilationSettings().allowJs ? ts.ScriptKind.JS : ts.ScriptKind.TS;
      }
    };
    TypeScriptWorker2.prototype.getCurrentDirectory = function() {
      return "";
    };
    TypeScriptWorker2.prototype.getDefaultLibFileName = function(options) {
      return (options.target || ts.ScriptTarget.ES5) <= ts.ScriptTarget.ES5 ? DEFAULT_LIB.NAME : ES6_LIB.NAME;
    };
    TypeScriptWorker2.prototype.isDefaultLibFileName = function(fileName) {
      return fileName === this.getDefaultLibFileName(this._compilerOptions);
    };
    TypeScriptWorker2.clearFiles = function(diagnostics) {
      diagnostics.forEach(function(diag) {
        diag.file = void 0;
        var related = diag.relatedInformation;
        if (related) {
          related.forEach(function(diag2) {
            return diag2.file = void 0;
          });
        }
      });
      return diagnostics;
    };
    TypeScriptWorker2.prototype.getSyntacticDiagnostics = function(fileName) {
      var diagnostics = this._languageService.getSyntacticDiagnostics(fileName);
      return Promise.resolve(TypeScriptWorker2.clearFiles(diagnostics));
    };
    TypeScriptWorker2.prototype.getSemanticDiagnostics = function(fileName) {
      var diagnostics = this._languageService.getSemanticDiagnostics(fileName);
      return Promise.resolve(TypeScriptWorker2.clearFiles(diagnostics));
    };
    TypeScriptWorker2.prototype.getSuggestionDiagnostics = function(fileName) {
      var diagnostics = this._languageService.getSuggestionDiagnostics(fileName);
      return Promise.resolve(TypeScriptWorker2.clearFiles(diagnostics));
    };
    TypeScriptWorker2.prototype.getCompilerOptionsDiagnostics = function(fileName) {
      var diagnostics = this._languageService.getCompilerOptionsDiagnostics();
      return Promise.resolve(TypeScriptWorker2.clearFiles(diagnostics));
    };
    TypeScriptWorker2.prototype.getCompletionsAtPosition = function(fileName, position) {
      return Promise.resolve(this._languageService.getCompletionsAtPosition(fileName, position, void 0));
    };
    TypeScriptWorker2.prototype.getCompletionEntryDetails = function(fileName, position, entry) {
      return Promise.resolve(this._languageService.getCompletionEntryDetails(fileName, position, entry, void 0, void 0, void 0));
    };
    TypeScriptWorker2.prototype.getSignatureHelpItems = function(fileName, position) {
      return Promise.resolve(this._languageService.getSignatureHelpItems(fileName, position, void 0));
    };
    TypeScriptWorker2.prototype.getQuickInfoAtPosition = function(fileName, position) {
      return Promise.resolve(this._languageService.getQuickInfoAtPosition(fileName, position));
    };
    TypeScriptWorker2.prototype.getOccurrencesAtPosition = function(fileName, position) {
      return Promise.resolve(this._languageService.getOccurrencesAtPosition(fileName, position));
    };
    TypeScriptWorker2.prototype.getDefinitionAtPosition = function(fileName, position) {
      return Promise.resolve(this._languageService.getDefinitionAtPosition(fileName, position));
    };
    TypeScriptWorker2.prototype.getReferencesAtPosition = function(fileName, position) {
      return Promise.resolve(this._languageService.getReferencesAtPosition(fileName, position));
    };
    TypeScriptWorker2.prototype.getNavigationBarItems = function(fileName) {
      return Promise.resolve(this._languageService.getNavigationBarItems(fileName));
    };
    TypeScriptWorker2.prototype.getFormattingEditsForDocument = function(fileName, options) {
      return Promise.resolve(this._languageService.getFormattingEditsForDocument(fileName, options));
    };
    TypeScriptWorker2.prototype.getFormattingEditsForRange = function(fileName, start, end, options) {
      return Promise.resolve(this._languageService.getFormattingEditsForRange(fileName, start, end, options));
    };
    TypeScriptWorker2.prototype.getFormattingEditsAfterKeystroke = function(fileName, postion, ch, options) {
      return Promise.resolve(this._languageService.getFormattingEditsAfterKeystroke(fileName, postion, ch, options));
    };
    TypeScriptWorker2.prototype.findRenameLocations = function(fileName, positon, findInStrings, findInComments, providePrefixAndSuffixTextForRename) {
      return Promise.resolve(this._languageService.findRenameLocations(fileName, positon, findInStrings, findInComments, providePrefixAndSuffixTextForRename));
    };
    TypeScriptWorker2.prototype.getRenameInfo = function(fileName, positon, options) {
      return Promise.resolve(this._languageService.getRenameInfo(fileName, positon, options));
    };
    TypeScriptWorker2.prototype.getEmitOutput = function(fileName) {
      return Promise.resolve(this._languageService.getEmitOutput(fileName));
    };
    TypeScriptWorker2.prototype.getCodeFixesAtPosition = function(fileName, start, end, errorCodes, formatOptions) {
      var preferences = {};
      return Promise.resolve(this._languageService.getCodeFixesAtPosition(fileName, start, end, errorCodes, formatOptions, preferences));
    };
    TypeScriptWorker2.prototype.updateExtraLibs = function(extraLibs) {
      this._extraLibs = extraLibs;
    };
    return TypeScriptWorker2;
  }();
  exports.TypeScriptWorker = TypeScriptWorker;
  function create(ctx, createData) {
    return new TypeScriptWorker(ctx, createData);
  }
  exports.create = create;
});
