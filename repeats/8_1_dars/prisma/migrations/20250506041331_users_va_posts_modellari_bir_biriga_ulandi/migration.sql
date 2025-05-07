/*
  Warnings:

  - Added the required column `writer_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "writer_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
