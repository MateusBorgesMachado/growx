import { randomUUID } from 'crypto'
import { TweetRepository } from '../repositories/tweet.repository'

export class TweetService {
    private tweetRepository = new TweetRepository()


    public async create(content: string, userId: string) {
        
        
        const id = randomUUID()

        const createdTweet = await this.tweetRepository.create(id, content.trim(), userId)

        return createdTweet
    }

    public async createReply(content: string, userId: string, parentTweetId: string) {
        
        const parentTweet = await this.tweetRepository.getById(parentTweetId)
        if (!parentTweet) {
            throw new Error('Tweet not found')
        }

        const id = randomUUID()

        const createdReply = await this.tweetRepository.createReply(id, content, userId, parentTweetId)

        return createdReply
    }
}