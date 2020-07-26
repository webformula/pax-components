import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class Home extends Page {
  constructor() {
    super();
  }

  connectedCallback() {
    document.querySelector('#editor-1').content = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/release/theme.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/release/entry.css">
      <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/release/entry.js"></script>

      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    `;

    document.querySelector('#editor-2').content = `
      <!-- include css -->
      <link rel="stylesheet" href="node_modules/pax-components/release/entry.css">

      <!-- include font and icons -->
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    `;
  }

  get title() {
    return 'Home';
  }

  showDialog() {
    const validForm = document.querySelector('form').checkValidity();

    if (validForm) {
      MDWDialog.show({
        title: 'Confirmed',
        message: 'Your data is confirmed',
        okLabel: 'ok',
        cancelLabel: 'cancel'
      }).then(data => {
        console.log(data);
      });
    } else {
      MDWDialog.show({
        title: 'Invalid',
        message: 'Your data is invalid',
        okLabel: 'ok',
        cancelLabel: 'cancel'
      }).then(data => {
        console.log(data);
      });
    }
  }

  template() {
    return /* html */`
    <article class="page-article">
      <h1 class="article-title">PAX</h1>
      <h2 class="article-subtitle">Material design: web components</h2>

      <section>
        <p>
          PAX components provide material design to the desktop and mobile with no dependencies. These components can be used with any website (framework or no framework) as long as the browser supports web components.
        </p>
        <p>
          Mobile web applications are a top priority. Our goal is to make the mobile web experience feel like the best native applications. To achieve this we added mobile specific components to support mobile interactions. The components automatically change based on the device that loads them. This means no extra work is required to make your application mobile ready.
        </p>

        <h2>Powerful, and light weight</h2>
        <p>
        PAX components are built to be simple, light weight and performant. This is achieved with web components, which are a native browser feature. We are taking advantage of the lowest possible level in the browser.
        </p>

        <h2>Built with PAX-CORE</h2>
        <p>
        PAX components are built using <a class="mdw-secondary" href="http://webformula.io" target="_new">PAX-core</a>. This means the components are easy to develop and the end product requires no dependencies. So no broken npm sub modules.
        </p>
      </section>

      <mdw-card id="contained">
        <div class="mdw-card__content">
          <h6>CDN</h6>
          <div class="mdw-subtitle2">Include the javascript and css, thats it.</div>
        </div>

        <div class="mdw-card__content--no-padding">
          <monaco-editor id="editor-1" language="html"></monaco-editor>
        </div>
      </mdw-card>

      <h6>Or</h6>

      <mdw-card id="contained">
        <div class="mdw-card__content">
          <h6>NPM</h6>
          <div class="mdw-subtitle2">Install and import</div>
        </div>

        <div class="mdw-card__content--no-padding">
          <monaco-editor language="bash">
            # install
            npm i pax-components
          </monaco-editor>

          <monaco-editor language="javascript">
            // import
            import 'pax-components/release/entry.js';
          </monaco-editor>

          <monaco-editor id="editor-2" language="html"></monaco-editor>
        </div>
      </mdw-card>
    </article>
    `;
  }
}
