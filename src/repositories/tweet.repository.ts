import { prisma } from '../database';
import { CreateTweetDTO } from '../dtos/create-tweet.dto';

export class TweetRepository {
    public async create (id:string, content: string, userId: string){
        const createdTweet = await prisma.tweet.create({
            data: {
                id,
                content,
                userId
            }
        })

        return createdTweet
    }
}