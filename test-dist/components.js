document.addEventListener('DOMContentLoaded', function (event) {
  // custom element templates
  
  
  
  var mdwbutton = document.createElement('template');
  mdwbutton.setAttribute('id','mdw-button--template');
  mdwbutton.innerHTML= `
    <style>
      :host(.mdw-show-spinner) span.text {
        opacity: 0;
      }
      
      /* --- Ripple --- */
      
      .mdw-ripple {
        overflow: hidden;
      }
      
      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }
      
      .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-foreground--rgb), 0.16);
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
      }
      
      .mdw-button-ripple,
      .mdw-button-focus-overlay {
        border-radius: inherit;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
      }
      
      
      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }
      
      :host(.mdw-primary.mdw-raised) .mdw-ripple-element,
      :host(.mdw-primary.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }
      
      :host(.mdw-secondary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
      }
      
      :host(.mdw-secondary.mdw-raised) .mdw-ripple-element,
      :host(.mdw-secondary.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }
      
      :host(.error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }
      
      :host(.error.mdw-raised) .mdw-ripple-element,
      :host(.error.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }
      
    </style>
    <render-block>
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-button-ripple"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwbutton);
  
  var mdwcheckbox = document.createElement('template');
  mdwcheckbox.setAttribute('id','mdw-checkbox--template');
  mdwcheckbox.innerHTML= `
    <style>
      
      /* --- background ---  */
      
      .mdw-background::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: scale(0, 0);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
        will-change: opacity, transform;
      }
      
      .mdw-background {
        left: 11px;
        right: initial;
        display: -ms-inline-flexbox;
        display: inline-flex;
        position: absolute;
        top: 11px;
        bottom: 0;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 45%;
        height: 45%;
        transition: background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        border: 2px solid currentColor;
        border-radius: 2px;
        background-color: transparent;
        pointer-events: none;
        will-change: background-color, border-color;
      }
      
      :host([dir="rtl"]) .mdw-background {
        left: initial;
        right: 11px;
      }
      
      .mdw-checkmark {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        opacity: 0;
        color: #fff;
      }
      
      .mdw-checkmark:after {
        box-sizing: border-box;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        left: 4px;
        top: 0;
        display: table;
        width: 6.66667px;
        height: 13.33333px;
        border-width: 2px;
        border-style: solid;
        border-top: 0;
        border-left: 0;
        content: "";
      }
      
      input:indeterminate + .mdw-background .mdw-checkmark {
        transform: rotate(45deg);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        opacity: 0;
      }
      
      input:indeterminate + .mdw-background .mdw-mixedmark {
        width: 100%;
        height: 0;
        transform: scaleX(0) rotate(0deg);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        border-width: 1px;
        border-style: solid;
        opacity: 0;
        border-color: #fff;
      }
      
      @media screen and (-ms-high-contrast: active) {
        .mixedmark {
          margin: 0 1px;
        }
      }
      
      path {
        transition: stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        stroke: currentColor;
        stroke-width: 3.12px;
        stroke-dashoffset: 29.78334;
        stroke-dasharray: 29.78334;
      }
      
      
      
      /* --- input --- */
      
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        opacity: 0;
        cursor: inherit;
      }
      
      input:enabled:not(:checked):not(:indeterminate) + .mdw-background {
        border-color: rgba(0, 0, 0, 0.54);
        background-color: transparent;
      }
      
      input:disabled:not(:checked):not(:indeterminate) + .mdw-background {
        border-color: rgba(0, 0, 0, 0.26);
      }
      
      input:disabled:checked + .mdw-background,
      input:disabled:indeterminate + .mdw-background {
        border-color: transparent;
        background-color: rgba(0, 0, 0, 0.26);
      }
      
      input:checked + .mdw-background,
      input:indeterminate + .mdw-background {
        transition: border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),
                    background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1);
      }
      
      input:checked + .mdw-background path,
      input:indeterminate + .mdw-background path {
        stroke-dashoffset: 0;
      }
      
      input:focus + .mdw-background::before {
        transform: scale(2.75, 2.75);
        transition: opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),
                    transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1);
        opacity: 0.12;
      }
      
      input:disabled {
        cursor: default;
        pointer-events: none;
      }
      
      input:checked + .mdw-background .mdw-checkmark {
        transition: opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),
                    transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);
        opacity: 1;
      }
      
      input:checked + .mdw-background .mdw-mixedmark {
        transform: scaleX(1) rotate(-45deg);
      }
      
      input:indeterminate + .mdw-background .mdw-checkmark {
        transform: rotate(45deg);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        opacity: 0;
      }
      
      input:indeterminate + .mdw-background .mdw-mixedmark {
        transform: scaleX(1) rotate(0deg);
        opacity: 1;
      }
      
      input:enabled:checked ~ .mdw-background,
      input:enabled:indeterminate ~ .mdw-background {
        border-color: var(--mdw-theme-secondary);
        background-color: var(--mdw-theme-secondary);
      }
      
      :host(.mdw-primary) input:enabled:checked ~ .mdw-background,
      :host(.mdw-primary) input:enabled:indeterminate ~ .mdw-background {
        border-color: var(--mdw-theme-primary);
        background-color: var(--mdw-theme-primary);
      }
      
      :host(.mdw-error) input:enabled:checked ~ .mdw-background,
      :host(.mdw-error) input:enabled:indeterminate ~ .mdw-background {
        border-color: var(--mdw-theme-error);
        background-color: var(--mdw-theme-error);
      }
      
      
      
      /* --- Ripple --- */
      
      .mdw-ripple {
        overflow: hidden;
      }
      
      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }
      
      .mdw-ripple-element {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
      }
      
      .mdw-checkbox-ripple {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
      }
      
      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }
      
      :host(.mdw-error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }
      
    </style>
    <render-block>
      <input type="checkbox">
      <div class="mdw-background">
        <div class="mdw-checkmark"></div>
        <div class="mdw-mixedmark"></div>
      </div>
      <div class="mdw-ripple mdw-checkbox-ripple"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwcheckbox);
  var mdwcircularprogress = document.createElement('template');
  mdwcircularprogress.setAttribute('id','mdw-circular-progress--template');
  mdwcircularprogress.innerHTML= `
    <style>
      :host {
        display: block;
        position: relative;
      }
      
      svg {
        position: absolute;
        transform: rotate(-90deg);
        top: 0;
        left: 0;
        transform-origin: center;
        overflow: visible;
      }
      
      circle {
        fill: transparent;
        transform-origin: center;
        transition: stroke-dashoffset 225ms linear;
        stroke: var(--mdw-theme-primary);
      }
      
      :host(.mdw-white) circle {
        stroke: white;
      }
      
      :host(.mdw-grey) circle {
        stroke: grey;
      }
      
      :host(.mdw-secondary) circle {
        stroke: var(--mdw-theme-secondary);
      }
      
      :host(.mdw-error) circle {
        stroke: var(--mdw-theme-error);
      }
      
      :host([mdw-mode='indeterminate']) {
        animation: mat-progress-spinner-linear-rotate 2000ms linear infinite;
      }
      
      :host([mdw-mode='indeterminate']) circle {
        transition-property: stroke;
        animation-duration: 4000ms;
        animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
        animation-iteration-count: infinite;
      }
      
      @keyframes mat-progress-spinner-linear-rotate {
        0%       { transform: rotate(0deg); }
        100%     { transform: rotate(360deg); }
      }
      
      @keyframes mat-progress-spinner-stroke-rotate-100 {
        0% {
          stroke-dashoffset: 268.606171575px;
          transform: rotate(0);
        }
        12.5% {
          stroke-dashoffset: 56.5486677px;
          transform: rotate(0);
        }
        12.5001% {
          stroke-dashoffset: 56.5486677px;
          transform: rotateX(180deg) rotate(72.5deg);
        }
        25% {
          stroke-dashoffset: 268.606171575px;
          transform: rotateX(180deg) rotate(72.5deg);
        }
        25.0001% {
          stroke-dashoffset: 268.606171575px;
          transform: rotate(270deg);
        }
        37.5% {
          stroke-dashoffset: 56.5486677px;
          transform: rotate(270deg);
        }
        37.5001% {
          stroke-dashoffset: 56.5486677px;
          transform: rotateX(180deg) rotate(161.5deg);
        }
        50% {
          stroke-dashoffset: 268.606171575px;
          transform: rotateX(180deg) rotate(161.5deg);
        }
        50.0001% {
          stroke-dashoffset: 268.606171575px;
          transform: rotate(180deg);
        }
        62.5% {
          stroke-dashoffset: 56.5486677px;
          transform: rotate(180deg);
        }
        62.5001% {
          stroke-dashoffset: 56.5486677px;
          transform: rotateX(180deg) rotate(251.5deg);
        }
        75% {
          stroke-dashoffset: 268.606171575px;
          transform: rotateX(180deg) rotate(251.5deg);
        }
        75.0001% {
          stroke-dashoffset: 268.606171575px;
          transform: rotate(90deg);
        }
        87.5% {
          stroke-dashoffset: 56.5486677px;
          transform: rotate(90deg);
        }
        87.5001% {
          stroke-dashoffset: 56.5486677px;
          transform: rotateX(180deg) rotate(341.5deg);
        }
        100% {
          stroke-dashoffset: 268.606171575px;
          transform: rotateX(180deg) rotate(341.5deg);
        }
      }
      
    </style>
    <render-block>
      <svg style="width: px; height: px;">
        <circle
          cx="50%"
          cy="50%"
          r=""
          style="
            animation-name: mat-progress-spinner-stroke-rotate-;
            stroke-dasharray: px;
            stroke-width: %;
          "
          ></circle>
      </svg>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwcircularprogress);
  
  
  
  
  var mdwexpandercontent = document.createElement('template');
  mdwexpandercontent.setAttribute('id','mdw-expander-content--template');
  mdwexpandercontent.innerHTML= `
    <style>
      
    </style>
    <render-block>
      <slot></slot>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwexpandercontent);
  
  var mdwfab = document.createElement('template');
  mdwfab.setAttribute('id','mdw-fab--template');
  mdwfab.innerHTML= `
    <style>
      :host(.mdw-show-spinner) span.text {
        opacity: 0;
      }
      
      /* --- Ripple --- */
      
      .mdw-ripple {
        overflow: hidden;
      }
      
      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }
      
      .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-foreground--rgb), 0.16);
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
      }
      
      .mdw-fab-ripple,
      .mdw-fab-focus-overlay {
        border-radius: inherit;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
      }
      
      
      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }
      
      :host(.mdw-secondary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }
      
      :host(.mdw-error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }
      
    </style>
    <render-block>
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-fab-ripple"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwfab);
  var mdwlinearprogress = document.createElement('template');
  mdwlinearprogress.setAttribute('id','mdw-linear-progress--template');
  mdwlinearprogress.innerHTML= `
    <style>
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 4px;
        padding-top: 0;
        margin-bottom: 0;
        background-color: #e6e6e6;
      }
      
      .mdw-bar {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background-color: var(--mdw-theme-primary);
      }
      
      :host(.mdw-white) .mdw-bar {
        background-color: white;
      }
      
      :host(.mdw-grey) .mdw-bar {
        background-color: grey;
      }
      
      :host(.mdw-secondary) .mdw-bar {
        background-color: var(--mdw-theme-secondary);
      }
      
      :host(.mdw-error) .mdw-bar {
        background-color: var(--mdw-theme-error);
      }
      
      
      :host(.mdw-query) .mdw-bar {
        transition: all 0.2s linear;
        animation: query .8s infinite cubic-bezier(0.390, 0.575, 0.565, 1.000);
      }
      
      @keyframes query {
        0% {
          opacity: 1;
          transform: translateX(35%) scale(.3, 1);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) scale(0, 1);
        }
      }
      
    </style>
    <render-block>
      <div class="mdw-bar"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwlinearprogress);
  
  
  
  
  
  var mdwradio = document.createElement('template');
  mdwradio.setAttribute('id','mdw-radio--template');
  mdwradio.innerHTML= `
    <style>
      
    </style>
    <render-block>
      <input type="radio" name="">
      <div class="mdw-radio-background">
        <div class="mdw-radio__outer-circle"></div>
        <div class="mdw-radio__inner-circle"></div>
      </div>
      <div class="mdw-ripple mdw-radio-ripple"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwradio);
  var mdwselect = document.createElement('template');
  mdwselect.setAttribute('id','mdw-select--template');
  mdwselect.innerHTML= `
    <style>
      ::slotted(label.mdw-empty-no-float) {
        transform: none;
      }
      
      .mdw-select__icon {
        background: url("data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%23000%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E") no-repeat center;
        left: auto;
        right: 8px;
        position: absolute;
        bottom: 16px;
        width: 24px;
        height: 24px;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
      }
      :host(.mdw-focused) .mdw-select__icon {
        background: url("data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%236200ee%22%20fill-rule%3D%22evenodd%22%20opacity%3D%221%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E") no-repeat center;
        transform: rotate(180deg) translateY(-5px);
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      
      .mdw-select__icon {
        background: url("data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%23000%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E") no-repeat center;
        left: auto;
        right: 8px;
        position: absolute;
        bottom: 16px;
        width: 24px;
        height: 24px;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
      }
      
      ::slotted(select:focus) .mdw-select__icon,
      :host(.mdw-focused:focus) .mdw-select__icon {
        background: url("data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%236200ee%22%20fill-rule%3D%22evenodd%22%20opacity%3D%221%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E") no-repeat center;
        transform: rotate(180deg) translateY(-5px);
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      :host(:not(.mdw-select--disabled)) ::slotted(select),
      :host(:not(.mdw-select--disabled)) ::slotted(.mdw-select__selected-text) {
        /* TODO figure out what color var to use */
        border-bottom-color: rgba(0,0,0,.42);
        /* TODO figure out what color var to use */
        color: rgba(0,0,0,.87);
      }
      
      :host(.mdw-focused:not(.mdw-select--disabled)) ::slotted(select),
      :host(.mdw-focused:not(.mdw-select--disabled)) ::slotted(.mdw-select__selected-text),
      :host(:not(.mdw-select--disabled)) ::slotted(select:focus),
      :host(.mdw-focused:focus:not(.mdw-select--disabled)) ::slotted(.mdw-select__selected-text) {
        border-bottom: 2px solid;
        border-bottom-color: var(--mdw-theme-primary);
      }
      
      :host(.mdw-outlined) ::slotted(select),
      :host(.mdw-outlined) ::slotted(.mdw-select__selected-text) {
        border: none;
      }
      
      ::slotted(select),
      ::slotted(.mdw-select__selected-text) {
        position: absolute;
        padding: 20px 52px 4px 16px;
        font-family: Roboto,sans-serif;
        font-size: 1rem;
        line-height: 1.75rem;
        font-weight: 400;
        letter-spacing: .009375em;
        text-decoration: inherit;
        text-transform: inherit;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        border: none;
        border-bottom: 1px solid;
        outline: none;
        background-color: transparent;
        color: inherit;
        white-space: nowrap;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }
      
      /* outlined */
      :host(.mdw-outlined) ::slotted(select),
      :host(.mdw-outlined) ::slotted(.mdw-select__selected-text) {
        padding: 12px 52px 12px 16px;
        display: flex;
        border: none;
        background-color: transparent;
        z-index: 1;
      }
      :host(.mdw-outlined) ::slotted(select) {
        border-radius: 4px;
      }
      
      ::slotted(select) {
        border-radius: 4px 4px 0 0;
      }
      
      :host([dir=rtl]) ::slotted(select),
      ::slotted(select[dir=rtl]),
      :host([dir=rtl]) ::slotted(.mdw-select__selected-text),
      ::slotted(.mdw-select__selected-text[dir=rtl]) {
        padding-left: 52px;
        padding-right: 16px;
      }
      
      :host(:not(.mdw-select--disabled)) ::slotted(label) {
        /* TODO figure out what color var to use */
        color: rgba(0,0,0,.6);
      }
      
      :host(:not(.mdw-select--disabled)) ::slotted(select:focus) + ::slotted(label),
      :host(.mdw-focused:not(.mdw-select--disabled)) ::slotted(label) {
        color: var(--mdw-theme-primary);
      }
      
      ::slotted(label) {
        font-size: 1rem;
        line-height: 1.75rem;
        font-weight: 400;
        letter-spacing: 0.009375em;
        text-decoration: inherit;
        text-transform: inherit;
        position: absolute;
        left: 0;
        transform-origin: left top;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        line-height: 1.15rem;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: text;
        overflow: hidden;
        will-change: transform;
        transform: none;
        pointer-events: none;
      
        left: 16px;
        right: initial;
        top: 21px;
      }
      
      :host(.mdw-no-animation) ::slotted(label) {
        transition: none;
      }
      
      ::slotted(label:not(.mdw-empty-no-float)) {
        transform: translateY(-70%) scale(0.75);
      }
      
      ::slotted(select:focus) + ::slotted(label),
      ::slotted(label.mdw-select--float-above) {
        transform: translateY(-70%) scale(0.75);
      }
      
      :host(.mdw-outlined.mdw-focused) ::slotted(label),
      :host(.mdw-outlined) ::slotted(label.mdw-select--float-above) {
        transform: translateY(-132%) scale(0.75);
      }
      
      :host(.mdw-select--with-leading-icon) ::slotted(label) {
        left: 48px;
        right: initial;
      }
      
      :host(.mdw-outlined) ::slotted(label) {
        left: 15px;
        right: initial;
        top: 18px;
      }
      
      :host(.mdw-outlined.mdw-select--with-leading-icon) ::slotted(label) {
        left: 36px;
        right: initial;
      }
      
      :host(.mdw-outlined.mdw-select--with-leading-icon) ::slotted(label.mdw-select--float-above) {
        left: 36px;
        right: initial;
      }
      
      .mdw-outlined-border-container {
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        height: 100%;
        text-align: left;
        pointer-events: none;
      }
      
      .mdw-outlined-leading {
        border-radius: 4px 0 0 4px;
        border-left: 1px solid;
        border-right: none;
        width: 12px;
      }
      
      .mdw-outlined-notch {
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: auto;
        max-width: calc(100% - 12px * 2);
      }
      
      .mdw-outlined-trailing {
        border-left: none;
        border-right: 1px solid;
        border-radius: 0 4px 4px 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
      }
      
      .mdw-outlined-leading,
      .mdw-outlined-notch,
      .mdw-outlined-trailing {
        box-sizing: border-box;
        height: 100%;
        border-top: 1px solid;
        border-bottom: 1px solid;
        pointer-events: none;
      
        border-color: rgba(0,0,0,.24);
      }
      
      .mdw-outlined-notch {
        border-top: none;
      }
      
      :host(.mdw-focused) .mdw-outlined-leading,
      :host(.mdw-focused) .mdw-outlined-notch,
      :host(.mdw-focused) .mdw-outlined-trailing,
      ::slotted(select:focus) .mdw-outlined-leading,
      ::slotted(select:focus) .mdw-outlined-notch,
      ::slotted(select:focus) .mdw-outlined-trailing {
        border-width: 2px;
        border-color: var(--mdw-theme-primary);
      }
      
      :host(.invalid) .mdw-outlined-leading,
      :host(.invalid) .mdw-outlined-notch,
      :host(.invalid) .mdw-outlined-trailing {
        border-color: var(--mdw-theme-error);
      }
      
    </style>
    <render-block>
      
            <i class="mdw-select__icon"></i>
            <slot></slot>
            <div class="mdw-line-ripple"></div>
            
          
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwselect);
  var mdwslider = document.createElement('template');
  mdwslider.setAttribute('id','mdw-slider--template');
  mdwslider.innerHTML= `
    <style>
      .mdw-slider__track-container {
        position: absolute;
        top: 50%;
        width: 100%;
        height: 10px;
        margin-top: -6px;
        overflow: hidden;
        user-select: none;
      }
      
      .mdw-slider__track {
        position: absolute;
        width: 100%;
        height: 2px;
        top: 50%;
        user-select: none;
        /* background-color: var(--mdw-theme-secondary); */
      }
      
      /* :host(.mdw-primary) .mdw-slider__track {
        background-color: var(--mdw-theme-primary);
      }
      
      :host(.mdw-error) .mdw-slider__track {
        background-color: var(--mdw-theme-error);
      } */
      
      
      .mdw-slider__thumb-container {
        position: absolute;
        top: 50%;
        left: 0;
        user-select: none;
        z-index: 2;
      }
      
      .mdw-slider__thumb {
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-top: -50%;
        z-index: 2;
        background-color: var(--mdw-theme-secondary);
        cursor: pointer;
        user-select: none;
      }
      
      :host(.mdw-primary) .mdw-slider__thumb {
        background-color: var(--mdw-theme-primary);
      }
      
      :host(.mdw-error) .mdw-slider__thumb {
        background-color: var(--mdw-theme-error);
      }
      
      .mdw-slider__thumb-hover {
        position: absolute;
        box-sizing: border-box;
        top: -12px;
        left: -6px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        transform-origin: center center;
        transition: opacity .1s ease-out,fill .1s ease-out,
                    transform .1s ease-out,fill .1s ease-out;
        opacity: 0;
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
        cursor: pointer;
        user-select: none;
      }
      
      :host(.mdw-primary) .mdw-slider__thumb-hover {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }
      
      :host(.mdw-error) .mdw-slider__thumb-hover {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }
      
      :host(.mdw-hover) .mdw-slider__thumb-hover {
        opacity: 1;
      }
      
      :host(.mdw-pressed) .mdw-slider__thumb-hover {
        transform: scale(1.8);
      }
      
      
      
      
      /* --- notches --- */
      
      .mdw-slider__notch-container {
        display: flex;
        width: 200%;
        user-select: none;
      }
      
      .mdw-slider__notch-pre-container {
        width: 100%;
        height: 2px;
        display: flex;
        flex-direction: row;
        margin-top: 5px;
        overflow: hidden;
        z-index: 1;
        background-color: var(--mdw-theme-secondary);
        user-select: none;
      }
      
      :host(.mdw-primary) .mdw-slider__notch-pre-container {
        background-color: var(--mdw-theme-primary);
      }
      
      :host(.mdw-error) .mdw-slider__notch-pre-container {
        background-color: var(--mdw-theme-error);
      }
      
      .mdw-slider__notch-pre-container .mdw-slider__notch {
        height: 2px;
        flex: 1;
        border-left: 3px solid rgba(255, 255, 255, 0.6);
      }
      
      .mdw-slider__notch-post-container {
        width: 100%;
        height: 2px;
        display: flex;
        flex-direction: row;
        margin-top: 5px;
        overflow: hidden;
        z-index: 1;
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.5);
        user-select: none;
      }
      
      :host(.mdw-primary) .mdw-slider__notch-post-container {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.5);
      }
      
      :host(.mdw-error) .mdw-slider__notch-post-container {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.5);
      }
      
      .mdw-slider__notch-post-container .mdw-slider__notch {
        height: 2px;
        flex: 1;
        border-left: 3px solid rgba(0, 0, 0, 0.6);
      }
      
    </style>
    <render-block>
      <div class="mdw-slider__track-container">
        <div class="mdw-slider__track"></div>
      
        <div class="mdw-slider__notch-container">
          <div class="mdw-slider__notch-pre-container">
            
          </div>
      
          <div class="mdw-slider__notch-post-container">
            
          </div>
        </div>
      </div>
      <div class="mdw-slider__thumb-container">
        <div class="mdw-slider__thumb"></div>
        <div class="mdw-slider__thumb-hover"></div>
      </div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwslider);
  
  var mdwswitch = document.createElement('template');
  mdwswitch.setAttribute('id','mdw-switch--template');
  mdwswitch.innerHTML= `
    <style>
      
      .mdw-track {
        box-sizing: border-box;
        width: 32px;
        height: 14px;
        border: 1px solid;
        border-radius: 7px;
        opacity: .38;
        transition: opacity 90ms cubic-bezier(.4,0,.2,1),
                    background-color 90ms cubic-bezier(.4,0,.2,1),
                    border-color 90ms cubic-bezier(.4,0,.2,1);
      }
      
      :host(:not(.checked)) .mdw-track {
        background-color: #000;
        border-color: #000;
      }
      
      :host(.checked) .mdw-track {
        background-color: var(--mdw-theme-secondary);
        border-color: var(--mdw-theme-secondary);
        opacity: .54;
      }
      
      :host(.checked.mdw-primary) .mdw-track {
        background-color: var(--mdw-theme-primary);
        border-color: var(--mdw-theme-primary);
      }
      
      :host(.checked.mdw-error) .mdw-track {
        background-color: var(--mdw-theme-error);
        border-color: var(--mdw-theme-error);
      }
      
      
      
      /* --- thumb underlay --- */
      
      .mdw-thumb-underlay {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        display: flex;
        position: absolute;
        will-change: transform,opacity;
        left: -18px;
        right: auto;
        top: -17px;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        transform: translateX(0);
        transition: transform 90ms cubic-bezier(.4,0,.2,1),
                    background-color 90ms cubic-bezier(.4,0,.2,1),
                    border-color 90ms cubic-bezier(.4,0,.2,1);
      }
      
      :host(.checked) .mdw-thumb-underlay {
        transform: translateX(20px);
      }
      
      .mdw-thumb-underlay:after,
      .mdw-thumb-underlay:before {
        position: absolute;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
        background-color: var(--mdw-theme-secondary);
      }
      
      :host(.mdw-primary) .mdw-thumb-underlay:after,
      :host(.mdw-primary) .mdw-thumb-underlay:before {
        background-color: var(--mdw-theme-primary);
      }
      
      :host(.mdw-error) .mdw-thumb-underlay:after,
      :host(.mdw-error) .mdw-thumb-underlay:before {
        background-color: var(--mdw-theme-error);
      }
      
      .mdw-thumb-underlay:before {
        transition: opacity 15ms linear,background-color 15ms linear;
        z-index: 1;
      }
      
      
      
      /* --- thumb --- */
      
      .mdw-thumb {
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
                    0 2px 2px 0 rgba(0,0,0,.14),
                    0 1px 5px 0 rgba(0,0,0,.12);
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        border: 10px solid;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      }
      
      :host(.checked) .mdw-thumb {
        background-color: var(--mdw-theme-secondary);
        border-color: var(--mdw-theme-secondary);
      }
      
      :host(.checked.mdw-primary) .mdw-thumb {
        background-color: var(--mdw-theme-primary);
        border-color: var(--mdw-theme-primary);
      }
      
      :host(.checked.mdw-error) .mdw-thumb {
        background-color: var(--mdw-theme-error);
        border-color: var(--mdw-theme-error);
      }
      
      :host(:not(.checked)) .mdw-thumb {
        background-color: #fff;
        border-color: #fff;
      }
      
      
      /* --- input --- */
      
      input {
        left: 0;
        right: auto;
        position: absolute;
        top: 0;
        width: 68px;
        height: 48px;
        margin: 0;
        opacity: 0;
        cursor: pointer;
        pointer-events: auto;
      }
      
      :host(.checked) input {
        transform: translateX(-20px);
      }
      
      
      
      /* --- ripple --- */
      
      .mdw-ripple {
        overflow: hidden;
      }
      
      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }
      
      .mdw-ripple-element {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
      }
      
      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }
      
      :host(.mdw-error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }
      
      .mdw-switch-ripple {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
      }
      
    </style>
    <render-block>
      <div class="mdw-track"></div>
      <div class="mdw-thumb-underlay">
        <div class="mdw-thumb">
          <input type="checkbox" role="switch">
          <div class="mdw-ripple mdw-switch-ripple"></div>
        </div>
      </div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwswitch);
  var mdwtabbody = document.createElement('template');
  mdwtabbody.setAttribute('id','mdw-tab-body--template');
  mdwtabbody.innerHTML= `
    <style>
      mdw-tab-body-content {
        height: 100%;
        overflow: auto;
      }
      
    </style>
    <render-block>
      <mdw-tab-body-content>
        <!-- slot is added dynamicly -->
      </mdw-tab-body-content>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwtabbody);
  var mdwtabbutton = document.createElement('template');
  mdwtabbutton.setAttribute('id','mdw-tab-button--template');
  mdwtabbutton.innerHTML= `
    <style>
      :host(.mdw-show-spinner) span.text {
        opacity: 0;
      }
      
      /* Add this to button or creat a new componenet mdw-tab */
      .mdw-tab-button-indicator {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }
      
      :host(.mdw-active) .mdw-tab-button-indicator .mdw-tab-button-indicator__content {
        transition: transform .2s cubic-bezier(.4,0,.2,1);
      }
      
      .mdw-tab-button-indicator__content {
        opacity: 0;
        transform-origin: left;
      }
      
      :host(.mdw-active) .mdw-tab-button-indicator__content {
        opacity: 1;
        transform: translateX(0);
      }
      
      .mdw-tab-button-indicator .mdw-tab-button-indicator__content--underline {
        align-self: flex-end;
        width: 100%;
        background-color: var(--mdw-theme-primary);
        height: 2px;
      }
      
      
      /* --- Ripple --- */
      
      .mdw-ripple {
        overflow: hidden;
      }
      
      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }
      
      .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-foreground--rgb), 0.16);
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
      }
      
      .mdw-tab-button-ripple,
      .mdw-tab-button-focus-overlay {
        border-radius: inherit;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
      }
      
      :host(.mdw-active) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }
      
    </style>
    <render-block>
      <span class="text"><slot></slot></span>
      <span class="mdw-tab-button-indicator">
        <span class="mdw-tab-button-indicator__content mdw-tab-button-indicator__content--underline"></span>
      </span>
      <div class="mdw-ripple mdw-tab-button-ripple"></div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwtabbutton);
  var mdwtabsbar = document.createElement('template');
  mdwtabsbar.setAttribute('id','mdw-tabs-bar--template');
  mdwtabsbar.innerHTML= `
    <style>
      mdw-tabs-bar-scroller {
        display: block;
        overflow-y: hidden;
      }
      
      mdw-tabs-bar-scroller-area {
        display: flex;
        /* overflow-x: scroll; */
      }
      
      mdw-tabs-bar-scroller-content {
        position: relative;
        display: flex;
        flex: 1 0 auto;
        transform: none;
        will-change: transform;
      }
      
      ::slotted(mdw-button) {
        flex: 1 0 auto;
      }
      
    </style>
    <render-block>
      <mdw-tabs-bar-scroller>
        <mdw-tabs-bar-scroller-area>
          <mdw-tabs-bar-scroller-content>
            <slot></slot>
          </mdw-tabs-bar-scroller-content>
        </mdw-tabs-bar-scroller-area>
      </mdw-tabs-bar-scroller>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwtabsbar);
  
  
  var mdwtooltip = document.createElement('template');
  mdwtooltip.setAttribute('id','mdw-tooltip--template');
  mdwtooltip.innerHTML= `
    <style>
      
    </style>
    <render-block>
      <div class="tooltip">
        <slot></slot>
      </div>
    </render-block>
  `;
  document.body.insertAdjacentElement('beforeend', mdwtooltip);
  

  // custom elements
  customElements.define('mdw-autocomplete', class extends HTMLElementExtended {
    constructor() {
      super();
      this._hasFilter = this.hasAttribute('filter');
    }
  
    connectedCallback() {
      const target = this.targetInput;
  
      this._innerHTML = this.innerHTML;
      this._optionsData = [...this.children].reduce((a, el) => {
        a[el.innerText] = el.getAttribute('value');
        return a;
      }, {});
      this.innerHTML = '';
      this.insertAdjacentHTML('beforeend', this.panelHTML);
      this.panel.innerHTML = this._innerHTML;
      this.panel.style.minWidth = `${this.targetInput.offsetWidth}px`;
      this.panel.style.transform = 'scale(1)';
      this.panel.style.top = `${this.targetInput.offsetHeight + 12}px`;
      this.panel.ignoreElementOnClickToClose(target);
  
      this.bound_onTargetFocus = this.onTargetFocus.bind(this);
      this.bound_onTargetBlur = this.onTargetBlur.bind(this);
      this.bound_onTargetChange = this.onTargetChange.bind(this);
      this.bound_onTargetInput = this.onTargetInput.bind(this);
      this.bound_onPanelClick = this.onPanelClick.bind(this);
      this.bound_onPanelClose = this.onPanelClose.bind(this);
      this.bound_onKeyDown = this.onKeyDown.bind(this);
      this.debounce_filter = MDWUtils.debounce(this.filter.bind(this), 100);
  
      target.addEventListener('focus', this.bound_onTargetFocus);
      target.addEventListener('blur', this.bound_onTargetBlur);
      target.addEventListener('input', this.bound_onTargetInput);
      this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
      document.body.addEventListener('keydown', this.bound_onKeyDown);
    }
  
    disconnectedCallback() {
      const target = this.targetInput;
      if (target) {
        target.removeEventListener('focus', this.bound_onTargetFocus);
        target.removeEventListener('blur', this.bound_onTargetBlur);
        target.removeEventListener('change', this.bound_onTargetChange);
        target.removeEventListener('input', this.bound_onTargetInput);
      }
      this.panel.close();
      this.panel.removeEventListener('click', this.bound_onPanelClick);
      this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
      document.body.removeEventListener('keydown', this.bound_onKeyDown);
    }
  
    get targetInput() {
      return document.body.querySelector(`input[name=${this.getAttribute('for')}]`);
    }
  
    get panel() {
      if (!this.panel_) this.panel_ = this.querySelector('mdw-panel');
      return this.panel_;
    }
  
    get panelHTML() {
      return '<mdw-panel mdw-position="top inner-left"></mdw-panel>';
    }
  
    onPanelClose(e) {
      const target = this.targetInput;
      this.panel.removeEventListener('click', this.bound_onPanelClick);
      target.removeEventListener('change', this.bound_onTargetChange);
    }
  
    openPanel() {
      const target = this.targetInput;
      this._focusIndex = undefined;
      this.panel.open(true);
      this.panel.addEventListener('click', this.bound_onPanelClick);
      target.addEventListener('change', this.bound_onTargetChange);
    }
  
    onKeyDown(e) {
      if (!this.panel.isOpen()) {
        if (!this._isInputFocused) return;
        if (e.keyCode !== 27) this.openPanel();
        return;
      }
  
      switch (e.keyCode) {
        case 40: //down
        case 39: //right
          this.focusNext();
          break;
  
        case 38: //up
        case 37: //left
          this.focusPrevious();
          break;
  
        case 13: //enter
          this.selectFocused();
          break;
      }
    }
  
    onTargetFocus(e) {
      this._isInputFocused = true;
      this.openPanel();
    }
  
    onTargetBlur(e) {
      this._isInputFocused = false;
      // this.panel.close();
      // this.panel.removeEventListener('click', this.bound_onPanelClick);
    }
  
    onTargetChange(e) {
      // console.log('change');
    }
  
    onTargetInput(e) {
      if (!this.panel.isOpen()) {
        this.openPanel();
        return;
      }
      if (this._hasFilter) this.debounce_filter(e.target.value);
    }
  
    onPanelClick(e) {
      if (e.target.hasAttribute('value')) {
        const value = e.target.getAttribute('value');
        // TODO text field should do this when value is set
        this.targetInput.parentNode.classList.add('not-empty');
        this.targetInput.value = value;
        this.panel.close();
      }
    }
  
    filter(value) {
      if (!this.panel.isOpen()) return;
      value = value.toLowerCase();
      const vlen = value.length;
      const filtered = Object.keys(this._optionsData).filter(h => {
        const hlen = h.length;
        if (vlen > hlen) return false;
        if (vlen === hlen) return value === h;
        if (h.toLowerCase().includes(value)) return true
        return false;
        // TODO implement char matching
        // let i = 0;
        // let j;
        // for (; i < vlen; i += 1) {
        //
        // }
      });
  
      this.panel.innerHTML = this.renderOptions(filtered);
    }
  
    renderOptions(optionKeys) {
      return `${optionKeys.map(k => html`
        <option value="${this._optionsData[k]}">${k}</option>
      `).join('\n')}`;
    }
  
    focusNext() {
      if (!this.panel.isOpen()) return;
      const optionElements = [...this.panel.children];
      if (this._focusIndex === undefined) this._focusIndex = 0;
      else this._focusIndex += 1;
      if (this._focusIndex > optionElements.length - 1) this._focusIndex = optionElements.length - 1;
      if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
      this._focusedOption = optionElements[this._focusIndex];
      this._focusedOption.classList.add('mdw-focused');
    }
  
    focusPrevious() {
      if (!this.panel.isOpen()) return;
      const optionElements = [...this.panel.children];
      if (this._focusIndex === undefined) this._focusIndex = 0;
      else this._focusIndex -= 1;
      if (this._focusIndex <= 0) this._focusIndex = 0;
      if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
      this._focusedOption = optionElements[this._focusIndex];
      this._focusedOption.classList.add('mdw-focused');
    }
  
    selectFocused() {
      if (!this.panel.isOpen()) return;
      const optionElements = [...this.panel.children];
      if (this._focusIndex == undefined || this._focusIndex > optionElements.length - 1) this._focusIndex = 0;
      const value =  optionElements[this._focusIndex].getAttribute('value');
      // TODO text field should do this when value is set
      this.targetInput.parentNode.classList.add('not-empty');
      this.targetInput.value = value;
      this.panel.close();
    }
  });
  
  customElements.define('mdw-backdrop', class extends HTMLElementExtended {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.frontElement.classList.add('mdw-elevation-1');
    }
  
    get frontElement() {
      if (!this.frontElement_) this.frontElement_ = this.querySelector('mdw-backdrop-front');
      return this.frontElement_;
    }
  
    get backContentElement() {
      if (!this.backContentElement_) this.backContentElement_ = this.querySelector('mdw-backdrop-back mdw-backdrop-content');
      return this.backContentElement_;
    }
  
    get backContenHeight() {
      const children = this.backContentElement.children;
      const lastChild = children[children.length - 1];
      const childBounds = lastChild.getBoundingClientRect();
      return this.backContentElement.getBoundingClientRect().y + childBounds.y + childBounds.height;
    }
  
    get expanded() {
      return this.expanded_;
    }
  
    toggle() {
      console.log('toggle', this.expanded_);
      if (this.expanded_ === true) this.contract();
      else this.expand();
    }
  
    expand() {
      this.frontElement.style.top = `${this.backContenHeight}px`;
      this.expanded_ = true;
    }
  
    contract() {
      this.frontElement.style.top = '56px';
      this.expanded_ = false;
    }
  });
  
  customElements.define('mdw-banner', class extends HTMLElementExtended {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.style.marginBottom = `-${this.clientHeight + 1}px`;
    }
  
    show() {
      MDWBanner.add(this);
    }
  
    dismiss() {
      MDWBanner.remove(this);
    }
  
    accept() {
      MDWBanner.accept(this);
    }
  
    _show() {
      this.classList.add('mdw-show');
    }
  
    _dissmiss() {
      const self = this;
      self.addEventListener(MDWUtils.transitionEventName, function handler() {
        self.removeEventListener(MDWUtils.transitionEventName, handler);
        self.remove();
      });
      this.classList.add('mdw-dismiss');
      this.dispatchClose();
    }
  
    dispatchClose() {
      this.dispatchEvent(new CustomEvent('close'));
    }
  });
  
  customElements.define('mdw-button', class extends HTMLElementExtended {
    constructor() {
      super();
      this.bound_asyncClick = this.asyncClick.bind(this);
      this.cloneTemplate();
      this.setupAsync();
    }
  
    connectedCallback() {
      this.ripple = new MDWRipple({
        element: this.shadowRoot.querySelector('.mdw-ripple'),
        triggerElement: this
      });
    }
  
    disconnectedCallback() {
      this.ripple.destroy();
      this.removeEventListener('click', this.bound_asyncClick);
    }
  
    get spinnerContainer() {
      if (!this._spinnerContainer) this._spinnerContainer = this.shadowRoot.querySelector('.mdw-spinner-container');
      return this._spinnerContainer;
    }
  
    get pending() {
      return this.pending_;
    }
  
    setupAsync() {
      if (!this.hasAttribute('mdw-async')) return;
      this.addEventListener('click', this.bound_asyncClick);
    }
  
    resolve() {
      if (this.pending_ === false) return;
      this.pending_ = false;
      this.hideSpinner();
    }
  
    asyncClick(e) {
      if (this.pending_ === true) return;
      this.pending_ = true;
      this.showSpinner();
    }
  
    showSpinner() {
      this._showSpinner = true;
      this.classList.add('mdw-show-spinner');
      const isWhite = this.classList.contains('mdw-primary') || this.classList.contains('mdw-secondary') || this.classList.contains('mdw-error');
      this.spinnerContainer.innerHTML = `<mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="24" class="${isWhite ? 'mdw-white' : 'mdw-grey'}" style="position: absolute; left: calc(50% - 12px); top: 6px;"></mdw-circular-progress>`;
    }
  
    hideSpinner() {
      this._showSpinner = false;
      this.classList.remove('mdw-show-spinner');
      this.spinnerContainer.innerHTML = '';
    }
  
    template() {
      return html`
        <span class="text"><slot></slot></span>
        <span class="mdw-spinner-container"></span>
        <div class="mdw-ripple mdw-button-ripple"></div>
      `;
    }
  
    get stylesFile() {
      return 'src/components/button/internal.css'
    }
  });
  
  customElements.define('mdw-card', class extends HTMLElementExtended {
    constructor() {
      super();
    }
  });
  
  customElements.define('mdw-checkbox', class extends HTMLElementExtended {
     constructor() {
       super();
       this.bound_handleChange = this.handleChange.bind(this);
     }
  
     connectedCallback() {
       this.cloneTemplate();
  
       if (this.hasAttribute('indeterminate')) this.indeterminate = true;
       if (this.hasAttribute('checked')) this.checked = true;
  
       this.ripple = new MDWRipple({
         element: this.shadowRoot.querySelector('.mdw-ripple'),
         triggerElement: [this.input],
         radius: 20,
         centered: true
       });
  
       this.connected_ = true;
       this.input.addEventListener('change', this.bound_handleChange);
     }
  
     disconnectedCallback() {
       this.input.removeEventListener('change', this.bound_handleChange);
       this.ripple.destroy();
     }
  
     static get observedAttributes() {
       return ['checked', 'indeterminate', 'disabled'];
     }
  
     attributeChangedCallback(name, oldValue, newValue) {
       if (!this.connected_) return;
       this[name] = newValue;
     }
  
     get input() {
       if (!this.input_) this.input_ = this.shadowRoot.querySelector('input');
       return this.input_;
     }
  
     get checked() {
       return this.input.checked;
     }
  
     set checked(value) {
       if (value === '') value = true;
       this.input.checked = value;
       this.handleChange();
     }
  
     get indeterminate() {
       return this.input.indeterminate;
     }
  
     set indeterminate(value) {
       if (value === '') value = true;
       this.input.indeterminate = value;
     }
  
     set disabled(value) {
       value = !!value || value === '';
       if (value) this.input.setAttribute('disabled', 'disabled');
       else this.input.removeAttribute('disabled');
     }
  
     handleChange() {
       this.dispatchEvent(new CustomEvent('change', this));
     }
  
     toggle() {
       this.checked = !this.checked;
     }
  
     get stylesFile() {
       return '/src/components/checkbox/internal.css'
     }
  
     template() {
       return html`
         <input type="checkbox">
         <div class="mdw-background">
           <div class="mdw-checkmark"></div>
           <div class="mdw-mixedmark"></div>
         </div>
         <div class="mdw-ripple mdw-checkbox-ripple"></div>
       `;
     }
  });
  
  customElements.define('mdw-circular-progress', class extends HTMLElementExtended {
    constructor() {
      super();
      this.insertedDiameters = [];
      this.cloneTemplate();
    }
  
    connectedCallback() {
      this.diameter = this.getAttribute('mdw-diameter') || 100;
      this.render();
      this.style.width = this.style.height = this.diameter + 'px';
      if (this.value) this.value = this.value;
    }
  
    static get observedAttributes() {
      return ['value'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this[name] = newValue;
    }
  
    get diameter() {
      return this._diameter;
    }
    set diameter(value) {
      this._diameter = parseInt((''+value).replace('px', ''));
      if (!this.insertedDiameters[this._diameter]) {
        this.insertedDiameters.push(this._diameter);
        this.shadowRoot.querySelector('style').sheet.insertRule(this._getAnimationText(), 0);
      }
    }
  
    get svg() {
      if (!this._svg) this._svg = this.shadowRoot.querySelector('svg');
      return this._svg;
    }
  
    get strokeWidth() {
      return this._strokeWidth || this.diameter / 10;
    }
    set strikeWidth(value) {
      this._strokeWidth = parseInt((''+value).replace('px', ''));
    }
  
    get value() {
      return this.getAttribute('value');
    }
    set value(value) {
      this._value = Math.max(0, Math.min(100, parseInt((''+value).replace('px', ''))));
      if (this.diameter === undefined) return;
      this.circle.style.strokeDashoffset = (this._strokeCircumference * (100 - this._value) / 100) + 'px';
    }
  
    get mode() {
      return this.getAttribute('mdw-mode') === 'determinate' ? 'determinate' : 'indeterminate';
    }
  
    get circle() {
      if (!this._circle) this._circle = this.shadowRoot.querySelector('circle');
      return this._circle;
    }
  
    get _circleRadius() {
      return (this.diameter - 10) / 2;
    }
  
    get _circleStrokeWidth() {
      return this.strokeWidth / this.diameter * 100;
    }
  
    get _strokeCircumference() {
      return 2 * Math.PI * this._circleRadius;
    }
  
    get INDETERMINATE_ANIMATION_TEMPLATE() {
      return `
       @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {
          0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }
          12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }
          12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }
          25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }
          25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }
          37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }
          37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }
          50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }
          50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }
          62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }
          62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }
          75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }
          75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }
          87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }
          87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }
          100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }
        }
      `;
    }
  
    _getAnimationText() {
      return this.INDETERMINATE_ANIMATION_TEMPLATE
        .replace(/START_VALUE/g, `${0.95 * this._strokeCircumference}`)
        .replace(/END_VALUE/g, `${0.2 * this._strokeCircumference}`)
        .replace(/DIAMETER/g, `${this.diameter}`);
    }
  
    template() {
      return html`
        <svg style="width: ${this.diameter}px; height: ${this.diameter}px;">
          <circle
            cx="50%"
            cy="50%"
            r="${this._circleRadius}"
            style="
              animation-name: mat-progress-spinner-stroke-rotate-${this.diameter};
              stroke-dasharray: ${this._strokeCircumference}px;
              stroke-width: ${this._circleStrokeWidth}%;
            "
            ></circle>
        </svg>
      `;
    }
  
    get stylesFile() {
      return '/src/components/circular-progress/internal.css'
    }
  });
  
  customElements.define('mdw-dialog', class extends HTMLElementExtended {
    constructor() {
      super();
      this.bound_onPanelClose = this.onPanelClose.bind(this);
    }
  
    connectedCallback() {
      if (!this.hasBckdrop) this.insertAdjacentHTML('afterbegin', '<div class="mdw-dialog-backdrop mdw-hide"></div>');
      this.hasBckdrop = true;
      this.panel.clickOutsideClose = false;
    }
  
    disconnectedCallback() {
      this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    }
  
    get panel() {
      return this.querySelector('mdw-panel');
    }
  
    get backdrop() {
      return this.querySelector('.mdw-dialog-backdrop');
    }
  
    get position() {
      return this.position_ || 'center center';
    }
  
    set position(value) {
      this.position_ = value;
    }
  
    show() {
      this.panel.open();
      this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
      this.backdrop.classList.remove('mdw-hide');
      this.classList.add('mdw-show');
      this.panel.setPosition(this.position);
      // TODO find a better way to handle positioning against body.
      this.panel.setPositionStyle(document.body);
    }
  
    close(ok) {
      this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
      this.panel.close();
      this.backdrop.classList.add('mdw-hide');
      this.dispatchClose(ok);
    }
  
    hoistToBody() {
      document.body.appendChild(this);
      this.classList.add('mdw-dialog-backdrop-hoisted');
      this.isHoisted_ = true;
    }
  
    onPanelClose() {
      this.backdrop.classList.add('mdw-hide');
      this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    }
  
    dispatchClose(isOk = false) {
      this.dispatchEvent(new CustomEvent('close', {
        detail: {
          ok: isOk
        }
      }));
    }
  });
  
  customElements.define('mdw-drawer', class extends HTMLElementExtended {
    constructor() {
      super();
      this.isShowing = true;
      this.isRightAligned = this.hasAttribute('right-aligned');
    }
  
    get isLockedOpen() {
      return this.classList.contains('mdw-locked-open');
    }
  
    lockOpen() {
      this.classList.add('mdw-locked-open');
    }
  
    unlockOpen() {
      this.classList.remove('mdw-locked-open');
    }
  
    hide() {
      this.classList.add('mdw-closed');
      if (this.isLockedOpen) {
        this.classList.remove('mdw-locked-open');
        this.wasLockedOpen = true;
      }
      this.isShowing = false;
    }
  
    show() {
      this.classList.remove('mdw-closed');
      if (this.wasLockedOpen) {
        this.classList.add('mdw-locked-open');
      }
      this.isShowing = true;
    }
  
    toggle() {
      if (!this.isShowing) this.show();
      else this.hide();
    }
  });
  
  customElements.define('mdw-expander-arrow', class extends HTMLElementExtended {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.parentNode.registerArrow(this);
    }
  
    open() {
      this.classList.add('open');
    }
  
    close() {
      this.classList.remove('open');
    }
  });
  
  customElements.define('mdw-expander-container', class extends HTMLElementExtended {
    constructor() {
      super();
    }
  
    disconnectedCallback() {
      if (this.header) this.header.removeEventListener('click', () => this.toggle);
    }
  
    registerHeader(header) {
      this.header = header;
      this.header.addEventListener('click', () => this.toggle());
    }
  
    registerContent(contentElement) {
      this.contentElement = contentElement;
    }
  
    toggle() {
      // do nothing if there is no content
      if (!this.contentElement) return;
      const open = this.classList.contains('open');
      if (open) {
        this.classList.remove('open');
        this.contentElement.close();
        this.header.close();
      } else {
        this.classList.add('open');
        this.contentElement.open();
        this.header.open();
      }
    }
  })
  
  customElements.define('mdw-expander-content', class extends HTMLElementExtended {
    constructor() {
      super();
      this.cloneTemplate();
    }
  
    connectedCallback() {
      if (this.hasAttribute('height')) this.height = this.getAttribute('height').replace('px', '');
      this.parentNode.registerContent(this);
    }
  
    static get observedAttributes() {
      return ['height'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this[name] = newValue;
    }
  
    get height() {
      return this._height || this.scrollHeight;
    }
  
    set height(value) {
      this._height = value;
    }
  
    open() {
      this.style.display= 'block';
      this.classList.add('show');
      this.style.maxHeight = `${this.height}px`;
      this.style.opacity = 1;
    }
  
    close() {
      this.classList.remove('show');
      this.style.maxHeight = 0;
      this.style.opacity = 0;
      this.onHideComplete();
    }
  
    onHideComplete() {
      const self = this;
      self.addEventListener(MDWUtils.transitionEventName, function handler() {
        self.style.display= 'none';
        self.removeEventListener(MDWUtils.transitionEventName, handler);
      });
    }
  
    css() {
      return cssStr`
        :host {
          display: block;
          overflow: hidden;
          opacity: 0;
          max-height: 0;
          transition: max-height 0.12s cubic-bezier(0.25, 0.8, 0.25, 1),
                      opacity 0.12s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
  
        :host(.show) {
          display: block;
        }
      `;
    }
  
    template() {
      return html`
        <slot></slot>
      `;
    }
  });
  
  customElements.define('mdw-expander-header', class extends HTMLElementExtended {
    constructor() {
      super();
      this.cloneTemplate();
    }
  
    connectedCallback() {
      this.parentNode.registerHeader(this);
    }
  
    registerArrow(arrow) {
      this.arrow = arrow;
    }
  
    open() {
      if (this.arrow) this.arrow.open();
    }
  
    close() {
      if (this.arrow) this.arrow.close();
    }
  
    htmtemplatel() {
      return html`
        <slot></slot>
      `;
    }
  });
  
  customElements.define('mdw-fab', class extends HTMLElementExtended {
    constructor() {
      super();
      this.bound_asyncClick = this.asyncClick.bind(this);
      this.cloneTemplate();
      this.setupAsync();
    }
  
    connectedCallback() {
      this.ripple = new MDWRipple({
        element: this.shadowRoot.querySelector('.mdw-ripple'),
        triggerElement: this
      });
    }
  
    disconnectedCallback() {
      this.ripple.destroy();
      this.removeEventListener('click', this.bound_asyncClick);
  
    }
  
    template() {
      return html`
        <span class="text"><slot></slot></span>
        <span class="mdw-spinner-container"></span>
        <div class="mdw-ripple mdw-fab-ripple"></div>
      `;
    }
  
    get dense() {
      return this.hasAttribute('mdw-dense');
    }
  
    get spinnerContainer() {
      if (!this._spinnerContainer) this._spinnerContainer = this.shadowRoot.querySelector('.mdw-spinner-container');
      return this._spinnerContainer;
    }
  
    set disabled(value) {
      if (!!value || value === '') this.setAttribute('disabled', 'disabled');
      else this.removeAttribute('disabled');
    }
  
    get pending() {
      return this.pending_;
    }
  
    setupAsync() {
      if (!this.hasAttribute('mdw-async')) return;
      this.addEventListener('click', this.bound_asyncClick);
    }
  
    resolve() {
      if (this.pending_ === false) return;
      this.pending_ = false;
      this.hideSpinner();
    }
  
    asyncClick(e) {
      if (this.pending_ === true) return;
      this.pending_ = true;
      this.showSpinner();
    }
  
    get spinnerStyle() {
      if (this.dense) return 'position: absolute; left: calc(50% - 16px); top: 4px;';
      return 'position: absolute; left: calc(50% - 16px); top: 12px;';
    }
  
    showSpinner() {
      this._showSpinner = true;
      this.classList.add('mdw-show-spinner');
      const isWhite = this.classList.contains('mdw-primary') || this.classList.contains('mdw-secondary') || this.classList.contains('mdw-error');
      this.spinnerContainer.innerHTML = `<mdw-circular-progress mode="indeterminate" class="${isWhite ? 'white' : 'grey'}" diameter="32" style="${this.spinnerStyle}"></mdw-circular-progress>`;
    }
  
    hideSpinner() {
      this._showSpinner = false;
      this.classList.remove('mdw-show-spinner');
      this.spinnerContainer.innerHTML = '';
    }
  
    get stylesFile() {
      return 'src/components/fab/internal.css'
    }
  });
  
  customElements.define('mdw-linear-progress', class extends HTMLElementExtended {
    constructor() {
      super();
      this.cloneTemplate();
    }
  
    connectedCallback() {
      if (this.percent === null) this.classList.add('mdw-query')
    }
  
    static get observedAttributes() {
      return ['mdw-percent'];
    }
  
    attributeChangedCallback(name, _oldValue, newValue) {
      switch(name) {
        case 'mdw-percent':
          this.percent = newValue;
          break;
      }
    }
  
    get bar() {
      if (!this._bar) this._bar = this.shadowRoot.querySelector('.mdw-bar');
      return this._bar;
    }
  
    get percent() {
      return this.getAttribute('mdw-percent');
    }
  
    set percent(value) {
      if (value < 0) value = 0;
      if (value > 100) value = 100;
      this.bar.style.width = `${value}%`;
    }
  
    template() {
      return html`
        <div class="mdw-bar"></div>
      `;
    }
  
    get stylesFile() {
      return '/src/components/linear-progress/internal.css'
    }
  });
  
  customElements.define('mdw-list-item', class extends HTMLElementExtended {
    constructor() {
      super();
      this.bound_hrefClick = this.hrefClick.bind(this);
      this.bound_onSelect = this.onSelect.bind(this);
      this.bound_onclickSelect = this.onclickSelect.bind(this);
      this.bound_checkHREFActive = this.checkHREFActive.bind(this);
    }
  
    get list() {
      return this.parentNode;
    }
  
    isSelect() {
      return !!this.list.selectType;
    }
  
    selectOnclick() {
      return !!this.list.selectOnclick;
    }
  
    connectedCallback() {
      this.connectRipple();
      this.connectHREF();
      this.connectSelect();
    }
  
    disconnectedCallback() {
      if (this.ripple) this.ripple.destroy();
      this.removeEventListener('click', this.bound_hrefClick);
      if (this.selectEl_) this.selectEl_.removeEventListener('change', this.bound_onSelect);
      this.removeEventListener('click', this.bound_onclickSelect);
      window.removeEventListener('hashchange', this.bound_checkHREFActive);
    }
  
    connectRipple() {
      const element = this.querySelector('.mdw-ripple');
      if (!element) return;
      this.ripple = new MDWRipple({
        element,
        triggerElement: this
      });
      this.classList.add('mdw-has-ripple');
    }
  
    connectHREF() {
      if (!this.hasAttribute('href')) return;
      this.checkHREFActive();
      window.addEventListener('hashchange', this.bound_checkHREFActive);
      this.addEventListener('click', this.bound_hrefClick);
    }
  
    checkHREFActive() {
      if (!this.hasAttribute('href')) return;
      const href = document.location.href;
      const hash = document.location.hash;
      if (href === this.getAttribute('href') || href === this.getAttribute('href-alt')) this.setAttribute('active', 'active');
      else if (hash === this.getAttribute('href') || hash === this.getAttribute('href-alt')) this.setAttribute('active', 'active');
      else this.removeAttribute('active');
    }
  
    hrefClick() {
      document.location.href = this.getAttribute('href');
    }
  
    onSelect(e) {
      if (e.target.checked) this.list.itemSelected(this);
      else this.list.itemDeselected(this);
    }
  
    onclickSelect(e) {
      if (!this.selectOnclick()) return;
      if (e.target === this.selectEl_) return;
      this.selectEl_.checked = !this.selectEl_.checked;
    }
  
    connectSelect() {
      if (this.isSelect()) {
        this.selectEl_ = this.querySelector('mdw-checkbox');
        if (this.selectEl_) this.selectEl_.addEventListener('change', this.bound_onSelect);
        if (this.selectOnclick()) this.addEventListener('click', this.bound_onclickSelect);
      }
    }
  
    deselect() {
      this.selectEl_.checked = false;
    }
  });
  
  customElements.define('mdw-list', class extends HTMLElementExtended {
    constructor() {
      super();
      this.selectedIndexes_ = [];
    }
  
    static get observedAttributes() {
      return ['mdw-select', 'mdw-select-onclick'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      switch(name) {
        case 'mdw-select':
          this.selectType = newValue;
          break;
        case 'mdw-select-onclick':
          this.selectOnclick = newValue !== null;
          break;
      }
    }
  
    set selectOnclick(value) {
      this.selectOnclick_ = value;
    }
  
    get selectOnclick() {
      return this.selectOnclick_;
    }
  
    set selectType(value) {
      this.selectType_ = value;
    }
  
    get selectType() {
      return this.selectType_;
    }
  
    get selected() {
      return [].concat(this.selectedIndexes_);
    }
  
    deselectAll() {
      [...this.children].forEach(child => child.deselect());
      this.selectedIndexes_ = [];
    }
  
    itemSelected(listItem) {
      const index = Array.prototype.indexOf.call(this.children, listItem);
      if (this.selectType_ === 'single') {
        const children = [...this.children];
        this.selectedIndexes_.forEach(i => children[i].deselect());
        this.selectedIndexes_ = [];
      }
      this.selectedIndexes_.push(index);
      this.handleChange();
    }
  
    itemDeselected(listItem) {
      const index = Array.prototype.indexOf.call(this.children, listItem);
      this.selectedIndexes_.splice(this.selectedIndexes_.indexOf(index), 1);
      this.handleChange();
    }
  
    handleChange() {
      this.dispatchEvent(new CustomEvent('change', this));
    }
  });
  
  customElements.define('mdw-menu', class extends HTMLElementExtended {
    constructor() {
      super();
      this.bound_onClick = this.onClick.bind(this);
      this.bound_onPanelClick = this.onPanelClick.bind(this);
    }
  
    connectedCallback() {
      this.classList.add('mdw-panel--container');
      this.button.addEventListener('click', this.bound_onClick);
      this.panel.classList.add('mdw-menu');
    }
  
    onClick() {
      this.panel.autoPosition();
      this.panel.setPosition(this.panelPosition);
      this.panel.open(true);
      this.panel.addEventListener('click', this.bound_onPanelClick);
    }
  
    onPanelClick() {
      this.panel.close();
    }
  
    set panelPosition(value) {
      // TODO validate
      this.panelPosition_ = value;
    }
  
    get panelPosition() {
      return this.panelPosition_ || 'inner-top inner-left';
    }
  
    get button() {
      if (!this.button_) this.button_ = this.children[0];
      return this.button_;
    }
  
    get panel() {
      return this.querySelector('mdw-panel');
    }
  });
  
  /* --- mdw-panel ---
   * The panel allows you to create positions floating elements.
   * mdw-panel is used for menu, dialog, tooltip
   */
  
   // TODO fix open and close animations
  customElements.define('mdw-panel', class extends HTMLElementExtended {
    constructor() {
      super();
      this.FOCUSABLE_ELEMENTS = [
        'button:not(:disabled)', '[href]:not([aria-disabled="true"])', 'input:not(:disabled)',
        'select:not(:disabled)', 'textarea:not(:disabled)', '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
      ].join(', ');
      this.clickOutsideClose_ = false;
      this.boundHandleBodyClick_ = this.handleBodyClick_.bind(this);
      this.boundHandleKeydown_ = this.handleKeydown_.bind(this);
      this._clickOutsideCloseIgnorElement = [];
      this._autoPosition = false;
    }
  
    connectedCallback() {
      this.classList.add('mdw-upgraded');
      this.transformPropertyName = MDWUtils.transformPropertyName;
    }
  
    disconnectedCallback() {
      this.removeBodyClickEvent_();
      this.removeKeydownEvent_();
      clearTimeout(this.openAnimationEndTimerId_);
      clearTimeout(this.closeAnimationEndTimerId_);
      cancelAnimationFrame(this.animationRequestId_);
    }
  
    static get observedAttributes() {
      return ['mdw-position'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      switch(name) {
        case 'mdw-position':
          this.position_ = newValue;
          break;
      }
    }
  
    set clickOutsideClose(value) {
      this.clickOutsideClose_ = value;
    }
  
    set setQuickOpen(value) {
      this.isQuickOpen_ = value;
    }
  
    get position() {
      return this.position_;
    }
  
    setPosition(value) {
      const split = value.split(' ');
      this.position_ = `${split[0] || 'top'} ${split[1] || 'left'}`;
      this.setAttribute('mdw-position', this.position_);
    }
  
    autoPosition() {
      this._autoPosition = true;
    }
  
    isOpen() {
      return this.isOpen_;
    }
  
    open(clickBodyToClose) {
      if (clickBodyToClose !== undefined) this.clickOutsideClose_ = clickBodyToClose
      // handle focused element
      const focusableElements = this.querySelectorAll(this.FOCUSABLE_ELEMENTS);
      this.firstFocusableElement_ = focusableElements[0];
      this.lastFocusableElement_ = focusableElements[focusableElements.length - 1];
      this.saveFocus();
  
      // handle animation
      if (!this.isQuickOpen_) {
        this.classList.add('mdw-panel--animating-open');
        this.animationRequestId_ = this._runNextAnimationFrame(() => {
          this.classList.add('mdw-open');
          if (this.isQuickOpen_) this.notifyOpen();
          else {
            this.openAnimationEndTimerId_ = setTimeout(() => {
              this.openAnimationEndTimerId_ = 0;
              this.classList.remove('mdw-panel--animating-open');
              if (this.isHoisted_) this.setHoisetedPosition();
              else this.setPositionStyle();
              this.notifyOpen();
            }, 150);
          }
          if (this.isHoisted_) this.setHoisetedPosition();
          else this.setPositionStyle();
        });
      } else {
        this.classList.add('mdw-open');
      }
  
      this.addBodyClickEvent_();
      this.addKeydownEvent_();
      this.isOpen_ = true;
    }
  
    // TODO FIX THE CLOSING ANIMATION
    close() {
      if (!this.isQuickOpen_) {
        this.classList.add('mdw-panel--animating-closed');
        this.removeBodyClickEvent_();
        this.animationRequestId_ = this._runNextAnimationFrame(() => {
          this.classList.remove('mdw-open');
          if (this.isQuickOpen_) this.notifyClose();
          else {
            this.closeAnimationEndTimerId_ = setTimeout(() => {
              this.closeAnimationEndTimerId_ = 0;
              this.classList.remove('mdw-panel--animating-closed');
              this.notifyClose();
            }, 75);
          }
        });
      } else {
        this.classList.remove('mdw-open');
      }
  
      this.removeKeydownEvent_();
      this.isOpen_ = false;
      const isRootFocused = this.isFocused();
      const childHasFocus = document.activeElement && this.contains(document.activeElement);
      if (isRootFocused || childHasFocus) this.restoreFocus();
    }
  
    _runNextAnimationFrame(callback) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = requestAnimationFrame(() => {
        this._animationFrame = 0;
        clearTimeout(this._animationTimer);
        this._animationTimer = setTimeout(callback, 0);
      });
    }
  
    isFocused() {
      return document.activeElement === this;
    }
  
    saveFocus() {
      this.previousFocus_ = document.activeElement;
    }
  
    restoreFocus() {
      if (this.contains(document.activeElement) && this.previousFocus_ && this.previousFocus_.focus) this.previousFocus_.focus();
    }
  
    focusFirstElement() {
      if (this.firstFocusableElement_ && this.firstFocusableElement_.focus) this.firstFocusableElement_.focus()
    }
  
    focusLastElement() {
      if (this.lastFocusableElement_ && this.lastFocusableElement_.focus) this.lastFocusableElement_.focus()
    }
  
    isFirstElementFocused() {
      this.firstFocusableElement_ ? this.firstFocusableElement_ === document.activeElement : false;
    }
  
    isLastElementFocused() {
      this.lastFocusableElement_ ? this.lastFocusableElement_ === document.activeElement : false;
    }
  
    addBodyClickEvent_() {
      if (!this.clickOutsideClose_) return;
      setTimeout(() => {
        this.hasBodyEvent = true;
        document.body.addEventListener('click', this.boundHandleBodyClick_);
      }, 0);
    }
  
    removeBodyClickEvent_() {
      if (this.hasBodyEvent) document.body.removeEventListener('click', this.boundHandleBodyClick_);
      this.hasBodyEvent = false;
    }
  
    addKeydownEvent_() {
      this.hasKeydownEvent = true;
      document.body.addEventListener('keydown', this.boundHandleKeydown_);
    }
  
    removeKeydownEvent_() {
      if (this.hasKeydownEvent) document.body.removeEventListener('keydown', this.boundHandleKeydown_);
      this.hasKeydownEvent = false;
    }
  
    ignoreElementOnClickToClose(el) {
      this._clickOutsideCloseIgnorElement.push(el);
    }
  
    handleBodyClick_(event) {
      const el = event.target;
      if (this._clickOutsideCloseIgnorElement.includes(el)) return;
      if (this.contains(el)) return;
      this.removeBodyClickEvent_();
      this.close();
    }
  
    handleKeydown_(event) {
      const { key, keyCode, shiftKey } = event;
      const isEscape = key === 'Escape' || keyCode === 27;
      const isTab = key === 'Tab' || keyCode === 9;
  
      if (isEscape) this.close();
      else if (isTab) {
        if (this.isLastElementFocused() && !shiftKey) {
          this.focusFirstElement();
          event.preventDefault();
        } else if (this.isFirstElementFocused() && shiftKey) {
          this.focusLastElement();
          event.preventDefault();
        }
      }
    }
  
    notifyClose() {
      this.dispatchEvent(new Event('MDWPanel:closed', this));
    }
  
    notifyOpen() {
      this.dispatchEvent(new Event('MDWPanel:open'), this);
    }
  
    hoistToBody(target) {
      this.container_ = target || this.parentNode;
      document.body.appendChild(this);
      this.classList.add('mdw-panel-hoisted');
      this.isHoisted_ = true;
    }
  
    setHoisetedPosition() {
      const bounds = this.container_.getBoundingClientRect();
      this.style.top = `${bounds.top}px`;
      this.style.left = `${bounds.left}px`;
    }
  
  
    setPositionStyle(parentOverride) {
      if (parentOverride) this._parentOverride = parentOverride;
      else if (this._parentOverride) parentOverride = this._parentOverride;
  
      const position = this.position;
      let parentWidth = 0;
      let parentHeight = 0;
      if (parentOverride) {
        parentWidth = parentOverride.offsetWidth;
        parentHeight = parentOverride.offsetHeight;
      } else {
        let parent = this.parentNode;
        if (parent.nodeName === 'MDW-SNACKBAR') parent = parent.parentNode;
        const parentRect = parent.getBoundingClientRect();
        parentWidth = parentRect.width;
        parentHeight = parentRect.height;
      }
  
      // use offset with and height to avoid problems due to transform: scale()
      // using getBoundingClientRect will return the adjusted width based on the scale factor
      const width = this.offsetWidth;
      const height = this.offsetHeight;
      const aValue = position.split(' ')[0];
      const bValue = position.split(' ')[1];
      let top = 0;
      let left = 0;
  
      switch(aValue) {
        case 'top':
          top = -height;
          break;
        case 'bottom':
          top = parentHeight;
          break;
        case 'center':
          top = (parentHeight / 2) - (height / 2);
          break;
        case 'inner-bottom':
          top = parentHeight - height;
          break;
      }
  
      switch(bValue) {
        case 'left':
          left = -width;
          break;
        case 'right':
          left = parentWidth;
          break;
        case 'inner-right':
          left = parentWidth - width;
          break;
        case 'center':
          left = (parentWidth / 2) - (width / 2);
          break;
      }
  
      if (this._autoPosition) {
        const { clientWidth, clientHeight } = document.body;
        const { x: globalX, y: globalY } = this.getBoundingClientRect();
        if ((globalY + height) > clientHeight) top = parentHeight - height;
        if ((globalX + width) > clientWidth) left = parentWidth - width;
      }
  
      this.style.top = `${parseInt(top)}px`;
      this.style.left = `${parseInt(left)}px`;
      this.style.transform = 'scale(1)';
    }
  });
  
  customElements.define('mdw-radio-group', class extends HTMLElementExtended {
    constructor() {
      super();
      this.bound_change = this.change.bind(this);
    }
  
    connectedCallback() {
      console.log()
      // this.radios.forEach(r => r.input.addEventListener('change', this.bound_change));
    }
  
    disoconnectedCallback() {
      // this.radios.forEach(r => r.input.removeEventListener('change', this.bound_change));
    }
  
    change(e) {
      console.log(e);
    }
  
    get radios() {
      return [...this.querySelectorAll('mdw-radio')];
    }
  });
  
  customElements.define('mdw-radio', class extends HTMLElementExtended {
    constructor() {
      super();
      // input radio will not work correctly in shadowroot
      this.insertAdjacentHTML('afterbegin', this.template());
    }
  
    connectedCallback() {
      this.ripple = new MDWRipple({
        element: this.querySelector('.mdw-ripple'),
        triggerElement: [this.input],
        radius: 20,
        centered: true
      });
    }
  
    disconnectedCallback() {
      this.ripple.destroy();
    }
  
    get input() {
      return this.querySelector('input');
    }
  
    get name() {
      if (this.parentNode && this.parentNode.hasAttribute('name')) {
        this.name_ = this.parentNode.getAttribute('name');
      } else if (this.hasAttribute('name')) {
        this.name_ = this.getAttribute('name');
      }
      return this.name_ || '';
    }
  
    template() {
      return html`
        <input type="radio" name="${this.name}">
        <div class="mdw-radio-background">
          <div class="mdw-radio__outer-circle"></div>
          <div class="mdw-radio__inner-circle"></div>
        </div>
        <div class="mdw-ripple mdw-radio-ripple"></div>
      `;
    }
  });
  
  customElements.define('mdw-select', class extends HTMLElementExtended {
    constructor() {
      super();
      this.classList.add('mdw-no-animation');
      this.enhanced = this.getAttribute('mdw-enhanced') !== null;
      // this.setOutlined();
      this.cloneTemplate(true);
      this.bound_onFocus = this.onFocus.bind(this);
      this.bound_onBlur = this.onBlur.bind(this);
      this.bound_onChange = this.onChange.bind(this);
      this.bound_onClick = this.onClick.bind(this);
      this.bound_onPanelClick = this.onPanelClick.bind(this);
      this.bound_onKeyDown = this.onKeyDown.bind(this);
    }
  
    connectedCallback() {
      this.setSelected();
      this.querySlotted('label').classList.add('mdw-empty-no-float');
      this.valid = this.selectElement.validity.valid;
      if (this.enhanced) this.setupEnhanced_();
      else {
        this.selectElement.addEventListener('focus', this.bound_onFocus);
        this.selectElement.addEventListener('blur', this.bound_onBlur);
        this.selectElement.addEventListener('change', this.bound_onChange);
      }
  
      // capture option selected attribute and float the label
      this.onChange();
  
      setTimeout(() => {
        this.classList.add('mdw-no-animation');
      }, 0);
    }
  
    disconnectedCallback() {
      document.body.removeEventListener('keydown', this.bound_onKeyDown);
      this.selectElement.removeEventListener('focus', this.bound_onFocus);
      this.selectElement.removeEventListener('blur', this.bound_onBlur);
      this.selectElement.removeEventListener('change', this.bound_onChange);
      this.selectElement.removeEventListener('click', this.bound_onClick);
      // Make sure panel does not linger
    }
  
    setupEnhanced_() {
      // lift on change event
      const selectOnchange = this.selectElement.getAttribute('onchange');
      if (selectOnchange) this.setAttribute('onchange', selectOnchange);
  
      // grab selected
      const selected = this.selectElement.querySelector('[selected]');
  
      const enhancedEl = document.createElement('div');
      enhancedEl.classList.add('mdw-select__selected-text');
      enhancedEl.style.width = `${this.selectElement.offsetWidth}px`;
      this.insertAdjacentHTML('beforeend', this.panelHTML);
      this.panel.innerHTML = `<div class="options-list">${this.selectElement.innerHTML}</div>`;
      this.panel.style.minWidth = `${this.selectElement.offsetWidth}px`;
      this.panel.style.transform = 'scale(1)';
      this.panel.hoistToBody(this);
      this.selectElement.parentNode.replaceChild(enhancedEl, this.selectElement);
      this._selectElement = enhancedEl;
      this.selectElement.addEventListener('click', this.bound_onClick);
      document.body.addEventListener('keydown', this.bound_onKeyDown);
  
      // set selected
      if (selected) {
        this.value_ = selected.value;
        this.setSelectedText(selected.innerText);
      }
    }
  
    get panel() {
      if (!this.panel_) this.panel_ = this.querySelector('mdw-panel');
      return this.panel_;
    }
  
    onClick(event) {
      this._focusIndex === undefined;
      this.onFocus();
      this.panel.open(true);
      this.panel.addEventListener('MDWPanel:closed', this.bound_onBlur);
      this.panel.addEventListener('click', this.bound_onPanelClick);
    }
  
    onPanelClick(event) {
      if (event.target.nodeName !== 'OPTION') return;
      this.value = event.target.value;
      this.setSelectedText(event.target.innerText);
      const currentSelected = this.panel.querySelector('.mdw-selected');
      if (currentSelected) currentSelected.classList.remove('mdw-selected');
      event.target.classList.add('mdw-selected');
      this.panel.close();
    }
  
    onChange() {
      if (this.value && this.label) {
        this.label.classList.add('mdw-select--float-above');
        this.querySlotted('label').classList.remove('mdw-empty-no-float');
        if (this.outlined) this.notch.style.width = this.labelWidth + 'px';
      } else {
        this.label.classList.remove('mdw-select--float-above');
        this.querySlotted('label').classList.add('mdw-empty-no-float');
        if (this.outlined) this.notch.style.width = '0';
      }
    }
  
    onFocus() {
      this.classList.add('mdw-focused');
      if (this.outlined) this.notch.style.width = this.labelWidth + 'px';
    }
  
    onBlur() {
      this.classList.remove('mdw-focused');
      this.classList.toggle('mdw-not-empty', (this.selectElement.value || this.value_) && !!(this.selectElement.value || this.value_).length);
      this.valid = this.selectElement.validity && this.selectElement.validity.valid;
      this.classList.toggle('mdw-invalid', !this.valid);
      if (this.panel) {
        this.panel.removeEventListener('MDWPanel:closed', this.bound_onBlur);
        this.panel.removeEventListener('click', this.bound_onPanelClick);
      }
    }
  
    onInput() {
      if (this.valid !== this.selectElement.validity.valid) {
        this.valid = this.selectElement.validity.valid;
        this.classList.toggle('mdw-invalid', !this.valid);
      }
    }
  
    setSelectedText(value) {
      this.selectElement.innerText = value;
    }
  
    set value(value) {
      this.value_ = value;
      this.onChange();
  
      // const event = document.createEvent('Event');
      // event.initEvent('onchange', true, true);
      this.dispatchEvent(new Event('change'));
    }
  
    get value() {
      return this.selectElement.value || this.value_;
    }
  
    get selectElement() {
      if (!this._selectElement) this._selectElement = this.querySlotted('select');
      return this._selectElement;
    }
  
    get notch() {
      if (!this._notch) this._notch = this.shadowRoot.querySelector('.mdw-outlined-notch');
      return this._notch;
    }
  
    get label() {
      if (!this._label) this._label = this.querySlotted('label');
      return this._label;
    }
  
    get labelWidth() {
      return this.label.offsetWidth * 0.9;
    }
  
    get outlined() {
      return [].slice.apply(this.classList || []).includes('mdw-outlined');
    }
  
    onKeyDown(e) {
      if (!this.panel.isOpen()) return
  
      switch (e.keyCode) {
        case 40: //down
        case 39: //right
          this.focusNext();
          break;
  
        case 38: //up
        case 37: //left
          this.focusPrevious();
          break;
  
        case 13: //enter
          this.selectFocused();
          break;
  
        default:
          if (e.keyCode >= 31 || e.keyCode <= 90) {
            const nodeIndex = this.keyboardSearchNodes(e.keyCode);
            if (nodeIndex !== undefined) this.selectNode(nodeIndex);
            e.stopPropagation();
            e.preventDefault();
          }
      }
    }
  
    keyboardSearchNodes(keyCode) {
      if (this._clearSearchTimeout !== undefined) clearTimeout(this._clearSearchTimeout);
      this._clearSearchTimeout = setTimeout(() => {
        this._clearSearchTimeout = undefined;
        this._keyboardSearchStr = '';
        this._keyboardOptionNames = undefined;
      }, 300);
      if (this._keyboardSearchStr === undefined) this._keyboardSearchStr = '';
      this._keyboardSearchStr += String.fromCharCode(keyCode);
      const search = new RegExp('^' + this._keyboardSearchStr, 'i');
  
      if (!this._keyboardOptionNames) this._keyboardOptionNames = [...this.panel.firstChild.children].map(el => el.innerText);
  
      const length = this._keyboardOptionNames.length;
      let i = 0;
      while (i < length) {
        if (search.test(this._keyboardOptionNames[i])) {
          return i;
        }
        i += 1;
      }
    }
  
    selectNode(index) {
      const optionElements = [...this.panel.firstChild.children];
      this._focusIndex = index;
      if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
      this._focusedOption = optionElements[this._focusIndex];
      this._focusedOption.classList.add('mdw-focused');
    }
  
    focusNext() {
      if (!this.panel.isOpen()) return;
      const optionElements = [...this.panel.firstChild.children];
      if (this._focusIndex === undefined) this._focusIndex = 0;
      else this._focusIndex += 1;
      if (this._focusIndex > optionElements.length - 1) this._focusIndex = optionElements.length - 1;
      if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
      this._focusedOption = optionElements[this._focusIndex];
      this._focusedOption.classList.add('mdw-focused');
    }
  
    focusPrevious() {
      if (!this.panel.isOpen()) return;
      const optionElements = [...this.panel.firstChild.children];
      if (this._focusIndex === undefined) this._focusIndex = 0;
      else this._focusIndex -= 1;
      if (this._focusIndex <= 0) this._focusIndex = 0;
      if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
      this._focusedOption = optionElements[this._focusIndex];
      this._focusedOption.classList.add('mdw-focused');
    }
  
    selectFocused() {
      if (!this.panel.isOpen()) return;
      const optionElements = [...this.panel.firstChild.children];
      if (this._focusIndex == undefined || this._focusIndex > optionElements.length - 1) this._focusIndex = 0;
      this.onPanelClick({ target: optionElements[this._focusIndex] });
    }
  
    setSelected() {
      if (this.hasAttribute('mdw-value')) {
        const value = this.getAttribute('mdw-value');
        const option = [...this.querySelectorAll('option')].map(el => ({
          el,
          value: el.value
        })).find(e => e.value === value);
        if (option) option.el.setAttribute('selected', 'selected');
      }
    }
  
    template() {
      return `
        <i class="mdw-select__icon"></i>
        <slot></slot>
        ${this.outlined ? '' : '<div class="mdw-line-ripple"></div>'}
        ${!this.outlined ? '' : `
          <div class="mdw-outlined-border-container">
            <div class="mdw-outlined-leading"></div>
            <div class="mdw-outlined-notch"></div>
            <div class="mdw-outlined-trailing"></div>
          </div>
        `}
      `;
    }
  
    get panelHTML() {
      return '<mdw-panel mdw-position="bottom inner-left"></mdw-panel>';
    }
  
    get stylesFile() {
      return '/src/components/select/internal.css';
    }
  
    querySlotted(selector) {
      return this.shadowRoot.querySelector('slot').assignedNodes().find(el => el.matches && el.matches(selector));
    }
  });
  
  customElements.define('mdw-slider', class extends HTMLElementExtended {
    constructor() {
      super();
      this.cloneTemplate();
      this.bound_onMouseDown = this.onMouseDown.bind(this);
      this.bound_onMouseUp = this.onMouseUp.bind(this);
      this.bound_onMouseMove = this.onMouseMove.bind(this);
      this.bound_onMouseEnter = this.onMouseEnter.bind(this);
      this.bound_onMouseLeave = this.onMouseLeave.bind(this);
      this.bound_trackClick = this.trackClick.bind(this);
    }
  
    connectedCallback() {
      this.value = this.attrValue;
      this.thumbContainer.style.left = `${((this.attrValue - this.min) / this.range) * this.offsetWidth}px`;
      this.notchContainer.style.marginLeft = `-${this.offsetWidth - (((this.attrValue - this.min) / this.range) * this.offsetWidth)}px`;
      this.throttled_dispatchChange = MDWUtils.rafThrottle(this.dispatchChange);
      this.thumb.addEventListener('mousedown', this.bound_onMouseDown);
      this.thumb.addEventListener('mouseenter', this.bound_onMouseEnter);
      this.track.addEventListener('click', this.bound_trackClick);
    }
  
    disconnectedCallback() {
      this.thumb.removeEventListener('mousedown', this.bound_onMouseDown);
      this.thumb.removeEventListener('mouseenter', this.bound_onMouseEnter);
      this.thumb.removeEventListener('mouseleave', this.bound_onMouseLeave);
      this.track.removeEventListener('click', this.bound_trackClick);
      document.removeEventListener('mouseup', this.bound_onMouseUp);
      document.removeEventListener('mousemove', this.bound_onMouseMove);
    }
  
    static get observedAttributes() {
      return ['value', 'min', 'max', 'step'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this[name] = newValue;
      if (['min', 'max', 'step'].includes(name)) this.render();
    }
  
    get min() {
      return this.min_ || 0;
    }
  
    set min(value) {
      this.min_ = parseFloat(value);
    }
  
    get max() {
      return this.max_ || 100;
    }
  
    set max(value) {
      this.max_ = parseFloat(value);
    }
  
    get range() {
      return this.max - this.min;
    }
  
    get step() {
      return this.step_;
    }
  
    set step(value) {
      this.step_ = parseFloat(value);
    }
  
    get stepCount() {
      return !this.step ? 0 : Math.floor(this.range / this.step);
    }
  
    get attrValue() {
      let value = parseFloat(this.getAttribute('value') || 0);
      if (value < this.min) value = this.min;
      return value;
    }
  
    get value() {
      const { width } = this.getBoundingClientRect();
      const x = (this.thumbContainer.style.left || '0px').replace('px', '');
      const percent = x / width;
      const range = this.range;
      this.value_ = this.min + (percent * range);
      // check if the step is a integer and then garentee the value is an int
      // becuase of how math works in javascript(floating point) this is not a garentee without parseInt
      if (!(''+this.step).includes('.')) this.value_ = parseInt(this.value_);
      return this.value_ || 0;
    }
  
    set value(value) {
      this.value_ = parseFloat(value);
    }
  
    get thumb() {
      return this.shadowRoot.querySelector('.mdw-slider__thumb-hover');
    }
  
    get thumbContainer() {
      if (!this.thumbContainer_) this.thumbContainer_ = this.shadowRoot.querySelector('.mdw-slider__thumb-container');
      return this.thumbContainer_;
    }
  
    get notchContainer() {
      if (!this.notchContainer_) this.notchContainer_ = this.shadowRoot.querySelector('.mdw-slider__notch-container');
      return this.notchContainer_;
    }
  
    get track() {
      return this.shadowRoot.querySelector('.mdw-slider__track-container');
    }
  
    trackClick(e) {
      const { left, width } = this.getBoundingClientRect();
      let x = e.layerX;
      if (e.clientX < left) x = 0;
      if (x > width) x = width;
      this.thumbContainer.style.left = `${this.snap(x, width)}px`;
      this.notchContainer.style.marginLeft = `-${this.offsetWidth - this.snap(x, width)}px`;
      this.dispatchChange();
    }
  
    onMouseDown(e) {
      this.classList.add('mdw-pressed');
      document.addEventListener('mouseup', this.bound_onMouseUp);
      document.addEventListener('mousemove', this.bound_onMouseMove);
    }
  
    onMouseUp(e) {
      this.classList.remove('mdw-pressed');
      document.removeEventListener('mouseup', this.bound_onMouseUp);
      document.removeEventListener('mousemove', this.bound_onMouseMove);
    }
  
    onMouseMove(e) {
      const { left, width } = this.getBoundingClientRect();
      let x = e.layerX;
      if (e.clientX < left) x = 0;
      if (x > width) x = width;
      this.thumbContainer.style.left = `${this.snap(x, width)}px`;
      this.notchContainer.style.marginLeft = `-${this.offsetWidth - this.snap(x, width)}px`;
      this.throttled_dispatchChange();
    }
  
    onMouseEnter(e) {
      this.classList.add('mdw-hover');
      this.thumb.addEventListener('mouseleave', this.bound_onMouseLeave);
    }
  
    onMouseLeave(e) {
      this.classList.remove('mdw-hover');
      this.thumb.removeEventListener('mouseleave', this.bound_onMouseLeave);
    }
  
    snap(x, width) {
      if (!this.step) return x;
      const percent = x / width;
      const range = this.range;
      const convertedValue = percent * range;
      const snapedValue = convertedValue - (convertedValue % this.step);
      return (snapedValue / range) * width
    }
  
    dispatchChange() {
      this.dispatchEvent(new Event('change', this));
    }
  
    get stylesFile() {
      return '/src/components/slider/internal.css'
    }
  
    template() {
      return html`
        <div class="mdw-slider__track-container">
          <div class="mdw-slider__track"></div>
  
          <div class="mdw-slider__notch-container">
            <div class="mdw-slider__notch-pre-container">
              ${[...new Array(this.stepCount)].map(i => `<div class="mdw-slider__notch"></div>`).join('\n')}
            </div>
  
            <div class="mdw-slider__notch-post-container">
              ${[...new Array(this.stepCount)].map(i => `<div class="mdw-slider__notch"></div>`).join('\n')}
            </div>
          </div>
        </div>
        <div class="mdw-slider__thumb-container">
          <div class="mdw-slider__thumb"></div>
          <div class="mdw-slider__thumb-hover"></div>
        </div>
      `;
    }
  });
  
  customElements.define('mdw-snackbar', class extends HTMLElementExtended {
    constructor() {
      super();
      this.bound_onPanelClose = this.onPanelClose.bind(this);
    }
  
    connectedCallback() {
      this.hasBckdrop = true;
      this.panel.clickOutsideClose = false;
    }
  
    disconnectedCallback() {
      this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    }
  
    get panel() {
      return this.querySelector('mdw-panel');
    }
  
    get position() {
      return this.position_ || 'inner-bottom inner-left';
    }
  
    setPosition(value) {
      const split = value.split(' ');
      this.position_ = `${split[0] || 'top'} ${split[1] || 'left'}`;
      this.panel.setPosition(this.position);
    }
  
    show() {
      MDWSnackbar.add(this);
    }
  
    close(ok) {
      MDWSnackbar.remove(this, ok);
    }
  
    _open() {
      this.panel.setPosition(this.position);
      this.panel.open();
      this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
      this.autoCancelTimeout = setTimeout(() => {
        this.close();
      }, 3000);
    }
  
    _close(ok) {
      this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
      this.panel.close();
      this.dispatchClose(ok);
      clearTimeout(this.autoCancelTimeout);
    }
  
    onPanelClose() {
      this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    }
  
    dispatchClose(isOk = false) {
      this.dispatchEvent(new CustomEvent('close', {
        detail: {
          ok: isOk
        }
      }));
    }
  });
  
  customElements.define('mdw-switch', class extends HTMLElementExtended {
    constructor() {
      super();
      this.bound_onInputChange = this.onInputChange.bind(this);
      this.cloneTemplate();
    }
  
    connectedCallback() {
      this.input.addEventListener('change', this.bound_onInputChange);
      this.ripple = new MDWRipple({
        element: this.shadowRoot.querySelector('.mdw-ripple'),
        triggerElement: [this.input],
        radius: 20,
        centered: true
      });
    }
  
    disconnectedCallback() {
      this.input.addEventListener('click', this.bound_click);
      this.ripple.destroy();
    }
  
    static get observedAttributes() {
      return ['checked', 'disabled'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this[name] = newValue;
    }
  
    get input() {
      if (!this.input_) this.input_ = this.shadowRoot.querySelector('input');
      return this.input_;
    }
  
    get checked() {
      return this.input.checked;
    }
  
    set checked(value) {
      if (value === '') value = true;
      this.input.checked = value;
      this.updateCheckedClass();
    }
  
    set disabled(value) {
      value = !!value || value === '';
      if (value) this.input.setAttribute('disabled', 'disabled');
      else this.input.removeAttribute('disabled');
    }
  
    updateCheckedClass() {
      if (this.checked) this.classList.add('checked');
      else this.classList.remove('checked');
    }
  
    dispatchChange() {
      this.dispatchEvent(new CustomEvent('change', this));
    }
  
    onInputChange(e) {
      this.updateCheckedClass();
      this.dispatchChange();
    }
  
    get stylesFile() {
      return '/src/components/switch/internal.css'
    }
  
    template() {
      return html`
        <div class="mdw-track"></div>
        <div class="mdw-thumb-underlay">
          <div class="mdw-thumb">
            <input type="checkbox" role="switch">
            <div class="mdw-ripple mdw-switch-ripple"></div>
          </div>
        </div>
      `;
    }
  });
  
  customElements.define('mdw-tab-body', class extends HTMLElementExtended {
    constructor() {
      super();
      this.cloneTemplate();
    }
  
    connectedCallback() {
      this.parentNode.registerBody(this);
    }
  
    disconnectedCallback() {
      this.parentNode.unregisterBody(this);
    }
  
    addSlot() {
      this.shadowRoot.querySelector('mdw-tab-body-content').insertAdjacentHTML('beforeend', '<slot></slot>');
    }
  
    removeSlot() {
      this.shadowRoot.querySelector('slot').remove();
    }
  
    activate() {
      this.addSlot();
      this.classList.add('mdw-active');
    }
  
    deactivate() {
      this.removeSlot();
      this.classList.remove('mdw-active');
    }
  
    template() {
      return html`
        <mdw-tab-body-content>
          <!-- slot is added dynamicly -->
        </mdw-tab-body-content>
      `;
    }
  
    get stylesFile() {
      return 'src/components/tabs/tab-body/internal.css'
    }
  });
  
  customElements.define('mdw-tab-button', class extends HTMLElementExtended {
    constructor() {
      super();
      this.bound_click = this.click.bind(this);
      this.cloneTemplate();
    }
  
    connectedCallback() {
      this.ripple = new MDWRipple({
        element: this.shadowRoot.querySelector('.mdw-ripple'),
        triggerElement: this
      });
      this.parentNode.registerTab(this);
      this.addEventListener('click', this.bound_click);
    }
  
    disconnectedCallback() {
      this.ripple.destroy();
      this.parentNode.unregisterTab(this);
      this.removeEventListener('click', this.bound_click);
    }
  
    get indicator() {
      return this.shadowRoot.querySelector('.mdw-tab-button-indicator__content');
    }
  
    click(e) {
      this.parentNode.tabClick(this);
    }
  
    activate() {
      clearTimeout(this._animationTimer);
      this.indicator.style.transform = ``;
      this._runNextAnimationFrame(() => {
        this._animationTimer = setTimeout(() => {
          this.classList.add('mdw-active');
        }, 180);
      });
    }
  
    deactivate(moveX) {
      clearTimeout(this._animationTimer);
      this.indicator.style.transform = `translateX(${moveX.toString()}px)`;
      this._animationTimer = setTimeout(() => {
        this.classList.remove('mdw-active');
      }, 200);
    }
  
    _runNextAnimationFrame(callback) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = requestAnimationFrame(() => {
        this._animationFrame = 0;
        clearTimeout(this._animationTimer);
        this._animationTimer = setTimeout(callback, 0);
      });
    }
  
    template() {
      return html`
        <span class="text"><slot></slot></span>
        <span class="mdw-tab-button-indicator">
          <span class="mdw-tab-button-indicator__content mdw-tab-button-indicator__content--underline"></span>
        </span>
        <div class="mdw-ripple mdw-tab-button-ripple"></div>
      `;
    }
  
    get stylesFile() {
      return 'src/components/tabs/tab-button/internal.css'
    }
  });
  
  customElements.define('mdw-tabs-bar', class extends HTMLElementExtended {
    constructor() {
      super();
      this._activeTab = 0;
      this.tabIdCounter = 0;
      this._contentElements = [];
      this.cloneTemplate();
    }
  
    // called from mdw-tab
    registerTab(el) {
      el.setAttribute('tab-id', this.tabIdCounter);
      if (this.tabIdCounter === 0) {
        this.activeTab = el;
        el.activate();
      }
      this.tabIdCounter++;
    }
  
    // called from mdw-tab
    unregisterTab(el) {
      // TODO handle if it is active
    }
  
    // called from mdw-tabs-content
    registerContent(el) {
      this._contentElements.push(el);
      el.changeTab(this.activeTab.getAttribute('tab-id'));
    }
  
    // called from mdw-tabs-content
    unregisterContent(el) {
      this._contentElements = this._contentElements.filter(e => e != el);
    }
  
    // called from mdw-tab
    tabClick(el) {
      const moveX = parseInt(el.getBoundingClientRect().x - this.activeTab.getBoundingClientRect().x);
      this.activeTab.deactivate(moveX);
      this.activeTab = el;
      this.activeTab.activate();
      this._contentElements.forEach(el => el.changeTab(this.activeTab.getAttribute('tab-id')));
    }
  
    get activeTab() {
      return this._activeTab;
    }
  
    set activeTab(el) {
      this._activeTab = el;
    }
  
    get stylesFile() {
      return '/src/components/tabs/tabs-bar/internal.css'
    }
  
    template() {
      return html`
        <mdw-tabs-bar-scroller>
          <mdw-tabs-bar-scroller-area>
            <mdw-tabs-bar-scroller-content>
              <slot></slot>
            </mdw-tabs-bar-scroller-content>
          </mdw-tabs-bar-scroller-area>
        </mdw-tabs-bar-scroller>
      `;
    }
  });
  
  customElements.define('mdw-tabs-content', class extends HTMLElementExtended {
    constructor() {
      super();
      this._bodies = [];
    }
  
    connectedCallback() {
      this.tabsBar.registerContent(this);
    }
  
    disconnectedCallback() {
      this.tabsBar && this.tabsBar.unregisterContent(this);
    }
  
    get tabsBar() {
      return document.body.querySelector(`mdw-tabs-bar#${this.getAttribute('tabs-id')}`);
    }
  
    registerBody(el) {
      this._bodies.push(el);
      if (this._wiatForBodyActiveId  !== undefined && this._bodies.length === this._wiatForBodyActiveId + 1) {
        this._activeBody = el;
        el.activate();
        this._wiatForBodyActiveId = undefined;
      }
    }
  
    unregisterBody(el) {
      this._bodies = this._bodies.filter(i => i != el);
    }
  
    changeTab(tabId) {
      if (!this._bodies.length) {
        this._wiatForBodyActiveId = parseInt(tabId);
        return;
      }
      if (this._activeBody) this._activeBody.deactivate();
      this._activeBody = this._bodies[tabId];
      this._activeBody.activate();
    }
  });
  
  customElements.define('mdw-textfield', class extends HTMLElementExtended {
    constructor() {
      super();
      this.classList.add('mdw-no-animation');
      this.bound_onFocus = this.onFocus.bind(this);
      this.bound_onBlur = this.onBlur.bind(this);
      this.bound_onInput = this.onInput.bind(this);
    }
  
    connectedCallback() {
      this.compose();
      this.checkForValue();
  
      setTimeout(() => {
        this.classList.remove('mdw-no-animation');
      }, 0);
  
      // add listeners
      this.input.addEventListener('focus', this.bound_onFocus);
      this.input.addEventListener('blur', this.bound_onBlur);
      this.input.addEventListener('input', this.bound_onInput);
    }
  
    disconnectedCallback() {
      // remove listeners
      this.input.removeEventListener('focus', this.bound_onFocus);
      this.input.removeEventListener('blur', this.bound_onBlur);
      this.input.removeEventListener('input', this.bound_onInput);
    }
  
    compose() {
      /* For backwards compatability most of the features are built with css and the code is treated as an upgrade
       *  'mdw-upgraded' lets us know that the code is hooked up
       */
      this.classList.add('mdw-upgraded');
  
      /* textarea css marker
       *  test area mostly works without wc compatability. The only thing that does not work is some overlapping with the label
       */
      if (this.isTextarea()) this.classList.add('mdw-textarea');
  
      /* Add html for outlined
       *  outlined does not work without compatability
       */
      if (this.outlined) {
        this.insertAdjacentHTML('beforeend', this.outlinedHTML);
        this.setNotchWidth();
      }
  
      /* Add ripple html if it does not exist
       */
      if (!this.querySelector('.mdw-line-ripple')) this.insertAdjacentHTML('beforeend', this.lineRippleHTML);
  
      /* Fix layout for icons blaced before he input
       *  This is not handled in non compatable browsers
       */
      if (this.isTrailingIcon()) this.classList.add('mdw-trailing-icon');
    }
  
    checkForValue() {
      this.classList.toggle('not-empty', !!this.input.value.length);
    }
  
    onFocus() {
      this.setNotchWidth();
    }
  
    onBlur() {
      this.classList.toggle('not-empty', !!this.input.value.length);
      this.valid = this.input.validity.valid;
      this.classList.toggle('invalid', !this.valid);
    }
  
    onInput() {
      if (this.valid !== this.input.validity.valid) {
        this.valid = this.input.validity.valid;
        this.classList.toggle('invalid', !this.valid);
      }
    }
  
    setNotchWidth() {
      if (this.outlined) this.notch.style.width = this.labelWidth + 'px';
    }
  
    /* Icons can be places at the begining ro end of a text field
     * there is some css that is hard to apply when the icon is at the begining, this helps
     */
    isTrailingIcon() {
      if (!this.iconElement) return false;
      return [...this.children].indexOf(this.iconElement) > 1;
    }
  
    isTextarea() {
      return !!this.querySelector('textarea');
    }
  
    get outlined() {
      return [].slice.apply(this.classList || []).includes('mdw-outlined');
    }
  
    get input() {
      if (!this.inputType_) this.inputType_ = this.querySelector('input') ? 'input' : 'textarea';
      return this.querySelector(this.inputType_);
    }
  
    // this is the section where the labels sits when in outlined mode
    get notch() {
      return this.querySelector('.mdw-outlined-notch');
    }
  
    get label() {
      return this.querySelector('label');
    }
  
    // figure out a more acurate way or getting the width
    get labelWidth() {
      return this.label.offsetWidth * 0.95;
    }
  
    get helperTextElement() {
      return this.querySelector('mdw-textfield-helper');
    }
  
    get iconElement() {
      return this.querySelector('mdw-icon');
    }
  
    get outlinedHTML() {
      return `
        <div class="mdw-outlined-border-container">
          <div class="mdw-outlined-leading"></div>
          <div class="mdw-outlined-notch"></div>
          <div class="mdw-outlined-trailing"></div>
        </div>
      `;
    }
  
    get lineRippleHTML() {
      return '<div class="mdw-line-ripple"></div>';
    }
  });
  
  customElements.define('mdw-tooltip', class extends HTMLElementExtended {
    constructor() {
      super();
    }
  
    template() {
      return html`
        <div class="tooltip">
          <slot></slot>
        </div>
      `;
    }
  });
  
  customElements.define('mdw-top-app-bar', class extends HTMLElementExtended {
    constructor() {
      super();
      this.MAX_TOP_APP_BAR_HEIGHT = 128;
      this.isCurrentlyBeingResized = false;
      this.currentAppBarOffsetTop = 0;
      this.wasDocked = true;
      this.isDockedShowing = true;
      this.isCurrentlyBeingResized = false;
    }
  
    connectedCallback() {
      this.scrollTarget = this.getScrollTarget();
      this.lastScrollPosition = this.getViewportScrollY();
      this.topAppBarHeight = this.height;
  
      // add spacer to content area
      // TODO add another class based on prominent, dense
      if (this.hasContent && !this.scrollTarget.querySelector('.mdw-top-app-bar')) {
        const div = document.createElement('div');
        div.classList.add('mdw-top-app-bar');
        this.scrollTarget.prepend(div);
      }
  
      document.body.classList.add('mdw-top-app-bar');
  
      this.throttledScrollHandler = MDWUtils.rafThrottle(this.scrollHandler);
      this.throttledResizeHandler = MDWUtils.rafThrottle(this.resizeHandler);
      this.scrollTarget.addEventListener('scroll', this.throttledScrollHandler.bind(this));
      window.addEventListener('resize', this.throttledResizeHandler.bind(this));
    }
  
    disconnectedCallback() {
      this.scrollTarget.removeEventListener('scroll', this.throttledScrollHandler.bind(this));
      window.removeEventListener('resize', this.throttledResizeHandler.bind(this));
    }
  
    get fixed() {
      return this.classList.contains('mdw-fixed');
    }
  
    get height() {
      return this.clientHeight;
    }
  
    getScrollTarget() {
      if (this.parentNode.nodeName === 'MDW-PAGE') {
        const content = document.querySelector('mdw-content');
        if (content) {
          this.hasContent = true;
          return content;
        }
      }
      return window;
    }
  
    topAppBarScrollHandler() {
      const currentScrollPosition = Math.max(this.getViewportScrollY(), 0);
      const diff = currentScrollPosition - this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
  
      // If the window is being resized the lastScrollPosition_ needs to be updated but the
      // current scroll of the top app bar should stay in the same position.
      if (!this.isCurrentlyBeingResized) {
        this.currentAppBarOffsetTop -= diff;
  
        if (this.currentAppBarOffsetTop > 0) {
          this.currentAppBarOffsetTop = 0;
        } else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
          this.currentAppBarOffsetTop = -this.topAppBarHeight;
        }
  
        this.moveTopAppBar();
      }
    }
  
    moveTopAppBar() {
      if (this.checkForUpdate()) {
        // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
        // so the top app bar doesn't show if the window resizes and the new height > the old height.
        let offset = this.currentAppBarOffsetTop;
        if (Math.abs(offset) >= this.topAppBarHeight) {
          offset = -this.MAX_TOP_APP_BAR_HEIGHT;
        }
  
        this.style.top = offset + 'px';
      }
    }
  
    checkForUpdate() {
      const offscreenBoundaryTop = -this.topAppBarHeight;
      const hasAnyPixelsOffscreen = this.currentAppBarOffsetTop < 0;
      const hasAnyPixelsOnscreen = this.currentAppBarOffsetTop > offscreenBoundaryTop;
      const partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
  
      // If it's partially showing, it can't be docked.
      if (partiallyShowing) {
        this.wasDocked = false;
      } else {
        // Not previously docked and not partially showing, it's now docked.
        if (!this.wasDocked) {
          this.wasDocked = true;
          return true;
        } else if (this.isDockedShowing !== hasAnyPixelsOnscreen) {
          this.isDockedShowing = hasAnyPixelsOnscreen;
          return true;
        }
      }
  
      return partiallyShowing;
    }
  
    resizeHandler() {
      this.isCurrentlyBeingResized = true;
      const currentHeight = this.height;
      if (this.topAppBarHeight !== currentHeight) {
        this.wasDocked = false;
  
        // Since the top app bar has a different height depending on the screen width, this
        // will ensure that the top app bar remains in the correct location if
        // completely hidden and a resize makes the top app bar a different height.
        this.currentAppBarOffsetTop -= this.topAppBarHeight - currentHeight;
        this.topAppBarHeight = currentHeight;
      }
      this.topAppBarScrollHandler();
      this.isCurrentlyBeingResized = false;
    }
  
  
    scrollHandler() {
      const currentScrollPosition = Math.max(this.getViewportScrollY(), 0);
  
      if (!this.fixed) {
        const diff = currentScrollPosition - this.lastScrollPosition;
        this.lastScrollPosition = currentScrollPosition;
  
        // If the window is being resized the lastScrollPosition_ needs to be updated but the
        // current scroll of the top app bar should stay in the same position.
        if (!this.isCurrentlyBeingResized) {
          this.currentAppBarOffsetTop -= diff;
  
          if (this.currentAppBarOffsetTop > 0) {
            this.currentAppBarOffsetTop = 0;
          } else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
            this.currentAppBarOffsetTop = -this.topAppBarHeight;
          }
  
          this.moveTopAppBar();
        }
      } else {
        if (currentScrollPosition <= 0) {
          if (this.wasScrolled_) {
            this.classList.remove('mdw-scrolled');
            this.wasScrolled_ = false;
          }
        } else {
          if (!this.wasScrolled_) {
            this.classList.add('mdw-scrolled');
            this.wasScrolled_ = true;
          }
        }
      }
    }
  
    getViewportScrollY() {
      return this.scrollTarget[this.scrollTarget === window ? 'pageYOffset' : 'scrollTop'];
    }
  });
  
});