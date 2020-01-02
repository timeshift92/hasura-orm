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

  insert(...args: any) {
    this._object += '{'
    args.forEach((value: any) => {
      this._object += stringify(hasRelation(value))
    })
    this._object += '}'

    return this;
  }


  parsed() {
    this._schemaArguments += this._object;
    return ` ${this._schema} ${'(objects:[' + this._schemaArguments + ')'}{  ${this._fields ? ' returning { ' + this._fields + ' }' : 'affected_rows'} }`
  }

  query() {

    return `mutation {  ${this.parsed()}  }`
  }
}
