import { Page } from '@webformula/pax-core';

export default class Textfield extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Textfield';
  }

  onVarientChange(value) {
    this.varient_ = value;
    this.switchExample();
  }

  onPreIconChange(value) {
    this.preIcon_ = value;
    this.switchExample();
  }

  onPostIconChange(value) {
    if (value === 'hide') {
      [...document.querySelectorAll('.post-icon')].forEach(el => el.style.display = 'none');
    } else {
      [...document.querySelectorAll('.post-icon')].forEach(el => el.style.display = '');
    }
  }


  switchExample() {
    if (this.varient_ === 'outlined') {
      if (this.preIcon_ === 'show') {
        document.querySelector('#one').style.display = 'none';
        document.querySelector('#one-pre').style.display = 'none';
        document.querySelector('#two-pre').style.display = '';
        document.querySelector('#two').style.display = 'none';
      } else {
        document.querySelector('#one').style.display = 'none';
        document.querySelector('#one-pre').style.display = 'none';
        document.querySelector('#two-pre').style.display = 'none';
        document.querySelector('#two').style.display = '';
      }
    } else {
      if (this.preIcon_ === 'show') {
        document.querySelector('#one').style.display = 'none';
        document.querySelector('#one-pre').style.display = '';
        document.querySelector('#two-pre').style.display = 'none';
        document.querySelector('#two').style.display = 'none';
      } else {
        document.querySelector('#one').style.display = '';
        document.querySelector('#one-pre').style.display = 'none';
        document.querySelector('#two-pre').style.display = 'none';
        document.querySelector('#two').style.display = 'none';
      }
    }
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Textfield</h3>

        <div mdw-row>
          <div mdw-flex=".33" mdw-column>
            <mdw-select id="varient-select" class="mdw-padding" mdw-enhanced>
              <select onchange="activePage.onVarientChange(this.value)">
                <option value="filled" selected>Filled</option>
                <option value="outlined">outlined</option>
              </select>
              <label>Varient</label>
            </mdw-select>

            <mdw-select id="pre-icon-select" class="mdw-padding" mdw-enhanced>
              <select onchange="activePage.onPreIconChange(this.value)">
                <option value="hide" selected>Hide</option>
                <option value="show">show</option>
              </select>
              <label>Pre Icon</label>
            </mdw-select>

            <mdw-select id="post-icon-select" class="mdw-padding" mdw-enhanced>
              <select onchange="activePage.onPostIconChange(this.value)">
              <option value="hide" selected>Hide</option>
              <option value="show">show</option>
              </select>
              <label>Post Icon</label>
            </mdw-select>
          </div>

          <div mdw-flex=".66">
            <div class="showcase mdw-elevation-1">
              <mdw-textfield id="one">
                <input>
                <label>Filled</label>
                <mdw-icon class="post-icon" style="display: none;">delete</mdw-icon>
                <mdw-textfield-helper>
                  <mdw-helper-text persistent>Helper text</mdw-helper-text>
                </mdw-textfield-helper>
              </mdw-textfield>

              <mdw-textfield id="one-pre" style="display: none;">
                <mdw-icon>event</mdw-icon>
                <input>
                <label>Filled</label>
                <mdw-icon class="post-icon" style="display: none;">delete</mdw-icon>
                <mdw-textfield-helper>
                  <mdw-helper-text persistent>Helper text</mdw-helper-text>
                </mdw-textfield-helper>
              </mdw-textfield>

              <mdw-textfield id="two-pre" class="mdw-outlined" style="display: none;">
                <mdw-icon>event</mdw-icon>
                <input>
                <label>Outlined</label>
                <mdw-icon class="post-icon" style="display: none;">delete</mdw-icon>
                <mdw-textfield-helper>
                  <mdw-helper-text persistent>Helper text</mdw-helper-text>
                </mdw-textfield-helper>
              </mdw-textfield>

              <mdw-textfield id="two" class="mdw-outlined" style="display: none;">
                <input>
                <label>Outlined</label>
                <mdw-icon class="post-icon" style="display: none;">delete</mdw-icon>
                <mdw-textfield-helper>
                  <mdw-helper-text persistent>Helper text</mdw-helper-text>
                </mdw-textfield-helper>
              </mdw-textfield>
            </div>
          </div>
        </div>

        <a href="https://material.io/design/components/text-fields.html" target="_new">Material Design Guidlines: Text fields</a>
        <p>Text fields let users enter and edit text</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#outlined" offset="64">Outlined</anchor-link>
          <anchor-link selector="#shaped" offset="64">Shaped</anchor-link>
          <anchor-link selector="#helper-text" offset="64">Helper text</anchor-link>
          <anchor-link selector="#validation" offset="64">Validation</anchor-link>
          <anchor-link selector="#icons" offset="64">Icons</anchor-link>
          <anchor-link selector="#textarea" offset="64">Textarea</anchor-link>
        </div>

        <section id="types">
          <h4>Examples</h4>

          <!-- outlined -->
          <mdw-card id="outlined">
            <div class="mdw-card__content">
              <h6>Outlined</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-textfield class="mdw-outlined">
                  <input>
                  <label>label</label>
                </mdw-textfield>
              </monaco-editor>
            </div>

            <div class="mdw-card__content block">
              <mdw-textfield class="mdw-outlined">
                <input>
                <label>label</label>
              </mdw-textfield>
            </div>
          </mdw-card>

          <!-- shaped -->
          <mdw-card id="shaped">
            <div class="mdw-card__content">
              <h6>Outlined</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-textfield class="mdw-shaped mdw-density-compact">
                  <mdw-icon>search</mdw-icon>
                  <input placeholder="Search">
                </mdw-textfield>

                <mdw-textfield class="mdw-shaped mdw-outlined mdw-density-compact">
                  <mdw-icon>search</mdw-icon>
                  <input placeholder="Search">
                </mdw-textfield>

                <mdw-textfield class="mdw-shaped">
                  <input>
                  <label>label</label>
                </mdw-textfield>

                <mdw-textfield class="mdw-shaped mdw-outlined">
                  <input>
                  <label>label</label>
                </mdw-textfield>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <div>
                <mdw-textfield class="mdw-shaped mdw-density-compact">
                  <mdw-icon>search</mdw-icon>
                  <input placeholder="Search">
                </mdw-textfield>
              </div>

              <div>
                <mdw-textfield class="mdw-shaped mdw-outlined mdw-density-compact">
                  <mdw-icon>search</mdw-icon>
                  <input placeholder="Search">
                </mdw-textfield>
              </div>

              <div>
                <mdw-textfield class="mdw-shaped">
                  <input>
                  <label>label</label>
                </mdw-textfield>
              </div>

              <div>
                <mdw-textfield class="mdw-shaped mdw-outlined">
                  <input>
                  <label>label</label>
                </mdw-textfield>
              </div>
            </div>
          </mdw-card>

          <!-- with helper text -->
          <mdw-card id="helper-text">
            <div class="mdw-card__content">
              <h6>Helper text</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-textfield>
                  <input>
                  <label>With helper text</label>

                  <mdw-textfield-helper>
                    <mdw-helper-text persistent>Helper text</mdw-helper-text>
                  </mdw-textfield-helper>
                </mdw-textfield>
              </monaco-editor>
            </div>

            <div class="mdw-card__content block">
              <mdw-textfield>
                <input>
                <label>With helper text</label>

                <mdw-textfield-helper>
                  <mdw-helper-text persistent>Helper text</mdw-helper-text>
                </mdw-textfield-helper>
              </mdw-textfield>
            </div>
          </mdw-card>


          <!-- with validation text -->
          <mdw-card id="validation">
            <div class="mdw-card__content">
              <h6>Validation</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-textfield>
                  <input required>
                  <label>With validation text</label>

                  <mdw-textfield-helper>
                    <mdw-helper-text persistent>Helper text</mdw-helper-text>
                    <mdw-helper-text validation>Required</mdw-helper-text>
                  </mdw-textfield-helper>
                </mdw-textfield>
              </monaco-editor>
            </div>

            <div class="mdw-card__content block">
              <mdw-textfield id="validation-input">
                <input required>
                <label>With validation text</label>

                <mdw-textfield-helper>
                  <mdw-helper-text persistent>Helper text</mdw-helper-text>
                  <mdw-helper-text validation>Required</mdw-helper-text>
                </mdw-textfield-helper>
              </mdw-textfield>
            </div>
          </mdw-card>

          <!-- icons -->
          <mdw-card id="icons">
            <div class="mdw-card__content">
              <h6>Icons</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-textfield>
                  <mdw-icon>calendar</mdw-icon>
                  <input required>
                  <label>With validation text</label>
                </mdw-textfield>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <div style="flex: 1">
                <mdw-textfield>
                  <mdw-icon>events</mdw-icon>
                  <input type="date">
                  <label>Begin icon</label>
                </mdw-textfield>
              </div>

              <div style="flex: 1">
                <mdw-textfield>
                  <input>
                  <label>End icon</label>
                  <mdw-icon>delete</mdw-icon>
                </mdw-textfield>
              </div>
            </div>
          </mdw-card>


          <!-- textarea -->
          <mdw-card id="textarea">
            <div class="mdw-card__content">
              <h6>Textarea</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-textfield>
                  <textarea></textarea>
                  <label>label</label>
                </mdw-textfield>
              </monaco-editor>
            </div>

            <div class="mdw-card__content block">
              <mdw-textfield>
                <textarea></textarea>
                <label>label</label>
              </mdw-textfield>
            </div>
          </mdw-card>

        </section>

      </article>
    `;
  }
}
