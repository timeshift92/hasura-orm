import Hasura from './hasura'
import Insert from './insert'
import { stringify } from './helper'
interface UpdateType {
  [key: string]: any
}
export default class Update extends Hasura {
  private _set: any = ''
  constructor(
    _schema: string,
    provider: any = {},
    _with: string,
    _fields: string,
    _schemaArguments: {},
    _alias = ''
  ) {
    super('update_' + _schema, provider, _with, _fields, _schemaArguments, _alias)
  }

  update(...args: UpdateType[]) {
    args.forEach(value => {
      this._set += stringify(value)
    })

    return this
  }

  mutate() {
    return this.provider.mutate({ query: this.query() })
  }

  insert(schema: string, callback: (Insert: Insert) => Hasura) {
    let qr = callback(new Insert(schema, this.provider))
    this._compose += qr.parsed()

    return this
  }

  parsed() {
    if (Object.keys(this._where).length === 0) {
      throw new Error('where condition need')
    }
    let args = this.schemaArguments + '_set: {' + this._set + '} '

    return ` ${this._alias}${this._schema} ${'(' + args + ' )'}{ ${
      this._fields ? ' returning { ' + this.getFields() + ' }' : 'affected_rows'
    } }`
  }

  query() {
    return `mutation { ${this._compose}  ${this.parsed()} } `
  }
}
