import * as repository from "./../repositories/teacherDiscRepository.js";

export async function getByTeacherAndDiscipline(teacherId: number, disciplineId: number) {
    return repository.getByTeacherAndDiscipline(teacherId, disciplineId);
}