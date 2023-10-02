export default class SubscribeStudentToCourseInputDto {

  constructor(
    public readonly coursePk: string,
    public readonly studentPk: string,
  ) {
  }
}
