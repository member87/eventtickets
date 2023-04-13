/*
  Warnings:

  - A unique constraint covering the columns `[name,locationId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Event_name_locationId_key` ON `Event`(`name`, `locationId`);
