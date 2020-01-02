import Hasura from "./hasura-orm";
interface InserType {
  [key: string]: any
}
export default class Insert extends Hasura {
  private _object: any = ''
  constructor(){
    super(this.sc);
  }
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
      obj += ` ${key}:${value[key]} `
    })
    return obj;
  }

  insert(...args: InserType[]) {

    args.forEach((value) => {
      this._object += ` ${Object.keys(value)[0]}:${this.transform(value[Object.keys(value)[0]])} `
    })

    return this;
  }

  query() {
    this._schemaArguments = this._object;
    return `mutate {  ${this.parsed()}  }`
  }
}
