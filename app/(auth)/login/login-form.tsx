'use client';

// Removed unused imports 
// Note: We need to ensure lib/actions exists or create it, 
// OR simpler for this demo: use a client-side fetch or just standard next-auth integration.
// Given previous auth setup was using `signIn` from `next-auth/react` (implied or needed).
// Let's implement a standard client-side form using server actions or just direct form submission.
// Phase 3 implemented auth but I didn't see explicit server actions. 
// I will implement a robust client-side form that calls a server action or API.
// Actually, for simplicity with 'credentials', let's use `signIn` from `next-auth/react`.

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            alert('Invalid credentials');
            setLoading(false);
        } else {
            router.push('/dashboard');
        }
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="judge@tradesense.ai"
          required
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          defaultValue="judge@tradesense.ai"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          defaultValue="password"
        />
      </div>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>
    </form>
  );
}
