export abstract class CRUDEntity {
  public id: number;

  public slug: string;

  public toResponseObject(): any {}
}
