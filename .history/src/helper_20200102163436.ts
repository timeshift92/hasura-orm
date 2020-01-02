export function transform(value: any) {
  if (!['object', 'undefined', 'function'].includes(typeof value)) {
    return value
  } else if (typeof value === 'undefined') {
    throw new Error('Undefined value')
  }
  let result = '[ '
  if (Array.isArray(value)) {

    value.forEach(val => {
      result += parseObject(val);
    });

  } else {
    result += parseObject(value);
  }

  result += ' ]'
  return result;

}

export function parseObject(value: any) {
  let obj = ''
  Object.keys(value).forEach(key => {
    obj += `{ ${key}:  ${typeof value[key] === 'string' ? '"' + value[key] + '"' : value[key]} }`
  })
  return obj;
}

export function stringify(objFromJson: any) {
  if (typeof objFromJson !== "object" || Array.isArray(objFromJson)) {
    return JSON.stringify(objFromJson);
  }
  let props = Object
    .keys(objFromJson)
    .map(key => `${key}:${stringify(objFromJson[key])}`)
    .join(",");
  return `{${props}}`;
}
