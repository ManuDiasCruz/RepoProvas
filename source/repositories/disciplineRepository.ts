import { prisma } from "../config/prisma_database.js";

export async function getById(id:number) {
    return prisma.discipline.findUnique({
        where: { id }
    });
}

export async function getByTerm(term: number) {
    return prisma.discipline.findMany({
        where: { termId: term }
    })    
}