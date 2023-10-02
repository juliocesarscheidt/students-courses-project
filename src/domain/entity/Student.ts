import { v4 as uuidv4 } from "uuid";
import ValidationException from "../exception/ValidationException";
import SkValueObject from "../vo/SkValueObject";
import PkValueObject from "../vo/PkValueObject";

export default class Student {

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

  public static mapFrom(item: any): Student {
    return new Student(
      item.pk,
      item.sk,
      item.id,
      item.name,
      item.surname,
      item.fullName,
      item.email,
      item.creationDate,
    );
  }

  public static newStudent(
    name: string,
    surname: string,
    fullName: string,
    email: string,
  ): Student {
    // TODO: adjust exception
    if (!name || !surname || !fullName || !email)
      throw new ValidationException();

    const id = uuidv4();
    const creationDate = new Date();

    const pk = new PkValueObject(fullName);

    // date in format YYYY-MM-DD
    const creationDateStr = creationDate.getUTCFullYear() + "-" +
      (creationDate.getUTCMonth() + 1).toString().padStart(2, '0') + "-" +
      creationDate.getUTCDate().toString().padStart(2, '0');

    // student#2023-10-1#doe#john#
    // ENTITY#CREATIONDATE#SURNAME#NAME#
    const sk = new SkValueObject(
      "student",
      creationDateStr,
      [],
      [surname, name],
    );

    const dateUTC = new Date(creationDate.getUTCFullYear(), creationDate.getUTCMonth(), creationDate.getUTCDate(),
      creationDate.getUTCHours(), creationDate.getUTCMinutes(), creationDate.getUTCSeconds());

    return new Student(
      pk.getValue(),
      sk.getValue(),
      id,
      name,
      surname,
      fullName,
      email,
      dateUTC.toISOString(),
    );
  }
}
