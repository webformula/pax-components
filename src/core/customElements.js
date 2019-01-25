const components = {};

module.exports = {
  define(name, constructor) {
    if (components[name]) throw Error(`component "${name}" has already been registered. Please change the components name`);
    components[name] = constructor;
  },

  getStaticExternalCSS() {
    return Object
      .keys(components)
      .map(key => new components[key]().externalCSS())
      .join('\n');
  },

  getStaticFile() {
    return `
      document.addEventListener("DOMContentLoaded", function (event) {
        ${Object
          .keys(components)
          .map(key => {
            const comp = new components[key]();
            return [
              comp.getTemplateElementAsIIFE(key),
              comp.getClassAsString(key)
            ].join('\n');
          })
          .join('\n')}
      });
    `;
  }
};
