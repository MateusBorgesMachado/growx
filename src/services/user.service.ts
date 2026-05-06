import { randomUUID } from 'crypto'
import type { CreateUserDTO } from '../dtos/create-user.dto'
import { UserRepository } from '../repositories/user.repository'
import bcrypt from 'bcrypt'

export class UserService {
    private userRepository = new UserRepository()

    public async create(userDTO: CreateUserDTO) {

        const duplicateEmail = await this.userRepository.getByEmail(userDTO.email as string)
        if (duplicateEmail[0]) {
            throw new Error('email already exists')
        }

        const duplicateUsername = await this.userRepository.getByUsername(userDTO.username as string)
        if (duplicateUsername[0] && duplicateEmail[0] !== null) {
            throw new Error('username already exists')
        }

        const salt = 10
        const passwordHash = await bcrypt.hash(userDTO.password, salt)

        const secureData = {
            name: userDTO.name,
            email: userDTO.email as string,
            username: userDTO.username as string,
            password: passwordHash,
            imageUrl: userDTO.imageUrl as string
        }

        const uuid = randomUUID()

        this.userRepository.create(uuid, secureData)

        return secureData
    }

    public async list() {
        const users = await this.userRepository.list()

        if (!users) throw new Error('Users not found')

        const safeUsers = users.map((user: {
            id: string
            name: string
            email: string | null
            username: string | null
            password: string
            imageUrl: string | null
            countFollower: number
            countFollowing: number
            createAt: Date
            updateAt: Date
        }) => {
            const { password, ...safeUser } = user
            return safeUser
        })

        return safeUsers
    }

    public async getById(id: string) {
        const user = await this.userRepository.getById(id)

        if (!user) throw new Error('User not found')

        const { password, ...safeUser } = user

        return safeUser
    }

    public async getByEmail(email: string) {
        const user = await this.userRepository.getByEmail(email)

        if (!user[0]) throw new Error('User not found')

        const { password, ...safeUser } = user[0]

        return safeUser
    }

    public async getByUsername(username: string) {
        const user = await this.userRepository.getByUsername(username)

        if (!user[0]) throw new Error('User not found')

        const { password, ...safeUser } = user[0]

        return safeUser
    }

    public async update(id: string, data: { name?: string; email?: string; username?: string; password?: string; imageUrl?: string }) {
        const currentUser = await this.userRepository.getById(id)

        if (!currentUser) {
            throw new Error('Login expired')
        }

        if (data.email && data.email !== currentUser.email) {
            const emailInUse = await this.userRepository.getByEmail(data.email)
            if (emailInUse[0]) throw new Error('This email address is already in use')
        }

        let processPassword = data.password
        if (data.password) {
            processPassword = await bcrypt.hash(data.password, 10)
        }

        const updatedData = {
            name: data.name,
            email: data.email,
            username: data.username,
            imageUrl: data.imageUrl,
            password: processPassword
        }

        const updatedUser = await this.userRepository.update(id, updatedData)

        const { password, ...safeUser } = updatedUser
        return safeUser
    }

    public async delete(id: string) {
        const currentUser = await this.userRepository.getById(id)

        if (!currentUser) throw new Error('User not found')

        const deletedUser = await this.userRepository.delete(id)

        return deletedUser
    }

    public async feed(id: string) {
        const user = await this.userRepository.getById(id)

        if (!user) {
            throw new Error('User not found')
        }

        const followingIds = user.following.map((follow: { followerId: string; followingId: string }) => follow.followingId)
        const allIds = [id, ...followingIds]
        console.log(allIds)

        const users = await this.userRepository.listById(allIds)

        const feed = users.map((f: {
            tweets: {
                id: string;
                createAt: Date;
                updateAt: Date;
                content: string;
                countLike: number;
                userId: string;
            }[]
        }) => f.tweets)

        return feed
    }
}