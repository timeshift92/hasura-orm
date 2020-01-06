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
  constructor(schema: string, provider: any = {}) {
    super(schema, provider)
  }
  insert(args: any): Insert {
    return new Insert(this._schema, this.provider).insert(args)
  }
  update(args: any): Update {
    return new Update(this._schema, this.provider).update(args)
  }

  delete(args: any): Delete {
    return new Delete(this._schema, this.provider).delete(args)
  }
}
