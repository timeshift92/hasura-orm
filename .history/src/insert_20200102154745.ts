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

    if (Array.isArray(value)) {
      let result = ''
      value.forEach(val => {
        result + = this.parseObject()
      });

    }
  }

  parseObject() {

  }

  insert(...args: InserType[]) {

    args.forEach((value) => {
      this._object += ` ${Object.keys(value)[0]}:${this.transform(value[Object.keys(value)[0]])} `
    })
  }
}
