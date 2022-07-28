import { UserData } from "../utils/types.js";
import { prisma } from "./../config/prisma_database.js";

export async function create(user: UserData) {
    return prisma.user.create({
        data: user
    });
}

export async function search(param: string, value: string | number) {
    return prisma.user.findFirst({
        where: {
           [param]: value
        }
    });
}