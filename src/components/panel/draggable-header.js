import { HTMLElementExtended } from '@webformula/pax-core';
import { addDragListener, removeDragListener, states } from '../../core/drag.js';

/*
 * add dragable heaer to panel
 */
customElements.define('mdw-panel-draggable-header', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onDrag = this.onDrag.bind(this);
    this.cloneTemplate();
  }

  get draggableElement() {
    return this.shadowRoot.querySelector('.mdw-panel-draggable-header');
  }

  get panel() {
    return this.parentNode;
  }

  connectedCallback() {
    addDragListener(this.draggableElement, this.bound_onDrag);
  }

  disconnectedCallback() {
    removeDragListener(this.draggableElement, this.bound_onDrag);
  }

  onDrag(event) {
    switch (event.state) {
      case states.start:
        this._initialLeft = parseInt((this.panel.style.left || '0').replace('px', ''));
        this._initialTop = parseInt((this.panel.style.top || '0').replace('px', ''));
        break;
      
      case states.move:
        const panel = this.panel;
        panel.style.left = `${this._initialLeft + event.distance.x}px`;
        panel.style.top = `${this._initialTop + event.distance.y}px`;
        break;
    }
  }

  template() {
    return /* html */ `
      <div class="mdw-panel-draggable-header">
        <slot></slot>
        <mdw-icon>close</mdw-icon>
      </div>
    `;
  }

  styles() {
    return /* css */ `
      .mdw-panel-draggable-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: move;
        padding: 12px;
        user-select: none;
        -webkit-user-select: none;
      }
      mdw-icon {
        cursor: pointer;
      }
    `;
  }
});
