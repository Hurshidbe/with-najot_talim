/*
  Warnings:

  - Added the required column `comment` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raiting` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "raiting" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "watch_history" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "movie_id" UUID NOT NULL,
    "watched_deuration" INTEGER NOT NULL,
    "watched_persentage" DECIMAL(5,2) NOT NULL,
    "last_watched" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watch_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "watch_history" ADD CONSTRAINT "watch_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_history" ADD CONSTRAINT "watch_history_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
