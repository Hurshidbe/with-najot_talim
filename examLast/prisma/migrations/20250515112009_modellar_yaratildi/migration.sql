-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin', 'Superadmin');

-- CreateEnum
CREATE TYPE "subsStatus" AS ENUM ('active', 'expired', 'canceled', 'pending_payment');

-- CreateEnum
CREATE TYPE "pay_met" AS ENUM ('card', 'paypal', 'bank_transfer', 'crypto');

-- CreateEnum
CREATE TYPE "payment_stat" AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "avatar_url" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptionModel" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "features" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "subscriptionModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersubscription" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,
    "started_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "subsStatus" NOT NULL DEFAULT 'pending_payment',
    "auto_renew" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usersubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "user_subs_id" UUID NOT NULL,
    "payment_method" "pay_met" NOT NULL,
    "payment_details" JSONB NOT NULL,
    "status" "payment_stat" NOT NULL,
    "external_transaction_id" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- AddForeignKey
ALTER TABLE "usersubscription" ADD CONSTRAINT "usersubscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersubscription" ADD CONSTRAINT "usersubscription_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "subscriptionModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_subs_id_fkey" FOREIGN KEY ("user_subs_id") REFERENCES "usersubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
