export default class GetCourseOutputDto {

  constructor(
    public readonly pk: string,
    public readonly sk: string,
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly area: string,
    public readonly subArea: string,
    public readonly author: string,
    public readonly quantityClasses: number,
    public readonly students: string[],
    public readonly creationDate: string,
  ) {
  }
}
