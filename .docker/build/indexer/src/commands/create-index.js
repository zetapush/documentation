const algoliasearch = require('algoliasearch');
const chunk = require('lodash.chunk');
const documentationParser = require('../utils/documentation-parser');

const createIndex = (command) => {
  validate(command);

  console.log('preparing algolia...')
  const client = algoliasearch(command.applicationId, command.adminKey);
  console.log('preparing index...')
  const index = client.initIndex(command.indexName);

  console.log('removing old index content...')
  index.clearIndex();

  console.log('parsing documentation...')
  const records = documentationParser.parse(command.documentationDirectory);

  console.log('indexing...')
  const batchSize = 1000;
  const chunks = chunk(records, batchSize);
  const numBatches = Math.ceil(records.length / batchSize);
  let i = 0;
  chunks.map(function(batch) {
    console.log(`indexing batch ${i+1}/${numBatches}...`)
    return index.addObjects(batch);
  });
  console.log('done')
};

const validate = (command) => {
  if(!command.applicationId) {
    throw "Missing -a argument"
  }
  if(!command.adminKey) {
    throw "Missing -k argument"
  }
  if(!command.indexName) {
    throw "Missing -i argument"
  }
  if(!command.documentationDirectory) {
    throw "Missing -d argument"
  }
};


module.exports = createIndex;
