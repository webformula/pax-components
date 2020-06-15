define(["require", "exports", "monaco-editor-core/esm/vs/editor/editor.worker", "./tsWorker"], function(require, exports, worker, tsWorker_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  self.onmessage = function() {
    worker.initialize(function(ctx, createData) {
      return new tsWorker_1.TypeScriptWorker(ctx, createData);
    });
  };
});
