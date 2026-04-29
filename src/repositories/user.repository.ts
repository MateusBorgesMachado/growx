import { prisma } from '../database';
import { CreateUserDTO } from '../dtos/create-user.dto';

export class userRepository {
    // C - Create
    public async create(userDTO: CreateUserDTO) {
        const user = await prisma.user.create({
            name: userDTO.name,
            email: userDTO.email,
            username: userDTO.username,
            password: userDTO.password,
            imageUrl: userDTO.imageUrl
        })

        return user
    }

    // R - Read
    public async list(){
        const users = prisma.user.findMany()

        return users
    }

    public async getById(userId: string){
        const user = prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user
    }

    public async getByUsername(username: string){
                const user = prisma.user.findUnique({
            where: {
                username: username
            }
        })

        return user
    }

    public async getByEmail(userEmail: string){
                const user = prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })

        return user
    }

    // U - Update
    public async update(id: string, userDTO: CreateUserDTO){
        const userUpdated = prisma.user.update({
            where: {
                id
            },
            data: {
                name: userDTO.name,
                email: userDTO.email,
                password: userDTO.password,
                username: userDTO.username,
                imageUrl: userDTO.imageUrl
            }
        })

        return userUpdated
    }

    // D - Delete
    public async delete(id: string){
        const userDeleted = prisma.user.delete({
            where: id
        })

        return userDeleted;
    }
}