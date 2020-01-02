import Hasura from "./hasura-orm";
import { transform, stringify, hasRelation } from "./helper";
import Insert from "./insert";

interface UpdateType {
  [key: string]: any
}
export default class Update extends Hasura {
  private _set: any = ''
  constructor(_schema: string) {
    super('update_' + _schema);
  }

  update(...args: UpdateType[]) {
    args.forEach((value) => {
      this._set += ` ${Object.keys(value)[0]}:${value[Object.keys(value)[0]]} `
    })

    return this;
  }

  with(schema: string, callback: (Update: Update) => Hasura) {
    let qr = callback(new Update(schema))
    this._compose += qr.parsed()

    return this;
  }

  insert(schema: string, callback: (Insert: Insert) => Hasura) {
    let qr = callback(new Insert(schema))
    this._compose += qr.parsed()

    return this;
  }


  parsed() {
    return ` ${this._schema} ${'(_set: {' + this._schemaArguments + ')'}{  ${this._fields ? ' returning { ' + this._fields + ' }' : 'affected_rows'} }`
  }

  query() {
    this._schemaArguments += this._set;
    return `mutation {  ${this.parsed()} ${this._compose}  }`
  }
}
