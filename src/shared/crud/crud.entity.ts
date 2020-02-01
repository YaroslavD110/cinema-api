export class CRUDEntity {
  public id: number;

  public slug: string;

  public toResponseObject(): CRUDEntity {
    return this;
  }
}
