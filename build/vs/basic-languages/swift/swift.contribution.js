define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "swift",
    aliases: ["Swift", "swift"],
    extensions: [".swift"],
    mimetypes: ["text/swift"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./swift"], resolve_1, reject_1);
      });
    }
  });
});
