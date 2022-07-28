import bcrypt from "bcrypt";
import { prisma } from "../../source/config/prisma_database.js";
import { UserData } from "../../source/utils/types";

export default async function userFactory(user: UserData) {
    return prisma.user.create({
        data: {
            ...user,
            password: bcrypt.hashSync(user.password, 10),
        }
    });
}
