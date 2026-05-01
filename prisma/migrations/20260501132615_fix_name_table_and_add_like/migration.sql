/*
  Warnings:

  - You are about to drop the column `dislike` on the `tweet` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tweet" DROP COLUMN "dislike",
DROP COLUMN "like",
ADD COLUMN     "count_like" SMALLINT NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "like" (
    "user_id" VARCHAR(36) NOT NULL,
    "tweet_id" VARCHAR(36) NOT NULL,
    "is_liked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "like_pkey" PRIMARY KEY ("user_id","tweet_id")
);

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
