/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Page_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Page_title_userId_key" ON "Page"("title", "userId");
