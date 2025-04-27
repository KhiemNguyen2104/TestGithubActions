-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "hash_key" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Post" (
    "postId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postId")
);
