import Hasura from "./hasura-orm";
interface InserType {
  [key: string]: any
}
export default class Insert extends Hasura {
  private _object: any = ''

  transform(value: any) {
    
  }

  insert(...args: InserType[]) {

    args.forEach((value) => {
      this._object += ` ${Object.keys(value)[0]}:${this.transform(value[Object.keys(value)[0]])} `
    })
  }
}
