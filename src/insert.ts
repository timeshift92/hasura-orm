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
    | {}
    | any = {}
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
    this._conflicts = ` on_conflict: {${stringify(args, false, true)}} `

    return this
  }

  insert(args: any) {
    this._object = { ...this._object, ...hasRelation(args) }
    const arg = `${this._schema}${new Date().getTime()}`
    this.concatVariables({
      binding: `objects:$${arg}`,
      arg: { ['$' + arg]: `[${this._schema.replace(this._prefix, '')}_insert_input!]!` },
      variables: { [arg]: { ...this._object, ...this._schemaArguments } }
    })
    return this
  }

  mutate<T>(): Promise<T> {
    return this.provider.mutate({
      query: this.query(),
      variables: this._variableArguments.variables
    })
  }

  parsed() {
    let args = this.schemaArguments + this._variableArguments.binding
    let schemaArgs = `(${args} ${stringify(this._conflicts, true)})`

    return ` ${this._alias}${this._schema} ${schemaArgs} {  ${
      this._fields ? ' returning { ' + this.getFields() + ' }' : 'affected_rows'
    } }`
  }

  query() {
    let args = this.schemaArguments + this._variableArguments.binding
    return `mutation (${args}){  ${this.parsed()}  }`
  }
}
