"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Card,
  TextField,
  Input,
  Label,
  FieldError,
  Checkbox,
  Button,
} from "@heroui/react";
import {
  LuMail,
  LuLock,
  LuEye,
  LuEyeOff,
  LuGraduationCap,
  LuArrowRight,
} from "react-icons/lu";

// ─── Validation Schema ────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: async (values) => {
      const result = loginSchema.safeParse(values);
      if (result.success) {
        return { values: result.data, errors: {} };
      }
      const fieldErrors: Record<string, { type: string; message: string }> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        fieldErrors[path] = {
          type: issue.code,
          message: issue.message,
        };
      });
      return { values: {}, errors: fieldErrors };
    },
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      // Call authentication provider to set session
      await login(data.email, data.password);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Redirect to dashboard after a successful simulation delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err: unknown) {
      setIsSubmitting(false);
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "message" in err
          ? String((err as Record<string, unknown>).message)
          : "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-default-50/50 p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl border border-default-100 bg-background rounded-2xl">
        {/* Branding & Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-2 mb-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/20">
              <LuGraduationCap size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Skill<span className="text-primary">Hub</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mt-4">Welcome Back</h1>
          <p className="text-xs text-foreground-500 font-medium">
            Enter your credentials below to access your account.
          </p>
        </div>

        <div className="space-y-5">
          {/* Social Logins */}
          <Button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-default-200 bg-background hover:bg-default-50 text-sm font-semibold text-foreground py-3 h-11 transition-all duration-200 active:scale-[0.98]"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.34 0-6.05-2.71-6.05-6.05s2.71-6.05 6.05-6.05c1.493 0 2.857.545 3.918 1.442l3.056-3.056C19.014 2.9 15.894 1.7 12.24 1.7 6.467 1.7 1.78 6.387 1.78 12.16s4.687 10.46 10.46 10.46c6.262 0 10.418-4.4 10.418-10.6 0-.613-.055-1.209-.164-1.785H12.24z"
              />
            </svg>
            <span>Continue with Google</span>
          </Button>

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-default-200" />
            <span className="mx-4 flex-shrink text-[10px] text-foreground-400 uppercase tracking-wider font-bold">
              OR
            </span>
            <div className="flex-grow border-t border-default-200" />
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AnimatePresence mode="wait">
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold rounded-xl text-center"
                >
                  Successfully Authenticated! Redirecting...
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <TextField className="flex flex-col gap-1.5 w-full">
              <Label className="text-xs font-semibold text-foreground-700 tracking-wide">
                Email Address
              </Label>
              <div className="relative">
                <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  <FieldError className="text-xs text-rose-500 font-semibold mt-1.5 block">
                    {errors.email.message}
                  </FieldError>
                </motion.div>
              )}
            </TextField>

            {/* Password Input */}
            <TextField className="flex flex-col gap-1.5 w-full">
              <Label className="text-xs font-semibold text-foreground-700 tracking-wide">
                Password
              </Label>
              <div className="relative">
                <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400 h-4 w-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-400 hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>
              {errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  <FieldError className="text-xs text-rose-500 font-semibold mt-1.5 block">
                    {errors.password.message}
                  </FieldError>
                </motion.div>
              )}
            </TextField>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    isSelected={value}
                    onChange={onChange}
                    className="text-xs font-semibold text-foreground-600 cursor-pointer"
                  >
                    Remember me
                  </Checkbox>
                )}
              />
              <Link
                href="#"
                className="text-xs font-semibold text-primary hover:text-secondary hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={isSubmitting || submitSuccess}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-11 mt-2"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <span>Login</span>
                  <LuArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Form redirection */}
          <p className="text-center text-xs text-foreground-500 font-semibold mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:text-secondary hover:underline font-bold transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}