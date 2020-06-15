define(["require", "exports", "../_.contribution"], function(require, exports, __contribution_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __contribution_1.registerLanguage({
    id: "handlebars",
    extensions: [".handlebars", ".hbs"],
    aliases: ["Handlebars", "handlebars"],
    mimetypes: ["text/x-handlebars-template"],
    loader: function() {
      return new Promise(function(resolve_1, reject_1) {
        require(["./handlebars"], resolve_1, reject_1);
      });
    }
  });
});
