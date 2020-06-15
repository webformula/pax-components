define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "pascaligo",
    extensions: [".ligo"],
    aliases: ["Pascaligo", "ligo"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./pascaligo"], resolve_1, reject_1);
      });
    }
  });
});
