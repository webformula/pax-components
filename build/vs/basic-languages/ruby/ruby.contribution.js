define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "ruby",
    extensions: [".rb", ".rbx", ".rjs", ".gemspec", ".pp"],
    filenames: ["rakefile"],
    aliases: ["Ruby", "rb"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./ruby"], resolve_1, reject_1);
      });
    }
  });
});
