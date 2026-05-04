import { LikeRepository } from '../repositories/like.repository'
import { TweetRepository } from '../repositories/tweet.repository'

export class LikeService {
    private likeRepository = new LikeRepository()
    private tweetRepository = new TweetRepository()

    public async toggleLike(userId: string, tweetId: string) {
        const tweet = await this.tweetRepository.getById(tweetId)
        if (!tweet) throw new Error('Tweet not found')

        const existingLike = await this.likeRepository.checkLike(userId, tweetId)

        if (existingLike) {
            const unlike = await this.likeRepository.delete(userId, tweetId)
            return unlike.isLiked
        }

        const like = await this.likeRepository.create(userId, tweetId)
        return like.isLiked
    }
}