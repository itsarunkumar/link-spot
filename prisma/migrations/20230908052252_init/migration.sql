-- CreateEnum
CREATE TYPE "SocialLinkType" AS ENUM ('TWITTER', 'GITHUB', 'LINKEDIN', 'EMAIL', 'INSTAGRAM', 'FACEBOOK');

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" "SocialLinkType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
