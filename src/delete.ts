import Hasura from './hasura'
import { Contructor } from './intefaces'

export default class Delete extends Hasura {
  constructor({
    _prefix = 'delete_',
    _schema,
    provider = {},
    _with,
    _fields,
    _schemaArguments = {},
    _alias = ''
  }: Contructor) {
    super({ _schema: _prefix + _schema, provider, _with, _fields, _schemaArguments, _alias })
  }

  delete(condition: any) {
    return this.where(condition)
  }

  parsed() {
    return ` ${this._alias}${this._schema} ${'(' + this.schemaArguments + ' )'}{ ${
      this._fields ? ' returning { ' + this._fields + ' }' : 'affected_rows'
    } }`
  }
  mutate<T>(): Promise<T> {
    return this.provider.mutate({ query: this.query() })
  }

  query() {
    return `mutation { ${this.parsed()} ${this._compose} } `
  }
}
