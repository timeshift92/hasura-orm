const _stringify = require('stringify-object');



export function stringify(object: any): any {
  return _stringify(object, {
    singleQuotes: false,
    transform: (object: any, property: any, originalResult: any) => {
      if (property === 'constraint') {
        return originalResult.replace(/"/g, '');
      }

      return originalResult;
    }
  }).replace(/^.|.$/g, '')

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
