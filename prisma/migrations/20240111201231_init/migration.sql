-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);
