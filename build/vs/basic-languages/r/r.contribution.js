define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "r",
    extensions: [".r", ".rhistory", ".rprofile", ".rt"],
    aliases: ["R", "r"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./r"], resolve_1, reject_1);
      });
    }
  });
});
