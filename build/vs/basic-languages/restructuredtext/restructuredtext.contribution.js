define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "restructuredtext",
    extensions: [".rst"],
    aliases: ["reStructuredText", "restructuredtext"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./restructuredtext"], resolve_1, reject_1);
      });
    }
  });
});
