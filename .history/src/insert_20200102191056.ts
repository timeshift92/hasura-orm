import Hasura from "./hasura-orm";
import { transform, stringify, hasRelation } from "./helper";

interface InserType {
  [key: string]: any
}
export default class Insert extends Hasura {
  private _object: any = ''
  private _batch = false
  constructor(_schema: string) {
    super('insert_' + _schema);
  }

  insert(...args: any) {
    if(args[0])
    args.forEach((value: any) => {
      this._object += stringify(hasRelation(value))
    })

    return this;
  }

  batch() {
    this._batch = true
  }


  parsed() {
    this._schemaArguments += this._object;

    let schemaArgs = '(' + this._schemaArguments + ')'

    if (this._batch) {
      schemaArgs = '(objects:[' + this._schemaArguments + '])'
    }
    return ` ${this._schema} ${schemaArgs} {  ${this._fields ? ' returning { ' + this._fields + ' }' : 'affected_rows'} }`
  }

  query() {

    return `mutation {  ${this.parsed()}  }`
  }
}
