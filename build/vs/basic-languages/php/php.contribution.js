define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "php",
    extensions: [".php", ".php4", ".php5", ".phtml", ".ctp"],
    aliases: ["PHP", "php"],
    mimetypes: ["application/x-php"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./php"], resolve_1, reject_1);
      });
    }
  });
});
