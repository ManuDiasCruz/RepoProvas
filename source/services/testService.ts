import { Category, Test, Term, TeacherDiscipline, Teacher, Discipline } from "@prisma/client";
import * as categoryRepository from "./../repositories/categoryRepository.js";
import * as categoryService from "./categoryService.js";

import * as disciplineService from "./disciplineService.js";
import * as teacherDisciplineService from "./teacherDiscService.js";
import * as teacherService from "./teacherService.js";

import { TestData } from "../utils/types.js";
import * as testRepository from "./../repositories/testRepository.js";
import { badRequestError, notFoundError } from "../utils/errorUtils.js";


interface Filter {
    groupBy: "disciplines" | "teachers";
    teacher?: string;
    discipline?: string;
}

export async function find(filter: Filter) {
    const { groupBy } = filter;

    if (groupBy === "disciplines")
        return filterByDisciplines(filter)
    
    if (groupBy === "teachers")
        return filterByTeachers(filter)
}

async function filterByDisciplines(filter: Filter) {
    const terms = await testRepository.getTestsByDiscipline(filter.discipline);
    const categories = await categoryRepository.findMany();

    return terms.map( term => 
        buildTermsWithDisciplinesAndCategories(term, categories)
    );
}

async function filterByTeachers(filter:Filter) {
    const teachersDisciplines = await testRepository.getTestsByTeachers(filter.teacher);
    const testsByTeachers = groupTestsByTeacher(teachersDisciplines);
    
    const categories = await categoryRepository.findMany();
    return groupTestsFromTeachersInCategories(testsByTeachers, categories);
}

function groupTestsFromTeachersInCategories(testsByTeachersMap: Map<string, { tests: Test[] }>, categories: Category[]) {
    const teacherTestsGroupByCategories = [];
    
    const teachers = Array.from(testsByTeachersMap.keys());
    teachers.forEach( (teacher) => {
        const categoriesMapForTeacher = buildCategoriesMap(categories);
        const { tests } = testsByTeachersMap.get(teacher);
        arrangeTestsInCategories(categoriesMapForTeacher, tests);
        teacherTestsGroupByCategories.push({
            teacher,
            categories: Array.from(categoriesMapForTeacher.values())
        })
    });

    return teacherTestsGroupByCategories;
}

function arrangeTestsInCategories(categoriesMap, tests) {
    tests.forEach( test => {
        const categoryGroup = categoriesMap.get(test.categoryId);
        categoryGroup.tests.push({ test });
    });
}

function groupTestsByTeacher(teachersDisciplines) {
    const teachers = getUniqueTeachers(teachersDisciplines);
    const teachersMap = buildTeachersMap(teachers);
    
    teachersDisciplines.forEach(teacherDiscipline => {
        const discipline = teacherDiscipline.discipline;
        const teacherFromMap = teachersMap.get(teacherDiscipline.teacher.name);
        const tests = teacherDiscipline.tests;
        tests.forEach(  test => {
          teacherFromMap.tests.push({...test, discipline});
        });
    })
    
    return teachersMap;
}

function getUniqueTeachers(teacherDisciplines) {
    const teachersSet = new Set<string>(teacherDisciplines.map(teacherDiscipline => teacherDiscipline.teacher.name))
    return Array.from(teachersSet); 
}

function buildTermsWithDisciplinesAndCategories(term: Term, categories: Category[]) {
    const categoriesMap = buildCategoriesMap(categories);
    const newTerm: any = {...term};
    newTerm.disciplines.forEach(discipline => {
        const teacherDisciplines = discipline.teacherDisciplines;
        teacherDisciplines.forEach(teacherDiscipline => groupTestsByCategory(categoriesMap, teacherDiscipline));
        discipline.categories = Array.from(categoriesMap.values());
    });

    return newTerm;
}

function buildCategoriesMap(categories: Category[]) {
    const categoriesMap = new Map<number, { name: string, tests: Test[] }>();
    categories.forEach(category => {
        categoriesMap.set(category.id, { name: category.name, tests: [] });
    });

    return categoriesMap;
}

function buildTeachersMap(teachers: string[]) {
    const teachersMap = new Map<string, {tests: Test[]}>();
    teachers.forEach(teacher => {
        teachersMap.set(teacher, { tests: [] });
    })

    return teachersMap;
}

function groupTestsByCategory(categoriesMap, teacherDiscipline) {
    const tests = teacherDiscipline.tests;
    tests.forEach(test => {
      const categoryGroup = categoriesMap.get(test.categoryId);
      categoryGroup.tests.push({
          test,
          teacher: teacherDiscipline.teacher
      })
    })
}

export async function insert(testData: TestData) {
    const { categoryId, teacherId, disciplineId, name, pdfUrl } = testData;

    const existingCategory = await categoryService.getById(categoryId);
    if (!existingCategory) 
        throw badRequestError("Category doesn't exist");

    const existingDiscipline = await disciplineService.getById(disciplineId);
    if (!existingDiscipline) 
        throw badRequestError("Discipline doesn't exist");

    const existingTeacher = await teacherService.getById(teacherId);
    if (!existingTeacher) 
        throw badRequestError("Teacher doesn't exist");

    const teacherDiscipline = await teacherDisciplineService.getByTeacherAndDiscipline(teacherId, disciplineId);
    
    if (!teacherDiscipline)
        throw badRequestError("Teacher doesn't teach this discipline");

    await testRepository.insert({
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId: teacherDiscipline.id
    });
}

export async function view(id: number) {
    const test = await testRepository.getById(id);
    if (!test) 
        throw notFoundError();

    await testRepository.view(id);
}
