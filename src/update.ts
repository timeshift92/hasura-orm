import Hasura from './hasura'
import Insert from './insert'
import { stringify } from './helper'
import { Contructor } from './intefaces'
import { time } from 'console'
type UpdateTypeKey =
  | '_set'
  | '_append'
  | '_delete_at_path'
  | '_delete_elem'
  | '_delete_key'
  | '_inc'
  | '_prepand'
export type UpdateType =
  | {
      [key in UpdateTypeKey]: any
    }
  | { [key: string]: any }
export default class Update extends Hasura {
  index = 0
  prevIndex = 0
  private _prefix: string = ''
  constructor({
    _prefix = '',
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
  update(...args: UpdateType[]) {
    const keys = [
      '_set',
      '_append',
      '_delete_at_path',
      '_delete_elem',
      '_delete_key',
      '_inc',
      '_prepand'
    ]
    args.forEach((value: UpdateType | any) => {
      if (!this.prevIndex) this.prevIndex = Hasura.index
      const key = Object.keys(value)[0]
      const arg = keys.includes(key)
        ? `$${key}_${this._schema.replace(this._prefix, '')}_${this.prevIndex}`
        : `$_set_${this._schema.replace(this._prefix, '')}_${this.prevIndex}`
      if (keys.includes(key) && this.index === 0) {
        this.concatVariables({
          arg: { [arg]: this._schema.replace(this._prefix, '') + key + '_input ' },
          binding: `${key}:${arg}`,
          variables: { [arg.replace('$', '')]: value[key] }
        })
      } else if (this.index === 0) {
        this.concatVariables({
          arg: { [arg]: this._schema.replace(this._prefix, '') + '_set_input ' },
          binding: `_set:${arg}`,
          variables: { [arg.replace('$', '')]: value }
        })
      } else {
        this._variableArguments.variables[arg.replace('$', '')] = {
          ...this._variableArguments.variables[arg.replace('$', '')],
          ...value
        }
      }
      this.index++
      Hasura.index++
    })

    return this
  }

  mutate<T>(): Promise<T> {
    return this.provider.mutate({
      query: this.query(),
      variables: this._variableArguments.variables
    })
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
    let args = this.schemaArguments + this._variableArguments.binding

    return ` ${this._alias}${this._schema} ${'(' + args + ' )'}{ ${
      this._fields ? ' returning { ' + this.getFields() + ' }' : 'affected_rows'
    } }`
  }
  query() {
    return `mutation(${stringify(this._variableArguments.arg, false, true)}) { ${
      this._compose
    }  ${this.parsed()} }  `
  }
}
