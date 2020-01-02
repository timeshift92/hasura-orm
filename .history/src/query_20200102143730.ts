import OrderBy from "./orderBy";

export default class Query {
  private _fields: string = ''
  private _limit: number = 0;
  private _offset: number = 0;
  private _distinct: string = '';
  private _paginate: string = '';
  private _orderBy = '';
  private _schema: string
  private _where = ''
  private _schemaArguments = '';
  private _with = ''

  constructor(schema: string) {
    this._schema = schema;
  }

  select(fields: string) {
    this._fields = fields.replace(/,/g, " ");
    return this;
  }
  limit(limit: number) {
    this._limit = limit
    this._schemaArguments += ` limit:${limit} `
    return this;
  }
  offset(offset: number) {
    this._offset = offset
    this._schemaArguments += ` offset:${offset} `
    return this;
  }

  distinct(distinct: string) {
    this._distinct = distinct;
    this._schemaArguments += ` distinct_on: ${this._distinct} `
    return this
  }

  orderBy(...args: OrderBy[]): Query {
    args.forEach((value, key) => {
      console.log(value)
      this._orderBy += ` ${Object.keys(value)[0]}:${value[Object.keys(value)[0]]} `
    })

    this._schemaArguments += ` order_by: ${this._orderBy} `
    return this;
  }

  where(...condition: any) {
    if (!condition || condition.length < 2 || condition.length > 3) {
      throw new Error("where need min: 2 and max: 3 args");

    }
    let where = {};
    if (condition.length == 2) {
      where = `
        ${condition[0]}: {
          _eq: ${condition[1]}
        }
      `;
    }
    if (condition.length == 3) {
      where = `
        ${condition[0]}: {
          _${condition[1]}: ${Array.isArray(condition[2]) ? '[' + condition[2] + ']' : condition[2]}
        }
      `;
    }

    this._where += where;
    this._schemaArguments = ` where: {${this._where}}`
    return this;
  }

  with(schema: string, callback: (query: Query) => Query) {
    let qr = callback(new Query(schema))
    this._with += qr.parsed()

    return this;
  }
  private parsed() {
    return `${this._paginate} ${this._schema}${Object.keys(this._schemaArguments).length > 0 ? '(' + this._schemaArguments + ')' : ''}{  ${this._fields} ${this._with} }`
  }

  paginate(limit: number, offset: number) {
    this.limit(limit)
    this.offset(offset)
    this._paginate = ` ${this._schema}_aggregate(${this._schemaArguments}) {
      aggregate {
        count
      }
    }`
    return this
  }
  query() {
    return `query { ${this.parsed()} }
      `
  }
}
