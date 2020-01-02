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
    result += this.parseObject(value);
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
