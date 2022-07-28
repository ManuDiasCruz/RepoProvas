import { prisma } from "../config/prisma_database.js";

export async function findMany() {
    return prisma.category.findMany();
}
  
export async function getById(id: number) {
    return prisma.category.findUnique({
        where: { id }
    });
}