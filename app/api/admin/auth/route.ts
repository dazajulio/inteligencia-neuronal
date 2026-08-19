import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Verificación de credenciales (con valores de entorno o valores por defecto para entorno local)
    const validEmail = process.env.ADMIN_EMAIL || 'admin@inteligencianeuronal.com';
    const validPassword = process.env.ADMIN_PASSWORD || 'admin2026!';

    // 2. Validación de credenciales
    if (email !== validEmail || password !== validPassword) {
      return NextResponse.json(
        { message: 'Credenciales de acceso no válidas' },
        { status: 401 }
      );
    }

    // 3. Creación de cookie de sesión segura httpOnly
    const cookieStore = cookies();
    cookieStore.set('admin-session', 'authenticated_token_secure_hash_2026', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 días de duración
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error interno en la autenticación' },
      { status: 500 }
    );
  }
}
