export default class CreateCourseInputDto {

  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly area: string,
    public readonly subArea: string,
    public readonly author: string,
    public readonly quantityClasses: number
  ) {}
}
