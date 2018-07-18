const filenames = require('./filenames');
const { Type, Primitive } = require('./types');

const ListGeneric = {
  PATTERN: /^List<(\w+)>$/,
  is(target) {
    return ListGeneric.PATTERN.test(target);
  },
  transform(target) {
    const [, internal] = ListGeneric.PATTERN.exec(target);
    return internal
  }
}

const type = (target) => {
  if (Primitive.is(target)) {
    return target;
  }
  else if (ListGeneric.is(target)) {
    const list = ListGeneric.transform(target);
    return `<<common/cloud-services-types/${filenames.method(list)}#,${Type.transform(list)}>>[]`;
  }
  else {
    return `<<common/cloud-services-types/${filenames.method(target)}#,${target}>>`;
  }
};

module.exports = { type };