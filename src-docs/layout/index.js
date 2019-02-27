const { html } = require('@webformula/pax-core');
const header = require('./header');
const nav = require('./navigation');

module.exports = ({ head, body, title }) => html`
  <!doctype html>
  <html lang="en">
    <head>
      <title>${title}</title>

      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Mono" />

      <link rel="stylesheet" href="pax-components.css">
      <link rel="stylesheet" href="main.css">
      <script src="pax-components.js"></script>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/codemirror.css">
      <link rel="stylesheet" href="one-dark.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/codemirror.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/addon/runmode/runmode-standalone.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/javascript/javascript.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/xml/xml.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/css/css.js"></script>

      ${head}
    </head>

    <body>
      <mdw-body>
        ${nav({ title })}
        <mdw-page>
          ${header({ title })}
          <mdw-content>
          ${body}
          </mdw-content>
        </mdw-page>
      </mdw-body>
    </body>
  </html>
`;
