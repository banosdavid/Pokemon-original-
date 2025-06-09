import { Client } from 'basic-ftp';
import { Readable } from 'stream';

export async function uploadStreamToFtp(jsonText: string, remotePath: string) {
  const client = new Client();
  try {
    await client.access({
      host: "192.168.3.63",
      user: "pokemonuser",
      password: "Elaleman0305Pokemon",
      secure: false,
    });

    const stream = Readable.from([jsonText]);
    await client.uploadFrom(stream, remotePath);

    console.log("✅ Subido desde stream con éxito");
  } catch (err) {
    console.error("❌ Error al subir desde stream:", err);
    throw err;
  } finally {
    client.close();
  }
}
