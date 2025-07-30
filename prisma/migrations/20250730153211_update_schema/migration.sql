-- CreateTable
CREATE TABLE "Shared" (
    "id" INTEGER NOT NULL,
    "folder_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Shared_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shared" ADD CONSTRAINT "Shared_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
