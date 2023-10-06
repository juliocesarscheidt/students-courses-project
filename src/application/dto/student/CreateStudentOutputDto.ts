export default class CreateStudentOutputDto {

  constructor(
    public readonly pk: string,
    public readonly sk: string,
    public readonly id: string,
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly creationDate: string,
  ) {}
}
