(function() {
  var collapseLines = function() {
    $('.listingblock').each(function(i, element) {
      var metadata = sourceUtils.parseLinesMetadata(element.className);
      collapseElementLines(element, metadata['collapse-lines']);
    });
    $('span.collapsed').each(function(i, element) {
      $(element).click(function() {
        var startLine = $(element).attr('data-start-line');
        $('[data-start-line="' + startLine + '"]').removeClass('closed');
      });
    });
  };

  var collapseElementLines = function(/*Node*/ element, /*String*/ lines) {
    if (lines) {
      var sourceElement = sourceUtils.getSourceElement(element);
      var sourceLines = lineUtils.getSourceLines(sourceElement);
      var lines = lineUtils.convert(sourceLines, lines);
      lines.sort(function(a, b) {
        return a - b;
      });
      var start;
      var previous;
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (!previous) {
          start = line - 1;
        }
        if (previous && line != previous + 1) {
          // group is ended => wrap all lines between start and end
          decorate(sourceLines.code, start, previous - 1);
          if (sourceLines.lineNumbers.length) {
            decorate(sourceLines.lineNumbers, start, previous - 1);
          }
          start = line - 1;
        }
        // update previous to new line
        previous = line;
      }
      decorate(sourceLines.code, start, lines[lines.length - 1] - 1);
      if (sourceLines.lineNumbers.length) {
        decorate(sourceLines.lineNumbers, start, lines[lines.length - 1] - 1);
      }
      lineUtils.update(sourceElement, sourceLines);
    }
  };

  var decorate = function(/*Array*/ sourceLines, /*int*/ start, /*int*/ end) {
    sourceLines[start] = decorateStart(sourceLines[start], start);
    sourceLines[end] = decorateEnd(sourceLines[end]);
  };

  var decorateStart = function(/*String*/ line, /*String*/ startLineNumber) {
    return (
      '<span data-start-line="' +
      startLineNumber +
      '" class="collapsed closed" title="click to show hidden code"><span class="collapsed-text">...</span><span class="collapsed-lines">' +
      line
    );
  };

  var decorateEnd = function(/*String*/ line) {
    return line + '</span></span>';
  };

  $(document).ready(collapseLines);
})();
