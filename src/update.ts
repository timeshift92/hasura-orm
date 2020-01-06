import Hasura from './hasura'
import Insert from './insert'
import { stringify } from './helper'
interface UpdateType {
  [key: string]: any
}
export default class Update extends Hasura {
  private _set: any = ''
  constructor(_schema: string, provider: any = {}) {
    super('update_' + _schema, provider)
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
  with(schema: string, callback: (Update: Update) => Hasura) {
    let qr = callback(new Update(schema))
    this._compose += qr.parsed()
    return this
  }

  insert(schema: string, callback: (Insert: Insert) => Hasura) {
    let qr = callback(new Insert(schema))
    this._compose += qr.parsed()

    return this
  }

  parsed() {
    if (Object.keys(this._where).length === 0) {
      throw new Error('where condition need')
    }
    let args = this.schemaArguments + '_set: {' + this._set + '} '
    return ` ${this._schema} ${'(' + args + ' )'}{ ${
      this._fields ? ' returning { ' + this._fields + ' }' : 'affected_rows'
    } }`
  }

  query() {
    return `mutation { ${this.parsed()} ${this._compose} } `
  }
}
