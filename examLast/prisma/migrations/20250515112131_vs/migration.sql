/*
  Warnings:

  - You are about to drop the `movie_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "movie_categories";

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");
