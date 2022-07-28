import * as repository from "./../repositories/teacherRepository.js";

export async function getById(id: number) {
    return repository.getById(id);
}

export async function getByDiscipline(discipline: number) {
    return repository.getByDiscipline(discipline);
}