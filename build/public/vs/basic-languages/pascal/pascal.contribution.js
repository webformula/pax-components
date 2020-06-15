define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "pascal",
    extensions: [".pas", ".p", ".pp"],
    aliases: ["Pascal", "pas"],
    mimetypes: ["text/x-pascal-source", "text/x-pascal"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./pascal"], resolve_1, reject_1);
      });
    }
  });
});
