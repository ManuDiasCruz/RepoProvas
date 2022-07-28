import { prisma } from "../config/prisma_database.js";

export async function getByTeacherAndDiscipline(teacherId: number, disciplineId: number) {
    return prisma.teacherDiscipline.findFirst({
        where: { AND: {disciplineId, teacherId } }
    });
}