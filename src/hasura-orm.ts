import Update from './update'
import Insert from './insert'
import Hasura from './hasura'
import Delete from './delete'

export default class HasuraORM extends Hasura {
  constructor(
    _schema: string,
    provider: any = {},
    _with: string = '',
    _fields: string = '',
    _schemaArguments = {},
    _alias = ''
  ) {
    super(_schema, provider, _with, _fields, _schemaArguments, _alias)
  }
  insert(args: any): Insert {
    return new Insert(
      this._schema,
      this.provider,
      this._with,
      this._fields,
      this._schemaArguments,
      this._alias
    ).insert(args)
  }
  update(args: any): Update {
    return new Update(
      this._schema,
      this.provider,
      this._with,
      this._fields,
      this._schemaArguments,
      this._alias
    ).update(args)
  }

  delete(args: any): Delete {
    return new Delete(
      this._schema,
      this.provider,
      this._with,
      this._fields,
      this._schemaArguments,
      this._alias
    ).delete(args)
  }
}
