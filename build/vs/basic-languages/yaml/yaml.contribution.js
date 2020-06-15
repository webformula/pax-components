define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "yaml",
    extensions: [".yaml", ".yml"],
    aliases: ["YAML", "yaml", "YML", "yml"],
    mimetypes: ["application/x-yaml"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./yaml"], resolve_1, reject_1);
      });
    }
  });
});
