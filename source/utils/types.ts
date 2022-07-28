import * as prisma from "@prisma/client";

export type UserData = Omit<prisma.User, "id" | "createdAt" | "updatedAt" | "inactive">;
export type TestData = Omit<prisma.Test, "id" | "teacherDisciplineId" | "view" > & {
    teacherId: number;
    disciplineId: number;
};

