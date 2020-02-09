import Hasura from './hasura'
import { stringify, hasRelation } from './helper'

export default class Insert extends Hasura {
  private _object: any = ''
  private _batch = false
  constructor(
    _schema: string,
    provider: any = {},
    _with: string = '',
    _fields: string = '',
    _schemaArguments = {},
    _alias = ''
  ) {
    super('insert_' + _schema, provider, _with, _fields, _schemaArguments, _alias)
  }

  insert(args: any) {
    if (!args.on_conflict || !args.objects) {
      this._batch = true
    }

    this._object += stringify(hasRelation(args), !this._batch) + ' , '

    return this
  }

  mutate() {
    return this.provider.mutate({ query: this.query() })
  }

  parsed() {
    let args = this.schemaArguments + this._object

    let schemaArgs = '(' + args + ')'

    if (this._batch) {
      schemaArgs = args[0] === '[' ? '(objects:' + args + ')' : '(objects:[' + args + '])'
    }

    return ` ${this._alias}${this._schema} ${schemaArgs} {  ${
      this._fields ? ' returning { ' + this.getFields() + ' }' : 'affected_rows'
    } }`
  }

  query() {
    return `mutation {  ${this.parsed()}  }`
  }
}
