const { html } = require('@webformula/pax-core');
const header = require('./header');
const nav = require('./navigation');

module.exports = ({ head, body, title }) => html`
  <!doctype html>
  <html lang="en">
    <head>
      <title>${title}</title>

      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="pax-components.css">
      <link rel="stylesheet" href="main.css">
      <script src="pax-components.js"></script>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/codemirror.css">
      <link rel="stylesheet" href="one-light.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/codemirror.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/addon/runmode/runmode-standalone.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/javascript/javascript.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/xml/xml.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/css/css.js"></script>

      <script>
        document.addEventListener('DOMContentLoaded', function () {
          setTimeout(function () {
            [...document.querySelectorAll('code')].forEach(function (el) {
              el.parentNode.classList.add('cm-s-one-light');
              el.parentNode.style.overflowX = 'scroll';
              el.parentNode.style.padding = '12px';
              CodeMirror.runMode(el.innerText, getType(el), el);
            });
          });
        });


        function getType(el) {
          const types = ['javascript', 'html', 'xml', 'css'].filter(function (type) {
            return el.classList.contains(type);
          });
          let type = types.length ? types[0] : 'javascript';
          if (type === 'html') type = 'xml';
          return type;
        }
      </script>

      ${head}
    </head>

    <body>
      <div class="page">
        ${nav({ title })}
        <section class="page-container">
          ${header({ title })}
          <section class="body-container">
            ${body}
          </section>
        </section>
      </div>
    </body>
  </html>
`;
