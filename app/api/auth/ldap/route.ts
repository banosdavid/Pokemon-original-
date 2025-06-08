import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import ldap from 'ldapjs';
import { createToken } from '@/lib/auth';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const client = ldap.createClient({
    url: 'ldap://192.168.1.20',
  });

  const dn = `uid=${username},ou=usuarios,dc=pokemon,dc=local`;

  return new Promise((resolve) => {
    client.bind(dn, password, (err: any) => {
      if (err) {
        console.error('❌ Error de autenticación LDAP:', err.message);
        resolve(
          NextResponse.json(
            { success: false, message: 'Credenciales inválidas' },
            { status: 401 }
          )
        );
      } else {
        const token = createToken(username);

        const response = NextResponse.json({
          success: true,
          message: 'Login correcto',
        });

        response.headers.set(
          'Set-Cookie',
          serialize('auth_token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24, // 1 día
          })
        );

        client.unbind();
        resolve(response);
      }
    });
  });
}
