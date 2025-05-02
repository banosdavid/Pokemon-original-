import { NextRequest, NextResponse } from 'next/server';
import { uploadStreamToFtp } from '@/lib/ftpClientStream';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const fileName = `seleccion-${Date.now()}.json`;
    const remotePath = `/${fileName}`;

    const jsonContent = JSON.stringify(data, null, 2);

    await uploadStreamToFtp(jsonContent, remotePath);

    return NextResponse.json({ message: 'Subido desde memoria correctamente' });
  } catch (error) {
    console.error("❌ Error al subir por stream:", error);
    return NextResponse.json({ error: 'Error al subir por stream' }, { status: 500 });
  }
}

