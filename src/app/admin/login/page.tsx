'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin/dashboard';
  const { login } = useAuth();
  const { success, error: toastError } = useToast();

  const [email, setEmail] = useState('admin@rockhold.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toastError('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      login({ user: data.user });
      success('Welcome back, ' + data.user.name, 'Login Successful');
      router.push(redirect);
    } catch (err: any) {
      toastError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
      {/* Logo & Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-brand-navy rounded-2xl p-2.5 mx-auto mb-4 flex items-center justify-center border border-brand-teal/30 shadow-md">
          <img
            src="/images/logo/rockhold-mark.png"
            alt="RockHold"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl font-black text-brand-darkNavy font-display">
            Rock<span className="text-brand-teal">Hold</span>
          </span>
          <span className="text-[10px] bg-brand-teal/15 text-brand-teal font-bold px-1.5 py-0.5 rounded border border-brand-teal/30">
            ADMIN
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Secure Central Management Console
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Admin Email Address"
          type="email"
          required
          placeholder="admin@rockhold.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Admin Password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="w-full font-bold shadow-md hover:shadow-industrial-glow"
            isLoading={loading}
          >
            <span>Authenticate & Access Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </form>

      {/* Preset Credentials Hint for Testing */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-400">
          Default Credentials: <span className="font-semibold text-slate-700">admin@rockhold.com</span> /{' '}
          <span className="font-semibold text-slate-700">Admin@123</span>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-darkNavy via-brand-navy to-[#061828] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-navy rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <Suspense fallback={<div className="bg-white rounded-3xl p-8 text-center text-slate-400">Loading console...</div>}>
          <LoginForm />
        </Suspense>

        {/* Bottom Security Badge */}
        <div className="text-center mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-brand-teal" />
          <span>Encrypted with SHA-256 / Bcrypt & HTTP-Only Secure Cookies</span>
        </div>
      </div>
    </div>
  );
}
