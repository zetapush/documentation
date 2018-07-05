const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


const parse = (dir) => {
  const records = [];
  for(let sourceFilePath of fs.readdirSync(dir)) {
    if(isIndexableFile(sourceFilePath)) {
      let $ = cheerio.load(fs.readFileSync(path.resolve(dir, sourceFilePath)));
      let paragraphs = $('.paragraph');
      for(let i=0; i<paragraphs.length ; i++) {
        addParagraph({path: sourceFilePath, $}, $(paragraphs[i]), records);
      }
      let codesWithLines = $('.listingblock pre > code > table td.code > pre');
      for(let i=0; i<codesWithLines.length ; i++) {
        addCode({path: sourceFilePath, $}, $(codesWithLines[i]), $(codesWithLines[i]).parents('.listingblock'), records);
      }
      // filter if contains table (already added)
      let codes = $('.listingblock pre > code');
      for(let i=0; i<codes.length ; i++) {
        if(!$(codes[i]).find('table td.code').length) {
          addCode({path: sourceFilePath, $}, $(codes[i]), $(codes[i]).parents('.listingblock'), records);
        }
      }
    }
  }
  return records;
};

const isIndexableFile = (sourceFilePath) => {
  return sourceFilePath.endsWith('.html')
};

const addParagraph = (sourceFile, paragraph, records) => {
  let title = getTitle(paragraph);
  let parents = getParents(sourceFile, paragraph);
  records.push({
    sourceFile: {
      url: sourceFile.path,
      title: getMainTitle(sourceFile)
    },
    url: sourceFile.path+title.anchor,
    parents: parents.slice(0, parents.length-1),
    title: title.text,
    content: paragraph.text()
  });
};

const addCode = (sourceFile, code, listingblock, records) => {
  let title = getTitle(listingblock);
  let parents = getParents(sourceFile, listingblock);
  records.push({
    sourceFile: {
      url: sourceFile.path,
      title: getMainTitle(sourceFile)
    },
    url: sourceFile.path+title.anchor,
    parents: parents.slice(0, parents.length-1),
    title: title.text,
    content: code.text(),
    type: 'code'
  });
};

const getMainTitle = (sourceFile) => {
  return sourceFile.$('title').text();
};

const getTitle = (paragraph) => {
  let titles = [
    paragraph.prevAll('h6'),
    paragraph.prevAll('h5'), 
    paragraph.prevAll('h4'),
    paragraph.prevAll('h3'),
    paragraph.prevAll('h2'),
    paragraph.prevAll('h1')
  ];
  for(let title of titles) {
    if(title.length) {
      return {
        anchor: title.find('a.anchor').attr('href'),
        text: title.text()
      }
    }
  }
  return {
    anchor: '',
    text: ''
  }
};


const getParents = (sourceFile, paragraph) => {
  let parents = [
    paragraph.parents('.sect1').prev('h1'),
    paragraph.parents('.sect1').find('h2'),
    paragraph.parents('.sect2').find('h3'),
    paragraph.parents('.sect3').find('h4'),
    paragraph.parents('.sect4').find('h5'),
    paragraph.parents('.sect5').find('h6')
  ];
  return parents.filter((p) => p && p.length>0)
                .map((p) => {
                  return {
                    url: sourceFile.path+p.find('a.anchor').attr('href'),
                    title: p.text()
                  }
                });
}


module.exports = { parse }