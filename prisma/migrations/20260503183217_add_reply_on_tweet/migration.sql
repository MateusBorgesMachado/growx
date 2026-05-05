/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_tweet_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropTable
DROP TABLE "comments";

-- CreateTable
CREATE TABLE "reply_tweet" (
    "tweet_id" VARCHAR(36) NOT NULL,
    "reply_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "reply_tweet_pkey" PRIMARY KEY ("tweet_id","reply_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reply_tweet_tweet_id_key" ON "reply_tweet"("tweet_id");

-- AddForeignKey
ALTER TABLE "reply_tweet" ADD CONSTRAINT "reply_tweet_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply_tweet" ADD CONSTRAINT "reply_tweet_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
