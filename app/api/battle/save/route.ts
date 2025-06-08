import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Battle from '@/lib/models/Battle';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    const battle = await Battle.create(data);
    console.log('✅ Batalla guardada:', battle._id);
    return NextResponse.json(battle, { status: 201 });
  } catch (error) {
    console.error('❌ Error al guardar batalla:', error);
    return NextResponse.json({ message: 'Error al guardar batalla' }, { status: 500 });
  }
}
