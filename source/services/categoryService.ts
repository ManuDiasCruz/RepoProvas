import * as repository from "./../repositories/categoryRepository.js";

export async function findMany() {
    return repository.findMany();
}

export async function getById(id: number) {
    return repository.getById(id);
}