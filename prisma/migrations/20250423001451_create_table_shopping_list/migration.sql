-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "typeAmount" TEXT NOT NULL,
    "created" DATETIME NOT NULL,
    "userId" TEXT NOT NULL
);
