define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "twig",
    extensions: [".twig"],
    aliases: ["Twig", "twig"],
    mimetypes: ["text/x-twig"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./twig"], resolve_1, reject_1);
      });
    }
  });
});
