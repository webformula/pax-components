define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "csharp",
    extensions: [".cs", ".csx", ".cake"],
    aliases: ["C#", "csharp"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./csharp"], resolve_1, reject_1);
      });
    }
  });
});
