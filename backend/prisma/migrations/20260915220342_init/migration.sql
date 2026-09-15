-- CreateTable
CREATE TABLE "Equipamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tag" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OrdemServico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ABERTA',
    "equipamentoId" INTEGER NOT NULL,
    CONSTRAINT "OrdemServico_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipamento_tag_key" ON "Equipamento"("tag");
