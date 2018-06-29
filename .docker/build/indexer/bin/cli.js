const program = require('commander');
const { version } = require('../package.json');
const createIndex = require('../src/commands/create-index');
const parseDoc = require('../src/commands/parse-doc');


program
  .version(version)

program
  .command('parse')
  .usage('-d <documentation-dir> -o <output-dir>')
  .option('-d, --documentation-directory <documentation-dir>', 'Path to the generated documentation')
  .option('-o, --output-directory <output-dir>', 'Path to the generated JSON files')
  .description('Parse documentation to generate JSON files ready to be posted on Algolia for indexing')
  .action((command) => parseDoc(command));

program
  .command('index')
  .usage('-a <algolia-app-id> -k <algolia-admin-key> -i <index-name> -d <documentation-dir>')
  .option('-a, --application-id <algolia-app-id>', 'Algolia application ID')
  .option('-k, --admin-key <algolia-admin-key>', 'Algolia admin key')
  .option('-i, --index-name <index-name>', 'Algolia index name')
  .option('-d, --documentation-directory <documentation-dir>', 'Path to the generated documentation')
  .description('Index documentation on Algolia')
  .action((command) => createIndex(command));
  
  
program.parse(process.argv);
