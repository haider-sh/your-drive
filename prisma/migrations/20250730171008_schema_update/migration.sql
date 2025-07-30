/*
  Warnings:

  - The primary key for the `Shared` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Shared" DROP CONSTRAINT "Shared_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shared_pkey" PRIMARY KEY ("id");
