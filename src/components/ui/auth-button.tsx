import { LogIn } from "lucide-react";
import Link from "next/link";
import { auth } from "~/server/auth";

export const AuthButton = async () => {
  const session = await auth();
  return (
    <Link
      href={session ? "/api/auth/signout" : "/api/auth/signin"}
      className="font-vazir flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
    >
      <LogIn className="ml-2 h-4 w-4" />
      {session ? "خروج" : "ورود"}
    </Link>
  );
};
