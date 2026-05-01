import { randomUUID } from "crypto";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";

export class UserService {
    private userRepository = new UserRepository();

    public async create(userDTO: CreateUserDTO) {
        try {
            const duplicateEmail = await this.userRepository.getByEmail(userDTO.email as string)
            if (duplicateEmail) {
                throw new Error("email already exists")
            }

            const duplicateUsername = await this.userRepository.getByUsername(userDTO.username as string)
            if (duplicateUsername) {
                throw new Error("username already exists")
            }

            const salt = 10;
            const passwordHash = await bcrypt.hash(userDTO.password, salt)

            const secureData = {
                name: userDTO.name,
                email: userDTO.email,
                username: userDTO.username,
                password: passwordHash,
                imageUrl: userDTO.imageUrl

            }

            const uuid = randomUUID();

            this.userRepository.create(uuid, secureData)

            return secureData
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    console.log(
                        "There is a unique constraint violation, a new user cannot be created with this email",
                    );
                }
            }
            throw error;
        }
    }
}