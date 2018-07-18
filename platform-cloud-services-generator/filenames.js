const {
  normalize
} = require('./utils');

const service = (service) => `${normalize(service.itemId)}.adoc`

const type = (type) => `${normalize(type.type)}.adoc`;

const method = (method) => `${normalize(method)}.adoc`;

module.exports = { method, service, type };