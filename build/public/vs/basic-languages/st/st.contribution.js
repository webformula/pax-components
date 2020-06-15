define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "st",
    extensions: [".st", ".iecst", ".iecplc", ".lc3lib"],
    aliases: ["StructuredText", "scl", "stl"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./st"], resolve_1, reject_1);
      });
    }
  });
});
