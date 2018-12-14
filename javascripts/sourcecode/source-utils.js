(function() {
  var convert = function(/*{lineNumber: String[], code: String[]}*/ sourceLines, /*String*/ lines) {
    var hl = [];
    var parts = lines.split(',');
    // example: 1,5,10-25
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      if (part.indexOf('-') != -1) {
        // example: 10-25
        var subpart = part.split('-');
        var start = subpart[0] ? parseInt(subpart[0]) : 1;
        var end = subpart[1] ? parseInt(subpart[1]) : sourceLines.code.length;
        for (var j = start; j <= end; j++) {
          hl.push(j);
        }
      } else {
        // simple number
        hl.push(parseInt(part));
      }
    }
    return hl;
  };

  var update = function(/*Node*/ element, /*{lineNumber: String[], code: String[]}*/ lines) {
    if (lines.lineNumbers.length) {
      element.find('table.CodeRay .line-numbers pre').html(lines.lineNumbers.join('\n'));
      element.find('table.CodeRay .code pre').html(lines.code.join('\n'));
    } else {
      element.html(lines.code.join('\n'));
    }
  };

  var getSourceLines = function(/*Node*/ element) /*: {lineNumber: String[], code: String[]}*/ {
    // there are line numbers so code section is different
    var lineNumbers = [];
    var codeElement = element;
    if (element.find('table.CodeRay .line-numbers').length) {
      lineNumbers = element
        .find('table.CodeRay .line-numbers pre')
        .html()
        .split('\n');
      codeElement = element.find('table.CodeRay .code pre');
    }
    var content = codeElement.html();
    return { lineNumbers, code: content.split('\n') };
  };

  var getSourceElement = function(/*Node*/ listingBlock) {
    return $(listingBlock).find('pre code');
  };

  var parseLinesMetadata = function(/*String*/ metadata) {
    var classes = metadata.split(' ');
    var classMap = {};
    for (var i = 0; i < classes.length; i++) {
      var cssClass = classes[i];
      var parts = cssClass.split(':');
      if (parts.length == 2) {
        classMap[parts[0]] = parts[1];
      }
    }
    return classMap;
  };

  window.lineUtils = {
    convert: convert,
    update: update,
    getSourceLines: getSourceLines
  };

  window.sourceUtils = {
    getSourceElement: getSourceElement,
    parseLinesMetadata: parseLinesMetadata
  };
})();
