import Hasura from './hasura'

export default class Delete extends Hasura {
  constructor(_schema: string, provider: any = {}) {
    super('delete_' + _schema, provider)
  }

  delete(condition: any) {
    return this.where(condition)
  }

  parsed() {
    return ` ${this._schema} ${'(' + this.schemaArguments + ' )'}{ ${
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
