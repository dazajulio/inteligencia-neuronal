'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Credenciales no autorizadas');
      }

      // Redirección con sesión activa
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono font-bold text-zinc-700 mb-1.5">USUARIO / EMAIL CORPORATIVO</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@inteligencianeuronal.com"
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 pl-10 pr-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#971B8D] transition-all shadow-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono font-bold text-zinc-700 mb-1.5">CONTRASEÑA MAESTRA</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 pl-10 pr-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#971B8D] transition-all shadow-sm"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#971B8D] hover:bg-[#801676] py-3.5 text-xs font-bold text-white transition-all disabled:opacity-50 shadow-md shadow-[#971B8D]/30 hover:shadow-lg"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Verificando...
          </>
        ) : (
          <>
            Ingresar al Dashboard
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex items-center justify-center px-6 relative overflow-hidden font-sans selection:bg-[#EA0C7F] selection:text-white">
      
      {/* Sombra ambiental difusa */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#971B8D]/10 to-[#EA0C7F]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-2xl overflow-hidden">
        {/* Top Color Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#971B8D] via-[#EA0C7F] to-[#1DACE3]" />

        <div className="text-center mb-8">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#971B8D] to-[#EA0C7F] text-white shadow-md shadow-[#971B8D]/30">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-extrabold text-zinc-900 tracking-tight">Acceso Super Admin</h1>
          <p className="text-xs text-zinc-500 mt-1">Inteligencia Neuronal • Centro de Mando</p>
        </div>

        <Suspense fallback={
          <div className="py-8 flex justify-center items-center text-zinc-500 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#971B8D]" />
            <span>Cargando credenciales...</span>
          </div>
        }>
          <LoginForm />
        </Suspense>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">
            ← Volver a la página principal
          </Link>
        </div>

        <div className="mt-8 border-t border-zinc-100 pt-4 text-center">
          <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            PROTECCIÓN ZERO-TRUST // SESIÓN ENCRIPTADA
          </span>
        </div>
      </div>
    </main>
  );
}
