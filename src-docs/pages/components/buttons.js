const { Page, html } = require('@webformula/pax-core');

module.exports = class Buttons extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Buttons';
  }

  mockWait() {
    return new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  }

  escapeHTML(html) {
    return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Buttons</h3>

        <div class="showcase">
          <mdw-button>basic</mdw-button>
          <mdw-button raised class="primary">raised</mdw-button>
        </div>

        <p>
          Buttons be buttons, you press them good
        </p>

        <section>
          <h4>Types</h4>

          <div class="codecase">
            <div class="title">Text Button</div>
            <pre><code class="html">${this.escapeHTML(
              '<mdw-button>text</mdw-button>\n'+
              '<mdw-button dense>text dense</mdw-button>'
            )}</code></pre>
            <div class="demo">
              <mdw-button>text</mdw-button>
              <mdw-button dense>text dense</mdw-button>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Contained button</div>
            <pre><code class="html">${this.escapeHTML(
              '<mdw-button raised>raised</mdw-button>\n'+
              '<mdw-button raised class="primary">raised primary</mdw-button>'
            )}</code></pre>
            <div class="demo">
              <mdw-button raised>raised</mdw-button>
              <mdw-button raised class="primary">raised primary</mdw-button>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Outlined button</div>
            <pre><code class="html">${this.escapeHTML(
              '<mdw-button outlined>outlined</mdw-button>\n'+
              '<mdw-button outlined class="secondary">outlined shaped secondary</mdw-button>'
            )}</code></pre>
            <div class="demo">
              <mdw-button outlined>outlined</mdw-button>
              <mdw-button outlined dense class="secondary">outlined dense secondary</mdw-button>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Shaped button</div>
            <pre><code class="html">${this.escapeHTML(
              '<mdw-button shaped raised>shaped raised</mdw-button>\n'+
              '<mdw-button shaped outlined class="secondary">shaped outlined dense</mdw-button>'
            )}</code></pre>
            <div class="demo">
              <mdw-button shaped raised class="primary">shaped raised</mdw-button>
              <mdw-button shaped outlined class="error">shaped outlined</mdw-button>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Async button</div>
            <pre><code class="html">${this.escapeHTML(
              '<mdw-button raised class="primary" async="$Buttons.mockWait()">Async</mdw-button>'
            )}</code></pre>
            <div class="demo">
              <mdw-button raised class="primary" async="$Buttons.mockWait()">Async</mdw-button>
            </div>
          </div>

        </section>

      </article>
    `;
  }
};
