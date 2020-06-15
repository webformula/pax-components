define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "markdown",
    extensions: [".md", ".markdown", ".mdown", ".mkdn", ".mkd", ".mdwn", ".mdtxt", ".mdtext"],
    aliases: ["Markdown", "markdown"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./markdown"], resolve_1, reject_1);
      });
    }
  });
});
