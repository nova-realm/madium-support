import { NextRequest, NextResponse } from 'next/server';
import qrs from '@data/qrs.json';

type QR = { id: string; title: string; text: string; enabled?: boolean };

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const normalised = key.trim().toLowerCase();

  const qr = (qrs as QR[]).find(
    (q) => q.id.toLowerCase() === normalised && q.enabled !== false
  );

  if (!qr) {
    return NextResponse.json(
      { error: `No quick reply found for key "${key}".` },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { key: qr.id, title: qr.title, text: qr.text },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
