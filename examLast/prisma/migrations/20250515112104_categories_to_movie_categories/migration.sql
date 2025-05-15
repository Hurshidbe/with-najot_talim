/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "movie_categories" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "movie_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_categories_slug_key" ON "movie_categories"("slug");
