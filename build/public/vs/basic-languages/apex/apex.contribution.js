define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "apex",
    extensions: [".cls"],
    aliases: ["Apex", "apex"],
    mimetypes: ["text/x-apex-source", "text/x-apex"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./apex"], resolve_1, reject_1);
      });
    }
  });
});
