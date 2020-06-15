define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "powerquery",
    extensions: [".pq", ".pqm"],
    aliases: ["PQ", "M", "Power Query", "Power Query M"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./powerquery"], resolve_1, reject_1);
      });
    }
  });
});
