-- CreateTable
CREATE TABLE "Favorite" (
    "creatorId" TEXT NOT NULL,
    "podcastId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("creatorId","podcastId")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
