import { Page } from '@webformula/pax-core';
import MDWSearch from '../../../src2/components/search/service.js';
import html from './page.html';

export default new class extends Page {
  search = new MDWSearch('mdw-search');
  onSearch_bound = this.onSearch.bind(this);

  constructor() {
    super();
  }

  template() {
    return this.renderTemplateString(html);
  }

  afterRender() {
    this.search.registerSection('alt', 'Alt results');

    this.search.registerTemplate(data => /*html*/`
      <mdw-list-item value="${data.value}">
        <mdw-avatar>A</mdw-avatar>
        ${data.primary}
      </mdw-list-item>
    `, 'default');

    this.search.registerTemplate(data => /*html*/`
      <mdw-list-item value="${data.value}" class="mdw-line-two">
        <mdw-icon>inbox</mdw-icon>
        <div class="mdw-text">
          <div class="mdw-headline">${data.primary}</div>
          <div class="mdw-supporting-text">${data.secondary}</div>
        </div>
      </mdw-list-item>
    `, 'alt');


    // quick results
    this.search.registerTemplate(data => /*html*/`
      <mdw-list-item value="${data.value}" class="mdw-line-two">
        <mdw-icon>inbox</mdw-icon>
        <div class="mdw-text">
          <div class="mdw-headline">${data.primary}</div>
          <div class="mdw-supporting-text">${data.secondary}</div>
        </div>
      </mdw-list-item>
    `, 'quick');

    document.querySelector('mdw-search').addEventListener('change', event => {
      console.log(event.target.value);
    });
    document.querySelector('mdw-search').addEventListener('search', this.onSearch_bound);

    document.querySelector('mdw-search').addEventListener('input', () => {
      this.search.updateQuickResults([
        {
          value: 'four',
          primary: 'Four',
          secondary: 'Secondary',
          section: 'quick'
        },
        {
          value: 'five',
          primary: 'Five',
          secondary: 'Secondary',
          section: 'quick'
        },
        {
          value: 'six',
          primary: 'Six',
          secondary: 'Secondary',
          section: 'quick'
        }
      ].filter(v => v.primary.toLocaleLowerCase().includes(this.search.searchValue)));
    });
  }

  async onSearch() {
    await this.wait(1000);
    this.search.updateSuggestions([
      {
        value: 'one',
        primary: 'One',
      },
      {
        value: 'two',
        primary: 'Two',
      },

      {
        value: 'three',
        primary: 'Three',
      },

      {
        value: 'four',
        primary: 'Four',
        secondary: 'Secondary',
        section: 'quick'
      },
      {
        value: 'five',
        primary: 'Five',
        secondary: 'Secondary',
        section: 'quick'
      },
      {
        value: 'six',
        primary: 'Six',
        secondary: 'Secondary',
        section: 'quick'
      }
    ].filter(v => v.primary.toLocaleLowerCase().includes(this.search.searchValue)));
  }

  async wait(time = 1000) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    });
  }
}
