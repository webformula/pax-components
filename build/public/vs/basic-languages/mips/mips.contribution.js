define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "mips",
    extensions: [".s"],
    aliases: ["MIPS", "MIPS-V"],
    mimetypes: ["text/x-mips", "text/mips", "text/plaintext"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./mips"], resolve_1, reject_1);
      });
    }
  });
});
