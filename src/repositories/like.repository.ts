import type { Prisma } from '../../generated/prisma/browser'
import { prisma } from '../database/prisma.repository'

export class LikeRepository {
    public async create(userId: string, tweetId: string) {
        return await prisma.$transaction(async (tx: any) => {
            const like = await tx.like.create({
                data: { userId, tweetId }
            })

            await tx.tweet.update({
                where: { id: tweetId },
                data: { countLike: { increment: 1 } }
            })

            return like
        })
    }


    public async delete(userId: string, tweetId: string) {
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

        const unlike = await tx.like.delete({

            where: { userId_tweetId: { userId, tweetId } }
        });

        await tx.tweet.update({
            where: { id: tweetId },
            data: { countLike: { decrement: 1 } }
        });

        return unlike;
    });
    }

    public async checkLike(userId: string, tweetId: string) {
        const checkLike = await prisma.like.findUnique({
            where: {
                userId_tweetId: { userId, tweetId }
            }
        })

        return checkLike
    }

}