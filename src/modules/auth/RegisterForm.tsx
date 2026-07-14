"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
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
  LuUser,
  LuEye,
  LuEyeOff,
  LuGraduationCap,
  LuBookOpen,
  LuAward,
  LuArrowRight,
  LuPresentation,
} from "react-icons/lu";

// ─── Validation Schema ────────────────────────────────────────────────────────

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    role: z.enum(["student", "instructor"], {
      error: "Please select a role",
    }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

// ─── SVG / Card Assets for Left Panel ─────────────────────────────────────────

const MiniProgressBar = () => {
  return (
    <div className="w-full bg-slate-800 rounded-full h-2 mt-2.5 overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "75%" }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
};

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
      acceptTerms: false,
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      await register(
        data.name,
        data.email,
        data.password,
        data.role
      );
      setIsSubmitting(false);
      setSubmitSuccess(true);
      toast.success("Successfully Registered!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err: any) {
      setIsSubmitting(false);
      const errorMessage = err?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      if (process.env.NODE_ENV === "development") {
        console.error("Registration error:", err);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-background text-foreground">
      {/* ─── LEFT PANEL (DESKTOP ILLUSTRATION & BRANDING) ─────────────────────── */}
      <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border-r border-default-100/10">
        {/* Glowing Decorative Orbs */}
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        {/* Branding Header */}
        <Link href="/" className="flex items-center gap-2.5 group relative z-10">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/30">
            <LuGraduationCap size={22} className="text-white transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight text-white">
              Skill<span className="text-primary group-hover:text-secondary transition-colors duration-300">Hub</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
              Learn • Grow • Succeed
            </span>
          </div>
        </Link>

        {/* Floating Mockup Widgets Container */}
        <div className="relative my-auto flex flex-col items-center justify-center w-full min-h-[350px]">
          {/* Card 1: Explore courses (Floating top-left) */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-0 w-64 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/5 shadow-2xl z-20 flex items-start gap-3"
          >
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <LuBookOpen size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Explore Catalog</p>
              <h4 className="text-sm font-bold text-white mt-0.5">5,000+ Courses</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Tech, Design, Business & more</p>
            </div>
          </motion.div>

          {/* Card 2: Skill Growth Progression (Floating center-right) */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-28 right-0 w-64 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/5 shadow-2xl z-10"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Skill Progression</span>
              <span className="text-xs font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Level 4</span>
            </div>
            <MiniProgressBar />
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] text-slate-500 font-bold uppercase">75% Completed</span>
              <span className="text-[10px] text-slate-400 font-bold">1200 XP</span>
            </div>
          </motion.div>

          {/* Card 3: Certificate Reward (Floating bottom-center) */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-4 left-8 w-56 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/5 shadow-2xl z-20 flex items-center gap-3"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <LuAward size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Verified Certifications</p>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 block leading-normal">
                Shareable on LinkedIn & Resumes
              </span>
            </div>
          </motion.div>
        </div>

        {/* Footer Brand Pitch */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Start your learning journey for free
          </h2>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Create an account to track your progress, build high-value skills, and earn certified credentials that grab attention.
          </p>
        </div>
      </div>

      {/* ─── RIGHT PANEL (REGISTRATION FORM) ──────────────────────────────────── */}
      <div className="col-span-12 lg:col-span-7 flex flex-col justify-center px-6 sm:px-16 lg:px-20 py-12 relative">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Logo on Mobile */}
          <div className="flex lg:hidden justify-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/20">
                <LuGraduationCap size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Skill<span className="text-primary">Hub</span>
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Create Account</h1>
            <p className="text-foreground-500 text-sm">
              Sign up today and start building the future you want.
            </p>
          </div>

          <div className="space-y-6">
            {/* Social Login */}
            <Button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-default-200 bg-background hover:bg-default-50 text-sm font-semibold text-foreground py-3 h-12 transition-all duration-200 active:scale-[0.98]"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.34 0-6.05-2.71-6.05-6.05s2.71-6.05 6.05-6.05c1.493 0 2.857.545 3.918 1.442l3.056-3.056C19.014 2.9 15.894 1.7 12.24 1.7 6.467 1.7 1.78 6.387 1.78 12.16s4.687 10.46 10.46 10.46c6.262 0 10.418-4.4 10.418-10.6 0-.613-.055-1.209-.164-1.785H12.24z"
                />
              </svg>
              <span>Sign up with Google</span>
            </Button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-default-200" />
              <span className="mx-4 flex-shrink text-[10px] text-foreground-400 uppercase tracking-wider font-bold">
                Or register with email
              </span>
              <div className="flex-grow border-t border-default-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <AnimatePresence mode="wait">
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold rounded-xl text-center"
                  >
                    Successfully Registered! Redirecting to Dashboard...
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full Name */}
              <TextField className="flex flex-col gap-1.5 w-full">
                <Label className="text-xs font-semibold text-foreground-700 tracking-wide">
                  Full Name
                </Label>
                <div className="relative">
                  <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...registerField("name")}
                  />
                </div>
                {errors.name && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                    <FieldError className="text-xs text-rose-500 font-semibold mt-1.5 block">
                      {errors.name.message}
                    </FieldError>
                  </motion.div>
                )}
              </TextField>

              {/* Email */}
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
                    {...registerField("email")}
                  />
                </div>
                {errors.email && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                    <FieldError className="text-xs text-rose-500 font-semibold mt-1.5 block">
                      {errors.email.message}
                    </FieldError>
                  </motion.div>
                )}
              </TextField>

              {/* Password */}
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
                    {...registerField("password")}
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
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                    <FieldError className="text-xs text-rose-500 font-semibold mt-1.5 block">
                      {errors.password.message}
                    </FieldError>
                  </motion.div>
                )}
              </TextField>

              {/* Confirm Password */}
              <TextField className="flex flex-col gap-1.5 w-full">
                <Label className="text-xs font-semibold text-foreground-700 tracking-wide">
                  Confirm Password
                </Label>
                <div className="relative">
                  <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400 h-4 w-4" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...registerField("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-400 hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                    <FieldError className="text-xs text-rose-500 font-semibold mt-1.5 block">
                      {errors.confirmPassword.message}
                    </FieldError>
                  </motion.div>
                )}
              </TextField>

              {/* ─── Role Selector ─────────────────────────────────────────────── */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-foreground-700 tracking-wide">
                  I want to join as
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      {
                        value: "student",
                        label: "Student",
                        desc: "Learn new skills",
                        icon: <LuGraduationCap size={22} />,
                        activeClass: "border-primary bg-primary/5 text-primary",
                      },
                      {
                        value: "instructor",
                        label: "Instructor",
                        desc: "Teach & earn",
                        icon: <LuPresentation size={22} />,
                        activeClass: "border-violet-500 bg-violet-500/5 text-violet-500",
                      },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue("role", opt.value, { shouldValidate: true })}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left ${
                        selectedRole === opt.value
                          ? opt.activeClass
                          : "border-default-200 text-foreground-500 hover:border-default-300 hover:bg-default-50"
                      }`}
                    >
                      <span
                        className={`shrink-0 ${
                          selectedRole === opt.value ? "" : "text-foreground-400"
                        }`}
                      >
                        {opt.icon}
                      </span>
                      <div>
                        <p className="text-sm font-bold leading-none">{opt.label}</p>
                        <p
                          className={`text-[10px] mt-0.5 ${
                            selectedRole === opt.value ? "opacity-80" : "text-foreground-400"
                          }`}
                        >
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.role && (
                  <p className="text-xs text-rose-500 font-semibold mt-0.5">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Accept Terms Checkbox */}
              <div className="pt-1">
                <Controller
                  name="acceptTerms"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      isSelected={value}
                      onChange={onChange}
                      className="text-xs font-semibold text-foreground-600 cursor-pointer"
                    >
                      I accept the{" "}
                      <Link href="#" className="text-primary hover:underline transition-colors font-bold">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline transition-colors font-bold">
                        Privacy Policy
                      </Link>
                    </Checkbox>
                  )}
                />
                {errors.acceptTerms && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                    <FieldError className="text-xs text-rose-500 font-semibold mt-1.5 block">
                      {errors.acceptTerms.message}
                    </FieldError>
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isDisabled={isSubmitting || submitSuccess}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-12 mt-3"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <>
                    <span>Create Account</span>
                    <LuArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Redirect to Login */}
          <p className="text-center text-xs text-foreground-500 font-semibold mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-secondary hover:underline font-bold transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}