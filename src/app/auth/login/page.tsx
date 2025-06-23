"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { UserIcon, LockIcon } from "lucide-react";
import { PasswordInput } from "~/components/ui/password-input";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.ok) {
      router.push("/");
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
            <LockIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent">
              خوش آمدید
            </h1>
            <p className="mt-2 text-gray-600">
              برای ادامه وارد حساب کاربری خود شوید
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="username"
              name="username"
              type="text"
              label="نام کاربری"
              placeholder="نام کاربری خود را وارد کنید"
              icon={<UserIcon className="h-5 w-5 text-gray-400" />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-center text-sm text-red-600">{error}</p>
            )}

            <Button type="submit" className="w-full cursor-pointer" size="lg">
              ورود
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
