import Hasura from "./hasura-orm";
interface InserType {
  [key: string]: any
}
export default class Insert extends Hasura {
  private _object: any = ''

  transform(value: any) {
    if (!['object', 'undefined', 'function'].includes(typeof value)) {
      return value
    } else if (typeof value === 'undefined') {
      throw new Error('Undefined value')
    }
    let result = '[ '
    if (Array.isArray(value)) {

      value.forEach(val => {
        result += this.parseObject(val);
      });

    } else {
      result += this.parseObject(value);
    }

    result += ' ]'
    return result;

  }

  parseObject(value: any) {
    let obj = ''
    Object.keys(value).forEach(key => {
      obj+= ` ${key}:${value[key]} `
    })
    return ` ${Object.keys(value)[0]}:${value[Object.keys(value)[0]]} `
  }

  insert(...args: InserType[]) {

    args.forEach((value) => {
      this._object += ` ${Object.keys(value)[0]}:${this.transform(value[Object.keys(value)[0]])} `
    })
  }
}
