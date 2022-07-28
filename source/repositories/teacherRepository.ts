import { prisma } from "../config/prisma_database.js";

export async function getById(id:number) {
    return prisma.teacher.findUnique({
        where: { id }
    });
}

export async function getByDiscipline(discipline: number) {
    return prisma.teacher.findMany({
        where: { teacherDisciplines: { some: { disciplineId: discipline } } }
    })    
}