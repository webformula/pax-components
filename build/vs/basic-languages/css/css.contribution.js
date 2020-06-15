define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "css",
    extensions: [".css"],
    aliases: ["CSS", "css"],
    mimetypes: ["text/css"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./css"], resolve_1, reject_1);
      });
    }
  });
});
