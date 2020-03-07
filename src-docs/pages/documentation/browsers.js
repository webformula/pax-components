import { Page } from '@webformula/pax-core';

export default class Browsers extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Browser compatibility';
  }

  template() {
    return /* html */`
    <article class="page-article">
      <h1 class="article-title">Browser compatibility</h1>

      <section>
        <h2>Web components</h2>
        <p>PAX components are built using <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="_new">web components</a>. Web components are currently supported by most of the major browsers. If you need to expand your browser support there is also a polyfill that expands support to IE11.</p>
      </section>

      <div mdw-row mdw-wrap mdw-flex-position="space-around start">
        <section mdw-flex style="margin-top: 54px">
          <h2>Desktop</h2>
          <mdw-list>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="chrome.png" width="24" height="24">
              </span>
              Chrome (67 +)
            </mdw-list-item>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="firefox.png" width="24" height="24">
              </span>
              Firefox (63 +)
            </mdw-list-item>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="safari.png" width="24" height="24">
              </span>
              Safari (10.1 +)
            </mdw-list-item>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="opera.png" width="24" height="24">
              </span>
              Opera (41 +)
            </mdw-list-item>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="edge.png" width="24" height="24">
              </span>
              Edge (76 Anaheim)
            </mdw-list-item>
          </mdw-list>
        </section>

        <section mdw-flex style="margin-top: 54px">
          <h2>Mobile</h2>
          <mdw-list>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="chrome.png" width="24" height="24">
              </span>
              Chrome (76 +)
            </mdw-list-item>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="firefox.png" width="24" height="24">
              </span>
              Firefox (68 +)
            </mdw-list-item>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="safari.png" width="24" height="24">
              </span>
              Safari (10.3 +)
            </mdw-list-item>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="opera.png" width="24" height="24">
              </span>
              Opera Mobile (46 +)
            </mdw-list-item>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="android.png" width="24" height="24">
              </span>
              Android browser (76 +)
            </mdw-list-item>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="samsung-internet.png" width="24" height="24">
              </span>
              Samsung internet (6.2 +)
            </mdw-list-item>
            <mdw-list-item>
              <span class="mdw-list-item__graphic material-icons">
                <img src="uc-browser.png" width="24" height="24">
              </span>
              UC Browser (12.12 +)
            </mdw-list-item>
          </mdw-list>
          <mdw-list-item>
            <span class="mdw-list-item__graphic material-icons">
              <img src="baidu.png" width="24" height="24">
            </span>
            Baidu Browser 7.12 +)
          </mdw-list-item>
        </mdw-list>
        </section>
      </div>

      <section>
        <a href="#/documentation/layout">next: Layout</a>
      </section>
    </article>
    `;
  }
}
