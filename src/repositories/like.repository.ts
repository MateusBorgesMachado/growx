import { prisma } from '../database/prisma.repository'

export class LikeRepository {
    public async create(userId: string, tweetId: string) {
        const like = await prisma.like.create({
            data: {
                userId,
                tweetId
            }
        });
        
        return like
    }

    public async delete(userId: string, tweetId: string) {
        const unlike = await prisma.like.delete({
            where: {
                userId_tweetId: { userId, tweetId }
            }
        });

        return unlike
    }

    public async checkLike(userId: string, tweetId: string) {
        const checkLike = await prisma.like.findUnique({
            where: {
                userId_tweetId: { userId, tweetId }
            }
        });

        return checkLike
    }

}