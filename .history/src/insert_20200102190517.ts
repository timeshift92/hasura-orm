import Hasura from "./hasura-orm";
import { transform, stringify, hasRelation } from "./helper";

interface InserType {
  [key: string]: any
}
export default class Insert extends Hasura {
  private _object: any = ''
  constructor(_schema: string) {
    super('insert_' + _schema);
  }

  insert(...args: any, is_single = false) {
    args.forEach((value: any) => {
      this._object += stringify(hasRelation(value))
    })

    return this;
  }


  parsed() {
    this._schemaArguments += this._object;
    return ` ${this._schema} ${'(' + this._schemaArguments + ')'}{  ${this._fields ? ' returning { ' + this._fields + ' }' : 'affected_rows'} }`
  }

  query() {

    return `mutation {  ${this.parsed()}  }`
  }
}
