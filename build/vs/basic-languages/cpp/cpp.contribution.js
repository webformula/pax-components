define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "c",
    extensions: [".c", ".h"],
    aliases: ["C", "c"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./cpp"], resolve_1, reject_1);
      });
    }
  });
  __contribution_1.registerLanguage({
    id: "cpp",
    extensions: [".cpp", ".cc", ".cxx", ".hpp", ".hh", ".hxx"],
    aliases: ["C++", "Cpp", "cpp"],
    loader: function() {
      return new Promise(function(resolve_2, reject_2) {
        require(["./cpp"], resolve_2, reject_2);
      });
    }
  });
});
