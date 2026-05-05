import { prisma } from '../database/prisma.repository'
import { CreateTweetDTO } from '../dtos/create-tweet.dto'

export class TweetRepository {
    public async create(id: string, content: string, userId: string) {
        const createdTweet = await prisma.tweet.create({
            data: {
                id,
                content,
                userId
            }
        })

        return createdTweet
    }

    public async createReply(id: string, content: string, userId: string, tweetId: string) {
        const createdReply = await prisma.tweet.create({
            data: {
                id,
                content,
                userId,
                reply: {
                    create:{
                        tweetId,
                    }
                }
            },
            include: {
                reply: true
            }
        })

        return createdReply
    }

    public async getById(id: string) {
        const tweet = await prisma.tweet.findUnique({
            where: {
                id
            }
        })
        return tweet
    }
}