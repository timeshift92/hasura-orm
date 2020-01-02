import Hasura from "./hasura-orm";
interface InserType {
  [key: string]: any
}
export default class Insert extends Hasura {
  private _object: any = ''
  insert(...args: InserType[]) {

    args.forEach((value) => {
      this._object += ` ${Object.keys(value)[0]}:${value[Object.keys(value)[0]]} `
    })
  }
}
