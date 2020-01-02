import OrderBy from "./orderBy";

export default class Query {
  private _fields: string = ''
  private _limit: number = 0;
  private _schema: string
  private _where: any
  constructor(schema: string) {
    this._schema = schema;
  }

  select(fields: string) {
    this._fields = fields.replace(/,/g, " ");
    return this;
  }
  limit(limit: number) {
    this._limit = limit
    return this;
  }
  orderBy({ args = [], args2 = [] }: { args?: string[]; args2?: ('asc' | 'asc_nulls_first' | 'asc_nulls_last' | 'desc' | 'desc_nulls_first' | 'desc_nulls_last')[]; } = {}) {
    if (args.length % 2 != 0) {
      throw new Error("args must be pairs");
      return;
    }
  }
  where(...condition: string[]) {
    if (!condition || condition.length < 2 || condition.length > 3) {
      throw new Error("where need min: 2 and max: 3 args");
      return;
    }
    let where = {};
    if (condition.length == 2) {
      where = {
        [condition[0]]: {
          _eq: condition[1]
        }
      };
    }
    if (condition.length == 3) {
      where = {
        [condition[0]]: {
          ["_" + condition[1]]: condition[2]
        }
      };
    }

    this._where = Object.assign(this._where, where);

    return this;
  }

  query() {
    this.orderBy({ args: "asdasd", args2: ['asc', 'asdas', 'asc_nulls_first'] })
    return `query {
      ${this._schema}${ }{

      }
    }  `
  }
}
