import { Page } from '/web_modules/@webformula/pax-core';

export default class Banners extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Banners';
  }

  makeBanner() {
    MDWBanner.create({
      message: 'This is a message and it is awesome!'
    }).then(() => console.log('banner dismissed'));
  }

  makeBannerWithAccept() {
    MDWBanner.create({
      message: 'This is a message and it is awesome!',
      acceptLabel: 'accept'
    }).then(accepted => {
      if (accepted) console.log('banner accepted');
      else console.log('banner dismissed');
    });
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Banners</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-button onclick="activePage.makeBanner()" class="mdw-raised">show banner</mdw-button>
        </div>

        <a href="https://material.io/design/components/banners.html" target="_new">Material Design Guidlines: Banners</a>
        <p>A banner displays a prominent message and related optional actions. Banners are more important than snackbars but leess important then dialogs.</p>

        <!-- <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#Types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div> -->

        <section id="types">
          <h4>Examples</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Banner service</h6>
              <div class="mdw-subtitle">Banners must be dissmissed by the user</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="javascript">
                // MDWBanner is globally available
                // Only 1 item will show at a time
                //   The rest of the items are queued up and will
                //   automatically display when the current item is removed
                makeBanner() {
                  MDWBanner.create({
                    message: 'This is a message and it is awesome!'
                  }).then(function () { console.log('banner dismissed'); });
                }

                makeBannerWithAccept() {
                  MDWBanner.create({
                    message: 'This is a message and it is awesome!',
                    acceptLabel: 'accept'
                  }).then(function (accepted) {
                    if (accepted) console.log('banner accepted');
                    else console.log('banner dismissed');
                  });
                };
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-button onclick="activePage.makeBanner()" class="mdw-raised">show banner</mdw-button>
              <mdw-button class="mdw-secondary" onclick="activePage.makeBannerWithAccept()">show banner with acceptLabel</mdw-button>
            </div>
          </mdw-card>

        </section>

        <!-- <section id="theming">
          <h4>Theming</h4>

          <div class="codecase">
            <div class="title">Colors</div>
            <monaco-editor language="html">
              <mdw-button raised>base</mdw-button>
              <mdw-button raised class="primary">primary</mdw-button>
              <mdw-button raised class="secondary">secondary</mdw-button>
              <mdw-button raised class="error">error</mdw-button>
            </monaco-editor>
            <div class="demo">
              <mdw-button raised>base</mdw-button>
              <mdw-button raised class="primary">primary</mdw-button>
              <mdw-button raised class="secondary">secondary</mdw-button>
              <mdw-button raised class="error">error</mdw-button>
            </div>
          </div>
        </section> -->

      </article>
    `;
  }
}
