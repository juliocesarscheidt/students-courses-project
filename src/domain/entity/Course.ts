import { v4 as uuidv4 } from "uuid";
import ValidationException from "../exception/ValidationException";
import SkValueObject from "../vo/SkValueObject";
import PkValueObject from "../vo/PkValueObject";

export default class Course {

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
    public readonly students: Set<string>,
    public readonly creationDate: string,
  ) {
  }

  public subscribeStudent(studentPk: string): void {
    this.students.add(studentPk);
  }

  public static mapFrom(item: any): Course {
    return new Course(
      item.pk,
      item.sk,
      item.id,
      item.name,
      item.price,
      item.area,
      item.subArea,
      item.author,
      item.quantityClasses,
      new Set<string>(item.students),
      item.creationDate,
    );
  }

  public static newCourse(
    name?: string,
    price?: number,
    area?: string,
    subArea?: string,
    author?: string,
    quantityClasses?: number,
  ): Course {
    if (!name || !price || !area || !subArea || !author || !quantityClasses)
      throw new ValidationException();

    const id = uuidv4();
    const students = new Set<string>();
    const creationDate = new Date();

    const pk = new PkValueObject(name);

    // date in format YYYY-MM-DD
    const creationDateStr = creationDate.getUTCFullYear() + "-" +
      (creationDate.getUTCMonth() + 1).toString().padStart(2, '0') + "-" +
      creationDate.getUTCDate().toString().padStart(2, '0');

    // course#2023-10-1#100.00#technology#cloudcomputing#julioscheidt#
    // ENTITY#CREATIONDATE#PRICE#AREA#SUBAREA#AUTHOR#
      const sk = new SkValueObject(
        "course",
        creationDateStr,
        [price],
        [area, subArea, author],
      );

    const dateUTC = new Date(creationDate.getUTCFullYear(),
      creationDate.getUTCMonth(), creationDate.getUTCDate(),
      creationDate.getUTCHours(), creationDate.getUTCMinutes(),
      creationDate.getUTCSeconds());

    return new Course(
      pk.getValue(),
      sk.getValue(),
      id,
      name,
      price,
      area,
      subArea,
      author,
      quantityClasses,
      students,
      dateUTC.toISOString(),
    );
  }
}
