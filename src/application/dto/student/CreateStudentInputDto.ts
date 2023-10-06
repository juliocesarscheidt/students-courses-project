export default class CreateStudentInputDto {

  constructor(
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string
  ) {}
}
