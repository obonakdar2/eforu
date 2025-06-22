import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { UserIcon, LockIcon } from "lucide-react";
import { signIn } from "~/server/auth";
import { PasswordInput } from "~/components/ui/password-input";

export default function LoginPage() {
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
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", formData);
            }}
            className="flex flex-col gap-4"
          >
            <Input
              id="username"
              name="username"
              type="text"
              label="نام کاربری"
              placeholder="نام کاربری خود را وارد کنید"
              icon={<UserIcon className="h-5 w-5 text-gray-400" />}
              required
            />
            <PasswordInput />

            <Button type="submit" className="w-full" size="lg">
              ورود
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
