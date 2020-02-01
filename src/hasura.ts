import { stringify } from './helper'

interface OrderBy {
  [key: string]:
    | 'asc'
    | 'asc_nulls_first'
    | 'asc_nulls_last'
    | 'desc'
    | 'desc_nulls_first'
    | 'desc_nulls_last'
}
export default class Hasura {
  protected _fields: string = ''
  protected _paginate: any = ''
  protected _schema: string
  protected _where = {}
  private _schemaArguments: any = {}
  protected _with = ''
  protected _compose = ''
  protected provider: any = {}
  constructor(schema: string, provider: any = {}) {
    this.provider = provider
    this._schema = schema
  }
  public get schemaArguments(): string {
    return stringify(this._schemaArguments)
  }

  select(fields: string) {
    this._fields += ' ' + fields.replace(/,/g, ' ')
    return this
  }

  private addArg(type: string, value: any) {
    this._schemaArguments = Object.assign(this._schemaArguments, { [type]: value })
  }

  limit(limit: number) {
    this.addArg('limit', limit)
    return this
  }
  offset(offset: number) {
    this.addArg('offset', offset)
    return this
  }

  distinct(distinct: string) {
    this.addArg('distinct_on', distinct)
    return this
  }

  orderBy(orderBy: any): Hasura {
    this.addArg('order_by', orderBy)
    return this
  }
  compose(schema: string, callback: (Hasura: Hasura) => Hasura) {
    let qr = callback(new Hasura(schema))
    this._compose += qr.parsed()

    return this
  }
  where(condition: any) {
    Object.keys(condition).map(con => {
      if (typeof condition[con] !== 'object' && condition[con][0] !== '_') {
        condition[con] = {
          _eq: condition[con]
        }
      }
    })
    this._where = Object.assign(this._where, condition)
    this._schemaArguments = Object.assign(this._schemaArguments, { where: this._where })

    return this
  }

  with(schema: string, callback: (Hasura: Hasura) => Hasura) {
    let qr = callback(new Hasura(schema))

    this._with += qr.parsed()

    return this
  }
  parsed() {
    if (!this._fields) {
      this._fields = 'id'
    }
    return `${this._paginate} ${this._schema} ${
      Object.keys(this._schemaArguments).length > 0
        ? '(' + stringify(this._schemaArguments) + ')'
        : ''
    }{  ${this._fields} ${this._with} }`
  }

  paginate(limit: number, offset: number) {
    delete this._schemaArguments['limit']
    delete this._schemaArguments['offset']
    let args = stringify(this._schemaArguments)
    if (args) {
      args = `(${stringify(this._schemaArguments)})`
    }
    this._paginate = ` ${this._schema}_aggregate${args} {
      aggregate {
        count
      }
    }`

    this.limit(limit)
    this.offset(offset)

    return this
  }
  query() {
    return `query {  ${this.parsed()} ${this._compose} }`
  }
  subscription() {
    return `subscription {  ${this.parsed()} ${this._compose} }`
  }

  get() {
    return this.provider.get({ query: this.query() })
  }
  await() {
    return this.provider.query({ query: this.query() })
  }

  subscribe() {
    return this.provider.subscribe({ query: this.subscription() })
  }
}
