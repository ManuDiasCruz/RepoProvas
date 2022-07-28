import { faker } from "@faker-js/faker";
import { prisma } from "../../source/config/prisma_database.js";

export async function createTest(categoryId: number, teacherDisciplineId: number) {
    const test = await prisma.test.create({
        data: {
            categoryId,
            teacherDisciplineId,
            name: `Test - ${faker.random.numeric(3)}`,
            pdfUrl: faker.internet.url()
        }
    })

    return test;
}

export async function findTest(id: number) {
    const test = await prisma.test.findFirst({
        where: {id: id}
    })

    return test;
}