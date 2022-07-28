import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { UserData } from "./../utils/types.js";
import * as userRepository from "./../repositories/userRepository.js";
import * as error from "../utils/errorUtils.js";

dotenv.config();

export async function create(user: UserData){
    const thereIsUser = await userRepository.search("email", user.email);
    
    if(thereIsUser) 
        throw error.conflictError("Email must be unique");

    const SALT = 12;
    const hashedPassword = bcrypt.hashSync(user.password, SALT);

    const newUser = await userRepository.create({ ...user, password: hashedPassword });
    
    return newUser;
}

export async function signIn(user: UserData){
    const thereIsUser = await userRepository.search("email", user.email);
    
    if (!thereIsUser)
        throw error.notFoundError("User not found");

    const isPasswordValid = bcrypt.compareSync(user.password, thereIsUser.password);
    if (!isPasswordValid)
        throw error.unauthorizedError("Invalid credentials");
    
    const token = jwt.sign({id: thereIsUser.id, email: thereIsUser.email}, process.env.JWT_SECRET, { expiresIn: "12h" });

    return { token };
}

export async function findById(id: number) {
    const user = await userRepository.search("id", id);
    if (!user) 
        throw error.notFoundError("User not found");
  
    return user;
}