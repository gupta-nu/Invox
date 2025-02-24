import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkEmails } from '@/lib/email-client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Fetch all email configurations
    const configs = await prisma.emailIngestionConfig.findMany();

    // Check emails for each configuration
    for (const config of configs) {
      await checkEmails(config);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error checking emails:', error);
    return NextResponse.json({ error: 'Failed to check emails' }, { status: 500 });
  }
}