import { Page, html } from '@webformula/pax-core';

export default class Home extends Page {
  constructor() {
    super();
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
    return html`
    <article class="page-article">
      <h1 class="article-title">PAX</h1>
      <h2 class="article-subtitle">Material design: web components</h2>

      <section>
        <h2>About</h2>
        <p>
        PAX material design web components are a complete set of components with no dependencies. These web components can be used with any website (framework or no framework) as long as the browser supports web components.
        PAX components are also compatable on mobile sites. There are many components that are targeted directly at mobile development (<a href="#/components/sheet">sheet</a>).
        </p>

        <h2>Powerful, and light weight</h2>
        <p>
        PAX components are built to be as simple, light weight and performant. This is achieved with web compnents, wich are a native browser feature. We are taking advantage of the lowest posiible level in the browser.
        </p>

        <h2>Built with PAX-CORE</h2>
        <p>
        PAX components are built using <a href="http://webformula.io" target="_new">PAX-core</a>. This means the components are easy to develop and the end product requires no dependencies. So no broken npm sub modules.
        </p>
      </section>

      <mdw-card id="contained">
        <div class="mdw-card__content">
          <h6>Install</h6>
          <div class="mdw-subtitle2">Include the javascript and css, thats it.</div>
        </div>

        <div class="mdw-card__content--no-padding">
          <code-mirror mode="javascript">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/pax-components.css">
            <script type="module" src="https://cdn.jsdelivr.net/gh/webformula/pax-components@${window.paxVersion}/dist/pax-components.js"></script>

            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
          </code-mirror>
        </div>
      </mdw-card>

      <section>
        <a href="#/documentation/install">next: Install</a>
      </section>
    </article>
    `;
  }
}
