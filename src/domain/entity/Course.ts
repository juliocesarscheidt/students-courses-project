import { v4 as uuidv4 } from "uuid";

const normalizeString = (str: string): string => {
  return str.trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/gi, '')
    .toLowerCase();
};

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
    name: string,
    price: number,
    area: string,
    subArea: string,
    author: string,
    quantityClasses: number
  ): Course {
    // TODO: adjust exception
    if (!name || !price || !area || !subArea || !author || !quantityClasses) throw new Error("Invalid params");

    const id = uuidv4();
    const students = new Set<string>();
    const creationDate = new Date();

    const pk = normalizeString(name);

    // date in format YYYY-MM-DD
    const creationDateStr = creationDate.getUTCFullYear() + "-" +
      (creationDate.getUTCMonth() + 1).toString().padStart(2, '0') + "-" +
      creationDate.getUTCDate().toString().padStart(2, '0');

    // course#2023-10-1#100.00#technology#cloudcomputing#julioscheidt#
    // ENTITY#CREATIONDATE#PRICE#AREA#SUBAREA#AUTHOR#
    const sk = "course#" +
      creationDateStr + "#" +
      price + "#" +
      normalizeString(area) + "#" +
      normalizeString(subArea) + "#" +
      normalizeString(author) + "#";

    const dateUTC = new Date(creationDate.getUTCFullYear(), creationDate.getUTCMonth(), creationDate.getUTCDate(),
      creationDate.getUTCHours(), creationDate.getUTCMinutes(), creationDate.getUTCSeconds());

    console.log("id", id);
    console.log("pk", pk);
    console.log("sk", sk);
    console.log("dateUTC", dateUTC);

    return new Course(
      pk,
      sk,
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
