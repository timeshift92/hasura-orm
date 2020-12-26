import Update, { UpdateType } from './update'
import Insert from './insert'
import Hasura from './hasura'
import Delete from './delete'
import { MainContructor } from './intefaces'

export default class HasuraORM extends Hasura {
  constructor({
    _variableArguments,
    _schema,
    provider = {},
    _with = '',
    _fields = '',
    _schemaArguments = {},
    _alias = ''
  }: MainContructor) {
    super({ _schema, provider, _with, _fields, _schemaArguments, _alias, _variableArguments })
  }
  insert(args: any, _prefix = 'insert_'): Insert {
    return new Insert({
      _variableArguments: this._variableArguments,
      _prefix,
      _schema: this._schema,
      provider: this.provider,
      _with: this._with,
      _fields: this._fields,
      _schemaArguments: this._schemaArguments,
      _alias: this._alias
    }).insert(args)
  }
  update(args: UpdateType, _prefix = 'update_'): Update {
    return new Update({
      _variableArguments: this._variableArguments,
      _prefix,
      _schema: this._schema,
      provider: this.provider,
      _with: this._with,
      _fields: this._fields,
      _schemaArguments: this._schemaArguments,
      _alias: this._alias
    }).update(args)
  }

  delete(args: any, _prefix = 'delete_'): Delete {
    return new Delete({
      _variableArguments: this._variableArguments,
      _prefix,
      _schema: this._schema,
      provider: this.provider,
      _with: this._with,
      _fields: this._fields,
      _schemaArguments: this._schemaArguments,
      _alias: this._alias
    }).delete(args)
  }
}
