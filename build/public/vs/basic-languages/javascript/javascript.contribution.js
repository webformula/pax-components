define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "javascript",
    extensions: [".js", ".es6", ".jsx"],
    firstLine: "^#!.*\\bnode",
    filenames: ["jakefile"],
    aliases: ["JavaScript", "javascript", "js"],
    mimetypes: ["text/javascript"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./javascript"], resolve_1, reject_1);
      });
    }
  });
});
