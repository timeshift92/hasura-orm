import Hasura from "./hasura-orm";
interface InserType {
  [key: string]:any
}
export default class Insert extends Hasura {
  private _object: any = ''
  insert(...args: InserType[]) {


    args.forEach(field => {
      this._object+= `${field[]} `
    });
  }
}
