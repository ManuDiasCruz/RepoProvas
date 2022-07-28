import { prisma } from "../../source/config/prisma_database.js";

export default async function createTeacherDiscipline(teacherId: number, disciplineId: number) {
    const teacherDiscipline = await prisma.teacherDiscipline.create({
        data: { teacherId, disciplineId }
    });
    
    return teacherDiscipline;
}