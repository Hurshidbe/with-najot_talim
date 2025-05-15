-- CreateEnum
CREATE TYPE "movie_subs" AS ENUM ('premium', 'free');

-- CreateTable
CREATE TABLE "movies" (
    "id" UUID NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "release_year" INTEGER NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "poster_url" VARCHAR(255) NOT NULL,
    "raiting" DECIMAL(3,1) NOT NULL,
    "subscription_type" "movie_subs" NOT NULL DEFAULT 'free',
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "created_by" UUID NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_slug_key" ON "movies"("slug");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
