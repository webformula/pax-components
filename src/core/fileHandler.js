const customElements = require('./customElements');

function validate(params) {
  if (!params) throw Error('Requires params');
  if (!params.path) throw Error('Requires params.path');
}

function getMime(file) {
  if (file.includes('.js')) return 'text/javascript';
  if (file.includes('.css')) return 'text/css';
  if (file.includes('.html')) return 'text/html';
  return 'text/plain';
}

exports.scripts = (params) => {
  validate(params);
  if (params.path.includes('pax-components.js')) return customElements.getStaticFile();
};

exports.css = (params) => {
   validate(params);
   if (params.path.includes('pax-components.css')) return customElements.getStaticExternalCSS();
};

exports.expressFileHandler = (req, res, next) => {
  const mime = getMime(req.path);
  let content;
  if (mime === 'text/javascript') content = exports.scripts({
    path: req.path
  });
  if (mime === 'text/css') content = exports.css({
    path: req.path
  });

  if (!content) return next();
  res.type(mime);
  // res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(content);
};
