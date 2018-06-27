(function () {
	var highlightLines = function () {
		$('.listingblock').each(function (i, element) {
			var metadata = sourceUtils.parseLinesMetadata(element.className);
			['info', 'warn', 'error', 'diff-add', 'diff-remove', 'irrelevant'].forEach(function (type) {
				highlightElementLines(element, metadata[type + '-lines'], type);
			});
			// default
			highlightElementLines(element, metadata['highlight-lines'], "");
		});
	};

	var highlightElementLines = function (/*Node*/element, /*String*/lines, /*String*/type) {
		if (lines) {

			Array.from(element.getElementsByTagName('td')).forEach(function (elt) {
				console.log(sourceUtils.getSourceElement(elt));
			});

			var sourceElement = sourceUtils.getSourceElement(element);
			console.log(sourceElement);
			var sourceLines = lineUtils.getSourceLines(sourceElement);
			var lines = lineUtils.convert(sourceLines, lines);

			// Search if we found 'line-numbers' tag
			var indexLineNumbers = -1;
			for (var i = 0; i < sourceLines.length; i++) {
				if (sourceLines[i].indexOf('<td class="line-numbers">') !== -1) {
					indexLineNumbers = i;
					break;
				}
			}

			// Decorate line numbers
			if (indexLineNumbers != -1) {
				for (var i = 0; i < lines.length; i++) {
					var line = lines[i] + indexLineNumbers - 1;
					sourceLines[line] = decorate(sourceLines[line], type);
				}
				lineUtils.update(sourceElement, sourceLines);
			}

			// Search if we found 'line-numbers' tag
			var indexCode = -1;
			for (var i = 0; i < sourceLines.length; i++) {
				if (sourceLines[i].indexOf('<td class="code">') !== -1) {
					indexCode = i;
					break;
				}
			}

			// Decorate line numbers
			var diffLine = 0;
			if (indexCode != -1) {
				diffLine = indexCode - 1;
			} else {
				diffLine = -1;
			}

			for (var i = 0; i < lines.length; i++) {
				var line = lines[i] + diffLine;
				sourceLines[line] = decorate(sourceLines[line], type);
			}
			lineUtils.update(sourceElement, sourceLines);
		}
	};

	var decorate = function (/*String*/line, /*String*/type) {
		return '<span class="highlight-line' + (type ? '-' + type: '') + '"><span class="wrapped-line">' + (line || "") + '</span></span>';
	};

	$(document).ready(highlightLines);
})();
