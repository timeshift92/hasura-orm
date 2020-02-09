import Hasura from './hasura'

export default class Delete extends Hasura {
  constructor(
    _schema: string,
    provider: any = {},
    _with: string,
    _fields: string,
    _schemaArguments: {},
    _alias = ''
  ) {
    super('delete_' + _schema, provider, _with, _fields, _schemaArguments, _alias)
  }

  delete(condition: any) {
    return this.where(condition)
  }

  parsed() {
    return ` ${this._alias}${this._schema} ${'(' + this.schemaArguments + ' )'}{ ${
      this._fields ? ' returning { ' + this._fields + ' }' : 'affected_rows'
    } }`
  }
  mutate() {
    return this.provider.mutate({ query: this.query() })
  }

  query() {
    return `mutation { ${this.parsed()} ${this._compose} } `
  }
}
