export interface Contructor {
  _prefix?: string
  _schema: string
  provider?: any
  _with?: string
  _fields?: string
  _schemaArguments?: object
  _alias?: string
  _variableArguments?: VaribaleArguments
}

export interface VaribaleArguments {
  binding?: string
  arg: object
  variables: object
}

export interface MainContructor {
  _schema: string
  provider?: any
  _with?: string
  _fields?: string
  _schemaArguments?: object
  _alias?: string
  _variableArguments?: VaribaleArguments
}
