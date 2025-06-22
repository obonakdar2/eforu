"use client";

import { useState } from "react";
import { Input } from "./input";
import { LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";

export const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      label="رمز عبور"
      placeholder="رمز عبور خود را وارد کنید"
      icon={<LockIcon className="h-5 w-5 text-gray-400" />}
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-400 transition-colors duration-200 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
          aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      }
      required
    />
  );
};
