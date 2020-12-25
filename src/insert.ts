import Hasura from './hasura'
import { stringify, hasRelation } from './helper'
import { Contructor } from './intefaces'

export default class Insert extends Hasura {
  private _object: any = ''
  private _prefix: string
  private _conflicts:
    | {
        on_conflict: {
          constraint: string
          update_columns: Array<any>
          where?: Object
        }
      }
    | {} = {}
  constructor({
    _prefix = 'insert_',
    _schema,
    provider = {},
    _with = '',
    _fields = '',
    _schemaArguments = {},
    _alias = ''
  }: Contructor) {
    super({ _schema: _prefix + _schema, provider, _with, _fields, _schemaArguments, _alias })
    this._prefix = _prefix
  }
  conflicts(args: { constraint: string; update_columns: Array<any>; where?: Object }) {
    this._conflicts = { on_conflict: args }
    return this
  }

  insert(args: any) {
    this._object = { ...this._object, ...hasRelation(args) }

    return this
  }

  mutate<T>(): Promise<T> {
    return this.provider.mutate({ query: this.query(), variables: this.variables() })
  }

  parsed() {
    let schemaArgs = `(objects:$data ${stringify(this._conflicts)})`

    return ` ${this._alias}${this._schema} ${schemaArgs} {  ${
      this._fields ? ' returning { ' + this.getFields() + ' }' : 'affected_rows'
    } }`
  }

  variables() {
    return { data: { ...this._object, ...this._schemaArguments } }
  }

  query() {
    return `mutation ($data:[${this._schema.replace(
      this._prefix,
      ''
    )}_insert_input!]! ){  ${this.parsed()}  }`
  }
}
