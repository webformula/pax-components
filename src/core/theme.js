export function generate() {
  const computedStyles = getComputedStyle(document.body);
  const variables = [...document.styleSheets]
    .filter(sheet => sheet.href === null || sheet.href.startsWith(window.location.origin))
    .flatMap(sheet => (
      [...sheet.cssRules].flatMap(rule => [...rule.style])
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
    // document.body.style.setProperty(`${name}--2`, `${value}05`);
    // document.body.style.setProperty(`${name}--3`, `${value}08`);
    // document.body.style.setProperty(`${name}--4`, `${value}0a`);
    document.body.style.setProperty(`${name}--6`, `${value}0f`);
    // document.body.style.setProperty(`${name}--8`, `${value}14`);
    document.body.style.setProperty(`${name}--10`, `${value}1a`);
    document.body.style.setProperty(`${name}--12`, `${value}1f`);
    document.body.style.setProperty(`${name}--16`, `${value}29`);
    // document.body.style.setProperty(`${name}--26`, `${value}42`);
    document.body.style.setProperty(`${name}--38`, `${value}61`);
    // document.body.style.setProperty(`${name}--50`, `${value}80`);
    // document.body.style.setProperty(`${name}--54`, `${value}8a`);
    // document.body.style.setProperty(`${name}--70`, `${value}b3`);
    document.body.style.setProperty(`${name}--76`, `${value}c2`);
    // document.body.style.setProperty(`${name}--80`, `${value}cc`);
    // document.body.style.setProperty(`${name}--87`, `${value}de`);
    // document.body.style.setProperty(`${name}--90`, `${value}e6`);
  });

  // convert pixels to rem. used so all fonts scale with html.style.fontSize
  const fontSizes = variables.filter(({ name }) => name.startsWith('--mdw-font-size'));
  fontSizes.forEach(({ name, value }) => {
    document.body.style.setProperty(name, `${parseInt(value.replace('px', '')) / 16}rem`);
  });
}
