import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma_database.js";

export async function getTestsByDiscipline(discipline: string) {
  return prisma.term.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        include: {
                            teacher: true,
                            tests: { include: { category: true } },
                        }
                    }
                }
            }
        }
  });
}

export async function getTestsByTeachers(teacher: string) {
    return prisma.teacherDiscipline.findMany({
        include: {
            teacher: true,
            discipline: true,
            tests: { include: { category: true } }
        }
    });
}

export async function insert(createTestData: Prisma.TestUncheckedCreateInput) {
    await prisma.test.create({
        data: createTestData
    });
}

export async function getById(id: number) {
    return prisma.test.findUnique({
        where: { id }
    });
}

export async function view(id: number) {
    return prisma.test.update({
        where: { id },
        data: { view: { increment: 1 } }
    });
}
