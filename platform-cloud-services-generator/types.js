const Primitive = {
  PATTERN: /^(String)$/,
  is(target) {
    return Primitive.PATTERN.test(target)
  },
  transform(target) {
    return target.toLowerCase()
  }
}
const ListOrSingle = {
  PATTERN: /^ListOrSingle\[(.+)\]$/,
  is(target) {
    return ListOrSingle.PATTERN.test(target);
  },
  transform(target) {
    const [, internal] = ListOrSingle.PATTERN.exec(target);
    if (Primitive.is(internal)) {
      return `ListOrSingle<${Primitive.transform(internal)}>`;
    } else if (ListOrSingle.is(internal)) {
      return ListOrSingle.transform(internal);
    } else {
      return `ListOrSingle<${internal}>`;
    }
  }
}
const List = {
  PATTERN: /^List\[(.+)\]$/,
  is(target) {
    return List.PATTERN.test(target);
  },
  transform(target) {
    const [, internal] = List.PATTERN.exec(target);
    if (Primitive.is(internal)) {
      return `${Primitive.transform(internal)}[]`;
    } else if (List.is(internal)) {
      return List.transform(internal);
    } else {
      return `${internal}[]`;
    }
  }
}
const Map = {
  PATTERN: /^Map\[(\w+),(.+)\]$/,
  is(target) {
    return Map.PATTERN.test(target);
  },
  transform(target) {
    let [,key, value] = Map.PATTERN.exec(target);
    if (Primitive.is(key)) {
      key = Primitive.transform(key);
    }
    if (Primitive.is(value)) {
      value = Primitive.transform(value);
    } else if (List.value) {
      value = List.transform(value);
    } else if (Map.is(value)) {
      value = Map.transform(value);
    } 
    return `Map<${key},${value}>`;
  }
}
const Type = {
  is(target) {
    return typeof target === String.name.toLowerCase();
  },
  transform(target) {
    if (Primitive.is(target)) {
      return Primitive.transform(target);
    }
    else if (List.is(target)) {
      return List.transform(target);
    }
    else if (ListOrSingle.is(target)) {
      return ListOrSingle.transform(target);
    }
    else if (Map.is(target)) {
      return Map.transform(target);
    }
    else {
      return target;
    }
  }
}

module.exports = { Primitive, List, Map, Type };