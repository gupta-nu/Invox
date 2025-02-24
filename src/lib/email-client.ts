import { ImapFlow } from 'imapflow';
import { EmailIngestionConfig,PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const PDF_DIR = path.join(process.cwd(), 'pdfs');

export async function checkEmails(config: EmailIngestionConfig) {
  // Ensure the PDF directory exists
  if (!fs.existsSync(PDF_DIR)) {
    fs.mkdirSync(PDF_DIR, { recursive: true });
  }

  // Configure IMAP client based on the connection type
  const client = new ImapFlow({
    host: config.connectionType === 'OUTLOOK' ? 'outlook.office365.com' : config.host || 'imap.gmail.com',
    port: config.port || 993,
    secure: config.tls,
    auth: {
      user: config.username || config.emailAddress,
      pass: config.password!,
    },
  });

  try {
    // Connect to the email server
    await client.connect();

    // Lock the inbox to prevent other processes from accessing it
    const lock = await client.getMailboxLock('INBOX');
    try {
      // Fetch all new emails
      const messages = await client.fetch('1:*', { envelope: true, source: true, bodyStructure: true });

      for await (const message of messages) {
        // Check for PDF attachments
        const attachments = message.attachments.filter(
            (attachment) => attachment.type === 'application/pdf' && attachment.filename
          );

        // Process each attachment
        for (const attachment of attachments) {
          // Generate a unique filename for the PDF
          const fileName = `${Date.now()}_${attachment.filename}`;
          const filePath = path.join(PDF_DIR, fileName);

          // Save the attachment to the local folder
          fs.writeFileSync(filePath, attachment.content);

          // Store metadata in the database
          await prisma.pDFMetadata.create({
            data: {
              fromAddress: message.envelope.from[0].address,
              dateReceived: new Date(message.envelope.date!),
              subject: message.envelope.subject || 'No Subject',
              attachmentFileName: attachment.filename!,
              filePath: fileName,
              configId: config.id!,
            },
          });
        }
      }
    } finally {
      // Release the inbox lock
      lock.release();
    }

    // Disconnect from the email server
    await client.logout();
  } catch (error) {
    console.error(`Error processing emails for ${config.emailAddress}:`, error);
    throw error;
  }
}


