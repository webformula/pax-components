define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "sol",
    extensions: [".sol"],
    aliases: ["sol", "solidity", "Solidity"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./solidity"], resolve_1, reject_1);
      });
    }
  });
});
