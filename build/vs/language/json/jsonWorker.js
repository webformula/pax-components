(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("jsonc-parser/impl/scanner", ["require", "exports"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  function createScanner(text, ignoreTrivia) {
    if (ignoreTrivia === void 0) {
      ignoreTrivia = false;
    }
    var len = text.length;
    var pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
    function scanHexDigits(count, exact) {
      var digits = 0;
      var value2 = 0;
      while (digits < count || !exact) {
        var ch = text.charCodeAt(pos);
        if (ch >= 48 && ch <= 57) {
          value2 = value2 * 16 + ch - 48;
        } else if (ch >= 65 && ch <= 70) {
          value2 = value2 * 16 + ch - 65 + 10;
        } else if (ch >= 97 && ch <= 102) {
          value2 = value2 * 16 + ch - 97 + 10;
        } else {
          break;
        }
        pos++;
        digits++;
      }
      if (digits < count) {
        value2 = -1;
      }
      return value2;
    }
    function setPosition(newPosition) {
      pos = newPosition;
      value = "";
      tokenOffset = 0;
      token = 16;
      scanError = 0;
    }
    function scanNumber() {
      var start = pos;
      if (text.charCodeAt(pos) === 48) {
        pos++;
      } else {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      }
      if (pos < text.length && text.charCodeAt(pos) === 46) {
        pos++;
        if (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
          while (pos < text.length && isDigit(text.charCodeAt(pos))) {
            pos++;
          }
        } else {
          scanError = 3;
          return text.substring(start, pos);
        }
      }
      var end = pos;
      if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
        pos++;
        if (pos < text.length && text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45) {
          pos++;
        }
        if (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
          while (pos < text.length && isDigit(text.charCodeAt(pos))) {
            pos++;
          }
          end = pos;
        } else {
          scanError = 3;
        }
      }
      return text.substring(start, end);
    }
    function scanString() {
      var result = "", start = pos;
      while (true) {
        if (pos >= len) {
          result += text.substring(start, pos);
          scanError = 2;
          break;
        }
        var ch = text.charCodeAt(pos);
        if (ch === 34) {
          result += text.substring(start, pos);
          pos++;
          break;
        }
        if (ch === 92) {
          result += text.substring(start, pos);
          pos++;
          if (pos >= len) {
            scanError = 2;
            break;
          }
          var ch2 = text.charCodeAt(pos++);
          switch (ch2) {
            case 34:
              result += '"';
              break;
            case 92:
              result += "\\";
              break;
            case 47:
              result += "/";
              break;
            case 98:
              result += "\b";
              break;
            case 102:
              result += "\f";
              break;
            case 110:
              result += "\n";
              break;
            case 114:
              result += "\r";
              break;
            case 116:
              result += "	";
              break;
            case 117:
              var ch3 = scanHexDigits(4, true);
              if (ch3 >= 0) {
                result += String.fromCharCode(ch3);
              } else {
                scanError = 4;
              }
              break;
            default:
              scanError = 5;
          }
          start = pos;
          continue;
        }
        if (ch >= 0 && ch <= 31) {
          if (isLineBreak(ch)) {
            result += text.substring(start, pos);
            scanError = 2;
            break;
          } else {
            scanError = 6;
          }
        }
        pos++;
      }
      return result;
    }
    function scanNext() {
      value = "";
      scanError = 0;
      tokenOffset = pos;
      lineStartOffset = lineNumber;
      prevTokenLineStartOffset = tokenLineStartOffset;
      if (pos >= len) {
        tokenOffset = len;
        return token = 17;
      }
      var code = text.charCodeAt(pos);
      if (isWhiteSpace(code)) {
        do {
          pos++;
          value += String.fromCharCode(code);
          code = text.charCodeAt(pos);
        } while (isWhiteSpace(code));
        return token = 15;
      }
      if (isLineBreak(code)) {
        pos++;
        value += String.fromCharCode(code);
        if (code === 13 && text.charCodeAt(pos) === 10) {
          pos++;
          value += "\n";
        }
        lineNumber++;
        tokenLineStartOffset = pos;
        return token = 14;
      }
      switch (code) {
        case 123:
          pos++;
          return token = 1;
        case 125:
          pos++;
          return token = 2;
        case 91:
          pos++;
          return token = 3;
        case 93:
          pos++;
          return token = 4;
        case 58:
          pos++;
          return token = 6;
        case 44:
          pos++;
          return token = 5;
        case 34:
          pos++;
          value = scanString();
          return token = 10;
        case 47:
          var start = pos - 1;
          if (text.charCodeAt(pos + 1) === 47) {
            pos += 2;
            while (pos < len) {
              if (isLineBreak(text.charCodeAt(pos))) {
                break;
              }
              pos++;
            }
            value = text.substring(start, pos);
            return token = 12;
          }
          if (text.charCodeAt(pos + 1) === 42) {
            pos += 2;
            var safeLength = len - 1;
            var commentClosed = false;
            while (pos < safeLength) {
              var ch = text.charCodeAt(pos);
              if (ch === 42 && text.charCodeAt(pos + 1) === 47) {
                pos += 2;
                commentClosed = true;
                break;
              }
              pos++;
              if (isLineBreak(ch)) {
                if (ch === 13 && text.charCodeAt(pos) === 10) {
                  pos++;
                }
                lineNumber++;
                tokenLineStartOffset = pos;
              }
            }
            if (!commentClosed) {
              pos++;
              scanError = 1;
            }
            value = text.substring(start, pos);
            return token = 13;
          }
          value += String.fromCharCode(code);
          pos++;
          return token = 16;
        case 45:
          value += String.fromCharCode(code);
          pos++;
          if (pos === len || !isDigit(text.charCodeAt(pos))) {
            return token = 16;
          }
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          value += scanNumber();
          return token = 11;
        default:
          while (pos < len && isUnknownContentCharacter(code)) {
            pos++;
            code = text.charCodeAt(pos);
          }
          if (tokenOffset !== pos) {
            value = text.substring(tokenOffset, pos);
            switch (value) {
              case "true":
                return token = 8;
              case "false":
                return token = 9;
              case "null":
                return token = 7;
            }
            return token = 16;
          }
          value += String.fromCharCode(code);
          pos++;
          return token = 16;
      }
    }
    function isUnknownContentCharacter(code) {
      if (isWhiteSpace(code) || isLineBreak(code)) {
        return false;
      }
      switch (code) {
        case 125:
        case 93:
        case 123:
        case 91:
        case 34:
        case 58:
        case 44:
        case 47:
          return false;
      }
      return true;
    }
    function scanNextNonTrivia() {
      var result;
      do {
        result = scanNext();
      } while (result >= 12 && result <= 15);
      return result;
    }
    return {
      setPosition,
      getPosition: function() {
        return pos;
      },
      scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
      getToken: function() {
        return token;
      },
      getTokenValue: function() {
        return value;
      },
      getTokenOffset: function() {
        return tokenOffset;
      },
      getTokenLength: function() {
        return pos - tokenOffset;
      },
      getTokenStartLine: function() {
        return lineStartOffset;
      },
      getTokenStartCharacter: function() {
        return tokenOffset - prevTokenLineStartOffset;
      },
      getTokenError: function() {
        return scanError;
      }
    };
  }
  exports2.createScanner = createScanner;
  function isWhiteSpace(ch) {
    return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch === 5760 || ch >= 8192 && ch <= 8203 || ch === 8239 || ch === 8287 || ch === 12288 || ch === 65279;
  }
  function isLineBreak(ch) {
    return ch === 10 || ch === 13 || ch === 8232 || ch === 8233;
  }
  function isDigit(ch) {
    return ch >= 48 && ch <= 57;
  }
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("jsonc-parser/impl/format", ["require", "exports", "./scanner"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var scanner_1 = require2("./scanner");
  function format(documentText, range, options) {
    var initialIndentLevel;
    var formatText;
    var formatTextStart;
    var rangeStart;
    var rangeEnd;
    if (range) {
      rangeStart = range.offset;
      rangeEnd = rangeStart + range.length;
      formatTextStart = rangeStart;
      while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) {
        formatTextStart--;
      }
      var endOffset = rangeEnd;
      while (endOffset < documentText.length && !isEOL(documentText, endOffset)) {
        endOffset++;
      }
      formatText = documentText.substring(formatTextStart, endOffset);
      initialIndentLevel = computeIndentLevel(formatText, options);
    } else {
      formatText = documentText;
      initialIndentLevel = 0;
      formatTextStart = 0;
      rangeStart = 0;
      rangeEnd = documentText.length;
    }
    var eol = getEOL(options, documentText);
    var lineBreak = false;
    var indentLevel = 0;
    var indentValue;
    if (options.insertSpaces) {
      indentValue = repeat(" ", options.tabSize || 4);
    } else {
      indentValue = "	";
    }
    var scanner = scanner_1.createScanner(formatText, false);
    var hasError = false;
    function newLineAndIndent() {
      return eol + repeat(indentValue, initialIndentLevel + indentLevel);
    }
    function scanNext() {
      var token = scanner.scan();
      lineBreak = false;
      while (token === 15 || token === 14) {
        lineBreak = lineBreak || token === 14;
        token = scanner.scan();
      }
      hasError = token === 16 || scanner.getTokenError() !== 0;
      return token;
    }
    var editOperations = [];
    function addEdit(text, startOffset, endOffset2) {
      if (!hasError && startOffset < rangeEnd && endOffset2 > rangeStart && documentText.substring(startOffset, endOffset2) !== text) {
        editOperations.push({
          offset: startOffset,
          length: endOffset2 - startOffset,
          content: text
        });
      }
    }
    var firstToken = scanNext();
    if (firstToken !== 17) {
      var firstTokenStart = scanner.getTokenOffset() + formatTextStart;
      var initialIndent = repeat(indentValue, initialIndentLevel);
      addEdit(initialIndent, formatTextStart, firstTokenStart);
    }
    while (firstToken !== 17) {
      var firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
      var secondToken = scanNext();
      var replaceContent = "";
      while (!lineBreak && (secondToken === 12 || secondToken === 13)) {
        var commentTokenStart = scanner.getTokenOffset() + formatTextStart;
        addEdit(" ", firstTokenEnd, commentTokenStart);
        firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
        replaceContent = secondToken === 12 ? newLineAndIndent() : "";
        secondToken = scanNext();
      }
      if (secondToken === 2) {
        if (firstToken !== 1) {
          indentLevel--;
          replaceContent = newLineAndIndent();
        }
      } else if (secondToken === 4) {
        if (firstToken !== 3) {
          indentLevel--;
          replaceContent = newLineAndIndent();
        }
      } else {
        switch (firstToken) {
          case 3:
          case 1:
            indentLevel++;
            replaceContent = newLineAndIndent();
            break;
          case 5:
          case 12:
            replaceContent = newLineAndIndent();
            break;
          case 13:
            if (lineBreak) {
              replaceContent = newLineAndIndent();
            } else {
              replaceContent = " ";
            }
            break;
          case 6:
            replaceContent = " ";
            break;
          case 10:
            if (secondToken === 6) {
              replaceContent = "";
              break;
            }
          case 7:
          case 8:
          case 9:
          case 11:
          case 2:
          case 4:
            if (secondToken === 12 || secondToken === 13) {
              replaceContent = " ";
            } else if (secondToken !== 5 && secondToken !== 17) {
              hasError = true;
            }
            break;
          case 16:
            hasError = true;
            break;
        }
        if (lineBreak && (secondToken === 12 || secondToken === 13)) {
          replaceContent = newLineAndIndent();
        }
      }
      var secondTokenStart = scanner.getTokenOffset() + formatTextStart;
      addEdit(replaceContent, firstTokenEnd, secondTokenStart);
      firstToken = secondToken;
    }
    return editOperations;
  }
  exports2.format = format;
  function repeat(s, count) {
    var result = "";
    for (var i = 0; i < count; i++) {
      result += s;
    }
    return result;
  }
  function computeIndentLevel(content, options) {
    var i = 0;
    var nChars = 0;
    var tabSize = options.tabSize || 4;
    while (i < content.length) {
      var ch = content.charAt(i);
      if (ch === " ") {
        nChars++;
      } else if (ch === "	") {
        nChars += tabSize;
      } else {
        break;
      }
      i++;
    }
    return Math.floor(nChars / tabSize);
  }
  function getEOL(options, text) {
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch === "\r") {
        if (i + 1 < text.length && text.charAt(i + 1) === "\n") {
          return "\r\n";
        }
        return "\r";
      } else if (ch === "\n") {
        return "\n";
      }
    }
    return options && options.eol || "\n";
  }
  function isEOL(text, offset) {
    return "\r\n".indexOf(text.charAt(offset)) !== -1;
  }
  exports2.isEOL = isEOL;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("jsonc-parser/impl/parser", ["require", "exports", "./scanner"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var scanner_1 = require2("./scanner");
  var ParseOptions;
  (function(ParseOptions2) {
    ParseOptions2.DEFAULT = {
      allowTrailingComma: false
    };
  })(ParseOptions || (ParseOptions = {}));
  function getLocation(text, position) {
    var segments = [];
    var earlyReturnException = new Object();
    var previousNode = void 0;
    var previousNodeInst = {
      value: {},
      offset: 0,
      length: 0,
      type: "object",
      parent: void 0
    };
    var isAtPropertyKey = false;
    function setPreviousNode(value, offset, length, type) {
      previousNodeInst.value = value;
      previousNodeInst.offset = offset;
      previousNodeInst.length = length;
      previousNodeInst.type = type;
      previousNodeInst.colonOffset = void 0;
      previousNode = previousNodeInst;
    }
    try {
      visit(text, {
        onObjectBegin: function(offset, length) {
          if (position <= offset) {
            throw earlyReturnException;
          }
          previousNode = void 0;
          isAtPropertyKey = position > offset;
          segments.push("");
        },
        onObjectProperty: function(name, offset, length) {
          if (position < offset) {
            throw earlyReturnException;
          }
          setPreviousNode(name, offset, length, "property");
          segments[segments.length - 1] = name;
          if (position <= offset + length) {
            throw earlyReturnException;
          }
        },
        onObjectEnd: function(offset, length) {
          if (position <= offset) {
            throw earlyReturnException;
          }
          previousNode = void 0;
          segments.pop();
        },
        onArrayBegin: function(offset, length) {
          if (position <= offset) {
            throw earlyReturnException;
          }
          previousNode = void 0;
          segments.push(0);
        },
        onArrayEnd: function(offset, length) {
          if (position <= offset) {
            throw earlyReturnException;
          }
          previousNode = void 0;
          segments.pop();
        },
        onLiteralValue: function(value, offset, length) {
          if (position < offset) {
            throw earlyReturnException;
          }
          setPreviousNode(value, offset, length, getNodeType(value));
          if (position <= offset + length) {
            throw earlyReturnException;
          }
        },
        onSeparator: function(sep, offset, length) {
          if (position <= offset) {
            throw earlyReturnException;
          }
          if (sep === ":" && previousNode && previousNode.type === "property") {
            previousNode.colonOffset = offset;
            isAtPropertyKey = false;
            previousNode = void 0;
          } else if (sep === ",") {
            var last = segments[segments.length - 1];
            if (typeof last === "number") {
              segments[segments.length - 1] = last + 1;
            } else {
              isAtPropertyKey = true;
              segments[segments.length - 1] = "";
            }
            previousNode = void 0;
          }
        }
      });
    } catch (e) {
      if (e !== earlyReturnException) {
        throw e;
      }
    }
    return {
      path: segments,
      previousNode,
      isAtPropertyKey,
      matches: function(pattern) {
        var k = 0;
        for (var i = 0; k < pattern.length && i < segments.length; i++) {
          if (pattern[k] === segments[i] || pattern[k] === "*") {
            k++;
          } else if (pattern[k] !== "**") {
            return false;
          }
        }
        return k === pattern.length;
      }
    };
  }
  exports2.getLocation = getLocation;
  function parse(text, errors, options) {
    if (errors === void 0) {
      errors = [];
    }
    if (options === void 0) {
      options = ParseOptions.DEFAULT;
    }
    var currentProperty = null;
    var currentParent = [];
    var previousParents = [];
    function onValue(value) {
      if (Array.isArray(currentParent)) {
        currentParent.push(value);
      } else if (currentProperty !== null) {
        currentParent[currentProperty] = value;
      }
    }
    var visitor = {
      onObjectBegin: function() {
        var object = {};
        onValue(object);
        previousParents.push(currentParent);
        currentParent = object;
        currentProperty = null;
      },
      onObjectProperty: function(name) {
        currentProperty = name;
      },
      onObjectEnd: function() {
        currentParent = previousParents.pop();
      },
      onArrayBegin: function() {
        var array = [];
        onValue(array);
        previousParents.push(currentParent);
        currentParent = array;
        currentProperty = null;
      },
      onArrayEnd: function() {
        currentParent = previousParents.pop();
      },
      onLiteralValue: onValue,
      onError: function(error, offset, length) {
        errors.push({
          error,
          offset,
          length
        });
      }
    };
    visit(text, visitor, options);
    return currentParent[0];
  }
  exports2.parse = parse;
  function parseTree(text, errors, options) {
    if (errors === void 0) {
      errors = [];
    }
    if (options === void 0) {
      options = ParseOptions.DEFAULT;
    }
    var currentParent = {
      type: "array",
      offset: -1,
      length: -1,
      children: [],
      parent: void 0
    };
    function ensurePropertyComplete(endOffset) {
      if (currentParent.type === "property") {
        currentParent.length = endOffset - currentParent.offset;
        currentParent = currentParent.parent;
      }
    }
    function onValue(valueNode) {
      currentParent.children.push(valueNode);
      return valueNode;
    }
    var visitor = {
      onObjectBegin: function(offset) {
        currentParent = onValue({
          type: "object",
          offset,
          length: -1,
          parent: currentParent,
          children: []
        });
      },
      onObjectProperty: function(name, offset, length) {
        currentParent = onValue({
          type: "property",
          offset,
          length: -1,
          parent: currentParent,
          children: []
        });
        currentParent.children.push({
          type: "string",
          value: name,
          offset,
          length,
          parent: currentParent
        });
      },
      onObjectEnd: function(offset, length) {
        currentParent.length = offset + length - currentParent.offset;
        currentParent = currentParent.parent;
        ensurePropertyComplete(offset + length);
      },
      onArrayBegin: function(offset, length) {
        currentParent = onValue({
          type: "array",
          offset,
          length: -1,
          parent: currentParent,
          children: []
        });
      },
      onArrayEnd: function(offset, length) {
        currentParent.length = offset + length - currentParent.offset;
        currentParent = currentParent.parent;
        ensurePropertyComplete(offset + length);
      },
      onLiteralValue: function(value, offset, length) {
        onValue({
          type: getNodeType(value),
          offset,
          length,
          parent: currentParent,
          value
        });
        ensurePropertyComplete(offset + length);
      },
      onSeparator: function(sep, offset, length) {
        if (currentParent.type === "property") {
          if (sep === ":") {
            currentParent.colonOffset = offset;
          } else if (sep === ",") {
            ensurePropertyComplete(offset);
          }
        }
      },
      onError: function(error, offset, length) {
        errors.push({
          error,
          offset,
          length
        });
      }
    };
    visit(text, visitor, options);
    var result = currentParent.children[0];
    if (result) {
      delete result.parent;
    }
    return result;
  }
  exports2.parseTree = parseTree;
  function findNodeAtLocation(root, path) {
    if (!root) {
      return void 0;
    }
    var node = root;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
      var segment = path_1[_i];
      if (typeof segment === "string") {
        if (node.type !== "object" || !Array.isArray(node.children)) {
          return void 0;
        }
        var found = false;
        for (var _a = 0, _b = node.children; _a < _b.length; _a++) {
          var propertyNode = _b[_a];
          if (Array.isArray(propertyNode.children) && propertyNode.children[0].value === segment) {
            node = propertyNode.children[1];
            found = true;
            break;
          }
        }
        if (!found) {
          return void 0;
        }
      } else {
        var index = segment;
        if (node.type !== "array" || index < 0 || !Array.isArray(node.children) || index >= node.children.length) {
          return void 0;
        }
        node = node.children[index];
      }
    }
    return node;
  }
  exports2.findNodeAtLocation = findNodeAtLocation;
  function getNodePath(node) {
    if (!node.parent || !node.parent.children) {
      return [];
    }
    var path = getNodePath(node.parent);
    if (node.parent.type === "property") {
      var key = node.parent.children[0].value;
      path.push(key);
    } else if (node.parent.type === "array") {
      var index = node.parent.children.indexOf(node);
      if (index !== -1) {
        path.push(index);
      }
    }
    return path;
  }
  exports2.getNodePath = getNodePath;
  function getNodeValue(node) {
    switch (node.type) {
      case "array":
        return node.children.map(getNodeValue);
      case "object":
        var obj = Object.create(null);
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
          var prop = _a[_i];
          var valueNode = prop.children[1];
          if (valueNode) {
            obj[prop.children[0].value] = getNodeValue(valueNode);
          }
        }
        return obj;
      case "null":
      case "string":
      case "number":
      case "boolean":
        return node.value;
      default:
        return void 0;
    }
  }
  exports2.getNodeValue = getNodeValue;
  function contains(node, offset, includeRightBound) {
    if (includeRightBound === void 0) {
      includeRightBound = false;
    }
    return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
  }
  exports2.contains = contains;
  function findNodeAtOffset(node, offset, includeRightBound) {
    if (includeRightBound === void 0) {
      includeRightBound = false;
    }
    if (contains(node, offset, includeRightBound)) {
      var children = node.children;
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length && children[i].offset <= offset; i++) {
          var item = findNodeAtOffset(children[i], offset, includeRightBound);
          if (item) {
            return item;
          }
        }
      }
      return node;
    }
    return void 0;
  }
  exports2.findNodeAtOffset = findNodeAtOffset;
  function visit(text, visitor, options) {
    if (options === void 0) {
      options = ParseOptions.DEFAULT;
    }
    var _scanner = scanner_1.createScanner(text, false);
    function toNoArgVisit(visitFunction) {
      return visitFunction ? function() {
        return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
      } : function() {
        return true;
      };
    }
    function toOneArgVisit(visitFunction) {
      return visitFunction ? function(arg) {
        return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
      } : function() {
        return true;
      };
    }
    var onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisit(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisit(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
    var disallowComments = options && options.disallowComments;
    var allowTrailingComma = options && options.allowTrailingComma;
    function scanNext() {
      while (true) {
        var token = _scanner.scan();
        switch (_scanner.getTokenError()) {
          case 4:
            handleError(14);
            break;
          case 5:
            handleError(15);
            break;
          case 3:
            handleError(13);
            break;
          case 1:
            if (!disallowComments) {
              handleError(11);
            }
            break;
          case 2:
            handleError(12);
            break;
          case 6:
            handleError(16);
            break;
        }
        switch (token) {
          case 12:
          case 13:
            if (disallowComments) {
              handleError(10);
            } else {
              onComment();
            }
            break;
          case 16:
            handleError(1);
            break;
          case 15:
          case 14:
            break;
          default:
            return token;
        }
      }
    }
    function handleError(error, skipUntilAfter, skipUntil) {
      if (skipUntilAfter === void 0) {
        skipUntilAfter = [];
      }
      if (skipUntil === void 0) {
        skipUntil = [];
      }
      onError(error);
      if (skipUntilAfter.length + skipUntil.length > 0) {
        var token = _scanner.getToken();
        while (token !== 17) {
          if (skipUntilAfter.indexOf(token) !== -1) {
            scanNext();
            break;
          } else if (skipUntil.indexOf(token) !== -1) {
            break;
          }
          token = scanNext();
        }
      }
    }
    function parseString(isValue) {
      var value = _scanner.getTokenValue();
      if (isValue) {
        onLiteralValue(value);
      } else {
        onObjectProperty(value);
      }
      scanNext();
      return true;
    }
    function parseLiteral() {
      switch (_scanner.getToken()) {
        case 11:
          var value = 0;
          try {
            value = JSON.parse(_scanner.getTokenValue());
            if (typeof value !== "number") {
              handleError(2);
              value = 0;
            }
          } catch (e) {
            handleError(2);
          }
          onLiteralValue(value);
          break;
        case 7:
          onLiteralValue(null);
          break;
        case 8:
          onLiteralValue(true);
          break;
        case 9:
          onLiteralValue(false);
          break;
        default:
          return false;
      }
      scanNext();
      return true;
    }
    function parseProperty() {
      if (_scanner.getToken() !== 10) {
        handleError(3, [], [2, 5]);
        return false;
      }
      parseString(false);
      if (_scanner.getToken() === 6) {
        onSeparator(":");
        scanNext();
        if (!parseValue()) {
          handleError(4, [], [2, 5]);
        }
      } else {
        handleError(5, [], [2, 5]);
      }
      return true;
    }
    function parseObject() {
      onObjectBegin();
      scanNext();
      var needsComma = false;
      while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
        if (_scanner.getToken() === 5) {
          if (!needsComma) {
            handleError(4, [], []);
          }
          onSeparator(",");
          scanNext();
          if (_scanner.getToken() === 2 && allowTrailingComma) {
            break;
          }
        } else if (needsComma) {
          handleError(6, [], []);
        }
        if (!parseProperty()) {
          handleError(4, [], [2, 5]);
        }
        needsComma = true;
      }
      onObjectEnd();
      if (_scanner.getToken() !== 2) {
        handleError(7, [2], []);
      } else {
        scanNext();
      }
      return true;
    }
    function parseArray() {
      onArrayBegin();
      scanNext();
      var needsComma = false;
      while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
        if (_scanner.getToken() === 5) {
          if (!needsComma) {
            handleError(4, [], []);
          }
          onSeparator(",");
          scanNext();
          if (_scanner.getToken() === 4 && allowTrailingComma) {
            break;
          }
        } else if (needsComma) {
          handleError(6, [], []);
        }
        if (!parseValue()) {
          handleError(4, [], [4, 5]);
        }
        needsComma = true;
      }
      onArrayEnd();
      if (_scanner.getToken() !== 4) {
        handleError(8, [4], []);
      } else {
        scanNext();
      }
      return true;
    }
    function parseValue() {
      switch (_scanner.getToken()) {
        case 3:
          return parseArray();
        case 1:
          return parseObject();
        case 10:
          return parseString(true);
        default:
          return parseLiteral();
      }
    }
    scanNext();
    if (_scanner.getToken() === 17) {
      if (options.allowEmptyContent) {
        return true;
      }
      handleError(4, [], []);
      return false;
    }
    if (!parseValue()) {
      handleError(4, [], []);
      return false;
    }
    if (_scanner.getToken() !== 17) {
      handleError(9, [], []);
    }
    return true;
  }
  exports2.visit = visit;
  function stripComments(text, replaceCh) {
    var _scanner = scanner_1.createScanner(text), parts = [], kind, offset = 0, pos;
    do {
      pos = _scanner.getPosition();
      kind = _scanner.scan();
      switch (kind) {
        case 12:
        case 13:
        case 17:
          if (offset !== pos) {
            parts.push(text.substring(offset, pos));
          }
          if (replaceCh !== void 0) {
            parts.push(_scanner.getTokenValue().replace(/[^\r\n]/g, replaceCh));
          }
          offset = _scanner.getPosition();
          break;
      }
    } while (kind !== 17);
    return parts.join("");
  }
  exports2.stripComments = stripComments;
  function getNodeType(value) {
    switch (typeof value) {
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
      case "object": {
        if (!value) {
          return "null";
        } else if (Array.isArray(value)) {
          return "array";
        }
        return "object";
      }
      default:
        return "null";
    }
  }
  exports2.getNodeType = getNodeType;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("jsonc-parser/impl/edit", ["require", "exports", "./format", "./parser"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var format_1 = require2("./format");
  var parser_1 = require2("./parser");
  function removeProperty(text, path, formattingOptions) {
    return setProperty(text, path, void 0, formattingOptions);
  }
  exports2.removeProperty = removeProperty;
  function setProperty(text, originalPath, value, formattingOptions, getInsertionIndex) {
    var _a;
    var path = originalPath.slice();
    var errors = [];
    var root = parser_1.parseTree(text, errors);
    var parent = void 0;
    var lastSegment = void 0;
    while (path.length > 0) {
      lastSegment = path.pop();
      parent = parser_1.findNodeAtLocation(root, path);
      if (parent === void 0 && value !== void 0) {
        if (typeof lastSegment === "string") {
          value = (_a = {}, _a[lastSegment] = value, _a);
        } else {
          value = [value];
        }
      } else {
        break;
      }
    }
    if (!parent) {
      if (value === void 0) {
        throw new Error("Can not delete in empty document");
      }
      return withFormatting(text, {
        offset: root ? root.offset : 0,
        length: root ? root.length : 0,
        content: JSON.stringify(value)
      }, formattingOptions);
    } else if (parent.type === "object" && typeof lastSegment === "string" && Array.isArray(parent.children)) {
      var existing = parser_1.findNodeAtLocation(parent, [lastSegment]);
      if (existing !== void 0) {
        if (value === void 0) {
          if (!existing.parent) {
            throw new Error("Malformed AST");
          }
          var propertyIndex = parent.children.indexOf(existing.parent);
          var removeBegin = void 0;
          var removeEnd = existing.parent.offset + existing.parent.length;
          if (propertyIndex > 0) {
            var previous = parent.children[propertyIndex - 1];
            removeBegin = previous.offset + previous.length;
          } else {
            removeBegin = parent.offset + 1;
            if (parent.children.length > 1) {
              var next = parent.children[1];
              removeEnd = next.offset;
            }
          }
          return withFormatting(text, {
            offset: removeBegin,
            length: removeEnd - removeBegin,
            content: ""
          }, formattingOptions);
        } else {
          return withFormatting(text, {
            offset: existing.offset,
            length: existing.length,
            content: JSON.stringify(value)
          }, formattingOptions);
        }
      } else {
        if (value === void 0) {
          return [];
        }
        var newProperty = JSON.stringify(lastSegment) + ": " + JSON.stringify(value);
        var index = getInsertionIndex ? getInsertionIndex(parent.children.map(function(p) {
          return p.children[0].value;
        })) : parent.children.length;
        var edit = void 0;
        if (index > 0) {
          var previous = parent.children[index - 1];
          edit = {
            offset: previous.offset + previous.length,
            length: 0,
            content: "," + newProperty
          };
        } else if (parent.children.length === 0) {
          edit = {
            offset: parent.offset + 1,
            length: 0,
            content: newProperty
          };
        } else {
          edit = {
            offset: parent.offset + 1,
            length: 0,
            content: newProperty + ","
          };
        }
        return withFormatting(text, edit, formattingOptions);
      }
    } else if (parent.type === "array" && typeof lastSegment === "number" && Array.isArray(parent.children)) {
      var insertIndex = lastSegment;
      if (insertIndex === -1) {
        var newProperty = "" + JSON.stringify(value);
        var edit = void 0;
        if (parent.children.length === 0) {
          edit = {
            offset: parent.offset + 1,
            length: 0,
            content: newProperty
          };
        } else {
          var previous = parent.children[parent.children.length - 1];
          edit = {
            offset: previous.offset + previous.length,
            length: 0,
            content: "," + newProperty
          };
        }
        return withFormatting(text, edit, formattingOptions);
      } else {
        if (value === void 0 && parent.children.length >= 0) {
          var removalIndex = lastSegment;
          var toRemove = parent.children[removalIndex];
          var edit = void 0;
          if (parent.children.length === 1) {
            edit = {
              offset: parent.offset + 1,
              length: parent.length - 2,
              content: ""
            };
          } else if (parent.children.length - 1 === removalIndex) {
            var previous = parent.children[removalIndex - 1];
            var offset = previous.offset + previous.length;
            var parentEndOffset = parent.offset + parent.length;
            edit = {
              offset,
              length: parentEndOffset - 2 - offset,
              content: ""
            };
          } else {
            edit = {
              offset: toRemove.offset,
              length: parent.children[removalIndex + 1].offset - toRemove.offset,
              content: ""
            };
          }
          return withFormatting(text, edit, formattingOptions);
        } else {
          throw new Error("Array modification not supported yet");
        }
      }
    } else {
      throw new Error("Can not add " + (typeof lastSegment !== "number" ? "index" : "property") + " to parent of type " + parent.type);
    }
  }
  exports2.setProperty = setProperty;
  function withFormatting(text, edit, formattingOptions) {
    var newText = applyEdit(text, edit);
    var begin = edit.offset;
    var end = edit.offset + edit.content.length;
    if (edit.length === 0 || edit.content.length === 0) {
      while (begin > 0 && !format_1.isEOL(newText, begin - 1)) {
        begin--;
      }
      while (end < newText.length && !format_1.isEOL(newText, end)) {
        end++;
      }
    }
    var edits = format_1.format(newText, {
      offset: begin,
      length: end - begin
    }, formattingOptions);
    for (var i = edits.length - 1; i >= 0; i--) {
      var edit_1 = edits[i];
      newText = applyEdit(newText, edit_1);
      begin = Math.min(begin, edit_1.offset);
      end = Math.max(end, edit_1.offset + edit_1.length);
      end += edit_1.content.length - edit_1.length;
    }
    var editLength = text.length - (newText.length - end) - begin;
    return [{
      offset: begin,
      length: editLength,
      content: newText.substring(begin, end)
    }];
  }
  function applyEdit(text, edit) {
    return text.substring(0, edit.offset) + edit.content + text.substring(edit.offset + edit.length);
  }
  exports2.applyEdit = applyEdit;
  function isWS(text, offset) {
    return "\r\n 	".indexOf(text.charAt(offset)) !== -1;
  }
  exports2.isWS = isWS;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("jsonc-parser/main", ["require", "exports", "./impl/format", "./impl/edit", "./impl/scanner", "./impl/parser"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var formatter = require2("./impl/format");
  var edit = require2("./impl/edit");
  var scanner = require2("./impl/scanner");
  var parser = require2("./impl/parser");
  exports2.createScanner = scanner.createScanner;
  exports2.getLocation = parser.getLocation;
  exports2.parse = parser.parse;
  exports2.parseTree = parser.parseTree;
  exports2.findNodeAtLocation = parser.findNodeAtLocation;
  exports2.findNodeAtOffset = parser.findNodeAtOffset;
  exports2.getNodePath = parser.getNodePath;
  exports2.getNodeValue = parser.getNodeValue;
  exports2.visit = parser.visit;
  exports2.stripComments = parser.stripComments;
  function printParseErrorCode(code) {
    switch (code) {
      case 1:
        return "InvalidSymbol";
      case 2:
        return "InvalidNumberFormat";
      case 3:
        return "PropertyNameExpected";
      case 4:
        return "ValueExpected";
      case 5:
        return "ColonExpected";
      case 6:
        return "CommaExpected";
      case 7:
        return "CloseBraceExpected";
      case 8:
        return "CloseBracketExpected";
      case 9:
        return "EndOfFileExpected";
      case 10:
        return "InvalidCommentToken";
      case 11:
        return "UnexpectedEndOfComment";
      case 12:
        return "UnexpectedEndOfString";
      case 13:
        return "UnexpectedEndOfNumber";
      case 14:
        return "InvalidUnicode";
      case 15:
        return "InvalidEscapeCharacter";
      case 16:
        return "InvalidCharacter";
    }
    return "<unknown ParseErrorCode>";
  }
  exports2.printParseErrorCode = printParseErrorCode;
  function format(documentText, range, options) {
    return formatter.format(documentText, range, options);
  }
  exports2.format = format;
  function modify(text, path, value, options) {
    return edit.setProperty(text, path, value, options.formattingOptions, options.getInsertionIndex);
  }
  exports2.modify = modify;
  function applyEdits(text, edits) {
    for (var i = edits.length - 1; i >= 0; i--) {
      text = edit.applyEdit(text, edits[i]);
    }
    return text;
  }
  exports2.applyEdits = applyEdits;
});
define("jsonc-parser", ["jsonc-parser/main"], function(main) {
  return main;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/utils/objects", ["require", "exports"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  function equals(one, other) {
    if (one === other) {
      return true;
    }
    if (one === null || one === void 0 || other === null || other === void 0) {
      return false;
    }
    if (typeof one !== typeof other) {
      return false;
    }
    if (typeof one !== "object") {
      return false;
    }
    if (Array.isArray(one) !== Array.isArray(other)) {
      return false;
    }
    var i, key;
    if (Array.isArray(one)) {
      if (one.length !== other.length) {
        return false;
      }
      for (i = 0; i < one.length; i++) {
        if (!equals(one[i], other[i])) {
          return false;
        }
      }
    } else {
      var oneKeys = [];
      for (key in one) {
        oneKeys.push(key);
      }
      oneKeys.sort();
      var otherKeys = [];
      for (key in other) {
        otherKeys.push(key);
      }
      otherKeys.sort();
      if (!equals(oneKeys, otherKeys)) {
        return false;
      }
      for (i = 0; i < oneKeys.length; i++) {
        if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
          return false;
        }
      }
    }
    return true;
  }
  exports2.equals = equals;
  function isNumber(val) {
    return typeof val === "number";
  }
  exports2.isNumber = isNumber;
  function isDefined(val) {
    return typeof val !== "undefined";
  }
  exports2.isDefined = isDefined;
  function isBoolean(val) {
    return typeof val === "boolean";
  }
  exports2.isBoolean = isBoolean;
  function isString(val) {
    return typeof val === "string";
  }
  exports2.isString = isString;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-languageserver-types/main", ["require", "exports"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var Position;
  (function(Position2) {
    function create(line, character) {
      return {
        line,
        character
      };
    }
    Position2.create = create;
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
    }
    Position2.is = is;
  })(Position = exports2.Position || (exports2.Position = {}));
  var Range;
  (function(Range2) {
    function create(one, two, three, four) {
      if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
        return {
          start: Position.create(one, two),
          end: Position.create(three, four)
        };
      } else if (Position.is(one) && Position.is(two)) {
        return {
          start: one,
          end: two
        };
      } else {
        throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
      }
    }
    Range2.create = create;
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range2.is = is;
  })(Range = exports2.Range || (exports2.Range = {}));
  var Location;
  (function(Location2) {
    function create(uri, range) {
      return {
        uri,
        range
      };
    }
    Location2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location2.is = is;
  })(Location = exports2.Location || (exports2.Location = {}));
  var LocationLink;
  (function(LocationLink2) {
    function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
      return {
        targetUri,
        targetRange,
        targetSelectionRange,
        originSelectionRange
      };
    }
    LocationLink2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange)) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
    }
    LocationLink2.is = is;
  })(LocationLink = exports2.LocationLink || (exports2.LocationLink = {}));
  var Color;
  (function(Color2) {
    function create(red, green, blue, alpha) {
      return {
        red,
        green,
        blue,
        alpha
      };
    }
    Color2.create = create;
    function is(value) {
      var candidate = value;
      return Is.number(candidate.red) && Is.number(candidate.green) && Is.number(candidate.blue) && Is.number(candidate.alpha);
    }
    Color2.is = is;
  })(Color = exports2.Color || (exports2.Color = {}));
  var ColorInformation;
  (function(ColorInformation2) {
    function create(range, color) {
      return {
        range,
        color
      };
    }
    ColorInformation2.create = create;
    function is(value) {
      var candidate = value;
      return Range.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation2.is = is;
  })(ColorInformation = exports2.ColorInformation || (exports2.ColorInformation = {}));
  var ColorPresentation;
  (function(ColorPresentation2) {
    function create(label, textEdit, additionalTextEdits) {
      return {
        label,
        textEdit,
        additionalTextEdits
      };
    }
    ColorPresentation2.create = create;
    function is(value) {
      var candidate = value;
      return Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation2.is = is;
  })(ColorPresentation = exports2.ColorPresentation || (exports2.ColorPresentation = {}));
  var FoldingRangeKind;
  (function(FoldingRangeKind2) {
    FoldingRangeKind2["Comment"] = "comment";
    FoldingRangeKind2["Imports"] = "imports";
    FoldingRangeKind2["Region"] = "region";
  })(FoldingRangeKind = exports2.FoldingRangeKind || (exports2.FoldingRangeKind = {}));
  var FoldingRange;
  (function(FoldingRange2) {
    function create(startLine, endLine, startCharacter, endCharacter, kind) {
      var result = {
        startLine,
        endLine
      };
      if (Is.defined(startCharacter)) {
        result.startCharacter = startCharacter;
      }
      if (Is.defined(endCharacter)) {
        result.endCharacter = endCharacter;
      }
      if (Is.defined(kind)) {
        result.kind = kind;
      }
      return result;
    }
    FoldingRange2.create = create;
    function is(value) {
      var candidate = value;
      return Is.number(candidate.startLine) && Is.number(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.number(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.number(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange2.is = is;
  })(FoldingRange = exports2.FoldingRange || (exports2.FoldingRange = {}));
  var DiagnosticRelatedInformation;
  (function(DiagnosticRelatedInformation2) {
    function create(location, message) {
      return {
        location,
        message
      };
    }
    DiagnosticRelatedInformation2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation2.is = is;
  })(DiagnosticRelatedInformation = exports2.DiagnosticRelatedInformation || (exports2.DiagnosticRelatedInformation = {}));
  var DiagnosticSeverity;
  (function(DiagnosticSeverity2) {
    DiagnosticSeverity2.Error = 1;
    DiagnosticSeverity2.Warning = 2;
    DiagnosticSeverity2.Information = 3;
    DiagnosticSeverity2.Hint = 4;
  })(DiagnosticSeverity = exports2.DiagnosticSeverity || (exports2.DiagnosticSeverity = {}));
  var DiagnosticTag;
  (function(DiagnosticTag2) {
    DiagnosticTag2.Unnecessary = 1;
    DiagnosticTag2.Deprecated = 2;
  })(DiagnosticTag = exports2.DiagnosticTag || (exports2.DiagnosticTag = {}));
  var Diagnostic;
  (function(Diagnostic2) {
    function create(range, message, severity, code, source, relatedInformation) {
      var result = {
        range,
        message
      };
      if (Is.defined(severity)) {
        result.severity = severity;
      }
      if (Is.defined(code)) {
        result.code = code;
      }
      if (Is.defined(source)) {
        result.source = source;
      }
      if (Is.defined(relatedInformation)) {
        result.relatedInformation = relatedInformation;
      }
      return result;
    }
    Diagnostic2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic2.is = is;
  })(Diagnostic = exports2.Diagnostic || (exports2.Diagnostic = {}));
  var Command;
  (function(Command2) {
    function create(title, command) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var result = {
        title,
        command
      };
      if (Is.defined(args) && args.length > 0) {
        result.arguments = args;
      }
      return result;
    }
    Command2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command2.is = is;
  })(Command = exports2.Command || (exports2.Command = {}));
  var TextEdit;
  (function(TextEdit2) {
    function replace(range, newText) {
      return {
        range,
        newText
      };
    }
    TextEdit2.replace = replace;
    function insert(position, newText) {
      return {
        range: {
          start: position,
          end: position
        },
        newText
      };
    }
    TextEdit2.insert = insert;
    function del(range) {
      return {
        range,
        newText: ""
      };
    }
    TextEdit2.del = del;
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
    }
    TextEdit2.is = is;
  })(TextEdit = exports2.TextEdit || (exports2.TextEdit = {}));
  var TextDocumentEdit;
  (function(TextDocumentEdit2) {
    function create(textDocument, edits) {
      return {
        textDocument,
        edits
      };
    }
    TextDocumentEdit2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && VersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
    }
    TextDocumentEdit2.is = is;
  })(TextDocumentEdit = exports2.TextDocumentEdit || (exports2.TextDocumentEdit = {}));
  var CreateFile;
  (function(CreateFile2) {
    function create(uri, options) {
      var result = {
        kind: "create",
        uri
      };
      if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
        result.options = options;
      }
      return result;
    }
    CreateFile2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists)));
    }
    CreateFile2.is = is;
  })(CreateFile = exports2.CreateFile || (exports2.CreateFile = {}));
  var RenameFile;
  (function(RenameFile2) {
    function create(oldUri, newUri, options) {
      var result = {
        kind: "rename",
        oldUri,
        newUri
      };
      if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
        result.options = options;
      }
      return result;
    }
    RenameFile2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists)));
    }
    RenameFile2.is = is;
  })(RenameFile = exports2.RenameFile || (exports2.RenameFile = {}));
  var DeleteFile;
  (function(DeleteFile2) {
    function create(uri, options) {
      var result = {
        kind: "delete",
        uri
      };
      if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
        result.options = options;
      }
      return result;
    }
    DeleteFile2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists)));
    }
    DeleteFile2.is = is;
  })(DeleteFile = exports2.DeleteFile || (exports2.DeleteFile = {}));
  var WorkspaceEdit;
  (function(WorkspaceEdit2) {
    function is(value) {
      var candidate = value;
      return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every(function(change) {
        if (Is.string(change.kind)) {
          return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
        } else {
          return TextDocumentEdit.is(change);
        }
      }));
    }
    WorkspaceEdit2.is = is;
  })(WorkspaceEdit = exports2.WorkspaceEdit || (exports2.WorkspaceEdit = {}));
  var TextEditChangeImpl = function() {
    function TextEditChangeImpl2(edits) {
      this.edits = edits;
    }
    TextEditChangeImpl2.prototype.insert = function(position, newText) {
      this.edits.push(TextEdit.insert(position, newText));
    };
    TextEditChangeImpl2.prototype.replace = function(range, newText) {
      this.edits.push(TextEdit.replace(range, newText));
    };
    TextEditChangeImpl2.prototype.delete = function(range) {
      this.edits.push(TextEdit.del(range));
    };
    TextEditChangeImpl2.prototype.add = function(edit) {
      this.edits.push(edit);
    };
    TextEditChangeImpl2.prototype.all = function() {
      return this.edits;
    };
    TextEditChangeImpl2.prototype.clear = function() {
      this.edits.splice(0, this.edits.length);
    };
    return TextEditChangeImpl2;
  }();
  var WorkspaceChange = function() {
    function WorkspaceChange2(workspaceEdit) {
      var _this = this;
      this._textEditChanges = Object.create(null);
      if (workspaceEdit) {
        this._workspaceEdit = workspaceEdit;
        if (workspaceEdit.documentChanges) {
          workspaceEdit.documentChanges.forEach(function(change) {
            if (TextDocumentEdit.is(change)) {
              var textEditChange = new TextEditChangeImpl(change.edits);
              _this._textEditChanges[change.textDocument.uri] = textEditChange;
            }
          });
        } else if (workspaceEdit.changes) {
          Object.keys(workspaceEdit.changes).forEach(function(key) {
            var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
            _this._textEditChanges[key] = textEditChange;
          });
        }
      }
    }
    Object.defineProperty(WorkspaceChange2.prototype, "edit", {
      get: function() {
        return this._workspaceEdit;
      },
      enumerable: true,
      configurable: true
    });
    WorkspaceChange2.prototype.getTextEditChange = function(key) {
      if (VersionedTextDocumentIdentifier.is(key)) {
        if (!this._workspaceEdit) {
          this._workspaceEdit = {
            documentChanges: []
          };
        }
        if (!this._workspaceEdit.documentChanges) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        var textDocument = key;
        var result = this._textEditChanges[textDocument.uri];
        if (!result) {
          var edits = [];
          var textDocumentEdit = {
            textDocument,
            edits
          };
          this._workspaceEdit.documentChanges.push(textDocumentEdit);
          result = new TextEditChangeImpl(edits);
          this._textEditChanges[textDocument.uri] = result;
        }
        return result;
      } else {
        if (!this._workspaceEdit) {
          this._workspaceEdit = {
            changes: Object.create(null)
          };
        }
        if (!this._workspaceEdit.changes) {
          throw new Error("Workspace edit is not configured for normal text edit changes.");
        }
        var result = this._textEditChanges[key];
        if (!result) {
          var edits = [];
          this._workspaceEdit.changes[key] = edits;
          result = new TextEditChangeImpl(edits);
          this._textEditChanges[key] = result;
        }
        return result;
      }
    };
    WorkspaceChange2.prototype.createFile = function(uri, options) {
      this.checkDocumentChanges();
      this._workspaceEdit.documentChanges.push(CreateFile.create(uri, options));
    };
    WorkspaceChange2.prototype.renameFile = function(oldUri, newUri, options) {
      this.checkDocumentChanges();
      this._workspaceEdit.documentChanges.push(RenameFile.create(oldUri, newUri, options));
    };
    WorkspaceChange2.prototype.deleteFile = function(uri, options) {
      this.checkDocumentChanges();
      this._workspaceEdit.documentChanges.push(DeleteFile.create(uri, options));
    };
    WorkspaceChange2.prototype.checkDocumentChanges = function() {
      if (!this._workspaceEdit || !this._workspaceEdit.documentChanges) {
        throw new Error("Workspace edit is not configured for document changes.");
      }
    };
    return WorkspaceChange2;
  }();
  exports2.WorkspaceChange = WorkspaceChange;
  var TextDocumentIdentifier;
  (function(TextDocumentIdentifier2) {
    function create(uri) {
      return {
        uri
      };
    }
    TextDocumentIdentifier2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier2.is = is;
  })(TextDocumentIdentifier = exports2.TextDocumentIdentifier || (exports2.TextDocumentIdentifier = {}));
  var VersionedTextDocumentIdentifier;
  (function(VersionedTextDocumentIdentifier2) {
    function create(uri, version) {
      return {
        uri,
        version
      };
    }
    VersionedTextDocumentIdentifier2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.number(candidate.version));
    }
    VersionedTextDocumentIdentifier2.is = is;
  })(VersionedTextDocumentIdentifier = exports2.VersionedTextDocumentIdentifier || (exports2.VersionedTextDocumentIdentifier = {}));
  var TextDocumentItem;
  (function(TextDocumentItem2) {
    function create(uri, languageId, version, text) {
      return {
        uri,
        languageId,
        version,
        text
      };
    }
    TextDocumentItem2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.number(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem2.is = is;
  })(TextDocumentItem = exports2.TextDocumentItem || (exports2.TextDocumentItem = {}));
  var MarkupKind;
  (function(MarkupKind2) {
    MarkupKind2.PlainText = "plaintext";
    MarkupKind2.Markdown = "markdown";
  })(MarkupKind = exports2.MarkupKind || (exports2.MarkupKind = {}));
  (function(MarkupKind2) {
    function is(value) {
      var candidate = value;
      return candidate === MarkupKind2.PlainText || candidate === MarkupKind2.Markdown;
    }
    MarkupKind2.is = is;
  })(MarkupKind = exports2.MarkupKind || (exports2.MarkupKind = {}));
  var MarkupContent;
  (function(MarkupContent2) {
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
    }
    MarkupContent2.is = is;
  })(MarkupContent = exports2.MarkupContent || (exports2.MarkupContent = {}));
  var CompletionItemKind;
  (function(CompletionItemKind2) {
    CompletionItemKind2.Text = 1;
    CompletionItemKind2.Method = 2;
    CompletionItemKind2.Function = 3;
    CompletionItemKind2.Constructor = 4;
    CompletionItemKind2.Field = 5;
    CompletionItemKind2.Variable = 6;
    CompletionItemKind2.Class = 7;
    CompletionItemKind2.Interface = 8;
    CompletionItemKind2.Module = 9;
    CompletionItemKind2.Property = 10;
    CompletionItemKind2.Unit = 11;
    CompletionItemKind2.Value = 12;
    CompletionItemKind2.Enum = 13;
    CompletionItemKind2.Keyword = 14;
    CompletionItemKind2.Snippet = 15;
    CompletionItemKind2.Color = 16;
    CompletionItemKind2.File = 17;
    CompletionItemKind2.Reference = 18;
    CompletionItemKind2.Folder = 19;
    CompletionItemKind2.EnumMember = 20;
    CompletionItemKind2.Constant = 21;
    CompletionItemKind2.Struct = 22;
    CompletionItemKind2.Event = 23;
    CompletionItemKind2.Operator = 24;
    CompletionItemKind2.TypeParameter = 25;
  })(CompletionItemKind = exports2.CompletionItemKind || (exports2.CompletionItemKind = {}));
  var InsertTextFormat;
  (function(InsertTextFormat2) {
    InsertTextFormat2.PlainText = 1;
    InsertTextFormat2.Snippet = 2;
  })(InsertTextFormat = exports2.InsertTextFormat || (exports2.InsertTextFormat = {}));
  var CompletionItemTag;
  (function(CompletionItemTag2) {
    CompletionItemTag2.Deprecated = 1;
  })(CompletionItemTag = exports2.CompletionItemTag || (exports2.CompletionItemTag = {}));
  var CompletionItem;
  (function(CompletionItem2) {
    function create(label) {
      return {
        label
      };
    }
    CompletionItem2.create = create;
  })(CompletionItem = exports2.CompletionItem || (exports2.CompletionItem = {}));
  var CompletionList;
  (function(CompletionList2) {
    function create(items, isIncomplete) {
      return {
        items: items ? items : [],
        isIncomplete: !!isIncomplete
      };
    }
    CompletionList2.create = create;
  })(CompletionList = exports2.CompletionList || (exports2.CompletionList = {}));
  var MarkedString;
  (function(MarkedString2) {
    function fromPlainText(plainText) {
      return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
    }
    MarkedString2.fromPlainText = fromPlainText;
    function is(value) {
      var candidate = value;
      return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
    }
    MarkedString2.is = is;
  })(MarkedString = exports2.MarkedString || (exports2.MarkedString = {}));
  var Hover;
  (function(Hover2) {
    function is(value) {
      var candidate = value;
      return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
    }
    Hover2.is = is;
  })(Hover = exports2.Hover || (exports2.Hover = {}));
  var ParameterInformation;
  (function(ParameterInformation2) {
    function create(label, documentation) {
      return documentation ? {
        label,
        documentation
      } : {
        label
      };
    }
    ParameterInformation2.create = create;
  })(ParameterInformation = exports2.ParameterInformation || (exports2.ParameterInformation = {}));
  var SignatureInformation;
  (function(SignatureInformation2) {
    function create(label, documentation) {
      var parameters = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        parameters[_i - 2] = arguments[_i];
      }
      var result = {
        label
      };
      if (Is.defined(documentation)) {
        result.documentation = documentation;
      }
      if (Is.defined(parameters)) {
        result.parameters = parameters;
      } else {
        result.parameters = [];
      }
      return result;
    }
    SignatureInformation2.create = create;
  })(SignatureInformation = exports2.SignatureInformation || (exports2.SignatureInformation = {}));
  var DocumentHighlightKind;
  (function(DocumentHighlightKind2) {
    DocumentHighlightKind2.Text = 1;
    DocumentHighlightKind2.Read = 2;
    DocumentHighlightKind2.Write = 3;
  })(DocumentHighlightKind = exports2.DocumentHighlightKind || (exports2.DocumentHighlightKind = {}));
  var DocumentHighlight;
  (function(DocumentHighlight2) {
    function create(range, kind) {
      var result = {
        range
      };
      if (Is.number(kind)) {
        result.kind = kind;
      }
      return result;
    }
    DocumentHighlight2.create = create;
  })(DocumentHighlight = exports2.DocumentHighlight || (exports2.DocumentHighlight = {}));
  var SymbolKind;
  (function(SymbolKind2) {
    SymbolKind2.File = 1;
    SymbolKind2.Module = 2;
    SymbolKind2.Namespace = 3;
    SymbolKind2.Package = 4;
    SymbolKind2.Class = 5;
    SymbolKind2.Method = 6;
    SymbolKind2.Property = 7;
    SymbolKind2.Field = 8;
    SymbolKind2.Constructor = 9;
    SymbolKind2.Enum = 10;
    SymbolKind2.Interface = 11;
    SymbolKind2.Function = 12;
    SymbolKind2.Variable = 13;
    SymbolKind2.Constant = 14;
    SymbolKind2.String = 15;
    SymbolKind2.Number = 16;
    SymbolKind2.Boolean = 17;
    SymbolKind2.Array = 18;
    SymbolKind2.Object = 19;
    SymbolKind2.Key = 20;
    SymbolKind2.Null = 21;
    SymbolKind2.EnumMember = 22;
    SymbolKind2.Struct = 23;
    SymbolKind2.Event = 24;
    SymbolKind2.Operator = 25;
    SymbolKind2.TypeParameter = 26;
  })(SymbolKind = exports2.SymbolKind || (exports2.SymbolKind = {}));
  var SymbolTag;
  (function(SymbolTag2) {
    SymbolTag2.Deprecated = 1;
  })(SymbolTag = exports2.SymbolTag || (exports2.SymbolTag = {}));
  var SymbolInformation;
  (function(SymbolInformation2) {
    function create(name, kind, range, uri, containerName) {
      var result = {
        name,
        kind,
        location: {
          uri,
          range
        }
      };
      if (containerName) {
        result.containerName = containerName;
      }
      return result;
    }
    SymbolInformation2.create = create;
  })(SymbolInformation = exports2.SymbolInformation || (exports2.SymbolInformation = {}));
  var DocumentSymbol;
  (function(DocumentSymbol2) {
    function create(name, detail, kind, range, selectionRange, children) {
      var result = {
        name,
        detail,
        kind,
        range,
        selectionRange
      };
      if (children !== void 0) {
        result.children = children;
      }
      return result;
    }
    DocumentSymbol2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children));
    }
    DocumentSymbol2.is = is;
  })(DocumentSymbol = exports2.DocumentSymbol || (exports2.DocumentSymbol = {}));
  var CodeActionKind;
  (function(CodeActionKind2) {
    CodeActionKind2.Empty = "";
    CodeActionKind2.QuickFix = "quickfix";
    CodeActionKind2.Refactor = "refactor";
    CodeActionKind2.RefactorExtract = "refactor.extract";
    CodeActionKind2.RefactorInline = "refactor.inline";
    CodeActionKind2.RefactorRewrite = "refactor.rewrite";
    CodeActionKind2.Source = "source";
    CodeActionKind2.SourceOrganizeImports = "source.organizeImports";
    CodeActionKind2.SourceFixAll = "source.fixAll";
  })(CodeActionKind = exports2.CodeActionKind || (exports2.CodeActionKind = {}));
  var CodeActionContext;
  (function(CodeActionContext2) {
    function create(diagnostics, only) {
      var result = {
        diagnostics
      };
      if (only !== void 0 && only !== null) {
        result.only = only;
      }
      return result;
    }
    CodeActionContext2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
    }
    CodeActionContext2.is = is;
  })(CodeActionContext = exports2.CodeActionContext || (exports2.CodeActionContext = {}));
  var CodeAction;
  (function(CodeAction2) {
    function create(title, commandOrEdit, kind) {
      var result = {
        title
      };
      if (Command.is(commandOrEdit)) {
        result.command = commandOrEdit;
      } else {
        result.edit = commandOrEdit;
      }
      if (kind !== void 0) {
        result.kind = kind;
      }
      return result;
    }
    CodeAction2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction2.is = is;
  })(CodeAction = exports2.CodeAction || (exports2.CodeAction = {}));
  var CodeLens;
  (function(CodeLens2) {
    function create(range, data) {
      var result = {
        range
      };
      if (Is.defined(data)) {
        result.data = data;
      }
      return result;
    }
    CodeLens2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens2.is = is;
  })(CodeLens = exports2.CodeLens || (exports2.CodeLens = {}));
  var FormattingOptions;
  (function(FormattingOptions2) {
    function create(tabSize, insertSpaces) {
      return {
        tabSize,
        insertSpaces
      };
    }
    FormattingOptions2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.number(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions2.is = is;
  })(FormattingOptions = exports2.FormattingOptions || (exports2.FormattingOptions = {}));
  var DocumentLink;
  (function(DocumentLink2) {
    function create(range, target, data) {
      return {
        range,
        target,
        data
      };
    }
    DocumentLink2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink2.is = is;
  })(DocumentLink = exports2.DocumentLink || (exports2.DocumentLink = {}));
  var SelectionRange;
  (function(SelectionRange2) {
    function create(range, parent) {
      return {
        range,
        parent
      };
    }
    SelectionRange2.create = create;
    function is(value) {
      var candidate = value;
      return candidate !== void 0 && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
    }
    SelectionRange2.is = is;
  })(SelectionRange = exports2.SelectionRange || (exports2.SelectionRange = {}));
  exports2.EOL = ["\n", "\r\n", "\r"];
  var TextDocument;
  (function(TextDocument2) {
    function create(uri, languageId, version, content) {
      return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.number(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument2.is = is;
    function applyEdits(document, edits) {
      var text = document.getText();
      var sortedEdits = mergeSort(edits, function(a, b) {
        var diff = a.range.start.line - b.range.start.line;
        if (diff === 0) {
          return a.range.start.character - b.range.start.character;
        }
        return diff;
      });
      var lastModifiedOffset = text.length;
      for (var i = sortedEdits.length - 1; i >= 0; i--) {
        var e = sortedEdits[i];
        var startOffset = document.offsetAt(e.range.start);
        var endOffset = document.offsetAt(e.range.end);
        if (endOffset <= lastModifiedOffset) {
          text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
        } else {
          throw new Error("Overlapping edit");
        }
        lastModifiedOffset = startOffset;
      }
      return text;
    }
    TextDocument2.applyEdits = applyEdits;
    function mergeSort(data, compare) {
      if (data.length <= 1) {
        return data;
      }
      var p = data.length / 2 | 0;
      var left = data.slice(0, p);
      var right = data.slice(p);
      mergeSort(left, compare);
      mergeSort(right, compare);
      var leftIdx = 0;
      var rightIdx = 0;
      var i = 0;
      while (leftIdx < left.length && rightIdx < right.length) {
        var ret = compare(left[leftIdx], right[rightIdx]);
        if (ret <= 0) {
          data[i++] = left[leftIdx++];
        } else {
          data[i++] = right[rightIdx++];
        }
      }
      while (leftIdx < left.length) {
        data[i++] = left[leftIdx++];
      }
      while (rightIdx < right.length) {
        data[i++] = right[rightIdx++];
      }
      return data;
    }
  })(TextDocument = exports2.TextDocument || (exports2.TextDocument = {}));
  var FullTextDocument = function() {
    function FullTextDocument2(uri, languageId, version, content) {
      this._uri = uri;
      this._languageId = languageId;
      this._version = version;
      this._content = content;
      this._lineOffsets = void 0;
    }
    Object.defineProperty(FullTextDocument2.prototype, "uri", {
      get: function() {
        return this._uri;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(FullTextDocument2.prototype, "languageId", {
      get: function() {
        return this._languageId;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(FullTextDocument2.prototype, "version", {
      get: function() {
        return this._version;
      },
      enumerable: true,
      configurable: true
    });
    FullTextDocument2.prototype.getText = function(range) {
      if (range) {
        var start = this.offsetAt(range.start);
        var end = this.offsetAt(range.end);
        return this._content.substring(start, end);
      }
      return this._content;
    };
    FullTextDocument2.prototype.update = function(event, version) {
      this._content = event.text;
      this._version = version;
      this._lineOffsets = void 0;
    };
    FullTextDocument2.prototype.getLineOffsets = function() {
      if (this._lineOffsets === void 0) {
        var lineOffsets = [];
        var text = this._content;
        var isLineStart = true;
        for (var i = 0; i < text.length; i++) {
          if (isLineStart) {
            lineOffsets.push(i);
            isLineStart = false;
          }
          var ch = text.charAt(i);
          isLineStart = ch === "\r" || ch === "\n";
          if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
            i++;
          }
        }
        if (isLineStart && text.length > 0) {
          lineOffsets.push(text.length);
        }
        this._lineOffsets = lineOffsets;
      }
      return this._lineOffsets;
    };
    FullTextDocument2.prototype.positionAt = function(offset) {
      offset = Math.max(Math.min(offset, this._content.length), 0);
      var lineOffsets = this.getLineOffsets();
      var low = 0, high = lineOffsets.length;
      if (high === 0) {
        return Position.create(0, offset);
      }
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (lineOffsets[mid] > offset) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }
      var line = low - 1;
      return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument2.prototype.offsetAt = function(position) {
      var lineOffsets = this.getLineOffsets();
      if (position.line >= lineOffsets.length) {
        return this._content.length;
      } else if (position.line < 0) {
        return 0;
      }
      var lineOffset = lineOffsets[position.line];
      var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
      return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument2.prototype, "lineCount", {
      get: function() {
        return this.getLineOffsets().length;
      },
      enumerable: true,
      configurable: true
    });
    return FullTextDocument2;
  }();
  var Is;
  (function(Is2) {
    var toString = Object.prototype.toString;
    function defined(value) {
      return typeof value !== "undefined";
    }
    Is2.defined = defined;
    function undefined2(value) {
      return typeof value === "undefined";
    }
    Is2.undefined = undefined2;
    function boolean(value) {
      return value === true || value === false;
    }
    Is2.boolean = boolean;
    function string(value) {
      return toString.call(value) === "[object String]";
    }
    Is2.string = string;
    function number(value) {
      return toString.call(value) === "[object Number]";
    }
    Is2.number = number;
    function func(value) {
      return toString.call(value) === "[object Function]";
    }
    Is2.func = func;
    function objectLiteral(value) {
      return value !== null && typeof value === "object";
    }
    Is2.objectLiteral = objectLiteral;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    Is2.typedArray = typedArray;
  })(Is || (Is = {}));
});
define("vscode-languageserver-types", ["vscode-languageserver-types/main"], function(main) {
  return main;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-languageserver-textdocument/main", ["require", "exports"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var FullTextDocument = function() {
    function FullTextDocument2(uri, languageId, version, content) {
      this._uri = uri;
      this._languageId = languageId;
      this._version = version;
      this._content = content;
      this._lineOffsets = void 0;
    }
    Object.defineProperty(FullTextDocument2.prototype, "uri", {
      get: function() {
        return this._uri;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(FullTextDocument2.prototype, "languageId", {
      get: function() {
        return this._languageId;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(FullTextDocument2.prototype, "version", {
      get: function() {
        return this._version;
      },
      enumerable: true,
      configurable: true
    });
    FullTextDocument2.prototype.getText = function(range) {
      if (range) {
        var start = this.offsetAt(range.start);
        var end = this.offsetAt(range.end);
        return this._content.substring(start, end);
      }
      return this._content;
    };
    FullTextDocument2.prototype.update = function(changes, version) {
      for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
        var change = changes_1[_i];
        if (FullTextDocument2.isIncremental(change)) {
          var range = getWellformedRange(change.range);
          var startOffset = this.offsetAt(range.start);
          var endOffset = this.offsetAt(range.end);
          this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
          var startLine = Math.max(range.start.line, 0);
          var endLine = Math.max(range.end.line, 0);
          var lineOffsets = this._lineOffsets;
          var addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
          if (endLine - startLine === addedLineOffsets.length) {
            for (var i = 0, len = addedLineOffsets.length; i < len; i++) {
              lineOffsets[i + startLine + 1] = addedLineOffsets[i];
            }
          } else {
            if (addedLineOffsets.length < 10000) {
              lineOffsets.splice.apply(lineOffsets, [startLine + 1, endLine - startLine].concat(addedLineOffsets));
            } else {
              this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
            }
          }
          var diff = change.text.length - (endOffset - startOffset);
          if (diff !== 0) {
            for (var i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
              lineOffsets[i] = lineOffsets[i] + diff;
            }
          }
        } else if (FullTextDocument2.isFull(change)) {
          this._content = change.text;
          this._lineOffsets = void 0;
        } else {
          throw new Error("Unknown change event received");
        }
      }
      this._version = version;
    };
    FullTextDocument2.prototype.getLineOffsets = function() {
      if (this._lineOffsets === void 0) {
        this._lineOffsets = computeLineOffsets(this._content, true);
      }
      return this._lineOffsets;
    };
    FullTextDocument2.prototype.positionAt = function(offset) {
      offset = Math.max(Math.min(offset, this._content.length), 0);
      var lineOffsets = this.getLineOffsets();
      var low = 0, high = lineOffsets.length;
      if (high === 0) {
        return {
          line: 0,
          character: offset
        };
      }
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (lineOffsets[mid] > offset) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }
      var line = low - 1;
      return {
        line,
        character: offset - lineOffsets[line]
      };
    };
    FullTextDocument2.prototype.offsetAt = function(position) {
      var lineOffsets = this.getLineOffsets();
      if (position.line >= lineOffsets.length) {
        return this._content.length;
      } else if (position.line < 0) {
        return 0;
      }
      var lineOffset = lineOffsets[position.line];
      var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
      return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument2.prototype, "lineCount", {
      get: function() {
        return this.getLineOffsets().length;
      },
      enumerable: true,
      configurable: true
    });
    FullTextDocument2.isIncremental = function(event) {
      var candidate = event;
      return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
    };
    FullTextDocument2.isFull = function(event) {
      var candidate = event;
      return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
    };
    return FullTextDocument2;
  }();
  var TextDocument;
  (function(TextDocument2) {
    function create(uri, languageId, version, content) {
      return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument2.create = create;
    function update(document, changes, version) {
      if (document instanceof FullTextDocument) {
        document.update(changes, version);
        return document;
      } else {
        throw new Error("TextDocument.update: document must be created by TextDocument.create");
      }
    }
    TextDocument2.update = update;
    function applyEdits(document, edits) {
      var text = document.getText();
      var sortedEdits = mergeSort(edits.map(getWellformedEdit), function(a, b) {
        var diff = a.range.start.line - b.range.start.line;
        if (diff === 0) {
          return a.range.start.character - b.range.start.character;
        }
        return diff;
      });
      var lastModifiedOffset = text.length;
      for (var i = sortedEdits.length - 1; i >= 0; i--) {
        var e = sortedEdits[i];
        var startOffset = document.offsetAt(e.range.start);
        var endOffset = document.offsetAt(e.range.end);
        if (endOffset <= lastModifiedOffset) {
          text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
        } else {
          throw new Error("Overlapping edit");
        }
        lastModifiedOffset = startOffset;
      }
      return text;
    }
    TextDocument2.applyEdits = applyEdits;
  })(TextDocument = exports2.TextDocument || (exports2.TextDocument = {}));
  function mergeSort(data, compare) {
    if (data.length <= 1) {
      return data;
    }
    var p = data.length / 2 | 0;
    var left = data.slice(0, p);
    var right = data.slice(p);
    mergeSort(left, compare);
    mergeSort(right, compare);
    var leftIdx = 0;
    var rightIdx = 0;
    var i = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
      var ret = compare(left[leftIdx], right[rightIdx]);
      if (ret <= 0) {
        data[i++] = left[leftIdx++];
      } else {
        data[i++] = right[rightIdx++];
      }
    }
    while (leftIdx < left.length) {
      data[i++] = left[leftIdx++];
    }
    while (rightIdx < right.length) {
      data[i++] = right[rightIdx++];
    }
    return data;
  }
  function computeLineOffsets(text, isAtLineStart, textOffset) {
    if (textOffset === void 0) {
      textOffset = 0;
    }
    var result = isAtLineStart ? [textOffset] : [];
    for (var i = 0; i < text.length; i++) {
      var ch = text.charCodeAt(i);
      if (ch === 13 || ch === 10) {
        if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
          i++;
        }
        result.push(textOffset + i + 1);
      }
    }
    return result;
  }
  function getWellformedRange(range) {
    var start = range.start;
    var end = range.end;
    if (start.line > end.line || start.line === end.line && start.character > end.character) {
      return {
        start: end,
        end: start
      };
    }
    return range;
  }
  function getWellformedEdit(textEdit) {
    var range = getWellformedRange(textEdit.range);
    if (range !== textEdit.range) {
      return {
        newText: textEdit.newText,
        range
      };
    }
    return textEdit;
  }
});
define("vscode-languageserver-textdocument", ["vscode-languageserver-textdocument/main"], function(main) {
  return main;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/jsonLanguageTypes", ["require", "exports", "vscode-languageserver-types", "vscode-languageserver-textdocument", "vscode-languageserver-types"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  function __export2(m) {
    for (var p in m)
      if (!exports2.hasOwnProperty(p))
        exports2[p] = m[p];
  }
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var vscode_languageserver_types_1 = require2("vscode-languageserver-types");
  var vscode_languageserver_textdocument_1 = require2("vscode-languageserver-textdocument");
  exports2.TextDocument = vscode_languageserver_textdocument_1.TextDocument;
  __export2(require2("vscode-languageserver-types"));
  var ErrorCode;
  (function(ErrorCode2) {
    ErrorCode2[ErrorCode2["Undefined"] = 0] = "Undefined";
    ErrorCode2[ErrorCode2["EnumValueMismatch"] = 1] = "EnumValueMismatch";
    ErrorCode2[ErrorCode2["UnexpectedEndOfComment"] = 257] = "UnexpectedEndOfComment";
    ErrorCode2[ErrorCode2["UnexpectedEndOfString"] = 258] = "UnexpectedEndOfString";
    ErrorCode2[ErrorCode2["UnexpectedEndOfNumber"] = 259] = "UnexpectedEndOfNumber";
    ErrorCode2[ErrorCode2["InvalidUnicode"] = 260] = "InvalidUnicode";
    ErrorCode2[ErrorCode2["InvalidEscapeCharacter"] = 261] = "InvalidEscapeCharacter";
    ErrorCode2[ErrorCode2["InvalidCharacter"] = 262] = "InvalidCharacter";
    ErrorCode2[ErrorCode2["PropertyExpected"] = 513] = "PropertyExpected";
    ErrorCode2[ErrorCode2["CommaExpected"] = 514] = "CommaExpected";
    ErrorCode2[ErrorCode2["ColonExpected"] = 515] = "ColonExpected";
    ErrorCode2[ErrorCode2["ValueExpected"] = 516] = "ValueExpected";
    ErrorCode2[ErrorCode2["CommaOrCloseBacketExpected"] = 517] = "CommaOrCloseBacketExpected";
    ErrorCode2[ErrorCode2["CommaOrCloseBraceExpected"] = 518] = "CommaOrCloseBraceExpected";
    ErrorCode2[ErrorCode2["TrailingComma"] = 519] = "TrailingComma";
    ErrorCode2[ErrorCode2["DuplicateKey"] = 520] = "DuplicateKey";
    ErrorCode2[ErrorCode2["CommentNotPermitted"] = 521] = "CommentNotPermitted";
    ErrorCode2[ErrorCode2["SchemaResolveError"] = 768] = "SchemaResolveError";
  })(ErrorCode = exports2.ErrorCode || (exports2.ErrorCode = {}));
  var ClientCapabilities;
  (function(ClientCapabilities2) {
    ClientCapabilities2.LATEST = {
      textDocument: {
        completion: {
          completionItem: {
            documentationFormat: [vscode_languageserver_types_1.MarkupKind.Markdown, vscode_languageserver_types_1.MarkupKind.PlainText],
            commitCharactersSupport: true
          }
        }
      }
    };
  })(ClientCapabilities = exports2.ClientCapabilities || (exports2.ClientCapabilities = {}));
});
define("vscode-nls/vscode-nls", ["require", "exports"], function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  function format(message, args) {
    var result;
    if (args.length === 0) {
      result = message;
    } else {
      result = message.replace(/\{(\d+)\}/g, function(match, rest) {
        var index = rest[0];
        return typeof args[index] !== "undefined" ? args[index] : match;
      });
    }
    return result;
  }
  function localize(key, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return format(message, args);
  }
  function loadMessageBundle(file) {
    return localize;
  }
  exports2.loadMessageBundle = loadMessageBundle;
  function config(opt) {
    return loadMessageBundle;
  }
  exports2.config = config;
});
define("vscode-nls", ["vscode-nls/vscode-nls"], function(main) {
  return main;
});
var __extends = this && this.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/parser/jsonParser", ["require", "exports", "jsonc-parser", "../utils/objects", "../jsonLanguageTypes", "vscode-nls"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var Json = require2("jsonc-parser");
  var objects_1 = require2("../utils/objects");
  var jsonLanguageTypes_1 = require2("../jsonLanguageTypes");
  var nls = require2("vscode-nls");
  var localize = nls.loadMessageBundle();
  var formats = {
    "color-hex": {
      errorMessage: localize("colorHexFormatWarning", "Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."),
      pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/
    },
    "date-time": {
      errorMessage: localize("dateTimeFormatWarning", "String is not a RFC3339 date-time."),
      pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
    },
    date: {
      errorMessage: localize("dateFormatWarning", "String is not a RFC3339 date."),
      pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i
    },
    time: {
      errorMessage: localize("timeFormatWarning", "String is not a RFC3339 time."),
      pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
    },
    email: {
      errorMessage: localize("emailFormatWarning", "String is not an e-mail address."),
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  };
  var ASTNodeImpl = function() {
    function ASTNodeImpl2(parent, offset, length) {
      this.offset = offset;
      this.length = length;
      this.parent = parent;
    }
    Object.defineProperty(ASTNodeImpl2.prototype, "children", {
      get: function() {
        return [];
      },
      enumerable: true,
      configurable: true
    });
    ASTNodeImpl2.prototype.toString = function() {
      return "type: " + this.type + " (" + this.offset + "/" + this.length + ")" + (this.parent ? " parent: {" + this.parent.toString() + "}" : "");
    };
    return ASTNodeImpl2;
  }();
  exports2.ASTNodeImpl = ASTNodeImpl;
  var NullASTNodeImpl = function(_super) {
    __extends(NullASTNodeImpl2, _super);
    function NullASTNodeImpl2(parent, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = "null";
      _this.value = null;
      return _this;
    }
    return NullASTNodeImpl2;
  }(ASTNodeImpl);
  exports2.NullASTNodeImpl = NullASTNodeImpl;
  var BooleanASTNodeImpl = function(_super) {
    __extends(BooleanASTNodeImpl2, _super);
    function BooleanASTNodeImpl2(parent, boolValue, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = "boolean";
      _this.value = boolValue;
      return _this;
    }
    return BooleanASTNodeImpl2;
  }(ASTNodeImpl);
  exports2.BooleanASTNodeImpl = BooleanASTNodeImpl;
  var ArrayASTNodeImpl = function(_super) {
    __extends(ArrayASTNodeImpl2, _super);
    function ArrayASTNodeImpl2(parent, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = "array";
      _this.items = [];
      return _this;
    }
    Object.defineProperty(ArrayASTNodeImpl2.prototype, "children", {
      get: function() {
        return this.items;
      },
      enumerable: true,
      configurable: true
    });
    return ArrayASTNodeImpl2;
  }(ASTNodeImpl);
  exports2.ArrayASTNodeImpl = ArrayASTNodeImpl;
  var NumberASTNodeImpl = function(_super) {
    __extends(NumberASTNodeImpl2, _super);
    function NumberASTNodeImpl2(parent, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = "number";
      _this.isInteger = true;
      _this.value = Number.NaN;
      return _this;
    }
    return NumberASTNodeImpl2;
  }(ASTNodeImpl);
  exports2.NumberASTNodeImpl = NumberASTNodeImpl;
  var StringASTNodeImpl = function(_super) {
    __extends(StringASTNodeImpl2, _super);
    function StringASTNodeImpl2(parent, offset, length) {
      var _this = _super.call(this, parent, offset, length) || this;
      _this.type = "string";
      _this.value = "";
      return _this;
    }
    return StringASTNodeImpl2;
  }(ASTNodeImpl);
  exports2.StringASTNodeImpl = StringASTNodeImpl;
  var PropertyASTNodeImpl = function(_super) {
    __extends(PropertyASTNodeImpl2, _super);
    function PropertyASTNodeImpl2(parent, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = "property";
      _this.colonOffset = -1;
      return _this;
    }
    Object.defineProperty(PropertyASTNodeImpl2.prototype, "children", {
      get: function() {
        return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
      },
      enumerable: true,
      configurable: true
    });
    return PropertyASTNodeImpl2;
  }(ASTNodeImpl);
  exports2.PropertyASTNodeImpl = PropertyASTNodeImpl;
  var ObjectASTNodeImpl = function(_super) {
    __extends(ObjectASTNodeImpl2, _super);
    function ObjectASTNodeImpl2(parent, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = "object";
      _this.properties = [];
      return _this;
    }
    Object.defineProperty(ObjectASTNodeImpl2.prototype, "children", {
      get: function() {
        return this.properties;
      },
      enumerable: true,
      configurable: true
    });
    return ObjectASTNodeImpl2;
  }(ASTNodeImpl);
  exports2.ObjectASTNodeImpl = ObjectASTNodeImpl;
  function asSchema(schema) {
    if (objects_1.isBoolean(schema)) {
      return schema ? {} : {
        not: {}
      };
    }
    return schema;
  }
  exports2.asSchema = asSchema;
  var EnumMatch;
  (function(EnumMatch2) {
    EnumMatch2[EnumMatch2["Key"] = 0] = "Key";
    EnumMatch2[EnumMatch2["Enum"] = 1] = "Enum";
  })(EnumMatch = exports2.EnumMatch || (exports2.EnumMatch = {}));
  var SchemaCollector = function() {
    function SchemaCollector2(focusOffset, exclude) {
      if (focusOffset === void 0) {
        focusOffset = -1;
      }
      if (exclude === void 0) {
        exclude = null;
      }
      this.focusOffset = focusOffset;
      this.exclude = exclude;
      this.schemas = [];
    }
    SchemaCollector2.prototype.add = function(schema) {
      this.schemas.push(schema);
    };
    SchemaCollector2.prototype.merge = function(other) {
      var _a;
      (_a = this.schemas).push.apply(_a, other.schemas);
    };
    SchemaCollector2.prototype.include = function(node) {
      return (this.focusOffset === -1 || contains(node, this.focusOffset)) && node !== this.exclude;
    };
    SchemaCollector2.prototype.newSub = function() {
      return new SchemaCollector2(-1, this.exclude);
    };
    return SchemaCollector2;
  }();
  var NoOpSchemaCollector = function() {
    function NoOpSchemaCollector2() {
    }
    Object.defineProperty(NoOpSchemaCollector2.prototype, "schemas", {
      get: function() {
        return [];
      },
      enumerable: true,
      configurable: true
    });
    NoOpSchemaCollector2.prototype.add = function(schema) {
    };
    NoOpSchemaCollector2.prototype.merge = function(other) {
    };
    NoOpSchemaCollector2.prototype.include = function(node) {
      return true;
    };
    NoOpSchemaCollector2.prototype.newSub = function() {
      return this;
    };
    NoOpSchemaCollector2.instance = new NoOpSchemaCollector2();
    return NoOpSchemaCollector2;
  }();
  var ValidationResult = function() {
    function ValidationResult2() {
      this.problems = [];
      this.propertiesMatches = 0;
      this.propertiesValueMatches = 0;
      this.primaryValueMatches = 0;
      this.enumValueMatch = false;
      this.enumValues = null;
    }
    ValidationResult2.prototype.hasProblems = function() {
      return !!this.problems.length;
    };
    ValidationResult2.prototype.mergeAll = function(validationResults) {
      for (var _i = 0, validationResults_1 = validationResults; _i < validationResults_1.length; _i++) {
        var validationResult = validationResults_1[_i];
        this.merge(validationResult);
      }
    };
    ValidationResult2.prototype.merge = function(validationResult) {
      this.problems = this.problems.concat(validationResult.problems);
    };
    ValidationResult2.prototype.mergeEnumValues = function(validationResult) {
      if (!this.enumValueMatch && !validationResult.enumValueMatch && this.enumValues && validationResult.enumValues) {
        this.enumValues = this.enumValues.concat(validationResult.enumValues);
        for (var _i = 0, _a = this.problems; _i < _a.length; _i++) {
          var error = _a[_i];
          if (error.code === jsonLanguageTypes_1.ErrorCode.EnumValueMismatch) {
            error.message = localize("enumWarning", "Value is not accepted. Valid values: {0}.", this.enumValues.map(function(v) {
              return JSON.stringify(v);
            }).join(", "));
          }
        }
      }
    };
    ValidationResult2.prototype.mergePropertyMatch = function(propertyValidationResult) {
      this.merge(propertyValidationResult);
      this.propertiesMatches++;
      if (propertyValidationResult.enumValueMatch || !propertyValidationResult.hasProblems() && propertyValidationResult.propertiesMatches) {
        this.propertiesValueMatches++;
      }
      if (propertyValidationResult.enumValueMatch && propertyValidationResult.enumValues && propertyValidationResult.enumValues.length === 1) {
        this.primaryValueMatches++;
      }
    };
    ValidationResult2.prototype.compare = function(other) {
      var hasProblems = this.hasProblems();
      if (hasProblems !== other.hasProblems()) {
        return hasProblems ? -1 : 1;
      }
      if (this.enumValueMatch !== other.enumValueMatch) {
        return other.enumValueMatch ? -1 : 1;
      }
      if (this.primaryValueMatches !== other.primaryValueMatches) {
        return this.primaryValueMatches - other.primaryValueMatches;
      }
      if (this.propertiesValueMatches !== other.propertiesValueMatches) {
        return this.propertiesValueMatches - other.propertiesValueMatches;
      }
      return this.propertiesMatches - other.propertiesMatches;
    };
    return ValidationResult2;
  }();
  exports2.ValidationResult = ValidationResult;
  function newJSONDocument(root, diagnostics) {
    if (diagnostics === void 0) {
      diagnostics = [];
    }
    return new JSONDocument(root, diagnostics, []);
  }
  exports2.newJSONDocument = newJSONDocument;
  function getNodeValue(node) {
    return Json.getNodeValue(node);
  }
  exports2.getNodeValue = getNodeValue;
  function getNodePath(node) {
    return Json.getNodePath(node);
  }
  exports2.getNodePath = getNodePath;
  function contains(node, offset, includeRightBound) {
    if (includeRightBound === void 0) {
      includeRightBound = false;
    }
    return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
  }
  exports2.contains = contains;
  var JSONDocument = function() {
    function JSONDocument2(root, syntaxErrors, comments) {
      if (syntaxErrors === void 0) {
        syntaxErrors = [];
      }
      if (comments === void 0) {
        comments = [];
      }
      this.root = root;
      this.syntaxErrors = syntaxErrors;
      this.comments = comments;
    }
    JSONDocument2.prototype.getNodeFromOffset = function(offset, includeRightBound) {
      if (includeRightBound === void 0) {
        includeRightBound = false;
      }
      if (this.root) {
        return Json.findNodeAtOffset(this.root, offset, includeRightBound);
      }
      return void 0;
    };
    JSONDocument2.prototype.visit = function(visitor) {
      if (this.root) {
        var doVisit_1 = function(node) {
          var ctn = visitor(node);
          var children = node.children;
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length && ctn; i++) {
              ctn = doVisit_1(children[i]);
            }
          }
          return ctn;
        };
        doVisit_1(this.root);
      }
    };
    JSONDocument2.prototype.validate = function(textDocument, schema) {
      if (this.root && schema) {
        var validationResult = new ValidationResult();
        validate(this.root, schema, validationResult, NoOpSchemaCollector.instance);
        return validationResult.problems.map(function(p) {
          var range = jsonLanguageTypes_1.Range.create(textDocument.positionAt(p.location.offset), textDocument.positionAt(p.location.offset + p.location.length));
          return jsonLanguageTypes_1.Diagnostic.create(range, p.message, p.severity, p.code);
        });
      }
      return null;
    };
    JSONDocument2.prototype.getMatchingSchemas = function(schema, focusOffset, exclude) {
      if (focusOffset === void 0) {
        focusOffset = -1;
      }
      if (exclude === void 0) {
        exclude = null;
      }
      var matchingSchemas = new SchemaCollector(focusOffset, exclude);
      if (this.root && schema) {
        validate(this.root, schema, new ValidationResult(), matchingSchemas);
      }
      return matchingSchemas.schemas;
    };
    return JSONDocument2;
  }();
  exports2.JSONDocument = JSONDocument;
  function validate(node, schema, validationResult, matchingSchemas) {
    if (!node || !matchingSchemas.include(node)) {
      return;
    }
    switch (node.type) {
      case "object":
        _validateObjectNode(node, schema, validationResult, matchingSchemas);
        break;
      case "array":
        _validateArrayNode(node, schema, validationResult, matchingSchemas);
        break;
      case "string":
        _validateStringNode(node, schema, validationResult, matchingSchemas);
        break;
      case "number":
        _validateNumberNode(node, schema, validationResult, matchingSchemas);
        break;
      case "property":
        return validate(node.valueNode, schema, validationResult, matchingSchemas);
    }
    _validateNode();
    matchingSchemas.add({
      node,
      schema
    });
    function _validateNode() {
      function matchesType(type) {
        return node.type === type || type === "integer" && node.type === "number" && node.isInteger;
      }
      if (Array.isArray(schema.type)) {
        if (!schema.type.some(matchesType)) {
          validationResult.problems.push({
            location: {
              offset: node.offset,
              length: node.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: schema.errorMessage || localize("typeArrayMismatchWarning", "Incorrect type. Expected one of {0}.", schema.type.join(", "))
          });
        }
      } else if (schema.type) {
        if (!matchesType(schema.type)) {
          validationResult.problems.push({
            location: {
              offset: node.offset,
              length: node.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: schema.errorMessage || localize("typeMismatchWarning", 'Incorrect type. Expected "{0}".', schema.type)
          });
        }
      }
      if (Array.isArray(schema.allOf)) {
        for (var _i = 0, _a = schema.allOf; _i < _a.length; _i++) {
          var subSchemaRef = _a[_i];
          validate(node, asSchema(subSchemaRef), validationResult, matchingSchemas);
        }
      }
      var notSchema = asSchema(schema.not);
      if (notSchema) {
        var subValidationResult = new ValidationResult();
        var subMatchingSchemas = matchingSchemas.newSub();
        validate(node, notSchema, subValidationResult, subMatchingSchemas);
        if (!subValidationResult.hasProblems()) {
          validationResult.problems.push({
            location: {
              offset: node.offset,
              length: node.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize("notSchemaWarning", "Matches a schema that is not allowed.")
          });
        }
        for (var _b = 0, _c = subMatchingSchemas.schemas; _b < _c.length; _b++) {
          var ms = _c[_b];
          ms.inverted = !ms.inverted;
          matchingSchemas.add(ms);
        }
      }
      var testAlternatives = function(alternatives, maxOneMatch) {
        var matches = [];
        var bestMatch = null;
        for (var _i2 = 0, alternatives_1 = alternatives; _i2 < alternatives_1.length; _i2++) {
          var subSchemaRef2 = alternatives_1[_i2];
          var subSchema = asSchema(subSchemaRef2);
          var subValidationResult2 = new ValidationResult();
          var subMatchingSchemas2 = matchingSchemas.newSub();
          validate(node, subSchema, subValidationResult2, subMatchingSchemas2);
          if (!subValidationResult2.hasProblems()) {
            matches.push(subSchema);
          }
          if (!bestMatch) {
            bestMatch = {
              schema: subSchema,
              validationResult: subValidationResult2,
              matchingSchemas: subMatchingSchemas2
            };
          } else {
            if (!maxOneMatch && !subValidationResult2.hasProblems() && !bestMatch.validationResult.hasProblems()) {
              bestMatch.matchingSchemas.merge(subMatchingSchemas2);
              bestMatch.validationResult.propertiesMatches += subValidationResult2.propertiesMatches;
              bestMatch.validationResult.propertiesValueMatches += subValidationResult2.propertiesValueMatches;
            } else {
              var compareResult = subValidationResult2.compare(bestMatch.validationResult);
              if (compareResult > 0) {
                bestMatch = {
                  schema: subSchema,
                  validationResult: subValidationResult2,
                  matchingSchemas: subMatchingSchemas2
                };
              } else if (compareResult === 0) {
                bestMatch.matchingSchemas.merge(subMatchingSchemas2);
                bestMatch.validationResult.mergeEnumValues(subValidationResult2);
              }
            }
          }
        }
        if (matches.length > 1 && maxOneMatch) {
          validationResult.problems.push({
            location: {
              offset: node.offset,
              length: 1
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize("oneOfWarning", "Matches multiple schemas when only one must validate.")
          });
        }
        if (bestMatch !== null) {
          validationResult.merge(bestMatch.validationResult);
          validationResult.propertiesMatches += bestMatch.validationResult.propertiesMatches;
          validationResult.propertiesValueMatches += bestMatch.validationResult.propertiesValueMatches;
          matchingSchemas.merge(bestMatch.matchingSchemas);
        }
        return matches.length;
      };
      if (Array.isArray(schema.anyOf)) {
        testAlternatives(schema.anyOf, false);
      }
      if (Array.isArray(schema.oneOf)) {
        testAlternatives(schema.oneOf, true);
      }
      var testBranch = function(schema2) {
        var subValidationResult2 = new ValidationResult();
        var subMatchingSchemas2 = matchingSchemas.newSub();
        validate(node, asSchema(schema2), subValidationResult2, subMatchingSchemas2);
        validationResult.merge(subValidationResult2);
        validationResult.propertiesMatches += subValidationResult2.propertiesMatches;
        validationResult.propertiesValueMatches += subValidationResult2.propertiesValueMatches;
        matchingSchemas.merge(subMatchingSchemas2);
      };
      var testCondition = function(ifSchema2, thenSchema, elseSchema) {
        var subSchema = asSchema(ifSchema2);
        var subValidationResult2 = new ValidationResult();
        var subMatchingSchemas2 = matchingSchemas.newSub();
        validate(node, subSchema, subValidationResult2, subMatchingSchemas2);
        matchingSchemas.merge(subMatchingSchemas2);
        if (!subValidationResult2.hasProblems()) {
          if (thenSchema) {
            testBranch(thenSchema);
          }
        } else if (elseSchema) {
          testBranch(elseSchema);
        }
      };
      var ifSchema = asSchema(schema.if);
      if (ifSchema) {
        testCondition(ifSchema, asSchema(schema.then), asSchema(schema.else));
      }
      if (Array.isArray(schema.enum)) {
        var val = getNodeValue(node);
        var enumValueMatch = false;
        for (var _d = 0, _e = schema.enum; _d < _e.length; _d++) {
          var e = _e[_d];
          if (objects_1.equals(val, e)) {
            enumValueMatch = true;
            break;
          }
        }
        validationResult.enumValues = schema.enum;
        validationResult.enumValueMatch = enumValueMatch;
        if (!enumValueMatch) {
          validationResult.problems.push({
            location: {
              offset: node.offset,
              length: node.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            code: jsonLanguageTypes_1.ErrorCode.EnumValueMismatch,
            message: schema.errorMessage || localize("enumWarning", "Value is not accepted. Valid values: {0}.", schema.enum.map(function(v) {
              return JSON.stringify(v);
            }).join(", "))
          });
        }
      }
      if (objects_1.isDefined(schema.const)) {
        var val = getNodeValue(node);
        if (!objects_1.equals(val, schema.const)) {
          validationResult.problems.push({
            location: {
              offset: node.offset,
              length: node.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            code: jsonLanguageTypes_1.ErrorCode.EnumValueMismatch,
            message: schema.errorMessage || localize("constWarning", "Value must be {0}.", JSON.stringify(schema.const))
          });
          validationResult.enumValueMatch = false;
        } else {
          validationResult.enumValueMatch = true;
        }
        validationResult.enumValues = [schema.const];
      }
      if (schema.deprecationMessage && node.parent) {
        validationResult.problems.push({
          location: {
            offset: node.parent.offset,
            length: node.parent.length
          },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: schema.deprecationMessage
        });
      }
    }
    function _validateNumberNode(node2, schema2, validationResult2, matchingSchemas2) {
      var val = node2.value;
      if (objects_1.isNumber(schema2.multipleOf)) {
        if (val % schema2.multipleOf !== 0) {
          validationResult2.problems.push({
            location: {
              offset: node2.offset,
              length: node2.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize("multipleOfWarning", "Value is not divisible by {0}.", schema2.multipleOf)
          });
        }
      }
      function getExclusiveLimit(limit, exclusive) {
        if (objects_1.isNumber(exclusive)) {
          return exclusive;
        }
        if (objects_1.isBoolean(exclusive) && exclusive) {
          return limit;
        }
        return void 0;
      }
      function getLimit(limit, exclusive) {
        if (!objects_1.isBoolean(exclusive) || !exclusive) {
          return limit;
        }
        return void 0;
      }
      var exclusiveMinimum = getExclusiveLimit(schema2.minimum, schema2.exclusiveMinimum);
      if (objects_1.isNumber(exclusiveMinimum) && val <= exclusiveMinimum) {
        validationResult2.problems.push({
          location: {
            offset: node2.offset,
            length: node2.length
          },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize("exclusiveMinimumWarning", "Value is below the exclusive minimum of {0}.", exclusiveMinimum)
        });
      }
      var exclusiveMaximum = getExclusiveLimit(schema2.maximum, schema2.exclusiveMaximum);
      if (objects_1.isNumber(exclusiveMaximum) && val >= exclusiveMaximum) {
        validationResult2.problems.push({
          location: {
            offset: node2.offset,
            length: node2.length
          },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize("exclusiveMaximumWarning", "Value is above the exclusive maximum of {0}.", exclusiveMaximum)
        });
      }
      var minimum = getLimit(schema2.minimum, schema2.exclusiveMinimum);
      if (objects_1.isNumber(minimum) && val < minimum) {
        validationResult2.problems.push({
          location: {
            offset: node2.offset,
            length: node2.length
          },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize("minimumWarning", "Value is below the minimum of {0}.", minimum)
        });
      }
      var maximum = getLimit(schema2.maximum, schema2.exclusiveMaximum);
      if (objects_1.isNumber(maximum) && val > maximum) {
        validationResult2.problems.push({
          location: {
            offset: node2.offset,
            length: node2.length
          },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize("maximumWarning", "Value is above the maximum of {0}.", maximum)
        });
      }
    }
    function _validateStringNode(node2, schema2, validationResult2, matchingSchemas2) {
      if (objects_1.isNumber(schema2.minLength) && node2.value.length < schema2.minLength) {
        validationResult2.problems.push({
          location: {
            offset: node2.offset,
            length: node2.length
          },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize("minLengthWarning", "String is shorter than the minimum length of {0}.", schema2.minLength)
        });
      }
      if (objects_1.isNumber(schema2.maxLength) && node2.value.length > schema2.maxLength) {
        validationResult2.problems.push({
          location: {
            offset: node2.offset,
            length: node2.length
          },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize("maxLengthWarning", "String is longer than the maximum length of {0}.", schema2.maxLength)
        });
      }
      if (objects_1.isString(schema2.pattern)) {
        var regex = new RegExp(schema2.pattern);
        if (!regex.test(node2.value)) {
          validationResult2.problems.push({
            location: {
              offset: node2.offset,
              length: node2.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: schema2.patternErrorMessage || schema2.errorMessage || localize("patternWarning", 'String does not match the pattern of "{0}".', schema2.pattern)
          });
        }
      }
      if (schema2.format) {
        switch (schema2.format) {
          case "uri":
          case "uri-reference":
            {
              var errorMessage = void 0;
              if (!node2.value) {
                errorMessage = localize("uriEmpty", "URI expected.");
              } else {
                var match = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(node2.value);
                if (!match) {
                  errorMessage = localize("uriMissing", "URI is expected.");
                } else if (!match[2] && schema2.format === "uri") {
                  errorMessage = localize("uriSchemeMissing", "URI with a scheme is expected.");
                }
              }
              if (errorMessage) {
                validationResult2.problems.push({
                  location: {
                    offset: node2.offset,
                    length: node2.length
                  },
                  severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                  message: schema2.patternErrorMessage || schema2.errorMessage || localize("uriFormatWarning", "String is not a URI: {0}", errorMessage)
                });
              }
            }
            break;
          case "color-hex":
          case "date-time":
          case "date":
          case "time":
          case "email":
            var format = formats[schema2.format];
            if (!node2.value || !format.pattern.exec(node2.value)) {
              validationResult2.problems.push({
                location: {
                  offset: node2.offset,
                  length: node2.length
                },
                severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                message: schema2.patternErrorMessage || schema2.errorMessage || format.errorMessage
              });
            }
          default:
        }
      }
    }
    function _validateArrayNode(node2, schema2, validationResult2, matchingSchemas2) {
      if (Array.isArray(schema2.items)) {
        var subSchemas = schema2.items;
        for (var index = 0; index < subSchemas.length; index++) {
          var subSchemaRef = subSchemas[index];
          var subSchema = asSchema(subSchemaRef);
          var itemValidationResult = new ValidationResult();
          var item = node2.items[index];
          if (item) {
            validate(item, subSchema, itemValidationResult, matchingSchemas2);
            validationResult2.mergePropertyMatch(itemValidationResult);
          } else if (node2.items.length >= subSchemas.length) {
            validationResult2.propertiesValueMatches++;
          }
        }
        if (node2.items.length > subSchemas.length) {
          if (typeof schema2.additionalItems === "object") {
            for (var i = subSchemas.length; i < node2.items.length; i++) {
              var itemValidationResult = new ValidationResult();
              validate(node2.items[i], schema2.additionalItems, itemValidationResult, matchingSchemas2);
              validationResult2.mergePropertyMatch(itemValidationResult);
            }
          } else if (schema2.additionalItems === false) {
            validationResult2.problems.push({
              location: {
                offset: node2.offset,
                length: node2.length
              },
              severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
              message: localize("additionalItemsWarning", "Array has too many items according to schema. Expected {0} or fewer.", subSchemas.length)
            });
          }
        }
      } else {
        var itemSchema = asSchema(schema2.items);
        if (itemSchema) {
          for (var _i = 0, _a = node2.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var itemValidationResult = new ValidationResult();
            validate(item, itemSchema, itemValidationResult, matchingSchemas2);
            validationResult2.mergePropertyMatch(itemValidationResult);
          }
        }
      }
      var containsSchema = asSchema(schema2.contains);
      if (containsSchema) {
        var doesContain = node2.items.some(function(item2) {
          var itemValidationResult2 = new ValidationResult();
          validate(item2, containsSchema, itemValidationResult2, NoOpSchemaCollector.instance);
          return !itemValidationResult2.hasProblems();
        });
        if (!doesContain) {
          validationResult2.problems.push({
            location: {
              offset: node2.offset,
              length: node2.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: schema2.errorMessage || localize("requiredItemMissingWarning", "Array does not contain required item.")
          });
        }
      }
      if (objects_1.isNumber(schema2.minItems) && node2.items.length < schema2.minItems) {
        validationResult2.problems.push({
          location: {
            offset: node2.offset,
            length: node2.length
          },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize("minItemsWarning", "Array has too few items. Expected {0} or more.", schema2.minItems)
        });
      }
      if (objects_1.isNumber(schema2.maxItems) && node2.items.length > schema2.maxItems) {
        validationResult2.problems.push({
          location: {
            offset: node2.offset,
            length: node2.length
          },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize("maxItemsWarning", "Array has too many items. Expected {0} or fewer.", schema2.maxItems)
        });
      }
      if (schema2.uniqueItems === true) {
        var values_1 = getNodeValue(node2);
        var duplicates = values_1.some(function(value, index2) {
          return index2 !== values_1.lastIndexOf(value);
        });
        if (duplicates) {
          validationResult2.problems.push({
            location: {
              offset: node2.offset,
              length: node2.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize("uniqueItemsWarning", "Array has duplicate items.")
          });
        }
      }
    }
    function _validateObjectNode(node2, schema2, validationResult2, matchingSchemas2) {
      var seenKeys = Object.create(null);
      var unprocessedProperties = [];
      for (var _i = 0, _a = node2.properties; _i < _a.length; _i++) {
        var propertyNode = _a[_i];
        var key = propertyNode.keyNode.value;
        seenKeys[key] = propertyNode.valueNode;
        unprocessedProperties.push(key);
      }
      if (Array.isArray(schema2.required)) {
        for (var _b = 0, _c = schema2.required; _b < _c.length; _b++) {
          var propertyName = _c[_b];
          if (!seenKeys[propertyName]) {
            var keyNode = node2.parent && node2.parent.type === "property" && node2.parent.keyNode;
            var location = keyNode ? {
              offset: keyNode.offset,
              length: keyNode.length
            } : {
              offset: node2.offset,
              length: 1
            };
            validationResult2.problems.push({
              location,
              severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
              message: localize("MissingRequiredPropWarning", 'Missing property "{0}".', propertyName)
            });
          }
        }
      }
      var propertyProcessed = function(prop2) {
        var index = unprocessedProperties.indexOf(prop2);
        while (index >= 0) {
          unprocessedProperties.splice(index, 1);
          index = unprocessedProperties.indexOf(prop2);
        }
      };
      if (schema2.properties) {
        for (var _d = 0, _e = Object.keys(schema2.properties); _d < _e.length; _d++) {
          var propertyName = _e[_d];
          propertyProcessed(propertyName);
          var propertySchema = schema2.properties[propertyName];
          var child = seenKeys[propertyName];
          if (child) {
            if (objects_1.isBoolean(propertySchema)) {
              if (!propertySchema) {
                var propertyNode = child.parent;
                validationResult2.problems.push({
                  location: {
                    offset: propertyNode.keyNode.offset,
                    length: propertyNode.keyNode.length
                  },
                  severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                  message: schema2.errorMessage || localize("DisallowedExtraPropWarning", "Property {0} is not allowed.", propertyName)
                });
              } else {
                validationResult2.propertiesMatches++;
                validationResult2.propertiesValueMatches++;
              }
            } else {
              var propertyValidationResult = new ValidationResult();
              validate(child, propertySchema, propertyValidationResult, matchingSchemas2);
              validationResult2.mergePropertyMatch(propertyValidationResult);
            }
          }
        }
      }
      if (schema2.patternProperties) {
        for (var _f = 0, _g = Object.keys(schema2.patternProperties); _f < _g.length; _f++) {
          var propertyPattern = _g[_f];
          var regex = new RegExp(propertyPattern);
          for (var _h = 0, _j = unprocessedProperties.slice(0); _h < _j.length; _h++) {
            var propertyName = _j[_h];
            if (regex.test(propertyName)) {
              propertyProcessed(propertyName);
              var child = seenKeys[propertyName];
              if (child) {
                var propertySchema = schema2.patternProperties[propertyPattern];
                if (objects_1.isBoolean(propertySchema)) {
                  if (!propertySchema) {
                    var propertyNode = child.parent;
                    validationResult2.problems.push({
                      location: {
                        offset: propertyNode.keyNode.offset,
                        length: propertyNode.keyNode.length
                      },
                      severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                      message: schema2.errorMessage || localize("DisallowedExtraPropWarning", "Property {0} is not allowed.", propertyName)
                    });
                  } else {
                    validationResult2.propertiesMatches++;
                    validationResult2.propertiesValueMatches++;
                  }
                } else {
                  var propertyValidationResult = new ValidationResult();
                  validate(child, propertySchema, propertyValidationResult, matchingSchemas2);
                  validationResult2.mergePropertyMatch(propertyValidationResult);
                }
              }
            }
          }
        }
      }
      if (typeof schema2.additionalProperties === "object") {
        for (var _k = 0, unprocessedProperties_1 = unprocessedProperties; _k < unprocessedProperties_1.length; _k++) {
          var propertyName = unprocessedProperties_1[_k];
          var child = seenKeys[propertyName];
          if (child) {
            var propertyValidationResult = new ValidationResult();
            validate(child, schema2.additionalProperties, propertyValidationResult, matchingSchemas2);
            validationResult2.mergePropertyMatch(propertyValidationResult);
          }
        }
      } else if (schema2.additionalProperties === false) {
        if (unprocessedProperties.length > 0) {
          for (var _l = 0, unprocessedProperties_2 = unprocessedProperties; _l < unprocessedProperties_2.length; _l++) {
            var propertyName = unprocessedProperties_2[_l];
            var child = seenKeys[propertyName];
            if (child) {
              var propertyNode = child.parent;
              validationResult2.problems.push({
                location: {
                  offset: propertyNode.keyNode.offset,
                  length: propertyNode.keyNode.length
                },
                severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                message: schema2.errorMessage || localize("DisallowedExtraPropWarning", "Property {0} is not allowed.", propertyName)
              });
            }
          }
        }
      }
      if (objects_1.isNumber(schema2.maxProperties)) {
        if (node2.properties.length > schema2.maxProperties) {
          validationResult2.problems.push({
            location: {
              offset: node2.offset,
              length: node2.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize("MaxPropWarning", "Object has more properties than limit of {0}.", schema2.maxProperties)
          });
        }
      }
      if (objects_1.isNumber(schema2.minProperties)) {
        if (node2.properties.length < schema2.minProperties) {
          validationResult2.problems.push({
            location: {
              offset: node2.offset,
              length: node2.length
            },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize("MinPropWarning", "Object has fewer properties than the required number of {0}", schema2.minProperties)
          });
        }
      }
      if (schema2.dependencies) {
        for (var _m = 0, _o = Object.keys(schema2.dependencies); _m < _o.length; _m++) {
          var key = _o[_m];
          var prop = seenKeys[key];
          if (prop) {
            var propertyDep = schema2.dependencies[key];
            if (Array.isArray(propertyDep)) {
              for (var _p = 0, propertyDep_1 = propertyDep; _p < propertyDep_1.length; _p++) {
                var requiredProp = propertyDep_1[_p];
                if (!seenKeys[requiredProp]) {
                  validationResult2.problems.push({
                    location: {
                      offset: node2.offset,
                      length: node2.length
                    },
                    severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                    message: localize("RequiredDependentPropWarning", "Object is missing property {0} required by property {1}.", requiredProp, key)
                  });
                } else {
                  validationResult2.propertiesValueMatches++;
                }
              }
            } else {
              var propertySchema = asSchema(propertyDep);
              if (propertySchema) {
                var propertyValidationResult = new ValidationResult();
                validate(node2, propertySchema, propertyValidationResult, matchingSchemas2);
                validationResult2.mergePropertyMatch(propertyValidationResult);
              }
            }
          }
        }
      }
      var propertyNames = asSchema(schema2.propertyNames);
      if (propertyNames) {
        for (var _q = 0, _r = node2.properties; _q < _r.length; _q++) {
          var f = _r[_q];
          var key = f.keyNode;
          if (key) {
            validate(key, propertyNames, validationResult2, NoOpSchemaCollector.instance);
          }
        }
      }
    }
  }
  function parse(textDocument, config) {
    var problems = [];
    var lastProblemOffset = -1;
    var text = textDocument.getText();
    var scanner = Json.createScanner(text, false);
    var commentRanges = config && config.collectComments ? [] : void 0;
    function _scanNext() {
      while (true) {
        var token_1 = scanner.scan();
        _checkScanError();
        switch (token_1) {
          case 12:
          case 13:
            if (Array.isArray(commentRanges)) {
              commentRanges.push(jsonLanguageTypes_1.Range.create(textDocument.positionAt(scanner.getTokenOffset()), textDocument.positionAt(scanner.getTokenOffset() + scanner.getTokenLength())));
            }
            break;
          case 15:
          case 14:
            break;
          default:
            return token_1;
        }
      }
    }
    function _accept(token2) {
      if (scanner.getToken() === token2) {
        _scanNext();
        return true;
      }
      return false;
    }
    function _errorAtRange(message, code, startOffset, endOffset, severity) {
      if (severity === void 0) {
        severity = jsonLanguageTypes_1.DiagnosticSeverity.Error;
      }
      if (problems.length === 0 || startOffset !== lastProblemOffset) {
        var range = jsonLanguageTypes_1.Range.create(textDocument.positionAt(startOffset), textDocument.positionAt(endOffset));
        problems.push(jsonLanguageTypes_1.Diagnostic.create(range, message, severity, code, textDocument.languageId));
        lastProblemOffset = startOffset;
      }
    }
    function _error(message, code, node, skipUntilAfter, skipUntil) {
      if (node === void 0) {
        node = null;
      }
      if (skipUntilAfter === void 0) {
        skipUntilAfter = [];
      }
      if (skipUntil === void 0) {
        skipUntil = [];
      }
      var start = scanner.getTokenOffset();
      var end = scanner.getTokenOffset() + scanner.getTokenLength();
      if (start === end && start > 0) {
        start--;
        while (start > 0 && /\s/.test(text.charAt(start))) {
          start--;
        }
        end = start + 1;
      }
      _errorAtRange(message, code, start, end);
      if (node) {
        _finalize(node, false);
      }
      if (skipUntilAfter.length + skipUntil.length > 0) {
        var token_2 = scanner.getToken();
        while (token_2 !== 17) {
          if (skipUntilAfter.indexOf(token_2) !== -1) {
            _scanNext();
            break;
          } else if (skipUntil.indexOf(token_2) !== -1) {
            break;
          }
          token_2 = _scanNext();
        }
      }
      return node;
    }
    function _checkScanError() {
      switch (scanner.getTokenError()) {
        case 4:
          _error(localize("InvalidUnicode", "Invalid unicode sequence in string."), jsonLanguageTypes_1.ErrorCode.InvalidUnicode);
          return true;
        case 5:
          _error(localize("InvalidEscapeCharacter", "Invalid escape character in string."), jsonLanguageTypes_1.ErrorCode.InvalidEscapeCharacter);
          return true;
        case 3:
          _error(localize("UnexpectedEndOfNumber", "Unexpected end of number."), jsonLanguageTypes_1.ErrorCode.UnexpectedEndOfNumber);
          return true;
        case 1:
          _error(localize("UnexpectedEndOfComment", "Unexpected end of comment."), jsonLanguageTypes_1.ErrorCode.UnexpectedEndOfComment);
          return true;
        case 2:
          _error(localize("UnexpectedEndOfString", "Unexpected end of string."), jsonLanguageTypes_1.ErrorCode.UnexpectedEndOfString);
          return true;
        case 6:
          _error(localize("InvalidCharacter", "Invalid characters in string. Control characters must be escaped."), jsonLanguageTypes_1.ErrorCode.InvalidCharacter);
          return true;
      }
      return false;
    }
    function _finalize(node, scanNext) {
      node.length = scanner.getTokenOffset() + scanner.getTokenLength() - node.offset;
      if (scanNext) {
        _scanNext();
      }
      return node;
    }
    function _parseArray(parent) {
      if (scanner.getToken() !== 3) {
        return null;
      }
      var node = new ArrayASTNodeImpl(parent, scanner.getTokenOffset());
      _scanNext();
      var count = 0;
      var needsComma = false;
      while (scanner.getToken() !== 4 && scanner.getToken() !== 17) {
        if (scanner.getToken() === 5) {
          if (!needsComma) {
            _error(localize("ValueExpected", "Value expected"), jsonLanguageTypes_1.ErrorCode.ValueExpected);
          }
          var commaOffset = scanner.getTokenOffset();
          _scanNext();
          if (scanner.getToken() === 4) {
            if (needsComma) {
              _errorAtRange(localize("TrailingComma", "Trailing comma"), jsonLanguageTypes_1.ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
            }
            continue;
          }
        } else if (needsComma) {
          _error(localize("ExpectedComma", "Expected comma"), jsonLanguageTypes_1.ErrorCode.CommaExpected);
        }
        var item = _parseValue(node, count++);
        if (!item) {
          _error(localize("PropertyExpected", "Value expected"), jsonLanguageTypes_1.ErrorCode.ValueExpected, null, [], [4, 5]);
        } else {
          node.items.push(item);
        }
        needsComma = true;
      }
      if (scanner.getToken() !== 4) {
        return _error(localize("ExpectedCloseBracket", "Expected comma or closing bracket"), jsonLanguageTypes_1.ErrorCode.CommaOrCloseBacketExpected, node);
      }
      return _finalize(node, true);
    }
    function _parseProperty(parent, keysSeen) {
      var node = new PropertyASTNodeImpl(parent, scanner.getTokenOffset());
      var key = _parseString(node);
      if (!key) {
        if (scanner.getToken() === 16) {
          _error(localize("DoubleQuotesExpected", "Property keys must be doublequoted"), jsonLanguageTypes_1.ErrorCode.Undefined);
          var keyNode = new StringASTNodeImpl(node, scanner.getTokenOffset(), scanner.getTokenLength());
          keyNode.value = scanner.getTokenValue();
          key = keyNode;
          _scanNext();
        } else {
          return null;
        }
      }
      node.keyNode = key;
      var seen = keysSeen[key.value];
      if (seen) {
        _errorAtRange(localize("DuplicateKeyWarning", "Duplicate object key"), jsonLanguageTypes_1.ErrorCode.DuplicateKey, node.keyNode.offset, node.keyNode.offset + node.keyNode.length, jsonLanguageTypes_1.DiagnosticSeverity.Warning);
        if (typeof seen === "object") {
          _errorAtRange(localize("DuplicateKeyWarning", "Duplicate object key"), jsonLanguageTypes_1.ErrorCode.DuplicateKey, seen.keyNode.offset, seen.keyNode.offset + seen.keyNode.length, jsonLanguageTypes_1.DiagnosticSeverity.Warning);
        }
        keysSeen[key.value] = true;
      } else {
        keysSeen[key.value] = node;
      }
      if (scanner.getToken() === 6) {
        node.colonOffset = scanner.getTokenOffset();
        _scanNext();
      } else {
        _error(localize("ColonExpected", "Colon expected"), jsonLanguageTypes_1.ErrorCode.ColonExpected);
        if (scanner.getToken() === 10 && textDocument.positionAt(key.offset + key.length).line < textDocument.positionAt(scanner.getTokenOffset()).line) {
          node.length = key.length;
          return node;
        }
      }
      var value = _parseValue(node, key.value);
      if (!value) {
        return _error(localize("ValueExpected", "Value expected"), jsonLanguageTypes_1.ErrorCode.ValueExpected, node, [], [2, 5]);
      }
      node.valueNode = value;
      node.length = value.offset + value.length - node.offset;
      return node;
    }
    function _parseObject(parent) {
      if (scanner.getToken() !== 1) {
        return null;
      }
      var node = new ObjectASTNodeImpl(parent, scanner.getTokenOffset());
      var keysSeen = Object.create(null);
      _scanNext();
      var needsComma = false;
      while (scanner.getToken() !== 2 && scanner.getToken() !== 17) {
        if (scanner.getToken() === 5) {
          if (!needsComma) {
            _error(localize("PropertyExpected", "Property expected"), jsonLanguageTypes_1.ErrorCode.PropertyExpected);
          }
          var commaOffset = scanner.getTokenOffset();
          _scanNext();
          if (scanner.getToken() === 2) {
            if (needsComma) {
              _errorAtRange(localize("TrailingComma", "Trailing comma"), jsonLanguageTypes_1.ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
            }
            continue;
          }
        } else if (needsComma) {
          _error(localize("ExpectedComma", "Expected comma"), jsonLanguageTypes_1.ErrorCode.CommaExpected);
        }
        var property = _parseProperty(node, keysSeen);
        if (!property) {
          _error(localize("PropertyExpected", "Property expected"), jsonLanguageTypes_1.ErrorCode.PropertyExpected, null, [], [2, 5]);
        } else {
          node.properties.push(property);
        }
        needsComma = true;
      }
      if (scanner.getToken() !== 2) {
        return _error(localize("ExpectedCloseBrace", "Expected comma or closing brace"), jsonLanguageTypes_1.ErrorCode.CommaOrCloseBraceExpected, node);
      }
      return _finalize(node, true);
    }
    function _parseString(parent) {
      if (scanner.getToken() !== 10) {
        return null;
      }
      var node = new StringASTNodeImpl(parent, scanner.getTokenOffset());
      node.value = scanner.getTokenValue();
      return _finalize(node, true);
    }
    function _parseNumber(parent) {
      if (scanner.getToken() !== 11) {
        return null;
      }
      var node = new NumberASTNodeImpl(parent, scanner.getTokenOffset());
      if (scanner.getTokenError() === 0) {
        var tokenValue = scanner.getTokenValue();
        try {
          var numberValue = JSON.parse(tokenValue);
          if (!objects_1.isNumber(numberValue)) {
            return _error(localize("InvalidNumberFormat", "Invalid number format."), jsonLanguageTypes_1.ErrorCode.Undefined, node);
          }
          node.value = numberValue;
        } catch (e) {
          return _error(localize("InvalidNumberFormat", "Invalid number format."), jsonLanguageTypes_1.ErrorCode.Undefined, node);
        }
        node.isInteger = tokenValue.indexOf(".") === -1;
      }
      return _finalize(node, true);
    }
    function _parseLiteral(parent) {
      var node;
      switch (scanner.getToken()) {
        case 7:
          return _finalize(new NullASTNodeImpl(parent, scanner.getTokenOffset()), true);
        case 8:
          return _finalize(new BooleanASTNodeImpl(parent, true, scanner.getTokenOffset()), true);
        case 9:
          return _finalize(new BooleanASTNodeImpl(parent, false, scanner.getTokenOffset()), true);
        default:
          return null;
      }
    }
    function _parseValue(parent, name) {
      return _parseArray(parent) || _parseObject(parent) || _parseString(parent) || _parseNumber(parent) || _parseLiteral(parent);
    }
    var _root = null;
    var token = _scanNext();
    if (token !== 17) {
      _root = _parseValue(null, null);
      if (!_root) {
        _error(localize("Invalid symbol", "Expected a JSON object, array or literal."), jsonLanguageTypes_1.ErrorCode.Undefined);
      } else if (scanner.getToken() !== 17) {
        _error(localize("End of file expected", "End of file expected."), jsonLanguageTypes_1.ErrorCode.Undefined);
      }
    }
    return new JSONDocument(_root, problems, commentRanges);
  }
  exports2.parse = parse;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/utils/json", ["require", "exports"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  function stringifyObject(obj, indent, stringifyLiteral) {
    if (obj !== null && typeof obj === "object") {
      var newIndent = indent + "	";
      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var result = "[\n";
        for (var i = 0; i < obj.length; i++) {
          result += newIndent + stringifyObject(obj[i], newIndent, stringifyLiteral);
          if (i < obj.length - 1) {
            result += ",";
          }
          result += "\n";
        }
        result += indent + "]";
        return result;
      } else {
        var keys = Object.keys(obj);
        if (keys.length === 0) {
          return "{}";
        }
        var result = "{\n";
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          result += newIndent + JSON.stringify(key) + ": " + stringifyObject(obj[key], newIndent, stringifyLiteral);
          if (i < keys.length - 1) {
            result += ",";
          }
          result += "\n";
        }
        result += indent + "}";
        return result;
      }
    }
    return stringifyLiteral(obj);
  }
  exports2.stringifyObject = stringifyObject;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/utils/strings", ["require", "exports"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  function startsWith(haystack, needle) {
    if (haystack.length < needle.length) {
      return false;
    }
    for (var i = 0; i < needle.length; i++) {
      if (haystack[i] !== needle[i]) {
        return false;
      }
    }
    return true;
  }
  exports2.startsWith = startsWith;
  function endsWith(haystack, needle) {
    var diff = haystack.length - needle.length;
    if (diff > 0) {
      return haystack.lastIndexOf(needle) === diff;
    } else if (diff === 0) {
      return haystack === needle;
    } else {
      return false;
    }
  }
  exports2.endsWith = endsWith;
  function convertSimple2RegExpPattern(pattern) {
    return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&").replace(/[\*]/g, ".*");
  }
  exports2.convertSimple2RegExpPattern = convertSimple2RegExpPattern;
  function repeat(value, count) {
    var s = "";
    while (count > 0) {
      if ((count & 1) === 1) {
        s += value;
      }
      value += value;
      count = count >>> 1;
    }
    return s;
  }
  exports2.repeat = repeat;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/services/jsonCompletion", ["require", "exports", "../parser/jsonParser", "jsonc-parser", "../utils/json", "../utils/strings", "../utils/objects", "../jsonLanguageTypes", "vscode-nls"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var Parser = require2("../parser/jsonParser");
  var Json = require2("jsonc-parser");
  var json_1 = require2("../utils/json");
  var strings_1 = require2("../utils/strings");
  var objects_1 = require2("../utils/objects");
  var jsonLanguageTypes_1 = require2("../jsonLanguageTypes");
  var nls = require2("vscode-nls");
  var localize = nls.loadMessageBundle();
  var valueCommitCharacters = [",", "}", "]"];
  var propertyCommitCharacters = [":"];
  var JSONCompletion = function() {
    function JSONCompletion2(schemaService, contributions, promiseConstructor, clientCapabilities) {
      if (contributions === void 0) {
        contributions = [];
      }
      if (promiseConstructor === void 0) {
        promiseConstructor = Promise;
      }
      if (clientCapabilities === void 0) {
        clientCapabilities = {};
      }
      this.schemaService = schemaService;
      this.contributions = contributions;
      this.promiseConstructor = promiseConstructor;
      this.clientCapabilities = clientCapabilities;
      this.templateVarIdCounter = 0;
    }
    JSONCompletion2.prototype.doResolve = function(item) {
      for (var i = this.contributions.length - 1; i >= 0; i--) {
        if (this.contributions[i].resolveCompletion) {
          var resolver = this.contributions[i].resolveCompletion(item);
          if (resolver) {
            return resolver;
          }
        }
      }
      return this.promiseConstructor.resolve(item);
    };
    JSONCompletion2.prototype.doComplete = function(document, position, doc) {
      var _this = this;
      var result = {
        items: [],
        isIncomplete: false
      };
      var text = document.getText();
      var offset = document.offsetAt(position);
      var node = doc.getNodeFromOffset(offset, true);
      if (this.isInComment(document, node ? node.offset : 0, offset)) {
        return Promise.resolve(result);
      }
      if (node && offset === node.offset + node.length && offset > 0) {
        var ch = text[offset - 1];
        if (node.type === "object" && ch === "}" || node.type === "array" && ch === "]") {
          node = node.parent;
        }
      }
      var currentWord = this.getCurrentWord(document, offset);
      var overwriteRange = null;
      if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
        overwriteRange = jsonLanguageTypes_1.Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
      } else {
        var overwriteStart = offset - currentWord.length;
        if (overwriteStart > 0 && text[overwriteStart - 1] === '"') {
          overwriteStart--;
        }
        overwriteRange = jsonLanguageTypes_1.Range.create(document.positionAt(overwriteStart), position);
      }
      var supportsCommitCharacters = false;
      var proposed = {};
      var collector = {
        add: function(suggestion) {
          var label = suggestion.label;
          var existing = proposed[label];
          if (!existing) {
            label = label.replace(/[\n]/g, "↵");
            if (label.length > 60) {
              var shortendedLabel = label.substr(0, 57).trim() + "...";
              if (!proposed[shortendedLabel]) {
                label = shortendedLabel;
              }
            }
            if (overwriteRange) {
              suggestion.textEdit = jsonLanguageTypes_1.TextEdit.replace(overwriteRange, suggestion.insertText);
            }
            if (supportsCommitCharacters) {
              suggestion.commitCharacters = suggestion.kind === jsonLanguageTypes_1.CompletionItemKind.Property ? propertyCommitCharacters : valueCommitCharacters;
            }
            suggestion.label = label;
            proposed[label] = suggestion;
            result.items.push(suggestion);
          } else if (!existing.documentation) {
            existing.documentation = suggestion.documentation;
          }
        },
        setAsIncomplete: function() {
          result.isIncomplete = true;
        },
        error: function(message) {
          console.error(message);
        },
        log: function(message) {
          console.log(message);
        },
        getNumberOfProposals: function() {
          return result.items.length;
        }
      };
      return this.schemaService.getSchemaForResource(document.uri, doc).then(function(schema) {
        var collectionPromises = [];
        var addValue = true;
        var currentKey = "";
        var currentProperty = null;
        if (node) {
          if (node.type === "string") {
            var parent = node.parent;
            if (parent && parent.type === "property" && parent.keyNode === node) {
              addValue = !parent.valueNode;
              currentProperty = parent;
              currentKey = text.substr(node.offset + 1, node.length - 2);
              if (parent) {
                node = parent.parent;
              }
            }
          }
        }
        if (node && node.type === "object") {
          if (node.offset === offset) {
            return result;
          }
          var properties = node.properties;
          properties.forEach(function(p) {
            if (!currentProperty || currentProperty !== p) {
              proposed[p.keyNode.value] = jsonLanguageTypes_1.CompletionItem.create("__");
            }
          });
          var separatorAfter_1 = "";
          if (addValue) {
            separatorAfter_1 = _this.evaluateSeparatorAfter(document, document.offsetAt(overwriteRange.end));
          }
          if (schema) {
            _this.getPropertyCompletions(schema, doc, node, addValue, separatorAfter_1, collector);
          } else {
            _this.getSchemaLessPropertyCompletions(doc, node, currentKey, collector);
          }
          var location_1 = Parser.getNodePath(node);
          _this.contributions.forEach(function(contribution) {
            var collectPromise = contribution.collectPropertyCompletions(document.uri, location_1, currentWord, addValue, separatorAfter_1 === "", collector);
            if (collectPromise) {
              collectionPromises.push(collectPromise);
            }
          });
          if (!schema && currentWord.length > 0 && text.charAt(offset - currentWord.length - 1) !== '"') {
            collector.add({
              kind: jsonLanguageTypes_1.CompletionItemKind.Property,
              label: _this.getLabelForValue(currentWord),
              insertText: _this.getInsertTextForProperty(currentWord, null, false, separatorAfter_1),
              insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
              documentation: ""
            });
            collector.setAsIncomplete();
          }
        }
        var types = {};
        if (schema) {
          _this.getValueCompletions(schema, doc, node, offset, document, collector, types);
        } else {
          _this.getSchemaLessValueCompletions(doc, node, offset, document, collector);
        }
        if (_this.contributions.length > 0) {
          _this.getContributedValueCompletions(doc, node, offset, document, collector, collectionPromises);
        }
        return _this.promiseConstructor.all(collectionPromises).then(function() {
          if (collector.getNumberOfProposals() === 0) {
            var offsetForSeparator = offset;
            if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
              offsetForSeparator = node.offset + node.length;
            }
            var separatorAfter = _this.evaluateSeparatorAfter(document, offsetForSeparator);
            _this.addFillerValueCompletions(types, separatorAfter, collector);
          }
          return result;
        });
      });
    };
    JSONCompletion2.prototype.getPropertyCompletions = function(schema, doc, node, addValue, separatorAfter, collector) {
      var _this = this;
      var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
      matchingSchemas.forEach(function(s) {
        if (s.node === node && !s.inverted) {
          var schemaProperties_1 = s.schema.properties;
          if (schemaProperties_1) {
            Object.keys(schemaProperties_1).forEach(function(key) {
              var propertySchema = schemaProperties_1[key];
              if (typeof propertySchema === "object" && !propertySchema.deprecationMessage && !propertySchema.doNotSuggest) {
                var proposal = {
                  kind: jsonLanguageTypes_1.CompletionItemKind.Property,
                  label: key,
                  insertText: _this.getInsertTextForProperty(key, propertySchema, addValue, separatorAfter),
                  insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
                  filterText: _this.getFilterTextForValue(key),
                  documentation: _this.fromMarkup(propertySchema.markdownDescription) || propertySchema.description || ""
                };
                if (strings_1.endsWith(proposal.insertText, "$1" + separatorAfter)) {
                  proposal.command = {
                    title: "Suggest",
                    command: "editor.action.triggerSuggest"
                  };
                }
                collector.add(proposal);
              }
            });
          }
        }
      });
    };
    JSONCompletion2.prototype.getSchemaLessPropertyCompletions = function(doc, node, currentKey, collector) {
      var _this = this;
      var collectCompletionsForSimilarObject = function(obj) {
        obj.properties.forEach(function(p) {
          var key = p.keyNode.value;
          collector.add({
            kind: jsonLanguageTypes_1.CompletionItemKind.Property,
            label: key,
            insertText: _this.getInsertTextForValue(key, ""),
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
            filterText: _this.getFilterTextForValue(key),
            documentation: ""
          });
        });
      };
      if (node.parent) {
        if (node.parent.type === "property") {
          var parentKey_1 = node.parent.keyNode.value;
          doc.visit(function(n) {
            if (n.type === "property" && n !== node.parent && n.keyNode.value === parentKey_1 && n.valueNode && n.valueNode.type === "object") {
              collectCompletionsForSimilarObject(n.valueNode);
            }
            return true;
          });
        } else if (node.parent.type === "array") {
          node.parent.items.forEach(function(n) {
            if (n.type === "object" && n !== node) {
              collectCompletionsForSimilarObject(n);
            }
          });
        }
      } else if (node.type === "object") {
        collector.add({
          kind: jsonLanguageTypes_1.CompletionItemKind.Property,
          label: "$schema",
          insertText: this.getInsertTextForProperty("$schema", null, true, ""),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          documentation: "",
          filterText: this.getFilterTextForValue("$schema")
        });
      }
    };
    JSONCompletion2.prototype.getSchemaLessValueCompletions = function(doc, node, offset, document, collector) {
      var _this = this;
      var offsetForSeparator = offset;
      if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
        offsetForSeparator = node.offset + node.length;
        node = node.parent;
      }
      if (!node) {
        collector.add({
          kind: this.getSuggestionKind("object"),
          label: "Empty object",
          insertText: this.getInsertTextForValue({}, ""),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          documentation: ""
        });
        collector.add({
          kind: this.getSuggestionKind("array"),
          label: "Empty array",
          insertText: this.getInsertTextForValue([], ""),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          documentation: ""
        });
        return;
      }
      var separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
      var collectSuggestionsForValues = function(value) {
        if (!Parser.contains(value.parent, offset, true)) {
          collector.add({
            kind: _this.getSuggestionKind(value.type),
            label: _this.getLabelTextForMatchingNode(value, document),
            insertText: _this.getInsertTextForMatchingNode(value, document, separatorAfter),
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
            documentation: ""
          });
        }
        if (value.type === "boolean") {
          _this.addBooleanValueCompletion(!value.value, separatorAfter, collector);
        }
      };
      if (node.type === "property") {
        if (offset > node.colonOffset) {
          var valueNode = node.valueNode;
          if (valueNode && (offset > valueNode.offset + valueNode.length || valueNode.type === "object" || valueNode.type === "array")) {
            return;
          }
          var parentKey_2 = node.keyNode.value;
          doc.visit(function(n) {
            if (n.type === "property" && n.keyNode.value === parentKey_2 && n.valueNode) {
              collectSuggestionsForValues(n.valueNode);
            }
            return true;
          });
          if (parentKey_2 === "$schema" && node.parent && !node.parent.parent) {
            this.addDollarSchemaCompletions(separatorAfter, collector);
          }
        }
      }
      if (node.type === "array") {
        if (node.parent && node.parent.type === "property") {
          var parentKey_3 = node.parent.keyNode.value;
          doc.visit(function(n) {
            if (n.type === "property" && n.keyNode.value === parentKey_3 && n.valueNode && n.valueNode.type === "array") {
              n.valueNode.items.forEach(collectSuggestionsForValues);
            }
            return true;
          });
        } else {
          node.items.forEach(collectSuggestionsForValues);
        }
      }
    };
    JSONCompletion2.prototype.getValueCompletions = function(schema, doc, node, offset, document, collector, types) {
      var _this = this;
      var offsetForSeparator = offset;
      var parentKey = null;
      var valueNode = null;
      if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
        offsetForSeparator = node.offset + node.length;
        valueNode = node;
        node = node.parent;
      }
      if (!node) {
        this.addSchemaValueCompletions(schema.schema, "", collector, types);
        return;
      }
      if (node.type === "property" && offset > node.colonOffset) {
        var valueNode_1 = node.valueNode;
        if (valueNode_1 && offset > valueNode_1.offset + valueNode_1.length) {
          return;
        }
        parentKey = node.keyNode.value;
        node = node.parent;
      }
      if (node && (parentKey !== null || node.type === "array")) {
        var separatorAfter_2 = this.evaluateSeparatorAfter(document, offsetForSeparator);
        var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset, valueNode);
        matchingSchemas.forEach(function(s) {
          if (s.node === node && !s.inverted && s.schema) {
            if (node.type === "array" && s.schema.items) {
              if (Array.isArray(s.schema.items)) {
                var index = _this.findItemAtOffset(node, document, offset);
                if (index < s.schema.items.length) {
                  _this.addSchemaValueCompletions(s.schema.items[index], separatorAfter_2, collector, types);
                }
              } else {
                _this.addSchemaValueCompletions(s.schema.items, separatorAfter_2, collector, types);
              }
            }
            if (s.schema.properties) {
              var propertySchema = s.schema.properties[parentKey];
              if (propertySchema) {
                _this.addSchemaValueCompletions(propertySchema, separatorAfter_2, collector, types);
              }
            }
          }
        });
        if (parentKey === "$schema" && !node.parent) {
          this.addDollarSchemaCompletions(separatorAfter_2, collector);
        }
        if (types["boolean"]) {
          this.addBooleanValueCompletion(true, separatorAfter_2, collector);
          this.addBooleanValueCompletion(false, separatorAfter_2, collector);
        }
        if (types["null"]) {
          this.addNullValueCompletion(separatorAfter_2, collector);
        }
      }
    };
    JSONCompletion2.prototype.getContributedValueCompletions = function(doc, node, offset, document, collector, collectionPromises) {
      if (!node) {
        this.contributions.forEach(function(contribution) {
          var collectPromise = contribution.collectDefaultCompletions(document.uri, collector);
          if (collectPromise) {
            collectionPromises.push(collectPromise);
          }
        });
      } else {
        if (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null") {
          node = node.parent;
        }
        if (node.type === "property" && offset > node.colonOffset) {
          var parentKey_4 = node.keyNode.value;
          var valueNode = node.valueNode;
          if (!valueNode || offset <= valueNode.offset + valueNode.length) {
            var location_2 = Parser.getNodePath(node.parent);
            this.contributions.forEach(function(contribution) {
              var collectPromise = contribution.collectValueCompletions(document.uri, location_2, parentKey_4, collector);
              if (collectPromise) {
                collectionPromises.push(collectPromise);
              }
            });
          }
        }
      }
    };
    JSONCompletion2.prototype.addSchemaValueCompletions = function(schema, separatorAfter, collector, types) {
      var _this = this;
      if (typeof schema === "object") {
        this.addEnumValueCompletions(schema, separatorAfter, collector);
        this.addDefaultValueCompletions(schema, separatorAfter, collector);
        this.collectTypes(schema, types);
        if (Array.isArray(schema.allOf)) {
          schema.allOf.forEach(function(s) {
            return _this.addSchemaValueCompletions(s, separatorAfter, collector, types);
          });
        }
        if (Array.isArray(schema.anyOf)) {
          schema.anyOf.forEach(function(s) {
            return _this.addSchemaValueCompletions(s, separatorAfter, collector, types);
          });
        }
        if (Array.isArray(schema.oneOf)) {
          schema.oneOf.forEach(function(s) {
            return _this.addSchemaValueCompletions(s, separatorAfter, collector, types);
          });
        }
      }
    };
    JSONCompletion2.prototype.addDefaultValueCompletions = function(schema, separatorAfter, collector, arrayDepth) {
      var _this = this;
      if (arrayDepth === void 0) {
        arrayDepth = 0;
      }
      var hasProposals = false;
      if (objects_1.isDefined(schema.default)) {
        var type = schema.type;
        var value = schema.default;
        for (var i = arrayDepth; i > 0; i--) {
          value = [value];
          type = "array";
        }
        collector.add({
          kind: this.getSuggestionKind(type),
          label: this.getLabelForValue(value),
          insertText: this.getInsertTextForValue(value, separatorAfter),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          detail: localize("json.suggest.default", "Default value")
        });
        hasProposals = true;
      }
      if (Array.isArray(schema.examples)) {
        schema.examples.forEach(function(example) {
          var type2 = schema.type;
          var value2 = example;
          for (var i2 = arrayDepth; i2 > 0; i2--) {
            value2 = [value2];
            type2 = "array";
          }
          collector.add({
            kind: _this.getSuggestionKind(type2),
            label: _this.getLabelForValue(value2),
            insertText: _this.getInsertTextForValue(value2, separatorAfter),
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet
          });
          hasProposals = true;
        });
      }
      if (Array.isArray(schema.defaultSnippets)) {
        schema.defaultSnippets.forEach(function(s) {
          var type2 = schema.type;
          var value2 = s.body;
          var label = s.label;
          var insertText;
          var filterText;
          if (objects_1.isDefined(value2)) {
            var type_1 = schema.type;
            for (var i2 = arrayDepth; i2 > 0; i2--) {
              value2 = [value2];
              type_1 = "array";
            }
            insertText = _this.getInsertTextForSnippetValue(value2, separatorAfter);
            filterText = _this.getFilterTextForSnippetValue(value2);
            label = label || _this.getLabelForSnippetValue(value2);
          } else if (typeof s.bodyText === "string") {
            var prefix = "", suffix = "", indent = "";
            for (var i2 = arrayDepth; i2 > 0; i2--) {
              prefix = prefix + indent + "[\n";
              suffix = suffix + "\n" + indent + "]";
              indent += "	";
              type2 = "array";
            }
            insertText = prefix + indent + s.bodyText.split("\n").join("\n" + indent) + suffix + separatorAfter;
            label = label || insertText, filterText = insertText.replace(/[\n]/g, "");
          }
          collector.add({
            kind: _this.getSuggestionKind(type2),
            label,
            documentation: _this.fromMarkup(s.markdownDescription) || s.description,
            insertText,
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
            filterText
          });
          hasProposals = true;
        });
      }
      if (!hasProposals && typeof schema.items === "object" && !Array.isArray(schema.items)) {
        this.addDefaultValueCompletions(schema.items, separatorAfter, collector, arrayDepth + 1);
      }
    };
    JSONCompletion2.prototype.addEnumValueCompletions = function(schema, separatorAfter, collector) {
      if (objects_1.isDefined(schema.const)) {
        collector.add({
          kind: this.getSuggestionKind(schema.type),
          label: this.getLabelForValue(schema.const),
          insertText: this.getInsertTextForValue(schema.const, separatorAfter),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          documentation: this.fromMarkup(schema.markdownDescription) || schema.description
        });
      }
      if (Array.isArray(schema.enum)) {
        for (var i = 0, length = schema.enum.length; i < length; i++) {
          var enm = schema.enum[i];
          var documentation = this.fromMarkup(schema.markdownDescription) || schema.description;
          if (schema.markdownEnumDescriptions && i < schema.markdownEnumDescriptions.length && this.doesSupportMarkdown()) {
            documentation = this.fromMarkup(schema.markdownEnumDescriptions[i]);
          } else if (schema.enumDescriptions && i < schema.enumDescriptions.length) {
            documentation = schema.enumDescriptions[i];
          }
          collector.add({
            kind: this.getSuggestionKind(schema.type),
            label: this.getLabelForValue(enm),
            insertText: this.getInsertTextForValue(enm, separatorAfter),
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
            documentation
          });
        }
      }
    };
    JSONCompletion2.prototype.collectTypes = function(schema, types) {
      if (Array.isArray(schema.enum) || objects_1.isDefined(schema.const)) {
        return;
      }
      var type = schema.type;
      if (Array.isArray(type)) {
        type.forEach(function(t) {
          return types[t] = true;
        });
      } else {
        types[type] = true;
      }
    };
    JSONCompletion2.prototype.addFillerValueCompletions = function(types, separatorAfter, collector) {
      if (types["object"]) {
        collector.add({
          kind: this.getSuggestionKind("object"),
          label: "{}",
          insertText: this.getInsertTextForGuessedValue({}, separatorAfter),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          detail: localize("defaults.object", "New object"),
          documentation: ""
        });
      }
      if (types["array"]) {
        collector.add({
          kind: this.getSuggestionKind("array"),
          label: "[]",
          insertText: this.getInsertTextForGuessedValue([], separatorAfter),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          detail: localize("defaults.array", "New array"),
          documentation: ""
        });
      }
    };
    JSONCompletion2.prototype.addBooleanValueCompletion = function(value, separatorAfter, collector) {
      collector.add({
        kind: this.getSuggestionKind("boolean"),
        label: value ? "true" : "false",
        insertText: this.getInsertTextForValue(value, separatorAfter),
        insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
        documentation: ""
      });
    };
    JSONCompletion2.prototype.addNullValueCompletion = function(separatorAfter, collector) {
      collector.add({
        kind: this.getSuggestionKind("null"),
        label: "null",
        insertText: "null" + separatorAfter,
        insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
        documentation: ""
      });
    };
    JSONCompletion2.prototype.addDollarSchemaCompletions = function(separatorAfter, collector) {
      var _this = this;
      var schemaIds = this.schemaService.getRegisteredSchemaIds(function(schema) {
        return schema === "http" || schema === "https";
      });
      schemaIds.forEach(function(schemaId) {
        return collector.add({
          kind: jsonLanguageTypes_1.CompletionItemKind.Module,
          label: _this.getLabelForValue(schemaId),
          filterText: _this.getFilterTextForValue(schemaId),
          insertText: _this.getInsertTextForValue(schemaId, separatorAfter),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          documentation: ""
        });
      });
    };
    JSONCompletion2.prototype.getLabelForValue = function(value) {
      return JSON.stringify(value);
    };
    JSONCompletion2.prototype.getFilterTextForValue = function(value) {
      return JSON.stringify(value);
    };
    JSONCompletion2.prototype.getFilterTextForSnippetValue = function(value) {
      return JSON.stringify(value).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
    };
    JSONCompletion2.prototype.getLabelForSnippetValue = function(value) {
      var label = JSON.stringify(value);
      return label.replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
    };
    JSONCompletion2.prototype.getInsertTextForPlainText = function(text) {
      return text.replace(/[\\\$\}]/g, "\\$&");
    };
    JSONCompletion2.prototype.getInsertTextForValue = function(value, separatorAfter) {
      var text = JSON.stringify(value, null, "	");
      if (text === "{}") {
        return "{$1}" + separatorAfter;
      } else if (text === "[]") {
        return "[$1]" + separatorAfter;
      }
      return this.getInsertTextForPlainText(text + separatorAfter);
    };
    JSONCompletion2.prototype.getInsertTextForSnippetValue = function(value, separatorAfter) {
      var replacer = function(value2) {
        if (typeof value2 === "string") {
          if (value2[0] === "^") {
            return value2.substr(1);
          }
        }
        return JSON.stringify(value2);
      };
      return json_1.stringifyObject(value, "", replacer) + separatorAfter;
    };
    JSONCompletion2.prototype.getInsertTextForGuessedValue = function(value, separatorAfter) {
      switch (typeof value) {
        case "object":
          if (value === null) {
            return "${1:null}" + separatorAfter;
          }
          return this.getInsertTextForValue(value, separatorAfter);
        case "string":
          var snippetValue = JSON.stringify(value);
          snippetValue = snippetValue.substr(1, snippetValue.length - 2);
          snippetValue = this.getInsertTextForPlainText(snippetValue);
          return '"${1:' + snippetValue + '}"' + separatorAfter;
        case "number":
        case "boolean":
          return "${1:" + JSON.stringify(value) + "}" + separatorAfter;
      }
      return this.getInsertTextForValue(value, separatorAfter);
    };
    JSONCompletion2.prototype.getSuggestionKind = function(type) {
      if (Array.isArray(type)) {
        var array = type;
        type = array.length > 0 ? array[0] : null;
      }
      if (!type) {
        return jsonLanguageTypes_1.CompletionItemKind.Value;
      }
      switch (type) {
        case "string":
          return jsonLanguageTypes_1.CompletionItemKind.Value;
        case "object":
          return jsonLanguageTypes_1.CompletionItemKind.Module;
        case "property":
          return jsonLanguageTypes_1.CompletionItemKind.Property;
        default:
          return jsonLanguageTypes_1.CompletionItemKind.Value;
      }
    };
    JSONCompletion2.prototype.getLabelTextForMatchingNode = function(node, document) {
      switch (node.type) {
        case "array":
          return "[]";
        case "object":
          return "{}";
        default:
          var content = document.getText().substr(node.offset, node.length);
          return content;
      }
    };
    JSONCompletion2.prototype.getInsertTextForMatchingNode = function(node, document, separatorAfter) {
      switch (node.type) {
        case "array":
          return this.getInsertTextForValue([], separatorAfter);
        case "object":
          return this.getInsertTextForValue({}, separatorAfter);
        default:
          var content = document.getText().substr(node.offset, node.length) + separatorAfter;
          return this.getInsertTextForPlainText(content);
      }
    };
    JSONCompletion2.prototype.getInsertTextForProperty = function(key, propertySchema, addValue, separatorAfter) {
      var propertyText = this.getInsertTextForValue(key, "");
      if (!addValue) {
        return propertyText;
      }
      var resultText = propertyText + ": ";
      var value;
      var nValueProposals = 0;
      if (propertySchema) {
        if (Array.isArray(propertySchema.defaultSnippets)) {
          if (propertySchema.defaultSnippets.length === 1) {
            var body = propertySchema.defaultSnippets[0].body;
            if (objects_1.isDefined(body)) {
              value = this.getInsertTextForSnippetValue(body, "");
            }
          }
          nValueProposals += propertySchema.defaultSnippets.length;
        }
        if (propertySchema.enum) {
          if (!value && propertySchema.enum.length === 1) {
            value = this.getInsertTextForGuessedValue(propertySchema.enum[0], "");
          }
          nValueProposals += propertySchema.enum.length;
        }
        if (objects_1.isDefined(propertySchema.default)) {
          if (!value) {
            value = this.getInsertTextForGuessedValue(propertySchema.default, "");
          }
          nValueProposals++;
        }
        if (Array.isArray(propertySchema.examples) && propertySchema.examples.length) {
          if (!value) {
            value = this.getInsertTextForGuessedValue(propertySchema.examples[0], "");
          }
          nValueProposals += propertySchema.examples.length;
        }
        if (nValueProposals === 0) {
          var type = Array.isArray(propertySchema.type) ? propertySchema.type[0] : propertySchema.type;
          if (!type) {
            if (propertySchema.properties) {
              type = "object";
            } else if (propertySchema.items) {
              type = "array";
            }
          }
          switch (type) {
            case "boolean":
              value = "$1";
              break;
            case "string":
              value = '"$1"';
              break;
            case "object":
              value = "{$1}";
              break;
            case "array":
              value = "[$1]";
              break;
            case "number":
            case "integer":
              value = "${1:0}";
              break;
            case "null":
              value = "${1:null}";
              break;
            default:
              return propertyText;
          }
        }
      }
      if (!value || nValueProposals > 1) {
        value = "$1";
      }
      return resultText + value + separatorAfter;
    };
    JSONCompletion2.prototype.getCurrentWord = function(document, offset) {
      var i = offset - 1;
      var text = document.getText();
      while (i >= 0 && ' 	\n\r\v":{[,]}'.indexOf(text.charAt(i)) === -1) {
        i--;
      }
      return text.substring(i + 1, offset);
    };
    JSONCompletion2.prototype.evaluateSeparatorAfter = function(document, offset) {
      var scanner = Json.createScanner(document.getText(), true);
      scanner.setPosition(offset);
      var token = scanner.scan();
      switch (token) {
        case 5:
        case 2:
        case 4:
        case 17:
          return "";
        default:
          return ",";
      }
    };
    JSONCompletion2.prototype.findItemAtOffset = function(node, document, offset) {
      var scanner = Json.createScanner(document.getText(), true);
      var children = node.items;
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (offset > child.offset + child.length) {
          scanner.setPosition(child.offset + child.length);
          var token = scanner.scan();
          if (token === 5 && offset >= scanner.getTokenOffset() + scanner.getTokenLength()) {
            return i + 1;
          }
          return i;
        } else if (offset >= child.offset) {
          return i;
        }
      }
      return 0;
    };
    JSONCompletion2.prototype.isInComment = function(document, start, offset) {
      var scanner = Json.createScanner(document.getText(), false);
      scanner.setPosition(start);
      var token = scanner.scan();
      while (token !== 17 && scanner.getTokenOffset() + scanner.getTokenLength() < offset) {
        token = scanner.scan();
      }
      return (token === 12 || token === 13) && scanner.getTokenOffset() <= offset;
    };
    JSONCompletion2.prototype.fromMarkup = function(markupString) {
      if (markupString && this.doesSupportMarkdown()) {
        return {
          kind: jsonLanguageTypes_1.MarkupKind.Markdown,
          value: markupString
        };
      }
      return void 0;
    };
    JSONCompletion2.prototype.doesSupportMarkdown = function() {
      if (!objects_1.isDefined(this.supportsMarkdown)) {
        var completion = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
        this.supportsMarkdown = completion && completion.completionItem && Array.isArray(completion.completionItem.documentationFormat) && completion.completionItem.documentationFormat.indexOf(jsonLanguageTypes_1.MarkupKind.Markdown) !== -1;
      }
      return this.supportsMarkdown;
    };
    JSONCompletion2.prototype.doesSupportsCommitCharacters = function() {
      if (!objects_1.isDefined(this.supportsCommitCharacters)) {
        var completion = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
        this.supportsCommitCharacters = completion && completion.completionItem && !!completion.completionItem.commitCharactersSupport;
      }
      return this.supportsCommitCharacters;
    };
    return JSONCompletion2;
  }();
  exports2.JSONCompletion = JSONCompletion;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/services/jsonHover", ["require", "exports", "../parser/jsonParser", "../jsonLanguageTypes"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var Parser = require2("../parser/jsonParser");
  var jsonLanguageTypes_1 = require2("../jsonLanguageTypes");
  var JSONHover = function() {
    function JSONHover2(schemaService, contributions, promiseConstructor) {
      if (contributions === void 0) {
        contributions = [];
      }
      this.schemaService = schemaService;
      this.contributions = contributions;
      this.promise = promiseConstructor || Promise;
    }
    JSONHover2.prototype.doHover = function(document, position, doc) {
      var offset = document.offsetAt(position);
      var node = doc.getNodeFromOffset(offset);
      if (!node || (node.type === "object" || node.type === "array") && offset > node.offset + 1 && offset < node.offset + node.length - 1) {
        return this.promise.resolve(null);
      }
      var hoverRangeNode = node;
      if (node.type === "string") {
        var parent = node.parent;
        if (parent && parent.type === "property" && parent.keyNode === node) {
          node = parent.valueNode;
          if (!node) {
            return this.promise.resolve(null);
          }
        }
      }
      var hoverRange = jsonLanguageTypes_1.Range.create(document.positionAt(hoverRangeNode.offset), document.positionAt(hoverRangeNode.offset + hoverRangeNode.length));
      var createHover = function(contents) {
        var result = {
          contents,
          range: hoverRange
        };
        return result;
      };
      var location = Parser.getNodePath(node);
      for (var i = this.contributions.length - 1; i >= 0; i--) {
        var contribution = this.contributions[i];
        var promise = contribution.getInfoContribution(document.uri, location);
        if (promise) {
          return promise.then(function(htmlContent) {
            return createHover(htmlContent);
          });
        }
      }
      return this.schemaService.getSchemaForResource(document.uri, doc).then(function(schema) {
        if (schema) {
          var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
          var title_1 = null;
          var markdownDescription_1 = null;
          var markdownEnumValueDescription_1 = null, enumValue_1 = null;
          matchingSchemas.every(function(s) {
            if (s.node === node && !s.inverted && s.schema) {
              title_1 = title_1 || s.schema.title;
              markdownDescription_1 = markdownDescription_1 || s.schema.markdownDescription || toMarkdown(s.schema.description);
              if (s.schema.enum) {
                var idx = s.schema.enum.indexOf(Parser.getNodeValue(node));
                if (s.schema.markdownEnumDescriptions) {
                  markdownEnumValueDescription_1 = s.schema.markdownEnumDescriptions[idx];
                } else if (s.schema.enumDescriptions) {
                  markdownEnumValueDescription_1 = toMarkdown(s.schema.enumDescriptions[idx]);
                }
                if (markdownEnumValueDescription_1) {
                  enumValue_1 = s.schema.enum[idx];
                  if (typeof enumValue_1 !== "string") {
                    enumValue_1 = JSON.stringify(enumValue_1);
                  }
                }
              }
            }
            return true;
          });
          var result = "";
          if (title_1) {
            result = toMarkdown(title_1);
          }
          if (markdownDescription_1) {
            if (result.length > 0) {
              result += "\n\n";
            }
            result += markdownDescription_1;
          }
          if (markdownEnumValueDescription_1) {
            if (result.length > 0) {
              result += "\n\n";
            }
            result += "`" + toMarkdownCodeBlock(enumValue_1) + "`: " + markdownEnumValueDescription_1;
          }
          return createHover([result]);
        }
        return null;
      });
    };
    return JSONHover2;
  }();
  exports2.JSONHover = JSONHover;
  function toMarkdown(plain) {
    if (plain) {
      var res = plain.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, "$1\n\n$3");
      return res.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
    }
    return void 0;
  }
  function toMarkdownCodeBlock(content) {
    if (content.indexOf("`") !== -1) {
      return "`` " + content + " ``";
    }
    return content;
  }
});
var __extends = this && this.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-uri/index", ["require", "exports"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  var _a;
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var isWindows;
  if (typeof process === "object") {
    isWindows = process.platform === "win32";
  } else if (typeof navigator === "object") {
    var userAgent = navigator.userAgent;
    isWindows = userAgent.indexOf("Windows") >= 0;
  }
  function isHighSurrogate(charCode) {
    return 55296 <= charCode && charCode <= 56319;
  }
  function isLowSurrogate(charCode) {
    return 56320 <= charCode && charCode <= 57343;
  }
  function isLowerAsciiHex(code) {
    return code >= 97 && code <= 102;
  }
  function isLowerAsciiLetter(code) {
    return code >= 97 && code <= 122;
  }
  function isUpperAsciiLetter(code) {
    return code >= 65 && code <= 90;
  }
  function isAsciiLetter(code) {
    return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
  }
  var _schemePattern = /^\w[\w\d+.-]*$/;
  var _singleSlashStart = /^\//;
  var _doubleSlashStart = /^\/\//;
  function _validateUri(ret, _strict) {
    if (!ret.scheme && _strict) {
      throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "' + ret.authority + '", path: "' + ret.path + '", query: "' + ret.query + '", fragment: "' + ret.fragment + '"}');
    }
    if (ret.scheme && !_schemePattern.test(ret.scheme)) {
      throw new Error("[UriError]: Scheme contains illegal characters.");
    }
    if (ret.path) {
      if (ret.authority) {
        if (!_singleSlashStart.test(ret.path)) {
          throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        }
      } else {
        if (_doubleSlashStart.test(ret.path)) {
          throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
        }
      }
    }
  }
  function _schemeFix(scheme, _strict) {
    if (!scheme && !_strict) {
      return "file";
    }
    return scheme;
  }
  function _referenceResolution(scheme, path) {
    switch (scheme) {
      case "https":
      case "http":
      case "file":
        if (!path) {
          path = _slash;
        } else if (path[0] !== _slash) {
          path = _slash + path;
        }
        break;
    }
    return path;
  }
  var _empty = "";
  var _slash = "/";
  var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  var URI = function() {
    function URI2(schemeOrData, authority, path, query, fragment, _strict) {
      if (_strict === void 0) {
        _strict = false;
      }
      if (typeof schemeOrData === "object") {
        this.scheme = schemeOrData.scheme || _empty;
        this.authority = schemeOrData.authority || _empty;
        this.path = schemeOrData.path || _empty;
        this.query = schemeOrData.query || _empty;
        this.fragment = schemeOrData.fragment || _empty;
      } else {
        this.scheme = _schemeFix(schemeOrData, _strict);
        this.authority = authority || _empty;
        this.path = _referenceResolution(this.scheme, path || _empty);
        this.query = query || _empty;
        this.fragment = fragment || _empty;
        _validateUri(this, _strict);
      }
    }
    URI2.isUri = function(thing) {
      if (thing instanceof URI2) {
        return true;
      }
      if (!thing) {
        return false;
      }
      return typeof thing.authority === "string" && typeof thing.fragment === "string" && typeof thing.path === "string" && typeof thing.query === "string" && typeof thing.scheme === "string" && typeof thing.fsPath === "function" && typeof thing.with === "function" && typeof thing.toString === "function";
    };
    Object.defineProperty(URI2.prototype, "fsPath", {
      get: function() {
        return _makeFsPath(this);
      },
      enumerable: true,
      configurable: true
    });
    URI2.prototype.with = function(change) {
      if (!change) {
        return this;
      }
      var scheme = change.scheme, authority = change.authority, path = change.path, query = change.query, fragment = change.fragment;
      if (scheme === void 0) {
        scheme = this.scheme;
      } else if (scheme === null) {
        scheme = _empty;
      }
      if (authority === void 0) {
        authority = this.authority;
      } else if (authority === null) {
        authority = _empty;
      }
      if (path === void 0) {
        path = this.path;
      } else if (path === null) {
        path = _empty;
      }
      if (query === void 0) {
        query = this.query;
      } else if (query === null) {
        query = _empty;
      }
      if (fragment === void 0) {
        fragment = this.fragment;
      } else if (fragment === null) {
        fragment = _empty;
      }
      if (scheme === this.scheme && authority === this.authority && path === this.path && query === this.query && fragment === this.fragment) {
        return this;
      }
      return new _URI(scheme, authority, path, query, fragment);
    };
    URI2.parse = function(value, _strict) {
      if (_strict === void 0) {
        _strict = false;
      }
      var match = _regexp.exec(value);
      if (!match) {
        return new _URI(_empty, _empty, _empty, _empty, _empty);
      }
      return new _URI(match[2] || _empty, decodeURIComponent(match[4] || _empty), decodeURIComponent(match[5] || _empty), decodeURIComponent(match[7] || _empty), decodeURIComponent(match[9] || _empty), _strict);
    };
    URI2.file = function(path) {
      var authority = _empty;
      if (isWindows) {
        path = path.replace(/\\/g, _slash);
      }
      if (path[0] === _slash && path[1] === _slash) {
        var idx = path.indexOf(_slash, 2);
        if (idx === -1) {
          authority = path.substring(2);
          path = _slash;
        } else {
          authority = path.substring(2, idx);
          path = path.substring(idx) || _slash;
        }
      }
      return new _URI("file", authority, path, _empty, _empty);
    };
    URI2.from = function(components) {
      return new _URI(components.scheme, components.authority, components.path, components.query, components.fragment);
    };
    URI2.prototype.toString = function(skipEncoding) {
      if (skipEncoding === void 0) {
        skipEncoding = false;
      }
      return _asFormatted(this, skipEncoding);
    };
    URI2.prototype.toJSON = function() {
      return this;
    };
    URI2.revive = function(data) {
      if (!data) {
        return data;
      } else if (data instanceof URI2) {
        return data;
      } else {
        var result = new _URI(data);
        result._formatted = data.external;
        result._fsPath = data._sep === _pathSepMarker ? data.fsPath : null;
        return result;
      }
    };
    return URI2;
  }();
  exports2.URI = URI;
  var _pathSepMarker = isWindows ? 1 : void 0;
  var _URI = function(_super) {
    __extends(_URI2, _super);
    function _URI2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this._formatted = null;
      _this._fsPath = null;
      return _this;
    }
    Object.defineProperty(_URI2.prototype, "fsPath", {
      get: function() {
        if (!this._fsPath) {
          this._fsPath = _makeFsPath(this);
        }
        return this._fsPath;
      },
      enumerable: true,
      configurable: true
    });
    _URI2.prototype.toString = function(skipEncoding) {
      if (skipEncoding === void 0) {
        skipEncoding = false;
      }
      if (!skipEncoding) {
        if (!this._formatted) {
          this._formatted = _asFormatted(this, false);
        }
        return this._formatted;
      } else {
        return _asFormatted(this, true);
      }
    };
    _URI2.prototype.toJSON = function() {
      var res = {
        $mid: 1
      };
      if (this._fsPath) {
        res.fsPath = this._fsPath;
        res._sep = _pathSepMarker;
      }
      if (this._formatted) {
        res.external = this._formatted;
      }
      if (this.path) {
        res.path = this.path;
      }
      if (this.scheme) {
        res.scheme = this.scheme;
      }
      if (this.authority) {
        res.authority = this.authority;
      }
      if (this.query) {
        res.query = this.query;
      }
      if (this.fragment) {
        res.fragment = this.fragment;
      }
      return res;
    };
    return _URI2;
  }(URI);
  var encodeTable = (_a = {}, _a[58] = "%3A", _a[47] = "%2F", _a[63] = "%3F", _a[35] = "%23", _a[91] = "%5B", _a[93] = "%5D", _a[64] = "%40", _a[33] = "%21", _a[36] = "%24", _a[38] = "%26", _a[39] = "%27", _a[40] = "%28", _a[41] = "%29", _a[42] = "%2A", _a[43] = "%2B", _a[44] = "%2C", _a[59] = "%3B", _a[61] = "%3D", _a[32] = "%20", _a);
  function encodeURIComponentFast(uriComponent, allowSlash) {
    var res = void 0;
    var nativeEncodePos = -1;
    for (var pos = 0; pos < uriComponent.length; pos++) {
      var code = uriComponent.charCodeAt(pos);
      if (code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 48 && code <= 57 || code === 45 || code === 46 || code === 95 || code === 126 || allowSlash && code === 47) {
        if (nativeEncodePos !== -1) {
          res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
          nativeEncodePos = -1;
        }
        if (res !== void 0) {
          res += uriComponent.charAt(pos);
        }
      } else {
        if (res === void 0) {
          res = uriComponent.substr(0, pos);
        }
        var escaped = encodeTable[code];
        if (escaped !== void 0) {
          if (nativeEncodePos !== -1) {
            res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
            nativeEncodePos = -1;
          }
          res += escaped;
        } else if (nativeEncodePos === -1) {
          nativeEncodePos = pos;
        }
      }
    }
    if (nativeEncodePos !== -1) {
      res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
    }
    return res !== void 0 ? res : uriComponent;
  }
  function encodeURIComponentMinimal(path) {
    var res = void 0;
    for (var pos = 0; pos < path.length; pos++) {
      var code = path.charCodeAt(pos);
      if (code === 35 || code === 63) {
        if (res === void 0) {
          res = path.substr(0, pos);
        }
        res += encodeTable[code];
      } else {
        if (res !== void 0) {
          res += path[pos];
        }
      }
    }
    return res !== void 0 ? res : path;
  }
  function _makeFsPath(uri) {
    var value;
    if (uri.authority && uri.path.length > 1 && uri.scheme === "file") {
      value = "//" + uri.authority + uri.path;
    } else if (uri.path.charCodeAt(0) === 47 && (uri.path.charCodeAt(1) >= 65 && uri.path.charCodeAt(1) <= 90 || uri.path.charCodeAt(1) >= 97 && uri.path.charCodeAt(1) <= 122) && uri.path.charCodeAt(2) === 58) {
      value = uri.path[1].toLowerCase() + uri.path.substr(2);
    } else {
      value = uri.path;
    }
    if (isWindows) {
      value = value.replace(/\//g, "\\");
    }
    return value;
  }
  function _asFormatted(uri, skipEncoding) {
    var encoder = !skipEncoding ? encodeURIComponentFast : encodeURIComponentMinimal;
    var res = "";
    var scheme = uri.scheme, authority = uri.authority, path = uri.path, query = uri.query, fragment = uri.fragment;
    if (scheme) {
      res += scheme;
      res += ":";
    }
    if (authority || scheme === "file") {
      res += _slash;
      res += _slash;
    }
    if (authority) {
      var idx = authority.indexOf("@");
      if (idx !== -1) {
        var userinfo = authority.substr(0, idx);
        authority = authority.substr(idx + 1);
        idx = userinfo.indexOf(":");
        if (idx === -1) {
          res += encoder(userinfo, false);
        } else {
          res += encoder(userinfo.substr(0, idx), false);
          res += ":";
          res += encoder(userinfo.substr(idx + 1), false);
        }
        res += "@";
      }
      authority = authority.toLowerCase();
      idx = authority.indexOf(":");
      if (idx === -1) {
        res += encoder(authority, false);
      } else {
        res += encoder(authority.substr(0, idx), false);
        res += authority.substr(idx);
      }
    }
    if (path) {
      if (path.length >= 3 && path.charCodeAt(0) === 47 && path.charCodeAt(2) === 58) {
        var code = path.charCodeAt(1);
        if (code >= 65 && code <= 90) {
          path = "/" + String.fromCharCode(code + 32) + ":" + path.substr(3);
        }
      } else if (path.length >= 2 && path.charCodeAt(1) === 58) {
        var code = path.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          path = String.fromCharCode(code + 32) + ":" + path.substr(2);
        }
      }
      res += encoder(path, true);
    }
    if (query) {
      res += "?";
      res += encoder(query, false);
    }
    if (fragment) {
      res += "#";
      res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
    }
    return res;
  }
});
define("vscode-uri", ["vscode-uri/index"], function(main) {
  return main;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/services/jsonSchemaService", ["require", "exports", "jsonc-parser", "vscode-uri", "../utils/strings", "../parser/jsonParser", "vscode-nls"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var Json = require2("jsonc-parser");
  var vscode_uri_1 = require2("vscode-uri");
  var Strings = require2("../utils/strings");
  var Parser = require2("../parser/jsonParser");
  var nls = require2("vscode-nls");
  var localize = nls.loadMessageBundle();
  var FilePatternAssociation = function() {
    function FilePatternAssociation2(pattern) {
      try {
        this.patternRegExp = new RegExp(Strings.convertSimple2RegExpPattern(pattern) + "$");
      } catch (e) {
        this.patternRegExp = null;
      }
      this.schemas = [];
    }
    FilePatternAssociation2.prototype.addSchema = function(id) {
      this.schemas.push(id);
    };
    FilePatternAssociation2.prototype.matchesPattern = function(fileName) {
      return this.patternRegExp && this.patternRegExp.test(fileName);
    };
    FilePatternAssociation2.prototype.getSchemas = function() {
      return this.schemas;
    };
    return FilePatternAssociation2;
  }();
  var SchemaHandle = function() {
    function SchemaHandle2(service, url, unresolvedSchemaContent) {
      this.service = service;
      this.url = url;
      this.dependencies = {};
      if (unresolvedSchemaContent) {
        this.unresolvedSchema = this.service.promise.resolve(new UnresolvedSchema(unresolvedSchemaContent));
      }
    }
    SchemaHandle2.prototype.getUnresolvedSchema = function() {
      if (!this.unresolvedSchema) {
        this.unresolvedSchema = this.service.loadSchema(this.url);
      }
      return this.unresolvedSchema;
    };
    SchemaHandle2.prototype.getResolvedSchema = function() {
      var _this = this;
      if (!this.resolvedSchema) {
        this.resolvedSchema = this.getUnresolvedSchema().then(function(unresolved) {
          return _this.service.resolveSchemaContent(unresolved, _this.url, _this.dependencies);
        });
      }
      return this.resolvedSchema;
    };
    SchemaHandle2.prototype.clearSchema = function() {
      this.resolvedSchema = null;
      this.unresolvedSchema = null;
      this.dependencies = {};
    };
    return SchemaHandle2;
  }();
  var UnresolvedSchema = function() {
    function UnresolvedSchema2(schema, errors) {
      if (errors === void 0) {
        errors = [];
      }
      this.schema = schema;
      this.errors = errors;
    }
    return UnresolvedSchema2;
  }();
  exports2.UnresolvedSchema = UnresolvedSchema;
  var ResolvedSchema = function() {
    function ResolvedSchema2(schema, errors) {
      if (errors === void 0) {
        errors = [];
      }
      this.schema = schema;
      this.errors = errors;
    }
    ResolvedSchema2.prototype.getSection = function(path) {
      return Parser.asSchema(this.getSectionRecursive(path, this.schema));
    };
    ResolvedSchema2.prototype.getSectionRecursive = function(path, schema) {
      if (!schema || typeof schema === "boolean" || path.length === 0) {
        return schema;
      }
      var next = path.shift();
      if (schema.properties && typeof schema.properties[next]) {
        return this.getSectionRecursive(path, schema.properties[next]);
      } else if (schema.patternProperties) {
        for (var _i = 0, _a = Object.keys(schema.patternProperties); _i < _a.length; _i++) {
          var pattern = _a[_i];
          var regex = new RegExp(pattern);
          if (regex.test(next)) {
            return this.getSectionRecursive(path, schema.patternProperties[pattern]);
          }
        }
      } else if (typeof schema.additionalProperties === "object") {
        return this.getSectionRecursive(path, schema.additionalProperties);
      } else if (next.match("[0-9]+")) {
        if (Array.isArray(schema.items)) {
          var index = parseInt(next, 10);
          if (!isNaN(index) && schema.items[index]) {
            return this.getSectionRecursive(path, schema.items[index]);
          }
        } else if (schema.items) {
          return this.getSectionRecursive(path, schema.items);
        }
      }
      return null;
    };
    return ResolvedSchema2;
  }();
  exports2.ResolvedSchema = ResolvedSchema;
  var JSONSchemaService = function() {
    function JSONSchemaService2(requestService, contextService, promiseConstructor) {
      this.contextService = contextService;
      this.requestService = requestService;
      this.promiseConstructor = promiseConstructor || Promise;
      this.callOnDispose = [];
      this.contributionSchemas = {};
      this.contributionAssociations = {};
      this.schemasById = {};
      this.filePatternAssociations = [];
      this.filePatternAssociationById = {};
      this.registeredSchemasIds = {};
    }
    JSONSchemaService2.prototype.getRegisteredSchemaIds = function(filter) {
      return Object.keys(this.registeredSchemasIds).filter(function(id) {
        var scheme = vscode_uri_1.URI.parse(id).scheme;
        return scheme !== "schemaservice" && (!filter || filter(scheme));
      });
    };
    Object.defineProperty(JSONSchemaService2.prototype, "promise", {
      get: function() {
        return this.promiseConstructor;
      },
      enumerable: true,
      configurable: true
    });
    JSONSchemaService2.prototype.dispose = function() {
      while (this.callOnDispose.length > 0) {
        this.callOnDispose.pop()();
      }
    };
    JSONSchemaService2.prototype.onResourceChange = function(uri) {
      var _this = this;
      var hasChanges = false;
      uri = this.normalizeId(uri);
      var toWalk = [uri];
      var all = Object.keys(this.schemasById).map(function(key) {
        return _this.schemasById[key];
      });
      while (toWalk.length) {
        var curr = toWalk.pop();
        for (var i = 0; i < all.length; i++) {
          var handle = all[i];
          if (handle && (handle.url === curr || handle.dependencies[curr])) {
            if (handle.url !== curr) {
              toWalk.push(handle.url);
            }
            handle.clearSchema();
            all[i] = void 0;
            hasChanges = true;
          }
        }
      }
      return hasChanges;
    };
    JSONSchemaService2.prototype.normalizeId = function(id) {
      try {
        return vscode_uri_1.URI.parse(id).toString();
      } catch (e) {
        return id;
      }
    };
    JSONSchemaService2.prototype.setSchemaContributions = function(schemaContributions) {
      if (schemaContributions.schemas) {
        var schemas = schemaContributions.schemas;
        for (var id in schemas) {
          var normalizedId = this.normalizeId(id);
          this.contributionSchemas[normalizedId] = this.addSchemaHandle(normalizedId, schemas[id]);
        }
      }
      if (schemaContributions.schemaAssociations) {
        var schemaAssociations = schemaContributions.schemaAssociations;
        for (var pattern in schemaAssociations) {
          var associations = schemaAssociations[pattern];
          this.contributionAssociations[pattern] = associations;
          var fpa = this.getOrAddFilePatternAssociation(pattern);
          for (var _i = 0, associations_1 = associations; _i < associations_1.length; _i++) {
            var schemaId = associations_1[_i];
            var id = this.normalizeId(schemaId);
            fpa.addSchema(id);
          }
        }
      }
    };
    JSONSchemaService2.prototype.addSchemaHandle = function(id, unresolvedSchemaContent) {
      var schemaHandle = new SchemaHandle(this, id, unresolvedSchemaContent);
      this.schemasById[id] = schemaHandle;
      return schemaHandle;
    };
    JSONSchemaService2.prototype.getOrAddSchemaHandle = function(id, unresolvedSchemaContent) {
      return this.schemasById[id] || this.addSchemaHandle(id, unresolvedSchemaContent);
    };
    JSONSchemaService2.prototype.getOrAddFilePatternAssociation = function(pattern) {
      var fpa = this.filePatternAssociationById[pattern];
      if (!fpa) {
        fpa = new FilePatternAssociation(pattern);
        this.filePatternAssociationById[pattern] = fpa;
        this.filePatternAssociations.push(fpa);
      }
      return fpa;
    };
    JSONSchemaService2.prototype.registerExternalSchema = function(uri, filePatterns, unresolvedSchemaContent) {
      if (filePatterns === void 0) {
        filePatterns = null;
      }
      var id = this.normalizeId(uri);
      this.registeredSchemasIds[id] = true;
      if (filePatterns) {
        for (var _i = 0, filePatterns_1 = filePatterns; _i < filePatterns_1.length; _i++) {
          var pattern = filePatterns_1[_i];
          this.getOrAddFilePatternAssociation(pattern).addSchema(id);
        }
      }
      return unresolvedSchemaContent ? this.addSchemaHandle(id, unresolvedSchemaContent) : this.getOrAddSchemaHandle(id);
    };
    JSONSchemaService2.prototype.clearExternalSchemas = function() {
      this.schemasById = {};
      this.filePatternAssociations = [];
      this.filePatternAssociationById = {};
      this.registeredSchemasIds = {};
      for (var id in this.contributionSchemas) {
        this.schemasById[id] = this.contributionSchemas[id];
        this.registeredSchemasIds[id] = true;
      }
      for (var pattern in this.contributionAssociations) {
        var fpa = this.getOrAddFilePatternAssociation(pattern);
        for (var _i = 0, _a = this.contributionAssociations[pattern]; _i < _a.length; _i++) {
          var schemaId = _a[_i];
          var id = this.normalizeId(schemaId);
          fpa.addSchema(id);
        }
      }
    };
    JSONSchemaService2.prototype.getResolvedSchema = function(schemaId) {
      var id = this.normalizeId(schemaId);
      var schemaHandle = this.schemasById[id];
      if (schemaHandle) {
        return schemaHandle.getResolvedSchema();
      }
      return this.promise.resolve(null);
    };
    JSONSchemaService2.prototype.loadSchema = function(url) {
      if (!this.requestService) {
        var errorMessage = localize("json.schema.norequestservice", "Unable to load schema from '{0}'. No schema request service available", toDisplayString(url));
        return this.promise.resolve(new UnresolvedSchema({}, [errorMessage]));
      }
      return this.requestService(url).then(function(content) {
        if (!content) {
          var errorMessage2 = localize("json.schema.nocontent", "Unable to load schema from '{0}': No content.", toDisplayString(url));
          return new UnresolvedSchema({}, [errorMessage2]);
        }
        var schemaContent = {};
        var jsonErrors = [];
        schemaContent = Json.parse(content, jsonErrors);
        var errors = jsonErrors.length ? [localize("json.schema.invalidFormat", "Unable to parse content from '{0}': Parse error at offset {1}.", toDisplayString(url), jsonErrors[0].offset)] : [];
        return new UnresolvedSchema(schemaContent, errors);
      }, function(error) {
        var errorMessage2 = error.toString();
        var errorSplit = error.toString().split("Error: ");
        if (errorSplit.length > 1) {
          errorMessage2 = errorSplit[1];
        }
        if (Strings.endsWith(errorMessage2, ".")) {
          errorMessage2 = errorMessage2.substr(0, errorMessage2.length - 1);
        }
        return new UnresolvedSchema({}, [localize("json.schema.nocontent", "Unable to load schema from '{0}': {1}.", toDisplayString(url), errorMessage2)]);
      });
    };
    JSONSchemaService2.prototype.resolveSchemaContent = function(schemaToResolve, schemaURL, dependencies) {
      var _this = this;
      var resolveErrors = schemaToResolve.errors.slice(0);
      var schema = schemaToResolve.schema;
      if (schema.$schema) {
        var id = this.normalizeId(schema.$schema);
        if (id === "http://json-schema.org/draft-03/schema") {
          return this.promise.resolve(new ResolvedSchema({}, [localize("json.schema.draft03.notsupported", "Draft-03 schemas are not supported.")]));
        } else if (id === "https://json-schema.org/draft/2019-09/schema") {
          schemaToResolve.errors.push(localize("json.schema.draft201909.notsupported", "Draft 2019-09 schemas are not yet fully supported."));
        }
      }
      var contextService = this.contextService;
      var findSection = function(schema2, path) {
        if (!path) {
          return schema2;
        }
        var current = schema2;
        if (path[0] === "/") {
          path = path.substr(1);
        }
        path.split("/").some(function(part) {
          current = current[part];
          return !current;
        });
        return current;
      };
      var merge = function(target, sourceRoot, sourceURI, path) {
        var section = findSection(sourceRoot, path);
        if (section) {
          for (var key in section) {
            if (section.hasOwnProperty(key) && !target.hasOwnProperty(key)) {
              target[key] = section[key];
            }
          }
        } else {
          resolveErrors.push(localize("json.schema.invalidref", "$ref '{0}' in '{1}' can not be resolved.", path, sourceURI));
        }
      };
      var resolveExternalLink = function(node, uri, linkPath, parentSchemaURL, parentSchemaDependencies) {
        if (contextService && !/^\w+:\/\/.*/.test(uri)) {
          uri = contextService.resolveRelativePath(uri, parentSchemaURL);
        }
        uri = _this.normalizeId(uri);
        var referencedHandle = _this.getOrAddSchemaHandle(uri);
        return referencedHandle.getUnresolvedSchema().then(function(unresolvedSchema) {
          parentSchemaDependencies[uri] = true;
          if (unresolvedSchema.errors.length) {
            var loc = linkPath ? uri + "#" + linkPath : uri;
            resolveErrors.push(localize("json.schema.problemloadingref", "Problems loading reference '{0}': {1}", loc, unresolvedSchema.errors[0]));
          }
          merge(node, unresolvedSchema.schema, uri, linkPath);
          return resolveRefs(node, unresolvedSchema.schema, uri, referencedHandle.dependencies);
        });
      };
      var resolveRefs = function(node, parentSchema, parentSchemaURL, parentSchemaDependencies) {
        if (!node || typeof node !== "object") {
          return Promise.resolve(null);
        }
        var toWalk = [node];
        var seen = [];
        var openPromises = [];
        var collectEntries = function() {
          var entries = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
          }
          for (var _a = 0, entries_1 = entries; _a < entries_1.length; _a++) {
            var entry = entries_1[_a];
            if (typeof entry === "object") {
              toWalk.push(entry);
            }
          }
        };
        var collectMapEntries = function() {
          var maps = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            maps[_i] = arguments[_i];
          }
          for (var _a = 0, maps_1 = maps; _a < maps_1.length; _a++) {
            var map = maps_1[_a];
            if (typeof map === "object") {
              for (var key in map) {
                var entry = map[key];
                if (typeof entry === "object") {
                  toWalk.push(entry);
                }
              }
            }
          }
        };
        var collectArrayEntries = function() {
          var arrays = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
          }
          for (var _a = 0, arrays_1 = arrays; _a < arrays_1.length; _a++) {
            var array = arrays_1[_a];
            if (Array.isArray(array)) {
              for (var _b = 0, array_1 = array; _b < array_1.length; _b++) {
                var entry = array_1[_b];
                if (typeof entry === "object") {
                  toWalk.push(entry);
                }
              }
            }
          }
        };
        var handleRef = function(next2) {
          var seenRefs = [];
          while (next2.$ref) {
            var ref = next2.$ref;
            var segments = ref.split("#", 2);
            delete next2.$ref;
            if (segments[0].length > 0) {
              openPromises.push(resolveExternalLink(next2, segments[0], segments[1], parentSchemaURL, parentSchemaDependencies));
              return;
            } else {
              if (seenRefs.indexOf(ref) === -1) {
                merge(next2, parentSchema, parentSchemaURL, segments[1]);
                seenRefs.push(ref);
              }
            }
          }
          collectEntries(next2.items, next2.additionalProperties, next2.not, next2.contains, next2.propertyNames, next2.if, next2.then, next2.else);
          collectMapEntries(next2.definitions, next2.properties, next2.patternProperties, next2.dependencies);
          collectArrayEntries(next2.anyOf, next2.allOf, next2.oneOf, next2.items);
        };
        while (toWalk.length) {
          var next = toWalk.pop();
          if (seen.indexOf(next) >= 0) {
            continue;
          }
          seen.push(next);
          handleRef(next);
        }
        return _this.promise.all(openPromises);
      };
      return resolveRefs(schema, schema, schemaURL, dependencies).then(function(_) {
        return new ResolvedSchema(schema, resolveErrors);
      });
    };
    JSONSchemaService2.prototype.getSchemaForResource = function(resource, document) {
      if (document && document.root && document.root.type === "object") {
        var schemaProperties = document.root.properties.filter(function(p) {
          return p.keyNode.value === "$schema" && p.valueNode && p.valueNode.type === "string";
        });
        if (schemaProperties.length > 0) {
          var schemeId = Parser.getNodeValue(schemaProperties[0].valueNode);
          if (schemeId && Strings.startsWith(schemeId, ".") && this.contextService) {
            schemeId = this.contextService.resolveRelativePath(schemeId, resource);
          }
          if (schemeId) {
            var id = this.normalizeId(schemeId);
            return this.getOrAddSchemaHandle(id).getResolvedSchema();
          }
        }
      }
      var seen = Object.create(null);
      var schemas = [];
      for (var _i = 0, _a = this.filePatternAssociations; _i < _a.length; _i++) {
        var entry = _a[_i];
        if (entry.matchesPattern(resource)) {
          for (var _b = 0, _c = entry.getSchemas(); _b < _c.length; _b++) {
            var schemaId = _c[_b];
            if (!seen[schemaId]) {
              schemas.push(schemaId);
              seen[schemaId] = true;
            }
          }
        }
      }
      if (schemas.length > 0) {
        return this.createCombinedSchema(resource, schemas).getResolvedSchema();
      }
      return this.promise.resolve(null);
    };
    JSONSchemaService2.prototype.createCombinedSchema = function(resource, schemaIds) {
      if (schemaIds.length === 1) {
        return this.getOrAddSchemaHandle(schemaIds[0]);
      } else {
        var combinedSchemaId = "schemaservice://combinedSchema/" + encodeURIComponent(resource);
        var combinedSchema = {
          allOf: schemaIds.map(function(schemaId) {
            return {
              $ref: schemaId
            };
          })
        };
        return this.addSchemaHandle(combinedSchemaId, combinedSchema);
      }
    };
    return JSONSchemaService2;
  }();
  exports2.JSONSchemaService = JSONSchemaService;
  function toDisplayString(url) {
    try {
      var uri = vscode_uri_1.URI.parse(url);
      if (uri.scheme === "file") {
        return uri.fsPath;
      }
    } catch (e) {
    }
    return url;
  }
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/services/jsonValidation", ["require", "exports", "./jsonSchemaService", "../jsonLanguageTypes", "vscode-nls", "../utils/objects"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var jsonSchemaService_1 = require2("./jsonSchemaService");
  var jsonLanguageTypes_1 = require2("../jsonLanguageTypes");
  var nls = require2("vscode-nls");
  var objects_1 = require2("../utils/objects");
  var localize = nls.loadMessageBundle();
  var JSONValidation = function() {
    function JSONValidation2(jsonSchemaService, promiseConstructor) {
      this.jsonSchemaService = jsonSchemaService;
      this.promise = promiseConstructor;
      this.validationEnabled = true;
    }
    JSONValidation2.prototype.configure = function(raw) {
      if (raw) {
        this.validationEnabled = raw.validate;
        this.commentSeverity = raw.allowComments ? void 0 : jsonLanguageTypes_1.DiagnosticSeverity.Error;
      }
    };
    JSONValidation2.prototype.doValidation = function(textDocument, jsonDocument, documentSettings, schema) {
      var _this = this;
      if (!this.validationEnabled) {
        return this.promise.resolve([]);
      }
      var diagnostics = [];
      var added = {};
      var addProblem = function(problem) {
        var signature = problem.range.start.line + " " + problem.range.start.character + " " + problem.message;
        if (!added[signature]) {
          added[signature] = true;
          diagnostics.push(problem);
        }
      };
      var getDiagnostics = function(schema2) {
        var trailingCommaSeverity = documentSettings ? toDiagnosticSeverity(documentSettings.trailingCommas) : jsonLanguageTypes_1.DiagnosticSeverity.Error;
        var commentSeverity = documentSettings ? toDiagnosticSeverity(documentSettings.comments) : _this.commentSeverity;
        if (schema2) {
          if (schema2.errors.length && jsonDocument.root) {
            var astRoot = jsonDocument.root;
            var property = astRoot.type === "object" ? astRoot.properties[0] : null;
            if (property && property.keyNode.value === "$schema") {
              var node = property.valueNode || property;
              var range = jsonLanguageTypes_1.Range.create(textDocument.positionAt(node.offset), textDocument.positionAt(node.offset + node.length));
              addProblem(jsonLanguageTypes_1.Diagnostic.create(range, schema2.errors[0], jsonLanguageTypes_1.DiagnosticSeverity.Warning, jsonLanguageTypes_1.ErrorCode.SchemaResolveError));
            } else {
              var range = jsonLanguageTypes_1.Range.create(textDocument.positionAt(astRoot.offset), textDocument.positionAt(astRoot.offset + 1));
              addProblem(jsonLanguageTypes_1.Diagnostic.create(range, schema2.errors[0], jsonLanguageTypes_1.DiagnosticSeverity.Warning, jsonLanguageTypes_1.ErrorCode.SchemaResolveError));
            }
          } else {
            var semanticErrors = jsonDocument.validate(textDocument, schema2.schema);
            if (semanticErrors) {
              semanticErrors.forEach(addProblem);
            }
          }
          if (schemaAllowsComments(schema2.schema)) {
            commentSeverity = void 0;
          }
          if (schemaAllowsTrailingCommas(schema2.schema)) {
            trailingCommaSeverity = void 0;
          }
        }
        for (var _i = 0, _a = jsonDocument.syntaxErrors; _i < _a.length; _i++) {
          var p = _a[_i];
          if (p.code === jsonLanguageTypes_1.ErrorCode.TrailingComma) {
            if (typeof trailingCommaSeverity !== "number") {
              continue;
            }
            p.severity = trailingCommaSeverity;
          }
          addProblem(p);
        }
        if (typeof commentSeverity === "number") {
          var message_1 = localize("InvalidCommentToken", "Comments are not permitted in JSON.");
          jsonDocument.comments.forEach(function(c) {
            addProblem(jsonLanguageTypes_1.Diagnostic.create(c, message_1, commentSeverity, jsonLanguageTypes_1.ErrorCode.CommentNotPermitted));
          });
        }
        return diagnostics;
      };
      if (schema) {
        var id = schema.id || "schemaservice://untitled/" + idCounter++;
        return this.jsonSchemaService.resolveSchemaContent(new jsonSchemaService_1.UnresolvedSchema(schema), id, {}).then(function(resolvedSchema) {
          return getDiagnostics(resolvedSchema);
        });
      }
      return this.jsonSchemaService.getSchemaForResource(textDocument.uri, jsonDocument).then(function(schema2) {
        return getDiagnostics(schema2);
      });
    };
    return JSONValidation2;
  }();
  exports2.JSONValidation = JSONValidation;
  var idCounter = 0;
  function schemaAllowsComments(schemaRef) {
    if (schemaRef && typeof schemaRef === "object") {
      if (objects_1.isBoolean(schemaRef.allowComments)) {
        return schemaRef.allowComments;
      }
      if (schemaRef.allOf) {
        for (var _i = 0, _a = schemaRef.allOf; _i < _a.length; _i++) {
          var schema = _a[_i];
          var allow = schemaAllowsComments(schema);
          if (objects_1.isBoolean(allow)) {
            return allow;
          }
        }
      }
    }
    return void 0;
  }
  function schemaAllowsTrailingCommas(schemaRef) {
    if (schemaRef && typeof schemaRef === "object") {
      if (objects_1.isBoolean(schemaRef.allowTrailingCommas)) {
        return schemaRef.allowTrailingCommas;
      }
      if (objects_1.isBoolean(schemaRef["allowsTrailingCommas"])) {
        return schemaRef["allowsTrailingCommas"];
      }
      if (schemaRef.allOf) {
        for (var _i = 0, _a = schemaRef.allOf; _i < _a.length; _i++) {
          var schema = _a[_i];
          var allow = schemaAllowsTrailingCommas(schema);
          if (objects_1.isBoolean(allow)) {
            return allow;
          }
        }
      }
    }
    return void 0;
  }
  function toDiagnosticSeverity(severityLevel) {
    switch (severityLevel) {
      case "error":
        return jsonLanguageTypes_1.DiagnosticSeverity.Error;
      case "warning":
        return jsonLanguageTypes_1.DiagnosticSeverity.Warning;
      case "ignore":
        return void 0;
    }
    return void 0;
  }
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/utils/colors", ["require", "exports"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var Digit0 = 48;
  var Digit9 = 57;
  var A = 65;
  var a = 97;
  var f = 102;
  function hexDigit(charCode) {
    if (charCode < Digit0) {
      return 0;
    }
    if (charCode <= Digit9) {
      return charCode - Digit0;
    }
    if (charCode < a) {
      charCode += a - A;
    }
    if (charCode >= a && charCode <= f) {
      return charCode - a + 10;
    }
    return 0;
  }
  exports2.hexDigit = hexDigit;
  function colorFromHex(text) {
    if (text[0] !== "#") {
      return null;
    }
    switch (text.length) {
      case 4:
        return {
          red: hexDigit(text.charCodeAt(1)) * 17 / 255,
          green: hexDigit(text.charCodeAt(2)) * 17 / 255,
          blue: hexDigit(text.charCodeAt(3)) * 17 / 255,
          alpha: 1
        };
      case 5:
        return {
          red: hexDigit(text.charCodeAt(1)) * 17 / 255,
          green: hexDigit(text.charCodeAt(2)) * 17 / 255,
          blue: hexDigit(text.charCodeAt(3)) * 17 / 255,
          alpha: hexDigit(text.charCodeAt(4)) * 17 / 255
        };
      case 7:
        return {
          red: (hexDigit(text.charCodeAt(1)) * 16 + hexDigit(text.charCodeAt(2))) / 255,
          green: (hexDigit(text.charCodeAt(3)) * 16 + hexDigit(text.charCodeAt(4))) / 255,
          blue: (hexDigit(text.charCodeAt(5)) * 16 + hexDigit(text.charCodeAt(6))) / 255,
          alpha: 1
        };
      case 9:
        return {
          red: (hexDigit(text.charCodeAt(1)) * 16 + hexDigit(text.charCodeAt(2))) / 255,
          green: (hexDigit(text.charCodeAt(3)) * 16 + hexDigit(text.charCodeAt(4))) / 255,
          blue: (hexDigit(text.charCodeAt(5)) * 16 + hexDigit(text.charCodeAt(6))) / 255,
          alpha: (hexDigit(text.charCodeAt(7)) * 16 + hexDigit(text.charCodeAt(8))) / 255
        };
    }
    return null;
  }
  exports2.colorFromHex = colorFromHex;
  function colorFrom256RGB(red, green, blue, alpha) {
    if (alpha === void 0) {
      alpha = 1;
    }
    return {
      red: red / 255,
      green: green / 255,
      blue: blue / 255,
      alpha
    };
  }
  exports2.colorFrom256RGB = colorFrom256RGB;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/services/jsonDocumentSymbols", ["require", "exports", "../parser/jsonParser", "../utils/strings", "../utils/colors", "../jsonLanguageTypes"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var Parser = require2("../parser/jsonParser");
  var Strings = require2("../utils/strings");
  var colors_1 = require2("../utils/colors");
  var jsonLanguageTypes_1 = require2("../jsonLanguageTypes");
  var JSONDocumentSymbols = function() {
    function JSONDocumentSymbols2(schemaService) {
      this.schemaService = schemaService;
    }
    JSONDocumentSymbols2.prototype.findDocumentSymbols = function(document, doc, context) {
      var _this = this;
      if (context === void 0) {
        context = {
          resultLimit: Number.MAX_VALUE
        };
      }
      var root = doc.root;
      if (!root) {
        return null;
      }
      var limit = context.resultLimit;
      var resourceString = document.uri;
      if (resourceString === "vscode://defaultsettings/keybindings.json" || Strings.endsWith(resourceString.toLowerCase(), "/user/keybindings.json")) {
        if (root.type === "array") {
          var result_1 = [];
          for (var _i = 0, _a = root.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.type === "object") {
              for (var _b = 0, _c = item.properties; _b < _c.length; _b++) {
                var property = _c[_b];
                if (property.keyNode.value === "key" && property.valueNode) {
                  var location = jsonLanguageTypes_1.Location.create(document.uri, getRange(document, item));
                  result_1.push({
                    name: Parser.getNodeValue(property.valueNode),
                    kind: jsonLanguageTypes_1.SymbolKind.Function,
                    location
                  });
                  limit--;
                  if (limit <= 0) {
                    if (context && context.onResultLimitExceeded) {
                      context.onResultLimitExceeded(resourceString);
                    }
                    return result_1;
                  }
                }
              }
            }
          }
          return result_1;
        }
      }
      var toVisit = [{
        node: root,
        containerName: ""
      }];
      var nextToVisit = 0;
      var limitExceeded = false;
      var result = [];
      var collectOutlineEntries = function(node, containerName) {
        if (node.type === "array") {
          node.items.forEach(function(node2) {
            if (node2) {
              toVisit.push({
                node: node2,
                containerName
              });
            }
          });
        } else if (node.type === "object") {
          node.properties.forEach(function(property2) {
            var valueNode = property2.valueNode;
            if (valueNode) {
              if (limit > 0) {
                limit--;
                var location2 = jsonLanguageTypes_1.Location.create(document.uri, getRange(document, property2));
                var childContainerName = containerName ? containerName + "." + property2.keyNode.value : property2.keyNode.value;
                result.push({
                  name: _this.getKeyLabel(property2),
                  kind: _this.getSymbolKind(valueNode.type),
                  location: location2,
                  containerName
                });
                toVisit.push({
                  node: valueNode,
                  containerName: childContainerName
                });
              } else {
                limitExceeded = true;
              }
            }
          });
        }
      };
      while (nextToVisit < toVisit.length) {
        var next = toVisit[nextToVisit++];
        collectOutlineEntries(next.node, next.containerName);
      }
      if (limitExceeded && context && context.onResultLimitExceeded) {
        context.onResultLimitExceeded(resourceString);
      }
      return result;
    };
    JSONDocumentSymbols2.prototype.findDocumentSymbols2 = function(document, doc, context) {
      var _this = this;
      if (context === void 0) {
        context = {
          resultLimit: Number.MAX_VALUE
        };
      }
      var root = doc.root;
      if (!root) {
        return null;
      }
      var limit = context.resultLimit;
      var resourceString = document.uri;
      if (resourceString === "vscode://defaultsettings/keybindings.json" || Strings.endsWith(resourceString.toLowerCase(), "/user/keybindings.json")) {
        if (root.type === "array") {
          var result_2 = [];
          for (var _i = 0, _a = root.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.type === "object") {
              for (var _b = 0, _c = item.properties; _b < _c.length; _b++) {
                var property = _c[_b];
                if (property.keyNode.value === "key" && property.valueNode) {
                  var range = getRange(document, item);
                  var selectionRange = getRange(document, property.keyNode);
                  result_2.push({
                    name: Parser.getNodeValue(property.valueNode),
                    kind: jsonLanguageTypes_1.SymbolKind.Function,
                    range,
                    selectionRange
                  });
                  limit--;
                  if (limit <= 0) {
                    if (context && context.onResultLimitExceeded) {
                      context.onResultLimitExceeded(resourceString);
                    }
                    return result_2;
                  }
                }
              }
            }
          }
          return result_2;
        }
      }
      var result = [];
      var toVisit = [{
        node: root,
        result
      }];
      var nextToVisit = 0;
      var limitExceeded = false;
      var collectOutlineEntries = function(node, result2) {
        if (node.type === "array") {
          node.items.forEach(function(node2, index) {
            if (node2) {
              if (limit > 0) {
                limit--;
                var range2 = getRange(document, node2);
                var selectionRange2 = range2;
                var name = String(index);
                var symbol = {
                  name,
                  kind: _this.getSymbolKind(node2.type),
                  range: range2,
                  selectionRange: selectionRange2,
                  children: []
                };
                result2.push(symbol);
                toVisit.push({
                  result: symbol.children,
                  node: node2
                });
              } else {
                limitExceeded = true;
              }
            }
          });
        } else if (node.type === "object") {
          node.properties.forEach(function(property2) {
            var valueNode = property2.valueNode;
            if (valueNode) {
              if (limit > 0) {
                limit--;
                var range2 = getRange(document, property2);
                var selectionRange2 = getRange(document, property2.keyNode);
                var symbol = {
                  name: _this.getKeyLabel(property2),
                  kind: _this.getSymbolKind(valueNode.type),
                  range: range2,
                  selectionRange: selectionRange2,
                  children: []
                };
                result2.push(symbol);
                toVisit.push({
                  result: symbol.children,
                  node: valueNode
                });
              } else {
                limitExceeded = true;
              }
            }
          });
        }
      };
      while (nextToVisit < toVisit.length) {
        var next = toVisit[nextToVisit++];
        collectOutlineEntries(next.node, next.result);
      }
      if (limitExceeded && context && context.onResultLimitExceeded) {
        context.onResultLimitExceeded(resourceString);
      }
      return result;
    };
    JSONDocumentSymbols2.prototype.getSymbolKind = function(nodeType) {
      switch (nodeType) {
        case "object":
          return jsonLanguageTypes_1.SymbolKind.Module;
        case "string":
          return jsonLanguageTypes_1.SymbolKind.String;
        case "number":
          return jsonLanguageTypes_1.SymbolKind.Number;
        case "array":
          return jsonLanguageTypes_1.SymbolKind.Array;
        case "boolean":
          return jsonLanguageTypes_1.SymbolKind.Boolean;
        default:
          return jsonLanguageTypes_1.SymbolKind.Variable;
      }
    };
    JSONDocumentSymbols2.prototype.getKeyLabel = function(property) {
      var name = property.keyNode.value;
      if (name) {
        name = name.replace(/[\n]/g, "↵");
      }
      if (name && name.trim()) {
        return name;
      }
      return '"' + name + '"';
    };
    JSONDocumentSymbols2.prototype.findDocumentColors = function(document, doc, context) {
      return this.schemaService.getSchemaForResource(document.uri, doc).then(function(schema) {
        var result = [];
        if (schema) {
          var limit = context && typeof context.resultLimit === "number" ? context.resultLimit : Number.MAX_VALUE;
          var matchingSchemas = doc.getMatchingSchemas(schema.schema);
          var visitedNode = {};
          for (var _i = 0, matchingSchemas_1 = matchingSchemas; _i < matchingSchemas_1.length; _i++) {
            var s = matchingSchemas_1[_i];
            if (!s.inverted && s.schema && (s.schema.format === "color" || s.schema.format === "color-hex") && s.node && s.node.type === "string") {
              var nodeId = String(s.node.offset);
              if (!visitedNode[nodeId]) {
                var color = colors_1.colorFromHex(Parser.getNodeValue(s.node));
                if (color) {
                  var range = getRange(document, s.node);
                  result.push({
                    color,
                    range
                  });
                }
                visitedNode[nodeId] = true;
                limit--;
                if (limit <= 0) {
                  if (context && context.onResultLimitExceeded) {
                    context.onResultLimitExceeded(document.uri);
                  }
                  return result;
                }
              }
            }
          }
        }
        return result;
      });
    };
    JSONDocumentSymbols2.prototype.getColorPresentations = function(document, doc, color, range) {
      var result = [];
      var red256 = Math.round(color.red * 255), green256 = Math.round(color.green * 255), blue256 = Math.round(color.blue * 255);
      function toTwoDigitHex(n) {
        var r = n.toString(16);
        return r.length !== 2 ? "0" + r : r;
      }
      var label;
      if (color.alpha === 1) {
        label = "#" + toTwoDigitHex(red256) + toTwoDigitHex(green256) + toTwoDigitHex(blue256);
      } else {
        label = "#" + toTwoDigitHex(red256) + toTwoDigitHex(green256) + toTwoDigitHex(blue256) + toTwoDigitHex(Math.round(color.alpha * 255));
      }
      result.push({
        label,
        textEdit: jsonLanguageTypes_1.TextEdit.replace(range, JSON.stringify(label))
      });
      return result;
    };
    return JSONDocumentSymbols2;
  }();
  exports2.JSONDocumentSymbols = JSONDocumentSymbols;
  function getRange(document, node) {
    return jsonLanguageTypes_1.Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
  }
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/services/configuration", ["require", "exports", "vscode-nls"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var nls = require2("vscode-nls");
  var localize = nls.loadMessageBundle();
  exports2.schemaContributions = {
    schemaAssociations: {},
    schemas: {
      "http://json-schema.org/draft-04/schema#": {
        title: localize("schema.json", "Describes a JSON file using a schema. See json-schema.org for more info."),
        $schema: "http://json-schema.org/draft-04/schema#",
        definitions: {
          schemaArray: {
            type: "array",
            minItems: 1,
            items: {
              $ref: "#"
            }
          },
          positiveInteger: {
            type: "integer",
            minimum: 0
          },
          positiveIntegerDefault0: {
            allOf: [{
              $ref: "#/definitions/positiveInteger"
            }, {
              default: 0
            }]
          },
          simpleTypes: {
            type: "string",
            enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
          },
          stringArray: {
            type: "array",
            items: {
              type: "string"
            },
            minItems: 1,
            uniqueItems: true
          }
        },
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uri"
          },
          $schema: {
            type: "string",
            format: "uri"
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          default: {},
          multipleOf: {
            type: "number",
            minimum: 0,
            exclusiveMinimum: true
          },
          maximum: {
            type: "number"
          },
          exclusiveMaximum: {
            type: "boolean",
            default: false
          },
          minimum: {
            type: "number"
          },
          exclusiveMinimum: {
            type: "boolean",
            default: false
          },
          maxLength: {
            allOf: [{
              $ref: "#/definitions/positiveInteger"
            }]
          },
          minLength: {
            allOf: [{
              $ref: "#/definitions/positiveIntegerDefault0"
            }]
          },
          pattern: {
            type: "string",
            format: "regex"
          },
          additionalItems: {
            anyOf: [{
              type: "boolean"
            }, {
              $ref: "#"
            }],
            default: {}
          },
          items: {
            anyOf: [{
              $ref: "#"
            }, {
              $ref: "#/definitions/schemaArray"
            }],
            default: {}
          },
          maxItems: {
            allOf: [{
              $ref: "#/definitions/positiveInteger"
            }]
          },
          minItems: {
            allOf: [{
              $ref: "#/definitions/positiveIntegerDefault0"
            }]
          },
          uniqueItems: {
            type: "boolean",
            default: false
          },
          maxProperties: {
            allOf: [{
              $ref: "#/definitions/positiveInteger"
            }]
          },
          minProperties: {
            allOf: [{
              $ref: "#/definitions/positiveIntegerDefault0"
            }]
          },
          required: {
            allOf: [{
              $ref: "#/definitions/stringArray"
            }]
          },
          additionalProperties: {
            anyOf: [{
              type: "boolean"
            }, {
              $ref: "#"
            }],
            default: {}
          },
          definitions: {
            type: "object",
            additionalProperties: {
              $ref: "#"
            },
            default: {}
          },
          properties: {
            type: "object",
            additionalProperties: {
              $ref: "#"
            },
            default: {}
          },
          patternProperties: {
            type: "object",
            additionalProperties: {
              $ref: "#"
            },
            default: {}
          },
          dependencies: {
            type: "object",
            additionalProperties: {
              anyOf: [{
                $ref: "#"
              }, {
                $ref: "#/definitions/stringArray"
              }]
            }
          },
          enum: {
            type: "array",
            minItems: 1,
            uniqueItems: true
          },
          type: {
            anyOf: [{
              $ref: "#/definitions/simpleTypes"
            }, {
              type: "array",
              items: {
                $ref: "#/definitions/simpleTypes"
              },
              minItems: 1,
              uniqueItems: true
            }]
          },
          format: {
            anyOf: [{
              type: "string",
              enum: ["date-time", "uri", "email", "hostname", "ipv4", "ipv6", "regex"]
            }, {
              type: "string"
            }]
          },
          allOf: {
            allOf: [{
              $ref: "#/definitions/schemaArray"
            }]
          },
          anyOf: {
            allOf: [{
              $ref: "#/definitions/schemaArray"
            }]
          },
          oneOf: {
            allOf: [{
              $ref: "#/definitions/schemaArray"
            }]
          },
          not: {
            allOf: [{
              $ref: "#"
            }]
          }
        },
        dependencies: {
          exclusiveMaximum: ["maximum"],
          exclusiveMinimum: ["minimum"]
        },
        default: {}
      },
      "http://json-schema.org/draft-07/schema#": {
        title: localize("schema.json", "Describes a JSON file using a schema. See json-schema.org for more info."),
        definitions: {
          schemaArray: {
            type: "array",
            minItems: 1,
            items: {
              $ref: "#"
            }
          },
          nonNegativeInteger: {
            type: "integer",
            minimum: 0
          },
          nonNegativeIntegerDefault0: {
            allOf: [{
              $ref: "#/definitions/nonNegativeInteger"
            }, {
              default: 0
            }]
          },
          simpleTypes: {
            enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
          },
          stringArray: {
            type: "array",
            items: {
              type: "string"
            },
            uniqueItems: true,
            default: []
          }
        },
        type: ["object", "boolean"],
        properties: {
          $id: {
            type: "string",
            format: "uri-reference"
          },
          $schema: {
            type: "string",
            format: "uri"
          },
          $ref: {
            type: "string",
            format: "uri-reference"
          },
          $comment: {
            type: "string"
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          default: true,
          readOnly: {
            type: "boolean",
            default: false
          },
          examples: {
            type: "array",
            items: true
          },
          multipleOf: {
            type: "number",
            exclusiveMinimum: 0
          },
          maximum: {
            type: "number"
          },
          exclusiveMaximum: {
            type: "number"
          },
          minimum: {
            type: "number"
          },
          exclusiveMinimum: {
            type: "number"
          },
          maxLength: {
            $ref: "#/definitions/nonNegativeInteger"
          },
          minLength: {
            $ref: "#/definitions/nonNegativeIntegerDefault0"
          },
          pattern: {
            type: "string",
            format: "regex"
          },
          additionalItems: {
            $ref: "#"
          },
          items: {
            anyOf: [{
              $ref: "#"
            }, {
              $ref: "#/definitions/schemaArray"
            }],
            default: true
          },
          maxItems: {
            $ref: "#/definitions/nonNegativeInteger"
          },
          minItems: {
            $ref: "#/definitions/nonNegativeIntegerDefault0"
          },
          uniqueItems: {
            type: "boolean",
            default: false
          },
          contains: {
            $ref: "#"
          },
          maxProperties: {
            $ref: "#/definitions/nonNegativeInteger"
          },
          minProperties: {
            $ref: "#/definitions/nonNegativeIntegerDefault0"
          },
          required: {
            $ref: "#/definitions/stringArray"
          },
          additionalProperties: {
            $ref: "#"
          },
          definitions: {
            type: "object",
            additionalProperties: {
              $ref: "#"
            },
            default: {}
          },
          properties: {
            type: "object",
            additionalProperties: {
              $ref: "#"
            },
            default: {}
          },
          patternProperties: {
            type: "object",
            additionalProperties: {
              $ref: "#"
            },
            propertyNames: {
              format: "regex"
            },
            default: {}
          },
          dependencies: {
            type: "object",
            additionalProperties: {
              anyOf: [{
                $ref: "#"
              }, {
                $ref: "#/definitions/stringArray"
              }]
            }
          },
          propertyNames: {
            $ref: "#"
          },
          const: true,
          enum: {
            type: "array",
            items: true,
            minItems: 1,
            uniqueItems: true
          },
          type: {
            anyOf: [{
              $ref: "#/definitions/simpleTypes"
            }, {
              type: "array",
              items: {
                $ref: "#/definitions/simpleTypes"
              },
              minItems: 1,
              uniqueItems: true
            }]
          },
          format: {
            type: "string"
          },
          contentMediaType: {
            type: "string"
          },
          contentEncoding: {
            type: "string"
          },
          if: {
            $ref: "#"
          },
          then: {
            $ref: "#"
          },
          else: {
            $ref: "#"
          },
          allOf: {
            $ref: "#/definitions/schemaArray"
          },
          anyOf: {
            $ref: "#/definitions/schemaArray"
          },
          oneOf: {
            $ref: "#/definitions/schemaArray"
          },
          not: {
            $ref: "#"
          }
        },
        default: true
      }
    }
  };
  var descriptions = {
    id: localize("schema.json.id", "A unique identifier for the schema."),
    $schema: localize("schema.json.$schema", "The schema to verify this document against."),
    title: localize("schema.json.title", "A descriptive title of the element."),
    description: localize("schema.json.description", "A long description of the element. Used in hover menus and suggestions."),
    default: localize("schema.json.default", "A default value. Used by suggestions."),
    multipleOf: localize("schema.json.multipleOf", "A number that should cleanly divide the current value (i.e. have no remainder)."),
    maximum: localize("schema.json.maximum", "The maximum numerical value, inclusive by default."),
    exclusiveMaximum: localize("schema.json.exclusiveMaximum", "Makes the maximum property exclusive."),
    minimum: localize("schema.json.minimum", "The minimum numerical value, inclusive by default."),
    exclusiveMinimum: localize("schema.json.exclusiveMininum", "Makes the minimum property exclusive."),
    maxLength: localize("schema.json.maxLength", "The maximum length of a string."),
    minLength: localize("schema.json.minLength", "The minimum length of a string."),
    pattern: localize("schema.json.pattern", "A regular expression to match the string against. It is not implicitly anchored."),
    additionalItems: localize("schema.json.additionalItems", "For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."),
    items: localize("schema.json.items", "For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
    maxItems: localize("schema.json.maxItems", "The maximum number of items that can be inside an array. Inclusive."),
    minItems: localize("schema.json.minItems", "The minimum number of items that can be inside an array. Inclusive."),
    uniqueItems: localize("schema.json.uniqueItems", "If all of the items in the array must be unique. Defaults to false."),
    maxProperties: localize("schema.json.maxProperties", "The maximum number of properties an object can have. Inclusive."),
    minProperties: localize("schema.json.minProperties", "The minimum number of properties an object can have. Inclusive."),
    required: localize("schema.json.required", "An array of strings that lists the names of all properties required on this object."),
    additionalProperties: localize("schema.json.additionalProperties", "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."),
    definitions: localize("schema.json.definitions", "Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
    properties: localize("schema.json.properties", "A map of property names to schemas for each property."),
    patternProperties: localize("schema.json.patternProperties", "A map of regular expressions on property names to schemas for matching properties."),
    dependencies: localize("schema.json.dependencies", "A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
    enum: localize("schema.json.enum", "The set of literal values that are valid."),
    type: localize("schema.json.type", "Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
    format: localize("schema.json.format", "Describes the format expected for the value."),
    allOf: localize("schema.json.allOf", "An array of schemas, all of which must match."),
    anyOf: localize("schema.json.anyOf", "An array of schemas, where at least one must match."),
    oneOf: localize("schema.json.oneOf", "An array of schemas, exactly one of which must match."),
    not: localize("schema.json.not", "A schema which must not match."),
    $id: localize("schema.json.$id", "A unique identifier for the schema."),
    $ref: localize("schema.json.$ref", "Reference a definition hosted on any location."),
    $comment: localize("schema.json.$comment", "Comments from schema authors to readers or maintainers of the schema."),
    readOnly: localize("schema.json.readOnly", "Indicates that the value of the instance is managed exclusively by the owning authority."),
    examples: localize("schema.json.examples", "Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
    contains: localize("schema.json.contains", 'An array instance is valid against "contains" if at least one of its elements is valid against the given schema.'),
    propertyNames: localize("schema.json.propertyNames", "If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
    const: localize("schema.json.const", "An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
    contentMediaType: localize("schema.json.contentMediaType", "Describes the media type of a string property."),
    contentEncoding: localize("schema.json.contentEncoding", "Describes the content encoding of a string property."),
    if: localize("schema.json.if", 'The validation outcome of the "if" subschema controls which of the "then" or "else" keywords are evaluated.'),
    then: localize("schema.json.then", 'The "if" subschema is used for validation when the "if" subschema succeeds.'),
    else: localize("schema.json.else", 'The "else" subschema is used for validation when the "if" subschema fails.')
  };
  for (var schemaName in exports2.schemaContributions.schemas) {
    var schema = exports2.schemaContributions.schemas[schemaName];
    for (var property in schema.properties) {
      var propertyObject = schema.properties[property];
      if (propertyObject === true) {
        propertyObject = schema.properties[property] = {};
      }
      var description = descriptions[property];
      if (description) {
        propertyObject["description"] = description;
      } else {
        console.log(property + ": localize('schema.json." + property + `', "")`);
      }
    }
  }
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/services/jsonFolding", ["require", "exports", "jsonc-parser", "../jsonLanguageTypes"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var jsonc_parser_1 = require2("jsonc-parser");
  var jsonLanguageTypes_1 = require2("../jsonLanguageTypes");
  function getFoldingRanges(document, context) {
    var ranges = [];
    var nestingLevels = [];
    var stack = [];
    var prevStart = -1;
    var scanner = jsonc_parser_1.createScanner(document.getText(), false);
    var token = scanner.scan();
    function addRange(range2) {
      ranges.push(range2);
      nestingLevels.push(stack.length);
    }
    while (token !== 17) {
      switch (token) {
        case 1:
        case 3: {
          var startLine = document.positionAt(scanner.getTokenOffset()).line;
          var range = {
            startLine,
            endLine: startLine,
            kind: token === 1 ? "object" : "array"
          };
          stack.push(range);
          break;
        }
        case 2:
        case 4: {
          var kind = token === 2 ? "object" : "array";
          if (stack.length > 0 && stack[stack.length - 1].kind === kind) {
            var range = stack.pop();
            var line = document.positionAt(scanner.getTokenOffset()).line;
            if (range && line > range.startLine + 1 && prevStart !== range.startLine) {
              range.endLine = line - 1;
              addRange(range);
              prevStart = range.startLine;
            }
          }
          break;
        }
        case 13: {
          var startLine = document.positionAt(scanner.getTokenOffset()).line;
          var endLine = document.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()).line;
          if (scanner.getTokenError() === 1 && startLine + 1 < document.lineCount) {
            scanner.setPosition(document.offsetAt(jsonLanguageTypes_1.Position.create(startLine + 1, 0)));
          } else {
            if (startLine < endLine) {
              addRange({
                startLine,
                endLine,
                kind: jsonLanguageTypes_1.FoldingRangeKind.Comment
              });
              prevStart = startLine;
            }
          }
          break;
        }
        case 12: {
          var text = document.getText().substr(scanner.getTokenOffset(), scanner.getTokenLength());
          var m = text.match(/^\/\/\s*#(region\b)|(endregion\b)/);
          if (m) {
            var line = document.positionAt(scanner.getTokenOffset()).line;
            if (m[1]) {
              var range = {
                startLine: line,
                endLine: line,
                kind: jsonLanguageTypes_1.FoldingRangeKind.Region
              };
              stack.push(range);
            } else {
              var i = stack.length - 1;
              while (i >= 0 && stack[i].kind !== jsonLanguageTypes_1.FoldingRangeKind.Region) {
                i--;
              }
              if (i >= 0) {
                var range = stack[i];
                stack.length = i;
                if (line > range.startLine && prevStart !== range.startLine) {
                  range.endLine = line;
                  addRange(range);
                  prevStart = range.startLine;
                }
              }
            }
          }
          break;
        }
      }
      token = scanner.scan();
    }
    var rangeLimit = context && context.rangeLimit;
    if (typeof rangeLimit !== "number" || ranges.length <= rangeLimit) {
      return ranges;
    }
    if (context && context.onRangeLimitExceeded) {
      context.onRangeLimitExceeded(document.uri);
    }
    var counts = [];
    for (var _i = 0, nestingLevels_1 = nestingLevels; _i < nestingLevels_1.length; _i++) {
      var level = nestingLevels_1[_i];
      if (level < 30) {
        counts[level] = (counts[level] || 0) + 1;
      }
    }
    var entries = 0;
    var maxLevel = 0;
    for (var i = 0; i < counts.length; i++) {
      var n = counts[i];
      if (n) {
        if (n + entries > rangeLimit) {
          maxLevel = i;
          break;
        }
        entries += n;
      }
    }
    var result = [];
    for (var i = 0; i < ranges.length; i++) {
      var level = nestingLevels[i];
      if (typeof level === "number") {
        if (level < maxLevel || level === maxLevel && entries++ < rangeLimit) {
          result.push(ranges[i]);
        }
      }
    }
    return result;
  }
  exports2.getFoldingRanges = getFoldingRanges;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/services/jsonSelectionRanges", ["require", "exports", "../jsonLanguageTypes", "jsonc-parser"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var jsonLanguageTypes_1 = require2("../jsonLanguageTypes");
  var jsonc_parser_1 = require2("jsonc-parser");
  function getSelectionRanges(document, positions, doc) {
    function getSelectionRange(position) {
      var offset = document.offsetAt(position);
      var node = doc.getNodeFromOffset(offset, true);
      var result = [];
      while (node) {
        switch (node.type) {
          case "string":
          case "object":
          case "array":
            var cStart = node.offset + 1, cEnd = node.offset + node.length - 1;
            if (cStart < cEnd && offset >= cStart && offset <= cEnd) {
              result.push(newRange(cStart, cEnd));
            }
            result.push(newRange(node.offset, node.offset + node.length));
            break;
          case "number":
          case "boolean":
          case "null":
          case "property":
            result.push(newRange(node.offset, node.offset + node.length));
            break;
        }
        if (node.type === "property" || node.parent && node.parent.type === "array") {
          var afterCommaOffset = getOffsetAfterNextToken(node.offset + node.length, 5);
          if (afterCommaOffset !== -1) {
            result.push(newRange(node.offset, afterCommaOffset));
          }
        }
        node = node.parent;
      }
      var current = void 0;
      for (var index = result.length - 1; index >= 0; index--) {
        current = jsonLanguageTypes_1.SelectionRange.create(result[index], current);
      }
      if (!current) {
        current = jsonLanguageTypes_1.SelectionRange.create(jsonLanguageTypes_1.Range.create(position, position));
      }
      return current;
    }
    function newRange(start, end) {
      return jsonLanguageTypes_1.Range.create(document.positionAt(start), document.positionAt(end));
    }
    var scanner = jsonc_parser_1.createScanner(document.getText(), true);
    function getOffsetAfterNextToken(offset, expectedToken) {
      scanner.setPosition(offset);
      var token = scanner.scan();
      if (token === expectedToken) {
        return scanner.getTokenOffset() + scanner.getTokenLength();
      }
      return -1;
    }
    return positions.map(getSelectionRange);
  }
  exports2.getSelectionRanges = getSelectionRanges;
});
(function(factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== void 0)
      module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define("vscode-json-languageservice/jsonLanguageService", ["require", "exports", "./services/jsonCompletion", "./services/jsonHover", "./services/jsonValidation", "./services/jsonDocumentSymbols", "./parser/jsonParser", "./services/configuration", "./services/jsonSchemaService", "./services/jsonFolding", "./services/jsonSelectionRanges", "jsonc-parser", "./jsonLanguageTypes", "./jsonLanguageTypes"], factory);
  }
})(function(require2, exports2) {
  "use strict";
  function __export2(m) {
    for (var p in m)
      if (!exports2.hasOwnProperty(p))
        exports2[p] = m[p];
  }
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var jsonCompletion_1 = require2("./services/jsonCompletion");
  var jsonHover_1 = require2("./services/jsonHover");
  var jsonValidation_1 = require2("./services/jsonValidation");
  var jsonDocumentSymbols_1 = require2("./services/jsonDocumentSymbols");
  var jsonParser_1 = require2("./parser/jsonParser");
  var configuration_1 = require2("./services/configuration");
  var jsonSchemaService_1 = require2("./services/jsonSchemaService");
  var jsonFolding_1 = require2("./services/jsonFolding");
  var jsonSelectionRanges_1 = require2("./services/jsonSelectionRanges");
  var jsonc_parser_1 = require2("jsonc-parser");
  var jsonLanguageTypes_1 = require2("./jsonLanguageTypes");
  __export2(require2("./jsonLanguageTypes"));
  function getLanguageService(params) {
    var promise = params.promiseConstructor || Promise;
    var jsonSchemaService = new jsonSchemaService_1.JSONSchemaService(params.schemaRequestService, params.workspaceContext, promise);
    jsonSchemaService.setSchemaContributions(configuration_1.schemaContributions);
    var jsonCompletion = new jsonCompletion_1.JSONCompletion(jsonSchemaService, params.contributions, promise, params.clientCapabilities);
    var jsonHover = new jsonHover_1.JSONHover(jsonSchemaService, params.contributions, promise);
    var jsonDocumentSymbols = new jsonDocumentSymbols_1.JSONDocumentSymbols(jsonSchemaService);
    var jsonValidation = new jsonValidation_1.JSONValidation(jsonSchemaService, promise);
    return {
      configure: function(settings) {
        jsonSchemaService.clearExternalSchemas();
        if (settings.schemas) {
          settings.schemas.forEach(function(settings2) {
            jsonSchemaService.registerExternalSchema(settings2.uri, settings2.fileMatch, settings2.schema);
          });
        }
        jsonValidation.configure(settings);
      },
      resetSchema: function(uri) {
        return jsonSchemaService.onResourceChange(uri);
      },
      doValidation: jsonValidation.doValidation.bind(jsonValidation),
      parseJSONDocument: function(document) {
        return jsonParser_1.parse(document, {
          collectComments: true
        });
      },
      newJSONDocument: function(root, diagnostics) {
        return jsonParser_1.newJSONDocument(root, diagnostics);
      },
      doResolve: jsonCompletion.doResolve.bind(jsonCompletion),
      doComplete: jsonCompletion.doComplete.bind(jsonCompletion),
      findDocumentSymbols: jsonDocumentSymbols.findDocumentSymbols.bind(jsonDocumentSymbols),
      findDocumentSymbols2: jsonDocumentSymbols.findDocumentSymbols2.bind(jsonDocumentSymbols),
      findColorSymbols: function(d, s) {
        return jsonDocumentSymbols.findDocumentColors(d, s).then(function(s2) {
          return s2.map(function(s3) {
            return s3.range;
          });
        });
      },
      findDocumentColors: jsonDocumentSymbols.findDocumentColors.bind(jsonDocumentSymbols),
      getColorPresentations: jsonDocumentSymbols.getColorPresentations.bind(jsonDocumentSymbols),
      doHover: jsonHover.doHover.bind(jsonHover),
      getFoldingRanges: jsonFolding_1.getFoldingRanges,
      getSelectionRanges: jsonSelectionRanges_1.getSelectionRanges,
      format: function(d, r, o) {
        var range = void 0;
        if (r) {
          var offset = d.offsetAt(r.start);
          var length = d.offsetAt(r.end) - offset;
          range = {
            offset,
            length
          };
        }
        var options = {
          tabSize: o ? o.tabSize : 4,
          insertSpaces: o ? o.insertSpaces : true,
          eol: "\n"
        };
        return jsonc_parser_1.format(d.getText(), range, options).map(function(e) {
          return jsonLanguageTypes_1.TextEdit.replace(jsonLanguageTypes_1.Range.create(d.positionAt(e.offset), d.positionAt(e.offset + e.length)), e.content);
        });
      }
    };
  }
  exports2.getLanguageService = getLanguageService;
});
define("vscode-json-languageservice", ["vscode-json-languageservice/jsonLanguageService"], function(main) {
  return main;
});
define("vs/language/json/jsonWorker", ["require", "exports", "vscode-json-languageservice"], function(require2, exports2, jsonService) {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var defaultSchemaRequestService;
  if (typeof fetch !== "undefined") {
    defaultSchemaRequestService = function(url) {
      return fetch(url).then(function(response) {
        return response.text();
      });
    };
  }
  var PromiseAdapter = function() {
    function PromiseAdapter2(executor) {
      this.wrapped = new Promise(executor);
    }
    PromiseAdapter2.prototype.then = function(onfulfilled, onrejected) {
      var thenable = this.wrapped;
      return thenable.then(onfulfilled, onrejected);
    };
    PromiseAdapter2.prototype.getWrapped = function() {
      return this.wrapped;
    };
    PromiseAdapter2.resolve = function(v) {
      return Promise.resolve(v);
    };
    PromiseAdapter2.reject = function(v) {
      return Promise.reject(v);
    };
    PromiseAdapter2.all = function(values) {
      return Promise.all(values);
    };
    return PromiseAdapter2;
  }();
  var JSONWorker = function() {
    function JSONWorker2(ctx, createData) {
      this._ctx = ctx;
      this._languageSettings = createData.languageSettings;
      this._languageId = createData.languageId;
      this._languageService = jsonService.getLanguageService({
        schemaRequestService: createData.enableSchemaRequest && defaultSchemaRequestService,
        promiseConstructor: PromiseAdapter
      });
      this._languageService.configure(this._languageSettings);
    }
    JSONWorker2.prototype.doValidation = function(uri) {
      var document = this._getTextDocument(uri);
      if (document) {
        var jsonDocument = this._languageService.parseJSONDocument(document);
        return this._languageService.doValidation(document, jsonDocument);
      }
      return Promise.resolve([]);
    };
    JSONWorker2.prototype.doComplete = function(uri, position) {
      var document = this._getTextDocument(uri);
      var jsonDocument = this._languageService.parseJSONDocument(document);
      return this._languageService.doComplete(document, position, jsonDocument);
    };
    JSONWorker2.prototype.doResolve = function(item) {
      return this._languageService.doResolve(item);
    };
    JSONWorker2.prototype.doHover = function(uri, position) {
      var document = this._getTextDocument(uri);
      var jsonDocument = this._languageService.parseJSONDocument(document);
      return this._languageService.doHover(document, position, jsonDocument);
    };
    JSONWorker2.prototype.format = function(uri, range, options) {
      var document = this._getTextDocument(uri);
      var textEdits = this._languageService.format(document, range, options);
      return Promise.resolve(textEdits);
    };
    JSONWorker2.prototype.resetSchema = function(uri) {
      return Promise.resolve(this._languageService.resetSchema(uri));
    };
    JSONWorker2.prototype.findDocumentSymbols = function(uri) {
      var document = this._getTextDocument(uri);
      var jsonDocument = this._languageService.parseJSONDocument(document);
      var symbols = this._languageService.findDocumentSymbols(document, jsonDocument);
      return Promise.resolve(symbols);
    };
    JSONWorker2.prototype.findDocumentColors = function(uri) {
      var document = this._getTextDocument(uri);
      var jsonDocument = this._languageService.parseJSONDocument(document);
      var colorSymbols = this._languageService.findDocumentColors(document, jsonDocument);
      return Promise.resolve(colorSymbols);
    };
    JSONWorker2.prototype.getColorPresentations = function(uri, color, range) {
      var document = this._getTextDocument(uri);
      var jsonDocument = this._languageService.parseJSONDocument(document);
      var colorPresentations = this._languageService.getColorPresentations(document, jsonDocument, color, range);
      return Promise.resolve(colorPresentations);
    };
    JSONWorker2.prototype.getFoldingRanges = function(uri, context) {
      var document = this._getTextDocument(uri);
      var ranges = this._languageService.getFoldingRanges(document, context);
      return Promise.resolve(ranges);
    };
    JSONWorker2.prototype.getSelectionRanges = function(uri, positions) {
      var document = this._getTextDocument(uri);
      var jsonDocument = this._languageService.parseJSONDocument(document);
      var ranges = this._languageService.getSelectionRanges(document, positions, jsonDocument);
      return Promise.resolve(ranges);
    };
    JSONWorker2.prototype._getTextDocument = function(uri) {
      var models = this._ctx.getMirrorModels();
      for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
        var model = models_1[_i];
        if (model.uri.toString() === uri) {
          return jsonService.TextDocument.create(uri, this._languageId, model.version, model.getValue());
        }
      }
      return null;
    };
    return JSONWorker2;
  }();
  exports2.JSONWorker = JSONWorker;
  function create(ctx, createData) {
    return new JSONWorker(ctx, createData);
  }
  exports2.create = create;
});
