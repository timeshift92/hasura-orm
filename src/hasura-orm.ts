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
    return Object.assign(new Insert(this._schema, this.provider).insert(args), this)
  }
  update(args: any): Update {
    return Object.assign(new Update(this._schema, this.provider).update(args), this)
  }

  delete(args: any): Delete {
    return Object.assign(new Delete(this._schema, this.provider).delete(args), this)
  }
}
