module.exports = function(content) {
  return `window.${getClassName(content)} = ${content}`;
};

function getClassName(content) {
  return content.match(/class\s(\w+)/)[1];
}
