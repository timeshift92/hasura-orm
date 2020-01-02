const _stringify = require('stringify-object');

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

export function stringify(object: any): any {
  return _stringify(object, { singleQuotes: false,
    transform: (object, property, originalResult) => {
      if (property === 'password') {
        return originalResult.replace(/\w/g, '*');
      }

      return originalResult;
    } }).replace(/^.|.$/g, '')

}


export function hasRelation(value: any) {
  if (typeof value[Object.keys(value)[0]] === 'object' && value.objects) {
    return value
  } else if (Array.isArray(value[Object.keys(value)[0]])) {
    return {
      [Object.keys(value)[0]]:
        { data: value[Object.keys(value)[0]] }
    }
  }
  return value;
}
