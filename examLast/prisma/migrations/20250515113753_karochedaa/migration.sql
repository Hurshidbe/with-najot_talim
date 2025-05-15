-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "movie_categories" (
    "id" UUID NOT NULL,
    "movie_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "movie_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movie_categories" ADD CONSTRAINT "movie_categories_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_categories" ADD CONSTRAINT "movie_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
