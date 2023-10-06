"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = __importDefault(require("../../../../src/domain/entity/Course"));
const ValidationException_1 = __importDefault(require("../../../../src/domain/exception/ValidationException"));
const ValueObject_1 = __importDefault(require("../../../../src/domain/vo/ValueObject"));
describe("Course entity tests", () => {
    test("Shouldn create a new course", () => {
        const expectedCourseName = "Course 1";
        const expectedPrice = 100.00;
        const expectedArea = "Technology";
        const expectedSubArea = "Cloud Computing";
        const expectedAuthor = "John Doe";
        const expectedQuantityClasses = 50;
        const course = Course_1.default.newCourse(expectedCourseName, expectedPrice, expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);
        expect(course).toBeDefined();
        expect(course.pk).toBe(ValueObject_1.default.normalizeString(expectedCourseName));
        expect(course.sk).toBeDefined();
        expect(course.id).toBeDefined();
        expect(course.name).toBe(expectedCourseName);
        expect(course.price).toBe(expectedPrice);
        expect(course.area).toBe(expectedArea);
        expect(course.subArea).toBe(expectedSubArea);
        expect(course.author).toBe(expectedAuthor);
        expect(course.quantityClasses).toBe(expectedQuantityClasses);
        expect(course.students.size).toBe(0);
        expect(course.creationDate).toBeDefined();
    });
    test("Shouldn't create course without any required attribute", () => {
        const expectedCourseName = "Course 1";
        const expectedPrice = 100.00;
        const expectedArea = "Technology";
        const expectedSubArea = "Cloud Computing";
        const expectedAuthor = "John Doe";
        expect(() => {
            Course_1.default.newCourse(expectedCourseName, expectedPrice, expectedArea, expectedSubArea, expectedAuthor, undefined);
        }).toThrow(ValidationException_1.default);
    });
    test("Shouldn subscribe a student to a course", () => {
        const expectedCourseName = "Course 1";
        const expectedPrice = 100.00;
        const expectedArea = "Technology";
        const expectedSubArea = "Cloud Computing";
        const expectedAuthor = "John Doe";
        const expectedQuantityClasses = 50;
        const course = Course_1.default.newCourse(expectedCourseName, expectedPrice, expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);
        course.subscribeStudent("student1");
        expect(course).toBeDefined();
        expect(course.pk).toBe(ValueObject_1.default.normalizeString(expectedCourseName));
        expect(course.sk).toBeDefined();
        expect(course.id).toBeDefined();
        expect(course.name).toBe(expectedCourseName);
        expect(course.price).toBe(expectedPrice);
        expect(course.area).toBe(expectedArea);
        expect(course.subArea).toBe(expectedSubArea);
        expect(course.author).toBe(expectedAuthor);
        expect(course.quantityClasses).toBe(expectedQuantityClasses);
        expect(course.students.size).toBe(1);
        expect(course.creationDate).toBeDefined();
    });
});
