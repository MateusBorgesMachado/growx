/*
  Warnings:

  - Added the required column `dislike` to the `tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `like` to the `tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count_follower` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count_following` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tweet" ADD COLUMN     "dislike" SMALLINT NOT NULL,
ADD COLUMN     "like" SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "count_follower" SMALLINT NOT NULL,
ADD COLUMN     "count_following" SMALLINT NOT NULL;

-- CreateTable
CREATE TABLE "UserTweetLike" (
    "tweetId" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserTweetLike_pkey" PRIMARY KEY ("tweetId","userId")
);

-- AddForeignKey
ALTER TABLE "UserTweetLike" ADD CONSTRAINT "UserTweetLike_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTweetLike" ADD CONSTRAINT "UserTweetLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
