export default class GetStudentOutputDto {

  constructor(
    public readonly pk: string,
    public readonly sk: string,
    public readonly id: string,
    public readonly name: string,
    public readonly surname: string,
    public readonly fullName: string,
    public readonly email: string,
    public readonly creationDate: string,
  ) {
  }
}
