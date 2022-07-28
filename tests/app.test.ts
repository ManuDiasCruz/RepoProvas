import { faker } from "@faker-js/faker";
import supertest from "supertest";

//import { createScenarioOneTeacherWithOneTest, createScenarioTwoTeachersWithTwoTestsEach, deleteAllData } from "./factories/scenarioFactory.js";

import userFactory from "./factories/userFactory.js";
import app from "../source/app.js";
import { prisma } from "../source/config/prisma_database.js";

beforeEach(async() => {
  await deleteAllData(); 
});

const agent = supertest(app);

describe("user tests", () => {
    it("should create user", async () => {
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        await agent.post("/sign-up").send(user);

        const userCreated = await prisma.user.findFirst({
            where: {email: user.email}
        });

        expect(userCreated).not.toBeNull();
    });

    it("should login user", async () => {
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        userFactory(user);
        const response = await agent.post("/sign-in").send(user);
        const { token } = response.body;
        expect(token).not.toBeNull();
    });
});