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
