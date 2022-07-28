import * as prisma from "@prisma/client";

export type UserData = Omit<prisma.User, "id" | "createdAt" | "updatedAt" | "inactive">;

