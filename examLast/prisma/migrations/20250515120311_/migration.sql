-- CreateEnum
CREATE TYPE "movie_quality" AS ENUM ('p240', 'p360', 'p480', 'p720', 'p1080', 'k4');

-- CreateTable
CREATE TABLE "movie_files" (
    "id" UUID NOT NULL,
    "movie_id" UUID NOT NULL,
    "file_url" VARCHAR(255) NOT NULL,
    "quality" "movie_quality" NOT NULL,
    "language" VARCHAR(20) NOT NULL DEFAULT 'uz',

    CONSTRAINT "movie_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movie_files" ADD CONSTRAINT "movie_files_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
