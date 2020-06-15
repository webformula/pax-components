define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "pug",
    extensions: [".jade", ".pug"],
    aliases: ["Pug", "Jade", "jade"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./pug"], resolve_1, reject_1);
      });
    }
  });
});
