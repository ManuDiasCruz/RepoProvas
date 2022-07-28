import * as repository from "./../repositories/disciplineRepository.js";

export async function getById(id: number) {
    return repository.getById(id);
}

export async function getByTerm(term: number) {
    return repository.getByTerm(term);
}