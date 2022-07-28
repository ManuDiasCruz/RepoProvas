import { faker } from "@faker-js/faker";
import { UserData } from "../../source/utils/types";

export default function userBodyFactory(): UserData {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    };
}