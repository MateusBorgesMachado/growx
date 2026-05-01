-- CreateTable
CREATE TABLE "comments" (
    "user_id" VARCHAR(36) NOT NULL,
    "tweet_id" VARCHAR(36) NOT NULL,
    "content" VARCHAR NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("user_id","tweet_id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
