import { randomUUID } from "crypto";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";
import { error } from "console";

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

    public async list() {
        const users = await this.userRepository.list();

        if (!users) throw new Error("Users not found")

        const safeUsers = users.map((user: {
            id: string;
            name: string;
            email: string | null;
            username: string | null;
            password: string;
            imageUrl: string | null;
            countFollower: number;
            countFollowing: number;
            createAt: Date;
            updateAt: Date;
        }) => {
            const { password, ...safeUser } = user
            return safeUser
        })

        return safeUsers
    }

    public async getById(id: string) {
        const user = await this.userRepository.getById(id)

        if (!user) throw new Error("User not found")

        const { password, ...safeUser } = user

        return safeUser
    }

    public async getByEmail(email: string) {
        const user = await this.userRepository.getByEmail(email)

        if (!user) throw new Error("User not found")

        const { password, ...safeUser } = user

        return safeUser
    }

    public async getByUsername(username: string) {
        const user = await this.userRepository.getByUsername(username)

        if (!user) throw new Error("User not found")

        const { password, ...safeUser } = user

        return safeUser
    }

    public async update(id: string, data: { name?: string; email?: string; username?: string; password?: string; imageUrl?: string; }) {
        const currentUser = await this.userRepository.getById(id)

        if(!currentUser){
            throw new Error('Login expired')
        }

        if (data.email && data.email !== currentUser.email) {
            const emailInUse = await this.userRepository.getByEmail(data.email)
            if (emailInUse) throw new Error("This email address is already in use")
        }

        let processPassword = data.password
        if (data.password){
            processPassword = await bcrypt.hash(data.password, 10);
        }

        const updatedData = {
            name: data.name,
            email: data.email,
            username: data.username,
            imageUrl: data.imageUrl,
            password: processPassword
        }

        const updatedUser = await this.userRepository.update(id, updatedData)

        const {password, ...safeUser} = updatedUser
        return safeUser
    }

    public async delete(id: string) {
        const currentUser = await this.userRepository.getById(id)

        if(!currentUser) throw new Error('User not found')

        const deletedUser = await this.userRepository.delete(id)

        return deletedUser
    }
}