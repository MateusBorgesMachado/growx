/*
  Warnings:

  - You are about to drop the column `userId` on the `tweet` table. All the data in the column will be lost.
  - You are about to drop the `UserFollows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTweetLike` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `tweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserFollows" DROP CONSTRAINT "UserFollows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "UserFollows" DROP CONSTRAINT "UserFollows_followingId_fkey";

-- DropForeignKey
ALTER TABLE "UserTweetLike" DROP CONSTRAINT "UserTweetLike_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "UserTweetLike" DROP CONSTRAINT "UserTweetLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_userId_fkey";

-- AlterTable
ALTER TABLE "tweet" DROP COLUMN "userId",
ADD COLUMN     "user_id" VARCHAR(36) NOT NULL;

-- DropTable
DROP TABLE "UserFollows";

-- DropTable
DROP TABLE "UserTweetLike";

-- CreateTable
CREATE TABLE "user_follows" (
    "follower_id" VARCHAR(36) NOT NULL,
    "following_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "user_follows_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
