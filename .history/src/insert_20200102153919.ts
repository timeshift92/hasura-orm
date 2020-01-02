import Hasura from "./hasura-orm";
interface InserType {
  [key: string]: 'asc' | 'asc_nulls_first' | 'asc_nulls_last' | 'desc' | 'desc_nulls_first' | 'desc_nulls_last'
}
export default class Insert extends Hasura {
  private _object: any = ''
  insert(...args: any) {


    args.forEach(field => {
      this._object+= ` `
    });
  }
}
