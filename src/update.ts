import Hasura from './hasura'
import Insert from './insert'
import { stringify } from './helper'
import { Contructor } from './intefaces'
type UpdateTypeKey =
  | '_set'
  | '_append'
  | '_delete_at_path'
  | '_delete_elem'
  | '_delete_key'
  | '_inc'
  | '_prepand'
type UpdateType =
  | {
      [key in UpdateTypeKey]: any
    }
  | { [key: string]: any }
export default class Update extends Hasura {
  private _set: any = ''
  private _prefix: string = ''
  constructor({
    _prefix,
    _schema,
    provider,
    _with,
    _fields,
    _schemaArguments,
    _alias
  }: Contructor) {
    super({ _schema: _prefix + _schema, provider, _with, _fields, _schemaArguments, _alias })
    this._prefix = _prefix || ''
  }
  _argVariables: string = ''
  _argBindings: string = ''
  _variables: object = {}
  update(...args: UpdateType[]) {
    args.forEach((value: UpdateType | any) => {
      const key = Object.keys(value)[0]
      if (
        ['_append', '_delete_at_path', '_delete_elem', '_delete_key', '_inc', '_prepand'].includes(
          key
        )
      ) {
        this._argBindings += ` ${key}:$${key} `
        this._argVariables += `$${key}:` + this._schema.replace(this._prefix, '') + key + '_input '
        this._variables = { ...this._variables, [key]: value[key] }
      } else {
        if (key === '_set') {
          this._argBindings += `${key}:$${key}`
          this._argVariables += this._schema.replace(this._prefix, '') + key + '_input '
        } else {
          this._argBindings += `_set:$_set`
          this._argVariables += `$_set: ${this._schema.replace(this._prefix, '') + '_set_input '}`
        }

        this._variables = Object.assign(this._variables, {
          _set: key === '_set' ? value[key] : value
        })
      }
    })

    return this
  }

  mutate<T>(): Promise<T> {
    return this.provider.mutate({ query: this.query(), variables: this._variables })
  }

  insert(schema: string, callback: (Insert: Insert) => Hasura) {
    let qr = callback(new Insert({ _schema: schema, provider: this.provider }))
    this._compose += qr.parsed()

    return this
  }

  parsed() {
    if (Object.keys(this._where).length === 0) {
      throw new Error('where condition need')
    }
    let args = this.schemaArguments + this._argBindings

    return ` ${this._alias}${this._schema} ${'(' + args + ' )'}{ ${
      this._fields ? ' returning { ' + this.getFields() + ' }' : 'affected_rows'
    } }`
  }
  query() {
    return `mutation(${this._argVariables}) { ${this._compose}  ${this.parsed()} }  `
  }
}
