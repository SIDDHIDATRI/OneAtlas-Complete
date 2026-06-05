export interface Field {

  name: string;

  type:
    | "string"
    | "number"
    | "boolean"
    | "date"
    | "uuid";
}

export interface Entity {

  name: string;

  fields: Field[];
}

export interface DataSchema {

  entities: Entity[];
}