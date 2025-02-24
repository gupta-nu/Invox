-- CreateTable
CREATE TABLE "EmailIngestionConfig" (
    "id" SERIAL NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "connectionType" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "token" TEXT,
    "host" TEXT,
    "port" INTEGER,
    "tls" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EmailIngestionConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PDFMetadata" (
    "id" SERIAL NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "dateReceived" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "attachmentFileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "configId" INTEGER NOT NULL,

    CONSTRAINT "PDFMetadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PDFMetadata" ADD CONSTRAINT "PDFMetadata_configId_fkey" FOREIGN KEY ("configId") REFERENCES "EmailIngestionConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
