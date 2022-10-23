// NOTE to change theme add 'color-scheme: dark | light;' to html element style
//      By default it will use the systems preference

let initiated = false;

export function generate() {
  initiated = true;
  polyFillColorSchemeObserver.disconnect();
  polyfillColorSchemePreference();

  const computedStyles = getComputedStyle(document.body);
  const variables = [...document.styleSheets]
    .filter(sheet => sheet.href === null || sheet.href.startsWith(window.location.origin))
    .flatMap(sheet => (
      [...sheet.cssRules]
        .filter(rule => !!rule.style)
        .flatMap(rule => [...rule.style])
    ))
    .filter(style => style.startsWith('--'))
    .map(name => ({
      name,
      value: computedStyles.getPropertyValue(name)
    }));

  // create alpha versions of colors
  const colorRegex = /^\s?#/;
  const colors = variables.filter(({ value }) => value.match(colorRegex) !== null);
  colors.forEach(({name, value}) => {
    document.documentElement.style.setProperty(`${name}--0`, `${value}00`);
    // document.documentElement.style.setProperty(`${name}--2`, `${value}05`);
    // document.documentElement.style.setProperty(`${name}--3`, `${value}08`);
    document.documentElement.style.setProperty(`${name}--4`, `${value}0a`);
    document.documentElement.style.setProperty(`${name}--6`, `${value}0f`);
    document.documentElement.style.setProperty(`${name}--8`, `${value}14`);
    document.documentElement.style.setProperty(`${name}--10`, `${value}1a`);
    document.documentElement.style.setProperty(`${name}--12`, `${value}1f`);
    document.documentElement.style.setProperty(`${name}--16`, `${value}29`);
    // document.documentElement.style.setProperty(`${name}--26`, `${value}42`);
    document.documentElement.style.setProperty(`${name}--38`, `${value}61`);
    document.documentElement.style.setProperty(`${name}--50`, `${value}80`);
    // document.documentElement.style.setProperty(`${name}--54`, `${value}8a`);
    document.documentElement.style.setProperty(`${name}--60`, `${value}99`);
    // document.documentElement.style.setProperty(`${name}--70`, `${value}b3`);
    document.documentElement.style.setProperty(`${name}--76`, `${value}c2`);
    // document.documentElement.style.setProperty(`${name}--80`, `${value}cc`);
    // document.documentElement.style.setProperty(`${name}--87`, `${value}de`);
    // document.documentElement.style.setProperty(`${name}--90`, `${value}e6`);
  });

  // this can only run once
  if (!initiated) {
    // convert pixels to rem. used so all fonts scale with html.style.fontSize
    const fontSizes = variables.filter(({ name }) => name.startsWith('--mdw-font-size'));
    fontSizes.forEach(({ name, value }) => {
      document.documentElement.style.setProperty(name, `${parseInt(value.replace('px', '')) / 16}rem`);
    });
  }

  polyFillColorSchemeObserver.observe(document.querySelector('html'), { attributes: true, attributeFilter: ['style'] });
}

// currently prefer-color-scheme does not respect color-scheme so we are poly-filling it
// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
//   Respects color-scheme inherited from parent
const polyFillColorSchemeObserver = new MutationObserver(() => {
  generate();
});
function polyfillColorSchemePreference() {
  const themePreferenceDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const html = document.querySelector('html');
  const htmlColorScheme = getComputedStyle(html).colorScheme;
  
  if (themePreferenceDark === true && htmlColorScheme !== 'light') {
    html.classList.add('mdw-theme-dark');
  } else {
    html.classList.remove('mdw-theme-dark');
  }
}
