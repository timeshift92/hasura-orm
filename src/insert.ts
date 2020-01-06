import Hasura from './hasura'
import { stringify, hasRelation } from './helper'

export default class Insert extends Hasura {
  private _object: any = ''
  private _batch = false
  constructor(_schema: string, provider: any = {}) {
    super('insert_' + _schema, provider)
  }

  insert(args: any) {
    if (!args.on_conflict || !args.objects) {
      this._batch = true
    }

    this._object += stringify(hasRelation(args), !this._batch) + ' , '

    return this
  }

  mutate() {
    this.provider.mutate({ query: this.query() })
  }

  parsed() {
    let args = this.schemaArguments + this._object

    let schemaArgs = '(' + args + ')'

    if (this._batch) {
      schemaArgs = '(objects:[' + args + '])'
    }
    return ` ${this._schema} ${schemaArgs} {  ${
      this._fields ? ' returning { ' + this._fields + ' }' : 'affected_rows'
    } }`
  }

  query() {
    return `mutation {  ${this.parsed()}  }`
  }
}
