import { prisma } from '../database/prisma.repository'
import { CreateUserDTO } from '../dtos/create-user.dto'

export class UserRepository {
    // C - Create
    public async create(id: string, userDTO: CreateUserDTO) {
        const user = await prisma.user.create({
            data: {
                id,
                ...userDTO
            }
        })

        return user
    }

    // R - Read
    public async list() {
        const users = await prisma.user.findMany()

        return users
    }

    public async getById(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                following: true,
                tweets: true,
                followers: true
            }
        })

        return user
    }

    public async getFollows(userId: string) {
        return await prisma.user.findUnique({
            where: { id: userId },
            include: {

                followers: {
                    include: {
                        follower: true 
                    }
                },

                following: {
                    include: {
                        following: true 
                    }
                }
            }
        });
    }

    public async listById(ids: string[]) {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            orderBy: {
                createAt: 'desc'
            },
            include: {
                tweets: true
            }
        })
        return users
    }

    public async getByUsername(username: string) {
        const users = await prisma.user.findMany({
            where: {
                username: username
            }
        })

        return users
    }

    public async getByEmail(userEmail: string) {
        const users = await prisma.user.findMany({
            where: {
                email: userEmail
            }
        })

        return users
    }

    // U - Update
    public async update(id: string, data: any) {
        const userUpdated = await prisma.user.update({
            where: {
                id
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                username: data.username,
                imageUrl: data.imageUrl
            }
        })

        return userUpdated
    }

    // D - Delete
    public async delete(id: string) {
        const userDeleted = await prisma.user.delete({
            where: {
                id
            }
        })

        return userDeleted
    }
}