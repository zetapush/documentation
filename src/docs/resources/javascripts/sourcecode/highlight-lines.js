(function() {
  var highlightLines = function() {
    $('.listingblock').each(function(i, element) {
      var metadata = sourceUtils.parseLinesMetadata(element.className);
      ['info', 'warn', 'error', 'diff-add', 'diff-remove', 'irrelevant'].forEach(function(type) {
        highlightElementLines(element, metadata[type + '-lines'], type);
      });
      // default
      highlightElementLines(element, metadata['highlight-lines'], '');
    });
  };

  var highlightElementLines = function(/*Node*/ element, /*String*/ lines, /*String*/ type) {
    if (lines) {
      Array.from(element.getElementsByTagName('td')).forEach(function(elt) {
        console.log(sourceUtils.getSourceElement(elt));
      });

      var sourceElement = sourceUtils.getSourceElement(element);
      console.log(sourceElement);
      var sourceLines = lineUtils.getSourceLines(sourceElement);
      var lines = lineUtils.convert(sourceLines, lines);

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i] - 1;
        if (sourceLines.lineNumbers.length) {
          sourceLines.lineNumbers[line] = decorate(sourceLines.lineNumbers[line], type);
        }
        sourceLines.code[line] = decorate(sourceLines.code[line], type);
      }
      lineUtils.update(sourceElement, sourceLines);
    }
  };

  var decorate = function(/*String*/ line, /*String*/ type) {
    return (
      '<span class="highlight-line' +
      (type ? '-' + type : '') +
      '"><span class="wrapped-line">' +
      (line || '') +
      '</span></span>'
    );
  };

  $(document).ready(highlightLines);
})();
