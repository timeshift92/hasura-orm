import Hasura from "./hasura-orm";
import { transform, stringify, hasRelation } from "./helper";
import Insert from "./insert";


export default class Update extends Hasura {
  private _object: any = ''
  constructor(_schema: string) {
    super('update_' + _schema);
  }

  update(...args: any) {
    this._object += '{'
    args.forEach((value: any) => {
      this._object += stringify(hasRelation(value))
    })
    this._object += '}'

    return this;
  }

  with(schema: string, callback: (Update: Update) => Hasura) {
    let qr = callback(new Update(schema))
    this._with += qr.parsed()

    return this;
  }

  insert(schema: string, callback: (Update: Update) => Hasura) {
    let qr = callback(new Insert(schema))
    this._with += qr.parsed()

    return this;
  }


  parsed() {
    return ` ${this._schema} ${'(objects:[' + this._schemaArguments + '])'}{  ${this._fields ? ' returning { ' + this._fields + ' }' : 'affected_rows'} }`
  }

  query() {
    this._schemaArguments += this._object;
    return `mutation {  ${this.parsed()}  }`
  }
}
