/*
  Warnings:

  - A unique constraint covering the columns `[venue]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Location_venue_key` ON `Location`(`venue`);
