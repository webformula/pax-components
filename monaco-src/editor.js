import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return '/monaco-dist/json.worker.js';
    }
    if (label === 'css') {
      return '/monaco-dist/css.worker.js';
    }
    if (label === 'html') {
      return '/monaco-dist/html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return '/monaco-dist/ts.worker.js';
    }
    return '/monaco-dist/editor.worker.js';
  }
};
