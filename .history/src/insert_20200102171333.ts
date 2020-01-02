import Hasura from "./hasura-orm";
import { transform, stringify } from "./helper";

interface InserType {
  [key: string]: any
}
interface OnConflict {
  constrait: any,
  update_columns: Array<any>,
  where: any

}
export default class Insert extends Hasura {
  private _object: any = ''
  constructor(_schema: string) {
    super('insert_' + _schema);
  }

  insert(...args: InserType[]) {
    args.forEach((value) => {
      this._object += stringify(value)
    })

    return this;
  }

  constrait(objects: any, onConflict?: OnConflict) {

  }
  parsed() {
    return ` ${this._schema} ${'(' + this._schemaArguments + ')' : ''}{  ${this._fields} ${this._with} }`
  }

  query() {
    this._schemaArguments += this._object + ']';
    return `mutation {  ${this.parsed()}  }`
  }
}
