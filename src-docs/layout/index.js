import { html } from '@webformula/pax-core';
import header from './header.js';
import nav from './navigation.js';

export default function ({ head, body, title }) {
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <title>${title}</title>

        <meta http-equiv="Cache-Control" content="no-store" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Mono" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="pax-components.css">
        <link rel="stylesheet" href="main.css">
        <script type="module" src="pax-components.js"></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/codemirror.css">
        <link rel="stylesheet" href="one-dark.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/codemirror.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/addon/runmode/runmode-standalone.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/javascript/javascript.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/xml/xml.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.43.0/mode/css/css.js"></script>

        <script>
          window.paxVersion = '0.5.2-beta';
          window.MDWThemeConfig = {
            contrast: 'light', // default is light
            primary: 'deeppurple',
            secondary: 'teal',
            error: 'red'
          };

          window.changeContrast = (value) => {
            MDWTheme.changeTheme({ contrast: value ? 'light' : 'dark' });
          };

          const isMobile = typeof window.orientation !== 'undefined';
          document.documentElement.classList.toggle('mdw-is-mobile', isMobile);
        </script>

        ${head}
      </head>

      <body>
        ${nav({ title })}
        <mdw-page>
          ${header({ title })}
          <mdw-content class="constrain-width">
          ${body}
          </mdw-content>
        </mdw-page>
      </body>
    </html>
  `;
}
