import Update from './update'
import Insert from './insert'
import Hasura from './hasura'
import Delete from './delete'

interface OrderBy {
  [key: string]:
    | 'asc'
    | 'asc_nulls_first'
    | 'asc_nulls_last'
    | 'desc'
    | 'desc_nulls_first'
    | 'desc_nulls_last'
}
export default class HasuraORM extends Hasura {
  constructor(
    _schema: string,
    provider: any = {},
    _with: string = '',
    _fields: string = '',
    _schemaArguments = {}
  ) {
    super(_schema, provider, _with, _fields, _schemaArguments)
  }
  insert(args: any): Insert {
    return new Insert(
      this._schema,
      this.provider,
      this._with,
      this._fields,
      this._schemaArguments
    ).insert(args)
  }
  update(args: any): Update {
    console.log(this)
    return new Update(
      this._schema,
      this.provider,
      this._with,
      this._fields,
      this._schemaArguments
    ).update(args)
  }

  delete(args: any): Delete {
    return new Delete(
      this._schema,
      this.provider,
      this._with,
      this._fields,
      this._schemaArguments
    ).delete(args)
  }
}
