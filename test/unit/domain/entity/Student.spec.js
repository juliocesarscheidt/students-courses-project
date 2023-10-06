"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = __importDefault(require("../../../../src/domain/entity/Student"));
const ValidationException_1 = __importDefault(require("../../../../src/domain/exception/ValidationException"));
const ValueObject_1 = __importDefault(require("../../../../src/domain/vo/ValueObject"));
describe("Student entity tests", () => {
    test("Shouldn create a new student", () => {
        const expectedName = "John";
        const expectedSurname = "Doe";
        const expectedEmail = "johndoe@mail.com";
        const student = Student_1.default.newStudent(expectedName, expectedSurname, expectedEmail);
        expect(student).toBeDefined();
        expect(student.pk).toBe(ValueObject_1.default.normalizeString(`${expectedName} ${expectedSurname}`));
        expect(student.sk).toBeDefined();
        expect(student.id).toBeDefined();
        expect(student.name).toBe(expectedName);
        expect(student.surname).toBe(expectedSurname);
        expect(student.email).toBe(expectedEmail);
        expect(student.creationDate).toBeDefined();
    });
    test("Shouldn't create student without any required attribute", () => {
        const expectedName = "John";
        const expectedSurname = "Doe";
        expect(() => {
            Student_1.default.newStudent(expectedName, expectedSurname, undefined);
        }).toThrow(ValidationException_1.default);
    });
});
