import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const configs = await prisma.emailIngestionConfig.findMany();
  return NextResponse.json(configs);
}

export async function POST(request: Request) {
  const data = await request.json();
  const config = await prisma.emailIngestionConfig.create({ data });
  return NextResponse.json(config);
}

export async function PUT(request: Request) {
  const data = await request.json();
  const config = await prisma.emailIngestionConfig.update({
    where: { id: data.id },
    data,
  });
  return NextResponse.json(config);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  await prisma.emailIngestionConfig.delete({ where: { id } });
  return NextResponse.json({ success: true });
}