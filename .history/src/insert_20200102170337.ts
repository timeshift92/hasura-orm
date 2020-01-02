import Hasura from "./hasura-orm";
import { transform } from "./helper";
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
      this._object += ` ${Object.keys(value)[0]}:${transform(value[Object.keys(value)[0]])} `
    })

    return this;
  }

  constrait(onConflict:Ob) {

  }

  query() {
    this._schemaArguments += this._object;
    return `mutate {  ${this.parsed()}  }`
  }
}
