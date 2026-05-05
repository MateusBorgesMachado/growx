import { FollowRepository } from '../repositories/follow.repository'
import { UserRepository } from '../repositories/user.repository'

export class FollowService {
    private followRepository = new FollowRepository()
    private userRepository = new UserRepository()

    public async followUser(followerId: string, followingId: string) {

        if (followerId == followingId) {
            throw new Error('You cannot follow yourself')
        }

        const existingUser = await this.userRepository.getById(followingId)
        if (!existingUser) throw new Error('User not found')

        const existingFollow = await this.followRepository.getFollow(followerId, followingId)
        if (existingFollow) throw new Error('You are already following this user')

        const follow = await this.followRepository.follow(followerId, followingId)

        return follow
    }

    public async unfollowUser(followerId: string, followingId: string) {
        const existingFollow = await this.followRepository.getFollow(followerId, followingId);
        if (!existingFollow) throw new Error('You are not following this user yet');

        return await this.followRepository.unfollow(followerId, followingId);
    }

}