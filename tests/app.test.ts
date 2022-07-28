import { faker } from "@faker-js/faker";
import supertest from "supertest";

import * as scenarioFactory from "./factories/scenarioFactory.js";

import userFactory from "./factories/userFactory.js";
import app from "../source/app.js";
import { prisma } from "../source/config/prisma_database.js";
import { tokenFactory } from "./factories/tokenFactory.js";
import { TestData } from "../source/utils/types.js";

beforeEach(async() => {
    await scenarioFactory.deleteAllData(); 
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

describe("tests for other application features", () => {
    it ("should return tests by discipline", async () => {
        await scenarioFactory.createScenarioOneTeacherWithOneTest();
        const token = await tokenFactory();

        const response = await agent
            .get("/tests?groupBy=disciplines")
            .set("Authorization", `Bearer ${token}`);
        
        expect(response.body.tests.length).toEqual(3);
        expect(response.body.tests[0].disciplines.length).toEqual(1);
    });

    it ("should return tests by instructor", async () => {
        const scenario = await scenarioFactory.createScenarioTwoTeachersWithTwoTestsEach();
        const token = await tokenFactory();
        const response = await agent
            .get("/tests?groupBy=teachers")
            .set("Authorization", `Bearer ${token}`);


        const { tests } = response.body;

        expect(tests.length).toBe(2);
        expect(tests[0].teacher).toBe(scenario.teachers[0].name);
        expect(tests[0].categories.length).toBe(1);
        expect(tests[0].categories[0].tests.length).toBe(2);

        expect(tests[1].teacher).toBe(scenario.teachers[1].name);
        expect(tests[1].categories.length).toBe(1);
        expect(tests[1].categories[0].tests.length).toBe(2);
    });

    it ("should create test", async () => {
        const {category, discipline, teacher} = await scenarioFactory.createScenarioOneTeacherWithOneTest();
        const test = {
            name: faker.lorem.words(5),
            pdfUrl: faker.internet.url(),
            categoryId: category.id,
            disciplineId: discipline.id,
            teacherId: teacher.id
        };

        const token = await tokenFactory();
        const response = await agent
            .post("/tests")
            .set("Authorization", `Bearer ${token}`)
            .send(test)
        
        expect(response.status).toBe(201);


    });
});

afterAll(async () => {
    await prisma.$disconnect();
});