import { prisma } from '../database/prisma.repository'

export class FollowRepository {
    public async follow(followerId: string, followingId: string) {
        return await prisma.$transaction(async (tx) => {

            const follow = await tx.userFollows.create({
                data: {
                    followerId,
                    followingId
                }
            })

            await tx.user.update({
                where: { id: followerId },
                data: {
                    countFollowing: { increment: 1 }
                }
            })

            await tx.user.update({
                where: { id: followingId },
                data: {
                    countFollower: { increment: 1 }
                }
            })

            return follow
        })
    }

    public async unfollow(followerId: string, followingId: string) {
        return await prisma.$transaction(async (tx) => {
            const unfollow = await tx.userFollows.delete({
                where: {
                    followerId_followingId: { followerId, followingId }
                }
            })

            await tx.user.update({
                where: { id: followerId },
                data: { countFollowing: { decrement: 1 } }
            })

            await tx.user.update({
                where: { id: followingId },
                data: { countFollower: { decrement: 1 } }
            })

            return unfollow
        })
    }

    public async getFollow(followerId: string, followingId: string) {
        const follow = await prisma.userFollows.findUnique({
            where: {
                followerId_followingId: { followerId, followingId }
            }
        })
        return follow
    }
}