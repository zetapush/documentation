const toLowerCase = (char) => `-${char.toLowerCase()}`;
const toSnakeCase = (value) => value.replace(/[A-Z]/g, toLowerCase);
const toCamelCase = (word = '') => `${word.charAt(0).toLowerCase()}${word.substring(1)}`;
const toPascalCase = (word = '') => `${word.charAt(0).toUpperCase()}${word.substring(1)}`;
const normalize = (name) => toSnakeCase(toCamelCase(name)).toLowerCase().replace(/_/g, '-');

module.exports = {
  normalize,
  toPascalCase
}